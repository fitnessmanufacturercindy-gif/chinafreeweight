"use client";

import { useEffect } from "react";

type AnalyticsWindow = Window &
  typeof globalThis & {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  };

export default function DeferredGoogleAnalytics({ measurementId }: { measurementId: string }) {
  useEffect(() => {
    const win = window as AnalyticsWindow;
    win.dataLayer = win.dataLayer || [];
    win.gtag =
      win.gtag ||
      function gtag(...args: unknown[]) {
        win.dataLayer?.push(args);
      };

    const timer = window.setTimeout(() => {
      win.gtag?.("js", new Date());
      win.gtag?.("config", measurementId);
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
      document.head.appendChild(script);
    }, 3500);

    return () => window.clearTimeout(timer);
  }, [measurementId]);

  return null;
}
