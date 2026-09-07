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

type Headings = {
  answer: string;
  definition: string;
  specify: string;
  table: string;
  record: string;
  method: string;
  sampling: string;
  pairing: string;
  dimensions: string;
  materials: string;
  oem: string;
  sample: string;
  shipment: string;
  rfq: string;
};

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
  headings: Headings;
  answer: string[];
  definition: string[];
  specification: Array<[string, string]>;
  tableColumns: string[];
  tableRows: string[][];
  checklist: string[];
  method: string[];
  sampling: string[];
  pairing: string[];
  dimensions: string[];
  materials: string[];
  oem: string[];
  sample: string[];
  shipment: string[];
  rfq: string[];
  faq: Array<[string, string]>;
  linkLabels: string[];
  imageCopy: Array<[string, string]>;
  cta: [string, string, string];
};

const publishedAt = "2026-08-31T08:00:00.000Z";
const entityId = "weight-plate-tolerance-bulk-order-guide";
const imageRoot = "/assets/resources/weight-plate-tolerance";
const imageFiles: Array<[string, number, number]> = [
  [`${imageRoot}/weight-plate-tolerance-inspection.webp`, 1536, 1024],
  [`${imageRoot}/weighing-olympic-plate.webp`, 1536, 1024],
  [`${imageRoot}/measuring-center-hole-fit.webp`, 1536, 1024],
  [`${imageRoot}/matching-weight-plate-pairs.webp`, 1536, 1024],
  [`${imageRoot}/oem-weight-plate-specification-review.webp`, 1536, 1024]
];

const english: GuideCopy = {
  locale: "en",
  path: "/resources/weight-plate-tolerance-bulk-order-guide",
  title: "Weight Plate Tolerance for Bulk Orders: Buyer Guide | PowerBaseFit",
  description: "Learn how to specify and verify weight plate tolerance, scale method, sampling, pair matching, dimensions, custom logo and private-label bulk supply.",
  h1: "How to Specify Weight Plate Tolerance for a Bulk Order",
  primaryKeyword: "weight plate tolerance bulk order",
  secondaryKeywords: ["weight plate accuracy", "commercial weight plates", "weight plate manufacturer", "custom logo weight plates", "OEM weight plates", "private label plates", "wholesale weight plates"],
  intent: "buyer specification and shipment acceptance for bulk weight plates",
  targetBuyer: "distributors, importers, private-label brands and commercial gym procurement teams",
  home: "Home",
  library: "Resources",
  eyebrow: "PowerBaseFit · Weight plate factory guide",
  contactPath: "/contact",
  headings: {
    answer: "Quick answer",
    definition: "What weight plate tolerance actually means",
    specify: "Write a tolerance clause that can be inspected",
    table: "Weight plate acceptance table for buyers",
    record: "Fields to record for every inspection result",
    method: "Set up a repeatable weighing method",
    sampling: "Choose the inspection scope before production",
    pairing: "Treat pair matching as a separate requirement",
    dimensions: "Weight accuracy does not replace dimensional checks",
    materials: "Why plate construction changes the control plan",
    oem: "OEM, ODM, custom logo and private-label effects",
    sample: "Approve a production-equivalent sample",
    shipment: "Connect shipment inspection to the purchase order",
    rfq: "What to send a weight plate factory in an RFQ"
  },
  answer: [
    "A useful weight plate tolerance is a written acceptance band around the marked mass for a named plate model and size. It should state whether the band is expressed as a percentage, an absolute mass, or both; how the plate will be weighed; which units control; how many pieces will be checked; and what happens when a result falls outside the band.",
    "There is no honest universal number for every cast-iron, coated, bumper or calibrated plate. The buyer should select the requirement from the real use case, then obtain model-specific confirmation. As a factory, PowerBaseFit can review the weight ladder, construction, logo, packaging and inspection method before a bulk OEM or private-label order is approved."
  ],
  definition: [
    "Nominal mass is the value marked on the plate. Measured mass is the result produced by the agreed weighing method. Tolerance is the permitted difference between those two values; it is not a statement that every plate will equal the nominal value exactly.",
    "Accuracy, scale resolution, repeatability, calibration status and sampling are related but distinct. A precise-looking display does not prove a reliable result, and a sample that passes does not by itself describe every piece in a shipment. Keep the product criterion, measurement method and inspection scope as separate lines in the purchase record."
  ],
  specification: [
    ["Name the calculation", "For a percentage band, record the nominal mass, measured mass and signed deviation, then calculate deviation as a share of nominal mass. For an absolute band, state the controlling unit. Do not let the supplier and inspector choose different interpretations after production."],
    ["Name the method", "Identify the scale capacity and resolution, the status of the reference check, the surface and environment, whether packaging is removed, how the reading stabilizes and whether repeat readings are required. An internal production check is not automatically a traceable laboratory calibration."],
    ["Name the decision rule", "State the sample scope, pair rule if any, permitted result, reporting format and treatment of a failed piece or failed sample. Link the clause to the approved model, weight denomination and purchase-order revision. [Compare the current weight plate range](/products/weight-plates) before fixing the clause."]
  ],
  tableColumns: ["Control point", "What the buyer should define", "Evidence to retain"],
  tableRows: [
    ["Plate identity", "Model, material, denomination and revision", "Drawing, SKU and approved sample"],
    ["Nominal mass", "The kg or lb value shown on the plate", "Artwork and specification sheet"],
    ["Permitted deviation", "Percentage, absolute mass or both", "Signed purchase-order clause"],
    ["Weighing equipment", "Capacity, resolution and verification status", "Equipment ID and check record"],
    ["Weighing procedure", "Unpacked plate, stable surface, repeat rule and unit", "Work instruction and result sheet"],
    ["Inspection scope", "Every piece or an agreed risk-based sample", "Sampling plan and inspected IDs"],
    ["Pair matching", "Maximum difference between two selected mates, if required", "Pair IDs and both readings"],
    ["Disposition", "Recheck, segregation, correction or rejection route", "Nonconformance and release record"]
  ],
  checklist: [
    "Date, order number, SKU and plate denomination",
    "Nominal mass and controlling unit",
    "Measured mass with the scale resolution shown",
    "Signed deviation and acceptance limit",
    "Scale identity and status of the reference check",
    "Operator or inspection-party identity",
    "Piece, pair, carton or sample identifier",
    "Ambient or setup notes that may affect repeatability",
    "Pass, recheck or segregate decision",
    "Photo only as supporting context, not as the measurement record"
  ],
  method: [
    "Use a scale whose capacity covers the heaviest plate while its resolution is fine enough for the agreed band. Place it on a stable, level surface, allow it to settle as its instructions require, and confirm its status with the selected reference procedure. Weigh the unpacked plate in the same unit used by the acceptance clause.",
    "If a reading moves, repeat it using the written rule rather than selecting the most convenient number. Record all required readings and the scale resolution. A warehouse check can support order acceptance, but it should not be described as traceable calibration unless the necessary chain and uncertainty documentation exist."
  ],
  sampling: [
    "Choose the scope from product risk, process maturity, order size and the cost of a miss. A first order, new mold, new material, new insert or changed logo may justify a different plan from an unchanged repeat order. The plan must say whether it applies per SKU, denomination, lot, carton or shipment.",
    "Do not invent a sample count after seeing the goods. If every piece is not weighed, identify how the sample is selected and what expands the inspection. Keep mass inspection separate from visual, dimensional and packaging sampling because each failure mode may need a different scope."
  ],
  pairing: [
    "A plate can pass its individual tolerance and still form an undesirable pair with another passing plate at the opposite end of the band. Where balanced pairs matter, add a separate maximum pair difference and label or pack the approved mates so the relationship survives shipment and warehouse handling.",
    "Pair matching is useful for selected premium sets, display packs or facilities that manage plates in fixed pairs. It should not be promised for every wholesale order without a written rule, identification method and packing plan."
  ],
  dimensions: [
    "Mass acceptance does not confirm center-hole fit, outside diameter, thickness, flatness or insert alignment. A plate may meet its marked mass while loading poorly on the selected bar, crowding the sleeve or sitting unevenly in a stack. Keep these dimensions on the model drawing and check them with suitable gauges or a confirmed bar interface.",
    "For bumper plates, consistent outer geometry affects how mixed denominations meet the platform. For cast-iron and grip plates, profile and hand openings affect storage and handling. These are product decisions, not deductions that can be made from a scale reading."
  ],
  materials: [
    "Cast parts, steel cores, rubber or urethane coverings, hubs, inserts, paint and molded markings contribute to the final mass in different ways. The control point should follow the finished, assembled plate, not an unfinished core that will later receive coating, inserts or branding.",
    "When a material, mold, insert or finish changes, confirm whether the existing mass-control route still applies. Avoid broad phrases such as precision grade unless the quotation defines the actual model, permitted deviation and inspection evidence."
  ],
  oem: [
    "Custom logo relief, printed marks, color, hub design, dual kg/lb marking and private-label packaging all belong in the approved version. A small artwork change may be visually simple but still changes the production specification; deeper ODM changes to mold geometry or inserts require a new technical review.",
    "PowerBaseFit can discuss OEM branding, ODM feasibility, custom-logo placement, private-label cartons and mixed bulk supply after the plate family and use case are known. MOQ, tooling, timing and available methods vary by model and must be confirmed in the quotation rather than assumed from a guide."
  ],
  sample: [
    "Approve a sample that represents the intended material, insert, finish, markings and packaging route. Record its actual measurements beside the approved drawing and artwork revision. A photograph confirms appearance, but it cannot replace the scale result, dimensional reading or written approval.",
    "If production differs from the approved version, route the change back to the buyer. Do not quietly transfer an acceptance result from one denomination, mold or material to another because each finished configuration may behave differently."
  ],
  shipment: [
    "The purchase order should identify who inspects, when inspection occurs, which records are supplied and who can release the shipment. Out-of-band pieces should be identified and segregated while the agreed disposition is decided; they should not be hidden by averaging several plates together.",
    "Also verify count, markings, surface condition, insert fit, carton identity and pallet protection. Dense products can damage one another in transit, so preservation of pair labels, SKU labels and inspection traceability belongs in the packing review."
  ],
  rfq: [
    "Send the same brief to each supplier: plate family, material, use, denominations and unit system; target tolerance language; pair requirement; drawing dimensions; logo method; color and marking; packaging; inspection scope; destination; and the records required before shipment.",
    "Separate mandatory acceptance points from preferences and open questions. [Review rubber bumper plates](/products/weight-plates/rubber-bumper-plate), [compare cast-iron plates](/products/weight-plates/cast-iron-weight-plate), then send the chosen weight ladder and control plan for a model-specific factory review."
  ],
  faq: [
    ["What is weight plate tolerance?", "It is the permitted difference between the nominal mass marked on a named plate and the mass measured by the agreed method."],
    ["Should tolerance be written as a percentage or grams?", "Either can work, but the order must define the controlling expression and unit. They should not be switched after production."],
    ["Are calibrated plates necessary for every commercial gym?", "No. Match the plate type and acceptance band to the facility, training use and buyer requirement rather than copying a competition specification automatically."],
    ["Should every plate be weighed?", "That is a risk and contract decision. State full inspection or a defined sampling plan before production and define what expands the check."],
    ["Why specify pair matching separately?", "Two individually passing plates may sit at opposite ends of the allowed band. A pair rule controls the difference between selected mates."],
    ["Can a custom logo change the final plate?", "Branding, relief, inserts, finish and markings are part of the finished configuration, so approve and inspect the production-equivalent version."],
    ["Does passing the mass check prove quality?", "No. Fit, diameter, thickness, flatness, insert, finish, markings and packaging need their own criteria."],
    ["What should a bulk RFQ include?", "Include the plate family, weight ladder, use, tolerance wording, measurement method, sampling, dimensions, branding, packaging, destination and required records."]
  ],
  linkLabels: ["Browse commercial weight plates", "Review rubber bumper plates", "Review cast-iron plates", "See factory capabilities", "Send a project RFQ"],
  imageCopy: [
    ["Unbranded Olympic plates beside a blank scale and caliper", "Illustrative inspection setup for discussing mass and dimensional controls."],
    ["Unbranded black Olympic plate resting on a blank bench scale", "The order should define the method before any reading is used for acceptance."],
    ["Caliper positioned across an Olympic plate center insert", "Center-hole fit and dimensions remain separate from the mass result."],
    ["Two unbranded weight plates arranged for pair comparison", "Pair difference can be controlled separately from individual plate tolerance."],
    ["Unbranded grip and bumper plates with neutral specification materials", "A production-equivalent sample links construction, branding and packaging to one approved version."]
  ],
  cta: ["Define your plate acceptance plan", "Send the plate family, weight ladder, market, logo, packaging and inspection requirements for a model-specific review.", "Request a factory quote"]
};

const portuguese: GuideCopy = {
  locale: "pt-BR",
  path: "/pt/blog/tolerancia-peso-anilhas-compra-atacado",
  title: "Tolerância de Peso de Anilhas no Atacado | PowerBaseFit",
  description: "Saiba como definir tolerância, pesagem, amostragem, pareamento, dimensões, logo personalizado e fornecimento OEM de anilhas em grande volume.",
  h1: "Como Definir a Tolerância de Peso de Anilhas em uma Compra no Atacado",
  primaryKeyword: "tolerância de peso de anilhas no atacado",
  secondaryKeywords: ["precisão de anilhas", "anilhas profissionais", "fabricante de anilhas", "anilhas com logo", "anilhas OEM", "marca própria fitness", "anilhas para academia atacado"],
  intent: "especificar e receber lotes comerciais de anilhas",
  targetBuyer: "distribuidores, importadores, marcas próprias e compradores de academias",
  home: "Início", library: "Blog", eyebrow: "PowerBaseFit · Guia de fábrica de anilhas", contactPath: "/pt/contato",
  headings: { answer: "Resposta direta", definition: "O que significa tolerância de peso", specify: "Transforme a tolerância em uma cláusula verificável", table: "Tabela de aceitação para compras de anilhas", record: "Dados que precisam constar no registro", method: "Padronize o método de pesagem", sampling: "Defina a extensão da inspeção antes de produzir", pairing: "Trate o pareamento como requisito separado", dimensions: "Peso correto não substitui controle dimensional", materials: "A construção da anilha muda o plano de controle", oem: "Efeitos de OEM, ODM, logo e marca própria", sample: "Aprove uma amostra equivalente à produção", shipment: "Vincule a inspeção ao pedido de compra", rfq: "O que enviar à fábrica na cotação" },
  answer: ["Uma tolerância útil é uma faixa de aceitação escrita para cada modelo e peso nominal. O documento deve dizer se vale porcentagem, massa absoluta ou ambas, qual unidade controla, como pesar, qual parte do lote será verificada e qual é a decisão quando uma peça fica fora da faixa.", "Não existe um único número honesto para anilhas de ferro fundido, revestidas, bumper e calibradas. O comprador define a necessidade pelo uso real e confirma a viabilidade por modelo. Como fábrica, a PowerBaseFit pode revisar a escala de pesos, construção, logo, embalagem e inspeção de um projeto OEM ou de marca própria."],
  definition: ["Peso nominal é o valor marcado na anilha; peso medido é o resultado obtido pelo método combinado. Tolerância é a diferença permitida entre eles, não a promessa de que toda peça será exatamente igual ao nominal.", "Resolução da balança, repetibilidade, situação da verificação e amostragem são assuntos distintos. Uma tela com muitas casas não prova um resultado confiável, e uma amostra aprovada não descreve sozinha todas as peças do embarque."],
  specification: [["Defina o cálculo", "Em porcentagem, registre peso nominal, peso medido e desvio com sinal. Em massa absoluta, indique a unidade que prevalece. Fornecedor e inspetor precisam usar a mesma leitura."], ["Defina o método", "Informe capacidade e resolução da balança, referência usada na checagem, superfície, retirada da embalagem, estabilização e regra de repetição. Uma conferência interna não deve ser chamada de calibração rastreável sem documentação."], ["Defina a decisão", "Escreva o escopo da amostra, regra de pares, formato do relatório e tratamento de falhas. Relacione tudo ao modelo, peso e revisão do pedido. [Compare as linhas de anilhas](/pt/produtos/anilhas) antes de fechar a cláusula."]],
  tableColumns: ["Ponto", "Definição do comprador", "Evidência guardada"],
  tableRows: [["Identidade", "Modelo, material, peso e revisão", "Desenho, SKU e amostra"], ["Peso nominal", "Valor em kg ou lb marcado", "Arte e ficha técnica"], ["Desvio permitido", "Porcentagem, massa ou ambos", "Cláusula do pedido"], ["Balança", "Capacidade, resolução e situação", "Identificação e registro de checagem"], ["Procedimento", "Peça sem embalagem, superfície e repetição", "Instrução e planilha"], ["Escopo", "Todas as peças ou amostra definida", "Plano e IDs inspecionados"], ["Pareamento", "Diferença máxima entre duas peças, se exigida", "IDs e duas leituras"], ["Disposição", "Repetir, separar, corrigir ou rejeitar", "Registro de não conformidade"]],
  checklist: ["Data, pedido, SKU e peso da anilha", "Peso nominal e unidade", "Peso medido e resolução", "Desvio com sinal e limite", "Identificação da balança", "Responsável pela inspeção", "ID da peça, par, caixa ou amostra", "Condições relevantes da medição", "Decisão de aprovar, repetir ou separar", "Foto apenas como apoio, não como leitura"],
  method: ["Use balança com capacidade para a peça mais pesada e resolução coerente com a faixa combinada. Instale em base firme e nivelada, aguarde a estabilização prevista e confirme o estado pelo procedimento de referência escolhido. Pese a anilha sem a embalagem e na unidade do pedido.", "Se a leitura oscilar, repita conforme a regra escrita; não escolha o número mais favorável. Registre as leituras exigidas e a resolução. Uma checagem de fábrica ou armazém pode apoiar o recebimento sem ser apresentada como calibração laboratorial."],
  sampling: ["O escopo depende de risco, maturidade do processo, tamanho do pedido e custo de uma falha. Primeiro pedido, molde novo, material novo, inserto diferente ou logo alterado podem exigir um plano diferente de uma reposição sem mudanças.", "Defina a amostra antes de ver a mercadoria e diga se ela vale por SKU, peso, lote, caixa ou embarque. Controles de massa, aparência, dimensão e embalagem podem precisar de extensões diferentes."],
  pairing: ["Duas anilhas podem passar individualmente e ficar em extremos opostos da faixa. Se a academia ou o produto exigir pares equilibrados, acrescente uma diferença máxima entre as duas peças e preserve a identificação do par na embalagem.", "Pareamento é útil em linhas premium e conjuntos fechados, mas não deve ser prometido para todo pedido sem critério, etiqueta e plano de acondicionamento."],
  dimensions: ["A aprovação do peso não confirma furo central, diâmetro externo, espessura, planicidade ou alinhamento do inserto. A peça pode passar na balança e ainda carregar mal na barra ou ocupar espaço demais na manga.", "Mantenha as dimensões no desenho do modelo e verifique com instrumentos adequados ou interface de barra confirmada. Geometria de bumper, perfil de ferro e aberturas de pegada são decisões próprias."],
  materials: ["Fundição, núcleo de aço, borracha, poliuretano, cubo, inserto, pintura e marcações contribuem de formas diferentes para o peso final. Controle a anilha acabada e montada, não apenas um núcleo que ainda receberá componentes.", "Quando material, molde, inserto ou acabamento mudar, reveja o método. Evite expressões genéricas de alta precisão sem modelo, faixa permitida e evidência definidos."],
  oem: ["Logo em relevo, impressão, cor, desenho do cubo, marcação kg/lb e embalagem de marca própria pertencem à versão aprovada. Mudanças ODM em molde ou inserto exigem nova avaliação técnica.", "A PowerBaseFit pode discutir OEM, viabilidade ODM, logo personalizado, caixas de marca própria e fornecimento em volume depois de conhecer linha e uso. Quantidade mínima, ferramental e prazo variam por modelo e são confirmados na cotação."],
  sample: ["A amostra deve representar material, inserto, acabamento, marcação e rota de embalagem. Registre medições ao lado do desenho e da arte aprovados; a foto confirma aparência, não substitui valores.", "Qualquer mudança da produção volta para aprovação. Não transfira o resultado de um peso, molde ou material para outro sem análise."],
  shipment: ["O pedido deve indicar quem inspeciona, quando, quais registros são entregues e quem libera o embarque. Peças fora da faixa ficam identificadas e separadas; não esconda falhas pela média de várias anilhas.", "Confira também quantidade, marcação, superfície, encaixe, caixas e paletes. Etiquetas de pares e rastreabilidade precisam sobreviver ao transporte."],
  rfq: ["Envie a todos os fornecedores o mesmo pacote: família, material, uso, pesos e unidades; linguagem da tolerância; pares; dimensões; logo; cor; embalagem; inspeção; destino e registros exigidos.", "Separe requisitos obrigatórios, preferências e dúvidas. [Veja anilhas bumper](/pt/produtos/anilhas/anilha-bumper-borracha), [compare anilhas de ferro fundido](/pt/produtos/anilhas/anilha-ferro-fundido) e envie a escala escolhida para revisão da fábrica."],
  faq: [["O que é tolerância de peso da anilha?", "É a diferença permitida entre o peso nominal marcado e o peso obtido pelo método combinado."], ["É melhor usar porcentagem ou gramas?", "Ambos podem funcionar, mas o pedido precisa definir expressão e unidade que prevalecem."], ["Toda academia precisa de anilha calibrada?", "Não. Escolha produto e faixa de aceitação pelo uso, sem copiar automaticamente uma regra de competição."], ["É preciso pesar todas as peças?", "Depende do risco e do contrato. Defina inspeção total ou plano de amostragem antes da produção."], ["Por que controlar pares?", "Duas peças aprovadas podem estar em extremos opostos da faixa; o critério de par limita essa diferença."], ["O logo pode alterar a versão final?", "Relevo, inserto, pintura e marcação fazem parte da configuração acabada e devem ser aprovados nela."], ["Peso aprovado comprova qualidade total?", "Não. Encaixe, diâmetro, espessura, inserto, acabamento, marcação e embalagem têm critérios próprios."], ["O que entra na cotação de atacado?", "Linha, pesos, uso, tolerância, método, amostragem, dimensões, marca, embalagem, destino e registros."]],
  linkLabels: ["Ver anilhas profissionais", "Ver anilhas bumper", "Ver anilhas de ferro fundido", "Conhecer a fábrica", "Enviar pedido de cotação"],
  imageCopy: [["Anilhas olímpicas sem marca ao lado de balança e paquímetro", "Cena ilustrativa para discutir controle de massa e dimensões."], ["Anilha olímpica preta sobre balança com tela apagada", "O método é definido antes de usar qualquer leitura na aceitação."], ["Paquímetro posicionado no inserto central de uma anilha", "Encaixe e dimensão continuam separados do resultado de peso."], ["Duas anilhas sem marca preparadas para comparação de par", "A diferença do par pode ter limite próprio."], ["Anilha de pegada e bumper com materiais neutros de especificação", "A amostra liga construção, marca e embalagem a uma versão aprovada."]],
  cta: ["Defina o plano de aceitação das anilhas", "Envie família, escala de pesos, mercado, logo, embalagem e inspeção para análise por modelo.", "Solicitar cotação da fábrica"]
};

