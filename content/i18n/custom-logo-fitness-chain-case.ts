import type { InternalLocale } from "../../i18n/locale-registry";
import type {
  ContentBlock,
  ContentEntity,
  ContentManifest,
  LocalizedContentVersion,
  LocalizedFaq,
  LocalizedInternalLink
} from "../../lib/content/types";

type CaseLocale = Extract<
  InternalLocale,
  "en" | "pt-BR" | "es" | "de" | "fr" | "vi" | "sv" | "it" | "nl" | "ar" | "ko" | "id" | "pl"
>;

type CaseCopy = {
  locale: CaseLocale;
  path: string;
  title: string;
  description: string;
  h1: string;
  keyword: string;
  relatedKeywords: string[];
  home: string;
  projects: string;
  eyebrow: string;
  sectionHeadings: string[];
  sections: string[];
  midCta: string;
  midCtaLabel: string;
  ctaTitle: string;
  ctaText: string;
  ctaLabel: string;
  imageAlt: [string, string, string, string];
  imageCaption: [string, string, string, string];
  faq: Array<[string, string]>;
  linkLabels: [string, string, string, string, string];
};

const publishedAt = "2026-09-07T06:00:00.000Z";
const contentId = "case-custom-logo-fitness-chain-strength-equipment";
const imagePaths = [
  "/assets/projects/custom-logo-fitness-chain/custom-logo-dumbbells.webp",
  "/assets/projects/custom-logo-fitness-chain/pink-custom-weight-plate.webp",
  "/assets/projects/custom-logo-fitness-chain/orange-custom-weight-plate.webp",
  "/assets/projects/custom-logo-fitness-chain/blue-custom-weight-plate.webp",
  "/assets/projects/custom-logo-fitness-chain/custom-weight-plates-storage-rack.webp"
] as const;

const rackPhotoCopy: Record<CaseLocale, { alt: string; caption: string }> = {
  en: { alt: "Custom logo weight plates stored on matching strength equipment racks in a fitness training facility", caption: "Real installed equipment showing the authorized logo, coordinated weight plates and matching storage racks." },
  "pt-BR": { alt: "Anilhas com logo personalizado organizadas em racks de musculação de um centro de treinamento", caption: "Instalação real com logo autorizado, anilhas coordenadas e racks compatíveis." },
  es: { alt: "Discos con logo personalizado almacenados en racks de fuerza de un centro de entrenamiento", caption: "Instalación real con el logo autorizado, discos coordinados y racks compatibles." },
  de: { alt: "Hantelscheiben mit Kundenlogo an passenden Kraftgeräteracks in einem Trainingszentrum", caption: "Reale Installation mit genehmigtem Logo, abgestimmten Scheiben und passenden Ablagen." },
  fr: { alt: "Disques avec logo personnalisé rangés sur des racks de musculation dans un centre de training", caption: "Installation réelle avec logo autorisé, disques coordonnés et racks assortis." },
  vi: { alt: "Bánh tạ in logo được bố trí trên giá thiết bị sức mạnh tại trung tâm thể lực", caption: "Hình ảnh lắp đặt thực tế với logo được phép, bánh tạ đồng bộ và giá đỡ phù hợp." },
  sv: { alt: "Viktskivor med kundlogotyp förvarade på matchande styrketräningsrack i en träningsanläggning", caption: "Verklig installation med godkänd logotyp, samordnade viktskivor och matchande ställ." },
  it: { alt: "Dischi con logo personalizzato su rack per la forza in un centro di allenamento", caption: "Installazione reale con logo autorizzato, dischi coordinati e rack abbinati." },
  nl: { alt: "Gewichtsschijven met klantlogo op bijpassende krachtrekken in een trainingscentrum", caption: "Echte installatie met goedgekeurd logo, afgestemde schijven en bijpassende rekken." },
  ar: { alt: "أقراص أوزان بشعار مخصص على رفوف معدات القوة داخل مركز تدريب", caption: "تركيب حقيقي يظهر الشعار المصرح به والأقراص المتناسقة والرفوف المطابقة." },
  ko: { alt: "피트니스 트레이닝 시설의 맞춤 로고 원판과 근력 장비 보관 랙", caption: "허가된 로고, 통일된 원판, 맞춤 랙을 보여 주는 실제 설치 사진입니다." },
  id: { alt: "Piring beban dengan logo kustom pada rak strength yang serasi di pusat latihan", caption: "Instalasi nyata dengan logo berizin, piring beban serasi, dan rak pendukung." },
  pl: { alt: "Obciążenia z logo klienta na dopasowanych stojakach w centrum treningowym", caption: "Rzeczywista instalacja z autoryzowanym logo, spójnymi obciążeniami i dopasowanymi stojakami." }
};

