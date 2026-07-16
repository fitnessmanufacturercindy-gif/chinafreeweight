"use client";

import { usePathname } from "next/navigation";

export type PublishedRouteGroup = {
  routes: Partial<Record<"en" | "pt-BR" | "es", string>>;
};

const localeOptions = [
  { locale: "en" as const, hreflang: "en", shortLabel: "EN", ariaLabel: "English" },
  { locale: "pt-BR" as const, hreflang: "pt-BR", shortLabel: "PT", ariaLabel: "Português" },
  { locale: "es" as const, hreflang: "es", shortLabel: "ES", ariaLabel: "Español" }
];

function normalize(path: string) {
  if (path === "/") return path;
  return path.replace(/\/+$/, "");
}

export default function RouteLanguageSwitcherClient({ groups }: { groups: PublishedRouteGroup[] }) {
  const pathname = normalize(usePathname());
  const group = groups.find(({ routes }) => Object.values(routes).some((route) => route && normalize(route) === pathname));
  if (!group) return null;
  const available = localeOptions.filter(({ locale }) => group.routes[locale]);
  if (available.length < 2) return null;
  const currentLocale = available.find(({ locale }) => normalize(group.routes[locale]!) === pathname)?.locale;
  const ariaLabel = currentLocale === "pt-BR" ? "Seletor de idioma" : currentLocale === "es" ? "Selector de idioma" : "Language selector";

  return (
    <nav className="route-language-switcher" aria-label={ariaLabel}>
      {available.map((option, index) => (
        <span key={option.locale}>
          {index ? <span aria-hidden="true"> / </span> : null}
          <a
            href={group.routes[option.locale]}
            hrefLang={option.hreflang}
            lang={option.locale}
            aria-label={option.ariaLabel}
            aria-current={currentLocale === option.locale ? "page" : undefined}
          >
            {option.shortLabel}
          </a>
        </span>
      ))}
    </nav>
  );
}
