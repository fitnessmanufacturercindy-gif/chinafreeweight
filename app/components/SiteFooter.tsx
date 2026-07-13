"use client";

import { usePathname } from "next/navigation";
import { company } from "../site";

export default function SiteFooter() {
  const pathname = usePathname();
  const isPortuguese = pathname === "/pt" || pathname.startsWith("/pt/");
  return (
    <footer className="footer global-footer" lang={isPortuguese ? "pt-BR" : "en"}>
      <img className="footer-logo" src="/assets/logo-readable.png" alt="PowerBaseFit" />
      <div><strong>{company.legalName}</strong><span>{company.address}</span><span>{isPortuguese ? `Desde ${company.founded} · fábrica de ${company.factorySize}` : `Since ${company.founded} · ${company.factorySize} factory`}</span><span>Email: {company.email} · WhatsApp: {company.whatsapp}</span></div>
      <div className="footer-links">
        {isPortuguese ? <><a href="/pt/products/">Produtos</a><a href="/pt/oem-private-label/">OEM</a><a href="/pt/factory/">Fábrica</a><a href="/pt/blog/">Blog</a><a href="/contact">Contato</a></> : <><a href="/products/dumbbells">Products</a><a href="/factory">Factory</a><a href="/resources">Resources</a><a href="/projects">Projects</a><a href="/contact">Contact</a></>}
      </div>
    </footer>
  );
}
