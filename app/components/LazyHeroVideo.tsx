"use client";

import { useEffect, useState } from "react";

type IdleWindow = Window &
  typeof globalThis & {
    requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
    cancelIdleCallback?: (handle: number) => void;
  };

export default function LazyHeroVideo() {
  const [canPlayVideo, setCanPlayVideo] = useState(false);

  useEffect(() => {
    const win = window as IdleWindow;
    const showVideo = () => setCanPlayVideo(true);

    if (win.requestIdleCallback) {
      const idleId = win.requestIdleCallback(showVideo, { timeout: 1800 });
      return () => win.cancelIdleCallback?.(idleId);
    }

    const timer = window.setTimeout(showVideo, 1200);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="hero-video-layer" aria-hidden="true">
      {canPlayVideo ? (
        <>
          <video
            className="hero-bg-video hero-bg-video-one"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/assets/hero-poster.webp"
          >
            <source src="/assets/banner.mp4" type="video/mp4" />
          </video>
          <video
            className="hero-bg-video hero-bg-video-two"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/assets/hero-poster.webp"
          >
            <source src="/assets/hero-loop-2.mp4" type="video/mp4" />
          </video>
        </>
      ) : null}
    </div>
  );
}
