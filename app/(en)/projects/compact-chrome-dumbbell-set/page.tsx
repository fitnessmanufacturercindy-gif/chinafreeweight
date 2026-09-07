import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LocalizedPageTemplate from "../../../components/i18n/LocalizedPageTemplate";
import { contentRepository } from "../../../../lib/content/repository";
import { buildLocalizedMetadata } from "../../../../lib/seo/metadata";
import { asJsonLdDocument, buildLocalizedSchemaGraph } from "../../../../lib/seo/schema";
import { siteName, siteUrl } from "../../../site";

const contentId = "case-compact-chrome-dumbbell-set";

function getContent() {
  return contentRepository.getPublishedVersion(contentId, "en");
}

export function generateMetadata(): Metadata {
  const content = getContent();
  return content
    ? buildLocalizedMetadata(content, contentRepository, siteUrl, siteName)
    : { robots: { index: false, follow: false } };
}

export default function CompactChromeDumbbellCasePage() {
  const content = getContent();
  if (!content) notFound();
  const jsonLd = asJsonLdDocument(buildLocalizedSchemaGraph(content, siteUrl));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <LocalizedPageTemplate content={content} />
    </>
  );
}
