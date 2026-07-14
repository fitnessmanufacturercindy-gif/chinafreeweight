import type { Metadata } from "next";
import { BookOpen, Factory } from "lucide-react";
import { siteUrl } from "../../site";
import { ptBlogPosts } from "./blogData";

export const metadata: Metadata = {
  title: "Blog sobre Equipamentos Fitness, OEM e Academias | PowerBaseFit",
  description: "Guias em português sobre halteres, anilhas, bumper plates, fornecedores, equipamentos profissionais para academias, OEM, private label e importação B2B.",
  alternates: { canonical: "/pt/blog/", languages: { en: "/resources", pt: "/pt/blog/", "x-default": "/resources" } }
};

export default function Page() {
  const schema = { "@context": "https://schema.org", "@type": "Blog", name: "Blog PowerBaseFit em português", url: `${siteUrl}/pt/blog/`, inLanguage: "pt-BR", blogPost: ptBlogPosts.map((post) => ({ "@type": "BlogPosting", headline: post.title, url: `${siteUrl}/pt/blog/${post.slug}/`, author: { "@type": "Person", name: post.author }, datePublished: post.publishedAt })) };
  return <main className="product-page pt-page" lang="pt-BR"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><section className="products-section pt-hub-hero"><div className="section-heading-wide"><div><span>Conteúdo para compradores B2B</span><h1>Blog de equipamentos fitness e compras profissionais</h1></div><p>Esta área está preparada para artigos com título, meta description, slug, categoria, autor, FAQ, dados estruturados e links internos. Os primeiros guias em português serão publicados aqui após revisão editorial.</p></div><div className="faq-list"><article><BookOpen size={22} /><h2>Guias de produtos</h2><p>Comparações de materiais, faixas de peso e critérios para escolher halteres, anilhas e bumper plates.</p></article><article><Factory size={22} /><h2>OEM e fornecedores</h2><p>Conteúdo para avaliar fabricantes, planejar marca própria, embalagem, inspeção e pedidos internacionais.</p></article></div><div className="pt-blog-links"><a href="/pt/products/dumbbells/">Conhecer halteres profissionais</a><a href="/pt/products/weight-plates/">Conhecer anilhas olímpicas</a><a href="/pt/oem-private-label/">Entender OEM e marca própria</a></div></section></main>;
}
