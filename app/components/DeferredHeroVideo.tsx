"use client";

import { useEffect, useState } from "react";

type IdleWindow = Window &
  typeof globalThis & {
    requestIdleCallback?: (callback: () => void) => number;
    cancelIdleCallback?: (handle: number) => void;
  };

export default function DeferredHeroVideo() {
  const [canPlayVideo, setCanPlayVideo] = useState(false);

  useEffect(() => {
    const win = window as IdleWindow;
    const isDesktop = win.matchMedia("(min-width: 900px)").matches;
    const allowsMotion = !win.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isDesktop || !allowsMotion) {
      return;
    }

    let idleId: number | undefined;
    let timeoutId: number | undefined;
    let requested = false;
    const interactionEvents = ["pointermove", "pointerdown", "keydown", "scroll"] as const;

    const showVideo = () => {
      if (requested) {
        return;
      }
      requested = true;
      interactionEvents.forEach((eventName) => {
        window.removeEventListener(eventName, showVideo);
      });
      if (win.requestIdleCallback) {
        idleId = win.requestIdleCallback(() => setCanPlayVideo(true));
      } else {
        setCanPlayVideo(true);
      }
    };

    const onLoad = () => {
      timeoutId = window.setTimeout(showVideo, 1200);
    };

    interactionEvents.forEach((eventName) => {
      window.addEventListener(eventName, showVideo, { once: true, passive: true });
    });

    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad, { once: true });
    }

    return () => {
      window.removeEventListener("load", onLoad);
      interactionEvents.forEach((eventName) => {
        window.removeEventListener(eventName, showVideo);
      });
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }
      if (idleId !== undefined) {
        win.cancelIdleCallback?.(idleId);
      }
    };
  }, []);

  if (!canPlayVideo) {
    return null;
  }

  return (
    <video
      className="hero-bg-video"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster="/assets/hero-poster.avif"
    >
      <source src="/assets/hero-loop-2.mp4" type="video/mp4" />
    </video>
  );
}
