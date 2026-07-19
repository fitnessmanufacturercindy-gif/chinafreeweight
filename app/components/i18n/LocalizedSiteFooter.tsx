import type { InternalLocale } from "../../../i18n/locale-registry";
import { company } from "../../site";

const footerCopy = {
  "pt-BR": { prefix: "/pt", since: "Desde", factory: "fábrica de", email: "E-mail", links: [["/produtos/halteres", "Produtos"], ["/fabrica", "Fábrica"], ["/blog", "Conteúdo"], ["/projetos", "Projetos"], ["/contato", "Contato"]] },
  es: { prefix: "/es", since: "Desde", factory: "fábrica de", email: "Correo", links: [["/productos", "Productos"], ["/fabrica", "Fábrica"], ["/blog", "Contenido"], ["/proyectos", "Proyectos"], ["/contacto", "Contacto"]] },
  de: { prefix: "/de", since: "Seit", factory: "Fertigung auf", email: "E-Mail", links: [["/produkte", "Produkte"], ["/fabrik", "Fabrik"], ["/blog", "Ratgeber"], ["/projekte", "Projekte"], ["/kontakt", "Kontakt"]] }
} as const;

export default function LocalizedSiteFooter({ locale }: { locale: InternalLocale }) {
  if (locale !== "pt-BR" && locale !== "es" && locale !== "de") return null;
  const copy = footerCopy[locale];

  return (
    <footer className="footer global-footer">
      <img className="footer-logo" src="/assets/logo-readable.webp" alt="PowerBaseFit" />
      <div>
        <strong>{company.legalName}</strong>
        <span>{company.address}</span>
        <span>{copy.since} {company.founded} · {copy.factory} {company.factorySize}</span>
        <span>{copy.email}: {company.email} · WhatsApp: {company.whatsapp}</span>
      </div>
      <div className="footer-links">
        {copy.links.map(([path, label]) => <a key={path} href={`${copy.prefix}${path}`}>{label}</a>)}
      </div>
    </footer>
  );
}
