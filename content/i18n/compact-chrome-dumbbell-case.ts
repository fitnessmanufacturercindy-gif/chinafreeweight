import type {
  ContentBlock,
  ContentEntity,
  LocalizedContentVersion,
  LocalizedFaq,
  LocalizedInternalLink
} from "../../lib/content/types";
import type { InternalLocale } from "../../i18n/locale-registry";
import {
  caseSectionExpansions,
  caseSectionSupplements
} from "./compact-chrome-dumbbell-case-expansions";

export type CaseLocale = Extract<
  InternalLocale,
  "en" | "es" | "pt-BR" | "fr" | "ar" | "de" | "ko" | "vi" | "sv" | "it" | "pl"
>;

type CaseCopy = {
  locale: CaseLocale;
  path: string;
  title: string;
  description: string;
  h1: string;
  mainKeyword: string;
  secondaryKeywords: string[];
  targetAudience: string;
  breadcrumbHome: string;
  breadcrumbProjects: string;
  sections: Array<[string, string]>;
  faq: Array<[string, string]>;
  links: Array<[string, string]>;
  imageAlt: [string, string];
  imageCaption: [string, string];
  ctaTitle: string;
  ctaText: string;
  ctaLabel: string;
  contactPath: string;
  eyebrow: string;
};

const publishedAt = "2026-07-27T05:30:00.000Z";
const imagePaths = [
  "/assets/projects/compact-chrome-dumbbell-set.webp",
  "/assets/projects/compact-chrome-dumbbell-set-detail.webp"
] as const;

