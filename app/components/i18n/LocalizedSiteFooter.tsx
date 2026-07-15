import type { InternalLocale } from "../../../i18n/locale-registry";
import { company } from "../../site";

export default function LocalizedSiteFooter({ locale }: { locale: InternalLocale }) {
  if (locale !== "pt-BR") return null;

  return (
    <footer className="footer global-footer">
      <img className="footer-logo" src="/assets/logo-readable.webp" alt="PowerBaseFit" />
      <div>
        <strong>{company.legalName}</strong>
        <span>{company.address}</span>
        <span>Desde {company.founded} · fábrica de {company.factorySize}</span>
        <span>E-mail: {company.email} · WhatsApp: {company.whatsapp}</span>
      </div>
      <div className="footer-links">
        <a href="/pt/produtos/halteres">Produtos</a>
        <a href="/pt/fabrica">Fábrica</a>
        <a href="/pt/blog">Conteúdo</a>
        <a href="/pt/projetos">Projetos</a>
        <a href="/pt/contato">Contato</a>
      </div>
    </footer>
  );
}
