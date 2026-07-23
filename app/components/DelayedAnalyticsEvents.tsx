"use client";

import dynamic from "next/dynamic";

const AnalyticsEvents = dynamic(() => import("./AnalyticsEvents"), { ssr: false });

export default function DelayedAnalyticsEvents() {
  return <AnalyticsEvents />;
}