const spanish: GuideCopy = {
  locale: "es",
  path: "/es/blog/tolerancia-peso-discos-compra-mayorista",
  title: "Tolerancia de Peso de Discos al por Mayor | PowerBaseFit",
  description: "Aprenda a definir tolerancia, pesaje, muestreo, emparejado, dimensiones, logo personalizado y suministro OEM de discos para gimnasio.",
  h1: "Cómo Especificar la Tolerancia de Peso de Discos en un Pedido Mayorista",
  primaryKeyword: "tolerancia de peso de discos al por mayor",
  secondaryKeywords: ["precisión de discos de gimnasio", "discos comerciales", "fabricante de discos", "discos con logo", "discos OEM", "marca privada fitness", "discos para gimnasio mayoreo"],
  intent: "definir y recibir lotes comerciales de discos de peso",
  targetBuyer: "distribuidores, importadores, marcas privadas y responsables de compra de gimnasios",
  home: "Inicio", library: "Blog", eyebrow: "PowerBaseFit · Guía de fábrica de discos", contactPath: "/es/contacto",
  headings: { answer: "Respuesta breve", definition: "Qué significa realmente la tolerancia", specify: "Redacte una cláusula que pueda inspeccionarse", table: "Tabla de aceptación para compradores", record: "Datos que debe conservar el informe", method: "Establezca un método de pesaje repetible", sampling: "Decida el alcance antes de fabricar", pairing: "Controle el emparejado por separado", dimensions: "El peso no sustituye las dimensiones", materials: "La construcción cambia el plan de control", oem: "Efectos de OEM, ODM, logo y marca privada", sample: "Apruebe una muestra equivalente a producción", shipment: "Vincule la inspección con la orden de compra", rfq: "Información para solicitar cotización a fábrica" },
  answer: ["Una tolerancia útil es una banda de aceptación escrita para un modelo y peso nominal concretos. Debe indicar si se expresa en porcentaje, masa absoluta o ambos; qué unidad manda; cómo se pesa; qué parte del lote se revisa y qué decisión se toma ante un valor fuera de la banda.", "No existe una cifra universal válida para discos de hierro, recubiertos, bumper o calibrados. El comprador parte del uso real y confirma la viabilidad por modelo. Como fábrica, PowerBaseFit puede revisar escalones de peso, construcción, logo, embalaje e inspección para suministro OEM o de marca privada."],
  definition: ["Peso nominal es el valor marcado; peso medido es el resultado del procedimiento acordado. La tolerancia es la diferencia permitida entre ambos, no una promesa de igualdad exacta en todas las unidades.", "Resolución, repetibilidad, estado de verificación de la báscula y muestreo son conceptos distintos. Más dígitos en pantalla no demuestran un resultado fiable y una muestra aprobada no describe por sí sola todo el envío."],
  specification: [["Defina el cálculo", "Para porcentaje, registre nominal, medido y desviación con signo; para masa absoluta, indique la unidad de control. Proveedor e inspector deben interpretar igual la cláusula."], ["Defina el método", "Identifique capacidad y resolución de la báscula, comprobación de referencia, superficie, retirada del embalaje, estabilización y repeticiones. Una comprobación interna no equivale automáticamente a calibración trazable."], ["Defina la decisión", "Escriba alcance de muestra, regla de pares, formato del informe y tratamiento del fallo. Vincúlelo al modelo, denominación y revisión del pedido. [Compare la gama de discos](/es/productos/discos-de-peso) antes de cerrar el criterio."]],
  tableColumns: ["Control", "Qué define el comprador", "Evidencia"],
  tableRows: [["Identidad", "Modelo, material, denominación y revisión", "Plano, SKU y muestra"], ["Peso nominal", "Valor kg o lb marcado", "Arte y ficha"], ["Desviación", "Porcentaje, masa o ambos", "Cláusula firmada"], ["Báscula", "Capacidad, resolución y estado", "ID y comprobación"], ["Procedimiento", "Sin embalaje, superficie, repetición y unidad", "Instrucción y hoja"], ["Alcance", "Todas las piezas o muestra acordada", "Plan e IDs"], ["Pares", "Diferencia máxima entre dos unidades, si aplica", "IDs y lecturas"], ["Disposición", "Repetir, separar, corregir o rechazar", "Registro de incidencia"]],
  checklist: ["Fecha, pedido, SKU y denominación", "Peso nominal y unidad", "Peso medido y resolución", "Desviación con signo y límite", "Identidad de la báscula", "Inspector responsable", "ID de pieza, par, caja o muestra", "Notas del entorno o montaje", "Decisión de aprobar, repetir o segregar", "Foto como contexto, no como lectura"],
  method: ["Use una báscula con capacidad para el disco más pesado y resolución adecuada para la banda acordada. Sitúela estable y nivelada, espere la estabilización indicada y confirme su estado con el procedimiento de referencia elegido. Pese sin embalaje y en la unidad contractual.", "Si el valor fluctúa, repita según la regla escrita, sin elegir el dato más conveniente. Registre lecturas y resolución. Una revisión de almacén apoya la recepción, pero no debe llamarse calibración de laboratorio sin la documentación correspondiente."],
  sampling: ["El alcance depende del riesgo, madurez del proceso, tamaño del pedido y coste de un fallo. Primer pedido, molde, material, inserto o logo nuevos pueden necesitar un plan diferente al de una reposición sin cambios.", "Defina el muestreo antes de ver la mercancía e indique si opera por SKU, peso, lote, caja o envío. Masa, aspecto, dimensiones y embalaje pueden requerir planes distintos."],
  pairing: ["Dos discos pueden aprobar individualmente y quedar en extremos opuestos de la banda. Si se necesitan pares equilibrados, añada una diferencia máxima entre compañeros y conserve su identificación durante embalaje y recepción.", "El emparejado tiene sentido en series premium o juegos cerrados, pero no debe prometerse sin regla, etiqueta y plan logístico."],
  dimensions: ["La masa aprobada no confirma agujero central, diámetro exterior, grosor, planitud ni alineación del inserto. Un disco puede pasar la báscula y cargar mal en la barra o llenar demasiado la manga.", "Mantenga dimensiones en el plano y verifique con útiles apropiados o con la interfaz de barra confirmada. Geometría bumper, perfil de fundición y agarres son decisiones independientes."],
  materials: ["Fundición, núcleo, caucho, poliuretano, cubo, inserto, pintura y marcado aportan masa de forma distinta. El control debe realizarse sobre el disco acabado, no solo sobre un núcleo que recibirá más componentes.", "Si cambia material, molde, inserto o acabado, revise el método. Evite expresiones vagas de alta precisión sin modelo, banda y evidencia."],
  oem: ["Relieve del logo, impresión, color, diseño del cubo, marcado kg/lb y caja de marca privada forman una versión aprobada. Cambios ODM de molde o inserto requieren revisión técnica nueva.", "PowerBaseFit puede estudiar OEM, viabilidad ODM, logo personalizado, embalaje privado y suministro a granel tras conocer gama y uso. MOQ, utillaje y plazo dependen del modelo y se confirman en la oferta."],
  sample: ["La muestra debe representar material, inserto, acabado, marcado y embalaje previstos. Registre las mediciones junto al plano y arte aprobados; la foto confirma apariencia, no reemplaza datos.", "Toda diferencia de producción vuelve al comprador. No transfiera el resultado de una denominación, molde o material a otro sin validación."],
  shipment: ["La orden de compra identifica inspector, momento, documentos y autoridad de liberación. Las piezas fuera de banda se identifican y segregan; un promedio de varios discos no debe ocultarlas.", "Revise también cantidad, marcado, superficie, ajuste, cajas y palés. Etiquetas de pares y trazabilidad deben sobrevivir al transporte.", "Para reducir disputas, acuerde quién conserva el registro maestro, cómo se relaciona cada lectura con el SKU y qué ocurre si la inspección de destino no coincide con la de origen. Compare primero el método, la unidad, la resolución y las condiciones de apoyo; después investigue el producto. Así se separa una diferencia de medición de una desviación real del lote."],
  rfq: ["Envíe el mismo pliego: familia, material, uso, pesos y unidad; tolerancia; pares; dimensiones; logo; color; embalaje; inspección; destino y registros.", "Separe puntos obligatorios, preferencias y preguntas. [Revise discos bumper](/es/productos/discos/disco-bumper-goma), [compare discos de hierro fundido](/es/productos/discos/disco-hierro-fundido) y mande el rango elegido para revisión de fábrica."],
  faq: [["¿Qué es la tolerancia de peso?", "La diferencia permitida entre el peso nominal marcado y el resultado del método acordado."], ["¿Porcentaje o gramos?", "Ambos pueden servir, pero el pedido debe indicar la expresión y unidad que controlan."], ["¿Todo gimnasio necesita discos calibrados?", "No. Ajuste el tipo y la banda al uso sin copiar automáticamente una norma de competición."], ["¿Hay que pesar todas las unidades?", "Es una decisión de riesgo y contrato. Defina inspección total o muestreo antes de producir."], ["¿Por qué controlar pares?", "Dos discos aprobados pueden estar en extremos distintos; la regla de pares limita su diferencia."], ["¿El logo cambia el producto?", "Relieve, inserto, acabado y marcado pertenecen a la configuración final y se aprueban en ella."], ["¿Pasar el peso demuestra toda la calidad?", "No. Ajuste, diámetro, grosor, inserto, acabado, marcado y embalaje requieren criterios propios."], ["¿Qué incluir en la RFQ?", "Familia, pesos, uso, tolerancia, método, muestreo, dimensiones, marca, embalaje, destino y registros."]],
  linkLabels: ["Ver discos comerciales", "Ver discos bumper", "Ver discos de hierro fundido", "Conocer la fábrica", "Enviar solicitud de cotización"],
  imageCopy: [["Discos olímpicos sin marca junto a báscula y calibre", "Montaje ilustrativo para explicar controles de masa y dimensión."], ["Disco olímpico negro sobre báscula con pantalla apagada", "El método se acuerda antes de utilizar una lectura para aceptar."], ["Calibre colocado en el inserto central de un disco", "Ajuste y dimensión se controlan aparte del peso."], ["Dos discos sin marca dispuestos para comparar un par", "La diferencia del par puede tener su propio límite."], ["Disco con agarres y bumper con materiales neutros de revisión", "La muestra une construcción, marca y embalaje en una versión aprobada."]],
  cta: ["Defina el plan de aceptación de sus discos", "Envíe familia, rango, mercado, logo, embalaje e inspección para revisar el modelo.", "Solicitar oferta de fábrica"]
};

