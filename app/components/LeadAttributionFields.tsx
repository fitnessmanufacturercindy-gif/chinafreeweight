"use client";

import { useEffect, useState } from "react";

type Attribution = {
  source_page: string;
  landing_page: string;
  language: string;
  referrer: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
};

const emptyAttribution: Attribution = {
  source_page: "",
  landing_page: "",
  language: "",
  referrer: "",
  utm_source: "",
  utm_medium: "",
  utm_campaign: "",
  utm_term: "",
  utm_content: ""
};

const landingPageKey = "cfw_first_landing_page";
const referrerKey = "cfw_first_referrer";

export default function LeadAttributionFields({ language }: { language: string }) {
  const [attribution, setAttribution] = useState<Attribution>(emptyAttribution);

  useEffect(() => {
    const url = new URL(window.location.href);
    const storedLanding = window.sessionStorage.getItem(landingPageKey);
    const storedReferrer = window.sessionStorage.getItem(referrerKey);
    const landingPage = storedLanding || url.href;
    const referrer = storedReferrer ?? document.referrer;

    if (!storedLanding) window.sessionStorage.setItem(landingPageKey, landingPage);
    if (storedReferrer === null) window.sessionStorage.setItem(referrerKey, referrer);

    setAttribution({
      source_page: url.href,
      landing_page: landingPage,
      language,
      referrer,
      utm_source: url.searchParams.get("utm_source") || "",
      utm_medium: url.searchParams.get("utm_medium") || "",
      utm_campaign: url.searchParams.get("utm_campaign") || "",
      utm_term: url.searchParams.get("utm_term") || "",
      utm_content: url.searchParams.get("utm_content") || ""
    });
  }, [language]);

  return (
    <>
      {Object.entries(attribution).map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} />
      ))}
    </>
  );
}
