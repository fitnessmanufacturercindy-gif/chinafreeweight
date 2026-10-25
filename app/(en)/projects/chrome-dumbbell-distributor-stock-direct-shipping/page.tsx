import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LocalizedPageTemplate from "../../../components/i18n/LocalizedPageTemplate";
import { contentRepository } from "../../../../lib/content/repository";
import { buildLocalizedMetadata } from "../../../../lib/seo/metadata";
import { asJsonLdDocument, buildLocalizedSchemaGraph } from "../../../../lib/seo/schema";
import { siteName, siteUrl } from "../../../site";

const contentId = "case-chrome-dumbbell-distributor-fulfillment";

const keywords = [
  "Wholesale Chrome Dumbbells",
  "Chrome Dumbbell Manufacturer",
  "OEM Chrome Dumbbells",
  "Chrome Dumbbell Supplier",
  "Bulk Chrome Dumbbell Order",
  "Commercial Chrome Dumbbells",
  "Private Label Chrome Dumbbells",
  "Distributor Gym Equipment",
  "Direct Customer Delivery",
  "Gym Equipment Wholesale"
];

function getContent() {
  return contentRepository.getPublishedVersion(contentId, "en");
}

export function generateMetadata(): Metadata {
  const content = getContent();
  if (!content) return { robots: { index: false, follow: false } };
  return {
    ...buildLocalizedMetadata(content, contentRepository, siteUrl, siteName),
    keywords
  };
}

export default function ChromeDumbbellDistributorFulfillmentCasePage() {
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
