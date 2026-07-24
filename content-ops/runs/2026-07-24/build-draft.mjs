import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const runDate = "2026-07-24";
const slug = "cable-attachment-sku-compatibility-register";
const publicPath = `/resources/${slug}`;
const title = "Cable Attachment SKU Compatibility Register for Distributors";
const directAnswer = "A distributor should approve a cable attachment SKU only when its commercial identity, supplier model and revision, connection geometry, intended machine context, exclusions, and verification record are tied together. A product name or photograph can support discovery, but neither is sufficient evidence that a replacement will connect, move, clear adjacent parts, or remain traceable after the next reorder.";

const sections = [
  {
    heading: "One catalogue name can hide several purchasing decisions",
    paragraphs: [
      "Terms such as lat bar, row handle, stirrup handle, and triceps rope describe a use pattern, not a controlled interface. Two attachments sold under the same name may differ at the connecting eye, swivel, grip position, overall envelope, surface finish, or marking. Those differences can affect whether the attachment reaches the connector, rotates without interference, feels consistent beside the installed range, and can be identified when a customer orders one replacement.",
      "For a distributor, the compatibility record is therefore not a universal fit claim. It is a boundary around what has actually been checked. The useful question is not “Does this fit cable machines?” but “Which supplier revision was evaluated with which named machine or connector condition, what evidence was retained, and which combinations remain unapproved?”"
    ]
  },
  {
    heading: "Separate sales identity from physical compatibility",
    paragraphs: [
      "Keep the distributor SKU stable as the commercial record, then link it to the supplier model code and revision that were actually purchased. If a GTIN is assigned, apply it according to the organization’s identification rules; the GS1 GTIN Management Standard explains when trade-item changes may require a new identifier. A GTIN identifies a trade item, but it does not replace a drawing revision, approved sample reference, or a compatibility decision.",
      "The physical record should describe the interface without assuming that one dimension proves fit. Record the connector type and the geometry that governs engagement, then add the attachment envelope, rotation or articulation features, grip layout, and any contact point that could foul the machine. Units, measurement method, source document, and revision belong beside each value. Marketing names can remain searchable aliases, but they should not be the acceptance key."
    ],
    table: {
      headers: ["Register field", "Evidence to retain", "Decision it supports"],
      rows: [
        ["Distributor identity", "Distributor SKU, GTIN when used, selling name and market", "Which trade item sales and service teams are discussing"],
        ["Supply identity", "Supplier model, drawing or specification revision, order and sample reference", "Whether a reorder is the same controlled version"],
        ["Connection interface", "Named features, relevant dimensions, units, method and dated record", "Whether the attachment can engage the intended connector"],
        ["Use envelope", "Overall geometry, movement or clearance observations, machine context", "Whether connected movement is free from observed interference"],
        ["Approval boundary", "Confirmed pairings, exclusions, evidence owner and review date", "Where the distributor may and may not make a compatibility statement"]
      ]
    }
  },
  {
    heading: "Build an evidence ladder instead of a yes-or-no column",
    paragraphs: [
      "Use evidence levels so that an unverified lead cannot silently become an approved replacement. A catalogue match may justify requesting data. A supplier document can support comparison when its model and revision are identifiable. A retained sample measurement can confirm the sample in hand. A controlled fit and movement check on the named equipment can support a specific pairing. Each level answers a different question, so the register should show the highest completed level and link to the record behind it.",
      "A fit check should start with identification and condition, continue through connection and clearance, and end with a documented decision by the responsible party. The exact check must follow the intended equipment and competent safety process; this article does not prescribe a universal load test or declare any attachment interchangeable. ISO 20957-1 provides general safety requirements and test methods for stationary training equipment, but citing the standard is not evidence that a particular accessory-machine combination conforms or is safe."
    ]
  },
  {
    heading: "Make exclusions visible to sales, receiving, and service",
    paragraphs: [
      "Compatibility data fails operationally when it lives only in a buyer’s inbox. Sales needs a customer-facing boundary: confirmed, conditional, or not evaluated. Receiving needs the supplier model, revision, marking, and selected characteristics that distinguish the approved supply. Service needs the installed machine identifier, the attachment SKU, and the evidence reference used for the replacement decision. Give each team the same status vocabulary while limiting access to technical files as appropriate.",
      "Treat a supplier change as a review trigger, not proof of nonconformity and not an automatic approval. Changes to the connecting feature, material or construction, swivel arrangement, grip geometry, coating, marking, packaging identification, or supplier model code can affect different parts of the decision. The register owner should decide which evidence must be refreshed before the changed item is released under the existing distributor SKU."
    ],
    bullets: [
      "Quarantine an item when its supplier identity or revision cannot be reconciled with the approved record.",
      "Do not convert visual similarity, a shared product name, or a connector that closes into a general compatibility claim.",
      "Retain photographs only as supporting identification; pair them with model, revision, date, and the relevant dimensional or functional record.",
      "Record negative results and excluded pairings so another team does not repeat the same assumption."
    ]
  },
  {
    heading: "Use the next reorder as the control test",
    paragraphs: [
      "The register proves its value when the original buyer is not present. Before releasing a repeat order, compare the requested distributor SKU with the latest approved supplier identity, open change notices, evidence level, and customer-specific exclusions. If those records do not reconcile, pause the compatibility statement and obtain the missing evidence. This small release gate prevents an old product name from carrying an unreviewed revision into sales, receiving, and after-sales service."
    ]
  }
];

