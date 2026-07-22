import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LocalizedPageTemplate from "../../../components/i18n/LocalizedPageTemplate";
import { contentRepository } from "../../../../lib/content/repository";
import { buildLocalizedMetadata } from "../../../../lib/seo/metadata";
import { asJsonLdDocument, buildLocalizedSchemaGraph } from "../../../../lib/seo/schema";
import { siteName, siteUrl } from "../../../site";

type Props = { params: Promise<{ slug: string }> };
function resolve(slug: string) {
  const content = contentRepository.resolvePublishedPath("en", `/projects/${slug}`);
  return content?.entity.type === "case" ? content : undefined;
}
export function generateStaticParams() {
  return contentRepository.listPublished({ locale: "en", type: "case" }).map(({ version }) => ({ slug: version.slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const content = resolve((await params).slug);
  return content ? buildLocalizedMetadata(content, contentRepository, siteUrl, siteName) : {};
}
export default async function ProjectDetail({ params }: Props) {
  const content = resolve((await params).slug);
  if (!content) notFound();
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(asJsonLdDocument(buildLocalizedSchemaGraph(content, siteUrl))) }} /><LocalizedPageTemplate content={content} /></>;
}
