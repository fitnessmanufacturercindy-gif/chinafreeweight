import fs from "fs";
import path from "path";

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
  articleImages: ResourceImage[];
  publishedAt: string;
  updatedAt: string;
};

export type ResourceImage = {
  src: string;
  alt: string;
  caption: string;
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
    coverImage: "/assets/factory.webp",
    coverAlt: "PowerBaseFit factory exterior in Dezhou China",
    articleImages: [
      {
        src: "/assets/factory.webp",
        alt: "PowerBaseFit manufacturing base exterior for OEM gym equipment buyers",
        caption: "Factory exterior and manufacturing base for overseas free weight buyers."
      },
      {
        src: "/assets/factory-process/dumbbell-cutting.webp",
        alt: "Precision cutting line for dumbbell and free weight manufacturing",
        caption: "Precision manufacturing equipment helps buyers evaluate factory process control."
      },
      {
        src: "/assets/factory-cases/packaging-area-pbf.webp",
        alt: "PowerBaseFit free weight packaging area before export shipment",
        caption: "Packaging and shipment preparation are important checks before container loading."
      }
    ]
  },
  "how-to-choose-commercial-dumbbells": {
    coverImage: "/assets/project-dumbbell-zone.webp",
    coverAlt: "Commercial gym dumbbell area with rows of free weights",
    articleImages: [
      {
        src: "/assets/hex-dumbbells.webp",
        alt: "Hex dumbbells for commercial gyms and wholesale free weight programs",
        caption: "Hex dumbbells are common for commercial gyms, dealers, and starter free weight lines."
      },
      {
        src: "/assets/chrome-dumbbell.webp",
        alt: "Chrome dumbbells with polished finish and knurled handles",
        caption: "Chrome dumbbells are often selected for premium showrooms and high-end gym areas."
      },
      {
        src: "/assets/dumbbell-production.webp",
        alt: "Finished dumbbells arranged in factory production area",
        caption: "Production consistency, finish quality, and packaging planning should be checked before shipment."
      }
    ]
  },
  "weight-plates-vs-bumper-plates-b2b-guide": {
    coverImage: "/assets/project-plate-zone.webp",
    coverAlt: "Commercial weight plate and barbell training area",
    articleImages: [
      {
        src: "/assets/weight-plate.webp",
        alt: "Black weight plates with color weight markings for gym projects",
        caption: "Standard weight plates are often used for strength zones, dealers, and mixed equipment orders."
      },
      {
        src: "/assets/factory-process/plate-surface-treatment.webp",
        alt: "Weight plate surface treatment process in factory workshop",
        caption: "Surface treatment and finish inspection affect long-term appearance and durability."
      },
      {
        src: "/assets/factory-cases/container-shipping-pbf.webp",
        alt: "Container loading and export shipment for free weight equipment",
        caption: "For plate orders, packaging and container planning protect the product during export shipping."
      }
    ]
  }
};

const fallbackVisuals = {
  coverImage: "/assets/case-gym.webp",
  coverAlt: "PowerBaseFit free weight product display",
  articleImages: [
    {
      src: "/assets/case-gym.webp",
      alt: "PowerBaseFit free weight project display",
      caption: "Project reference image for free weight sourcing decisions."
    }
  ]
};

function readFrontmatter(source: string) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);

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
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  return fs
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
    })
    .sort((a, b) => {
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
      return priority.indexOf(a.slug) - priority.indexOf(b.slug);
    });
}

export function getPostBySlug(slug: string) {
  return getAllPosts().find((post) => post.slug === slug);
}