const german: GuideCopy = {
  locale: "de",
  path: "/de/blog/gewichtsscheiben-toleranz-grosshandel-pruefen",
  title: "Gewichtstoleranz bei Scheiben im Großhandel | PowerBaseFit",
  description: "So definieren Einkäufer Gewichtstoleranz, Waagenmethode, Stichprobe, Paarabweichung, Maße, Logo und OEM-Lieferung für Gewichtsscheiben.",
  h1: "Gewichtstoleranz für eine Großbestellung von Gewichtsscheiben festlegen",
  primaryKeyword: "Gewichtsscheiben Toleranz Großhandel",
  secondaryKeywords: ["Gewichtsgenauigkeit Scheiben", "Gewichtsscheiben Fitnessstudio", "Hersteller Gewichtsscheiben", "Gewichtsscheiben mit Logo", "OEM Gewichtsscheiben", "Private Label Hantelscheiben", "Gewichtsscheiben Großhandel"],
  intent: "Prüfbare Spezifikation und Warenannahme für Gewichtsscheiben",
  targetBuyer: "Distributoren, Importeure, Eigenmarken und gewerbliche Fitnessstudio-Einkäufer",
  home: "Startseite", library: "Ratgeber", eyebrow: "PowerBaseFit · Werksratgeber für Gewichtsscheiben", contactPath: "/de/kontakt",
  headings: { answer: "Kurzantwort", definition: "Was Gewichtstoleranz tatsächlich bedeutet", specify: "Eine prüfbare Toleranzklausel formulieren", table: "Abnahmetabelle für den Einkauf", record: "Diese Angaben gehören in das Prüfprotokoll", method: "Eine wiederholbare Wägemethode festlegen", sampling: "Prüfumfang vor Produktionsbeginn bestimmen", pairing: "Paarabweichung als eigenes Kriterium behandeln", dimensions: "Masse ersetzt keine Maßprüfung", materials: "Die Bauart bestimmt den Kontrollplan", oem: "Auswirkungen von OEM, ODM, Logo und Eigenmarke", sample: "Seriennahe Musterfreigabe", shipment: "Versandprüfung mit der Bestellung verknüpfen", rfq: "Angaben für die Anfrage an die Fabrik" },
  answer: ["Eine belastbare Toleranz ist ein schriftlicher Abnahmebereich für ein bestimmtes Scheibenmodell und eine Nennmasse. Er nennt Prozentwert, absoluten Massenwert oder beides, die maßgebliche Einheit, das Wägeverfahren, den Prüfumfang und die Entscheidung bei einer Überschreitung.", "Für Gusseisen-, beschichtete, Bumper- und kalibrierte Scheiben gibt es keinen ehrlichen Einheitswert. Der Einkäufer leitet die Anforderung aus der Nutzung ab und lässt sie je Modell bestätigen. PowerBaseFit kann als Fabrik Gewichtsabstufung, Konstruktion, Logo, Verpackung und Prüfung für OEM- oder Eigenmarkenprojekte abstimmen."],
  definition: ["Nennmasse ist die Kennzeichnung auf der Scheibe, Istmasse das Ergebnis des vereinbarten Verfahrens. Die Toleranz beschreibt die zulässige Differenz und bedeutet nicht, dass jedes Stück exakt den Nennwert erreicht.", "Auflösung, Wiederholbarkeit, Prüfstatus der Waage und Stichprobe sind getrennte Größen. Viele Stellen im Display belegen keine zuverlässige Messung; ein bestandenes Muster beschreibt nicht automatisch die ganze Sendung."],
  specification: [["Berechnung festlegen", "Bei Prozentangaben werden Nennmasse, Istmasse und vorzeichenbehaftete Abweichung dokumentiert. Bei absoluten Grenzen muss die Einheit eindeutig sein. Lieferant und Prüfer verwenden dieselbe Formel."], ["Verfahren festlegen", "Kapazität und Auflösung der Waage, Referenzprüfung, Untergrund, Entfernen der Verpackung, Stabilisierung und Wiederholungen gehören in die Anweisung. Eine interne Prüfung ist ohne Nachweiskette keine rückführbare Kalibrierung."], ["Entscheidungsregel festlegen", "Stichprobenumfang, Paarregel, Bericht und Behandlung einer Abweichung werden vorab festgelegt und mit Modell, Nennwert und Bestellrevision verbunden. [Gewichtsscheiben-Sortiment vergleichen](/de/produkte/gewichtsscheiben)."]],
  tableColumns: ["Prüfpunkt", "Festlegung des Käufers", "Nachweis"],
  tableRows: [["Identität", "Modell, Material, Nennwert, Revision", "Zeichnung, SKU, Muster"], ["Nennmasse", "Kennzeichnung in kg oder lb", "Artwork und Datenblatt"], ["Zulässige Abweichung", "Prozent, Masse oder beides", "Bestellklausel"], ["Waage", "Kapazität, Auflösung, Status", "Geräte-ID und Prüfbeleg"], ["Verfahren", "Ohne Verpackung, Untergrund, Wiederholung", "Arbeitsanweisung"], ["Prüfumfang", "Vollprüfung oder vereinbarte Stichprobe", "Plan und Stück-IDs"], ["Paarung", "Maximale Differenz zweier Partner", "Paar-IDs und Messwerte"], ["Maßnahme", "Nachprüfen, sperren, korrigieren, ablehnen", "Abweichungsbericht"]],
  checklist: ["Datum, Bestellung, SKU und Nennwert", "Nennmasse und Einheit", "Istmasse samt Auflösung", "Abweichung mit Vorzeichen und Grenze", "Waagen-ID und Referenzstatus", "Prüfer oder Prüfstelle", "Stück-, Paar-, Karton- oder Stichproben-ID", "Relevante Messbedingungen", "Freigabe, Nachprüfung oder Sperrung", "Foto nur als Kontext, nicht als Messwert"],
  method: ["Die Waage muss die schwerste Scheibe abdecken und fein genug für die vereinbarte Grenze auflösen. Sie steht fest und eben; ihr Status wird mit dem gewählten Referenzverfahren bestätigt. Gewogen wird ohne Verpackung und in der Einheit der Bestellklausel.", "Bei schwankender Anzeige gilt die schriftliche Wiederholungsregel. Messwerte und Auflösung werden vollständig protokolliert. Eine Wareneingangsprüfung kann die Abnahme stützen, ist aber nicht automatisch eine Laborkalibrierung."],
  sampling: ["Risiko, Prozessreife, Bestellgröße und Fehlerfolgen bestimmen den Umfang. Erstauftrag, neues Werkzeug, neues Material, anderer Einsatz oder geändertes Logo können einen anderen Plan als eine unveränderte Nachbestellung verlangen.", "Die Stichprobe wird vor Sichtung der Ware festgelegt und auf SKU, Nennwert, Los, Karton oder Sendung bezogen. Masse, Optik, Maß und Verpackung können unterschiedliche Umfänge haben."],
  pairing: ["Zwei einzeln zulässige Scheiben können an entgegengesetzten Enden des Bereichs liegen. Wenn ausgeglichene Paare wichtig sind, kommt eine maximale Paardifferenz hinzu; Kennzeichnung und Verpackung müssen die Zuordnung erhalten.", "Paarung eignet sich für ausgewählte Premiumsets oder fest verwaltete Studio-Paare. Ohne Regel, ID-System und Packplan sollte sie nicht pauschal zugesagt werden."],
  dimensions: ["Eine bestandene Masseprüfung bestätigt weder Bohrung, Außendurchmesser, Dicke, Ebenheit noch Einsatzlage. Die Scheibe kann auf der Waage bestehen und trotzdem schlecht auf die Hantel passen oder zu viel Hülsenlänge beanspruchen.", "Maße bleiben in der Zeichnung und werden mit geeigneten Lehren oder einer bestätigten Hantel-Schnittstelle geprüft. Bumper-Geometrie, Gussprofil und Grifföffnungen sind eigene Anforderungen."],
  materials: ["Gusskörper, Stahlkern, Gummi- oder Urethanmantel, Nabe, Einsatz, Lack und Markierung beeinflussen die Endmasse verschieden. Kontrolliert wird das fertige, montierte Produkt und nicht nur ein später weiterverarbeitetes Rohteil.", "Bei Material-, Werkzeug-, Einsatz- oder Finishänderung ist der Kontrollweg neu zu bestätigen. Begriffe wie Präzisionsqualität brauchen immer Modell, Grenze und Nachweis."],
  oem: ["Relieflogo, Druck, Farbe, Nabendesign, kg/lb-Kennzeichnung und Eigenmarkenkarton gehören zur freigegebenen Version. ODM-Änderungen an Werkzeug oder Einsatz benötigen eine neue technische Bewertung.", "PowerBaseFit bespricht OEM, ODM-Machbarkeit, individuelles Logo, Private-Label-Verpackung und Großlieferung nach Klärung von Produktfamilie und Einsatz. Mindestmenge, Werkzeug und Termin werden modellbezogen angeboten."],
  sample: ["Das Muster bildet Material, Einsatz, Finish, Markierung und Verpackungsweg der Serie ab. Messwerte werden mit Zeichnung und Artwork-Revision gespeichert; Fotos belegen die Optik, ersetzen aber keine Werte.", "Abweichungen der Serie gehen zurück in die Freigabe. Ergebnisse eines Nennwerts, Werkzeugs oder Materials werden nicht ungeprüft auf andere Varianten übertragen."],
  shipment: ["Die Bestellung benennt Prüfer, Zeitpunkt, Lieferdokumente und Freigabeberechtigung. Außerhalb der Grenze liegende Stücke werden identifiziert und gesperrt; ein Mittelwert darf Einzelfehler nicht verdecken.", "Zusätzlich zählen Menge, Markierung, Oberfläche, Einsatzpassung, Karton und Palette. Paar- und SKU-Kennzeichnungen müssen den Transport überstehen."],
  rfq: ["Alle Anbieter erhalten dieselbe Anfrage: Familie, Material, Nutzung, Nennwerte und Einheit, Toleranztext, Paarung, Maße, Logo, Farbe, Verpackung, Prüfumfang, Ziel und verlangte Belege.", "Trennen Sie Musskriterien, Wünsche und offene Punkte. [Gummi-Bumper Plates prüfen](/de/produkte/gewichtsscheiben/gummi-bumper-plate), [Gusseisen-Scheiben vergleichen](/de/produkte/gewichtsscheiben/gusseisen-gewichtsscheibe) und die gewählte Staffel zur Werksprüfung senden."],
  faq: [["Was ist die Gewichtstoleranz einer Scheibe?", "Die zulässige Differenz zwischen gekennzeichneter Nennmasse und dem Ergebnis des vereinbarten Verfahrens."], ["Prozent oder Gramm?", "Beides ist möglich; Bestellung und Bericht müssen jedoch eindeutig festlegen, welche Angabe und Einheit gelten."], ["Braucht jedes Studio kalibrierte Scheiben?", "Nein. Produkttyp und Grenze werden aus Nutzung und Käuferanforderung abgeleitet, nicht automatisch aus Wettkampfregeln."], ["Muss jedes Stück gewogen werden?", "Das ist eine Risiko- und Vertragsentscheidung. Vollprüfung oder Stichprobe werden vor Produktion vereinbart."], ["Warum eine eigene Paarregel?", "Zwei zulässige Stücke können weit auseinanderliegen; die Paarregel begrenzt diese Differenz."], ["Kann ein Logo die Endversion ändern?", "Relief, Einsatz, Finish und Markierung sind Teil der fertigen Konfiguration und werden gemeinsam freigegeben."], ["Beweist die Masse die gesamte Qualität?", "Nein. Passung, Durchmesser, Dicke, Einsatz, Oberfläche, Markierung und Verpackung haben eigene Kriterien."], ["Was gehört in die Anfrage?", "Produktfamilie, Staffel, Nutzung, Toleranz, Methode, Stichprobe, Maße, Marke, Verpackung, Ziel und Nachweise."]],
  linkLabels: ["Gewichtsscheiben ansehen", "Bumper Plates ansehen", "Gusseisen-Scheiben ansehen", "Fertigung kennenlernen", "Projekt anfragen"],
  imageCopy: [["Unmarkierte Olympia-Scheiben neben Waage und Messschieber", "Illustrativer Aufbau zur Besprechung von Masse und Maßen."], ["Schwarze Olympia-Scheibe auf einer Waage mit leerem Display", "Das Verfahren steht fest, bevor ein Messwert zur Abnahme dient."], ["Messschieber an der mittigen Scheibenbuchse", "Bohrung und Passung werden unabhängig von der Masse geprüft."], ["Zwei unmarkierte Scheiben für den Paarvergleich", "Die Paardifferenz kann ein eigenes Grenzkriterium sein."], ["Griff- und Bumper-Scheibe mit neutralen Spezifikationsunterlagen", "Das Muster verbindet Konstruktion, Branding und Verpackung mit einer Freigabe."]],
  cta: ["Abnahmeplan für Gewichtsscheiben definieren", "Senden Sie Familie, Gewichtsstaffel, Markt, Logo, Verpackung und Prüfung zur Modellbewertung.", "Werksangebot anfragen"]
};

const french: GuideCopy = {
  locale: "fr",
  path: "/fr/blog/tolerance-poids-disques-achat-gros",
  title: "Tolérance de Poids des Disques en Gros | PowerBaseFit",
  description: "Définissez tolérance, pesée, échantillonnage, appairage, dimensions, logo personnalisé et fourniture OEM de disques pour achat professionnel.",
  h1: "Comment Spécifier la Tolérance de Poids des Disques pour un Achat en Gros",
  primaryKeyword: "tolérance poids disques achat en gros",
  secondaryKeywords: ["précision disques musculation", "disques professionnels", "fabricant disques musculation", "disques avec logo", "disques OEM", "marque privée fitness", "disques musculation grossiste"],
  intent: "spécification et réception de lots professionnels de disques",
  targetBuyer: "distributeurs, importateurs, marques privées et responsables achats de salles",
  home: "Accueil", library: "Guides", eyebrow: "PowerBaseFit · Guide d'usine pour disques", contactPath: "/fr/contact",
  headings: { answer: "Réponse rapide", definition: "Ce que signifie réellement la tolérance", specify: "Rédiger une clause contrôlable", table: "Tableau de réception pour l'acheteur", record: "Données à conserver dans le rapport", method: "Stabiliser la méthode de pesée", sampling: "Fixer l'étendue du contrôle avant production", pairing: "Traiter l'appairage séparément", dimensions: "La masse ne remplace pas les dimensions", materials: "La construction modifie le plan de contrôle", oem: "Effets de l'OEM, de l'ODM, du logo et de la marque privée", sample: "Valider un échantillon équivalent à la série", shipment: "Relier le contrôle à la commande", rfq: "Informations à transmettre à l'usine" },
  answer: ["Une tolérance exploitable est une plage de réception écrite pour un modèle et une masse nominale précis. Elle indique pourcentage, masse absolue ou les deux, l'unité de référence, la méthode de pesée, la part du lot contrôlée et la décision en cas d'écart.", "Il n'existe pas de valeur universelle honnête pour la fonte, les disques revêtus, les bumper plates et les disques calibrés. L'acheteur part de l'usage puis confirme la faisabilité par modèle. PowerBaseFit peut, en tant qu'usine, examiner gamme de poids, construction, logo, emballage et contrôle pour un projet OEM ou de marque privée."],
  definition: ["La masse nominale est celle inscrite sur le disque; la masse mesurée provient de la méthode convenue. La tolérance est l'écart admis entre les deux, pas la garantie que chaque pièce égale exactement le marquage.", "Résolution, répétabilité, état de vérification de la balance et échantillonnage sont distincts. Un affichage très détaillé ne prouve pas la fiabilité, et un échantillon conforme ne décrit pas à lui seul toute l'expédition."],
  specification: [["Nommer le calcul", "En pourcentage, consignez masse nominale, masse mesurée et écart signé. Pour une limite absolue, précisez l'unité dominante. Fournisseur et inspecteur doivent appliquer la même lecture."], ["Nommer la méthode", "Capacité et résolution de la balance, contrôle de référence, support, retrait de l'emballage, stabilisation et répétitions doivent être écrits. Un contrôle interne n'est pas automatiquement une calibration traçable."], ["Nommer la décision", "Définissez échantillon, règle de paire, rapport et traitement d'un échec, puis reliez-les au modèle, à la valeur et à la révision de commande. [Comparer la gamme de disques](/fr/produits/disques-musculation)."]],
  tableColumns: ["Point de contrôle", "Définition de l'acheteur", "Preuve conservée"],
  tableRows: [["Identité", "Modèle, matière, valeur, révision", "Plan, SKU, échantillon"], ["Masse nominale", "Valeur kg ou lb inscrite", "Artwork et fiche"], ["Écart admis", "Pourcentage, masse ou les deux", "Clause de commande"], ["Balance", "Capacité, résolution, état", "ID et contrôle"], ["Procédure", "Sans emballage, support, répétition, unité", "Instruction et feuille"], ["Étendue", "Toutes pièces ou échantillon convenu", "Plan et identifiants"], ["Appairage", "Écart maximal entre deux partenaires", "IDs et mesures"], ["Disposition", "Recontrôler, isoler, corriger, refuser", "Rapport d'écart"]],
  checklist: ["Date, commande, SKU et valeur", "Masse nominale et unité", "Masse mesurée et résolution", "Écart signé et limite", "Identité de la balance", "Inspecteur ou organisme", "ID pièce, paire, carton ou échantillon", "Notes de conditions utiles", "Décision accepter, reprendre ou isoler", "Photo comme contexte, jamais comme mesure"],
  method: ["La balance couvre le disque le plus lourd et possède une résolution cohérente avec la plage. Elle repose sur une surface stable et plane; son état est confirmé par la procédure de référence choisie. Le disque est pesé sans emballage dans l'unité contractuelle.", "Si la lecture varie, appliquez la règle de répétition au lieu de choisir la valeur favorable. Enregistrez lectures et résolution. Un contrôle en entrepôt aide la réception sans devenir une calibration de laboratoire."],
  sampling: ["Risque produit, maturité du procédé, volume et coût d'un défaut déterminent l'étendue. Première commande, nouveau moule, nouvelle matière, nouvel insert ou logo modifié peuvent imposer un plan différent d'un réassort inchangé.", "Le plan est fixé avant de voir la marchandise et précise SKU, valeur, lot, carton ou expédition. Masse, aspect, dimensions et emballage peuvent suivre des étendues différentes."],
  pairing: ["Deux disques conformes individuellement peuvent se situer aux extrémités opposées de la plage. Si des paires équilibrées sont nécessaires, ajoutez un écart maximal entre partenaires et conservez leur identification jusqu'à la réception.", "L'appairage convient à certaines séries premium ou lots fermés; il ne doit pas être promis sans règle, étiquette et plan d'emballage."],
  dimensions: ["Une masse conforme ne valide pas alésage central, diamètre extérieur, épaisseur, planéité ou alignement de l'insert. Un disque peut réussir la pesée et mal se charger sur la barre.", "Gardez les cotes dans le plan et contrôlez-les avec les outils adaptés ou une interface de barre confirmée. Géométrie bumper, profil fonte et poignées restent des exigences propres."],
  materials: ["Corps fonte, noyau acier, caoutchouc, polyuréthane, moyeu, insert, peinture et marquage contribuent différemment à la masse. Le contrôle porte sur le produit fini et assemblé.", "Si matière, moule, insert ou finition change, reconfirmez le processus. Évitez les mentions vagues de haute précision sans modèle, plage et preuve."],
  oem: ["Logo en relief, impression, couleur, moyeu, marquage kg/lb et carton de marque privée appartiennent à la version approuvée. Une modification ODM du moule ou de l'insert demande une nouvelle étude.", "PowerBaseFit peut étudier OEM, faisabilité ODM, logo personnalisé, emballage privé et fourniture en volume après définition de la famille et de l'usage. Minimum, outillage et délai sont confirmés par modèle dans l'offre."],
  sample: ["L'échantillon doit représenter matière, insert, finition, marquage et emballage prévus. Ses mesures sont archivées avec le plan et l'artwork; la photo confirme l'apparence, pas les valeurs.", "Toute différence de série revient en validation. Ne transposez pas le résultat d'une valeur, d'un moule ou d'une matière sans examen."],
  shipment: ["La commande nomme l'inspecteur, le moment, les documents et l'autorité de libération. Les pièces hors plage sont identifiées et isolées; une moyenne ne doit pas masquer un échec individuel.", "Vérifiez aussi quantité, marquage, surface, insert, cartons et palettes. Les étiquettes de paire et de SKU doivent résister au transport."],
  rfq: ["Envoyez le même dossier: famille, matière, usage, valeurs et unité; tolérance; paires; dimensions; logo; couleur; emballage; contrôle; destination et rapports demandés.", "Séparez obligations, préférences et questions. [Voir les bumper plates caoutchouc](/fr/produits/disques-musculation/disque-bumper-caoutchouc), [comparer les disques fonte](/fr/produits/disques-musculation/disque-musculation-fonte), puis transmettre la gamme pour examen usine."],
  faq: [["Qu'est-ce que la tolérance de poids?", "L'écart admis entre la masse nominale inscrite et la masse obtenue par la méthode convenue."], ["Pourcentage ou grammes?", "Les deux sont possibles, mais la commande doit définir clairement l'expression et l'unité qui priment."], ["Toute salle a-t-elle besoin de disques calibrés?", "Non. Le type et la plage découlent de l'usage, sans reprendre automatiquement une règle de compétition."], ["Faut-il peser chaque disque?", "C'est une décision de risque et de contrat. Le contrôle total ou le plan d'échantillonnage est fixé avant production."], ["Pourquoi une règle d'appairage?", "Deux pièces conformes peuvent être éloignées; la règle limite la différence au sein de la paire."], ["Le logo peut-il modifier la version finale?", "Relief, insert, finition et marquage font partie du produit fini et se valident ensemble."], ["La masse prouve-t-elle toute la qualité?", "Non. Ajustement, diamètre, épaisseur, insert, finition, marquage et emballage ont leurs propres critères."], ["Que contient la demande de prix?", "Famille, gamme, usage, tolérance, méthode, échantillon, cotes, marque, emballage, destination et rapports."]],
  linkLabels: ["Voir les disques professionnels", "Voir les bumper plates", "Voir les disques fonte", "Découvrir l'usine", "Envoyer une demande"],
  imageCopy: [["Disques olympiques sans marque près d'une balance et d'un pied à coulisse", "Montage illustratif pour expliquer masse et dimensions."], ["Disque olympique noir posé sur une balance à écran éteint", "La méthode est convenue avant toute décision de réception."], ["Pied à coulisse placé sur l'insert central d'un disque", "L'alésage reste un contrôle distinct de la masse."], ["Deux disques sans marque disposés pour comparer une paire", "L'écart de paire peut avoir sa propre limite."], ["Disques à poignées et bumper avec documents neutres", "L'échantillon relie construction, marque et emballage à une version approuvée."]],
  cta: ["Définir votre plan de réception", "Envoyez famille, gamme, marché, logo, emballage et contrôle pour une étude par modèle.", "Demander une offre usine"]
};

