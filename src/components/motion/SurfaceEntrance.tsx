"use client";

import { useEffect, useRef } from "react";

import {
  entranceCards,
  entranceNavbars,
  entranceSidebars,
  entranceSurfaces,
} from "@/config/EntranceMotion";
import { playSurfaceEntrance, revealSurfaceWrapper } from "@/lib/motion/SurfaceAnimation";

// Enhance the actual surface, without adding wrappers or changing its layout.
// Content is visible by default, including SSR, disabled JS and reduced motion.
export function SurfaceEntrance() {
  const entered = useRef(new WeakSet<Element>());

  useEffect(() => {
    if (!window.IntersectionObserver || !window.MutationObserver || !Element.prototype.animate)
      return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let stop = () => {};

    const start = () => {
      stop();
      if (preference.matches) return;
      const pending = new Set<HTMLElement>();
      const animations = new Map<HTMLElement, Animation>();
      const wrappers = new Map<HTMLElement, Animation>();
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (
              !entry.isIntersecting ||
              !(entry.target instanceof HTMLElement) ||
              !entry.target.isConnected
            )
              continue;
            const node = entry.target;
            observer.unobserve(node);
            pending.delete(node);
            if (entered.current.has(node)) continue;
            entered.current.add(node);
            // Do not fade a field/control while the user is already interacting with it.
            if (node.contains(document.activeElement)) continue;
            const direction = node.matches(entranceSidebars)
              ? "right"
              : node.matches(entranceNavbars)
                ? "down"
                : "up";
            const animation = playSurfaceEntrance(node, direction);
            animations.set(node, animation);
            animation.onfinish = () => {
              animation.cancel();
              animations.delete(node);
            };
          }
        },
        { threshold: 0 },
      );

      const register = (node: HTMLElement) => {
        if (entered.current.has(node) || pending.has(node)) return;
        // Nested content moves with its enclosing card, not a second time independently.
        if (node.matches(entranceCards) && node.parentElement?.closest(entranceCards)) return;
        // Replace legacy wrapper reveals with the card's own reveal, avoiding double motion.
        let wrapper = node.parentElement?.closest<HTMLElement>("[data-reveal-wrapper]");
        while (wrapper) {
          if (!wrappers.has(wrapper)) wrappers.set(wrapper, revealSurfaceWrapper(wrapper));
          wrapper = wrapper.parentElement?.closest<HTMLElement>("[data-reveal-wrapper]");
        }
        pending.add(node);
        observer.observe(node);
      };
      const scan = (root: ParentNode) => {
        if (root instanceof HTMLElement && root.matches(entranceSurfaces)) register(root);
        root.querySelectorAll<HTMLElement>(entranceSurfaces).forEach(register);
      };
      scan(document);

      // Only inspect inserted subtrees. Timers, form typing, theme changes and server
      // refreshes that keep the same card DOM node do not replay its entrance.
      const mutations = new MutationObserver((records) => {
        for (const record of records) {
          for (const node of record.addedNodes) if (node instanceof HTMLElement) scan(node);
        }
        for (const node of pending) {
          if (!node.isConnected) {
            observer.unobserve(node);
            pending.delete(node);
          }
        }
        for (const collection of [animations, wrappers]) {
          for (const [node, animation] of collection) {
            if (!node.isConnected) {
              animation.cancel();
              collection.delete(node);
            }
          }
        }
      });
      mutations.observe(document.body, { childList: true, subtree: true });

      const revealFocused = (event: FocusEvent) => {
        if (!(event.target instanceof Element)) return;
        for (const [surface, animation] of animations) {
          if (surface.contains(event.target)) {
            animation.cancel();
            animations.delete(surface);
          }
        }
      };
      document.addEventListener("focusin", revealFocused);
      stop = () => {
        observer.disconnect();
        mutations.disconnect();
        document.removeEventListener("focusin", revealFocused);
        for (const animation of animations.values()) animation.cancel();
        for (const animation of wrappers.values()) animation.cancel();
        animations.clear();
        wrappers.clear();
        pending.clear();
      };
    };
    start();
    preference.addEventListener("change", start);
    return () => {
      preference.removeEventListener("change", start);
      stop();
    };
  }, []);

  return null;
}
