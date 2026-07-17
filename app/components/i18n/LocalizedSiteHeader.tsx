import type { InternalLocale } from "../../../i18n/locale-registry";
import PublishedLanguageSwitcher from "./PublishedLanguageSwitcher";

export default function LocalizedSiteHeader({ locale }: { locale: InternalLocale }) {
  if (locale !== "pt-BR" && locale !== "es") return null;
  const spanish = locale === "es";
  const prefix = spanish ? "/es" : "/pt";
  const links = spanish
    ? [
        ["/productos/mancuernas", "Mancuernas"],
        ["/productos/discos-de-peso", "Discos"],
        ["/fabrica", "Fábrica"],
        ["/blog", "Contenido"],
        ["/proyectos", "Proyectos"],
        ["/contacto", "Contacto"]
      ]
    : [
        ["/produtos/halteres", "Halteres"],
        ["/produtos/anilhas", "Anilhas"],
        ["/fabrica", "Fábrica"],
        ["/blog", "Conteúdo"],
        ["/projetos", "Projetos"],
        ["/contato", "Contato"]
      ];

  return (
    <header className="topbar global-topbar">
      <a className="brand" href={prefix}><img src="/assets/logo-readable.webp" alt="PowerBaseFit" /></a>
      <nav className="main-nav" aria-label={spanish ? "Navegación principal" : "Navegação principal"}>
        {links.map(([path, label]) => <a key={path} href={`${prefix}${path}`}>{label}</a>)}
      </nav>
      <details className="mobile-nav-menu">
        <summary>Menu</summary>
        <div>
          {links.map(([path, label]) => <a key={path} href={`${prefix}${path}`}>{label}</a>)}
          <PublishedLanguageSwitcher variant="mobile" />
        </div>
      </details>
      <PublishedLanguageSwitcher variant="desktop" />
      <a className="topbar-cta" href={`${prefix}/${spanish ? "contacto" : "contato"}`}>{spanish ? "Solicitar cotización" : "Solicitar cotação"}</a>
    </header>
  );
}
