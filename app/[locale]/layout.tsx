import { NextIntlClientProvider } from "next-intl";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { getLocaleByRouteLocale } from "../../i18n/locale-registry";
import LocalizedSiteFooter from "../components/i18n/LocalizedSiteFooter";
import LocalizedSiteHeader from "../components/i18n/LocalizedSiteHeader";
import RootDocument from "../components/RootDocument";
import { siteUrl } from "../site";

export const metadata: Metadata = { metadataBase: new URL(siteUrl) };

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  const definition = getLocaleByRouteLocale(locale);
  if (!definition || definition.default || !definition.public) notFound();

  setRequestLocale(locale);
  const spanish = definition.internalLocale === "es";
  const german = definition.internalLocale === "de";
  const french = definition.internalLocale === "fr";
  const vietnamese = definition.internalLocale === "vi";
  const swedish = definition.internalLocale === "sv";
  const italian = definition.internalLocale === "it";

  return (
    <RootDocument
      lang={definition.internalLocale}
      direction={definition.direction}
      header={<LocalizedSiteHeader locale={definition.internalLocale} />}
      footer={<LocalizedSiteFooter locale={definition.internalLocale} />}
      whatsAppLabel={italian ? "Contatta PowerBaseFit su WhatsApp" : swedish ? "Kontakta PowerBaseFit via WhatsApp" : vietnamese ? "Liên hệ PowerBaseFit qua WhatsApp" : french ? "Contacter PowerBaseFit sur WhatsApp" : german ? "PowerBaseFit per WhatsApp kontaktieren" : spanish ? "Hable con PowerBaseFit por WhatsApp" : "Fale com a PowerBaseFit pelo WhatsApp"}
      whatsAppMessage={italian
        ? "Buongiorno, desidero informazioni e un preventivo B2B per attrezzature fitness PowerBaseFit."
        : swedish
        ? "Hej, jag vill ha information och en B2B-offert på gymutrustning från PowerBaseFit."
        : vietnamese
        ? "Xin chào, tôi cần thông tin và báo giá B2B cho thiết bị phòng gym PowerBaseFit."
        : french
        ? "Bonjour, je souhaite obtenir des informations et un devis B2B pour des équipements de musculation PowerBaseFit."
        : german
        ? "Guten Tag, ich interessiere mich für Fitnessstudio-Ausstattung von PowerBaseFit und möchte ein B2B-Angebot anfragen."
        : spanish
          ? "Hola, me interesan los equipos de PowerBaseFit. Quisiera recibir información para una cotización B2B."
          : "Olá, tenho interesse nos equipamentos da PowerBaseFit. Gostaria de receber mais informações para uma cotação B2B."}
      schemaLocale={definition.internalLocale === "pt-BR" ? "pt-BR" : spanish ? "es" : german ? "de" : french ? "fr" : vietnamese ? "vi" : swedish ? "sv" : italian ? "it" : undefined}
    >
      <NextIntlClientProvider locale={definition.internalLocale} messages={{}}>
        {children}
      </NextIntlClientProvider>
    </RootDocument>
  );
}
