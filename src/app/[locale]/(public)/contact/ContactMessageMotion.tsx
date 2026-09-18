"use client";

import MailRounded from "@mui/icons-material/MailRounded";
import SendRounded from "@mui/icons-material/SendRounded";
import { useEffect } from "react";
import { useAnimate, useReducedMotion } from "motion/react";

import type { PageCopy } from "@/dictionaries/public/PageCopy";

type ContactMessageMotionProps = {
  copy: PageCopy["contact"];
};

const exampleMessage = "How can I apply for Offline";
const messageEase = [0.22, 1, 0.36, 1] as const;

export function ContactMessageMotion({ copy }: ContactMessageMotionProps) {
  /* HOOKS */
  const reduceMotion = useReducedMotion();
  const [scope, animate] = useAnimate<HTMLDivElement>();

  useEffect(() => {
    const message = scope.current;
    const input = message?.querySelector<HTMLInputElement>("[data-contact-input]");
    const inputMirror = message?.querySelector<HTMLElement>("[data-contact-input-mirror]");
    let cancelled = false;
    let holdTimer: number | undefined;

    if (!message || !input || !inputMirror) {
      return;
    }

    const hold = async (duration: number) => {
      await new Promise<void>((resolve) => {
        holdTimer = window.setTimeout(resolve, duration * 1000);
      });
    };

    const setMessageValue = (value: string) => {
      input.value = value;
      inputMirror.textContent = value;
    };

    const runMessage = async () => {
      if (reduceMotion) {
        setMessageValue(exampleMessage);
        return;
      }

      while (!cancelled) {
        setMessageValue("");
        await hold(2);

        for (let character = 1; character <= exampleMessage.length; character += 1) {
          if (cancelled) {
            return;
          }

          setMessageValue(exampleMessage.slice(0, character));
          await hold(0.105);
        }

        if (cancelled) {
          return;
        }

        await hold(0.35);
        setMessageValue("");
        await animate(
          "[data-contact-action]",
          { scale: [1, 0.84, 1.12, 0.96, 1] },
          { duration: 0.48, ease: messageEase, times: [0, 0.24, 0.52, 0.76, 1] },
        );

        await hold(0.45);
      }
    };

    void runMessage();

    return () => {
      cancelled = true;
      if (holdTimer) {
        window.clearTimeout(holdTimer);
      }
    };
  }, [animate, reduceMotion, scope]);

  return (
    <div ref={scope} className="contact__heroMessageMotion">
      <span className="contact__heroMessageIcon">
        <MailRounded />
      </span>
      <strong className="contact__heroMessageTitle">{copy.formTitle}</strong>
      <span className="contact__heroMessageMeta">{copy.message}</span>
      <span className="contact__heroMessageComposer">
        <span className="contact__heroMessageInputShell">
          <input
            aria-label={exampleMessage}
            className="contact__heroMessageInput"
            data-contact-input
            readOnly
            tabIndex={-1}
            type="text"
          />
          <span className="contact__heroMessageTypingLayer">
            <span className="contact__heroMessageInputMirror" data-contact-input-mirror />
            <i className="contact__heroMessageCaret" />
          </span>
        </span>
        <span className="contact__heroMessageAction" data-contact-action>
          <SendRounded />
        </span>
      </span>
    </div>
  );
}
