import type {
  ContentBlock,
  ContentEntity,
  ContentManifest,
  LocalizedAuthor,
  LocalizedContentVersion,
  LocalizedImage
} from "../../lib/content/types";
import { germanImagePath } from "./de-content-helpers";

type GrowthLocale = "en" | "es" | "pt-BR" | "de";

type Profile = {
  id: string;
  locale: GrowthLocale;
  path: string;
  title: string;
  description: string;
  h1: string;
  keyword: string;
  intent: string;
  subject: string;
  direct: string;
  definition: string;
  points: string[];
  comparison: string[][];
  checklist: string[];
  faq: Array<[string, string]>;
  links: Array<[string, string]>;
  images: Array<[string, number, number, string]>;
};

const publishedAt = "2026-08-19T08:00:00.000Z";

const authors: Record<GrowthLocale, [LocalizedAuthor, LocalizedAuthor]> = {
  en: [
    { id: "powerbasefit-technical-team", name: "PowerBaseFit Technical Team", kind: "Organization", role: "Free weight equipment manufacturing" },
    { id: "powerbasefit-quality-team", name: "PowerBaseFit Quality Team", kind: "Organization", role: "Product and quality review" }
  ],
  es: [
    { id: "powerbasefit-export-team-es", name: "Equipo de Exportación de PowerBaseFit", kind: "Organization", role: "Contenido para compradores internacionales" },
    { id: "powerbasefit-production-team-es", name: "Equipo de Producción y Calidad de PowerBaseFit", kind: "Organization", role: "Revisión técnica y de fabricación" }
  ],
  "pt-BR": [
    { id: "powerbasefit-export-team-pt", name: "Equipe de Exportação da PowerBaseFit", kind: "Organization", role: "Conteúdo para compradores profissionais" },
    { id: "powerbasefit-quality-team-pt", name: "Equipe de Produção e Qualidade da PowerBaseFit", kind: "Organization", role: "Revisão técnica e de fabricação" }
  ],
  de: [
    { id: "powerbasefit-export-team-de", name: "PowerBaseFit Exportteam", kind: "Organization", role: "Fachinhalte für gewerbliche Einkäufer" },
    { id: "powerbasefit-quality-team-de", name: "PowerBaseFit Produktions- und Qualitätsteam", kind: "Organization", role: "Technische Prüfung" }
  ]
};

const localeText = {
  en: {
    quick: "Quick answer", definition: "Definition", overview: "Application and buyer context", compare: "Comparison table",
    choose: "How to make the selection", operate: "Commercial use and maintenance", quality: "Quality control and purchasing evidence",
    record: "Turn the decision into a purchase record", checklist: "Buyer checklist", faq: "Frequently asked questions",
    columns: ["Option or factor", "Best fit", "Verify before ordering"], home: "Home", blog: "Resources",
    target: "Gym operators, distributors, importers and private-label buyers",
    ctaTitle: "Discuss your product requirement", ctaText: "Send the intended use, weight range, quantities, branding needs and destination for a model-specific review.", ctaLabel: "Request details"
  },
  es: {
    quick: "Respuesta rápida", definition: "Definición", overview: "Aplicación y contexto de compra", compare: "Tabla comparativa",
    choose: "Cómo tomar la decisión", operate: "Uso profesional y mantenimiento", quality: "Control de calidad y evidencias de compra",
    record: "Convertir la decisión en una especificación", checklist: "Checklist del comprador", faq: "Preguntas frecuentes",
    columns: ["Opción o factor", "Aplicación adecuada", "Qué verificar"], home: "Inicio", blog: "Blog",
    target: "Gimnasios, distribuidores, importadores y marcas privadas",
    ctaTitle: "Defina su proyecto de producto", ctaText: "Envíe uso, rango de peso, cantidades, personalización y destino para revisar una configuración concreta.", ctaLabel: "Solicitar información"
  },
  "pt-BR": {
    quick: "Resposta rápida", definition: "Definição", overview: "Aplicação e contexto de compra", compare: "Tabela comparativa",
    choose: "Como tomar a decisão", operate: "Uso profissional e manutenção", quality: "Controle de qualidade e evidências de compra",
    record: "Transforme a decisão em uma especificação", checklist: "Checklist do comprador", faq: "Perguntas frequentes",
    columns: ["Opção ou fator", "Aplicação adequada", "O que conferir"], home: "Início", blog: "Blog",
    target: "Academias, distribuidores, importadores e marcas próprias",
    ctaTitle: "Defina seu projeto de produto", ctaText: "Envie aplicação, faixa de pesos, quantidades, personalização e destino para avaliar uma configuração específica.", ctaLabel: "Solicitar informações"
  },
  de: {
    quick: "Direkte Antwort", definition: "Definition", overview: "Einsatz und Beschaffungskontext", compare: "Vergleichstabelle",
    choose: "So treffen Sie die Auswahl", operate: "Gewerblicher Einsatz und Pflege", quality: "Qualitätskontrolle und Beschaffungsnachweise",
    record: "Die Entscheidung in eine Spezifikation überführen", checklist: "Checkliste für Einkäufer", faq: "Häufige Fragen",
    columns: ["Option oder Faktor", "Geeigneter Einsatz", "Vor Bestellung prüfen"], home: "Startseite", blog: "Ratgeber",
    target: "Fitnessstudiobetreiber, Händler, Importeure und Eigenmarken",
    ctaTitle: "Produktanforderung abstimmen", ctaText: "Senden Sie Einsatz, Gewichtsbereich, Mengen, Individualisierung und Zielort für eine konkrete Produktprüfung.", ctaLabel: "Details anfragen"
  }
} as const;

function rich(id: string, heading: string, paragraphs: string[]): ContentBlock {
  return { id, type: "rich_text", heading, content: paragraphs.join("\n\n") };
}

function guidance(locale: GrowthLocale, subject: string, point: string, index: number): string {
  const variants = {
    en: [
      `A useful review of ${point} begins with the actual operating conditions for ${subject}. Record who will use the product, how frequently it will be handled, where it will be stored and which result matters to the buyer. Ask for product-specific evidence rather than relying on a category name. Dimensions, materials, finish, markings, packaging and inspection criteria should refer to the same model and revision. If one detail remains open, show it as an assumption in the comparison instead of allowing each supplier to interpret it differently. This makes price, sample and delivery discussions easier to compare and gives the receiving team a clear reference.`,
      `Treat ${point} as an operating decision, not a promotional claim about ${subject}. Compare the same weight, configuration and intended use, then note what can be checked on a sample and what must be controlled during production. The responsible buyer should identify the evidence required, the person who approves it and the point at which approval is needed. A photograph can confirm appearance, but measurable features need a stated method and result. Keeping these items together prevents late changes from being hidden inside an updated quotation or informal message.`,
      `For ${subject}, ${point} should be connected to users, space, cleaning routines, replenishment and the expected product position. Separate essential requirements from preferences and from details that are still unknown. Essential items become acceptance criteria; preferences can be evaluated against cost; unknowns receive an owner and deadline. This approach avoids choosing a product because one visible feature looks attractive while construction, compatibility, handling or packaging remains unclear. It also creates a practical record for a repeat order or a later addition to the same range.`,
      `Evaluate ${point} across the full route from sample to daily use of ${subject}. Confirm the proposed specification, approve a representative sample where appropriate, define production checks, protect the relevant surfaces in packing and inspect the delivered batch against the approved record. The depth of control should match the commercial risk, quantity and degree of customization. No single checklist replaces product knowledge, but a consistent sequence exposes differences early and makes corrective action easier to agree before goods are shipped.`
    ],
    es: [
      `Un análisis útil de ${point} comienza con las condiciones reales de uso de ${subject}. Registre quién utilizará el producto, con qué frecuencia se manipulará, dónde se guardará y qué resultado necesita el comprador. Solicite evidencias del modelo concreto en lugar de confiar en el nombre de una categoría. Medidas, materiales, acabado, marcación, embalaje y criterios de inspección deben corresponder a la misma versión. Si un dato sigue abierto, trátelo como supuesto visible y no permita interpretaciones distintas entre proveedores. Así se comparan mejor precio, muestra y entrega, y el equipo de recepción dispone de una referencia clara.`,
      `Considere ${point} como una decisión operativa sobre ${subject}, no como una afirmación promocional. Compare el mismo peso, configuración y aplicación; después separe lo que puede verificarse en una muestra de lo que debe controlarse durante la producción. El comprador responsable define evidencia, persona que aprueba y momento de aprobación. Una fotografía ayuda con la apariencia, pero una característica medible necesita método y resultado. Mantener estos datos en un registro evita que cambios tardíos queden ocultos dentro de una cotización actualizada o de mensajes informales.`,
      `Para ${subject}, ${point} debe relacionarse con usuarios, espacio, limpieza, reposición y posicionamiento del producto. Separe requisitos obligatorios, preferencias y datos desconocidos. Los obligatorios se convierten en criterios de aceptación; las preferencias se valoran frente al coste; los datos abiertos reciben responsable y fecha. Este método evita elegir solo por una característica visible mientras construcción, compatibilidad, manipulación o embalaje siguen sin definirse. También crea una base práctica para reponer la misma línea sin perder coherencia entre lotes.`,
      `Evalúe ${point} desde la muestra hasta el uso diario de ${subject}. Confirme la especificación, apruebe una muestra representativa cuando corresponda, establezca controles de producción, proteja las superficies relevantes en el embalaje y revise el lote recibido contra el registro aprobado. La profundidad del control depende del riesgo, la cantidad y la personalización. Ninguna lista sustituye el conocimiento del producto, pero una secuencia consistente hace visibles las diferencias y facilita acordar correcciones antes del envío.`
    ],
    "pt-BR": [
      `Uma análise útil de ${point} começa pelas condições reais de uso de ${subject}. Registre quem vai utilizar o produto, com que frequência ele será manuseado, onde ficará guardado e qual resultado importa para o comprador. Solicite evidências do modelo específico em vez de confiar apenas no nome da categoria. Medidas, materiais, acabamento, marcação, embalagem e critérios de inspeção devem apontar para a mesma versão. Se algum dado continuar aberto, trate-o como hipótese visível e não permita interpretações diferentes entre fornecedores. Isso torna preço, amostra e entrega comparáveis e fornece uma referência clara no recebimento.`,
      `Trate ${point} como uma decisão operacional sobre ${subject}, não como uma afirmação promocional. Compare o mesmo peso, configuração e aplicação e separe o que pode ser verificado na amostra do que precisa ser controlado durante a produção. O comprador define a evidência, a pessoa responsável e o momento da aprovação. Uma fotografia ajuda a conferir aparência, mas uma característica mensurável exige método e resultado. Manter essas informações no mesmo registro evita que alterações tardias fiquem escondidas em uma cotação atualizada ou em mensagens informais.`,
      `Para ${subject}, ${point} precisa ser relacionado a usuários, espaço, limpeza, reposição e posicionamento do produto. Separe requisitos obrigatórios, preferências e dados ainda desconhecidos. Os itens obrigatórios viram critérios de aceitação; as preferências são comparadas com o custo; as dúvidas recebem responsável e prazo. Esse método evita escolher somente por uma característica visível enquanto construção, compatibilidade, manuseio ou embalagem continuam indefinidos. Ele também cria uma base prática para recomprar a mesma linha sem perder consistência entre lotes.`,
      `Avalie ${point} desde a amostra até o uso diário de ${subject}. Confirme a especificação, aprove uma amostra representativa quando necessário, estabeleça controles de produção, proteja as superfícies relevantes na embalagem e compare o lote recebido com o registro aprovado. A profundidade do controle depende do risco comercial, da quantidade e da personalização. Nenhuma lista substitui o conhecimento do produto, mas uma sequência consistente revela diferenças cedo e facilita combinar correções antes do embarque.`
    ],
    de: [
      `Eine belastbare Bewertung von ${point} beginnt mit den realen Betriebsbedingungen für ${subject}. Halten Sie fest, wer das Produkt nutzt, wie häufig es bewegt wird, wo es aufbewahrt wird und welches Ergebnis für den Käufer entscheidend ist. Fordern Sie modellbezogene Nachweise an, statt sich auf eine allgemeine Produktbezeichnung zu verlassen. Maße, Material, Oberfläche, Kennzeichnung, Verpackung und Prüfkriterien müssen dieselbe Ausführung und Version beschreiben. Bleibt ein Detail offen, wird es im Vergleich als Annahme markiert und nicht von jedem Anbieter anders ausgelegt. Dadurch werden Preis, Muster und Lieferung vergleichbar, während der Wareneingang eine eindeutige Referenz erhält.`,
      `Behandeln Sie ${point} als betriebliche Entscheidung zu ${subject} und nicht als Werbeaussage. Vergleichen Sie dasselbe Gewicht, dieselbe Konfiguration und denselben Einsatzzweck. Trennen Sie anschließend Merkmale, die am Muster geprüft werden können, von Punkten, die während der Serie kontrolliert werden müssen. Der Einkäufer bestimmt erforderlichen Nachweis, verantwortliche Person und Freigabezeitpunkt. Ein Foto kann die Optik dokumentieren, messbare Eigenschaften brauchen jedoch Methode und Ergebnis. Ein gemeinsamer Versionsstand verhindert, dass späte Änderungen unbemerkt in einem neuen Angebot oder einer informellen Nachricht verschwinden.`,
      `Bei ${subject} muss ${point} mit Nutzergruppe, Fläche, Reinigung, Nachbestellung und gewünschter Marktposition verbunden werden. Trennen Sie Muss-Kriterien, Wünsche und offene Angaben. Muss-Kriterien werden zu Abnahmeregeln, Wünsche werden gegen Mehrkosten bewertet und offene Angaben erhalten Verantwortlichen sowie Termin. So wird ein Produkt nicht nur wegen eines sichtbaren Merkmals gewählt, während Konstruktion, Kompatibilität, Handhabung oder Verpackung ungeklärt bleiben. Gleichzeitig entsteht eine brauchbare Grundlage, um dieselbe Produktlinie später konsistent zu ergänzen oder nachzubestellen.`,
      `Bewerten Sie ${point} entlang des gesamten Weges vom Muster bis zum täglichen Einsatz von ${subject}. Bestätigen Sie die Spezifikation, genehmigen Sie bei Bedarf ein repräsentatives Muster, definieren Sie Serienprüfungen, schützen Sie relevante Flächen in der Verpackung und prüfen Sie die Lieferung gegen den freigegebenen Stand. Die Prüftiefe richtet sich nach Risiko, Menge und Individualisierung. Keine Checkliste ersetzt Produktkenntnis; ein konsequenter Ablauf zeigt Unterschiede jedoch früh und erleichtert Korrekturmaßnahmen, bevor die Ware versendet wird.`
    ]
  } as const;
  return variants[locale][index % 4];
}

