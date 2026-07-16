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
  schemaLocale?: "pt-BR" | "es";
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
  const localizedSchema = schemaLocale === "pt-BR"
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
      : undefined;
  const schemas = localizedSchema && schemaLocale
    ? [
        {
          ...organizationJsonLd,
          inLanguage: schemaLocale,
          makesOffer: localizedSchema.products.map((name) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Product", name, inLanguage: schemaLocale }
          }))
        },
        {
          ...websiteJsonLd,
          alternateName: localizedSchema.websiteName,
          inLanguage: schemaLocale
        },
        {
          ...localBusinessJsonLd,
          inLanguage: schemaLocale,
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
