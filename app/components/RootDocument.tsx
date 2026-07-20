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
  schemaLocale?: "pt" | "pt-BR" | "es" | "de" | "fr";
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
