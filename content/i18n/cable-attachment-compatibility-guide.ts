import type { InternalLocale } from "../../i18n/locale-registry";
import type {
  ContentBlock,
  ContentEntity,
  ContentManifest,
  LocalizedAuthor,
  LocalizedContentVersion,
  LocalizedImage
} from "../../lib/content/types";

type GuideLocale = Exclude<InternalLocale, "ru" | "ja">;

type GuideCopy = {
  locale: GuideLocale;
  path: string;
  title: string;
  description: string;
  h1: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  intent: string;
  targetBuyer: string;
  home: string;
  library: string;
  eyebrow: string;
  contactPath: string;
  headings: {
    answer: string;
    universal: string;
    verify: string;
    table: string;
    lineup: string;
    machine: string;
    materials: string;
    motion: string;
    oem: string;
    sample: string;
    inspection: string;
    packing: string;
    rfq: string;
  };
  answer: string[];
  universal: string[];
  verification: Array<[string, string]>;
  tableColumns: string[];
  tableRows: string[][];
  checklist: string[];
  machine: string[];
  materials: string[];
  motion: string[];
  oem: string[];
  sample: string[];
  inspection: string[];
  packing: string[];
  rfq: string[];
  faq: Array<[string, string]>;
  linkLabels: string[];
  imageCopy: Array<[string, string]>;
  cta: [string, string, string];
};

const publishedAt = "2026-08-29T08:00:00.000Z";
const entityId = "cable-attachment-compatibility-oem-guide";
const imageRoot = "/assets/resources/cable-attachments";
const imageFiles: Array<[string, number, number]> = [
  [`${imageRoot}/commercial-cable-attachment-set.webp`, 1536, 1024],
  [`${imageRoot}/cable-attachment-connector-compatibility.webp`, 1536, 1024],
  [`${imageRoot}/cable-handle-grip-materials.webp`, 1536, 1024],
  [`${imageRoot}/commercial-gym-attachment-storage.webp`, 1536, 1024],
  [`${imageRoot}/oem-cable-attachment-sample-planning.webp`, 1536, 1024]
];

const english: GuideCopy = {
  locale: "en",
  path: "/resources/are-cable-machine-attachments-universal",
  title: "Are Cable Machine Attachments Universal? B2B Buyer Guide | PowerBaseFit",
  description: "Learn how to verify cable attachment fit, connectors, rotation, grips, commercial sets, quality checks, custom logo options and bulk OEM supply.",
  h1: "Are Cable Machine Attachments Universal? A Compatibility and OEM Buying Guide",
  primaryKeyword: "are cable machine attachments universal",
  secondaryKeywords: ["cable machine attachments", "gym cable handles", "commercial cable attachments", "cable attachment manufacturer", "custom logo gym handles", "OEM cable attachments", "wholesale cable handles"],
  intent: "commercial compatibility research and supplier evaluation",
  targetBuyer: "gym operators, distributors, importers and private-label fitness brands",
  home: "Home",
  library: "Resources",
  eyebrow: "PowerBaseFit · Cable attachment manufacturer",
  contactPath: "/contact",
  headings: {
    answer: "Quick answer",
    universal: "What does universal mean for a cable attachment?",
    verify: "How to verify connector compatibility before ordering",
    table: "Cable attachment specification table for buyers",
    lineup: "Which attachments belong in a commercial starter set?",
    machine: "Map the real machines and users before choosing the set",
    materials: "Compare steel, aluminum, rubber and textile components",
    motion: "Rotation, grip geometry and user handling",
    oem: "OEM, ODM, custom logo and private-label decisions",
    sample: "Approve a sample as a controlled product version",
    inspection: "Inspection and maintenance points for commercial use",
    packing: "Packaging, storage and repeat-order control",
    rfq: "What to send a cable attachment factory in an RFQ"
  },
  answer: [
    "Most removable cable handles and bars can be used across many cable stations when both sides use a compatible carabiner-and-eye connection. They are not automatically universal. The eye opening, material thickness, carabiner gate clearance, connector orientation, attachment length and available travel can change whether a product clips on, hangs correctly and preserves the intended exercise range.",
    "A commercial buyer should therefore verify the exact machine connection and operating envelope before ordering a mixed set. For bulk OEM or private-label supply, the approved record should also define the attachment type, material, finish, grip, rotating parts, logo method, packaging and inspection points. PowerBaseFit can review these items as a factory, but the final configuration must be confirmed for the selected models and machines."
  ],
  universal: [
    "In retail listings, universal usually means that an attachment has a common eye or D-ring intended for a standard snap hook. It does not establish a single worldwide dimension, a safety rating for every machine or a guarantee that every handle will clear guards and pulleys. A broad compatibility claim is only a starting point for measurement.",
    "Compatibility has two layers. Mechanical compatibility asks whether the connector can pass through the eye, close fully and align with the load path. Functional compatibility asks whether the bar or handle leaves enough cable travel, avoids the machine frame, suits one- or two-cable use and provides the grip position the facility actually needs. Both layers belong in the purchase review."
  ],
  verification: [
    ["Check the machine-side connector", "Record the carabiner or snap-hook body, gate opening, usable internal space and orientation. Photograph the closed connector beside a scale reference, and note whether the cable end rotates or remains fixed. A connector that barely enters an eye can bind when the attachment turns."],
    ["Check the attachment eye", "Confirm the internal opening, outer thickness, weld or strap construction and the direction in which the eye carries load. For the current PowerBaseFit range, compare the actual product drawing or sample from the cable machine attachments category rather than assuming every handle shares one eye."],
    ["Check the operating envelope", "Clip a representative sample to the real station, close the gate completely and move the unloaded cable through the intended path. Then follow the machine maker's operating instructions for controlled evaluation. The handle should not foul a shroud, pulley, frame member or storage peg."]
  ],
  tableColumns: ["Item to specify", "Why it matters", "Evidence to request"],
  tableRows: [
    ["Connector interface", "Determines whether the gate closes and the load path stays aligned", "Machine connector dimensions plus attachment-eye drawing or sample"],
    ["Overall attachment length", "Changes starting position and usable cable travel", "Dimension from connection eye to the furthest grip point"],
    ["Grip width and diameter", "Affects hand position, product segmentation and rack space", "Dimensioned drawing and physical sample"],
    ["Rotation or swivel", "Changes wrist freedom and cable twist behavior", "Construction description and sample movement check"],
    ["Core and grip material", "Changes mass, feel, surface care and replacement plan", "Component-level material statement"],
    ["Connection and weld areas", "Carry the working load through the attachment", "Model-specific construction record and agreed inspection method"],
    ["Finish and branding", "Affect corrosion care, appearance and batch matching", "Approved color or finish reference and artwork revision"],
    ["Packaging and labels", "Keep dense parts separated and preserve SKU identity", "Packing sample, carton list and pallet plan"],
    ["Use and maintenance", "Connects product choice to real facility traffic", "Facility brief, inspection points and care instructions"]
  ],
  checklist: [
    "Pair of single D-handles for crossovers, unilateral rows, curls and presses",
    "Lat pulldown bar sized for the stations and storage space",
    "Straight or angled rotating bar for curls and pressdowns",
    "Close-grip V or row handle for compact pulling positions",
    "Triceps rope with protected ends and an inspectable connection",
    "Ankle cuff only when lower-body cable work is in the program",
    "Compatible carabiners or snap hooks identified for each station",
    "A storage location that keeps connectors off walkways and wet floors",
    "Replacement rules for ropes, straps, grips and moving joints",
    "A SKU and carton plan for spare parts and future reorders"
  ],
  machine: [
    "Start with a machine inventory, not a catalog assortment. List functional trainers, cable crossovers, lat pulldowns, low rows and any rack-mounted pulley systems. Record whether a station uses one cable, two independent cables or a bridge accessory, because that changes the number and type of handles required.",
    "Then map users and peak demand. A distributor may need a compact set that is easy to merchandise; a commercial club may need duplicate D-handles and ropes so high-traffic stations stay usable; a hotel may prefer a smaller, clearly stored set. Avoid claiming that one bundle fits every facility merely because every piece can clip to the same hook."
  ],
  materials: [
    "Steel bars offer mass, familiar knurling and a robust product feel, but their surface and weld areas need suitable finish control and routine inspection. Aluminum reduces handling mass and can use anodized finishes, while geometry and connection construction still determine suitability. Rubber or urethane grips change comfort and cleaning behavior; textile straps and ropes add flexibility but introduce stitching, webbing and end-stop inspection points.",
    "Ask for a component-level statement. A product described only as metal, heavy duty or commercial grade leaves the core, grip, sleeve, fastener and connection point unclear. The sample should use the same material and construction route as the quoted production version, and any substitution should return to the buyer for review."
  ],
  motion: [
    "Rotation is useful when it follows the intended wrist or bar movement without forcing the cable to twist. It is not a universal requirement: some exercises and buyers prefer a fixed orientation. Specify which part rotates, how much play is acceptable, whether the grip itself turns and how the joint can be inspected over time.",
    "Grip shape should be chosen by use, not novelty. Compare effective grip width, diameter, angle, texture, edge treatment and clearance around the hand. A premium-looking handle can still be wrong if users cannot hold it comfortably, if a bar reduces travel or if aggressive texture conflicts with the facility's training style."
  ],
  oem: [
    "For OEM and private-label cable attachments, common project discussions include a logo on a compatible flat or end surface, finish or accent color, grip material, set composition, carton artwork, labels and bundled storage. ODM changes to geometry, connector design or rotating construction require a separate feasibility and sample review because they can affect tooling and the load path.",
    "Custom logo decisions should follow the real surface. Laser marking, printed elements, molded branding or applied badges do not suit every material or cleaning routine. Approve size, position, contrast and orientation on a representative sample, then connect that artwork revision to the SKU and packaging record.",
    "PowerBaseFit supplies gym handles and cable attachment sets for bulk projects, but no single minimum quantity, lead time or customization method should be assumed across the range. Send the product mix, quantities, destination and branding brief so feasibility can be checked model by model."
  ],
  sample: [
    "A sample is a controlled decision tool, not a general promise of quality. The approval sheet should identify the model, drawing revision, connector dimensions, materials, finish, grip, rotation, logo, weight, packaging and any accepted deviation. Photographs help with appearance, while measurable requirements need a method and recorded result.",
    "Test the sample on the buyer's actual cable stations where possible. Confirm gate closure, alignment, available travel, frame clearance, grip position, storage fit and cleaning compatibility. If the production specification changes after approval, issue a new revision rather than silently treating the old sample as representative."
  ],
  inspection: [
    "Incoming and routine checks should focus on the complete load path: attachment eye or D-ring, welds, fasteners, swivel, handle, rope, webbing, stitching and end stops. Look for deformation, cracks, unusual movement, corrosion, sharp edges, loose parts, damaged coverings or frayed textile. Remove a questionable item from use and follow the equipment supplier's instructions rather than improvising a repair.",
    "For production inspection, agree identity, dimensions, appearance, assembly, moving-part function, logo, quantity and packing checks for the exact order. Any load-related verification must name the method, sample and acceptance rule; a photograph or a generic material claim cannot substitute for a documented result."
  ],
  packing: [
    "Cable bars and steel handles are dense and can mark one another. Packing should separate finished surfaces, restrain heavy parts and protect protruding eyes without hiding the SKU label. Review the heaviest bar, small loose carabiners and textile products separately because they create different packing risks.",
    "Commercial facilities also need storage after delivery. A wall rack or station-side holder should keep attachments visible, dry and outside the walking path. For reorders, retain the approved drawing, material statement, finish reference, artwork, carton code and sample record so replacement pieces match the established range."
  ],
  rfq: [
    "Send each supplier the same RFQ: machine types and connector photographs, quantity by attachment, dimensions, materials, rotation, finish, logo files, packaging, destination, requested sample evidence and inspection expectations. Separate mandatory requirements from preferences and open questions. This makes quotations comparable without inventing a universal specification.",
    "The practical conclusion is simple: many attachments are broadly interchangeable, but fit must be verified. Choose the commercial set around real stations and users, approve one identifiable version, and keep its evidence for production and reorders. [Review PowerBaseFit cable machine attachments](/products/gym-accessories/cable-machine-attachments) or send your equipment list for a factory review."
  ],
  faq: [
    ["Do cable machine attachments fit every machine?", "No. Many use a common carabiner-and-eye connection, but gate clearance, eye dimensions, orientation, attachment length and machine geometry still need to be checked."],
    ["What should I measure before buying cable handles?", "Record the connector body and gate opening, usable internal space, attachment-eye opening and thickness, overall attachment length, grip dimensions and nearby machine clearances."],
    ["Which cable attachments should a commercial gym buy first?", "A practical base set usually includes paired D-handles, a lat bar, a straight or angled bar, a close-grip row handle and a triceps rope. Add cuffs and specialist grips only when the program needs them."],
    ["Are rotating cable handles better?", "They can provide useful wrist freedom and reduce cable twist for some movements, but a fixed grip may suit other exercises. Specify the intended movement and inspect the joint rather than treating rotation as automatically superior."],
    ["Can cable attachments carry a custom logo?", "Yes, on compatible models and surfaces. Confirm the logo method, size, position, contrast, cleaning exposure, quantity and sample before production."],
    ["What is the difference between OEM and ODM cable attachments?", "OEM usually adapts an existing model through branding, finish, set composition or packaging. ODM can change geometry or construction and therefore needs a deeper feasibility, sample and approval process."],
    ["How should a buyer inspect cable attachments?", "Check identity, dimensions, connector construction, welds, fasteners, rotation, grips, ropes, stitching, surface, logo, quantity and packing against the approved record."],
    ["Can a distributor order a mixed private-label set?", "A mixed set can be reviewed subject to model and project feasibility. Send the desired pieces, quantities, branding, packaging, destination and repeat-order plan for a model-specific response."]
  ],
  linkLabels: ["Browse commercial gym accessories", "View cable machine attachment sets", "Compare aluminum gym handles", "Compare solid steel gym handles", "Send a cable attachment RFQ"],
  imageCopy: [
    ["Commercial cable machine attachment set beside a dual pulley station", "A useful starter set is planned around the machines, users and storage available in the facility."],
    ["Carabiner, welded eye, D-ring and swivel eye shown for compatibility review", "Connector fit depends on gate clearance, eye geometry, thickness and load-path alignment."],
    ["Knurled steel, anodized aluminum and textured rubber cable handle grips", "Material and grip choices change handling, cleaning, appearance and replacement planning."],
    ["Organized cable bars, handles, rope and ankle cuff on commercial gym storage", "Dedicated storage keeps the set visible, dry and clear of the walking route."],
    ["Unbranded cable attachment samples with blank packaging and finish swatches", "A sample review connects construction, finish, branding and packaging before production approval."]
  ],
  cta: ["Discuss a cable attachment project", "Send your machine connections, attachment list, quantities, branding needs and destination for a model-specific review.", "Request a cable attachment quote"]
};

