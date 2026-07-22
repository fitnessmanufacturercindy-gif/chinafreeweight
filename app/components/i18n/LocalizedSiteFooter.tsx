import type { InternalLocale } from "../../../i18n/locale-registry";
import { company } from "../../site";

const footerCopy = {
  "pt-BR": { prefix: "/pt", since: "Desde", factory: "fábrica de", email: "E-mail", links: [["/produtos/halteres", "Produtos"], ["/fabrica", "Fábrica"], ["/blog", "Conteúdo"], ["/projetos", "Projetos"], ["/contato", "Contato"]] },
  es: { prefix: "/es", since: "Desde", factory: "fábrica de", email: "Correo", links: [["/productos", "Productos"], ["/fabrica", "Fábrica"], ["/blog", "Contenido"], ["/proyectos", "Proyectos"], ["/contacto", "Contacto"]] },
  de: { prefix: "/de", since: "Seit", factory: "Fertigung auf", email: "E-Mail", links: [["/produkte", "Produkte"], ["/fabrik", "Fabrik"], ["/blog", "Ratgeber"], ["/projekte", "Projekte"], ["/kontakt", "Kontakt"]] },
  fr: { prefix: "/fr", since: "Depuis", factory: "usine de", email: "E-mail", links: [["/produits", "Produits"], ["/usine", "Usine"], ["/blog", "Guides"], ["/projets", "Projets"], ["/contact", "Contact"]] },
  vi: { prefix: "/vi", since: "Thành lập", factory: "nhà máy", email: "Email", links: [["/san-pham", "Sản phẩm"], ["/nha-may", "Nhà máy"], ["/blog", "Hướng dẫn"], ["/du-an", "Dự án"], ["/lien-he", "Liên hệ"]] },
  sv: { prefix: "/sv", since: "Sedan", factory: "fabrik på", email: "E-post", links: [["/produkter", "Produkter"], ["/fabrik", "Fabrik"], ["/blogg", "Guider"], ["/projekt", "Projekt"], ["/kontakt", "Kontakt"]] },
  it: { prefix: "/it", since: "Dal", factory: "stabilimento di", email: "E-mail", links: [["/prodotti", "Prodotti"], ["/fabbrica", "Fabbrica"], ["/blog", "Guide"], ["/progetti", "Progetti"], ["/contatti", "Contatti"]] },
  ko: { prefix: "/ko", since: "설립", factory: "규모의 생산 시설", email: "이메일", links: [["/products", "제품"], ["/factory", "공장"], ["/oem-private-label", "OEM"], ["/blog", "구매 가이드"], ["/contact", "문의"]] },
  id: { prefix: "/id", since: "Sejak", factory: "fasilitas produksi", email: "Email", links: [["/produk", "Produk"], ["/pabrik", "Pabrik"], ["/oem-merek-sendiri", "OEM"], ["/blog", "Panduan"], ["/kontak", "Kontak"]] }
} as const;

export default function LocalizedSiteFooter({ locale }: { locale: InternalLocale }) {
  if (locale !== "pt-BR" && locale !== "es" && locale !== "de" && locale !== "fr" && locale !== "vi" && locale !== "sv" && locale !== "it" && locale !== "ko" && locale !== "id") return null;
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
