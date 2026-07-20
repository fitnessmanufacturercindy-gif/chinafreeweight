import type { InternalLocale } from "../../../i18n/locale-registry";
import PublishedLanguageSwitcher from "./PublishedLanguageSwitcher";

const navigation = {
  "pt-BR": {
    prefix: "/pt", aria: "Navegação principal", quote: "Solicitar cotação", contact: "/contato",
    links: [["/produtos/halteres", "Halteres"], ["/produtos/anilhas", "Anilhas"], ["/fabrica", "Fábrica"], ["/blog", "Conteúdo"], ["/projetos", "Projetos"], ["/contato", "Contato"]]
  },
  es: {
    prefix: "/es", aria: "Navegación principal", quote: "Solicitar cotización", contact: "/contacto",
    links: [["/productos/mancuernas", "Mancuernas"], ["/productos/discos-de-peso", "Discos"], ["/fabrica", "Fábrica"], ["/blog", "Contenido"], ["/proyectos", "Proyectos"], ["/contacto", "Contacto"]]
  },
  de: {
    prefix: "/de", aria: "Hauptnavigation", quote: "Angebot anfordern", contact: "/kontakt",
    links: [["/produkte/kurzhanteln", "Kurzhanteln"], ["/produkte/gewichtsscheiben", "Gewichtsscheiben"], ["/fabrik", "Fabrik"], ["/blog", "Ratgeber"], ["/projekte", "Projekte"], ["/kontakt", "Kontakt"]]
  },
  fr: {
    prefix: "/fr", aria: "Navigation principale", quote: "Demander un devis", contact: "/contact",
    links: [["/produits/halteres", "Haltères"], ["/produits/disques-musculation", "Disques"], ["/usine", "Usine"], ["/blog", "Guides"], ["/projets", "Projets"], ["/contact", "Contact"]]
  }
} as const;

export default function LocalizedSiteHeader({ locale }: { locale: InternalLocale }) {
  if (locale !== "pt-BR" && locale !== "es" && locale !== "de" && locale !== "fr") return null;
  const copy = navigation[locale];

  return (
    <header className="topbar global-topbar">
      <a className="brand" href={copy.prefix}><img src="/assets/logo-readable.webp" alt="PowerBaseFit" /></a>
      <nav className="main-nav" aria-label={copy.aria}>
        {copy.links.map(([path, label]) => <a key={path} href={`${copy.prefix}${path}`}>{label}</a>)}
      </nav>
      <details className="mobile-nav-menu">
        <summary>Menu</summary>
        <div>
          {copy.links.map(([path, label]) => <a key={path} href={`${copy.prefix}${path}`}>{label}</a>)}
          <PublishedLanguageSwitcher variant="mobile" />
        </div>
      </details>
      <PublishedLanguageSwitcher variant="desktop" />
      <a className="topbar-cta" href={`${copy.prefix}${copy.contact}`}>{copy.quote}</a>
    </header>
  );
}
