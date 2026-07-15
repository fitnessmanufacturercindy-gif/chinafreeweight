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
};

export default function RootDocument({
  children,
  header,
  footer,
  lang,
  direction,
  preloadEnglishHero = false,
  whatsAppLabel,
  whatsAppMessage
}: RootDocumentProps) {
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
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
