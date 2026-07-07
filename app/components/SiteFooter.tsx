import { company } from "../site";

export default function SiteFooter() {
  return (
    <footer className="footer global-footer">
      <img className="footer-logo" src="/assets/logo-readable.png" alt="PowerBaseFit" />
      <div>
        <strong>{company.legalName}</strong>
        <span>{company.address}</span>
        <span>Since {company.founded} · {company.factorySize} factory</span>
        <span>Email: {company.email} · WhatsApp: {company.whatsapp}</span>
      </div>
      <div className="footer-links">
        <a href="/products/dumbbells">Products</a>
        <a href="/factory">Factory</a>
        <a href="/resources">Resources</a>
        <a href="/projects">Projects</a>
        <a href="/contact">Contact</a>
      </div>
    </footer>
  );
}
