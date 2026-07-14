import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { getLocaleByRouteLocale } from "../../i18n/locale-registry";

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  const definition = getLocaleByRouteLocale(locale);
  if (!definition || definition.default) notFound();

  setRequestLocale(locale);

  return (
    <NextIntlClientProvider locale={definition.internalLocale} messages={{}}>
      <div lang={definition.internalLocale} dir={definition.direction} data-locale-root={definition.routeLocale}>
        {children}
      </div>
    </NextIntlClientProvider>
  );
}
