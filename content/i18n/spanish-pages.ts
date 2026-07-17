import type { SpanishPage } from "./es-types";
import {
  checklist,
  definition,
  quick,
  rich,
  spanishEditorialAuthor,
  spanishTechnicalReviewer,
  table
} from "./es-content-helpers";

const editorial = spanishEditorialAuthor;
const reviewer = spanishTechnicalReviewer;

type ProductInput = {
  id: string;
  esPath: string;
  title: string;
  description: string;
  h1: string;
  sku: string;
  image: [string, string];
  productName: string;
  definition: string;
  application: string;
  material: string;
  materialDetail: string;
  range: string;
  construction: string;
  handling: string;
  comparison: string;
  links: Array<[string, string]>;
  specifications: Array<{ name: string; value: string }>;
};

function productPage(input: ProductInput): SpanishPage {
  return {
    id: input.id,
    type: "product",
    esPath: input.esPath,
    title: input.title,
    description: input.description,
    h1: input.h1,
    sku: input.sku,
    image: input.image,
    material: input.material,
    category: "Equipamiento profesional de peso libre",
    specifications: input.specifications,
    blocks: [
      quick("respuesta-rapida", `${input.productName} está pensado para compradores B2B que necesitan una especificación verificable, suministro por cantidades y opciones de marca propia. ${input.range}. La configuración final de peso, acabado, logotipo, embalaje y tolerancias se confirma en la oferta y, cuando corresponde, mediante una muestra aprobada.`),
      definition("definicion", input.productName, input.definition),
      table("especificaciones", "Especificaciones técnicas para la solicitud de oferta", ["Elemento", "Referencia", "Qué debe confirmar el comprador"], [
        ["Modelo", input.productName, "Código, fotografía y versión exacta"],
        ["Rango o configuración", input.range, "Pesos y unidades por peso"],
        ["Material", input.material, "Composición, superficie y acabado"],
        ["Construcción", input.construction, "Unión, inserto o empuñadura según el producto"],
        ["Marcado", "kg o lb; logotipo sujeto a viabilidad", "Sistema, contraste, tamaño y muestra"],
        ["Embalaje", "Caja y palé según peso", "Protección, peso bruto y etiquetado"]
      ]),
      rich("producto", "Producto y aplicaciones comerciales", input.application, `La decisión no debe basarse únicamente en una fotografía. Conviene relacionar el producto con el número de usuarios, el tipo de entrenamiento, el almacenamiento, la frecuencia de limpieza y la reposición futura. ${input.comparison}`),
      rich("materiales", "Materiales y construcción", input.materialDetail, `La denominación del material no sustituye una ficha técnica. Dos ofertas que utilizan la misma palabra comercial pueden diferir en formulación, dureza, espesor, unión y acabado. El comprador debe comparar muestras y registrar los criterios que afectarán la aceptación del lote.`),
      rich("fabricacion", "Proceso de fabricación", `El flujo de ${input.productName.toLowerCase()} parte de componentes y materiales definidos para el modelo. Incluye preparación, formación o mecanizado de las piezas, tratamiento de la superficie, montaje o unión, marcado, limpieza e identificación por peso. La secuencia exacta depende de la construcción aprobada y no se presenta como idéntica para todos los productos.`, "En proyectos OEM, los archivos de logotipo, colores, sistema kg/lb y embalaje se revisan antes de liberar la producción. Una modificación posterior a la muestra debe quedar documentada, porque puede cambiar herramientas, tiempos, cantidades mínimas o el método de inspección."),
      checklist("control-calidad", "Control de calidad del pedido", [
        "Modelo, peso y cantidad por referencia",
        "Dimensiones o encaje funcional",
        "Superficie, color y uniformidad",
        "Unión, inserto o empuñadura",
        "Legibilidad del peso y del logotipo",
        "Comparación con la muestra aprobada",
        "Protección, etiqueta y peso por caja"
      ]),
      rich("qc", "Inspección y criterios de aceptación", "El control puede incluir comprobación de peso, medidas, acabado, alineación, marcado, cantidad y embalaje. Los criterios importantes deben ser mensurables. Expresiones como “calidad premium” o “uso comercial” no explican por sí solas qué tolerancia, prueba o defecto visual será aceptable.", "Para un pedido de marca propia, la inspección también debe comprobar versión de arte, posición, color, texto y coherencia entre pesos. El comprador puede acordar registros fotográficos, informe interno o inspección externa según el riesgo y las condiciones del pedido."),
      rich("oem", "OEM, marca propia y personalización", "La personalización puede incluir logotipo, colores, marcado en kg o lb y embalaje. La viabilidad depende del modelo, el espacio disponible, el método y la cantidad. Un cambio visual sobre una construcción existente suele ser más sencillo que modificar material, forma o herramienta.", "Para recibir una propuesta útil, envíe archivo del logotipo, mercado de destino, pesos, unidades por peso y tipo de embalaje. PowerBaseFit confirma qué opciones son posibles, si hace falta una muestra, el MOQ aplicable y el plazo estimado después de revisar la combinación completa."),
      rich("embalaje", "Embalaje, transporte y manipulación", `${input.handling} Los productos de peso libre concentran mucha masa y pueden dañarse por contacto, desplazamiento o cajas sobrecargadas. El plan debe indicar unidades por caja, peso neto y bruto, protección interna, palés y forma de identificar cada referencia.`, "La cotización de fábrica no representa automáticamente el coste final en España o América Latina. El comprador debe añadir transporte, seguro cuando corresponda, despacho, impuestos, almacenaje y entrega local con apoyo de profesionales responsables de la operación."),
      checklist("rfq", "Datos para cotizar", [
        "Empresa, país y canal de venta",
        `Modelo: ${input.productName}`,
        "Pesos y cantidades por referencia",
        "Uso previsto y frecuencia",
        "Logotipo, colores y sistema kg/lb",
        "Embalaje y etiquetado",
        "Muestra e inspección requeridas",
        "Puerto o ciudad de destino y plazo"
      ])
    ],
    faq: [
      ["¿Este producto sirve para un gimnasio profesional?", `Puede utilizarse en proyectos profesionales cuando el modelo, la especificación, el almacenamiento y el mantenimiento son adecuados para la intensidad prevista.`],
      ["¿Se puede personalizar con mi logotipo?", "Sí, sujeto a revisión del archivo, método, superficie disponible, cantidad, muestra y MOQ."],
      ["¿Cuál es la cantidad mínima?", "No existe una cifra universal. Depende del modelo, los pesos, el método de personalización y la composición total del pedido."],
      ["¿Cómo se comprueba la calidad?", "Se definen criterios de peso, medidas, superficie, construcción, marcado, cantidades y embalaje antes de la producción."],
      ["¿La cotización incluye transporte e importación?", "Debe solicitarse una condición comercial concreta. Los costes en destino se calculan para la operación real con los profesionales correspondientes."]
    ],
    links: input.links,
    author: editorial,
    reviewedBy: reviewer
  };
}