const vietnamese: GuideCopy = {
  locale: "vi",
  path: "/vi/blog/sai-so-khoi-luong-banh-ta-mua-si",
  title: "Sai Số Khối Lượng Bánh Tạ Khi Mua Sỉ | PowerBaseFit",
  description: "Hướng dẫn xác định sai số, cân đo, lấy mẫu, ghép cặp, kích thước, logo tùy chỉnh và nguồn cung OEM bánh tạ cho phòng gym.",
  h1: "Cách Quy Định Sai Số Khối Lượng Bánh Tạ Trong Đơn Hàng Số Lượng Lớn",
  primaryKeyword: "sai số khối lượng bánh tạ mua sỉ",
  secondaryKeywords: ["độ chính xác bánh tạ", "bánh tạ phòng gym", "nhà sản xuất bánh tạ", "bánh tạ logo riêng", "bánh tạ OEM", "thương hiệu riêng thiết bị gym", "bánh tạ giá sỉ"],
  intent: "lập tiêu chí và nghiệm thu lô bánh tạ thương mại",
  targetBuyer: "nhà phân phối, nhà nhập khẩu, thương hiệu riêng và bộ phận mua hàng phòng gym",
  home: "Trang chủ", library: "Bài viết", eyebrow: "PowerBaseFit · Hướng dẫn từ nhà máy bánh tạ", contactPath: "/vi/lien-he",
  headings: { answer: "Trả lời nhanh", definition: "Sai số khối lượng thực sự là gì", specify: "Viết điều khoản có thể kiểm tra", table: "Bảng nghiệm thu cho người mua", record: "Thông tin cần có trong biên bản", method: "Thiết lập phương pháp cân lặp lại được", sampling: "Chốt phạm vi kiểm tra trước sản xuất", pairing: "Tách tiêu chí ghép cặp", dimensions: "Khối lượng không thay thế kích thước", materials: "Cấu tạo quyết định kế hoạch kiểm soát", oem: "Ảnh hưởng của OEM, ODM, logo và thương hiệu riêng", sample: "Duyệt mẫu tương đương hàng sản xuất", shipment: "Gắn kiểm tra lô hàng với đơn mua", rfq: "Thông tin gửi nhà máy khi yêu cầu báo giá" },
  answer: ["Sai số hữu ích phải là khoảng chấp nhận bằng văn bản cho đúng mẫu và mức khối lượng danh định. Văn bản nêu rõ dùng phần trăm, khối lượng tuyệt đối hay cả hai, đơn vị nào chi phối, cách cân, phạm vi lô được kiểm tra và cách xử lý khi vượt giới hạn.", "Không có một con số chung trung thực cho bánh tạ gang, bọc vật liệu, bumper và loại hiệu chuẩn. Người mua xuất phát từ mục đích sử dụng rồi xác nhận theo mẫu. Với vai trò nhà máy, PowerBaseFit có thể rà soát dải tạ, cấu tạo, logo, đóng gói và kiểm tra cho dự án OEM hoặc thương hiệu riêng."],
  definition: ["Khối lượng danh định là số ghi trên bánh tạ; khối lượng thực đo là kết quả theo phương pháp đã thống nhất. Dung sai là chênh lệch được phép giữa hai giá trị, không có nghĩa mọi sản phẩm phải đúng tuyệt đối.", "Độ phân giải, độ lặp lại, trạng thái kiểm tra cân và lấy mẫu là các vấn đề khác nhau. Nhiều chữ số trên màn hình không tự chứng minh kết quả tin cậy; một mẫu đạt cũng không đại diện mặc định cho toàn bộ lô."],
  specification: [["Nêu công thức", "Nếu dùng phần trăm, ghi khối lượng danh định, thực đo và độ lệch có dấu. Nếu dùng khối lượng tuyệt đối, chốt đơn vị. Nhà cung cấp và đơn vị kiểm tra phải hiểu giống nhau."], ["Nêu phương pháp", "Ghi tải trọng, độ phân giải, kiểm tra tham chiếu, mặt đặt, tháo bao bì, thời gian ổn định và quy tắc cân lặp. Kiểm tra nội bộ không mặc nhiên là hiệu chuẩn có truy xuất."], ["Nêu quy tắc quyết định", "Chốt phạm vi mẫu, tiêu chí cặp, mẫu báo cáo và xử lý lỗi; liên kết với mã mẫu, mức tạ và phiên bản đơn hàng. [Xem dòng bánh tạ hiện có](/vi/san-pham/banh-ta)."]],
  tableColumns: ["Điểm kiểm soát", "Người mua cần quy định", "Hồ sơ lưu"],
  tableRows: [["Nhận diện", "Mẫu, vật liệu, mức tạ, phiên bản", "Bản vẽ, SKU, mẫu duyệt"], ["Danh định", "Giá trị kg hoặc lb trên sản phẩm", "Bản in và thông số"], ["Độ lệch", "Phần trăm, khối lượng hoặc cả hai", "Điều khoản đơn mua"], ["Thiết bị cân", "Tải trọng, độ phân giải, trạng thái", "Mã cân và biên bản"], ["Quy trình", "Không bao bì, mặt đặt, lặp, đơn vị", "Hướng dẫn và bảng kết quả"], ["Phạm vi", "Toàn bộ hoặc mẫu đã thống nhất", "Kế hoạch và mã mẫu"], ["Ghép cặp", "Chênh lệch tối đa giữa hai bánh, nếu cần", "Mã cặp và kết quả"], ["Xử lý", "Cân lại, cách ly, sửa hoặc loại", "Biên bản không phù hợp"]],
  checklist: ["Ngày, đơn hàng, SKU và mức tạ", "Khối lượng danh định và đơn vị", "Khối lượng thực đo và độ phân giải", "Độ lệch có dấu và giới hạn", "Mã cân và trạng thái tham chiếu", "Người hoặc bên kiểm tra", "Mã sản phẩm, cặp, thùng hoặc mẫu", "Ghi chú điều kiện ảnh hưởng", "Kết luận đạt, cân lại hoặc cách ly", "Ảnh chỉ hỗ trợ bối cảnh, không thay số đo"],
  method: ["Chọn cân đủ tải cho bánh nặng nhất và có độ phân giải phù hợp giới hạn. Đặt trên mặt phẳng ổn định, chờ theo hướng dẫn và xác nhận trạng thái bằng quy trình tham chiếu đã chọn. Cân sản phẩm không có bao bì bằng đơn vị của hợp đồng.", "Nếu số đọc dao động, cân lại theo quy tắc đã viết, không chọn kết quả thuận lợi. Ghi đủ số đọc và độ phân giải. Kiểm tra tại kho hỗ trợ nghiệm thu nhưng không nên gọi là hiệu chuẩn phòng thí nghiệm."],
  sampling: ["Phạm vi dựa vào rủi ro, độ ổn định quy trình, quy mô đơn và hậu quả lỗi. Đơn đầu, khuôn mới, vật liệu mới, insert mới hoặc đổi logo có thể cần kế hoạch khác với đơn lặp không đổi.", "Chốt mẫu trước khi xem hàng và xác định theo SKU, mức tạ, lô, thùng hay chuyến. Khối lượng, ngoại quan, kích thước và bao bì có thể có phạm vi khác nhau."],
  pairing: ["Hai bánh riêng lẻ đều đạt vẫn có thể nằm ở hai đầu giới hạn. Nếu cần cặp cân bằng, thêm chênh lệch tối đa giữa hai bánh và giữ mã cặp trong đóng gói, kho và giao nhận.", "Ghép cặp phù hợp một số bộ cao cấp hoặc bộ cố định; không nên cam kết cho mọi đơn nếu chưa có tiêu chí, nhãn và phương án đóng gói."],
  dimensions: ["Đạt khối lượng không chứng minh lỗ tâm, đường kính ngoài, độ dày, độ phẳng hay vị trí insert. Bánh có thể đạt cân nhưng lắp không tốt lên đòn hoặc chiếm quá nhiều chiều dài sleeve.", "Giữ kích thước trong bản vẽ và đo bằng dụng cụ phù hợp hoặc đòn đã xác nhận. Hình học bumper, mặt cắt gang và lỗ cầm là tiêu chí độc lập."],
  materials: ["Thân gang, lõi thép, cao su, polyurethane, hub, insert, sơn và ký hiệu đóng góp khác nhau vào khối lượng. Kiểm soát trên bánh hoàn thiện, đã lắp, không chỉ trên lõi bán thành phẩm.", "Khi đổi vật liệu, khuôn, insert hoặc hoàn thiện, cần xác nhận lại cách kiểm soát. Tránh từ ngữ chính xác cao nếu chưa nêu mẫu, giới hạn và bằng chứng."],
  oem: ["Logo nổi, in, màu, thiết kế hub, ký hiệu kg/lb và thùng thương hiệu riêng thuộc cùng một phiên bản duyệt. Thay đổi ODM ở khuôn hoặc insert cần đánh giá kỹ thuật mới.", "PowerBaseFit có thể trao đổi OEM, khả năng ODM, logo tùy chỉnh, bao bì thương hiệu riêng và cung ứng số lượng lớn sau khi biết dòng sản phẩm và mục đích. MOQ, khuôn và lịch được xác nhận theo mẫu trong báo giá."],
  sample: ["Mẫu duyệt cần đại diện vật liệu, insert, hoàn thiện, ký hiệu và cách đóng gói của sản xuất. Lưu số đo cùng bản vẽ và phiên bản artwork; ảnh xác nhận ngoại quan chứ không thay dữ liệu.", "Khác biệt sản xuất phải quay lại duyệt. Không chuyển kết quả của một mức tạ, khuôn hoặc vật liệu sang biến thể khác mà chưa kiểm tra."],
  shipment: ["Đơn mua nêu người kiểm tra, thời điểm, hồ sơ giao và thẩm quyền phát hành. Sản phẩm ngoài giới hạn phải nhận diện và cách ly; không dùng trung bình nhiều bánh để che một lỗi đơn lẻ.", "Cũng kiểm số lượng, ký hiệu, bề mặt, lắp insert, thùng và pallet. Mã cặp, SKU và truy vết phải còn nguyên sau vận chuyển."],
  rfq: ["Gửi cùng một bản yêu cầu: dòng, vật liệu, mục đích, mức tạ và đơn vị; dung sai; cặp; kích thước; logo; màu; bao bì; kiểm tra; điểm đến và hồ sơ cần giao.", "Tách yêu cầu bắt buộc, ưu tiên và câu hỏi. [Xem bánh tạ bumper cao su](/vi/san-pham/banh-ta/banh-ta-bumper-cao-su), [so sánh bánh tạ gang](/vi/san-pham/banh-ta/banh-ta-gang), rồi gửi dải tạ để nhà máy rà soát."],
  faq: [["Sai số khối lượng bánh tạ là gì?", "Là chênh lệch được phép giữa khối lượng danh định và kết quả của phương pháp đã thống nhất."], ["Nên dùng phần trăm hay gram?", "Cả hai đều dùng được nhưng đơn hàng phải nói rõ cách biểu đạt và đơn vị chi phối."], ["Mọi phòng gym có cần bánh hiệu chuẩn không?", "Không. Chọn loại và giới hạn theo mục đích thay vì tự động sao chép quy tắc thi đấu."], ["Có phải cân từng bánh?", "Đó là quyết định theo rủi ro và hợp đồng. Chốt kiểm toàn bộ hoặc kế hoạch mẫu trước sản xuất."], ["Vì sao cần tiêu chí cặp?", "Hai bánh đều đạt vẫn có thể chênh nhiều; quy tắc cặp giới hạn khác biệt đó."], ["Logo có thể làm thay đổi phiên bản cuối không?", "Logo nổi, insert, hoàn thiện và ký hiệu đều thuộc cấu hình hoàn chỉnh và phải duyệt cùng nhau."], ["Đạt khối lượng có chứng minh toàn bộ chất lượng?", "Không. Lắp vừa, đường kính, độ dày, insert, bề mặt, ký hiệu và bao bì cần tiêu chí riêng."], ["RFQ mua sỉ cần gì?", "Dòng, dải tạ, mục đích, dung sai, phương pháp, mẫu, kích thước, thương hiệu, bao bì, điểm đến và hồ sơ."]],
  linkLabels: ["Xem bánh tạ thương mại", "Xem bánh tạ bumper", "Xem bánh tạ gang", "Tìm hiểu nhà máy", "Gửi yêu cầu báo giá"],
  imageCopy: [["Bánh tạ Olympic không thương hiệu bên cạnh cân và thước cặp", "Bố cục minh họa cho kiểm soát khối lượng và kích thước."], ["Bánh tạ Olympic đen trên cân có màn hình tắt", "Phương pháp phải được chốt trước khi dùng kết quả nghiệm thu."], ["Thước cặp đặt tại insert giữa của bánh tạ", "Kích thước lỗ tâm được kiểm riêng với khối lượng."], ["Hai bánh tạ không thương hiệu để so sánh theo cặp", "Chênh lệch cặp có thể có giới hạn riêng."], ["Bánh tạ có tay cầm và bumper cùng tài liệu trung tính", "Mẫu liên kết cấu tạo, thương hiệu và bao bì với phiên bản duyệt."]],
  cta: ["Xây dựng kế hoạch nghiệm thu bánh tạ", "Gửi dòng sản phẩm, dải tạ, thị trường, logo, bao bì và yêu cầu kiểm tra để đánh giá theo mẫu.", "Yêu cầu báo giá nhà máy"]
};

const swedish: GuideCopy = {
  locale: "sv",
  path: "/sv/blogg/vikttolerans-viktskivor-grossist",
  title: "Vikttolerans för Viktskivor vid Grossistköp | PowerBaseFit",
  description: "Så anger inköpare vikttolerans, vågmetod, stickprov, parmatchning, mått, egen logotyp och OEM-leverans av viktskivor.",
  h1: "Så Specificerar du Vikttolerans för en Större Beställning av Viktskivor",
  primaryKeyword: "vikttolerans viktskivor grossist",
  secondaryKeywords: ["noggrannhet viktskivor", "kommersiella viktskivor", "tillverkare viktskivor", "viktskivor med logotyp", "OEM viktskivor", "private label gymutrustning", "viktskivor grossist"],
  intent: "specifikation och leveranskontroll av kommersiella viktskivor",
  targetBuyer: "distributörer, importörer, egna varumärken och gyminköpare",
  home: "Start", library: "Guider", eyebrow: "PowerBaseFit · Fabriksguide för viktskivor", contactPath: "/sv/kontakt",
  headings: { answer: "Kort svar", definition: "Vad vikttolerans faktiskt betyder", specify: "Skriv ett krav som går att kontrollera", table: "Mottagningstabell för inköpare", record: "Uppgifter som ska finnas i protokollet", method: "Bestäm en repeterbar vägning", sampling: "Välj kontrollomfattning före produktion", pairing: "Behandla parmatchning separat", dimensions: "Rätt vikt ersätter inte måttkontroll", materials: "Konstruktionen påverkar kontrollplanen", oem: "OEM, ODM, logotyp och eget varumärke", sample: "Godkänn ett produktionslikt prov", shipment: "Knyt leveranskontrollen till ordern", rfq: "Underlag till fabriken i en offertförfrågan" },
  answer: ["En användbar tolerans är ett skriftligt acceptansintervall för en bestämd modell och nominell vikt. Kravet anger procent, absolut massa eller båda, vilken enhet som gäller, vägmetod, kontrollens omfattning och åtgärd vid överskridande.", "Det finns inget ärligt standardtal för alla gjutjärns-, belagda, bumper- och kalibrerade skivor. Köparen utgår från användningen och får kravet bekräftat per modell. PowerBaseFit kan som fabrik granska viktserie, konstruktion, logotyp, emballage och kontroll för OEM eller eget varumärke."],
  definition: ["Nominell vikt är märkningen på skivan; uppmätt vikt är resultatet av den överenskomna metoden. Toleransen är tillåten skillnad, inte ett löfte om exakt nominellt värde på varje exemplar.", "Vågens upplösning, repeterbarhet, kontrollstatus och stickprov är olika frågor. Många decimaler bevisar inte ett tillförlitligt resultat, och ett godkänt prov beskriver inte automatiskt hela leveransen."],
  specification: [["Ange beräkningen", "Vid procent dokumenteras nominell och uppmätt massa samt avvikelse med tecken. Vid absolut gräns anges styrande enhet. Leverantör och kontrollant använder samma formel."], ["Ange metoden", "Beskriv kapacitet, upplösning, referenskontroll, underlag, borttaget emballage, stabilisering och upprepning. En intern kontroll är inte automatiskt en spårbar kalibrering."], ["Ange beslutet", "Fastställ provomfattning, parregel, rapport och hantering av avvikelse. Knyt det till modell, valör och orderrevision. [Jämför sortimentet av viktskivor](/sv/produkter/viktskivor)."]],
  tableColumns: ["Kontrollpunkt", "Köparen anger", "Sparat underlag"],
  tableRows: [["Identitet", "Modell, material, valör, revision", "Ritning, SKU, prov"], ["Nominell vikt", "Märkt kg- eller lb-värde", "Original och specifikation"], ["Tillåten avvikelse", "Procent, massa eller båda", "Orderkrav"], ["Våg", "Kapacitet, upplösning, status", "ID och kontrolljournal"], ["Metod", "Utan emballage, underlag, upprepning", "Instruktion och resultat"], ["Omfattning", "Alla delar eller avtalat stickprov", "Plan och ID"], ["Par", "Största skillnad inom ett par", "Par-ID och värden"], ["Åtgärd", "Väg om, separera, korrigera, avvisa", "Avvikelserapport"]],
  checklist: ["Datum, order, SKU och valör", "Nominell vikt och enhet", "Uppmätt vikt och upplösning", "Signerad avvikelse och gräns", "Vågens ID och referensstatus", "Kontrollant", "Del-, par-, kartong- eller prov-ID", "Relevanta mätförhållanden", "Godkänn, väg om eller spärra", "Foto som stöd, inte som mätvärde"],
  method: ["Vågen ska klara den tyngsta skivan och ha en upplösning som passar intervallet. Den står stabilt och plant; status bekräftas med vald referensrutin. Skivan vägs utan förpackning i orderns enhet.", "Om visningen rör sig följs den skrivna repetitionsregeln. Alla föreskrivna värden och upplösningen sparas. En lagerkontroll kan stödja mottagning utan att beskrivas som laboratoriekalibrering."],
  sampling: ["Risk, processmognad, orderstorlek och följden av ett fel styr omfattningen. Första order, ny form, nytt material, ny insats eller ändrad logotyp kan kräva annan plan än en oförändrad återbeställning.", "Stickprovet bestäms före varuinspektion och kopplas till SKU, valör, parti, kartong eller leverans. Massa, utseende, mått och emballage kan behöva olika omfattning."],
  pairing: ["Två skivor kan klara sin individuella gräns men ligga i varsin ände av intervallet. Om balanserade par behövs anges en egen högsta parskillnad och parets identitet bevaras genom packning och mottagning.", "Parmatchning passar vissa premiumset eller fasta gympar. Den bör inte lovas utan regel, märkning och packplan."],
  dimensions: ["Godkänd massa bekräftar inte centrumhål, ytterdiameter, tjocklek, planhet eller insatsens läge. En skiva kan klara vägningen men passa dåligt på stången eller ta för stor hylslängd.", "Måtten hör hemma i ritningen och kontrolleras med lämpliga mätdon eller verifierad stång. Bumpergeometri, gjutprofil och greppöppningar är egna beslut."],
  materials: ["Gjutgods, stålkärna, gummi, uretan, nav, insats, färg och märkning bidrar olika till slutmassan. Kontrollera den färdiga monterade skivan, inte bara en kärna som ska bearbetas vidare.", "Vid byte av material, form, insats eller yta bekräftas kontrollvägen på nytt. Undvik vaga precisionstermer utan modell, gräns och underlag."],
  oem: ["Relieflogotyp, tryck, färg, nav, kg/lb-märkning och private-label-kartong ingår i samma godkända version. ODM-förändringar i form eller insats kräver ny teknisk bedömning.", "PowerBaseFit kan diskutera OEM, ODM-genomförbarhet, egen logotyp, märkesförpackning och bulkleverans när produktfamilj och användning är kända. Minimiantal, verktyg och tid bekräftas modellvis i offerten."],
  sample: ["Provet ska motsvara avsett material, insats, yta, märkning och packflöde. Mätvärden sparas med ritning och originalrevision; foto visar utseende men ersätter inte data.", "Avvikelser i serien går tillbaka till godkännande. Flytta inte ett resultat från en valör, form eller materialvariant till en annan utan kontroll."],
  shipment: ["Ordern anger vem som kontrollerar, när, vilka rapporter som levereras och vem som frisläpper. Delar utanför gränsen identifieras och spärras; medelvärden får inte dölja enskilda fel.", "Kontrollera även antal, märkning, yta, insatspassning, kartong och pall. Par- och SKU-etiketter ska överleva transporten."],
  rfq: ["Skicka samma underlag: familj, material, användning, valörer och enhet, toleranstext, par, mått, logotyp, färg, förpackning, kontroll, destination och rapportkrav.", "Skilj krav, önskemål och öppna frågor. [Se gummi-bumperviktskivor](/sv/produkter/viktskivor/gummi-bumperviktskiva), [jämför gjutjärnsskivor](/sv/produkter/viktskivor/gjutjarn-viktskiva) och skicka viktserien för fabriksgranskning."],
  faq: [["Vad är vikttolerans?", "Den tillåtna skillnaden mellan märkt nominell massa och resultatet av den avtalade metoden."], ["Procent eller gram?", "Båda kan fungera, men ordern måste ange vilket uttryck och vilken enhet som styr."], ["Behöver alla gym kalibrerade skivor?", "Nej. Anpassa produkttyp och intervall till användningen i stället för att automatiskt kopiera tävlingskrav."], ["Måste varje skiva vägas?", "Det är ett risk- och avtalsbeslut. Full kontroll eller stickprov bestäms före produktion."], ["Varför en särskild parregel?", "Två godkända delar kan skilja sig; parregeln begränsar skillnaden."], ["Kan logotypen påverka slutversionen?", "Relief, insats, yta och märkning ingår i den färdiga konfigurationen och godkänns tillsammans."], ["Bevisar rätt massa all kvalitet?", "Nej. Passning, diameter, tjocklek, insats, yta, märkning och emballage har egna kriterier."], ["Vad ska finnas i offertförfrågan?", "Familj, serie, användning, tolerans, metod, stickprov, mått, varumärke, emballage, destination och rapporter."]],
  linkLabels: ["Se kommersiella viktskivor", "Se bumperviktskivor", "Se gjutjärnsskivor", "Läs om fabriken", "Skicka offertförfrågan"],
  imageCopy: [["Omärkta olympiska viktskivor bredvid våg och skjutmått", "Illustrativ uppställning för massa och mått."], ["Svart olympisk skiva på våg med släckt display", "Metoden bestäms innan en avläsning används för mottagning."], ["Skjutmått placerat över skivans centruminsats", "Passning och mått kontrolleras separat från massan."], ["Två omärkta skivor för parjämförelse", "Parskillnad kan få en egen gräns."], ["Grepp- och bumperskiva med neutralt specifikationsmaterial", "Provet knyter konstruktion, varumärke och emballage till en version."]],
  cta: ["Definiera mottagningsplanen", "Skicka familj, viktserie, marknad, logotyp, emballage och kontrollkrav för modellgranskning.", "Begär fabriksoffert"]
};