const portuguese: GuideCopy = {
  locale: "pt-BR",
  path: "/pt/blog/acessorios-cabo-polia-sao-universais",
  title: "Acessórios de Cabo São Universais? Guia de Compra B2B | PowerBaseFit",
  description: "Veja como conferir encaixe, mosquetão, giro, pegada, composição do kit, inspeção, logo personalizado e fornecimento OEM de puxadores para polia.",
  h1: "Acessórios para Máquina de Cabo São Universais? Guia de Compatibilidade e Compra OEM",
  primaryKeyword: "acessórios para máquina de cabo são universais",
  secondaryKeywords: ["puxadores para polia", "acessórios para crossover", "pegadores para academia", "fabricante de puxadores", "puxadores com logo", "acessórios OEM academia", "puxadores no atacado"],
  intent: "verificar compatibilidade e comprar acessórios de cabo para uso profissional",
  targetBuyer: "academias, distribuidores, importadores e marcas próprias no Brasil",
  home: "Início", library: "Blog", eyebrow: "PowerBaseFit · Fabricante de acessórios para cabo", contactPath: "/pt/contato",
  headings: {
    answer: "Resposta rápida", universal: "O que significa universal em um puxador para polia?", verify: "Como conferir o encaixe antes do pedido", table: "Especificação de acessórios de cabo para compradores", lineup: "Quais peças formam um kit inicial profissional?", machine: "Mapeie máquinas, usuários e horários de pico", materials: "Aço, alumínio, borracha e componentes têxteis", motion: "Giro, geometria da pegada e manuseio", oem: "OEM, ODM, logo personalizado e marca própria", sample: "Aprove uma amostra com versão controlada", inspection: "Inspeção e manutenção em academia", packing: "Embalagem, armazenamento e reposição", rfq: "O que enviar à fábrica na solicitação de cotação"
  },
  answer: [
    "Muitos puxadores e barras removíveis funcionam em várias máquinas de cabo quando o mosquetão fecha completamente no olhal. Isso não torna todas as peças universais. A abertura do mosquetão, a espessura do olhal, a orientação, o comprimento do acessório e o curso disponível da máquina podem mudar o encaixe e a posição inicial do exercício.",
    "Para uma academia, importador ou distribuidor, a compra deve começar pelas máquinas reais. Em um projeto OEM ou de marca própria, registre também material, acabamento, pegada, partes giratórias, logo, embalagem e pontos de inspeção. Como fábrica, a PowerBaseFit pode revisar a combinação, mas cada modelo e conexão precisam de confirmação."
  ],
  universal: [
    "No varejo brasileiro, universal costuma indicar um olhal ou argola para mosquetão comum. A palavra não define uma medida mundial nem comprova que o acessório trabalha corretamente em todo crossover, estação funcional ou puxador alto. Trate a promessa como um convite para medir.",
    "Há compatibilidade mecânica e funcional. A primeira verifica se o mosquetão entra, fecha e fica alinhado. A segunda avalia se a barra não encosta na carenagem, se o curso continua útil, se o acessório atende um ou dois cabos e se a pegada combina com o público da academia."
  ],
  verification: [
    ["Meça o lado da máquina", "Registre corpo, abertura do gatilho, espaço interno e orientação do mosquetão. Fotografe a conexão fechada com uma referência de escala e informe se a ponta do cabo gira."],
    ["Confira o olhal do acessório", "Peça abertura interna, espessura externa, construção da solda ou da fita e desenho da peça. Compare o modelo escolhido na linha de acessórios de cabo da PowerBaseFit, sem presumir medidas iguais em todos os puxadores."],
    ["Teste o espaço de operação", "Conecte uma amostra à estação real, feche o mosquetão e mova o cabo sem carga pelo percurso pretendido. Depois siga as instruções do fabricante da máquina para a avaliação controlada e verifique contato com polias, carenagens e estrutura."]
  ],
  tableColumns: ["Item", "Por que importa", "Evidência solicitada"],
  tableRows: [
    ["Interface de conexão", "Define fechamento e alinhamento", "Medidas do mosquetão e desenho ou amostra do olhal"],
    ["Comprimento total", "Muda posição inicial e curso útil", "Medida do olhal ao ponto mais distante da pegada"],
    ["Largura e diâmetro", "Afetam conforto, linha e armazenamento", "Desenho cotado e amostra física"],
    ["Giro", "Muda liberdade do punho e torção do cabo", "Descrição do conjunto e teste da amostra"],
    ["Núcleo e revestimento", "Mudam massa, limpeza e aparência", "Declaração de material por componente"],
    ["Soldas e fixações", "Transferem a carga pelo acessório", "Construção do modelo e método de inspeção"],
    ["Acabamento e marca", "Afetam conservação e repetição de lote", "Referência aprovada e revisão da arte"],
    ["Embalagem", "Separa peças pesadas e preserva o SKU", "Amostra de embalagem, lista e paletização"]
  ],
  checklist: ["Par de puxadores D para crossover e movimentos unilaterais", "Barra para puxada alta dimensionada para a estação", "Barra reta ou angulada com giro para braços", "Triângulo ou puxador fechado para remada", "Corda de tríceps com terminais e conexão inspecionáveis", "Tornozeleira somente quando o programa prevê exercícios de pernas", "Mosquetões compatíveis identificados por estação", "Suporte que mantenha as peças fora da circulação", "Regra de troca para corda, fita, revestimento e giro", "Código de SKU e caixa para peças de reposição"],
  machine: [
    "Faça uma lista de crossovers, estações funcionais, puxadas altas, remadas baixas e sistemas de polia em racks. Anote se cada equipamento usa um cabo, dois cabos independentes ou uma ponte, pois isso define quantidade e tipo de pegadores.",
    "No Brasil, uma academia cheia pode precisar de pares extras de puxadores e cordas; um hotel pode preferir um conjunto menor e bem organizado; um distribuidor precisa de uma composição fácil de explicar e repor. O kit deve refletir o uso, não apenas o número de peças no catálogo."
  ],
  materials: [
    "Barras de aço oferecem peso e sensação tradicional, mas pedem controle de solda, acabamento e oxidação. Alumínio reduz o peso de manuseio e pode receber anodização. Borracha ou PU alteram conforto e limpeza. Corda, fita e costura trazem flexibilidade, porém criam pontos próprios de desgaste.",
    "Peça uma lista por componente. Termos como metal resistente ou uso profissional não esclarecem núcleo, pegada, luva, fixador e olhal. A amostra deve usar a mesma construção da versão cotada."
  ],
  motion: [
    "O giro ajuda quando acompanha o punho sem torcer o cabo, mas nem toda aplicação precisa de peça giratória. Defina qual parte gira, a folga aceitável e como o movimento será verificado no recebimento e durante a manutenção.",
    "Compare diâmetro, largura, ângulo, textura, bordas e espaço para as mãos. Uma pegada chamativa pode reduzir o curso ou incomodar diferentes usuários. Para clubes, a aceitação do público e a rotina de limpeza pesam tanto quanto o visual."
  ],
  oem: [
    "Em pedidos OEM, são comuns logo em superfície compatível, cor de detalhe, acabamento, material da pegada, composição do kit, etiqueta e caixa de marca própria. Mudanças ODM em geometria, olhal ou sistema de giro exigem análise separada porque podem afetar ferramenta e caminho de carga.",
    "O método do logo deve respeitar material, curvatura e produtos de limpeza. Aprove tamanho, posição, contraste e orientação na amostra e vincule a revisão da arte ao SKU e à embalagem.",
    "A PowerBaseFit fornece puxadores e conjuntos para projetos em volume. Quantidade mínima, prazo e personalização variam por modelo; envie mix, quantidades, destino e necessidade de marca para uma avaliação específica."
  ],
  sample: ["A ficha da amostra deve identificar modelo, desenho, conexão, materiais, acabamento, pegada, giro, logo, peso e embalagem. Foto confirma aparência; dimensão exige instrumento, unidade, resultado e critério.", "Teste na máquina real: fechamento do mosquetão, alinhamento, curso, contato com estrutura, posição da mão, encaixe no suporte e limpeza. Se a especificação mudar, emita nova revisão antes de produzir."],
  inspection: ["Inspecione todo o caminho de carga: olhal ou argola, solda, fixador, giro, barra, corda, fita, costura e terminal. Deformação, trinca, folga anormal, corrosão, aresta, peça solta ou tecido danificado exigem retirada de uso e orientação do fornecedor.", "Na inspeção do lote, combine identidade, dimensões, aparência, montagem, movimento, logo, quantidade e embalagem. Qualquer verificação ligada à carga precisa de método e regra acordados; foto não comprova sozinha."],
  packing: ["Barras e pegadores densos podem riscar uns aos outros. A caixa deve separar superfícies, imobilizar peças e proteger olhais, mantendo o SKU legível. Avalie barras pesadas, mosquetões soltos e têxteis como riscos distintos.", "Após a entrega, um suporte de parede ou da própria estação mantém o conjunto visível, seco e fora da passagem. Para reposição, guarde desenho, materiais, acabamento, arte, código de caixa e registro da amostra."],
  rfq: ["Envie a mesma solicitação aos fornecedores: fotos e medidas das conexões, quantidade por peça, dimensões, materiais, giro, acabamento, logo, embalagem, destino, amostra e inspeção esperada. Separe requisito obrigatório, preferência e dúvida aberta.", "A conclusão para o comprador é direta: muitos acessórios são intercambiáveis, mas o encaixe deve ser comprovado. [Veja os conjuntos de acessórios para máquina de cabo](/pt/produtos/acessorios-de-academia/acessorios-para-maquinas-de-cabos) ou envie sua lista para revisão da fábrica."],
  faq: [
    ["Todo puxador para polia serve em qualquer máquina?", "Não. Muitos usam mosquetão e olhal comuns, mas abertura, espessura, orientação, comprimento e espaço da máquina precisam ser conferidos."],
    ["O que medir antes de comprar acessórios para crossover?", "Meça o mosquetão, abertura do gatilho, espaço interno, olhal, espessura, comprimento total, dimensões da pegada e folgas próximas à estrutura."],
    ["Quais puxadores uma academia deve comprar primeiro?", "Par de puxadores D, barra de puxada, barra curta, triângulo de remada e corda de tríceps formam uma base prática. Acrescente peças conforme o programa."],
    ["Puxador giratório é melhor?", "Pode favorecer alguns movimentos, mas não é superior em toda aplicação. Avalie o exercício, a construção e a manutenção do giro."],
    ["É possível colocar logo nos puxadores?", "Sim, em modelos e superfícies compatíveis. Método, posição, contraste, quantidade e amostra precisam ser confirmados."],
    ["Qual é a diferença entre OEM e ODM?", "OEM costuma adaptar um modelo existente com marca, acabamento, kit ou embalagem. ODM pode alterar geometria e construção, exigindo análise e amostra mais profundas."],
    ["Como inspecionar acessórios de cabo?", "Compare identificação, dimensões, olhal, soldas, fixadores, giro, pegadas, corda, costura, acabamento, logo, quantidade e embalagem com a versão aprovada."],
    ["Posso pedir um kit misto com marca própria?", "O kit misto pode ser avaliado conforme modelos e projeto. Envie peças, quantidades, logo, embalagem, destino e plano de reposição."]
  ],
  linkLabels: ["Ver acessórios profissionais", "Ver conjuntos para máquina de cabo", "Comparar puxadores de alumínio", "Comparar puxadores de aço", "Enviar cotação de acessórios"],
  imageCopy: [
    ["Conjunto profissional de acessórios para cabo ao lado de uma estação de polias", "O kit inicial deve refletir máquinas, usuários e espaço de armazenamento."],
    ["Mosquetão, olhal soldado, argola e olhal giratório para conferir encaixe", "O encaixe depende da abertura, geometria, espessura e alinhamento."],
    ["Pegadas de aço recartilhado, alumínio anodizado e borracha texturizada", "Materiais mudam manuseio, limpeza, aparência e reposição."],
    ["Barras, puxadores, corda e tornozeleira organizados em suporte de academia", "Armazenamento dedicado mantém as peças secas e fora da circulação."],
    ["Amostras de acessórios sem marca com embalagem e opções de acabamento", "A amostra conecta construção, acabamento, marca e embalagem antes da aprovação."]
  ],
  cta: ["Converse sobre seu projeto de acessórios", "Envie conexões das máquinas, lista de peças, quantidades, marca e destino para uma revisão por modelo.", "Solicitar cotação"]
};

const spanish: GuideCopy = {
  locale: "es",
  path: "/es/blog/accesorios-poleas-gimnasio-universales",
  title: "¿Los Accesorios para Poleas Son Universales? Guía B2B | PowerBaseFit",
  description: "Aprenda a comprobar mosquetón, anilla, giro, agarre, kit profesional, inspección, logo personalizado y suministro OEM de accesorios para poleas.",
  h1: "¿Los Accesorios para Poleas de Gimnasio Son Universales? Guía de Compatibilidad y Compra OEM",
  primaryKeyword: "accesorios para poleas universales",
  secondaryKeywords: ["agarres para poleas", "accesorios cable gimnasio", "manijas para crossover", "fabricante de agarres", "agarres con logo", "accesorios OEM gimnasio", "agarres al por mayor"],
  intent: "comprobar compatibilidad y evaluar suministro profesional de accesorios para poleas",
  targetBuyer: "gimnasios, distribuidores, importadores y marcas privadas",
  home: "Inicio", library: "Blog", eyebrow: "PowerBaseFit · Fabricante de accesorios para poleas", contactPath: "/es/contacto",
  headings: { answer: "Respuesta rápida", universal: "Qué significa universal en un accesorio de polea", verify: "Cómo verificar la conexión antes de comprar", table: "Tabla de especificaciones para compradores", lineup: "Qué incluir en un kit profesional inicial", machine: "Mapear máquinas, usuarios y demanda", materials: "Acero, aluminio, goma y componentes textiles", motion: "Giro, geometría del agarre y uso", oem: "OEM, ODM, logo personalizado y marca privada", sample: "Aprobar una muestra como versión controlada", inspection: "Inspección y mantenimiento en uso profesional", packing: "Embalaje, almacenamiento y reposición", rfq: "Qué enviar a la fábrica en la RFQ" },
  answer: ["Muchos agarres y barras desmontables sirven en distintas máquinas cuando el mosquetón entra en la anilla y cierra por completo. No existe garantía automática de universalidad. La apertura, el grosor, la orientación, la longitud del accesorio y el recorrido disponible pueden cambiar el montaje y la posición del usuario.", "El comprador profesional debe revisar la conexión y el espacio de trabajo de las máquinas reales. En un pedido OEM o de marca privada también se fijan material, acabado, agarre, piezas giratorias, logo, embalaje e inspección. PowerBaseFit puede estudiar la configuración como fábrica, siempre sujeta al modelo elegido."],
  universal: ["En muchas tiendas, universal solo indica una anilla pensada para un mosquetón habitual. No define una medida mundial, una capacidad válida para todas las máquinas ni la ausencia de interferencias con carcasas y poleas.", "La compatibilidad mecánica confirma entrada, cierre y alineación. La funcional comprueba recorrido, espacio, uso con uno o dos cables, posición de las manos y almacenamiento. Un producto puede superar la primera y fallar la segunda."],
  verification: [["Documente el lado de la máquina", "Mida el cuerpo del mosquetón, apertura del gatillo, espacio interior y orientación. Indique si el terminal del cable gira y aporte una fotografía cerrada con referencia de escala."], ["Revise la anilla del accesorio", "Pida abertura interior, grosor, soldadura o costura y dirección de carga. Compare el dibujo o la muestra del modelo concreto de accesorios para cable de PowerBaseFit."], ["Compruebe el espacio de trabajo", "Monte una muestra, cierre el mosquetón y recorra el cable sin carga. Después siga las instrucciones del fabricante de la máquina para la evaluación y confirme que no roza carcasa, polea, bastidor ni soporte."]],
  tableColumns: ["Dato", "Por qué importa", "Evidencia"],
  tableRows: [["Interfaz de conexión", "Permite cerrar y alinear la carga", "Medidas de mosquetón y anilla"], ["Longitud total", "Modifica inicio y recorrido útil", "Medida desde la anilla al extremo"], ["Ancho y diámetro de agarre", "Afectan uso, catálogo y almacenamiento", "Plano acotado y muestra"], ["Giro", "Cambia libertad de muñeca y torsión", "Descripción y prueba de muestra"], ["Materiales", "Cambian masa, tacto y limpieza", "Declaración por componente"], ["Soldaduras y fijaciones", "Transmiten la carga", "Construcción y método de inspección"], ["Acabado y marca", "Influyen en conservación y repetición", "Referencia y arte aprobados"], ["Embalaje", "Protege superficies y SKU", "Muestra de caja y plan de pallet"]],
  checklist: ["Pareja de agarres D para crossover y trabajo unilateral", "Barra de jalón adecuada al espacio", "Barra recta o curva giratoria", "Agarre V o de remo compacto", "Cuerda de tríceps inspeccionable", "Tobillera cuando el programa la necesite", "Mosquetones compatibles identificados", "Soporte fuera de la zona de paso", "Criterio de sustitución para piezas de desgaste", "Plan de SKU y repuestos"],
  machine: ["Inventaríe estaciones funcionales, crossover, jalón, remo y poleas de rack. Anote si trabajan con uno o dos cables y qué accesorios ya incluyen.", "Un club concurrido puede necesitar duplicados; un hotel, un kit reducido y ordenado; un distribuidor, una composición fácil de vender y reponer. La selección debe seguir la operación, no el tamaño del paquete."],
  materials: ["El acero aporta masa y moleteado tradicional; el aluminio facilita el manejo; goma y uretano cambian tacto y limpieza; cuerda y cinta aportan flexibilidad con costuras y terminales que revisar.", "Solicite material por componente. Metal resistente o uso comercial no identifica núcleo, mango, manguito, fijador y anilla. La muestra debe representar la construcción cotizada."],
  motion: ["El giro puede acompañar la muñeca y limitar la torsión del cable, pero no todas las aplicaciones lo requieren. Defina qué pieza gira, la holgura admisible y la forma de inspección.", "Compare diámetro, ancho, ángulo, textura, bordes y espacio para la mano. La ergonomía y el recorrido real importan más que una forma llamativa."],
  oem: ["En OEM suelen personalizarse logo, acabado, color de detalle, material de agarre, composición del kit, etiqueta y caja. Cambios ODM en geometría, anilla o mecanismo necesitan otro análisis porque afectan herramienta y construcción.", "El logo debe aprobarse sobre la superficie real, con tamaño, posición, contraste, orientación y exposición a limpieza. Vincule la revisión del arte al SKU.", "PowerBaseFit suministra agarres y kits por proyecto. Cantidad mínima, plazo y personalización dependen del modelo; envíe mezcla, cantidades, destino y marca para confirmar viabilidad."],
  sample: ["La ficha de muestra identifica modelo, plano, conexión, materiales, acabado, agarre, giro, logo, peso y embalaje. La foto sirve para apariencia; una medida necesita método y resultado.", "Pruebe cierre, alineación, recorrido, interferencias, postura, soporte y limpieza en la máquina real. Si cambia la especificación, apruebe una nueva revisión."],
  inspection: ["Revise anilla, soldadura, fijador, giro, barra, cuerda, cinta, costura y terminal. Deformación, grieta, juego anormal, corrosión, borde vivo o tejido dañado exige retirar la pieza y consultar las instrucciones aplicables.", "Para el lote, acuerde identidad, dimensiones, aspecto, montaje, movimiento, logo, cantidad y embalaje. Toda comprobación relacionada con carga requiere método y criterio escritos."],
  packing: ["Las barras y piezas densas deben quedar separadas e inmóviles. Proteja las anillas sin ocultar el SKU y evalúe por separado barras pesadas, mosquetones y textiles. Antes de cerrar el embalaje, confirme que cada referencia se puede identificar sin abrir todos los bultos y que la distribución evita el contacto entre superficies. El importador también debe revisar cómo se moverán y almacenarán las cajas al llegar, porque una protección adecuada depende del peso, la forma y la mezcla real del pedido.", "En la sala, use un soporte visible, seco y fuera del paso. Para reponer, archive plano, materiales, acabado, arte, caja y muestra aprobada."],
  rfq: ["Envíe la misma RFQ: fotos y medidas de conexión, cantidades, dimensiones, materiales, giro, acabado, logo, embalaje, destino, muestra e inspección. Distinga obligatorio, preferido y por confirmar.", "La idea clave es que muchos accesorios son intercambiables, pero el encaje debe demostrarse. [Consulte los kits para máquinas de cable](/es/productos/accesorios-de-gimnasio/accesorios-para-maquinas-de-poleas) o comparta su lista con la fábrica."],
  faq: [["¿Todos los agarres sirven para cualquier polea?", "No. Aunque muchos usan un mosquetón común, hay que comprobar abertura, grosor, orientación, longitud y espacio de la máquina."], ["¿Qué debo medir?", "Mosquetón, gatillo, espacio interior, anilla, grosor, longitud, agarre y holguras del bastidor."], ["¿Qué piezas compro primero?", "Pareja de agarres D, barra de jalón, barra corta, agarre de remo y cuerda forman una base práctica."], ["¿Es mejor un agarre giratorio?", "Puede ser útil en algunos movimientos, pero no es universalmente mejor. Evalúe ejercicio, construcción y mantenimiento."], ["¿Se puede añadir un logo?", "Sí, en modelos compatibles y tras aprobar método, posición, contraste, cantidad y muestra."], ["¿OEM y ODM son iguales?", "OEM adapta un modelo existente; ODM puede cambiar geometría o construcción y necesita mayor validación."], ["¿Cómo se inspeccionan?", "Compare conexión, soldaduras, fijaciones, giro, agarres, textiles, acabado, logo, cantidad y embalaje."], ["¿Puedo pedir un kit mixto?", "Sí, sujeto a viabilidad. Envíe piezas, cantidades, marca, embalaje, destino y plan de reposición."]],
  linkLabels: ["Ver accesorios profesionales", "Ver kits para máquinas de cable", "Comparar agarres de aluminio", "Comparar agarres de acero", "Enviar RFQ de accesorios"],
  imageCopy: [["Kit profesional de accesorios para cable junto a una estación de poleas", "El kit debe responder a máquinas, usuarios y almacenamiento."], ["Mosquetón y distintos tipos de anilla para revisar compatibilidad", "El encaje depende de abertura, geometría, grosor y alineación."], ["Agarres de acero moleteado, aluminio anodizado y goma texturizada", "El material cambia tacto, limpieza y reposición."], ["Barras, agarres, cuerda y tobillera ordenados en un soporte", "El almacenamiento mantiene las piezas secas y fuera del paso."], ["Muestras sin marca con embalaje y opciones de acabado", "La muestra une construcción, acabado, marca y embalaje."]],
  cta: ["Defina su proyecto de accesorios", "Envíe conexiones, lista, cantidades, personalización y destino para una revisión por modelo.", "Solicitar cotización"]
};

