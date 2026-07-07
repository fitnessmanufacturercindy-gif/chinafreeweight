export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://www.chinafreeweight.com";

export const siteName = "PowerBaseFit";

export const company = {
  brandName: siteName,
  legalName: "Powerbase Fitness Equipment Co.,Ltd",
  address: "Zhengyang Road, Ningjin County, Dezhou, Shandong Province, China",
  localAddress: "山东省德州市宁津县正阳路",
  founded: "2008",
  factorySize: "8,000 m2",
  email: "kloe@powerbasefit.com",
  phone: "+86 18963018533",
  whatsapp: "+86 18963018533",
  mainProducts: ["Dumbbells", "Weight Plates", "Barbell Plates", "Home Gym Functional Trainers"],
  exportMarkets: ["Europe", "USA", "North America", "South America", "Middle East"]
};

export const sourcingFacts = {
  moq:
    "MOQ depends on the product style, customization requirements, and order plan. PBF confirms the practical MOQ after reviewing the buyer's product list and market needs.",
  packaging:
    "Multi-functional racks and home gym functional trainers are usually packed in wooden crates. Dumbbells, weight plates, and gym accessories are usually packed in cartons, or customized according to buyer requirements.",
  leadTime:
    "Lead time depends on order quantity and customization details. Standard orders can usually be shipped around 10 days after deposit when materials and production schedule are confirmed.",
  quality:
    "Quality checks can include material review, surface finish inspection, weight confirmation, assembly check, packing inspection, and shipment preparation."
};

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.legalName,
  alternateName: company.brandName,
  url: siteUrl,
  logo: `${siteUrl}/assets/logo-readable.png`,
  foundingDate: company.founded,
  email: company.email,
  telephone: company.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Zhengyang Road, Ningjin County",
    addressLocality: "Dezhou",
    addressRegion: "Shandong",
    addressCountry: "CN"
  },
  areaServed: company.exportMarkets,
  makesOffer: company.mainProducts.map((name) => ({
    "@type": "Offer",
    itemOffered: {
      "@type": "Product",
      name
    }
  }))
};