function checklistNarrative(locale: GrowthLocale, subject: string, items: string[]): string[] {
  const groups = [items.slice(0, 4), items.slice(4, 8), items.slice(8, 12)];
  if (locale === "en") return groups.map((group, index) => `Checklist stage ${index + 1} for ${subject}: ${group.join("; ")}. Put each item in the inquiry or approval record with a value, reference or named open question. Confirm which party supplies the information and when it must be approved. If a proposed change affects another item, issue a new version rather than overwriting the previous decision. At final review, unresolved points must be accepted deliberately, corrected or removed from the order scope.`);
  if (locale === "es") return groups.map((group, index) => `Etapa ${index + 1} del checklist para ${subject}: ${group.join("; ")}. Incluya cada punto en la solicitud o aprobación con un valor, una referencia o una pregunta abierta identificada. Confirme quién aporta la información y cuándo debe aprobarse. Si un cambio afecta otro punto, cree una versión nueva en lugar de sobrescribir la decisión anterior. En la revisión final, cada asunto pendiente debe aceptarse de forma consciente, corregirse o eliminarse del alcance del pedido.`);
  if (locale === "pt-BR") return groups.map((group, index) => `Etapa ${index + 1} do checklist para ${subject}: ${group.join("; ")}. Coloque cada item na solicitação ou aprovação com um valor, referência ou pergunta aberta identificada. Confirme quem fornece a informação e quando ela precisa ser aprovada. Se uma alteração afetar outro ponto, emita uma nova versão em vez de sobrescrever a decisão anterior. Na revisão final, cada pendência deve ser aceita conscientemente, corrigida ou retirada do escopo do pedido.`);
  return groups.map((group, index) => `Checklistenstufe ${index + 1} für ${subject}: ${group.join("; ")}. Überführen Sie jeden Punkt mit Sollwert, Referenz oder klar benannter offener Frage in Anfrage und Freigabe. Legen Sie fest, wer die Information liefert und wann sie bestätigt sein muss. Beeinflusst eine Änderung einen anderen Punkt, wird eine neue Version ausgegeben, statt die frühere Entscheidung zu überschreiben. Bei der Abschlussprüfung muss jeder offene Punkt bewusst akzeptiert, korrigiert oder aus dem Bestellumfang entfernt werden.`);
}

function bodyFor(profile: Profile): ContentBlock[] {
  const text = localeText[profile.locale];
  const paragraphs = profile.points.map((point, index) => guidance(profile.locale, profile.subject, point, index));
  return [
    { id: "quick-answer", type: "custom", heading: text.quick, content: profile.direct, data: { component: "quick-answer" } },
    { id: "definition", type: "custom", heading: text.definition, content: profile.definition, data: { component: "definition", term: profile.subject } },
    rich("buyer-context", text.overview, paragraphs.slice(0, 3)),
    { id: "comparison", type: "specifications", heading: text.compare, data: { columns: text.columns, rows: profile.comparison } },
    rich("selection-method", text.choose, paragraphs.slice(3, 6)),
    rich("commercial-operation", text.operate, paragraphs.slice(6, 9)),
    rich("quality-evidence", text.quality, paragraphs.slice(9, 12)),
    rich("operational-review", text.record, [
      guidance(profile.locale, profile.subject, profile.points[0], 1),
      guidance(profile.locale, profile.subject, profile.points[5], 2),
      guidance(profile.locale, profile.subject, profile.points[10], 3),
      guidance(profile.locale, profile.subject, profile.points[11], 0)
    ]),
    rich("purchase-record", text.record, checklistNarrative(profile.locale, profile.subject, profile.checklist)),
    { id: "buyer-checklist", type: "features", heading: text.checklist, data: { items: profile.checklist } }
  ];
}

function imageData(profile: Profile): LocalizedImage[] {
  return profile.images.map(([src, width, height, description], index) => ({
    id: `${profile.id}-${profile.locale}-image-${index + 1}`,
    src: profile.locale === "de" ? germanImagePath(src, profile.path.split("/").at(-1) ?? profile.id, index) : src,
    width, height,
    alt: description,
    caption: description
  }));
}

function versionFor(profile: Profile): LocalizedContentVersion {
  const text = localeText[profile.locale];
  const [author, reviewer] = authors[profile.locale];
  const blogRoot = profile.locale === "en" ? "/resources" : profile.locale === "pt-BR" ? "/pt/blog" : `/${profile.locale}/blog`;
  return {
    locale: profile.locale,
    translationStatus: profile.locale === "en" ? "published" : "localized",
    reviewStatus: "approved",
    publishStatus: "published",
    slug: profile.path.split("/").filter(Boolean).at(-1) ?? profile.id,
    publicPath: profile.path,
    title: profile.title,
    description: profile.description,
    h1: profile.h1,
    body: bodyFor(profile),
    faq: profile.faq.map(([question, answer], index) => ({ id: `faq-${index + 1}`, question, answer })),
    author,
    reviewedBy: reviewer,
    schemaData: {
      category: profile.intent,
      breadcrumbs: [
        { name: text.home, path: profile.locale === "en" ? "/" : profile.locale === "pt-BR" ? "/pt" : `/${profile.locale}` },
        { name: text.blog, path: blogRoot },
        { name: profile.h1, path: profile.path }
      ],
      extra: {
        primaryKeyword: profile.keyword,
        searchIntent: profile.intent,
        targetBuyer: text.target,
        ctaTitle: text.ctaTitle,
        ctaText: text.ctaText,
        ctaLabel: text.ctaLabel,
        contactPath: profile.locale === "en" ? "/contact" : profile.locale === "pt-BR" ? "/pt/contato" : profile.locale === "es" ? "/es/contacto" : "/de/kontakt"
      }
    },
    images: imageData(profile),
    internalLinks: profile.links.map(([targetContentId, label]) => ({ targetContentId, label })),
    canonicalData: { mode: "self" },
    hreflangData: { include: true },
    updatedAt: publishedAt,
    publishedAt,
    version: 1
  };
}

const imageSets = {
  materials: [
    ["/assets/products/dumbbells/catalog-v2/pu-dumbbell-kg.webp", 920, 680],
    ["/assets/products/dumbbells/catalog-v2/tpu-round-dumbbell-kg.webp", 920, 680],
    ["/assets/products/dumbbells/classic-rubber-round/classic-rubber-round-dumbbell-main.avif", 900, 671]
  ],
  shapes: [
    ["/assets/hex-dumbbells.avif", 932, 742],
    ["/assets/products/dumbbells/classic-rubber-round/classic-rubber-round-dumbbell-main.avif", 900, 671],
    ["/assets/project-dumbbell-zone.avif", 1400, 788]
  ],
  maintenance: [
    ["/assets/resources/dumbbell-weight-qc-hero.webp", 4100, 1000],
    ["/assets/resources/dumbbell-weight-qc-guide.webp", 1800, 1200],
    ["/assets/factory-process/detail-polishing-video.webp", 1440, 900]
  ],
  kettlebells: [
    ["/assets/products/gym-accessories/cast-iron-kettlebell.avif", 698, 520],
    ["/assets/products/gym-accessories/competition-kettlebell.avif", 698, 520],
    ["/assets/products/gym-accessories/vinyl-kettlebell.avif", 698, 520]
  ],
  area: [
    ["/assets/project-dumbbell-zone.avif", 1400, 788],
    ["/assets/projects/commercial-dumbbell-rack-zone.avif", 820, 1094],
    ["/assets/resources/dumbbell-weight-qc-guide.webp", 1800, 1200]
  ]
} as const;

function images(key: keyof typeof imageSets, descriptions: [string, string, string]): Profile["images"] {
  return imageSets[key].map((item, index) => [item[0], item[1], item[2], descriptions[index]] as [string, number, number, string]);
}

const commonLinks = {
  en: [["dumbbells-category", "Commercial dumbbells"], ["factory", "Manufacturing and quality"], ["projects", "Project references"], ["contact", "Discuss a requirement"]],
  es: [["dumbbells-category", "Mancuernas profesionales"], ["factory", "Fabricación y calidad"], ["projects", "Referencias de proyectos"], ["contact", "Consultar un proyecto"]],
  "pt-BR": [["dumbbells-category", "Halteres profissionais"], ["factory", "Produção e qualidade"], ["projects", "Referências de projetos"], ["contact", "Consultar um projeto"]],
  de: [["dumbbells-category", "Gewerbliche Kurzhanteln"], ["factory", "Fertigung und Qualität"], ["projects", "Projektreferenzen"], ["contact", "Anforderung besprechen"]]
} satisfies Record<GrowthLocale, Array<[string, string]>>;