const german: GuideCopy = {
  locale: "de",
  path: "/de/blog/kabelzug-griffe-universal-kompatibilitaet",
  title: "Sind Kabelzug-Griffe Universal? B2B-Einkaufsleitfaden | PowerBaseFit",
  description: "So prüfen Einkäufer Karabiner, Öse, Drehgelenk, Griff, Studio-Set, Kontrolle, Logo und OEM-Beschaffung von Kabelzug-Zubehör.",
  h1: "Sind Kabelzug-Griffe Universal? Leitfaden zu Kompatibilität und OEM-Beschaffung",
  primaryKeyword: "Kabelzug Griffe universal",
  secondaryKeywords: ["Kabelzug Zubehör", "Griffe für Kabelmaschine", "Latzug Griffe", "Kabelzug Hersteller", "Griffe mit Logo", "OEM Fitness Zubehör", "Kabelzug Griffe Großhandel"],
  intent: "Kompatibilität prüfen und gewerbliche Kabelzug-Griffe beschaffen",
  targetBuyer: "Fitnessstudios, Händler, Importeure und Eigenmarken",
  home: "Startseite", library: "Ratgeber", eyebrow: "PowerBaseFit · Hersteller für Kabelzug-Zubehör", contactPath: "/de/kontakt",
  headings: { answer: "Direkte Antwort", universal: "Was bedeutet universal bei Kabelzug-Zubehör?", verify: "Anschluss vor der Bestellung prüfen", table: "Spezifikationstabelle für Einkäufer", lineup: "Grundausstattung für ein gewerbliches Studio", machine: "Maschinenbestand und Nutzung zuerst erfassen", materials: "Stahl, Aluminium, Gummi und Textil", motion: "Drehung, Griffgeometrie und Handhabung", oem: "OEM, ODM, Logo und Eigenmarke", sample: "Muster als kontrollierte Version freigeben", inspection: "Kontrolle und Wartung im Studiobetrieb", packing: "Verpackung, Aufbewahrung und Nachbestellung", rfq: "Angaben für die Anfrage an den Hersteller" },
  answer: ["Viele abnehmbare Kabelzug-Griffe passen an verschiedene Stationen, wenn Karabiner und Öse zusammenpassen und der Verschluss vollständig schließt. Automatisch universal sind sie nicht. Öffnung, Materialstärke, Ausrichtung, Baulänge und nutzbarer Kabelweg können Anschluss und Übungsposition verändern.", "Gewerbliche Einkäufer prüfen deshalb die reale Maschine. Bei OEM- oder Eigenmarkenprojekten gehören Material, Oberfläche, Griff, Drehteile, Logo, Verpackung und Prüfmerkmale in denselben freigegebenen Datensatz. PowerBaseFit kann die Ausführung als Hersteller modellbezogen prüfen."],
  universal: ["Universal bedeutet im Handel meist nur eine übliche Öse für einen Standardkarabiner. Der Begriff legt weder ein weltweit einheitliches Maß noch die Eignung für jede Kabelmaschine fest.", "Mechanische Kompatibilität betrifft Einhängen, Schließen und Lastausrichtung. Funktionale Kompatibilität umfasst Bewegungsweg, Freiraum, Ein- oder Zweikabelbetrieb, Griffposition und Aufbewahrung. Beide Ebenen müssen stimmen."],
  verification: [["Maschinenseite dokumentieren", "Karabinerkörper, Schnapperöffnung, nutzbaren Innenraum und Ausrichtung messen. Festhalten, ob sich das Kabelende drehen kann."], ["Öse des Zubehörs prüfen", "Innenöffnung, Außenstärke, Schweiß- oder Gurtaufbau und Lastrichtung anfordern. Zeichnung oder Muster des konkreten PowerBaseFit-Modells vergleichen."], ["Arbeitsraum prüfen", "Muster einhängen, Verschluss schließen und den unbelasteten Kabelweg kontrollieren. Anschließend nach Herstelleranleitung testen und Kontakt mit Verkleidung, Rolle, Rahmen oder Halter ausschließen."]],
  tableColumns: ["Merkmal", "Bedeutung", "Nachweis"],
  tableRows: [["Anschluss", "Sicheres Schließen und Ausrichtung", "Maße von Karabiner und Öse"], ["Gesamtlänge", "Startposition und Kabelweg", "Maß von Öse bis Griffende"], ["Griffmaße", "Handlage und Platzbedarf", "Bemaßte Zeichnung und Muster"], ["Drehgelenk", "Handgelenkbewegung und Kabeldrall", "Aufbau und Funktionsprüfung"], ["Material", "Gewicht, Haptik und Pflege", "Komponentenbezogene Angabe"], ["Schweißung/Befestigung", "Überträgt die Belastung", "Modellaufbau und Prüfverfahren"], ["Oberfläche/Logo", "Pflege und Chargengleichheit", "Freigegebene Referenz"], ["Verpackung", "Schützt Teile und SKU", "Packmuster und Palettenplan"]],
  checklist: ["Paar Einhandgriffe für Crossover und einseitige Übungen", "Latzugstange passend zu Station und Halter", "Gerade oder gebogene Drehstange", "Enger V- oder Rudergriff", "Trizepsseil mit prüfbaren Enden", "Fußmanschette nur bei geplantem Einsatz", "Zugeordnete kompatible Karabiner", "Trockener Halter außerhalb des Laufwegs", "Austauschregel für Verschleißteile", "SKU- und Ersatzteilplan"],
  machine: ["Erfassen Sie Functional Trainer, Cable Crossover, Latzug, Ruderzug und Rack-Seilzüge. Notieren Sie Einzel- oder Doppelkabel und vorhandenes Zubehör.", "Ein stark besuchtes Studio braucht eventuell doppelte Griffe; ein Hotel eine übersichtliche kleine Auswahl; ein Händler ein verständliches Set mit Nachkaufmöglichkeit. Die Nutzung entscheidet, nicht die Stückzahl im Koffer."],
  materials: ["Stahl vermittelt Masse und klassische Rändelung, Aluminium erleichtert das Umhängen, Gummi oder Urethan verändern Reinigung und Griffgefühl. Seil und Gurt bringen Beweglichkeit, dafür müssen Nähte und Endstücke geprüft werden.", "Fordern Sie Materialangaben je Bauteil. Begriffe wie Metall oder Profiqualität beschreiben Kern, Griff, Hülse, Befestigung und Öse nicht ausreichend."],
  motion: ["Ein Drehgelenk kann der Handbewegung folgen und Kabeldrall reduzieren. Es ist nicht für jede Übung zwingend besser. Legen Sie fest, welches Teil dreht, welches Spiel zulässig ist und wie der Zustand geprüft wird.", "Durchmesser, Breite, Winkel, Textur, Kanten und Handfreiraum bestimmen den praktischen Nutzen. Eine auffällige Form darf weder Bewegungsweg noch Bedienkomfort verschlechtern."],
  oem: ["Bei OEM-Projekten werden häufig Logo, Oberfläche, Akzentfarbe, Griffmaterial, Setumfang, Etikett und Karton angepasst. ODM-Änderungen an Geometrie, Öse oder Drehaufbau benötigen eine eigene Machbarkeits- und Musterprüfung.", "Logoart, Größe, Position, Kontrast und Reinigungseinfluss werden am realen Muster freigegeben und mit SKU sowie Verpackungsversion verknüpft.", "PowerBaseFit liefert Griffe und Sets projektbezogen. Mindestmenge, Zeit und Individualisierung hängen vom Modell ab; Produktmix, Mengen, Zielort und Markenbrief sind vorab zu prüfen."],
  sample: ["Das Musterblatt nennt Modell, Zeichnung, Anschluss, Material, Oberfläche, Griff, Drehung, Logo, Gewicht und Packung. Fotos dokumentieren Optik, Messmerkmale brauchen Methode und Ergebnis.", "Prüfen Sie Schließen, Ausrichtung, Kabelweg, Rahmenfreiheit, Handlage, Halter und Reinigung an der echten Station. Änderungen führen zu einer neuen Freigabeversion."],
  inspection: ["Kontrollieren Sie Öse, Schweißung, Befestiger, Drehteil, Griff, Seil, Gurt, Naht und Endstopper. Verformung, Riss, ungewöhnliches Spiel, Korrosion, scharfe Kante oder Textilschaden erfordern Sperrung und Herstellerhinweis.", "Für die Serie sind Identität, Maße, Optik, Montage, Bewegung, Logo, Menge und Verpackung zu vereinbaren. Belastungsbezogene Nachweise brauchen ein schriftliches Verfahren und Kriterium."],
  packing: ["Schwere Stangen und Griffe werden getrennt und gegen Bewegung gesichert. Ösen brauchen Schutz, ohne die SKU-Kennzeichnung zu verdecken. Stangen, lose Karabiner und Textilien sind getrennt zu bewerten.", "Im Studio hält eine Wand- oder Stationshalterung die Teile sichtbar, trocken und aus dem Laufweg. Zeichnung, Material, Oberfläche, Artwork, Kartoncode und Muster bleiben für Nachbestellungen archiviert."],
  rfq: ["Senden Sie allen Anbietern dieselbe Anfrage: Anschlussfotos und Maße, Stückzahl, Abmessungen, Material, Drehung, Oberfläche, Logo, Verpackung, Zielort, Muster- und Prüferwartung. Trennen Sie Muss, Wunsch und offene Frage.", "Viele Kabelzug-Griffe sind breit einsetzbar, doch die Passung muss belegt werden. [Kabelzug-Sets von PowerBaseFit ansehen](/de/produkte/fitnesszubehoer/kabelzug-zubehoer-set) oder Maschinenliste zur Herstellerprüfung senden."],
  faq: [["Passen alle Griffe an jede Kabelmaschine?", "Nein. Karabiner, Öse, Ausrichtung, Länge und Freiraum müssen zusammenpassen."], ["Was muss ich messen?", "Karabiner, Schnapperöffnung, Innenraum, Öse, Stärke, Gesamtlänge, Griff und Rahmenabstand."], ["Welche Grundausstattung ist sinnvoll?", "Einhandgriffe, Latzugstange, kurze Stange, Rudergriff und Trizepsseil bilden eine praktische Basis."], ["Sind Drehgriffe besser?", "Sie können bei bestimmten Bewegungen helfen, sind aber nicht grundsätzlich besser. Einsatz und Gelenkaufbau entscheiden."], ["Ist ein Logo möglich?", "Ja, bei geeigneten Modellen nach Freigabe von Verfahren, Position, Kontrast, Menge und Muster."], ["Was unterscheidet OEM und ODM?", "OEM passt meist ein bestehendes Modell an; ODM kann Konstruktion und Geometrie ändern und braucht tiefere Prüfung."], ["Wie werden die Teile kontrolliert?", "Anschluss, Schweißung, Befestiger, Drehung, Griff, Textil, Oberfläche, Logo, Menge und Packung werden gegen die Freigabe geprüft."], ["Sind gemischte Sets möglich?", "Projektbezogen ja. Teilen Sie Umfang, Mengen, Marke, Verpackung, Ziel und Nachbestellplan mit."]],
  linkLabels: ["Fitness-Zubehör ansehen", "Kabelzug-Sets ansehen", "Aluminiumgriffe vergleichen", "Stahlgriffe vergleichen", "Anfrage senden"],
  imageCopy: [["Gewerbliches Kabelzug-Zubehör neben einer Doppelzugstation", "Das Set folgt Maschinen, Nutzergruppen und Aufbewahrung."], ["Karabiner und unterschiedliche Anschlussösen im Vergleich", "Öffnung, Geometrie, Stärke und Ausrichtung bestimmen die Passung."], ["Gerändelte Stahl-, Aluminium- und Gummigriffe", "Material verändert Haptik, Pflege und Ersatzplanung."], ["Stangen, Griffe, Seil und Manschette an einer Studiohalterung", "Geordnete Aufbewahrung hält Zubehör trocken und aus dem Laufweg."], ["Unmarkierte Muster mit Verpackung und Oberflächenoptionen", "Das Muster verbindet Konstruktion, Oberfläche, Marke und Packung."]],
  cta: ["Kabelzug-Projekt besprechen", "Senden Sie Anschlüsse, Teileliste, Mengen, Marke und Zielort für eine modellbezogene Prüfung.", "Angebot anfragen"]
};

const french: GuideCopy = {
  locale: "fr",
  path: "/fr/blog/poignees-poulie-universelles-compatibilite",
  title: "Les Poignées de Poulie Sont-elles Universelles ? Guide B2B | PowerBaseFit",
  description: "Vérifiez mousqueton, œillet, rotation, prise, kit professionnel, contrôle, logo et approvisionnement OEM des accessoires de tirage.",
  h1: "Les Poignées de Poulie Sont-elles Universelles ? Guide de Compatibilité et d'Achat OEM",
  primaryKeyword: "poignées de poulie universelles",
  secondaryKeywords: ["accessoires de tirage", "poignées machine à câble", "barres de tirage", "fabricant poignées poulie", "poignées avec logo", "accessoires fitness OEM", "poignées de tirage grossiste"],
  intent: "vérifier la compatibilité et sélectionner un fournisseur professionnel d'accessoires de tirage",
  targetBuyer: "salles de sport, distributeurs, importateurs et marques privées",
  home: "Accueil", library: "Guides", eyebrow: "PowerBaseFit · Fabricant d'accessoires de tirage", contactPath: "/fr/contact",
  headings: { answer: "Réponse directe", universal: "Que veut dire universel pour une poignée de poulie ?", verify: "Vérifier la connexion avant la commande", table: "Tableau de spécification pour l'acheteur", lineup: "Composer un kit initial pour salle professionnelle", machine: "Partir du parc de machines et des utilisateurs", materials: "Acier, aluminium, revêtements et textile", motion: "Rotation, géométrie de prise et manipulation", oem: "OEM, ODM, logo et marque privée", sample: "Valider un échantillon comme version contrôlée", inspection: "Inspection et entretien en exploitation", packing: "Emballage, rangement et réassort", rfq: "Informations à envoyer à l'usine" },
  answer: ["De nombreuses poignées amovibles se montent sur plusieurs machines lorsque le mousqueton entre dans l'œillet et se referme entièrement. Elles ne sont pas automatiquement universelles. Ouverture, épaisseur, orientation, longueur de l'accessoire et course disponible peuvent modifier le montage et la position de départ.", "Un acheteur professionnel vérifie donc les machines réelles. Pour un projet OEM ou de marque privée, il fige aussi matériaux, finition, prise, pièces tournantes, logo, emballage et contrôles. PowerBaseFit peut étudier cet ensemble en tant qu'usine, modèle par modèle."],
  universal: ["Dans une fiche produit, universel signifie souvent qu'un œillet accepte un mousqueton courant. Le mot ne fixe ni dimension mondiale ni compatibilité avec toutes les poulies professionnelles.", "La compatibilité mécanique concerne l'accrochage, la fermeture et l'alignement. La compatibilité fonctionnelle couvre la course, les dégagements, l'usage à un ou deux câbles, la position des mains et le rangement."],
  verification: [["Relever le côté machine", "Mesurez le corps du mousqueton, l'ouverture du doigt, l'espace intérieur et l'orientation. Notez si l'embout du câble pivote."], ["Contrôler l'œillet", "Demandez ouverture intérieure, épaisseur, soudure ou sangle et sens de charge. Comparez le plan ou l'échantillon du modèle PowerBaseFit retenu."], ["Valider l'encombrement", "Montez l'échantillon, fermez le mousqueton et parcourez le mouvement sans charge. Suivez ensuite la notice de la machine et contrôlez tout contact avec carter, poulie, châssis ou support."]],
  tableColumns: ["Point", "Enjeu", "Preuve demandée"],
  tableRows: [["Interface", "Fermeture et alignement", "Dimensions du mousqueton et de l'œillet"], ["Longueur totale", "Départ et course utile", "Cote entre œillet et prise"], ["Dimensions de prise", "Confort et rangement", "Plan coté et échantillon"], ["Rotation", "Liberté du poignet et torsion", "Construction et essai"], ["Matériaux", "Masse, toucher et nettoyage", "Déclaration par composant"], ["Soudures/fixations", "Chemin de charge", "Construction et méthode de contrôle"], ["Finition/logo", "Entretien et répétabilité", "Référence et maquette validées"], ["Emballage", "Protection et identité SKU", "Échantillon de conditionnement"]],
  checklist: ["Paire de poignées simples pour crossover", "Barre de tirage adaptée à la station", "Barre courte droite ou coudée tournante", "Poignée V ou rameur compact", "Corde triceps avec extrémités contrôlables", "Sangle de cheville si le programme le justifie", "Mousquetons compatibles identifiés", "Rangement hors circulation", "Règle de remplacement des pièces d'usure", "Plan SKU et pièces de rechange"],
  machine: ["Inventoriez functional trainers, vis-à-vis, tirages verticaux, rowings bas et poulies sur rack. Indiquez un ou deux câbles indépendants et les accessoires déjà fournis.", "Une grande salle peut doubler poignées et cordes; un hôtel cherchera un kit compact; un distributeur privilégiera une gamme lisible et réassortissable. L'usage réel prime sur le nombre de pièces."],
  materials: ["L'acier apporte masse et moletage classique; l'aluminium facilite les changements; caoutchouc et uréthane modifient prise et nettoyage; corde et sangle ajoutent des coutures et butées à surveiller.", "Exigez les matériaux composant par composant. Métal robuste ou usage intensif ne décrit pas le noyau, la poignée, la bague, la fixation et l'œillet."],
  motion: ["Une articulation tournante peut suivre le poignet et limiter la torsion du câble, sans être supérieure pour tous les mouvements. Précisez ce qui tourne, le jeu admis et le contrôle d'entretien.", "Comparez diamètre, largeur, angle, texture, arêtes et dégagement de la main. Une forme originale ne doit pas réduire la course ni gêner les utilisateurs."],
  oem: ["En OEM, on adapte souvent logo, finition, couleur d'accent, matière de prise, composition du kit, étiquette et carton. Une modification ODM de géométrie, d'œillet ou de rotation demande une étude distincte.", "Validez méthode, taille, position, contraste, orientation et exposition au nettoyage du logo sur un échantillon réel, puis liez la version graphique au SKU.", "PowerBaseFit fournit poignées et ensembles sur projet. Quantité minimale, délai et personnalisation dépendent du modèle; transmettez assortiment, volumes, destination et brief de marque."],
  sample: ["La fiche échantillon identifie modèle, plan, connexion, matériaux, finition, prise, rotation, logo, poids et emballage. Les photos valident l'aspect; une cote nécessite méthode et résultat.", "Essayez fermeture, alignement, course, interférences, position de main, rangement et nettoyage sur la machine réelle. Toute modification entraîne une nouvelle version."],
  inspection: ["Inspectez œillet, soudure, fixation, pivot, poignée, corde, sangle, couture et butée. Déformation, fissure, jeu anormal, corrosion, arête ou textile endommagé impose la mise hors service et la consultation des instructions.", "Pour le lot, convenez identité, dimensions, aspect, assemblage, mouvement, logo, quantité et emballage. Toute vérification liée à la charge exige une méthode et un critère écrits."],
  packing: ["Séparez et immobilisez les pièces denses. Protégez les œillets sans masquer le SKU et traitez différemment barres lourdes, petits mousquetons et textiles.", "Dans la salle, un support mural ou de station garde le matériel visible, sec et hors passage. Conservez plan, matériaux, finition, artwork, code carton et échantillon pour le réassort."],
  rfq: ["Envoyez la même demande à chaque fournisseur: photos et cotes de connexion, quantité, dimensions, matériaux, rotation, finition, logo, emballage, destination, échantillon et contrôle. Séparez impératif, préférence et point ouvert.", "Beaucoup d'accessoires sont largement interchangeables, mais la compatibilité doit être démontrée. [Voir les ensembles pour machines à câble](/fr/produits/accessoires-fitness/accessoires-machine-poulie) ou transmettre votre parc à l'usine."],
  faq: [["Toutes les poignées vont-elles sur toutes les machines ?", "Non. Mousqueton, œillet, orientation, longueur et dégagement doivent être vérifiés."], ["Que faut-il mesurer ?", "Corps et doigt du mousqueton, espace intérieur, œillet, épaisseur, longueur, prise et dégagement du châssis."], ["Quel kit acheter d'abord ?", "Poignées simples, barre de tirage, barre courte, poignée de rameur et corde forment une base utile."], ["Une poignée tournante est-elle meilleure ?", "Elle aide certains mouvements mais n'est pas toujours préférable. L'exercice et la construction décident."], ["Peut-on ajouter un logo ?", "Oui sur les modèles compatibles, après validation de la méthode, position, contraste, quantité et échantillon."], ["OEM et ODM sont-ils différents ?", "L'OEM adapte généralement un modèle; l'ODM peut modifier géométrie ou construction et exige une validation plus poussée."], ["Comment les inspecter ?", "Contrôlez connexion, soudures, fixations, rotation, prises, textile, finition, logo, quantité et emballage."], ["Un kit mixte est-il possible ?", "Oui selon la faisabilité. Communiquez pièces, volumes, marque, emballage, destination et réassort."]],
  linkLabels: ["Voir les accessoires professionnels", "Voir les ensembles pour câble", "Comparer les poignées aluminium", "Comparer les poignées acier", "Envoyer une demande"],
  imageCopy: [["Ensemble d'accessoires de tirage près d'une double poulie", "Le kit se construit selon machines, utilisateurs et rangement."], ["Mousqueton et différents œillets pour vérifier le montage", "Ouverture, géométrie, épaisseur et alignement déterminent la compatibilité."], ["Poignées en acier moleté, aluminium anodisé et caoutchouc", "Le matériau change la manipulation, le nettoyage et le remplacement."], ["Barres, poignées, corde et sangle rangées dans une salle", "Un rangement dédié garde les pièces sèches et hors passage."], ["Échantillons sans marque, emballages neutres et finitions", "L'échantillon relie construction, finition, marque et conditionnement."]],
  cta: ["Étudier votre projet d'accessoires", "Envoyez connexions, liste, quantités, personnalisation et destination pour une analyse par modèle.", "Demander un devis"]
};

