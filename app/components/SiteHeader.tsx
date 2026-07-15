import MegaMenu from "./MegaMenu";
import PublishedLanguageSwitcher from "./i18n/PublishedLanguageSwitcher";

export default function SiteHeader() {
  return (
    <header className="topbar global-topbar">
      <a className="brand" href="/">
        <img src="/assets/logo-readable.webp" alt="PowerBaseFit" />
      </a>
      <nav className="main-nav" aria-label="Primary navigation">
        <MegaMenu />
        <a href="/factory">Factory</a>
        <a href="/resources">Resources</a>
        <a href="/projects">Projects</a>
        <a href="/contact">Contact</a>
      </nav>
      <details className="mobile-nav-menu">
        <summary>Menu</summary>
        <div>
          <a href="/products/dumbbells">Dumbbells</a>
          <a href="/products/weight-plates">Weight Plates</a>
          <a href="/products/racks-benches">Racks & Benches</a>
          <a href="/products/gym-accessories">Gym Accessories</a>
          <a href="/factory">Factory</a>
          <a href="/resources">Resources</a>
          <a href="/projects">Projects</a>
          <a href="/contact">Contact</a>
        </div>
      </details>
      <PublishedLanguageSwitcher />
      <a className="topbar-cta" href="/contact">
        Get a Quote
      </a>
    </header>
  );
}
