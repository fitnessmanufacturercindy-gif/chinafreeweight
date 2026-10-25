import { kgLbFreeWeightEnglishPost } from "../../content/i18n/kg-lb-free-weight-units-guide";
import { fixedVsAdjustableEnglishPost } from "../../content/i18n/fixed-vs-adjustable-dumbbells-guide";
import { barbellFinishEnglishPost } from "../../content/i18n/barbell-finish-guide";
import { plateBarFitEnglishPost } from "../../content/i18n/plate-bar-fit-guide";
import { barbellKnurlingEnglishPost } from "../../content/i18n/barbell-knurling-guide";
import { bumperPlateLoadingEnglishPost } from "../../content/i18n/bumper-plate-loading-guide";
import { barbellStraightnessEnglishPost } from "../../content/i18n/barbell-straightness-guide";
import { bumperPlateBounceEnglishPost } from "../../content/i18n/bumper-plate-bounce-guide";
import { cableAttachmentLoadEnglishPost } from "../../content/i18n/cable-attachment-load-guide";
import { dumbbellHandleEnglishPost } from "../../content/i18n/dumbbell-handle-guide";
import { plateDiameterEnglishPost } from "../../content/i18n/plate-diameter-guide";
import { rubberCoatingAdhesionEnglishPost } from "../../content/i18n/rubber-coating-adhesion-guide";
import { barbellShaftStrengthEnglishPost } from "../../content/i18n/barbell-shaft-strength-guide";
import { cableAttachmentGripEnglishPost } from "../../content/i18n/cable-attachment-grip-guide";
import { bumperPlateHubEnglishPost } from "../../content/i18n/bumper-plate-hub-guide";
import { barbellSleeveRetentionEnglishPost } from "../../content/i18n/barbell-sleeve-retention-guide";
import { barbellCollarEnglishPost } from "../../content/i18n/barbell-collar-guide";
import { barbellSleeveRotationEnglishPost } from "../../content/i18n/barbell-sleeve-rotation-guide";
import { plateGripOpeningsEnglishPost } from "../../content/i18n/plate-grip-openings-guide";
import { tricepsRopeEnglishPost } from "../../content/i18n/triceps-rope-guide";
import { latPulldownBarEnglishPost } from "../../content/i18n/lat-pulldown-bar-guide";
import { barbellWhipEnglishPost } from "../../content/i18n/barbell-whip-guide";
import { castIronPlateFinishEnglishPost } from "../../content/i18n/cast-iron-plate-finish-guide";
import { barbellSleeveSurfaceEnglishPost } from "../../content/i18n/barbell-sleeve-surface-guide";
import { customColorFreeWeightsEnglishPost } from "../../content/i18n/custom-color-free-weights-guide";
import { barbellMassEnglishPost } from "../../content/i18n/barbell-mass-guide";
import { weightPlateFlatnessEnglishPost } from "../../content/i18n/weight-plate-flatness-guide";
import { changePlatesEnglishPost } from "../../content/i18n/change-plates-guide";
import { dumbbellRackEnglishPost } from "../../content/i18n/dumbbell-rack-guide";
import { barbellShaftDiameterEnglishPost } from "../../content/i18n/barbell-shaft-diameter-guide";
import { rubberOdorEnglishPost } from "../../content/i18n/rubber-odor-guide";
import { weightPlateMarkingsEnglishPost } from "../../content/i18n/weight-plate-markings-guide";
import { hexDumbbellAlignmentEnglishPost } from "../../content/i18n/hex-dumbbell-alignment-guide";
import { cableAttachmentSwivelEnglishPost } from "../../content/i18n/cable-attachment-swivel-guide";
import { castIronPlateManufacturingEnglishPost } from "../../content/i18n/cast-iron-plate-manufacturing-guide";
import { weightPlateEdgeEnglishPost } from "../../content/i18n/weight-plate-edge-handling-guide";
import { rubberDumbbellHardnessEnglishPost } from "../../content/i18n/rubber-dumbbell-hardness-guide";
import { rubberDumbbellSurfaceEnglishPost } from "../../content/i18n/rubber-dumbbell-surface-bloom-guide";
import { cableAttachmentFinishEnglishPost } from "../../content/i18n/cable-attachment-finish-guide";
import { dumbbellEndCapEnglishPost } from "../../content/i18n/dumbbell-end-cap-guide";
import { barbellPackagingEnglishPost } from "../../content/i18n/barbell-packaging-guide";
import { barbellMaintenanceEnglishPost } from "../../content/i18n/barbell-maintenance-guide";
import { urethaneDumbbellSurfaceEnglishPost } from "../../content/i18n/urethane-dumbbell-surface-guide";
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

  const bumperPlateLoadingPost: ResourcePost = {
    slug: bumperPlateLoadingEnglishPost.publicPath.split("/").filter(Boolean).at(-1) ?? bumperPlateLoadingEnglishPost.entityId,
    title: bumperPlateLoadingEnglishPost.h1,
    seoTitle: bumperPlateLoadingEnglishPost.title,
    metaDescription: bumperPlateLoadingEnglishPost.description,
    primaryKeyword: bumperPlateLoadingEnglishPost.primaryKeyword,
    secondaryKeywords: bumperPlateLoadingEnglishPost.secondaryKeywords,
    searchIntent: bumperPlateLoadingEnglishPost.searchIntent,
    content: bumperPlateLoadingEnglishPost.content,
    excerpt: getExcerpt(bumperPlateLoadingEnglishPost.content),
    readingTime: getReadingTime(bumperPlateLoadingEnglishPost.content),
    coverImage: bumperPlateLoadingEnglishPost.images[0].src,
    coverAlt: bumperPlateLoadingEnglishPost.images[0].alt,
    coverWidth: bumperPlateLoadingEnglishPost.images[0].width,
    coverHeight: bumperPlateLoadingEnglishPost.images[0].height,
    articleImages: bumperPlateLoadingEnglishPost.images.slice(1).map((image) => ({
      src: image.src,
      alt: image.alt,
      caption: image.caption ?? image.alt,
      width: image.width,
      height: image.height
    })),
    publishedAt: bumperPlateLoadingEnglishPost.publishedAt,
    updatedAt: bumperPlateLoadingEnglishPost.updatedAt
  };

  const barbellStraightnessPost: ResourcePost = {
    slug: barbellStraightnessEnglishPost.publicPath.split("/").filter(Boolean).at(-1) ?? barbellStraightnessEnglishPost.entityId,
    title: barbellStraightnessEnglishPost.h1,
    seoTitle: barbellStraightnessEnglishPost.title,
    metaDescription: barbellStraightnessEnglishPost.description,
    primaryKeyword: barbellStraightnessEnglishPost.primaryKeyword,
    secondaryKeywords: barbellStraightnessEnglishPost.secondaryKeywords,
    searchIntent: barbellStraightnessEnglishPost.searchIntent,
    content: barbellStraightnessEnglishPost.content,
    excerpt: getExcerpt(barbellStraightnessEnglishPost.content),
    readingTime: getReadingTime(barbellStraightnessEnglishPost.content),
    coverImage: barbellStraightnessEnglishPost.images[0].src,
    coverAlt: barbellStraightnessEnglishPost.images[0].alt,
    coverWidth: barbellStraightnessEnglishPost.images[0].width,
    coverHeight: barbellStraightnessEnglishPost.images[0].height,
    articleImages: barbellStraightnessEnglishPost.images.slice(1).map((image) => ({
      src: image.src,
      alt: image.alt,
      caption: image.caption ?? image.alt,
      width: image.width,
      height: image.height
    })),
    publishedAt: barbellStraightnessEnglishPost.publishedAt,
    updatedAt: barbellStraightnessEnglishPost.updatedAt
  };

  const bumperPlateBouncePost: ResourcePost = {
    slug: bumperPlateBounceEnglishPost.publicPath.split("/").filter(Boolean).at(-1) ?? bumperPlateBounceEnglishPost.entityId,
    title: bumperPlateBounceEnglishPost.h1,
    seoTitle: bumperPlateBounceEnglishPost.title,
    metaDescription: bumperPlateBounceEnglishPost.description,
    primaryKeyword: bumperPlateBounceEnglishPost.primaryKeyword,
    secondaryKeywords: bumperPlateBounceEnglishPost.secondaryKeywords,
    searchIntent: bumperPlateBounceEnglishPost.searchIntent,
    content: bumperPlateBounceEnglishPost.content,
    excerpt: getExcerpt(bumperPlateBounceEnglishPost.content),
    readingTime: getReadingTime(bumperPlateBounceEnglishPost.content),
    coverImage: bumperPlateBounceEnglishPost.images[0].src,
    coverAlt: bumperPlateBounceEnglishPost.images[0].alt,
    coverWidth: bumperPlateBounceEnglishPost.images[0].width,
    coverHeight: bumperPlateBounceEnglishPost.images[0].height,
    articleImages: bumperPlateBounceEnglishPost.images.slice(1).map((image) => ({
      src: image.src,
      alt: image.alt,
      caption: image.caption ?? image.alt,
      width: image.width,
      height: image.height
    })),
    publishedAt: bumperPlateBounceEnglishPost.publishedAt,
    updatedAt: bumperPlateBounceEnglishPost.updatedAt
  };

  const cableAttachmentLoadPost: ResourcePost = {
    slug: cableAttachmentLoadEnglishPost.publicPath.split("/").filter(Boolean).at(-1) ?? cableAttachmentLoadEnglishPost.entityId,
    title: cableAttachmentLoadEnglishPost.h1,
    seoTitle: cableAttachmentLoadEnglishPost.title,
    metaDescription: cableAttachmentLoadEnglishPost.description,
    primaryKeyword: cableAttachmentLoadEnglishPost.primaryKeyword,
    secondaryKeywords: cableAttachmentLoadEnglishPost.secondaryKeywords,
    searchIntent: cableAttachmentLoadEnglishPost.searchIntent,
    content: cableAttachmentLoadEnglishPost.content,
    excerpt: getExcerpt(cableAttachmentLoadEnglishPost.content),
    readingTime: getReadingTime(cableAttachmentLoadEnglishPost.content),
    coverImage: cableAttachmentLoadEnglishPost.images[0].src,
    coverAlt: cableAttachmentLoadEnglishPost.images[0].alt,
    coverWidth: cableAttachmentLoadEnglishPost.images[0].width,
    coverHeight: cableAttachmentLoadEnglishPost.images[0].height,
    articleImages: cableAttachmentLoadEnglishPost.images.slice(1).map((image) => ({
      src: image.src,
      alt: image.alt,
      caption: image.caption ?? image.alt,
      width: image.width,
      height: image.height
    })),
    publishedAt: cableAttachmentLoadEnglishPost.publishedAt,
    updatedAt: cableAttachmentLoadEnglishPost.updatedAt
  };

  const dumbbellHandlePost: ResourcePost = {
    slug: dumbbellHandleEnglishPost.publicPath.split("/").filter(Boolean).at(-1) ?? dumbbellHandleEnglishPost.entityId,
    title: dumbbellHandleEnglishPost.h1,
    seoTitle: dumbbellHandleEnglishPost.title,
    metaDescription: dumbbellHandleEnglishPost.description,
    primaryKeyword: dumbbellHandleEnglishPost.primaryKeyword,
    secondaryKeywords: dumbbellHandleEnglishPost.secondaryKeywords,
    searchIntent: dumbbellHandleEnglishPost.searchIntent,
    content: dumbbellHandleEnglishPost.content,
    excerpt: getExcerpt(dumbbellHandleEnglishPost.content),
    readingTime: getReadingTime(dumbbellHandleEnglishPost.content),
    coverImage: dumbbellHandleEnglishPost.images[0].src,
    coverAlt: dumbbellHandleEnglishPost.images[0].alt,
    coverWidth: dumbbellHandleEnglishPost.images[0].width,
    coverHeight: dumbbellHandleEnglishPost.images[0].height,
    articleImages: dumbbellHandleEnglishPost.images.slice(1).map((image) => ({
      src: image.src,
      alt: image.alt,
      caption: image.caption ?? image.alt,
      width: image.width,
      height: image.height
    })),
    publishedAt: dumbbellHandleEnglishPost.publishedAt,
    updatedAt: dumbbellHandleEnglishPost.updatedAt
  };

  const plateDiameterPost: ResourcePost = {
    slug: plateDiameterEnglishPost.publicPath.split("/").filter(Boolean).at(-1) ?? plateDiameterEnglishPost.entityId,
    title: plateDiameterEnglishPost.h1,
    seoTitle: plateDiameterEnglishPost.title,
    metaDescription: plateDiameterEnglishPost.description,
    primaryKeyword: plateDiameterEnglishPost.primaryKeyword,
    secondaryKeywords: plateDiameterEnglishPost.secondaryKeywords,
    searchIntent: plateDiameterEnglishPost.searchIntent,
    content: plateDiameterEnglishPost.content,
    excerpt: getExcerpt(plateDiameterEnglishPost.content),
    readingTime: getReadingTime(plateDiameterEnglishPost.content),
    coverImage: plateDiameterEnglishPost.images[0].src,
    coverAlt: plateDiameterEnglishPost.images[0].alt,
    coverWidth: plateDiameterEnglishPost.images[0].width,
    coverHeight: plateDiameterEnglishPost.images[0].height,
    articleImages: plateDiameterEnglishPost.images.slice(1).map((image) => ({
      src: image.src,
      alt: image.alt,
      caption: image.caption ?? image.alt,
      width: image.width,
      height: image.height
    })),
    publishedAt: plateDiameterEnglishPost.publishedAt,
    updatedAt: plateDiameterEnglishPost.updatedAt
  };

  const rubberCoatingAdhesionPost: ResourcePost = {
    slug: rubberCoatingAdhesionEnglishPost.publicPath.split("/").filter(Boolean).at(-1) ?? rubberCoatingAdhesionEnglishPost.entityId,
    title: rubberCoatingAdhesionEnglishPost.h1,
    seoTitle: rubberCoatingAdhesionEnglishPost.title,
    metaDescription: rubberCoatingAdhesionEnglishPost.description,
    primaryKeyword: rubberCoatingAdhesionEnglishPost.primaryKeyword,
    secondaryKeywords: rubberCoatingAdhesionEnglishPost.secondaryKeywords,
    searchIntent: rubberCoatingAdhesionEnglishPost.searchIntent,
    content: rubberCoatingAdhesionEnglishPost.content,
    excerpt: getExcerpt(rubberCoatingAdhesionEnglishPost.content),
    readingTime: getReadingTime(rubberCoatingAdhesionEnglishPost.content),
    coverImage: rubberCoatingAdhesionEnglishPost.images[0].src,
    coverAlt: rubberCoatingAdhesionEnglishPost.images[0].alt,
    coverWidth: rubberCoatingAdhesionEnglishPost.images[0].width,
    coverHeight: rubberCoatingAdhesionEnglishPost.images[0].height,
    articleImages: rubberCoatingAdhesionEnglishPost.images.slice(1).map((image) => ({
      src: image.src,
      alt: image.alt,
      caption: image.caption ?? image.alt,
      width: image.width,
      height: image.height
    })),
    publishedAt: rubberCoatingAdhesionEnglishPost.publishedAt,
    updatedAt: rubberCoatingAdhesionEnglishPost.updatedAt
  };

  const barbellShaftStrengthPost: ResourcePost = {
    slug: barbellShaftStrengthEnglishPost.publicPath.split("/").filter(Boolean).at(-1) ?? barbellShaftStrengthEnglishPost.entityId,
    title: barbellShaftStrengthEnglishPost.h1,
    seoTitle: barbellShaftStrengthEnglishPost.title,
    metaDescription: barbellShaftStrengthEnglishPost.description,
    primaryKeyword: barbellShaftStrengthEnglishPost.primaryKeyword,
    secondaryKeywords: barbellShaftStrengthEnglishPost.secondaryKeywords,
    searchIntent: barbellShaftStrengthEnglishPost.searchIntent,
    content: barbellShaftStrengthEnglishPost.content,
    excerpt: getExcerpt(barbellShaftStrengthEnglishPost.content),
    readingTime: getReadingTime(barbellShaftStrengthEnglishPost.content),
    coverImage: barbellShaftStrengthEnglishPost.images[0].src,
    coverAlt: barbellShaftStrengthEnglishPost.images[0].alt,
    coverWidth: barbellShaftStrengthEnglishPost.images[0].width,
    coverHeight: barbellShaftStrengthEnglishPost.images[0].height,
    articleImages: barbellShaftStrengthEnglishPost.images.slice(1).map((image) => ({
      src: image.src,
      alt: image.alt,
      caption: image.caption ?? image.alt,
      width: image.width,
      height: image.height
    })),
    publishedAt: barbellShaftStrengthEnglishPost.publishedAt,
    updatedAt: barbellShaftStrengthEnglishPost.updatedAt
  };

  const cableAttachmentGripPost: ResourcePost = {
    slug: cableAttachmentGripEnglishPost.publicPath.split("/").filter(Boolean).at(-1) ?? cableAttachmentGripEnglishPost.entityId,
    title: cableAttachmentGripEnglishPost.h1,
    seoTitle: cableAttachmentGripEnglishPost.title,
    metaDescription: cableAttachmentGripEnglishPost.description,
    primaryKeyword: cableAttachmentGripEnglishPost.primaryKeyword,
    secondaryKeywords: cableAttachmentGripEnglishPost.secondaryKeywords,
    searchIntent: cableAttachmentGripEnglishPost.searchIntent,
    content: cableAttachmentGripEnglishPost.content,
    excerpt: getExcerpt(cableAttachmentGripEnglishPost.content),
    readingTime: getReadingTime(cableAttachmentGripEnglishPost.content),
    coverImage: cableAttachmentGripEnglishPost.images[0].src,
    coverAlt: cableAttachmentGripEnglishPost.images[0].alt,
    coverWidth: cableAttachmentGripEnglishPost.images[0].width,
    coverHeight: cableAttachmentGripEnglishPost.images[0].height,
    articleImages: cableAttachmentGripEnglishPost.images.slice(1).map((image) => ({
      src: image.src,
      alt: image.alt,
      caption: image.caption ?? image.alt,
      width: image.width,
      height: image.height
    })),
    publishedAt: cableAttachmentGripEnglishPost.publishedAt,
    updatedAt: cableAttachmentGripEnglishPost.updatedAt
  };

  const bumperPlateHubPost: ResourcePost = {
    slug: bumperPlateHubEnglishPost.publicPath.split("/").filter(Boolean).at(-1) ?? bumperPlateHubEnglishPost.entityId,
    title: bumperPlateHubEnglishPost.h1,
    seoTitle: bumperPlateHubEnglishPost.title,
    metaDescription: bumperPlateHubEnglishPost.description,
    primaryKeyword: bumperPlateHubEnglishPost.primaryKeyword,
    secondaryKeywords: bumperPlateHubEnglishPost.secondaryKeywords,
    searchIntent: bumperPlateHubEnglishPost.searchIntent,
    content: bumperPlateHubEnglishPost.content,
    excerpt: getExcerpt(bumperPlateHubEnglishPost.content),
    readingTime: getReadingTime(bumperPlateHubEnglishPost.content),
    coverImage: bumperPlateHubEnglishPost.images[0].src,
    coverAlt: bumperPlateHubEnglishPost.images[0].alt,
    coverWidth: bumperPlateHubEnglishPost.images[0].width,
    coverHeight: bumperPlateHubEnglishPost.images[0].height,
    articleImages: bumperPlateHubEnglishPost.images.slice(1).map((image) => ({
      src: image.src,
      alt: image.alt,
      caption: image.caption ?? image.alt,
      width: image.width,
      height: image.height
    })),
    publishedAt: bumperPlateHubEnglishPost.publishedAt,
    updatedAt: bumperPlateHubEnglishPost.updatedAt
  };

  const barbellSleeveRetentionPost: ResourcePost = {
    slug: barbellSleeveRetentionEnglishPost.publicPath.split("/").filter(Boolean).at(-1) ?? barbellSleeveRetentionEnglishPost.entityId,
    title: barbellSleeveRetentionEnglishPost.h1,
    seoTitle: barbellSleeveRetentionEnglishPost.title,
    metaDescription: barbellSleeveRetentionEnglishPost.description,
    primaryKeyword: barbellSleeveRetentionEnglishPost.primaryKeyword,
    secondaryKeywords: barbellSleeveRetentionEnglishPost.secondaryKeywords,
    searchIntent: barbellSleeveRetentionEnglishPost.searchIntent,
    content: barbellSleeveRetentionEnglishPost.content,
    excerpt: getExcerpt(barbellSleeveRetentionEnglishPost.content),
    readingTime: getReadingTime(barbellSleeveRetentionEnglishPost.content),
    coverImage: barbellSleeveRetentionEnglishPost.images[0].src,
    coverAlt: barbellSleeveRetentionEnglishPost.images[0].alt,
    coverWidth: barbellSleeveRetentionEnglishPost.images[0].width,
    coverHeight: barbellSleeveRetentionEnglishPost.images[0].height,
    articleImages: barbellSleeveRetentionEnglishPost.images.slice(1).map((image) => ({
      src: image.src,
      alt: image.alt,
      caption: image.caption ?? image.alt,
      width: image.width,
      height: image.height
    })),
    publishedAt: barbellSleeveRetentionEnglishPost.publishedAt,
    updatedAt: barbellSleeveRetentionEnglishPost.updatedAt
  };

  const barbellCollarPost: ResourcePost = {
    slug: barbellCollarEnglishPost.publicPath.split("/").filter(Boolean).at(-1) ?? barbellCollarEnglishPost.entityId,
    title: barbellCollarEnglishPost.h1,
    seoTitle: barbellCollarEnglishPost.title,
    metaDescription: barbellCollarEnglishPost.description,
    primaryKeyword: barbellCollarEnglishPost.primaryKeyword,
    secondaryKeywords: barbellCollarEnglishPost.secondaryKeywords,
    searchIntent: barbellCollarEnglishPost.searchIntent,
    content: barbellCollarEnglishPost.content,
    excerpt: getExcerpt(barbellCollarEnglishPost.content),
    readingTime: getReadingTime(barbellCollarEnglishPost.content),
    coverImage: barbellCollarEnglishPost.images[0].src,
    coverAlt: barbellCollarEnglishPost.images[0].alt,
    coverWidth: barbellCollarEnglishPost.images[0].width,
    coverHeight: barbellCollarEnglishPost.images[0].height,
    articleImages: barbellCollarEnglishPost.images.slice(1).map((image) => ({
      src: image.src,
      alt: image.alt,
      caption: image.caption ?? image.alt,
      width: image.width,
      height: image.height
    })),
    publishedAt: barbellCollarEnglishPost.publishedAt,
    updatedAt: barbellCollarEnglishPost.updatedAt
  };

  const barbellSleeveRotationPost: ResourcePost = {
    slug: barbellSleeveRotationEnglishPost.publicPath.split("/").filter(Boolean).at(-1) ?? barbellSleeveRotationEnglishPost.entityId,
    title: barbellSleeveRotationEnglishPost.h1,
    seoTitle: barbellSleeveRotationEnglishPost.title,
    metaDescription: barbellSleeveRotationEnglishPost.description,
    primaryKeyword: barbellSleeveRotationEnglishPost.primaryKeyword,
    secondaryKeywords: barbellSleeveRotationEnglishPost.secondaryKeywords,
    searchIntent: barbellSleeveRotationEnglishPost.searchIntent,
    content: barbellSleeveRotationEnglishPost.content,
    excerpt: getExcerpt(barbellSleeveRotationEnglishPost.content),
    readingTime: getReadingTime(barbellSleeveRotationEnglishPost.content),
    coverImage: barbellSleeveRotationEnglishPost.images[0].src,
    coverAlt: barbellSleeveRotationEnglishPost.images[0].alt,
    coverWidth: barbellSleeveRotationEnglishPost.images[0].width,
    coverHeight: barbellSleeveRotationEnglishPost.images[0].height,
    articleImages: barbellSleeveRotationEnglishPost.images.slice(1).map((image) => ({
      src: image.src,
      alt: image.alt,
      caption: image.caption ?? image.alt,
      width: image.width,
      height: image.height
    })),
    publishedAt: barbellSleeveRotationEnglishPost.publishedAt,
    updatedAt: barbellSleeveRotationEnglishPost.updatedAt
  };

  const plateGripOpeningsPost: ResourcePost = {
    slug: plateGripOpeningsEnglishPost.publicPath.split("/").filter(Boolean).at(-1) ?? plateGripOpeningsEnglishPost.entityId,
    title: plateGripOpeningsEnglishPost.h1,
    seoTitle: plateGripOpeningsEnglishPost.title,
    metaDescription: plateGripOpeningsEnglishPost.description,
    primaryKeyword: plateGripOpeningsEnglishPost.primaryKeyword,
    secondaryKeywords: plateGripOpeningsEnglishPost.secondaryKeywords,
    searchIntent: plateGripOpeningsEnglishPost.searchIntent,
    content: plateGripOpeningsEnglishPost.content,
    excerpt: getExcerpt(plateGripOpeningsEnglishPost.content),
    readingTime: getReadingTime(plateGripOpeningsEnglishPost.content),
    coverImage: plateGripOpeningsEnglishPost.images[0].src,
    coverAlt: plateGripOpeningsEnglishPost.images[0].alt,
    coverWidth: plateGripOpeningsEnglishPost.images[0].width,
    coverHeight: plateGripOpeningsEnglishPost.images[0].height,
    articleImages: plateGripOpeningsEnglishPost.images.slice(1).map((image) => ({
      src: image.src,
      alt: image.alt,
      caption: image.caption ?? image.alt,
      width: image.width,
      height: image.height
    })),
    publishedAt: plateGripOpeningsEnglishPost.publishedAt,
    updatedAt: plateGripOpeningsEnglishPost.updatedAt
  };

  const tricepsRopePost: ResourcePost = {
    slug: tricepsRopeEnglishPost.publicPath.split("/").filter(Boolean).at(-1) ?? tricepsRopeEnglishPost.entityId,
    title: tricepsRopeEnglishPost.h1,
    seoTitle: tricepsRopeEnglishPost.title,
    metaDescription: tricepsRopeEnglishPost.description,
    primaryKeyword: tricepsRopeEnglishPost.primaryKeyword,
    secondaryKeywords: tricepsRopeEnglishPost.secondaryKeywords,
    searchIntent: tricepsRopeEnglishPost.searchIntent,
    content: tricepsRopeEnglishPost.content,
    excerpt: getExcerpt(tricepsRopeEnglishPost.content),
    readingTime: getReadingTime(tricepsRopeEnglishPost.content),
    coverImage: tricepsRopeEnglishPost.images[0].src,
    coverAlt: tricepsRopeEnglishPost.images[0].alt,
    coverWidth: tricepsRopeEnglishPost.images[0].width,
    coverHeight: tricepsRopeEnglishPost.images[0].height,
    articleImages: tricepsRopeEnglishPost.images.slice(1).map((image) => ({
      src: image.src,
      alt: image.alt,
      caption: image.caption ?? image.alt,
      width: image.width,
      height: image.height
    })),
    publishedAt: tricepsRopeEnglishPost.publishedAt,
    updatedAt: tricepsRopeEnglishPost.updatedAt
  };

  const latPulldownBarPost: ResourcePost = {
    slug: latPulldownBarEnglishPost.publicPath.split("/").filter(Boolean).at(-1) ?? latPulldownBarEnglishPost.entityId,
    title: latPulldownBarEnglishPost.h1,
    seoTitle: latPulldownBarEnglishPost.title,
    metaDescription: latPulldownBarEnglishPost.description,
    primaryKeyword: latPulldownBarEnglishPost.primaryKeyword,
    secondaryKeywords: latPulldownBarEnglishPost.secondaryKeywords,
    searchIntent: latPulldownBarEnglishPost.searchIntent,
    content: latPulldownBarEnglishPost.content,
    excerpt: getExcerpt(latPulldownBarEnglishPost.content),
    readingTime: getReadingTime(latPulldownBarEnglishPost.content),
    coverImage: latPulldownBarEnglishPost.images[0].src,
    coverAlt: latPulldownBarEnglishPost.images[0].alt,
    coverWidth: latPulldownBarEnglishPost.images[0].width,
    coverHeight: latPulldownBarEnglishPost.images[0].height,
    articleImages: latPulldownBarEnglishPost.images.slice(1).map((image) => ({
      src: image.src,
      alt: image.alt,
      caption: image.caption ?? image.alt,
      width: image.width,
      height: image.height
    })),
    publishedAt: latPulldownBarEnglishPost.publishedAt,
    updatedAt: latPulldownBarEnglishPost.updatedAt
  };

  const barbellWhipPost: ResourcePost = {
    slug: barbellWhipEnglishPost.publicPath.split("/").filter(Boolean).at(-1) ?? barbellWhipEnglishPost.entityId,
    title: barbellWhipEnglishPost.h1,
    seoTitle: barbellWhipEnglishPost.title,
    metaDescription: barbellWhipEnglishPost.description,
    primaryKeyword: barbellWhipEnglishPost.primaryKeyword,
    secondaryKeywords: barbellWhipEnglishPost.secondaryKeywords,
    searchIntent: barbellWhipEnglishPost.searchIntent,
    content: barbellWhipEnglishPost.content,
    excerpt: getExcerpt(barbellWhipEnglishPost.content),
    readingTime: getReadingTime(barbellWhipEnglishPost.content),
    coverImage: barbellWhipEnglishPost.images[0].src,
    coverAlt: barbellWhipEnglishPost.images[0].alt,
    coverWidth: barbellWhipEnglishPost.images[0].width,
    coverHeight: barbellWhipEnglishPost.images[0].height,
    articleImages: barbellWhipEnglishPost.images.slice(1).map((image) => ({
      src: image.src,
      alt: image.alt,
      caption: image.caption ?? image.alt,
      width: image.width,
      height: image.height
    })),
    publishedAt: barbellWhipEnglishPost.publishedAt,
    updatedAt: barbellWhipEnglishPost.updatedAt
  };

  const castIronPlateFinishPost: ResourcePost = {
    slug: castIronPlateFinishEnglishPost.publicPath.split("/").filter(Boolean).at(-1) ?? castIronPlateFinishEnglishPost.entityId,
    title: castIronPlateFinishEnglishPost.h1,
    seoTitle: castIronPlateFinishEnglishPost.title,
    metaDescription: castIronPlateFinishEnglishPost.description,
    primaryKeyword: castIronPlateFinishEnglishPost.primaryKeyword,
    secondaryKeywords: castIronPlateFinishEnglishPost.secondaryKeywords,
    searchIntent: castIronPlateFinishEnglishPost.searchIntent,
    content: castIronPlateFinishEnglishPost.content,
    excerpt: getExcerpt(castIronPlateFinishEnglishPost.content),
    readingTime: getReadingTime(castIronPlateFinishEnglishPost.content),
    coverImage: castIronPlateFinishEnglishPost.images[0].src,
    coverAlt: castIronPlateFinishEnglishPost.images[0].alt,
    coverWidth: castIronPlateFinishEnglishPost.images[0].width,
    coverHeight: castIronPlateFinishEnglishPost.images[0].height,
    articleImages: castIronPlateFinishEnglishPost.images.slice(1).map((image) => ({
      src: image.src,
      alt: image.alt,
      caption: image.caption ?? image.alt,
      width: image.width,
      height: image.height
    })),
    publishedAt: castIronPlateFinishEnglishPost.publishedAt,
    updatedAt: castIronPlateFinishEnglishPost.updatedAt
  };

  const barbellSleeveSurfacePost: ResourcePost = {
    slug: barbellSleeveSurfaceEnglishPost.publicPath.split("/").filter(Boolean).at(-1) ?? barbellSleeveSurfaceEnglishPost.entityId,
    title: barbellSleeveSurfaceEnglishPost.h1,
    seoTitle: barbellSleeveSurfaceEnglishPost.title,
    metaDescription: barbellSleeveSurfaceEnglishPost.description,
    primaryKeyword: barbellSleeveSurfaceEnglishPost.primaryKeyword,
    secondaryKeywords: barbellSleeveSurfaceEnglishPost.secondaryKeywords,
    searchIntent: barbellSleeveSurfaceEnglishPost.searchIntent,
    content: barbellSleeveSurfaceEnglishPost.content,
    excerpt: getExcerpt(barbellSleeveSurfaceEnglishPost.content),
    readingTime: getReadingTime(barbellSleeveSurfaceEnglishPost.content),
    coverImage: barbellSleeveSurfaceEnglishPost.images[0].src,
    coverAlt: barbellSleeveSurfaceEnglishPost.images[0].alt,
    coverWidth: barbellSleeveSurfaceEnglishPost.images[0].width,
    coverHeight: barbellSleeveSurfaceEnglishPost.images[0].height,
    articleImages: barbellSleeveSurfaceEnglishPost.images.slice(1).map((image) => ({
      src: image.src,
      alt: image.alt,
      caption: image.caption ?? image.alt,
      width: image.width,
      height: image.height
    })),
    publishedAt: barbellSleeveSurfaceEnglishPost.publishedAt,
    updatedAt: barbellSleeveSurfaceEnglishPost.updatedAt
  };

  const customColorFreeWeightsPost: ResourcePost = {
    slug: customColorFreeWeightsEnglishPost.publicPath.split("/").filter(Boolean).at(-1) ?? customColorFreeWeightsEnglishPost.entityId,
    title: customColorFreeWeightsEnglishPost.h1,
    seoTitle: customColorFreeWeightsEnglishPost.title,
    metaDescription: customColorFreeWeightsEnglishPost.description,
    primaryKeyword: customColorFreeWeightsEnglishPost.primaryKeyword,
    secondaryKeywords: customColorFreeWeightsEnglishPost.secondaryKeywords,
    searchIntent: customColorFreeWeightsEnglishPost.searchIntent,
    content: customColorFreeWeightsEnglishPost.content,
    excerpt: getExcerpt(customColorFreeWeightsEnglishPost.content),
    readingTime: getReadingTime(customColorFreeWeightsEnglishPost.content),
    coverImage: customColorFreeWeightsEnglishPost.images[0].src,
    coverAlt: customColorFreeWeightsEnglishPost.images[0].alt,
    coverWidth: customColorFreeWeightsEnglishPost.images[0].width,
    coverHeight: customColorFreeWeightsEnglishPost.images[0].height,
    articleImages: customColorFreeWeightsEnglishPost.images.slice(1).map((image) => ({
      src: image.src,
      alt: image.alt,
      caption: image.caption ?? image.alt,
      width: image.width,
      height: image.height
    })),
    publishedAt: customColorFreeWeightsEnglishPost.publishedAt,
    updatedAt: customColorFreeWeightsEnglishPost.updatedAt
  };

  const barbellMassPost: ResourcePost = {
    slug: barbellMassEnglishPost.publicPath.split("/").filter(Boolean).at(-1) ?? barbellMassEnglishPost.entityId,
    title: barbellMassEnglishPost.h1,
    seoTitle: barbellMassEnglishPost.title,
    metaDescription: barbellMassEnglishPost.description,
    primaryKeyword: barbellMassEnglishPost.primaryKeyword,
    secondaryKeywords: barbellMassEnglishPost.secondaryKeywords,
    searchIntent: barbellMassEnglishPost.searchIntent,
    content: barbellMassEnglishPost.content,
    excerpt: getExcerpt(barbellMassEnglishPost.content),
    readingTime: getReadingTime(barbellMassEnglishPost.content),
    coverImage: barbellMassEnglishPost.images[0].src,
    coverAlt: barbellMassEnglishPost.images[0].alt,
    coverWidth: barbellMassEnglishPost.images[0].width,
    coverHeight: barbellMassEnglishPost.images[0].height,
    articleImages: barbellMassEnglishPost.images.slice(1).map((image) => ({
      src: image.src,
      alt: image.alt,
      caption: image.caption ?? image.alt,
      width: image.width,
      height: image.height
    })),
    publishedAt: barbellMassEnglishPost.publishedAt,
    updatedAt: barbellMassEnglishPost.updatedAt
  };

  const weightPlateFlatnessPost: ResourcePost = {
    slug: weightPlateFlatnessEnglishPost.publicPath.split("/").filter(Boolean).at(-1) ?? weightPlateFlatnessEnglishPost.entityId,
    title: weightPlateFlatnessEnglishPost.h1,
    seoTitle: weightPlateFlatnessEnglishPost.title,
    metaDescription: weightPlateFlatnessEnglishPost.description,
    primaryKeyword: weightPlateFlatnessEnglishPost.primaryKeyword,
    secondaryKeywords: weightPlateFlatnessEnglishPost.secondaryKeywords,
    searchIntent: weightPlateFlatnessEnglishPost.searchIntent,
    content: weightPlateFlatnessEnglishPost.content,
    excerpt: getExcerpt(weightPlateFlatnessEnglishPost.content),
    readingTime: getReadingTime(weightPlateFlatnessEnglishPost.content),
    coverImage: weightPlateFlatnessEnglishPost.images[0].src,
    coverAlt: weightPlateFlatnessEnglishPost.images[0].alt,
    coverWidth: weightPlateFlatnessEnglishPost.images[0].width,
    coverHeight: weightPlateFlatnessEnglishPost.images[0].height,
    articleImages: weightPlateFlatnessEnglishPost.images.slice(1).map((image) => ({
      src: image.src,
      alt: image.alt,
      caption: image.caption ?? image.alt,
      width: image.width,
      height: image.height
    })),
    publishedAt: weightPlateFlatnessEnglishPost.publishedAt,
    updatedAt: weightPlateFlatnessEnglishPost.updatedAt
  };

  const changePlatesPost: ResourcePost = {
    slug: changePlatesEnglishPost.publicPath.split("/").filter(Boolean).at(-1) ?? changePlatesEnglishPost.entityId,
    title: changePlatesEnglishPost.h1,
    seoTitle: changePlatesEnglishPost.title,
    metaDescription: changePlatesEnglishPost.description,
    primaryKeyword: changePlatesEnglishPost.primaryKeyword,
    secondaryKeywords: changePlatesEnglishPost.secondaryKeywords,
    searchIntent: changePlatesEnglishPost.searchIntent,
    content: changePlatesEnglishPost.content,
    excerpt: getExcerpt(changePlatesEnglishPost.content),
    readingTime: getReadingTime(changePlatesEnglishPost.content),
    coverImage: changePlatesEnglishPost.images[0].src,
    coverAlt: changePlatesEnglishPost.images[0].alt,
    coverWidth: changePlatesEnglishPost.images[0].width,
    coverHeight: changePlatesEnglishPost.images[0].height,
    articleImages: changePlatesEnglishPost.images.slice(1).map((image) => ({
      src: image.src,
      alt: image.alt,
      caption: image.caption ?? image.alt,
      width: image.width,
      height: image.height
    })),
    publishedAt: changePlatesEnglishPost.publishedAt,
    updatedAt: changePlatesEnglishPost.updatedAt
  };

  const dumbbellRackPost: ResourcePost = {
    slug: dumbbellRackEnglishPost.publicPath.split("/").filter(Boolean).at(-1) ?? dumbbellRackEnglishPost.entityId,
    title: dumbbellRackEnglishPost.h1,
    seoTitle: dumbbellRackEnglishPost.title,
    metaDescription: dumbbellRackEnglishPost.description,
    primaryKeyword: dumbbellRackEnglishPost.primaryKeyword,
    secondaryKeywords: dumbbellRackEnglishPost.secondaryKeywords,
    searchIntent: dumbbellRackEnglishPost.searchIntent,
    content: dumbbellRackEnglishPost.content,
    excerpt: getExcerpt(dumbbellRackEnglishPost.content),
    readingTime: getReadingTime(dumbbellRackEnglishPost.content),
    coverImage: dumbbellRackEnglishPost.images[0].src,
    coverAlt: dumbbellRackEnglishPost.images[0].alt,
    coverWidth: dumbbellRackEnglishPost.images[0].width,
    coverHeight: dumbbellRackEnglishPost.images[0].height,
    articleImages: dumbbellRackEnglishPost.images.slice(1).map((image) => ({
      src: image.src,
      alt: image.alt,
      caption: image.caption ?? image.alt,
      width: image.width,
      height: image.height
    })),
    publishedAt: dumbbellRackEnglishPost.publishedAt,
    updatedAt: dumbbellRackEnglishPost.updatedAt
  };

  const barbellShaftDiameterPost: ResourcePost = {
    slug: barbellShaftDiameterEnglishPost.publicPath.split("/").filter(Boolean).at(-1) ?? barbellShaftDiameterEnglishPost.entityId,
    title: barbellShaftDiameterEnglishPost.h1,
    seoTitle: barbellShaftDiameterEnglishPost.title,
    metaDescription: barbellShaftDiameterEnglishPost.description,
    primaryKeyword: barbellShaftDiameterEnglishPost.primaryKeyword,
    secondaryKeywords: barbellShaftDiameterEnglishPost.secondaryKeywords,
    searchIntent: barbellShaftDiameterEnglishPost.searchIntent,
    content: barbellShaftDiameterEnglishPost.content,
    excerpt: getExcerpt(barbellShaftDiameterEnglishPost.content),
    readingTime: getReadingTime(barbellShaftDiameterEnglishPost.content),
    coverImage: barbellShaftDiameterEnglishPost.images[0].src,
    coverAlt: barbellShaftDiameterEnglishPost.images[0].alt,
    coverWidth: barbellShaftDiameterEnglishPost.images[0].width,
    coverHeight: barbellShaftDiameterEnglishPost.images[0].height,
    articleImages: barbellShaftDiameterEnglishPost.images.slice(1).map((image) => ({
      src: image.src,
      alt: image.alt,
      caption: image.caption ?? image.alt,
      width: image.width,
      height: image.height
    })),
    publishedAt: barbellShaftDiameterEnglishPost.publishedAt,
    updatedAt: barbellShaftDiameterEnglishPost.updatedAt
  };

  const rubberOdorPost: ResourcePost = {
    slug: rubberOdorEnglishPost.publicPath.split("/").filter(Boolean).at(-1) ?? rubberOdorEnglishPost.entityId,
    title: rubberOdorEnglishPost.h1,
    seoTitle: rubberOdorEnglishPost.title,
    metaDescription: rubberOdorEnglishPost.description,
    primaryKeyword: rubberOdorEnglishPost.primaryKeyword,
    secondaryKeywords: rubberOdorEnglishPost.secondaryKeywords,
    searchIntent: rubberOdorEnglishPost.searchIntent,
    content: rubberOdorEnglishPost.content,
    excerpt: getExcerpt(rubberOdorEnglishPost.content),
    readingTime: getReadingTime(rubberOdorEnglishPost.content),
    coverImage: rubberOdorEnglishPost.images[0].src,
    coverAlt: rubberOdorEnglishPost.images[0].alt,
    coverWidth: rubberOdorEnglishPost.images[0].width,
    coverHeight: rubberOdorEnglishPost.images[0].height,
    articleImages: rubberOdorEnglishPost.images.slice(1).map((image) => ({
      src: image.src,
      alt: image.alt,
      caption: image.caption ?? image.alt,
      width: image.width,
      height: image.height
    })),
    publishedAt: rubberOdorEnglishPost.publishedAt,
    updatedAt: rubberOdorEnglishPost.updatedAt
  };

  const weightPlateMarkingsPost: ResourcePost = {
    slug: weightPlateMarkingsEnglishPost.publicPath.split("/").filter(Boolean).at(-1) ?? weightPlateMarkingsEnglishPost.entityId,
    title: weightPlateMarkingsEnglishPost.h1,
    seoTitle: weightPlateMarkingsEnglishPost.title,
    metaDescription: weightPlateMarkingsEnglishPost.description,
    primaryKeyword: weightPlateMarkingsEnglishPost.primaryKeyword,
    secondaryKeywords: weightPlateMarkingsEnglishPost.secondaryKeywords,
    searchIntent: weightPlateMarkingsEnglishPost.searchIntent,
    content: weightPlateMarkingsEnglishPost.content,
    excerpt: getExcerpt(weightPlateMarkingsEnglishPost.content),
    readingTime: getReadingTime(weightPlateMarkingsEnglishPost.content),
    coverImage: weightPlateMarkingsEnglishPost.images[0].src,
    coverAlt: weightPlateMarkingsEnglishPost.images[0].alt,
    coverWidth: weightPlateMarkingsEnglishPost.images[0].width,
    coverHeight: weightPlateMarkingsEnglishPost.images[0].height,
    articleImages: weightPlateMarkingsEnglishPost.images.slice(1).map((image) => ({
      src: image.src,
      alt: image.alt,
      caption: image.caption ?? image.alt,
      width: image.width,
      height: image.height
    })),
    publishedAt: weightPlateMarkingsEnglishPost.publishedAt,
    updatedAt: weightPlateMarkingsEnglishPost.updatedAt
  };

  const hexDumbbellAlignmentPost: ResourcePost = {
    slug: hexDumbbellAlignmentEnglishPost.publicPath.split("/").filter(Boolean).at(-1) ?? hexDumbbellAlignmentEnglishPost.entityId,
    title: hexDumbbellAlignmentEnglishPost.h1,
    seoTitle: hexDumbbellAlignmentEnglishPost.title,
    metaDescription: hexDumbbellAlignmentEnglishPost.description,
    primaryKeyword: hexDumbbellAlignmentEnglishPost.primaryKeyword,
    secondaryKeywords: hexDumbbellAlignmentEnglishPost.secondaryKeywords,
    searchIntent: hexDumbbellAlignmentEnglishPost.searchIntent,
    content: hexDumbbellAlignmentEnglishPost.content,
    excerpt: getExcerpt(hexDumbbellAlignmentEnglishPost.content),
    readingTime: getReadingTime(hexDumbbellAlignmentEnglishPost.content),
    coverImage: hexDumbbellAlignmentEnglishPost.images[0].src,
    coverAlt: hexDumbbellAlignmentEnglishPost.images[0].alt,
    coverWidth: hexDumbbellAlignmentEnglishPost.images[0].width,
    coverHeight: hexDumbbellAlignmentEnglishPost.images[0].height,
    articleImages: hexDumbbellAlignmentEnglishPost.images.slice(1).map((image) => ({
      src: image.src,
      alt: image.alt,
      caption: image.caption ?? image.alt,
      width: image.width,
      height: image.height
    })),
    publishedAt: hexDumbbellAlignmentEnglishPost.publishedAt,
    updatedAt: hexDumbbellAlignmentEnglishPost.updatedAt
  };

  const cableAttachmentSwivelPost: ResourcePost = {
    slug: cableAttachmentSwivelEnglishPost.publicPath.split("/").filter(Boolean).at(-1) ?? cableAttachmentSwivelEnglishPost.entityId,
    title: cableAttachmentSwivelEnglishPost.h1,
    seoTitle: cableAttachmentSwivelEnglishPost.title,
    metaDescription: cableAttachmentSwivelEnglishPost.description,
    primaryKeyword: cableAttachmentSwivelEnglishPost.primaryKeyword,
    secondaryKeywords: cableAttachmentSwivelEnglishPost.secondaryKeywords,
    searchIntent: cableAttachmentSwivelEnglishPost.searchIntent,
    content: cableAttachmentSwivelEnglishPost.content,
    excerpt: getExcerpt(cableAttachmentSwivelEnglishPost.content),
    readingTime: getReadingTime(cableAttachmentSwivelEnglishPost.content),
    coverImage: cableAttachmentSwivelEnglishPost.images[0].src,
    coverAlt: cableAttachmentSwivelEnglishPost.images[0].alt,
    coverWidth: cableAttachmentSwivelEnglishPost.images[0].width,
    coverHeight: cableAttachmentSwivelEnglishPost.images[0].height,
    articleImages: cableAttachmentSwivelEnglishPost.images.slice(1).map((image) => ({
      src: image.src,
      alt: image.alt,
      caption: image.caption ?? image.alt,
      width: image.width,
      height: image.height
    })),
    publishedAt: cableAttachmentSwivelEnglishPost.publishedAt,
    updatedAt: cableAttachmentSwivelEnglishPost.updatedAt
  };

  const castIronPlateManufacturingPost: ResourcePost = {
    slug: castIronPlateManufacturingEnglishPost.publicPath.split("/").filter(Boolean).at(-1) ?? castIronPlateManufacturingEnglishPost.entityId,
    title: castIronPlateManufacturingEnglishPost.h1,
    seoTitle: castIronPlateManufacturingEnglishPost.title,
    metaDescription: castIronPlateManufacturingEnglishPost.description,
    primaryKeyword: castIronPlateManufacturingEnglishPost.primaryKeyword,
    secondaryKeywords: castIronPlateManufacturingEnglishPost.secondaryKeywords,
    searchIntent: castIronPlateManufacturingEnglishPost.searchIntent,
    content: castIronPlateManufacturingEnglishPost.content,
    excerpt: getExcerpt(castIronPlateManufacturingEnglishPost.content),
    readingTime: getReadingTime(castIronPlateManufacturingEnglishPost.content),
    coverImage: castIronPlateManufacturingEnglishPost.images[0].src,
    coverAlt: castIronPlateManufacturingEnglishPost.images[0].alt,
    coverWidth: castIronPlateManufacturingEnglishPost.images[0].width,
    coverHeight: castIronPlateManufacturingEnglishPost.images[0].height,
    articleImages: castIronPlateManufacturingEnglishPost.images.slice(1).map((image) => ({
      src: image.src,
      alt: image.alt,
      caption: image.caption ?? image.alt,
      width: image.width,
      height: image.height
    })),
    publishedAt: castIronPlateManufacturingEnglishPost.publishedAt,
    updatedAt: castIronPlateManufacturingEnglishPost.updatedAt
  };

  const weightPlateEdgePost: ResourcePost = {
    slug: weightPlateEdgeEnglishPost.publicPath.split("/").filter(Boolean).at(-1) ?? weightPlateEdgeEnglishPost.entityId,
    title: weightPlateEdgeEnglishPost.h1,
    seoTitle: weightPlateEdgeEnglishPost.title,
    metaDescription: weightPlateEdgeEnglishPost.description,
    primaryKeyword: weightPlateEdgeEnglishPost.primaryKeyword,
    secondaryKeywords: weightPlateEdgeEnglishPost.secondaryKeywords,
    searchIntent: weightPlateEdgeEnglishPost.searchIntent,
    content: weightPlateEdgeEnglishPost.content,
    excerpt: getExcerpt(weightPlateEdgeEnglishPost.content),
    readingTime: getReadingTime(weightPlateEdgeEnglishPost.content),
    coverImage: weightPlateEdgeEnglishPost.images[0].src,
    coverAlt: weightPlateEdgeEnglishPost.images[0].alt,
    coverWidth: weightPlateEdgeEnglishPost.images[0].width,
    coverHeight: weightPlateEdgeEnglishPost.images[0].height,
    articleImages: weightPlateEdgeEnglishPost.images.slice(1).map((image) => ({
      src: image.src,
      alt: image.alt,
      caption: image.caption ?? image.alt,
      width: image.width,
      height: image.height
    })),
    publishedAt: weightPlateEdgeEnglishPost.publishedAt,
    updatedAt: weightPlateEdgeEnglishPost.updatedAt
  };

  const rubberDumbbellHardnessPost: ResourcePost = {
    slug: rubberDumbbellHardnessEnglishPost.publicPath.split("/").filter(Boolean).at(-1) ?? rubberDumbbellHardnessEnglishPost.entityId,
    title: rubberDumbbellHardnessEnglishPost.h1,
    seoTitle: rubberDumbbellHardnessEnglishPost.title,
    metaDescription: rubberDumbbellHardnessEnglishPost.description,
    primaryKeyword: rubberDumbbellHardnessEnglishPost.primaryKeyword,
    secondaryKeywords: rubberDumbbellHardnessEnglishPost.secondaryKeywords,
    searchIntent: rubberDumbbellHardnessEnglishPost.searchIntent,
    content: rubberDumbbellHardnessEnglishPost.content,
    excerpt: getExcerpt(rubberDumbbellHardnessEnglishPost.content),
    readingTime: getReadingTime(rubberDumbbellHardnessEnglishPost.content),
    coverImage: rubberDumbbellHardnessEnglishPost.images[0].src,
    coverAlt: rubberDumbbellHardnessEnglishPost.images[0].alt,
    coverWidth: rubberDumbbellHardnessEnglishPost.images[0].width,
    coverHeight: rubberDumbbellHardnessEnglishPost.images[0].height,
    articleImages: rubberDumbbellHardnessEnglishPost.images.slice(1).map((image) => ({
      src: image.src,
      alt: image.alt,
      caption: image.caption ?? image.alt,
      width: image.width,
      height: image.height
    })),
    publishedAt: rubberDumbbellHardnessEnglishPost.publishedAt,
    updatedAt: rubberDumbbellHardnessEnglishPost.updatedAt
  };

  const rubberDumbbellSurfacePost: ResourcePost = {
    slug: rubberDumbbellSurfaceEnglishPost.publicPath.split("/").filter(Boolean).at(-1) ?? rubberDumbbellSurfaceEnglishPost.entityId,
    title: rubberDumbbellSurfaceEnglishPost.h1,
    seoTitle: rubberDumbbellSurfaceEnglishPost.title,
    metaDescription: rubberDumbbellSurfaceEnglishPost.description,
    primaryKeyword: rubberDumbbellSurfaceEnglishPost.primaryKeyword,
    secondaryKeywords: rubberDumbbellSurfaceEnglishPost.secondaryKeywords,
    searchIntent: rubberDumbbellSurfaceEnglishPost.searchIntent,
    content: rubberDumbbellSurfaceEnglishPost.content,
    excerpt: getExcerpt(rubberDumbbellSurfaceEnglishPost.content),
    readingTime: getReadingTime(rubberDumbbellSurfaceEnglishPost.content),
    coverImage: rubberDumbbellSurfaceEnglishPost.images[0].src,
    coverAlt: rubberDumbbellSurfaceEnglishPost.images[0].alt,
    coverWidth: rubberDumbbellSurfaceEnglishPost.images[0].width,
    coverHeight: rubberDumbbellSurfaceEnglishPost.images[0].height,
    articleImages: rubberDumbbellSurfaceEnglishPost.images.slice(1).map((image) => ({
      src: image.src,
      alt: image.alt,
      caption: image.caption ?? image.alt,
      width: image.width,
      height: image.height
    })),
    publishedAt: rubberDumbbellSurfaceEnglishPost.publishedAt,
    updatedAt: rubberDumbbellSurfaceEnglishPost.updatedAt
  };

  const cableAttachmentFinishPost: ResourcePost = {
    slug: cableAttachmentFinishEnglishPost.publicPath.split("/").filter(Boolean).at(-1) ?? cableAttachmentFinishEnglishPost.entityId,
    title: cableAttachmentFinishEnglishPost.h1,
    seoTitle: cableAttachmentFinishEnglishPost.title,
    metaDescription: cableAttachmentFinishEnglishPost.description,
    primaryKeyword: cableAttachmentFinishEnglishPost.primaryKeyword,
    secondaryKeywords: cableAttachmentFinishEnglishPost.secondaryKeywords,
    searchIntent: cableAttachmentFinishEnglishPost.searchIntent,
    content: cableAttachmentFinishEnglishPost.content,
    excerpt: getExcerpt(cableAttachmentFinishEnglishPost.content),
    readingTime: getReadingTime(cableAttachmentFinishEnglishPost.content),
    coverImage: cableAttachmentFinishEnglishPost.images[0].src,
    coverAlt: cableAttachmentFinishEnglishPost.images[0].alt,
    coverWidth: cableAttachmentFinishEnglishPost.images[0].width,
    coverHeight: cableAttachmentFinishEnglishPost.images[0].height,
    articleImages: cableAttachmentFinishEnglishPost.images.slice(1).map((image) => ({
      src: image.src,
      alt: image.alt,
      caption: image.caption ?? image.alt,
      width: image.width,
      height: image.height
    })),
    publishedAt: cableAttachmentFinishEnglishPost.publishedAt,
    updatedAt: cableAttachmentFinishEnglishPost.updatedAt
  };

  const dumbbellEndCapPost: ResourcePost = {
    slug: dumbbellEndCapEnglishPost.publicPath.split("/").filter(Boolean).at(-1) ?? dumbbellEndCapEnglishPost.entityId,
    title: dumbbellEndCapEnglishPost.h1,
    seoTitle: dumbbellEndCapEnglishPost.title,
    metaDescription: dumbbellEndCapEnglishPost.description,
    primaryKeyword: dumbbellEndCapEnglishPost.primaryKeyword,
    secondaryKeywords: dumbbellEndCapEnglishPost.secondaryKeywords,
    searchIntent: dumbbellEndCapEnglishPost.searchIntent,
    content: dumbbellEndCapEnglishPost.content,
    excerpt: getExcerpt(dumbbellEndCapEnglishPost.content),
    readingTime: getReadingTime(dumbbellEndCapEnglishPost.content),
    coverImage: dumbbellEndCapEnglishPost.images[0].src,
    coverAlt: dumbbellEndCapEnglishPost.images[0].alt,
    coverWidth: dumbbellEndCapEnglishPost.images[0].width,
    coverHeight: dumbbellEndCapEnglishPost.images[0].height,
    articleImages: dumbbellEndCapEnglishPost.images.slice(1).map((image) => ({
      src: image.src,
      alt: image.alt,
      caption: image.caption ?? image.alt,
      width: image.width,
      height: image.height
    })),
    publishedAt: dumbbellEndCapEnglishPost.publishedAt,
    updatedAt: dumbbellEndCapEnglishPost.updatedAt
  };

  const barbellPackagingPost: ResourcePost = {
    slug: barbellPackagingEnglishPost.publicPath.split("/").filter(Boolean).at(-1) ?? barbellPackagingEnglishPost.entityId,
    title: barbellPackagingEnglishPost.h1,
    seoTitle: barbellPackagingEnglishPost.title,
    metaDescription: barbellPackagingEnglishPost.description,
    primaryKeyword: barbellPackagingEnglishPost.primaryKeyword,
    secondaryKeywords: barbellPackagingEnglishPost.secondaryKeywords,
    searchIntent: barbellPackagingEnglishPost.searchIntent,
    content: barbellPackagingEnglishPost.content,
    excerpt: getExcerpt(barbellPackagingEnglishPost.content),
    readingTime: getReadingTime(barbellPackagingEnglishPost.content),
    coverImage: barbellPackagingEnglishPost.images[0].src,
    coverAlt: barbellPackagingEnglishPost.images[0].alt,
    coverWidth: barbellPackagingEnglishPost.images[0].width,
    coverHeight: barbellPackagingEnglishPost.images[0].height,
    articleImages: barbellPackagingEnglishPost.images.slice(1).map((image) => ({
      src: image.src,
      alt: image.alt,
      caption: image.caption ?? image.alt,
      width: image.width,
      height: image.height
    })),
    publishedAt: barbellPackagingEnglishPost.publishedAt,
    updatedAt: barbellPackagingEnglishPost.updatedAt
  };

  const barbellMaintenancePost: ResourcePost = {
    slug: barbellMaintenanceEnglishPost.publicPath.split("/").filter(Boolean).at(-1) ?? barbellMaintenanceEnglishPost.entityId,
    title: barbellMaintenanceEnglishPost.h1,
    seoTitle: barbellMaintenanceEnglishPost.title,
    metaDescription: barbellMaintenanceEnglishPost.description,
    primaryKeyword: barbellMaintenanceEnglishPost.primaryKeyword,
    secondaryKeywords: barbellMaintenanceEnglishPost.secondaryKeywords,
    searchIntent: barbellMaintenanceEnglishPost.searchIntent,
    content: barbellMaintenanceEnglishPost.content,
    excerpt: getExcerpt(barbellMaintenanceEnglishPost.content),
    readingTime: getReadingTime(barbellMaintenanceEnglishPost.content),
    coverImage: barbellMaintenanceEnglishPost.images[0].src,
    coverAlt: barbellMaintenanceEnglishPost.images[0].alt,
    coverWidth: barbellMaintenanceEnglishPost.images[0].width,
    coverHeight: barbellMaintenanceEnglishPost.images[0].height,
    articleImages: barbellMaintenanceEnglishPost.images.slice(1).map((image) => ({
      src: image.src,
      alt: image.alt,
      caption: image.caption ?? image.alt,
      width: image.width,
      height: image.height
    })),
    publishedAt: barbellMaintenanceEnglishPost.publishedAt,
    updatedAt: barbellMaintenanceEnglishPost.updatedAt
  };

  const urethaneDumbbellSurfacePost: ResourcePost = {
    slug: urethaneDumbbellSurfaceEnglishPost.publicPath.split("/").filter(Boolean).at(-1) ?? urethaneDumbbellSurfaceEnglishPost.entityId,
    title: urethaneDumbbellSurfaceEnglishPost.h1,
    seoTitle: urethaneDumbbellSurfaceEnglishPost.title,
    metaDescription: urethaneDumbbellSurfaceEnglishPost.description,
    primaryKeyword: urethaneDumbbellSurfaceEnglishPost.primaryKeyword,
    secondaryKeywords: urethaneDumbbellSurfaceEnglishPost.secondaryKeywords,
    searchIntent: urethaneDumbbellSurfaceEnglishPost.searchIntent,
    content: urethaneDumbbellSurfaceEnglishPost.content,
    excerpt: getExcerpt(urethaneDumbbellSurfaceEnglishPost.content),
    readingTime: getReadingTime(urethaneDumbbellSurfaceEnglishPost.content),
    coverImage: urethaneDumbbellSurfaceEnglishPost.images[0].src,
    coverAlt: urethaneDumbbellSurfaceEnglishPost.images[0].alt,
    coverWidth: urethaneDumbbellSurfaceEnglishPost.images[0].width,
    coverHeight: urethaneDumbbellSurfaceEnglishPost.images[0].height,
    articleImages: urethaneDumbbellSurfaceEnglishPost.images.slice(1).map((image) => ({
      src: image.src,
      alt: image.alt,
      caption: image.caption ?? image.alt,
      width: image.width,
      height: image.height
    })),
    publishedAt: urethaneDumbbellSurfaceEnglishPost.publishedAt,
    updatedAt: urethaneDumbbellSurfaceEnglishPost.updatedAt
  };

  return [...legacyPosts, ...expansionPosts, ...commercialGrowthPosts, steelDumbbellPost, cableAttachmentPost, weightPlateTolerancePost, commercialOlympicBarbellPost, dumbbellHeadRetentionPost, kgLbFreeWeightPost, fixedVsAdjustablePost, barbellFinishPost, plateBarFitPost, barbellKnurlingPost, bumperPlateLoadingPost, barbellStraightnessPost, bumperPlateBouncePost, cableAttachmentLoadPost, dumbbellHandlePost, plateDiameterPost, rubberCoatingAdhesionPost, barbellShaftStrengthPost, cableAttachmentGripPost, bumperPlateHubPost, barbellSleeveRetentionPost, barbellCollarPost, barbellSleeveRotationPost, plateGripOpeningsPost, tricepsRopePost, latPulldownBarPost, barbellWhipPost, castIronPlateFinishPost, barbellSleeveSurfacePost, customColorFreeWeightsPost, barbellMassPost, weightPlateFlatnessPost, changePlatesPost, dumbbellRackPost, barbellShaftDiameterPost, rubberOdorPost, weightPlateMarkingsPost, hexDumbbellAlignmentPost, cableAttachmentSwivelPost, castIronPlateManufacturingPost, weightPlateEdgePost, rubberDumbbellHardnessPost, rubberDumbbellSurfacePost, cableAttachmentFinishPost, dumbbellEndCapPost, barbellPackagingPost, barbellMaintenancePost, urethaneDumbbellSurfacePost].sort((a, b) => {
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