const vietnamese: GuideCopy = {
  locale: "vi",
  path: "/vi/blog/phu-kien-may-keo-cap-co-dung-chung-khong",
  title: "Phụ Kiện Máy Kéo Cáp Có Dùng Chung Không? Hướng Dẫn B2B | PowerBaseFit",
  description: "Cách kiểm tra móc, lỗ nối, khớp xoay, tay cầm, bộ phụ kiện, kiểm định, logo và nguồn cung OEM cho máy kéo cáp phòng gym.",
  h1: "Phụ Kiện Máy Kéo Cáp Có Dùng Chung Không? Hướng Dẫn Tương Thích và Mua OEM",
  primaryKeyword: "phụ kiện máy kéo cáp có dùng chung không",
  secondaryKeywords: ["tay cầm máy kéo cáp", "phụ kiện máy cable", "tay cầm phòng gym", "nhà sản xuất tay cầm", "tay cầm in logo", "phụ kiện gym OEM", "tay cầm giá sỉ"],
  intent: "kiểm tra độ tương thích và mua phụ kiện máy cáp cho dự án thương mại",
  targetBuyer: "chủ phòng gym, nhà phân phối, đơn vị nhập khẩu và thương hiệu riêng",
  home: "Trang chủ", library: "Kiến thức", eyebrow: "PowerBaseFit · Nhà sản xuất phụ kiện máy cáp", contactPath: "/vi/lien-he",
  headings: { answer: "Trả lời nhanh", universal: "Dùng chung nghĩa là gì với tay cầm máy cáp?", verify: "Kiểm tra đầu nối trước khi đặt hàng", table: "Bảng thông số dành cho người mua", lineup: "Bộ phụ kiện khởi đầu cho phòng gym", machine: "Khảo sát máy và người dùng thực tế", materials: "Thép, nhôm, cao su và vật liệu dệt", motion: "Khớp xoay, hình học tay cầm và thao tác", oem: "OEM, ODM, logo và nhãn riêng", sample: "Duyệt mẫu theo phiên bản rõ ràng", inspection: "Kiểm tra và bảo trì trong vận hành", packing: "Đóng gói, lưu trữ và đặt lại", rfq: "Thông tin cần gửi nhà máy khi hỏi giá" },
  answer: ["Nhiều tay cầm và thanh kéo tháo rời có thể dùng trên nhiều máy nếu móc carabiner đi qua lỗ nối và đóng kín. Điều đó không có nghĩa mọi sản phẩm đều dùng chung. Kích thước cửa móc, độ dày lỗ, hướng nối, chiều dài phụ kiện và hành trình cáp đều có thể làm thay đổi độ vừa và tư thế tập.", "Người mua cho phòng gym hoặc phân phối cần kiểm tra máy thật. Với dự án OEM hay nhãn riêng, hồ sơ còn phải chốt vật liệu, bề mặt, vùng cầm, bộ phận xoay, logo, bao bì và điểm kiểm tra. PowerBaseFit có thể rà soát theo từng mẫu sản phẩm."],
  universal: ["Trên trang bán hàng, dùng chung thường chỉ nói lỗ nối phù hợp với móc phổ biến. Cụm từ này không quy định một kích thước toàn cầu và không bảo đảm phụ kiện tránh được khung hay puly của mọi máy.", "Tương thích cơ khí là móc vào được, đóng kín và thẳng đường lực. Tương thích sử dụng là còn đủ hành trình, khoảng trống, đúng hệ một hoặc hai cáp, đúng góc cầm và cất giữ thuận tiện."],
  verification: [["Ghi lại đầu nối của máy", "Đo thân móc, độ mở cửa, khoảng trong và hướng móc. Ghi rõ đầu cáp có xoay hay cố định."], ["Kiểm tra lỗ nối phụ kiện", "Yêu cầu kích thước trong, độ dày ngoài, mối hàn hoặc dây đai và hướng chịu lực. Đối chiếu bản vẽ hoặc mẫu PowerBaseFit cụ thể."], ["Thử khoảng làm việc", "Lắp mẫu, đóng kín móc và di chuyển cáp không tải. Sau đó làm theo hướng dẫn của hãng máy để đánh giá, bảo đảm không chạm vỏ, puly, khung hay giá treo."]],
  tableColumns: ["Hạng mục", "Lý do", "Bằng chứng"],
  tableRows: [["Đầu nối", "Đóng kín và thẳng lực", "Kích thước móc và lỗ"], ["Chiều dài tổng", "Ảnh hưởng điểm bắt đầu và hành trình", "Kích thước từ lỗ đến tay cầm"], ["Kích thước vùng cầm", "Ảnh hưởng người dùng và lưu trữ", "Bản vẽ và mẫu"], ["Khớp xoay", "Ảnh hưởng cổ tay và xoắn cáp", "Cấu tạo và thử mẫu"], ["Vật liệu", "Ảnh hưởng khối lượng, cảm giác và vệ sinh", "Khai báo theo bộ phận"], ["Mối hàn/liên kết", "Truyền lực qua phụ kiện", "Mô tả cấu tạo và kiểm tra"], ["Bề mặt/logo", "Ảnh hưởng bảo quản và lô sau", "Mẫu màu và file duyệt"], ["Bao bì", "Bảo vệ và nhận diện SKU", "Mẫu đóng gói"]],
  checklist: ["Cặp tay cầm đơn cho cable crossover", "Thanh kéo xô phù hợp kích thước máy", "Thanh thẳng hoặc cong có xoay", "Tay cầm chữ V hoặc tay chèo", "Dây kéo tay sau có đầu chặn dễ kiểm tra", "Đai cổ chân khi chương trình cần", "Móc tương thích có mã nhận diện", "Giá treo ngoài lối đi", "Quy tắc thay dây, bọc và khớp", "Kế hoạch SKU và phụ tùng"],
  machine: ["Liệt kê functional trainer, cable crossover, máy kéo xô, máy chèo và bộ puly gắn rack. Ghi hệ một cáp hay hai cáp và phụ kiện đang có.", "Phòng gym đông có thể cần tay cầm đôi dự phòng; khách sạn cần bộ gọn, dễ cất; nhà phân phối cần cấu hình dễ bán và đặt lại. Không nên chọn chỉ theo số món."],
  materials: ["Thép cho cảm giác chắc và bề mặt khía; nhôm nhẹ hơn khi thay phụ kiện; cao su hoặc PU thay đổi cảm giác và vệ sinh; dây thừng, dây đai tạo độ linh hoạt nhưng phải kiểm tra đường may và đầu chặn.", "Yêu cầu vật liệu theo từng chi tiết. Những cụm từ chung như kim loại bền không mô tả lõi, tay cầm, ống lót, chốt và lỗ nối."],
  motion: ["Khớp xoay có thể theo chuyển động cổ tay và giảm xoắn cáp, nhưng không cần cho mọi bài. Hãy quy định phần nào xoay, độ rơ chấp nhận và cách theo dõi.", "So sánh đường kính, bề rộng, góc, độ nhám, cạnh và khoảng tay. Thiết kế lạ không nên làm mất hành trình hoặc gây khó chịu cho nhiều nhóm hội viên."],
  oem: ["Dự án OEM thường tùy chỉnh logo, bề mặt, màu nhấn, vật liệu cầm, cấu hình bộ, nhãn và thùng. Thay đổi ODM về hình học, lỗ nối hay khớp xoay cần đánh giá riêng vì liên quan dụng cụ và kết cấu.", "Duyệt phương pháp logo, kích thước, vị trí, độ tương phản, hướng và khả năng chịu quy trình vệ sinh trên mẫu thật. Gắn phiên bản file với SKU.", "PowerBaseFit cung cấp tay cầm và bộ phụ kiện theo dự án. Số lượng tối thiểu, thời gian và tùy chỉnh phụ thuộc mẫu; hãy gửi danh sách, số lượng, điểm đến và yêu cầu thương hiệu."],
  sample: ["Phiếu duyệt mẫu phải có mã mẫu, bản vẽ, đầu nối, vật liệu, bề mặt, vùng cầm, khớp xoay, logo, khối lượng và bao bì. Ảnh chỉ xác nhận ngoại quan; thông số cần phương pháp và kết quả.", "Thử đóng móc, căn thẳng, hành trình, va chạm, tư thế tay, giá treo và vệ sinh trên máy thật. Mọi thay đổi phải có phiên bản duyệt mới."],
  inspection: ["Kiểm tra lỗ nối, mối hàn, chốt, khớp xoay, tay cầm, dây, đai, đường may và đầu chặn. Biến dạng, nứt, rơ bất thường, gỉ, cạnh sắc hay sờn cần ngừng sử dụng và theo hướng dẫn của nhà cung cấp.", "Với lô hàng, thống nhất kiểm tra nhận diện, kích thước, ngoại quan, lắp ráp, chuyển động, logo, số lượng và bao bì. Nội dung liên quan tải phải có phương pháp và tiêu chí ghi rõ."],
  packing: ["Tách và cố định thanh, tay cầm nặng để không cọ xước. Bảo vệ lỗ nối nhưng vẫn nhìn thấy SKU; đánh giá riêng thanh dài, móc nhỏ và đồ dệt.", "Tại phòng tập, giá treo giữ phụ kiện khô, dễ thấy và ngoài lối đi. Lưu bản vẽ, vật liệu, bề mặt, logo, mã thùng và mẫu cho đơn lặp lại."],
  rfq: ["Gửi cùng một yêu cầu cho các nhà cung cấp: ảnh và kích thước đầu nối, số lượng, kích thước, vật liệu, khớp xoay, bề mặt, logo, bao bì, điểm đến, mẫu và kiểm tra. Tách rõ bắt buộc, ưu tiên và câu hỏi mở.", "Kết luận: nhiều phụ kiện có thể thay cho nhau, nhưng phải chứng minh độ vừa. [Xem bộ phụ kiện máy cáp](/vi/san-pham/phu-kien-gym/phu-kien-may-keo-cap) hoặc gửi danh sách máy để nhà máy rà soát."],
  faq: [["Mọi tay cầm có lắp được mọi máy không?", "Không. Cần kiểm tra móc, lỗ nối, hướng, chiều dài và khoảng trống."], ["Cần đo gì trước khi mua?", "Thân móc, cửa móc, khoảng trong, lỗ nối, độ dày, chiều dài, vùng cầm và khoảng khung."], ["Bộ cơ bản gồm gì?", "Cặp tay cầm đơn, thanh kéo xô, thanh ngắn, tay chèo và dây kéo tay sau."], ["Tay cầm xoay có tốt hơn không?", "Có ích cho một số chuyển động nhưng không luôn tốt hơn. Bài tập và cấu tạo quyết định."], ["Có thể làm logo không?", "Có trên mẫu phù hợp sau khi duyệt phương pháp, vị trí, độ tương phản, số lượng và mẫu."], ["OEM khác ODM thế nào?", "OEM tùy chỉnh mẫu sẵn; ODM có thể đổi hình học hoặc kết cấu nên cần đánh giá sâu hơn."], ["Kiểm tra sản phẩm thế nào?", "Đối chiếu đầu nối, mối hàn, chốt, xoay, vùng cầm, dây, bề mặt, logo, số lượng và bao bì."], ["Có thể đặt bộ hỗn hợp không?", "Có tùy tính khả thi. Gửi danh sách, số lượng, thương hiệu, bao bì, điểm đến và kế hoạch đặt lại."]],
  linkLabels: ["Xem phụ kiện phòng gym", "Xem bộ phụ kiện máy cáp", "So sánh tay cầm nhôm", "So sánh tay cầm thép", "Gửi yêu cầu báo giá"],
  imageCopy: [["Bộ phụ kiện máy cáp bên cạnh trạm puly đôi", "Bộ sản phẩm phải theo máy, người dùng và chỗ cất."], ["Móc và các kiểu lỗ nối để kiểm tra độ vừa", "Độ mở, hình học, độ dày và hướng quyết định tương thích."], ["Tay cầm thép khía, nhôm anod và cao su", "Vật liệu thay đổi thao tác, vệ sinh và thay thế."], ["Thanh kéo, tay cầm, dây và đai được treo gọn", "Giá treo giữ phụ kiện khô và ngoài lối đi."], ["Mẫu không logo với bao bì và tùy chọn bề mặt", "Mẫu liên kết kết cấu, bề mặt, thương hiệu và đóng gói."]],
  cta: ["Trao đổi dự án phụ kiện máy cáp", "Gửi đầu nối, danh sách, số lượng, thương hiệu và điểm đến để rà soát theo mẫu.", "Yêu cầu báo giá"]
};

const swedish: GuideCopy = {
  locale: "sv",
  path: "/sv/blogg/kabelhandtag-universella-kompatibilitet",
  title: "Är Kabelhandtag Universella? Inköpsguide för B2B | PowerBaseFit",
  description: "Kontrollera karbinhake, fästöga, rotation, grepp, gymset, inspektion, logotyp och OEM-leverans av draghandtag till kabelmaskiner.",
  h1: "Är Kabelhandtag Universella? Guide till Kompatibilitet och OEM-Inköp",
  primaryKeyword: "kabelhandtag universella",
  secondaryKeywords: ["draghandtag kabelmaskin", "kabeltillbehör gym", "latsdrag handtag", "tillverkare kabelhandtag", "handtag med logotyp", "OEM gymtillbehör", "draghandtag grossist"],
  intent: "kontrollera kompatibilitet och köpa kabeltillbehör för kommersiella anläggningar",
  targetBuyer: "gymoperatörer, distributörer, importörer och egna varumärken",
  home: "Start", library: "Guider", eyebrow: "PowerBaseFit · Tillverkare av kabeltillbehör", contactPath: "/sv/kontakt",
  headings: { answer: "Kort svar", universal: "Vad betyder universell för ett draghandtag?", verify: "Kontrollera anslutningen före beställning", table: "Specifikationstabell för inköpare", lineup: "Basuppsättning för kommersiella gym", machine: "Utgå från maskinpark och användare", materials: "Stål, aluminium, gummi och textil", motion: "Rotation, greppgeometri och hantering", oem: "OEM, ODM, logotyp och eget varumärke", sample: "Godkänn provet som en styrd version", inspection: "Inspektion och underhåll", packing: "Förpackning, förvaring och återbeställning", rfq: "Underlag till fabriken i offertförfrågan" },
  answer: ["Många lösa draghandtag passar flera kabelmaskiner när karbinhaken går genom fästöglan och stängs helt. De är ändå inte automatiskt universella. Grindöppning, öglans tjocklek, riktning, total längd och tillgänglig kabelväg kan ändra både passform och startläge.", "Kommersiella inköpare bör kontrollera riktiga maskiner. För OEM eller eget varumärke ska även material, yta, grepp, roterande delar, logotyp, emballage och kontrollpunkter låsas. PowerBaseFit kan granska detta modell för modell."],
  universal: ["I handeln betyder universell ofta bara att en vanlig karbinhake ska passa i öglan. Ordet anger inget globalt mått och garanterar inte frigång på varje kabelstation.", "Mekanisk kompatibilitet gäller inkoppling, stängning och lastlinje. Funktionell kompatibilitet gäller rörelseväg, frigång, en- eller tvåkabelsystem, handposition och förvaring."],
  verification: [["Dokumentera maskinens hake", "Mät kropp, grindöppning, invändigt utrymme och riktning. Notera om kabeländen kan rotera."], ["Kontrollera tillbehörets öga", "Begär inneröppning, tjocklek, svets- eller bandkonstruktion och lastriktning. Jämför ritning eller prov för vald PowerBaseFit-modell."], ["Prova arbetsutrymmet", "Koppla provet, stäng haken och kör kabeln utan last. Följ därefter maskintillverkarens instruktioner och kontrollera kontakt med kåpa, trissa, ram och hållare."]],
  tableColumns: ["Specifikation", "Betydelse", "Underlag"],
  tableRows: [["Anslutning", "Stängning och lastlinje", "Mått på hake och öga"], ["Totallängd", "Startläge och kabelväg", "Mått från öga till grepp"], ["Greppmått", "Handposition och förvaring", "Måttsatt ritning och prov"], ["Rotation", "Handled och kabelvridning", "Konstruktion och prov"], ["Material", "Vikt, känsla och rengöring", "Uppgift per komponent"], ["Svets/fäste", "För lasten genom produkten", "Konstruktion och kontrollmetod"], ["Yta/logotyp", "Skötsel och serielikhet", "Godkänd referens"], ["Förpackning", "Skydd och SKU", "Packprov och pallplan"]],
  checklist: ["Par enkelhandtag för crossover", "Latsdragstång anpassad till stationen", "Rak eller vinklad roterande stång", "V-handtag eller roddhandtag", "Tricepsrep med synliga kontrollpunkter", "Fotmanschett när programmet kräver den", "Identifierade kompatibla karbinhakar", "Förvaring utanför gångyta", "Bytesregel för slitdelar", "SKU- och reservdelsplan"],
  machine: ["Lista funktionstränare, cable cross, latsdrag, sittande rodd och rackmonterade trissor. Ange ett eller två kablar och vad som redan ingår.", "Ett välbesökt gym kan behöva dubbletter; ett hotell ett mindre organiserat kit; en distributör en tydlig serie som går att fylla på. Välj efter drift, inte antal delar."],
  materials: ["Stål ger massa och klassisk räffling, aluminium är lättare att flytta, gummi och uretan ändrar grepp och rengöring. Rep och band är flexibla men sömmar och ändstopp blir egna kontrollpunkter.", "Begär material per del. Metall och kommersiell kvalitet säger för lite om kärna, handtag, hylsa, fäste och öga."],
  motion: ["Rotation kan följa handleden och minska kabelvridning, men behövs inte i varje övning. Ange vad som roterar, tillåtet spel och hur leden ska kontrolleras.", "Jämför diameter, bredd, vinkel, struktur, kanter och plats för handen. En speciell form får inte minska rörelsevägen eller göra handtaget svårt för olika medlemmar."],
  oem: ["OEM-anpassning omfattar ofta logotyp, yta, accentfärg, greppmaterial, set, etikett och kartong. ODM-ändringar av geometri, öga eller rotation kräver separat genomgång eftersom verktyg och konstruktion påverkas.", "Godkänn logotypens metod, storlek, placering, kontrast, riktning och rengöring på ett verkligt prov. Koppla filversionen till SKU:n.", "PowerBaseFit levererar kabelhandtag projektvis. Minsta kvantitet, tid och anpassning varierar med modellen; skicka mix, antal, destination och varumärkesbrief."],
  sample: ["Provbladet ska ange modell, ritning, anslutning, material, yta, grepp, rotation, logotyp, vikt och packning. Foto visar utseende, mått kräver metod och resultat.", "Prova stängning, linjering, kabelväg, frigång, handläge, hållare och rengöring på den riktiga maskinen. Ändringar kräver ny version."],
  inspection: ["Kontrollera öga, svets, fäste, led, grepp, rep, band, söm och stopp. Deformation, spricka, onormalt spel, korrosion, vass kant eller textilskada betyder att delen tas ur bruk enligt tillämpliga instruktioner.", "För serien avtalas identitet, mått, yta, montering, rörelse, logotyp, antal och emballage. Lastrelaterade kontroller behöver skriven metod och kriterium."],
  packing: ["Tunga stänger och handtag separeras och fixeras. Skydda ögon utan att dölja SKU och bedöm långa stänger, små hakar och textil var för sig.", "I gymmet håller en vägg- eller stationshållare tillbehören synliga, torra och borta från gångytan. Spara ritning, material, yta, original, kartongkod och prov för återbeställning."],
  rfq: ["Skicka samma underlag till leverantörerna: foton och mått på anslutning, antal, dimensioner, material, rotation, yta, logotyp, emballage, destination, prov och kontroll. Dela upp krav, önskemål och öppna frågor.", "Många handtag är brett utbytbara, men passformen ska visas. [Se set för kabelmaskiner](/sv/produkter/gymtillbehor/cable-machine-attachments) eller skicka maskinlistan för fabriksgranskning."],
  faq: [["Passar alla handtag alla kabelmaskiner?", "Nej. Hake, öga, riktning, längd och frigång måste stämma."], ["Vad ska mätas?", "Hake, grindöppning, invändigt utrymme, öga, tjocklek, längd, grepp och ramfrigång."], ["Vilka delar behövs först?", "Enkelhandtag, latsdragstång, kort stång, roddhandtag och tricepsrep är en praktisk bas."], ["Är roterande handtag bättre?", "De hjälper i vissa rörelser men är inte alltid bättre. Övning och konstruktion avgör."], ["Kan logotyp läggas till?", "Ja på kompatibla modeller efter godkännande av metod, placering, kontrast, mängd och prov."], ["Vad skiljer OEM från ODM?", "OEM anpassar vanligen en befintlig modell; ODM kan ändra form och konstruktion och behöver djupare kontroll."], ["Hur inspekteras delarna?", "Jämför anslutning, svets, fäste, rotation, grepp, textil, yta, logotyp, antal och packning."], ["Kan jag beställa ett blandat set?", "Ja om projektet är genomförbart. Skicka delar, antal, varumärke, emballage, destination och återbeställningsplan."]],
  linkLabels: ["Se professionella tillbehör", "Se set för kabelmaskiner", "Jämför aluminiumhandtag", "Jämför stålhandtag", "Skicka offertförfrågan"],
  imageCopy: [["Kommersiellt kabeltillbehörsset vid en dubbel kabelstation", "Setet planeras efter maskiner, användare och förvaring."], ["Karbinhake och olika fästöglor för passningskontroll", "Öppning, geometri, tjocklek och riktning styr kompatibiliteten."], ["Räfflade stål-, aluminium- och gummigrepp", "Material påverkar hantering, rengöring och utbyte."], ["Stänger, handtag, rep och manschett på gymförvaring", "Ordning håller delarna torra och utanför gångvägen."], ["Omarkerade prover med emballage och ytval", "Provet binder ihop konstruktion, yta, varumärke och packning."]],
  cta: ["Diskutera ett kabeltillbehörsprojekt", "Skicka anslutningar, delar, antal, varumärke och destination för modellgranskning.", "Begär offert"]
};

