import type { InternalLocale } from "../../../i18n/locale-registry";
import { company } from "../../site";

export default function LocalizedSiteFooter({ locale }: { locale: InternalLocale }) {
  if (locale !== "pt-BR" && locale !== "es") return null;
  const spanish = locale === "es";
  const prefix = spanish ? "/es" : "/pt";
  const links = spanish
    ? [["/productos", "Productos"], ["/fabrica", "Fábrica"], ["/blog", "Contenido"], ["/proyectos", "Proyectos"], ["/contacto", "Contacto"]]
    : [["/produtos/halteres", "Produtos"], ["/fabrica", "Fábrica"], ["/blog", "Conteúdo"], ["/projetos", "Projetos"], ["/contato", "Contato"]];

  return (
    <footer className="footer global-footer">
      <img className="footer-logo" src="/assets/logo-readable.webp" alt="PowerBaseFit" />
      <div>
        <strong>{company.legalName}</strong>
        <span>{company.address}</span>
        <span>Desde {company.founded} · fábrica de {company.factorySize}</span>
        <span>{spanish ? "Correo" : "E-mail"}: {company.email} · WhatsApp: {company.whatsapp}</span>
      </div>
      <div className="footer-links">
        {links.map(([path, label]) => <a key={path} href={`${prefix}${path}`}>{label}</a>)}
      </div>
    </footer>
  );
}