const copies: CaseCopy[] = [
  {
    locale: "en",
    path: "/projects/custom-logo-dumbbells-weight-plates-fitness-chain",
    title: "Custom Dumbbells for a Fitness Chain | 15-Day Delivery",
    description: "See how we designed and shipped custom logo dumbbells, weight plates and matching storage racks for a fitness training chain in just 15 days.",
    h1: "Custom Logo Dumbbells and Weight Plates for a Fitness Training Chain",
    keyword: "custom dumbbells",
    relatedKeywords: ["custom logo dumbbells", "custom weight plates", "commercial gym equipment supplier", "custom gym equipment"],
    home: "Home",
    projects: "Projects",
    eyebrow: "Real customer customization case · shipped in 15 days",
    sectionHeadings: ["Project overview", "The customer requirement", "Custom logo dumbbells", "Custom weight plates and storage racks", "A consistent brand and product specification", "Request a custom proposal", "Project execution", "15 days from final design approval to shipment", "Commercial-use construction and quality checks", "Project results", "Customer feedback summary", "Why the customer chose PowerBaseFit"],
    sections: [
      "A fitness training chain needed a coordinated set of branded strength equipment for its training facilities. PowerBaseFit produced custom dumbbells, custom weight plates and matching storage racks. The product logo is shown with the customer's permission, while the legal name and location remain confidential. The confirmed project moved from final design approval to shipment in 15 days.",
      "The buyer needed equipment that would present one consistent brand across multiple training locations and withstand frequent commercial use. Product appearance, logo treatment, user experience and storage all needed to work together rather than as unrelated items.",
      "The dumbbells were made with the customer's custom logo and a coordinated visual treatment. Aluminum-alloy handles help resist rust and suit a commercial training environment. The integrated, robust construction is designed to reduce the risk of breakage under frequent use.",
      "The supply also included custom barbell plates in coordinated colors and matching storage racks for the strength area. Treating dumbbells, plates and racks as one system helped align storage, floor presentation and the customer brand.",
      "PowerBaseFit coordinated logo artwork, colors, weight specifications, construction details and packaging. These items were confirmed together so the visible branding, product range and shipment preparation followed one approved direction.",
      "Send your logo, required weights, quantity and target delivery date. We will review the product mix, customization and packing needs for a project-specific proposal.",
      "The work followed five steps: requirement discussion; design and logo-effect confirmation; approval of the final style and production plan; production with quality inspection; and packing for shipment.",
      "Once the design was finalized, production, inspection, packing and shipment preparation were completed within 15 days. This timing is a fact for this project, not a standard lead-time promise for every order; future schedules depend on the confirmed model, quantity and customization.",
      "The aluminum-alloy dumbbell handles are less prone to rust, and the solid integrated structure is suitable for high-frequency commercial training. Quality checks covered the approved appearance, logo application, product condition and packing before shipment.",
      "The completed range delivered a consistent branded appearance across dumbbells, weight plates and racks. It addressed the operating needs of a fitness training chain and provided a complete strength-equipment package rather than isolated products.",
      "Customer feedback summary (not a direct quotation): the customer rated the delivery efficiency, product quality and final customized result highly. No customer name, location, order quantity, sales result or unverified performance figure is disclosed.",
      "The customer could source custom logo dumbbells, custom weight plates and racks through one supplier, with support spanning design confirmation, production, quality inspection, packaging and shipment. This integrated workflow reduced coordination across the branded equipment set. Explore our commercial dumbbells, weight plates, factory process and contact options below."
    ],
    midCta: "[Request a custom quote](/contact) with your logo, weight range, quantity and target delivery date.",
    midCtaLabel: "Request a custom quote",
    ctaTitle: "Need your own custom dumbbells and weight plates?",
    ctaText: "Send us your logo, required weights, quantity and target delivery date to receive a custom proposal for your gym, fitness chain, brand or distribution business.",
    ctaLabel: "Get a custom proposal",
    imageAlt: ["Custom logo dumbbells with aluminum-alloy handles for a commercial fitness training chain", "Pink custom weight plate made for a branded commercial gym equipment project", "Orange 20 kg custom barbell plate prepared for a fitness chain strength area", "Blue 5 kg custom weight plate for a coordinated commercial gym equipment range"],
    imageCaption: ["Real project dumbbells with the authorized customer logo visible.", "A real custom-color plate from the project with the authorized logo visible.", "The coordinated plate range included multiple weights and colors.", "Product photography from the completed order; the logo is shown with permission."],
    faq: [["What equipment was customized?", "The project included custom logo dumbbells, custom weight plates and matching storage racks."], ["How long did the project take?", "From final design approval to completed shipment preparation, this project took 15 days."], ["Why use aluminum-alloy dumbbell handles?", "They are less prone to rust and are suitable for frequent use in commercial training environments."], ["Can every order ship in 15 days?", "No. Fifteen days is the confirmed timeline for this case; schedules depend on product, quantity, customization and production planning."], ["What should I send for a proposal?", "Send your logo, required weights, quantity, destination, packaging needs and target delivery date."]],
    linkLabels: ["Commercial dumbbells", "Custom weight plates", "Manufacturing and quality", "Project references", "Contact for a quote"]
  },
  {
    locale: "pt-BR",
    path: "/pt/projetos/halteres-anilhas-personalizados-rede-treinamento",
    title: "Halteres personalizados para rede fitness | Entrega em 15 dias",
    description: "Veja como produzimos e expedimos halteres com logo, anilhas personalizadas e racks para uma rede de treinamento em apenas 15 dias.",
    h1: "Halteres e anilhas com logo para uma rede de treinamento físico",
    keyword: "halteres personalizados",
    relatedKeywords: ["halteres com logo", "anilhas personalizadas", "fabricante de equipamentos para academia", "equipamentos fitness sob medida"],
    home: "Início",
    projects: "Projetos",
    eyebrow: "Caso real de personalização · expedição em 15 dias",
    sectionHeadings: ["Visão geral do projeto", "Necessidade do cliente", "Halteres com logo personalizado", "Anilhas e racks coordenados", "Identidade e especificação consistentes", "Solicite uma proposta personalizada", "Execução do projeto", "15 dias da aprovação final à expedição", "Estrutura comercial e controle de qualidade", "Resultados do projeto", "Resumo do feedback do cliente", "Por que o cliente escolheu a PowerBaseFit"],
    sections: [
      "Uma rede de centros de treinamento físico precisava de uma linha coordenada de equipamentos de força com sua marca. A PowerBaseFit produziu halteres personalizados, anilhas e racks compatíveis. O logo aparece com autorização do cliente; razão social e localização permanecem confidenciais. Da aprovação final do design à expedição, o projeto foi concluído em 15 dias.",
      "O comprador precisava manter a mesma identidade visual em diferentes unidades e usar os produtos com alta frequência. Aparência, aplicação do logo, experiência de uso e organização no rack deveriam formar um conjunto coerente.",
      "Os halteres receberam o logo do cliente e acabamento visual coordenado. Os pegadores de liga de alumínio são menos sujeitos à ferrugem e adequados ao ambiente comercial. A estrutura integrada e robusta reduz o risco de quebra no uso frequente.",
      "O fornecimento incluiu anilhas personalizadas em cores coordenadas e racks para organizar a área de musculação. Planejar halteres, anilhas e armazenamento como um sistema alinhou apresentação, operação e marca.",
      "Logo, cores, pesos, estrutura e embalagem foram tratados na mesma aprovação. Assim, a linha visível e a preparação do embarque seguiram uma especificação comum.",
      "Envie seu logo, pesos desejados, quantidade e data-alvo. Avaliaremos produtos, personalização e embalagem para uma proposta específica.",
      "A execução passou por conversa sobre requisitos, confirmação do efeito do logo, aprovação do estilo e do plano produtivo, fabricação com inspeção e embalagem para expedição.",
      "Depois do design final aprovado, produção, inspeção, embalagem e preparação da expedição foram concluídas em 15 dias. Esse prazo pertence a este caso e não é promessa padrão para todo pedido.",
      "Os pegadores de liga de alumínio resistem melhor à oxidação, enquanto a construção integrada e sólida atende ao uso comercial frequente. A inspeção verificou aparência aprovada, aplicação do logo, condição dos produtos e embalagem.",
      "O resultado foi uma identidade uniforme em halteres, anilhas e racks, adequada às necessidades comerciais de uma rede de treinamento e apresentada como solução completa de força.",
      "Resumo do feedback, não citação literal: o cliente avaliou muito bem a agilidade da entrega, a qualidade e o resultado final. Nome, local, volume e dados não autorizados permanecem confidenciais.",
      "O cliente reuniu halteres, anilhas e racks personalizados em um único fornecedor, com suporte do design à expedição. Consulte abaixo nossos produtos, fábrica, referências e canal de cotação."
    ],
    midCta: "[Solicite uma cotação personalizada](/pt/contato) enviando logo, faixa de pesos, quantidade e prazo desejado.",
    midCtaLabel: "Solicitar cotação",
    ctaTitle: "Quer personalizar seus próprios halteres e anilhas?",
    ctaText: "Envie logo, pesos, quantidade e data-alvo para receber uma proposta para academia, rede fitness, marca, importador ou distribuidor.",
    ctaLabel: "Receber proposta personalizada",
    imageAlt: ["Halteres com logo personalizado e pegadores de liga de alumínio para rede de academias", "Anilha rosa personalizada para projeto comercial de equipamentos de academia", "Anilha laranja de 20 kg personalizada para área de musculação", "Anilha azul de 5 kg personalizada para linha coordenada de academia"],
    imageCaption: ["Halteres reais do projeto com o logo autorizado do cliente.", "Anilha real em cor personalizada com o logo autorizado visível.", "A linha coordenada incluiu diferentes pesos e cores.", "Foto do pedido concluído; o logo é exibido com autorização."],
    faq: [["Quais produtos foram personalizados?", "Halteres com logo, anilhas e racks de armazenamento compatíveis."], ["Qual foi o prazo?", "Este projeto levou 15 dias da aprovação final do design à preparação da expedição."], ["Por que usar pegador de liga de alumínio?", "Ele é menos sujeito à ferrugem e adequado ao uso comercial frequente."], ["Todo pedido pode sair em 15 dias?", "Não. O prazo depende do produto, quantidade, personalização e programação."], ["O que enviar para cotação?", "Logo, pesos, quantidade, destino, embalagem e data desejada."]],
    linkLabels: ["Halteres profissionais", "Anilhas personalizadas", "Fabricação e qualidade", "Referências de projetos", "Solicitar cotação"]
  },
  {
    locale: "es",
    path: "/es/proyectos/mancuernas-discos-personalizados-cadena-entrenamiento",
    title: "Mancuernas personalizadas para cadena fitness | 15 días",
    description: "Descubra cómo fabricamos y expedimos mancuernas con logo, discos personalizados y racks para una cadena de entrenamiento en 15 días.",
    h1: "Mancuernas y discos con logo para una cadena de entrenamiento",
    keyword: "mancuernas personalizadas",
    relatedKeywords: ["mancuernas con logo", "discos personalizados", "proveedor de equipos de gimnasio", "equipamiento fitness a medida"],
    home: "Inicio", projects: "Proyectos", eyebrow: "Caso real de personalización · expedido en 15 días",
    sectionHeadings: ["Resumen del proyecto", "Necesidad del cliente", "Mancuernas con logo", "Discos y racks coordinados", "Marca y especificación coherentes", "Solicite una propuesta", "Ejecución del proyecto", "15 días desde la aprobación final hasta la expedición", "Construcción comercial y control de calidad", "Resultados", "Resumen de la opinión del cliente", "Por qué eligió PowerBaseFit"],
    sections: [
      "Una cadena de centros de entrenamiento necesitaba una gama coordinada de equipos de fuerza con su propia marca. PowerBaseFit fabricó mancuernas personalizadas, discos y racks compatibles. El logo se muestra con autorización del cliente, mientras su razón social y ubicación permanecen confidenciales. Desde la aprobación final del diseño hasta la expedición transcurrieron 15 días.",
      "El comprador buscaba una imagen uniforme en sus centros y equipos aptos para un uso comercial frecuente. Apariencia, logo, experiencia de uso y almacenamiento debían funcionar como un solo sistema.",
      "Las mancuernas incorporaron el logo del cliente y un tratamiento visual común. Los agarres de aleación de aluminio son menos propensos a oxidarse y adecuados para entornos comerciales. La construcción integrada y robusta reduce el riesgo de rotura con un uso frecuente.",
      "El suministro incluyó discos personalizados en colores coordinados y racks para la zona de fuerza. Planificar mancuernas, discos y almacenamiento en conjunto alineó la operativa con la identidad de marca.",
      "Se coordinaron arte del logo, colores, pesos, estructura y embalaje en una sola especificación aprobada antes de producir.",
      "Envíe su logo, pesos, cantidad y fecha objetivo. Revisaremos la mezcla de producto, personalización y embalaje para preparar una propuesta.",
      "El proceso incluyó comunicación de requisitos, confirmación del efecto del logo, aprobación del estilo y plan de producción, fabricación e inspección, y embalaje para expedición.",
      "Tras aprobar el diseño final, la producción, inspección, embalaje y preparación del envío se completaron en 15 días. Es el plazo real de este caso, no una promesa general.",
      "Los agarres de aluminio resisten mejor la oxidación y la estructura sólida integrada se adapta al uso comercial de alta frecuencia. El control verificó apariencia, logo, estado del producto y embalaje.",
      "La gama final unificó la imagen de mancuernas, discos y racks y cubrió una solución completa para los centros de la cadena.",
      "Resumen, no cita literal: el cliente valoró muy positivamente la rapidez de entrega, la calidad y el resultado personalizado. No publicamos nombre, país, cantidad ni datos no autorizados.",
      "Un solo proveedor coordinó diseño, producción, inspección, embalaje y salida de mancuernas, discos y racks. Consulte productos, fábrica, proyectos y contacto a continuación."
    ],
    midCta: "[Solicite una cotización personalizada](/es/contacto) con su logo, pesos, cantidad y fecha objetivo.", midCtaLabel: "Solicitar cotización",
    ctaTitle: "¿Necesita mancuernas y discos con su propia marca?", ctaText: "Envíenos logo, pesos, cantidad y fecha objetivo para recibir una propuesta para su gimnasio, cadena, marca o distribución.", ctaLabel: "Recibir propuesta personalizada",
    imageAlt: ["Mancuernas con logo personalizado y agarres de aluminio para cadena de centros fitness", "Disco rosa personalizado para proyecto de gimnasio comercial", "Disco naranja personalizado de 20 kg para zona de fuerza", "Disco azul personalizado de 5 kg para gama coordinada de gimnasio"],
    imageCaption: ["Mancuernas reales del proyecto con el logo autorizado del cliente.", "Disco real de color personalizado con el logo autorizado visible.", "La gama incluyó varios pesos y colores coordinados.", "Fotografía del pedido terminado; el logo se muestra con autorización."],
    faq: [["¿Qué productos se personalizaron?", "Mancuernas con logo, discos y racks compatibles."], ["¿Cuánto duró el proyecto?", "Quince días desde la aprobación final del diseño hasta la expedición."], ["¿Por qué agarres de aluminio?", "Son menos propensos a oxidarse y adecuados para uso comercial frecuente."], ["¿Todos los pedidos tardan 15 días?", "No; depende del modelo, cantidad, personalización y planificación."], ["¿Qué debo enviar?", "Logo, pesos, cantidad, destino, embalaje y fecha objetivo."]],
    linkLabels: ["Mancuernas profesionales", "Discos personalizados", "Fabricación y calidad", "Casos de proyectos", "Solicitar cotización"]
  },
  {
    locale: "de",
    path: "/de/projekte/kurzhanteln-hantelscheiben-fitnesskette",
    title: "Kurzhanteln nach Maß für Fitnesskette | Versand in 15 Tagen",
    description: "So fertigten und versandten wir Kurzhanteln mit Logo, individuelle Hantelscheiben und Ablagen für eine Trainingskette in 15 Tagen.",
    h1: "Kurzhanteln und Hantelscheiben mit Logo für eine Fitnesskette",
    keyword: "Kurzhanteln mit Logo", relatedKeywords: ["individuelle Kurzhanteln", "Hantelscheiben nach Maß", "Fitnessgeräte Hersteller", "kommerzielle Fitnessgeräte"],
    home: "Startseite", projects: "Projekte", eyebrow: "Reales Kundenprojekt · Versand in 15 Tagen",
    sectionHeadings: ["Projektüberblick", "Anforderung des Kunden", "Kurzhanteln mit Kundenlogo", "Hantelscheiben und Ablagen", "Einheitliche Marke und Spezifikation", "Individuelles Angebot anfordern", "Projektablauf", "15 Tage von der finalen Freigabe bis zum Versand", "Gewerbliche Konstruktion und Qualitätskontrolle", "Projektergebnis", "Zusammenfassung des Kundenfeedbacks", "Warum PowerBaseFit gewählt wurde"],
    sections: [
      "Eine Kette von Athletik- und Trainingszentren benötigte eine abgestimmte Krafttrainingsserie mit eigener Marke. PowerBaseFit fertigte individuelle Kurzhanteln, Hantelscheiben und passende Ablagen. Das Logo wird mit Genehmigung des Kunden gezeigt; Firmenname und Standort bleiben vertraulich. Von der finalen Designfreigabe bis zum Versand vergingen 15 Tage.",
      "Gefordert waren ein einheitlicher Auftritt an mehreren Standorten und Produkte für häufige gewerbliche Nutzung. Optik, Logo, Nutzung und Aufbewahrung mussten als System geplant werden.",
      "Die Kurzhanteln erhielten das Kundenlogo und eine gemeinsame Gestaltung. Griffe aus Aluminiumlegierung sind weniger rostanfällig und für Studioumgebungen geeignet. Die robuste integrierte Bauweise verringert das Bruchrisiko bei häufiger Nutzung.",
      "Zum Umfang gehörten außerdem farblich abgestimmte Hantelscheiben und Ablagen. Die gemeinsame Planung verband Markenbild, Ordnung und Betriebsablauf.",
      "Logo-Daten, Farben, Gewichte, Konstruktion und Verpackung wurden in einer freigegebenen Spezifikation zusammengeführt.",
      "Senden Sie Logo, Gewichte, Menge und Zieltermin. Wir prüfen Produktmix, Individualisierung und Verpackung für ein projektbezogenes Angebot.",
      "Der Ablauf umfasste Anforderungsgespräch, Logo- und Designbestätigung, Freigabe von Stil und Produktionsplan, Fertigung mit Prüfung sowie Verpackung und Versand.",
      "Nach finaler Designfreigabe wurden Produktion, Kontrolle, Verpackung und Versandvorbereitung in 15 Tagen abgeschlossen. Dieser Projektwert ist keine pauschale Lieferzusage.",
      "Aluminiumgriffe sind weniger korrosionsanfällig; die feste integrierte Struktur eignet sich für häufiges Training. Geprüft wurden freigegebene Optik, Logoausführung, Produktzustand und Verpackung.",
      "Kurzhanteln, Scheiben und Ablagen erhielten ein einheitliches Markenbild und bildeten eine vollständige Lösung für die Trainingskette.",
      "Zusammenfassung, kein wörtliches Zitat: Der Kunde bewertete Liefergeschwindigkeit, Qualität und Endergebnis sehr positiv. Name, Land, Menge und nicht freigegebene Daten bleiben vertraulich.",
      "Ein Lieferant koordinierte Design, Fertigung, Prüfung, Verpackung und Versand der gesamten Serie. Produktkategorien, Fabrik, Projekte und Kontakt finden Sie unten."
    ],
    midCta: "[Individuelles Angebot anfordern](/de/kontakt): Logo, Gewichte, Menge und Zieltermin senden.", midCtaLabel: "Angebot anfordern",
    ctaTitle: "Benötigen Sie Kurzhanteln und Scheiben mit eigener Marke?", ctaText: "Senden Sie Logo, Gewichte, Menge und Zieltermin für ein Angebot für Studio, Kette, Marke oder Handel.", ctaLabel: "Individuelles Angebot erhalten",
    imageAlt: ["Kurzhanteln mit Kundenlogo und Aluminiumgriffen für eine Fitnesskette", "Rosa individuelle Hantelscheibe für ein gewerbliches Studioprojekt", "Orange 20-kg-Hantelscheibe für einen Krafttrainingsbereich", "Blaue 5-kg-Hantelscheibe für eine einheitliche Fitnessgeräteserie"],
    imageCaption: ["Reale Projektware mit dem genehmigten Kundenlogo.", "Reale Scheibe in Sonderfarbe mit sichtbar genehmigtem Logo.", "Die Serie umfasste abgestimmte Farben und Gewichte.", "Aufnahme des fertigen Auftrags; das Logo wird mit Genehmigung gezeigt."],
    faq: [["Welche Produkte wurden angepasst?", "Kurzhanteln mit Logo, Hantelscheiben und passende Ablagen."], ["Wie lange dauerte das Projekt?", "15 Tage von der finalen Designfreigabe bis zum Versand."], ["Warum Aluminiumgriffe?", "Sie sind weniger rostanfällig und für häufige gewerbliche Nutzung geeignet."], ["Gelten 15 Tage für jeden Auftrag?", "Nein, der Termin hängt von Modell, Menge und Anpassung ab."], ["Welche Angaben braucht ein Angebot?", "Logo, Gewichte, Menge, Zielort, Verpackung und Termin."]],
    linkLabels: ["Gewerbliche Kurzhanteln", "Individuelle Hantelscheiben", "Fertigung und Qualität", "Projektbeispiele", "Angebot anfordern"]
  },
  {
    locale: "fr",
    path: "/fr/projets/halteres-disques-personnalises-reseau-training",
    title: "Haltères personnalisés pour réseau fitness | Expédiés en 15 jours",
    description: "Découvrez la fabrication et l'expédition en 15 jours d'haltères avec logo, disques personnalisés et racks pour un réseau de training.",
    h1: "Haltères et disques avec logo pour un réseau de centres de training",
    keyword: "haltères personnalisés", relatedKeywords: ["haltères avec logo", "disques personnalisés", "fabricant équipement salle de sport", "matériel fitness sur mesure"],
    home: "Accueil", projects: "Projets", eyebrow: "Cas client réel · expédié en 15 jours",
    sectionHeadings: ["Vue d'ensemble", "Besoin du client", "Haltères avec logo", "Disques et racks assortis", "Identité et spécification cohérentes", "Demander une proposition", "Déroulement", "15 jours de la validation finale à l'expédition", "Construction professionnelle et contrôle qualité", "Résultats", "Synthèse du retour client", "Pourquoi le client a choisi PowerBaseFit"],
    sections: [
      "Un réseau de centres de préparation physique recherchait une gamme coordonnée d'équipements de musculation à son image. PowerBaseFit a fabriqué des haltères personnalisés, des disques et des racks assortis. Le logo est présenté avec l'autorisation du client, tandis que sa raison sociale et sa localisation restent confidentielles. Le délai entre validation finale du design et expédition a été de 15 jours.",
      "L'acheteur voulait une identité uniforme dans ses centres et du matériel adapté à une utilisation professionnelle fréquente. Aspect, logo, expérience d'usage et rangement devaient fonctionner ensemble.",
      "Les haltères ont reçu le logo du client et un traitement visuel commun. Les poignées en alliage d'aluminium sont peu sensibles à la rouille et adaptées aux salles commerciales. La structure intégrée et robuste limite le risque de rupture en usage fréquent.",
      "La fourniture comprenait aussi des disques personnalisés en couleurs coordonnées et des racks pour la zone de force. L'ensemble a aligné marque, rangement et exploitation.",
      "Logo, couleurs, poids, construction et emballage ont été confirmés dans une seule spécification avant production.",
      "Envoyez votre logo, les poids, la quantité et la date cible. Nous analyserons produits, personnalisation et emballage pour une proposition adaptée.",
      "Le projet a suivi cinq étapes : échange sur le besoin, confirmation du rendu du logo, validation du style et du plan de production, fabrication et contrôle, puis emballage et expédition.",
      "Après validation finale du design, production, inspection, emballage et préparation de l'envoi ont été réalisés en 15 jours. Ce délai concerne ce cas et ne constitue pas une promesse générale.",
      "Les poignées aluminium résistent mieux à l'oxydation et la structure intégrée convient à un usage intensif. Les contrôles ont porté sur l'aspect validé, le logo, l'état des produits et l'emballage.",
      "Le résultat offre une identité homogène sur les haltères, disques et racks, avec une solution de musculation complète pour le réseau.",
      "Synthèse, et non citation : le client a fortement apprécié la rapidité, la qualité et le rendu final. Nom, pays, quantité et données non autorisées restent confidentiels.",
      "Un fournisseur unique a coordonné design, production, contrôle, emballage et expédition. Découvrez ci-dessous produits, usine, projets et contact."
    ],
    midCta: "[Demander un devis personnalisé](/fr/contact) avec logo, poids, quantité et date cible.", midCtaLabel: "Demander un devis",
    ctaTitle: "Besoin d'haltères et de disques à votre marque ?", ctaText: "Envoyez logo, poids, quantité et date cible pour une proposition destinée à votre salle, réseau, marque ou activité de distribution.", ctaLabel: "Recevoir une proposition",
    imageAlt: ["Haltères avec logo personnalisé et poignées aluminium pour un réseau de centres fitness", "Disque rose personnalisé pour un projet de salle professionnelle", "Disque orange personnalisé de 20 kg pour zone de musculation", "Disque bleu personnalisé de 5 kg pour une gamme fitness coordonnée"],
    imageCaption: ["Haltères réels du projet avec le logo client autorisé.", "Disque réel en couleur personnalisée avec le logo autorisé visible.", "La gamme associait plusieurs poids et couleurs.", "Photo de la commande terminée ; le logo est présenté avec autorisation."],
    faq: [["Quels produits ont été personnalisés ?", "Haltères avec logo, disques et racks assortis."], ["Quel a été le délai ?", "15 jours de la validation finale du design à l'expédition."], ["Pourquoi des poignées aluminium ?", "Elles sont moins sensibles à la rouille et adaptées à l'usage professionnel fréquent."], ["Tous les projets prennent-ils 15 jours ?", "Non, le délai dépend du modèle, de la quantité et de la personnalisation."], ["Que transmettre pour un devis ?", "Logo, poids, quantité, destination, emballage et date cible."]],
    linkLabels: ["Haltères professionnels", "Disques personnalisés", "Fabrication et qualité", "Références projets", "Demander un devis"]
  },
  {
    locale: "vi",
    path: "/vi/du-an/ta-tay-banh-ta-logo-chuoi-the-luc",
    title: "Tạ tay tùy chỉnh cho chuỗi fitness | Xuất hàng trong 15 ngày",
    description: "Xem cách chúng tôi sản xuất và xuất tạ tay in logo, bánh tạ tùy chỉnh cùng giá đỡ cho một chuỗi thể lực trong 15 ngày.",
    h1: "Tạ tay và bánh tạ in logo cho chuỗi trung tâm thể lực",
    keyword: "tạ tay tùy chỉnh", relatedKeywords: ["tạ tay in logo", "bánh tạ tùy chỉnh", "nhà cung cấp thiết bị phòng gym", "thiết bị gym thương hiệu riêng"],
    home: "Trang chủ", projects: "Dự án", eyebrow: "Dự án khách hàng thực tế · xuất hàng trong 15 ngày",
    sectionHeadings: ["Tổng quan dự án", "Nhu cầu khách hàng", "Tạ tay in logo", "Bánh tạ và giá đỡ đồng bộ", "Đồng nhất thương hiệu và thông số", "Yêu cầu đề xuất tùy chỉnh", "Quy trình thực hiện", "15 ngày từ duyệt thiết kế đến xuất hàng", "Kết cấu thương mại và kiểm tra chất lượng", "Kết quả", "Tóm tắt phản hồi khách hàng", "Lý do chọn PowerBaseFit"],
    sections: [
      "Một chuỗi trung tâm huấn luyện thể lực cần bộ thiết bị sức mạnh đồng bộ mang thương hiệu riêng. PowerBaseFit sản xuất tạ tay tùy chỉnh, bánh tạ và giá đỡ phù hợp. Logo được hiển thị với sự cho phép của khách hàng; tên pháp lý và địa điểm vẫn được bảo mật. Từ khi duyệt thiết kế cuối đến xuất hàng là 15 ngày.",
      "Khách hàng cần hình ảnh nhất quán giữa các cơ sở và thiết bị chịu được tần suất sử dụng thương mại cao. Ngoại hình, logo, trải nghiệm sử dụng và lưu trữ phải là một hệ thống.",
      "Tạ tay được gắn logo khách hàng và phối thiết kế thống nhất. Tay cầm hợp kim nhôm ít bị gỉ hơn, phù hợp môi trường tập luyện thương mại. Kết cấu liền khối chắc chắn giảm nguy cơ gãy khi dùng thường xuyên.",
      "Phạm vi cung cấp còn có bánh tạ màu tùy chỉnh và giá đỡ cho khu tập sức mạnh. Lập kế hoạch chung giúp đồng bộ nhận diện, vị trí cất giữ và vận hành.",
      "File logo, màu, mức tạ, kết cấu và bao bì được xác nhận trong cùng một thông số trước khi sản xuất.",
      "Hãy gửi logo, mức tạ, số lượng và ngày giao mục tiêu. Chúng tôi sẽ đánh giá danh mục, tùy chỉnh và đóng gói để lập đề xuất.",
      "Quy trình gồm trao đổi nhu cầu, xác nhận hiệu ứng logo, chốt mẫu và phương án sản xuất, sản xuất kèm QC, sau đó đóng gói và xuất hàng.",
      "Sau khi thiết kế cuối được duyệt, sản xuất, kiểm tra, đóng gói và chuẩn bị xuất hàng hoàn tất trong 15 ngày. Đây là thời gian của dự án này, không phải cam kết chung.",
      "Tay cầm nhôm ít bị oxy hóa; kết cấu liền khối phù hợp sử dụng tần suất cao. QC kiểm tra ngoại hình đã duyệt, logo, tình trạng sản phẩm và bao bì.",
      "Bộ tạ tay, bánh tạ và giá đỡ có nhận diện thống nhất, đáp ứng nhu cầu thương mại và tạo thành giải pháp sức mạnh hoàn chỉnh.",
      "Tóm tắt, không phải trích dẫn: khách hàng đánh giá cao tốc độ giao, chất lượng và hiệu quả tùy chỉnh. Tên, quốc gia, số lượng và dữ liệu chưa được phép không được công bố.",
      "Một nhà cung cấp điều phối từ thiết kế, sản xuất, QC đến đóng gói và xuất hàng. Xem sản phẩm, nhà máy, dự án và liên hệ bên dưới."
    ],
    midCta: "[Yêu cầu báo giá tùy chỉnh](/vi/lien-he) với logo, mức tạ, số lượng và ngày mục tiêu.", midCtaLabel: "Yêu cầu báo giá",
    ctaTitle: "Bạn cần tạ tay và bánh tạ mang thương hiệu riêng?", ctaText: "Gửi logo, mức tạ, số lượng và thời gian để nhận đề xuất cho phòng gym, chuỗi thể lực, thương hiệu hoặc nhà phân phối.", ctaLabel: "Nhận đề xuất tùy chỉnh",
    imageAlt: ["Tạ tay in logo khách hàng với tay cầm hợp kim nhôm cho chuỗi trung tâm thể lực", "Bánh tạ màu hồng tùy chỉnh cho dự án phòng gym thương mại", "Bánh tạ màu cam 20 kg tùy chỉnh cho khu tập sức mạnh", "Bánh tạ màu xanh 5 kg tùy chỉnh cho bộ thiết bị gym đồng bộ"],
    imageCaption: ["Sản phẩm thật của dự án với logo khách hàng đã được cho phép.", "Bánh tạ màu tùy chỉnh thực tế với logo được phép hiển thị.", "Dải sản phẩm gồm nhiều màu và mức tạ đồng bộ.", "Ảnh đơn hàng hoàn tất; logo được hiển thị theo ủy quyền."],
    faq: [["Sản phẩm nào được tùy chỉnh?", "Tạ tay in logo, bánh tạ và giá đỡ đồng bộ."], ["Dự án mất bao lâu?", "15 ngày từ duyệt thiết kế cuối đến xuất hàng."], ["Vì sao dùng tay cầm nhôm?", "Ít bị gỉ hơn và phù hợp sử dụng thương mại thường xuyên."], ["Mọi đơn hàng đều 15 ngày?", "Không, thời gian phụ thuộc mẫu, số lượng và tùy chỉnh."], ["Cần gửi gì để báo giá?", "Logo, mức tạ, số lượng, điểm đến, bao bì và ngày mục tiêu."]],
    linkLabels: ["Tạ tay chuyên nghiệp", "Bánh tạ tùy chỉnh", "Sản xuất và chất lượng", "Dự án tham khảo", "Yêu cầu báo giá"]
  },
  {
    locale: "sv",
    path: "/sv/projekt/anpassade-hantlar-viktskivor-traningskedja",
    title: "Anpassade hantlar för träningskedja | Leverans på 15 dagar",
    description: "Se hur vi tillverkade och skickade hantlar med logotyp, anpassade viktskivor och ställ till en träningskedja på 15 dagar.",
    h1: "Hantlar och viktskivor med logotyp för en träningskedja",
    keyword: "anpassade hantlar", relatedKeywords: ["hantlar med logotyp", "anpassade viktskivor", "leverantör av gymutrustning", "kommersiell styrkeutrustning"],
    home: "Start", projects: "Projekt", eyebrow: "Verkligt kundprojekt · skickat på 15 dagar",
    sectionHeadings: ["Projektöversikt", "Kundens behov", "Hantlar med egen logotyp", "Viktskivor och ställ", "Enhetligt varumärke och specifikation", "Begär ett anpassat förslag", "Projektgenomförande", "15 dagar från slutgodkännande till leverans", "Kommersiell konstruktion och kvalitetskontroll", "Resultat", "Sammanfattning av kundens återkoppling", "Varför kunden valde PowerBaseFit"],
    sections: [
      "En kedja av träningsanläggningar behövde en samordnad serie styrkeutrustning med egen profil. PowerBaseFit tillverkade anpassade hantlar, viktskivor och matchande ställ. Logotypen visas med kundens tillstånd, medan juridiskt namn och plats hålls konfidentiella. Från slutligt designgodkännande till leverans tog projektet 15 dagar.",
      "Köparen behövde samma visuella identitet i flera anläggningar och utrustning för frekvent kommersiell användning. Utseende, logotyp, användning och förvaring skulle fungera tillsammans.",
      "Hantlarna fick kundens logotyp och gemensam formgivning. Handtag av aluminiumlegering är mindre rostbenägna och passar kommersiell träning. Den robusta integrerade konstruktionen minskar risken för brott vid hög användning.",
      "Leveransen omfattade även färganpassade viktskivor och ställ för styrkezonen. Gemensam planering samordnade profil, ordning och drift.",
      "Logotypfiler, färger, vikter, konstruktion och förpackning fastställdes i en godkänd specifikation.",
      "Skicka logotyp, vikter, antal och önskat datum. Vi bedömer produktmix, anpassning och emballage för ett projektspecifikt förslag.",
      "Arbetet gick från behovsdialog och logotypkontroll till slutligt produktionsunderlag, tillverkning, kvalitetskontroll, packning och leverans.",
      "Efter slutgodkänd design slutfördes produktion, kontroll, packning och leveransförberedelse på 15 dagar. Tiden gäller detta projekt och är ingen generell garanti.",
      "Aluminiumhandtagen är mindre känsliga för rost och den integrerade strukturen lämpar sig för frekvent användning. Kontrollen omfattade godkänt utseende, logotyp, produktstatus och emballage.",
      "Hantlar, skivor och ställ fick en enhetlig profil och skapade en komplett lösning för kedjans kommersiella behov.",
      "Sammanfattning, inte ordagrant citat: kunden uppskattade leveranshastigheten, kvaliteten och slutresultatet. Namn, land, mängd och ej godkända uppgifter publiceras inte.",
      "En leverantör samordnade design, tillverkning, kontroll, packning och leverans. Se produkter, fabrik, projekt och kontakt nedan."
    ],
    midCta: "[Begär en anpassad offert](/sv/kontakt) med logotyp, vikter, antal och önskat datum.", midCtaLabel: "Begär offert",
    ctaTitle: "Behöver ni hantlar och viktskivor med eget varumärke?", ctaText: "Skicka logotyp, vikter, antal och tidsplan för ett förslag till gym, kedja, varumärke eller distributör.", ctaLabel: "Få ett anpassat förslag",
    imageAlt: ["Logotyphantlar med aluminiumhandtag för en träningskedja", "Rosa anpassad viktskiva för ett kommersiellt gymprojekt", "Orange anpassad 20 kg viktskiva för styrketräningszon", "Blå anpassad 5 kg viktskiva för samordnad gymutrustning"],
    imageCaption: ["Verkliga projekthantlar med kundens godkända logotyp.", "Verklig specialfärgad viktskiva med godkänd logotyp synlig.", "Serien omfattade flera samordnade vikter och färger.", "Foto från den färdiga ordern; logotypen visas med tillstånd."],
    faq: [["Vad anpassades?", "Hantlar med logotyp, viktskivor och matchande ställ."], ["Hur lång tid tog projektet?", "15 dagar från slutligt designgodkännande till leverans."], ["Varför aluminiumhandtag?", "De är mindre rostbenägna och passar frekvent kommersiell användning."], ["Gäller 15 dagar alla order?", "Nej, tid beror på modell, mängd och anpassning."], ["Vad behövs för offert?", "Logotyp, vikter, antal, destination, emballage och måldatum."]],
    linkLabels: ["Kommersiella hantlar", "Anpassade viktskivor", "Tillverkning och kvalitet", "Projekt", "Begär offert"]
  },
  {
    locale: "it",
    path: "/it/progetti/manubri-dischi-personalizzati-catena-fitness",
    title: "Manubri personalizzati per catena fitness | Spediti in 15 giorni",
    description: "Scopri come abbiamo prodotto e spedito manubri con logo, dischi personalizzati e rack per una catena di centri fitness in 15 giorni.",
    h1: "Manubri e dischi con logo per una catena di centri fitness",
    keyword: "manubri personalizzati", relatedKeywords: ["manubri con logo", "dischi pesi personalizzati", "fornitore attrezzature palestra", "attrezzatura fitness su misura"],
    home: "Home", projects: "Progetti", eyebrow: "Caso cliente reale · spedito in 15 giorni",
    sectionHeadings: ["Panoramica", "Esigenza del cliente", "Manubri con logo", "Dischi e rack coordinati", "Marchio e specifiche coerenti", "Richiedi una proposta", "Esecuzione", "15 giorni dall'approvazione finale alla spedizione", "Struttura commerciale e controllo qualità", "Risultati", "Sintesi del feedback cliente", "Perché il cliente ha scelto PowerBaseFit"],
    sections: [
      "Una catena di centri per la preparazione fisica richiedeva una linea coordinata di attrezzature strength con il proprio marchio. PowerBaseFit ha realizzato manubri personalizzati, dischi e rack abbinati. Il logo è mostrato con autorizzazione del cliente, mentre ragione sociale e sede restano riservate. Dall'approvazione finale del design alla spedizione sono trascorsi 15 giorni.",
      "Il buyer cercava coerenza visiva tra le sedi e prodotti adatti a un uso commerciale frequente. Aspetto, logo, esperienza d'uso e stoccaggio dovevano funzionare come sistema.",
      "I manubri hanno ricevuto il logo cliente e una grafica coordinata. Le impugnature in lega di alluminio sono meno soggette alla ruggine e adatte alla palestra. La struttura robusta integrata riduce il rischio di rottura con uso frequente.",
      "La fornitura comprendeva dischi personalizzati in colori coordinati e rack per la zona pesi. La progettazione unitaria ha allineato immagine, ordine e operatività.",
      "Logo, colori, pesi, struttura e imballaggio sono stati confermati in un'unica specifica approvata.",
      "Invia logo, pesi, quantità e data obiettivo. Valuteremo mix prodotti, personalizzazione e imballaggio per una proposta dedicata.",
      "Il progetto ha seguito: raccolta requisiti, conferma grafica del logo, definizione di stile e piano produttivo, produzione e controllo, imballaggio e spedizione.",
      "Dopo l'approvazione finale, produzione, ispezione, imballaggio e preparazione della spedizione sono stati completati in 15 giorni. È il dato di questo caso, non una promessa standard.",
      "Le impugnature in alluminio resistono meglio all'ossidazione e la struttura integrata è adatta all'uso frequente. Il controllo ha verificato aspetto, logo, condizioni e imballaggio.",
      "Manubri, dischi e rack hanno ottenuto un'identità uniforme e una soluzione completa per le esigenze commerciali della catena.",
      "Sintesi, non citazione: il cliente ha valutato molto positivamente rapidità, qualità e risultato finale. Nome, Paese, quantità e dati non autorizzati restano riservati.",
      "Un solo fornitore ha coordinato design, produzione, controllo, imballaggio e spedizione. Scopri sotto prodotti, fabbrica, progetti e contatti."
    ],
    midCta: "[Richiedi un preventivo personalizzato](/it/contatti) con logo, pesi, quantità e data obiettivo.", midCtaLabel: "Richiedi preventivo",
    ctaTitle: "Vuoi manubri e dischi con il tuo marchio?", ctaText: "Invia logo, pesi, quantità e data obiettivo per una proposta per palestra, catena, brand o distributore.", ctaLabel: "Ricevi una proposta",
    imageAlt: ["Manubri con logo personalizzato e impugnature in alluminio per catena fitness", "Disco rosa personalizzato per progetto palestra commerciale", "Disco arancione personalizzato da 20 kg per zona pesi", "Disco blu personalizzato da 5 kg per linea coordinata da palestra"],
    imageCaption: ["Manubri reali del progetto con il logo cliente autorizzato.", "Disco reale in colore personalizzato con logo autorizzato visibile.", "La gamma comprendeva pesi e colori coordinati.", "Foto dell'ordine completato; il logo è mostrato con autorizzazione."],
    faq: [["Quali prodotti sono stati personalizzati?", "Manubri con logo, dischi e rack abbinati."], ["Quanto è durato il progetto?", "15 giorni dall'approvazione finale alla spedizione."], ["Perché impugnature in alluminio?", "Sono meno soggette alla ruggine e adatte all'uso commerciale frequente."], ["Ogni ordine richiede 15 giorni?", "No, dipende da modello, quantità e personalizzazione."], ["Cosa serve per il preventivo?", "Logo, pesi, quantità, destinazione, imballaggio e data obiettivo."]],
    linkLabels: ["Manubri professionali", "Dischi personalizzati", "Produzione e qualità", "Progetti", "Richiedi preventivo"]
  },
  {
    locale: "nl",
    path: "/nl/projecten/halters-gewichtsschijven-op-maat-fitnessketen",
    title: "Halters op maat voor een fitnessketen | Verzonden in 15 dagen",
    description: "Lees hoe wij halters met logo, gewichtsschijven op maat en rekken voor een fitnessketen in 15 dagen produceerden en verzonden.",
    h1: "Halters en gewichtsschijven met logo voor een fitnessketen",
    keyword: "halters op maat", relatedKeywords: ["halters met logo", "gewichtsschijven op maat", "leverancier fitnessapparatuur", "commerciële krachtapparatuur"],
    home: "Home", projects: "Projecten", eyebrow: "Echt klantproject · verzonden in 15 dagen",
    sectionHeadings: ["Projectoverzicht", "Behoefte van de klant", "Halters met eigen logo", "Gewichtsschijven en rekken", "Consistent merk en specificatie", "Vraag een voorstel aan", "Projectuitvoering", "15 dagen van definitieve goedkeuring tot verzending", "Commerciële constructie en kwaliteitscontrole", "Resultaten", "Samenvatting klantfeedback", "Waarom de klant PowerBaseFit koos"],
    sections: [
      "Een keten van fysieke trainingscentra zocht een samenhangende lijn krachtapparatuur met een eigen merkuitstraling. PowerBaseFit maakte halters op maat, gewichtsschijven en bijpassende rekken. Het logo wordt met toestemming van de klant getoond; de officiële bedrijfsnaam en locatie blijven vertrouwelijk. Van definitieve ontwerpgoedkeuring tot verzending duurde het project 15 dagen.",
      "De koper wilde dezelfde uitstraling op meerdere locaties en apparatuur voor frequent commercieel gebruik. Uiterlijk, logo, gebruikservaring en opslag moesten één systeem vormen.",
      "De halters kregen het klantlogo en een afgestemde vormgeving. Handgrepen van aluminiumlegering zijn minder roestgevoelig en geschikt voor een commerciële trainingsomgeving. De robuuste geïntegreerde constructie verkleint het risico op breuk bij intensief gebruik.",
      "De levering omvatte ook gekleurde gewichtsschijven op maat en rekken voor de krachtzone. Gezamenlijke planning stemde merk, opslag en dagelijks gebruik op elkaar af.",
      "Logobestand, kleuren, gewichten, constructie en verpakking werden samen in één goedgekeurde specificatie vastgelegd.",
      "Stuur logo, gewichten, aantallen en gewenste datum. Wij beoordelen productmix, personalisatie en verpakking voor een projectspecifiek voorstel.",
      "Het traject bestond uit eisen bespreken, logo-effect bevestigen, stijl en productieplan vastleggen, produceren en controleren, daarna verpakken en verzenden.",
      "Na definitieve ontwerpgoedkeuring zijn productie, controle, verpakking en verzendvoorbereiding in 15 dagen afgerond. Dit is een projectfeit, geen algemene levertijdbelofte.",
      "De aluminium handgrepen zijn minder gevoelig voor corrosie; de geïntegreerde structuur past bij frequent gebruik. De controle omvatte uiterlijk, logo, productconditie en verpakking.",
      "Halters, schijven en rekken kregen één consistente merkuitstraling en boden een complete oplossing voor de fitnessketen.",
      "Samenvatting, geen letterlijk citaat: de klant waardeerde de snelheid, kwaliteit en het eindresultaat zeer. Naam, land, aantallen en niet-vrijgegeven gegevens blijven vertrouwelijk.",
      "Eén leverancier coördineerde ontwerp, productie, controle, verpakking en verzending. Bekijk hieronder producten, fabriek, projecten en contact."
    ],
    midCta: "[Vraag een offerte op maat aan](/nl/contact) met logo, gewichten, aantallen en gewenste datum.", midCtaLabel: "Offerte aanvragen",
    ctaTitle: "Halters en schijven met uw eigen merk nodig?", ctaText: "Stuur logo, gewichten, aantallen en planning voor een voorstel voor sportschool, keten, merk of distributeur.", ctaLabel: "Ontvang een voorstel op maat",
    imageAlt: ["Halters met klantlogo en aluminium handgrepen voor een fitnessketen", "Roze gewichtsschijf op maat voor een commercieel fitnessproject", "Oranje gewichtsschijf van 20 kg op maat voor krachttraining", "Blauwe gewichtsschijf van 5 kg voor een afgestemde fitnesslijn"],
    imageCaption: ["Echte projecthalters met het goedgekeurde klantlogo.", "Echte schijf in klantspecifieke kleur met zichtbaar goedgekeurd logo.", "De reeks omvatte meerdere afgestemde gewichten en kleuren.", "Foto van de voltooide order; het logo wordt met toestemming getoond."],
    faq: [["Wat is aangepast?", "Halters met logo, gewichtsschijven en bijpassende rekken."], ["Hoe lang duurde het project?", "15 dagen van definitieve ontwerpgoedkeuring tot verzending."], ["Waarom aluminium handgrepen?", "Ze zijn minder roestgevoelig en geschikt voor frequent commercieel gebruik."], ["Geldt 15 dagen voor elke order?", "Nee, de planning hangt af van model, aantal en personalisatie."], ["Wat is nodig voor een offerte?", "Logo, gewichten, aantallen, bestemming, verpakking en gewenste datum."]],
    linkLabels: ["Professionele halters", "Gewichtsschijven op maat", "Productie en kwaliteit", "Projecten", "Offerte aanvragen"]
  },
  {
    locale: "ar",
    path: "/ar/projects/custom-dumbbells-weight-plates-fitness-chain",
    title: "دمبل مخصص لسلسلة تدريب | شحن خلال 15 يوماً",
    description: "تعرّف على تصنيع وشحن دمبل بشعار خاص وأقراص أوزان ورفوف متناسقة لسلسلة تدريب خلال 15 يوماً.",
    h1: "دمبل وأقراص أوزان بشعار خاص لسلسلة مراكز تدريب",
    keyword: "دمبل مخصص", relatedKeywords: ["دمبل بشعار خاص", "أقراص أوزان مخصصة", "مورد معدات صالات رياضية", "معدات قوة تجارية"],
    home: "الرئيسية", projects: "المشروعات", eyebrow: "مشروع عميل حقيقي · الشحن خلال 15 يوماً",
    sectionHeadings: ["نظرة عامة", "احتياج العميل", "دمبل بشعار خاص", "أقراص ورفوف متناسقة", "هوية ومواصفة موحدة", "اطلب مقترحاً مخصصاً", "تنفيذ المشروع", "15 يوماً من الاعتماد النهائي إلى الشحن", "هيكل تجاري وفحص جودة", "النتائج", "ملخص ملاحظات العميل", "لماذا اختار العميل PowerBaseFit"],
    sections: [
      "احتاجت سلسلة من مراكز التدريب البدني إلى مجموعة متناسقة من معدات القوة تحمل هويتها. صنعت PowerBaseFit دمبل مخصصاً وأقراص أوزان ورفوفاً متطابقة. يظهر الشعار بإذن العميل، بينما يبقى الاسم القانوني والموقع سريين. استغرق المشروع 15 يوماً من اعتماد التصميم النهائي إلى الشحن.",
      "أراد المشتري هوية موحدة عبر المراكز ومعدات تتحمل الاستخدام التجاري المتكرر. كان المطلوب تنسيق المظهر والشعار وتجربة الاستخدام والتخزين.",
      "حمل الدمبل شعار العميل وتصميماً موحداً. مقابض سبائك الألومنيوم أقل عرضة للصدأ وتناسب بيئة التدريب التجارية. يقلل الهيكل المتكامل المتين احتمال الكسر مع الاستخدام المتكرر.",
      "شمل التوريد أقراص أوزان بألوان مخصصة ورفوفاً لمنطقة القوة. ربط التخطيط المشترك بين العلامة والترتيب والتشغيل.",
      "تم اعتماد ملفات الشعار والألوان والأوزان والبنية والتغليف ضمن مواصفة واحدة قبل الإنتاج.",
      "أرسل الشعار والأوزان والكميات والموعد المستهدف. نراجع المزيج والتخصيص والتغليف لإعداد مقترح للمشروع.",
      "مر العمل بمناقشة المتطلبات، وتأكيد مظهر الشعار، واعتماد النمط وخطة الإنتاج، ثم التصنيع والفحص والتعبئة والشحن.",
      "بعد اعتماد التصميم النهائي اكتملت الصناعة والفحص والتعبئة وتجهيز الشحن خلال 15 يوماً. هذا زمن المشروع الفعلي وليس وعداً ثابتاً لكل طلب.",
      "مقابض الألومنيوم أقل تأثراً بالأكسدة، والبنية المتكاملة مناسبة للاستخدام المكثف. شمل الفحص المظهر والشعار وحالة المنتج والتغليف.",
      "حقق الدمبل والأقراص والرفوف هوية موحدة وحلاً كاملاً لاحتياجات سلسلة التدريب.",
      "ملخص وليس اقتباساً حرفياً: أثنى العميل على سرعة التسليم والجودة والنتيجة النهائية. لا ننشر الاسم أو البلد أو الكمية أو بيانات غير مصرح بها.",
      "نسق مورد واحد التصميم والإنتاج والفحص والتعبئة والشحن. يمكن زيارة صفحات الدمبل والأقراص والمصنع والاتصال عبر الروابط أدناه."
    ],
    midCta: "[اطلب عرضاً مخصصاً](/contact) وأرسل الشعار والأوزان والكميات والموعد المستهدف.", midCtaLabel: "اطلب عرضاً",
    ctaTitle: "هل تحتاج دمبل وأقراصاً بعلامتك؟", ctaText: "أرسل الشعار والأوزان والكميات والموعد للحصول على مقترح لصالتك أو سلسلتك أو علامتك أو نشاط التوزيع.", ctaLabel: "احصل على مقترح مخصص",
    imageAlt: ["دمبل بشعار العميل ومقابض ألومنيوم لسلسلة مراكز تدريب", "قرص وزن وردي مخصص لمشروع صالة تجارية", "قرص وزن برتقالي 20 كجم مخصص لمنطقة القوة", "قرص وزن أزرق 5 كجم لمجموعة معدات متناسقة"],
    imageCaption: ["دمبل حقيقي من المشروع مع ظهور شعار العميل المصرح به.", "قرص بلون مخصص حقيقي مع ظهور الشعار المصرح به.", "شملت المجموعة أوزاناً وألواناً متناسقة.", "صورة للطلب المكتمل؛ يظهر الشعار بإذن العميل."],
    faq: [["ما المنتجات التي خُصصت؟", "دمبل بشعار خاص وأقراص أوزان ورفوف متناسقة."], ["كم استغرق المشروع؟", "15 يوماً من اعتماد التصميم النهائي إلى الشحن."], ["لماذا مقابض الألومنيوم؟", "هي أقل عرضة للصدأ وتناسب الاستخدام التجاري المتكرر."], ["هل كل طلب يستغرق 15 يوماً؟", "لا، يعتمد الوقت على النموذج والكمية والتخصيص."], ["ما المطلوب للعرض؟", "الشعار والأوزان والكميات والوجهة والتغليف والموعد."]],
    linkLabels: ["الدمبل التجاري", "أقراص الأوزان", "التصنيع والجودة", "المشروعات", "طلب عرض سعر"]
  },
  {
    locale: "ko",
    path: "/ko/projects/custom-logo-dumbbells-weight-plates-fitness-chain",
    title: "피트니스 체인 맞춤 덤벨 | 15일 출고",
    description: "피트니스 트레이닝 체인을 위해 로고 덤벨, 맞춤 원판, 보관 랙을 15일 만에 생산·출고한 실제 사례입니다.",
    h1: "피트니스 트레이닝 체인을 위한 맞춤 로고 덤벨과 원판",
    keyword: "맞춤 덤벨", relatedKeywords: ["로고 덤벨", "맞춤 웨이트 원판", "상업용 헬스기구 공급업체", "피트니스 장비 OEM"],
    home: "홈", projects: "프로젝트", eyebrow: "실제 고객 맞춤 사례 · 15일 출고",
    sectionHeadings: ["프로젝트 개요", "고객 요구", "맞춤 로고 덤벨", "맞춤 원판과 보관 랙", "일관된 브랜드와 사양", "맞춤 제안 요청", "프로젝트 진행", "최종 디자인 승인부터 출고까지 15일", "상업용 구조와 품질 검사", "프로젝트 결과", "고객 피드백 요약", "PowerBaseFit을 선택한 이유"],
    sections: [
      "한 체력 훈련 센터 체인은 자체 브랜드로 통일된 근력 장비가 필요했습니다. PowerBaseFit은 맞춤 덤벨, 웨이트 원판, 보관 랙을 제작했습니다. 로고는 고객 허가에 따라 공개하며 법인명과 위치는 비공개로 유지합니다. 최종 디자인 승인부터 출고까지 15일이 걸렸습니다.",
      "여러 지점에서 같은 브랜드 이미지를 유지하고 빈번한 상업용 사용에 적합해야 했습니다. 외관, 로고, 사용감, 보관 구성을 하나의 시스템으로 맞췄습니다.",
      "덤벨에는 고객 로고와 통일된 디자인을 적용했습니다. 알루미늄 합금 손잡이는 녹 발생 가능성이 낮고 상업용 환경에 적합합니다. 견고한 일체형 구조는 반복 사용 중 파손 위험을 줄이는 데 유리합니다.",
      "맞춤 색상의 원판과 근력 존용 보관 랙도 함께 공급했습니다. 덤벨, 원판, 랙을 함께 계획해 브랜드와 운영을 맞췄습니다.",
      "로고 파일, 색상, 중량, 구조, 포장을 하나의 승인 사양으로 확정한 뒤 생산했습니다.",
      "로고, 필요 중량, 수량, 목표 일정을 보내 주세요. 제품 구성, 맞춤 제작, 포장을 검토해 프로젝트 제안을 드립니다.",
      "요구사항 협의, 로고 효과 확인, 스타일·생산안 확정, 생산·품질검사, 포장·출고 순으로 진행했습니다.",
      "최종 디자인 승인 후 생산, 검사, 포장, 출고 준비를 15일 안에 완료했습니다. 이 기간은 본 사례의 사실이며 모든 주문의 표준 납기는 아닙니다.",
      "알루미늄 손잡이는 부식에 강하고, 일체형 구조는 고빈도 사용에 적합합니다. 승인 외관, 로고 적용, 제품 상태, 포장을 검사했습니다.",
      "덤벨, 원판, 랙의 브랜드 이미지가 통일되었고 체인 시설에 필요한 완성형 근력 장비 구성을 제공했습니다.",
      "직접 인용이 아닌 요약: 고객은 납품 속도, 제품 품질, 최종 맞춤 결과를 높게 평가했습니다. 고객명, 국가, 수량 등 미승인 정보는 공개하지 않습니다.",
      "한 공급사가 디자인, 생산, 검사, 포장, 출고를 통합 지원했습니다. 아래에서 제품, 공장, 프로젝트, 문의 페이지를 확인할 수 있습니다."
    ],
    midCta: "[맞춤 견적 요청](/ko/contact): 로고, 중량, 수량, 목표 일정을 보내 주세요.", midCtaLabel: "견적 요청",
    ctaTitle: "자체 브랜드 덤벨과 원판이 필요하신가요?", ctaText: "로고, 중량, 수량, 목표 일정을 보내시면 헬스장, 체인, 브랜드, 유통 프로젝트에 맞춰 제안합니다.", ctaLabel: "맞춤 제안 받기",
    imageAlt: ["피트니스 체인용 고객 로고 맞춤 덤벨과 알루미늄 손잡이", "상업용 헬스장 프로젝트용 분홍색 맞춤 원판", "근력 훈련 존용 주황색 20kg 맞춤 원판", "통일된 헬스기구 라인용 파란색 5kg 맞춤 원판"],
    imageCaption: ["허가받은 고객 로고가 보이는 실제 프로젝트 덤벨입니다.", "허가된 로고가 보이는 실제 맞춤 색상 원판입니다.", "여러 중량과 색상을 통일된 구성으로 제작했습니다.", "고객 허가에 따라 로고를 공개한 완성 주문 사진입니다."],
    faq: [["어떤 제품을 맞춤 제작했나요?", "로고 덤벨, 웨이트 원판, 보관 랙입니다."], ["프로젝트 기간은 얼마였나요?", "최종 디자인 승인부터 출고까지 15일입니다."], ["알루미늄 손잡이의 장점은?", "녹 가능성이 낮고 빈번한 상업용 사용에 적합합니다."], ["모든 주문이 15일인가요?", "아닙니다. 모델, 수량, 맞춤 범위에 따라 달라집니다."], ["견적에 필요한 정보는?", "로고, 중량, 수량, 도착지, 포장, 목표 일정입니다."]],
    linkLabels: ["상업용 덤벨", "맞춤 웨이트 원판", "생산과 품질", "프로젝트 사례", "견적 문의"]
  },
  {
    locale: "id",
    path: "/id/proyek/dumbbell-piring-beban-kustom-jaringan-gym",
    title: "Dumbbell kustom untuk jaringan gym | Dikirim dalam 15 hari",
    description: "Lihat cara kami membuat dan mengirim dumbbell berlogo, piring beban kustom, serta rak untuk jaringan pusat latihan dalam 15 hari.",
    h1: "Dumbbell dan piring beban berlogo untuk jaringan pusat latihan",
    keyword: "dumbbell kustom", relatedKeywords: ["dumbbell dengan logo", "piring beban kustom", "pemasok peralatan gym", "peralatan strength komersial"],
    home: "Beranda", projects: "Proyek", eyebrow: "Kasus pelanggan nyata · dikirim dalam 15 hari",
    sectionHeadings: ["Ringkasan proyek", "Kebutuhan pelanggan", "Dumbbell dengan logo", "Piring beban dan rak", "Merek dan spesifikasi yang konsisten", "Minta proposal kustom", "Pelaksanaan proyek", "15 hari dari persetujuan final hingga pengiriman", "Konstruksi komersial dan QC", "Hasil proyek", "Ringkasan tanggapan pelanggan", "Alasan memilih PowerBaseFit"],
    sections: [
      "Sebuah jaringan pusat latihan fisik membutuhkan rangkaian alat strength dengan identitas merek sendiri. PowerBaseFit membuat dumbbell kustom, piring beban, dan rak yang serasi. Logo ditampilkan dengan izin pelanggan, sedangkan nama badan usaha dan lokasi tetap dirahasiakan. Dari persetujuan desain final hingga pengiriman membutuhkan 15 hari.",
      "Pembeli membutuhkan tampilan yang sama di beberapa lokasi dan produk untuk penggunaan komersial berfrekuensi tinggi. Penampilan, logo, pengalaman pakai, dan penyimpanan harus menjadi satu sistem.",
      "Dumbbell memakai logo pelanggan dan desain yang terkoordinasi. Gagang paduan aluminium tidak mudah berkarat dan sesuai untuk lingkungan komersial. Struktur kokoh terintegrasi membantu mengurangi risiko patah pada penggunaan rutin.",
      "Pasokan juga mencakup piring beban berwarna kustom dan rak untuk area strength. Perencanaan bersama menyelaraskan merek, penyimpanan, dan operasi.",
      "File logo, warna, berat, konstruksi, dan kemasan dikonfirmasi dalam satu spesifikasi yang disetujui sebelum produksi.",
      "Kirim logo, kebutuhan berat, jumlah, dan target tanggal. Kami akan menilai kombinasi produk, kustomisasi, dan kemasan untuk proposal proyek.",
      "Tahapan meliputi diskusi kebutuhan, konfirmasi efek logo, finalisasi gaya dan rencana produksi, produksi dan QC, lalu pengemasan dan pengiriman.",
      "Setelah desain final disetujui, produksi, pemeriksaan, pengemasan, dan persiapan pengiriman selesai dalam 15 hari. Ini fakta proyek, bukan janji umum.",
      "Gagang aluminium lebih tahan korosi dan struktur terintegrasi cocok untuk pemakaian berfrekuensi tinggi. QC memeriksa tampilan, aplikasi logo, kondisi produk, dan kemasan.",
      "Dumbbell, piring beban, dan rak memiliki visual merek yang konsisten serta menjadi solusi strength lengkap untuk jaringan tersebut.",
      "Ringkasan, bukan kutipan langsung: pelanggan sangat menghargai kecepatan, kualitas, dan hasil akhir. Nama, negara, jumlah, dan data tanpa izin tidak dipublikasikan.",
      "Satu pemasok mengoordinasikan desain, produksi, QC, kemasan, dan pengiriman. Lihat produk, pabrik, proyek, dan kontak di bawah."
    ],
    midCta: "[Minta penawaran kustom](/id/kontak) dengan logo, berat, jumlah, dan target tanggal.", midCtaLabel: "Minta penawaran",
    ctaTitle: "Butuh dumbbell dan piring beban dengan merek sendiri?", ctaText: "Kirim logo, berat, jumlah, dan jadwal untuk proposal bagi gym, jaringan, merek, importir, atau distributor.", ctaLabel: "Dapatkan proposal kustom",
    imageAlt: ["Dumbbell kustom dengan logo pelanggan dan gagang aluminium untuk jaringan pusat latihan", "Piring beban merah muda kustom untuk proyek gym komersial", "Piring beban oranye 20 kg kustom untuk area strength", "Piring beban biru 5 kg kustom untuk rangkaian peralatan gym"],
    imageCaption: ["Dumbbell proyek nyata dengan logo pelanggan yang telah diizinkan.", "Piring warna kustom nyata dengan logo berizin terlihat.", "Rangkaian mencakup beberapa berat dan warna serasi.", "Foto pesanan selesai; logo ditampilkan dengan izin."],
    faq: [["Produk apa yang dikustom?", "Dumbbell berlogo, piring beban, dan rak yang serasi."], ["Berapa lama proyeknya?", "15 hari dari persetujuan desain final hingga pengiriman."], ["Mengapa gagang aluminium?", "Tidak mudah berkarat dan cocok untuk penggunaan komersial rutin."], ["Apakah semua pesanan 15 hari?", "Tidak, jadwal bergantung model, jumlah, dan kustomisasi."], ["Apa yang perlu dikirim?", "Logo, berat, jumlah, tujuan, kemasan, dan target tanggal."]],
    linkLabels: ["Dumbbell komersial", "Piring beban kustom", "Produksi dan kualitas", "Referensi proyek", "Minta penawaran"]
  },
  {
    locale: "pl",
    path: "/pl/projekty/hantle-obciazenia-logo-siec-treningowa",
    title: "Hantle na zamówienie dla sieci fitness | Wysyłka w 15 dni",
    description: "Zobacz, jak w 15 dni wyprodukowaliśmy i wysłaliśmy hantle z logo, obciążenia oraz stojaki dla sieci treningowej.",
    h1: "Hantle i obciążenia z logo dla sieci centrów treningowych",
    keyword: "hantle na zamówienie", relatedKeywords: ["hantle z logo", "obciążenia na zamówienie", "dostawca sprzętu do siłowni", "komercyjny sprzęt siłowy"],
    home: "Strona główna", projects: "Projekty", eyebrow: "Rzeczywisty projekt klienta · wysłany w 15 dni",
    sectionHeadings: ["Opis projektu", "Potrzeba klienta", "Hantle z logo", "Obciążenia i stojaki", "Spójna marka i specyfikacja", "Poproś o indywidualną ofertę", "Realizacja", "15 dni od ostatecznej akceptacji do wysyłki", "Konstrukcja komercyjna i kontrola jakości", "Rezultaty", "Podsumowanie opinii klienta", "Dlaczego wybrano PowerBaseFit"],
    sections: [
      "Sieć centrów przygotowania fizycznego potrzebowała spójnej linii sprzętu siłowego pod własną marką. PowerBaseFit wykonał hantle na zamówienie, obciążenia i pasujące stojaki. Logo jest pokazane za zgodą klienta, natomiast nazwa prawna i lokalizacja pozostają poufne. Od finalnej akceptacji projektu do wysyłki minęło 15 dni.",
      "Kupujący potrzebował jednolitego wyglądu w wielu placówkach i sprzętu do częstego użytku komercyjnego. Wygląd, logo, obsługa i przechowywanie miały tworzyć jeden system.",
      "Hantle otrzymały logo klienta i wspólną stylistykę. Uchwyty ze stopu aluminium są mniej podatne na rdzę i odpowiednie do środowiska komercyjnego. Mocna zintegrowana konstrukcja ogranicza ryzyko pęknięcia przy częstym użyciu.",
      "Dostawa objęła kolorowe obciążenia na zamówienie oraz stojaki do strefy siłowej. Wspólne planowanie połączyło markę, porządek i obsługę.",
      "Pliki logo, kolory, warianty wagowe, konstrukcja i opakowanie zostały zatwierdzone w jednej specyfikacji.",
      "Prześlij logo, zakres wag, ilości i oczekiwany termin. Ocenimy produkty, personalizację i opakowanie, aby przygotować propozycję.",
      "Proces obejmował rozmowę o wymaganiach, potwierdzenie wyglądu logo, zatwierdzenie stylu i planu produkcji, produkcję z kontrolą oraz pakowanie i wysyłkę.",
      "Po ostatecznej akceptacji projektu produkcję, kontrolę, pakowanie i przygotowanie wysyłki ukończono w 15 dni. Jest to fakt tego projektu, nie uniwersalna obietnica.",
      "Aluminiowe uchwyty są mniej podatne na korozję, a zintegrowana konstrukcja nadaje się do częstego użytkowania. Kontrola objęła wygląd, logo, stan produktu i opakowanie.",
      "Hantle, obciążenia i stojaki zyskały spójną identyfikację i utworzyły kompletne rozwiązanie dla sieci.",
      "Podsumowanie, nie cytat: klient bardzo wysoko ocenił szybkość dostawy, jakość i końcowy efekt. Nazwa, kraj, ilość i dane bez zgody pozostają poufne.",
      "Jeden dostawca skoordynował projekt, produkcję, kontrolę, pakowanie i wysyłkę. Poniżej znajdują się produkty, fabryka, projekty i kontakt."
    ],
    midCta: "[Poproś o ofertę na zamówienie](/pl/kontakt), przesyłając logo, wagi, ilości i termin.", midCtaLabel: "Poproś o ofertę",
    ctaTitle: "Potrzebujesz hantli i obciążeń z własnym logo?", ctaText: "Prześlij logo, wagi, ilości i termin, aby otrzymać propozycję dla siłowni, sieci, marki, importera lub dystrybutora.", ctaLabel: "Otrzymaj propozycję",
    imageAlt: ["Hantle z logo klienta i aluminiowymi uchwytami dla sieci centrów treningowych", "Różowe obciążenie na zamówienie do projektu siłowni komercyjnej", "Pomarańczowe obciążenie 20 kg na zamówienie do strefy siłowej", "Niebieskie obciążenie 5 kg do spójnej linii sprzętu fitness"],
    imageCaption: ["Rzeczywiste hantle z projektu z autoryzowanym logo klienta.", "Rzeczywiste obciążenie w kolorze specjalnym z widocznym, autoryzowanym logo.", "Seria obejmowała różne spójne wagi i kolory.", "Zdjęcie ukończonego zamówienia; logo jest pokazane za zgodą."],
    faq: [["Co spersonalizowano?", "Hantle z logo, obciążenia i pasujące stojaki."], ["Ile trwał projekt?", "15 dni od finalnej akceptacji do wysyłki."], ["Dlaczego uchwyty aluminiowe?", "Są mniej podatne na rdzę i nadają się do częstego użytku komercyjnego."], ["Czy każdy projekt trwa 15 dni?", "Nie, termin zależy od modelu, ilości i personalizacji."], ["Co przesłać do wyceny?", "Logo, wagi, ilości, miejsce dostawy, opakowanie i termin."]],
    linkLabels: ["Hantle komercyjne", "Obciążenia na zamówienie", "Produkcja i jakość", "Projekty", "Poproś o wycenę"]
  }
];