const italian: GuideCopy = {
  locale: "it",
  path: "/it/blog/maniglie-cavi-palestra-universali-compatibilita",
  title: "Le Maniglie per Cavi Sono Universali? Guida B2B | PowerBaseFit",
  description: "Come verificare moschettone, occhiello, rotazione, impugnatura, set professionale, controllo, logo e fornitura OEM di accessori per cavi.",
  h1: "Le Maniglie per Cavi da Palestra Sono Universali? Guida a Compatibilità e Acquisto OEM",
  primaryKeyword: "maniglie per cavi palestra universali",
  secondaryKeywords: ["accessori cavi palestra", "impugnature per pulley", "maniglie lat machine", "produttore maniglie palestra", "maniglie con logo", "accessori fitness OEM", "maniglie cavi ingrosso"],
  intent: "verificare la compatibilità e acquistare accessori per cavi destinati all'uso professionale",
  targetBuyer: "palestre, distributori, importatori e marchi privati",
  home: "Home", library: "Guide", eyebrow: "PowerBaseFit · Produttore di accessori per cavi", contactPath: "/it/contatti",
  headings: { answer: "Risposta rapida", universal: "Cosa significa universale per un accessorio a cavo?", verify: "Verificare il collegamento prima dell'ordine", table: "Tabella tecnica per il buyer", lineup: "Set iniziale per una palestra professionale", machine: "Partire dalle macchine e dagli utenti reali", materials: "Acciaio, alluminio, gomma e tessili", motion: "Rotazione, geometria e utilizzo", oem: "OEM, ODM, logo e private label", sample: "Approvare un campione come versione controllata", inspection: "Ispezione e manutenzione in palestra", packing: "Imballaggio, stoccaggio e riordino", rfq: "Dati da inviare alla fabbrica" },
  answer: ["Molte maniglie e barre removibili funzionano su più stazioni se il moschettone attraversa l'occhiello e si chiude del tutto. Non sono automaticamente universali. Apertura, spessore, orientamento, lunghezza dell'accessorio e corsa disponibile possono cambiare montaggio e posizione iniziale.", "Un buyer professionale controlla le macchine effettive. Nei progetti OEM o private label definisce anche materiali, finitura, presa, parti rotanti, logo, imballaggio e controlli. PowerBaseFit può esaminare la configurazione come fabbrica per il modello selezionato."],
  universal: ["Nelle schede commerciali, universale indica spesso un occhiello per moschettone comune. Non stabilisce una misura mondiale né garantisce spazio sufficiente su ogni stazione.", "La compatibilità meccanica riguarda aggancio, chiusura e linea di carico. Quella funzionale comprende corsa, interferenze, uso a uno o due cavi, posizione delle mani e supporto di stoccaggio."],
  verification: [["Rilevare il lato macchina", "Misurare corpo del moschettone, apertura della leva, spazio interno e orientamento. Indicare se il terminale del cavo ruota."], ["Controllare l'occhiello", "Richiedere apertura interna, spessore, costruzione saldata o in cinghia e direzione di carico. Confrontare disegno o campione del modello PowerBaseFit scelto."], ["Provare l'ingombro", "Agganciare il campione, chiudere la leva e muovere il cavo senza carico. Seguire poi le istruzioni della macchina e verificare che non tocchi carter, puleggia, telaio o porta-accessori."]],
  tableColumns: ["Voce", "Perché conta", "Evidenza"],
  tableRows: [["Interfaccia", "Chiusura e allineamento", "Misure di moschettone e occhiello"], ["Lunghezza totale", "Posizione iniziale e corsa", "Quota dall'occhiello alla presa"], ["Misure impugnatura", "Comfort e stoccaggio", "Disegno quotato e campione"], ["Rotazione", "Polso e torsione del cavo", "Costruzione e prova"], ["Materiali", "Peso, tatto e pulizia", "Dichiarazione per componente"], ["Saldature/fissaggi", "Percorso del carico", "Struttura e metodo di controllo"], ["Finitura/logo", "Cura e continuità di lotto", "Riferimento approvato"], ["Imballaggio", "Protezione e identità SKU", "Campione di imballo"]],
  checklist: ["Coppia di maniglie singole per crossover", "Barra lat adeguata alla stazione", "Barra corta diritta o curva girevole", "Impugnatura V o da rematore", "Corda tricipiti con punti ispezionabili", "Cavigliera se prevista dal programma", "Moschettoni compatibili identificati", "Supporto fuori dal passaggio", "Regola di sostituzione per parti usurabili", "Piano SKU e ricambi"],
  machine: ["Elencare functional trainer, crossover, lat machine, low row e sistemi a puleggia sul rack. Annotare uno o due cavi indipendenti e gli accessori già inclusi.", "Una palestra affollata può richiedere doppioni; un hotel un set compatto; un distributore una gamma semplice da spiegare e riordinare. La scelta segue il servizio reale, non il numero di pezzi."],
  materials: ["L'acciaio offre massa e zigrinatura classica; l'alluminio è più leggero da spostare; gomma e uretano cambiano presa e pulizia. Corda e cinghia sono flessibili, ma cuciture e terminali diventano punti di controllo.", "Chiedere i materiali per ogni componente. Metallo robusto o uso professionale non descrivono anima, impugnatura, boccola, fissaggio e occhiello."],
  motion: ["Un giunto rotante può seguire il polso e limitare la torsione del cavo, ma non è sempre preferibile. Specificare quale parte ruota, il gioco ammesso e il controllo periodico.", "Confrontare diametro, larghezza, angolo, texture, bordi e spazio per la mano. Una forma speciale non deve ridurre la corsa o escludere parte degli utenti."],
  oem: ["Nei progetti OEM si personalizzano spesso logo, finitura, colore, materiale dell'impugnatura, composizione del set, etichetta e cartone. Modifiche ODM a geometria, occhiello o rotazione richiedono uno studio separato.", "Approvare metodo, dimensione, posizione, contrasto, orientamento e pulizia del logo sul campione reale, collegando la revisione grafica allo SKU.", "PowerBaseFit fornisce maniglie e set in base al progetto. Quantità minima, tempi e personalizzazione dipendono dal modello; inviare mix, quantità, destinazione e brief del marchio."],
  sample: ["La scheda campione identifica modello, disegno, collegamento, materiali, finitura, presa, rotazione, logo, peso e imballo. Le foto documentano l'aspetto; le misure richiedono metodo e risultato.", "Provare chiusura, allineamento, corsa, interferenze, postura, supporto e pulizia sulla macchina reale. Ogni modifica richiede una nuova revisione."],
  inspection: ["Controllare occhiello, saldatura, fissaggio, giunto, maniglia, corda, cinghia, cucitura e terminale. Deformazione, crepa, gioco anomalo, corrosione, spigolo o tessuto danneggiato richiedono la rimozione dal servizio e le istruzioni del fornitore.", "Per il lotto concordare identità, dimensioni, aspetto, montaggio, movimento, logo, quantità e imballo. Le verifiche legate al carico richiedono metodo e criterio scritti."],
  packing: ["Separare e bloccare barre e maniglie dense. Proteggere gli occhielli senza coprire lo SKU e valutare distintamente barre lunghe, moschettoni piccoli e tessili.", "In palestra, un supporto a parete o sulla stazione mantiene gli accessori visibili, asciutti e fuori dal percorso. Conservare disegno, materiali, finitura, grafica, codice cartone e campione per il riordino."],
  rfq: ["Inviare la stessa richiesta a ogni fornitore: foto e misure del collegamento, quantità, dimensioni, materiali, rotazione, finitura, logo, imballaggio, destinazione, campione e controllo. Separare obblighi, preferenze e punti aperti.", "Molti accessori sono intercambiabili, ma la compatibilità va dimostrata. [Vedi i set per macchine a cavo](/it/prodotti/accessori-palestra/accessori-per-macchine-a-cavi) o invia l'elenco macchine alla fabbrica."],
  faq: [["Tutte le maniglie vanno su ogni macchina?", "No. Moschettone, occhiello, orientamento, lunghezza e spazio devono essere verificati."], ["Cosa bisogna misurare?", "Corpo e leva del moschettone, spazio interno, occhiello, spessore, lunghezza, presa e distanze dal telaio."], ["Quali accessori comprare prima?", "Maniglie singole, barra lat, barra corta, impugnatura da rematore e corda sono una base pratica."], ["Le maniglie girevoli sono migliori?", "Possono aiutare alcuni movimenti ma non sono sempre superiori. Contano esercizio e costruzione."], ["Si può aggiungere un logo?", "Sì sui modelli compatibili dopo aver approvato metodo, posizione, contrasto, quantità e campione."], ["OEM e ODM sono diversi?", "L'OEM adatta un modello esistente; l'ODM può cambiare geometria e costruzione e richiede più verifiche."], ["Come si ispezionano?", "Confrontare collegamento, saldature, fissaggi, rotazione, prese, tessili, finitura, logo, quantità e imballo."], ["È possibile un set misto?", "Sì se fattibile. Inviare pezzi, quantità, marchio, imballaggio, destinazione e piano di riordino."]],
  linkLabels: ["Vedi accessori professionali", "Vedi set per macchine a cavo", "Confronta maniglie in alluminio", "Confronta maniglie in acciaio", "Invia richiesta"],
  imageCopy: [["Set professionale di accessori accanto a una doppia puleggia", "Il set segue macchine, utenti e spazio di stoccaggio."], ["Moschettone e diversi occhielli per verificare l'aggancio", "Apertura, geometria, spessore e direzione definiscono la compatibilità."], ["Impugnature in acciaio zigrinato, alluminio e gomma", "Il materiale cambia gestione, pulizia e ricambi."], ["Barre, maniglie, corda e cavigliera su supporto", "Lo stoccaggio dedicato mantiene gli accessori asciutti e fuori dal passaggio."], ["Campioni senza marchio con imballi e finiture", "Il campione collega costruzione, finitura, marchio e imballaggio."]],
  cta: ["Valuta il tuo progetto di accessori", "Invia collegamenti, elenco, quantità, marchio e destinazione per una verifica per modello.", "Richiedi preventivo"]
};

const dutch: GuideCopy = {
  locale: "nl",
  path: "/nl/blog/kabelaccessoires-universeel-compatibiliteit",
  title: "Zijn Kabelaccessoires Universeel? B2B-Inkoopgids | PowerBaseFit",
  description: "Controleer karabiner, bevestigingsoog, rotatie, grip, gymset, inspectie, logo en OEM-levering van handgrepen voor kabelstations.",
  h1: "Zijn Handgrepen voor Kabelstations Universeel? Gids voor Compatibiliteit en OEM-Inkoop",
  primaryKeyword: "kabelaccessoires universeel",
  secondaryKeywords: ["handgrepen kabelstation", "kabelmachine accessoires", "lat pulldown handgreep", "fabrikant kabelhandgrepen", "handgrepen met logo", "OEM fitness accessoires", "kabelgrepen groothandel"],
  intent: "compatibiliteit controleren en kabelaccessoires voor professioneel gebruik inkopen",
  targetBuyer: "sportscholen, distributeurs, importeurs en private labels",
  home: "Home", library: "Kennisbank", eyebrow: "PowerBaseFit · Fabrikant van kabelaccessoires", contactPath: "/nl/contact",
  headings: { answer: "Kort antwoord", universal: "Wat betekent universeel bij kabelaccessoires?", verify: "De aansluiting controleren vóór bestellen", table: "Specificatietabel voor inkopers", lineup: "Basisset voor een commerciële sportschool", machine: "Begin met machines en gebruikers", materials: "Staal, aluminium, rubber en textiel", motion: "Rotatie, greepgeometrie en gebruik", oem: "OEM, ODM, logo en private label", sample: "Een monster als beheerde versie goedkeuren", inspection: "Inspectie en onderhoud", packing: "Verpakking, opslag en nabestelling", rfq: "Gegevens voor de aanvraag aan de fabriek" },
  answer: ["Veel losse handgrepen en stangen passen op meerdere kabelstations wanneer de karabiner door het oog gaat en volledig sluit. Ze zijn niet automatisch universeel. Poortopening, oogdikte, richting, totale lengte en beschikbare kabelweg kunnen de passing en startpositie veranderen.", "Een zakelijke inkoper controleert daarom de echte machines. Voor OEM of private label worden ook materiaal, afwerking, grip, draaiende delen, logo, verpakking en inspectie vastgelegd. PowerBaseFit kan die configuratie per model beoordelen."],
  universal: ["Universeel betekent in webshops vaak alleen dat een gangbare karabiner in het oog past. Het is geen wereldwijde maat en geen garantie voor voldoende ruimte op elke machine.", "Mechanische compatibiliteit betreft inhaken, sluiten en uitlijnen. Functionele compatibiliteit betreft bewegingsweg, vrije ruimte, één of twee kabels, handpositie en opslag."],
  verification: [["Leg de machinezijde vast", "Meet karabinerlichaam, poortopening, bruikbare binnenruimte en richting. Noteer of het kabeleinde kan draaien."], ["Controleer het bevestigingsoog", "Vraag binnenopening, buitendikte, las- of bandconstructie en belastingsrichting. Vergelijk tekening of monster van het gekozen PowerBaseFit-model."], ["Test de werkruimte", "Haak het monster aan, sluit de karabiner en beweeg de kabel onbelast. Volg daarna de instructies van de machine en controleer contact met kap, poelie, frame en houder."]],
  tableColumns: ["Kenmerk", "Waarom", "Bewijs"],
  tableRows: [["Aansluiting", "Sluiting en uitlijning", "Maten van karabiner en oog"], ["Totale lengte", "Startpositie en kabelweg", "Maat van oog tot greep"], ["Greepmaten", "Handpositie en opslag", "Maattekening en monster"], ["Rotatie", "Pols en kabeltwist", "Constructie en monstertest"], ["Materiaal", "Gewicht, gevoel en reiniging", "Opgave per onderdeel"], ["Las/bevestiging", "Draagt de belasting over", "Constructie en inspectiemethode"], ["Afwerking/logo", "Onderhoud en serieherhaling", "Goedgekeurde referentie"], ["Verpakking", "Bescherming en SKU", "Verpakkingsmonster"]],
  checklist: ["Paar enkele handgrepen voor crossover", "Latstang passend bij station en opslag", "Korte rechte of gebogen draaistang", "V-greep of roeigreep", "Tricepstouw met zichtbare controlepunten", "Enkelband als het programma die vraagt", "Geïdentificeerde passende karabiners", "Opslag buiten de looproute", "Vervangingsregel voor slijtdelen", "SKU- en reserveplan"],
  machine: ["Inventariseer functional trainers, cable crossovers, lat pulldowns, low rows en rack-pulleys. Noteer één of twee onafhankelijke kabels en bestaande hulpstukken.", "Een drukke club kan dubbele grepen nodig hebben; een hotel een compact set; een distributeur een duidelijke lijn die eenvoudig is na te bestellen. Kies op gebruik, niet op het aantal delen."],
  materials: ["Staal geeft massa en traditionele karteling, aluminium is lichter bij wisselen, rubber en urethaan veranderen grip en reiniging. Touw en band zijn flexibel, maar naden en eindstops moeten apart worden gecontroleerd.", "Vraag materiaal per onderdeel. Metaal of commercieel gebruik beschrijft kern, greep, bus, bevestiging en oog onvoldoende."],
  motion: ["Rotatie kan de pols volgen en kabeltwist verminderen, maar is niet voor iedere oefening beter. Leg vast welk deel draait, hoeveel speling is toegestaan en hoe het gewricht wordt gecontroleerd.", "Vergelijk diameter, breedte, hoek, structuur, randen en handruimte. Een opvallende vorm mag de kabelweg of bruikbaarheid niet beperken."],
  oem: ["Bij OEM worden vaak logo, afwerking, accentkleur, gripmateriaal, setinhoud, label en doos aangepast. ODM-wijzigingen aan geometrie, oog of draaiconstructie vragen een afzonderlijke haalbaarheidscontrole.", "Keur methode, maat, positie, contrast, richting en reinigingsbelasting van het logo goed op een echt monster en koppel de revisie aan de SKU.", "PowerBaseFit levert handgrepen en sets projectmatig. Minimum, planning en aanpassing hangen van het model af; stuur mix, aantallen, bestemming en merkbrief."],
  sample: ["Het monsterblad vermeldt model, tekening, aansluiting, materialen, afwerking, grip, rotatie, logo, gewicht en verpakking. Foto's tonen uiterlijk; meetpunten vragen methode en resultaat.", "Test sluiting, uitlijning, kabelweg, vrije ruimte, handpositie, opslag en reiniging op de echte machine. Een wijziging krijgt een nieuwe revisie."],
  inspection: ["Controleer oog, las, bevestiging, draaipunt, greep, touw, band, naad en eindstop. Vervorming, scheur, abnormale speling, corrosie, scherpe rand of textielschade betekent uit gebruik nemen en instructies volgen.", "Voor productie worden identiteit, maten, uiterlijk, montage, beweging, logo, aantal en verpakking afgesproken. Belastingsgerelateerde verificatie vraagt een geschreven methode en criterium."],
  packing: ["Scheid en fixeer zware stangen en grepen. Bescherm ogen zonder de SKU te bedekken en beoordeel lange stangen, kleine karabiners en textiel afzonderlijk.", "Een wand- of stationhouder houdt de delen zichtbaar, droog en buiten de looproute. Bewaar tekening, materialen, afwerking, artwork, dooscode en monster voor nabestellingen."],
  rfq: ["Stuur leveranciers dezelfde aanvraag: foto's en maten van aansluiting, aantallen, afmetingen, materialen, rotatie, afwerking, logo, verpakking, bestemming, monster en inspectie. Scheid eisen, voorkeuren en open punten.", "Veel kabelaccessoires zijn breed uitwisselbaar, maar de passing moet worden aangetoond. [Bekijk sets voor kabelmachines](/nl/producten/fitnessaccessoires/cable-machine-accessoireset) of stuur de machinelijst naar de fabriek."],
  faq: [["Passen alle grepen op elke kabelmachine?", "Nee. Karabiner, oog, richting, lengte en vrije ruimte moeten kloppen."], ["Wat moet ik meten?", "Karabiner, poortopening, binnenruimte, oog, dikte, lengte, greep en frameafstand."], ["Welke basisset is nuttig?", "Enkele grepen, latstang, korte stang, roeigreep en tricepstouw vormen een praktische start."], ["Zijn draaigrepen beter?", "Ze helpen bij sommige bewegingen maar zijn niet altijd beter. Oefening en constructie bepalen de keuze."], ["Kan een logo worden toegevoegd?", "Ja op geschikte modellen na goedkeuring van methode, positie, contrast, hoeveelheid en monster."], ["Wat is het verschil tussen OEM en ODM?", "OEM past meestal een bestaand model aan; ODM kan vorm en constructie wijzigen en vraagt diepere validatie."], ["Hoe inspecteer ik ze?", "Vergelijk aansluiting, lassen, bevestigingen, rotatie, grepen, textiel, afwerking, logo, aantal en verpakking."], ["Kan ik een gemengde set bestellen?", "Ja als het project haalbaar is. Stuur delen, aantallen, merk, verpakking, bestemming en nabestelplan."]],
  linkLabels: ["Bekijk professionele accessoires", "Bekijk kabelmachinesets", "Vergelijk aluminium grepen", "Vergelijk stalen grepen", "Stuur een aanvraag"],
  imageCopy: [["Commerciële kabelaccessoireset bij een dubbel kabelstation", "De set volgt machines, gebruikers en opslagruimte."], ["Karabiner en verschillende bevestigingsogen voor passing", "Opening, geometrie, dikte en richting bepalen compatibiliteit."], ["Gekartelde stalen, aluminium en rubberen grepen", "Materiaal beïnvloedt gebruik, reiniging en vervanging."], ["Stangen, grepen, touw en enkelband op een gymhouder", "Geordende opslag houdt onderdelen droog en uit de looproute."], ["Merkloze monsters met verpakking en afwerkingsopties", "Het monster verbindt constructie, afwerking, merk en verpakking."]],
  cta: ["Bespreek uw kabelaccessoireproject", "Stuur aansluitingen, lijst, aantallen, merk en bestemming voor een beoordeling per model.", "Offerte aanvragen"]
};