const italian: GuideCopy = {
  locale: "it",
  path: "/it/blog/tolleranza-peso-dischi-acquisto-ingrosso",
  title: "Tolleranza di Peso dei Dischi all'Ingrosso | PowerBaseFit",
  description: "Definisci tolleranza, pesatura, campionamento, abbinamento, dimensioni, logo personalizzato e fornitura OEM di dischi per palestre.",
  h1: "Come Specificare la Tolleranza di Peso dei Dischi in un Ordine all'Ingrosso",
  primaryKeyword: "tolleranza peso dischi ingrosso",
  secondaryKeywords: ["precisione dischi palestra", "dischi professionali", "produttore dischi pesi", "dischi con logo", "dischi OEM", "private label fitness", "dischi palestra ingrosso"],
  intent: "specifica e collaudo di lotti commerciali di dischi",
  targetBuyer: "distributori, importatori, marchi privati e responsabili acquisti palestra",
  home: "Home", library: "Guide", eyebrow: "PowerBaseFit · Guida di fabbrica per dischi", contactPath: "/it/contatti",
  headings: { answer: "Risposta rapida", definition: "Che cosa significa davvero tolleranza", specify: "Scrivere una clausola verificabile", table: "Tabella di accettazione per l'acquirente", record: "Dati da riportare nel verbale", method: "Stabilire un metodo di pesatura ripetibile", sampling: "Decidere il campionamento prima della produzione", pairing: "Gestire separatamente l'abbinamento", dimensions: "Il peso non sostituisce le dimensioni", materials: "La costruzione cambia il piano di controllo", oem: "Effetti di OEM, ODM, logo e private label", sample: "Approvare un campione equivalente alla serie", shipment: "Collegare l'ispezione all'ordine", rfq: "Dati da inviare alla fabbrica nella richiesta" },
  answer: ["Una tolleranza utile è un intervallo di accettazione scritto per uno specifico modello e peso nominale. Deve indicare percentuale, massa assoluta o entrambe, unità prevalente, metodo di pesatura, estensione del controllo e decisione per un risultato fuori limite.", "Non esiste un unico valore corretto per dischi in ghisa, rivestiti, bumper o calibrati. L'acquirente parte dall'uso e conferma la fattibilità per modello. PowerBaseFit può rivedere come fabbrica gamma, costruzione, logo, imballaggio e controllo per progetti OEM o private label."],
  definition: ["Il peso nominale è il valore marcato; il peso rilevato deriva dal metodo concordato. La tolleranza è lo scostamento ammesso, non la promessa che ogni pezzo coincida perfettamente con il nominale.", "Risoluzione, ripetibilità, stato della bilancia e campionamento sono aspetti distinti. Più cifre sul display non dimostrano affidabilità, e un campione conforme non rappresenta automaticamente l'intera spedizione."],
  specification: [["Definire il calcolo", "Per la percentuale si registrano nominale, rilevato e scostamento con segno. Per una fascia assoluta si indica l'unità di controllo. Fornitore e ispettore applicano la stessa formula."], ["Definire il metodo", "Capacità e risoluzione della bilancia, controllo di riferimento, piano di appoggio, rimozione imballo, stabilizzazione e ripetizioni vanno scritti. Un controllo interno non è automaticamente una taratura tracciabile."], ["Definire la decisione", "Stabilire campione, regola di coppia, rapporto e gestione dell'esito negativo, collegandoli a modello, taglia e revisione ordine. [Confronta la gamma dischi](/it/prodotti/dischi-pesi)."]],
  tableColumns: ["Controllo", "Definizione del buyer", "Evidenza"],
  tableRows: [["Identità", "Modello, materiale, taglia, revisione", "Disegno, SKU, campione"], ["Peso nominale", "Valore kg o lb marcato", "Grafica e scheda"], ["Scostamento", "Percentuale, massa o entrambi", "Clausola ordine"], ["Bilancia", "Capacità, risoluzione, stato", "ID e verifica"], ["Procedura", "Senza imballo, piano, ripetizione, unità", "Istruzione e scheda"], ["Estensione", "Tutti i pezzi o campione concordato", "Piano e ID"], ["Coppia", "Differenza massima fra due pezzi", "ID e misure"], ["Gestione", "Ripetere, isolare, correggere, rifiutare", "Rapporto difformità"]],
  checklist: ["Data, ordine, SKU e taglia", "Peso nominale e unità", "Peso rilevato e risoluzione", "Scostamento con segno e limite", "ID bilancia e stato", "Ispettore", "ID pezzo, coppia, cartone o campione", "Note sulle condizioni", "Accetta, ripeti o isola", "Foto come contesto, non come misura"],
  method: ["La bilancia copre il disco più pesante e offre risoluzione coerente con la fascia. Va posta su piano stabile e livellato, verificata secondo la procedura scelta e usata sul disco senza imballaggio nell'unità contrattuale.", "Se la lettura varia, si segue la regola di ripetizione senza scegliere il valore più favorevole. Si registrano letture e risoluzione. Un controllo di magazzino sostiene il collaudo, ma non diventa taratura di laboratorio."],
  sampling: ["Rischio, maturità del processo, volume e costo dell'errore definiscono l'estensione. Primo ordine, nuovo stampo, materiale, inserto o logo possono richiedere un piano diverso da un riordino invariato.", "Il campione si decide prima di vedere la merce e si riferisce a SKU, taglia, lotto, cartone o spedizione. Massa, aspetto, misure e imballo possono seguire piani diversi."],
  pairing: ["Due dischi conformi singolarmente possono occupare estremi opposti della fascia. Se servono coppie bilanciate, aggiungere una differenza massima e mantenere l'identità della coppia in imballo e ricevimento.", "L'abbinamento ha senso per set premium o coppie gestite; non va promesso senza regola, etichetta e piano di confezionamento."],
  dimensions: ["Una massa conforme non verifica foro centrale, diametro esterno, spessore, planarità o allineamento dell'inserto. Un disco può passare la pesatura e montare male sul bilanciere.", "Le misure restano nel disegno e si controllano con strumenti adatti o interfaccia confermata. Geometria bumper, profilo ghisa e impugnature sono requisiti separati."],
  materials: ["Fusione, nucleo d'acciaio, gomma, poliuretano, mozzo, inserto, vernice e marcatura contribuiscono diversamente alla massa finale. Il controllo riguarda il disco finito e assemblato.", "Al cambio di materiale, stampo, inserto o finitura, riconfermare il percorso di controllo. Evitare definizioni vaghe di precisione senza modello, limite e prova."],
  oem: ["Logo in rilievo, stampa, colore, mozzo, marcatura kg/lb e cartone private label appartengono alla stessa versione approvata. Una modifica ODM di stampo o inserto richiede nuova revisione tecnica.", "PowerBaseFit può valutare OEM, fattibilità ODM, logo personalizzato, confezione privata e fornitura bulk dopo aver definito famiglia e uso. Minimo, attrezzaggio e tempi sono confermati per modello nel preventivo."],
  sample: ["Il campione deve rappresentare materiale, inserto, finitura, marcatura e imballo previsti. Le misure si archiviano con disegno e grafica; la foto conferma l'aspetto, non sostituisce i dati.", "Le differenze di serie tornano in approvazione. Non trasferire l'esito da una taglia, stampo o materiale a un altro senza verifica."],
  shipment: ["L'ordine identifica ispettore, momento, documenti e autorità di rilascio. I pezzi fuori fascia vengono identificati e isolati; una media non deve nascondere il singolo errore.", "Controllare anche quantità, marcatura, superficie, inserto, cartoni e pallet. Etichette di coppia e SKU devono arrivare integre."],
  rfq: ["Inviare lo stesso capitolato: famiglia, materiale, uso, taglie e unità, tolleranza, coppie, misure, logo, colore, imballo, ispezione, destinazione e rapporti richiesti.", "Separare requisiti, preferenze e domande. [Vedi bumper in gomma](/it/prodotti/dischi-pesi/disco-bumper-in-gomma), [confronta dischi in ghisa](/it/prodotti/dischi-pesi/disco-pesi-in-ghisa) e invia la gamma alla fabbrica."],
  faq: [["Cos'è la tolleranza di peso?", "Lo scostamento consentito fra peso nominale marcato e risultato del metodo concordato."], ["Percentuale o grammi?", "Entrambi sono possibili, ma l'ordine deve definire espressione e unità prevalenti."], ["Ogni palestra necessita di dischi calibrati?", "No. Tipo e fascia vanno scelti per l'uso, senza copiare automaticamente i requisiti gara."], ["Bisogna pesare ogni disco?", "È una scelta di rischio e contratto. Controllo totale o campione si definiscono prima della produzione."], ["Perché una regola di coppia?", "Due pezzi conformi possono differire; la regola limita lo scostamento fra compagni."], ["Il logo può cambiare il prodotto finale?", "Rilievo, inserto, finitura e marcatura fanno parte della configurazione completa."], ["Il peso conforme prova tutta la qualità?", "No. Montaggio, diametro, spessore, inserto, finitura, marcatura e imballo hanno criteri propri."], ["Cosa include la richiesta?", "Famiglia, gamma, uso, tolleranza, metodo, campione, misure, marca, imballo, destinazione e rapporti."]],
  linkLabels: ["Vedi dischi professionali", "Vedi bumper plate", "Vedi dischi in ghisa", "Scopri la fabbrica", "Invia richiesta"],
  imageCopy: [["Dischi olimpici senza marchio accanto a bilancia e calibro", "Allestimento illustrativo per massa e dimensioni."], ["Disco olimpico nero su bilancia con display spento", "Il metodo viene concordato prima della lettura di accettazione."], ["Calibro sul foro centrale di un disco", "Foro e montaggio sono verifiche separate dalla massa."], ["Due dischi senza marchio per il confronto di coppia", "La differenza di coppia può avere un limite proprio."], ["Disco con impugnature e bumper con materiali neutri", "Il campione collega costruzione, marchio e imballo alla versione approvata."]],
  cta: ["Definisci il piano di collaudo", "Invia famiglia, gamma, mercato, logo, imballo e controllo per la revisione del modello.", "Richiedi preventivo di fabbrica"]
};

