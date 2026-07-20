const copy = {
  "pt-BR": {
    subject: "Nova solicitação em português — ChinaFreeWeight",
    next: "https://www.chinafreeweight.com/pt/contato?inquiry=sent#consulta",
    source: "ChinaFreeWeight página em português",
    name: "Nome", namePlaceholder: "Seu nome completo",
    email: "E-mail corporativo", phone: "WhatsApp / telefone", phonePlaceholder: "+55 11 99999 9999",
    company: "Empresa", companyPlaceholder: "Nome da empresa ou academia",
    country: "País / região", countryPlaceholder: "Brasil",
    demand: "Produtos de interesse", demandPlaceholder: "Halteres, anilhas, OEM, projeto de academia...",
    category: "Categoria", select: "Selecione",
    categories: ["Halteres", "Anilhas", "Bumper Plates", "OEM / marca própria", "Solução para academia"],
    quantity: "Quantidade estimada", quantityPlaceholder: "Ex.: 200 pares / 1 contêiner",
    project: "Tipo de projeto", projects: ["Distribuição / importação", "Marca própria", "Nova academia", "Varejo"],
    message: "Mensagem", messagePlaceholder: "Informe pesos, quantidades, logo, embalagem, destino e prazo desejado.",
    submit: "Solicitar cotação"
  },
  es: {
    subject: "Nueva solicitud en español — ChinaFreeWeight",
    next: "https://www.chinafreeweight.com/es/contacto?inquiry=sent#consulta",
    source: "ChinaFreeWeight página en español",
    name: "Nombre", namePlaceholder: "Nombre y apellidos",
    email: "Correo corporativo", phone: "WhatsApp / teléfono", phonePlaceholder: "+34 / +52 / código de país",
    company: "Empresa", companyPlaceholder: "Empresa, distribuidor o gimnasio",
    country: "País / región", countryPlaceholder: "España, México, Colombia...",
    demand: "Productos de interés", demandPlaceholder: "Mancuernas, discos, OEM, proyecto de gimnasio...",
    category: "Categoría", select: "Seleccionar",
    categories: ["Mancuernas", "Discos de peso", "Discos bumper", "OEM / marca propia", "Solución para gimnasio"],
    quantity: "Cantidad estimada", quantityPlaceholder: "Ej.: 200 pares / 1 contenedor",
    project: "Tipo de proyecto", projects: ["Distribución / importación", "Marca propia", "Nuevo gimnasio", "Venta minorista"],
    message: "Mensaje", messagePlaceholder: "Indique pesos, cantidades, logotipo, embalaje, destino y plazo.",
    submit: "Solicitar cotización"
  },
  de: {
    subject: "Neue deutschsprachige B2B-Anfrage — ChinaFreeWeight",
    next: "https://www.chinafreeweight.com/de/kontakt?inquiry=sent#anfrage",
    source: "ChinaFreeWeight deutsche Website",
    name: "Name", namePlaceholder: "Vor- und Nachname",
    email: "Geschäftliche E-Mail", phone: "Telefon / WhatsApp", phonePlaceholder: "+49 / +43 / +41",
    company: "Unternehmen", companyPlaceholder: "Unternehmen, Fachhandel oder Fitnessstudio",
    country: "Land / Region", countryPlaceholder: "Deutschland, Österreich oder Schweiz",
    demand: "Gesuchte Produkte", demandPlaceholder: "Kurzhanteln, Gewichtsscheiben, OEM, Studioausstattung ...",
    category: "Produktgruppe", select: "Bitte auswählen",
    categories: ["Kurzhanteln", "Gewichtsscheiben", "Bumper Plates", "OEM / Private Label", "Komplette Studioausstattung"],
    quantity: "Voraussichtliche Menge", quantityPlaceholder: "z. B. 200 Paare / 1 Container",
    project: "Projektart", projects: ["Import / Großhandel", "Private Label", "Neues Fitnessstudio", "Fachhandel"],
    message: "Projektbeschreibung", messagePlaceholder: "Bitte nennen Sie Gewichte, Mengen, Logo, Verpackung, Zielort und Termin.",
    submit: "B2B-Angebot anfordern"
  },
  fr: {
    subject: "Nouvelle demande B2B en français — ChinaFreeWeight",
    next: "https://www.chinafreeweight.com/fr/contact?inquiry=sent#demande",
    source: "ChinaFreeWeight site français",
    name: "Nom", namePlaceholder: "Nom et prénom",
    email: "E-mail professionnel", phone: "Téléphone / WhatsApp", phonePlaceholder: "+33 / +32 / +41 / +1",
    company: "Entreprise", companyPlaceholder: "Importateur, distributeur, marque ou salle de sport",
    country: "Pays / région", countryPlaceholder: "France, Belgique, Suisse, Canada...",
    demand: "Produits recherchés", demandPlaceholder: "Haltères, disques, OEM, équipement de salle...",
    category: "Catégorie", select: "Sélectionner",
    categories: ["Haltères", "Disques de musculation", "Bumper plates", "OEM / marque privée", "Équipement de salle"],
    quantity: "Quantité estimée", quantityPlaceholder: "Ex. 200 paires / 1 conteneur",
    project: "Type de projet", projects: ["Importation / distribution", "Marque privée", "Nouvelle salle", "Réseau de revendeurs"],
    message: "Description du projet", messagePlaceholder: "Précisez les poids, quantités, logo, emballage, destination et calendrier souhaité.",
    submit: "Demander un devis B2B"
  }
} as const;

export default function LocalizedInquiryForm({ locale }: { locale: "pt-BR" | "es" | "de" | "fr" }) {
  const text = copy[locale];
  return (
    <form className="quote-form" action="https://formsubmit.co/kloe@powerbasefit.com" method="POST">
      <input type="hidden" name="_subject" value={text.subject} />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_next" value={text.next} />
      <input type="hidden" name="source" value={text.source} />
      <input type="text" name="_honey" className="spam-field" tabIndex={-1} autoComplete="off" />
      <label>{text.name} <span className="required-mark">*</span><input name="name" type="text" placeholder={text.namePlaceholder} required /></label>
      <label>{text.email} <span className="required-mark">*</span><input name="email" type="email" placeholder={locale === "de" ? "name@unternehmen.de" : locale === "fr" ? "nom@entreprise.fr" : "nombre@empresa.com"} required /></label>
      <label>{text.phone} <span className="required-mark">*</span><input name="phone" type="tel" placeholder={text.phonePlaceholder} required /></label>
      <label>{text.company}<input name="company" type="text" placeholder={text.companyPlaceholder} /></label>
      <label>{text.country}<input name="country" type="text" placeholder={text.countryPlaceholder} /></label>
      <label>{text.demand}<input name="productDemand" type="text" placeholder={text.demandPlaceholder} /></label>
      <label>{text.category}<select name="productCategory" defaultValue=""><option value="">{text.select}</option>{text.categories.map((item) => <option key={item}>{item}</option>)}</select></label>
      <label>{text.quantity}<input name="quantity" type="text" placeholder={text.quantityPlaceholder} /></label>
      <label>{text.project}<select name="projectType" defaultValue=""><option value="">{text.select}</option>{text.projects.map((item) => <option key={item}>{item}</option>)}</select></label>
      <label className="full">{text.message}<textarea name="message" placeholder={text.messagePlaceholder} /></label>
      <button type="submit">{text.submit}</button>
    </form>
  );
}
