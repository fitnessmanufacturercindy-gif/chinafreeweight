"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const AnalyticsEvents = dynamic(() => import("./AnalyticsEvents"), { ssr: false });

export default function DelayedAnalyticsEvents() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const enable = () => {
      window.setTimeout(() => setEnabled(true), 3000);
    };

    if (document.readyState === "complete") {
      enable();
    } else {
      window.addEventListener("load", enable, { once: true });
    }

    return () => {
      window.removeEventListener("load", enable);
    };
  }, []);

  return enabled ? <AnalyticsEvents /> : null;
}
