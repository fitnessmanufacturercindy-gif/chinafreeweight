import { kgLbFreeWeightEnglishPost } from "../../content/i18n/kg-lb-free-weight-units-guide";
import { fixedVsAdjustableEnglishPost } from "../../content/i18n/fixed-vs-adjustable-dumbbells-guide";
import { barbellFinishEnglishPost } from "../../content/i18n/barbell-finish-guide";
import { plateBarFitEnglishPost } from "../../content/i18n/plate-bar-fit-guide";
import { barbellKnurlingEnglishPost } from "../../content/i18n/barbell-knurling-guide";
import fs from "fs";
import path from "path";
import { getMultilingualBlogDocuments } from "../../lib/content/multilingual-blog-files";
import { commercialGrowthEnglishPosts } from "../../content/i18n/commercial-growth-blogs";
import { steelDumbbellEnglishPost } from "../../content/i18n/steel-dumbbell-oem-blog";
import { cableAttachmentEnglishPost } from "../../content/i18n/cable-attachment-compatibility-guide";
import { weightPlateToleranceEnglishPost } from "../../content/i18n/weight-plate-tolerance-guide";
import { commercialOlympicBarbellEnglishPost } from "../../content/i18n/commercial-olympic-barbell-guide";
import { dumbbellHeadRetentionEnglishPost } from "../../content/i18n/dumbbell-head-retention-guide";

export type ResourcePost = {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  searchIntent: string;
  content: string;
  excerpt: string;
  readingTime: string;
  coverImage: string;
  coverAlt: string;
  coverWidth?: number;
  coverHeight?: number;
  articleImages: ResourceImage[];
  publishedAt: string;
  updatedAt: string;
};

export type ResourceImage = {
  src: string;
  alt: string;
  caption: string;
  width?: number;
  height?: number;
};

const postsDirectory = path.join(process.cwd(), "content", "resources");

const postVisuals: Record<
  string,
  {
    coverImage: string;
    coverAlt: string;
    articleImages: ResourceImage[];
  }