const faq = [
  {
    question: "Should one attachment SKU list every cable machine it might fit?",
    answer: "No. List only machine or connector contexts supported by retained evidence, and keep unknown or excluded combinations visible. An open-ended “universal” field is difficult to maintain and encourages sales claims beyond the approved boundary."
  },
  {
    question: "Can an approved sample replace the compatibility register?",
    answer: "No. A sample is one evidence object. The register connects that sample to the distributor SKU, supplier identity and revision, evaluated context, decision owner, and future reorder trigger."
  }
];

const internalLinks = [
  { href: "/products/gym-accessories/cable-machine-attachments", label: "Review cable machine attachment categories" },
  { href: "/products/gym-accessories/lat-pulldown-handles", label: "Compare lat pulldown handle formats" },
  { href: "/oem", label: "Document an OEM accessory requirement" },
  { href: "/contact", label: "Request a model-specific compatibility data pack" }
];

const sources = [
  {
    title: "GS1 GTIN Management Standard",
    url: "https://www.gs1.org/1/gtinrules/en/",
    primary: true
  },
  {
    title: "ISO 20957-1:2013 — Stationary training equipment, Part 1",
    url: "https://www.iso.org/standard/57937.html",
    primary: true
  },
  {
    title: "GymWeightSupply dumbbell handle product catalogue",
    url: "https://gymweightsupply.com/en/products/dumbbell-handles",
    primary: false
  },
  {
    title: "ChinaFreeWeight cable machine attachments category",
    url: "https://www.chinafreeweight.com/products/gym-accessories/cable-machine-attachments",
    primary: true
  }
];

const document = {
  id: "chinafreeweight-2026-07-24-en-01",
  siteId: "chinafreeweight",
  runDate,
  locale: "en",
  author: "ChinaFreeWeight Technical Editorial Team",
  slug,
  proposedPublicPath: publicPath,
  title,
  metaDescription: "A distributor-focused method for controlling cable attachment identity, interface evidence, approved pairings, exclusions, revisions, and replacement orders.",
  h1: title,
  directAnswer,
  sections,
  faq,
  internalLinks,
  sources,
  images: [
    {
      src: "/assets/products/gym-accessories/handles/cable-machine-attachments-large.webp",
      alt: "Assortment of cable machine attachments prepared for distributor range planning",
      provenance: "Existing ChinaFreeWeight repository product asset, introduced in site commit 5d02b12 and already used on the cable attachment category.",
      rights: "ChinaFreeWeight-managed first-party site asset approved for reuse on ChinaFreeWeight; illustrative product image, not test or compatibility evidence."
    }
  ],
  targetKeyword: "cable attachment compatibility register for distributors",
  intent: directAnswer,
  searchIntentClass: "quality_control",
  coreIntentKey: "cable-attachment-sku-compatibility-register-distributor",
  targetBuyer: "Distributor",
  relatedQuestions: [
    "How should a distributor record cable attachment compatibility?",
    "What evidence is needed before selling a replacement cable handle?",
    "When should a cable attachment SKU or compatibility approval be reviewed?"
  ],
  whyThisArticleExists: "English-language supplier results expose broad handle catalogues and customization menus, but distributor buyers still lack a practical method to separate trade-item identity from physical fit, movement clearance, controlled revisions, and customer-specific replacement evidence.",
  independentInsights: [
    "A familiar catalogue name is a discovery label rather than a compatibility boundary; the controlled decision must join distributor identity, supplier revision, interface evidence, use context, exclusions, and an accountable approval.",
    "A single yes-or-no compatibility field destroys evidence maturity. Catalogue comparison, supplier documents, sample measurements, and controlled checks answer different questions and should be recorded as an evidence ladder.",
    "The most revealing control point is not initial range selection but the next reorder, when supplier changes and staff turnover expose whether the approved identity and evidence can be reconstructed without relying on memory."
  ],
  structureFamily: "technical_system_walkthrough",
  outlineRationale: "The article moves from the ambiguity in catalogue naming to the controlled record, evidence maturity, cross-team use, and the reorder release gate. The table appears only where mapping each field to evidence and a decision reduces purchasing ambiguity.",
  decisionConsequence: "Without a revision-controlled register, a distributor may sell or reorder a visually similar attachment under an old SKU without evidence for the actual connector, movement envelope, or machine context; with it, unsupported combinations are paused and investigated before release.",
  ctaStrategy: "Invite the distributor to submit named machine contexts and current SKU data for a model-specific evidence pack, rather than offering a generic quotation or implying universal compatibility.",
  cta: {
    label: "Request a model-specific compatibility data pack",
    href: "/contact",
    buyerValue: "ChinaFreeWeight can return product identity, available drawings or measurements, revision references, and clearly bounded follow-up questions for the distributor’s own approval record."
  },
  languageCreationMode: "local-market-original",
  translationSourceId: null,
  localMarketEvidence: [
    {
      market: "English-language international B2B market",
      question: "How do wholesale fitness suppliers present attachment and handle ranges?",
      sourceUrl: "https://gymweightsupply.com/en/products/dumbbell-handles",
      finding: "Search-visible supplier catalogues emphasize product categories, materials, customization, and range breadth; they do not give distributors a shared, revision-controlled decision record for installed-machine replacement contexts."
    },
    {
      market: "International standards and identification practice",
      question: "Which identity and safety references help frame, but do not replace, a compatibility decision?",
      sourceUrl: "https://www.gs1.org/1/gtinrules/en/",
      finding: "Trade-item identification and product safety standards serve different purposes. A distributor still needs an internal record that binds commercial identity and supplier revision to the exact evidence and approved use boundary."
    }
  ]
};

