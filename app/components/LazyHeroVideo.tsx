"use client";

import { useEffect, useState } from "react";

type IdleWindow = Window &
  typeof globalThis & {
    requestIdleCallback?: (callback: () => void) => number;
    cancelIdleCallback?: (handle: number) => void;
  };

export default function LazyHeroVideo() {
  const [canPlayVideo, setCanPlayVideo] = useState(false);

  useEffect(() => {
    const win = window as IdleWindow;
    const isDesktop = win.matchMedia("(min-width: 900px)").matches;
    const allowsMotion = !win.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isDesktop || !allowsMotion) {
      return;
    }

    let idleId: number | undefined;
    let requested = false;
    const interactionEvents = ["pointermove", "pointerdown", "keydown", "scroll"] as const;
    const removeInteractionListeners = () => {
      interactionEvents.forEach((eventName) => {
        window.removeEventListener(eventName, showVideo);
      });
    };
    const showVideo = () => {
      if (requested) {
        return;
      }
      requested = true;
      removeInteractionListeners();
      if (win.requestIdleCallback) {
        idleId = win.requestIdleCallback(() => setCanPlayVideo(true));
      } else {
        setCanPlayVideo(true);
      }
    };

    interactionEvents.forEach((eventName) => {
      window.addEventListener(eventName, showVideo, { once: true, passive: true });
    });

    return () => {
      removeInteractionListeners();
      if (idleId !== undefined) {
        win.cancelIdleCallback?.(idleId);
      }
    };
  }, []);

  return (
    <div className="hero-video-layer" aria-hidden="true">
      {canPlayVideo ? (
        <video
          className="hero-bg-video"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster="/assets/hero-poster.avif"
        >
          <source src="/assets/hero-loop-2.mp4" type="video/mp4" />
        </video>
      ) : null}
    </div>
  );
}
