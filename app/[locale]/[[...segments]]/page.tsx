import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LocalizedPageTemplate from "../../components/i18n/LocalizedPageTemplate";
import { getLocaleByInternalLocale, getLocaleByRouteLocale } from "../../../i18n/locale-registry";
import { contentRepository } from "../../../lib/content/repository";
import { buildLocalizedMetadata } from "../../../lib/seo/metadata";
import { asJsonLdDocument, buildLocalizedSchemaGraph } from "../../../lib/seo/schema";
import { siteName, siteUrl } from "../../site";

type LocalizedPageProps = {
  params: Promise<{ locale: string; segments?: string[] }>;
};

export function generateStaticParams() {
  return contentRepository.listPublished().flatMap(({ version }) => {
    if (version.locale === "en") return [];
    const definition = getLocaleByInternalLocale(version.locale);
    if (!definition?.public) return [];
    return [{
      locale: definition.routeLocale,
      segments: version.publicPath.split("/").filter(Boolean).slice(1)
    }];
  });
}

function pathFromParams(locale: string, segments: string[] | undefined): string {
  return `/${[locale, ...(segments ?? [])].join("/")}`;
}

async function resolveContent(params: LocalizedPageProps["params"]) {
  const { locale, segments } = await params;
  const definition = getLocaleByRouteLocale(locale);
  if (!definition || definition.default || !definition.public) return undefined;
  return contentRepository.resolvePublishedPath(definition.internalLocale, pathFromParams(locale, segments));
}

export async function generateMetadata({ params }: LocalizedPageProps): Promise<Metadata> {
  const content = await resolveContent(params);
  if (!content) return { robots: { index: false, follow: false } };
  return buildLocalizedMetadata(content, contentRepository, siteUrl, siteName);
}

export default async function LocalizedPage({ params }: LocalizedPageProps) {
  const content = await resolveContent(params);
  if (!content) notFound();

  const jsonLd = asJsonLdDocument(buildLocalizedSchemaGraph(content, siteUrl));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <LocalizedPageTemplate content={content} />
    </>
  );
}