const arabic: GuideCopy = {
  locale: "ar",
  path: "/ar/blog/tawafuq-mulhaqat-ajhizat-alkabil",
  title: "هل ملحقات أجهزة الكابل موحّدة؟ دليل شراء للشركات | PowerBaseFit",
  description: "دليل للتحقق من الخطاف وحلقة التثبيت والدوران والمقبض ومجموعة النادي والفحص والشعار والتوريد بنظام OEM لملحقات الكابل.",
  h1: "هل تناسب ملحقات أجهزة الكابل جميع الأجهزة؟ دليل التوافق والشراء بنظام OEM",
  primaryKeyword: "توافق ملحقات أجهزة الكابل",
  secondaryKeywords: ["مقابض أجهزة الكابل", "ملحقات الجيم للكابل", "مقبض السحب", "مصنع مقابض الجيم", "مقابض بشعار مخصص", "ملحقات OEM", "مقابض بالجملة"],
  intent: "التحقق من التوافق واختيار مورد لملحقات الكابل التجارية",
  targetBuyer: "مشغلو النوادي والموزعون والمستوردون وأصحاب العلامات الخاصة",
  home: "الرئيسية", library: "المدونة", eyebrow: "PowerBaseFit · مصنع ملحقات أجهزة الكابل", contactPath: "/contact",
  headings: { answer: "الإجابة المختصرة", universal: "ماذا تعني كلمة موحّد في ملحقات الكابل؟", verify: "التحقق من الوصلة قبل الطلب", table: "جدول المواصفات للمشتري", lineup: "مجموعة البداية للنادي التجاري", machine: "ابدأ بالأجهزة والمستخدمين الفعليين", materials: "الفولاذ والألومنيوم والمطاط والمنسوجات", motion: "الدوران وشكل المقبض والاستخدام", oem: "OEM وODM والشعار والعلامة الخاصة", sample: "اعتماد العينة كنسخة محددة", inspection: "الفحص والصيانة في التشغيل", packing: "التعبئة والتخزين وإعادة الطلب", rfq: "المعلومات التي تُرسل إلى المصنع" },
  answer: ["يمكن تركيب كثير من المقابض والقضبان القابلة للفك على أجهزة متعددة عندما يمر الخطاف في حلقة التثبيت ويغلق بالكامل. لكن ذلك لا يجعلها موحّدة تلقائياً. فتحة بوابة الخطاف وسماكة الحلقة واتجاهها وطول الملحق ومسار الكابل المتاح قد تغيّر الملاءمة ووضع البداية.", "على المشتري التجاري فحص الجهاز الحقيقي. وفي مشروع OEM أو علامة خاصة يجب أيضاً تحديد المواد والسطح ومنطقة القبض والأجزاء الدوارة والشعار والتعبئة ونقاط الفحص. تستطيع PowerBaseFit مراجعة هذه العناصر حسب الموديل."],
  universal: ["تعني كلمة موحّد في كثير من القوائم أن الحلقة مصممة لخطاف شائع فقط. وهي لا تحدد قياساً عالمياً ولا تضمن وجود مساحة كافية في كل جهاز.", "التوافق الميكانيكي يعني إمكانية التعليق والإغلاق واستقامة مسار الحمل. أما التوافق الوظيفي فيشمل مدى الحركة والخلوص ونظام كابل واحد أو كابلين ووضع اليد والتخزين."],
  verification: [["وثّق وصلة الجهاز", "قِس جسم الخطاف وفتحة البوابة والمساحة الداخلية والاتجاه، وسجّل ما إذا كانت نهاية الكابل تدور."], ["افحص حلقة الملحق", "اطلب الفتحة الداخلية والسماكة وبنية اللحام أو الحزام واتجاه الحمل. قارن الرسم أو العينة للموديل المحدد."], ["اختبر مساحة التشغيل", "ركّب العينة وأغلق الخطاف وحرك الكابل من دون حمل. ثم اتبع تعليمات الشركة المصنّعة للجهاز وتأكد من عدم ملامسة الغطاء أو البكرة أو الإطار أو الحامل."]],
  tableColumns: ["البند", "أهميته", "الدليل المطلوب"],
  tableRows: [["واجهة التوصيل", "الإغلاق واستقامة الحمل", "قياسات الخطاف والحلقة"], ["الطول الكلي", "موضع البداية ومدى الحركة", "قياس من الحلقة إلى المقبض"], ["أبعاد القبضة", "راحة اليد والتخزين", "رسم بأبعاد وعينة"], ["الدوران", "حرية المعصم والتواء الكابل", "وصف البنية واختبار العينة"], ["المواد", "الوزن والملمس والتنظيف", "بيان لكل مكوّن"], ["اللحام والتثبيت", "نقل الحمل داخل القطعة", "سجل البنية وطريقة الفحص"], ["السطح والشعار", "العناية وتطابق الدفعات", "مرجع معتمد"], ["التعبئة", "حماية القطع ورمز الصنف", "عينة تعبئة"]],
  checklist: ["زوج مقابض فردية لتمارين الكروس أوفر", "قضيب سحب علوي يناسب الجهاز", "قضيب قصير مستقيم أو منحني دوّار", "مقبض V أو مقبض تجديف", "حبل ترايسبس بنهايات قابلة للفحص", "حزام كاحل عند الحاجة", "خطافات متوافقة ومحددة", "حامل بعيد عن مسار المشي", "قاعدة لاستبدال الأجزاء المستهلكة", "خطة رموز وقطع بديلة"],
  machine: ["احصر أجهزة التدريب الوظيفي والكروس أوفر والسحب العلوي والتجديف وأنظمة البكرات على الرفوف. دوّن نظام كابل واحد أو كابلين والملحقات الموجودة.", "قد يحتاج النادي المزدحم إلى مقابض مكررة، بينما يحتاج الفندق إلى مجموعة صغيرة مرتبة، ويحتاج الموزع إلى تشكيلة واضحة يمكن إعادة طلبها. الاختيار يتبع التشغيل لا عدد القطع."],
  materials: ["يوفر الفولاذ وزناً وملمساً محززاً مألوفاً، ويخفف الألومنيوم وزن المناولة، ويغير المطاط أو اليوريثان القبضة والتنظيف. أما الحبل والحزام فيضيفان نقاط فحص للخياطة والنهايات.", "اطلب بيان المواد لكل جزء. عبارة معدن متين لا تشرح القلب والمقبض والجلبة والمثبت والحلقة."],
  motion: ["قد يساعد المفصل الدوار على متابعة المعصم وتقليل التفاف الكابل، لكنه ليس الأفضل لكل حركة. حدّد الجزء الذي يدور والخلوص المقبول وطريقة الفحص.", "قارن القطر والعرض والزاوية والملمس والحواف ومساحة اليد. الشكل المميز لا ينبغي أن يقلل المدى أو يزعج فئات المستخدمين."],
  oem: ["تشمل تعديلات OEM عادة الشعار والسطح واللون ومادة القبضة وتكوين المجموعة والملصق والصندوق. أما تغيير ODM في الهندسة أو الحلقة أو نظام الدوران فيحتاج دراسة منفصلة.", "اعتمد طريقة الشعار وحجمه وموضعه وتباينه واتجاهه وتأثره بالتنظيف على عينة فعلية، واربط نسخة الرسم برمز الصنف.", "تورّد PowerBaseFit المقابض والمجموعات حسب المشروع. تختلف الكمية والمدة وخيارات التخصيص باختلاف الموديل؛ أرسل التشكيلة والكميات والوجهة ومتطلبات العلامة."],
  sample: ["يحدد سجل العينة الموديل والرسم والوصلة والمواد والسطح والقبضة والدوران والشعار والوزن والتعبئة. الصورة تثبت المظهر، أما القياس فيحتاج طريقة ونتيجة.", "اختبر الإغلاق والاستقامة والمدى والخلوص ووضع اليد والحامل والتنظيف على الجهاز الحقيقي. أي تغيير يحتاج نسخة اعتماد جديدة."],
  inspection: ["افحص الحلقة واللحام والمثبت والمفصل والمقبض والحبل والحزام والخياطة والنهاية. التشوه أو الشرخ أو الحركة غير الطبيعية أو التآكل أو الحافة الحادة أو تلف النسيج يتطلب إيقاف القطعة واتباع التعليمات.", "في فحص الدفعة اتفق على الهوية والأبعاد والمظهر والتجميع والحركة والشعار والكمية والتعبئة. أي تحقق متعلق بالحمل يحتاج طريقة ومعياراً مكتوبين."],
  packing: ["افصل القضبان والمقابض الثقيلة وثبتها لمنع الاحتكاك. احمِ الحلقات من دون إخفاء رمز الصنف، وقيّم القضبان الطويلة والخطافات الصغيرة والمنسوجات كلٌ على حدة.", "يحفظ الحامل الجداري أو حامل الجهاز الملحقات ظاهرة وجافة وبعيدة عن الممر. احتفظ بالرسم والمواد والسطح وملف الشعار ورمز الصندوق والعينة لإعادة الطلب."],
  rfq: ["أرسل الطلب نفسه إلى الموردين: صور الوصلة وقياساتها والكميات والأبعاد والمواد والدوران والسطح والشعار والتعبئة والوجهة والعينة والفحص. افصل المتطلبات عن التفضيلات والأسئلة المفتوحة.", "الخلاصة: كثير من الملحقات قابلة للتبادل على نطاق واسع، لكن الملاءمة يجب أن تُثبت. يمكن [مراجعة مجموعة ملحقات الكابل](/products/gym-accessories/cable-machine-attachments) أو إرسال قائمة الأجهزة إلى المصنع."],
  faq: [["هل تناسب كل المقابض كل الأجهزة؟", "لا. يجب التحقق من الخطاف والحلقة والاتجاه والطول والخلوص."], ["ما القياسات المطلوبة؟", "جسم الخطاف وفتحة البوابة والمساحة الداخلية والحلقة والسماكة والطول والقبضة وخلوص الإطار."], ["ما مجموعة البداية؟", "مقابض فردية وقضيب سحب وقضيب قصير ومقبض تجديف وحبل ترايسبس."], ["هل المقبض الدوار أفضل؟", "قد يفيد بعض الحركات لكنه ليس أفضل دائماً. يحدد التمرين والبناء الاختيار."], ["هل يمكن إضافة شعار؟", "نعم في الموديلات المناسبة بعد اعتماد الطريقة والموضع والتباين والكمية والعينة."], ["ما الفرق بين OEM وODM؟", "يعدّل OEM موديلًا موجوداً عادة، بينما قد يغيّر ODM الشكل والبناء ويحتاج تحققاً أعمق."], ["كيف يتم الفحص؟", "تُقارن الوصلة واللحام والمثبت والدوران والقبضة والنسيج والسطح والشعار والكمية والتعبئة بالنسخة المعتمدة."], ["هل يمكن طلب مجموعة مختلطة؟", "نعم حسب إمكانية المشروع. أرسل القطع والكميات والعلامة والتعبئة والوجهة وخطة إعادة الطلب."]],
  linkLabels: ["دليل دمبل الفولاذ OEM", "مشروع مجموعة دمبل كروم"],
  imageCopy: [["مجموعة ملحقات كابل تجارية بجوار محطة بكرات مزدوجة", "تُخطط المجموعة وفق الأجهزة والمستخدمين والتخزين."], ["خطاف وحلقات تثبيت مختلفة لمراجعة الملاءمة", "تحدد الفتحة والهندسة والسماكة والاتجاه التوافق."], ["مقابض من فولاذ محزز وألومنيوم ومطاط", "تغير المواد المناولة والتنظيف وخطة الاستبدال."], ["قضبان ومقابض وحبل وحزام مرتبة على حامل", "يحفظ التخزين الملحقات جافة وبعيدة عن الممر."], ["عينات بلا علامة مع تعبئة وخيارات سطح", "تربط العينة البناء والسطح والعلامة والتعبئة."]],
  cta: ["ناقش مشروع ملحقات الكابل", "أرسل الوصلات والقائمة والكميات والعلامة والوجهة لمراجعة كل موديل.", "اطلب عرض سعر"]
};

