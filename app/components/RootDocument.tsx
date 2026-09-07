import WhatsAppButton from "./WhatsAppButton";
import { localBusinessJsonLd, organizationJsonLd, websiteJsonLd } from "../site";
import "../globals.css";

type RootDocumentProps = {
  children: React.ReactNode;
  header: React.ReactNode;
  footer: React.ReactNode;
  lang: string;
  direction: "ltr" | "rtl";
  preloadEnglishHero?: boolean;
  whatsAppLabel?: string;
  whatsAppMessage?: string;
  schemaLocale?: "pt" | "pt-BR" | "es" | "de" | "fr" | "vi" | "sv" | "it" | "ko" | "id" | "pl" | "nl";
};

export default function RootDocument({
  children,
  header,
  footer,
  lang,
  direction,
  preloadEnglishHero = false,
  whatsAppLabel,
  whatsAppMessage,
  schemaLocale
}: RootDocumentProps) {
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const analyticsScript = `
    (() => {
      const measurementId = ${JSON.stringify(gaMeasurementId || "")};
      window.dataLayer = window.dataLayer || [];
      window.gtag = window.gtag || function(){ window.dataLayer.push(arguments); };
      const clean = (value) => (value || "").replace(/\\s+/g, " ").trim().slice(0, 120);
      const track = (name, parameters = {}) => window.gtag("event", name, {
        page_path: window.location.pathname,
        page_language: document.documentElement.lang || "en",
        ...parameters
      });
      document.addEventListener("click", (event) => {
        const target = event.target instanceof Element ? event.target : null;
        const link = target?.closest("a");
        const href = link?.getAttribute("href") || "";
        const label = clean(target?.closest("a, button")?.textContent);
        const normalized = (label + " " + href).toLowerCase();
        const leadType = link?.getAttribute("data-lead-type") || "";
        const leadChannel = link?.getAttribute("data-lead-channel") || "";
        const sourceSection = link?.getAttribute("data-analytics-section") || "unknown";
        if (leadType === "free-sample") {
          track("free_sample_click", {
            event_category: "lead",
            event_label: label || "Free Sample",
            lead_channel: leadChannel || "unknown",
            source_section: sourceSection
          });
          if (leadChannel === "whatsapp") {
            track("sample_whatsapp_click", { event_category: "lead", source_section: sourceSection });
          } else if (leadChannel === "email") {
            track("sample_email_click", { event_category: "lead", source_section: sourceSection });
          }
        }
        if (href.startsWith("https://wa.me/") || href.includes("whatsapp")) {
          track("whatsapp_click", { event_category: "lead", event_label: label || "WhatsApp", link_url: href });
        } else if (href.startsWith("mailto:")) {
          track("email_click", { event_category: "lead", event_label: label || href.replace("mailto:", ""), link_url: href });
        } else if (normalized.includes("get a quote") || normalized.includes("request quote") || normalized.includes("get factory price")) {
          track("get_quote_click", { event_category: "lead", event_label: label || "Get Quote" });
        }
        if (normalized.includes("catalog") || normalized.includes("download") || href.toLowerCase().endsWith(".pdf")) {
          track("download_catalog", { event_category: "content", event_label: label || "Catalog", link_url: href });
        }
        if (window.location.pathname.startsWith("/products/") && href === "/contact") {
          track("product_inquiry", { event_category: "lead", event_label: label || "Product Inquiry", product_path: window.location.pathname });
        }
      }, { passive: true });
      document.addEventListener("submit", (event) => {
        if (!(event.target instanceof HTMLFormElement) || event.defaultPrevented) return;
        const parameters = {
          event_category: "lead",
          event_label: event.target.getAttribute("aria-label") || event.target.id || "Contact Form",
          transport_type: "beacon"
        };
        track("generate_lead", parameters);
        track("contact_form_submit", parameters);
        if (event.target.id === "oem-rfq-form") {
          track("oem_rfq_submit", { ...parameters, source_section: "oem-rfq" });
        }
      });
      if (measurementId) {
        window.setTimeout(() => {
          window.gtag("js", new Date());
          window.gtag("config", measurementId);
          const script = document.createElement("script");
          script.async = true;
          script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(measurementId);
          document.head.appendChild(script);
        }, 3500);
      }
    })();
  `;
  const schemaLanguage = schemaLocale;
  const localizedSchema = schemaLocale === "pt" || schemaLocale === "pt-BR"
    ? {
        products: ["Halteres", "Anilhas", "Barras", "Acessórios para academia"],
        websiteName: "PowerBaseFit fabricante de equipamentos para academia",
        businessDescription: "A PowerBaseFit fabrica halteres, anilhas, barras e acessórios para importadores, distribuidores, marcas próprias e projetos de academias."
      }
    : schemaLocale === "es"
      ? {
          products: ["Mancuernas", "Discos de peso", "Barras", "Accesorios de gimnasio"],
          websiteName: "PowerBaseFit fabricante de equipos de gimnasio",
          businessDescription: "PowerBaseFit fabrica mancuernas, discos de peso, barras y accesorios para importadores, distribuidores, marcas propias y proyectos de gimnasios."
        }
      : schemaLocale === "de"
        ? {
            products: ["Kurzhanteln", "Gewichtsscheiben", "Bumper Plates", "Fitnesszubeh\u00f6r"],
            websiteName: "PowerBaseFit Hersteller f\u00fcr Fitnessstudio-Ausstattung",
            businessDescription: "PowerBaseFit fertigt Kurzhanteln, Gewichtsscheiben, Bumper Plates und Zubeh\u00f6r f\u00fcr Importeure, Fachh\u00e4ndler, Eigenmarken und Fitnessstudio-Projekte."
          }
        : schemaLocale === "fr"
          ? {
              products: ["Haltères", "Disques de musculation", "Bumper plates", "Accessoires de fitness"],
              websiteName: "PowerBaseFit fabricant d’équipements de musculation professionnels",
              businessDescription: "PowerBaseFit fabrique des haltères, disques, bumper plates et accessoires pour importateurs, distributeurs, marques privées et projets de salles de sport."
            }
          : schemaLocale === "vi"
            ? {
                products: ["Tạ tay", "Bánh tạ", "Đĩa tạ bumper", "Khung tập", "Ghế tập", "Phụ kiện phòng gym"],
                websiteName: "PowerBaseFit nhà sản xuất thiết bị phòng gym chuyên nghiệp",
                businessDescription: "PowerBaseFit sản xuất tạ tay, bánh tạ, khung tập, ghế tập và phụ kiện cho nhà nhập khẩu, nhà phân phối, thương hiệu riêng và dự án phòng gym."
              }
            : schemaLocale === "sv"
              ? {
                  products: ["Hantlar", "Viktskivor", "Bumpervikter", "Rack", "Träningsbänkar", "Gymtillbehör"],
                  websiteName: "PowerBaseFit tillverkare av professionell gymutrustning",
                  businessDescription: "PowerBaseFit tillverkar hantlar, viktskivor, bumpervikter, rack, bänkar och tillbehör för importörer, distributörer, egna varumärken och kommersiella gymprojekt."
                }
            : schemaLocale === "it"
              ? {
                  products: ["Manubri", "Dischi pesi", "Dischi bumper", "Rack", "Panche", "Accessori palestra"],
                  websiteName: "PowerBaseFit produttore di attrezzature fitness professionali",
                  businessDescription: "PowerBaseFit produce manubri, dischi pesi, bumper, rack, panche e accessori per importatori, distributori, marchi privati e progetti palestra."
                }
            : schemaLocale === "ko"
              ? {
                  products: ["상업용 덤벨", "웨이트 원판", "범퍼 플레이트", "파워랙", "벤치", "헬스장 액세서리"],
                  websiteName: "PowerBaseFit 상업용 헬스기구 제조업체",
                  businessDescription: "PowerBaseFit는 한국 수입업체, 유통사, 자체 브랜드와 헬스장 프로젝트를 위해 덤벨, 원판, 범퍼 플레이트, 랙, 벤치와 액세서리를 제조·공급합니다."
                }
            : schemaLocale === "id"
              ? {
                  products: ["Dumbbell komersial", "Piring beban", "Bumper plate", "Aksesori gym"],
                  websiteName: "PowerBaseFit produsen peralatan gym profesional",
                  businessDescription: "PowerBaseFit memproduksi dumbbell, piring beban, bumper plate, rack, bench, dan aksesori untuk importir, distributor, merek sendiri, serta proyek gym komersial."
                }
            : schemaLocale === "pl"
              ? {
                  products: ["Hantle komercyjne", "Obciążenia olimpijskie", "Talerze bumper", "Stojaki treningowe", "Ławki", "Akcesoria fitness"],
                  websiteName: "PowerBaseFit producent profesjonalnego sprzętu fitness",
                  businessDescription: "PowerBaseFit produkuje hantle, obciążenia, talerze bumper i akcesoria dla importerów, dystrybutorów, marek własnych oraz projektów siłowni komercyjnych."
                }
            : schemaLocale === "nl"
              ? {
                  products: ["Commerciële halters", "Halterschijven", "Bumper plates", "Trainingsrekken", "Fitnessbanken", "Fitnessaccessoires"],
                  websiteName: "PowerBaseFit fabrikant van professionele fitnessapparatuur",
                  businessDescription: "PowerBaseFit produceert halters, halterschijven, bumper plates en accessoires voor importeurs, distributeurs, private labels en commerciële fitnessprojecten."
                }
          : undefined;
  const schemas = localizedSchema && schemaLanguage
    ? [
        {
          ...organizationJsonLd,
          inLanguage: schemaLanguage,
          makesOffer: localizedSchema.products.map((name) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Product", name, inLanguage: schemaLanguage }
          }))
        },
        {
          ...websiteJsonLd,
          alternateName: localizedSchema.websiteName,
          inLanguage: schemaLanguage
        },
        {
          ...localBusinessJsonLd,
          inLanguage: schemaLanguage,
          description: localizedSchema.businessDescription
        }
      ]
    : [organizationJsonLd, websiteJsonLd, localBusinessJsonLd];

  return (
    <html lang={lang} dir={direction}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        {preloadEnglishHero ? (
          <>
            <link rel="preload" as="image" href="/assets/hero-poster.avif" type="image/avif" media="(min-width: 701px)" fetchPriority="high" />
            <link rel="preload" as="image" href="/assets/hero-poster-mobile.avif" type="image/avif" media="(max-width: 700px)" fetchPriority="high" />
          </>
        ) : null}
      </head>
      <body>
        {schemas.map((schema, index) => (
          <script key={`${schema["@type"]}-${index}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        ))}
        {header}
        {children}
        {footer}
        <WhatsAppButton label={whatsAppLabel} message={whatsAppMessage} />
        <script dangerouslySetInnerHTML={{ __html: analyticsScript }} />
      </body>
    </html>
  );
}