> = {
  "do-dumbbells-help-with-bone-density": {
    coverImage: "/assets/resources/bone-density-dumbbells-hero.webp",
    coverAlt: "Adult performing controlled dumbbell resistance training in a premium commercial gym",
    articleImages: [
      {
        src: "/assets/resources/bone-density-dumbbells-guide.webp",
        alt: "Educational view of safe dumbbell exercises that load the hips spine and arms",
        caption: "A balanced dumbbell program combines lower-body, upper-body, and loaded-carry patterns while progressing gradually."
      }
    ]
  },
  "why-is-it-called-a-dumbbell": {
    coverImage: "/assets/resources/dumbbell-name-history-hero.webp",
    coverAlt: "Modern dumbbells arranged beside a subtle historic bell-ringing training setting",
    articleImages: [
      {
        src: "/assets/resources/dumbbell-name-history-guide.webp",
        alt: "Visual timeline from a silent bell training apparatus to a modern fixed dumbbell",
        caption: "The name moved from a silent bell-ringing exercise machine to the compact hand weight used today."
      }
    ]
  },
  "can-i-build-muscle-with-only-dumbbells": {
    coverImage: "/assets/resources/dumbbell-muscle-building-hero.webp",
    coverAlt: "Athlete training the full body with dumbbells in a commercial strength area",
    articleImages: [
      {
        src: "/assets/resources/dumbbell-muscle-building-guide.webp",
        alt: "Dumbbell-only muscle building movements for push pull squat hinge and carry patterns",
        caption: "Dumbbells can cover every major movement pattern when load, range of motion, and weekly volume are progressed."
      }
    ]
  },
  "how-are-bumper-plates-made": {
    coverImage: "/assets/resources/bumper-plate-manufacturing-hero.webp",
    coverAlt: "Bumper plates and molding equipment inside a modern free weight factory",
    articleImages: [
      {
        src: "/assets/resources/bumper-plate-manufacturing-guide.webp",
        alt: "Bumper plate production stages from rubber preparation through molding and quality inspection",
        caption: "Material control, molding conditions, insert fit, weight verification, and finishing all affect a bumper plate's consistency."
      }
    ]
  },
  "how-are-dumbbells-weighed": {
    coverImage: "/assets/resources/dumbbell-weight-qc-hero.webp",
    coverAlt: "Technician checking a finished dumbbell on a calibrated industrial scale",
    articleImages: [
      {
        src: "/assets/resources/dumbbell-weight-qc-guide.webp",
        alt: "Dumbbell quality control station with reference weights digital scale and inspection record",
        caption: "Reliable weight control starts with a verified scale and continues through sampling, recording, and corrective action."
      }
    ]
  },
  "evaluate-oem-gym-equipment-factory-china": {
    coverImage: "/assets/factory.avif",
    coverAlt: "PowerBaseFit factory exterior in Dezhou China",
    articleImages: [
      {
        src: "/assets/factory.avif",
        alt: "PowerBaseFit manufacturing base exterior for OEM gym equipment buyers",
        caption: "Factory exterior and manufacturing base for overseas free weight buyers."
      },
      {
        src: "/assets/factory-process/dumbbell-cutting.webp",
        alt: "Precision cutting line for dumbbell and free weight manufacturing",
        caption: "Precision manufacturing equipment helps buyers evaluate factory process control."
      },
      {
        src: "/assets/factory-cases/packaging-area-pbf.avif",
        alt: "PowerBaseFit free weight packaging area before export shipment",
        caption: "Packaging and shipment preparation are important checks before container loading."
      }
    ]
  },
  "how-to-choose-commercial-dumbbells": {
    coverImage: "/assets/project-dumbbell-zone.avif",
    coverAlt: "Commercial gym dumbbell area with rows of free weights",
    articleImages: [
      {
        src: "/assets/hex-dumbbells.avif",
        alt: "Hex dumbbells for commercial gyms and wholesale free weight programs",
        caption: "Hex dumbbells are common for commercial gyms, dealers, and starter free weight lines."
      },
      {
        src: "/assets/chrome-dumbbell.webp",
        alt: "Chrome dumbbells with polished finish and knurled handles",
        caption: "Chrome dumbbells are often selected for premium showrooms and high-end gym areas."
      },
      {
        src: "/assets/dumbbell-production.avif",
        alt: "Finished dumbbells arranged in factory production area",
        caption: "Production consistency, finish quality, and packaging planning should be checked before shipment."
      }
    ]
  },
  "weight-plates-vs-bumper-plates-b2b-guide": {
    coverImage: "/assets/project-plate-zone.avif",
    coverAlt: "Commercial weight plate and barbell training area",
    articleImages: [
      {
        src: "/assets/weight-plate.avif",
        alt: "Black weight plates with color weight markings for gym projects",
        caption: "Standard weight plates are often used for strength zones, dealers, and mixed equipment orders."
      },
      {
        src: "/assets/factory-process/plate-surface-treatment.webp",
        alt: "Weight plate surface treatment process in factory workshop",
        caption: "Surface treatment and finish inspection affect long-term appearance and durability."
      },
      {
        src: "/assets/factory-cases/container-shipping-pbf.avif",
        alt: "Container loading and export shipment for free weight equipment",
        caption: "For plate orders, packaging and container planning protect the product during export shipping."
      }
    ]
  }
};

const fallbackVisuals = {
  coverImage: "/assets/case-gym.avif",
  coverAlt: "PowerBaseFit free weight product display",
  articleImages: [
    {
      src: "/assets/case-gym.avif",
      alt: "PowerBaseFit free weight project display",
      caption: "Project reference image for free weight sourcing decisions."
    }
  ]
};

function readFrontmatter(source: string) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);

  if (!match) {
    return { data: {} as Record<string, string>, content: source };
  }

  const data: Record<string, string> = {};
  const frontmatter = match[1];

  for (const line of frontmatter.split("\n")) {
    const separatorIndex = line.indexOf(":");
    if (separatorIndex === -1 || line.startsWith("  -")) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim().replace(/^"|"$/g, "");
    data[key] = value;
  }

  return { data, content: match[2].trim() };
}