const korean: GuideCopy = {
  locale: "ko",
  path: "/ko/blog/cable-machine-attachment-compatibility",
  title: "케이블 머신 손잡이는 호환될까? B2B 구매 가이드 | PowerBaseFit",
  description: "카라비너, 연결 고리, 회전부, 그립, 상업용 세트, 검수, 로고와 OEM 케이블 어태치먼트 조달 기준을 설명합니다.",
  h1: "케이블 머신 어태치먼트는 모두 호환될까? 호환성 및 OEM 구매 가이드",
  primaryKeyword: "케이블 머신 어태치먼트 호환",
  secondaryKeywords: ["케이블 머신 손잡이", "케이블 어태치먼트", "랫풀다운 손잡이", "케이블 손잡이 제조사", "커스텀 로고 손잡이", "OEM 헬스용품", "케이블 손잡이 도매"],
  intent: "상업용 케이블 어태치먼트의 호환성을 확인하고 공급사를 평가",
  targetBuyer: "피트니스센터 운영사, 유통사, 수입사 및 자체 브랜드",
  home: "홈", library: "가이드", eyebrow: "PowerBaseFit · 케이블 어태치먼트 제조사", contactPath: "/ko/contact",
  headings: { answer: "핵심 답변", universal: "케이블 어태치먼트에서 범용이 뜻하는 것", verify: "주문 전 연결부 확인 방법", table: "구매자를 위한 사양표", lineup: "상업용 센터의 기본 구성", machine: "실제 머신과 이용자부터 파악하기", materials: "스틸, 알루미늄, 고무 및 섬유 부품", motion: "회전, 그립 형상과 사용성", oem: "OEM, ODM, 로고와 자체 브랜드", sample: "샘플을 관리된 버전으로 승인하기", inspection: "상업 환경의 검수와 유지관리", packing: "포장, 보관과 재주문", rfq: "공장 견적 요청에 포함할 내용" },
  answer: ["탈착식 손잡이와 바 가운데 상당수는 카라비너가 연결 고리를 통과해 완전히 닫히면 여러 케이블 머신에 사용할 수 있습니다. 그러나 자동으로 모두 호환되는 것은 아닙니다. 게이트 열림 폭, 고리 두께와 방향, 전체 길이, 머신의 유효 스트로크가 체결과 시작 자세를 바꿀 수 있습니다.", "상업용 구매자는 실제 머신에서 이를 확인해야 합니다. OEM 또는 자체 브랜드 프로젝트라면 소재, 표면, 그립, 회전 부품, 로고, 포장, 검수 항목도 같은 승인 기록에 넣어야 합니다. PowerBaseFit은 선택 모델별로 공장 검토를 진행할 수 있습니다."],
  universal: ["판매 페이지의 범용이라는 표현은 흔히 일반적인 카라비너용 고리를 뜻할 뿐입니다. 세계 공통 치수나 모든 머신의 간섭 없는 사용을 보장하지 않습니다.", "기계적 호환성은 체결, 닫힘, 하중 방향을 확인합니다. 기능적 호환성은 운동 범위, 프레임 여유, 1개 또는 2개 케이블, 손 위치와 보관까지 확인합니다."],
  verification: [["머신 쪽 연결부 기록", "카라비너 몸체, 게이트 열림, 내부 여유와 방향을 측정하고 케이블 끝이 회전하는지 기록합니다."], ["어태치먼트 고리 확인", "내부 구멍, 외부 두께, 용접 또는 웨빙 구조와 하중 방향을 요청합니다. 선택한 PowerBaseFit 모델의 도면이나 샘플과 대조합니다."], ["작동 공간 시험", "샘플을 걸고 게이트를 닫은 뒤 무부하로 케이블을 움직입니다. 이후 머신 제조사의 지침에 따라 커버, 풀리, 프레임, 보관대와의 간섭을 확인합니다."]],
  tableColumns: ["사양", "확인 이유", "요청 자료"],
  tableRows: [["연결 인터페이스", "완전한 닫힘과 정렬", "카라비너와 고리 치수"], ["전체 길이", "시작 위치와 스트로크", "고리부터 그립 끝까지 치수"], ["그립 치수", "손 위치와 보관 공간", "치수 도면과 샘플"], ["회전부", "손목 자유도와 케이블 비틀림", "구조 설명과 샘플 시험"], ["소재", "무게, 촉감과 청소", "부품별 소재표"], ["용접/체결", "하중 전달", "모델 구조와 검수 방법"], ["표면/로고", "관리와 재주문 일치", "승인 표면과 도안"], ["포장", "표면 보호와 SKU 식별", "포장 샘플"]],
  checklist: ["크로스오버용 싱글 D 손잡이 한 쌍", "머신과 보관대에 맞는 랫풀다운 바", "직선 또는 곡선 회전 바", "V 그립 또는 로우 핸들", "연결부를 확인할 수 있는 트라이셉 로프", "프로그램에 필요한 경우 앵클 커프", "머신별 호환 카라비너", "통로 밖의 건조한 보관대", "로프·웨빙·그립·회전부 교체 기준", "SKU와 예비품 계획"],
  machine: ["펑셔널 트레이너, 케이블 크로스오버, 랫풀다운, 로우, 랙 장착 풀리를 목록화합니다. 단일 또는 독립 2케이블인지와 기본 제공 부품을 기록합니다.", "이용량이 많은 센터는 손잡이와 로프를 중복 배치할 수 있고, 호텔은 작고 정돈된 세트가 적합할 수 있습니다. 유통사는 설명과 재주문이 쉬운 구성이 중요합니다."],
  materials: ["스틸은 중량감과 익숙한 널링을 제공하고, 알루미늄은 교체 시 취급이 가볍습니다. 고무와 우레탄은 촉감과 세척 방식에 영향을 주며, 로프와 웨빙은 봉제와 엔드 스토퍼라는 점검 부위를 만듭니다.", "부품별 소재표를 요청하십시오. 금속 또는 상업용이라는 표현만으로는 코어, 그립, 부싱, 체결부와 연결 고리를 알 수 없습니다."],
  motion: ["회전 구조는 손목 움직임을 따라가고 케이블 비틀림을 줄일 수 있지만 모든 동작에 우월한 것은 아닙니다. 회전 부위, 허용 유격과 점검 방법을 정합니다.", "그립 직경, 폭, 각도, 표면, 모서리와 손의 여유 공간을 비교합니다. 독특한 형태가 스트로크를 줄이거나 다양한 회원에게 불편하면 적합하지 않습니다."],
  oem: ["OEM에서는 로고, 표면, 포인트 색상, 그립 소재, 세트 구성, 라벨과 박스를 주로 조정합니다. 형상, 연결 고리나 회전 구조를 바꾸는 ODM은 공구와 하중 경로에 영향을 줄 수 있어 별도 검토가 필요합니다.", "실제 샘플에서 로고 방식, 크기, 위치, 대비, 방향과 세척 노출을 승인하고 도안 버전을 SKU에 연결합니다.", "PowerBaseFit은 프로젝트 단위로 손잡이와 세트를 공급합니다. 최소 수량, 일정과 커스터마이징은 모델마다 다르므로 구성, 수량, 도착지와 브랜드 요구를 보내 확인해야 합니다."],
  sample: ["샘플 승인서에는 모델, 도면, 연결부, 소재, 표면, 그립, 회전, 로고, 무게와 포장을 넣습니다. 사진은 외관을 확인하고, 치수는 방법과 결과로 확인합니다.", "실제 머신에서 게이트 닫힘, 정렬, 스트로크, 간섭, 손 위치, 보관과 세척을 시험합니다. 변경이 생기면 새 버전을 승인합니다."],
  inspection: ["연결 고리, 용접, 체결부, 회전부, 그립, 로프, 웨빙, 봉제와 스토퍼를 확인합니다. 변형, 균열, 비정상 유격, 부식, 날카로운 가장자리나 섬유 손상은 사용을 중단하고 관련 지침을 따라야 합니다.", "생산 검수에서는 식별, 치수, 외관, 조립, 움직임, 로고, 수량과 포장을 합의합니다. 하중 관련 확인은 문서화된 방법과 판정 기준이 필요합니다."],
  packing: ["무거운 바와 손잡이는 서로 닿지 않도록 분리하고 고정합니다. 고리를 보호하면서 SKU가 보이게 하고, 긴 바, 작은 카라비너, 섬유 제품은 별도로 평가합니다.", "센터에서는 벽면 또는 머신 보관대가 부품을 건조하고 눈에 보이며 통로 밖에 두게 합니다. 재주문을 위해 도면, 소재, 표면, 로고 파일, 박스 코드와 샘플 기록을 보관합니다."],
  rfq: ["모든 공급사에 같은 내용을 보냅니다. 연결부 사진과 치수, 품목별 수량, 소재, 회전, 표면, 로고, 포장, 도착지, 샘플 및 검수 요구를 포함하고 필수, 선호, 미확정 항목을 구분합니다.", "많은 어태치먼트가 폭넓게 교체 가능하지만 적합성은 확인해야 합니다. [케이블 머신 어태치먼트 세트 보기](/ko/products/gym-accessories/cable-machine-attachments) 또는 머신 목록을 공장에 보내십시오."],
  faq: [["모든 손잡이가 모든 머신에 맞나요?", "아닙니다. 카라비너, 고리, 방향, 길이와 프레임 여유를 확인해야 합니다."], ["무엇을 측정해야 하나요?", "카라비너 몸체와 게이트, 내부 공간, 고리, 두께, 전체 길이, 그립과 프레임 여유입니다."], ["기본 세트는 무엇인가요?", "싱글 손잡이, 랫 바, 짧은 바, 로우 핸들과 트라이셉 로프가 실용적인 출발점입니다."], ["회전 손잡이가 더 좋은가요?", "일부 동작에 유용하지만 항상 더 좋지는 않습니다. 운동과 구조에 따라 선택합니다."], ["로고를 넣을 수 있나요?", "호환 모델에서 방식, 위치, 대비, 수량과 샘플을 승인한 후 가능합니다."], ["OEM과 ODM의 차이는?", "OEM은 기존 모델을 조정하는 경우가 많고 ODM은 형상이나 구조를 바꿀 수 있어 더 깊은 검증이 필요합니다."], ["어떻게 검수하나요?", "연결부, 용접, 체결, 회전, 그립, 섬유, 표면, 로고, 수량과 포장을 승인 기록과 비교합니다."], ["혼합 세트를 주문할 수 있나요?", "프로젝트 타당성에 따라 가능합니다. 품목, 수량, 브랜드, 포장, 도착지와 재주문 계획을 보내십시오."]],
  linkLabels: ["상업용 액세서리 보기", "케이블 세트 보기", "알루미늄 손잡이 비교", "스틸 손잡이 비교", "견적 요청 보내기"],
  imageCopy: [["듀얼 풀리 옆의 상업용 케이블 어태치먼트 세트", "세트는 머신, 이용자와 보관 공간에 맞춰 구성합니다."], ["호환성 확인용 카라비너와 여러 연결 고리", "열림 폭, 형상, 두께와 방향이 호환성을 결정합니다."], ["널링 스틸, 알루미늄과 고무 케이블 그립", "소재는 취급, 청소와 교체 계획을 바꿉니다."], ["보관대에 정리된 바, 손잡이, 로프와 앵클 커프", "전용 보관은 부품을 건조하고 통로 밖에 둡니다."], ["무브랜드 샘플, 중성 포장과 표면 옵션", "샘플은 구조, 표면, 브랜드와 포장을 연결합니다."]],
  cta: ["케이블 어태치먼트 프로젝트 상담", "연결부, 품목, 수량, 브랜드와 도착지를 보내 모델별 검토를 받으십시오.", "견적 요청"]
};

const indonesian: GuideCopy = {
  locale: "id",
  path: "/id/blog/apakah-handle-cable-machine-universal",
  title: "Apakah Handle Cable Machine Universal? Panduan B2B | PowerBaseFit",
  description: "Pelajari cara memeriksa carabiner, eyelet, putaran, grip, set komersial, inspeksi, logo, dan pasokan OEM attachment cable machine.",
  h1: "Apakah Attachment Cable Machine Universal? Panduan Kompatibilitas dan Pembelian OEM",
  primaryKeyword: "apakah attachment cable machine universal",
  secondaryKeywords: ["handle cable gym", "aksesoris cable machine", "lat pulldown handle", "produsen handle gym", "handle custom logo", "aksesoris gym OEM", "handle gym grosir"],
  intent: "memeriksa kompatibilitas dan membeli attachment cable machine untuk penggunaan komersial",
  targetBuyer: "operator gym, distributor, importir, dan merek privat",
  home: "Beranda", library: "Panduan", eyebrow: "PowerBaseFit · Produsen attachment cable machine", contactPath: "/id/kontak",
  headings: { answer: "Jawaban singkat", universal: "Apa arti universal untuk attachment cable machine?", verify: "Cara memeriksa sambungan sebelum membeli", table: "Tabel spesifikasi untuk pembeli", lineup: "Set awal untuk gym komersial", machine: "Mulai dari mesin dan pengguna yang nyata", materials: "Baja, aluminium, karet, dan tekstil", motion: "Putaran, bentuk grip, dan penggunaan", oem: "OEM, ODM, logo, dan merek privat", sample: "Menyetujui sampel sebagai versi terkendali", inspection: "Inspeksi dan perawatan komersial", packing: "Kemasan, penyimpanan, dan pemesanan ulang", rfq: "Data yang perlu dikirim ke pabrik" },
  answer: ["Banyak handle dan bar lepas-pasang dapat digunakan pada beberapa mesin jika carabiner masuk ke eyelet dan tertutup penuh. Namun, produk tersebut tidak otomatis universal. Bukaan gate, ketebalan eyelet, arah sambungan, panjang attachment, dan ruang gerak kabel dapat mengubah kecocokan dan posisi awal latihan.", "Pembeli komersial perlu memeriksa mesin sebenarnya. Untuk proyek OEM atau merek privat, material, hasil akhir, grip, komponen putar, logo, kemasan, dan titik inspeksi juga harus ditetapkan. PowerBaseFit dapat meninjau konfigurasi berdasarkan model."],
  universal: ["Di marketplace, kata universal biasanya hanya berarti eyelet dibuat untuk carabiner umum. Kata itu tidak menetapkan satu ukuran global atau menjamin tidak ada benturan pada semua mesin.", "Kompatibilitas mekanis meliputi pemasangan, penutupan, dan garis beban. Kompatibilitas fungsional meliputi rentang gerak, ruang bebas, sistem satu atau dua kabel, posisi tangan, dan penyimpanan."],
  verification: [["Catat sisi mesin", "Ukur badan carabiner, bukaan gate, ruang dalam, dan arah. Catat apakah ujung kabel dapat berputar."], ["Periksa eyelet attachment", "Minta ukuran dalam, ketebalan, konstruksi las atau webbing, dan arah beban. Bandingkan gambar atau sampel model PowerBaseFit yang dipilih."], ["Uji ruang kerja", "Pasang sampel, tutup carabiner, dan gerakkan kabel tanpa beban. Lanjutkan sesuai petunjuk produsen mesin dan pastikan tidak menyentuh cover, pulley, frame, atau rak."]],
  tableColumns: ["Spesifikasi", "Alasan", "Bukti"],
  tableRows: [["Sambungan", "Penutupan dan kesejajaran", "Ukuran carabiner dan eyelet"], ["Panjang total", "Posisi awal dan rentang gerak", "Ukuran dari eyelet ke grip"], ["Ukuran grip", "Kenyamanan dan penyimpanan", "Gambar berdimensi dan sampel"], ["Putaran", "Gerak pergelangan dan puntiran kabel", "Konstruksi dan uji sampel"], ["Material", "Bobot, rasa, dan pembersihan", "Pernyataan per komponen"], ["Las/pengikat", "Menyalurkan beban", "Konstruksi dan metode inspeksi"], ["Hasil akhir/logo", "Perawatan dan konsistensi", "Referensi yang disetujui"], ["Kemasan", "Perlindungan dan SKU", "Sampel kemasan"]],
  checklist: ["Sepasang single D-handle untuk crossover", "Lat bar sesuai mesin dan ruang simpan", "Straight atau curl bar berputar", "V-handle atau row handle", "Triceps rope dengan titik inspeksi jelas", "Ankle cuff jika program membutuhkannya", "Carabiner kompatibel yang teridentifikasi", "Rak di luar jalur berjalan", "Aturan penggantian komponen aus", "Rencana SKU dan suku cadang"],
  machine: ["Daftar functional trainer, cable crossover, lat pulldown, low row, dan pulley pada rack. Catat sistem satu atau dua kabel dan attachment bawaan.", "Gym ramai mungkin perlu handle cadangan; hotel cenderung membutuhkan set ringkas; distributor memerlukan konfigurasi yang mudah dijelaskan dan dipesan ulang. Pilih berdasarkan operasional, bukan jumlah item."],
  materials: ["Baja memberi bobot dan knurling yang familier, aluminium lebih ringan saat dipindah, karet dan urethane mengubah grip serta pembersihan. Rope dan webbing fleksibel tetapi menambah jahitan dan stopper yang perlu diperiksa.", "Minta material per komponen. Istilah logam kuat atau kelas komersial tidak menjelaskan core, grip, bushing, pengikat, dan eyelet."],
  motion: ["Sambungan berputar dapat mengikuti pergelangan dan mengurangi puntiran kabel, tetapi tidak selalu lebih baik. Tentukan bagian yang berputar, kelonggaran yang dapat diterima, dan cara pemeriksaannya.", "Bandingkan diameter, lebar, sudut, tekstur, tepi, dan ruang tangan. Bentuk unik tidak boleh mengurangi rentang gerak atau menyulitkan sebagian anggota gym."],
  oem: ["Proyek OEM sering menyesuaikan logo, hasil akhir, warna aksen, material grip, isi set, label, dan karton. Perubahan ODM pada bentuk, eyelet, atau sistem putar memerlukan evaluasi terpisah karena dapat memengaruhi tooling dan konstruksi.", "Setujui metode, ukuran, posisi, kontras, arah, dan paparan pembersihan logo pada sampel nyata, lalu kaitkan versi berkas desain dengan SKU.", "PowerBaseFit memasok handle dan set berdasarkan proyek. Minimum, jadwal, dan kustomisasi berbeda per model; kirim mix, jumlah, tujuan, dan brief merek untuk diperiksa."],
  sample: ["Lembar sampel mencatat model, gambar, sambungan, material, hasil akhir, grip, putaran, logo, bobot, dan kemasan. Foto mengonfirmasi tampilan; ukuran memerlukan metode dan hasil.", "Uji penutupan, kesejajaran, rentang, benturan, posisi tangan, rak, dan pembersihan pada mesin nyata. Perubahan spesifikasi memerlukan revisi baru."],
  inspection: ["Periksa eyelet, las, pengikat, swivel, grip, rope, webbing, jahitan, dan stopper. Deformasi, retak, kelonggaran tidak normal, korosi, tepi tajam, atau tekstil rusak berarti produk dikeluarkan dari penggunaan dan mengikuti petunjuk terkait.", "Untuk produksi, sepakati identitas, ukuran, tampilan, perakitan, gerakan, logo, jumlah, dan kemasan. Pemeriksaan terkait beban membutuhkan metode dan kriteria tertulis."],
  packing: ["Pisahkan dan kunci bar serta handle yang berat. Lindungi eyelet tanpa menutup SKU dan nilai long bar, carabiner kecil, serta tekstil secara terpisah.", "Di gym, rak dinding atau rak mesin menjaga attachment terlihat, kering, dan di luar jalur. Simpan gambar, material, hasil akhir, berkas desain, kode karton, dan sampel untuk pemesanan ulang."],
  rfq: ["Kirim permintaan yang sama ke pemasok: foto dan ukuran sambungan, jumlah, dimensi, material, putaran, hasil akhir, logo, kemasan, tujuan, sampel, dan inspeksi. Pisahkan kebutuhan wajib, preferensi, dan pertanyaan terbuka.", "Banyak attachment dapat dipertukarkan secara luas, tetapi kecocokannya harus dibuktikan. [Lihat set attachment cable machine](/id/produk/aksesori-gym/set-attachment-mesin-kabel) atau kirim daftar mesin untuk ditinjau pabrik."],
  faq: [["Apakah semua handle cocok untuk semua mesin?", "Tidak. Carabiner, eyelet, arah, panjang, dan ruang bebas harus diperiksa."], ["Apa yang perlu diukur?", "Badan dan gate carabiner, ruang dalam, eyelet, ketebalan, panjang, grip, dan jarak frame."], ["Apa isi set awal?", "Single handle, lat bar, short bar, row handle, dan triceps rope adalah dasar yang praktis."], ["Apakah handle berputar lebih baik?", "Berguna untuk beberapa gerakan, tetapi tidak selalu lebih baik. Latihan dan konstruksi menentukan pilihan."], ["Bisakah ditambah logo?", "Bisa pada model yang sesuai setelah metode, posisi, kontras, jumlah, dan sampel disetujui."], ["Apa beda OEM dan ODM?", "OEM biasanya menyesuaikan model yang ada; ODM dapat mengubah bentuk atau konstruksi dan memerlukan validasi lebih dalam."], ["Bagaimana inspeksinya?", "Bandingkan sambungan, las, pengikat, putaran, grip, tekstil, hasil akhir, logo, jumlah, dan kemasan."], ["Bisakah memesan set campuran?", "Bisa jika layak. Kirim item, jumlah, merek, kemasan, tujuan, dan rencana pemesanan ulang."]],
  linkLabels: ["Lihat aksesori komersial", "Lihat set cable machine", "Bandingkan handle aluminium", "Bandingkan handle baja", "Kirim permintaan harga"],
  imageCopy: [["Set attachment komersial di samping stasiun kabel ganda", "Set direncanakan berdasarkan mesin, pengguna, dan penyimpanan."], ["Carabiner dan beberapa eyelet untuk memeriksa kecocokan", "Bukaan, geometri, ketebalan, dan arah menentukan kompatibilitas."], ["Grip baja knurling, aluminium, dan karet", "Material mengubah penanganan, pembersihan, dan penggantian."], ["Bar, handle, rope, dan ankle cuff tersusun pada rak", "Penyimpanan menjaga attachment kering dan di luar jalur berjalan."], ["Sampel tanpa merek dengan kemasan dan pilihan hasil akhir", "Sampel menghubungkan konstruksi, hasil akhir, merek, dan kemasan."]],
  cta: ["Bahas proyek attachment cable machine", "Kirim sambungan, daftar, jumlah, merek, dan tujuan untuk tinjauan per model.", "Minta penawaran"]
};