function makeBlocks(copy: CaseCopy): ContentBlock[] {
  return copy.sections.map((content, index) => {
    const block: ContentBlock = {
      id: `section-${index + 1}`,
      type: "rich_text",
      heading: copy.sectionHeadings[index],
      content,
      data: index === 0 ? { component: "quick-answer" } : undefined
    };
    if (index === 5) {
      block.content = undefined;
      block.data = { markdown: copy.midCta };
    }
    if (index === 11 && copy.locale === "ar") {
      block.content = undefined;
      block.data = {
        markdown: `${content}\n\n[${copy.linkLabels[0]}](/products/dumbbells) · [${copy.linkLabels[1]}](/products/weight-plates) · [${copy.linkLabels[2]}](/factory) · [${copy.linkLabels[3]}](/projects) · [${copy.linkLabels[4]}](/contact)`
      };
    }
    return block;
  });
}

function makeFaq(copy: CaseCopy): LocalizedFaq[] {
  return copy.faq.map(([question, answer], index) => ({ id: `faq-${index + 1}`, question, answer }));
}

function makeLinks(copy: CaseCopy): LocalizedInternalLink[] {
  return ["dumbbells-category", "weight-plates-category", "factory", "projects", "contact"].map((targetContentId, index) => ({
    targetContentId,
    label: copy.linkLabels[index]
  }));
}

