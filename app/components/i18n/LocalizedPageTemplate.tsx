import type { PublishedContent } from "../../../lib/content/types";
import LanguageSwitcher from "./LanguageSwitcher";

export default function LocalizedPageTemplate({ content }: { content: PublishedContent }) {
  const { entity, version } = content;

  return (
    <main>
      <article>
        <header>
          <h1>{version.h1}</h1>
          <p>{version.description}</p>
        </header>

        {version.body.map((block) => (
          <section key={block.id} data-content-block={block.type}>
            {block.heading ? <h2>{block.heading}</h2> : null}
            {block.content ? <p>{block.content}</p> : null}
          </section>
        ))}

        {version.faq.length ? (
          <section aria-labelledby={`${entity.id}-faq`}>
            <h2 id={`${entity.id}-faq`}>FAQ</h2>
            {version.faq.map((faq) => (
              <details key={faq.id}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </section>
        ) : null}
      </article>

      <LanguageSwitcher contentId={entity.id} currentLocale={version.locale} />
    </main>
  );
}
