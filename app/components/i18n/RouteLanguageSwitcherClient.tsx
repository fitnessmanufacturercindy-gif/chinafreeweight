"use client";

import { usePathname } from "next/navigation";

export type PublishedRoutePair = { en: string; pt: string };

function normalize(path: string) {
  if (path === "/") return path;
  return path.replace(/\/+$/, "");
}

export default function RouteLanguageSwitcherClient({ pairs }: { pairs: PublishedRoutePair[] }) {
  const pathname = normalize(usePathname());
  const pair = pairs.find((item) => normalize(item.en) === pathname || normalize(item.pt) === pathname);
  if (!pair) return null;
  const portuguese = normalize(pair.pt) === pathname;

  return (
    <nav className="route-language-switcher" aria-label={portuguese ? "Seletor de idioma" : "Language selector"}>
      <a href={pair.en} hrefLang="en" lang="en" aria-current={!portuguese ? "page" : undefined}>EN</a>
      <span aria-hidden="true">/</span>
      <a href={pair.pt} hrefLang="pt-BR" lang="pt-BR" aria-current={portuguese ? "page" : undefined}>PT</a>
    </nav>
  );
}
