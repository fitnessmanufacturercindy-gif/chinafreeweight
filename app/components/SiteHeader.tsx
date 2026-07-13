"use client";

import { usePathname } from "next/navigation";
import MegaMenu from "./MegaMenu";

export default function SiteHeader() {
  const pathname = usePathname();
  const isPortuguese = pathname === "/pt" || pathname.startsWith("/pt/");

  if (isPortuguese) {
    return (
      <header className="topbar global-topbar" lang="pt-BR">
        <a className="brand" href="/pt/"><img src="/assets/logo-readable.png" alt="PowerBaseFit" /></a>
        <nav className="main-nav" aria-label="Navegação principal">
          <a href="/pt/products/">Produtos</a><a href="/pt/oem-private-label/">OEM e marca própria</a>
          <a href="/pt/factory/">Fábrica</a><a href="/pt/blog/">Blog</a><a href="/">English</a>
        </nav>
        <details className="mobile-nav-menu"><summary>Menu</summary><div>
          <a href="/pt/products/">Produtos</a><a href="/pt/products/dumbbells/">Halteres</a><a href="/pt/products/weight-plates/">Anilhas</a>
          <a href="/pt/products/bumper-plates/">Bumper plates</a><a href="/pt/oem-private-label/">OEM e marca própria</a><a href="/pt/factory/">Fábrica</a><a href="/pt/blog/">Blog</a><a href="/">English</a>
        </div></details>
        <a className="topbar-cta" href="/contact">Solicitar cotação</a>
      </header>
    );
  }

  return (
    <header className="topbar global-topbar">
      <a className="brand" href="/"><img src="/assets/logo-readable.png" alt="PowerBaseFit" /></a>
      <nav className="main-nav" aria-label="Primary navigation"><MegaMenu /><a href="/factory">Factory</a><a href="/resources">Resources</a><a href="/projects">Projects</a><a href="/contact">Contact</a></nav>
      <details className="mobile-nav-menu"><summary>Menu</summary><div><a href="/products/dumbbells">Dumbbells</a><a href="/products/weight-plates">Weight Plates</a><a href="/products/racks-benches">Racks &amp; Benches</a><a href="/products/gym-accessories">Gym Accessories</a><a href="/factory">Factory</a><a href="/resources">Resources</a><a href="/projects">Projects</a><a href="/contact">Contact</a></div></details>
      <a className="topbar-cta" href="/contact">Get a Quote</a>
    </header>
  );
}
