"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (
      command: "event",
      eventName: string,
      parameters?: Record<string, string | number | boolean>
    ) => void;
  }
}

function trackEvent(eventName: string, parameters: Record<string, string | number | boolean> = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", eventName, {
    page_path: window.location.pathname,
    ...parameters
  });
}

function cleanText(value: string | null | undefined) {
  return value?.replace(/\s+/g, " ").trim().slice(0, 120) || "";
}

function findLink(target: EventTarget | null) {
  if (!(target instanceof Element)) {
    return null;
  }

  return target.closest("a");
}

function findButtonText(target: EventTarget | null) {
  if (!(target instanceof Element)) {
    return "";
  }

  const interactive = target.closest("a, button");
  return cleanText(interactive?.textContent);
}

export default function AnalyticsEvents() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const link = findLink(event.target);
      const href = link?.getAttribute("href") || "";
      const label = findButtonText(event.target);
      const normalized = `${label} ${href}`.toLowerCase();

      if (href.startsWith("https://wa.me/") || href.includes("whatsapp")) {
        trackEvent("whatsapp_click", {
          event_category: "lead",
          event_label: label || "WhatsApp",
          link_url: href
        });
        return;
      }

      if (href.startsWith("mailto:")) {
        trackEvent("email_click", {
          event_category: "lead",
          event_label: label || href.replace("mailto:", ""),
          link_url: href
        });
        return;
      }

      if (
        normalized.includes("get a quote") ||
        normalized.includes("request quote") ||
        normalized.includes("request plate quote") ||
        normalized.includes("request dumbbell quote") ||
        normalized.includes("get factory price")
      ) {
        trackEvent("get_quote_click", {
          event_category: "lead",
          event_label: label || "Get Quote"
        });
      }

      if (
        normalized.includes("catalog") ||
        normalized.includes("download") ||
        href.toLowerCase().endsWith(".pdf")
      ) {
        trackEvent("download_catalog", {
          event_category: "content",
          event_label: label || "Catalog",
          link_url: href
        });
      }

      if (window.location.pathname.startsWith("/products/") && href === "/contact") {
        trackEvent("product_inquiry", {
          event_category: "lead",
          event_label: label || "Product Inquiry",
          product_path: window.location.pathname
        });
      }
    }

    function onSubmit(event: SubmitEvent) {
      const form = event.target;

      if (!(form instanceof HTMLFormElement)) {
        return;
      }

      trackEvent("contact_form_submit", {
        event_category: "lead",
        event_label: form.getAttribute("aria-label") || form.getAttribute("id") || "Contact Form"
      });
    }

    document.addEventListener("click", onClick);
    document.addEventListener("submit", onSubmit);

    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("submit", onSubmit);
    };
  }, []);

  return null;
}