const profiles: Profile[] = [
  {
    id: "materials-guide", locale: "en", path: "/resources/rubber-vs-urethane-dumbbells-commercial-gyms",
    title: "Rubber vs Urethane Dumbbells for Commercial Gyms", description: "Compare rubber, PU and TPU dumbbells by finish, odor, cleaning, wear, branding, commercial use, quality checks and total purchasing value.", h1: "Rubber vs Urethane Dumbbells for Commercial Gyms", keyword: "rubber vs urethane dumbbells", intent: "Commercial material comparison", subject: "commercial dumbbell materials",
    direct: "Rubber dumbbells often suit value-focused commercial ranges, while polyurethane is commonly selected when buyers prioritize surface stability, color control and a premium presentation. TPU provides another molded finish option with its own feel and price position. The material name alone does not establish quality: compare construction, bonding, surface, odor, markings, sample evidence, cleaning method, packaging and replacement planning for the exact model.",
    definition: "A dumbbell material comparison evaluates the external head material and the complete construction around it. Rubber, polyurethane and thermoplastic polyurethane affect touch, appearance, odor, abrasion behavior and customization, but the core, handle, connection, molding control and packaging also determine the delivered product.",
    points: ["material grade and the construction beneath the outer surface", "initial odor, ventilation and expectations at opening", "abrasion, impact marks and contact with flooring", "color, gloss, molded lettering and logo method", "cleaning products, dwell time and drying routine", "weight range, head dimensions and visual consistency", "daily traffic in commercial gyms and training studios", "storage contact points and prevention of surface transfer", "replacement of popular weights without visible batch mismatch", "sample review under the buyer's actual lighting", "bonding, handle connection, weight and cosmetic inspection", "carton protection, pallet loading and shipment temperature"],
    comparison: [["Rubber", "Value-oriented commercial sets and broad ranges", "Compound, odor, bonding, markings and surface"], ["PU", "Premium presentation and frequent handling", "Formulation, finish, color reference and adhesion"], ["TPU", "Defined product lines requiring a molded thermoplastic skin", "Surface feel, seam, color, marking and sample"], ["Material name", "Initial shortlist only", "Complete construction and measurable specification"]],
    checklist: ["Intended facility and user volume", "Exact model and construction", "Material declaration", "Weight range and increments", "Surface and color reference", "Logo and markings", "Odor and unpacking plan", "Cleaning compatibility", "Weight and dimensional checks", "Sample approval", "Export packing", "Reorder reference"],
    faq: [["Are urethane dumbbells always better than rubber dumbbells?", "No. Urethane can support a premium finish, but construction, formulation, use and budget determine suitability."], ["Why can new rubber dumbbells have an odor?", "Rubber compounds and enclosed packing can retain odor. Confirm the material, unpacking method and ventilation before installation."], ["Does TPU mean the same thing as PU?", "No. They are different material families and should be evaluated on the exact product rather than treated as interchangeable labels."], ["Which surface is easiest to clean?", "A smooth, well-finished surface is generally easier to wipe, but the approved cleaner and drying method must suit the material."], ["Can color be matched across repeat orders?", "A retained reference, color definition and change record improve consistency, although controlled tolerances still need agreement."], ["Should buyers approve more than one weight?", "Yes when head size, markings or molding behavior changes materially across the range."], ["What belongs in the quotation request?", "Include model, range, quantities, material, finish, logo, packing, destination and required inspection evidence."]],
    links: [...commonLinks.en, ["hex-vs-round-guide", "Compare hex and round dumbbells"], ["commercial-dumbbell-maintenance-guide", "Dumbbell care and replacement"]],
    images: images("materials", ["PU commercial dumbbell with molded head and steel handle", "TPU round dumbbell for a commercial product range", "Rubber round dumbbell showing the complete head and handle construction"])
  },
  {
    id: "materials-guide", locale: "de", path: "/de/blog/gummi-pu-tpu-kurzhanteln-vergleich",
    title: "Gummi-, PU- oder TPU-Kurzhanteln im Vergleich", description: "Gummi, PU und TPU bei Kurzhanteln nach Oberfläche, Geruch, Pflege, Verschleiß, Kennzeichnung, Qualitätsprüfung und gewerblichem Einsatz vergleichen.", h1: "Gummi-, PU- und TPU-Kurzhanteln für Fitnessstudios", keyword: "Gummi oder Urethan Kurzhanteln", intent: "Materialvergleich für gewerbliche Beschaffung", subject: "Materialien gewerblicher Kurzhanteln",
    direct: "Gummi eignet sich häufig für preisbewusste gewerbliche Sortimente. Polyurethan wird oft gewählt, wenn eine gleichmäßige Oberfläche, kontrollierte Farben und eine hochwertige Präsentation wichtig sind. TPU bildet eine weitere Produktposition. Der Materialname allein beweist keine Qualität; Konstruktion, Verbindung, Oberfläche, Geruch, Kennzeichnung, Muster, Reinigung, Verpackung und Nachbestellung müssen für das konkrete Modell geprüft werden.",
    definition: "Der Materialvergleich betrachtet die äußere Kopfbeschichtung und die vollständige Konstruktion. Gummi, Polyurethan und thermoplastisches Polyurethan beeinflussen Haptik, Optik, Geruch, Abrieb und Individualisierung. Kern, Griff, Verbindung, Verarbeitung und Verpackung bestimmen jedoch ebenfalls die gelieferte Qualität.",
    points: ["Materialqualität und Konstruktion unter der Außenhaut", "Anfangsgeruch, Auspacken und Belüftung", "Abrieb, Stoßspuren und Kontakt zum Boden", "Farbe, Glanz, Gewichtsangabe und Logo", "geeigneten Reinigern und vollständiger Trocknung", "Gewichtsbereich, Kopfdimensionen und einheitlicher Optik", "täglicher Nutzung in Studios und Trainingsräumen", "Kontaktflächen bei der Aufbewahrung", "Ergänzung beliebter Gewichte aus späteren Chargen", "Musterprüfung unter realer Beleuchtung", "Verbindung, Istgewicht, Maße und Oberfläche", "Schutz im Karton und temperaturabhängiger Transportbelastung"],
    comparison: [["Gummi", "Preisbewusste Studios und breite Sortimente", "Mischung, Geruch, Verbindung und Oberfläche"], ["PU", "Hochwertige Präsentation und intensive Nutzung", "Rezeptur, Finish, Farbe und Haftung"], ["TPU", "Definierte Produktlinien mit thermoplastischer Außenhaut", "Haptik, Naht, Farbe und Muster"], ["Materialbezeichnung", "Erste Vorauswahl", "Vollständige Konstruktion und Spezifikation"]],
    checklist: ["Studio und Nutzerfrequenz", "Modell und Konstruktion", "Materialangabe", "Gewichtsbereich", "Oberflächenreferenz", "Logo und Markierung", "Auspack- und Lüftungsplan", "Reinigungsverträglichkeit", "Gewichts- und Maßprüfung", "Musterfreigabe", "Exportverpackung", "Nachbestellreferenz"],
    faq: [["Sind PU-Kurzhanteln immer besser als Gummihanteln?", "Nein. PU kann eine hochwertige Oberfläche unterstützen, doch Konstruktion, Rezeptur, Einsatz und Budget entscheiden."], ["Warum riechen neue Gummihanteln?", "Mischung und geschlossene Verpackung können Geruch halten. Material, Auspacken und Belüftung sollten vor Einbringung geklärt werden."], ["Sind TPU und PU dasselbe?", "Nein. Es sind unterschiedliche Materialfamilien, die am konkreten Produkt bewertet werden müssen."], ["Welche Oberfläche lässt sich leichter reinigen?", "Eine glatte, sauber verarbeitete Oberfläche ist meist leichter zu wischen; Reiniger und Trocknung müssen zum Material passen."], ["Wie bleibt die Farbe bei Nachbestellungen stabil?", "Referenzmuster, Farbdefinition und Änderungsprotokoll verbessern die Vergleichbarkeit."], ["Sollten mehrere Gewichte bemustert werden?", "Ja, wenn Kopfgröße, Kennzeichnung oder Verarbeitung über den Bereich deutlich wechseln."], ["Welche Angaben gehören in die Anfrage?", "Modell, Bereich, Mengen, Material, Finish, Logo, Verpackung, Zielort und gewünschte Prüfnachweise."]],
    links: [...commonLinks.de, ["hex-vs-round-guide", "Hex- und Rundhanteln vergleichen"], ["commercial-dumbbell-maintenance-guide", "Pflege und Austausch"]],
    images: images("materials", ["PU-Kurzhantel mit geformtem Kopf und Stahlgriff", "Runde TPU-Kurzhantel für ein gewerbliches Sortiment", "Runde Gummihantel mit sichtbarer Kopf- und Griffkonstruktion"])
  },
  {
    id: "hex-vs-round-guide", locale: "en", path: "/resources/hex-vs-round-dumbbells-commercial-gyms",
    title: "Hex vs Round Dumbbells for Commercial Gyms", description: "Compare hex and round dumbbells by floor stability, exercises, weight range, storage, space, maintenance and commercial buying criteria.", h1: "Hex vs Round Dumbbells for Commercial Gyms", keyword: "hex vs round dumbbells", intent: "Commercial dumbbell shape comparison", subject: "hex and round dumbbell selection",
    direct: "Hex dumbbells reduce rolling and can be practical for floor-based movements, circuits and smaller training spaces. Round dumbbells support a continuous traditional presentation and can be offered in broad or heavy ranges when paired with suitable storage. Neither shape is automatically more commercial. Compare construction, head dimensions, handle, range, popular-weight duplication, floor use, storage footprint, cleaning and replenishment.",
    definition: "Dumbbell head shape is the outside geometry of the weighted ends. Hexagonal heads provide flat faces, while round heads use a circular profile. Shape affects movement on the floor, storage contact, visual organization and some exercises; it does not by itself determine material quality, connection strength or weight accuracy.",
    points: ["floor stability during circuits and supported exercises", "rolling control when users set weights down", "head dimensions at light, medium and heavy weights", "available weight range and progression steps", "duplicate pairs at the facility's busiest loads", "handle diameter, knurling and usable grip length", "storage footprint and clear weight identification", "cleaning around faces, seams and contact points", "member behavior in gyms, studios and hotel facilities", "sample review across light and heavy variants", "weight, connection and surface inspection", "replenishment without mixing incompatible dimensions"],
    comparison: [["Hex head", "Floor work, circuits and reduced rolling", "Face geometry, material, handle and range"], ["Round head", "Traditional strength areas and continuous sets", "Storage, head diameter, range and identification"], ["Mixed facility", "Separate zones or clearly organized lines", "Visual system and compatible storage"], ["Shape alone", "Initial use-case filter", "Construction, weight, finish and batch control"]],
    checklist: ["Target users", "Exercise mix", "Floor behavior", "Weight range", "Increment plan", "Duplicate popular pairs", "Head dimensions", "Handle specification", "Storage footprint", "Cleaning routine", "Sample weights", "Reorder plan"],
    faq: [["Are hex dumbbells safer than round dumbbells?", "Flat faces reduce rolling, but safe use still depends on flooring, user behavior, spacing and maintenance."], ["Which shape is better for floor exercises?", "Hex heads are often more stable when a dumbbell supports the body, subject to the specific model and exercise."], ["Do round dumbbells need dedicated storage?", "They need a stable system that prevents rolling and keeps weights identifiable."], ["Which shape supports heavier sets?", "That depends on the product line. Confirm the offered range and actual dimensions rather than assuming from shape."], ["Can a gym use both shapes?", "Yes, particularly in distinct zones or programs with clear organization."], ["Does shape determine durability?", "No. Material, core, handle connection, manufacturing control and use have greater influence."], ["What should a buyer measure?", "Check overall length, head dimensions, grip, actual weight, storage footprint and spacing for the planned run."]],
    links: [...commonLinks.en, ["materials-guide", "Compare dumbbell materials"], ["free-weight-area-guide", "Plan the free weight area"]],
    images: images("shapes", ["Hex dumbbells arranged for commercial strength training", "Round rubber dumbbell with circular heads and steel handle", "Commercial dumbbell area showing space and weight organization"])
  },
  {
    id: "hex-vs-round-guide", locale: "de", path: "/de/blog/hex-kurzhanteln-vs-rundhanteln",
    title: "Hex-Kurzhanteln oder Rundhanteln für Fitnessstudios", description: "Hex- und Rundhanteln nach Bodenstabilität, Übungen, Gewichtsbereich, Aufbewahrung, Platz, Pflege und gewerblichen Einkaufskriterien vergleichen.", h1: "Hex-Kurzhanteln und Rundhanteln im Vergleich", keyword: "Hex Kurzhanteln vs Rundhanteln", intent: "Formvergleich für Fitnessstudios", subject: "Auswahl zwischen Hex- und Rundhanteln",
    direct: "Hex-Kurzhanteln rollen durch ihre flachen Seiten weniger und eignen sich häufig für Bodenübungen, Zirkel und kleinere Trainingsflächen. Rundhanteln ermöglichen eine durchgängige klassische Präsentation und je nach Produktlinie breite oder schwere Gewichtsbereiche. Keine Form ist automatisch professioneller. Entscheidend sind Konstruktion, Kopfmaße, Griff, Abstufung, Mehrfachpaare, Fläche, Reinigung und Nachbestellung.",
    definition: "Die Kopfform bezeichnet die äußere Geometrie der beschwerten Enden. Hexagonale Köpfe besitzen flache Seiten, Rundhanteln ein kreisförmiges Profil. Die Form beeinflusst Bewegung am Boden, Kontakt bei der Aufbewahrung und optische Ordnung, bestimmt aber nicht allein Materialqualität, Verbindungsfestigkeit oder Gewichtsgenauigkeit.",
    points: ["Bodenstabilität bei Zirkel- und Stützübungen", "Rollverhalten beim kontrollierten Ablegen", "Kopfmaßen bei leichten und schweren Gewichten", "Gewichtsbereich und sinnvollen Abstufungen", "Mehrfachpaaren in stark genutzten Gewichtsstufen", "Griffdurchmesser, Rändelung und nutzbarer Länge", "Flächenbedarf und klarer Gewichtserkennung", "Reinigung von Flächen, Nähten und Kontaktpunkten", "Nutzerverhalten in Studios und Hotelanlagen", "Musterprüfung leichter und schwerer Varianten", "Istgewicht, Verbindung und Oberflächenkontrolle", "Nachbestellung ohne inkompatible Abmessungen"],
    comparison: [["Hex-Kopf", "Bodenübungen, Zirkel und weniger Rollen", "Geometrie, Material, Griff und Bereich"], ["Rundkopf", "Klassische Kraftbereiche und durchgängige Sets", "Aufbewahrung, Durchmesser und Identifikation"], ["Gemischter Betrieb", "Getrennte Zonen oder klar organisierte Linien", "Optisches System und Platz"], ["Form allein", "Erster Anwendungsfilter", "Konstruktion, Gewicht und Chargenkontrolle"]],
    checklist: ["Zielnutzer", "Übungsmix", "Bodenverhalten", "Gewichtsbereich", "Abstufungen", "Mehrfachpaare", "Kopfmaße", "Griffspezifikation", "Flächenbedarf", "Reinigungsablauf", "Mustergewichte", "Nachbestellplan"],
    faq: [["Sind Hex-Kurzhanteln sicherer?", "Flache Seiten reduzieren Rollen; sichere Nutzung hängt zusätzlich von Boden, Abstand, Verhalten und Pflege ab."], ["Welche Form passt besser zu Bodenübungen?", "Hex-Köpfe bieten häufig eine stabilere Auflage, abhängig von Modell und Übung."], ["Wie werden Rundhanteln sicher aufbewahrt?", "Sie benötigen eine stabile Lösung, die Rollen verhindert und Gewichte erkennbar hält."], ["Welche Form gibt es in höheren Gewichten?", "Das hängt von der Produktlinie ab. Bereich und tatsächliche Maße müssen bestätigt werden."], ["Kann ein Studio beide Formen einsetzen?", "Ja, vorzugsweise in klar getrennten oder organisierten Bereichen."], ["Bestimmt die Form die Haltbarkeit?", "Nein. Material, Kern, Verbindung, Verarbeitung und Nutzung sind entscheidender."], ["Welche Maße sind wichtig?", "Gesamtlänge, Kopfmaß, Griff, Istgewicht, Flächenbedarf und Abstand der geplanten Reihe."]],
    links: [...commonLinks.de, ["materials-guide", "Kurzhantelmaterialien vergleichen"], ["free-weight-area-guide", "Freihantelbereich planen"]],
    images: images("shapes", ["Hex-Kurzhanteln für gewerbliches Krafttraining", "Runde Gummihantel mit kreisförmigen Köpfen", "Kurzhantelbereich mit geordneter Gewichtsabstufung"])
  },
  {
    id: "commercial-dumbbell-maintenance-guide", locale: "en", path: "/resources/commercial-dumbbell-maintenance-cleaning-replacement",
    title: "Commercial Dumbbell Maintenance: Cleaning, Odor, Rust and Replacement", description: "Maintain commercial dumbbells with practical cleaning, ventilation, rust control, inspection, isolation, replacement and batch-record procedures.", h1: "Commercial Dumbbell Maintenance, Cleaning and Replacement", keyword: "commercial dumbbell maintenance", intent: "Operational care and replacement guidance", subject: "commercial dumbbell maintenance",
    direct: "A commercial dumbbell routine should identify the material, use an approved cleaner, avoid prolonged chemical contact, dry metal and seams, inspect heads and handles, isolate questionable pieces and record replacements by model and weight. New-product odor is managed through planned unpacking and ventilation, not by masking it. Cracks, movement at the connection, sharp damage, unreadable markings or significant corrosion require assessment before the dumbbell returns to service.",
    definition: "Commercial dumbbell maintenance is the documented cycle of cleaning, inspection, isolation, corrective action and replacement used to keep a free weight range serviceable and consistent. It covers both visible surfaces and functional interfaces such as the handle, head connection, seams and weight identification.",
    points: ["identifying rubber, PU, TPU, chrome and painted surfaces", "testing a cleaner on a small inconspicuous area", "removing sweat and residue without soaking seams", "ventilating newly unpacked rubber products", "drying knurling and metal before corrosion develops", "checking cracks, cuts, loose movement and sharp edges", "setting daily, weekly and periodic inspection levels", "isolating a questionable dumbbell from member access", "recording model, weight, batch and observed condition", "deciding between cleaning, monitoring and replacement", "matching a replacement to the existing range", "feeding repeated faults back into purchasing criteria"],
    comparison: [["Routine wipe", "Sweat and fresh surface residue", "Cleaner compatibility and complete drying"], ["Detailed inspection", "Periodic condition review", "Head, handle, connection, marking and weight"], ["Isolation", "Uncertain functional or surface condition", "Named reviewer and documented decision"], ["Replacement", "Damage or inconsistency that cannot be accepted", "Correct model, weight, dimensions and batch reference"]],
    checklist: ["Material identification", "Approved cleaner", "Cloth and brush method", "Drying procedure", "Ventilation area", "Inspection frequency", "Damage categories", "Isolation location", "Condition record", "Replacement authority", "Reorder reference", "Staff handover"],
    faq: [["How often should commercial dumbbells be cleaned?", "Set frequency from traffic and contamination, with prompt wiping of sweat and a documented deeper routine."], ["Can disinfectant be used on every dumbbell?", "No. Confirm compatibility and contact time for the actual surface, then test before broad use."], ["How can a facility reduce new rubber odor?", "Unpack in a ventilated controlled area and allow air exchange before installation; do not use unapproved masking chemicals."], ["What causes rust on a dumbbell handle?", "Moisture, salts, damaged finish and incomplete drying can contribute. Clean and dry the knurling and assess damaged areas."], ["When should a dumbbell be removed from use?", "Isolate it when there is movement, a sharp defect, serious cracking, unstable identification or another uncertain condition."], ["Can a damaged coating be repaired?", "Cosmetic touch-up and functional repair are different. Confirm the construction and obtain an appropriate technical decision."], ["What records help with replacement orders?", "Keep model, nominal weight, dimensions, finish, marking, purchase batch, photographs and the reason for replacement."]],
    links: [...commonLinks.en, ["materials-guide", "Choose a dumbbell material"], ["hex-vs-round-guide", "Compare dumbbell shapes"], ["free-weight-reorder-batch-consistency", "Control reorder consistency"]],
    images: images("maintenance", ["Dumbbell weight and condition check at a quality station", "Commercial dumbbell inspection with scale and written record", "Metal surface finishing relevant to dumbbell handle maintenance"])
  },
  {
    id: "commercial-dumbbell-maintenance-guide", locale: "es", path: "/es/blog/mantenimiento-mancuernas-gimnasio",
    title: "Mantenimiento de mancuernas de gimnasio: limpieza y cambio", description: "Limpieza, ventilación, óxido, inspección, aislamiento, sustitución y registros para mantener mancuernas de uso profesional.", h1: "Cómo mantener, limpiar y sustituir mancuernas profesionales", keyword: "mantenimiento de mancuernas", intent: "Mantenimiento operativo de mancuernas", subject: "mantenimiento de mancuernas profesionales",
    direct: "Un programa de mantenimiento identifica el material, utiliza un limpiador compatible, evita contacto químico prolongado, seca metal y juntas, revisa cabezas y empuñaduras, aparta las piezas dudosas y registra cada sustitución. El olor inicial se gestiona con desembalaje y ventilación planificados. Grietas, movimiento en la unión, bordes dañados, marcación ilegible o corrosión importante requieren evaluación antes de devolver la mancuerna al uso.",
    definition: "El mantenimiento de mancuernas es el ciclo documentado de limpieza, inspección, aislamiento, acción correctiva y sustitución que conserva una línea utilizable y coherente. Incluye superficies visibles y puntos funcionales como empuñadura, unión, juntas e identificación del peso.",
    points: ["identificar superficies de goma, PU, TPU, cromo y pintura", "probar el limpiador en una zona poco visible", "retirar sudor sin empapar juntas", "ventilar productos de goma recién abiertos", "secar moleteado y metal para limitar corrosión", "revisar grietas, cortes, movimiento y bordes", "definir controles diarios, semanales y periódicos", "aislar una mancuerna dudosa del acceso", "registrar modelo, peso, lote y condición", "decidir entre limpieza, seguimiento y sustitución", "igualar la pieza nueva con la línea instalada", "convertir fallos repetidos en criterios de compra"],
    comparison: [["Limpieza rutinaria", "Sudor y residuo reciente", "Compatibilidad y secado"], ["Inspección detallada", "Revisión periódica", "Cabeza, unión, mango, marcación y peso"], ["Aislamiento", "Condición funcional dudosa", "Responsable y decisión registrada"], ["Sustitución", "Daño no aceptable", "Modelo, peso, medidas y referencia"]],
    checklist: ["Identificar material", "Limpiador aprobado", "Método de paño y cepillo", "Secado", "Zona ventilada", "Frecuencia de inspección", "Categorías de daño", "Lugar de aislamiento", "Registro de condición", "Autoridad de sustitución", "Referencia de reposición", "Formación del personal"],
    faq: [["¿Cada cuánto se limpian las mancuernas?", "Depende del tráfico y la contaminación; el sudor se retira pronto y la limpieza profunda sigue un calendario."], ["¿Cualquier desinfectante sirve?", "No. Confirme compatibilidad y tiempo de contacto para la superficie real."], ["¿Cómo reducir el olor de la goma nueva?", "Desembale en una zona ventilada y permita intercambio de aire antes de instalar."], ["¿Por qué se oxida la empuñadura?", "Humedad, sales, acabado dañado y secado incompleto pueden contribuir."], ["¿Cuándo se retira una mancuerna?", "Cuando existe movimiento, borde peligroso, grieta seria, identificación inestable u otra duda funcional."], ["¿Puede repararse un recubrimiento?", "Una corrección estética no equivale a una reparación funcional; confirme construcción y método."], ["¿Qué datos guardar para la reposición?", "Modelo, peso, medidas, acabado, marca, lote, fotografías y motivo del cambio."]],
    links: [...commonLinks.es, ["materials-guide", "Elegir material"], ["hex-vs-round-guide", "Comparar formatos"], ["free-weight-reorder-batch-consistency", "Controlar reposiciones"]],
    images: images("maintenance", ["Control de peso y condición de una mancuerna", "Inspección de mancuerna con balanza y registro", "Acabado de metal relacionado con el cuidado de empuñaduras"])
  },
  {
    id: "commercial-dumbbell-maintenance-guide", locale: "pt-BR", path: "/pt/blog/manutencao-halteres-academia",
    title: "Manutenção de halteres: limpeza, odor, ferrugem e troca", description: "Limpeza, ventilação, controle de ferrugem, inspeção, isolamento, substituição e registros para halteres de academia.", h1: "Como limpar, manter e substituir halteres profissionais", keyword: "manutenção de halteres", intent: "Cuidados operacionais com halteres", subject: "manutenção de halteres profissionais",
    direct: "Uma rotina de manutenção identifica o material, usa produto compatível, evita contato químico prolongado, seca metal e emendas, inspeciona cabeças e pegadores, retira peças duvidosas de uso e registra cada substituição. O odor inicial deve ser tratado com desembalagem e ventilação planejados. Rachaduras, movimento na união, bordas danificadas, marcação ilegível ou corrosão relevante exigem avaliação antes do retorno ao uso.",
    definition: "Manutenção de halteres é o ciclo documentado de limpeza, inspeção, isolamento, ação corretiva e substituição usado para manter uma linha funcional e consistente. Inclui superfícies visíveis e pontos como pegador, união, emendas e identificação do peso.",
    points: ["identificar superfícies de borracha, PU, TPU, cromo e pintura", "testar o produto de limpeza em área discreta", "retirar suor sem encharcar emendas", "ventilar produtos de borracha recém-abertos", "secar recartilhado e metal para limitar corrosão", "verificar rachaduras, cortes, movimento e bordas", "definir inspeções diárias, semanais e periódicas", "isolar um halter duvidoso do acesso", "registrar modelo, peso, lote e condição", "decidir entre limpeza, acompanhamento e troca", "combinar a peça nova com a linha existente", "transformar falhas repetidas em critérios de compra"],
    comparison: [["Limpeza de rotina", "Suor e resíduo recente", "Compatibilidade e secagem"], ["Inspeção detalhada", "Revisão periódica", "Cabeça, união, pegador, marcação e peso"], ["Isolamento", "Condição funcional duvidosa", "Responsável e decisão registrada"], ["Substituição", "Dano não aceitável", "Modelo, peso, medidas e referência"]],
    checklist: ["Identificação do material", "Produto aprovado", "Método de pano e escova", "Secagem", "Área ventilada", "Frequência de inspeção", "Categorias de dano", "Local de isolamento", "Registro de condição", "Autorização de troca", "Referência de reposição", "Treinamento da equipe"],
    faq: [["Com que frequência os halteres devem ser limpos?", "Depende do fluxo; o suor deve ser removido logo e a limpeza detalhada segue um calendário."], ["Qualquer desinfetante pode ser usado?", "Não. Confirme compatibilidade e tempo de contato para a superfície real."], ["Como reduzir o cheiro de borracha nova?", "Desembale em área ventilada e permita troca de ar antes da instalação."], ["Por que o pegador enferruja?", "Umidade, sais, acabamento danificado e secagem incompleta podem contribuir."], ["Quando retirar um halter de uso?", "Quando houver movimento, borda perigosa, rachadura séria, identificação instável ou outra dúvida funcional."], ["O revestimento pode ser reparado?", "Correção estética não equivale a reparo funcional; confirme construção e método."], ["Quais dados guardar para reposição?", "Modelo, peso, medidas, acabamento, marcação, lote, fotos e motivo da troca."]],
    links: [...commonLinks["pt-BR"], ["materials-guide", "Escolher material"], ["hex-vs-round-guide", "Comparar formatos"], ["free-weight-reorder-batch-consistency", "Controlar reposições"]],
    images: images("maintenance", ["Controle de peso e condição de um halter", "Inspeção de halter com balança e registro", "Acabamento de metal relacionado ao cuidado dos pegadores"])
  },
  {
    id: "commercial-dumbbell-maintenance-guide", locale: "de", path: "/de/blog/kurzhanteln-pflege-reinigung-austausch",
    title: "Kurzhanteln reinigen, pflegen und austauschen", description: "Praxisleitfaden zu Reinigung, Lüftung, Rost, Inspektion, Sperrung, Austausch und Chargendokumentation gewerblicher Kurzhanteln.", h1: "Pflege und Austausch gewerblicher Kurzhanteln", keyword: "Kurzhanteln reinigen und pflegen", intent: "Betriebliche Pflege und Austausch", subject: "Pflege gewerblicher Kurzhanteln",
    direct: "Ein Pflegeablauf identifiziert das Material, nutzt verträgliche Reiniger, vermeidet langen Chemikalienkontakt, trocknet Metall und Fugen, prüft Köpfe sowie Griffe, sperrt fragliche Teile und dokumentiert Ersatz. Anfangsgeruch wird durch geplantes Auspacken und Lüften behandelt. Risse, Bewegung an der Verbindung, scharfe Schäden, unlesbare Angaben oder deutliche Korrosion müssen vor weiterer Nutzung bewertet werden.",
    definition: "Kurzhantelpflege ist der dokumentierte Kreislauf aus Reinigung, Inspektion, Sperrung, Korrektur und Austausch, der ein Sortiment nutzbar und konsistent hält. Er umfasst sichtbare Flächen sowie funktionale Schnittstellen wie Griff, Kopfverbindung, Fugen und Gewichtskennzeichnung.",
    points: ["Erkennen von Gummi, PU, TPU, Chrom und Lack", "Test des Reinigers an unauffälliger Stelle", "Entfernen von Schweiß ohne Fugen zu tränken", "Lüften neu ausgepackter Gummiprodukte", "Trocknen von Rändelung und Metall", "Prüfen auf Risse, Schnitte, Bewegung und Kanten", "täglichen, wöchentlichen und periodischen Prüfstufen", "Sperren einer fraglichen Hantel", "Dokumentieren von Modell, Gewicht, Charge und Zustand", "Entscheidung zwischen Reinigung, Beobachtung und Austausch", "Abgleich des Ersatzes mit dem Bestand", "Übernahme wiederkehrender Fehler in Einkaufskriterien"],
    comparison: [["Routinewischen", "Schweiß und frische Rückstände", "Verträglichkeit und Trocknung"], ["Detailinspektion", "Periodische Zustandsprüfung", "Kopf, Verbindung, Griff, Kennzeichnung und Gewicht"], ["Sperrung", "Unklarer Funktionszustand", "Verantwortlicher und dokumentierte Entscheidung"], ["Austausch", "Nicht akzeptabler Schaden", "Modell, Gewicht, Maße und Referenz"]],
    checklist: ["Material erkennen", "Freigegebener Reiniger", "Tuch- und Bürstenmethode", "Trocknung", "Lüftungsbereich", "Prüffrequenz", "Schadenskategorien", "Sperrort", "Zustandsprotokoll", "Austauschfreigabe", "Nachbestellreferenz", "Mitarbeitereinweisung"],
    faq: [["Wie oft werden Kurzhanteln gereinigt?", "Die Frequenz richtet sich nach Nutzung; Schweiß wird zeitnah entfernt, die Detailreinigung folgt einem Plan."], ["Eignet sich jedes Desinfektionsmittel?", "Nein. Verträglichkeit und Kontaktzeit müssen zur tatsächlichen Oberfläche passen."], ["Wie lässt sich Gummigeruch reduzieren?", "In einem kontrollierten, belüfteten Bereich auspacken und vor Aufstellung Luftaustausch ermöglichen."], ["Warum rostet ein Hantelgriff?", "Feuchtigkeit, Salze, beschädigte Oberflächen und unvollständige Trocknung können beitragen."], ["Wann wird eine Hantel gesperrt?", "Bei Bewegung, scharfer Stelle, starkem Riss, instabiler Kennzeichnung oder unklarem Funktionszustand."], ["Kann eine Beschichtung repariert werden?", "Kosmetische Korrektur und funktionale Reparatur sind verschieden; Konstruktion und Methode müssen geklärt werden."], ["Welche Daten helfen beim Ersatz?", "Modell, Gewicht, Maße, Finish, Kennzeichnung, Charge, Fotos und Austauschgrund."]],
    links: [...commonLinks.de, ["materials-guide", "Material auswählen"], ["hex-vs-round-guide", "Formen vergleichen"], ["free-weight-reorder-batch-consistency", "Nachbestellungen kontrollieren"]],
    images: images("maintenance", ["Gewichts- und Zustandsprüfung einer Kurzhantel", "Kurzhantelprüfung mit Waage und Protokoll", "Metallbearbeitung mit Bezug zur Griffpflege"])
  },
  {
    id: "commercial-kettlebell-guide", locale: "en", path: "/resources/commercial-kettlebell-buying-guide",
    title: "Commercial Kettlebell Buying Guide: Cast Iron, Competition and Vinyl", description: "Choose commercial kettlebells by construction, handle, base, weight range, finish, storage, quality control, packaging and private-label needs.", h1: "Commercial Kettlebell Buying Guide", keyword: "commercial kettlebell buying guide", intent: "Commercial kettlebell selection", subject: "commercial kettlebell selection",
    direct: "Choose cast iron kettlebells for a traditional compact format, competition-style kettlebells when consistent external dimensions and a specialized training feel are priorities, and vinyl-coated models when surface coverage and easy visual grouping suit the program. Confirm the exact construction, handle window, grip diameter, base stability, weight range, markings, finish, quality checks and packaging. Product names alone do not guarantee a standard.",
    definition: "A commercial kettlebell is a fixed hand weight with a body, handle and stable base intended for repeated training use. Cast iron, competition-style and coated products describe different constructions or market positions. Their suitability depends on dimensions, surface, range, users and verified product data.",
    points: ["user group, exercises and class format", "cast body, coating and handle construction", "handle window, diameter and surface feel", "base flatness and stability between repetitions", "weight range, increments and duplicate popular sizes", "color system and readable weight markings", "changes in body size across traditional cast ranges", "consistent external size in competition-style ranges", "cleaning and inspection of handle and base", "actual weight, casting surface and sharp-edge checks", "logo, color ring, molded or printed identification", "carton support for the handle and dense pallet loading"],
    comparison: [["Cast iron", "Traditional training and compact progression", "Casting, handle, base, finish and size change"], ["Competition style", "Technique-focused use and consistent external form", "Dimensions, handle, color and actual weight"], ["Vinyl coated", "Studios, home ranges and color grouping", "Coating coverage, seam, handle and base"], ["Mixed assortment", "Different programs or sales channels", "Clear positioning, increments and storage"]],
    checklist: ["Target user", "Exercise program", "Construction", "Handle window", "Grip diameter", "Base stability", "Weight range", "Increment plan", "Color and marking", "Sample weights", "Packing method", "Private-label artwork"],
    faq: [["What is the difference between cast iron and competition kettlebells?", "Traditional cast models often change body size with weight; competition-style models usually target a more consistent external form."], ["Which handle size is best?", "It depends on user group and exercises. Request actual dimensions and assess representative weights."], ["Should every weight have the same color?", "Color systems can support identification, but markings must remain clear and the approved reference should be documented."], ["How many kettlebells does a commercial gym need?", "Plan from class size, exercises, user ability, popular loads and whether simultaneous pairs are required."], ["What should be checked on a sample?", "Check actual weight, handle space, surface, base stability, markings, dimensions and packaging."], ["Can kettlebells carry a private label?", "Possible methods depend on material, surface, available area, quantity and durability requirement."], ["Why is packaging important?", "Kettlebells are dense and the handle can load the carton; internal support and clear weight labels reduce handling risk."]],
    links: [["gym-accessories-category", "Commercial gym accessories"], ["product:accessories:cast-iron-kettlebell", "Cast iron kettlebell"], ["product:accessories:competition-kettlebell", "Competition kettlebell"], ["product:accessories:vinyl-kettlebell", "Vinyl kettlebell"], ["factory", "Manufacturing and quality"], ["contact", "Discuss a kettlebell range"]],
    images: images("kettlebells", ["Cast iron kettlebell with integrated handle and stable base", "Competition-style kettlebell with consistent external body", "Vinyl-coated kettlebell for a color-organized product range"])
  },
  {
    id: "commercial-kettlebell-guide", locale: "es", path: "/es/blog/guia-compra-kettlebells-gimnasio",
    title: "Guía para comprar kettlebells de gimnasio profesional", description: "Compare kettlebells de hierro fundido, competición y vinilo por mango, base, pesos, acabado, control, embalaje y marca privada.", h1: "Cómo elegir kettlebells para un gimnasio profesional", keyword: "kettlebells para gimnasio profesional", intent: "Selección comercial de kettlebells", subject: "selección de kettlebells profesionales",
    direct: "Elija hierro fundido para un formato tradicional y compacto; estilo competición cuando importen dimensiones exteriores consistentes y una sensación especializada; y vinilo cuando la cobertura superficial y la agrupación visual encajen con el programa. Confirme construcción, ventana y diámetro del mango, estabilidad de la base, rango, marcación, acabado, controles y embalaje. El nombre comercial no garantiza por sí solo un estándar.",
    definition: "Una kettlebell profesional es un peso fijo con cuerpo, mango y base estable para uso repetido. Hierro fundido, competición y recubrimiento describen construcciones o posiciones diferentes; la idoneidad depende de medidas, superficie, rango, usuarios y datos verificados.",
    points: ["usuarios, ejercicios y formato de clase", "cuerpo fundido, recubrimiento y construcción del mango", "ventana, diámetro y tacto del agarre", "planitud y estabilidad de la base", "rango, incrementos y unidades en pesos populares", "colores y marcación legible", "cambio de tamaño en gamas tradicionales", "dimensiones constantes en estilo competición", "limpieza e inspección de mango y base", "peso real, superficie y bordes", "logo, anillo de color y método de identificación", "soporte del mango en caja y carga densa"],
    comparison: [["Hierro fundido", "Entrenamiento tradicional y progresión compacta", "Fundición, mango, base, acabado y tamaño"], ["Estilo competición", "Técnica y forma exterior consistente", "Medidas, mango, color y peso real"], ["Vinilo", "Estudios y gamas organizadas por color", "Cobertura, junta, mango y base"], ["Surtido mixto", "Programas o canales diferentes", "Posición, incrementos y almacenamiento"]],
    checklist: ["Usuario objetivo", "Programa", "Construcción", "Ventana del mango", "Diámetro", "Estabilidad de base", "Rango de pesos", "Incrementos", "Color y marcación", "Muestras", "Embalaje", "Diseño de marca"],
    faq: [["¿Qué diferencia hay entre hierro fundido y competición?", "Los modelos tradicionales suelen cambiar de tamaño; los de competición buscan una forma exterior más constante."], ["¿Qué tamaño de mango conviene?", "Depende de usuarios y ejercicios. Solicite medidas y revise pesos representativos."], ["¿Todos los pesos deben usar el mismo color?", "Puede usarse un sistema de color, pero la marcación debe ser clara y documentada."], ["¿Cuántas unidades necesita un gimnasio?", "Calcule tamaño de clase, ejercicios, nivel, pesos populares y trabajo por parejas."], ["¿Qué revisar en la muestra?", "Peso real, espacio del mango, superficie, base, marcación, medidas y embalaje."], ["¿Se puede añadir marca privada?", "El método depende del material, superficie, espacio, cantidad y durabilidad requerida."], ["¿Por qué importa el embalaje?", "Son productos densos y el mango carga la caja; soporte y etiquetas reducen riesgo."]],
    links: [["gym-accessories-category", "Accesorios profesionales"], ["product:accessories:cast-iron-kettlebell", "Kettlebell de hierro fundido"], ["product:accessories:competition-kettlebell", "Kettlebell de competición"], ["product:accessories:vinyl-kettlebell", "Kettlebell de vinilo"], ["factory", "Fabricación y calidad"], ["contact", "Consultar una gama"]],
    images: images("kettlebells", ["Kettlebell de hierro fundido con mango integrado y base estable", "Kettlebell de competición con cuerpo exterior consistente", "Kettlebell de vinilo para una gama organizada por colores"])
  },
  {
    id: "commercial-kettlebell-guide", locale: "pt-BR", path: "/pt/blog/guia-compra-kettlebells-academia",
    title: "Guia de kettlebells para academia profissional", description: "Compare kettlebells de ferro fundido, competição e vinil por pegador, base, pesos, acabamento, controle, embalagem e marca própria.", h1: "Como escolher kettlebells para academia profissional", keyword: "kettlebell para academia profissional", intent: "Seleção comercial de kettlebells", subject: "seleção de kettlebells profissionais",
    direct: "Escolha ferro fundido para um formato tradicional e compacto; estilo competição quando dimensões externas consistentes e sensação especializada forem prioridade; e vinil quando cobertura superficial e organização visual combinarem com o programa. Confirme construção, janela e diâmetro do pegador, estabilidade da base, faixa, marcação, acabamento, controles e embalagem. O nome comercial não garante sozinho um padrão.",
    definition: "Kettlebell profissional é um peso fixo com corpo, pegador e base estável para uso repetido. Ferro fundido, competição e revestimento descrevem construções ou posições diferentes; a adequação depende de medidas, superfície, faixa, usuários e dados verificados.",
    points: ["usuários, exercícios e formato de aula", "corpo fundido, revestimento e construção do pegador", "janela, diâmetro e toque da empunhadura", "planicidade e estabilidade da base", "faixa, incrementos e unidades nos pesos populares", "cores e marcação legível", "mudança de tamanho em linhas tradicionais", "dimensões constantes no estilo competição", "limpeza e inspeção de pegador e base", "peso real, superfície e bordas", "logo, anel de cor e método de identificação", "apoio do pegador na caixa e carga densa"],
    comparison: [["Ferro fundido", "Treino tradicional e progressão compacta", "Fundição, pegador, base, acabamento e tamanho"], ["Estilo competição", "Técnica e formato externo consistente", "Medidas, pegador, cor e peso real"], ["Vinil", "Estúdios e linhas organizadas por cor", "Cobertura, emenda, pegador e base"], ["Sortimento misto", "Programas ou canais diferentes", "Posicionamento, incrementos e armazenamento"]],
    checklist: ["Usuário-alvo", "Programa", "Construção", "Janela do pegador", "Diâmetro", "Estabilidade da base", "Faixa de pesos", "Incrementos", "Cor e marcação", "Amostras", "Embalagem", "Arte da marca"],
    faq: [["Qual a diferença entre ferro fundido e competição?", "Modelos tradicionais costumam mudar de tamanho; os de competição buscam formato externo mais constante."], ["Qual tamanho de pegador é melhor?", "Depende de usuários e exercícios. Solicite medidas e avalie pesos representativos."], ["Todos os pesos devem ter a mesma cor?", "Pode existir um sistema de cores, mas a marcação deve continuar clara e documentada."], ["Quantas unidades uma academia precisa?", "Calcule tamanho da turma, exercícios, nível, pesos populares e uso em pares."], ["O que conferir na amostra?", "Peso real, espaço do pegador, superfície, base, marcação, medidas e embalagem."], ["É possível aplicar marca própria?", "O método depende de material, superfície, área, quantidade e durabilidade desejada."], ["Por que a embalagem importa?", "São produtos densos e o pegador pressiona a caixa; apoio e etiquetas reduzem risco."]],
    links: [["gym-accessories-category", "Acessórios profissionais"], ["product:accessories:cast-iron-kettlebell", "Kettlebell de ferro fundido"], ["product:accessories:competition-kettlebell", "Kettlebell de competição"], ["product:accessories:vinyl-kettlebell", "Kettlebell de vinil"], ["factory", "Produção e qualidade"], ["contact", "Consultar uma linha"]],
    images: images("kettlebells", ["Kettlebell de ferro fundido com pegador integrado e base estável", "Kettlebell de competição com corpo externo consistente", "Kettlebell revestido de vinil para linha organizada por cores"])
  },
  {
    id: "commercial-kettlebell-guide", locale: "de", path: "/de/blog/kettlebell-kaufberatung-fitnessstudio",
    title: "Kettlebell-Kaufberatung für Fitnessstudios", description: "Gusseisen-, Competition- und Vinyl-Kettlebells nach Griff, Boden, Gewichtsbereich, Oberfläche, Prüfung, Verpackung und Eigenmarke vergleichen.", h1: "Gewerbliche Kettlebells richtig auswählen", keyword: "Kettlebells für Fitnessstudio kaufen", intent: "Gewerbliche Kettlebell-Auswahl", subject: "Auswahl gewerblicher Kettlebells",
    direct: "Gusseisen eignet sich für ein traditionelles kompaktes Format. Competition-Ausführungen passen, wenn gleichmäßige Außenmaße und ein spezialisierter Trainingscharakter wichtig sind. Vinylmodelle können bei flächiger Beschichtung und visueller Gruppierung sinnvoll sein. Bestätigen Sie Konstruktion, Grifföffnung, Durchmesser, Bodenstabilität, Bereich, Kennzeichnung, Finish, Prüfung und Verpackung. Der Produktname allein garantiert keinen Standard.",
    definition: "Eine gewerbliche Kettlebell ist ein festes Handgewicht mit Körper, Griff und stabilem Boden für wiederholte Nutzung. Gusseisen, Competition-Stil und Beschichtung bezeichnen unterschiedliche Konstruktionen oder Marktpositionen. Die Eignung hängt von Maßen, Oberfläche, Sortiment, Nutzern und bestätigten Produktdaten ab.",
    points: ["Nutzergruppe, Übungen und Kursformat", "Gusskörper, Beschichtung und Griffkonstruktion", "Grifföffnung, Durchmesser und Haptik", "Planlage und Stabilität des Bodens", "Gewichtsbereich, Abstufungen und Mehrfachstücke", "Farbsystem und lesbarer Kennzeichnung", "Größenänderung traditioneller Gussreihen", "gleichmäßigen Außenmaßen im Competition-Stil", "Reinigung und Prüfung von Griff und Boden", "Istgewicht, Gussoberfläche und scharfen Stellen", "Logo, Farbring und Kennzeichnungsmethode", "Griffabstützung im Karton und dichter Palettenladung"],
    comparison: [["Gusseisen", "Traditionelles Training und kompakte Abstufung", "Guss, Griff, Boden, Finish und Größenwechsel"], ["Competition-Stil", "Technikorientierter Einsatz und konstante Form", "Maße, Griff, Farbe und Istgewicht"], ["Vinyl", "Studios und farblich organisierte Reihen", "Beschichtung, Naht, Griff und Boden"], ["Gemischtes Sortiment", "Unterschiedliche Programme oder Kanäle", "Positionierung, Abstufung und Aufbewahrung"]],
    checklist: ["Zielnutzer", "Trainingsprogramm", "Konstruktion", "Grifföffnung", "Griffdurchmesser", "Bodenstabilität", "Gewichtsbereich", "Abstufungen", "Farbe und Markierung", "Mustergewichte", "Verpackung", "Eigenmarkengrafik"],
    faq: [["Was unterscheidet Guss- und Competition-Kettlebells?", "Traditionelle Gussmodelle ändern häufig die Körpergröße; Competition-Ausführungen zielen auf eine gleichmäßigere Außenform."], ["Welche Griffgröße ist richtig?", "Das hängt von Nutzern und Übungen ab. Fordern Sie Maße an und prüfen Sie repräsentative Gewichte."], ["Braucht jedes Gewicht eine bestimmte Farbe?", "Ein Farbsystem kann helfen, doch Kennzeichnung und freigegebene Referenz müssen klar bleiben."], ["Wie viele Kettlebells braucht ein Studio?", "Planen Sie aus Kursgröße, Übungen, Leistungsstand, beliebten Lasten und gleichzeitig benötigten Paaren."], ["Was wird am Muster geprüft?", "Istgewicht, Griffraum, Oberfläche, Boden, Markierung, Maße und Verpackung."], ["Ist eine Eigenmarke möglich?", "Die Methode hängt von Material, Fläche, Menge und gewünschter Beständigkeit ab."], ["Warum ist die Verpackung wichtig?", "Das Produkt ist dicht und der Griff belastet den Karton; innere Abstützung und Gewichtslabel reduzieren Risiken."]],
    links: [["gym-accessories-category", "Gewerbliches Zubehör"], ["product:accessories:cast-iron-kettlebell", "Gusseisen-Kettlebell"], ["product:accessories:competition-kettlebell", "Competition-Kettlebell"], ["product:accessories:vinyl-kettlebell", "Vinyl-Kettlebell"], ["factory", "Fertigung und Qualität"], ["contact", "Kettlebell-Sortiment besprechen"]],
    images: images("kettlebells", ["Gusseisen-Kettlebell mit integriertem Griff und stabilem Boden", "Competition-Kettlebell mit gleichmäßiger Außenform", "Vinyl-Kettlebell für eine farblich organisierte Produktlinie"])
  },
  {
    id: "free-weight-area-guide", locale: "en", path: "/resources/commercial-free-weight-area-design",
    title: "How to Plan a Commercial Free Weight Area", description: "Plan a commercial free weight area around users, dumbbell runs, plates, bars, circulation, flooring, noise, peak demand, cleaning and phased purchasing.", h1: "How to Plan a Commercial Free Weight Area", keyword: "commercial free weight area design", intent: "Commercial strength-area planning", subject: "commercial free weight area planning",
    direct: "Start with users, training activities and peak-time demand, then map dumbbell work, plate-loaded work, circulation, storage and protected floor zones at real dimensions. Plan popular-weight duplication separately from the full range. Keep return paths short, make weight identification visible and leave operational access for cleaning and inspection. Product selection follows the activity and capacity plan; it should not begin with a generic equipment list.",
    definition: "A commercial free weight area is the part of a training facility organized for movable resistance such as dumbbells, barbells and weight plates. Planning coordinates users, training positions, circulation, storage, flooring, noise, supervision, cleaning and future replenishment. Final building and safety decisions remain with qualified local professionals.",
    points: ["member profile, coaching model and training activities", "peak concurrent users rather than average attendance", "light, medium and heavy dumbbell demand", "duplicate pairs at frequently selected weights", "bar and plate quantities for simultaneous stations", "short return routes and visible weight identification", "circulation around active lifting positions", "floor protection, transitions and cleaning access", "noise expectations and adjacent room sensitivity", "delivery route, dense product handling and installation sequence", "daily reset, periodic inspection and missing-item records", "phased purchasing and reserved expansion space"],
    comparison: [["Compact studio", "Focused user group and coached sessions", "Essential range, shared use and clear circulation"], ["General commercial gym", "Mixed ability and higher peak demand", "Broad progression and duplicate popular weights"], ["Strength-focused facility", "Heavy loading and longer sessions", "Floor, bars, plates, space and supervision"], ["Phased opening", "Budget or membership grows in stages", "Expansion locations and compatible replenishment"]],
    checklist: ["Scaled floor plan", "Target users", "Peak capacity", "Exercise list", "Dumbbell range", "Popular-weight duplicates", "Bars and plates", "Storage locations", "Floor transitions", "Circulation", "Cleaning access", "Expansion reserve"],
    faq: [["How much space does a free weight area need?", "There is no universal figure. Draw actual product dimensions, active positions, circulation and local clearance requirements."], ["Which dumbbell weights should be duplicated?", "Use member profile and observed demand; medium and commonly selected loads often need separate review."], ["How should plates be stored?", "Keep them identifiable and close to their point of use without obstructing movement or emergency routes."], ["Why plan the floor before ordering?", "Free weights create concentrated loads, impact and cleaning demands; the complete floor assembly must suit the intended use."], ["How can congestion be reduced?", "Separate active positions from return paths, shorten storage routes and provide enough popular weights at peak time."], ["Can the area be purchased in phases?", "Yes, if the first plan reserves compatible locations, capacity and progression for later additions."], ["Who approves final clearances and loading?", "Qualified local building, safety and operational professionals should approve the completed facility plan."]],
    links: [...commonLinks.en, ["plan-commercial-dumbbell-set", "Plan the dumbbell set"], ["weight-plates-category", "Commercial weight plates"], ["commercial-dumbbell-maintenance-guide", "Build a maintenance routine"]],
    images: images("area", ["Commercial free weight area with organized dumbbell training positions", "Dumbbell zone showing storage, visibility and circulation", "Inspection station supporting ongoing free weight maintenance"])
  },
  {
    id: "free-weight-area-guide", locale: "de", path: "/de/blog/freihantelbereich-fitnessstudio-planen",
    title: "Freihantelbereich im Fitnessstudio richtig planen", description: "Freihantelbereich nach Nutzern, Kurzhantelreihe, Scheiben, Stangen, Laufwegen, Boden, Lärm, Spitzenbedarf, Reinigung und Ausbau planen.", h1: "Freihantelbereich für ein Fitnessstudio planen", keyword: "Freihantelbereich planen", intent: "Planung gewerblicher Kraftbereiche", subject: "Planung eines gewerblichen Freihantelbereichs",
    direct: "Beginnen Sie mit Nutzern, Trainingsformen und Spitzenbedarf. Zeichnen Sie Kurzhantelarbeit, Langhantel- und Scheibennutzung, Laufwege, Aufbewahrung und geschützte Bodenflächen maßstäblich. Häufig genutzte Gewichte werden getrennt vom vollständigen Bereich geplant. Kurze Rückgabewege, sichtbare Gewichte und Zugang für Reinigung sowie Prüfung verbessern den Betrieb. Die Produktauswahl folgt dem Aktivitäts- und Kapazitätsplan, nicht einer allgemeinen Ausstattungsliste.",
    definition: "Ein gewerblicher Freihantelbereich ist die organisierte Trainingsfläche für bewegliche Widerstände wie Kurzhanteln, Langhanteln und Gewichtsscheiben. Die Planung verbindet Nutzer, Positionen, Laufwege, Aufbewahrung, Boden, Geräusch, Aufsicht, Reinigung und Ergänzung. Bauliche und sicherheitsbezogene Entscheidungen müssen örtlich qualifiziert geprüft werden.",
    points: ["Mitgliederprofil, Betreuung und Trainingsformen", "gleichzeitigen Nutzern in Spitzenzeiten", "Bedarf an leichten, mittleren und schweren Kurzhanteln", "Mehrfachpaaren häufig gewählter Gewichte", "Stangen- und Scheibenmengen für parallele Nutzung", "kurzen Rückgabewegen und sichtbarer Kennzeichnung", "Laufwegen um aktive Trainingspositionen", "Bodenschutz, Übergängen und Reinigungszugang", "Geräuscherwartung und angrenzenden Räumen", "Anlieferweg und Handhabung dichter Produkte", "täglichem Rücksetzen und periodischer Prüfung", "stufenweiser Beschaffung und Erweiterungsfläche"],
    comparison: [["Kompaktes Studio", "Fokussierte Nutzer und betreute Einheiten", "Kernbereich, gemeinsame Nutzung und Laufwege"], ["Allgemeines Fitnessstudio", "Gemischte Nutzer und höhere Spitzen", "Breite Abstufung und Mehrfachgewichte"], ["Kraftorientierter Betrieb", "Schwere Lasten und längere Einheiten", "Boden, Stangen, Scheiben, Fläche und Aufsicht"], ["Stufenweise Eröffnung", "Budget oder Mitgliederzahl wächst", "Erweiterungsorte und kompatible Ergänzung"]],
    checklist: ["Maßstäblicher Grundriss", "Zielnutzer", "Spitzenkapazität", "Übungsliste", "Kurzhantelbereich", "Mehrfachgewichte", "Stangen und Scheiben", "Aufbewahrungsorte", "Bodenübergänge", "Laufwege", "Reinigungszugang", "Erweiterungsreserve"],
    faq: [["Wie viel Fläche braucht ein Freihantelbereich?", "Es gibt keinen Universalwert. Produktmaße, aktive Positionen, Laufwege und örtliche Anforderungen werden maßstäblich geprüft."], ["Welche Kurzhantelgewichte braucht man mehrfach?", "Das ergibt sich aus Nutzerprofil und Nachfrage; häufig gewählte mittlere Lasten verdienen besondere Prüfung."], ["Wo werden Scheiben aufbewahrt?", "Erkennbar und nahe der Nutzung, ohne Lauf- oder Rettungswege zu blockieren."], ["Warum wird der Boden zuerst geplant?", "Freie Gewichte verursachen konzentrierte Lasten, Stoß und Reinigungsanforderungen; der vollständige Aufbau muss passen."], ["Wie lässt sich Gedränge reduzieren?", "Aktive Positionen und Rückgabewege trennen, Wege verkürzen und Spitzenbedarf berücksichtigen."], ["Kann die Beschaffung in Stufen erfolgen?", "Ja, wenn die erste Planung kompatible Orte und Kapazität für spätere Ergänzungen reserviert."], ["Wer bestätigt Lasten und Abstände?", "Qualifizierte örtliche Fachstellen müssen den fertigen Gebäude- und Sicherheitsplan prüfen."]],
    links: [...commonLinks.de, ["commercial-dumbbell-set-planning", "Kurzhantelsortiment planen"], ["weight-plates-category", "Gewichtsscheiben"], ["commercial-dumbbell-maintenance-guide", "Pflegeablauf aufbauen"]],
    images: images("area", ["Gewerblicher Freihantelbereich mit geordneten Kurzhantelpositionen", "Kurzhantelzone mit sichtbarer Zuordnung und Laufwegen", "Prüfstation für die laufende Pflege freier Gewichte"])
  }
];

