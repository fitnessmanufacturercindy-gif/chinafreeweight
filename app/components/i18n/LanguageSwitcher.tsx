import type { InternalLocale } from "../../../i18n/locale-registry";
import { getLocaleByInternalLocale } from "../../../i18n/locale-registry";
import { contentRepository, type ContentRepository } from "../../../lib/content/repository";

export type LanguageSwitchOption = {
  locale: InternalLocale;
  hreflang: string;
  label: string;
  href: string;
  current: boolean;
};

export function resolveLanguageSwitchTarget(
  contentId: string,
  targetLocale: InternalLocale,
  repository: ContentRepository = contentRepository,
  isAvailable: (locale: InternalLocale) => boolean = (locale) => getLocaleByInternalLocale(locale)?.public === true
): string | undefined {
  if (!isAvailable(targetLocale)) return undefined;
  return repository.getPublishedVersion(contentId, targetLocale)?.version.publicPath;
}

export function getLanguageSwitchOptions(
  contentId: string,
  currentLocale: InternalLocale,
  repository: ContentRepository = contentRepository
): LanguageSwitchOption[] {
  return repository.getPublishedVersions(contentId).flatMap(({ version }) => {
    const definition = getLocaleByInternalLocale(version.locale);
    const href = resolveLanguageSwitchTarget(contentId, version.locale, repository);
    if (!definition?.public || !href) return [];
    return [{
      locale: version.locale,
      hreflang: definition.hreflang,
      label: definition.nativeName,
      href,
      current: version.locale === currentLocale
    }];
  });
}

export default function LanguageSwitcher({
  contentId,
  currentLocale
}: {
  contentId: string;
  currentLocale: InternalLocale;
}) {
  const options = getLanguageSwitchOptions(contentId, currentLocale);
  if (options.length < 2) return null;

  return (
    <nav aria-label="Language selector">
      {options.map((option) => (
        <a
          key={option.locale}
          href={option.href}
          hrefLang={option.hreflang}
          lang={option.locale}
          aria-current={option.current ? "page" : undefined}
        >
          {option.label}
        </a>
      ))}
    </nav>
  );
}
