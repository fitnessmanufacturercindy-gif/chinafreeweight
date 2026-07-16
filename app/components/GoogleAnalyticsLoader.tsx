"use client";

import { useEffect } from "react";

type IdleWindow = Window &
  typeof globalThis & {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    requestIdleCallback?: (callback: () => void, options?: { timeout?: number }) => number;
    cancelIdleCallback?: (handle: number) => void;
  };

type Props = {
  measurementId?: string;
};

export default function GoogleAnalyticsLoader({ measurementId }: Props) {
  useEffect(() => {
    if (!measurementId) return;
    const win = window as IdleWindow;
    let idleId: number | undefined;
    let timeoutId: number | undefined;

    const loadAnalytics = () => {
      if (document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${measurementId}"]`)) return;
      win.dataLayer = win.dataLayer || [];
      win.gtag =
        win.gtag ||
        function gtag(...args: unknown[]) {
          win.dataLayer?.push(args);
        };
      win.gtag("js", new Date());
      win.gtag("config", measurementId);

      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      document.head.appendChild(script);
    };

    const scheduleAnalytics = () => {
      timeoutId = window.setTimeout(() => {
        if (win.requestIdleCallback) idleId = win.requestIdleCallback(loadAnalytics, { timeout: 2000 });
        else loadAnalytics();
      }, 5000);
    };

    if (document.readyState === "complete") {
      scheduleAnalytics();
    } else {
      window.addEventListener("load", scheduleAnalytics, { once: true });
    }

    return () => {
      window.removeEventListener("load", scheduleAnalytics);
      if (idleId !== undefined) win.cancelIdleCallback?.(idleId);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, [measurementId]);

  return null;
}