const dutch: GuideCopy = {
  locale: "nl",
  path: "/nl/blog/gewichtstolerantie-halterschijven-inkoop",
  title: "Gewichtstolerantie van Halterschijven bij Inkoop | PowerBaseFit",
  description: "Leg gewichtstolerantie, weegmethode, steekproef, paarverschil, maten, eigen logo en OEM-levering van halterschijven controleerbaar vast.",
  h1: "Gewichtstolerantie voor een Bulkorder Halterschijven Specificeren",
  primaryKeyword: "gewichtstolerantie halterschijven inkoop",
  secondaryKeywords: ["nauwkeurigheid halterschijven", "commerciële halterschijven", "fabrikant halterschijven", "halterschijven met logo", "OEM halterschijven", "private label fitness", "halterschijven groothandel"],
  intent: "specificatie en ontvangstcontrole van commerciële halterschijven",
  targetBuyer: "distributeurs, importeurs, private labels en inkopers van sportscholen",
  home: "Home", library: "Inkoopgidsen", eyebrow: "PowerBaseFit · Fabrieksgids voor halterschijven", contactPath: "/nl/contact",
  headings: { answer: "Kort antwoord", definition: "Wat gewichtstolerantie werkelijk betekent", specify: "Schrijf een controleerbare tolerantiebepaling", table: "Acceptatietabel voor inkopers", record: "Gegevens voor het inspectierapport", method: "Maak de weegmethode herhaalbaar", sampling: "Bepaal de inspectieomvang vóór productie", pairing: "Behandel paarmatching als apart criterium", dimensions: "Gewicht vervangt geen maatcontrole", materials: "Constructie bepaalt het controleplan", oem: "Effect van OEM, ODM, logo en private label", sample: "Keur een productie-equivalent monster goed", shipment: "Koppel zendinginspectie aan de inkooporder", rfq: "Informatie voor een offerteaanvraag aan de fabriek" },
  answer: ["Een bruikbare tolerantie is een schriftelijke acceptatieband voor één model en nominale massa. De bepaling noemt percentage, absolute massa of beide, de leidende eenheid, de weegmethode, de inspectieomvang en de beslissing bij een waarde buiten de band.", "Er bestaat geen eerlijk universeel getal voor gietijzeren, gecoate, bumper- en gekalibreerde schijven. De inkoper vertrekt vanuit het gebruik en laat de eis per model bevestigen. PowerBaseFit kan als fabriek gewichtsreeks, constructie, logo, verpakking en controle voor OEM of private label beoordelen."],
  definition: ["Nominale massa is de markering op de schijf; gemeten massa komt uit de afgesproken methode. Tolerantie is het toegestane verschil en geen belofte dat elk exemplaar exact nominaal is.", "Resolutie, herhaalbaarheid, verificatiestatus van de weegschaal en steekproef zijn afzonderlijke zaken. Veel decimalen bewijzen geen betrouwbaar resultaat; een geslaagd monster beschrijft niet automatisch de hele zending."],
  specification: [["Leg de berekening vast", "Bij een percentage worden nominale en gemeten massa en de afwijking met teken vastgelegd. Bij een absolute band staat de leidende eenheid erbij. Leverancier en inspecteur gebruiken dezelfde formule."], ["Leg de methode vast", "Noteer capaciteit, resolutie, referentiecontrole, ondergrond, verwijderen van verpakking, stabilisatie en herhalingen. Een interne controle is niet automatisch traceerbare kalibratie."], ["Leg de beslissing vast", "Bepaal steekproef, paarregel, rapport en behandeling van afwijkingen. Koppel die aan model, gewicht en orderrevisie. [Vergelijk het assortiment halterschijven](/nl/producten/halterschijven)."]],
  tableColumns: ["Controlepunt", "Wat de inkoper vastlegt", "Bewijs"],
  tableRows: [["Identiteit", "Model, materiaal, gewicht, revisie", "Tekening, SKU, monster"], ["Nominaal", "Gemarkeerde kg- of lb-waarde", "Artwork en specificatie"], ["Toegestane afwijking", "Percentage, massa of beide", "Orderbepaling"], ["Weegschaal", "Capaciteit, resolutie, status", "ID en controlelog"], ["Methode", "Zonder verpakking, ondergrond, herhaling", "Werkinstructie"], ["Omvang", "Alle stuks of afgesproken steekproef", "Plan en IDs"], ["Paar", "Maximaal verschil tussen partners", "Paar-ID en waarden"], ["Afhandeling", "Herwegen, blokkeren, corrigeren, afwijzen", "Afwijkingsrapport"]],
  checklist: ["Datum, order, SKU en gewicht", "Nominale massa en eenheid", "Gemeten massa en resolutie", "Afwijking met teken en grens", "Weegschaal-ID en referentiestatus", "Inspecteur", "Stuk-, paar-, doos- of monster-ID", "Relevante meetomstandigheden", "Accepteren, herwegen of apart zetten", "Foto als context, niet als meetwaarde"],
  method: ["Gebruik een weegschaal die de zwaarste schijf aankan en voldoende resolutie heeft voor de afgesproken band. Plaats haar stabiel en vlak, bevestig de status met de gekozen referentieprocedure en weeg zonder verpakking in de contracteenheid.", "Bij een bewegende waarde volgt u de schriftelijke herhaalregel en kiest u niet het gunstigste getal. Bewaar vereiste waarden en resolutie. Een magazijncontrole ondersteunt ontvangst, maar is geen laboratoriumkalibratie."],
  sampling: ["Productrisico, proceservaring, orderomvang en gevolgen van een fout bepalen de controle. Een eerste order, nieuwe matrijs, nieuw materiaal, andere bus of gewijzigd logo kan een ander plan vragen dan een ongewijzigde herhaalorder.", "Stel de steekproef vast voordat u de goederen ziet en koppel hem aan SKU, gewicht, batch, doos of zending. Massa, uiterlijk, maat en verpakking kunnen een eigen omvang hebben."],
  pairing: ["Twee individueel goede schijven kunnen aan tegengestelde kanten van de band liggen. Als gebalanceerde paren belangrijk zijn, voeg dan een maximaal paarverschil toe en behoud de paaridentiteit in verpakking en ontvangst.", "Paarmatching is zinvol voor bepaalde premiumsets of vaste sportschoolparen, maar vraagt altijd een regel, label en verpakkingsplan."],
  dimensions: ["Een goede massa bevestigt niet het middengat, de buitendiameter, dikte, vlakheid of uitlijning van de bus. Een schijf kan slagen op de weegschaal en toch slecht op de stang passen.", "Maten blijven in de tekening en worden met geschikte meetmiddelen of een bevestigde stanginterface gecontroleerd. Bumpergeometrie, gietprofiel en handgrepen zijn aparte eisen."],
  materials: ["Gietdeel, stalen kern, rubber, urethaan, naaf, bus, lak en markering dragen verschillend bij aan de eindmassa. Controleer de afgemonteerde schijf, niet alleen een kern die later wordt afgewerkt.", "Bevestig het controlepad opnieuw bij wijziging van materiaal, matrijs, bus of afwerking. Vermijd vage precisieclaims zonder model, grens en bewijs."],
  oem: ["Reliëflogo, druk, kleur, naaf, kg/lb-markering en private-label-doos behoren tot één goedgekeurde versie. Een ODM-wijziging aan matrijs of bus vraagt een nieuwe technische beoordeling.", "PowerBaseFit kan OEM, ODM-haalbaarheid, eigen logo, merkverpakking en bulklevering bespreken zodra familie en gebruik bekend zijn. Minimum, gereedschap en planning worden per model in de offerte bevestigd."],
  sample: ["Het monster vertegenwoordigt materiaal, bus, afwerking, markering en verpakkingsroute van de serie. Meetwaarden worden bij tekening en artworkrevisie bewaard; foto's tonen uiterlijk, geen meetbewijs.", "Productieverschillen gaan terug naar goedkeuring. Neem resultaten van het ene gewicht, de ene matrijs of het ene materiaal niet zonder controle over."],
  shipment: ["De order noemt inspecteur, moment, rapporten en vrijgavebevoegdheid. Stuks buiten de band worden geïdentificeerd en afgezonderd; een gemiddelde mag een individuele fout niet verbergen.", "Controleer ook aantal, markering, oppervlak, buspassing, dozen en pallet. Paar- en SKU-labels moeten het transport doorstaan."],
  rfq: ["Stuur hetzelfde pakket: familie, materiaal, gebruik, gewichten en eenheid, tolerantie, paren, maten, logo, kleur, verpakking, inspectie, bestemming en rapporten.", "Scheid verplichte punten, voorkeuren en vragen. [Bekijk rubberen bumper plates](/nl/producten/halterschijven/rubberen-bumper-plate), [vergelijk gietijzeren schijven](/nl/producten/halterschijven/gietijzeren-halterschijf) en stuur de reeks voor fabrieksbeoordeling."],
  faq: [["Wat is gewichtstolerantie?", "Het toegestane verschil tussen gemarkeerde nominale massa en het resultaat van de afgesproken methode."], ["Percentage of gram?", "Beide kunnen, maar de order moet de leidende uitdrukking en eenheid vastleggen."], ["Heeft elke sportschool gekalibreerde schijven nodig?", "Nee. Stem type en band af op gebruik en neem niet automatisch wedstrijdregels over."], ["Moet elke schijf worden gewogen?", "Dat is een risico- en contractkeuze. Volledige controle of steekproef wordt vooraf bepaald."], ["Waarom een paarregel?", "Twee goede stuks kunnen verschillen; de paarregel begrenst dat verschil."], ["Kan een logo het eindproduct wijzigen?", "Reliëf, bus, afwerking en markering horen bij de afgewerkte configuratie en worden samen goedgekeurd."], ["Bewijst massa de hele kwaliteit?", "Nee. Passing, diameter, dikte, bus, oppervlak, markering en verpakking hebben eigen criteria."], ["Wat hoort in de aanvraag?", "Familie, reeks, gebruik, tolerantie, methode, steekproef, maten, merk, verpakking, bestemming en rapporten."]],
  linkLabels: ["Bekijk commerciële halterschijven", "Bekijk bumper plates", "Bekijk gietijzeren schijven", "Bekijk de fabriek", "Stuur een offerteaanvraag"],
  imageCopy: [["Ongemerkte olympische halterschijven naast weegschaal en schuifmaat", "Illustratieve opstelling voor massa- en maatcontrole."], ["Zwarte olympische schijf op een weegschaal met leeg scherm", "De methode staat vast voordat een waarde voor ontvangst telt."], ["Schuifmaat bij de centrale bus van een schijf", "Middengat en passing worden los van massa beoordeeld."], ["Twee ongemerkte schijven voor paarvergelijking", "Paarverschil kan een eigen grens hebben."], ["Gripschijf en bumperschijf met neutrale specificatiematerialen", "Het monster verbindt constructie, merk en verpakking met één versie."]],
  cta: ["Leg het acceptatieplan vast", "Stuur familie, gewichtsreeks, markt, logo, verpakking en controle voor modelbeoordeling.", "Vraag een fabrieksopgave aan"]
};

const arabic: GuideCopy = {
  locale: "ar",
  path: "/ar/blog/hamish-inhiraf-wazn-aqras-athqal",
  title: "هامش انحراف وزن أقراص الأوزان للشراء بالجملة | PowerBaseFit",
  description: "دليل عملي لتحديد هامش الوزن وطريقة القياس والعينة ومطابقة الأزواج والأبعاد والشعار المخصص وتوريد أقراص الأوزان بنظام OEM.",
  h1: "كيف تحدد هامش انحراف وزن أقراص الأوزان في طلبية شراء بالجملة؟",
  primaryKeyword: "هامش انحراف وزن أقراص الأوزان بالجملة",
  secondaryKeywords: ["دقة أقراص الأوزان", "أقراص أوزان تجارية", "مصنع أقراص أوزان", "أقراص بشعار مخصص", "أقراص أوزان OEM", "علامة خاصة لمعدات الجيم", "مورد أقراص أوزان بالجملة"],
  intent: "إعداد مواصفة وفحص استلام أقراص الأوزان التجارية",
  targetBuyer: "الموزعون والمستوردون والعلامات الخاصة ومسؤولو مشتريات الأندية",
  home: "الرئيسية", library: "المقالات", eyebrow: "PowerBaseFit · دليل مصنع أقراص الأوزان", contactPath: "/contact",
  headings: { answer: "الإجابة المختصرة", definition: "ما المقصود فعلياً بهامش الوزن؟", specify: "اكتب شرطاً يمكن فحصه", table: "جدول قبول للمشتري", record: "البيانات التي يجب حفظها", method: "ثبت طريقة وزن قابلة للتكرار", sampling: "حدد نطاق الفحص قبل الإنتاج", pairing: "افصل شرط مطابقة الأزواج", dimensions: "الوزن لا يغني عن فحص الأبعاد", materials: "تركيب القرص يغير خطة الضبط", oem: "أثر OEM وODM والشعار والعلامة الخاصة", sample: "اعتمد عينة مماثلة للإنتاج", shipment: "اربط فحص الشحنة بأمر الشراء", rfq: "ما الذي يرسل إلى المصنع لطلب السعر؟" },
  answer: ["الهامش المفيد هو نطاق قبول مكتوب لموديل ووزن اسمي محددين. يوضح هل يستخدم النسبة المئوية أو الكتلة المطلقة أو كليهما، والوحدة الحاكمة، وطريقة الوزن، وحجم الفحص، والقرار عند خروج النتيجة عن النطاق.", "لا يوجد رقم واحد صادق يصلح لأقراص الحديد والمكسوة والبامبر والأقراص المعايرة. يبدأ المشتري من الاستخدام ثم يؤكد الإمكانية لكل موديل. تستطيع PowerBaseFit بصفتها مصنعاً مراجعة سلسلة الأوزان والتركيب والشعار والتغليف والفحص لمشروع OEM أو علامة خاصة."],
  definition: ["الوزن الاسمي هو الرقم المكتوب على القرص، والوزن الفعلي هو نتيجة الطريقة المتفق عليها. الهامش هو الفرق المسموح، وليس وعداً بأن تكون كل قطعة مساوية للرقم تماماً.", "دقة عرض الميزان وقابلية تكرار القراءة وحالة التحقق وخطة العينة موضوعات منفصلة. كثرة الخانات لا تثبت صحة القياس، ونجاح عينة لا يصف تلقائياً كل الشحنة."],
  specification: [["حدد طريقة الحساب", "عند استخدام النسبة، يسجل الوزن الاسمي والفعلي والانحراف بإشارته. وعند استخدام كتلة مطلقة، تحدد الوحدة الحاكمة. يجب أن يطبق المورد والمفتش التفسير نفسه."], ["حدد طريقة القياس", "اكتب سعة الميزان ودقته وحالة الفحص المرجعي وسطح العمل وإزالة التغليف وثبات القراءة وتكرارها. الفحص الداخلي ليس معايرة قابلة للتتبع من دون المستندات اللازمة."], ["حدد قاعدة القرار", "ثبت حجم العينة وفرق الزوج ونموذج التقرير ومعالجة القطعة المخالفة، واربطها بالموديل والوزن ومراجعة الطلب. [اطلع على مجموعة أقراص الأوزان](/products/weight-plates)."]],
  tableColumns: ["نقطة الضبط", "ما يحدده المشتري", "الدليل المحفوظ"],
  tableRows: [["هوية المنتج", "الموديل والمادة والوزن والمراجعة", "الرسم وSKU والعينة"], ["الوزن الاسمي", "قيمة kg أو lb على القرص", "التصميم والمواصفة"], ["الانحراف", "نسبة أو كتلة أو كلاهما", "شرط أمر الشراء"], ["الميزان", "السعة والدقة والحالة", "رقم الجهاز وسجل الفحص"], ["الطريقة", "من دون عبوة وسطح ثابت وتكرار", "تعليمات ونتائج"], ["النطاق", "كل القطع أو عينة متفق عليها", "خطة وأرقام القطع"], ["الزوج", "أقصى فرق بين قطعتين", "رقم الزوج والقراءتان"], ["المعالجة", "إعادة أو عزل أو تصحيح أو رفض", "سجل المخالفة"]],
  checklist: ["التاريخ ورقم الطلب وSKU والوزن", "الوزن الاسمي والوحدة", "الوزن الفعلي ودقة العرض", "الانحراف بإشارته والحد", "رقم الميزان وحالة المرجع", "هوية المفتش", "رقم القطعة أو الزوج أو الكرتون", "ملاحظات ظروف القياس", "قبول أو إعادة قياس أو عزل", "الصورة للسياق وليست نتيجة القياس"],
  method: ["اختر ميزاناً يتحمل أثقل قرص وتناسب دقته النطاق المتفق عليه. يوضع على سطح ثابت ومستوي، وتؤكد حالته بالإجراء المرجعي المحدد. يوزن القرص من دون العبوة وبوحدة العقد.", "إذا تحركت القراءة، تطبق قاعدة التكرار المكتوبة بدلاً من اختيار أفضل رقم. تحفظ القراءات المطلوبة ودقة الميزان. فحص المستودع يدعم الاستلام لكنه لا يصبح معايرة مختبرية."],
  sampling: ["تعتمد الخطة على مخاطر المنتج واستقرار العملية وحجم الطلب وأثر الخطأ. قد تحتاج أول طلبية أو قالب أو مادة أو حلقة أو شعار جديد إلى نطاق مختلف عن طلبية تكرار بلا تغيير.", "تحدد العينة قبل رؤية البضاعة وتربط بـSKU أو الوزن أو الدفعة أو الكرتون أو الشحنة. وقد تختلف عينة الوزن عن عينة المظهر والأبعاد والتغليف."],
  pairing: ["قد ينجح قرصان منفردان ويقع كل منهما عند طرف مختلف من النطاق. عند الحاجة إلى زوج متوازن، أضف فرقاً أقصى بين القطعتين واحفظ رقم الزوج خلال التعبئة والاستلام.", "مطابقة الأزواج مناسبة لبعض المجموعات المميزة، لكنها تحتاج شرطاً ووسمًا وخطة تغليف ولا تفترض لكل طلبية."],
  dimensions: ["نجاح الوزن لا يثبت قطر الفتحة أو القطر الخارجي أو السمك أو الاستواء أو محاذاة الحلقة. قد ينجح القرص على الميزان ولا يناسب عمود البار جيداً.", "تبقى الأبعاد في الرسم وتفحص بأداة مناسبة أو بواجهة بار مؤكدة. هندسة البامبر وشكل الحديد وفتحات الإمساك شروط مستقلة."],
  materials: ["الحديد المصبوب والقلب الفولاذي والمطاط والبولي يوريثان والمحور والحلقة والطلاء والعلامات تسهم في الوزن النهائي بطرق مختلفة. يفحص القرص النهائي المركب لا القلب قبل التشطيب.", "عند تغيير المادة أو القالب أو الحلقة أو السطح، يعاد تأكيد طريقة الضبط. تجنب وصف الدقة العالية من دون موديل وحد ودليل."],
  oem: ["الشعار البارز أو المطبوع واللون وتصميم المحور وعلامة kg/lb وكرتون العلامة الخاصة أجزاء من نسخة واحدة معتمدة. تغيير ODM في القالب أو الحلقة يحتاج مراجعة فنية جديدة.", "يمكن لـPowerBaseFit مناقشة OEM وإمكانية ODM والشعار المخصص والتعبئة الخاصة والتوريد بالجملة بعد تحديد العائلة والاستخدام. الحد الأدنى والقالب والوقت تؤكد لكل موديل في عرض السعر."],
  sample: ["يجب أن تمثل العينة المادة والحلقة والتشطيب والعلامات والتعبئة المقصودة. تحفظ القياسات مع الرسم ونسخة التصميم؛ الصورة تثبت المظهر ولا تستبدل الأرقام.", "أي اختلاف في الإنتاج يعود للاعتماد. لا تنقل نتيجة وزن أو قالب أو مادة إلى نسخة أخرى بلا فحص."],
  shipment: ["يحدد أمر الشراء المفتش والتوقيت والتقارير وسلطة الإفراج. تعرف القطع خارج النطاق وتعزل؛ ولا يجوز أن يخفي المتوسط فشل قطعة منفردة.", "افحص أيضاً العدد والعلامات والسطح وملاءمة الحلقة والكرتون والمنصة. يجب أن تبقى ملصقات الأزواج وSKU قابلة للقراءة بعد النقل."],
  rfq: ["أرسل المواصفة نفسها: العائلة والمادة والاستخدام والأوزان والوحدة والهامش والأزواج والأبعاد والشعار واللون والتغليف والفحص والوجهة والتقارير.", "افصل بين الشروط الإلزامية والتفضيلات والأسئلة. [راجع أقراص البامبر المطاطية](/products/weight-plates/rubber-bumper-plate)، [وقارن أقراص الحديد](/products/weight-plates/cast-iron-weight-plate)، ثم أرسل سلسلة الأوزان لمراجعة المصنع."],
  faq: [["ما هامش وزن قرص الأوزان؟", "هو الفرق المسموح بين الوزن الاسمي المكتوب ونتيجة طريقة القياس المتفق عليها."], ["هل يكتب بالنسبة أم بالغرام؟", "كلاهما ممكن، لكن يجب أن يحدد الطلب التعبير والوحدة الحاكمة بوضوح."], ["هل يحتاج كل ناد إلى أقراص معايرة؟", "لا. يختار النوع والهامش حسب الاستخدام ولا تنقل قواعد المنافسة تلقائياً."], ["هل يجب وزن كل قطعة؟", "هذا قرار مخاطر وعقد. يحدد الفحص الكامل أو العينة قبل الإنتاج."], ["لماذا يوجد شرط للزوج؟", "قد تنجح قطعتان منفردتان مع فرق واضح؛ شرط الزوج يحد ذلك الفرق."], ["هل يغير الشعار النسخة النهائية؟", "النقش والحلقة والتشطيب والعلامة أجزاء من المنتج النهائي وتعتمد معاً."], ["هل الوزن المقبول يثبت الجودة كاملة؟", "لا. الملاءمة والقطر والسمك والحلقة والسطح والعلامات والتغليف لها شروط مستقلة."], ["ما الذي يدخل في طلب السعر؟", "العائلة والأوزان والاستخدام والهامش والطريقة والعينة والأبعاد والعلامة والتغليف والوجهة والتقارير."]],
  linkLabels: ["دليل شراء دمبل OEM", "مشروع دمبل كروم مدمج"],
  imageCopy: [["أقراص أولمبية بلا علامة بجانب ميزان وقدمة قياس", "مشهد توضيحي لمناقشة الوزن والأبعاد."], ["قرص أولمبي أسود على ميزان بشاشة مطفأة", "تحدد الطريقة قبل استخدام القراءة في الاستلام."], ["قدمة قياس عند الحلقة المركزية للقرص", "الفتحة والملاءمة تفحصان منفصلتين عن الوزن."], ["قرصان بلا علامة للمقارنة كزوج", "يمكن تحديد حد مستقل لفرق الزوج."], ["قرص بمقابض وقرص بامبر مع مواد مواصفات محايدة", "تربط العينة التركيب والعلامة والتعبئة بنسخة معتمدة."]],
  cta: ["حدد خطة استلام أقراص الأوزان", "أرسل العائلة وسلسلة الأوزان والسوق والشعار والتغليف والفحص لمراجعة كل موديل.", "اطلب عرضاً من المصنع"]
};