export const spanishPages: SpanishPage[] = [
  {
    id: "home", type: "home", esPath: "/es",
    title: "Fabricante de equipos de gimnasio para distribuidores | PowerBaseFit",
    description: "Fabricante de mancuernas, discos de peso y equipos de gimnasio con OEM, marca propia, control de calidad y suministro B2B para España y América Latina.",
    h1: "Equipos profesionales de gimnasio directamente de fábrica",
    image: ["/assets/hero-poster.avif", "Equipos profesionales de gimnasio PowerBaseFit para distribuidores e importadores"],
    blocks: [
      quick("respuesta-rapida", "PowerBaseFit fabrica mancuernas, discos de peso, racks, bancos y accesorios para distribuidores, importadores, marcas propias y proyectos de gimnasios. El proceso B2B parte de una lista real de productos, cantidades, pesos, personalización y destino para definir especificación, MOQ, producción, control de calidad y embalaje."),
      definition("definicion", "Fabricante de equipos de gimnasio", "Es una empresa que produce equipamiento fitness conforme a modelos y especificaciones definidos para compradores profesionales. En una relación B2B, la fabricación incluye revisión técnica, muestras cuando corresponde, producción, inspección, embalaje y preparación de exportación; no equivale a una compra minorista."),
      table("soluciones", "Soluciones para compradores profesionales", ["Necesidad", "Productos o servicio", "Información inicial"], [
        ["Distribución", "Mancuernas, discos, racks, bancos y accesorios", "Mercado, gama, cantidades y reposición"],
        ["Marca propia", "Logotipo, colores, kg/lb y embalaje", "Identidad, producto base y MOQ"],
        ["Nuevo gimnasio", "Selección comercial por zonas", "Área, usuarios, rango de pesos y destino"],
        ["Importación", "Embalaje y preparación de carga", "Puerto, condición comercial y calendario"]
      ]),
      rich("fabricacion", "Fabricación de peso libre para el mercado internacional", "PowerBaseFit informa que opera desde 2008 y dispone de una fábrica de aproximadamente 8.000 m² en Dezhou, provincia de Shandong, China. La empresa trabaja con productos de peso libre y equipamiento relacionado para compradores internacionales. Estos datos describen la operación propia; no se utilizan para inventar certificaciones, clientes o volúmenes de venta.", "Cada proyecto se revisa por producto. Material, rango, dimensiones, tolerancias, logotipo, embalaje y plazo se confirman en la documentación aplicable al pedido. Para modelos estándar, la expedición puede situarse alrededor de diez días después del depósito cuando materiales y programación están confirmados; una personalización más compleja requiere una evaluación específica."),
      rich("mercados", "España y América Latina", "La versión española utiliza un registro comercial internacional comprensible en España, México, Colombia, Chile, Argentina y otros mercados. Emplea “mancuernas” y “discos de peso” como términos técnicos principales, además de referencias naturales a pesas y equipos fitness cuando ayudan a la comprensión regional.", "Las condiciones de importación, impuestos y requisitos locales cambian por país y operación. PowerBaseFit aporta información de producto, fábrica, embalaje y exportación; el comprador debe validar clasificación, cumplimiento y costes con profesionales responsables en su mercado."),
      rich("oem", "OEM y marca propia", "Los programas OEM pueden evaluar logotipo, color, marcado en kg o lb y embalaje. El MOQ depende del producto, el proceso y la combinación del pedido. La fábrica distingue entre una personalización visual sobre un modelo existente y un desarrollo que requiere herramienta, molde o cambios técnicos.", "Una solicitud clara incluye modelo, peso, cantidad, uso, mercado, identidad visual y destino. Con esos datos se puede definir muestra, criterios de calidad y preparación logística sin promesas genéricas."),
      checklist("inicio-compra", "Información para iniciar una compra B2B", ["Empresa y mercado", "Categorías y modelos", "Pesos y cantidades", "Uso profesional o distribución", "OEM y embalaje", "Destino y condición comercial", "Plazo, muestra e inspección"])
    ],
    faq: [
      ["¿PowerBaseFit vende equipos de gimnasio al por mayor?", "Sí. El enfoque es B2B para distribuidores, importadores, marcas y proyectos de gimnasios."],
      ["¿Puedo poner mi marca en las mancuernas o discos?", "Sí, según el modelo. Se revisan logotipo, color, marcado, embalaje, muestra, cantidad y MOQ."],
      ["¿Trabajan con España y América Latina?", "La empresa atiende compradores internacionales. Las condiciones de entrega y los requisitos del destino se confirman para cada proyecto."],
      ["¿Dónde está la fábrica?", "En Ningjin, Dezhou, provincia de Shandong, China."],
      ["¿Cómo solicito una cotización?", "Envíe productos, pesos, cantidades, personalización y destino mediante la página de contacto o WhatsApp."]
    ],
    links: [["products-hub", "Ver equipos profesionales"], ["dumbbells-category", "Mancuernas profesionales"], ["weight-plates-category", "Discos de peso"], ["oem-private-label", "OEM y marca propia"], ["factory", "Conocer la fábrica"], ["contact", "Solicitar cotización"]],
    author: editorial, reviewedBy: reviewer
  },
  {
    id: "products-hub", type: "product_category", esPath: "/es/productos",
    title: "Equipos de gimnasio al por mayor y OEM | PowerBaseFit",
    description: "Equipos profesionales de gimnasio para distribuidores e importadores: mancuernas, discos, racks, bancos, accesorios, OEM y marca propia de fábrica.",
    h1: "Equipos profesionales para gimnasios y distribuidores",
    image: ["/assets/hero-poster.avif", "Equipos de musculación para gimnasios, distribuidores y marcas propias"],
    blocks: [
      quick("respuesta-rapida", "PowerBaseFit suministra mancuernas, discos de peso, racks, bancos y accesorios para compradores B2B. La selección debe relacionar uso, gama, cantidades, reposición, personalización y logística; un catálogo amplio solo aporta valor cuando cada producto tiene una función comercial definida."),
      definition("definicion", "Equipos de gimnasio al por mayor", "Son productos adquiridos en cantidad por empresas para instalación, distribución, importación o venta con marca propia. El pedido se organiza por modelos, pesos, especificaciones y condiciones comerciales, no como una compra unitaria de comercio electrónico."),
      table("categorias", "Categorías principales", ["Categoría", "Aplicación", "Decisión de compra"], [
        ["Mancuernas", "Musculación, hoteles, estudios y distribución", "Forma, material, rango y rack"],
        ["Discos de peso", "Barras, máquinas y zonas de fuerza", "Estándar, uso, espesor y almacenamiento"],
        ["Racks y bancos", "Organización y estaciones de entrenamiento", "Dimensiones, carga, montaje y volumen"],
        ["Accesorios", "Entrenamiento funcional y venta complementaria", "Mix, empaque y canal"],
        ["OEM", "Marca propia y diferenciación", "Logo, color, kg/lb, muestra y MOQ"]
      ]),
      rich("seleccion", "Cómo organizar el portafolio", "Un gimnasio debe equilibrar espacio, número de usuarios, rango de pesos, almacenamiento y mantenimiento. Un distribuidor debe pensar en rotación, niveles de precio, reposición y compatibilidad entre productos. Una marca propia añade coherencia visual, embalaje e identificación.", "La carga también importa. Mancuernas y discos son densos; racks y bancos consumen volumen. La combinación debe proteger superficies y aprovechar el contenedor sin crear presión o movimientos que dañen el producto."),
      rich("especificacion", "Especificación, muestra y control", "Cada modelo necesita una ficha con material, peso, dimensiones, construcción y opciones OEM. La muestra puede confirmar apariencia y función, pero no sustituye la inspección del lote. Los criterios de aceptación deben escribirse antes de producir.", "El control puede revisar peso, medidas, superficie, montaje, marcado, cantidades y embalaje. Para una línea de marca propia, se añade la verificación de archivos, colores y consistencia entre referencias."),
      rich("compra", "Compra internacional y coste total", "La comparación debe utilizar la misma condición comercial y especificación. Precio unitario, embalaje, cantidad mínima, muestra, inspección, transporte y gastos de destino forman parte del coste total.", "PowerBaseFit aporta datos de producto y exportación. Clasificación, impuestos, licencias y cumplimiento deben validarse para España, México, Colombia, Chile, Argentina u otro destino con profesionales locales."),
      checklist("cotizacion", "Datos para solicitar una cotización", ["Empresa y país", "Categorías y modelos", "Cantidad por referencia", "kg o lb", "Logo, color y embalaje", "Muestra y QC", "Puerto o ciudad de destino"])
    ],
    faq: [["¿Qué categorías fabrica PowerBaseFit?", "Mancuernas, discos, racks, bancos y accesorios, con especificación confirmada por modelo."], ["¿Se pueden combinar productos?", "Sí, sujeto a MOQ, protección y planificación de carga."], ["¿La venta es minorista?", "El enfoque principal es el suministro B2B."], ["¿Hay marca propia?", "Sí, según viabilidad del producto, método y cantidad."], ["¿Cómo comparar dos ofertas?", "Use la misma especificación, condición comercial, embalaje y alcance de control."]],
    links: [["dumbbells-category", "Mancuernas profesionales"], ["weight-plates-category", "Discos de peso"], ["racks-benches-category", "Racks y bancos"], ["gym-accessories-category", "Accesorios de gimnasio"], ["oem-private-label", "Programa de marca propia"], ["rubber-hex-dumbbell-manufacturer", "Fabricante de mancuernas hexagonales"], ["professional-gym-list-guide", "Lista para un gimnasio profesional"], ["contact", "Pedir cotización"]],
    author: editorial, reviewedBy: reviewer
  },
  {
    id: "dumbbells-category", type: "product_category", esPath: "/es/productos/mancuernas",
    title: "Mancuernas profesionales al por mayor y OEM | PowerBaseFit",
    description: "Proveedor y fabricante de mancuernas profesionales de goma, cromadas y otras opciones con marca propia, kg/lb, QC y embalaje de exportación.",
    h1: "Mancuernas profesionales para gimnasios y distribución",
    image: ["/assets/project-dumbbell-zone.png", "Zona de mancuernas profesionales para gimnasio comercial"],
    blocks: [
      quick("respuesta-rapida", "Una línea profesional de mancuernas debe combinar forma, material, rango de pesos, pares repetidos, rack y reposición. PowerBaseFit suministra modelos para gimnasios, hoteles, estudios, distribuidores y marcas propias, con configuración en kg o lb según el proyecto."),
      definition("definicion", "Mancuerna profesional", "Es una pesa manual diseñada y especificada para uso repetido en instalaciones o canales comerciales. Su idoneidad depende de construcción, unión, superficie, empuñadura, tolerancia, almacenamiento y mantenimiento, no solo de la etiqueta “comercial”."),
      table("comparacion", "Comparación inicial de mancuernas", ["Tipo", "Ventaja de uso", "Qué revisar"], [
        ["Hexagonal de goma", "Reduce el rodamiento y funciona bien en ejercicios de suelo", "Unión, olor, superficie y empuñadura"],
        ["Cromada", "Formato compacto y presentación metálica", "Acabado, humedad, limpieza y rack"],
        ["Redonda de goma", "Gama continua y organización en rack", "Estabilidad, diámetro y pesos altos"],
        ["PU", "Presentación uniforme para líneas premium", "Formulación, color, superficie y coste"],
        ["TPU", "Alternativa técnica según el modelo", "Construcción real y muestra"]
      ]),
      rich("rango", "Rango de pesos y cantidades", "El rango debe responder al público. Pesos ligeros e intermedios suelen tener mayor uso simultáneo; los pesados requieren ergonomía, rack y espacio. La cantidad no tiene que ser idéntica para todos los pesos.", "Para distribución, conviene separar conjuntos de entrada, completos y premium. Para instalaciones, calcule usuarios en hora punta, ejercicios y reposición. Defina desde el inicio si la identificación será en kg o lb."),
      rich("material", "Material, empuñadura y mantenimiento", "Goma, PU, TPU y metal tienen comportamientos y posicionamientos distintos. Compare superficie, olor, dureza, textura, contacto con el rack y método de limpieza. La empuñadura debe revisarse por diámetro, moleteado, longitud y alineación.", "Una muestra permite evaluar apariencia y ergonomía, pero el pedido necesita tolerancias y control. La instalación debe inspeccionar piezas dañadas y mantener el área seca y organizada."),
      rich("oem", "OEM para distribuidores y marcas", "Logotipo, color, marcado, kg/lb y embalaje pueden evaluarse por modelo. El tamaño de la cabeza cambia entre pesos, por lo que la proporción del logotipo debe comprobarse en referencias representativas.", "Envíe una tabla con peso y cantidad. La fábrica confirma método, muestra, MOQ y plazo. No se debe asumir que toda personalización funciona en todas las construcciones."),
      checklist("compra", "Checklist para comprar mancuernas", ["Uso y público", "Forma y material", "Pesos e incrementos", "Pares por peso", "Empuñadura y unión", "Rack y suelo", "OEM, muestra, QC y embalaje"])
    ],
    faq: [["¿Qué mancuerna es mejor para un gimnasio?", "Depende del uso, rango, almacenamiento, mantenimiento y presupuesto."], ["¿Hexagonal o redonda?", "La hexagonal reduce rodamiento; la redonda favorece líneas continuas en racks adecuados."], ["¿Goma o PU?", "Compare productos reales por formulación, construcción, presentación y coste."], ["¿Se puede imprimir mi marca?", "Sí, según el modelo, método, cantidad y muestra."], ["¿Cuántos pares necesito?", "Calcúlelo por usuarios, rango, ejercicios, espacio y repetición de pesos populares."]],
    links: [["rubber-hex-dumbbell", "Mancuerna hexagonal de goma"], ["chrome-dumbbell", "Mancuerna cromada"], ["dumbbells-guide", "Guía para elegir mancuernas"], ["hex-vs-round-guide", "Hexagonal frente a redonda"], ["materials-guide", "Goma frente a PU y TPU"], ["oem-private-label", "Mancuernas de marca propia"], ["contact", "Solicitar cotización"]],
    author: editorial, reviewedBy: reviewer
  },
  {
    id: "weight-plates-category", type: "product_category", esPath: "/es/productos/discos-de-peso",
    title: "Discos de peso y discos bumper al por mayor | PowerBaseFit",
    description: "Fabricante de discos de peso olímpicos y bumper para gimnasios y distribuidores, con OEM, kg/lb, logotipo, QC y embalaje de exportación.",
    h1: "Discos de peso para gimnasios, distribuidores y marcas",
    image: ["/assets/project-plate-zone.png", "Discos de peso y barras en una zona profesional de musculación"],
    blocks: [
      quick("respuesta-rapida", "La elección de discos comienza por la barra, la máquina y el tipo de entrenamiento. Los discos olímpicos, recubiertos y bumper no son sinónimos. El comprador debe confirmar diámetro interior, espesor, material, tolerancia, uso previsto, almacenamiento y embalaje."),
      definition("definicion", "Disco de peso", "Es una carga desmontable utilizada con barras o equipos compatibles. “Olímpico” describe principalmente la compatibilidad con la manga; “bumper” describe una construcción pensada para levantamientos con contacto planificado con una plataforma o suelo apropiado."),
      table("tipos", "Tipos y aplicaciones", ["Tipo", "Uso habitual", "Pregunta clave"], [
        ["Olímpico recubierto", "Musculación y máquinas compatibles", "¿Cuál es el diámetro interior y el espesor?"],
        ["Bumper de goma", "Levantamiento y entrenamiento funcional", "¿Qué dureza, rebote y uso están previstos?"],
        ["Disco estándar", "Barras o equipos del estándar correspondiente", "¿Es compatible con la barra?"],
        ["Competición", "Aplicaciones con requisitos específicos", "¿Qué tolerancias y documentación se necesitan?"]
      ]),
      rich("seleccion", "Cómo elegir el mix de discos", "El número de estaciones, las barras, los usuarios y el programa determinan los pesos. Los discos ligeros pueden requerir más unidades para ajustes; los pesados ocupan menos piezas pero concentran carga. El espesor limita cuánto cabe en la manga.", "Para distribución, analice la rotación por peso y la reposición. Para gimnasios, asegure almacenamiento cerca de las estaciones sin bloquear circulación. Una bumper plate no elimina la necesidad de suelo y reglas de uso."),
      rich("oem", "Marca propia y especificación", "Logotipo, color, kg/lb y embalaje pueden revisarse según el modelo. La propuesta debe indicar material, centro, pesos, espesor y tolerancias. No compare solamente el precio por kilogramo.", "El control puede revisar peso, diámetro interior, inserto, superficie, marcado y protección. El embalaje es crítico porque los discos generan cajas densas y palés pesados."),
      checklist("rfq", "Información para cotizar discos", ["Barra o máquina", "Tipo de entrenamiento", "Pesos y cantidades", "Diámetro y espesor", "Material y superficie", "Logo y kg/lb", "Embalaje, destino e inspección"])
    ],
    faq: [["¿Un disco olímpico es siempre bumper?", "No. Olímpico indica compatibilidad; bumper indica construcción y uso."], ["¿Qué disco conviene para musculación?", "Depende de la barra, la máquina, el espacio y si existen caídas planificadas."], ["¿Puedo poner mi logotipo?", "Sí, cuando el modelo y la cantidad permiten el método solicitado."], ["¿Cómo se embalan?", "En cajas y palés definidos por peso y composición."], ["¿Qué debo revisar al recibirlos?", "Pesos, centro, superficie, marcado, cantidad y daños de transporte."]],
    links: [["rubber-bumper-plate", "Disco bumper de goma"], ["rubber-olympic-plate", "Disco olímpico recubierto"], ["plates-guide", "Comparar discos y bumper"], ["oem-private-label", "Discos de marca propia"], ["contact", "Solicitar cotización"]],
    author: editorial, reviewedBy: reviewer
  },
  productPage({
    id: "rubber-hex-dumbbell",
    esPath: "/es/productos/mancuernas/mancuerna-hexagonal-goma",
    title: "Mancuerna hexagonal de goma 2,5–50 kg OEM | PowerBaseFit",
    description: "Mancuerna hexagonal de goma profesional de 2,5 a 50 kg, con logotipo, marca propia, control de calidad y embalaje para distribuidores.",
    h1: "Mancuerna hexagonal de goma para uso profesional",
    sku: "HEX-DB-KG",
    image: ["/assets/products/dumbbells/catalog-v2/hex-dumbbell-kg.jpg", "Mancuerna hexagonal de goma profesional para gimnasio"],
    productName: "Mancuerna hexagonal de goma",
    definition: "Es una pesa manual con cabezas de seis lados recubiertas de goma y empuñadura metálica. La geometría ayuda a reducir el rodamiento cuando se coloca en el suelo, pero no sustituye un almacenamiento seguro ni autoriza impactos incontrolados.",
    application: "Se utiliza en gimnasios comerciales, estudios, hoteles, distribución y líneas de marca propia. El formato es útil para ejercicios en los que la mancuerna se apoya cerca del suelo y para instalaciones que buscan una pieza estable entre series.",
    material: "Cabeza hexagonal recubierta de goma y empuñadura metálica",
    materialDetail: "El recubrimiento de goma aporta una superficie comercial reconocible y ayuda a evitar contacto directo del núcleo con el entorno. Deben evaluarse olor, textura, acabado, dureza y respuesta al rack. La empuñadura se revisa por diámetro, moleteado, alineación y unión.",
    range: "El modelo de catálogo cubre de 2,5 a 50 kg, con incrementos de 2,5 kg",
    construction: "Cabeza hexagonal, recubrimiento de goma y empuñadura metálica",
    handling: "Las cabezas deben separarse para reducir marcas y movimiento durante el transporte.",
    comparison: "Frente a una mancuerna redonda, la forma hexagonal reduce el rodamiento; la redonda puede integrarse mejor en determinadas gamas y racks. La aplicación decide.",
    links: [["dumbbells-category", "Ver mancuernas"], ["hex-vs-round-guide", "Comparar hexagonal y redonda"], ["materials-guide", "Comparar materiales"], ["oem-private-label", "Personalización OEM"], ["contact", "Pedir cotización"]],
    specifications: [{ name: "Rango", value: "2,5 a 50 kg" }, { name: "Incremento", value: "2,5 kg" }, { name: "Forma", value: "Hexagonal" }, { name: "Recubrimiento", value: "Goma" }]
  }),
  productPage({
    id: "chrome-dumbbell",
    esPath: "/es/productos/mancuernas/mancuerna-cromada",
    title: "Mancuerna cromada profesional y marca propia | PowerBaseFit",
    description: "Mancuerna cromada para gimnasios, hoteles y distribuidores, con opciones OEM, logotipo, kg/lb, QC y embalaje de exportación B2B.",
    h1: "Mancuerna cromada para proyectos comerciales",
    sku: "CHROME-DB",
    image: ["/assets/chrome-dumbbell.jpg", "Mancuerna cromada profesional con empuñadura texturizada"],
    productName: "Mancuerna cromada",
    definition: "Es una mancuerna con superficie metálica cromada o de apariencia cromada según la construcción del modelo. Se elige por su formato compacto y presentación, pero requiere control del ambiente, limpieza y almacenamiento para conservar el acabado.",
    application: "Es habitual en hoteles, clubes, estudios, showrooms y zonas donde la presentación visual tiene un peso importante. También puede formar parte de un catálogo de distribución con gamas compactas.",
    material: "Construcción metálica con acabado cromado según modelo",
    materialDetail: "El desempeño depende del metal base, la preparación y el proceso de superficie. Humedad, sudor, productos de limpieza y contacto con otras piezas pueden afectar la apariencia. La muestra debe revisarse bajo condiciones realistas.",
    range: "Pesos, incrementos y sistema kg/lb se confirman para la configuración cotizada",
    construction: "Cuerpo metálico compacto y empuñadura texturizada",
    handling: "Cada pieza necesita protección contra roce, humedad y presión sobre la superficie.",
    comparison: "Frente a una mancuerna recubierta, prioriza una presentación metálica compacta; no ofrece la misma protección superficial de una cabeza de goma o PU.",
    links: [["dumbbells-category", "Ver mancuernas"], ["materials-guide", "Comparar acabados"], ["oem-private-label", "Marca propia"], ["contact", "Pedir cotización"]],
    specifications: [{ name: "Acabado", value: "Cromado según modelo" }, { name: "Sistema", value: "kg o lb según proyecto" }, { name: "Uso", value: "Hotel, estudio, club y gimnasio" }]
  }),
  productPage({
    id: "rubber-bumper-plate",
    esPath: "/es/productos/discos/disco-bumper-goma",
    title: "Disco bumper de goma para gimnasio y OEM | PowerBaseFit",
    description: "Disco bumper de goma para entrenamiento profesional y distribución, con logotipo, colores, kg/lb, control de calidad y embalaje OEM.",
    h1: "Disco bumper de goma para uso profesional",
    sku: "RBP",
    image: ["/assets/weight-plate.jpg", "Disco bumper de goma para entrenamiento profesional"],
    productName: "Disco bumper de goma",
    definition: "Es un disco de diámetro exterior uniforme construido principalmente con goma y un centro metálico para barras olímpicas. Está destinado a levantamientos con contacto planificado con una plataforma o suelo apropiado; no elimina la necesidad de controlar técnica, altura y superficie.",
    application: "Se utiliza en zonas de fuerza, levantamiento y entrenamiento funcional. Distribuidores y gimnasios deben relacionar dureza, espesor y pesos con el programa real y la carga máxima que debe entrar en la manga.",
    material: "Cuerpo de goma con inserto central metálico",
    materialDetail: "La formulación, dureza, rebote, espesor y acabado varían por modelo. Deben confirmarse en ficha y muestra. El centro metálico necesita tolerancia compatible con la barra y una unión adecuada al cuerpo.",
    range: "Los pesos, colores, espesor y tolerancias se confirman para el conjunto solicitado",
    construction: "Cuerpo de goma, diámetro bumper e inserto metálico",
    handling: "La carga densa exige cajas reforzadas, protección del centro y palés correctamente distribuidos.",
    comparison: "Frente a un disco olímpico recubierto convencional, la bumper plate se diseña para un uso de levantamiento diferente y suele ocupar más espacio en la manga.",
    links: [["weight-plates-category", "Ver discos de peso"], ["rubber-olympic-plate", "Comparar disco olímpico"], ["oem-private-label", "Discos con marca propia"], ["contact", "Pedir cotización"]],
    specifications: [{ name: "Construcción", value: "Goma con inserto metálico" }, { name: "Compatibilidad", value: "Barra olímpica según modelo" }, { name: "Uso", value: "Levantamiento y entrenamiento funcional" }]
  }),
  productPage({
    id: "rubber-olympic-plate",
    esPath: "/es/productos/discos/disco-olimpico-goma",
    title: "Disco olímpico recubierto de goma OEM | PowerBaseFit",
    description: "Disco olímpico recubierto de goma para barras, máquinas y gimnasios, con logotipo, kg/lb, marca propia, QC y embalaje B2B.",
    h1: "Disco olímpico recubierto de goma para gimnasio",
    sku: "RUBBER-OLY-PLATE",
    image: ["/assets/products/weight-plates/catalog/rubber-olympic-plate.jpg", "Disco olímpico recubierto de goma para gimnasio profesional"],
    productName: "Disco olímpico recubierto de goma",
    definition: "Es un disco compatible con una manga olímpica según el modelo, con cuerpo o cobertura de goma e inserto central metálico. Se utiliza en musculación y máquinas compatibles; no debe confundirse automáticamente con un disco bumper para caídas.",
    application: "Es adecuado para barras, máquinas plate-loaded y áreas de musculación cuando el diámetro interior, las dimensiones y la capacidad son compatibles. La selección debe partir del equipo y del uso.",
    material: "Cuerpo o recubrimiento de goma con inserto metálico",
    materialDetail: "La superficie ayuda a evitar contacto directo del metal y facilita una presentación comercial, pero impacto, humedad y limpieza incorrecta pueden dañarla. El inserto central, bordes y marcado deben inspeccionarse.",
    range: "Pesos, diámetro interior, espesor y tolerancia se confirman por modelo",
    construction: "Disco recubierto de goma con centro metálico olímpico",
    handling: "El peso por caja, la protección del inserto y la identificación por referencia deben planificarse.",
    comparison: "Frente a un bumper, suele orientarse a musculación y puede ofrecer una construcción más compacta; el comprador debe verificar el uso autorizado.",
    links: [["weight-plates-category", "Ver discos"], ["rubber-bumper-plate", "Comparar con bumper"], ["oem-private-label", "Personalización"], ["contact", "Pedir cotización"]],
    specifications: [{ name: "Centro", value: "Olímpico según modelo" }, { name: "Recubrimiento", value: "Goma" }, { name: "Uso", value: "Barras y máquinas compatibles" }]
  }),
  {
    id: "factory", type: "factory", esPath: "/es/fabrica",
    title: "Fábrica de equipos de gimnasio y peso libre | PowerBaseFit",
    description: "Conozca la fábrica PowerBaseFit en Dezhou: proceso de mancuernas y discos, control de calidad, OEM, embalaje y exportación B2B.",
    h1: "Fábrica de equipos de gimnasio para suministro B2B",
    image: ["/assets/factory.png", "Fábrica PowerBaseFit de equipos de gimnasio en Dezhou China"],
    blocks: [
      quick("respuesta-rapida", "PowerBaseFit informa que opera desde 2008 y cuenta con una fábrica de aproximadamente 8.000 m² en Dezhou, Shandong, China. La operación atiende productos de peso libre y equipamiento relacionado para compradores B2B, con revisión de especificaciones, producción, QC, embalaje y preparación de exportación."),
      definition("definicion", "Fábrica OEM de equipos fitness", "Es una operación que produce equipos conforme a modelos, especificaciones y personalización aprobados para otra empresa. Su evaluación debe centrarse en capacidades relacionadas con el producto real, control de versión, muestra, inspección y comunicación."),
      table("flujo", "Flujo general de fabricación", ["Etapa", "Actividad", "Control"], [
        ["Revisión", "Modelo, materiales, cantidad y OEM", "Orden y archivos aprobados"],
        ["Preparación", "Materia prima y componentes", "Identidad, cantidad y estado"],
        ["Producción", "Formación, mecanizado, recubrimiento o montaje", "Parámetros según producto"],
        ["Acabado", "Superficie, marcado y limpieza", "Apariencia y versión"],
        ["QC", "Peso, medidas, unión, cantidad y embalaje", "Registro de resultados"],
        ["Embarque", "Cajas, palés y documentos", "Packing list y liberación"]
      ]),
      rich("equipos", "Procesos y equipos", "La maquinaria y la secuencia dependen de la familia de producto. En mancuernas puede haber preparación de metal, formación de cabezas, empuñaduras, recubrimiento y unión. En discos pueden intervenir cuerpos, insertos, goma, acabado y marcado. Racks y bancos requieren procesos diferentes.", "Una lista de máquinas por sí sola no demuestra la capacidad para un pedido. El comprador debe relacionar proceso, personal, muestra y controles con el modelo que está cotizando."),
      rich("qc", "Control de calidad", "Los puntos pueden incluir recepción de material, comprobaciones durante la producción, peso, medidas, superficie, montaje, logotipo, cantidad y embalaje. La muestra aprobada sirve como referencia, pero el lote también necesita verificación.", "Los criterios críticos deben acordarse por escrito. Si se requiere inspección externa, momento, muestra, tolerancias y tratamiento de no conformidades deben definirse antes de la fecha de embarque."),
      rich("embalaje", "Embalaje y exportación", "Mancuernas y discos generan cargas densas; racks y bancos ocupan volumen. Cajas, separadores, palés y secuencia de carga se adaptan al producto. Equipos multifunción pueden utilizar cajas de madera cuando corresponde.", "PowerBaseFit prepara información comercial y de carga. La importación y el cumplimiento en destino deben validarse por el comprador y sus profesionales."),
      rich("oem", "Proceso OEM", "El flujo comienza con producto base, pesos, cantidad, logotipo, color, kg/lb y embalaje. Después se revisan viabilidad, muestra, aprobación, producción, QC y exportación. El MOQ y el plazo dependen de lo que cambie.", "La fábrica no presenta toda personalización como automáticamente posible. Separar opciones visuales de cambios técnicos reduce retrabajo y permite una decisión comercial más clara."),
      checklist("auditoria", "Qué solicitar al evaluar la fábrica", ["Modelo y proceso real", "Fotos o vídeo actuales", "Muestra y ficha", "Criterios de QC", "Archivos OEM", "Plan de embalaje", "Calendario y responsables"])
    ],
    faq: [["¿Dónde está la fábrica?", "En Ningjin, Dezhou, provincia de Shandong, China."], ["¿Desde cuándo opera PowerBaseFit?", "La empresa informa operación desde 2008."], ["¿Cuál es el tamaño de la fábrica?", "PowerBaseFit informa aproximadamente 8.000 m²."], ["¿Puedo pedir una muestra?", "Debe solicitarse según producto y personalización."], ["¿Se acepta inspección antes del embarque?", "Los requisitos se acuerdan en la cotización y el plan del pedido."]],
    links: [["products-hub", "Ver productos"], ["oem-private-label", "Proceso OEM"], ["factory-guide", "Cómo elegir un fabricante"], ["contact", "Hablar con la fábrica"]],
    author: editorial, reviewedBy: reviewer
  },
  {
    id: "contact", type: "contact", esPath: "/es/contacto",
    title: "Solicite cotización de equipos de gimnasio | PowerBaseFit",
    description: "Envíe su lista de mancuernas, discos o equipos fitness para cotización de fábrica, OEM, marca propia, embalaje y exportación B2B.",
    h1: "Solicite una cotización para su proyecto B2B",
    blocks: [
      quick("respuesta-rapida", "Para recibir una cotización útil, envíe empresa, país, productos, pesos, cantidades, personalización y destino. PowerBaseFit utiliza estos datos para revisar modelos, MOQ, muestra, producción, embalaje y condición comercial sin cambiar el funcionamiento actual del formulario."),
      definition("definicion", "Solicitud de cotización B2B", "Es un documento o mensaje que permite al fabricante calcular una oferta sobre requisitos concretos. Debe identificar producto, cantidad, especificación, OEM, embalaje, destino y calendario; una pregunta genérica por “el mejor precio” no permite comparar propuestas equivalentes."),
      table("datos", "Información recomendada", ["Dato", "Ejemplo", "Por qué importa"], [
        ["Empresa y mercado", "Distribuidor en México", "Canal y sistema kg/lb"],
        ["Producto", "Mancuerna hexagonal de goma", "Identifica el modelo"],
        ["Cantidad", "Unidades por peso", "Calcula MOQ y producción"],
        ["OEM", "Logo y caja de marca", "Define muestra y método"],
        ["Destino", "Puerto o ciudad", "Permite proponer condición comercial"]
      ]),
      rich("respuesta", "Qué ocurre después del envío", "La solicitud llega al mismo canal comercial real del sitio: kloe@powerbasefit.com. El equipo puede pedir aclaraciones sobre modelo, peso, cantidad, logotipo, embalaje y destino antes de preparar la propuesta.", "WhatsApp: +86 18963018533. Estos datos se mantienen iguales en las versiones inglesa, portuguesa y española. No se ha creado un backend paralelo."),
      checklist("antes-enviar", "Antes de enviar", ["Lista por producto y peso", "Cantidad estimada", "Archivo de logotipo", "Embalaje", "País y destino", "Fecha objetivo", "Muestra o inspección"])
    ],
    faq: [["¿Qué información debo enviar?", "Productos, pesos, cantidades, personalización, destino y plazo."], ["¿Puedo pedir precio con transporte?", "Indique puerto o ciudad y la condición que desea evaluar."], ["¿Atienden distribuidores?", "Sí, además de importadores, marcas y proyectos de gimnasios."], ["¿El formulario cambia el sistema comercial?", "No. Utiliza el canal de contacto existente."], ["¿Puedo escribir por WhatsApp?", "Sí, al número real +86 18963018533."]],
    links: [["products-hub", "Ver productos"], ["dumbbells-category", "Mancuernas"], ["weight-plates-category", "Discos"], ["oem-private-label", "OEM"], ["factory", "Fábrica"]],
    author: editorial, reviewedBy: reviewer
  },
  {
    id: "oem-private-label", type: "oem", esPath: "/es/oem-marca-propia",
    title: "Equipos de gimnasio OEM y marca propia | PowerBaseFit",
    description: "Fabricación OEM de mancuernas, discos y equipos fitness con logo, color, kg/lb, embalaje, muestra, QC y exportación para marcas B2B.",
    h1: "Fabricación OEM de equipos fitness y marca propia",
    image: ["/assets/factory.png", "Fabricación OEM de equipos de gimnasio PowerBaseFit"],
    blocks: [
      quick("respuesta-rapida", "PowerBaseFit desarrolla programas OEM para distribuidores, importadores y marcas de equipos fitness. Según el producto, pueden evaluarse logotipo, colores, marcado en kg o lb y embalaje. El proceso pasa por producto base, viabilidad, archivos, muestra, aprobación, producción, QC y exportación."),
      definition("definicion", "OEM y marca propia", "OEM describe la fabricación de un producto para la marca del comprador dentro de una especificación aprobada. Marca propia describe la estrategia comercial. ODM puede implicar mayor participación del proveedor en el desarrollo, pero el alcance debe definirse para cada proyecto."),
      table("modelos", "Producto estándar, OEM y ODM", ["Modelo", "Qué cambia", "Riesgo y trabajo"], [
        ["Estándar", "Modelo, cantidad y destino", "Menor personalización"],
        ["OEM visual", "Logo, color, kg/lb y caja", "Requiere arte y muestra"],
        ["OEM técnico", "Material, dimensión o construcción", "Puede requerir herramienta y validación"],
        ["ODM", "Desarrollo más amplio", "Alcance definido por proyecto"]
      ]),
      rich("producto-base", "1. Seleccionar el producto base", "La marca debe partir de un modelo adecuado a su mercado. Compare aplicación, material, rango, mantenimiento y posicionamiento. Un logotipo no corrige una elección de producto incorrecta.", "Registre código, fotografía y especificación. Si existen variantes, identifique cada una. Esta base evita aprobar embalaje sobre un modelo distinto del que se producirá."),
      rich("identidad", "2. Definir logotipo, color y marcado", "Envíe archivo vectorial y referencias de color cuando estén disponibles. La superficie cambia entre productos y pesos; la legibilidad debe comprobarse en tamaños representativos.", "El arte aprobado debe mostrar posición, tamaño, color, kg/lb y texto. Controle versiones y responsables de aprobación."),
      rich("embalaje", "3. Diseñar el embalaje", "El embalaje protege y comunica la marca. Para productos pesados, resistencia, unidades por caja y manipulación tienen prioridad sobre el diseño gráfico. Etiquetas, códigos y datos impresos deben corresponder al producto real.", "Afirmaciones regulatorias o técnicas solo deben utilizarse con evidencia aplicable. La fábrica revisa viabilidad, pero el propietario de la marca debe validar requisitos de su mercado."),
      table("flujo", "Flujo de aprobación OEM", ["Etapa", "Resultado"], [["Briefing", "Producto, mercado, cantidad y objetivo"], ["Viabilidad", "Método, MOQ, muestra, coste y plazo"], ["Arte", "Archivos y colores aprobados"], ["Muestra", "Referencia física o documental"], ["Producción", "Versión y cantidades liberadas"], ["QC", "Comprobaciones y resultado"], ["Embarque", "Volúmenes y documentos"]]),
      rich("moq", "4. MOQ y coste", "El MOQ depende de material, método, color, molde, embalaje y combinación. Un logo simple puede tener un mínimo distinto a una forma nueva. La cifra se confirma después de revisar la línea.", "Calcule muestra, embalaje, inspección, transporte y gastos de destino. Para validar mercado, a veces es más prudente comenzar con una personalización visual sobre un producto existente."),
      rich("experiencia", "Experiencia de fábrica", "Los proyectos más claros llegan con una tabla por modelo y peso, archivos ordenados y mercado definido. Esto permite distinguir lo que utiliza procesos existentes de lo que requiere desarrollo.", "PowerBaseFit no promete que cualquier personalización sea posible. La viabilidad se confirma por producto y cantidad, reduciendo expectativas incorrectas."),
      checklist("briefing", "Briefing OEM", ["Empresa, marca y país", "Producto base", "Pesos y cantidades", "Logo y colores", "kg o lb", "Embalaje", "Muestra y QC", "Destino y plazo"])
    ],
    faq: [["¿Cuál es la diferencia entre OEM y ODM?", "OEM fabrica según producto y especificación aprobados; ODM puede incluir mayor desarrollo."], ["¿Puedo personalizar solo el logo?", "En muchos modelos sí, sujeto a método, cantidad y muestra."], ["¿Hay un MOQ único?", "No. Varía por producto y personalización."], ["¿Necesito una muestra?", "Es recomendable cuando cambian logo, color, acabado, construcción o embalaje."], ["¿PowerBaseFit puede inventar certificaciones para mi marca?", "No. Toda alegación debe ser real, aplicable y documentada."]],
    links: [["products-hub", "Elegir producto base"], ["dumbbells-category", "Mancuernas OEM"], ["weight-plates-category", "Discos personalizados"], ["moq-guide", "Entender el MOQ"], ["oem-vs-odm-guide", "Comparar OEM y ODM"], ["private-label-guide", "Crear marca propia"], ["contact", "Enviar briefing"]],
    author: editorial, reviewedBy: reviewer
  },
  {
    id: "blog-index", type: "blog_index", esPath: "/es/blog",
    title: "Guías para importar y comprar equipos de gimnasio | PowerBaseFit",
    description: "Guías en español sobre importación, fabricantes, MOQ, OEM, marca propia, mancuernas, materiales y planificación de gimnasios para compradores B2B.",
    h1: "Guías para compradores de equipos de gimnasio",
    image: ["/assets/factory-process/dumbbell-cutting.jpg", "Proceso de fábrica para guías de compra de equipos fitness"],
    blocks: [
      quick("respuesta-rapida", "Esta biblioteca reúne diez guías de alta intención comercial para distribuidores, importadores, marcas y responsables de gimnasios. Los contenidos explican cómo preparar una compra, evaluar una fábrica, comparar productos y convertir requisitos en una solicitud de oferta."),
      definition("definicion", "Guía de compra B2B", "Es un contenido que ayuda a tomar una decisión profesional mediante definiciones, criterios, tablas, checklist, preguntas y próximos pasos. No sustituye asesoramiento aduanero, legal, de seguridad o diseño técnico."),
      table("temas", "Temas publicados", ["Tema", "Pregunta que responde"], [
        ["Importación", "¿Cómo organizar proveedor, coste y documentos?"],
        ["MOQ, OEM y ODM", "¿Cómo afectan mínimos y desarrollo?"],
        ["Marca propia", "¿Qué debe aprobar una marca?"],
        ["Fabricante", "¿Cómo verificar capacidad y control?"],
        ["Mancuernas y materiales", "¿Qué forma y material convienen?"],
        ["Proyecto de gimnasio", "¿Qué comprar y cómo distribuir la zona?"]
      ]),
      rich("metodo", "Cómo utilizar las guías", "Comience por la pregunta de su proyecto y anote requisitos, supuestos y datos que necesitan confirmación. Use las tablas para comparar propuestas sobre la misma base y los checklist para preparar la RFQ.", "Los datos de fábrica se limitan a información real de PowerBaseFit. Costes, normas y procedimientos de importación deben verificarse para la fecha y el país de destino."),
      checklist("uso", "Ruta recomendada", ["Definir mercado y comprador", "Elegir productos", "Preparar cantidades", "Revisar fábrica y OEM", "Calcular coste total", "Acordar muestra y QC", "Enviar RFQ"])
    ],
    faq: [["¿Las guías son para consumidores?", "El foco es B2B."], ["¿Sustituyen una cotización?", "No. Preparan requisitos para solicitarla."], ["¿Puedo usar los checklist?", "Sí, adaptándolos al producto y mercado."], ["¿Las cifras de importación son definitivas?", "No; deben confirmarse para la operación real."], ["¿Cómo contacto a la fábrica?", "Desde la página de contacto o WhatsApp."]],
    links: [["import-guide", "Importar desde China"], ["import-cost-guide", "Calcular coste"], ["moq-guide", "Entender MOQ"], ["oem-vs-odm-guide", "OEM frente a ODM"], ["private-label-guide", "Crear marca propia"], ["factory-guide", "Elegir fabricante"], ["hex-vs-round-guide", "Hexagonal frente a redonda"], ["materials-guide", "Goma frente a PU y TPU"], ["professional-gym-list-guide", "Lista para gimnasio"], ["free-weight-area-guide", "Planificar peso libre"]],
    author: editorial, reviewedBy: reviewer
  },
  {
    id: "projects", type: "projects", esPath: "/es/proyectos",
    title: "Referencias reales de zonas de musculación | PowerBaseFit",
    description: "Referencias visuales reales ya publicadas con mancuernas, discos, barras y racks para apoyar la especificación de proyectos B2B sin inventar casos.",
    h1: "Referencias de configuración para proyectos de gimnasio",
    image: ["/assets/case-gym.png", "Referencia de gimnasio con equipos de musculación PowerBaseFit"],
    blocks: [
      quick("respuesta-rapida", "Esta página presenta únicamente referencias visuales ya publicadas por PowerBaseFit. Sirven para discutir combinación de productos, almacenamiento, circulación e identidad visual; no se presentan como testimonios, resultados financieros, proyectos arquitectónicos certificados ni clientes identificados."),
      definition("definicion", "Referencia de proyecto", "Es un ejemplo visual utilizado para orientar preguntas de compra. No sustituye planos, cálculo estructural, accesibilidad, seguridad, instalación o validación de profesionales responsables en el país del proyecto."),
      table("referencias", "Referencias disponibles", ["Referencia", "Qué muestra", "Qué debe definir el comprador"], [
        ["Zona de mancuernas redondas", "Línea continua en rack", "Pares, rango, rack y circulación"],
        ["Proyecto con mancuernas hexagonales", "Formato estable y visual uniforme", "Material, suelo y capacidad"],
        ["Zona de discos y barras", "Almacenamiento próximo a estaciones", "Estándar, mix, soportes y uso"]
      ]),
      rich("interpretacion", "Cómo interpretar las imágenes", "Una imagen no revela por sí sola dimensiones, carga, flujo de usuarios o especificación. Debe convertirse en un briefing con superficie, usuarios, rango de pesos, entrenamiento, productos y prioridades.", "Las fotos y planos del espacio ayudan cuando incluyen medidas verificadas. El diseño técnico y la seguridad permanecen bajo responsabilidad de profesionales del proyecto."),
      rich("seleccion", "Mancuernas, discos y almacenamiento", "La zona de mancuernas debe relacionar pesos, duplicación, rack y ergonomía. El formato redondo funciona en soportes adecuados; el hexagonal reduce rodamiento cuando se coloca en el suelo.", "Los discos deben almacenarse cerca de barras y máquinas sin bloquear el paso. Bumper y discos convencionales responden a usos distintos. La selección necesita barras, suelo y reglas operativas compatibles."),
      rich("alcance", "Alcance de PowerBaseFit", "PowerBaseFit puede apoyar selección comercial, opciones OEM, embalaje y exportación de productos disponibles. No realiza ni certifica el diseño arquitectónico, estructural o de seguridad del lugar.", "Para cotizar, envíe planta, medidas, perfil de usuarios, lista inicial, identidad visual, destino y calendario."),
      checklist("briefing", "Briefing del proyecto", ["Plano y medidas", "Usuarios y horas punta", "Lista de equipos", "Rango y cantidades", "Suelo y circulación", "Logo y colores", "Destino y montaje"])
    ],
    faq: [["¿Son casos de clientes identificados?", "No. Son referencias visuales reales ya publicadas, sin atribuciones inventadas."], ["¿PowerBaseFit diseña el edificio?", "No. El proyecto técnico corresponde a profesionales locales."], ["¿Puedo usar mi marca?", "Puede evaluarse según los modelos."], ["¿Qué debo enviar?", "Medidas, usuarios, productos, cantidades, identidad y destino."], ["¿Las imágenes garantizan el mismo resultado?", "No. Cada espacio y especificación deben validarse."]],
    links: [["dumbbells-category", "Mancuernas para proyectos"], ["weight-plates-category", "Discos para proyectos"], ["professional-gym-list-guide", "Lista de equipos"], ["free-weight-area-guide", "Planificar peso libre"], ["contact", "Enviar proyecto"]],
    author: editorial, reviewedBy: reviewer
  }
];
