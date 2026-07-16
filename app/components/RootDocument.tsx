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
  schemaLocale?: "es";
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
  const schemas = schemaLocale === "es"
    ? [
        {
          ...organizationJsonLd,
          inLanguage: "es",
          makesOffer: ["Mancuernas", "Discos de peso", "Barras", "Racks", "Bancos", "Accesorios de gimnasio"].map((name) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Product", name }
          }))
        },
        {
          ...websiteJsonLd,
          alternateName: "PowerBaseFit fabricante de equipos de gimnasio",
          inLanguage: "es"
        },
        {
          ...localBusinessJsonLd,
          inLanguage: "es",
          description: "PowerBaseFit fabrica mancuernas, discos de peso, barras, racks, bancos y accesorios para importadores, distribuidores, marcas propias y proyectos de gimnasios."
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