function parseKeywordList(value?: string) {
  return (value || "")
    .split(",")
    .map((keyword) => keyword.trim())
    .filter(Boolean);
}

function getExcerpt(content: string) {
  const paragraph =
    content
      .split("\n")
      .find((line) => line.trim() && !line.startsWith("#")) || "";

  return paragraph.replace(/\*\*/g, "").slice(0, 190);
}

function getPublicArticleContent(content: string) {
  return content
    .split(/^## Image Planning and AI Image Prompts$/m)[0]
    .split(/^## CTA and Inquiry Popup Plan$/m)[0]
    .trim();
}

function getTitle(content: string) {
  const h1 = content.match(/^# (.+)$/m);
  return h1?.[1] || "PowerBaseFit Resource";
}

function getReadingTime(content: string) {
  const words = content.match(/\b[\w'-]+\b/g)?.length || 0;
  return `${Math.max(1, Math.round(words / 220))} min read`;
}

export function getAllPosts(): ResourcePost[] {
  const legacyPosts = fs.existsSync(postsDirectory) ? fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(postsDirectory, file), "utf8");
      const { data, content } = readFrontmatter(raw);
      const publicContent = getPublicArticleContent(content);

      return {
        slug,
        title: getTitle(publicContent),
        seoTitle: data.seo_title || getTitle(publicContent),
        metaDescription: data.meta_description || getExcerpt(publicContent),
        primaryKeyword: data.primary_keyword || "free weight equipment",
        secondaryKeywords: parseKeywordList(data.secondary_keywords),
        searchIntent: data.search_intent || "B2B buyer education",
        content: publicContent,
        excerpt: getExcerpt(publicContent),
        readingTime: getReadingTime(publicContent),
        publishedAt: data.published_at || "2026-07-16",
        updatedAt: data.updated_at || data.published_at || "2026-07-16",
        ...(postVisuals[slug] || fallbackVisuals)
      };
    }) : [];

  const expansionPosts = getMultilingualBlogDocuments()
    .filter((document) => document.locale === "en")
    .map((document): ResourcePost => ({
      slug: document.publicPath.split("/").filter(Boolean).at(-1) ?? document.entityId,
      title: document.h1,
      seoTitle: document.title,
      metaDescription: document.description,
      primaryKeyword: document.primaryKeyword,
      secondaryKeywords: document.secondaryKeywords,
      searchIntent: document.searchIntent,
      content: document.content,
      excerpt: getExcerpt(document.content),
      readingTime: getReadingTime(document.content),
      coverImage: document.images[0].src,
      coverAlt: document.images[0].alt,
      articleImages: document.images.slice(1).map((image) => ({
        src: image.src,
        alt: image.alt,
        caption: image.caption
      })),
      publishedAt: document.publishedAt,
      updatedAt: document.updatedAt
    }));

  const commercialGrowthPosts = commercialGrowthEnglishPosts.map((document): ResourcePost => ({
    slug: document.publicPath.split("/").filter(Boolean).at(-1) ?? document.entityId,
    title: document.h1,
    seoTitle: document.title,
    metaDescription: document.description,
    primaryKeyword: document.primaryKeyword,
    secondaryKeywords: document.secondaryKeywords,
    searchIntent: document.searchIntent,
    content: document.content,
    excerpt: getExcerpt(document.content),
    readingTime: getReadingTime(document.content),
    coverImage: document.images[0].src,
    coverAlt: document.images[0].alt,
    articleImages: document.images.slice(1).map((image) => ({
      src: image.src,
      alt: image.alt,
      caption: image.caption ?? image.alt
    })),
    publishedAt: document.publishedAt,
    updatedAt: document.updatedAt
  }));

  const steelDumbbellPost: ResourcePost = {
    slug: steelDumbbellEnglishPost.publicPath.split("/").filter(Boolean).at(-1) ?? steelDumbbellEnglishPost.entityId,
    title: steelDumbbellEnglishPost.h1,
    seoTitle: steelDumbbellEnglishPost.title,
    metaDescription: steelDumbbellEnglishPost.description,
    primaryKeyword: steelDumbbellEnglishPost.primaryKeyword,
    secondaryKeywords: steelDumbbellEnglishPost.secondaryKeywords,
    searchIntent: steelDumbbellEnglishPost.searchIntent,
    content: steelDumbbellEnglishPost.content,
    excerpt: getExcerpt(steelDumbbellEnglishPost.content),
    readingTime: getReadingTime(steelDumbbellEnglishPost.content),
    coverImage: steelDumbbellEnglishPost.images[0].src,
    coverAlt: steelDumbbellEnglishPost.images[0].alt,
    coverWidth: steelDumbbellEnglishPost.images[0].width,
    coverHeight: steelDumbbellEnglishPost.images[0].height,
    articleImages: steelDumbbellEnglishPost.images.slice(1).map((image) => ({
      src: image.src,
      alt: image.alt,
      caption: image.caption ?? image.alt,
      width: image.width,
      height: image.height
    })),
    publishedAt: steelDumbbellEnglishPost.publishedAt,
    updatedAt: steelDumbbellEnglishPost.updatedAt
  };

  const cableAttachmentPost: ResourcePost = {
    slug: cableAttachmentEnglishPost.publicPath.split("/").filter(Boolean).at(-1) ?? cableAttachmentEnglishPost.entityId,
    title: cableAttachmentEnglishPost.h1,
    seoTitle: cableAttachmentEnglishPost.title,
    metaDescription: cableAttachmentEnglishPost.description,
    primaryKeyword: cableAttachmentEnglishPost.primaryKeyword,
    secondaryKeywords: cableAttachmentEnglishPost.secondaryKeywords,
    searchIntent: cableAttachmentEnglishPost.searchIntent,
    content: cableAttachmentEnglishPost.content,
    excerpt: getExcerpt(cableAttachmentEnglishPost.content),
    readingTime: getReadingTime(cableAttachmentEnglishPost.content),
    coverImage: cableAttachmentEnglishPost.images[0].src,
    coverAlt: cableAttachmentEnglishPost.images[0].alt,
    coverWidth: cableAttachmentEnglishPost.images[0].width,
    coverHeight: cableAttachmentEnglishPost.images[0].height,
    articleImages: cableAttachmentEnglishPost.images.slice(1).map((image) => ({
      src: image.src,
      alt: image.alt,
      caption: image.caption ?? image.alt,
      width: image.width,
      height: image.height
    })),
    publishedAt: cableAttachmentEnglishPost.publishedAt,
    updatedAt: cableAttachmentEnglishPost.updatedAt
  };

  const weightPlateTolerancePost: ResourcePost = {
    slug: weightPlateToleranceEnglishPost.publicPath.split("/").filter(Boolean).at(-1) ?? weightPlateToleranceEnglishPost.entityId,
    title: weightPlateToleranceEnglishPost.h1,
    seoTitle: weightPlateToleranceEnglishPost.title,
    metaDescription: weightPlateToleranceEnglishPost.description,
    primaryKeyword: weightPlateToleranceEnglishPost.primaryKeyword,
    secondaryKeywords: weightPlateToleranceEnglishPost.secondaryKeywords,
    searchIntent: weightPlateToleranceEnglishPost.searchIntent,
    content: weightPlateToleranceEnglishPost.content,
    excerpt: getExcerpt(weightPlateToleranceEnglishPost.content),
    readingTime: getReadingTime(weightPlateToleranceEnglishPost.content),
    coverImage: weightPlateToleranceEnglishPost.images[0].src,
    coverAlt: weightPlateToleranceEnglishPost.images[0].alt,
    coverWidth: weightPlateToleranceEnglishPost.images[0].width,
    coverHeight: weightPlateToleranceEnglishPost.images[0].height,
    articleImages: weightPlateToleranceEnglishPost.images.slice(1).map((image) => ({
      src: image.src,
      alt: image.alt,
      caption: image.caption ?? image.alt,
      width: image.width,
      height: image.height
    })),
    publishedAt: weightPlateToleranceEnglishPost.publishedAt,
    updatedAt: weightPlateToleranceEnglishPost.updatedAt
  };

  const commercialOlympicBarbellPost: ResourcePost = {
    slug: commercialOlympicBarbellEnglishPost.publicPath.split("/").filter(Boolean).at(-1) ?? commercialOlympicBarbellEnglishPost.entityId,
    title: commercialOlympicBarbellEnglishPost.h1,
    seoTitle: commercialOlympicBarbellEnglishPost.title,
    metaDescription: commercialOlympicBarbellEnglishPost.description,
    primaryKeyword: commercialOlympicBarbellEnglishPost.primaryKeyword,
    secondaryKeywords: commercialOlympicBarbellEnglishPost.secondaryKeywords,
    searchIntent: commercialOlympicBarbellEnglishPost.searchIntent,
    content: commercialOlympicBarbellEnglishPost.content,
    excerpt: getExcerpt(commercialOlympicBarbellEnglishPost.content),
    readingTime: getReadingTime(commercialOlympicBarbellEnglishPost.content),
    coverImage: commercialOlympicBarbellEnglishPost.images[0].src,
    coverAlt: commercialOlympicBarbellEnglishPost.images[0].alt,
    coverWidth: commercialOlympicBarbellEnglishPost.images[0].width,
    coverHeight: commercialOlympicBarbellEnglishPost.images[0].height,
    articleImages: commercialOlympicBarbellEnglishPost.images.slice(1).map((image) => ({
      src: image.src,
      alt: image.alt,
      caption: image.caption ?? image.alt,
      width: image.width,
      height: image.height
    })),
    publishedAt: commercialOlympicBarbellEnglishPost.publishedAt,
    updatedAt: commercialOlympicBarbellEnglishPost.updatedAt
  };

  const dumbbellHeadRetentionPost: ResourcePost = {
    slug: dumbbellHeadRetentionEnglishPost.publicPath.split("/").filter(Boolean).at(-1) ?? dumbbellHeadRetentionEnglishPost.entityId,
    title: dumbbellHeadRetentionEnglishPost.h1,
    seoTitle: dumbbellHeadRetentionEnglishPost.title,
    metaDescription: dumbbellHeadRetentionEnglishPost.description,
    primaryKeyword: dumbbellHeadRetentionEnglishPost.primaryKeyword,
    secondaryKeywords: dumbbellHeadRetentionEnglishPost.secondaryKeywords,
    searchIntent: dumbbellHeadRetentionEnglishPost.searchIntent,
    content: dumbbellHeadRetentionEnglishPost.content,
    excerpt: getExcerpt(dumbbellHeadRetentionEnglishPost.content),
    readingTime: getReadingTime(dumbbellHeadRetentionEnglishPost.content),
    coverImage: dumbbellHeadRetentionEnglishPost.images[0].src,
    coverAlt: dumbbellHeadRetentionEnglishPost.images[0].alt,
    coverWidth: dumbbellHeadRetentionEnglishPost.images[0].width,
    coverHeight: dumbbellHeadRetentionEnglishPost.images[0].height,
    articleImages: dumbbellHeadRetentionEnglishPost.images.slice(1).map((image) => ({
      src: image.src,
      alt: image.alt,
      caption: image.caption ?? image.alt,
      width: image.width,
      height: image.height
    })),
    publishedAt: dumbbellHeadRetentionEnglishPost.publishedAt,
    updatedAt: dumbbellHeadRetentionEnglishPost.updatedAt
  };

  const kgLbFreeWeightPost: ResourcePost = {
    slug: kgLbFreeWeightEnglishPost.publicPath.split("/").filter(Boolean).at(-1) ?? kgLbFreeWeightEnglishPost.entityId,
    title: kgLbFreeWeightEnglishPost.h1,
    seoTitle: kgLbFreeWeightEnglishPost.title,
    metaDescription: kgLbFreeWeightEnglishPost.description,
    primaryKeyword: kgLbFreeWeightEnglishPost.primaryKeyword,
    secondaryKeywords: kgLbFreeWeightEnglishPost.secondaryKeywords,
    searchIntent: kgLbFreeWeightEnglishPost.searchIntent,
    content: kgLbFreeWeightEnglishPost.content,
    excerpt: getExcerpt(kgLbFreeWeightEnglishPost.content),
    readingTime: getReadingTime(kgLbFreeWeightEnglishPost.content),
    coverImage: kgLbFreeWeightEnglishPost.images[0].src,
    coverAlt: kgLbFreeWeightEnglishPost.images[0].alt,
    coverWidth: kgLbFreeWeightEnglishPost.images[0].width,
    coverHeight: kgLbFreeWeightEnglishPost.images[0].height,
    articleImages: kgLbFreeWeightEnglishPost.images.slice(1).map((image) => ({
      src: image.src,
      alt: image.alt,
      caption: image.caption ?? image.alt,
      width: image.width,
      height: image.height
    })),
    publishedAt: kgLbFreeWeightEnglishPost.publishedAt,
    updatedAt: kgLbFreeWeightEnglishPost.updatedAt
  };

  const fixedVsAdjustablePost: ResourcePost = {
    slug: fixedVsAdjustableEnglishPost.publicPath.split("/").filter(Boolean).at(-1) ?? fixedVsAdjustableEnglishPost.entityId,
    title: fixedVsAdjustableEnglishPost.h1,
    seoTitle: fixedVsAdjustableEnglishPost.title,
    metaDescription: fixedVsAdjustableEnglishPost.description,
    primaryKeyword: fixedVsAdjustableEnglishPost.primaryKeyword,
    secondaryKeywords: fixedVsAdjustableEnglishPost.secondaryKeywords,
    searchIntent: fixedVsAdjustableEnglishPost.searchIntent,
    content: fixedVsAdjustableEnglishPost.content,
    excerpt: getExcerpt(fixedVsAdjustableEnglishPost.content),
    readingTime: getReadingTime(fixedVsAdjustableEnglishPost.content),
    coverImage: fixedVsAdjustableEnglishPost.images[0].src,
    coverAlt: fixedVsAdjustableEnglishPost.images[0].alt,
    coverWidth: fixedVsAdjustableEnglishPost.images[0].width,
    coverHeight: fixedVsAdjustableEnglishPost.images[0].height,
    articleImages: fixedVsAdjustableEnglishPost.images.slice(1).map((image) => ({
      src: image.src,
      alt: image.alt,
      caption: image.caption ?? image.alt,
      width: image.width,
      height: image.height
    })),
    publishedAt: fixedVsAdjustableEnglishPost.publishedAt,
    updatedAt: fixedVsAdjustableEnglishPost.updatedAt
  };

  const barbellFinishPost: ResourcePost = {
    slug: barbellFinishEnglishPost.publicPath.split("/").filter(Boolean).at(-1) ?? barbellFinishEnglishPost.entityId,
    title: barbellFinishEnglishPost.h1,
    seoTitle: barbellFinishEnglishPost.title,
    metaDescription: barbellFinishEnglishPost.description,
    primaryKeyword: barbellFinishEnglishPost.primaryKeyword,
    secondaryKeywords: barbellFinishEnglishPost.secondaryKeywords,
    searchIntent: barbellFinishEnglishPost.searchIntent,
    content: barbellFinishEnglishPost.content,
    excerpt: getExcerpt(barbellFinishEnglishPost.content),
    readingTime: getReadingTime(barbellFinishEnglishPost.content),
    coverImage: barbellFinishEnglishPost.images[0].src,
    coverAlt: barbellFinishEnglishPost.images[0].alt,
    coverWidth: barbellFinishEnglishPost.images[0].width,
    coverHeight: barbellFinishEnglishPost.images[0].height,
    articleImages: barbellFinishEnglishPost.images.slice(1).map((image) => ({
      src: image.src,
      alt: image.alt,
      caption: image.caption ?? image.alt,
      width: image.width,
      height: image.height
    })),
    publishedAt: barbellFinishEnglishPost.publishedAt,
    updatedAt: barbellFinishEnglishPost.updatedAt
  };

  const plateBarFitPost: ResourcePost = {
    slug: plateBarFitEnglishPost.publicPath.split("/").filter(Boolean).at(-1) ?? plateBarFitEnglishPost.entityId,
    title: plateBarFitEnglishPost.h1,
    seoTitle: plateBarFitEnglishPost.title,
    metaDescription: plateBarFitEnglishPost.description,
    primaryKeyword: plateBarFitEnglishPost.primaryKeyword,
    secondaryKeywords: plateBarFitEnglishPost.secondaryKeywords,
    searchIntent: plateBarFitEnglishPost.searchIntent,
    content: plateBarFitEnglishPost.content,
    excerpt: getExcerpt(plateBarFitEnglishPost.content),
    readingTime: getReadingTime(plateBarFitEnglishPost.content),
    coverImage: plateBarFitEnglishPost.images[0].src,
    coverAlt: plateBarFitEnglishPost.images[0].alt,
    coverWidth: plateBarFitEnglishPost.images[0].width,
    coverHeight: plateBarFitEnglishPost.images[0].height,
    articleImages: plateBarFitEnglishPost.images.slice(1).map((image) => ({
      src: image.src,
      alt: image.alt,
      caption: image.caption ?? image.alt,
      width: image.width,
      height: image.height
    })),
    publishedAt: plateBarFitEnglishPost.publishedAt,
    updatedAt: plateBarFitEnglishPost.updatedAt
  };

  const barbellKnurlingPost: ResourcePost = {
    slug: barbellKnurlingEnglishPost.publicPath.split("/").filter(Boolean).at(-1) ?? barbellKnurlingEnglishPost.entityId,
    title: barbellKnurlingEnglishPost.h1,
    seoTitle: barbellKnurlingEnglishPost.title,
    metaDescription: barbellKnurlingEnglishPost.description,
    primaryKeyword: barbellKnurlingEnglishPost.primaryKeyword,
    secondaryKeywords: barbellKnurlingEnglishPost.secondaryKeywords,
    searchIntent: barbellKnurlingEnglishPost.searchIntent,
    content: barbellKnurlingEnglishPost.content,
    excerpt: getExcerpt(barbellKnurlingEnglishPost.content),
    readingTime: getReadingTime(barbellKnurlingEnglishPost.content),
    coverImage: barbellKnurlingEnglishPost.images[0].src,
    coverAlt: barbellKnurlingEnglishPost.images[0].alt,
    coverWidth: barbellKnurlingEnglishPost.images[0].width,
    coverHeight: barbellKnurlingEnglishPost.images[0].height,
    articleImages: barbellKnurlingEnglishPost.images.slice(1).map((image) => ({
      src: image.src,
      alt: image.alt,
      caption: image.caption ?? image.alt,
      width: image.width,
      height: image.height
    })),
    publishedAt: barbellKnurlingEnglishPost.publishedAt,
    updatedAt: barbellKnurlingEnglishPost.updatedAt
  };

  return [...legacyPosts, ...expansionPosts, ...commercialGrowthPosts, steelDumbbellPost, cableAttachmentPost, weightPlateTolerancePost, commercialOlympicBarbellPost, dumbbellHeadRetentionPost, kgLbFreeWeightPost, fixedVsAdjustablePost, barbellFinishPost, plateBarFitPost, barbellKnurlingPost].sort((a, b) => {
      const priority = [
        "do-dumbbells-help-with-bone-density",
        "why-is-it-called-a-dumbbell",
        "can-i-build-muscle-with-only-dumbbells",
        "how-are-bumper-plates-made",
        "how-are-dumbbells-weighed",
        "evaluate-oem-gym-equipment-factory-china",
        "how-to-choose-commercial-dumbbells",
        "weight-plates-vs-bumper-plates-b2b-guide"
      ];
      const aIndex = priority.indexOf(a.slug);
      const bIndex = priority.indexOf(b.slug);
      if (aIndex === -1 && bIndex === -1) return b.publishedAt.localeCompare(a.publishedAt) || a.title.localeCompare(b.title);
      if (aIndex === -1) return 1;
      if (bIndex === -1) return -1;
      return aIndex - bIndex;
    });
}

export function getPostBySlug(slug: string) {
  return getAllPosts().find((post) => post.slug === slug);
}