const polish: GuideCopy = {
  locale: "pl",
  path: "/pl/blog/uchwyty-do-wyciagu-uniwersalne-kompatybilnosc",
  title: "Czy Uchwyty do Wyciągu Są Uniwersalne? Poradnik B2B | PowerBaseFit",
  description: "Sprawdź karabińczyk, ucho, obrót, chwyt, zestaw klubowy, kontrolę, logo i dostawy OEM uchwytów do wyciągów.",
  h1: "Czy Uchwyty do Wyciągu Są Uniwersalne? Poradnik Kompatybilności i Zakupu OEM",
  primaryKeyword: "uchwyty do wyciągu uniwersalne",
  secondaryKeywords: ["akcesoria do wyciągu", "uchwyty do bramy", "uchwyty do atlasu", "producent uchwytów", "uchwyty z logo", "akcesoria fitness OEM", "uchwyty hurt"],
  intent: "sprawdzić kompatybilność i kupić akcesoria do wyciągów dla obiektów komercyjnych",
  targetBuyer: "siłownie, dystrybutorzy, importerzy i marki własne",
  home: "Strona główna", library: "Poradniki", eyebrow: "PowerBaseFit · Producent akcesoriów do wyciągów", contactPath: "/pl/kontakt",
  headings: { answer: "Krótka odpowiedź", universal: "Co znaczy uniwersalny w przypadku uchwytu?", verify: "Jak sprawdzić połączenie przed zakupem", table: "Tabela specyfikacji dla kupującego", lineup: "Zestaw startowy do siłowni komercyjnej", machine: "Najpierw maszyny i użytkownicy", materials: "Stal, aluminium, guma i tekstylia", motion: "Obrót, geometria chwytu i obsługa", oem: "OEM, ODM, logo i marka własna", sample: "Zatwierdzenie próbki jako wersji kontrolowanej", inspection: "Kontrola i konserwacja w obiekcie", packing: "Pakowanie, przechowywanie i ponowne zamówienie", rfq: "Dane do zapytania wysyłanego fabryce" },
  answer: ["Wiele odpinanych uchwytów i drążków pasuje do różnych wyciągów, jeśli karabińczyk przechodzi przez ucho i zamyka się całkowicie. Nie oznacza to automatycznej uniwersalności. Otwarcie zamka, grubość i kierunek ucha, długość akcesorium oraz dostępny skok linki mogą zmienić montaż i pozycję startową.", "Kupujący komercyjny powinien sprawdzić rzeczywistą maszynę. W projekcie OEM lub marki własnej zapisuje także materiały, wykończenie, chwyt, elementy obrotowe, logo, opakowanie i punkty kontroli. PowerBaseFit może ocenić te elementy dla konkretnego modelu."],
  universal: ["W ofertach słowo uniwersalny zwykle oznacza ucho dla popularnego karabińczyka. Nie ustanawia światowego wymiaru i nie gwarantuje miejsca przy każdej osłonie czy rolce.", "Kompatybilność mechaniczna dotyczy zaczepienia, zamknięcia i linii obciążenia. Funkcjonalna obejmuje zakres ruchu, prześwit, jeden lub dwa przewody, pozycję dłoni i przechowywanie."],
  verification: [["Udokumentuj stronę maszyny", "Zmierz korpus karabińczyka, otwarcie zamka, użyteczną przestrzeń wewnętrzną i kierunek. Zapisz, czy koniec linki się obraca."], ["Sprawdź ucho akcesorium", "Poproś o otwór wewnętrzny, grubość, konstrukcję spawaną lub taśmową i kierunek obciążenia. Porównaj rysunek lub próbkę wybranego modelu PowerBaseFit."], ["Przetestuj przestrzeń roboczą", "Podepnij próbkę, zamknij karabińczyk i przeprowadź linkę bez obciążenia. Następnie postępuj według instrukcji maszyny i wyklucz kontakt z osłoną, rolką, ramą i wieszakiem."]],
  tableColumns: ["Parametr", "Znaczenie", "Dowód"],
  tableRows: [["Połączenie", "Zamknięcie i ustawienie", "Wymiary karabińczyka i ucha"], ["Długość całkowita", "Pozycja startowa i skok", "Wymiar od ucha do chwytu"], ["Wymiary chwytu", "Dłoń i miejsce składowania", "Rysunek i próbka"], ["Obrót", "Nadgarstek i skręcanie linki", "Opis konstrukcji i próba"], ["Materiały", "Masa, dotyk i czyszczenie", "Dane dla każdego elementu"], ["Spaw/mocowanie", "Przenosi obciążenie", "Konstrukcja i metoda kontroli"], ["Wykończenie/logo", "Pielęgnacja i zgodność partii", "Zatwierdzony wzorzec"], ["Opakowanie", "Ochrona i identyfikacja SKU", "Próbka pakowania"]],
  checklist: ["Para pojedynczych uchwytów do bramy", "Drążek lat pull dopasowany do stacji", "Krótki drążek prosty lub łamany z obrotem", "Uchwyt V lub do wiosłowania", "Lina triceps z widocznymi punktami kontroli", "Opaska na kostkę, jeśli wymaga jej program", "Zidentyfikowane kompatybilne karabińczyki", "Wieszak poza ciągiem komunikacyjnym", "Zasada wymiany części zużywalnych", "Plan SKU i części zamiennych"],
  machine: ["Zrób listę bram, wyciągów górnych i dolnych, maszyn do wiosłowania oraz systemów montowanych do racka. Zapisz jeden lub dwa niezależne przewody i wyposażenie podstawowe.", "Popularny klub może potrzebować dubli, hotel małego uporządkowanego zestawu, a dystrybutor przejrzystej serii do ponownego zamówienia. Wybór wynika z eksploatacji, nie liczby elementów."],
  materials: ["Stal zapewnia masę i klasyczne radełkowanie, aluminium ułatwia zmianę, guma i uretan zmieniają chwyt oraz czyszczenie. Lina i taśma są elastyczne, lecz szwy i odboje wymagają osobnej kontroli.", "Żądaj materiału dla każdego komponentu. Określenia metal lub klasa komercyjna nie opisują rdzenia, rękojeści, tulei, mocowania i ucha."],
  motion: ["Obrót może podążać za nadgarstkiem i ograniczać skręcanie linki, ale nie jest zawsze lepszy. Określ obracający się element, dopuszczalny luz i sposób przeglądu.", "Porównaj średnicę, szerokość, kąt, teksturę, krawędzie i miejsce dla dłoni. Nietypowy kształt nie może ograniczać skoku ani wygody różnych użytkowników."],
  oem: ["W OEM często zmienia się logo, wykończenie, kolor akcentu, materiał chwytu, skład zestawu, etykietę i karton. Zmiany ODM w geometrii, uchu lub obrocie wymagają osobnej oceny konstrukcji.", "Zatwierdź metodę, rozmiar, położenie, kontrast, kierunek i wpływ czyszczenia na logo na rzeczywistej próbce, łącząc wersję grafiki z SKU.", "PowerBaseFit dostarcza uchwyty i zestawy projektowo. Minimum, termin i personalizacja zależą od modelu; prześlij miks, ilości, miejsce docelowe i założenia marki."],
  sample: ["Karta próbki identyfikuje model, rysunek, połączenie, materiały, wykończenie, chwyt, obrót, logo, masę i pakowanie. Zdjęcie potwierdza wygląd; wymiar wymaga metody i wyniku.", "Na prawdziwej maszynie sprawdź zamknięcie, ustawienie, skok, kolizje, pozycję dłoni, wieszak i czyszczenie. Zmiana specyfikacji wymaga nowej wersji."],
  inspection: ["Kontroluj ucho, spaw, mocowanie, przegub, chwyt, linę, taśmę, szew i odbojnik. Odkształcenie, pęknięcie, nietypowy luz, korozja, ostra krawędź lub uszkodzony materiał oznaczają wycofanie z użycia i zastosowanie instrukcji.", "Dla partii uzgodnij identyfikację, wymiary, wygląd, montaż, ruch, logo, ilość i opakowanie. Sprawdzenie związane z obciążeniem wymaga zapisanej metody i kryterium."],
  packing: ["Ciężkie drążki i uchwyty oddziel i unieruchom. Chroń ucha bez zasłaniania SKU; osobno oceń długie drążki, małe karabińczyki i tekstylia.", "W siłowni uchwyt ścienny lub przy maszynie utrzymuje akcesoria widoczne, suche i poza przejściem. Zachowaj rysunek, materiały, wykończenie, grafikę, kod kartonu i próbkę dla kolejnego zamówienia."],
  rfq: ["Wyślij dostawcom to samo zapytanie: zdjęcia i wymiary połączeń, ilości, wymiary, materiały, obrót, wykończenie, logo, opakowanie, miejsce dostawy, próbkę i kontrolę. Oddziel wymagania, preferencje i kwestie otwarte.", "Wiele uchwytów jest szeroko wymiennych, ale dopasowanie trzeba wykazać. [Zobacz zestawy do wyciągów](/pl/produkty/akcesoria-fitness/zestaw-akcesoriow-do-wyciagu) lub wyślij listę maszyn do fabryki."],
  faq: [["Czy każdy uchwyt pasuje do każdego wyciągu?", "Nie. Karabińczyk, ucho, kierunek, długość i prześwit muszą być sprawdzone."], ["Co należy zmierzyć?", "Korpus i zamek karabińczyka, wnętrze, ucho, grubość, długość, chwyt i odległość od ramy."], ["Co kupić na początek?", "Pojedyncze uchwyty, drążek lat, krótki drążek, uchwyt do wiosłowania i lina to praktyczna baza."], ["Czy uchwyty obrotowe są lepsze?", "Pomagają w części ruchów, ale nie zawsze są lepsze. Decydują ćwiczenie i konstrukcja."], ["Czy można dodać logo?", "Tak w zgodnych modelach po zatwierdzeniu metody, położenia, kontrastu, ilości i próbki."], ["Czym różnią się OEM i ODM?", "OEM zwykle dostosowuje istniejący model; ODM może zmieniać geometrię i konstrukcję, więc wymaga głębszej walidacji."], ["Jak je kontrolować?", "Porównaj połączenie, spawy, mocowania, obrót, chwyty, tekstylia, wykończenie, logo, ilość i pakowanie."], ["Czy można zamówić zestaw mieszany?", "Tak, jeśli projekt jest wykonalny. Prześlij elementy, ilości, markę, opakowanie, cel i plan ponownego zamówienia."]],
  linkLabels: ["Zobacz akcesoria komercyjne", "Zobacz zestawy do wyciągów", "Porównaj uchwyty aluminiowe", "Porównaj uchwyty stalowe", "Wyślij zapytanie"],
  imageCopy: [["Komercyjny zestaw akcesoriów przy podwójnej bramie", "Zestaw planuje się według maszyn, użytkowników i miejsca."], ["Karabińczyk i różne ucha do sprawdzenia dopasowania", "Otwarcie, geometria, grubość i kierunek określają kompatybilność."], ["Radełkowane chwyty stalowe, aluminiowe i gumowe", "Materiał zmienia obsługę, czyszczenie i wymianę."], ["Drążki, uchwyty, lina i opaska na wieszaku", "Uporządkowane przechowywanie utrzymuje części suche i poza przejściem."], ["Próbki bez marki z opakowaniem i wariantami wykończenia", "Próbka łączy konstrukcję, wykończenie, markę i pakowanie."]],
  cta: ["Omów projekt akcesoriów do wyciągów", "Prześlij połączenia, listę, ilości, markę i miejsce dostawy do oceny modeli.", "Poproś o wycenę"]
};

const copies: GuideCopy[] = [english, portuguese, spanish, german, french, vietnamese, swedish, italian, dutch, arabic, korean, indonesian, polish];

const defaultTargets = [
  "gym-accessories-category",
  "product:accessories:cable-machine-attachments",
  "product:accessories:aluminum-gym-handles",
  "product:accessories:solid-steel-gym-handles",
  "contact"
];

function authorFor(copy: GuideCopy): [LocalizedAuthor, LocalizedAuthor] {
  return [
    { id: `powerbasefit-cable-team-${copy.locale}`, name: "PowerBaseFit", kind: "Organization", role: copy.eyebrow.replace(/^PowerBaseFit · /u, "") },
    { id: `powerbasefit-quality-team-${copy.locale}`, name: "PowerBaseFit", kind: "Organization", role: copy.headings.inspection }
  ];
}

function imagesFor(copy: GuideCopy): LocalizedImage[] {
  return imageFiles.map(([src, width, height], index) => ({
    id: `cable-attachment-image-${index + 1}`,
    src,
    width,
    height,
    alt: copy.imageCopy[index][0],
    caption: copy.imageCopy[index][1]
  }));
}

function rich(id: string, heading: string, paragraphs: string[], component?: string): ContentBlock {
  return { id, type: "rich_text", heading, content: paragraphs.join("\n\n"), data: component ? { component } : undefined };
}

function bodyFor(copy: GuideCopy): ContentBlock[] {
  const verificationMarkdown = copy.verification.map(([heading, text]) => `### ${heading}\n\n${text}`).join("\n\n");
  return [
    rich("quick-answer", copy.headings.answer, copy.answer, "quick-answer"),
    rich("universal-definition", copy.headings.universal, copy.universal, "definition"),
    { id: "verify-compatibility", type: "custom", heading: copy.headings.verify, data: { component: "markdown-section", markdown: verificationMarkdown } },
    { id: "buyer-specification-table", type: "specifications", heading: copy.headings.table, data: { columns: copy.tableColumns, rows: copy.tableRows } },
    { id: "commercial-starter-set", type: "features", heading: copy.headings.lineup, data: { items: copy.checklist } },
    rich("machine-map", copy.headings.machine, copy.machine),
    rich("materials-and-finish", copy.headings.materials, copy.materials),
    rich("rotation-and-grip", copy.headings.motion, copy.motion),
    rich("oem-private-label", copy.headings.oem, copy.oem),
    rich("sample-approval", copy.headings.sample, copy.sample),
    rich("inspection-maintenance", copy.headings.inspection, copy.inspection),
    rich("packing-reorders", copy.headings.packing, copy.packing),
    rich("rfq-and-decision", copy.headings.rfq, copy.rfq)
  ];
}

function linksFor(copy: GuideCopy) {
  const targets = copy.locale === "ar" ? ["bulk-oem-steel-dumbbells-guide", "case-compact-chrome-dumbbell-set"] : defaultTargets;
  return targets.map((targetContentId, index) => ({ targetContentId, label: copy.linkLabels[index] }));
}

function versionFor(copy: GuideCopy): LocalizedContentVersion {
  const [author, reviewer] = authorFor(copy);
  return {
    locale: copy.locale,
    translationStatus: copy.locale === "en" ? "published" : "localized",
    reviewStatus: "approved",
    publishStatus: "published",
    slug: copy.path.split("/").filter(Boolean).at(-1) ?? entityId,
    publicPath: copy.path,
    title: copy.title,
    description: copy.description,
    h1: copy.h1,
    body: bodyFor(copy),
    faq: copy.faq.map(([question, answer], index) => ({ id: `faq-${index + 1}`, question, answer })),
    author,
    reviewedBy: reviewer,
    schemaData: {
      category: copy.intent,
      breadcrumbs: [
        { name: copy.home, path: copy.locale === "en" || copy.locale === "ar" ? "/" : `/${copy.path.split("/").filter(Boolean)[0]}` },
        { name: copy.library, path: copy.locale === "en" || copy.locale === "ar" ? "/resources" : copy.path.split("/").slice(0, 3).join("/") },
        { name: copy.h1, path: copy.path }
      ],
      extra: {
        primaryKeyword: copy.primaryKeyword,
        secondaryKeywords: copy.secondaryKeywords,
        targetBuyer: copy.targetBuyer,
        eyebrow: copy.eyebrow,
        contactPath: copy.contactPath,
        ctaTitle: copy.cta[0],
        ctaText: copy.cta[1],
        ctaLabel: copy.cta[2]
      }
    },
    images: imagesFor(copy),
    internalLinks: linksFor(copy),
    canonicalData: { mode: "self" },
    hreflangData: { include: true },
    publishedAt,
    updatedAt: publishedAt,
    version: 1
  };
}

function englishMarkdown() {
  const table = [
    `| ${english.tableColumns.join(" | ")} |`,
    `| ${english.tableColumns.map(() => "---").join(" | ")} |`,
    ...english.tableRows.map((row) => `| ${row.join(" | ")} |`)
  ].join("\n");
  const faq = english.faq.map(([question, answer]) => `### ${question}\n\n${answer}`).join("\n\n");
  return [
    `## ${english.headings.answer}\n\n${english.answer.join("\n\n")}`,
    `## ${english.headings.universal}\n\n${english.universal.join("\n\n")}`,
    `## ${english.headings.verify}\n\n${english.verification.map(([heading, text]) => `### ${heading}\n\n${text}`).join("\n\n")}`,
    `## ${english.headings.table}\n\n${table}`,
    `## ${english.headings.lineup}\n\n${english.checklist.map((item) => `- ${item}`).join("\n")}`,
    `## ${english.headings.machine}\n\n${english.machine.join("\n\n")}`,
    `## ${english.headings.materials}\n\n${english.materials.join("\n\n")}`,
    `## ${english.headings.motion}\n\n${english.motion.join("\n\n")}`,
    `## ${english.headings.oem}\n\n${english.oem.join("\n\n")}`,
    `## ${english.headings.sample}\n\n${english.sample.join("\n\n")}`,
    `## ${english.headings.inspection}\n\n${english.inspection.join("\n\n")}`,
    `## ${english.headings.packing}\n\n${english.packing.join("\n\n")}`,
    `## ${english.headings.rfq}\n\n${english.rfq.join("\n\n")}`,
    `## Frequently Asked Questions\n\n${faq}`,
    `## Discuss a Cable Attachment Requirement\n\n${english.cta[1]} [${english.cta[2]}](/contact).`
  ].join("\n\n");
}

export const cableAttachmentEnglishPost = {
  entityId,
  publicPath: english.path,
  title: english.title,
  h1: english.h1,
  description: english.description,
  primaryKeyword: english.primaryKeyword,
  secondaryKeywords: english.secondaryKeywords,
  searchIntent: english.intent,
  content: englishMarkdown(),
  images: imagesFor(english),
  publishedAt,
  updatedAt: publishedAt
};

export function withCableAttachmentCompatibilityGuide(manifest: ContentManifest): ContentManifest {
  if (manifest.entities.some((entity) => entity.id === entityId)) throw new Error(`Duplicate content entity: ${entityId}`);
  const entity: ContentEntity = {
    id: entityId,
    type: "blog",
    defaultLocale: "en",
    versions: Object.fromEntries(copies.map((copy) => [copy.locale, versionFor(copy)])) as ContentEntity["versions"]
  };
  return { ...manifest, entities: [...manifest.entities, entity] };
}