const supplementPoints: Record<string, Partial<Record<GrowthLocale, string[]>>> = {
  "materials-guide": {
    es: ["definir material y construcción del modelo exacto", "separar olor inicial de defectos funcionales", "aprobar color y brillo con una referencia física", "probar limpieza antes de aplicarla a toda la línea", "comparar protección de caja para superficies terminadas", "guardar muestra y datos para futuras reposiciones", "relacionar el acabado con el posicionamiento comercial", "registrar cambios de compuesto o proceso antes de repetir el pedido"],
    "pt-BR": ["definir material e construção do modelo exato", "separar odor inicial de defeitos funcionais", "aprovar cor e brilho com referência física", "testar limpeza antes de aplicar em toda a linha", "comparar proteção da caixa para superfícies acabadas", "guardar amostra e dados para futuras reposições", "relacionar o acabamento ao posicionamento comercial", "registrar mudanças de composto ou processo antes da recompra"]
  },
  "hex-vs-round-guide": {
    es: ["dibujar medidas reales dentro de la zona disponible", "comparar estabilidad y ejercicio previsto", "calcular pares repetidos en pesos populares", "validar mango y cabeza en pesos extremos", "organizar identificación y devolución", "documentar dimensiones para la reposición", "observar el comportamiento durante la hora de mayor uso", "separar preferencia estética de requisitos funcionales"],
    "pt-BR": ["desenhar medidas reais na área disponível", "comparar estabilidade e exercício previsto", "calcular pares repetidos nos pesos populares", "validar pegador e cabeça nos pesos extremos", "organizar identificação e devolução", "documentar dimensões para reposição", "observar o comportamento no horário de maior uso", "separar preferência estética de requisitos funcionais"]
  },
  "free-weight-area-guide": {
    es: ["usar un plano a escala con productos reales", "calcular la demanda simultánea de la hora punta", "separar posiciones activas y recorridos", "coordinar suelo, ruido y limpieza", "planificar entrega y manipulación de pesos densos", "reservar una ampliación compatible", "registrar los pesos que generan esperas", "revisar la zona después de iniciar la operación"],
    "pt-BR": ["usar planta em escala com produtos reais", "calcular demanda simultânea no horário de pico", "separar posições ativas e circulação", "coordenar piso, ruído e limpeza", "planejar entrega e manuseio de pesos densos", "reservar uma expansão compatível", "registrar pesos que geram espera", "revisar a área depois do início da operação"]
  }
};