const korean: GuideCopy = {
  locale: "ko",
  path: "/ko/blog/weight-plate-weight-tolerance-bulk-order",
  title: "웨이트 원판 중량 공차 대량 구매 검수 가이드 | PowerBaseFit",
  description: "원판 중량 공차, 계량 방법, 샘플링, 좌우 페어 차이, 치수, 커스텀 로고와 OEM·자체 브랜드 대량 공급 기준을 정리합니다.",
  h1: "웨이트 원판 대량 주문에서 중량 공차를 지정하는 방법",
  primaryKeyword: "웨이트 원판 중량 공차 대량 주문",
  secondaryKeywords: ["원판 중량 정확도", "상업용 웨이트 원판", "웨이트 원판 제조사", "커스텀 로고 원판", "OEM 웨이트 원판", "자체 브랜드 헬스기구", "웨이트 원판 도매"],
  intent: "상업용 웨이트 원판 사양 작성과 입고 검수",
  targetBuyer: "유통사, 수입사, 자체 브랜드와 피트니스센터 구매 담당자",
  home: "홈", library: "구매 가이드", eyebrow: "PowerBaseFit · 웨이트 원판 제조 가이드", contactPath: "/ko/contact",
  headings: { answer: "핵심 답변", definition: "중량 공차의 정확한 의미", specify: "검수 가능한 문장으로 작성하기", table: "구매자용 원판 합격 기준표", record: "검수 기록에 남길 항목", method: "반복 가능한 계량 방법 설정", sampling: "생산 전에 검수 범위 결정", pairing: "페어 차이는 별도 기준으로 관리", dimensions: "중량과 치수는 별도 항목", materials: "구조에 따라 관리 계획이 달라지는 이유", oem: "OEM, ODM, 로고와 자체 브랜드 영향", sample: "양산과 같은 조건의 샘플 승인", shipment: "출하 검수를 발주서와 연결", rfq: "공장 견적 요청에 포함할 정보" },
  answer: ["실무적인 중량 공차는 특정 모델과 공칭 중량을 대상으로 한 서면 합격 범위입니다. 백분율, 절대 질량 또는 둘 다 중 무엇을 쓸지, 우선 단위, 계량 방법, 검사 범위와 기준 이탈 시 조치를 함께 적어야 합니다.", "주철, 코팅, 범퍼, 캘리브레이티드 원판 전체에 적용되는 하나의 정직한 수치는 없습니다. 실제 용도에서 요구 수준을 정하고 모델별로 가능 여부를 확인해야 합니다. PowerBaseFit은 제조사 관점에서 OEM 및 자체 브랜드 프로젝트의 중량 구성, 구조, 로고, 포장과 검수 방법을 검토할 수 있습니다."],
  definition: ["공칭 중량은 원판에 표시된 값이고 실측 중량은 합의된 방법으로 얻은 결과입니다. 공차는 두 값 사이에서 허용되는 차이이며, 모든 원판이 공칭값과 완전히 같다는 뜻이 아닙니다.", "저울 분해능, 반복성, 기준 확인 상태와 샘플링은 서로 다른 항목입니다. 표시 자릿수가 많다고 신뢰성이 입증되는 것은 아니며, 샘플 합격만으로 전체 출하분을 설명할 수도 없습니다."],
  specification: [["계산식을 지정", "백분율이면 공칭값, 실측값, 부호가 있는 편차를 기록합니다. 절대 질량 범위이면 우선 단위를 명시합니다. 공급사와 검사자가 같은 계산을 써야 합니다."], ["방법을 지정", "저울 용량과 분해능, 기준 확인, 설치면, 포장 제거, 안정화와 반복 규칙을 적습니다. 내부 점검은 필요한 문서 없이 추적 가능한 교정으로 불러서는 안 됩니다."], ["판정 규칙을 지정", "샘플 범위, 페어 기준, 보고 형식과 부적합 처리 방법을 모델, 중량, 발주서 개정번호에 연결합니다. [웨이트 원판 라인업 비교](/ko/products/weight-plates)."]],
  tableColumns: ["관리 항목", "구매자가 정할 내용", "보관 증빙"],
  tableRows: [["제품 식별", "모델, 소재, 중량, 개정", "도면, SKU, 승인 샘플"], ["공칭 중량", "표시된 kg 또는 lb", "아트워크와 사양서"], ["허용 편차", "백분율, 절대 질량 또는 둘 다", "발주서 조항"], ["저울", "용량, 분해능, 상태", "장비 ID와 확인 기록"], ["절차", "무포장, 설치면, 반복, 단위", "작업 지침과 결과표"], ["검사 범위", "전수 또는 합의된 샘플", "계획과 검사 ID"], ["페어", "두 원판 간 최대 차이", "페어 ID와 두 측정값"], ["처리", "재측정, 격리, 수정, 반려", "부적합 기록"]],
  checklist: ["날짜, 발주번호, SKU, 중량", "공칭 중량과 단위", "실측 중량과 분해능", "부호가 있는 편차와 한계", "저울 ID와 기준 상태", "검사자", "제품, 페어, 박스 또는 샘플 ID", "반복성에 영향을 준 조건", "합격, 재측정 또는 격리", "사진은 보조 자료이며 측정값이 아님"],
  method: ["가장 무거운 원판을 수용하면서 합의 범위에 맞는 분해능을 가진 저울을 사용합니다. 단단하고 수평인 면에 설치하고 정한 기준 절차로 상태를 확인한 뒤, 포장을 제거한 원판을 계약 단위로 측정합니다.", "값이 움직이면 유리한 숫자를 고르지 말고 서면 반복 규칙을 따릅니다. 필요한 모든 값과 분해능을 기록합니다. 창고 확인은 입고 판단에 도움을 주지만 실험실 교정과 같지 않습니다."],
  sampling: ["제품 위험, 공정 안정성, 주문 규모와 누락 비용을 보고 범위를 정합니다. 첫 주문, 새 금형, 새 소재, 새 인서트 또는 변경된 로고는 변경 없는 재주문과 다른 계획이 필요할 수 있습니다.", "상품을 보기 전에 샘플 기준을 정하고 SKU, 중량, 로트, 박스 또는 출하 단위 중 어디에 적용하는지 적습니다. 중량, 외관, 치수와 포장은 각각 다른 범위를 가질 수 있습니다."],
  pairing: ["개별 기준을 통과한 두 원판도 허용 범위 양 끝에 있을 수 있습니다. 좌우 균형 페어가 필요하면 두 제품 사이 최대 차이를 별도로 지정하고 포장과 입고까지 페어 ID를 유지합니다.", "페어 매칭은 일부 프리미엄 세트나 고정 페어 운영 시설에 적합합니다. 규칙, 식별 방식과 포장 계획 없이 모든 도매 주문에 약속해서는 안 됩니다."],
  dimensions: ["중량 합격은 중앙 홀, 외경, 두께, 평탄도와 인서트 정렬을 증명하지 않습니다. 저울 기준을 통과해도 선택한 바에 잘 끼워지지 않거나 슬리브 공간을 지나치게 차지할 수 있습니다.", "치수는 도면에 유지하고 적절한 측정기나 확인된 바 인터페이스로 검사합니다. 범퍼 외형, 주철 프로파일과 그립 홀은 독립 요구사항입니다."],
  materials: ["주물, 스틸 코어, 고무, 우레탄, 허브, 인서트, 도장과 표시는 최종 질량에 서로 다르게 기여합니다. 추가 공정을 앞둔 코어가 아니라 완성 조립품을 관리해야 합니다.", "소재, 금형, 인서트 또는 마감이 바뀌면 기존 관리 경로를 다시 확인합니다. 모델, 범위와 증빙 없이 고정밀 같은 모호한 표현은 피합니다."],
  oem: ["양각 로고, 인쇄, 색상, 허브, kg/lb 표시와 자체 브랜드 박스는 하나의 승인 버전에 속합니다. 금형이나 인서트를 바꾸는 ODM은 새로운 기술 검토가 필요합니다.", "PowerBaseFit은 제품군과 용도가 정해진 뒤 OEM, ODM 가능성, 커스텀 로고, 자체 브랜드 포장과 대량 공급을 검토합니다. 최소 수량, 금형과 일정은 모델별 견적에서 확인합니다."],
  sample: ["샘플은 양산 예정 소재, 인서트, 마감, 표시와 포장 경로를 대표해야 합니다. 실측값을 도면과 아트워크 개정에 연결하고 사진은 외관 확인용으로만 사용합니다.", "양산이 승인 버전과 다르면 다시 구매자 승인을 받습니다. 한 중량, 금형 또는 소재의 결과를 다른 버전에 자동 적용하지 않습니다."],
  shipment: ["발주서에 검사 주체, 시점, 제출 기록과 출하 승인 권한을 적습니다. 범위를 벗어난 제품은 식별하고 격리하며 여러 원판 평균으로 개별 실패를 숨기지 않습니다.", "수량, 표시, 표면, 인서트 핏, 박스와 팔레트도 확인합니다. 페어 및 SKU 라벨과 추적 정보가 운송 뒤에도 유지되어야 합니다."],
  rfq: ["모든 공급사에 같은 요청서를 보냅니다. 제품군, 소재, 용도, 중량과 단위, 공차 문장, 페어, 치수, 로고, 색상, 포장, 검사, 목적지와 제출 기록을 포함합니다.", "필수 기준, 선호사항과 미결 질문을 나눕니다. [고무 범퍼 플레이트 확인](/ko/products/weight-plates/rubber-bumper-plate), [주철 원판 비교](/ko/products/weight-plates/cast-iron-weight-plate) 후 선택한 중량 구성을 공장 검토로 보내세요."],
  faq: [["원판 중량 공차란 무엇인가요?", "표시 공칭 중량과 합의한 방법으로 얻은 실측 중량 사이에서 허용되는 차이입니다."], ["백분율과 g 중 무엇이 좋나요?", "둘 다 가능하지만 발주서에 우선 표현과 단위를 명확히 정해야 합니다."], ["모든 상업용 센터에 캘리브레이티드 원판이 필요한가요?", "아닙니다. 경기 기준을 자동 복사하지 말고 시설 용도에 맞춰 제품과 범위를 선택합니다."], ["모든 원판을 측정해야 하나요?", "위험과 계약에 따른 결정입니다. 생산 전에 전수 검사 또는 샘플 계획을 정합니다."], ["페어 기준이 왜 별도인가요?", "개별 합격품도 서로 차이가 날 수 있어 페어 기준이 두 제품 사이 차이를 제한합니다."], ["로고가 최종 버전에 영향을 주나요?", "양각, 인서트, 마감과 표시는 완성 구성이므로 같은 버전으로 승인합니다."], ["중량 합격이면 품질 전체가 합격인가요?", "아닙니다. 핏, 외경, 두께, 인서트, 표면, 표시와 포장은 별도 기준이 필요합니다."], ["대량 RFQ에는 무엇을 넣나요?", "제품군, 중량 구성, 용도, 공차, 방법, 샘플, 치수, 브랜드, 포장, 목적지와 기록을 넣습니다."]],
  linkLabels: ["상업용 웨이트 원판 보기", "범퍼 플레이트 보기", "주철 원판 보기", "공장 역량 보기", "프로젝트 견적 요청"],
  imageCopy: [["브랜드 없는 올림픽 원판과 빈 화면 저울 및 캘리퍼", "중량과 치수 관리를 설명하기 위한 연출 이미지."], ["화면이 꺼진 저울 위의 검은 올림픽 원판", "입고 판단 전에 측정 방법부터 합의합니다."], ["원판 중앙 인서트에 놓인 캘리퍼", "중앙 홀과 핏은 중량과 별도로 검사합니다."], ["페어 비교를 위해 놓인 브랜드 없는 원판 두 장", "페어 차이에 독립 한계를 둘 수 있습니다."], ["중립 사양 자료와 그립 및 범퍼 원판", "샘플은 구조, 브랜드와 포장을 한 승인 버전에 연결합니다."]],
  cta: ["원판 합격 기준을 정리하세요", "제품군, 중량 구성, 시장, 로고, 포장과 검사 요구를 보내 모델별 검토를 받으세요.", "공장 견적 요청"]
};

const indonesian: GuideCopy = {
  locale: "id",
  path: "/id/blog/toleransi-berat-piring-beban-grosir",
  title: "Toleransi Berat Piring Beban untuk Pesanan Grosir | PowerBaseFit",
  description: "Tentukan toleransi, metode timbang, sampling, selisih pasangan, dimensi, logo kustom, dan pasokan OEM piring beban secara terukur.",
  h1: "Cara Menentukan Toleransi Berat Piring Beban pada Pesanan Grosir",
  primaryKeyword: "toleransi berat piring beban grosir",
  secondaryKeywords: ["akurasi piring beban", "piring beban komersial", "produsen piring beban", "piring beban logo kustom", "piring beban OEM", "merek privat alat fitness", "piring beban grosir"],
  intent: "spesifikasi dan penerimaan lot piring beban komersial",
  targetBuyer: "distributor, importir, merek privat, dan tim pengadaan gym",
  home: "Beranda", library: "Panduan", eyebrow: "PowerBaseFit · Panduan pabrik piring beban", contactPath: "/id/kontak",
  headings: { answer: "Jawaban singkat", definition: "Arti toleransi berat yang sebenarnya", specify: "Tulis klausul yang dapat diperiksa", table: "Tabel penerimaan untuk pembeli", record: "Data yang harus masuk laporan", method: "Tetapkan metode timbang yang berulang", sampling: "Pilih cakupan inspeksi sebelum produksi", pairing: "Pisahkan aturan pencocokan pasangan", dimensions: "Berat tidak menggantikan pemeriksaan dimensi", materials: "Konstruksi menentukan rencana kontrol", oem: "Dampak OEM, ODM, logo, dan merek privat", sample: "Setujui sampel setara produksi", shipment: "Hubungkan inspeksi dengan pesanan pembelian", rfq: "Data untuk permintaan penawaran ke pabrik" },
  answer: ["Toleransi yang berguna adalah rentang penerimaan tertulis untuk model dan berat nominal tertentu. Dokumen menyebut persentase, massa absolut atau keduanya, unit pengendali, metode timbang, cakupan inspeksi, dan keputusan bila hasil keluar dari rentang.", "Tidak ada satu angka universal yang jujur untuk piring besi cor, berlapis, bumper, dan calibrated. Pembeli mulai dari penggunaan lalu meminta konfirmasi per model. Sebagai pabrik, PowerBaseFit dapat meninjau susunan berat, konstruksi, logo, kemasan, dan inspeksi untuk proyek OEM atau merek privat."],
  definition: ["Berat nominal adalah angka pada piring; berat aktual adalah hasil metode yang disepakati. Toleransi merupakan selisih yang diizinkan, bukan janji bahwa setiap unit tepat sama dengan angka nominal.", "Resolusi, pengulangan pembacaan, status pemeriksaan timbangan, dan sampling adalah hal berbeda. Banyak digit tidak membuktikan hasil andal, dan satu sampel lulus tidak otomatis mewakili seluruh pengiriman."],
  specification: [["Nyatakan perhitungan", "Untuk persentase, catat nominal, aktual, dan deviasi bertanda. Untuk batas massa, tentukan unit yang berlaku. Pemasok dan pemeriksa harus memakai rumus yang sama."], ["Nyatakan metode", "Tuliskan kapasitas dan resolusi timbangan, pemeriksaan referensi, permukaan, pelepasan kemasan, stabilisasi, dan pengulangan. Pemeriksaan internal bukan otomatis kalibrasi tertelusur."], ["Nyatakan keputusan", "Tentukan sampel, aturan pasangan, laporan, dan penanganan kegagalan; hubungkan ke model, denominasi, dan revisi pesanan. [Bandingkan lini piring beban](/id/produk/piring-beban)."]],
  tableColumns: ["Titik kontrol", "Yang ditetapkan pembeli", "Bukti disimpan"],
  tableRows: [["Identitas", "Model, bahan, berat, revisi", "Gambar, SKU, sampel"], ["Nominal", "Nilai kg atau lb pada piring", "Rancangan grafis dan spesifikasi"], ["Deviasi", "Persentase, massa, atau keduanya", "Klausul pesanan"], ["Timbangan", "Kapasitas, resolusi, status", "ID dan catatan cek"], ["Prosedur", "Tanpa kemasan, permukaan, pengulangan", "Instruksi dan lembar hasil"], ["Cakupan", "Semua unit atau sampel disepakati", "Rencana dan ID"], ["Pasangan", "Selisih maksimum dua unit", "ID pasangan dan nilai"], ["Tindakan", "Timbang ulang, pisahkan, koreksi, tolak", "Laporan ketidaksesuaian"]],
  checklist: ["Tanggal, nomor pesanan, SKU, dan berat", "Berat nominal dan unit", "Berat aktual dan resolusi", "Deviasi bertanda dan batas", "ID timbangan dan status referensi", "Pihak yang memeriksa", "ID unit, pasangan, karton, atau sampel", "Catatan kondisi pengukuran", "Lulus, ulang, atau pisahkan", "Foto hanya konteks, bukan nilai"],
  method: ["Gunakan timbangan yang menampung piring terberat dan memiliki resolusi sesuai rentang. Letakkan stabil dan rata, konfirmasi status dengan prosedur referensi yang dipilih, lalu timbang tanpa kemasan dalam unit kontrak.", "Bila angka bergerak, ikuti aturan pengulangan tertulis dan jangan memilih nilai paling menguntungkan. Catat pembacaan dan resolusi. Pemeriksaan gudang mendukung penerimaan, tetapi bukan kalibrasi laboratorium."],
  sampling: ["Risiko, kematangan proses, ukuran pesanan, dan biaya kesalahan menentukan cakupan. Pesanan pertama, cetakan, bahan, sisipan, atau logo baru mungkin memerlukan rencana berbeda dari pesanan ulang tanpa perubahan.", "Tentukan sampling sebelum melihat barang dan sebutkan apakah berlaku per SKU, berat, lot, karton, atau pengiriman. Massa, tampilan, dimensi, dan kemasan dapat memiliki cakupan berbeda."],
  pairing: ["Dua piring yang lulus sendiri dapat berada di dua ujung rentang. Jika pasangan seimbang diperlukan, tambahkan selisih maksimum dan pertahankan ID pasangan selama pengemasan dan penerimaan.", "Pencocokan pasangan sesuai untuk set premium tertentu atau pasangan tetap di gym, namun membutuhkan aturan, label, dan rencana kemasan."],
  dimensions: ["Berat yang lulus tidak membuktikan lubang tengah, diameter luar, ketebalan, kerataan, atau posisi sisipan. Piring dapat lulus timbangan tetapi tidak pas pada batang atau memakan selongsong terlalu panjang.", "Simpan dimensi di gambar teknik dan periksa dengan alat sesuai atau batang pembanding yang dikonfirmasi. Geometri bumper, profil besi cor, dan lubang pegangan merupakan kriteria terpisah."],
  materials: ["Besi cor, inti baja, karet, poliuretana, naf, sisipan, cat, dan penandaan memberi kontribusi massa berbeda. Kontrol dilakukan pada piring jadi dan terakit, bukan hanya inti yang masih diproses.", "Saat bahan, cetakan, sisipan, atau hasil akhir berubah, konfirmasi kembali jalur kontrol. Hindari istilah presisi tinggi tanpa model, batas, dan bukti."],
  oem: ["Logo timbul atau cetak, warna, desain naf, penandaan kg/lb, dan karton merek privat masuk satu versi yang disetujui. Perubahan ODM pada cetakan atau sisipan memerlukan kajian teknis baru.", "PowerBaseFit dapat membahas OEM, kelayakan ODM, logo kustom, kemasan merek privat, dan pasokan grosir setelah lini dan penggunaan diketahui. MOQ, perkakas, dan jadwal dikonfirmasi per model dalam penawaran."],
  sample: ["Sampel harus mewakili bahan, sisipan, hasil akhir, penandaan, dan rute pengemasan produksi. Simpan nilai ukur bersama gambar teknik dan revisi rancangan grafis; foto menegaskan tampilan, bukan mengganti data.", "Perbedaan produksi kembali ke persetujuan. Jangan memindahkan hasil satu berat, cetakan, atau bahan ke varian lain tanpa pemeriksaan."],
  shipment: ["Pesanan pembelian menyebut pihak inspeksi, waktu, dokumen, dan wewenang pelepasan. Unit di luar batas diidentifikasi dan dipisahkan; rata-rata beberapa piring tidak boleh menutupi kegagalan unit.", "Periksa juga jumlah, penandaan, permukaan, kecocokan sisipan, karton, dan palet. Label pasangan dan SKU harus bertahan selama pengiriman."],
  rfq: ["Kirim ringkasan yang sama: lini, bahan, penggunaan, berat dan unit, toleransi, pasangan, dimensi, logo, warna, kemasan, inspeksi, tujuan, dan laporan.", "Pisahkan syarat wajib, preferensi, dan pertanyaan. [Lihat bumper plate karet](/id/produk/piring-beban/bumper-plate-karet), [bandingkan piring besi cor](/id/produk/piring-beban/piring-beban-besi-cor), lalu kirim susunan berat untuk peninjauan pabrik."],
  faq: [["Apa itu toleransi berat piring beban?", "Selisih yang diizinkan antara berat nominal dan hasil metode timbang yang disepakati."], ["Persentase atau gram?", "Keduanya bisa, tetapi pesanan harus menyebut bentuk dan unit yang menjadi acuan."], ["Apakah semua gym perlu calibrated plate?", "Tidak. Pilih tipe dan rentang dari penggunaan, bukan otomatis menyalin aturan kompetisi."], ["Haruskah setiap piring ditimbang?", "Itu keputusan risiko dan kontrak. Tetapkan inspeksi penuh atau sampling sebelum produksi."], ["Mengapa perlu aturan pasangan?", "Dua unit lulus dapat berbeda; aturan pasangan membatasi selisih tersebut."], ["Bisakah logo mengubah versi akhir?", "Logo timbul, sisipan, hasil akhir, dan penandaan merupakan bagian konfigurasi jadi dan disetujui bersama."], ["Apakah berat lulus membuktikan semua kualitas?", "Tidak. Kecocokan, diameter, ketebalan, sisipan, permukaan, penandaan, dan kemasan punya kriteria sendiri."], ["Apa isi RFQ grosir?", "Lini, rentang, penggunaan, toleransi, metode, sampling, dimensi, merek, kemasan, tujuan, dan laporan."]],
  linkLabels: ["Lihat piring beban komersial", "Lihat bumper plate", "Lihat piring besi cor", "Kenali pabrik", "Kirim RFQ proyek"],
  imageCopy: [["Piring olimpik tanpa merek di samping timbangan dan kaliper", "Susunan ilustratif untuk kontrol massa dan dimensi."], ["Piring olimpik hitam di atas timbangan dengan layar mati", "Metode ditetapkan sebelum angka dipakai untuk penerimaan."], ["Kaliper pada insert tengah piring beban", "Lubang dan fit diperiksa terpisah dari massa."], ["Dua piring tanpa merek untuk membandingkan pasangan", "Selisih pasangan dapat memiliki batas sendiri."], ["Piring grip dan bumper bersama materi spesifikasi netral", "Sampel menghubungkan konstruksi, merek, dan kemasan ke satu versi."]],
  cta: ["Tetapkan rencana penerimaan piring beban", "Kirim lini, susunan berat, pasar, logo, kemasan, dan inspeksi untuk peninjauan per model.", "Minta penawaran pabrik"]
};

