import type { PlateDiameterGuideCopy } from "./plate-diameter-guide-types";

export const plateDiameterPrimaryCopies: PlateDiameterGuideCopy[] = [
  {
    locale: "en",
    path: "/resources/weight-plate-outside-diameter-profile-guide",
    title: "Weight Plate Outside Diameter: Commercial Buyer Guide",
    description: "Specify weight plate outside diameter, rim profile, roundness, floor height, storage fit and incoming checks for a commercial bulk order.",
    h1: "Weight Plate Outside Diameter and Profile for Commercial Buying",
    keyword: "weight plate outside diameter specification",
    home: "Home",
    library: "Resources",
    eyebrow: "Commercial plate specification guide",
    sections: [
      {
        heading: "Direct answer: no, weight plates do not all share one outside diameter",
        text: `Full-size bumper and competition-style discs commonly use a consistent outer envelope, while cast-iron, grip, change and machine plates may use smaller or denomination-dependent diameters. Outside diameter is separate from the centre-bore size that determines sleeve compatibility and from plate thickness that consumes loadable sleeve length.

For a commercial order, write the permitted outside diameter and its tolerance for every SKU that matters. Do not accept “Olympic” as a substitute: it may describe the bore or intended bar family without proving the outer profile, floor height, rack clearance or ability to share impact.`
      },
      {
        heading: "Start with the exercise and contact condition",
        text: `Ask whether the loaded bar reaches the floor, may be released onto an approved platform, stays inside a rack, or is used on a plate-loaded machine. The largest plate touching the floor sets the bar's starting height; a smaller companion plate can add load without changing that height, but it may not share contact during a drop.

That distinction changes the buying brief. Olympic lifting and technique work can need a controlled full-size envelope, whereas selector areas, storage-dense gyms and machine pegs may benefit from compact graduated profiles. The product's permitted use and the equipment maker's instructions remain authoritative.`
      },
      {
        heading: "Read competition dimensions as a rule scope, not a product grade",
        text: `The International Weightlifting Federation states that the largest discs have a 450 mm diameter with a stated tolerance. Its same public specification allows lighter discs to use other materials. The International Powerlifting Federation sets a maximum diameter for the largest discs. These are competition equipment rules, not proof that every commercial bumper, iron plate or change plate follows the same construction.

If a supplier references a standard, request the current document, the exact product claim and evidence for the offered model. A 450 mm nominal value does not by itself verify roundness, finished tolerance, rebound, mass, centre fit, hub security or permission to drop the plate.`
      },
      {
        heading: "Freeze the complete outer profile, not one nominal number",
        text: `A useful drawing identifies maximum finished diameter, tolerance, measurement direction, rim radius or chamfer, raised lettering, handles, face relief, hub projection and flatness. Measure across more than one axis when roundness matters, and define whether flexible flash, decorative ribs or protective lips are included in the envelope.

For OEM, ODM, custom-logo and private-label work, artwork must remain inside the approved face area. A new relief, mould insert, colour layer or edge treatment can change the measured envelope or storage contact even when the nominal diameter stays the same. Revision identity should link drawing, finished sample and packaging.`
      },
      {
        heading: "Check the facility interface before approving the range",
        text: `Compare the largest finished envelope with plate trees, horizontal pegs, rack uprights, carts, shelving, machine guards and walking clearance. Check removal by a real user path, not only whether a plate can be forced onto an empty peg. A grip opening may improve handling, but the hand path and neighbouring plates still need space.

Also review packaging and pallet orientation. Full-size light plates can occupy more carton face area than compact iron plates, while dense metal plates create different handling risks. The factory quote should therefore connect diameter family, quantities by SKU, carton protection and unloading plan rather than hiding them behind one set name.`
      },
      {
        heading: "Approve samples across construction changes",
        text: `Select samples at the light, middle and heavy positions and at every point where the mould, core, grip pattern, hub or diameter changes. Place the plate on a verified flat surface, measure the agreed axes, inspect the rim and confirm that paired plates sit as intended. Keep the accepted sample or a controlled dimensional record.

Thin full-size light discs deserve special attention because geometry alone does not establish drop suitability. Ask for the permitted-use statement for each denomination. If a mixed stack may contact the floor, confirm the configuration with the relevant plate, bar and platform instructions rather than assuming equal outside diameter makes every combination safe.`
      },
      {
        heading: "Turn incoming inspection into a receiving decision",
        text: `At receipt, identify cartons and SKU revisions before sampling. Check outside diameter in the agreed directions, obvious out-of-round condition, damaged or rolled rims, hub centring, face wobble on a flat reference, pair consistency and fit on the intended storage or equipment interface. Record the instrument, unit and sample identity.

Mass, bore fit, thickness and rebound belong to their own checks; passing one does not release the others. PowerBaseFit can review a factory-feasible inspection package for bulk supply, but sampling quantity, acceptance limits, destination requirements, MOQ and lead time must be confirmed for the actual product mix.`
      }
    ],
    table: {
      heading: "Outside-diameter decision matrix",
      columns: ["Plate family", "Diameter question", "Buyer consequence"],
      rows: [
        ["Full-size bumper", "Which denominations share the finished envelope?", "Starting height and contact pattern"],
        ["Technique plate", "Is it full-size despite low mass, and what use is allowed?", "Coaching height and handling rules"],
        ["Cast-iron or grip plate", "Does diameter change by denomination?", "Storage density and floor-contact mix"],
        ["Change or fractional plate", "What compact profile and hub projection apply?", "Loading order and identification"],
        ["Plate-loaded machine plate", "What is the maximum envelope and hand clearance?", "Peg, guard and frame compatibility"],
        ["Private-label revision", "Did mould relief, logo or rim treatment change?", "Reapproval and reorder consistency"]
      ]
    },
    tablePosition: 3,
    checklist: {
      heading: "RFQ and receiving checklist",
      items: [
        "List use, bar or machine model, floor contact and permitted drop condition",
        "State denomination, material, nominal outside diameter and tolerance per SKU",
        "Separate outside diameter, centre-bore diameter and plate thickness",
        "Define measurement axes, finished surface, rim features and roundness method",
        "Provide rack, peg, guard, carton and pallet clearance where relevant",
        "Approve representative samples at each construction or diameter transition",
        "Freeze logo, colour, marking, mould and packaging revision identity",
        "Agree sampling, records, disposition and reapproval triggers before production"
      ]
    },
    faqHeading: "Frequently Asked Questions",
    faq: [
      ["Do all bumper plates have the same outside diameter?", "Many full-size ranges use a common outer envelope, but lighter, technique or model-specific discs can differ. Confirm every offered SKU on the drawing."],
      ["Is a 50 mm centre hole the same as a 450 mm plate diameter?", "No. The centre bore relates to the bar sleeve; outside diameter describes the plate's overall envelope and floor height."],
      ["Does 450 mm mean a plate is competition approved?", "No. One dimension does not establish approval, weight accuracy, materials, colour, thickness or any other rule requirement."],
      ["Can different-diameter plates be used on one bar?", "They may fit the same sleeve, but floor contact, permitted dropping, loading order and manufacturer instructions must be reviewed for the intended use."],
      ["How should outside diameter be inspected?", "Define the finished surfaces and axes, use a suitable verified instrument or fixture, and record out-of-round, rim and pair observations with the result."],
      ["Can PowerBaseFit supply custom-logo weight plates?", "PowerBaseFit reviews OEM, ODM, custom-logo, private-label and bulk projects by model, artwork, mould, sample, quantity, inspection and packaging requirements."]
    ],
    linkHeading: "Continue the plate specification",
    linkLabels: ["Browse commercial weight plates", "Review rubber bumper plates", "Compare cast-iron plates", "Specify plate-to-sleeve fit", "Control plate mass tolerance", "Calculate bumper thickness and sleeve capacity", "Plan pre-shipment inspection", "Send the plate range for review"],
    imageCopy: [
      ["Outside caliper checking the diameter of an unbranded bumper plate beside a smaller iron plate", "Outside diameter, bore and thickness are separate specification fields."],
      ["Weight plate outside diameter checked against a vertical gauge on a flat surface", "A finished sample connects the drawing to the measured outer envelope."],
      ["Graduated iron plates compared with full-size bumper plates in a commercial gym", "The correct profile depends on floor contact, storage and equipment clearance."]
    ],
    cta: ["Review a measurable plate range", "Send intended use, denominations, bar or machine interface, diameter family, logo and packaging needs. Our factory team will review a model-specific bulk specification without assuming a universal minimum or tolerance.", "Request a plate specification review"]
  },
  {
    locale: "pt-BR",
    path: "/pt/blog/diametro-externo-anilhas-perfil-compra",
    title: "Diâmetro Externo de Anilhas: Guia de Compra Profissional",
    description: "Defina diâmetro externo, perfil, altura da barra, encaixe no suporte, amostras e inspeção de anilhas para pedidos profissionais.",
    h1: "Como Especificar o Diâmetro Externo de Anilhas",
    keyword: "diâmetro externo de anilhas",
    home: "Início",
    library: "Blog",
    eyebrow: "Guia técnico para compra de anilhas",
    sections: [
      { heading: "Resposta objetiva: peso igual não garante tamanho igual", text: `Uma anilha bumper de massa baixa pode ter o mesmo diâmetro externo de uma pesada, enquanto anilhas de ferro fundido, com pegada ou fracionárias costumam variar de tamanho dentro da linha. O diâmetro externo não é o furo central e também não é a espessura.

No pedido B2B, cada uma dessas cotas precisa aparecer separada por referência. A palavra olímpica pode indicar a família da barra, mas não confirma sozinha altura de saída, ocupação no suporte, contato com o piso ou dimensão acabada.

Antes de comparar propostas, transforme o sortimento em uma planilha de SKUs. Marque quais pesos devem compartilhar o mesmo contorno e quais podem ser graduados. Essa decisão evita que fotografias semelhantes escondam famílias dimensionais diferentes e permite comparar fornecedores pela mesma base.` },
      { heading: "Parta do uso real da academia brasileira", text: `Defina se a barra sai do chão no levantamento terra, se haverá LPO em plataforma apropriada, se as anilhas ficarão apenas no rack ou se servirão máquinas plate-loaded. A maior anilha que toca o piso define a altura do eixo; as menores apenas completam a carga quando não encostam no chão.

Boxes e centros de treinamento podem valorizar uma família de diâmetro uniforme. Academias de musculação com alta densidade de equipamentos podem preferir perfis graduados e compactos. O projeto deve considerar piso, regras de uso e instruções dos equipamentos oferecidos.

Registre também quem movimenta as anilhas e em que sequência. Uma equipe de aula troca cargas com frequência, enquanto uma máquina recebe menos mudanças e pode ter um protetor próximo ao pino. O mesmo contorno produz consequências operacionais diferentes nesses dois ambientes.` },
      { heading: "Use 450 mm somente dentro do contexto declarado", text: `A regra pública da IWF informa 450 mm, com tolerância indicada, para os maiores discos de competição. A IPF também limita o diâmetro dos maiores discos. Essas referências ajudam a entender a altura de trabalho, mas não tornam qualquer anilha comercial equivalente a uma peça aprovada.

Quando o fornecedor citar um padrão, peça a versão atual, o escopo e a evidência do modelo cotado. A cota nominal não comprova massa, furo, circularidade, ressalto, resistência do inserto ou permissão de queda.

Há ainda diferença entre valor nominal e limite de aceitação. O pedido precisa dizer se a tolerância vale depois da pintura, da borracha e da impressão, além de identificar o método usado. Assim, amostra, produção e recebimento não avaliam estados diferentes da peça.` },
      { heading: "Desenhe o envelope completo da peça", text: `Registre diâmetro máximo acabado, tolerância, eixos de medição, raio ou chanfro de borda, rebaixos, pegadas, letras em relevo, projeção do cubo e planicidade. Se a peça for flexível, deixe claro se rebarba de moldagem entra ou não na medição.

Em OEM, ODM, logo personalizado e marca própria, uma nova arte, placa de molde ou camada de cor pode alterar a face ou o contorno. O desenho, a amostra aprovada, a embalagem e o código de revisão devem permanecer ligados para proteger a reposição.

Num catálogo com várias massas, sinalize os pontos de transição: mudança de ferramenta, inserto, pegada, borda ou diâmetro. Esses pontos merecem cotas e fotos próprias. Uma tabela única para toda a série pode omitir exatamente o SKU que exige nova validação.` },
      { heading: "Valide suporte, carrinho, máquina e embalagem", text: `Compare a maior dimensão acabada com pinos de armazenamento, estruturas, proteções de máquinas, carrinhos e corredores. Não basta a anilha caber em um pino vazio: o usuário precisa retirá-la sem prender a mão ou bater nas peças vizinhas.

Anilhas leves de diâmetro completo ocupam mais área frontal na caixa; as metálicas compactas concentram mais massa. A cotação de fornecimento em volume deve relacionar mix por peso, quantidade, separadores, resistência da caixa, pallet e descarga.

Faça uma prova com o suporte carregado no nível mais apertado, incluindo etiquetas, travas ou batentes existentes. Meça a folga útil e filme a retirada da peça. Esse registro simples revela interferências que uma dimensão de catálogo, isolada, não mostra.` },
      { heading: "Amostre as mudanças da linha", text: `Aprove peças leves, intermediárias e pesadas, além de todo ponto em que muda molde, núcleo, desenho de pegada, cubo ou diâmetro. Apoie a peça numa superfície verificada, meça os eixos acordados, observe a borda e compare o par.

Uma bumper fina e de diâmetro completo não ganha permissão de queda apenas pela geometria. Confirme a instrução de uso de cada peso e de qualquer pilha mista no modelo real de barra e plataforma.

Na amostra, marque os eixos medidos e repita o posicionamento. Se os valores mudarem com a orientação, investigue ovalização, apoio irregular ou borda deformada. Compare unidades do mesmo SKU e o par que será usado em lados opostos da barra.` },
      { heading: "Transforme o recebimento em decisão rastreável", text: `Na chegada, separe SKU e revisão antes de selecionar amostras. Confira diâmetro nos sentidos definidos, falta de circularidade, borda amassada ou enrolada, centro do inserto, oscilação da face, consistência do par e encaixe no suporte previsto.

Registre instrumento, unidade, lote e resultado. Massa, furo, espessura e comportamento de queda têm controles próprios. A PowerBaseFit pode revisar um plano viável de fábrica; quantidade de amostra, aceitação, MOQ e prazo dependem do mix efetivo.

Defina previamente o que acontece diante de uma não conformidade: segregar o SKU, ampliar a amostra, medir novamente com método acordado ou solicitar correção. Sem essa regra, um desvio pequeno pode bloquear todo o contêiner ou ser liberado sem evidência suficiente.` }
    ],
    table: { heading: "Mapa de decisão por família", columns: ["Família", "Pergunta dimensional", "Efeito na compra"], rows: [["Bumper de diâmetro completo", "Quais pesos compartilham o contorno?", "Altura e contato com o piso"], ["Anilha técnica", "Mantém tamanho cheio com massa baixa?", "Aprendizagem e regra de uso"], ["Ferro ou anilha com pegada", "O tamanho varia por peso?", "Armazenamento e manuseio"], ["Fracionária", "Qual perfil compacto e projeção?", "Ordem de carga"], ["Máquina plate-loaded", "Qual envelope e espaço para a mão?", "Compatibilidade com pino e proteção"], ["Marca própria", "Logo ou molde mudou a borda?", "Nova aprovação e reposição"]] },
    tablePosition: 4,
    checklist: { heading: "Checklist para cotação e recebimento", items: ["Informar uso, barra ou máquina, piso e condição de queda", "Listar massa, material, diâmetro e tolerância por SKU", "Separar diâmetro externo, furo e espessura", "Definir eixos, superfície acabada, borda e circularidade", "Enviar folgas de suporte, pino, proteção, caixa e pallet", "Aprovar amostras em cada mudança construtiva", "Congelar arte, cor, marcação, molde e revisão", "Combinar amostragem, registros e tratamento de desvios"] },
    faqHeading: "Perguntas frequentes",
    faq: [["Toda anilha bumper tem 450 mm?", "Muitas linhas usam esse valor nominal, mas pesos leves e modelos técnicos podem variar. Confirme cada SKU."], ["Furo de 50 mm e diâmetro de 450 mm são a mesma medida?", "Não. O furo se relaciona à manga da barra; o diâmetro externo define o envelope."], ["450 mm prova aprovação para competição?", "Não. Uma cota isolada não comprova todos os requisitos nem aprovação."], ["Posso misturar diâmetros na mesma barra?", "O encaixe pode ser possível, mas contato com o piso, queda permitida e ordem de carga precisam ser revistos."], ["Como medir o diâmetro no recebimento?", "Use o método e os eixos acordados, instrumento verificado e registro de circularidade, borda e pares."], ["A PowerBaseFit oferece anilhas com logo?", "A fábrica analisa OEM, ODM, logo, marca própria e atacado conforme modelo, arte, amostra, quantidade e embalagem."]],
    linkHeading: "Complete a especificação das anilhas",
    linkLabels: ["Ver anilhas profissionais", "Revisar anilhas bumper", "Comparar ferro fundido", "Especificar encaixe na barra", "Controlar tolerância de massa", "Calcular espessura e capacidade", "Planejar inspeção pré-embarque", "Enviar a linha para análise"],
    imageCopy: [["Anilhas bumper sem marca alinhadas para conferir o diâmetro externo no recebimento", "A inspeção compara o contorno acabado e a revisão correta."], ["Discos de tamanhos diferentes em suportes seguros para aprovação de amostra", "Peso e diâmetro precisam ser descritos separadamente."], ["Bumper de diâmetro uniforme e anilhas de ferro graduadas em racks", "O perfil deve servir ao uso e ao espaço da academia."]],
    cta: ["Revise sua linha de anilhas", "Envie uso, pesos, barra ou máquina, família de diâmetro, logo e embalagem. Nossa equipe de fábrica avaliará uma especificação mensurável para o mix real.", "Solicitar revisão técnica"]
  },
  {
    locale: "es",
    path: "/es/blog/diametro-exterior-discos-perfil-compra",
    title: "Diámetro Exterior de Discos: Guía de Compra B2B",
    description: "Especifique diámetro exterior, perfil, altura de barra, almacenaje, muestras e inspección de discos para pedidos profesionales.",
    h1: "Diámetro Exterior y Perfil de Discos para Compra Profesional",
    keyword: "diámetro exterior de discos de pesas",
    home: "Inicio",
    library: "Blog",
    eyebrow: "Guía dimensional para compradores de discos",
    sections: [
      { heading: "La respuesta corta: no todos los discos miden lo mismo", text: `Los discos bumper y algunos modelos de competición suelen mantener un diámetro exterior común, mientras que los discos de hierro, con agarres, de cambio o para máquinas pueden reducir el tamaño en los pesos ligeros. El agujero central determina otra interfaz y el grosor ocupa otra dirección.

En una compra profesional, la ficha debe separar las tres medidas por referencia. La palabra olímpico no confirma por sí sola el contorno acabado, la altura de la barra, la compatibilidad con el almacenamiento ni la autorización para soltar el conjunto.

Antes de comparar ofertas, convierta el surtido en una tabla de SKU. Señale qué pesos deben compartir envolvente y cuáles pueden usar un perfil graduado. Así, dos fotografías parecidas no ocultan familias dimensionales distintas y todos los proveedores responden sobre la misma base.` },
      { heading: "Decida primero qué toca el suelo", text: `Para peso muerto, cargadas o arrancadas, el disco de mayor diámetro que apoya en la plataforma fija la altura del eje. Los discos menores pueden completar la carga sin tocar el suelo. Si la barra se suelta, esta diferencia también cambia qué piezas reciben el contacto.

Una sala de halterofilia puede necesitar discos de tamaño completo incluso en cargas ligeras. Una sala de musculación, un hotel o una zona de máquinas puede priorizar perfiles compactos, espacio en carros y facilidad de manipulación. Uso previsto, pavimento y normas del fabricante deben coincidir.

Documente también quién cambia los discos y con qué frecuencia. Una clase ajusta cargas muchas veces, mientras que una máquina puede permanecer configurada y tener una guarda muy próxima. El mismo diámetro plantea riesgos operativos distintos en cada zona.` },
      { heading: "Interprete las reglas sin convertirlas en un sello comercial", text: `La IWF publica un diámetro de 450 mm, con tolerancia indicada, para los discos mayores de su equipamiento de competición. La IPF limita el diámetro de los discos mayores. Son marcos concretos y no demuestran que cualquier bumper o disco olímpico comercial tenga la misma geometría o aprobación.

Si una oferta cita una norma, solicite versión, alcance y evidencia del modelo. Un valor nominal no acredita circularidad, masa, agujero, grosor, rebote, fijación del inserto ni uso permitido.

Diferencie además valor nominal y límite de aceptación. La orden debe indicar si la tolerancia se evalúa después de pintura, caucho y marcado, y con qué método. La muestra, la producción y la recepción deben observar el mismo estado terminado.` },
      { heading: "Convierta el contorno en un plano verificable", text: `Indique diámetro máximo terminado, tolerancia, ejes, redondez, radio o chaflán, relieve, asas, saliente del cubo y planitud. Defina si rebabas flexibles o letras elevadas forman parte de la envolvente que se mide.

En OEM, ODM, logo personalizado y marca privada, una nueva placa de molde o una banda de color puede alterar la cara, el borde o el contacto en el rack. Vincule arte, muestra, plano, embalaje y revisión para que una reposición no cambie en silencio.

En una gama amplia, identifique cada transición de molde, núcleo, asa, borde o diámetro. Estos puntos necesitan cotas y fotografías propias. Una sola fila de medidas para toda la familia puede omitir precisamente la referencia que requiere otra aprobación.` },
      { heading: "Pruebe el espacio operativo, no solo el catálogo", text: `Compruebe el disco mayor en árboles, pernos horizontales, carros, estanterías, protecciones de máquina y pasillos. Simule retirar una pieza entre discos vecinos. Un asa útil pierde valor si los dedos no tienen paso o el borde golpea el bastidor.

Incluya la logística: una pieza ligera de diámetro completo ocupa más superficie de caja; una pieza metálica compacta concentra masa. Cantidades por SKU, separación, cartón, palé y descarga forman parte de la oferta a granel.

Pruebe el soporte lleno en el punto más estrecho, con topes, etiquetas y cierres instalados. Mida la holgura útil y registre la retirada de una unidad. Esta prueba revela interferencias que una medida aislada del catálogo no puede anticipar.` },
      { heading: "Muestree donde cambia la construcción", text: `No apruebe solamente el disco más fotogénico. Seleccione referencias ligeras, medias y pesadas, y cada punto donde cambien molde, núcleo, agarre, cubo o diámetro. Mida sobre superficie estable en los ejes acordados y compare las parejas.

Un disco ligero de tamaño completo puede necesitar restricciones propias. Confirme la declaración de uso de cada referencia y las instrucciones de barra y plataforma antes de aprobar una configuración mixta.

Marque sobre la muestra los ejes de control y repita la colocación. Si el resultado cambia al girar la pieza, investigue ovalidad, apoyo irregular o borde deformado. Compare varias unidades del mismo SKU y la pareja que trabajará a ambos lados de la barra.` },
      { heading: "Cierre la recepción con datos trazables", text: `Al recibir el lote, identifique cajas, SKU y versión. Revise diámetro, falta de redondez, borde deformado, centrado del inserto, oscilación de la cara, consistencia de pares y ajuste al equipo o almacenamiento previsto. Registre instrumento, unidad y muestra.

El control de masa, agujero, grosor y caída sigue siendo independiente. PowerBaseFit puede estudiar un plan fabricable para suministro mayorista, pero la muestra, los límites, el MOQ y el plazo se confirman según la mezcla real del pedido.

Defina antes del embarque la reacción ante un incumplimiento: separar la referencia, ampliar la muestra, repetir la medición acordada o pedir corrección. Sin una regla de disposición, una desviación menor puede detener todo el envío o aceptarse sin evidencia suficiente.` }
    ],
    table: { heading: "Matriz de decisión del diámetro", columns: ["Familia", "Pregunta clave", "Consecuencia"], rows: [["Bumper de tamaño completo", "¿Qué pesos comparten contorno?", "Altura y contacto con plataforma"], ["Disco técnico", "¿Es grande con poca masa y qué uso permite?", "Aprendizaje y manejo"], ["Hierro o disco con asas", "¿Cambia el diámetro por peso?", "Densidad de almacenamiento"], ["Disco de cambio", "¿Qué perfil y cubo tiene?", "Orden de carga"], ["Máquina plate-loaded", "¿Cuál es la envolvente y el paso de mano?", "Compatibilidad con perno y guarda"], ["Revisión privada", "¿Relieve o logo alteran el borde?", "Reaprobación y reposición"]] },
    tablePosition: 2,
    checklist: { heading: "Lista para RFQ e inspección", items: ["Definir ejercicio, barra o máquina, suelo y contacto", "Listar peso, material, diámetro y tolerancia por SKU", "Separar diámetro exterior, agujero y grosor", "Fijar ejes, superficie terminada, borde y redondez", "Verificar rack, perno, guarda, caja y palé", "Aprobar muestras en cada cambio de construcción", "Controlar logo, color, marcado, molde y revisión", "Acordar muestreo, registros, desviaciones y reaprobación"] },
    faqHeading: "Preguntas frecuentes",
    faq: [["¿Todos los bumper tienen 450 mm?", "Muchas gamas usan ese nominal, pero existen referencias ligeras o técnicas distintas. Revise cada SKU."], ["¿El agujero de 50 mm es el diámetro del disco?", "No. Es la interfaz con la manga; el diámetro exterior es la envolvente total."], ["¿450 mm equivale a aprobación de competición?", "No. La aprobación requiere todos los criterios aplicables, no una sola cota."], ["¿Se pueden mezclar discos de distinto tamaño?", "Pueden compartir manga, pero deben revisarse contacto, caída permitida, orden e instrucciones."], ["¿Cómo se inspecciona la redondez?", "Se miden los ejes definidos con un medio verificado y se registran borde, oscilación y pares."], ["¿PowerBaseFit fabrica discos personalizados?", "La fábrica revisa OEM, ODM, logo, marca privada y volumen según modelo, arte, muestra, cantidades y embalaje."]],
    linkHeading: "Siga completando la ficha del disco",
    linkLabels: ["Ver discos profesionales", "Revisar discos bumper", "Comparar hierro fundido", "Especificar ajuste disco-barra", "Controlar tolerancia de masa", "Calcular grosor y capacidad", "Preparar inspección preembarque", "Enviar la gama para revisión"],
    imageCopy: [["Discos bumper y de hierro sin marca comparados por diámetro exterior en una zona profesional", "El perfil se elige por uso, altura, manejo y espacio."], ["Calibre exterior sobre un disco bumper recibido junto a cajas neutras", "La recepción comprueba la pieza terminada, no solo el nombre comercial."], ["Discos de varios tamaños sujetos en soportes individuales", "Cada cambio de construcción necesita una muestra representativa."]],
    cta: ["Revise el perfil antes de cotizar", "Comparta uso, pesos, barra o máquina, diámetros, identidad de marca y embalaje. Nuestro equipo de fábrica revisará la viabilidad de la gama real.", "Solicitar revisión de discos"]
  },
  {
    locale: "de",
    path: "/de/blog/hantelscheiben-aussendurchmesser-profil-pruefen",
    title: "Hantelscheiben-Außendurchmesser im B2B-Einkauf prüfen",
    description: "Außendurchmesser, Profil, Starthöhe, Lagerpassung, Muster und Wareneingang von Hantelscheiben messbar festlegen.",
    h1: "Außenmaß und Profil von Hantelscheiben prüfen",
    keyword: "Hantelscheiben Außendurchmesser prüfen",
    home: "Startseite",
    library: "Blog",
    eyebrow: "Maßleitfaden für gewerbliche Scheiben",
    sections: [
      { heading: "Kurzantwort: Gewicht und Außenmaß sind zwei Spezifikationen", text: `Bumper- und manche Wettkampfscheiben verwenden innerhalb der Reihe einen gemeinsamen Außendurchmesser. Guss-, Griff-, Wechsel- und Maschinenscheiben können je Nenngewicht deutlich kleiner werden. Die Bohrung beschreibt die Hülsenpassung; die Dicke belegt Länge auf der Aufnahme.

Ein gewerblicher Auftrag nennt alle drei Felder je Artikel. Die Bezeichnung Olympia beweist weder das fertige Außenmaß noch Starthöhe, Lagerabstand oder zulässigen Bodenkontakt.` },
      { heading: "Ordnen Sie jede Scheibe einer Kontaktart zu", text: `Beim Kreuzheben oder Gewichtheben bestimmt die größte aufliegende Scheibe die Achshöhe. Kleinere Scheiben können Last ergänzen, teilen jedoch den Bodenaufprall nicht automatisch. Im Rack oder an einer plate-loaded Maschine zählen dagegen Rahmen, Schutzblech, Nachbarscheiben und Handweg.

Gewichtheberbereiche benötigen oft eine gleichbleibende volle Höhe. Flächeneffiziente Studios und Maschinenparks können abgestufte Profile bevorzugen. Boden, Geräteanleitung und tatsächliche Nutzung gehören in dieselbe Freigabe.` },
      { heading: "450 mm ist ein Regelmaß mit begrenztem Geltungsbereich", text: `Die IWF nennt für die größten Wettkampfscheiben 450 mm mit angegebener Toleranz. Die IPF begrenzt ebenfalls den Durchmesser der größten Scheiben. Daraus folgt keine allgemeine Zulassung oder Qualitätsstufe für jede Trainings-, Bumper- oder Gussscheibe.

Wer mit einem Standard wirbt, soll aktuelle Referenz, betroffene Artikel und Nachweis benennen. Durchmesser allein sagt nichts Sicheres über Masse, Rundheit, Härte, Rückprall, Nabenhalt oder Abwurffreigabe.` },
      { heading: "Beschreiben Sie die fertige Hüllkurve", text: `Die Zeichnung enthält größten fertigen Durchmesser, Toleranz, Messachsen, Rundheit, Kantenradius oder Fase, Grifföffnungen, Relief, Nabenüberstand und Ebenheit. Sie legt fest, ob Formgrat oder erhabene Markierung in das Grenzmaß eingehen.

Bei OEM, ODM, eigener Logografie und Private Label können Formeinsatz, Farbring oder Randgestaltung die Kontur ändern. Zeichnung, Freigabemuster, Verpackung und Revisionskennung müssen zusammenpassen.` },
      { heading: "Prüfen Sie Lager- und Geräteraum am echten Grenzfall", text: `Legen Sie die maximale Kontur gegen Scheibenbaum, waagerechten Dorn, Wagen, Regal, Maschinenrahmen und Schutzabdeckung aus. Testen Sie das Entnehmen zwischen belegten Positionen. Ein ausreichend langer Dorn hilft nicht, wenn der Rand am Rahmen anstößt oder die Hand keinen Weg findet.

Auch die Logistik ändert sich: leichte Vollformatscheiben brauchen große Kartonflächen; kompakte Metallscheiben konzentrieren Gewicht. Stückliste, Trennung, Karton, Palette und Entladung gehören deshalb zur Mengenkalkulation.` },
      { heading: "Bemustern Sie jede Geometriegrenze", text: `Prüfen Sie leichte, mittlere und schwere Artikel sowie jeden Wechsel von Form, Kern, Griff, Nabe oder Durchmesser. Auf einer bestätigten ebenen Fläche werden vereinbarte Achsen gemessen, Kanten beurteilt und Paare verglichen. Das freigegebene Muster oder sein kontrollierter Datensatz bleibt erhalten.

Eine dünne Vollformatscheibe darf nicht allein wegen ihres Durchmessers abgeworfen werden. Die Nutzungsfreigabe jeder Größe und die Anweisungen für Stange und Plattform entscheiden.` },
      { heading: "Wareneingang verbindet Maß, Identität und Verwendung", text: `Ordnen Sie vor der Stichprobe Karton, SKU und Revision zu. Messen Sie definierte Richtungen, erkennen Sie Unrundheit, eingerollte oder beschädigte Kanten, außermittige Naben, Planschlag, Paarabweichung und Passung am vorgesehenen Lager oder Gerät. Messmittel und Einheit werden protokolliert.

Masse, Bohrung, Dicke und Fallverhalten bleiben getrennte Prüfungen. PowerBaseFit kann ein fertigungsnahes Paket für Großhandel prüfen; Stichprobe, Grenzwerte, Mindestmenge und Termin werden anhand des tatsächlichen Mixes bestätigt.` }
    ],
    table: { heading: "Entscheidungsmatrix für das Außenprofil", columns: ["Scheibenart", "Zu klärende Frage", "Auswirkung"], rows: [["Vollformat-Bumper", "Welche Gewichte teilen die Kontur?", "Starthöhe und Bodenkontakt"], ["Technikscheibe", "Volles Maß bei kleiner Masse; welche Nutzung?", "Lernhöhe und Handhabung"], ["Guss- oder Griffscheibe", "Wächst der Durchmesser mit dem Gewicht?", "Lagerdichte und Mischsatz"], ["Wechselscheibe", "Wie kompakt sind Profil und Nabe?", "Ladereihenfolge"], ["Maschinenscheibe", "Welche Hülle und Handfreiheit gelten?", "Dorn-, Rahmen- und Schutzpassung"], ["Private-Label-Version", "Ändert Relief oder Rand die Kontur?", "Neufreigabe und Nachkauf"]] },
    tablePosition: 3,
    checklist: { heading: "Pflichtenheft und Wareneingang", items: ["Nutzung, Stange oder Maschine, Boden und Kontaktart nennen", "Nenngewicht, Material, Durchmesser und Toleranz je SKU angeben", "Außenmaß, Bohrung und Dicke trennen", "Messachsen, Endzustand, Kante und Rundheit festlegen", "Lager, Dorn, Schutz, Karton und Palette am Grenzfall prüfen", "Muster an jedem Konstruktionswechsel freigeben", "Logo, Farbe, Markierung, Form und Revision einfrieren", "Stichprobe, Bericht, Abweichung und Neufreigabe vereinbaren"] },
    faqHeading: "Häufige Fragen",
    faq: [["Sind alle Bumper Plates gleich groß?", "Viele Vollformatreihen sind einheitlich, doch leichte oder besondere Modelle können abweichen. Jede SKU prüfen."], ["Sind 50-mm-Bohrung und 450-mm-Durchmesser dasselbe?", "Nein. Die Bohrung passt zur Hülse; 450 mm beschreiben ein Außenmaß."], ["Beweist 450 mm eine Wettkampfzulassung?", "Nein. Eine Zulassung umfasst weitere Regeln und gilt nur mit passendem Nachweis."], ["Dürfen verschiedene Durchmesser auf eine Stange?", "Die Hülse kann passen, doch Bodenkontakt, Abwurf, Reihenfolge und Anleitungen sind zu klären."], ["Wie wird Rundheit kontrolliert?", "Mehrere vereinbarte Achsen und ein geeignetes geprüftes Messmittel zeigen Kontur- und Paarabweichungen."], ["Liefert PowerBaseFit Scheiben mit eigenem Logo?", "OEM, ODM, Logo, Private Label und Großhandel werden je Modell, Muster, Menge, Prüfung und Verpackung bewertet."]],
    linkHeading: "Weitere Bausteine der Scheibenspezifikation",
    linkLabels: ["Gewerbliche Hantelscheiben ansehen", "Bumper Plates prüfen", "Gussscheiben vergleichen", "Scheiben-Hülsen-Passung festlegen", "Massentoleranz kontrollieren", "Dicke und Hülsenkapazität berechnen", "Vorversandprüfung planen", "Scheibenreihe zur Prüfung senden"],
    imageCopy: [["Bumper-Hantelscheibe auf ebener Fläche zwischen mechanischen Grenzlehren", "Das fertige Außenprofil wird mit der freigegebenen Zeichnung verglichen."], ["Einheitliche Bumper-Scheiben an einer geraden Referenzleiste", "Mehrere Artikel zeigen Rundheit und Wiederholbarkeit besser als ein Muster."], ["Vollformat-Bumper und abgestufte Gussscheiben sicher gelagert", "Raum, Handweg und Nutzung bestimmen das passende Profil."]],
    cta: ["Grenzmaße vor dem Angebot klären", "Senden Sie Nutzung, Gewichte, Stangen- oder Maschinenbezug, Außenprofile, Logodaten und Verpackung. Unser Werksteam prüft eine messbare Lösung für den konkreten Mix.", "Scheibenspezifikation anfragen"]
  },
  {
    locale: "fr",
    path: "/fr/blog/diametre-exterieur-disques-profil-achat",
    title: "Diamètre Extérieur des Disques : Guide d'Achat B2B",
    description: "Définissez diamètre extérieur, profil, hauteur de barre, rangement, échantillons et contrôle des disques professionnels.",
    h1: "Spécifier le Diamètre Extérieur des Disques de Musculation",
    keyword: "diamètre extérieur disque de musculation",
    home: "Accueil",
    library: "Blog",
    eyebrow: "Guide dimensionnel pour l'achat de disques",
    sections: [
      { heading: "Réponse directe : le poids ne fixe pas le diamètre", text: `Les bumper plates et certains disques de compétition gardent une enveloppe commune, alors que les modèles en fonte, à poignées, fractionnaires ou destinés aux machines peuvent changer de diamètre selon la charge. L'alésage central et l'épaisseur répondent à deux autres questions.

Pour un achat professionnel, inscrivez ces trois cotes séparément pour chaque référence. Le mot olympique ne suffit pas à valider hauteur de départ, encombrement, stockage ou contact au sol.` },
      { heading: "Reliez l'enveloppe à la zone d'entraînement", text: `Au soulevé de terre et en haltérophilie, le plus grand disque en appui fixe la hauteur de l'axe. Les petits disques ajoutent de la charge sans nécessairement toucher la plateforme. Lors d'un lâcher autorisé, cette différence modifie aussi la répartition du contact.

Un plateau d'haltérophilie, une salle polyvalente, un hôtel et une zone de machines n'ont pas le même besoin. Précisez sol, plateforme, circulation, rangement et consignes du fabricant avant de choisir plein format ou profil gradué.` },
      { heading: "Gardez les règles sportives dans leur périmètre", text: `L'IWF publie 450 mm avec une tolérance indiquée pour les plus grands disques de compétition. L'IPF limite elle aussi le diamètre des plus grands disques. Ces textes éclairent une géométrie réglementée, mais ne classent pas automatiquement tout disque commercial.

Si un fournisseur cite une norme, demandez le texte actuel, la référence concernée et la preuve associée. Une cote nominale ne confirme ni masse, ni circularité, ni rebond, ni tenue de l'insert, ni autorisation de chute.` },
      { heading: "Décrivez bord, relief et face finie", text: `Le plan doit montrer diamètre fini maximal, tolérance, axes de mesure, circularité, rayon ou chanfrein, relief, poignées, saillie du moyeu et planéité. Il précise si bavure souple, lettrage ou lèvre entrent dans l'enveloppe.

En OEM, ODM, logo personnalisé ou marque privée, un insert de moule, un anneau de couleur ou un nouveau bord peut modifier l'appui. Plan, artwork, échantillon, emballage et indice de révision doivent rester liés.` },
      { heading: "Mesurez l'accès dans une salle chargée", text: `Comparez le diamètre maximal aux arbres à disques, broches, chariots, rayonnages, montants et carters de machines. Testez la prise entre deux disques voisins. Une pièce qui entre sur une broche vide peut rester pénible ou risquée à retirer en exploitation.

Le conditionnement change aussi. Un disque léger plein format occupe une grande face de carton ; un disque métallique compact concentre la masse. Quantités, séparateurs, palettes et déchargement doivent suivre la composition réelle de la fourniture en volume.` },
      { heading: "Validez les ruptures de gamme par échantillons", text: `Choisissez une référence légère, intermédiaire et lourde, puis chaque changement de moule, noyau, poignée, moyeu ou diamètre. Sur un support plan confirmé, mesurez les axes convenus, observez le bord et comparez la paire.

Un disque léger de 450 mm n'est pas autorisé à tomber par sa seule forme. Conservez la notice d'usage de chaque référence et validez les empilements mixtes avec les instructions de la barre et de la plateforme.` },
      { heading: "Décidez la réception avec des preuves nommées", text: `Avant l'échantillonnage, reliez carton, SKU et révision. Contrôlez les directions prévues, l'ovalisation visible, le bord endommagé, le centrage du moyeu, le voile de face, l'accord des paires et l'accès au rangement ou à la machine cible.

Notez instrument, unité et identité. Masse, alésage, épaisseur et chute conservent leurs propres critères. PowerBaseFit peut revoir un plan réalisable en usine ; échantillon, limites, minimum de commande et délai dépendent du mix final.` }
    ],
    table: { heading: "Matrice du profil extérieur", columns: ["Famille", "Question à poser", "Effet acheteur"], rows: [["Bumper plein format", "Quelles masses partagent l'enveloppe ?", "Hauteur et contact plateforme"], ["Disque technique", "Plein format léger et quel usage admis ?", "Apprentissage et manutention"], ["Fonte ou poignées", "Le diamètre varie-t-il par masse ?", "Densité de rangement"], ["Disque de changement", "Quel profil compact et quelle saillie ?", "Ordre de chargement"], ["Machine plate-loaded", "Quelle enveloppe et quel passage de main ?", "Compatibilité broche et carter"], ["Marque privée", "Relief, logo ou bord ont-ils changé ?", "Nouvelle validation et réassort"]] },
    tablePosition: 3,
    checklist: { heading: "Cahier des charges et réception", items: ["Nommer usage, barre ou machine, sol et contact prévu", "Lister masse, matière, diamètre et tolérance par SKU", "Séparer diamètre extérieur, alésage et épaisseur", "Définir axes, finition, bord et circularité", "Vérifier arbre, broche, carter, carton et palette", "Valider chaque changement de construction par échantillon", "Figer logo, couleur, marquage, moule et révision", "Convenir de l'échantillonnage et du traitement des écarts"] },
    faqHeading: "Questions fréquentes",
    faq: [["Tous les bumper plates mesurent-ils 450 mm ?", "Beaucoup de gammes plein format suivent ce nominal, mais des modèles légers ou particuliers diffèrent. Vérifiez chaque SKU."], ["L'alésage de 50 mm est-il le diamètre du disque ?", "Non. L'alésage concerne le manchon ; le diamètre extérieur est l'enveloppe complète."], ["450 mm prouve-t-il une homologation ?", "Non. Une cote isolée ne valide pas l'ensemble des exigences ni une homologation."], ["Peut-on mélanger plusieurs diamètres ?", "Ils peuvent partager un manchon, mais contact au sol, chute, ordre et notices doivent être examinés."], ["Comment contrôler la circularité ?", "Mesurez les axes convenus avec un moyen vérifié et consignez bord, voile et paire."], ["PowerBaseFit propose-t-il des disques personnalisés ?", "Nous étudions OEM, ODM, logo, marque privée et volume selon modèle, échantillon, quantités et emballage."]],
    linkHeading: "Compléter la spécification du disque",
    linkLabels: ["Voir les disques professionnels", "Examiner les bumper plates", "Comparer la fonte", "Définir l'ajustement disque-barre", "Contrôler la tolérance de masse", "Calculer épaisseur et capacité", "Préparer l'inspection avant expédition", "Envoyer la gamme à examiner"],
    imageCopy: [["Disques plein format et gradués rangés avec un gabarit de dégagement sans marque", "Le rangement se valide avec l'enveloppe maximale et le passage de main."], ["Disques de différents profils présentés sur supports individuels", "Chaque famille relie usage, masse, diamètre et construction."], ["Disques bumper alignés contre une référence droite", "La série finie doit rester cohérente avec l'échantillon approuvé."]],
    cta: ["Faire examiner l'enveloppe de la gamme", "Transmettez usage, masses, barre ou machine, diamètres, personnalisation et emballage. Notre équipe usine examinera la faisabilité du mix précis.", "Demander une revue technique"]
  }
];