const renderTable = (table) => {
  if (!table) return "";
  const header = `| ${table.headers.join(" | ")} |`;
  const divider = `| ${table.headers.map(() => "---").join(" | ")} |`;
  const rows = table.rows.map((row) => `| ${row.join(" | ")} |`).join("\n");
  return `\n${header}\n${divider}\n${rows}\n`;
};

const body = [
  `# ${title}`,
  directAnswer,
  ...sections.flatMap((section) => [
    `## ${section.heading}`,
    ...section.paragraphs,
    renderTable(section.table),
    ...(section.bullets?.length ? section.bullets.map((item) => `- ${item}`) : [])
  ]),
  "## Questions distributors ask before release",
  ...faq.flatMap((item) => [`### ${item.question}`, item.answer]),
  "## Source notes",
  "The references below define identification or safety context and show the market catalogue pattern. They do not certify a specific ChinaFreeWeight attachment-machine pairing.",
  ...sources.map((source) => `- [${source.title}](${source.url})`),
  "## Turn the register into a supplier data request",
  "If your team already has distributor SKUs and named machine contexts, share those records instead of asking whether a handle is universal. ChinaFreeWeight can respond with available product identity, revision, drawing or measurement evidence, and unresolved questions for your approval workflow.",
  `CTA Button: ${document.cta.label}`
].filter(Boolean).join("\n\n");

const frontmatter = `---
seo_title: "Cable Attachment Compatibility Register | Distributor Guide"
meta_description: "${document.metaDescription}"
primary_keyword: "${document.targetKeyword}"
secondary_keywords: "cable handle SKU control, cable attachment replacement evidence, gym accessory distributor"
search_intent: "B2B distributor compatibility and reorder control"
published_at: "${runDate}"
updated_at: "${runDate}"
author: "${document.author}"
author_url: "/factory"
guide_label: "ChinaFreeWeight Technical Guide"
---`;

const runDirectory = resolve("content-ops", "runs", runDate);
await mkdir(resolve(runDirectory, "drafts"), { recursive: true });
await writeFile(
  resolve(runDirectory, "drafts", "index.json"),
  `${JSON.stringify({ schemaVersion: 1, siteId: "chinafreeweight", runDate, status: "qa-pending", documents: [document] }, null, 2)}\n`,
  "utf8"
);
await writeFile(resolve("content", "resources", `${slug}.md`), `${frontmatter}\n\n${body}\n`, "utf8");

console.log(JSON.stringify({
  draft: resolve(runDirectory, "drafts", "index.json"),
  article: resolve("content", "resources", `${slug}.md`),
  sectionCount: sections.length,
  paragraphCount: sections.reduce((sum, section) => sum + section.paragraphs.length, 0),
  faqCount: faq.length,
  publicPath
}, null, 2));