const supplementFaq: Record<string, Record<"es" | "pt-BR", Array<[string, string]>>> = {
  "materials-guide": {
    es: [["¿Conviene guardar una muestra de referencia?", "Sí. Ayuda a comparar color, superficie, marcación y construcción en una reposición."], ["¿El material determina por sí solo la vida útil?", "No. Construcción, uso, limpieza, almacenamiento y control del lote también influyen."]],
    "pt-BR": [["Vale a pena guardar uma amostra de referência?", "Sim. Ela ajuda a comparar cor, superfície, marcação e construção na recompra."], ["O material determina sozinho a vida útil?", "Não. Construção, uso, limpeza, armazenamento e controle do lote também influenciam."]]
  },
  "hex-vs-round-guide": {
    es: [["¿La forma cambia la precisión del peso?", "No por sí sola. La tolerancia y el método de control pertenecen a la especificación del modelo."], ["¿Hay que probar pesos ligeros y pesados?", "Sí, porque medidas, agarre y comportamiento pueden cambiar a lo largo de la gama."]],
    "pt-BR": [["O formato muda a precisão do peso?", "Não por si só. Tolerância e método de controle pertencem à especificação do modelo."], ["É preciso testar pesos leves e pesados?", "Sim, porque medidas, pegada e comportamento podem mudar ao longo da linha."]]
  },
  "free-weight-area-guide": {
    es: [["¿Cuándo se revisa el plano después de abrir?", "Observe la hora punta, devoluciones, limpieza y esperas; convierta los hallazgos en ajustes documentados."], ["¿Debe reservarse espacio para crecer?", "Sí cuando la compra será gradual o la demanda todavía no está confirmada."]],
    "pt-BR": [["Quando revisar a planta depois da abertura?", "Observe pico, devolução, limpeza e espera e transforme os achados em ajustes documentados."], ["É preciso reservar espaço para crescer?", "Sim quando a compra for gradual ou a demanda ainda não estiver confirmada."]]
  }
};