const polish: GuideCopy = {
  locale: "pl",
  path: "/pl/blog/tolerancja-masy-talerzy-zamowienie-hurtowe",
  title: "Tolerancja Masy Talerzy w Zamówieniu Hurtowym | PowerBaseFit",
  description: "Ustal tolerancję, metodę ważenia, próbę, dobieranie par, wymiary, własne logo i dostawy OEM talerzy do siłowni w sposób kontrolowalny.",
  h1: "Jak Określić Tolerancję Masy Talerzy w Zamówieniu Hurtowym",
  primaryKeyword: "tolerancja masy talerzy zamówienie hurtowe",
  secondaryKeywords: ["dokładność talerzy", "obciążenia komercyjne", "producent talerzy", "talerze z logo", "talerze OEM", "marka własna fitness", "obciążenia hurt"],
  intent: "specyfikacja i odbiór partii obciążeń komercyjnych",
  targetBuyer: "dystrybutorzy, importerzy, marki własne i działy zakupów siłowni",
  home: "Strona główna", library: "Poradniki", eyebrow: "PowerBaseFit · Fabryczny poradnik o talerzach", contactPath: "/pl/kontakt",
  headings: { answer: "Krótka odpowiedź", definition: "Co naprawdę oznacza tolerancja masy", specify: "Zapisz kryterium możliwe do sprawdzenia", table: "Tabela odbioru dla kupującego", record: "Dane wymagane w protokole", method: "Ustal powtarzalną metodę ważenia", sampling: "Zakres kontroli ustal przed produkcją", pairing: "Dobieranie par potraktuj oddzielnie", dimensions: "Masa nie zastępuje kontroli wymiarów", materials: "Konstrukcja zmienia plan kontroli", oem: "Wpływ OEM, ODM, logo i marki własnej", sample: "Zatwierdź próbkę zgodną z produkcją", shipment: "Połącz kontrolę wysyłki z zamówieniem", rfq: "Dane do zapytania wysyłanego fabryce" },
  answer: ["Użyteczna tolerancja to pisemny zakres odbioru dla wskazanego modelu i masy nominalnej. Zapis określa procent, masę bezwzględną lub oba sposoby, jednostkę nadrzędną, metodę ważenia, zakres kontroli oraz decyzję po przekroczeniu granicy.", "Nie istnieje jedna uczciwa liczba dla talerzy żeliwnych, powlekanych, bumper i kalibrowanych. Kupujący wychodzi od zastosowania i potwierdza wymaganie dla modelu. PowerBaseFit może jako fabryka ocenić zakres mas, konstrukcję, logo, opakowanie i kontrolę projektu OEM lub marki własnej."],
  definition: ["Masa nominalna jest wartością oznaczoną na talerzu, a masa zmierzona wynikiem uzgodnionej metody. Tolerancja to dozwolona różnica, nie obietnica idealnej zgodności każdej sztuki.", "Rozdzielczość, powtarzalność, stan sprawdzenia wagi i próbkowanie są odrębnymi zagadnieniami. Duża liczba cyfr nie dowodzi wiarygodności, a pozytywna próbka nie opisuje automatycznie całej wysyłki."],
  specification: [["Nazwij obliczenie", "Przy procencie zapisz masę nominalną, zmierzoną i odchylenie ze znakiem. Przy granicy bezwzględnej podaj jednostkę. Dostawca i inspektor stosują tę samą formułę."], ["Nazwij metodę", "Określ udźwig i rozdzielczość wagi, sprawdzenie odniesienia, podłoże, usunięcie opakowania, stabilizację i powtórzenia. Kontrola wewnętrzna nie jest automatycznie wzorcowaniem z zachowaniem spójności."], ["Nazwij regułę decyzji", "Ustal próbę, kryterium pary, raport i postępowanie z wynikiem poza granicą. Połącz je z modelem, nominałem i rewizją zamówienia. [Porównaj gamę obciążeń](/pl/produkty/obciazenia)."]],
  tableColumns: ["Punkt", "Ustalenie kupującego", "Zachowany dowód"],
  tableRows: [["Identyfikacja", "Model, materiał, nominał, rewizja", "Rysunek, SKU, próbka"], ["Masa nominalna", "Oznaczenie kg lub lb", "Grafika i karta"], ["Odchylenie", "Procent, masa lub oba", "Klauzula zamówienia"], ["Waga", "Udźwig, rozdzielczość, stan", "ID i zapis sprawdzenia"], ["Procedura", "Bez opakowania, podłoże, powtórzenie", "Instrukcja i wyniki"], ["Zakres", "Wszystkie sztuki lub uzgodniona próba", "Plan i ID"], ["Para", "Maksymalna różnica partnerów", "ID pary i odczyty"], ["Działanie", "Powtórzyć, odseparować, poprawić, odrzucić", "Raport niezgodności"]],
  checklist: ["Data, zamówienie, SKU i nominał", "Masa nominalna i jednostka", "Masa zmierzona i rozdzielczość", "Odchylenie ze znakiem i limit", "ID wagi i stan odniesienia", "Inspektor", "ID sztuki, pary, kartonu lub próbki", "Istotne warunki pomiaru", "Przyjąć, powtórzyć lub odseparować", "Zdjęcie jako kontekst, nie wynik"],
  method: ["Waga obejmuje najcięższy talerz i ma rozdzielczość odpowiednią do zakresu. Stoi stabilnie i poziomo, a jej stan jest potwierdzony wybraną procedurą odniesienia. Ważymy bez opakowania w jednostce umowy.", "Przy zmiennym odczycie stosujemy zapisaną regułę powtórzeń, zamiast wybierać korzystną wartość. Zapisujemy odczyty i rozdzielczość. Kontrola magazynowa wspiera odbiór, ale nie jest wzorcowaniem laboratoryjnym."],
  sampling: ["Ryzyko, dojrzałość procesu, wielkość zamówienia i koszt błędu określają zakres. Pierwsze zamówienie, nowa forma, materiał, tuleja lub logo mogą wymagać innego planu niż niezmienione ponowne zamówienie.", "Próbę ustala się przed oględzinami i odnosi do SKU, nominału, partii, kartonu lub wysyłki. Masa, wygląd, wymiar i pakowanie mogą mieć różne zakresy."],
  pairing: ["Dwa talerze zgodne indywidualnie mogą leżeć na przeciwnych końcach zakresu. Gdy liczą się wyrównane pary, dodaj maksymalną różnicę i zachowaj identyfikację pary w pakowaniu oraz odbiorze.", "Dobieranie par ma sens w wybranych zestawach premium lub stałych parach klubowych, ale wymaga reguły, etykiety i planu pakowania."],
  dimensions: ["Zgodna masa nie potwierdza otworu, średnicy zewnętrznej, grubości, płaskości ani ustawienia tulei. Talerz może przejść ważenie i źle pasować do sztangi.", "Wymiary pozostają na rysunku i są sprawdzane właściwym przyrządem lub potwierdzonym interfejsem sztangi. Geometria bumper, profil odlewu i uchwyty są osobnymi kryteriami."],
  materials: ["Odlew, rdzeń stalowy, guma, uretan, piasta, tuleja, farba i oznaczenie w różny sposób tworzą masę końcową. Kontrolujemy gotowy zmontowany talerz, nie tylko półprodukt.", "Po zmianie materiału, formy, tulei lub wykończenia ponownie potwierdź plan. Unikaj niejasnych deklaracji precyzji bez modelu, granicy i dowodu."],
  oem: ["Logo wypukłe, nadruk, kolor, piasta, oznaczenie kg/lb i karton marki własnej należą do jednej zatwierdzonej wersji. Zmiana ODM formy lub tulei wymaga nowej oceny technicznej.", "PowerBaseFit może omówić OEM, wykonalność ODM, własne logo, opakowanie marki i dostawę hurtową po poznaniu rodziny oraz zastosowania. Minimum, narzędzia i termin potwierdza oferta dla modelu."],
  sample: ["Próbka reprezentuje materiał, tuleję, wykończenie, oznaczenie i drogę pakowania produkcji. Wyniki przechowujemy z rysunkiem i wersją grafiki; zdjęcie potwierdza wygląd, nie zastępuje danych.", "Różnica produkcyjna wraca do zatwierdzenia. Wyniku jednego nominału, formy lub materiału nie przenosimy automatycznie na inny."],
  shipment: ["Zamówienie wskazuje kontrolera, termin, raporty i uprawnienie do zwolnienia. Sztuki poza granicą są oznaczone i odseparowane; średnia nie może ukryć pojedynczej niezgodności.", "Sprawdź też ilość, oznaczenie, powierzchnię, pasowanie tulei, kartony i paletę. Etykiety par i SKU muszą przetrwać transport."],
  rfq: ["Wyślij ten sam pakiet: rodzina, materiał, użycie, nominały i jednostka, tolerancja, pary, wymiary, logo, kolor, opakowanie, kontrola, cel i raporty.", "Oddziel wymagania, preferencje i pytania. [Zobacz gumowy bumper](/pl/produkty/obciazenia/gumowy-talerz-bumper), [porównaj talerz żeliwny](/pl/produkty/obciazenia/obciazenie-zeliwne) i prześlij zakres do oceny fabryki."],
  faq: [["Czym jest tolerancja masy talerza?", "Dozwoloną różnicą między oznaczoną masą nominalną a wynikiem uzgodnionej metody."], ["Procent czy gramy?", "Oba zapisy są możliwe, ale zamówienie musi wskazać nadrzędny sposób i jednostkę."], ["Czy każda siłownia potrzebuje talerzy kalibrowanych?", "Nie. Typ i zakres dobiera się do użycia, bez automatycznego kopiowania zasad zawodów."], ["Czy trzeba ważyć każdą sztukę?", "To decyzja ryzyka i umowy. Pełną kontrolę lub próbę ustala się przed produkcją."], ["Dlaczego osobna reguła pary?", "Dwie zgodne sztuki mogą się różnić; reguła ogranicza różnicę partnerów."], ["Czy logo może zmienić wersję końcową?", "Relief, tuleja, wykończenie i oznaczenie są częścią gotowej konfiguracji i zatwierdza się je razem."], ["Czy zgodna masa dowodzi całej jakości?", "Nie. Pasowanie, średnica, grubość, tuleja, powierzchnia, oznaczenie i opakowanie mają własne kryteria."], ["Co zawiera zapytanie hurtowe?", "Rodzinę, zakres, użycie, tolerancję, metodę, próbę, wymiary, markę, opakowanie, cel i raporty."]],
  linkLabels: ["Zobacz obciążenia komercyjne", "Zobacz talerze bumper", "Zobacz talerze żeliwne", "Poznaj fabrykę", "Wyślij zapytanie"],
  imageCopy: [["Niemarkowane talerze olimpijskie obok wagi i suwmiarki", "Ilustracyjny układ do omawiania masy i wymiarów."], ["Czarny talerz olimpijski na wadze z wygaszonym ekranem", "Metodę ustala się przed wykorzystaniem odczytu do odbioru."], ["Suwmiarka przy centralnej tulei talerza", "Otwór i pasowanie kontroluje się oddzielnie od masy."], ["Dwa niemarkowane talerze do porównania pary", "Różnica pary może mieć własną granicę."], ["Talerz z uchwytami i bumper z neutralnymi materiałami", "Próbka łączy konstrukcję, markę i opakowanie z jedną wersją."]],
  cta: ["Ustal plan odbioru obciążeń", "Prześlij rodzinę, zakres mas, rynek, logo, opakowanie i kontrolę do oceny modelu.", "Poproś o ofertę fabryki"]
};

const copies: GuideCopy[] = [english, portuguese, spanish, german, french, vietnamese, swedish, italian, dutch, arabic, korean, indonesian, polish];

const defaultTargets = [
  "weight-plates-category",
  "rubber-bumper-plate",
  "cast-iron-weight-plate",
  "factory",
  "contact"
];

function authorFor(copy: GuideCopy): [LocalizedAuthor, LocalizedAuthor] {
  return [
    { id: `powerbasefit-plate-team-${copy.locale}`, name: "PowerBaseFit", kind: "Organization", role: copy.eyebrow.replace(/^PowerBaseFit · /u, "") },
    { id: `powerbasefit-quality-team-${copy.locale}`, name: "PowerBaseFit", kind: "Organization", role: copy.headings.shipment }
  ];
}

function imagesFor(copy: GuideCopy): LocalizedImage[] {
  return imageFiles.map(([src, width, height], index) => ({
    id: `weight-plate-tolerance-image-${index + 1}`,
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
  const specificationMarkdown = copy.specification.map(([heading, text]) => `### ${heading}\n\n${text}`).join("\n\n");
  return [
    rich("quick-answer", copy.headings.answer, copy.answer, "quick-answer"),
    rich("tolerance-definition", copy.headings.definition, copy.definition, "definition"),
    { id: "write-inspectable-clause", type: "custom", heading: copy.headings.specify, data: { component: "markdown-section", markdown: specificationMarkdown } },
    { id: "buyer-acceptance-table", type: "specifications", heading: copy.headings.table, data: { columns: copy.tableColumns, rows: copy.tableRows } },
    { id: "inspection-record-fields", type: "features", heading: copy.headings.record, data: { items: copy.checklist } },
    rich("repeatable-weighing-method", copy.headings.method, copy.method),
    rich("inspection-scope", copy.headings.sampling, copy.sampling),
    rich("pair-matching", copy.headings.pairing, copy.pairing),
    rich("dimensional-checks", copy.headings.dimensions, copy.dimensions),
    rich("construction-control-plan", copy.headings.materials, copy.materials),
    rich("oem-private-label", copy.headings.oem, copy.oem),
    rich("sample-approval", copy.headings.sample, copy.sample),
    rich("shipment-inspection", copy.headings.shipment, copy.shipment),
    { id: "rfq-handoff", type: "custom", heading: copy.headings.rfq, data: { component: "markdown-section", markdown: copy.rfq.join("\n\n") } }
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
    `## ${english.headings.definition}\n\n${english.definition.join("\n\n")}`,
    `## ${english.headings.specify}\n\n${english.specification.map(([heading, text]) => `### ${heading}\n\n${text}`).join("\n\n")}`,
    `## ${english.headings.table}\n\n${table}`,
    `## ${english.headings.record}\n\n${english.checklist.map((item) => `- ${item}`).join("\n")}`,
    `## ${english.headings.method}\n\n${english.method.join("\n\n")}`,
    `## ${english.headings.sampling}\n\n${english.sampling.join("\n\n")}`,
    `## ${english.headings.pairing}\n\n${english.pairing.join("\n\n")}`,
    `## ${english.headings.dimensions}\n\n${english.dimensions.join("\n\n")}`,
    `## ${english.headings.materials}\n\n${english.materials.join("\n\n")}`,
    `## ${english.headings.oem}\n\n${english.oem.join("\n\n")}`,
    `## ${english.headings.sample}\n\n${english.sample.join("\n\n")}`,
    `## ${english.headings.shipment}\n\n${english.shipment.join("\n\n")}`,
    `## ${english.headings.rfq}\n\n${english.rfq.join("\n\n")}`,
    `## Frequently Asked Questions\n\n${faq}`,
    `## ${english.cta[0]}\n\n${english.cta[1]} [${english.cta[2]}](/contact).`
  ].join("\n\n");
}

export const weightPlateToleranceEnglishPost = {
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

export function withWeightPlateToleranceGuide(manifest: ContentManifest): ContentManifest {
  if (manifest.entities.some((entity) => entity.id === entityId)) throw new Error(`Duplicate content entity: ${entityId}`);
  const entity: ContentEntity = {
    id: entityId,
    type: "blog",
    defaultLocale: "en",
    versions: Object.fromEntries(copies.map((copy) => [copy.locale, versionFor(copy)])) as ContentEntity["versions"]
  };
  return { ...manifest, entities: [...manifest.entities, entity] };
}
