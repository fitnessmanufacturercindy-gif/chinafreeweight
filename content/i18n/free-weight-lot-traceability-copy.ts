import type { FreeWeightLotTraceabilityCopy } from "./free-weight-lot-traceability-guide";

export const freeWeightLotTraceabilityCopies: FreeWeightLotTraceabilityCopy[] = [
  {
    locale: "en",
    path: "/resources/free-weight-lot-batch-traceability-guide",
    title: "Free-Weight Lot Traceability: Batch and Serial Number Guide",
    description: "Build lot traceability for OEM dumbbells, plates, bars and cable handles by linking product identity, materials, inspections, cartons and shipments.",
    h1: "How to Build Lot Traceability for OEM Free Weights",
    keyword: "free weight lot traceability",
    home: "Home",
    library: "Resources",
    eyebrow: "Traceability guide for importers, distributors, private-label brands and procurement teams",
    sections: [
      {
        heading: "Quick answer: a lot code is useful only when it retrieves a complete record",
        text: `Lot traceability means that a buyer can start with a dumbbell, weight plate, Olympic bar, cable handle or carton and retrieve the product revision, production group, relevant material or component lots, inspection evidence, packing identity and shipment destination. The reverse path must also work: starting from a suspect material or production lot, the factory and buyer should be able to identify every affected finished lot, carton and dispatch record.

A printed code by itself is only an identifier. It becomes traceability when the same code is preserved across the production order, quality record, packaging label, packing list and receiving system. Before an OEM order is released, define what creates a new lot, where the code appears, who records splits or merges, how long records are kept and which event the buyer can use to test retrieval.`,
      },
      {
        heading: "Separate SKU, revision, batch, serial and logistics identity",
        text: `An SKU identifies a product configuration such as a 20 kg black bumper plate. A revision identifies the controlled drawing, material, logo or packaging version. A batch or lot groups units that share defined production conditions. A serial number distinguishes one unit. A carton or pallet identifier groups goods for handling and shipment. These fields answer different questions and should not be substituted for one another.

The [GS1 General Specifications](https://ref.gs1.org/standards/genspecs/24.0.0/) use identifier (10) for a batch or lot number and identifier (21) for a serial number. GS1 also explains that a batch number is an attribute of a trade item, so it should be interpreted with the product identifier rather than alone. A buyer does not have to use GS1, but the same discipline applies: a short lot code must point to an unambiguous SKU and revision in the record system.`,
      },
      {
        heading: "Choose the traceability depth by product risk and decision",
        text: `Batch-level control is often practical for fixed dumbbells, plates and simpler cable attachments when units made under the same defined conditions can share one record. Individual serialization may be justified for serviceable bars, adjustable mechanisms or higher-value assemblies when a claim must identify one unit. More detail is not automatically better: per-unit records add marking, scanning, storage and reconciliation work.

Write the decision first. If the goal is to isolate a coating problem, the finished lot must link to coating material and process evidence. If the concern is a loose insert, it may need the insert lot, molding or assembly period and inspection result. If the goal is retail registration, the identifier must survive unpacking and remain readable. Do not promise raw-material genealogy for every component unless the factory can preserve that chain.`,
      },
      {
        heading: "Define the events that open, split, combine or close a lot",
        text: `A useful rule states when a new finished lot is created. Examples may include a change of product revision, material lot, finish system, mold or tool, approved deviation, production site or defined production period. The correct rule depends on construction and risk; a calendar date alone can be too broad or too narrow. Record planned rework and sorting without erasing the original identity.

Mixed-SKU Bulk Supply orders need extra care. A pallet may contain several product lots, and one product lot may be divided across cartons or shipments. The carton label and packing list should preserve that relationship instead of replacing it with only a pallet number. When cartons are repacked at a distributor warehouse, the new internal label should retain the original factory lot and show the repack event.`,
      },
      {
        heading: "Connect manufacturing and inspection evidence to the finished lot",
        text: `The lot record should name the product code and revision, production order, quantity made and released, important material or component identifiers, relevant process period, inspection plan and disposition. For free weights, the useful fields vary by design: handle or insert revision, bar shaft and sleeve group, rubber or urethane compound batch, finish lot, logo artwork revision, packaging version and authorized deviation may matter.

Inspection evidence must identify the units or lot it represents. A generic report with no SKU, revision or lot link cannot support a later investigation. The same applies to photos: preserve the order, lot, sample identity and date rather than keeping anonymous close-ups. The [GS1 Global Traceability Standard](https://ref.gs1.org/standards/global-traceability/) frames traceability around identifiable objects, parties, locations and events; buyers can apply that logic without purchasing a complex platform.`,
      },
      {
        heading: "Verify the chain with a two-direction trace exercise",
        text: `Select one finished carton and ask the supplier to trace backward to its SKU revision, finished lot, production order, important inputs, inspection decision and packaging record. Then select one material or component lot and trace forward to every finished lot, carton, stock location and shipment that used it. Reconcile quantities so unexplained loss, rework or mixed stock becomes visible.

For consumer products placed on the EU market, the [European Commission's GPSR business guidance](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:52025XC06233) explains the role of a type, batch or serial number or another identifying element. Market obligations vary, so importers should confirm the applicable marking, language and record duties for the destination. A trace exercise tests retrieval; it does not by itself prove product conformity or legal compliance.`,
      },
      {
        heading: "Put the factory and buyer responsibilities into the purchase file",
        text: `ChinaFreeWeight is a factory supporting OEM, ODM, Custom Logo, Private Label and Bulk Supply programs for dumbbells, weight plates, Olympic bars and cable attachments. We can review a project-specific identity plan that connects the confirmed product revision, production lot, inspection evidence and export packaging. The available depth depends on the actual construction, marking method, supply chain and buyer requirement.

The RFQ should state target market, models, weight range, unit or pair definition, requested lot depth, label location, code format, records to retain, shipment fields and retrieval test. Ask the buyer's compliance, quality and warehouse teams to approve the plan before artwork and cartons are released. A practical system is one that both sides can maintain during production, receiving, claims and reorders—not a code that looks sophisticated but cannot be followed.`,
      },
    ],
    table: {
      heading: "Identifier decision matrix for a free-weight order",
      columns: ["Identifier", "What it distinguishes", "Useful link", "Common failure"],
      rows: [
        ["SKU + revision", "One controlled product configuration", "Drawing, BOM, artwork and pack", "Same SKU used after an unrecorded change"],
        ["Batch or lot", "A defined production group", "Inputs, process period and inspection", "Code exists but group boundary is undefined"],
        ["Serial number", "One individual unit", "Service and unit history", "Serial stored without its batch or model"],
        ["Carton or pallet ID", "A logistics handling unit", "Contained SKUs, lots and quantities", "Pallet ID replaces original product lots"],
        ["Shipment reference", "One dispatch event", "Packing list, destination and lots", "Documents list quantity but omit lot identity"],
      ],
      afterSection: 2,
    },
    checklist: {
      heading: "Lot-traceability requirements to confirm before production",
      items: ["Product code and active revision", "Rule for opening a new lot", "Batch versus serial level", "Material and component links required", "Rework, split and merge rules", "Inspection report lot reference", "Product and carton marking location", "Legibility after packing and use", "Packing-list and shipment fields", "Distributor relabeling method", "Record owner and retention period", "Backward and forward trace exercise"],
      afterSection: 6,
    },
    faqHeading: "Free-weight batch traceability FAQ",
    faq: [
      ["Is a batch number the same as a serial number?", "No. A batch number identifies a defined group, while a serial number identifies one unit. A product may carry both when group-level production history and unit-level service history are needed."],
      ["Should every dumbbell have its own serial number?", "Not automatically. Choose the level by construction, risk, service model and market duty. Batch identity may be sufficient for many fixed products if cartons, records and shipments preserve the link."],
      ["Can the purchase-order number serve as the lot number?", "It can be one reference, but it may be too broad if an order contains several revisions, material changes or production periods. The lot rule should isolate the group the quality decision actually concerns."],
      ["Where should a lot code appear?", "Choose a durable, readable location on the product when appropriate and preserve it on the unit pack or master carton and in the records. Destination rules and product geometry influence the final placement."],
      ["How can a buyer test a supplier's traceability?", "Pick one packed item and trace it backward, then pick one input or finished lot and trace it forward. Check identifiers, quantities, inspection status, stock and shipment records for a continuous chain."],
    ],
    linkHeading: "Connect traceability to product approval and lot control",
    linkLabels: ["Source wholesale dumbbells", "Source wholesale weight plates", "Approve the OEM sample", "Plan AQL inspection", "Control reorder consistency", "Request a traceability review"],
    imageAlt: "Unbranded dumbbell, weight plate, Olympic bar and cable handle matched to plain cartons with color-coded lot tags",
    imageCaption: "A traceable order keeps the same product and lot relationship from production evidence through cartons, shipment and receiving records.",
    cta: ["Define the lot record before releasing the order", "Send the product list, target market, customization, packaging and required traceability depth. Our factory team will map the fields and evidence that can be confirmed for the actual OEM project.", "Review lot traceability"],
  },
  {
    locale: "pt-BR",
    path: "/pt/blog/rastreabilidade-lote-halteres-anilhas-oem",
    title: "Rastreabilidade de lote em halteres e anilhas OEM",
    description: "Estruture números de lote para halteres, anilhas, barras e puxadores ligando versão, matéria-prima, inspeção, caixas e embarque.",
    h1: "Como exigir rastreabilidade de lote em pesos livres OEM",
    keyword: "rastreabilidade de lote halteres OEM",
    home: "Início",
    library: "Blog",
    eyebrow: "Guia de compras para importadores brasileiros, distribuidores e marcas fitness",
    sections: [
      {
        heading: "Resposta direta: o código precisa recuperar a história do produto",
        text: `Rastreabilidade de lote não é apenas pendurar uma etiqueta no pallet. Ao partir de um halter, anilha, barra olímpica, puxador ou caixa, o importador deve conseguir chegar ao código do produto, revisão aprovada, grupo de fabricação, registros de controle, embalagem e embarque. No sentido inverso, um lote de componente ou de produção deve mostrar quais produtos acabados, caixas e remessas podem estar relacionados.

Defina essa cadeia ainda no pedido. Escreva quando nasce um novo lote, em quais pontos ele é registrado, como são tratadas divisão, mistura, retrabalho e reembalagem, e quem pode liberar o estoque. Um número sem vínculo com documentos só localiza uma etiqueta; não sustenta contenção, reclamação ou repetição de compra.`,
      },
      {
        heading: "Não misture SKU, revisão, lote, série e etiqueta logística",
        text: `O SKU identifica uma configuração vendável, como uma anilha bumper preta de 20 kg. A revisão indica qual desenho, material, arte e embalagem estão valendo. O lote reúne unidades produzidas segundo uma regra definida. O número de série distingue uma unidade. Já a identificação da caixa ou do pallet organiza a movimentação logística. Cada campo responde a uma pergunta diferente.

A referência das [Especificações Gerais GS1](https://ref.gs1.org/standards/genspecs/24.0.0/) reserva o código (10) para lote e o código (21) para número de série. A GS1 também orienta que o lote seja lido junto com a identidade do item. Mesmo quando a empresa não usa padrão GS1, vale a regra prática: o mesmo código não pode apontar para produtos ou revisões diferentes dentro do arquivo de compra.`,
      },
      {
        heading: "Escolha a granularidade que o risco e a operação conseguem manter",
        text: `Para halteres fixos, anilhas e acessórios simples, um lote bem definido pode ser mais útil do que serializar cada peça. Barras com manutenção, mecanismos ajustáveis ou conjuntos de maior valor podem justificar identificação individual. O ganho vem da capacidade de separar o grupo correto; detalhamento excessivo, sem leitura e conciliação, aumenta trabalho e cria lacunas.

Pense na decisão futura. Para investigar desplacamento, relacione lote acabado com material de revestimento e período de processo. Para folga de inserto, preserve componente, montagem e inspeção. Para pós-venda, escolha uma marcação que continue legível depois que a caixa for descartada. Exija apenas a profundidade de matéria-prima e subfornecedor que a cadeia realmente consegue demonstrar.`,
      },
      {
        heading: "Descreva quando o lote muda durante a fabricação",
        text: `Uma regra pode abrir novo lote quando muda a revisão, o lote de composto, o acabamento, o molde, uma ferramenta relevante, a linha, o local de produção ou uma autorização temporária. Não há corte universal por turno ou por dia. O critério precisa corresponder ao processo do produto e permitir investigação sem transformar meses de produção em um único grupo.

Pedidos Bulk Supply costumam juntar pesos, cores e modelos. Um pallet pode transportar vários lotes, e um lote pode seguir em caixas ou conhecimentos diferentes. A etiqueta logística deve listar a relação, não apagar o lote original. Se o centro de distribuição brasileiro fracionar, trocar embalagem ou montar kits, registre o novo evento e mantenha a referência da fábrica.`,
      },
      {
        heading: "Ligue inspeção, quantidade e situação de estoque ao mesmo lote",
        text: `O registro deve informar produto e revisão, ordem de produção, quantidade produzida, segregada e liberada, componentes relevantes, período de processo, plano de inspeção e decisão. Em pesos livres, podem ser importantes o lote do composto, revisão do cabo ou inserto, eixo e manga da barra, pintura ou banho, arte do Custom Logo, versão do rótulo e autorização de desvio.

Relatório sem produto, revisão e lote não comprova qual mercadoria foi avaliada. Fotos também precisam de referência: visão geral, detalhe, caixa, data e amostra identificada. O [padrão global de rastreabilidade da GS1](https://ref.gs1.org/standards/global-traceability/) organiza a lógica por objetos, eventos, partes e locais; uma planilha controlada pode aplicar os mesmos princípios quando o volume ainda não exige sistema complexo.`,
      },
      {
        heading: "Faça um teste prático antes do primeiro contêiner",
        text: `Escolha uma caixa pronta e peça o caminho para trás: SKU, revisão, lote acabado, ordem, insumos relevantes, controle e embalagem. Depois escolha um lote de insumo ou acabado e peça o caminho para frente: produtos, caixas, saldo, pallets e embarques. Compare quantidades para revelar mistura, retrabalho ou perda sem explicação.

Para produtos de consumo no mercado europeu, a [orientação empresarial do GPSR](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:52025XC06233) trata do tipo, lote, série ou outro elemento de identificação. No Brasil ou em outro destino, o importador deve confirmar marcação e retenção aplicáveis com responsáveis locais. O exercício verifica recuperação de registros; não substitui avaliação de conformidade, contrato ou inspeção.`,
      },
      {
        heading: "Transforme a exigência em uma proposta executável pela fábrica",
        text: `A ChinaFreeWeight é uma fábrica de halteres, anilhas, barras olímpicas e acessórios de cabo para programas OEM, ODM, Custom Logo, Private Label e Bulk Supply. Podemos revisar uma estrutura específica que una versão do produto, lote, relatório de controle, caixa e lista de embalagem. A profundidade depende da construção, marcação, fornecedores envolvidos e exigência do mercado.

Envie no RFQ mercado, modelos, faixa de pesos, unidade ou par, personalização, nível de lote ou série, posição da marcação, dados desejados, prazo de guarda e teste de recuperação. Compras, qualidade, logística e pós-venda devem aprovar o mesmo desenho antes de liberar arte e embalagem. Assim, o número de lote continua útil no recebimento brasileiro, em uma reclamação de revendedor e no próximo pedido.`,
      },
    ],
    table: {
      heading: "Matriz de identidade para o pedido",
      columns: ["Identificador", "Abrangência", "Registro ligado", "Risco comum"],
      rows: [["SKU e revisão", "Configuração comercial", "Desenho, material, arte e embalagem", "Mudança sem nova revisão"], ["Lote", "Grupo de fabricação", "Insumos, processo e inspeção", "Limite do lote não definido"], ["Série", "Uma unidade", "Serviço e histórico individual", "Número sem vínculo ao modelo"], ["Caixa ou pallet", "Unidade logística", "Produtos, lotes e quantidades", "Etiqueta apaga a origem"], ["Embarque", "Evento de expedição", "Packing list, destino e lotes", "Documento não informa lotes"]],
      afterSection: 3,
    },
    checklist: {
      heading: "Pontos para fechar antes da produção",
      items: ["Código e revisão do produto", "Evento que abre novo lote", "Nível por lote ou por unidade", "Insumos que precisam de vínculo", "Regra de retrabalho e mistura", "Referência no laudo de inspeção", "Posição no produto e na caixa", "Leitura após transporte e uso", "Campos da packing list", "Tratamento da reembalagem", "Responsável e retenção", "Teste para trás e para frente"],
      afterSection: 5,
    },
    faqHeading: "Perguntas de importadores sobre lotes",
    faq: [["Lote e número de série são iguais?", "Não. O lote reúne um grupo definido; a série identifica uma unidade. Os dois podem coexistir quando há histórico de produção e atendimento individual."], ["Todo halter precisa de número de série?", "Não necessariamente. Avalie construção, risco, mercado e pós-venda. Um lote preservado no produto, caixa e documentos pode ser suficiente para muitos modelos fixos."], ["O número do pedido pode ser o lote?", "Pode ser uma referência, mas costuma ser amplo demais quando há várias revisões, matérias-primas ou períodos de fabricação. O lote deve corresponder ao grupo que pode compartilhar a mesma decisão."], ["Onde marcar o lote?", "Defina posição legível e durável no produto quando aplicável, além da embalagem e registros. Geometria, acabamento e obrigação do destino influenciam o método."], ["Como testar o fornecedor?", "Rastreie uma caixa até materiais e inspeção, depois parta de um lote e encontre todo produto, estoque e embarque ligado, conciliando quantidades."]],
    linkHeading: "Ligue rastreabilidade à aprovação e inspeção",
    linkLabels: ["Comprar halteres no atacado", "Comprar anilhas no atacado", "Aprovar a amostra OEM", "Planejar inspeção AQL", "Controlar repetição de compra", "Solicitar revisão de rastreabilidade"],
    imageAlt: "Halteres e anilhas sem marca ligados a caixas e ficha de recebimento por etiquetas coloridas de lote",
    imageCaption: "A identidade do lote precisa permanecer ligada ao produto, à inspeção, à caixa e ao embarque até o recebimento.",
    cta: ["Defina a rastreabilidade antes de liberar a embalagem", "Envie lista de produtos, destino, personalização e nível de registro necessário. A fábrica mapeará campos, marcação e evidências viáveis para o projeto.", "Revisar o plano de lotes"],
  },
  {
    locale: "es",
    path: "/es/blog/trazabilidad-lotes-pesas-libres-oem",
    title: "Trazabilidad de lotes para pesas libres OEM",
    description: "Diseñe números de lote para mancuernas, discos, barras y agarres conectando revisión, materiales, inspección, cajas y expedición.",
    h1: "Cómo controlar la trazabilidad de lotes en pesas libres OEM",
    keyword: "trazabilidad de lotes pesas libres",
    home: "Inicio",
    library: "Blog",
    eyebrow: "Guía para importadores, distribuidores, marcas y responsables de compras",
    sections: [
      {
        heading: "Respuesta breve: la etiqueta debe abrir un expediente recuperable",
        text: `La trazabilidad existe cuando una mancuerna, un disco, una barra olímpica, un agarre o una caja permite recuperar el modelo y la revisión, el lote de fabricación, los componentes relevantes, la inspección, el embalaje y el envío. También debe funcionar hacia delante: desde un lote de material o producción hay que localizar todas las unidades, cajas, existencias y expediciones relacionadas.

Un código impreso no demuestra esa cadena. Antes de fabricar, comprador y proveedor deben acordar cuándo cambia el lote, dónde aparece, cómo se registran divisiones, mezclas, reprocesos y reembalajes, y quién conserva la información. Si el número solo vive en una conversación o en una foto, no sirve para una contención rápida ni para comparar una reposición.`,
      },
      {
        heading: "Asigne una función distinta a cada identificador",
        text: `El SKU describe la configuración comercial. La revisión controla el plano, los materiales, el Custom Logo y el embalaje aprobados. El lote agrupa unidades fabricadas bajo una regla común. El número de serie distingue una unidad. La caja, el pallet y la expedición tienen identificadores logísticos. Ninguno reemplaza automáticamente a los demás.

Las [Especificaciones Generales GS1](https://ref.gs1.org/standards/genspecs/24.0.0/) presentan el código (10) para lote y el código (21) para serie. Además, el lote debe leerse con el identificador del artículo. La empresa puede usar otro formato, pero debe evitar que dos productos o revisiones diferentes queden detrás del mismo valor sin contexto.`,
      },
      {
        heading: "Determine si necesita lote, serie o ambos",
        text: `Para mancuernas fijas, discos y accesorios sencillos, un lote definido y conservado suele ofrecer una relación útil entre esfuerzo y control. Barras reparables, mecanismos ajustables o conjuntos de mayor valor pueden requerir historial por unidad. Serializar todo añade marcado, lectura, almacenamiento y conciliación; solo compensa si cambia la decisión de calidad, servicio o mercado.

Parta del problema que desea aislar. Un defecto de recubrimiento exige vínculo con material y periodo de acabado. Una holgura en el inserto puede necesitar lote de componente, montaje e inspección. Un reclamo posventa exige una marca legible después de desechar la caja. No solicite genealogía completa de cada tornillo si el proceso no puede mantenerla de forma fiable.`,
      },
      {
        heading: "Escriba la regla que abre un lote nuevo",
        text: `Una nueva revisión, un lote distinto de caucho o uretano, otro acabado, molde, herramienta, centro de producción o desviación autorizada pueden exigir un corte. El día o turno de producción puede ayudar, pero no es una regla universal. El límite debe representar condiciones que importan para investigar la conformidad.

En un pedido Bulk Supply, un pallet puede mezclar varios lotes y un lote puede dividirse entre contenedores. El listado de caja y el packing list deben conservar la relación original. Si el distribuidor prepara kits, cambia etiquetas o divide cajas, su identificador interno debe añadirse sin borrar el lote de fábrica y debe quedar registrado el evento.`,
      },
      {
        heading: "Haga que el informe de calidad identifique lo que realmente revisó",
        text: `El expediente del lote debe incluir producto y revisión, orden, cantidades fabricadas, bloqueadas y liberadas, materiales o componentes críticos, periodo de proceso, inspección y decisión. Según el producto, pueden ser relevantes el compuesto, inserto, mango, eje, manguito, baño, pintura, arte de marca, versión de caja o una concesión aprobada.

Un informe genérico no permite saber qué mercancía cubre. Las fotos deben mostrar conjunto, detalle, muestra identificada, fecha, caja y referencia del pedido. El [Estándar Global de Trazabilidad GS1](https://ref.gs1.org/standards/global-traceability/) organiza objetos, partes, lugares y eventos; esa lógica puede aplicarse con registros sencillos siempre que las relaciones no se pierdan.`,
      },
      {
        heading: "Pruebe el sistema en los dos sentidos y cuadre cantidades",
        text: `Tome una caja terminada y retroceda hasta SKU, revisión, lote final, orden, insumos relevantes, controles y embalaje. Después elija un lote de entrada o acabado y avance hasta productos, cajas, almacenes y envíos. Las cantidades producidas, rechazadas, reprocesadas, en stock y despachadas deben explicar el total.

Para productos de consumo introducidos en la UE, la [guía empresarial de la Comisión sobre el GPSR](https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:52025XC06233) aborda el tipo, lote, serie u otro elemento identificador. El importador debe confirmar las obligaciones concretas del país y del producto. El ejercicio de trazabilidad comprueba la recuperación, no sustituye ensayos, expediente técnico ni evaluación jurídica.`,
      },
      {
        heading: "Convierta el requisito en una conversación técnica con la fábrica",
        text: `ChinaFreeWeight es una fábrica que trabaja programas OEM, ODM, Custom Logo, Private Label y Bulk Supply de mancuernas, discos, barras olímpicas y accesorios de cable. Podemos revisar cómo enlazar la revisión aprobada, el lote de producción, la evidencia de control y el embalaje. El alcance final depende de la construcción, el método de marcado y la cadena real.

Envíe mercado, modelos, pesos, definición de pieza o par, personalización, nivel de lote o serie, ubicación de la marca, campos de registro, conservación y prueba solicitada. Compras, calidad, almacén y servicio deben usar el mismo esquema. Conviene adjuntar un ejemplo de etiqueta, el formato del informe y los campos que el sistema de recepción puede conservar. También debe acordarse quién autoriza una corrección cuando la cantidad física y el registro no coinciden, y cómo se documenta una excepción antes del embarque y antes de que la mercancía salga de planta. La meta no es acumular códigos, sino obtener una cadena que responda durante recepción, reclamación y pedido repetido.`,
      },
    ],
    table: {
      heading: "Qué debe resolver cada nivel de identidad",
      columns: ["Nivel", "Distingue", "Debe enlazar", "Fallo típico"],
      rows: [["SKU y revisión", "Configuración aprobada", "Plano, material, marca y caja", "Cambio sin revisar"], ["Lote", "Grupo de producción", "Insumos, periodo e inspección", "Límite ambiguo"], ["Serie", "Unidad individual", "Servicio e historial", "Serie sin lote"], ["Caja o pallet", "Unidad logística", "SKUs, lotes y cantidades", "Se pierde el lote original"], ["Expedición", "Salida concreta", "Packing list, destino y lotes", "Solo consta la cantidad"]],
      afterSection: 2,
    },
    checklist: {
      heading: "Datos que deben quedar acordados",
      items: ["Código y revisión del producto", "Regla de creación de lote", "Nivel de lote o serie", "Componentes que se vinculan", "Control de mezcla y reproceso", "Lote en el informe de inspección", "Ubicación en producto y caja", "Legibilidad después del transporte", "Campos del packing list", "Reetiquetado del distribuidor", "Responsable y conservación", "Ensayo de trazado en dos sentidos"],
      afterSection: 6,
    },
    faqHeading: "Preguntas de compradores sobre lotes",
    faq: [["¿Lote y número de serie significan lo mismo?", "No. El lote identifica un grupo definido y la serie una unidad. Ambos pueden convivir cuando se necesita historia común de fabricación y servicio individual."], ["¿Cada mancuerna necesita serie propia?", "No siempre. La decisión depende de riesgo, servicio, mercado y capacidad operativa. Para muchos productos fijos, un lote bien conservado puede ser suficiente."], ["¿Puedo usar el número de pedido como lote?", "Puede formar parte del registro, pero un pedido puede contener varias revisiones o periodos. El lote debe aislar el grupo afectado por una decisión de calidad."], ["¿Dónde se coloca el lote?", "En un lugar legible y duradero del producto cuando proceda, y también en caja y registros. La geometría y los requisitos del destino determinan el método."], ["¿Cómo compruebo la trazabilidad del proveedor?", "Rastree una caja hacia atrás y un lote hacia delante, verificando revisión, insumos, controles, cantidades, stock y expediciones."]],
    linkHeading: "Integre trazabilidad, muestra e inspección",
    linkLabels: ["Comprar mancuernas al por mayor", "Comprar discos al por mayor", "Aprobar la muestra OEM", "Planificar inspección AQL", "Controlar la reposición", "Solicitar revisión de trazabilidad"],
    imageAlt: "Mancuernas, discos y barra sin marca vinculados a cajas y hoja de control mediante etiquetas de colores",
    imageCaption: "La identidad del lote debe viajar con el producto desde el registro de fabricación hasta la caja, el envío y la recepción.",
    cta: ["Diseñe el lote antes de aprobar etiquetas", "Envíe productos, destino, personalización y profundidad de registro. La fábrica propondrá campos, marcado y pruebas viables para el proyecto.", "Revisar la trazabilidad"],
  },
  {
    locale: "de",
    path: "/de/blog/chargenrueckverfolgbarkeit-freigewichte-oem",
    title: "Chargenrückverfolgbarkeit für OEM-Freigewichte",
    description: "Chargen von Hanteln, Scheiben, Langhanteln und Kabelgriffen mit Produktrevision, Material, Prüfung, Verpackung und Lieferung verknüpfen.",
    h1: "Chargenrückverfolgbarkeit für OEM-Freigewichte festlegen",
    keyword: "Chargenrückverfolgbarkeit Freigewichte",
    home: "Startseite",
    library: "Ratgeber",
    eyebrow: "Technischer Einkaufsleitfaden für Importeure, Händler und Eigenmarken",
    sections: [
      { heading: "Direkte Antwort: Eine Chargennummer muss einen belastbaren Datensatz öffnen", text: `Rückverfolgbarkeit liegt vor, wenn eine Kurzhantel, Gewichtsscheibe, Olympia-Langhantel, ein Kabelgriff oder Karton eindeutig zur freigegebenen Produktrevision, Fertigungscharge, relevanten Material- und Bauteilchargen, Prüfung, Verpackung und Lieferung führt. Umgekehrt muss eine auffällige Eingangs- oder Fertigungscharge alle betroffenen Fertigprodukte und Versandpositionen zeigen.

Eine aufgeklebte Nummer erfüllt diese Aufgabe nur, wenn sie an jedem Übergang erhalten bleibt. Vor Produktionsfreigabe werden Chargenbildungsregel, Kennzeichnungsort, Aufteilung, Zusammenführung, Nacharbeit, Umpacken, Datenverantwortung und Aufbewahrung schriftlich festgelegt. Das verhindert, dass später mehrere Zeichnungsstände oder Materialwechsel unter derselben Nummer verschwinden.` },
      { heading: "Artikel, Revision, Charge, Seriennummer und Ladungsträger trennen", text: `Die Artikelnummer beschreibt die verkaufte Ausführung; der Revisionsstand kontrolliert Zeichnung, Werkstoff, Artwork und Verpackung. Eine Charge fasst Einheiten nach definierten gemeinsamen Bedingungen zusammen. Eine Seriennummer unterscheidet ein Einzelstück. Karton-, Paletten- und Sendungsnummern steuern die Logistik. Erst die dokumentierte Beziehung zwischen diesen Ebenen macht die Kette nutzbar.

Die offiziellen [Allgemeinen GS1-Spezifikationen](https://ref.gs1.org/standards/genspecs/24.0.0/) weisen Kennung (10) der Charge und Kennung (21) der Seriennummer zu. GS1 behandelt die Charge als Attribut eines identifizierten Handelsartikels. Auch ohne GS1-Barcode sollte daher jede Chargennummer zusammen mit Artikel und Revision eindeutig sein; ein reines Datumsfeld reicht bei mehreren Varianten häufig nicht.` },
      { heading: "Rückverfolgungstiefe nach Risiko und späterer Entscheidung wählen", text: `Für feste Hanteln, Scheiben oder einfache Griffe kann eine sauber abgegrenzte Fertigungscharge angemessen sein. Bei wartbaren Langhanteln, Verstellmechanismen oder hochwertigen Baugruppen kann eine Seriennummer die Servicezuordnung verbessern. Einzelkennzeichnung erzeugt zusätzlichen Aufwand beim Markieren, Scannen, Lagern und Abstimmen. Sie ist nur sinnvoll, wenn sie die Eingrenzung oder den Service tatsächlich verändert.

Das Fehlerbild bestimmt die benötigte Tiefe. Eine Beschichtungsablösung verlangt Verbindung zu Beschichtungsstoff und Prozesszeitraum; ein loser Scheibeneinsatz zu Einsatzcharge, Form- oder Montageperiode und Prüfergebnis. Der Käufer sollte keine lückenlose Rohstoffgenealogie versprechen, wenn Unterlieferanten diese nicht belegen können. Verlangt wird die Kette, die für das konkrete Produkt kontrollierbar bleibt.` },
      { heading: "Chargenwechsel, Nacharbeit und Mischpaletten beherrschbar machen", text: `Ein neuer Revisionsstand, eine andere Gummi- oder Urethancharge, ein Wechsel von Werkzeug, Beschichtung, Werk, Linie oder freigegebener Abweichung kann eine neue Charge auslösen. Welche Ereignisse relevant sind, wird produktspezifisch festgelegt. Ein Tages- oder Schichtcode kann Bestandteil der Regel sein, ersetzt aber nicht die Definition der gemeinsamen Fertigungsbedingungen.

Bei Bulk Supply enthält eine Palette oft mehrere Artikel und Chargen; eine Charge kann zugleich auf mehrere Kartons verteilt sein. Kartonetikett, Packliste und Palettenübersicht müssen diese Zuordnung bewahren. Beim Umpacken im deutschen oder europäischen Lager kommt eine interne Kennung hinzu, ohne die Werkscharge zu überschreiben. Gesperrte und freigegebene Mengen bleiben getrennt sichtbar.` },
      { heading: "Mit einer Vorwärts- und Rückwärtsprobe die tatsächliche Kette prüfen", text: `Der Käufer wählt einen fertigen Karton und verfolgt ihn zurück zu Artikel, Revision, Fertigungsauftrag, relevanten Eingängen, Prüfung und Verpackung. Danach startet er mit einer Material- oder Fertigungscharge und sucht alle Fertigchargen, Kartons, Bestände und Auslieferungen. Produzierte, verworfene, nachgearbeitete, gelagerte und versandte Mengen müssen zusammenpassen.

Der [GS1 Global Traceability Standard](https://ref.gs1.org/standards/global-traceability/) beschreibt identifizierbare Objekte und Ereignisse als Grundlage einer solchen Kette. Für Verbraucherprodukte im EU-Markt erläutert die [GPSR-Leitlinie der Europäischen Kommission](https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:52025XC06233) die Produktidentifikation durch Typ, Charge, Serie oder ein anderes Element. Die konkrete Pflicht wird vom Importeur für Produkt und Zielmarkt geprüft; ein Suchtest ersetzt keine Konformitätsbewertung.` },
      { heading: "Die Anforderung als umsetzbaren Werks- und Einkaufsprozess vereinbaren", text: `ChinaFreeWeight ist eine Fabrik für Kurzhanteln, Gewichtsscheiben, Olympia-Langhanteln und Kabelzubehör in OEM-, ODM-, Custom Logo-, Private Label- und Bulk Supply-Projekten. Wir können prüfen, wie Produktrevision, Fertigungscharge, Qualitätsnachweis und Exportverpackung beim konkreten Modell verbunden werden. Umfang und Markierung hängen von Konstruktion und Lieferkette ab.

Die Anfrage nennt Markt, Modell- und Gewichtsmatrix, Stück- oder Paardefinition, Kennzeichnungsebene, Position, Datenfelder, Aufbewahrung und gewünschte Rückverfolgungsprobe. Einkauf, Qualität, Lager und Service geben denselben Plan frei. So bleibt die Nummer bei Wareneingang, Reklamation und Nachbestellung verwendbar, statt nur auf dem Erstmuster gut auszusehen.` },
    ],
    table: { heading: "Identitätsebenen im OEM-Auftrag", columns: ["Ebene", "Aussage", "Verknüpfung", "Typische Lücke"], rows: [["Artikel + Revision", "Freigegebene Ausführung", "Zeichnung, Material, Artwork", "Änderung ohne Revision"], ["Charge", "Gemeinsame Fertigungsgruppe", "Eingänge, Prozess, Prüfung", "Grenze nicht definiert"], ["Seriennummer", "Einzelgerät", "Service und Historie", "Kein Bezug zur Charge"], ["Karton/Palette", "Logistikeinheit", "Inhalt, Charge, Menge", "Werkscharge überschrieben"], ["Sendung", "Auslieferungsereignis", "Packliste, Ziel, Chargen", "Nur Gesamtmenge"]], afterSection: 2 },
    checklist: { heading: "Vor Serienfreigabe zu dokumentieren", items: ["Artikel und Revisionsstand", "Auslöser einer neuen Charge", "Charge oder Einzelserie", "Pflichtige Eingangsverknüpfungen", "Regel für Nacharbeit und Mischung", "Charge im Prüfbericht", "Markierung auf Produkt und Karton", "Lesbarkeit nach Nutzung", "Felder der Packliste", "Umpack- und Relabelprozess", "Datenhalter und Aufbewahrung", "Rückwärts- und Vorwärtsprobe"], afterSection: 5 },
    faqHeading: "Fragen zur Chargenrückverfolgbarkeit", faq: [["Sind Charge und Seriennummer dasselbe?", "Nein. Die Charge beschreibt eine definierte Gruppe, die Seriennummer ein Einzelstück. Beide können miteinander verknüpft sein."], ["Braucht jede Hantel eine Seriennummer?", "Nicht grundsätzlich. Produkt, Risiko, Service und Markt bestimmen die Ebene. Eine belastbare Chargenkette ist bei vielen festen Produkten zweckmäßiger."], ["Kann die Bestellnummer als Charge dienen?", "Sie kann Referenz sein, ist aber oft zu breit. Enthält der Auftrag verschiedene Revisionen oder Prozesszeiträume, braucht es kleinere Gruppen."], ["Wo wird die Charge gekennzeichnet?", "Wenn geeignet am Produkt sowie auf Verpackung und in den Unterlagen. Konstruktion, Haltbarkeit und Marktpflicht bestimmen Methode und Ort."], ["Wie lässt sich ein Lieferant prüfen?", "Einen Karton rückwärts und eine Eingangs- oder Fertigungscharge vorwärts verfolgen und dabei Revision, Prüfung, Bestand, Lieferung und Mengen abgleichen."]],
    linkHeading: "Rückverfolgbarkeit mit Freigabe und Prüfung verbinden", linkLabels: ["Kurzhanteln im Großhandel", "Gewichtsscheiben beziehen", "OEM-Muster freigeben", "AQL-Prüfung planen", "Nachbestellungen stabil halten", "Chargenplan anfragen"],
    imageAlt: "Unmarkierte Hantel, Scheibe, Langhantel und Kabelgriff mit farbigen Chargenmarken in getrennten Prüfbereichen", imageCaption: "Artikel, Revision und Charge bleiben von der Werkserfassung bis zu Karton, Lieferung und Wareneingang verbunden.",
    cta: ["Chargenlogik vor der Verpackungsfreigabe festlegen", "Senden Sie Modelle, Zielmarkt, Branding, Verpackung und gewünschte Tiefe. Das Werk ordnet realisierbare Kennzeichnung und Nachweise dem Projekt zu.", "Chargenplan prüfen"],
  },
  {
    locale: "fr",
    path: "/fr/blog/tracabilite-lots-halteres-disques-oem",
    title: "Traçabilité des lots pour haltères et disques OEM",
    description: "Reliez les lots d'haltères, disques, barres et poignées à la version produit, aux composants, au contrôle, aux cartons et aux expéditions.",
    h1: "Organiser la traçabilité des lots de poids libres OEM",
    keyword: "traçabilité lots poids libres OEM",
    home: "Accueil",
    library: "Guides",
    eyebrow: "Guide d'achat technique pour importateurs, distributeurs et marques",
    sections: [
      { heading: "Réponse directe : un numéro n'est utile que s'il retrouve un dossier", text: `La traçabilité permet de partir d'un haltère, d'un disque, d'une barre olympique, d'une poignée ou d'un carton pour retrouver le modèle, la révision, le groupe de fabrication, les composants pertinents, le contrôle, le conditionnement et l'expédition. Le chemin inverse doit identifier toutes les unités et livraisons liées à un lot de matière ou de production suspect.

Il faut donc définir la règle avant la commande : événement ouvrant un nouveau lot, emplacement du marquage, traitement d'une division, d'un mélange, d'une retouche ou d'un reconditionnement, responsable des données et durée de conservation. Un code sans relation avec ces enregistrements ne réduit ni le périmètre d'une réclamation ni l'enquête de cause.` },
      { heading: "Donner un rôle précis à l'article, à la révision, au lot et à la série", text: `La référence article désigne la configuration vendue. La révision fixe le plan, la matière, l'artwork et l'emballage approuvés. Le lot regroupe des pièces selon des conditions communes définies. Le numéro de série isole une unité. Le carton, la palette et l'expédition possèdent des identifiants logistiques. La valeur vient de la relation entre ces niveaux.

Les [spécifications générales GS1](https://ref.gs1.org/standards/genspecs/24.0.0/) associent le code (10) au lot et le code (21) au numéro de série. Elles rappellent aussi qu'un lot est un attribut de l'article identifié. Même sans code GS1, l'acheteur doit exiger que la combinaison article, révision et lot ne soit jamais ambiguë.` },
      { heading: "Choisir le niveau en fonction du risque et du service", text: `Un lot maîtrisé convient souvent aux haltères fixes, disques et accessoires simples. Une barre réparable, un mécanisme réglable ou un ensemble coûteux peut justifier un numéro individuel. La sérialisation ajoute marquage, lecture, stockage et rapprochement. Elle n'est pertinente que si elle permet une action plus ciblée.

Le défaut envisagé guide les liens : un décollement doit renvoyer au revêtement et à la période de procédé; un insert desserré à l'insert, au moulage ou à l'assemblage et au contrôle; une demande de service à une identité qui reste lisible après déballage. La profondeur demandée doit rester compatible avec les données réellement conservées par l'usine et ses sous-traitants.` },
      { heading: "Conserver les lots lors des mélanges, retouches et reconditionnements", text: `Une nouvelle révision, une autre matière, un changement de moule, d'outil, de finition, de site ou une dérogation peuvent déclencher un nouveau lot. Une date ou une équipe peut faire partie du code mais ne remplace pas la règle. L'objectif est d'éviter qu'un changement important soit noyé dans un groupe trop large.

En Bulk Supply, une palette contient parfois plusieurs lots et un lot est réparti dans plusieurs cartons. L'étiquette et la packing list doivent garder cette relation. Si un distributeur français ou européen crée des kits ou remplace un emballage, son numéro interne s'ajoute au lot usine sans l'effacer; les quantités bloquées, triées et libérées restent séparées.` },
      { heading: "Tester la chaîne dans les deux sens", text: `Choisissez un carton fini et remontez vers l'article, la révision, l'ordre, les entrées importantes, le rapport de contrôle et le conditionnement. Puis partez d'un lot entrant ou fini et retrouvez tous les produits, cartons, stocks et envois associés. Le rapprochement des quantités doit expliquer production, rebut, retouche, stock et expédition.

Le [standard mondial de traçabilité GS1](https://ref.gs1.org/standards/global-traceability/) structure cette logique autour d'objets et d'événements identifiés. Pour les produits de consommation dans l'UE, la [Commission explique le GPSR aux entreprises](https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:52025XC06233), notamment l'identification par type, lot, série ou autre élément. L'importateur vérifie les obligations applicables; l'exercice de recherche ne prouve pas à lui seul la conformité.` },
      { heading: "Inscrire la responsabilité de l'usine et de l'acheteur dans le dossier", text: `ChinaFreeWeight est une usine de poids libres qui accompagne des programmes OEM, ODM, Custom Logo, Private Label et Bulk Supply pour haltères, disques, barres olympiques et accessoires de câble. Nous pouvons examiner comment relier la révision confirmée, le lot, les preuves de contrôle et l'emballage export. La profondeur dépend du modèle et de la chaîne réelle.

Le RFQ précise marché, modèles, plages de poids, définition pièce ou paire, niveau lot ou série, emplacement, champs à conserver et exercice attendu. Achats, qualité, entrepôt et service valident la même architecture avant l'artwork. Une bonne traçabilité répond à une réception, une réclamation et un réassort; elle ne se limite pas à une étiquette esthétique.` },
    ],
    table: { heading: "Matrice des identifiants", columns: ["Niveau", "Ce qu'il distingue", "Lien attendu", "Rupture fréquente"], rows: [["Article + révision", "Configuration approuvée", "Plan, matière, marque, emballage", "Changement non révisé"], ["Lot", "Groupe de fabrication", "Entrées, procédé, contrôle", "Frontière inconnue"], ["Série", "Une unité", "Service et historique", "Série sans lot"], ["Carton/palette", "Unité logistique", "Articles, lots, quantités", "Lot usine effacé"], ["Expédition", "Une sortie", "Packing list, destination, lots", "Quantité seule"]], afterSection: 3 },
    checklist: { heading: "Points à figer avant fabrication", items: ["Référence et révision", "Règle d'ouverture du lot", "Niveau lot ou série", "Composants liés", "Gestion des mélanges et retouches", "Lot dans le rapport de contrôle", "Marquage produit et carton", "Lisibilité après usage", "Champs de la packing list", "Méthode de réétiquetage", "Propriétaire et conservation", "Essai amont et aval"], afterSection: 5 },
    faqHeading: "Questions des acheteurs sur les lots", faq: [["Lot et numéro de série sont-ils identiques ?", "Non. Le lot désigne un groupe défini; la série désigne une unité. Ils peuvent être liés dans le même dossier."], ["Chaque haltère doit-il être sérialisé ?", "Pas nécessairement. Le risque, le service, le marché et la capacité de suivi déterminent le niveau approprié."], ["Le numéro de commande suffit-il ?", "Il peut aider, mais une commande peut couvrir plusieurs révisions ou périodes. Le lot doit isoler le groupe concerné par une décision qualité."], ["Où placer le code ?", "Sur le produit lorsqu'il est adapté et durable, puis sur l'emballage et dans les documents. La géométrie et le marché déterminent la solution."], ["Comment tester le fournisseur ?", "Tracer un carton vers l'amont et un lot vers l'aval, puis rapprocher révisions, contrôles, stocks, livraisons et quantités."]],
    linkHeading: "Relier lots, validation et contrôle", linkLabels: ["Sourcer des haltères", "Sourcer des disques", "Valider l'échantillon OEM", "Préparer le contrôle AQL", "Maîtriser le réassort", "Demander une revue de traçabilité"],
    imageAlt: "Haltères et disques sans marque associés à des cartons et fiches par des repères de lot colorés", imageCaption: "Le lot reste lié à la révision, au contrôle, au carton et à l'expédition jusqu'à la réception.",
    cta: ["Définir le lot avant de valider les étiquettes", "Envoyez modèles, marché, personnalisation, emballage et profondeur attendue. L'usine proposera les liens et preuves réalisables.", "Examiner la traçabilité"],
  },
  {
    locale: "vi",
    path: "/vi/blog/truy-xuat-lo-ta-tay-banh-ta-oem",
    title: "Truy xuất lô tạ tay, bánh tạ và phụ kiện OEM",
    description: "Thiết kế mã lô cho tạ tay, bánh tạ, đòn tạ và tay cầm cáp, liên kết phiên bản, vật liệu, kiểm tra, thùng hàng và lô giao.",
    h1: "Cách xây dựng truy xuất lô cho tạ tự do OEM",
    keyword: "truy xuất lô tạ tự do OEM",
    home: "Trang chủ",
    library: "Kiến thức",
    eyebrow: "Hướng dẫn mua hàng kỹ thuật cho nhà nhập khẩu, nhà phân phối và thương hiệu riêng",
    sections: [
      { heading: "Trả lời nhanh: mã lô phải mở được hồ sơ có thể kiểm chứng", text: `Truy xuất lô cho phép người mua bắt đầu từ một quả tạ tay, bánh tạ, đòn tạ Olympic, tay cầm cáp hoặc thùng hàng để tìm đúng mã hàng, phiên bản, nhóm sản xuất, đầu vào liên quan, kết quả kiểm tra, đóng gói và chuyến giao. Chiều ngược lại cũng phải hoạt động: từ một lô vật liệu hoặc lô thành phẩm cần xác định được mọi thùng và lô giao bị ảnh hưởng.

Một dãy ký tự in trên nhãn chưa tạo thành truy xuất. Trước khi duyệt đơn OEM, hai bên cần thống nhất sự kiện mở lô mới, vị trí đánh dấu, cách ghi nhận tách lô, trộn lô, làm lại, đóng gói lại, người giữ dữ liệu và thời hạn lưu. Mã trên sản phẩm, phiếu kiểm tra, carton và packing list phải dẫn về cùng một quan hệ.` },
      { heading: "Tách mã hàng, phiên bản, lô, số sê-ri và đơn vị logistics", text: `Mã hàng mô tả cấu hình bán; phiên bản kiểm soát bản vẽ, vật liệu, logo và bao bì đã duyệt. Lô gom các đơn vị có điều kiện sản xuất chung đã định nghĩa, còn số sê-ri nhận diện một đơn vị. Mã carton, pallet và lô giao phục vụ vận chuyển. Không nên dùng một trường để thay cho tất cả các trường còn lại.

[Quy định chung GS1](https://ref.gs1.org/standards/genspecs/24.0.0/) dành mã (10) cho batch hoặc lot và mã (21) cho số sê-ri. Lô được hiểu cùng với mã sản phẩm, vì vậy một mã ngày đơn lẻ thường không đủ khi cùng ngày có nhiều trọng lượng hoặc phiên bản. Doanh nghiệp không bắt buộc phải dùng mã GS1 để áp dụng nguyên tắc này.` },
      { heading: "Chọn độ sâu theo rủi ro và quyết định cần đưa ra", text: `Tạ tay cố định, bánh tạ và phụ kiện đơn giản thường phù hợp với quản lý theo lô. Đòn tạ có thể bảo dưỡng, cơ cấu điều chỉnh hoặc cụm giá trị cao có thể cần số sê-ri nếu dịch vụ phải xác định từng đơn vị. Ghi nhận đến từng chiếc làm tăng công việc đánh dấu, quét, lưu và đối soát, nên chỉ áp dụng khi giúp thu hẹp quyết định.

Nếu cần điều tra bong lớp phủ, lô thành phẩm phải nối với vật liệu phủ và khoảng thời gian quy trình. Nếu lo insert bị lỏng, hồ sơ có thể cần lô insert, giai đoạn đúc hoặc lắp và kết quả kiểm tra. Không yêu cầu phả hệ nguyên liệu sâu hơn khả năng chứng minh của nhà máy và nhà cung cấp phụ.` },
      { heading: "Giữ nguyên quan hệ khi tách, làm lại, trộn pallet và đóng gói lại", text: `Thay đổi phiên bản, lô cao su hoặc urethane, khuôn, dụng cụ, hoàn thiện, địa điểm hay sai lệch đã duyệt có thể mở lô mới. Quy tắc phải theo cấu tạo sản phẩm; ngày hoặc ca chỉ là một phần của quy tắc. Hàng làm lại vẫn giữ danh tính gốc và bổ sung trạng thái xử lý thay vì được cấp mã sạch không có lịch sử.

Đơn Bulk Supply thường có pallet nhiều mã hàng hoặc một lô chia cho nhiều thùng. Nhãn carton và packing list cần lưu mã hàng, phiên bản, lô và số lượng. Nếu kho tại Việt Nam hoặc thị trường đích chia bộ hay thay nhãn, mã nội bộ mới phải giữ tham chiếu lô nhà máy và ghi lại sự kiện đóng gói lại.` },
      { heading: "Thực hiện phép thử truy ngược và truy xuôi", text: `Chọn ngẫu nhiên một thùng thành phẩm, truy ngược về mã hàng, phiên bản, lệnh sản xuất, đầu vào quan trọng, quyết định kiểm tra và hồ sơ đóng gói. Sau đó chọn một lô đầu vào hoặc thành phẩm để truy xuôi đến mọi thùng, tồn kho và chuyến giao. Số lượng sản xuất, loại bỏ, làm lại, tồn và giao phải đối soát được.

[Tiêu chuẩn truy xuất toàn cầu GS1](https://ref.gs1.org/standards/global-traceability/) tổ chức chuỗi theo đối tượng và sự kiện nhận diện được. Với hàng tiêu dùng vào EU, [hướng dẫn GPSR của Ủy ban châu Âu](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:52025XC06233) giải thích việc nhận diện bằng loại, batch, sê-ri hoặc yếu tố khác. Nhà nhập khẩu vẫn phải xác minh nghĩa vụ cụ thể; phép thử truy xuất không thay cho đánh giá phù hợp.` },
      { heading: "Đưa trách nhiệm của nhà máy và người mua vào hồ sơ đặt hàng", text: `ChinaFreeWeight là nhà máy sản xuất tạ tay, bánh tạ, đòn tạ Olympic và phụ kiện cáp cho dự án OEM, ODM, Custom Logo, Private Label và Bulk Supply. Chúng tôi có thể rà soát cách liên kết phiên bản đã xác nhận, lô sản xuất, bằng chứng kiểm tra và bao bì xuất khẩu theo đúng mẫu hàng. Độ sâu phụ thuộc cấu tạo và chuỗi cung ứng thực tế.

RFQ nên nêu thị trường, danh sách mẫu và mức cân, cách tính chiếc hoặc cặp, cấp lô hay sê-ri, vị trí, trường dữ liệu, thời gian lưu và bài thử cần thực hiện. Bộ phận mua hàng, chất lượng, kho và dịch vụ duyệt cùng một sơ đồ trước khi chốt artwork và carton, để mã còn dùng được khi nhận hàng, khiếu nại và đặt lại.` },
    ],
    table: { heading: "Ma trận nhận diện cho đơn hàng OEM", columns: ["Cấp", "Phân biệt", "Liên kết cần có", "Lỗi thường gặp"], rows: [["Mã hàng + phiên bản", "Một cấu hình đã duyệt", "Bản vẽ, vật liệu, logo, bao bì", "Thay đổi không lên phiên bản"], ["Lô", "Nhóm sản xuất xác định", "Đầu vào, quy trình, kiểm tra", "Không rõ ranh giới lô"], ["Số sê-ri", "Một đơn vị", "Dịch vụ và lịch sử", "Không nối về lô"], ["Carton/pallet", "Đơn vị logistics", "Mã hàng, lô, số lượng", "Ghi đè lô nhà máy"], ["Lô giao", "Một lần xuất", "Packing list, đích, lô", "Chỉ có tổng số lượng"]], afterSection: 2 },
    checklist: { heading: "Thông tin cần chốt trước sản xuất", items: ["Mã hàng và phiên bản", "Quy tắc mở lô mới", "Cấp lô hay sê-ri", "Đầu vào phải liên kết", "Quy tắc tách, trộn và làm lại", "Lô trên báo cáo kiểm tra", "Vị trí trên hàng và carton", "Độ bền và khả năng đọc", "Trường trên packing list", "Quy trình thay nhãn", "Chủ dữ liệu và thời hạn lưu", "Thử truy ngược và truy xuôi"], afterSection: 5 },
    faqHeading: "Câu hỏi về truy xuất lô tạ tự do", faq: [["Lô và số sê-ri có giống nhau không?", "Không. Lô nhận diện một nhóm đã định nghĩa; số sê-ri nhận diện một đơn vị. Hai cấp có thể được liên kết."], ["Mỗi quả tạ tay có cần số sê-ri?", "Không mặc định. Cấu tạo, rủi ro, dịch vụ và yêu cầu thị trường quyết định cấp phù hợp."], ["Có thể dùng số đơn hàng làm mã lô không?", "Có thể dùng làm tham chiếu, nhưng đơn hàng thường quá rộng nếu có nhiều phiên bản, vật liệu hoặc giai đoạn sản xuất."], ["Đặt mã lô ở đâu?", "Khi phù hợp, đặt ở vị trí bền trên sản phẩm, đồng thời giữ trên bao bì và hồ sơ. Hình học và thị trường quyết định phương pháp."], ["Kiểm tra nhà cung cấp thế nào?", "Truy một thùng về đầu vào và một lô về mọi thành phẩm, rồi đối soát phiên bản, kiểm tra, tồn, giao và số lượng."]],
    linkHeading: "Kết nối truy xuất với duyệt mẫu và kiểm tra", linkLabels: ["Mua sỉ tạ tay", "Mua sỉ bánh tạ", "Duyệt mẫu OEM", "Lập kế hoạch AQL", "Ổn định đơn đặt lại", "Yêu cầu rà soát truy xuất"],
    imageAlt: "Tạ tay, bánh tạ, đòn tạ và tay cầm cáp không thương hiệu được phân nhóm bằng thẻ màu cạnh thùng trơn", imageCaption: "Mã hàng, phiên bản và lô được giữ từ hồ sơ sản xuất đến carton, lô giao và khâu nhận hàng.",
    cta: ["Chốt logic lô trước khi duyệt nhãn", "Gửi mẫu hàng, thị trường, tùy chỉnh, bao bì và độ sâu cần thiết. Nhà máy sẽ đề xuất trường dữ liệu và bằng chứng khả thi.", "Rà soát truy xuất"],
  },
  {
    locale: "sv",
    path: "/sv/blogg/sparbarhet-partinummer-fria-vikter-oem",
    title: "Spårbarhet för partier av fria vikter i OEM-inköp",
    description: "Koppla hantlar, viktskivor, skivstänger och kabelhandtag till revision, materialparti, kontroll, kartong och leverans.",
    h1: "Så planeras partispårbarhet för fria vikter",
    keyword: "partispårbarhet fria vikter OEM",
    home: "Startsida",
    library: "Kunskap",
    eyebrow: "Teknisk inköpsguide för importörer, distributörer och egna varumärken",
    sections: [
      { heading: "Kort svar: ett partinummer ska öppna en sammanhängande post", text: `Spårbarhet innebär att köparen från en hantel, viktskiva, olympisk skivstång, kabelhandtag eller kartong kan hitta artikelrevision, tillverkningsparti, relevanta insatsvaror, kontrollbeslut, packning och leverans. Den omvända vägen ska visa alla färdiga partier, kartonger och utleveranser som berörs av ett misstänkt material- eller produktionsparti.

En tryckt kod är bara en identitet tills den bär samma relation genom arbetsorder, kvalitetsprotokoll, etikett, packlista och godsmottagning. Före frisläppning behöver parterna definiera vad som öppnar ett nytt parti, hur delning, sammanslagning, omarbete och ompackning registreras, vem som äger uppgiften och hur länge den sparas.` },
      { heading: "Håll isär artikel, revision, parti, serienummer och lastenhet", text: `Artikeln beskriver den sålda konfigurationen, medan revisionen styr godkänd ritning, material, märkning och förpackning. Ett parti grupperar enheter med definierade gemensamma villkor. Serienumret skiljer en enhet från en annan. Kartong-, pall- och sändnings-ID styr logistiken. Spårbarheten finns i länken mellan nivåerna.

[GS1:s allmänna specifikationer](https://ref.gs1.org/standards/genspecs/24.0.0/) använder kod (10) för batch eller lot och kod (21) för serienummer. Partiet är ett attribut till en identifierad handelsartikel. Även utan GS1-märkning bör därför kombinationen artikel, revision och parti vara entydig; en ensam datumkod räcker sällan för ett blandat sortiment.` },
      { heading: "Välj detaljnivå efter risk och beslut", text: `Partinivå är ofta praktisk för fasta hantlar, skivor och enklare tillbehör. Servicebara stänger, justerbara mekanismer eller dyrare enheter kan motivera serienummer när ett ärende måste avgränsas till ett exemplar. Enhetsregistrering medför mer märkning, skanning, lagring och avstämning och bör ge en verklig beslutsnytta.

Ett beläggningsfel kräver koppling till material och processperiod. En lös navdel kan kräva komponentparti, gjut- eller monteringsperiod och kontrollresultat. Kräv inte full råvarugenealogi om fabriken och underleverantörerna inte kan bevara den. Djupet ska spegla den kedja som faktiskt kan styras.` },
      { heading: "Bevara identiteten vid omarbete, blandpall och ompackning", text: `Ny revision, gummi- eller uretanparti, verktyg, ytbehandling, produktionsplats eller godkänd avvikelse kan utlösa ett nytt parti. Regeln anpassas efter produktens konstruktion; datum och skift kan ingå men ersätter inte en tydlig gräns. Omarbetade enheter behåller ursprungsidentiteten och får ett dokumenterat beslut.

Bulk Supply kan ge flera artiklar och partier på samma pall, samtidigt som ett parti delas över flera kartonger. Etikett och packlista måste behålla förhållandet. Om ett nordiskt lager skapar kit eller etiketterar om ska den interna koden läggas till utan att fabrikspartiet skrivs över.` },
      { heading: "Prova kedjan bakåt och framåt", text: `Välj en färdig kartong och följ den bakåt till artikel, revision, order, viktiga ingångspartier, kontroll och packning. Starta sedan med ett material- eller färdigparti och hitta alla produkter, kartonger, lagerplatser och sändningar. Producerat, kasserat, omarbetat, lagerfört och levererat antal ska kunna stämmas av.

[GS1 Global Traceability Standard](https://ref.gs1.org/standards/global-traceability/) beskriver identifierbara objekt och händelser som grund. För konsumentprodukter i EU förklarar [EU-kommissionens GPSR-vägledning](https://eur-lex.europa.eu/legal-content/SV/TXT/?uri=CELEX:52025XC06233) produktidentitet genom typ, parti, serie eller annat element. Importören bedömer de specifika kraven; ett spårtest ersätter inte en bedömning av överensstämmelse.` },
      { heading: "Lägg fabrikens och köparens ansvar i inköpsunderlaget", text: `ChinaFreeWeight är en fabrik för hantlar, viktskivor, olympiska stänger och kabeltillbehör i OEM-, ODM-, Custom Logo-, Private Label- och Bulk Supply-program. Vi kan granska hur en bekräftad revision, tillverkningsparti, kontrolldata och exportförpackning kan länkas för den aktuella modellen. Möjligt djup beror på konstruktion och leverantörskedja.

Förfrågan anger marknad, modell- och viktmatris, styck- eller pardefinition, parti- eller serienivå, placering, datafält, lagringstid och önskat spårtest. Inköp, kvalitet, lager och service godkänner samma plan innan tryckunderlag och kartonger släpps. Då fungerar identiteten vid mottagning, reklamation och återbeställning.` },
    ],
    table: { heading: "Identitetsmatris för OEM-order", columns: ["Nivå", "Skiljer", "Ska länkas till", "Vanligt avbrott"], rows: [["Artikel + revision", "Godkänd konfiguration", "Ritning, material, märkning, emballage", "Ändring utan revision"], ["Parti", "Definierad tillverkningsgrupp", "Ingångar, process, kontroll", "Okänd partigräns"], ["Serienummer", "En enhet", "Service och historik", "Ingen länk till parti"], ["Kartong/pall", "Logistikenhet", "Artiklar, partier, antal", "Fabrikspartiet skrivs över"], ["Sändning", "En utleverans", "Packlista, mål, partier", "Bara totalantal"]], afterSection: 2 },
    checklist: { heading: "Bekräfta före seriestart", items: ["Artikel och revision", "Regel för nytt parti", "Parti- eller serienivå", "Nödvändiga ingångslänkar", "Delning, blandning och omarbete", "Parti i kontrollprotokoll", "Märkning på produkt och kartong", "Läsbarhet efter användning", "Fält på packlistan", "Ompackningsrutin", "Dataägare och lagringstid", "Bakåt- och framåttest"], afterSection: 5 },
    faqHeading: "Frågor om partispårbarhet", faq: [["Är parti och serienummer samma sak?", "Nej. Partiet beskriver en definierad grupp och serienumret en enhet. De kan kopplas i samma post."], ["Behöver varje hantel ett serienummer?", "Inte automatiskt. Konstruktion, risk, service och marknad avgör. Partinivå räcker ofta när hela länken bevaras."], ["Kan ordernumret vara partinummer?", "Det kan vara en referens men är ofta för brett om ordern innehåller flera revisioner, material eller perioder."], ["Var placeras koden?", "När det är lämpligt på en hållbar plats på produkten och dessutom på emballage och i dokument. Geometri och marknad styr metoden."], ["Hur granskas leverantören?", "Spåra en kartong bakåt och ett parti framåt, och stäm av revision, kontroll, lager, leverans och antal."]],
    linkHeading: "Koppla spårbarhet till godkännande och kontroll", linkLabels: ["Köp hantlar i parti", "Köp viktskivor i parti", "Godkänn OEM-prov", "Planera AQL-kontroll", "Styr återbeställning", "Begär spårbarhetsgenomgång"],
    imageAlt: "Omärkta hantlar, viktskivor, skivstång och kabelhandtag sorterade med färgade partimarkörer vid neutrala kartonger", imageCaption: "Artikel, revision och parti följer samma relation från tillverkningspost till kartong, sändning och mottagning.",
    cta: ["Bestäm partilogiken före etikettgodkännande", "Skicka modeller, marknad, anpassning, emballage och önskat djup. Fabriken föreslår genomförbara fält, märkning och bevis.", "Granska spårbarheten"],
  },
  {
    locale: "it",
    path: "/it/blog/tracciabilita-lotti-pesi-liberi-oem",
    title: "Tracciabilità dei lotti per pesi liberi OEM",
    description: "Collega manubri, dischi, bilancieri e maniglie con revisione, materiali, controlli, colli e spedizione.",
    h1: "Come definire la tracciabilità dei lotti di pesi liberi",
    keyword: "tracciabilità lotti pesi liberi OEM",
    home: "Home",
    library: "Guide",
    eyebrow: "Guida tecnica per importatori, distributori e marchi privati",
    sections: [
      { heading: "Risposta breve: il codice deve recuperare un fascicolo coerente", text: `La tracciabilità permette di partire da un manubrio, un disco, un bilanciere olimpico, una maniglia per cavo o un cartone e risalire ad articolo, revisione, gruppo produttivo, componenti pertinenti, controllo, imballo e spedizione. In direzione opposta, un lotto sospetto di materiale o produzione deve portare a tutti i prodotti, colli e invii coinvolti.

Una sigla stampata non basta. Prima dell'ordine OEM occorre definire quando nasce un nuovo lotto, dove compare, come si registrano divisioni, unioni, rilavorazioni e reimballi, chi custodisce i dati e per quanto tempo. Ordine di produzione, rapporto qualità, etichetta, packing list e ricevimento devono conservare lo stesso collegamento.` },
      { heading: "Distinguere articolo, revisione, lotto, matricola e unità logistica", text: `L'articolo descrive la configurazione venduta; la revisione controlla disegno, materiale, grafica e imballo approvati. Il lotto raggruppa unità con condizioni comuni definite, mentre la matricola identifica un singolo pezzo. Cartone, pallet e spedizione hanno identità logistiche. Nessuno di questi campi dovrebbe sostituire gli altri.

Le [Specifiche Generali GS1](https://ref.gs1.org/standards/genspecs/24.0.0/) assegnano il codice (10) al batch o lotto e il codice (21) alla matricola. Il lotto è un attributo dell'articolo identificato: anche senza un barcode GS1, la combinazione articolo, revisione e lotto deve risultare univoca. Una semplice data non distingue sempre pesi, colori o revisioni prodotti insieme.` },
      { heading: "Scegliere il livello in base al rischio e alla decisione", text: `Il controllo per lotto è spesso proporzionato per manubri fissi, dischi e accessori semplici. Bilancieri riparabili, meccanismi regolabili o gruppi di maggior valore possono richiedere una matricola se l'assistenza deve isolare un'unità. La serializzazione aggiunge marcatura, lettura, archiviazione e riconciliazione, quindi deve produrre un vantaggio operativo reale.

Per indagare un distacco del rivestimento serve il legame con materiale e periodo di processo; per un inserto allentato possono servire lotto dell'inserto, fase di stampaggio o montaggio e controllo. Non si promette una genealogia completa delle materie prime se fabbrica e subfornitori non possono conservarla.` },
      { heading: "Gestire cambi, rilavorazioni, pallet misti e reimballo", text: `Una nuova revisione, un altro lotto di gomma o uretano, un cambio di stampo, utensile, finitura, stabilimento o deroga approvata può aprire un lotto. La regola dipende dalla costruzione; data e turno possono farne parte ma non sostituiscono un confine documentato. La rilavorazione mantiene l'identità originaria e aggiunge esito e quantità.

Nel Bulk Supply un pallet può contenere più articoli e lotti, mentre un lotto può essere diviso tra colli e partenze. Etichetta e packing list devono mantenere tale relazione. Se un magazzino italiano o europeo prepara kit o cambia confezione, il codice interno si aggiunge al lotto di fabbrica senza cancellarlo.` },
      { heading: "Provare la catena all'indietro e in avanti", text: `Scegliere un cartone finito e risalire ad articolo, revisione, ordine, ingressi importanti, decisione ispettiva e imballo. Poi partire da un lotto di materiale o prodotto e trovare ogni prodotto, cartone, ubicazione e spedizione. Quantità prodotte, scartate, rilavorate, a stock e spedite devono essere riconciliate.

Il [GS1 Global Traceability Standard](https://ref.gs1.org/standards/global-traceability/) struttura la catena tramite oggetti ed eventi identificabili. Per i prodotti di consumo nell'UE, la [guida della Commissione sul GPSR](https://eur-lex.europa.eu/legal-content/IT/TXT/?uri=CELEX:52025XC06233) tratta l'identificazione con tipo, lotto, serie o altro elemento. L'importatore verifica gli obblighi applicabili; la prova di ricerca non sostituisce una valutazione di conformità.` },
      { heading: "Inserire le responsabilità nel dossier di acquisto", text: `ChinaFreeWeight è una fabbrica di manubri, dischi, bilancieri olimpici e accessori per cavi per programmi OEM, ODM, Custom Logo, Private Label e Bulk Supply. Possiamo esaminare come collegare revisione confermata, lotto produttivo, evidenze di controllo e imballo export del modello reale. La profondità disponibile dipende da costruzione e filiera.

La richiesta indica mercato, modelli e pesi, definizione pezzo o coppia, livello lotto o matricola, posizione, campi, conservazione e prova desiderata. Acquisti, qualità, magazzino e assistenza approvano lo stesso schema prima di grafica e cartoni. Così l'identità rimane utile a ricevimento, reclamo e riordino.` },
    ],
    table: { heading: "Matrice delle identità nell'ordine OEM", columns: ["Livello", "Distingue", "Collegamento", "Interruzione tipica"], rows: [["Articolo + revisione", "Configurazione approvata", "Disegno, materiale, grafica, imballo", "Cambio senza revisione"], ["Lotto", "Gruppo produttivo definito", "Ingressi, processo, controllo", "Confine non definito"], ["Matricola", "Una unità", "Assistenza e storia", "Nessun legame al lotto"], ["Cartone/pallet", "Unità logistica", "Articoli, lotti, quantità", "Lotto di fabbrica sostituito"], ["Spedizione", "Una uscita", "Packing list, destinazione, lotti", "Solo quantità totale"]], afterSection: 2 },
    checklist: { heading: "Dati da confermare prima della produzione", items: ["Articolo e revisione", "Regola di apertura lotto", "Lotto o matricola", "Ingressi da collegare", "Divisione, unione e rilavorazione", "Lotto nel rapporto di controllo", "Marcatura su prodotto e cartone", "Leggibilità dopo l'uso", "Campi della packing list", "Procedura di reimballo", "Responsabile e conservazione", "Prova indietro e avanti"], afterSection: 5 },
    faqHeading: "Domande sulla tracciabilità dei lotti", faq: [["Lotto e matricola coincidono?", "No. Il lotto identifica un gruppo definito; la matricola una unità. Possono essere collegati nello stesso fascicolo."], ["Ogni manubrio richiede una matricola?", "Non automaticamente. Costruzione, rischio, assistenza e mercato determinano il livello appropriato."], ["Il numero d'ordine può essere il lotto?", "Può essere un riferimento, ma è spesso troppo ampio se comprende revisioni, materiali o periodi diversi."], ["Dove si applica il codice?", "Quando adatto, in un punto durevole del prodotto, e anche su imballo e documenti. Geometria e mercato guidano la scelta."], ["Come verificare il fornitore?", "Tracciare un collo all'indietro e un lotto in avanti, riconciliando revisione, controlli, stock, spedizioni e quantità."]],
    linkHeading: "Collegare tracciabilità, campione e controllo", linkLabels: ["Acquistare manubri all'ingrosso", "Acquistare dischi all'ingrosso", "Approvare il campione OEM", "Pianificare il controllo AQL", "Stabilizzare il riordino", "Richiedere la revisione della tracciabilità"],
    imageAlt: "Manubri, dischi, bilanciere e maniglia senza marchio raggruppati con cartellini colorati vicino a cartoni neutri", imageCaption: "Articolo, revisione e lotto restano collegati dal registro di fabbrica al collo, alla spedizione e al ricevimento.",
    cta: ["Definire il lotto prima di approvare le etichette", "Invia modelli, mercato, personalizzazione, imballo e profondità richiesta. La fabbrica proporrà campi, marcatura ed evidenze realizzabili.", "Rivedere la tracciabilità"],
  },
  {
    locale: "nl",
    path: "/nl/blog/traceerbaarheid-batches-vrije-gewichten-oem",
    title: "Batchtraceerbaarheid voor vrije gewichten bij OEM-inkoop",
    description: "Koppel dumbbells, halterschijven, stangen en kabelgrepen aan revisie, materiaalbatch, inspectie, doos en zending.",
    h1: "Batchtraceerbaarheid voor OEM-vrije gewichten inrichten",
    keyword: "batchtraceerbaarheid vrije gewichten OEM",
    home: "Home",
    library: "Kennisbank",
    eyebrow: "Technische inkoopgids voor importeurs, distributeurs en private labels",
    sections: [
      { heading: "Kort antwoord: een batchcode moet een volledig dossier openen", text: `Traceerbaarheid betekent dat een inkoper vanaf een dumbbell, halterschijf, olympische halterstang, kabelgreep of doos de artikelrevisie, productiegroep, relevante materialen, inspectiebeslissing, verpakking en zending kan terugvinden. Andersom moet een verdachte materiaal- of productiebatch alle betrokken eindbatches, dozen en leveringen opleveren.

Een geprinte code is nog geen keten. Leg vóór vrijgave vast wat een nieuwe batch opent, waar de code staat, hoe splitsen, samenvoegen, herbewerken en ompakken worden geboekt, wie de gegevens beheert en hoe lang ze blijven. Werkorder, kwaliteitsrapport, etiket, paklijst en ontvangstregistratie moeten dezelfde relatie bewaren.` },
      { heading: "Scheid artikel, revisie, batch, serienummer en logistieke eenheid", text: `Het artikel beschrijft de verkochte uitvoering; de revisie beheert tekening, materiaal, bedrukking en verpakking. Een batch groepeert eenheden met vastgelegde gemeenschappelijke omstandigheden. Een serienummer onderscheidt één exemplaar. Doos-, pallet- en zending-ID's ondersteunen de logistiek. Elke laag beantwoordt een andere vraag.

De officiële [GS1 General Specifications](https://ref.gs1.org/standards/genspecs/24.0.0/) gebruiken code (10) voor batch of lot en code (21) voor serienummer. Een batch is een kenmerk van het geïdentificeerde handelsartikel. Ook zonder GS1-barcode moet de combinatie artikel, revisie en batch dus eenduidig zijn; alleen een datum is bij meerdere varianten vaak te grof.` },
      { heading: "Kies de diepte op basis van risico en besluit", text: `Batchniveau is vaak werkbaar voor vaste dumbbells, schijven en eenvoudige accessoires. Onderhoudbare stangen, verstelmechanismen of duurdere assemblages kunnen een serienummer rechtvaardigen wanneer service één exemplaar moet isoleren. Registratie per stuk vraagt extra markering, scanning, opslag en afstemming en hoort een concreet voordeel te geven.

Voor loslatende coating is een link nodig naar coatingmateriaal en procesperiode; voor een losse insert mogelijk naar insertbatch, giet- of assemblageperiode en inspectie. Vraag geen volledige grondstofgenealogie wanneer fabriek en onderleveranciers die niet kunnen aantonen. De diepte volgt de keten die daadwerkelijk beheerst wordt.` },
      { heading: "Behoud identiteit bij herbewerking, gemengde pallets en ompakken", text: `Een nieuwe revisie, rubber- of urethaanbatch, mal, gereedschap, afwerking, locatie of goedgekeurde afwijking kan een nieuwe batch openen. De regel is productspecifiek; datum of ploeg kan erin staan maar vervangt geen definitie. Herbewerkte stuks houden hun oorspronkelijke identiteit en krijgen een vastgelegde status en beslissing.

Bij Bulk Supply kan een pallet meerdere artikelen en batches bevatten, terwijl één batch over dozen of zendingen is verdeeld. Dooslabel en paklijst bewaren artikel, revisie, batch en hoeveelheid. Wanneer een Benelux-magazijn sets maakt of omverpakt, wordt de interne code toegevoegd zonder de fabrieksbatch te wissen.` },
      { heading: "Test de keten achterwaarts en voorwaarts", text: `Kies een gereed karton en traceer terug naar artikel, revisie, productieorder, belangrijke ingangen, inspectie en verpakking. Start daarna bij een materiaal- of eindbatch en zoek alle producten, dozen, voorraadlocaties en zendingen. Geproduceerde, afgekeurde, herbewerkte, opgeslagen en verzonden aantallen moeten aansluiten.

De [GS1 Global Traceability Standard](https://ref.gs1.org/standards/global-traceability/) bouwt deze keten op uit identificeerbare objecten en gebeurtenissen. Voor consumentenproducten in de EU bespreekt de [GPSR-richtsnoer van de Europese Commissie](https://eur-lex.europa.eu/legal-content/NL/TXT/?uri=CELEX:52025XC06233) identificatie via type, batch, serie of ander element. De importeur beoordeelt de toepasselijke plichten; een zoektest bewijst op zichzelf geen conformiteit.` },
      { heading: "Leg verantwoordelijkheden vast in het inkoopdossier", text: `ChinaFreeWeight is een fabriek voor dumbbells, halterschijven, olympische stangen en kabelaccessoires binnen OEM-, ODM-, Custom Logo-, Private Label- en Bulk Supply-programma's. We kunnen per model bekijken hoe bevestigde revisie, productiebatch, inspectiebewijs en exportverpakking worden gekoppeld. De haalbare diepte hangt af van constructie en keten.

De aanvraag noemt markt, modellen en gewichten, stuk- of paarbegrip, batch- of serieniveau, locatie, velden, bewaartermijn en gewenste traceertest. Inkoop, kwaliteit, magazijn en service keuren hetzelfde schema goed vóór artwork en dozen. Zo blijft de identiteit bruikbaar bij ontvangst, klacht en herhaalorder.` },
    ],
    table: { heading: "Identiteitsmatrix voor de OEM-order", columns: ["Niveau", "Onderscheidt", "Te koppelen aan", "Veelvoorkomende breuk"], rows: [["Artikel + revisie", "Goedgekeurde uitvoering", "Tekening, materiaal, artwork, verpakking", "Wijziging zonder revisie"], ["Batch", "Vastgelegde productiegroep", "Ingangen, proces, inspectie", "Batchgrens onbekend"], ["Serienummer", "Eén exemplaar", "Service en historie", "Geen koppeling met batch"], ["Doos/pallet", "Logistieke eenheid", "Artikelen, batches, aantallen", "Fabrieksbatch overschreven"], ["Zending", "Eén uitlevering", "Paklijst, bestemming, batches", "Alleen totaal aantal"]], afterSection: 2 },
    checklist: { heading: "Vastleggen vóór productiestart", items: ["Artikel en revisie", "Regel voor nieuwe batch", "Batch- of serieniveau", "Benodigde ingangslinks", "Splitsen, mengen en herbewerken", "Batch in inspectierapport", "Markering op product en doos", "Leesbaarheid na gebruik", "Velden op de paklijst", "Ompak- en herlabelproces", "Data-eigenaar en bewaartermijn", "Achterwaartse en voorwaartse test"], afterSection: 5 },
    faqHeading: "Vragen over batchtraceerbaarheid", faq: [["Zijn batch en serienummer hetzelfde?", "Nee. Een batch duidt een vastgelegde groep aan en een serienummer één exemplaar. Ze kunnen gekoppeld zijn."], ["Heeft elke dumbbell een serienummer nodig?", "Niet standaard. Constructie, risico, service en markt bepalen het passende niveau."], ["Kan het ordernummer als batch dienen?", "Het kan een referentie zijn, maar is vaak te breed bij meerdere revisies, materialen of productieperioden."], ["Waar komt de code?", "Waar passend duurzaam op het product, en daarnaast op verpakking en in documenten. Geometrie en markt bepalen de methode."], ["Hoe wordt de leverancier getest?", "Traceer een doos terug en een batch vooruit en stem revisie, inspectie, voorraad, zending en aantallen af."]],
    linkHeading: "Koppel traceerbaarheid aan goedkeuring en inspectie", linkLabels: ["Dumbbells inkopen", "Halterschijven inkopen", "OEM-monster goedkeuren", "AQL-inspectie plannen", "Herhaalorders beheersen", "Traceerbaarheid laten beoordelen"],
    imageAlt: "Merkloze dumbbells, schijven, stang en kabelgreep met gekleurde batchmarkeringen naast neutrale dozen", imageCaption: "Artikel, revisie en batch blijven gekoppeld van fabrieksregistratie tot doos, zending en ontvangst.",
    cta: ["Leg de batchlogica vast vóór etiketvrijgave", "Stuur modellen, markt, personalisatie, verpakking en gewenste diepte. De fabriek stelt haalbare velden, markering en bewijzen voor.", "Traceerbaarheid beoordelen"],
  },
  {
    locale: "ar",
    path: "/ar/blog/tatabue-dafaat-awzan-hurra-oem",
    title: "تتبّع دفعات الأوزان الحرة في طلبيات OEM",
    description: "اربط الدمبل وأقراص الأوزان والقضبان ومقابض الكابل بمراجعة المنتج ودفعات المواد والفحص والعبوات والشحنات.",
    h1: "كيفية إعداد تتبّع الدفعات للأوزان الحرة",
    keyword: "تتبع دفعات الأوزان الحرة OEM",
    home: "الرئيسية",
    library: "مركز المعرفة",
    eyebrow: "دليل شراء فني للمستوردين والموزعين والعلامات الخاصة",
    sections: [
      { heading: "الإجابة المباشرة: رقم الدفعة يجب أن يسترجع سجلاً مترابطاً", text: `يعني التتبّع أن يبدأ المشتري من دمبل أو قرص وزن أو قضيب أولمبي أو مقبض كابل أو كرتون، فيصل إلى رمز المنتج والمراجعة ومجموعة التصنيع والمدخلات المهمة وقرار الفحص والتعبئة والشحنة. ويجب أن يعمل المسار العكسي أيضاً: من دفعة مادة أو إنتاج مشتبه بها إلى كل المنتجات والعبوات والشحنات المتأثرة.

الرمز المطبوع وحده ليس نظاماً. قبل إطلاق طلب OEM يجب تحديد الحدث الذي يفتح دفعة جديدة، ومكان العلامة، وكيفية تسجيل التقسيم والدمج وإعادة العمل وإعادة التعبئة، ومن يملك البيانات ومدة حفظها. أمر الإنتاج وتقرير الجودة وملصق الكرتون وقائمة التعبئة وسجل الاستلام يجب أن تحتفظ بالعلاقة نفسها.` },
      { heading: "افصل بين الصنف والمراجعة والدفعة والرقم التسلسلي ووحدة الشحن", text: `يصف رمز الصنف التكوين المباع، وتضبط المراجعة الرسم والمواد والشعار والعبوة المعتمدة. تجمع الدفعة وحدات صنعت ضمن شروط مشتركة محددة، بينما يميز الرقم التسلسلي وحدة واحدة. أما أرقام الكرتون والطبلية والشحنة فتخدم الحركة اللوجستية. لكل مستوى وظيفة مختلفة.

تخصص [المواصفات العامة لنظام GS1](https://ref.gs1.org/standards/genspecs/24.0.0/) الرمز (10) للدفعة والرمز (21) للرقم التسلسلي، ويعامل النظام الدفعة كصفة لصنف تجاري محدد. حتى من دون باركود GS1 يجب أن تكون تركيبة الصنف والمراجعة والدفعة غير ملتبسة؛ فالتاريخ وحده قد لا يفرق بين أوزان أو ألوان أو مراجعات متعددة.` },
      { heading: "اختر مستوى التتبّع حسب المخاطر والقرار المطلوب", text: `غالباً ما يناسب مستوى الدفعة الدمبل الثابت والأقراص وملحقات الكابل البسيطة. وقد يبرر القضيب القابل للصيانة أو آلية الضبط أو التجميع الأعلى قيمة رقماً تسلسلياً عندما تتطلب الخدمة عزل وحدة بعينها. التسجيل لكل قطعة يزيد أعمال الوسم والمسح والتخزين والمطابقة، فلا يعتمد إلا إذا حسن القرار فعلياً.

التحقيق في تقشر الطلاء يحتاج رابطاً إلى مادة الطلاء وفترة العملية، أما ارتخاء الجزء الداخلي فقد يحتاج دفعة الجزء وفترة القولبة أو التجميع ونتيجة الفحص. لا ينبغي طلب تسلسل كامل لكل مادة خام إن لم تستطع المصنع وسلسلة الموردين إثباته وحفظه.` },
      { heading: "احفظ الهوية عند إعادة العمل وخلط الطبالي وإعادة التعبئة", text: `قد تفتح مراجعة جديدة أو دفعة مطاط أو يوريثان مختلفة أو تغيير القالب أو الأداة أو التشطيب أو الموقع أو الانحراف المعتمد دفعة جديدة. توضع القاعدة وفق بنية المنتج؛ ويمكن إدخال التاريخ أو الوردية فيها لكنهما لا يغنيان عن حد واضح. تحتفظ القطع المعاد عملها بهويتها الأصلية مع تسجيل الحالة والكمية.

قد تحتوي طبلية Bulk Supply على أصناف ودفعات متعددة، وقد توزع دفعة واحدة على عدة كراتين أو شحنات. يجب أن يحفظ ملصق الكرتون وقائمة التعبئة الصنف والمراجعة والدفعة والكمية. وإذا أعاد مستودع في سوق الوجهة تكوين طقم أو تغيير العبوة، يضاف رمزه الداخلي من دون مسح دفعة المصنع.` },
      { heading: "اختبر السلسلة إلى الخلف وإلى الأمام", text: `اختر كرتوناً نهائياً وتتبعه إلى الصنف والمراجعة وأمر الإنتاج والمدخلات المهمة والفحص والتعبئة. ثم ابدأ من دفعة مادة أو منتج وابحث عن كل المنتجات والكراتين ومواقع المخزون والشحنات. يجب مطابقة الكميات المنتجة والمرفوضة والمعاد عملها والمخزنة والمشحونة.

يبني [معيار GS1 العالمي للتتبّع](https://ref.gs1.org/standards/global-traceability/) السلسلة حول أشياء وأحداث قابلة للتعريف. وبالنسبة للسلع الاستهلاكية في الاتحاد الأوروبي، يشرح [دليل المفوضية بشأن GPSR](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:52025XC06233) التعريف بالنوع أو الدفعة أو السلسلة أو عنصر آخر. يتحقق المستورد من المتطلبات الفعلية؛ واختبار الاسترجاع لا يثبت المطابقة وحده.` },
      { heading: "ضع مسؤوليات المصنع والمشتري في ملف الشراء", text: `ChinaFreeWeight مصنع للدمبل وأقراص الأوزان والقضبان الأولمبية وملحقات الكابل ضمن برامج OEM وODM وCustom Logo وPrivate Label وBulk Supply. يمكننا مراجعة طريقة ربط المراجعة المؤكدة ودفعة الإنتاج وأدلة الفحص وعبوة التصدير للموديل الفعلي. يعتمد العمق الممكن على البناء وسلسلة الإمداد.

يحدد طلب السعر السوق والموديلات والأوزان وتعريف القطعة أو الزوج ومستوى الدفعة أو التسلسل ومكان الوسم والحقول ومدة الحفظ واختبار الاسترجاع. تعتمد أقسام الشراء والجودة والمخزن والخدمة المخطط نفسه قبل إقرار الرسوم والكراتين، ليبقى الرمز نافعاً عند الاستلام والمطالبة وإعادة الطلب.` },
    ],
    table: { heading: "مصفوفة الهوية لطلب OEM", columns: ["المستوى", "ما يميزه", "الرابط المطلوب", "فجوة شائعة"], rows: [["الصنف + المراجعة", "تكوين معتمد", "رسم ومواد وشعار وعبوة", "تغيير بلا مراجعة"], ["الدفعة", "مجموعة إنتاج محددة", "مدخلات وعملية وفحص", "حد الدفعة غير معروف"], ["الرقم التسلسلي", "وحدة واحدة", "خدمة وتاريخ", "لا رابط بالدفعة"], ["كرتون/طبلية", "وحدة لوجستية", "أصناف ودفعات وكميات", "مسح دفعة المصنع"], ["الشحنة", "حدث إرسال", "قائمة تعبئة ووجهة ودفعات", "إجمالي كمية فقط"]], afterSection: 2 },
    checklist: { heading: "ما يجب تثبيته قبل الإنتاج", items: ["رمز الصنف والمراجعة", "قاعدة فتح دفعة", "مستوى دفعة أو تسلسل", "المدخلات المرتبطة", "التقسيم والخلط وإعادة العمل", "الدفعة في تقرير الفحص", "الوسم على المنتج والكرتون", "وضوح الرمز بعد الاستخدام", "حقول قائمة التعبئة", "إجراء إعادة التعبئة", "مالك البيانات ومدة الحفظ", "اختبار خلفي وأمامي"], afterSection: 5 },
    faqHeading: "أسئلة المشترين عن تتبّع الدفعات", faq: [["هل الدفعة والرقم التسلسلي شيء واحد؟", "لا. الدفعة تعرف مجموعة محددة، والرقم التسلسلي يعرف وحدة واحدة. ويمكن ربطهما في السجل نفسه."], ["هل يحتاج كل دمبل إلى رقم تسلسلي؟", "ليس بالضرورة. يحدد البناء والمخاطر والخدمة والسوق المستوى المناسب."], ["هل يصلح رقم أمر الشراء كدفعة؟", "قد يكون مرجعاً، لكنه غالباً واسع إذا شمل مراجعات أو مواد أو فترات إنتاج متعددة."], ["أين يوضع الرمز؟", "عندما يلائم المنتج يوضع في موضع دائم، ويحفظ كذلك على العبوة وفي المستندات. تحدد الهندسة والسوق الطريقة."], ["كيف يختبر المشتري المورد؟", "يتتبع كرتوناً إلى الخلف ودفعة إلى الأمام، ثم يطابق المراجعة والفحص والمخزون والشحنة والكميات."]],
    linkHeading: "اربط التتبّع بالموافقة والفحص", linkLabels: ["شراء الدمبل بالجملة", "شراء أقراص الأوزان", "اعتماد عينة OEM", "تخطيط فحص AQL", "ضبط إعادة الطلب", "طلب مراجعة التتبّع"],
    imageAlt: "دمبل وأقراص وقضيب ومقبض كابل بلا علامات تجارية مصنفة ببطاقات دفعات ملونة قرب كراتين محايدة", imageCaption: "تبقى علاقة الصنف والمراجعة والدفعة محفوظة من سجل المصنع إلى الكرتون والشحنة والاستلام.",
    cta: ["حدد منطق الدفعة قبل اعتماد الملصق", "أرسل الموديلات والسوق والتخصيص والعبوة وعمق التتبّع المطلوب. يقترح المصنع حقولاً ووسماً وأدلة قابلة للتنفيذ.", "مراجعة التتبّع"],
  },
  {
    locale: "ko",
    path: "/ko/blog/oem-free-weight-lot-traceability",
    title: "OEM 프리웨이트 로트 추적성 설계 가이드",
    description: "덤벨, 원판, 바벨과 케이블 핸들을 제품 개정, 자재 로트, 검사, 포장 상자와 출하 기록에 연결하여 구매 위험을 체계적으로 줄이는 방법입니다.",
    h1: "프리웨이트 생산 로트 추적성을 설계하는 방법",
    keyword: "프리웨이트 로트 추적성 OEM",
    home: "홈",
    library: "구매 가이드",
    eyebrow: "수입사, 유통사, 자체 브랜드를 위한 기술 구매 가이드",
    sections: [
      { heading: "핵심 답변: 로트 코드는 연결된 기록을 찾아야 합니다", text: `로트 추적성이란 덤벨, 중량 원판, 올림픽 바벨, 케이블 핸들 또는 상자에서 시작해 품목과 개정판, 생산 그룹, 관련 자재, 검사 판정, 포장과 출하를 찾는 능력입니다. 반대 방향도 작동해야 합니다. 의심되는 자재나 생산 로트에서 영향을 받는 완제품 로트, 상자와 출하 내역을 모두 찾아야 합니다.

인쇄된 문자열만으로는 추적 체계가 되지 않습니다. OEM 주문 승인 전에 새 로트를 여는 조건, 표시 위치, 분할·병합·재작업·재포장 기록 방식, 데이터 책임자와 보존 기간을 정합니다. 생산 지시서, 품질 기록, 상자 라벨, 패킹리스트와 입고 기록이 같은 관계를 유지해야 합니다.` },
      { heading: "품목, 개정판, 로트, 일련번호와 물류 단위를 구분합니다", text: `품목은 판매 구성을 나타내고 개정판은 승인된 도면, 자재, 로고와 포장을 통제합니다. 로트는 정의된 공통 조건에서 생산된 단위를 묶고, 일련번호는 개별 제품 하나를 구분합니다. 상자, 팔레트와 출하 번호는 물류 단위입니다. 서로 다른 질문에 답하므로 한 번호로 대체하지 않습니다.

[GS1 일반 사양](https://ref.gs1.org/standards/genspecs/24.0.0/)은 코드 (10)을 배치 또는 로트에, 코드 (21)을 일련번호에 배정합니다. 로트는 식별된 상품의 속성이므로 품목과 함께 해석합니다. GS1 바코드를 쓰지 않더라도 품목, 개정판과 로트의 조합은 유일해야 하며, 날짜만으로 여러 중량과 버전을 구분하기는 어렵습니다.` },
      { heading: "제품 위험과 의사결정에 맞는 깊이를 선택합니다", text: `고정형 덤벨, 원판과 단순 액세서리는 로트 단위 관리가 실용적인 경우가 많습니다. 수리가 가능한 바벨, 조절 기구 또는 고가 조립품은 서비스가 한 제품을 특정해야 할 때 일련번호가 유용할 수 있습니다. 개별 기록은 표시, 스캔, 저장과 수량 대조 업무를 늘리므로 실제 범위 축소에 도움이 될 때 선택합니다.

코팅 박리를 조사하려면 완제품 로트를 코팅 자재와 공정 기간에 연결해야 합니다. 인서트 이탈은 인서트 로트, 성형 또는 조립 기간과 검사 결과가 필요할 수 있습니다. 공장과 하위 공급사가 보존할 수 없는 전체 원자재 계보를 약속하지 않습니다.` },
      { heading: "재작업, 혼합 팔레트와 재포장에서도 원래 식별을 보존합니다", text: `개정판, 고무 또는 우레탄 로트, 금형, 공구, 표면 처리, 생산 장소나 승인된 편차가 바뀌면 새 로트를 열 수 있습니다. 조건은 제품 구조에 맞게 정하고 날짜나 교대조만으로 대신하지 않습니다. 재작업품은 원래 로트를 유지하면서 처리 상태와 판정을 추가합니다.

Bulk Supply에서는 한 팔레트에 여러 품목과 로트가 섞이거나 한 로트가 여러 상자와 출하로 나뉠 수 있습니다. 상자 라벨과 패킹리스트는 품목, 개정판, 로트와 수량 관계를 보존합니다. 국내 창고에서 세트를 만들거나 라벨을 바꿀 때 내부 번호를 추가하되 공장 로트를 덮어쓰지 않습니다.` },
      { heading: "역방향과 순방향 추적 시험을 수행합니다", text: `완제품 상자 하나를 골라 품목, 개정판, 생산 지시, 주요 투입 로트, 검사 판정과 포장 기록으로 거슬러 올라갑니다. 다음에는 자재 또는 완제품 로트 하나에서 모든 제품, 상자, 재고 위치와 출하를 찾습니다. 생산, 폐기, 재작업, 재고와 출하 수량이 맞아야 합니다.

[GS1 글로벌 추적성 표준](https://ref.gs1.org/standards/global-traceability/)은 식별 가능한 대상과 이벤트로 이 관계를 설명합니다. EU 소비재의 경우 [유럽연합 집행위원회 GPSR 안내](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:52025XC06233)가 유형, 배치, 일련번호 또는 다른 식별 요소를 다룹니다. 수입자는 목적지 의무를 별도로 확인해야 하며, 추적 시험만으로 적합성이 입증되지는 않습니다.` },
      { heading: "공장과 구매자의 책임을 발주 문서에 넣습니다", text: `ChinaFreeWeight는 덤벨, 중량 원판, 올림픽 바벨과 케이블 액세서리의 OEM, ODM, Custom Logo, Private Label, Bulk Supply 프로젝트를 지원하는 공장입니다. 실제 모델의 승인 개정판, 생산 로트, 검사 증거와 수출 포장을 어떻게 연결할지 검토할 수 있습니다. 가능한 깊이는 구조와 공급망에 따라 달라집니다.

견적 요청서에 시장, 모델과 중량, 낱개 또는 쌍 기준, 로트 또는 일련번호 수준, 위치, 데이터 필드, 보존 기간과 추적 시험을 적습니다. 구매, 품질, 창고와 서비스 부서가 아트워크와 상자를 승인하기 전에 같은 구조를 확인하면 입고, 클레임과 재주문 때도 번호가 작동합니다.` },
    ],
    table: { heading: "OEM 주문 식별 체계", columns: ["단계", "구분 대상", "연결 기록", "흔한 단절"], rows: [["품목 + 개정판", "승인된 구성", "도면, 자재, 로고, 포장", "개정 없는 변경"], ["로트", "정의된 생산 그룹", "투입, 공정, 검사", "경계가 불분명"], ["일련번호", "개별 제품", "서비스와 이력", "로트와 미연결"], ["상자/팔레트", "물류 단위", "품목, 로트, 수량", "공장 로트 덮어쓰기"], ["출하", "출고 이벤트", "패킹리스트, 목적지, 로트", "총수량만 기록"]], afterSection: 2 },
    checklist: { heading: "생산 전에 확정할 항목", items: ["품목과 개정판", "새 로트 생성 규칙", "로트 또는 일련번호 수준", "연결할 투입 자재", "분할, 혼합과 재작업", "검사 보고서의 로트", "제품과 상자 표시", "사용 후 가독성", "패킹리스트 필드", "재포장 절차", "데이터 책임과 보존", "역방향·순방향 시험"], afterSection: 5 },
    faqHeading: "로트 추적성 구매 질문", faq: [["로트와 일련번호는 같습니까?", "아닙니다. 로트는 정의된 그룹, 일련번호는 개별 제품을 식별합니다. 두 단계는 연결할 수 있습니다."], ["모든 덤벨에 일련번호가 필요합니까?", "항상 그렇지는 않습니다. 구조, 위험, 서비스와 시장 의무에 맞춰 수준을 선택합니다."], ["발주 번호를 로트로 쓸 수 있습니까?", "참조로는 쓸 수 있지만 여러 개정판, 자재 또는 생산 기간을 포함하면 너무 넓습니다."], ["코드는 어디에 표시합니까?", "적합한 경우 제품의 내구성 있는 위치에 두고 포장과 문서에도 유지합니다. 구조와 시장이 방법을 결정합니다."], ["공급사를 어떻게 시험합니까?", "상자 하나를 역추적하고 로트 하나를 순추적한 뒤 개정판, 검사, 재고, 출하와 수량을 대조합니다."]],
    linkHeading: "추적성을 샘플 승인과 검사에 연결하기", linkLabels: ["덤벨 대량 구매", "원판 대량 구매", "OEM 샘플 승인", "AQL 검사 계획", "재주문 일관성 관리", "추적성 검토 요청"],
    imageAlt: "브랜드 표시 없는 덤벨, 원판, 바벨과 케이블 핸들이 중립 상자 옆에서 색상 로트 태그로 구분된 모습", imageCaption: "품목, 개정판과 로트의 관계가 공장 기록부터 상자, 출하와 입고까지 유지됩니다.",
    cta: ["라벨 승인 전에 로트 구조를 정하세요", "모델, 시장, 맞춤 사양, 포장과 필요한 깊이를 보내 주십시오. 공장이 실행 가능한 필드, 표시와 증거를 제안합니다.", "추적성 검토하기"],
  },
  {
    locale: "id",
    path: "/id/blog/ketertelusuran-batch-beban-bebas-oem",
    title: "Ketertelusuran batch untuk beban bebas OEM",
    description: "Hubungkan dumbbell, weight plate, bar dan cable handle ke revisi, batch bahan, inspeksi, karton dan pengiriman.",
    h1: "Cara merancang ketertelusuran batch beban bebas",
    keyword: "ketertelusuran batch beban bebas OEM",
    home: "Beranda",
    library: "Panduan",
    eyebrow: "Panduan pembelian teknis untuk importir, distributor dan merek privat",
    sections: [
      { heading: "Jawaban singkat: kode batch harus membuka catatan yang terhubung", text: `Ketertelusuran berarti pembeli dapat memulai dari dumbbell, weight plate, Olympic bar, cable handle atau karton lalu menemukan kode produk, revisi, kelompok produksi, input penting, keputusan inspeksi, pengemasan dan pengiriman. Arah sebaliknya juga harus bekerja: batch bahan atau produksi yang dicurigai harus menunjukkan semua batch jadi, karton dan pengiriman yang terdampak.

Kode tercetak belum menjadi rantai. Sebelum pesanan OEM dilepas, tentukan kejadian yang membuka batch baru, lokasi penandaan, cara mencatat pembagian, penggabungan, pengerjaan ulang dan pengemasan ulang, pemilik data serta masa simpan. Perintah kerja, laporan mutu, label karton, daftar kemasan dan penerimaan harus mempertahankan hubungan yang sama.` },
      { heading: "Pisahkan SKU, revisi, batch, nomor seri dan unit logistik", text: `SKU menjelaskan konfigurasi jual; revisi mengendalikan gambar, bahan, logo dan kemasan yang disetujui. Batch mengelompokkan unit dengan kondisi produksi bersama yang ditetapkan. Nomor seri membedakan satu unit. ID karton, palet dan pengiriman mengatur logistik. Setiap tingkat menjawab pertanyaan berbeda dan tidak boleh saling menggantikan.

[Spesifikasi Umum GS1](https://ref.gs1.org/standards/genspecs/24.0.0/) menggunakan kode (10) untuk batch atau lot dan kode (21) untuk nomor seri. Batch merupakan atribut barang dagang yang teridentifikasi. Tanpa barcode GS1 pun kombinasi SKU, revisi dan batch harus unik; kode tanggal saja sering tidak cukup ketika beberapa berat atau versi dibuat bersamaan.` },
      { heading: "Pilih kedalaman berdasarkan risiko dan keputusan", text: `Tingkat batch sering praktis untuk dumbbell tetap, plate dan aksesori sederhana. Bar yang dapat diservis, mekanisme adjustable atau rakitan bernilai lebih tinggi mungkin memerlukan nomor seri jika layanan harus mengisolasi satu unit. Pencatatan per unit menambah penandaan, pemindaian, penyimpanan dan rekonsiliasi, sehingga harus memberi manfaat nyata.

Masalah lapisan membutuhkan tautan ke bahan pelapis dan periode proses. Insert longgar mungkin memerlukan batch insert, periode molding atau perakitan dan hasil inspeksi. Jangan menjanjikan silsilah seluruh bahan baku jika pabrik dan subpemasok tidak dapat mempertahankan bukti tersebut.` },
      { heading: "Pertahankan identitas saat pengerjaan ulang, palet campuran dan pengemasan ulang", text: `Revisi baru, batch karet atau urethane berbeda, perubahan mold, tool, penyelesaian permukaan, lokasi atau deviasi yang disetujui dapat membuka batch baru. Aturannya mengikuti konstruksi; tanggal atau shift dapat menjadi bagian tetapi bukan pengganti batas yang jelas. Unit yang dikerjakan ulang mempertahankan identitas awal dan menambahkan status serta keputusan.

Dalam Bulk Supply, satu palet dapat memuat beberapa SKU dan batch, sedangkan satu batch dapat terbagi ke beberapa karton atau keberangkatan. Label karton dan daftar kemasan menjaga SKU, revisi, batch dan kuantitas. Jika gudang Indonesia membuat kit atau mengganti kemasan, ID internal ditambahkan tanpa menimpa batch pabrik.` },
      { heading: "Uji rantai ke belakang dan ke depan", text: `Pilih satu karton jadi dan telusuri ke SKU, revisi, perintah produksi, input penting, keputusan inspeksi dan pengemasan. Lalu mulai dari satu batch bahan atau barang jadi dan cari seluruh produk, karton, lokasi stok dan pengiriman. Jumlah produksi, penolakan, pengerjaan ulang, stok dan kirim harus dapat direkonsiliasi.

[GS1 Global Traceability Standard](https://ref.gs1.org/standards/global-traceability/) menyusun rantai dari objek dan kejadian yang dapat diidentifikasi. Untuk barang konsumen di Uni Eropa, [panduan GPSR Komisi Eropa](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:52025XC06233) membahas identitas melalui tipe, batch, seri atau elemen lain. Importir memeriksa kewajiban pasar; uji penelusuran bukan bukti kepatuhan dengan sendirinya.` },
      { heading: "Masukkan tanggung jawab pabrik dan pembeli ke berkas pembelian", text: `ChinaFreeWeight adalah pabrik dumbbell, weight plate, Olympic bar dan cable attachment untuk program OEM, ODM, Custom Logo, Private Label dan Bulk Supply. Kami dapat meninjau cara menghubungkan revisi yang dikonfirmasi, batch produksi, bukti inspeksi dan kemasan ekspor pada model aktual. Kedalaman yang layak bergantung pada konstruksi dan rantai pasok.

Permintaan penawaran menyebut pasar, model dan rentang berat, definisi unit atau pasangan, tingkat batch atau seri, lokasi, bidang data, masa simpan dan uji yang diminta. Tim pembelian, mutu, gudang dan layanan menyetujui struktur yang sama sebelum rancangan grafis dan karton dilepas, agar identitas berguna saat penerimaan, klaim dan pesanan ulang.` },
    ],
    table: { heading: "Matriks identitas pesanan OEM", columns: ["Tingkat", "Yang dibedakan", "Tautan", "Putus yang umum"], rows: [["SKU + revisi", "Konfigurasi disetujui", "Gambar, bahan, logo, kemasan", "Perubahan tanpa revisi"], ["Batch", "Kelompok produksi", "Input, proses, inspeksi", "Batas batch tidak jelas"], ["Nomor seri", "Satu unit", "Layanan dan riwayat", "Tidak terkait batch"], ["Karton/palet", "Unit logistik", "SKU, batch, kuantitas", "Batch pabrik tertimpa"], ["Pengiriman", "Satu pelepasan", "Daftar kemasan, tujuan, batch", "Hanya total jumlah"]], afterSection: 2 },
    checklist: { heading: "Tetapkan sebelum produksi", items: ["SKU dan revisi", "Aturan batch baru", "Tingkat batch atau seri", "Input yang harus terhubung", "Pembagian, campuran dan pengerjaan ulang", "Batch dalam laporan inspeksi", "Tanda pada produk dan karton", "Keterbacaan setelah penggunaan", "Bidang daftar kemasan", "Prosedur pengemasan ulang", "Pemilik data dan masa simpan", "Uji mundur dan maju"], afterSection: 5 },
    faqHeading: "Pertanyaan pembeli tentang batch", faq: [["Apakah batch sama dengan nomor seri?", "Tidak. Batch mengidentifikasi kelompok yang ditentukan; nomor seri mengidentifikasi satu unit. Keduanya dapat dihubungkan."], ["Apakah setiap dumbbell perlu nomor seri?", "Tidak otomatis. Konstruksi, risiko, model layanan dan pasar menentukan tingkat yang tepat."], ["Dapatkah nomor PO menjadi batch?", "Bisa menjadi referensi, tetapi sering terlalu luas jika memuat beberapa revisi, bahan atau periode produksi."], ["Di mana kode ditempatkan?", "Bila sesuai, pada lokasi tahan lama di produk, serta pada kemasan dan dokumen. Geometri dan pasar menentukan metode."], ["Bagaimana menguji pemasok?", "Telusuri satu karton ke belakang dan satu batch ke depan, lalu cocokkan revisi, inspeksi, stok, pengiriman dan jumlah."]],
    linkHeading: "Hubungkan ketertelusuran dengan persetujuan dan inspeksi", linkLabels: ["Sumber dumbbell grosir", "Sumber weight plate grosir", "Setujui sampel OEM", "Rencanakan inspeksi AQL", "Kendalikan pesanan ulang", "Minta tinjauan ketertelusuran"],
    imageAlt: "Dumbbell, plate, bar dan cable handle tanpa merek dikelompokkan dengan tag batch berwarna di dekat karton polos", imageCaption: "Hubungan SKU, revisi dan batch dipertahankan dari catatan pabrik sampai karton, pengiriman dan penerimaan.",
    cta: ["Tetapkan logika batch sebelum label disetujui", "Kirim model, pasar, kustomisasi, kemasan dan kedalaman yang dibutuhkan. Pabrik akan mengusulkan bidang, penandaan dan bukti yang dapat dijalankan.", "Tinjau ketertelusuran"],
  },
  {
    locale: "pl",
    path: "/pl/blog/identyfikowalnosc-partii-wolne-ciezary-oem",
    title: "Identyfikowalność partii wolnych ciężarów OEM",
    description: "Połącz hantle, talerze, gryfy i uchwyty z rewizją, partiami materiału, kontrolą, kartonami i wysyłką.",
    h1: "Jak zaplanować identyfikowalność partii wolnych ciężarów",
    keyword: "identyfikowalność partii wolne ciężary OEM",
    home: "Strona główna",
    library: "Poradniki",
    eyebrow: "Techniczny poradnik zakupowy dla importerów, dystrybutorów i marek własnych",
    sections: [
      { heading: "Krótka odpowiedź: numer partii musi otwierać spójny zapis", text: `Identyfikowalność pozwala zacząć od hantla, talerza, gryfu olimpijskiego, uchwytu linki lub kartonu i odnaleźć indeks, rewizję, grupę produkcyjną, istotne materiały, decyzję kontroli, pakowanie i wysyłkę. Droga odwrotna musi wskazać wszystkie wyroby, kartony i wysyłki związane z podejrzaną partią materiału lub produkcji.

Sam nadruk nie tworzy łańcucha. Przed zwolnieniem zamówienia OEM należy określić, co otwiera nową partię, gdzie jest oznaczenie, jak rejestrować podział, łączenie, poprawki i przepakowanie, kto odpowiada za dane oraz jak długo są przechowywane. Zlecenie, raport jakości, etykieta, packing list i przyjęcie muszą zachować tę samą relację.` },
      { heading: "Rozdziel indeks, rewizję, partię, numer seryjny i jednostkę logistyczną", text: `Indeks opisuje sprzedawaną konfigurację, a rewizja kontroluje zatwierdzony rysunek, materiał, logo i opakowanie. Partia grupuje sztuki wykonane w określonych wspólnych warunkach. Numer seryjny odróżnia jedną sztukę. Identyfikator kartonu, palety i wysyłki obsługuje logistykę. Każdy poziom odpowiada na inne pytanie.

Oficjalne [Specyfikacje Ogólne GS1](https://ref.gs1.org/standards/genspecs/24.0.0/) przypisują kod (10) do batch lub lot, a kod (21) do numeru seryjnego. Partia jest atrybutem zidentyfikowanego produktu. Nawet bez kodu GS1 kombinacja indeksu, rewizji i partii powinna być jednoznaczna; sama data bywa za szeroka dla wielu wariantów.` },
      { heading: "Dobierz poziom do ryzyka i decyzji", text: `Poziom partii jest często praktyczny dla stałych hantli, talerzy i prostych akcesoriów. Serwisowany gryf, mechanizm regulowany lub droższy zespół może uzasadniać numer seryjny, jeśli reklamacja musi wskazać jedną sztukę. Rejestracja jednostkowa zwiększa nakład oznaczania, skanowania, przechowywania i uzgadniania, więc powinna realnie zawężać działanie.

Odspojenie powłoki wymaga połączenia z materiałem i okresem procesu. Luźna tuleja może wymagać partii komponentu, okresu formowania lub montażu i wyniku kontroli. Nie należy obiecywać pełnej genealogii surowców, jeżeli fabryka i poddostawcy nie są w stanie jej zachować.` },
      { heading: "Zachowaj tożsamość przy poprawkach, paletach mieszanych i przepakowaniu", text: `Nowa rewizja, partia gumy lub uretanu, zmiana formy, narzędzia, wykończenia, lokalizacji albo zatwierdzone odstępstwo może otworzyć nową partię. Reguła zależy od konstrukcji; data lub zmiana robocza może być jej częścią, lecz nie zastępuje granicy. Sztuki poprawiane zachowują pierwotną tożsamość oraz zapis wyniku.

W Bulk Supply paleta może zawierać kilka indeksów i partii, a jedna partia może trafić do wielu kartonów lub wysyłek. Etykieta i packing list zachowują indeks, rewizję, partię i ilość. Gdy magazyn w Polsce lub UE tworzy zestaw albo przepakowuje, jego kod dodaje się bez usuwania partii fabrycznej.` },
      { heading: "Przetestuj łańcuch wstecz i naprzód", text: `Wybierz gotowy karton i prześledź go do indeksu, rewizji, zlecenia, ważnych wejść, decyzji kontroli i pakowania. Następnie zacznij od partii materiału lub wyrobu i znajdź wszystkie produkty, kartony, lokalizacje zapasu i wysyłki. Ilości wyprodukowane, odrzucone, poprawione, przechowywane i wysłane powinny się uzgadniać.

[GS1 Global Traceability Standard](https://ref.gs1.org/standards/global-traceability/) opisuje ten łańcuch przez identyfikowalne obiekty i zdarzenia. Dla produktów konsumenckich w UE [wytyczne Komisji dotyczące GPSR](https://eur-lex.europa.eu/legal-content/PL/TXT/?uri=CELEX:52025XC06233) omawiają typ, partię, serię lub inny element identyfikacyjny. Importer ocenia właściwe obowiązki; próba wyszukania nie dowodzi sama w sobie zgodności.` },
      { heading: "Zapisz odpowiedzialność fabryki i kupującego w dokumentacji", text: `ChinaFreeWeight jest fabryką hantli, talerzy, gryfów olimpijskich i akcesoriów wyciągowych dla programów OEM, ODM, Custom Logo, Private Label i Bulk Supply. Możemy sprawdzić, jak połączyć potwierdzoną rewizję, partię produkcyjną, dowody kontroli i opakowanie eksportowe konkretnego modelu. Dostępny poziom zależy od konstrukcji i łańcucha dostaw.

Zapytanie podaje rynek, modele i zakresy wag, definicję sztuki lub pary, poziom partii lub serii, miejsce oznaczenia, pola danych, retencję i oczekiwaną próbę. Zakupy, jakość, magazyn i serwis zatwierdzają jeden schemat przed artworkiem i kartonami, aby identyfikacja działała przy odbiorze, reklamacji i domówieniu.` },
    ],
    table: { heading: "Matryca identyfikacji zamówienia OEM", columns: ["Poziom", "Co rozróżnia", "Oczekiwane połączenie", "Typowa luka"], rows: [["Indeks + rewizja", "Zatwierdzona konfiguracja", "Rysunek, materiał, logo, opakowanie", "Zmiana bez rewizji"], ["Partia", "Określona grupa produkcyjna", "Wejścia, proces, kontrola", "Nieznana granica"], ["Numer seryjny", "Jedna sztuka", "Serwis i historia", "Brak powiązania z partią"], ["Karton/paleta", "Jednostka logistyczna", "Indeksy, partie, ilości", "Nadpisana partia fabryczna"], ["Wysyłka", "Jedno wydanie", "Packing list, cel, partie", "Tylko suma ilości"]], afterSection: 2 },
    checklist: { heading: "Ustalenia przed startem produkcji", items: ["Indeks i rewizja", "Reguła nowej partii", "Poziom partii lub serii", "Wymagane powiązania wejść", "Podział, mieszanie i poprawki", "Partia w raporcie kontroli", "Oznaczenie produktu i kartonu", "Czytelność po użytkowaniu", "Pola packing list", "Proces przepakowania", "Właściciel danych i retencja", "Próba wstecz i naprzód"], afterSection: 5 },
    faqHeading: "Pytania o identyfikowalność partii", faq: [["Czy partia i numer seryjny są tym samym?", "Nie. Partia identyfikuje określoną grupę, a numer seryjny jedną sztukę. Oba poziomy można połączyć."], ["Czy każdy hantel wymaga numeru seryjnego?", "Nie zawsze. Konstrukcja, ryzyko, serwis i rynek wyznaczają właściwy poziom."], ["Czy numer zamówienia może być partią?", "Może być referencją, ale bywa za szeroki, gdy obejmuje kilka rewizji, materiałów lub okresów."], ["Gdzie umieścić kod?", "Gdy to właściwe, w trwałym miejscu na produkcie, a także na opakowaniu i w dokumentach. Geometria i rynek określają metodę."], ["Jak sprawdzić dostawcę?", "Prześledzić karton wstecz i partię naprzód, uzgadniając rewizję, kontrolę, zapas, wysyłkę i ilości."]],
    linkHeading: "Połącz identyfikowalność z zatwierdzeniem i kontrolą", linkLabels: ["Kup hurtowo hantle", "Kup hurtowo talerze", "Zatwierdź próbkę OEM", "Zaplanuj kontrolę AQL", "Kontroluj domówienia", "Poproś o przegląd identyfikowalności"],
    imageAlt: "Hantle, talerze, gryf i uchwyt bez marki pogrupowane kolorowymi znacznikami partii przy neutralnych kartonach", imageCaption: "Indeks, rewizja i partia pozostają połączone od zapisu fabrycznego do kartonu, wysyłki i odbioru.",
    cta: ["Ustal logikę partii przed zatwierdzeniem etykiety", "Prześlij modele, rynek, personalizację, opakowanie i wymagany poziom. Fabryka zaproponuje wykonalne pola, oznaczenie i dowody.", "Przejrzyj identyfikowalność"],
  },
];
