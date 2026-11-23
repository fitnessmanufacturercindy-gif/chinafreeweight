import type { FreeWeightPaymentTermsCopy } from "./free-weight-payment-terms-guide";

export const freeWeightPaymentTermsPrimaryCopies: FreeWeightPaymentTermsCopy[] = [
  {
    locale: "en",
    path: "/resources/tt-vs-letter-of-credit-free-weight-order-guide",
    title: "T/T vs Letter of Credit for Wholesale Free-Weight Orders",
    description: "Compare T/T, letters of credit and documentary collection for wholesale dumbbells and plates by payment trigger, documents, inspection evidence and bank risk.",
    h1: "How to Choose Payment Terms for a Wholesale Free-Weight Order",
    keyword: "T/T vs letter of credit for gym equipment",
    home: "Home",
    library: "Resources",
    eyebrow: "Payment-control guide for importers, distributors, fitness brands and procurement teams",
    sections: [
      {
        heading: "Quick answer: choose the evidence before choosing the payment label",
        text: `T/T and a letter of credit solve different parts of an import transaction. A T/T is a bank transfer made on the dates or milestones written into the sales agreement. A documentary credit adds a bank undertaking that depends on a complying presentation of the specified documents. Neither method, by itself, proves that a dumbbell, weight plate, Olympic bar or cable handle meets the purchase specification.

Start with the commercial relationship, the buyer's banking capacity, the supplier entity, the order value and the evidence available at each stage. Then write the beneficiary, currency, bank-charge allocation, payment triggers, required documents, discrepancy process and account-change verification into the purchase file. Ask your bank about feasibility and cost before the purchase order is final; there is no universal method or deposit split that fits every order.`,
      },
      {
        heading: "Keep payment, delivery and product acceptance in separate clauses",
        text: `Payment terms answer when and how funds move. Incoterms® answer delivery tasks, costs and risk at a named place. Product acceptance answers whether the approved specification, logo, packaging and inspection criteria were met. Linking the three is useful, but treating one as a substitute for another creates gaps: a freight document can exist even when the goods later fail a product requirement.

The sales contract should identify the seller's legal name, the bank beneficiary, the product schedule and the controlling document version. It should also say which evidence is required before a payment stage, who may approve an exception and what happens if an inspection or document is not acceptable. Use the [ICC Incoterms overview](https://iccwbo.org/business-solutions/incoterms-rules/incoterms-2020/) only for the delivery allocation, not as a payment rule.`,
      },
      {
        heading: "What T/T can control—and what it cannot",
        text: `A T/T arrangement is operationally direct: the parties agree the account, amount, currency and timing, and the buyer instructs its bank. Its real control comes from the milestones attached to the transfers. A purchase file can require an approved sample and signed specification before production funding, then defined inspection evidence and authorized shipping documents before a later stage. The wording should state who accepts the evidence rather than relying on a message saying the order is ready.

The transfer itself does not verify the seller, reserve inventory, inspect the goods or create a chargeback right. A pro forma invoice is also not proof of completion. Before sending funds, match the legal seller and beneficiary, confirm the order reference and call a known contact if any account detail changes. The [FBI guidance on business email compromise](https://www.fbi.gov/how-we-can-help-you/common-frauds-and-scams/business-email-compromise) recommends independently verifying changes in account numbers or payment procedures.

Avoid a milestone that only says “before shipment.” Define the minimum completion level, the inspection scope, the report owner, how nonconformity is handled and which document copy is reviewed. This does not guarantee an outcome, but it makes the decision and its evidence traceable.`,
      },
      {
        heading: "How a letter of credit changes the workflow",
        text: `Under a documentary credit, the issuing bank's undertaking depends on the documents and conditions written into the credit. The [ICC UCP 600 rules](https://library.iccwbo.org/content/tfb/RULES/tfb-ucp600-rules.htm) govern document examination, complying presentations and the handling of discrepancies when incorporated into the credit. The bank examines the presentation; it does not test the tensile strength of a bar, the mass tolerance of a plate or the adhesion of a coating.

Prepare the credit wording with the issuing and advising banks before production pressure begins. Keep required documents objective, obtainable and consistent with the sales contract, Incoterm, shipment route and product names. An over-detailed condition that cannot be evidenced on a stipulated document may create a discrepancy without improving product control. Decide who pays amendment and discrepancy charges, who may waive a discrepancy and how a shipment-date change will be approved.`,
      },
      {
        heading: "Where documentary collection may sit",
        text: `Documentary collection is a different bank-assisted route. In documents against payment, commercial documents are released against payment; in documents against acceptance, they are released against acceptance of a future payment obligation. The [U.S. International Trade Administration](https://www.trade.gov/documentary-collections) notes that banks facilitate the document exchange but do not verify the documents or guarantee payment.

That distinction matters for both buyer and factory. Collection can organize control of transport documents without creating the same bank undertaking as a letter of credit. It also does not replace supplier due diligence, contract remedies, inspection or cargo-control planning. Ask the banks how document release interacts with sea waybills, original bills of lading, electronic records and the chosen carrier before relying on the structure.`,
      },
      {
        heading: "Build payment gates around the free-weight production record",
        text: `The first gate should confirm the legal parties, SKU list, materials, dimensions, tolerances, approved artwork, packaging, change control and sample status. A production-stage gate can use a dated status report tied to purchase-order and model identifiers. A pre-shipment gate can require the agreed inspection record, quantity and packing reconciliation, closure of nonconformities and authorization from a named buyer role.

Shipping evidence should match the agreed route and document set, but it must not be described as proof of product quality. For dense free weights, reconcile carton and pallet counts, gross weights, shipping marks and load-plan references because those records affect transport and receipt. Preserve approvals in a controlled purchase file rather than in scattered chat messages.`,
      },
      {
        heading: "Ask the factory for a project-specific payment proposal",
        text: `ChinaFreeWeight is a factory supporting OEM, ODM, Custom Logo, Private Label and Bulk Supply programs for dumbbells, weight plates, Olympic bars and cable attachments. We can align a quotation with the product schedule, sample plan, packaging, inspection record and shipping document responsibilities. The available payment method and milestones must be confirmed for the actual buyer, order and banking route; they are not a standing promise for every project.

Send the purchasing entity, product mix, destination, desired delivery term, required bank method and any mandatory document wording early in the RFQ. Your bank and professional advisers should confirm credit wording, currency controls and jurisdiction-specific requirements. The practical goal is a payment path that both parties can execute and audit without confusing documentary compliance with physical acceptance.`,
      },
    ],
    table: {
      heading: "Payment-method decision matrix",
      columns: ["Method", "Payment trigger", "Bank role", "Buyer must still control"],
      rows: [
        ["T/T", "Contract milestone and buyer instruction", "Transfers funds", "Seller verification, evidence, inspection and account-change checks"],
        ["Letter of credit", "Complying presentation under the credit", "Examines stipulated documents and honors as agreed", "Product acceptance, practical wording and discrepancy decisions"],
        ["D/P collection", "Payment for document release", "Handles collection instructions and documents", "Supplier risk, document usability, quality and shipment control"],
        ["D/A collection", "Acceptance for document release; payment later", "Handles acceptance and documents", "Credit exposure, maturity tracking and remedies"],
        ["Open account", "Invoice due date after shipment or delivery", "Processes later payment", "Credit approval, limits, collection and ongoing monitoring"],
      ],
      afterSection: 2,
    },
    checklist: {
      heading: "RFQ and payment-file checklist",
      items: [
        "Legal seller and purchasing entity confirmed",
        "Beneficiary name and bank country matched to the contract",
        "Currency and bank-charge allocation stated",
        "Each payment trigger tied to named evidence",
        "Sample, specification and artwork versions recorded",
        "Inspection scope and decision authority defined",
        "Shipping document list checked with the route",
        "Letter-of-credit conditions reviewed by both banks",
        "Discrepancy and amendment authority assigned",
        "Account changes verified through an independent channel",
        "Nonconformity and hold procedure written",
        "Approvals retained in one controlled purchase file",
      ],
      afterSection: 6,
    },
    faqHeading: "Free-Weight Payment Terms FAQ: Questions Buyers Ask",
    faq: [
      ["Is a letter of credit automatically safer than T/T?", "No method is automatically safer in every situation. A letter of credit adds a bank undertaking against complying documents, while its wording, bank risk and documentary fit still need review. T/T control depends heavily on due diligence and milestone evidence."],
      ["Can an inspection report be required before a T/T balance stage?", "Yes, if the contract defines the inspection scope, report, decision authority and treatment of nonconformity. The transfer does not create this control; the written milestone does."],
      ["Does a clean letter-of-credit presentation prove product quality?", "No. Banks examine stipulated documents, not the physical goods or manufacturing performance. Product acceptance requires a separate specification and inspection process."],
      ["Should I accept new bank details sent by email?", "Pause and verify the request through a known phone number or another independent channel. Match the beneficiary and contract, document the confirmation and involve your bank if funds may have been misdirected."],
      ["What should I send a free-weight factory for a payment review?", "Send the buyer entity, product and quantity schedule, customization, sample status, inspection plan, destination, Incoterm, requested bank method, currency, document list and the people authorized to approve each stage."],
    ],
    linkHeading: "Connect payment evidence to the purchase file",
    linkLabels: ["Source wholesale dumbbells", "Source wholesale weight plates", "Prepare a comparable RFQ", "Define pre-shipment inspection", "Separate payment from Incoterms", "Request a project review"],
    imageAlt: "Unbranded dumbbells, weight plates and blank banking documents arranged for a wholesale payment review",
    imageCaption: "A usable payment plan links each transfer or bank presentation to identifiable order evidence without treating documents as product inspection.",
    cta: ["Review the payment path before issuing the order", "Send the product schedule, customization, inspection plan, delivery term and requested bank method. Our factory team will return a project-specific quotation and evidence sequence for your bank and procurement team to review.", "Discuss payment and order evidence"],
  },
  {
    locale: "pt-BR",
    path: "/pt/blog/tt-carta-credito-pagamento-importacao-halteres",
    title: "T/T ou carta de crédito na importação de halteres e anilhas",
    description: "Compare T/T, carta de crédito e cobrança documentária para comprar pesos livres: gatilhos, documentos, inspeção, beneficiário e risco bancário.",
    h1: "Como definir o pagamento de uma compra de pesos livres no atacado",
    keyword: "T/T ou carta de crédito importação halteres",
    home: "Início",
    library: "Blog",
    eyebrow: "Guia de controle de pagamento para importadores, distribuidores e marcas fitness",
    sections: [
      {
        heading: "Resposta direta: o método vem depois do mapa de evidências",
        text: `T/T é uma transferência bancária executada conforme datas ou marcos do contrato. A carta de crédito cria um compromisso bancário condicionado à apresentação conforme dos documentos indicados. Nenhuma dessas formas confirma, sozinha, que halteres, anilhas, barras olímpicas ou puxadores de cabo atendem à ficha técnica.

Antes de escolher, valide as empresas envolvidas, a capacidade bancária, o valor e a complexidade do pedido. Descreva beneficiário, moeda, despesas bancárias, eventos de pagamento, documentos exigidos, aprovação de discrepâncias e validação de mudança de conta. O banco do importador deve confirmar viabilidade, custo e regras cambiais para a operação real.

Não existe percentagem de entrada ou modelo universal que seja correto para qualquer compra. A relação comercial, o risco de crédito, o prazo de produção e o que pode ser comprovado em cada etapa mudam a decisão.`,
      },
      {
        heading: "Separe três decisões que costumam ser misturadas",
        text: `A condição de pagamento define o movimento do dinheiro. O Incoterm define entrega, custos e risco no local nomeado. A aceitação técnica verifica especificação, amostra, logo, embalagem e inspeção. Um conhecimento de embarque pode estar correto e ainda assim não dizer nada sobre tolerância de massa, acabamento ou aderência do revestimento.

Mantenha cláusulas próprias no contrato e no pedido. Identifique a razão social do vendedor, a empresa compradora, o beneficiário bancário, a versão da lista de SKUs e quem pode liberar cada marco. Consulte as [regras oficiais dos Incoterms](https://iccwbo.org/business-solutions/incoterms-rules/incoterms-2020/) apenas para a divisão logística, não para decidir pagamento ou propriedade.`,
      },
      {
        heading: "T/T funciona melhor com marcos verificáveis",
        text: `A transferência é direta, mas seu controle depende do evento escrito antes dela. O primeiro marco pode exigir contrato, ficha, arte e amostra aprovados. Outro pode depender de lote disponível para inspeção, relatório identificando pedido e SKU, solução de não conformidades e autorização de uma função nomeada no comprador.

Evite “saldo antes do embarque” sem detalhar conclusão mínima, amostragem, critérios, responsável pelo laudo e documentos de transporte a revisar. A proforma e a mensagem “pronto” não são prova de fabricação concluída. Faça a conciliação de caixas, pallets, massa bruta, etiquetas e lista de embalagem para um lote denso de pesos livres.`,
      },
      {
        heading: "Carta de crédito controla documentos, não o produto físico",
        text: `Quando incorporadas, as [UCP 600 da ICC](https://library.iccwbo.org/content/tfb/RULES/tfb-ucp600-rules.htm) orientam exame, apresentação conforme e tratamento de discrepâncias. O banco compara os documentos estipulados; não mede a barra, não pesa a anilha e não testa o encaixe do cabeçote do halter. A inspeção continua em processo separado.

Redija a carta com banco emitente, banco avisador, comprador e fábrica antes da pressão de embarque. Peça somente documentos objetivos, emitíveis e coerentes com contrato, rota, Incoterm, nomes dos produtos e datas. Defina quem autoriza emenda ou aceita discrepância e como custos bancários serão alocados.

Uma condição detalhada demais pode criar divergência sem melhorar a qualidade. Se o requisito técnico não aparece em documento estipulado de forma verificável, ele pertence à especificação e ao plano de inspeção.`,
      },
      {
        heading: "Cobrança documentária é uma terceira estrutura",
        text: `Na cobrança contra pagamento, os documentos comerciais são liberados mediante pagamento; na cobrança contra aceite, são liberados após o importador aceitar uma obrigação com vencimento futuro. O [guia da Administração de Comércio Internacional dos EUA](https://www.trade.gov/documentary-collections) ressalta que os bancos encaminham a cobrança, mas não verificam os documentos nem garantem o pagamento.

Esse caminho pode organizar a posse documental, porém não equivale a uma carta de crédito. Verifique com banco e agente de carga como conhecimento original, sea waybill ou registro eletrônico controla a retirada. Continue fazendo due diligence, especificação, inspeção e plano de ação para não conformidade.`,
      },
      {
        heading: "Proteja cada alteração de dados bancários",
        text: `Golpes de comprometimento de e-mail exploram pedidos urgentes de troca de conta ou beneficiário. Se um dado mudar, interrompa a transferência e confirme por telefone já conhecido ou por outro canal independente; não use o número fornecido na própria mensagem suspeita. A [orientação do FBI](https://www.fbi.gov/how-we-can-help-you/common-frauds-and-scams/business-email-compromise) recomenda essa verificação fora do e-mail.

Registre quem confirmou, quando, para qual pedido e qual foi a comparação com contrato e fatura. Se houver suspeita após o envio, avise imediatamente o banco para avaliar medidas de recuperação. O controle vale para entrada, saldo, frete e qualquer instrução extraordinária.`,
      },
      {
        heading: "Peça uma proposta executável para o projeto",
        text: `A ChinaFreeWeight é uma fábrica que atende OEM, ODM, Custom Logo, Private Label e Bulk Supply de halteres, anilhas, barras olímpicas e acessórios de cabo. Podemos ligar a cotação à ficha de produto, amostra, embalagem, inspeção e responsabilidades documentais. Forma e marcos de pagamento são confirmados para cada comprador e pedido; não constituem promessa permanente.

Envie empresa compradora, mix, quantidades, personalização, destino, Incoterm, moeda, forma bancária desejada e redações obrigatórias. Alinhe câmbio, tributos, crédito e requisitos locais com seu banco e assessores no Brasil. O resultado deve ser um fluxo que comprador e fábrica consigam executar e auditar.

Antes de emitir o pedido, transforme cada etapa em uma linha de controle: evento, documento, emissor, versão, aprovador e consequência se a evidência não chegar ou divergir. Confirme com o banco se os nomes dos produtos, datas e documentos são operáveis na rota escolhida; confirme com a fábrica se cada prova pode ser produzida no momento previsto. Mantenha a aceitação técnica em um registro separado, ligado ao mesmo número de pedido. Assim, uma alteração de embarque, embalagem ou conta não muda silenciosamente a autorização financeira, e compras, qualidade, logística e tesouraria consultam a mesma versão.`,
      },
    ],
    table: {
      heading: "Matriz para conversar com o banco e a fábrica",
      columns: ["Estrutura", "Liberação", "Papel do banco", "Controle que continua com o comprador"],
      rows: [
        ["T/T", "Marco contratual", "Executa a transferência", "Beneficiário, evidência, inspeção e fraude"],
        ["Carta de crédito", "Apresentação conforme", "Examina documentos estipulados", "Aceitação física, redação e discrepâncias"],
        ["Cobrança D/P", "Pagamento para liberar documentos", "Encaminha cobrança e documentos", "Fornecedor, qualidade e possibilidade de retirada"],
        ["Cobrança D/A", "Aceite para liberar documentos", "Registra o aceite", "Risco de crédito e vencimento"],
        ["Conta aberta", "Vencimento após envio ou entrega", "Processa pagamento posterior", "Limite, cobrança e monitoramento"],
      ],
      afterSection: 3,
    },
    checklist: {
      heading: "Itens para a pasta de compra internacional",
      items: ["Razões sociais e beneficiário", "Moeda e despesas bancárias", "Pedido e SKU em cada evidência", "Versões de ficha e arte", "Amostra aprovada", "Marco de produção documentado", "Inspeção e autoridade de decisão", "Lista de documentos bancários", "Regra de emenda e discrepância", "Verificação independente de conta", "Tratamento de não conformidade", "Registro de todas as aprovações"],
      afterSection: 5,
    },
    faqHeading: "Dúvidas frequentes de importadores",
    faq: [
      ["Carta de crédito elimina o risco de qualidade?", "Não. O banco examina documentos estipulados. Especificação, amostra e inspeção física continuam indispensáveis."],
      ["Posso vincular o saldo T/T à inspeção?", "Sim, se contrato e pedido definirem escopo, relatório, autoridade para aprovar e tratamento das não conformidades."],
      ["Cobrança documentária tem garantia bancária?", "Não como uma carta de crédito. O banco encaminha documentos e instruções, mas não garante o pagamento nem verifica a mercadoria."],
      ["Como agir diante de nova conta enviada por e-mail?", "Pare, confirme com contato já conhecido em canal independente, compare beneficiário e contrato e registre a validação antes de instruir o banco."],
      ["Quais dados enviar à fábrica para discutir pagamento?", "Empresa compradora, produtos, quantidades, personalização, amostra, inspeção, destino, Incoterm, moeda, método pretendido, documentos e aprovadores."],
    ],
    linkHeading: "Monte o pedido e a prova de cada marco",
    linkLabels: ["Comprar halteres no atacado", "Comprar anilhas no atacado", "Preparar RFQ comparável", "Definir inspeção pré-embarque", "Separar pagamento do Incoterm", "Solicitar análise do projeto"],
    imageAlt: "Halteres e anilhas sem marca ao lado de documentos bancários em branco para revisar o pagamento de importação",
    imageCaption: "Cada pagamento precisa apontar para uma evidência identificada do pedido, sem confundir documento bancário com inspeção física.",
    cta: ["Alinhe pagamento, inspeção e documentação", "Envie mix, personalização, plano de inspeção, destino e forma bancária pretendida. A fábrica organizará uma cotação específica para revisão da sua equipe e do seu banco.", "Revisar a operação"],
  },
  {
    locale: "es",
    path: "/es/blog/tt-carta-credito-pago-importacion-pesas",
    title: "Pago T/T o carta de crédito al importar pesas al por mayor",
    description: "Decida entre T/T, crédito documentario y cobranza para mancuernas y discos según hitos, documentos, inspección, beneficiario y banco.",
    h1: "Cómo acordar el pago de un pedido mayorista de pesos libres",
    keyword: "pago T/T o carta de crédito importación pesas",
    home: "Inicio",
    library: "Blog",
    eyebrow: "Guía de compra para importadores, distribuidores, marcas y responsables de gimnasios",
    sections: [
      {
        heading: "Primero identifique qué riesgo quiere controlar",
        text: `Una transferencia T/T mueve fondos cuando el comprador da la instrucción conforme al contrato. Una carta de crédito añade un compromiso bancario sujeto a una presentación documental conforme. La diferencia no consiste en que un método inspeccione mejor las mancuernas, los discos, las barras olímpicas o los agarres: ninguno sustituye la aceptación del producto.

Antes de negociar porcentajes, separe riesgo de identidad y fraude, riesgo de crédito, avance de producción, calidad, control de documentos y liberación de la carga. Después asigne una evidencia y una persona con autoridad a cada hito. El banco del importador debe confirmar si la estructura, divisa y documentación son viables en su país.`,
      },
      {
        heading: "T/T: la protección está en el hito escrito",
        text: `El contrato puede exigir entidad vendedora y beneficiario coincidentes, ficha técnica y muestra aprobadas antes de un primer desembolso. Para una etapa posterior puede pedir lote disponible, informe de inspección ligado al pedido, cierre de desviaciones y autorización nominal. La transferencia no crea estos controles: únicamente ejecuta el pago.

No acepte “saldo antes del envío” como único criterio. Defina nivel de terminación, selección de unidades, medidas, defectos, embalaje, recuento y documentos a revisar. Una factura proforma o una fotografía general no demuestra que cada SKU esté completo y conforme.`,
      },
      {
        heading: "La carta de crédito examina una presentación",
        text: `Si el crédito incorpora las [UCP 600 de la ICC](https://library.iccwbo.org/content/tfb/RULES/tfb-ucp600-rules.htm), el examen se centra en los documentos estipulados, su conformidad y las discrepancias. El banco no pesa discos, comprueba moleteados ni ensaya soldaduras. Por eso la especificación y la inspección siguen siendo controles del comprador.

Revise el texto del crédito con banco emisor, banco avisador y fábrica antes de producir o reservar el transporte. Las condiciones deben ser objetivas, posibles de documentar y coherentes con contrato, ruta, Incoterm, nombres de mercancía y fechas. Determine quién acepta una discrepancia, quién solicita una modificación y cómo se pagan los gastos asociados.`,
      },
      {
        heading: "No use el Incoterm como condición bancaria",
        text: `El Incoterm asigna entrega, costes y riesgo de transporte en un lugar nombrado; no define cuándo paga el comprador ni cuándo se transmite la propiedad. Mantenga una cláusula de pago y otra de aceptación técnica. Consulte la [explicación oficial de la ICC](https://iccwbo.org/business-solutions/incoterms-rules/incoterms-2020/) para la distribución logística.

Conecte las cláusulas solo donde haya una evidencia real: entrega al transportista, emisión de un documento o recepción de un informe. Un documento de embarque correcto no demuestra por sí mismo masa, acabado, logo o embalaje conforme.`,
      },
      {
        heading: "Cobranza documentaria: D/P no es D/A",
        text: `En documentos contra pago, el banco entrega los documentos comerciales contra el pago; en documentos contra aceptación, los entrega cuando el comprador acepta una obligación futura. La [Administración de Comercio Internacional de EE. UU.](https://www.trade.gov/documentary-collections) explica que los bancos facilitan el intercambio, pero no verifican los documentos ni garantizan el pago.

Revise si el conocimiento de embarque original, la guía marítima o el registro electrónico controlan realmente la retirada en la ruta prevista. La cobranza puede ordenar el flujo documental, pero no reemplaza la verificación del proveedor, la inspección, el crédito ni los remedios del contrato.`,
      },
      {
        heading: "Convierta la inspección en una decisión reproducible",
        text: `Para pesos libres, el expediente debe enlazar pedido, SKU, material, dimensiones, tolerancias, muestra, arte, caja y pallet. El informe previo al envío indica qué se seleccionó, cómo se midió, qué no conformidades aparecieron y quién decide aprobar, retener o volver a inspeccionar.

Concilie unidades, bultos, pesos brutos, marcas y lista de empaque antes de asociarlos a un hito de pago. Guarde versiones y aprobaciones en un repositorio controlado. Los mensajes dispersos dificultan demostrar qué se aceptó y cuándo.`,
      },
      {
        heading: "Verifique cualquier cambio bancario fuera del correo",
        text: `Un mensaje urgente que cambia beneficiario, cuenta o procedimiento debe detener el pago. Llame a un número que ya constaba en sus registros o use otro canal independiente; no utilice los datos de contacto que llegan en el mismo mensaje. La [guía del FBI sobre fraude de correo empresarial](https://www.fbi.gov/how-we-can-help-you/common-frauds-and-scams/business-email-compromise) recomienda comprobar así los cambios.

Anote persona, fecha, pedido y resultado. Si el dinero ya salió y existe sospecha, contacte al banco de inmediato. Este control se aplica a anticipo, saldo, flete y pagos extraordinarios.`,
      },
      {
        heading: "Solicite una propuesta vinculada al pedido real",
        text: `ChinaFreeWeight es una fábrica para programas OEM, ODM, Custom Logo, Private Label y Bulk Supply de mancuernas, discos, barras olímpicas y accesorios de cable. Podemos relacionar la cotización con especificación, muestra, personalización, embalaje, inspección y responsabilidades documentales. El método disponible y sus hitos se confirman por proyecto y comprador.

Envíe entidad compradora, mix, cantidades, destino, Incoterm, moneda, método solicitado y redacciones bancarias obligatorias. Su banco y sus asesores deben validar controles cambiarios, crédito y requisitos locales. El objetivo no es acumular cláusulas, sino obtener un proceso ejecutable y trazable.

Antes de emitir la orden, convierta cada etapa en una línea de control: evento, documento, emisor, versión, aprobador y respuesta si la evidencia falta o no coincide. Confirme con el banco que los nombres de producto, fechas y documentos se puedan operar en la ruta elegida; confirme con la fábrica que cada prueba estará disponible en el momento previsto. Mantenga la aceptación técnica en un registro separado, vinculado al mismo número de pedido. Así, un cambio de embarque, embalaje o cuenta no modifica silenciosamente la autorización financiera, y compras, calidad, logística y tesorería trabajan con la misma versión. Registre también la fecha y el canal de cada aprobación.`,
      },
    ],
    table: {
      heading: "Comparación para la decisión de compra",
      columns: ["Vía", "Qué activa el pago", "Qué hace el banco", "Qué no debe delegar el comprador"],
      rows: [
        ["T/T", "Hito contractual e instrucción", "Transfiere fondos", "Identidad, evidencia e inspección"],
        ["Carta de crédito", "Presentación conforme", "Examina documentos estipulados", "Producto, redacción y discrepancias"],
        ["D/P", "Pago para recibir documentos", "Gestiona la cobranza", "Calidad, proveedor y control de carga"],
        ["D/A", "Aceptación para recibir documentos", "Gestiona aceptación y documentos", "Exposición crediticia y vencimiento"],
        ["Cuenta abierta", "Fecha de factura posterior", "Procesa pago", "Límite, seguimiento y recobro"],
      ],
      afterSection: 2,
    },
    checklist: {
      heading: "Control previo a cada instrucción de pago",
      items: ["Vendedor y comprador legales", "Beneficiario verificado", "Divisa y gastos", "Hito descrito", "Evidencia con pedido y SKU", "Muestra y arte vigentes", "Inspección y decisor", "Documentos coherentes con la ruta", "Revisión bancaria del crédito", "Responsable de discrepancias", "Cambio de cuenta verificado", "Archivo de aprobación"],
      afterSection: 7,
    },
    faqHeading: "Preguntas habituales antes de pagar",
    faq: [
      ["¿Una carta de crédito siempre es más segura?", "No en todos los casos. Añade un compromiso bancario condicionado a documentos, pero deben evaluarse texto, bancos, coste, discrepancias y control físico separado."],
      ["¿Se puede condicionar una T/T a la inspección?", "Sí. El contrato debe indicar alcance, informe, autoridad para decidir y tratamiento de desviaciones antes del hito."],
      ["¿Un conocimiento de embarque prueba la calidad?", "No. Prueba aspectos documentales del transporte; la calidad exige especificación, muestreo, medición y aceptación propios."],
      ["¿Qué hago si el proveedor cambia la cuenta?", "Detenga la transferencia, confirme por un canal conocido e independiente, compare beneficiario y contrato y documente la aprobación."],
      ["¿Qué necesita la fábrica para revisar las condiciones?", "Entidad compradora, productos, cantidades, personalización, muestra, inspección, destino, Incoterm, divisa, método bancario, documentos y aprobadores."],
    ],
    linkHeading: "Alinee producto, inspección y pago",
    linkLabels: ["Comprar mancuernas al por mayor", "Comprar discos al por mayor", "Preparar una RFQ comparable", "Definir inspección previa", "Distinguir pago e Incoterm", "Revisar el proyecto con fábrica"],
    imageAlt: "Mancuernas y discos sin marca junto a documentos bancarios en blanco para revisar un pago mayorista",
    imageCaption: "El expediente conecta cada desembolso con evidencias identificadas, sin presentar los documentos como inspección del producto.",
    cta: ["Diseñe el flujo antes de emitir la orden", "Comparta mix, personalización, inspección, destino y vía bancaria. Prepararemos una cotización específica para que compras y su banco revisen los hitos y documentos.", "Revisar condiciones del pedido"],
  },
];
