import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Equipamentos para Academia | Halteres, Anilhas e Bumper Plates",
  description: "Explore halteres, anilhas de peso e bumper plates profissionais direto do fabricante, com personalização OEM, private label, logo e embalagem própria.",
  alternates: { canonical: "/pt/products/", languages: { en: "/products/dumbbells", pt: "/pt/products/", "x-default": "/products/dumbbells" } }
};

const products = [
  { title: "Halteres profissionais", copy: "Halteres sextavados de borracha, redondos em PU e TPU, cromados e ajustáveis.", href: "/pt/products/dumbbells/", image: "/assets/pt/halteres-borracha-profissionais.webp", alt: "Halteres profissionais para academias" },
  { title: "Anilhas de peso", copy: "Anilhas olímpicas de borracha, ferro fundido, PU e TPU em KG ou LB.", href: "/pt/products/weight-plates/", image: "/assets/pt/anilhas-olimpicas-profissionais.webp", alt: "Anilhas olímpicas profissionais" },
  { title: "Bumper plates", copy: "Discos olímpicos para levantamento, boxes e áreas de treinamento funcional.", href: "/pt/products/bumper-plates/", image: "/assets/pt/bumper-plates-olimpicos.webp", alt: "Bumper plates olímpicos de borracha" }
];

export default function Page() {
  return <main className="product-page pt-page" lang="pt-BR"><section className="products-section pt-hub-hero"><div className="section-heading-wide"><div><span>Catálogo em português</span><h1>Equipamentos profissionais para academias</h1></div><p>Escolha uma categoria para conhecer aplicações, especificações, personalização OEM e respostas para compradores do Brasil e de Portugal.</p></div><div className="dumbbell-grid">{products.map((p) => <article className="dumbbell-card" key={p.href}><a href={p.href}><img src={p.image} alt={p.alt} /></a><div><span>Fabricante OEM</span><h2><a href={p.href}>{p.title}</a></h2><p>{p.copy}</p><a href={p.href}>Ver categoria <ArrowRight size={16} /></a></div></article>)}</div></section></main>;
}
