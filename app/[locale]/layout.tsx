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

  return (
    <RootDocument
      lang={definition.internalLocale}
      direction={definition.direction}
      header={<LocalizedSiteHeader locale={definition.internalLocale} />}
      footer={<LocalizedSiteFooter locale={definition.internalLocale} />}
      whatsAppLabel={spanish ? "Hable con PowerBaseFit por WhatsApp" : "Fale com a PowerBaseFit pelo WhatsApp"}
      whatsAppMessage={spanish
        ? "Hola, me interesan los equipos de PowerBaseFit. Quisiera recibir información para una cotización B2B."
        : "Olá, tenho interesse nos equipamentos da PowerBaseFit. Gostaria de receber mais informações para uma cotação B2B."}
      schemaLocale={definition.internalLocale === "pt-BR" ? "pt" : spanish ? "es" : undefined}
    >
      <NextIntlClientProvider locale={definition.internalLocale} messages={{}}>
        {children}
      </NextIntlClientProvider>
    </RootDocument>
  );
}
