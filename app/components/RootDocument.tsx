import DelayedAnalyticsEvents from "./DelayedAnalyticsEvents";
import GoogleAnalyticsLoader from "./GoogleAnalyticsLoader";
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
  schemaLocale?: "pt" | "pt-BR" | "es" | "de" | "fr" | "vi" | "sv" | "it" | "ko" | "id";
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
  const schemaLanguage = schemaLocale;
  const localizedSchema = schemaLocale === "pt" || schemaLocale === "pt-BR"
    ? {
        products: ["Halteres", "Anilhas", "Barras", "Racks", "Bancos", "Acessórios para academia"],
        websiteName: "PowerBaseFit fabricante de equipamentos para academia",
        businessDescription: "A PowerBaseFit fabrica halteres, anilhas, barras, racks, bancos e acessórios para importadores, distribuidores, marcas próprias e projetos de academias."
      }
    : schemaLocale === "es"
      ? {
          products: ["Mancuernas", "Discos de peso", "Barras", "Racks", "Bancos", "Accesorios de gimnasio"],
          websiteName: "PowerBaseFit fabricante de equipos de gimnasio",
          businessDescription: "PowerBaseFit fabrica mancuernas, discos de peso, barras, racks, bancos y accesorios para importadores, distribuidores, marcas propias y proyectos de gimnasios."
        }
      : schemaLocale === "de"
        ? {
            products: ["Kurzhanteln", "Gewichtsscheiben", "Bumper Plates", "Racks", "Hantelb\u00e4nke", "Fitnesszubeh\u00f6r"],
            websiteName: "PowerBaseFit Hersteller f\u00fcr Fitnessstudio-Ausstattung",
            businessDescription: "PowerBaseFit fertigt Kurzhanteln, Gewichtsscheiben, Bumper Plates, Racks, B\u00e4nke und Zubeh\u00f6r f\u00fcr Importeure, Fachh\u00e4ndler, Eigenmarken und Fitnessstudio-Projekte."
          }
        : schemaLocale === "fr"
          ? {
              products: ["Haltères", "Disques de musculation", "Bumper plates", "Racks", "Bancs", "Accessoires de fitness"],
              websiteName: "PowerBaseFit fabricant d’équipements de musculation professionnels",
              businessDescription: "PowerBaseFit fabrique des haltères, disques, bumper plates, racks, bancs et accessoires pour importateurs, distributeurs, marques privées et projets de salles de sport."
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
                  products: ["Dumbbell komersial", "Piring beban", "Bumper plate", "Power rack", "Bench", "Aksesori gym"],
                  websiteName: "PowerBaseFit produsen peralatan gym profesional",
                  businessDescription: "PowerBaseFit memproduksi dumbbell, piring beban, bumper plate, rack, bench, dan aksesori untuk importir, distributor, merek sendiri, serta proyek gym komersial."
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
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
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
        <DelayedAnalyticsEvents />
        <GoogleAnalyticsLoader measurementId={gaMeasurementId} />
      </body>
    </html>
  );
}