const copies: CaseCopy[] = [
  {
    locale: "en",
    path: "/projects/compact-chrome-dumbbell-set",
    title: "Compact Chrome Dumbbell Set Application Case | 1–10 kg Rack",
    description: "A real equipment application case showing paired 1–10 kg chrome dumbbells on a compact X-frame rack for studios, hotel gyms and light free-weight zones.",
    h1: "Compact 1–10 kg Chrome Dumbbell Set with X-Frame Storage",
    mainKeyword: "compact chrome dumbbell set with rack",
    secondaryKeywords: ["1-10 kg dumbbell set", "commercial chrome dumbbells", "space-saving dumbbell rack", "studio free weight equipment"],
    targetAudience: "Gym project buyers, hotel fitness managers, personal training studios, importers and distributors",
    breadcrumbHome: "Home",
    breadcrumbProjects: "Projects",
    eyebrow: "Real equipment application · compact free weights",
    sections: [
      ["Project overview", "This real application image shows ten paired fixed dumbbells arranged by weight on a black X-frame storage rack. The visible end markings progress in kilograms and support identification from the light end of the range through 10 kg. The polished heads, compact handles and open two-sided rack create a small-footprint free-weight station with a strong visual contrast.\n\nThe image is a product-and-storage application reference, not evidence of a named customer installation. No facility name, location, order quantity, contract value or performance result is claimed. Its value is practical: it lets a buyer discuss a clearly visible equipment combination before confirming dimensions, materials, tolerances, finish and packing with the factory."],
      ["Case background: the light-dumbbell requirement", "A complete commercial dumbbell bay often extends far beyond 10 kg, but many facilities still need a separate light range. Personal-training rooms, hotel fitness rooms, rehabilitation-oriented spaces, group-exercise corners and beginner zones use small increments for controlled movement, warm-ups, shoulder work and accessory exercises.\n\nIn these settings, a long horizontal rack can consume more wall length than the program justifies. A vertical or X-frame arrangement groups ten pairs into one defined station. The pictured solution therefore answers a specific planning problem: how to make a continuous light-weight range visible and orderly without presenting it as the only strength equipment a full commercial gym needs."],
      ["Equipment solution visible in the image", "The solution combines fixed chrome dumbbells, engraved kilogram end markings and an open black rack with individual support positions. The photograph supports identification of paired weights and a 1 kg step pattern up to 10 kg. It also shows a freestanding base and a rack shape that distributes the pairs along both outer arms.\n\nThe picture does not verify steel grade, coating thickness, exact footprint, total rack rating or dumbbell weight tolerance. Those points belong in the quotation and approved specification. A professional buyer should request a model drawing, loaded dimensions, net and gross weight, handle diameter, knurling reference, finish standard, cradle details, packaging method and replacement-part policy before purchase."],
      ["Why this product mix can work", "Fixed dumbbells remove the adjustment step between users. Clear end markings support fast selection, while 1 kg increments allow smaller changes than a coarse commercial range. Chrome creates a clean, compact appearance that can suit hospitality and studio interiors when cleaning and humidity are controlled.\n\nThe rack is part of the operating solution rather than an accessory added at the end. Every pair has a visible return position, helping staff keep the zone organized. The trade-off is equally important: polished metal can show fingerprints and surface damage, and closely spaced cradles require deliberate handling. Buyers should compare appearance, grip, cleaning routine and expected traffic instead of choosing on finish alone."],
      ["Product selection logic", "Durability should be evaluated through construction, head-to-handle security, finish adhesion or plating quality, marking legibility and repeatable weight control. Commercial use also requires a rack that remains stable while weights are removed unevenly. The photo demonstrates the arrangement, but the supplier specification must define the measurable acceptance points.\n\nTraining versatility comes from the uninterrupted light range. It supports raises, presses, curls, controlled lower-body accessories, mobility work and progressive introductory training. Space efficiency comes from vertical distribution, although the true operating footprint must include the user standing area and the path for removing and returning each dumbbell. A compact rack should never be placed where its projecting weights narrow an escape or circulation route."],
      ["Application value for a training facility", "For a studio, this station can give coaches quick access to small increments during one-to-one sessions. In a hotel gym, it can provide an approachable fixed-weight choice beside cardio equipment and a bench. In a larger club, it can separate light accessory work from the main heavy dumbbell bay. These are application possibilities, not claims about the unidentified room in the photo.\n\nThe set supports strength and functional exercise where moderate loads and precise progression matter. It does not replace barbells, plates, benches, flooring or heavier dumbbells when the facility promises a complete strength offer. Good planning defines the user group first, then checks whether 1–10 kg is a complete range for that zone or one module within a broader free-weight layout."],
      ["Layout, storage and operating checks", "Before ordering, place the rack footprint on a scaled plan and add clearance for hands, elbows and the user’s stance. Confirm that the heaviest positions are easy to reach and that the rack stays stable when only one side is loaded. The floor should be level and suitable for the combined equipment weight. Local safety and accessibility requirements remain the responsibility of the facility project team.\n\nDaily operation should include returning each pair to the marked position, wiping handles with a compatible cleaner and checking fasteners, supports and floor contact points. Staff should isolate any dumbbell with looseness, sharp damage or an unreadable marking. Chrome products should be kept dry, especially in humid rooms or close to pools, and the approved care instructions should take priority over generic cleaning advice."],
      ["Manufacturer perspective: specification before promise", "From a manufacturer’s perspective, a reliable program begins with the buyer’s intended market, weight range, quantity per weight, logo method, finish reference and packaging route. Material preparation, machining, joining, surface finishing, marking, weight verification, rack trial loading and packing checks should be tied to an approved sample or specification.\n\nExport packing is especially relevant because polished heads can contact one another or the rack during transport. Protective separation, carton strength, moisture control, hardware labeling and assembly instructions should be confirmed for the actual shipping method. PowerBaseFit can review an inquiry and prepare a product-specific proposal; final dimensions, materials, MOQ, lead time and test requirements are confirmed in the commercial and technical documents."],
      ["What to send for a comparable solution", "Send the facility type, available floor area, expected users, required kilogram range, number of simultaneous users and destination country. State whether the set will serve a hotel room, PT studio, wellness facility, home-gym retail program or a light zone inside a commercial club.\n\nFor a useful factory quotation, include the preferred finish, logo artwork, packaging expectations, quantity, delivery schedule and any mandatory market documents. Ask for a line-item list showing every pair, the rack, spare hardware and packing units. This keeps the visual reference connected to a verifiable specification rather than turning one attractive photograph into an unsupported project story."]
    ],
    faq: [
      ["What does this real application image show?", "It shows paired fixed chrome dumbbells arranged on a black X-frame rack, with kilogram markings progressing through a light range up to 10 kg. It does not identify a customer or prove a completed facility installation."],
      ["Is a 1–10 kg dumbbell set enough for a commercial gym?", "It can be enough for a light-training, hotel, studio or beginner zone. A full strength gym will normally assess heavier dumbbells, benches, barbells, plates, flooring and storage as separate requirements."],
      ["Why choose fixed dumbbells instead of adjustable dumbbells?", "Fixed dumbbells allow immediate selection and can support faster user turnover. Adjustable products save space differently but add a change mechanism and require their own durability and operating assessment."],
      ["What should buyers verify about the rack?", "Verify loaded dimensions, rated capacity, frame material, finish, cradle design, base stability, hardware, assembly instructions and behavior when weights are removed unevenly."],
      ["How should chrome dumbbells be maintained?", "Use the approved cleaner, dry the surface after wiping, avoid prolonged moisture and inspect the heads, handles, markings and rack contact areas. Follow the supplier’s care instructions for the confirmed finish."],
      ["Can the logo or kilogram markings be customized?", "Depending on the confirmed model and order, logo, marking and packaging options may be evaluated. Feasibility, MOQ, artwork method and sample approval must be confirmed before production."],
      ["What information is needed for a factory quote?", "Provide the weight range, pairs per weight, rack requirement, quantity, destination, branding, packaging, timeline and any required technical or compliance documents."]
    ],
    links: [["dumbbells-category", "Compare commercial dumbbells"], ["chrome-dumbbell", "View chrome dumbbell options"], ["dumbbells-guide", "Read the dumbbell selection guide"], ["projects", "Explore project references"], ["factory", "Review the factory process"], ["contact", "Discuss your equipment list"]],
    imageAlt: ["Paired 1–10 kg chrome dumbbells stored on a black X-frame rack", "Close view of kilogram markings and chrome dumbbell supports on the compact rack"],
    imageCaption: ["Real equipment application: a compact paired chrome dumbbell range organized on an X-frame rack.", "The detail crop shows the visible weight markings, polished heads and individual storage positions."],
    ctaTitle: "Plan a compact dumbbell station",
    ctaText: "Send your weight range, available space, quantity, branding and destination for a product-specific factory discussion.",
    ctaLabel: "Request the free-weight catalog",
    contactPath: "/contact"
  },
  {
    locale: "es",
    path: "/es/proyectos/conjunto-mancuernas-cromadas-compacto",
    title: "Caso real: set de mancuernas cromadas de 1 a 10 kg",
    description: "Aplicación real de diez pares de mancuernas cromadas de 1 a 10 kg en un soporte compacto en X para estudios, hoteles y zonas de peso ligero.",
    h1: "Set compacto de mancuernas cromadas de 1 a 10 kg con soporte en X",
    mainKeyword: "set de mancuernas cromadas con soporte",
    secondaryKeywords: ["mancuernas 1 a 10 kg", "soporte compacto para mancuernas", "mancuernas para estudio profesional", "zona de peso libre pequeña"],
    targetAudience: "Compradores de gimnasios, estudios de entrenamiento, hoteles, importadores y distribuidores",
    breadcrumbHome: "Inicio",
    breadcrumbProjects: "Proyectos",
    eyebrow: "Aplicación real · almacenamiento compacto",
    sections: [
      ["Resumen del caso", "La fotografía real muestra diez pares de mancuernas fijas cromadas colocadas por peso en un soporte negro con forma de X. Se distinguen marcaciones en kilogramos y una progresión ligera que llega hasta 10 kg. El contraste entre el metal pulido y la estructura oscura crea una estación ordenada y fácil de identificar.\n\nLa imagen no permite atribuir el equipo a un cliente, una ciudad ni una instalación terminada. Por eso este contenido se presenta como caso de aplicación del producto. Sirve para estudiar una combinación visible de mancuernas y almacenamiento sin inventar contrato, cantidad de pedido, testimonio o resultado comercial."],
      ["Necesidad de entrenamiento", "En España y Latinoamérica, un estudio de entrenamiento personal, un gimnasio de hotel o una zona de iniciación puede necesitar incrementos pequeños más que cargas muy altas. Una serie de 1 a 10 kg facilita trabajo de hombro, movilidad con carga, ejercicios accesorios y progresión de usuarios principiantes.\n\nEn un gimnasio de fuerza completo esta serie sería un módulo, no todo el equipamiento. La decisión correcta depende del perfil del usuario, del número de personas que entrenan a la vez y de la oferta prometida por el centro. Los pesos de mayor uso pueden requerir pares adicionales."],
      ["Solución visible", "El conjunto combina mancuernas de peso fijo, indicación frontal en kg y posiciones individuales de apoyo a ambos lados de la estructura. El formato vertical reduce la longitud de pared necesaria y mantiene cada par en una posición reconocible.\n\nNo deben deducirse de la foto el tipo exacto de acero, la tolerancia de peso, el espesor del cromado ni la capacidad del soporte. Antes de comprar conviene solicitar plano, medidas cargadas, peso neto y bruto, diámetro del agarre, referencia de moleteado, sistema de apoyo, herrajes y embalaje."],
      ["Criterios de selección", "La durabilidad comercial se comprueba en la unión entre cabeza y empuñadura, el acabado, la legibilidad de la marca y la estabilidad con carga desigual. El aspecto cromado puede encajar en espacios de hospitalidad o estudios premium, pero exige una rutina de limpieza compatible y control de humedad.\n\nLa eficiencia espacial no se limita a la huella del soporte. El plano debe reservar zona para agarrar y devolver las mancuernas sin interferir con pasillos, bancos o salidas. También hay que confirmar que los apoyos no dañen el acabado durante un uso repetido."],
      ["Valor para la instalación", "En un hotel, el rango ligero resulta accesible junto a equipos de cardio y un banco. En un estudio, permite al entrenador cambiar de carga rápidamente. En un club mayor, puede descargar la zona principal de mancuernas pesadas y concentrar trabajo auxiliar en una estación separada.\n\nEstas son aplicaciones razonables del conjunto observado, no resultados del lugar fotografiado. Un proyecto completo puede necesitar además suelo técnico, bancos, barras, discos y almacenamiento. La selección debe relacionarse con ejercicios previstos y flujo de usuarios."],
      ["Uso y mantenimiento", "El personal debe devolver cada par a su posición, limpiar las empuñaduras con un producto aprobado y revisar tornillos, apoyos y puntos de contacto con el suelo. Cualquier holgura, borde dañado o marca ilegible requiere retirar temporalmente la pieza.\n\nLa superficie cromada debe mantenerse seca y lejos de ambientes agresivos cuando la especificación no declare protección para ellos. El manual del proveedor y la evaluación local de seguridad tienen prioridad sobre recomendaciones generales."],
      ["Perspectiva del fabricante", "Para cotizar con precisión se necesita rango de pesos, pares por peso, cantidad de soportes, logotipo, acabado, embalaje y destino. La muestra aprobada debe conectar material, mecanizado, acabado, marcación, control de peso, prueba de montaje y protección para exportación.\n\nLas cabezas pulidas necesitan separación durante el transporte. Deben confirmarse cartones, protecciones, identificación de herrajes y manual de montaje. MOQ, plazo y criterios de inspección se definen para el modelo y el pedido reales."],
      ["Cómo preparar una consulta", "Envíe tipo de instalación, espacio disponible, usuarios previstos, rango de kg y país de destino. Indique si se trata de hotel, estudio, wellness, venta minorista o zona ligera dentro de un gimnasio comercial.\n\nAñada cantidad, arte del logotipo, preferencia de acabado, requisitos de embalaje y fecha objetivo. Solicite una lista por peso y una ficha del soporte para que la referencia visual se convierta en una especificación comprobable."]
    ],
    faq: [
      ["¿Qué demuestra la imagen?", "Demuestra una combinación real de pares de mancuernas cromadas y soporte negro en X, con marcación en kg hasta 10 kg. No demuestra quién fue el cliente ni dónde se instaló."],
      ["¿Es suficiente de 1 a 10 kg para un gimnasio?", "Puede cubrir una zona ligera o un estudio. Un gimnasio de fuerza debe valorar cargas superiores y otros equipos según su programa."],
      ["¿Qué hay que comprobar en el soporte?", "Medidas cargadas, capacidad, material, estabilidad, apoyos, herrajes, montaje y comportamiento al retirar peso de un solo lado."],
      ["¿El cromado requiere mantenimiento?", "Sí. Debe limpiarse con productos compatibles, secarse y revisarse para detectar daño superficial o humedad."],
      ["¿Se puede personalizar el logotipo?", "Puede evaluarse según modelo, cantidad y método de marcación. La viabilidad y la muestra se confirman antes de producir."],
      ["¿Qué datos necesita la fábrica?", "Rango, pares por peso, cantidad, soporte, destino, marca, embalaje, plazo y documentación requerida."]
    ],
    links: [["dumbbells-category", "Ver mancuernas profesionales"], ["chrome-dumbbell", "Comparar mancuernas cromadas"], ["dumbbells-guide", "Guía para elegir mancuernas"], ["projects", "Ver referencias de proyectos"], ["factory", "Conocer el proceso de fábrica"], ["contact", "Enviar la lista del proyecto"]],
    imageAlt: ["Pares de mancuernas cromadas de 1 a 10 kg en soporte negro compacto en X", "Detalle de las marcas en kg y apoyos del soporte para mancuernas cromadas"],
    imageCaption: ["Aplicación real de una serie ligera de mancuernas organizada en vertical.", "Detalle real del acabado, la identificación y las posiciones individuales."],
    ctaTitle: "Defina su estación compacta de mancuernas",
    ctaText: "Comparta rango, espacio, cantidad, personalización y destino para revisar una propuesta de fábrica.",
    ctaLabel: "Solicitar catálogo y cotización",
    contactPath: "/es/contacto"
  },
  {
    locale: "pt-BR",
    path: "/pt/projetos/conjunto-halteres-cromados-compacto",
    title: "Caso real: conjunto de halteres cromados de 1 a 10 kg",
    description: "Aplicação real de halteres cromados de 1 a 10 kg em pares, organizados em rack compacto em X para estúdios, hotéis e áreas leves.",
    h1: "Conjunto compacto de halteres cromados de 1 a 10 kg com rack em X",
    mainKeyword: "conjunto de halteres cromados com rack",
    secondaryKeywords: ["halteres 1 a 10 kg", "rack compacto para halteres", "halteres para estúdio", "área de peso livre compacta"],
    targetAudience: "Academias, hotéis, estúdios, importadores e distribuidores no Brasil",
    breadcrumbHome: "Início",
    breadcrumbProjects: "Projetos",
    eyebrow: "Aplicação real · pesos livres compactos",
    sections: [
      ["Visão geral da aplicação", "A imagem mostra dez pares de halteres fixos cromados distribuídos em um rack preto em X. As extremidades apresentam marcações em quilogramas e permitem reconhecer uma sequência leve até 10 kg. O arranjo ocupa pouca extensão linear e deixa cada par visível.\n\nNão há informação verificável sobre cliente, academia, cidade ou volume do pedido. Por isso, o material é tratado como caso real de aplicação do equipamento, sem depoimento ou resultado inventado. A fotografia apoia a conversa de especificação; não substitui desenho, ficha técnica e amostra aprovada."],
      ["Demanda atendida", "Hotéis, condomínios, studios de personal e áreas de iniciação costumam usar cargas menores para exercícios de ombro, braços, mobilidade, aquecimento e progressão controlada. Passos de 1 kg ajudam quando saltos maiores seriam excessivos.\n\nPara uma academia comercial completa, 1 a 10 kg representa apenas uma faixa. Pesos mais altos, duplicação das cargas populares, bancos, barras, anilhas, piso e circulação precisam ser planejados conforme público e horário de pico."],
      ["Solução de equipamentos", "A combinação visível reúne halteres de peso fixo, identificação frontal e posições individuais no rack. A estrutura distribui os pares nos dois lados e mantém a ordem sem exigir uma estante horizontal longa.\n\nA foto não confirma material, tolerância, espessura do acabamento, dimensão carregada ou capacidade. O comprador deve pedir diâmetro e textura da pegada, construção da cabeça, estabilidade, desenho dos apoios, ferragens, montagem e embalagem."],
      ["Lógica de seleção", "Durabilidade comercial envolve segurança da união, controle de peso, acabamento consistente e rack estável mesmo com retirada desigual. O cromado entrega apresentação limpa, mas pode evidenciar marcas de uso e requer limpeza compatível.\n\nEficiência de espaço deve considerar o usuário diante do rack. A estação precisa de área para pegar e devolver os pesos sem bloquear rota de circulação. A base deve permanecer nivelada e os apoios não podem criar contato agressivo com as peças."],
      ["Valor operacional", "No studio, o treinador acessa incrementos pequenos sem ajustar discos. No hotel, o conjunto oferece uma opção intuitiva próxima ao cardio. Em uma academia maior, pode formar uma estação leve separada da linha principal.\n\nEsses usos são possibilidades coerentes com a configuração, não alegações sobre o local da imagem. O projeto deve decidir se a série é autônoma ou parte de uma área de força mais ampla."],
      ["Rotina de uso", "Cada par deve voltar à posição identificada. A equipe verifica folgas, parafusos, apoios, pés e legibilidade das marcações. Uma peça com dano ou movimento anormal deve sair de uso até avaliação.\n\nSuperfícies cromadas devem ser limpas com produto aprovado e secas. Ambientes úmidos exigem análise específica do acabamento. As instruções confirmadas pelo fornecedor prevalecem."],
      ["Ponto de vista de fábrica", "Uma cotação responsável começa por faixa, pares por peso, quantidade, logotipo, acabamento, embalagem, mercado e cronograma. A amostra aprovada conecta material, usinagem, marcação, controle de peso e encaixe no rack.\n\nPara exportação, as peças polidas precisam de separação e proteção contra contato. Caixa, ferragens, manual e identificação devem ser verificados para o modal real. MOQ e prazo são definidos após o escopo."],
      ["Briefing para cotação", "Informe tipo de instalação, metragem disponível, usuários, faixa de kg, quantidade e destino. Diga se o conjunto vai para hotel, condomínio, studio, varejo ou área leve de academia.\n\nAnexe logotipo, referência de acabamento, expectativa de embalagem e data. Peça lista item a item e desenho carregado do rack para transformar a imagem em especificação auditável."]
    ],
    faq: [
      ["O que a foto comprova?", "Uma aplicação real de pares de halteres cromados em rack preto em X, com sequência em kg até 10 kg. Ela não identifica cliente ou instalação."],
      ["1 a 10 kg atende academia comercial?", "Atende uma zona leve em muitos projetos. Uma academia completa normalmente precisa avaliar pesos maiores e outros equipamentos."],
      ["Quais dados do rack confirmar?", "Dimensão carregada, capacidade, material, estabilidade, apoios, ferragens, montagem e proteção do piso."],
      ["Como cuidar do cromado?", "Use limpeza compatível, seque a superfície e inspecione acabamento, empunhadura e pontos de contato."],
      ["É possível aplicar marca própria?", "A possibilidade depende do modelo, quantidade, arte e processo. Tudo deve ser aprovado antes da produção."],
      ["O que enviar para orçamento?", "Faixa, pares, quantidade, rack, destino, marca, embalagem, prazo e documentação de mercado."]
    ],
    links: [["dumbbells-category", "Comparar halteres profissionais"], ["chrome-dumbbell", "Ver opções cromadas"], ["dumbbells-guide", "Planejar a faixa de halteres"], ["projects", "Ver referências de projeto"], ["factory", "Entender a fábrica"], ["contact", "Enviar o briefing"]],
    imageAlt: ["Pares de halteres cromados de 1 a 10 kg em rack preto compacto em X", "Detalhe das marcações em kg e dos apoios para halteres cromados"],
    imageCaption: ["Aplicação real de pesos leves com armazenamento vertical compacto.", "O recorte mostra identificação, acabamento polido e posições individuais."],
    ctaTitle: "Planeje um conjunto compacto para seu espaço",
    ctaText: "Envie faixa de pesos, área, quantidade, marca e destino para uma análise de fornecimento.",
    ctaLabel: "Pedir catálogo e cotação",
    contactPath: "/pt/contato"
  },
  {
    locale: "fr",
    path: "/fr/projets/ensemble-halteres-chromes-compact",
    title: "Cas réel : haltères chromés 1 à 10 kg sur rack compact",
    description: "Application réelle de dix paires d’haltères chromés de 1 à 10 kg sur un rack en X pour studio, hôtel et espace de charges légères.",
    h1: "Ensemble compact d’haltères chromés de 1 à 10 kg avec rack en X",
    mainKeyword: "ensemble haltères chromés avec rack",
    secondaryKeywords: ["haltères 1 à 10 kg", "rack haltères compact", "haltères studio professionnel", "petite zone poids libres"],
    targetAudience: "Exploitants de salles, hôtels, studios, importateurs et distributeurs",
    breadcrumbHome: "Accueil",
    breadcrumbProjects: "Projets",
    eyebrow: "Application réelle · rangement vertical",
    sections: [
      ["Lecture factuelle de l’image", "La photographie présente dix paires d’haltères fixes chromés rangées par poids sur une structure noire en X. Les marquages en kilogrammes et la progression jusqu’à 10 kg sont visibles. La disposition verticale rend chaque paire repérable tout en limitant la longueur occupée au sol.\n\nAucun élément ne permet d’identifier un client, une ville ou une installation livrée. Cette page décrit donc une application réelle de matériel, sans inventer de commande, de témoignage ni de résultat. Les points techniques non visibles doivent être confirmés dans la fiche et l’échantillon."],
      ["Contexte d’utilisation", "Une salle d’hôtel, un studio de coaching ou une zone d’initiation recherche souvent des incréments fins pour les épaules, les bras, l’échauffement et le travail accessoire. Un pas de 1 kg facilite la progression pour les utilisateurs qui ne souhaitent pas de saut important.\n\nDans un club de musculation complet, cette plage légère complète une série plus lourde. Le nombre de paires doit être défini selon la fréquentation, les cours et les charges les plus demandées."],
      ["Composition de la solution", "Le système associe haltères fixes, repères frontaux et supports individuels répartis sur les deux côtés. Le rack matérialise une place de retour pour chaque paire et évite une longue ligne horizontale.\n\nLa nuance d’acier, la tolérance de masse, le traitement de surface, les dimensions chargées et la charge admissible ne sont pas vérifiables sur photo. Ils doivent figurer dans l’offre, avec diamètre de prise, moletage, quincaillerie, montage et emballage."],
      ["Choix du produit", "La durabilité se juge sur la fixation des têtes, la régularité du poids, la tenue du chromage et la stabilité du rack lorsqu’un côté est déchargé. L’aspect brillant convient à certains univers hôteliers, à condition de prévoir nettoyage et maîtrise de l’humidité.\n\nLe gain d’espace doit inclure la zone de préhension. Le rack ne doit pas réduire une circulation ou une issue. Le sol doit être plan et compatible avec la charge totale."],
      ["Valeur dans l’aménagement", "En studio, la sélection immédiate fluidifie le coaching. En hôtel, elle offre une lecture simple à proximité d’un banc. Dans un grand club, elle peut isoler les charges légères de la zone principale.\n\nCes scénarios expliquent la valeur de la configuration sans prétendre décrire le lieu photographié. Bancs, revêtement, charges lourdes et autres équipements restent à dimensionner selon le programme."],
      ["Exploitation et entretien", "Chaque paire revient à son emplacement. L’équipe contrôle régulièrement poignées, têtes, supports, vis et appuis au sol. Tout jeu ou dommage impose une mise à l’écart.\n\nLe chrome se nettoie avec un produit compatible puis se sèche. Les environnements humides nécessitent une validation spécifique du traitement. Les consignes du modèle confirmé priment."],
      ["Point de vue industriel", "Le fabricant a besoin de la plage, des quantités, du logo, de la finition, de l’emballage et de la destination. L’échantillon relie matière, usinage, marquage, contrôle de poids et essai sur le rack.\n\nPour l’export, les surfaces polies doivent être séparées et immobilisées. Cartons, protection contre l’humidité, repérage de la visserie et notice sont validés pour le transport prévu."],
      ["Préparer le cahier des charges", "Précisez le type d’établissement, la surface, le nombre d’utilisateurs, la plage souhaitée et le pays. Indiquez si la station concerne un hôtel, un studio, un espace bien-être, la revente ou une zone légère de club.\n\nAjoutez quantité, logo, finition, emballage et calendrier. Demandez une nomenclature par poids et le plan chargé du rack."]
    ],
    faq: [
      ["Que prouve cette image réelle ?", "Elle prouve l’association visible de paires d’haltères chromés et d’un rack noir en X, avec des repères jusqu’à 10 kg. Elle ne prouve pas l’identité d’un client."],
      ["La plage 1–10 kg suffit-elle ?", "Elle peut suffire à une zone légère. Une salle complète évaluera des charges plus lourdes et des équipements complémentaires."],
      ["Que vérifier sur le rack ?", "Dimensions chargé, capacité, matériau, stabilité, berceaux, visserie, montage et comportement en charge asymétrique."],
      ["Comment entretenir le chrome ?", "Employer un nettoyant compatible, sécher et inspecter les surfaces et zones de contact."],
      ["Le logo est-il personnalisable ?", "L’option dépend du modèle, du volume et du procédé. Elle est confirmée avec l’échantillon."],
      ["Qu’envoyer pour un devis ?", "Plage, paires, quantité, rack, destination, identité visuelle, emballage, délai et exigences documentaires."]
    ],
    links: [["dumbbells-category", "Comparer les haltères"], ["chrome-dumbbell", "Voir les modèles chromés"], ["dumbbells-guide", "Choisir une gamme d’haltères"], ["projects", "Explorer les projets"], ["factory", "Voir le processus industriel"], ["contact", "Transmettre le cahier des charges"]],
    imageAlt: ["Paires d’haltères chromés de 1 à 10 kg sur rack noir compact en X", "Détail des marquages en kg et des supports du rack à haltères"],
    imageCaption: ["Application réelle d’une gamme légère organisée verticalement.", "Le détail montre les repères, les surfaces chromées et les logements individuels."],
    ctaTitle: "Composer une station d’haltères adaptée",
    ctaText: "Envoyez plage de poids, espace, quantité, personnalisation et destination.",
    ctaLabel: "Demander catalogue et étude",
    contactPath: "/fr/contact"
  },
  {
    locale: "de",
    path: "/de/projekte/kompaktes-chromhantel-set",
    title: "Praxisbeispiel: Chromhantel-Set 1–10 kg mit Kompaktständer",
    description: "Reale Geräteanwendung mit zehn Paar Chromhanteln von 1 bis 10 kg auf einem platzsparenden X-Ständer für Studio, Hotel und Leichthantelbereich.",
    h1: "Kompaktes Chromhantel-Set von 1 bis 10 kg auf einem X-Ständer",
    mainKeyword: "Chromhantel Set mit Ständer",
    secondaryKeywords: ["Hantelset 1 bis 10 kg", "kompakter Hantelständer", "Kurzhanteln für Studio", "kleiner Freihantelbereich"],
    targetAudience: "Fitnessstudioplaner, Hotels, Personal-Training-Studios, Importeure und Händler",
    breadcrumbHome: "Startseite",
    breadcrumbProjects: "Projekte",
    eyebrow: "Reale Geräteanwendung · kompakte Ablage",
    sections: [
      ["Was das Bild tatsächlich zeigt", "Zu sehen sind zehn Paar feste Chromhanteln, nach Kilogramm geordnet auf einem schwarzen X-förmigen Ständer. Die Stirnmarkierungen reichen erkennbar bis 10 kg. Die senkrechte Verteilung macht die leichte Hantelreihe übersichtlich und beansprucht wenig Wandlänge.\n\nNicht erkennbar sind Kunde, Standort oder Auftragsdaten. Deshalb ist dies ein Anwendungsbeispiel und keine erfundene Referenzanlage. Werkstoff, Toleranz, Beschichtung und Tragfähigkeit müssen über Zeichnung und Spezifikation bestätigt werden."],
      ["Einsatzprofil", "Hotel-Fitnessräume, Therapie-nahe Bereiche und Personal-Training-Studios benötigen oft kleine Schritte für Schulterarbeit, Aufwärmen und kontrollierte Progression. Ein Kilogramm Abstufung unterstützt diese Nutzung.\n\nFür ein vollwertiges Kraftstudio bildet 1–10 kg nur den leichten Abschnitt. Schwerere Hanteln, doppelte Paare, Bänke, Langhanteln, Scheiben und Boden sind gesondert zu planen."],
      ["Gerätekombination", "Feste Hanteln, gut sichtbare kg-Angaben und einzelne Ablagepunkte bilden eine zusammenhängende Station. Beide Seiten des Gestells werden genutzt; jeder Platz signalisiert die Rückgabe.\n\nDer Käufer sollte beladene Maße, Eigengewicht, Tragfähigkeit, Griffdurchmesser, Rändelung, Kopfverbindung, Auflagen, Schrauben und Verpackung anfordern. Das Foto allein bestätigt diese Daten nicht."],
      ["Auswahllogik", "Für den gewerblichen Einsatz zählen sichere Verbindung, reproduzierbares Gewicht, Oberflächenqualität und Standfestigkeit bei einseitiger Entnahme. Chrom wirkt hochwertig, verlangt aber geeignete Reinigung und trockene Bedingungen.\n\nZur Stellfläche gehört der Bedienraum vor dem Gestell. Wege und Türen dürfen nicht eingeengt werden. Eine ebene, belastbare Aufstellung ist erforderlich."],
      ["Nutzen im Betrieb", "Im PT-Studio sind kleine Gewichtswechsel sofort möglich. Im Hotel entsteht eine leicht verständliche Station. In einem größeren Club kann sie leichte Nebenübungen aus dem schweren Hantelbereich herauslösen.\n\nDas sind sinnvolle Einsatzmodelle, keine Behauptungen über einen unbekannten Bildstandort. Die Gesamtplanung richtet sich nach Nutzern und Trainingsangebot."],
      ["Pflege und Kontrolle", "Hanteln werden sortiert zurückgelegt. Personal prüft Köpfe, Griffe, Markierungen, Auflagen, Verschraubungen und Bodenkontakt. Beschädigte Teile werden bis zur Klärung gesperrt.\n\nChromflächen sind mit freigegebenem Mittel zu reinigen und zu trocknen. In feuchten Räumen ist die konkrete Oberflächenspezifikation entscheidend."],
      ["Herstellerperspektive", "Für ein belastbares Angebot braucht der Hersteller Gewichtsfolge, Paarzahl, Menge, Logo, Finish, Verpackung, Zielmarkt und Termin. Ein freigegebenes Muster verbindet Material, Bearbeitung, Markierung, Gewichtskontrolle und Passprobe.\n\nBeim Export müssen polierte Teile getrennt und fixiert sein. Karton, Feuchteschutz, Beschriftung der Hardware und Anleitung werden vor Serienfreigabe abgestimmt."],
      ["Anfrage vorbereiten", "Senden Sie Raumart, verfügbare Fläche, Nutzerzahl, Gewichtsbereich und Zielland. Nennen Sie Hotel, Studio, Handel oder Leichtbereich im Club.\n\nErgänzen Sie Menge, Logo, Finish, Verpackung und Zeitplan. Fordern Sie eine Positionsliste und eine Zeichnung des beladenen Ständers an."]
    ],
    faq: [
      ["Was belegt das Foto?", "Eine reale Kombination aus Paaren verchromter Hanteln und schwarzem X-Ständer mit kg-Markierungen bis 10 kg; keinen identifizierten Kunden."],
      ["Reichen 1–10 kg für ein Fitnessstudio?", "Für einen Leichtbereich möglicherweise. Ein vollständiges Kraftangebot benötigt meist weitere Lasten und Geräte."],
      ["Welche Ständerdaten sind wichtig?", "Beladene Maße, Tragfähigkeit, Werkstoff, Standfestigkeit, Auflagen, Schrauben, Montage und asymmetrische Belastung."],
      ["Wie wird Chrom gepflegt?", "Mit freigegebenem Reiniger säubern, trocknen und Oberflächen sowie Kontaktstellen prüfen."],
      ["Ist ein eigenes Logo möglich?", "Je nach Modell, Menge und Verfahren. Machbarkeit und Muster werden vor der Produktion bestätigt."],
      ["Was gehört in die Anfrage?", "Gewichte, Paare, Menge, Ständer, Zielort, Branding, Verpackung, Termin und Dokumente."]
    ],
    links: [["dumbbells-category", "Kurzhanteln vergleichen"], ["chrome-dumbbell", "Chromhanteln ansehen"], ["dumbbells-guide", "Hantelbereich planen"], ["projects", "Projektbeispiele öffnen"], ["factory", "Fertigung und Prüfung"], ["contact", "Anforderung senden"]],
    imageAlt: ["Chromhantel-Paare von 1 bis 10 kg auf kompaktem schwarzem X-Ständer", "Detail der kg-Markierungen und einzelnen Hantelauflagen"],
    imageCaption: ["Reale Anwendung einer leichten Hantelreihe mit vertikaler Ablage.", "Detailansicht von Markierung, Chromfläche und Auflagepunkten."],
    ctaTitle: "Kompakte Hantelstation spezifizieren",
    ctaText: "Senden Sie Gewichtsbereich, Fläche, Menge, Branding und Zielort.",
    ctaLabel: "Katalog und Projektangebot anfordern",
    contactPath: "/de/kontakt"
  },
  {
    locale: "it",
    path: "/it/progetti/set-manubri-cromati-compatto",
    title: "Caso reale: set di manubri cromati 1–10 kg con rastrelliera",
    description: "Applicazione reale di dieci coppie di manubri cromati da 1 a 10 kg su rastrelliera compatta a X per studi, hotel e aree leggere.",
    h1: "Set compatto di manubri cromati da 1 a 10 kg su rastrelliera a X",
    mainKeyword: "set manubri cromati con rastrelliera",
    secondaryKeywords: ["manubri 1-10 kg", "rastrelliera manubri compatta", "manubri per personal studio", "area pesi liberi piccola"],
    targetAudience: "Palestre, hotel, studi PT, importatori e distributori",
    breadcrumbHome: "Home",
    breadcrumbProjects: "Progetti",
    eyebrow: "Applicazione reale · pesi leggeri",
    sections: [
      ["Lettura del caso", "La foto mostra dieci coppie di manubri fissi cromati ordinate su una struttura nera a X. Sono visibili indicazioni in chilogrammi e una progressione fino a 10 kg. La disposizione verticale rende la serie compatta e riconoscibile.\n\nNon sono disponibili nome cliente, sede o dati d’ordine. Il contenuto descrive quindi l’applicazione dell’attrezzatura senza inventare una fornitura o un risultato. I dati tecnici vanno confermati nei documenti del modello."],
      ["Esigenza di allenamento", "Hotel, studi personal e aree introduttive utilizzano carichi leggeri per spalle, braccia, mobilità e progressione graduale. Incrementi da 1 kg facilitano il lavoro controllato.\n\nIn una palestra completa la serie è un modulo. Manubri più pesanti, doppioni, panche, bilancieri, dischi e pavimentazione richiedono un piano separato."],
      ["Soluzione visibile", "Manubri fissi, marcature frontali e sedi individuali compongono una stazione ordinata. La rastrelliera usa entrambi i lati e limita lo sviluppo orizzontale.\n\nMateriale, tolleranza, finitura, ingombro caricato e portata non si ricavano dalla foto. Vanno richiesti disegno, impugnatura, zigrinatura, giunzione, appoggi, ferramenta e imballo."],
      ["Criteri di scelta", "Per uso professionale contano stabilità, fissaggio delle teste, controllo del peso e qualità della superficie. Il cromato offre un’estetica pulita ma richiede manutenzione compatibile e ambiente controllato.\n\nL’ingombro operativo comprende lo spazio dell’utente. La stazione non deve interferire con passaggi o uscite e deve appoggiare su un pavimento piano."],
      ["Valore applicativo", "Lo studio ottiene cambi rapidi di carico; l’hotel una postazione intuitiva; il club una zona leggera separata dai manubri pesanti.\n\nSono scenari coerenti, non affermazioni sul luogo fotografato. Il programma di allenamento determina se 1–10 kg è una gamma completa o complementare."],
      ["Gestione quotidiana", "Ogni coppia torna nella sede corretta. Si controllano teste, maniglie, marcature, appoggi, viti e piedini. Componenti allentati o danneggiati vengono esclusi dall’uso.\n\nLe superfici cromate si puliscono con prodotto approvato e si asciugano. In presenza di umidità serve una verifica specifica."],
      ["Prospettiva produttiva", "La fabbrica valuta gamma, coppie, quantità, logo, finitura, imballo, mercato e tempi. Il campione approvato collega materiale, lavorazione, marcatura, verifica del peso e prova sul rack.\n\nPer l’export, le parti lucide devono essere separate e immobilizzate. Cartoni, protezione, ferramenta e istruzioni sono confermati prima della serie."],
      ["Dati per il preventivo", "Inviare tipo di struttura, spazio, utenti, gamma e destinazione. Specificare hotel, studio, retail o zona leggera commerciale.\n\nAggiungere quantità, logo, finitura, imballaggio e data. Richiedere distinta per peso e disegno caricato."]
    ],
    faq: [
      ["Cosa dimostra l’immagine?", "Una combinazione reale di coppie di manubri cromati e rack nero a X con indicazioni fino a 10 kg; non un cliente identificato."],
      ["1–10 kg bastano per una palestra?", "Possono bastare per una zona leggera. Una sala completa valuta carichi e attrezzature ulteriori."],
      ["Quali dati verificare sul rack?", "Ingombro caricato, portata, materiale, stabilità, appoggi, ferramenta e montaggio."],
      ["Come si mantiene il cromato?", "Pulizia compatibile, asciugatura e controllo periodico delle superfici."],
      ["È possibile personalizzare il logo?", "Dipende da modello, quantità e processo; si conferma con il campione."],
      ["Cosa inviare alla fabbrica?", "Gamma, coppie, quantità, rack, destinazione, marchio, imballo, tempi e documenti."]
    ],
    links: [["dumbbells-category", "Confronta i manubri"], ["chrome-dumbbell", "Vedi manubri cromati"], ["dumbbells-guide", "Pianifica la gamma"], ["projects", "Esplora i progetti"], ["factory", "Produzione e controllo"], ["contact", "Invia il brief"]],
    imageAlt: ["Coppie di manubri cromati da 1 a 10 kg su rastrelliera nera compatta a X", "Dettaglio delle marcature in kg e delle sedi della rastrelliera"],
    imageCaption: ["Applicazione reale di una gamma leggera su supporto verticale.", "Dettaglio di marcature, finitura e alloggiamenti."],
    ctaTitle: "Configura una postazione compatta",
    ctaText: "Invia gamma, spazio, quantità, personalizzazione e destinazione.",
    ctaLabel: "Richiedi catalogo e preventivo",
    contactPath: "/it/contatti"
  },
  {
    locale: "sv",
    path: "/sv/projekt/kompakt-kromat-hantelset",
    title: "Verkligt exempel: kromat hantelset 1–10 kg med kompakt ställ",
    description: "Verklig produktapplikation med tio par kromade hantlar 1–10 kg på ett kompakt X-ställ för hotell, PT-studio och lättviktsyta.",
    h1: "Kompakt kromat hantelset 1–10 kg på X-format ställ",
    mainKeyword: "kromat hantelset med ställ",
    secondaryKeywords: ["hantelset 1-10 kg", "kompakt hantelställ", "hantlar för PT-studio", "liten friviktsyta"],
    targetAudience: "Gymprojekt, hotell, PT-studior, importörer och distributörer",
    breadcrumbHome: "Start",
    breadcrumbProjects: "Projekt",
    eyebrow: "Verklig applikation · kompakt förvaring",
    sections: [
      ["Det bilden visar", "Fotot visar tio par fasta kromade hantlar sorterade på ett svart X-format ställ. Kilomarkeringar och en lätt serie upp till 10 kg syns tydligt. Den vertikala ordningen ger en avgränsad station med liten längd längs väggen.\n\nBilden identifierar inte kund, ort eller leverans. Därför beskrivs den som ett verkligt användningsexempel utan påhittade resultat. Material, tolerans, ytbehandling och kapacitet måste verifieras i specifikationen."],
      ["Träningsbehov", "Hotellgym, PT-studior och introduktionsytor använder ofta små steg för axlar, armar, uppvärmning och kontrollerad progression. Ett kilogram mellan nivåerna ger fin belastningsstyrning.\n\nI ett komplett styrkegym är serien en lätt modul. Tyngre hantlar, dubbletter, bänkar, skivstänger, viktskivor och golv planeras separat."],
      ["Utrustningslösning", "Fasta hantlar, frontmarkering och individuella stödplatser skapar tydlig återställning. Båda sidor av stället används och horisontell yta sparas.\n\nFotot bekräftar inte lastade mått, material, greppdiameter, räffling, infästning eller förpackning. Dessa uppgifter ska ingå i offert och ritning."],
      ["Urvalslogik", "Kommersiell hållbarhet kräver säkra huvuden, viktkontroll, beständig yta och stabilitet vid ojämn last. Krom passar rena miljöer men behöver rätt rengöring och fuktkontroll.\n\nDriftytan är större än ställets fotavtryck. Användaren behöver plats att ta och lämna vikter utan att blockera gångväg."],
      ["Värde i anläggningen", "PT-studion får snabba viktbyten, hotellet en enkel station och den större klubben en separat lättzon.\n\nDetta är möjliga användningar, inte påståenden om fotots plats. Träningskonceptet avgör om serien är komplett eller kompletterande."],
      ["Daglig kontroll", "Par återställs på rätt plats. Personal kontrollerar huvuden, handtag, märkning, stöd, skruvar och golvkontakt. Skadad utrustning tas ur bruk.\n\nKrom rengörs med godkänt medel och torkas. Fuktiga miljöer kräver särskild ytbedömning."],
      ["Tillverkarens perspektiv", "Fabriken behöver viktserie, antal par, kvantitet, logotyp, finish, emballage, marknad och tidplan. Godkänt prov kopplar material och bearbetning till märkning, viktkontroll och passning.\n\nVid export separeras och fixeras polerade delar. Kartong, fuktskydd, märkning av beslag och instruktion verifieras."],
      ["Underlag för offert", "Skicka anläggningstyp, yta, användare, viktserie och destination. Ange hotell, studio, handel eller lättzon i klubb.\n\nLägg till antal, logotyp, finish, emballage och datum. Begär artikelrad per vikt och lastad ritning."]
    ],
    faq: [
      ["Vad bevisar fotot?", "En verklig kombination av kromade hantelpar och svart X-ställ med kg-märkning till 10 kg, men ingen namngiven kund."],
      ["Räcker 1–10 kg i ett gym?", "Det kan räcka i en lättzon. Ett komplett gym behöver normalt fler belastningar och produkter."],
      ["Vad ska kontrolleras på stället?", "Lastade mått, kapacitet, material, stabilitet, stöd, beslag och montering."],
      ["Hur sköts krom?", "Rengör kompatibelt, torka och inspektera yta och kontaktpunkter."],
      ["Kan logotypen anpassas?", "Det beror på modell, mängd och metod och bekräftas genom prov."],
      ["Vilka offertdata behövs?", "Vikter, par, antal, ställ, destination, varumärke, emballage, tid och dokument."]
    ],
    links: [["dumbbells-category", "Jämför hantlar"], ["chrome-dumbbell", "Se kromade hantlar"], ["dumbbells-guide", "Planera hantelserien"], ["projects", "Visa projekt"], ["factory", "Tillverkning och kontroll"], ["contact", "Skicka projektunderlag"]],
    imageAlt: ["Par av kromade hantlar 1 till 10 kg på kompakt svart X-ställ", "Detalj av kg-märkning och individuella stöd på hantelstället"],
    imageCaption: ["Verklig lättviktsapplikation med vertikal förvaring.", "Detaljen visar märkning, krom och stödplatser."],
    ctaTitle: "Specificera en kompakt hantelstation",
    ctaText: "Skicka viktserie, yta, mängd, varumärke och destination.",
    ctaLabel: "Begär katalog och offert",
    contactPath: "/sv/kontakt"
  },
  {
    locale: "vi",
    path: "/vi/du-an/bo-ta-tay-ma-crom-gia-dung-compact",
    title: "Ứng dụng thực tế: bộ tạ tay mạ crôm 1–10 kg và giá chữ X",
    description: "Hình ảnh ứng dụng thật của mười cặp tạ tay mạ crôm 1–10 kg trên giá chữ X nhỏ gọn cho studio, khách sạn và khu tạ nhẹ.",
    h1: "Bộ tạ tay mạ crôm 1–10 kg trên giá chữ X tiết kiệm diện tích",
    mainKeyword: "bộ tạ tay mạ crôm kèm giá",
    secondaryKeywords: ["bộ tạ tay 1-10 kg", "giá tạ tay nhỏ gọn", "tạ tay cho studio", "khu free weight diện tích nhỏ"],
    targetAudience: "Chủ phòng gym, khách sạn, studio PT, nhà nhập khẩu và nhà phân phối",
    breadcrumbHome: "Trang chủ",
    breadcrumbProjects: "Dự án",
    eyebrow: "Ứng dụng thiết bị thật · lưu trữ gọn",
    sections: [
      ["Thông tin có thể xác nhận", "Ảnh cho thấy mười cặp tạ tay cố định mạ crôm được xếp theo mức kg trên giá màu đen hình chữ X. Dấu kg và dải nhẹ tới 10 kg có thể quan sát trực tiếp. Cách xếp theo chiều đứng giúp nhận biết từng cặp và giảm chiều dài chiếm chỗ.\n\nẢnh không cung cấp tên khách hàng, địa điểm hay số lượng đơn hàng. Vì vậy đây là ví dụ ứng dụng thiết bị thật, không phải câu chuyện dự án được dựng lên. Vật liệu, sai số và tải trọng phải được xác nhận bằng tài liệu kỹ thuật."],
      ["Nhu cầu sử dụng", "Phòng gym khách sạn, studio cá nhân và khu dành cho người mới thường cần bước tăng nhỏ cho vai, tay, khởi động và bài bổ trợ. Bước 1 kg hỗ trợ điều chỉnh tải có kiểm soát.\n\nVới phòng gym sức mạnh đầy đủ, 1–10 kg chỉ là khu tạ nhẹ. Tạ nặng hơn, số cặp dự phòng, ghế, đòn, bánh tạ và sàn cần được tính riêng."],
      ["Cấu hình nhìn thấy", "Tạ cố định, ký hiệu ở đầu tạ và vị trí đỡ riêng tạo thành một trạm có thứ tự. Hai bên giá đều được sử dụng.\n\nKhông nên suy đoán mác thép, độ dày lớp mạ, kích thước khi chất tải hoặc sức chịu tải từ ảnh. Người mua cần bản vẽ, đường kính tay cầm, bề mặt bám, kết cấu đầu tạ, phụ kiện lắp và đóng gói."],
      ["Logic lựa chọn", "Độ bền thương mại phụ thuộc liên kết đầu–tay cầm, kiểm soát khối lượng, chất lượng bề mặt và độ ổn định khi lấy tạ lệch bên. Crôm tạo cảm giác sạch và cao cấp nhưng cần vệ sinh đúng cách, tránh ẩm kéo dài.\n\nDiện tích vận hành phải cộng khoảng đứng lấy tạ. Không đặt giá làm hẹp lối đi hoặc cửa thoát."],
      ["Giá trị ứng dụng", "Studio có thể đổi tải nhanh giữa các bài; khách sạn có trạm tạ dễ hiểu; câu lạc bộ lớn có thể tách bài nhẹ khỏi dãy tạ nặng.\n\nĐây là các cách dùng phù hợp với cấu hình, không phải kết quả được tuyên bố cho nơi trong ảnh. Chương trình tập quyết định dải tạ có đủ hay không."],
      ["Vận hành và bảo dưỡng", "Mỗi cặp được trả đúng vị trí. Nhân viên kiểm tra đầu tạ, tay cầm, dấu kg, chỗ đỡ, bu-lông và chân giá. Thiết bị lỏng hoặc hư phải ngừng sử dụng.\n\nDùng chất vệ sinh được chấp thuận và lau khô bề mặt crôm. Khu vực ẩm cần xác nhận riêng về lớp hoàn thiện."],
      ["Góc nhìn nhà sản xuất", "Nhà máy cần dải kg, số cặp, số lượng, logo, hoàn thiện, bao bì, thị trường và lịch. Mẫu duyệt liên kết vật liệu, gia công, đánh dấu, kiểm tra trọng lượng và thử lắp.\n\nKhi xuất khẩu, các bề mặt bóng phải được ngăn cách và cố định. Thùng, chống ẩm, nhãn phụ kiện và hướng dẫn lắp được kiểm tra trước sản xuất hàng loạt."],
      ["Chuẩn bị yêu cầu báo giá", "Gửi loại cơ sở, diện tích, người dùng, dải kg và quốc gia. Nêu rõ khách sạn, studio, bán lẻ hay khu tạ nhẹ thương mại.\n\nBổ sung số lượng, logo, màu hoàn thiện, bao bì và thời hạn. Yêu cầu danh sách theo từng mức tạ và bản vẽ giá khi đầy tải."]
    ],
    faq: [
      ["Ảnh chứng minh điều gì?", "Một cấu hình thật gồm các cặp tạ mạ crôm và giá chữ X màu đen, có dấu kg tới 10 kg; không chứng minh khách hàng cụ thể."],
      ["Dải 1–10 kg có đủ cho gym không?", "Có thể đủ cho khu nhẹ. Phòng gym đầy đủ thường cần tải nặng và thiết bị khác."],
      ["Cần kiểm tra gì ở giá?", "Kích thước đầy tải, tải trọng, vật liệu, độ ổn định, điểm đỡ, phụ kiện và lắp ráp."],
      ["Bảo dưỡng crôm thế nào?", "Vệ sinh bằng chất phù hợp, lau khô và kiểm tra bề mặt, điểm tiếp xúc."],
      ["Có tùy chỉnh logo không?", "Tùy mẫu, số lượng và quy trình; cần xác nhận bằng mẫu duyệt."],
      ["Gửi gì để báo giá?", "Dải kg, số cặp, số lượng, giá, điểm đến, logo, bao bì, lịch và hồ sơ."]
    ],
    links: [["dumbbells-category", "So sánh tạ tay"], ["chrome-dumbbell", "Xem tạ tay mạ crôm"], ["dumbbells-guide", "Lập dải tạ tay"], ["projects", "Xem dự án"], ["factory", "Quy trình nhà máy"], ["contact", "Gửi yêu cầu"]],
    imageAlt: ["Các cặp tạ tay mạ crôm 1 đến 10 kg trên giá chữ X màu đen nhỏ gọn", "Chi tiết dấu kg và vị trí đỡ riêng trên giá tạ tay"],
    imageCaption: ["Ứng dụng tạ nhẹ thật với lưu trữ theo chiều đứng.", "Chi tiết cho thấy ký hiệu, bề mặt và chỗ đỡ."],
    ctaTitle: "Lập cấu hình trạm tạ tay nhỏ gọn",
    ctaText: "Gửi dải kg, diện tích, số lượng, logo và điểm đến.",
    ctaLabel: "Nhận catalog và báo giá",
    contactPath: "/vi/lien-he"
  },
  {
    locale: "ko",
    path: "/ko/projects/compact-chrome-dumbbell-set",
    title: "실제 적용 사례: 1–10kg 크롬 덤벨 세트와 X형 랙",
    description: "스튜디오·호텔·라이트 웨이트 존에 적용할 수 있는 1–10kg 크롬 고정식 덤벨 10쌍과 소형 X형 랙의 실제 장비 사례입니다.",
    h1: "공간 효율형 1–10kg 크롬 덤벨 세트와 X형 보관 랙",
    mainKeyword: "크롬 덤벨 세트 랙",
    secondaryKeywords: ["1-10kg 덤벨 세트", "소형 덤벨 랙", "호텔 헬스장 덤벨", "스튜디오 프리웨이트"],
    targetAudience: "상업용 체육시설, 호텔, PT 스튜디오, 수입사 및 유통사",
    breadcrumbHome: "홈",
    breadcrumbProjects: "프로젝트",
    eyebrow: "실제 장비 적용 · 소형 프리웨이트",
    sections: [
      ["사진에서 확인되는 사실", "사진에는 검은색 X형 랙 양쪽에 고정식 크롬 덤벨 10쌍이 무게 순서대로 놓여 있습니다. 단위는 kg이며 가벼운 단계부터 10kg까지 확인됩니다. 수직 배치는 각 쌍을 쉽게 찾게 하고 긴 수평 랙보다 벽면 길이를 적게 사용합니다.\n\n사진만으로 고객명, 설치 장소, 주문 수량은 알 수 없습니다. 따라서 이 페이지는 실제 장비 적용 예시로 설명하며 가상의 납품 실적이나 성과를 만들지 않습니다. 재질과 허용오차는 사양서로 확인해야 합니다."],
      ["적합한 훈련 수요", "호텔 피트니스, PT 스튜디오, 입문자 구역은 어깨·팔·워밍업·보조운동을 위해 작은 증가폭을 자주 사용합니다. 1kg 간격은 세밀한 부하 조절에 유리합니다.\n\n종합 상업용 헬스장에서는 1–10kg가 전체 덤벨 라인이 아니라 라이트 존입니다. 더 무거운 중량, 인기 중량의 추가 쌍, 벤치와 바벨, 원판, 바닥을 함께 검토해야 합니다."],
      ["보이는 장비 구성", "고정식 덤벨, 전면 kg 표시, 개별 거치 위치가 하나의 정돈된 스테이션을 만듭니다. 랙 양면을 활용해 수평 공간을 줄입니다.\n\n강재 등급, 도금 두께, 적재 치수, 허용하중은 사진으로 확정할 수 없습니다. 도면, 그립 지름과 널링, 헤드 결합, 거치부, 볼트, 포장을 요청해야 합니다."],
      ["선정 기준", "상업용 내구성은 헤드 고정, 중량 관리, 표면 품질, 한쪽만 비었을 때의 안정성으로 평가합니다. 크롬은 깔끔하지만 적합한 세척과 습도 관리가 필요합니다.\n\n실제 사용 면적에는 사용자가 덤벨을 꺼내고 넣는 공간이 포함됩니다. 통로나 출구를 좁히지 않아야 하며 평평한 바닥에 설치해야 합니다."],
      ["시설 운영 가치", "PT 스튜디오는 빠르게 중량을 바꿀 수 있고 호텔은 이해하기 쉬운 고정식 옵션을 제공합니다. 큰 클럽에서는 가벼운 보조운동을 메인 덤벨 존과 분리할 수 있습니다.\n\n이는 사진의 구성으로 가능한 적용이며 촬영 장소의 운영 성과를 주장하는 것은 아닙니다."],
      ["점검과 관리", "각 쌍을 지정 위치에 돌려놓고 헤드, 손잡이, 표시, 거치부, 체결부와 바닥 접점을 점검합니다. 풀림이나 손상이 있으면 사용을 중지합니다.\n\n승인된 세정제를 사용하고 크롬 표면을 건조하게 유지합니다. 습한 환경은 별도의 마감 검토가 필요합니다."],
      ["제조 관점", "공장은 중량 범위, 중량별 쌍 수, 수량, 로고, 마감, 포장, 시장과 일정을 받아야 합니다. 승인 샘플은 재료, 가공, 표시, 중량 검사와 랙 맞춤을 연결합니다.\n\n수출 시 광택 부품이 서로 닿지 않도록 분리·고정하고 상자, 방습, 부품 라벨, 조립 설명서를 확인합니다."],
      ["견적 요청 자료", "시설 종류, 사용 면적, 예상 사용자, kg 범위와 도착 국가를 보내십시오. 호텔, 스튜디오, 유통 또는 상업용 라이트 존인지 구분하면 좋습니다.\n\n수량, 로고 파일, 마감, 포장과 납기 목표를 추가하고 중량별 품목표와 적재 도면을 요청하십시오."]
    ],
    faq: [
      ["사진으로 무엇을 확인할 수 있나요?", "10kg까지 kg 표시가 있는 크롬 덤벨 쌍과 검은 X형 랙의 실제 조합을 확인할 수 있지만 특정 고객은 확인할 수 없습니다."],
      ["1–10kg면 상업용 헬스장에 충분한가요?", "라이트 존에는 가능하지만 종합 근력 시설은 더 무거운 중량과 추가 장비가 필요할 수 있습니다."],
      ["랙에서 확인할 항목은?", "적재 치수, 허용하중, 재질, 안정성, 거치부, 체결부와 조립 방식입니다."],
      ["크롬 덤벨은 어떻게 관리하나요?", "호환 세정제로 닦고 건조하며 표면과 접촉부를 정기 점검합니다."],
      ["로고 맞춤이 가능한가요?", "모델, 수량과 공법에 따라 평가하며 양산 전 샘플로 확정합니다."],
      ["견적에 필요한 정보는?", "중량 범위, 쌍 수, 수량, 랙, 목적지, 로고, 포장, 일정과 문서입니다."]
    ],
    links: [["dumbbells-category", "상업용 덤벨 비교"], ["chrome-dumbbell", "크롬 덤벨 보기"], ["dumbbells-guide", "덤벨 범위 계획"], ["projects", "프로젝트 사례"], ["factory", "생산과 품질관리"], ["contact", "프로젝트 보내기"]],
    imageAlt: ["검은색 소형 X형 랙에 보관된 1–10kg 크롬 덤벨 쌍", "kg 표시와 개별 덤벨 거치부의 상세 모습"],
    imageCaption: ["수직 보관을 적용한 실제 라이트 덤벨 구성.", "표시, 크롬 표면과 거치 위치를 보여주는 상세 이미지."],
    ctaTitle: "시설에 맞는 소형 덤벨 존을 계획하세요",
    ctaText: "중량 범위, 공간, 수량, 로고와 목적지를 보내주십시오.",
    ctaLabel: "카탈로그와 공장 견적 요청",
    contactPath: "/ko/contact"
  },
  {
    locale: "pl",
    path: "/pl/projekty/kompaktowy-zestaw-hantli-chromowanych",
    title: "Rzeczywisty przykład: hantle chromowane 1–10 kg na stojaku",
    description: "Rzeczywiste zastosowanie dziesięciu par hantli chromowanych 1–10 kg na kompaktowym stojaku X do studia, hotelu i strefy lekkiej.",
    h1: "Kompaktowy zestaw hantli chromowanych 1–10 kg ze stojakiem X",
    mainKeyword: "zestaw hantli chromowanych ze stojakiem",
    secondaryKeywords: ["hantle 1-10 kg", "kompaktowy stojak na hantle", "hantle do studia treningowego", "mała strefa wolnych ciężarów"],
    targetAudience: "Siłownie, hotele, studia treningowe, importerzy i dystrybutorzy",
    breadcrumbHome: "Strona główna",
    breadcrumbProjects: "Projekty",
    eyebrow: "Rzeczywiste zastosowanie · kompaktowe przechowywanie",
    sections: [
      ["Co potwierdza zdjęcie", "Na zdjęciu widać dziesięć par stałych hantli chromowanych ułożonych według kilogramów na czarnym stojaku w kształcie X. Oznaczenia prowadzą do 10 kg. Układ pionowy ułatwia identyfikację i ogranicza długość zajmowanej ściany.\n\nZdjęcie nie wskazuje klienta, miejsca ani wielkości zamówienia. Opisujemy więc prawdziwe zastosowanie sprzętu bez fikcyjnej realizacji. Materiał, tolerancję i nośność należy potwierdzić w specyfikacji."],
      ["Potrzeba treningowa", "Hotele, studia PT i strefy początkujących korzystają z małych skoków do ćwiczeń barków, ramion, rozgrzewki i progresji. Stopniowanie co 1 kg pomaga precyzyjnie dobrać obciążenie.\n\nW pełnej siłowni 1–10 kg jest modułem lekkim. Cięższe hantle, dodatkowe pary, ławki, gryfy, talerze i podłoga wymagają osobnego planu."],
      ["Widoczne rozwiązanie", "Stałe hantle, oznaczenia czołowe i indywidualne miejsca odkładania tworzą uporządkowaną stację. Wykorzystane są obie strony stojaka.\n\nZe zdjęcia nie wynika gatunek stali, grubość powłoki, wymiar po załadowaniu czy udźwig. Kupujący powinien uzyskać rysunek, średnicę chwytu, radełkowanie, połączenie głowicy, podpory, śruby i opakowanie."],
      ["Logika wyboru", "Do użytku komercyjnego liczą się pewne połączenia, kontrola masy, trwała powierzchnia i stabilność przy nierównym obciążeniu. Chrom dobrze wygląda, ale wymaga odpowiedniego czyszczenia i suchego środowiska.\n\nObszar użytkowy obejmuje miejsce przed stojakiem. Nie może on zwężać przejść ani dróg ewakuacyjnych."],
      ["Wartość użytkowa", "Studio zyskuje szybkie zmiany obciążenia, hotel czytelną stację, a duży klub osobną strefę lekką.\n\nTo możliwe zastosowania konfiguracji, a nie twierdzenia o lokalizacji ze zdjęcia. Program treningowy określa, czy zakres jest pełny."],
      ["Obsługa", "Każda para wraca na właściwe miejsce. Personel kontroluje głowice, uchwyty, oznaczenia, podpory, śruby i punkty podparcia. Uszkodzony sprzęt wycofuje się z użycia.\n\nChrom czyści się zatwierdzonym środkiem i osusza. Wilgotne pomieszczenia wymagają osobnej oceny powłoki."],
      ["Perspektywa producenta", "Fabryka potrzebuje zakresu, liczby par, ilości, logo, wykończenia, opakowania, rynku i terminu. Zatwierdzona próbka łączy materiał, obróbkę, znakowanie, kontrolę masy i dopasowanie.\n\nW eksporcie polerowane części są rozdzielone i unieruchomione. Kartony, ochrona przed wilgocią, opis okuć i instrukcja są sprawdzane."],
      ["Dane do wyceny", "Proszę przesłać typ obiektu, powierzchnię, użytkowników, zakres kg i kraj. Warto wskazać hotel, studio, handel lub strefę lekką klubu.\n\nNależy dodać ilość, logo, wykończenie, opakowanie i termin oraz poprosić o listę wag i rysunek stojaka z obciążeniem."]
    ],
    faq: [
      ["Co udowadnia zdjęcie?", "Rzeczywiste zestawienie par chromowanych hantli i czarnego stojaka X z oznaczeniami do 10 kg, bez identyfikacji klienta."],
      ["Czy 1–10 kg wystarczy w siłowni?", "Może wystarczyć w strefie lekkiej. Pełny obiekt zwykle potrzebuje dalszych obciążeń i sprzętu."],
      ["Co sprawdzić w stojaku?", "Wymiary z obciążeniem, udźwig, materiał, stabilność, podpory, śruby i montaż."],
      ["Jak dbać o chrom?", "Czyścić kompatybilnym środkiem, osuszać i kontrolować powierzchnię."],
      ["Czy można dodać logo?", "Zależy od modelu, ilości i technologii; potwierdza się to próbką."],
      ["Co jest potrzebne do wyceny?", "Zakres, pary, ilość, stojak, miejsce dostawy, branding, opakowanie, termin i dokumenty."]
    ],
    links: [["dumbbells-category", "Porównaj hantle"], ["chrome-dumbbell", "Zobacz hantle chromowane"], ["dumbbells-guide", "Zaplanuj zakres hantli"], ["projects", "Zobacz projekty"], ["factory", "Produkcja i kontrola"], ["contact", "Wyślij wymagania"]],
    imageAlt: ["Pary hantli chromowanych 1–10 kg na kompaktowym czarnym stojaku X", "Szczegół oznaczeń kg i indywidualnych podpór stojaka"],
    imageCaption: ["Rzeczywiste zastosowanie lekkich hantli z pionowym przechowywaniem.", "Detal pokazuje oznaczenia, chrom i miejsca odkładania."],
    ctaTitle: "Zaplanuj kompaktową stację hantli",
    ctaText: "Prześlij zakres, przestrzeń, ilość, logo i miejsce dostawy.",
    ctaLabel: "Poproś o katalog i wycenę",
    contactPath: "/pl/kontakt"
  },
  {
    locale: "ar",
    path: "/ar/projects/compact-chrome-dumbbell-set",
    title: "حالة تطبيق حقيقية: دمبل كروم 1–10 كجم مع حامل مدمج",
    description: "تطبيق حقيقي لعشرة أزواج من دمبل الكروم من 1 إلى 10 كجم على حامل أسود بشكل X للاستوديو والفندق ومنطقة الأوزان الخفيفة.",
    h1: "مجموعة دمبل كروم مدمجة من 1 إلى 10 كجم مع حامل بشكل X",
    mainKeyword: "مجموعة دمبل كروم مع حامل",
    secondaryKeywords: ["دمبل 1 إلى 10 كجم", "حامل دمبل مدمج", "دمبل لاستوديو تدريب", "منطقة أوزان حرة صغيرة"],
    targetAudience: "مشغلو الصالات والفنادق والاستوديوهات والمستوردون والموزعون",
    breadcrumbHome: "الرئيسية",
    breadcrumbProjects: "المشروعات",
    eyebrow: "تطبيق معدات حقيقي · تخزين مدمج",
    sections: [
      ["ما الذي تثبته الصورة", "تُظهر الصورة عشرة أزواج من الدمبل الثابت المطلي بالكروم مرتبة حسب الكيلوجرام على حامل أسود بشكل X. تظهر علامات الوزن وتسلسل خفيف يصل إلى 10 كجم. يسهّل الترتيب الرأسي رؤية كل زوج ويقلل طول المساحة المطلوبة.\n\nلا تكشف الصورة اسم عميل أو موقعاً أو كمية طلب. لذلك نقدّمها كحالة تطبيق حقيقية للمعدات من دون اختلاق مشروع أو عائد. يجب تأكيد الخامة والسماحية والحمولة في المواصفة الفنية."],
      ["احتياج التدريب", "تحتاج صالات الفنادق واستوديوهات التدريب والمناطق المخصصة للمبتدئين إلى زيادات صغيرة لتمارين الكتف والذراع والإحماء. التدرج بمقدار 1 كجم يساعد على التحكم في الحمل.\n\nفي صالة قوة كاملة، يمثل نطاق 1–10 كجم وحدة خفيفة فقط. يجب تخطيط الدمبل الأثقل والمقاعد والقضبان والأقراص والأرضية بصورة مستقلة."],
      ["الحل الظاهر", "يجمع النظام بين دمبل ثابت وعلامات أمامية ومواضع تخزين منفصلة على جانبي الحامل. لكل زوج مكان واضح للعودة.\n\nلا يمكن استنتاج نوع الفولاذ أو سماكة الطلاء أو الأبعاد المحملة أو قدرة الحامل من الصورة. ينبغي طلب الرسم وقطر المقبض والتخشين وتثبيت الرأس والحوامل والمسامير والتعبئة."],
      ["منطق الاختيار", "تتطلب المتانة التجارية تثبيتاً آمناً للرؤوس وضبطاً للوزن وجودة سطح وثباتاً عند إزالة الأوزان من جانب واحد. يمنح الكروم مظهراً نظيفاً لكنه يحتاج إلى تنظيف مناسب وتحكم في الرطوبة.\n\nالمساحة التشغيلية أكبر من قاعدة الحامل. يجب ألا يضيق الممر أو مخرج الطوارئ وأن يوضع على أرضية مستوية."],
      ["القيمة داخل المنشأة", "يتيح للاستوديو تغيير الوزن بسرعة، ويوفر للفندق محطة سهلة الفهم، ويمكن للنادي الكبير فصل الأوزان الخفيفة عن المنطقة الرئيسية.\n\nهذه استخدامات منطقية للتكوين وليست ادعاءات عن مكان الصورة. يحدد برنامج التدريب ما إذا كان النطاق كاملاً أم مكملاً."],
      ["التشغيل والصيانة", "يُعاد كل زوج إلى موضعه. يفحص الطاقم الرؤوس والمقابض والعلامات والحوامل والمسامير ونقاط الأرضية. تُوقف القطعة المتضررة عن الاستخدام.\n\nيُنظف الكروم بمادة معتمدة ويُجفف. تحتاج البيئات الرطبة إلى مراجعة خاصة للتشطيب."],
      ["منظور المصنع", "يحتاج المصنع إلى نطاق الوزن وعدد الأزواج والكمية والشعار والتشطيب والتعبئة والسوق والموعد. تربط العينة المعتمدة الخامة والتصنيع والعلامة وفحص الوزن وملاءمة الحامل.\n\nعند التصدير تُفصل الأسطح المصقولة وتُثبت. تُراجع الكراتين والحماية من الرطوبة وترقيم القطع وتعليمات التجميع."],
      ["بيانات طلب السعر", "أرسل نوع المنشأة والمساحة والمستخدمين ونطاق الكيلوجرام وبلد الوصول. حدّد ما إذا كان الاستخدام لفندق أو استوديو أو توزيع أو منطقة خفيفة تجارية.\n\nأضف الكمية والشعار والتشطيب والتعبئة والموعد، واطلب قائمة بكل وزن ورسم الحامل محملاً."]
    ],
    faq: [
      ["ماذا تثبت الصورة؟", "تثبت وجود تكوين حقيقي من أزواج دمبل كروم وحامل أسود بشكل X بعلامات حتى 10 كجم، ولا تثبت هوية عميل."],
      ["هل نطاق 1–10 كجم كافٍ لصالة تجارية؟", "قد يكفي لمنطقة خفيفة. تحتاج صالة القوة الكاملة غالباً إلى أوزان ومعدات إضافية."],
      ["ما الذي يجب فحصه في الحامل؟", "الأبعاد المحملة والقدرة والخامة والثبات والحوامل والمسامير والتجميع."],
      ["كيف تتم صيانة الكروم؟", "بمنظف متوافق مع التجفيف وفحص السطح ونقاط التلامس."],
      ["هل يمكن تخصيص الشعار؟", "يعتمد على الطراز والكمية والطريقة ويُعتمد بالعينة قبل الإنتاج."],
      ["ما المطلوب للتسعير؟", "النطاق والأزواج والكمية والحامل والوجهة والشعار والتعبئة والموعد والوثائق."]
    ],
    links: [["dumbbells-category", "مقارنة الدمبل التجاري"], ["chrome-dumbbell", "خيارات دمبل الكروم"], ["dumbbells-guide", "تخطيط نطاق الدمبل"], ["projects", "مشاهدة المشروعات"], ["factory", "التصنيع وضبط الجودة"], ["contact", "إرسال المتطلبات"]],
    imageAlt: ["أزواج دمبل كروم من 1 إلى 10 كجم على حامل أسود مدمج بشكل X", "تفصيل علامات الكيلوجرام ومواضع التخزين المنفصلة"],
    imageCaption: ["تطبيق حقيقي لأوزان خفيفة مع تخزين رأسي مدمج.", "يبين التفصيل العلامات وسطح الكروم ومواضع الحامل."],
    ctaTitle: "خطط لمحطة دمبل مدمجة",
    ctaText: "أرسل نطاق الوزن والمساحة والكمية والشعار والوجهة.",
    ctaLabel: "اطلب الكتالوج وعرض المصنع",
    contactPath: "/contact"
  }
];

