import type { SpanishPage } from "./es-types";
import { spanishBlog } from "./spanish-blog-builder";

export const spanishBlogsA: SpanishPage[] = [
  spanishBlog({
    id: "import-guide",
    esPath: "/es/blog/importar-equipos-gimnasio-desde-china",
    title: "Cómo importar equipos de gimnasio desde China: guía B2B",
    description: "Guía para importar equipos de gimnasio desde China: proveedor, especificación, MOQ, muestra, QC, embalaje, transporte y coste total para compradores B2B.",
    h1: "Cómo importar equipos de gimnasio desde China",
    keyword: "importar equipos de gimnasio desde China",
    definitionTerm: "Importación B2B de equipos de gimnasio",
    definitionText: "Es una operación comercial en la que una empresa compra productos a un fabricante extranjero y coordina especificación, pago, producción, control, transporte, despacho y recepción. No termina al obtener un precio de fábrica.",
    quickAnswer: "Para importar equipos de gimnasio desde China, primero defina productos, cantidades, personalización y destino; después verifique fabricante, muestra, especificación, QC, embalaje y condición comercial. Calcule el coste total con un agente o profesional de importación del país de destino antes de confirmar el pedido.",
    image: ["/assets/factory-process/dumbbell-cutting.jpg", "Proceso de fabricación para importar equipos de gimnasio desde China"],
    comparisonTitle: "Etapas y responsables de una importación",
    comparisonColumns: ["Etapa", "Decisión", "Responsable principal"],
    comparisonRows: [
      ["Definición", "Productos, pesos, cantidades y mercado", "Comprador"],
      ["Proveedor", "Capacidad, muestra y comunicación", "Comprador y fábrica"],
      ["Oferta", "Especificación, Incoterm y calendario", "Ambas partes"],
      ["Producción", "Versión, QC y embalaje", "Fábrica con aprobación del comprador"],
      ["Transporte", "Puerto, seguro y documentos", "Comprador, transitario y proveedor"],
      ["Destino", "Despacho, impuestos y entrega", "Importador y profesionales locales"]
    ],
    sections: [
      { id: "preparacion", heading: "1. Preparar la lista antes de buscar proveedor", paragraphs: [
        "Empiece por el modelo de negocio. Un distribuidor necesita gama, niveles de precio y reposición; un gimnasio necesita relacionar equipos con espacio y usuarios; una marca propia añade identidad, embalaje y consistencia. Escriba una lista por categoría, modelo, peso y cantidad.",
        "Incluya fotografías de referencia solo como apoyo. La descripción debe indicar material, construcción, medidas relevantes, kg o lb y uso. Si solicita simplemente “mancuernas de buena calidad”, cada proveedor puede cotizar una versión distinta."
      ]},
      { id: "proveedor", heading: "2. Verificar fabricante y producto", paragraphs: [
        "Solicite dirección, datos de empresa, fotografías actuales, proceso relacionado con el producto y una muestra cuando el riesgo lo justifique. No confunda un catálogo amplio con fabricación directa de todas las categorías. Pregunte qué procesos son internos y cuáles se coordinan externamente.",
        "Compare la muestra con una ficha: peso, dimensiones, superficie, empuñadura, unión, logotipo y embalaje. Registre la versión aprobada. Una videollamada o inspección independiente puede aportar evidencia adicional según el valor del pedido."
      ]},
      { id: "oferta", heading: "3. Comparar ofertas equivalentes", paragraphs: [
        "Compruebe moneda, validez, cantidad mínima, muestra, herramienta, embalaje, plazo y condición comercial. EXW, FOB, CIF u otra condición distribuyen costes y responsabilidades de forma diferente; el término debe incluir lugar o puerto concreto.",
        "No use un precio unitario aislado. Compare construcción, tolerancias, unidades por caja, peso bruto, volumen y servicio de reposición. Una diferencia pequeña puede desaparecer cuando se calcula carga y coste en destino."
      ]},
      { id: "produccion", heading: "4. Controlar producción, embarque y recepción", paragraphs: [
        "Antes del depósito final, reúna orden, especificación, arte, muestra, cantidades y embalaje. Defina cuándo se realizará el control y qué ocurre con una no conformidad. Para productos pesados, revise resistencia de cajas, palés, etiquetas y secuencia de carga.",
        "Prepare documentos y despacho con antelación. En la recepción, registre daños, faltantes y resultados de muestreo antes de distribuir. Conserve fotos, informes y versiones para el siguiente pedido."
      ]}
    ],
    checklistTitle: "Checklist para importar desde China",
    checklistItems: ["Empresa y país importador", "Lista por modelo y peso", "Proveedor verificado", "Muestra y ficha", "MOQ y condición comercial", "Plan de QC", "Cajas, palés y carga", "Transitario y documentos", "Coste total y contingencia", "Recepción y reposición"],
    faq: [
      ["¿Cuál es el primer paso para importar equipos de gimnasio?", "Definir productos, cantidades, especificación, mercado y destino antes de pedir precios."],
      ["¿Es obligatorio visitar la fábrica?", "No siempre, pero la verificación debe ser proporcional al riesgo; puede incluir vídeo, muestra o inspección."],
      ["¿Qué Incoterm conviene?", "Depende de experiencia, control logístico y oferta. Compare alcance y lugar concreto con su transitario."],
      ["¿Cómo reduzco el riesgo de calidad?", "Use especificación, muestra, criterios medibles, control de versión e inspección."],
      ["¿La fábrica calcula impuestos?", "El importador debe confirmarlos con profesionales del país de destino."]
    ],
    links: [["factory-guide", "Elegir fabricante"], ["import-cost-guide", "Calcular coste"], ["moq-guide", "Entender MOQ"], ["products-hub", "Ver productos"], ["contact", "Enviar una RFQ"]]
  }),
  spanishBlog({
    id: "import-cost-guide",
    esPath: "/es/blog/costo-importacion-equipos-gimnasio",
    title: "Costo de importar equipos de gimnasio: cálculo B2B",
    description: "Cómo calcular el costo de importación de equipos de gimnasio: precio, embalaje, flete, seguro, despacho, impuestos, almacenaje y coste por unidad.",
    h1: "Cómo calcular el costo de importación de equipos de gimnasio",
    keyword: "costo de importación de equipos de gimnasio",
    definitionTerm: "Coste total puesto en destino",
    definitionText: "Es la suma de producto, personalización, embalaje, transporte, seguro cuando corresponde, despacho, tributos, tasas, almacenaje y entrega hasta el punto definido. Debe dividirse de forma coherente entre las referencias.",
    quickAnswer: "El costo de importar equipos de gimnasio no es solo el precio de fábrica. Debe sumar producto, muestra, herramientas, embalaje, transporte interior, flete, seguro, despacho, impuestos, tasas, almacenaje y entrega. Calcule escenarios con datos actuales y una reserva para variaciones.",
    image: ["/assets/project-plate-zone.png", "Equipos de peso libre para calcular costos de importación"],
    comparisonTitle: "Componentes del coste total",
    comparisonColumns: ["Componente", "Dato necesario", "Riesgo habitual"],
    comparisonRows: [
      ["Producto", "Precio y condición comercial", "Comparar construcciones distintas"],
      ["OEM", "Logo, color, molde, muestra y caja", "Omitir costes de desarrollo"],
      ["Logística", "Peso, volumen, puerto y fecha", "Usar una tarifa caducada"],
      ["Destino", "Clasificación, valor y país", "Aplicar un porcentaje genérico"],
      ["Operación", "Almacén, descarga y entrega", "Ignorar productos pesados"],
      ["Finanzas", "Moneda, pago y contingencia", "No cubrir fluctuaciones"]
    ],
    sections: [
      { id: "base", heading: "1. Fijar una base de comparación", paragraphs: [
        "Utilice la misma lista, especificación, cantidad y condición comercial para cada oferta. Si una fábrica cotiza FOB y otra EXW, añada transporte interior, exportación y gastos correspondientes antes de comparar.",
        "Registre moneda, tipo de cambio usado y fecha. Las tarifas y el cambio pueden variar entre presupuesto, depósito y saldo. Un escenario conservador ayuda a proteger el margen."
      ]},
      { id: "densidad", heading: "2. Entender peso y volumen", paragraphs: [
        "Mancuernas y discos son densos: el límite de peso puede alcanzarse antes que el volumen. Racks y bancos ocupan más espacio. Un pedido mixto requiere distribuir carga y proteger superficies, no solo llenar huecos.",
        "Solicite packing list preliminar con unidades, cajas, peso neto, bruto y volumen. Use esa información para pedir tarifas al transitario. Un cálculo por unidad sin composición de carga puede ser engañoso."
      ]},
      { id: "destino", heading: "3. Añadir gastos de destino", paragraphs: [
        "Clasificación arancelaria, valor, origen y país afectan tributos y requisitos. No copie una tasa de internet sin validar la fecha y la operación. España, México, Colombia, Chile y Argentina tienen procedimientos diferentes.",
        "Incluya despacho, terminal, inspecciones cuando correspondan, almacenaje, demoras, descarga y transporte local. Los productos pesados pueden necesitar medios de manipulación específicos."
      ]},
      { id: "reparto", heading: "4. Distribuir el coste entre productos", paragraphs: [
        "Repartir todo por unidades distorsiona productos de tamaños y pesos diferentes. Puede asignar transporte por peso o volumen, y otros gastos por valor o línea, manteniendo un método documentado.",
        "Calcule coste por referencia, margen y precio de venta. Añada escenarios de flete, cambio o cantidad. La decisión correcta puede ser modificar el mix, no buscar una reducción mínima en fábrica."
      ]}
    ],
    checklistTitle: "Checklist del costo de importación",
    checklistItems: ["Lista y condición comercial", "Precio de producto y OEM", "Muestra y herramientas", "Packing list preliminar", "Transporte y seguro", "Despacho e impuestos", "Almacenaje y entrega", "Tipo de cambio", "Método de reparto", "Contingencia y margen"],
    faq: [
      ["¿Qué porcentaje añade la importación?", "No existe uno universal; depende de país, producto, valor, carga y fecha."],
      ["¿FOB incluye el flete marítimo?", "No. FOB normalmente llega hasta la entrega a bordo en el puerto acordado; confirme el alcance exacto."],
      ["¿Cómo reparto el flete?", "Use un método coherente por peso, volumen o combinación, según la naturaleza del coste."],
      ["¿Debo incluir muestras?", "Sí, si forman parte del desarrollo o validación comercial."],
      ["¿Quién confirma impuestos?", "El importador con su agente aduanero o profesional local."]
    ],
    links: [["import-guide", "Proceso de importación"], ["products-hub", "Ver productos"], ["moq-guide", "Impacto del MOQ"], ["contact", "Solicitar packing list y cotización"]]
  }),
  spanishBlog({
    id: "moq-guide",
    esPath: "/es/blog/moq-equipos-fitness",
    title: "MOQ de equipos fitness: cómo negociar cantidades mínimas",
    description: "Qué significa MOQ en equipos fitness, por qué cambia por producto, material, logo y embalaje, y cómo planificar un pedido mínimo rentable.",
    h1: "Cómo funciona el MOQ en equipos fitness",
    keyword: "MOQ de equipos fitness",
    definitionTerm: "MOQ (Minimum Order Quantity)",
    definitionText: "Es la cantidad mínima que un fabricante acepta producir o suministrar bajo una configuración determinada. Puede expresarse por modelo, peso, color, proceso, embalaje o valor total del pedido.",
    quickAnswer: "El MOQ de equipos fitness cambia según producto, material, herramienta, color, logotipo, embalaje y combinación del pedido. Para negociarlo, reduzca variantes, utilice modelos existentes, concentre cantidades y explique el plan de compra; no pida simplemente “el MOQ más bajo”.",
    image: ["/assets/hex-dumbbells.png", "Mancuernas por pesos para explicar el MOQ de equipos fitness"],
    comparisonTitle: "Qué eleva o reduce el MOQ",
    comparisonColumns: ["Factor", "MOQ menor cuando", "MOQ mayor cuando"],
    comparisonRows: [
      ["Producto", "Modelo estándar disponible", "Construcción especial"],
      ["Color", "Color habitual", "Color o lote exclusivo"],
      ["Logo", "Método existente", "Molde o herramienta nueva"],
      ["Embalaje", "Caja estándar", "Impresión y accesorios personalizados"],
      ["Gama", "Pocas variantes", "Muchos pesos con pocas unidades"],
      ["Material", "Materia prima programada", "Compra mínima específica"]
    ],
    sections: [
      { id: "por-que", heading: "1. Por qué existe el MOQ", paragraphs: [
        "Preparar material, color, molde, máquina, arte y embalaje genera costes que no dependen linealmente de las unidades. Un lote demasiado pequeño puede consumir el mismo ajuste que uno mayor.",
        "El MOQ también protege la eficiencia de compra de materia prima y producción. No significa que toda la fábrica tenga una cifra fija; cada proceso puede crear un mínimo diferente."
      ]},
      { id: "gama", heading: "2. MOQ en gamas de mancuernas y discos", paragraphs: [
        "Una línea incluye varios pesos. La pregunta no es solo cuántas unidades totales, sino cuántas por peso y qué combinación puede producirse. Muchos pesos con dos unidades cada uno pueden ser menos eficientes que una gama concentrada.",
        "Defina pesos prioritarios y repeticiones. Para un lanzamiento, puede ser preferible una gama más corta con stock suficiente y reposición planificada."
      ]},
      { id: "oem", heading: "3. Efecto del OEM", paragraphs: [
        "Un logotipo aplicado con un método existente puede tener menor barrera que una forma, color o molde exclusivo. El embalaje impreso también tiene mínimos del proveedor de cajas o etiquetas.",
        "Solicite que la propuesta separe producto, personalización, herramienta y embalaje. Así puede decidir qué elemento simplificar sin cambiar toda la estrategia."
      ]},
      { id: "negociacion", heading: "4. Cómo negociar de forma realista", paragraphs: [
        "Explique mercado, previsión y frecuencia de reposición. Pregunte por modelos disponibles, combinación de colores, pedidos mixtos o embalaje estándar. La negociación funciona mejor cuando reduce complejidad.",
        "No acepte una cantidad que inmovilice capital sin validar demanda. Compare el ahorro unitario con almacenamiento, riesgo de obsolescencia y capacidad de venta."
      ]}
    ],
    checklistTitle: "Checklist para revisar el MOQ",
    checklistItems: ["MOQ por modelo", "MOQ por peso o variante", "Materia prima y color", "Método de logotipo", "Molde o herramienta", "Embalaje estándar o impreso", "Cantidad total y mix", "Muestra", "Reposición", "Capital y almacenamiento"],
    faq: [
      ["¿MOQ significa cantidad mínima por pedido?", "Puede ser por pedido, modelo, variante o proceso; debe aclararse."],
      ["¿Se puede reducir?", "A veces, simplificando producto, color, logo, embalaje o gama."],
      ["¿Un pedido mixto ayuda?", "Puede ayudar si los procesos y materiales son compatibles; la fábrica debe confirmarlo."],
      ["¿El MOQ incluye la muestra?", "Normalmente la muestra se gestiona por separado."],
      ["¿MOQ bajo siempre es mejor?", "No si aumenta precio, variación, coste logístico o riesgo de reposición."]
    ],
    links: [["oem-private-label", "Programa OEM"], ["oem-vs-odm-guide", "OEM frente a ODM"], ["private-label-guide", "Crear marca propia"], ["products-hub", "Ver productos"], ["contact", "Consultar MOQ real"]]
  }),
  spanishBlog({
    id: "oem-vs-odm-guide",
    esPath: "/es/blog/oem-vs-odm-equipos-fitness",
    title: "OEM vs ODM en equipos fitness: diferencias para compradores",
    description: "Compare OEM y ODM en equipos fitness por desarrollo, propiedad de especificación, molde, MOQ, muestra, coste, plazo, control y marca propia.",
    h1: "OEM vs ODM en equipos fitness: qué modelo elegir",
    keyword: "OEM vs ODM en equipos fitness",
    definitionTerm: "OEM y ODM",
    definitionText: "OEM fabrica un producto para la marca del comprador dentro de una especificación acordada. ODM suele implicar que el proveedor aporta una solución o desarrollo más amplio. En la práctica, el contrato y los entregables importan más que la sigla.",
    quickAnswer: "Elija OEM cuando un producto existente con especificación y personalización cubre la necesidad. Considere ODM cuando necesita desarrollo más amplio y puede asumir tiempo, validación, herramientas y propiedad intelectual. Defina por escrito quién diseña, paga, aprueba y controla cada elemento.",
    image: ["/assets/factory.png", "Fábrica OEM y ODM de equipos fitness PowerBaseFit"],
    comparisonTitle: "Comparación OEM, ODM y producto estándar",
    comparisonColumns: ["Aspecto", "Estándar", "OEM", "ODM"],
    comparisonRows: [
      ["Producto base", "Catálogo", "Existente o especificado", "Desarrollo más amplio"],
      ["Marca", "Neutra o disponible", "Marca del comprador", "Marca del comprador"],
      ["Cambios", "Limitados", "Visuales o técnicos acordados", "Mayores según alcance"],
      ["Tiempo", "Menor", "Medio", "Mayor"],
      ["Inversión", "Menor", "Muestra/herramienta posible", "Desarrollo y validación"],
      ["Control", "Ficha existente", "Especificación aprobada", "Entregables y propiedad definidos"]
    ],
    sections: [
      { id: "oem", heading: "Cuándo utilizar OEM", paragraphs: [
        "OEM funciona bien cuando el mercado necesita una mancuerna, disco u otro producto ya probado como base, pero con logotipo, marcado, color o embalaje de la marca. También puede incluir ajustes técnicos delimitados.",
        "El comprador debe aprobar producto base, especificación, archivos, muestra y control. Si no define la referencia, el término OEM no evita interpretaciones."
      ]},
      { id: "odm", heading: "Cuándo considerar ODM", paragraphs: [
        "ODM puede ser útil cuando la empresa tiene un problema de mercado y necesita que el proveedor participe más en la solución. Esto requiere objetivos, restricciones, pruebas y un proceso de decisión más amplio.",
        "Defina propiedad de diseños, moldes, archivos, exclusividad, mantenimiento y cambios. No suponga que pagar una herramienta transfiere automáticamente todos los derechos."
      ]},
      { id: "riesgos", heading: "Riesgos contractuales y operativos", paragraphs: [
        "Una sigla puede ocultar expectativas distintas. Escriba alcance, entregables, responsables, criterios de aceptación, revisiones, costes y qué ocurre si el proyecto cambia o se cancela.",
        "En equipos pesados, una modificación afecta embalaje, carga y uso. Pruebe la construcción y no limite la aprobación a color o logotipo."
      ]},
      { id: "decision", heading: "Matriz de decisión", paragraphs: [
        "Si velocidad y riesgo bajo son prioritarios, empiece por estándar u OEM visual. Si la diferenciación técnica justifica inversión y existe capacidad de validación, estudie un OEM técnico u ODM.",
        "Valide primero demanda, canal y precio objetivo. Un desarrollo exclusivo no crea ventas por sí solo y puede elevar MOQ, inventario y reposición."
      ]}
    ],
    checklistTitle: "Checklist OEM vs ODM",
    checklistItems: ["Necesidad de mercado", "Producto base", "Cambios visuales o técnicos", "Diseño y propiedad", "Herramientas", "MOQ", "Muestra y pruebas", "QC", "Plazo y presupuesto", "Reposición y exclusividad"],
    faq: [
      ["¿Marca propia es OEM?", "La marca propia es la estrategia; OEM puede ser el modelo de fabricación."],
      ["¿ODM significa producto exclusivo?", "No necesariamente. La exclusividad debe acordarse."],
      ["¿Quién paga el molde?", "Depende del proyecto y contrato."],
      ["¿OEM siempre es más rápido?", "Suele serlo cuando parte de un modelo existente, pero depende de los cambios."],
      ["¿Qué conviene para empezar?", "Normalmente un producto validado con personalización proporcionada al mercado."]
    ],
    links: [["oem-private-label", "Proceso OEM"], ["private-label-guide", "Crear marca propia"], ["moq-guide", "Entender MOQ"], ["factory-guide", "Evaluar fabricante"], ["contact", "Enviar un briefing"]]
  }),
  spanishBlog({
    id: "private-label-guide",
    esPath: "/es/blog/crear-marca-propia-equipos-gimnasio",
    title: "Cómo crear una marca propia de equipos de gimnasio",
    description: "Guía para crear marca propia de equipos de gimnasio: mercado, gama, producto base, logotipo, kg/lb, embalaje, MOQ, muestra, QC e importación.",
    h1: "Cómo crear una marca propia de equipos de gimnasio",
    keyword: "marca propia de equipos de gimnasio",
    definitionTerm: "Marca propia fitness",
    definitionText: "Es una línea de productos comercializada bajo la identidad del comprador y fabricada por un proveedor conforme a especificaciones, archivos y controles aprobados. Requiere estrategia de gama, no solo colocar un logotipo.",
    quickAnswer: "Para crear una marca propia de equipos de gimnasio, defina cliente, posicionamiento y gama; seleccione productos base; prepare nombre, logotipo, kg/lb y embalaje; confirme MOQ, muestra, QC, coste total, importación y reposición antes de producir.",
    image: ["/assets/hero-poster.avif", "Equipos de gimnasio para desarrollar una marca propia fitness"],
    comparisonTitle: "Decisiones de una línea de marca propia",
    comparisonColumns: ["Área", "Decisión", "Evidencia"],
    comparisonRows: [
      ["Mercado", "Comprador, uso y precio", "Briefing comercial"],
      ["Gama", "Productos y pesos", "Matriz de portafolio"],
      ["Producto", "Material y construcción", "Ficha y muestra"],
      ["Identidad", "Logo, color y kg/lb", "Arte aprobado"],
      ["Embalaje", "Protección e información", "Prototipo o plano"],
      ["Calidad", "Criterios e inspección", "Plan de QC"],
      ["Suministro", "MOQ, plazo y reposición", "Oferta y calendario"]
    ],
    sections: [
      { id: "mercado", heading: "1. Definir mercado y posicionamiento", paragraphs: [
        "Decida si venderá a gimnasios, consumidores, hoteles, estudios o distribuidores. El comprador determina material, rango, presentación, garantía comercial y precio objetivo.",
        "Analice competidores sin copiar afirmaciones. Identifique una propuesta verificable: gama, servicio, disponibilidad, diseño o especialización."
      ]},
      { id: "gama", heading: "2. Construir una gama coherente", paragraphs: [
        "Empiece con categorías que pueda explicar, almacenar y reponer. Una gama demasiado amplia dispersa MOQ y capital. Agrupe productos por nivel y compatibilidad.",
        "En mancuernas y discos, defina pesos populares y sistema kg/lb. Planifique racks, barras o accesorios cuando sean necesarios para usar el producto."
      ]},
      { id: "identidad", heading: "3. Aplicar la identidad al producto", paragraphs: [
        "Prepare archivos vectoriales, colores y reglas de uso. El logotipo debe adaptarse a superficies y tamaños sin perder legibilidad. Apruebe posiciones y versiones.",
        "La caja debe proteger primero. Añada códigos, peso, datos y textos reales. No imprima certificaciones o prestaciones sin documentación aplicable."
      ]},
      { id: "lanzamiento", heading: "4. Validar antes del lanzamiento", paragraphs: [
        "Revise muestra, fotografía, embalaje y criterios de control. Calcule coste puesto, margen, inventario y reposición. Pruebe el flujo de recepción y atención de incidencias.",
        "Un pedido inicial debe generar aprendizaje sin comprometer una cantidad imposible de vender. Documente feedback y cambios para el siguiente lote."
      ]}
    ],
    checklistTitle: "Checklist para una marca propia fitness",
    checklistItems: ["Cliente objetivo", "Posicionamiento", "Gama inicial", "Producto base y muestra", "Logo y colores", "kg o lb", "Embalaje y etiquetas", "MOQ y coste total", "QC", "Importación, stock y reposición"],
    faq: [
      ["¿Necesito diseñar un producto nuevo?", "No. Muchas marcas empiezan con productos existentes y personalización visual."],
      ["¿Puedo usar el mismo logo en todos los pesos?", "Sí, pero tamaño y proporción deben verificarse."],
      ["¿Quién diseña la caja?", "El alcance se acuerda; el comprador debe aprobar información y la fábrica validar viabilidad."],
      ["¿Cuántos productos debo lanzar?", "Los que pueda financiar, explicar, almacenar y reponer de forma coherente."],
      ["¿Cómo protejo la consistencia?", "Con fichas, archivos versionados, muestra, QC y plan de reposición."]
    ],
    links: [["oem-private-label", "Fabricación de marca propia"], ["oem-vs-odm-guide", "OEM frente a ODM"], ["moq-guide", "Planificar MOQ"], ["products-hub", "Elegir productos"], ["contact", "Enviar proyecto de marca"]]
  })
];