function makeVersion(copy: CaseCopy): LocalizedContentVersion {
  const prefix = copy.locale === "en" || copy.locale === "ar" ? "" : `/${copy.path.split("/").filter(Boolean)[0]}`;
  const projectPath = copy.locale === "en" || copy.locale === "ar"
    ? "/projects"
    : copy.path.split("/").slice(0, 3).join("/");
  const contactPathByLocale: Record<CaseLocale, string> = {
    en: "/contact", "pt-BR": "/pt/contato", es: "/es/contacto", de: "/de/kontakt", fr: "/fr/contact",
    vi: "/vi/lien-he", sv: "/sv/kontakt", it: "/it/contatti", nl: "/nl/contact", ar: "/contact",
    ko: "/ko/contact", id: "/id/kontak", pl: "/pl/kontakt"
  };
  return {
    locale: copy.locale,
    translationStatus: copy.locale === "en" ? "published" : "localized",
    reviewStatus: "approved",
    publishStatus: "published",
    slug: copy.path.split("/").filter(Boolean).at(-1) ?? contentId,
    publicPath: copy.path,
    title: copy.title,
    description: copy.description,
    h1: copy.h1,
    body: makeBlocks(copy),
    faq: makeFaq(copy),
    author: { id: "powerbasefit-editorial", name: "PowerBaseFit", kind: "Organization", role: "Gym Equipment Manufacturer", url: "/" },
    reviewedBy: { id: "powerbasefit-quality", name: "PowerBaseFit Quality Team", kind: "Organization", role: "Production and Quality Review", url: "/factory" },
    schemaData: {
      category: "Commercial Gym Equipment Customization Case",
      breadcrumbs: [
        { name: copy.home, path: prefix || "/" },
        { name: copy.projects, path: projectPath },
        { name: copy.h1, path: copy.path }
      ],
      extra: {
        mainKeyword: copy.keyword,
        secondaryKeywords: copy.relatedKeywords,
        ctaTitle: copy.ctaTitle,
        ctaText: copy.ctaText,
        ctaLabel: copy.ctaLabel,
        contactPath: contactPathByLocale[copy.locale],
        eyebrow: copy.eyebrow,
        customerDisclosure: "The product logo is shown with customer permission; the legal customer name and location remain confidential.",
        deliveryScope: "15 days from final design approval to shipment for this project only."
      }
    },
    images: imagePaths.map((src, index) => ({
      id: ["custom-dumbbells", "pink-weight-plate", "orange-weight-plate", "blue-weight-plate", "storage-rack-installation"][index],
      src,
      alt: copy.imageAlt[index] ?? rackPhotoCopy[copy.locale].alt,
      caption: copy.imageCaption[index] ?? rackPhotoCopy[copy.locale].caption,
      width: index === 0 ? 2048 : index === 4 ? 1600 : 1280,
      height: index === 0 ? 1152 : index === 4 ? 2134 : 1890
    })),
    internalLinks: makeLinks(copy),
    canonicalData: { mode: "self" },
    hreflangData: { include: true },
    updatedAt: publishedAt,
    publishedAt,
    version: 1
  };
}