function enhanceExisting(version: LocalizedContentVersion, id: string): LocalizedContentVersion {
  const locale = version.locale as GrowthLocale;
  const points = supplementPoints[id]?.[locale];
  if (!points?.length) return version;
  const subject = locale === "es" ? version.h1.toLocaleLowerCase("es") : version.h1.toLocaleLowerCase("pt-BR");
  const heading = locale === "es" ? "Aplicación práctica para el proyecto" : "Aplicação prática no projeto";
  const addition = rich("commercial-growth-expansion", heading, points.map((point, index) => guidance(locale, subject, point, index)));
  const extraFaq = supplementFaq[id]?.[locale as "es" | "pt-BR"] ?? [];
  const knownDimensions: Record<string, [number, number]> = {
    "/assets/project-dumbbell-zone.avif": [1400, 788],
    "/assets/hex-dumbbells.avif": [932, 742],
    "/assets/products/dumbbells/catalog-v2/pu-dumbbell-kg.jpg": [920, 680]
  };
  return {
    ...version,
    body: [...version.body, addition],
    faq: [...version.faq, ...extraFaq.map(([question, answer], index) => ({ id: `growth-faq-${index + 1}`, question, answer }))],
    images: version.images.map((image) => {
      const dimensions = knownDimensions[image.src];
      return {
        ...image,
        width: image.width ?? dimensions?.[0],
        height: image.height ?? dimensions?.[1],
        caption: image.caption?.trim() || image.alt
      };
    }),
    updatedAt: publishedAt,
    version: version.version + 1
  };
}

