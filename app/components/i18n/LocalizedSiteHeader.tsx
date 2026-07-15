import type { InternalLocale } from "../../../i18n/locale-registry";
import PublishedLanguageSwitcher from "./PublishedLanguageSwitcher";

export default function LocalizedSiteHeader({ locale }: { locale: InternalLocale }) {
  if (locale !== "pt-BR") return null;

  return (
    <header className="topbar global-topbar">
      <a className="brand" href="/pt"><img src="/assets/logo-readable.webp" alt="PowerBaseFit" /></a>
      <nav className="main-nav" aria-label="Navegação principal">
        <a href="/pt/produtos/halteres">Halteres</a>
        <a href="/pt/produtos/anilhas">Anilhas</a>
        <a href="/pt/fabrica">Fábrica</a>
        <a href="/pt/blog">Conteúdo</a>
        <a href="/pt/projetos">Projetos</a>
        <a href="/pt/contato">Contato</a>
      </nav>
      <details className="mobile-nav-menu">
        <summary>Menu</summary>
        <div>
          <a href="/pt/produtos/halteres">Halteres</a>
          <a href="/pt/produtos/anilhas">Anilhas</a>
          <a href="/pt/fabrica">Fábrica</a>
          <a href="/pt/blog">Conteúdo</a>
          <a href="/pt/projetos">Projetos</a>
          <a href="/pt/contato">Contato</a>
        </div>
      </details>
      <PublishedLanguageSwitcher />
      <a className="topbar-cta" href="/pt/contato">Solicitar cotação</a>
    </header>
  );
}
