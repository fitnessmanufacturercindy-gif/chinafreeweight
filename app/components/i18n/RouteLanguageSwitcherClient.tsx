"use client";

import { usePathname } from "next/navigation";

export type PublishedRouteGroup = {
  routes: Partial<Record<"en" | "pt-BR" | "es" | "de" | "fr" | "vi" | "sv" | "it" | "ko", string>>;
};

type SwitcherVariant = "desktop" | "mobile";

const localeOptions = [
  { locale: "en" as const, hreflang: "en", label: "English" },
  { locale: "pt-BR" as const, hreflang: "pt", label: "Portugu\u00eas" },
  { locale: "es" as const, hreflang: "es", label: "Espa\u00f1ol" },
  { locale: "de" as const, hreflang: "de", label: "Deutsch" },
  { locale: "fr" as const, hreflang: "fr", label: "Français" },
  { locale: "vi" as const, hreflang: "vi", label: "Tiếng Việt" },
  { locale: "sv" as const, hreflang: "sv", label: "Svenska" },
  { locale: "it" as const, hreflang: "it", label: "Italiano" },
  { locale: "ko" as const, hreflang: "ko", label: "한국어" }
];

function normalize(path: string) {
  if (path === "/") return path;
  return path.replace(/\/+$/, "");
}

function localeFromPath(pathname: string) {
  if (pathname === "/pt" || pathname.startsWith("/pt/")) return "pt-BR" as const;
  if (pathname === "/es" || pathname.startsWith("/es/")) return "es" as const;
  if (pathname === "/de" || pathname.startsWith("/de/")) return "de" as const;
  if (pathname === "/fr" || pathname.startsWith("/fr/")) return "fr" as const;
  if (pathname === "/vi" || pathname.startsWith("/vi/")) return "vi" as const;
  if (pathname === "/sv" || pathname.startsWith("/sv/")) return "sv" as const;
  if (pathname === "/it" || pathname.startsWith("/it/")) return "it" as const;
  if (pathname === "/ko" || pathname.startsWith("/ko/")) return "ko" as const;
  return "en" as const;
}

export default function RouteLanguageSwitcherClient({
  groups,
  variant = "desktop"
}: {
  groups: PublishedRouteGroup[];
  variant?: SwitcherVariant;
}) {
  const pathname = normalize(usePathname());
  const group = groups.find(({ routes }) =>
    Object.values(routes).some((route) => route && normalize(route) === pathname)
  );
  const currentLocale = localeFromPath(pathname);
  const currentLabel =
    localeOptions.find(({ locale }) => locale === currentLocale)?.label ?? "English";
  const ariaLabel =
    currentLocale === "pt-BR"
      ? "Seletor de idioma"
      : currentLocale === "es"
        ? "Selector de idioma"
        : currentLocale === "de"
          ? "Sprachauswahl"
          : currentLocale === "fr"
            ? "Sélecteur de langue"
          : currentLocale === "vi"
            ? "Bộ chọn ngôn ngữ"
          : currentLocale === "sv"
            ? "Språkväljare"
          : currentLocale === "it"
            ? "Selettore lingua"
          : currentLocale === "ko"
            ? "언어 선택"
          : "Language selector";

  const options = (
    <ul className="route-language-options">
      {localeOptions.map((option) => {
        const target = group?.routes[option.locale];
        const isCurrent = currentLocale === option.locale;

        return (
          <li key={option.locale}>
            {target ? (
              <a
                href={target}
                hrefLang={option.hreflang}
                lang={option.locale}
                aria-current={isCurrent ? "page" : undefined}
              >
                {option.label}
              </a>
            ) : (
              <span aria-disabled="true" title="This page is not yet available in this language">
                {option.label}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );

  if (variant === "mobile") {
    return (
      <nav className="route-language-switcher route-language-switcher--mobile" aria-label={ariaLabel}>
        <strong>Language</strong>
        {options}
      </nav>
    );
  }

  return (
    <details className="route-language-switcher route-language-switcher--desktop">
      <summary aria-label={ariaLabel}>
        <span aria-hidden="true">{"\u{1F310}"}</span>
        <span>{currentLabel}</span>
        <span className="route-language-chevron" aria-hidden="true">{"\u25BE"}</span>
      </summary>
      {options}
    </details>
  );
}