export const customLogoFitnessChainCase: ContentEntity = {
  id: contentId,
  type: "case",
  defaultLocale: "en",
  versions: Object.fromEntries(copies.map((copy) => [copy.locale, makeVersion(copy)]))
};

const projectIndexCopy: Record<CaseLocale, { heading: string; label: string; summary: string }> = {
  en: { heading: "Real customer customization case", label: "View the 15-day custom dumbbell and weight plate project", summary: "Custom logo dumbbells, weight plates and matching racks for a fitness training chain." },
  "pt-BR": { heading: "Caso real de personalização", label: "Ver o projeto de halteres e anilhas entregue em 15 dias", summary: "Halteres com logo, anilhas e racks coordenados para uma rede de treinamento." },
  es: { heading: "Caso real de personalización", label: "Ver el proyecto de mancuernas y discos expedido en 15 días", summary: "Mancuernas con logo, discos y racks coordinados para una cadena de entrenamiento." },
  de: { heading: "Reales Kundenprojekt", label: "15-Tage-Projekt mit Kurzhanteln und Hantelscheiben ansehen", summary: "Kurzhanteln mit Logo, Scheiben und passende Ablagen für eine Fitnesskette." },
  fr: { heading: "Cas client réel", label: "Voir le projet d'haltères et disques expédié en 15 jours", summary: "Haltères avec logo, disques et racks coordonnés pour un réseau de training." },
  vi: { heading: "Dự án khách hàng thực tế", label: "Xem dự án tạ tay và bánh tạ xuất trong 15 ngày", summary: "Tạ tay in logo, bánh tạ và giá đỡ đồng bộ cho chuỗi trung tâm thể lực." },
  sv: { heading: "Verkligt kundprojekt", label: "Se projektet med hantlar och viktskivor levererat på 15 dagar", summary: "Logotyphantlar, viktskivor och matchande ställ för en träningskedja." },
  it: { heading: "Caso cliente reale", label: "Vedi il progetto di manubri e dischi spedito in 15 giorni", summary: "Manubri con logo, dischi e rack coordinati per una catena fitness." },
  nl: { heading: "Echt klantproject", label: "Bekijk het project met halters en schijven, verzonden in 15 dagen", summary: "Halters met logo, gewichtsschijven en bijpassende rekken voor een fitnessketen." },
  ar: { heading: "مشروع عميل حقيقي", label: "شاهد مشروع الدمبل والأقراص الذي شُحن خلال 15 يوماً", summary: "دمبل بشعار خاص وأقراص ورفوف متناسقة لسلسلة تدريب." },
  ko: { heading: "실제 고객 맞춤 사례", label: "15일 만에 출고한 맞춤 덤벨·원판 프로젝트 보기", summary: "피트니스 체인을 위한 로고 덤벨, 원판, 맞춤 보관 랙입니다." },
  id: { heading: "Proyek pelanggan nyata", label: "Lihat proyek dumbbell dan piring beban yang dikirim dalam 15 hari", summary: "Dumbbell berlogo, piring beban, dan rak serasi untuk jaringan pusat latihan." },
  pl: { heading: "Rzeczywisty projekt klienta", label: "Zobacz projekt hantli i obciążeń wysłany w 15 dni", summary: "Hantle z logo, obciążenia i dopasowane stojaki dla sieci treningowej." }
};

export function withCustomLogoFitnessChainCase(manifest: ContentManifest): ContentManifest {
  const entities = manifest.entities.map((entity) => {
    if (entity.id !== "projects") return entity;
    const versions = Object.fromEntries(Object.entries(entity.versions).map(([locale, version]) => {
      if (!version) return [locale, version];
      const caseVersion = customLogoFitnessChainCase.versions[locale as CaseLocale];
      const teaser = projectIndexCopy[locale as CaseLocale];
      if (!caseVersion || !teaser) return [locale, version];
      return [locale, {
        ...version,
        body: [...version.body, {
          id: "real-custom-logo-fitness-chain-case",
          type: "rich_text" as const,
          heading: teaser.heading,
          data: { markdown: `[${teaser.label}](${caseVersion.publicPath})\n\n${teaser.summary}` }
        }],
        internalLinks: [...version.internalLinks, { targetContentId: contentId, label: teaser.label }]
      }];
    })) as typeof entity.versions;
    return { ...entity, versions };
  });
  return { ...manifest, entities: [...entities, customLogoFitnessChainCase] };
}