export function withCommercialGrowthBlogs(manifest: ContentManifest): ContentManifest {
  const entities = manifest.entities.map((entity) => ({ ...entity, versions: { ...entity.versions } }));
  const byId = new Map(entities.map((entity) => [entity.id, entity]));
  const grouped = new Map<string, Profile[]>();
  for (const profile of profiles) grouped.set(profile.id, [...(grouped.get(profile.id) ?? []), profile]);

  for (const id of Object.keys(supplementPoints)) {
    const entity = byId.get(id);
    if (!entity) throw new Error(`Growth article references unknown entity ${id}`);
    if (entity.versions.es) entity.versions.es = enhanceExisting(entity.versions.es, id);
    if (entity.versions["pt-BR"]) entity.versions["pt-BR"] = enhanceExisting(entity.versions["pt-BR"], id);
  }

  for (const [id, articleProfiles] of grouped) {
    let entity = byId.get(id);
    if (!entity) {
      entity = { id, type: "blog", defaultLocale: "en", versions: {} } satisfies ContentEntity;
      entities.push(entity);
      byId.set(id, entity);
    }
    for (const profile of articleProfiles) {
      if (entity.versions[profile.locale]) throw new Error(`Growth article duplicates ${id}:${profile.locale}`);
      entity.versions[profile.locale] = versionFor(profile);
    }
    if (supplementPoints[id] && entity.versions.en?.images[0]) {
      const englishImage = entity.versions.en.images[0];
      for (const locale of ["pl", "nl"] as const) {
        const version = entity.versions[locale];
        if (!version?.images[0]) continue;
        version.images = [{ ...version.images[0], src: englishImage.src, width: englishImage.width, height: englishImage.height }, ...version.images.slice(1)];
      }
    }
  }

  const reverseLinks: Record<string, Record<GrowthLocale, Array<[string, string]>>> = {
    "dumbbells-category": {
      en: [["materials-guide", "Compare dumbbell materials"], ["hex-vs-round-guide", "Compare dumbbell shapes"], ["commercial-dumbbell-maintenance-guide", "Maintain commercial dumbbells"]],
      es: [["materials-guide", "Comparar materiales"], ["hex-vs-round-guide", "Comparar formatos"], ["commercial-dumbbell-maintenance-guide", "Mantener mancuernas"]],
      "pt-BR": [["materials-guide", "Comparar materiais"], ["hex-vs-round-guide", "Comparar formatos"], ["commercial-dumbbell-maintenance-guide", "Manter halteres"]],
      de: [["materials-guide", "Materialien vergleichen"], ["hex-vs-round-guide", "Formen vergleichen"], ["commercial-dumbbell-maintenance-guide", "Kurzhanteln pflegen"]]
    },
    "gym-accessories-category": {
      en: [["commercial-kettlebell-guide", "Commercial kettlebell guide"]], es: [["commercial-kettlebell-guide", "Guía de kettlebells"]],
      "pt-BR": [["commercial-kettlebell-guide", "Guia de kettlebells"]], de: [["commercial-kettlebell-guide", "Kettlebell-Kaufberatung"]]
    },
    projects: {
      en: [["free-weight-area-guide", "Plan a free weight area"]], es: [["free-weight-area-guide", "Planificar la zona de peso libre"]],
      "pt-BR": [["free-weight-area-guide", "Planejar a área de pesos livres"]], de: [["free-weight-area-guide", "Freihantelbereich planen"]]
    }
  };
  for (const [sourceId, localeLinks] of Object.entries(reverseLinks)) {
    const source = byId.get(sourceId);
    if (!source) throw new Error(`Growth reverse link references unknown entity ${sourceId}`);
    for (const locale of ["en", "es", "pt-BR", "de"] as const) {
      const version = source.versions[locale];
      if (!version) continue;
      const additions = localeLinks[locale].filter(([target]) => !version.internalLinks.some((link) => link.targetContentId === target));
      version.internalLinks = [...version.internalLinks, ...additions.map(([targetContentId, label]) => ({ targetContentId, label }))];
    }
  }
  return { ...manifest, entities };
}