function blocks(copy: CaseCopy): ContentBlock[] {
  return copy.sections.map(([heading, content], index) => {
    const expansion = caseSectionExpansions[copy.locale]?.[index];
    const supplement = caseSectionSupplements[copy.locale]?.[index];
    const additionalContent = [expansion, supplement].filter(Boolean).join("\n\n");

    return {
      id: `section-${index + 1}`,
      type: "rich_text",
      heading,
      content: additionalContent ? `${content}\n\n${additionalContent}` : content,
      data: index === 0 ? { component: "quick-answer" } : undefined
    };
  });
}

function faq(copy: CaseCopy): LocalizedFaq[] {
  return copy.faq.map(([question, answer], index) => ({ id: `faq-${index + 1}`, question, answer }));
}

function internalLinks(copy: CaseCopy): LocalizedInternalLink[] {
  return copy.links.map(([targetContentId, label]) => ({ targetContentId, label }));
}

function version(copy: CaseCopy): LocalizedContentVersion {
  return {
    locale: copy.locale,
    translationStatus: copy.locale === "en" ? "published" : "localized",
    reviewStatus: "approved",
    publishStatus: "published",
    slug: copy.path.split("/").filter(Boolean).at(-1) ?? "compact-chrome-dumbbell-set",
    publicPath: copy.path,
    title: copy.title,
    description: copy.description,
    h1: copy.h1,
    body: blocks(copy),
    faq: faq(copy),
    author: { id: "powerbasefit-editorial", name: "PowerBaseFit", kind: "Organization", role: "Free Weight Equipment Manufacturer", url: "/" },
    schemaData: {
      category: "Free Weight Equipment Application Case",
      breadcrumbs: [
        { name: copy.breadcrumbHome, path: copy.locale === "en" || copy.locale === "ar" ? "/" : `/${copy.path.split("/").filter(Boolean)[0]}` },
        { name: copy.breadcrumbProjects, path: copy.locale === "en" || copy.locale === "ar" ? "/projects" : copy.path.split("/").slice(0, 3).join("/") },
        { name: copy.h1, path: copy.path }
      ],
      extra: {
        mainKeyword: copy.mainKeyword,
        secondaryKeywords: copy.secondaryKeywords,
        targetAudience: copy.targetAudience,
        ctaTitle: copy.ctaTitle,
        ctaText: copy.ctaText,
        ctaLabel: copy.ctaLabel,
        contactPath: copy.contactPath,
        eyebrow: copy.eyebrow,
        sourceDisclosure: "Content is limited to observable image evidence and confirmed manufacturer process information."
      }
    },
    images: imagePaths.map((src, index) => ({
      id: index === 0 ? "application-overview" : "rack-detail",
      src,
      alt: copy.imageAlt[index],
      caption: copy.imageCaption[index],
      width: index === 0 ? 1200 : 960,
      height: index === 0 ? 1200 : 720
    })),
    internalLinks: internalLinks(copy),
    canonicalData: { mode: "self" },
    hreflangData: { include: true },
    updatedAt: publishedAt,
    publishedAt,
    version: 1
  };
}

export const compactChromeDumbbellCase: ContentEntity = {
  id: "case-compact-chrome-dumbbell-set",
  type: "case",
  defaultLocale: "en",
  versions: Object.fromEntries(copies.map((copy) => [copy.locale, version(copy)]))
};
