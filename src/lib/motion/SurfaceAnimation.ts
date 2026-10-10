type AnimatableSurface = Pick<Element, "animate">;
type EntranceDirection = "right" | "down" | "up";

const entranceOffsets: Record<EntranceDirection, string> = {
  right: "-12px 0",
  down: "0 -10px",
  up: "0 12px",
};

export function playSurfaceEntrance(surface: AnimatableSurface, direction: EntranceDirection) {
  // Web Animations affect presentation, not React's server-rendered attributes.
  // An implicit final frame returns to the element's own opacity/translate,
  // including dimmed cards, without committing inline styles or a forwards fill.
  return surface.animate([{ opacity: 0, translate: entranceOffsets[direction], offset: 0 }], {
    id: "surface-entrance",
    duration: 900,
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
    fill: "none",
  });
}

export function revealSurfaceWrapper(surface: AnimatableSurface) {
  // Disable a legacy parent reveal without changing its class, data-* or style.
  // The owner cancels this presentation-only effect when the wrapper is removed.
  return surface.animate([{ opacity: 1, transform: "none" }], {
    id: "surface-wrapper",
    duration: 0,
    fill: "forwards",
  });
}