const englishPathByTarget: Record<string, string> = {
  "dumbbells-category": "/products/dumbbells", "weight-plates-category": "/products/weight-plates", "gym-accessories-category": "/products/gym-accessories",
  factory: "/factory", projects: "/projects", contact: "/contact", "materials-guide": "/resources/rubber-vs-urethane-dumbbells-commercial-gyms",
  "hex-vs-round-guide": "/resources/hex-vs-round-dumbbells-commercial-gyms", "commercial-dumbbell-maintenance-guide": "/resources/commercial-dumbbell-maintenance-cleaning-replacement",
  "commercial-kettlebell-guide": "/resources/commercial-kettlebell-buying-guide", "free-weight-area-guide": "/resources/commercial-free-weight-area-design",
  "plan-commercial-dumbbell-set": "/resources/plan-commercial-dumbbell-set", "free-weight-reorder-batch-consistency": "/resources/free-weight-reorder-batch-consistency",
  "product:accessories:cast-iron-kettlebell": "/products/gym-accessories/cast-iron-kettlebell", "product:accessories:competition-kettlebell": "/products/gym-accessories/competition-kettlebell",
  "product:accessories:vinyl-kettlebell": "/products/gym-accessories/vinyl-kettlebell"
};

function markdownFor(profile: Profile): string {
  const body = bodyFor(profile);
  const chunks = [`# ${profile.h1}`];
  for (const block of body) {
    if (block.heading) chunks.push(`## ${block.heading}`);
    if (block.content) chunks.push(block.content);
    if (block.type === "specifications") {
      const columns = block.data?.columns as string[];
      const rows = block.data?.rows as string[][];
      chunks.push(`| ${columns.join(" | ")} |\n| ${columns.map(() => "---").join(" | ")} |\n${rows.map((row) => `| ${row.join(" | ")} |`).join("\n")}`);
    }
    if (block.type === "features") chunks.push((block.data?.items as string[]).map((item) => `- ${item}`).join("\n"));
  }
  chunks.push("## Related buyer resources");
  chunks.push(profile.links.flatMap(([target, label]) => englishPathByTarget[target] ? [`- [${label}](${englishPathByTarget[target]})`] : []).join("\n"));
  chunks.push("## Frequently Asked Questions");
  for (const [question, answer] of profile.faq) chunks.push(`### ${question}\n\n${answer}`);
  chunks.push("## Conclusion");
  chunks.push(profile.direct);
  return chunks.join("\n\n");
}

export const commercialGrowthEnglishPosts = profiles.filter((profile) => profile.locale === "en").map((profile) => ({
  entityId: profile.id,
  publicPath: profile.path,
  title: profile.title,
  h1: profile.h1,
  description: profile.description,
  primaryKeyword: profile.keyword,
  secondaryKeywords: profile.points.slice(0, 6),
  searchIntent: profile.intent,
  content: markdownFor(profile),
  images: imageData(profile),
  publishedAt,
  updatedAt: publishedAt
}));
