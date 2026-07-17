import type { SpanishPage } from "./es-types";
import { spanishBlog } from "./spanish-blog-builder";

export const spanishBlogsB: SpanishPage[] = [
  spanishBlog({
    id: "factory-guide",
    esPath: "/es/blog/como-elegir-fabricante-equipos-fitness",
    title: "Cómo elegir un fabricante de equipos fitness en China",
    description: "Guía B2B para evaluar un fabricante de equipos fitness: fábrica, proceso, muestra, capacidad, OEM, control de calidad, embalaje y exportación.",
    h1: "Cómo elegir un fabricante de equipos fitness",
    keyword: "fabricante de equipos fitness",
    definitionTerm: "Fabricante de equipos fitness",
    definitionText: "Es una empresa que ejecuta procesos de producción o montaje relacionados con los productos cotizados y puede documentar especificación, control, embalaje y suministro. Debe evaluarse por evidencia vinculada al pedido real.",
    quickAnswer: "Para elegir un fabricante de equipos fitness, verifique empresa, ubicación, procesos relacionados con el producto, muestra, capacidad, control de calidad, OEM, embalaje y experiencia de exportación. Compare respuestas y documentos, no solo precio, catálogo o fotografías promocionales.",
    image: ["/assets/factory-process/dumbbell-cutting.jpg", "Proceso real para evaluar un fabricante de equipos fitness"],
    comparisonTitle: "Evidencias para evaluar una fábrica",
    comparisonColumns: ["Área", "Evidencia útil", "Señal de riesgo"],
    comparisonRows: [
      ["Identidad", "Registro, dirección y contacto coherentes", "Datos contradictorios"],
      ["Producto", "Código, ficha, muestra y proceso", "Descripción genérica"],
      ["Capacidad", "Calendario y límites explicados", "Promesas sin condiciones"],
      ["OEM", "Método, archivos, MOQ y muestra", "Todo parece posible"],
      ["QC", "Criterios y registros", "Solo “alta calidad”"],
      ["Embalaje", "Caja, palé, peso y fotos", "Sin cálculo de carga"]
    ],
    sections: [
      { id: "identidad", heading: "1. Confirmar identidad y alcance", paragraphs: [
        "Solicite nombre legal, dirección y equipo responsable. Compruebe que la comunicación comercial, factura y datos de pago sean coherentes. Una empresa puede coordinar categorías externas; pregunte qué procesos realiza para el producto cotizado.",
        "Un catálogo grande no demuestra capacidad interna. Relacione cada afirmación con mancuernas, discos, racks u otro modelo real."
      ]},
      { id: "muestra", heading: "2. Revisar muestra y especificación", paragraphs: [
        "La muestra debe tener código y ficha. Compruebe peso, dimensiones, materiales, superficie, unión, marcado y embalaje. Registre fotografías y resultados.",
        "Pregunte cómo se trasladará la muestra al lote y qué tolerancias se usarán. Una aprobación visual sin medidas deja espacio para interpretaciones."
      ]},
      { id: "capacidad", heading: "3. Evaluar capacidad y calendario", paragraphs: [
        "La capacidad relevante es la del proceso y periodo del pedido. Pregunte por materiales, herramientas, programación y puntos que pueden limitar el plazo.",
        "Desconfíe de fechas universales sin revisar cantidad u OEM. Un fabricante responsable explica condiciones y cambios."
      ]},
      { id: "comunicacion", heading: "4. Valorar control y comunicación", paragraphs: [
        "Observe si las respuestas técnicas son consistentes y si la empresa controla versiones. Pida un ejemplo de cómo registra inspección y no conformidades sin solicitar información confidencial de otros clientes.",
        "Antes del pago, consolide producto, cantidad, archivos, embalaje, condición comercial y responsables. La comunicación es parte del control."
      ]}
    ],
    checklistTitle: "Checklist para elegir fabricante",
    checklistItems: ["Identidad legal y dirección", "Proceso relacionado", "Ficha y muestra", "Capacidad y calendario", "MOQ", "OEM y archivos", "Plan de QC", "Embalaje y packing list", "Condición comercial", "Comunicación y responsables"],
    faq: [
      ["¿Cómo sé si es fabricante?", "Solicite evidencia de proceso vinculada al producto, además de identidad y muestra."],
      ["¿Una visita es obligatoria?", "No siempre; el nivel de verificación depende del riesgo."],
      ["¿Qué debo comprobar en la muestra?", "Peso, medidas, material, construcción, acabado, marcado y embalaje."],
      ["¿Precio bajo es una señal de riesgo?", "No por sí solo, pero debe explicarse por especificación y alcance equivalentes."],
      ["¿Puedo pedir inspección externa?", "Sí, si se acuerdan momento, criterios y acceso."]
    ],
    links: [["factory", "Conocer PowerBaseFit"], ["import-guide", "Proceso de importación"], ["oem-private-label", "Proceso OEM"], ["moq-guide", "Entender MOQ"], ["contact", "Enviar RFQ"]]
  }),
  spanishBlog({
    id: "hex-vs-round-guide",
    esPath: "/es/blog/mancuerna-hexagonal-vs-redonda",
    title: "Mancuerna hexagonal vs redonda: comparación profesional",
    description: "Compare mancuerna hexagonal vs redonda por estabilidad, ejercicios, rack, rango, usuarios, mantenimiento, OEM, embalaje y compra para gimnasio.",
    h1: "Mancuerna hexagonal o redonda: cuál elegir",
    keyword: "mancuerna hexagonal vs redonda",
    definitionTerm: "Forma de la cabeza de una mancuerna",
    definitionText: "Es la geometría exterior que influye en rodamiento, apoyo, almacenamiento, tamaño de la cabeza y presentación. No determina por sí sola material, resistencia o calidad de la unión.",
    quickAnswer: "Elija mancuerna hexagonal cuando priorice estabilidad en el suelo y ejercicios donde la pieza sirve de apoyo. Elija redonda cuando busca una gama continua en racks compatibles o un diseño concreto. Compare construcción, rango, empuñadura, rack y mantenimiento, no solo la forma.",
    image: ["/assets/hex-dumbbells.png", "Mancuernas hexagonales para comparar con mancuernas redondas"],
    comparisonTitle: "Mancuerna hexagonal frente a redonda",
    comparisonColumns: ["Criterio", "Hexagonal", "Redonda"],
    comparisonRows: [
      ["Rodamiento", "Menor por caras planas", "Requiere rack o apoyo estable"],
      ["Ejercicios de suelo", "Puede ofrecer apoyo más estable", "Depende del ejercicio y superficie"],
      ["Rack", "Necesita soporte compatible", "Común en líneas continuas"],
      ["Rango", "Amplio según modelo", "Puede alcanzar gamas muy pesadas"],
      ["Presentación", "Funcional y reconocible", "Continua y uniforme"],
      ["OEM", "Logo según cara y tamaño", "Logo según diámetro y peso"]
    ],
    sections: [
      { id: "uso", heading: "1. Comparar el uso real", paragraphs: [
        "En circuitos, entrenamiento funcional o ejercicios con apoyo, la cabeza hexagonal puede reducir movimiento. No elimina la necesidad de suelo adecuado ni uso controlado.",
        "La redonda funciona bien en musculación tradicional y gamas completas. Los pesos deben devolverse a un rack que impida rodamiento y facilite identificación."
      ]},
      { id: "rango", heading: "2. Rango, tamaño y ergonomía", paragraphs: [
        "Compare incrementos y pesos máximos. La cabeza crece con el peso y puede cambiar la experiencia de determinados ejercicios. Una gama larga ocupa rack y requiere planificación.",
        "La empuñadura y la unión son tan importantes como la forma. Revise diámetro, moleteado, longitud, alineación y consistencia entre pares."
      ]},
      { id: "espacio", heading: "3. Rack, suelo y circulación", paragraphs: [
        "Mida el rack y la capacidad por nivel. Una fotografía no indica cuánto espacio utiliza cada par. Pesos altos deben colocarse a una altura segura y con acceso suficiente.",
        "Considere tráfico y ejercicios fuera del rack. La hexagonal puede permanecer más estable en el suelo; la redonda debe gestionarse para que no se desplace."
      ]},
      { id: "compra", heading: "4. Decisión para gimnasio o distribución", paragraphs: [
        "Un gimnasio elige por usuarios, entrenamiento, mantenimiento y espacio. Un distribuidor añade posicionamiento, embalaje y reposición. Puede ofrecer ambas formas para segmentos diferentes.",
        "No mezcle construcciones y acabados sin una estrategia. Una línea coherente facilita comunicación, piezas de reposición y marca propia."
      ]}
    ],
    checklistTitle: "Checklist hexagonal vs redonda",
    checklistItems: ["Tipo de entrenamiento", "Uso en suelo", "Rango e incrementos", "Empuñadura", "Unión", "Rack y capacidad", "Circulación", "Material", "OEM", "Reposición"],
    faq: [
      ["¿La hexagonal es mejor?", "Es mejor para algunos usos de suelo; no es universal."],
      ["¿La redonda rueda?", "Sí si no está estable; debe almacenarse en rack adecuado."],
      ["¿Cuál admite más peso?", "Depende del modelo; algunas líneas redondas cubren rangos muy altos."],
      ["¿Puedo usar ambas?", "Sí, si existe una razón operativa o comercial clara."],
      ["¿Cuál es más barata?", "Compare material, construcción, peso y cantidad, no solo forma."]
    ],
    links: [["dumbbells-category", "Ver mancuernas"], ["rubber-hex-dumbbell", "Mancuerna hexagonal"], ["materials-guide", "Comparar materiales"], ["oem-private-label", "Marca propia"], ["contact", "Pedir cotización"]]
  }),
  spanishBlog({
    id: "materials-guide",
    esPath: "/es/blog/mancuernas-goma-vs-pu-vs-tpu",
    title: "Mancuernas de goma vs PU vs TPU: guía de materiales",
    description: "Compare mancuernas de goma, PU y TPU por superficie, olor, presentación, mantenimiento, rack, coste, OEM y uso profesional.",
    h1: "Mancuernas de goma, PU o TPU: cómo comparar",
    keyword: "mancuernas de goma vs PU vs TPU",
    definitionTerm: "Material de recubrimiento de una mancuerna",
    definitionText: "Es la capa exterior de la cabeza que influye en superficie, olor, color, contacto, mantenimiento y posicionamiento. La sigla del material no explica por sí sola formulación, dureza, espesor o construcción.",
    quickAnswer: "La goma suele ofrecer una opción comercial conocida; el PU se utiliza con frecuencia en gamas de presentación premium; el TPU es otra familia termoplástica con configuraciones propias. La mejor elección depende del producto real, formulación, uso, muestra, rack, mantenimiento, presupuesto y marca.",
    image: ["/assets/project-dumbbell-zone.png", "Mancuernas profesionales para comparar goma PU y TPU"],
    comparisonTitle: "Comparación orientativa de materiales",
    comparisonColumns: ["Criterio", "Goma", "PU", "TPU"],
    comparisonRows: [
      ["Posicionamiento", "Comercial amplio", "Frecuente en gama premium", "Varía por formulación"],
      ["Superficie", "Depende de compuesto y acabado", "Puede ser uniforme", "Depende de proceso"],
      ["Olor", "Debe evaluarse en muestra", "También depende de formulación", "También debe verificarse"],
      ["Color", "Negro y opciones según modelo", "Opciones según proyecto", "Opciones según proyecto"],
      ["Coste", "Generalmente competitivo", "Puede ser mayor", "Depende del modelo"],
      ["Decisión", "Ficha y muestra", "Ficha y muestra", "Ficha y muestra"]
    ],
    sections: [
      { id: "goma", heading: "1. Mancuernas de goma", paragraphs: [
        "La goma es común en cabezas hexagonales y redondas. Puede ofrecer una superficie reconocida y protección frente al contacto directo del núcleo. Formulación, olor, dureza y acabado varían.",
        "Revise marcas del rack, limpieza, uniformidad y unión. No asuma que dos productos negros utilizan el mismo compuesto."
      ]},
      { id: "pu", heading: "2. Mancuernas de PU", paragraphs: [
        "El poliuretano se selecciona a menudo para líneas donde presentación, color y superficie tienen prioridad. Esto no crea automáticamente mayor durabilidad; la construcción y formulación siguen siendo decisivas.",
        "Compare muestras de pesos distintos, porque tamaño y proceso pueden cambiar. Valide logo, color y contacto con el rack."
      ]},
      { id: "tpu", heading: "3. Mancuernas de TPU", paragraphs: [
        "TPU describe un poliuretano termoplástico, pero existen formulaciones y métodos diversos. Solicite información específica del modelo y no utilice la sigla como único argumento comercial.",
        "Evalúe superficie, dureza, olor, color, unión y mantenimiento bajo condiciones reales. Compare coste y disponibilidad para reposición."
      ]},
      { id: "comparar", heading: "4. Cómo realizar una comparación válida", paragraphs: [
        "Utilice el mismo peso, forma y construcción cuando sea posible. Compare muestra, ficha, precio, MOQ, personalización, embalaje y calendario. Registre diferencias observables.",
        "Incluya el rack y los productos de limpieza en la prueba. Una superficie puede comportarse bien en mano y marcarse con un soporte incompatible."
      ]}
    ],
    checklistTitle: "Checklist para comparar goma, PU y TPU",
    checklistItems: ["Formulación o ficha disponible", "Forma y construcción", "Peso de muestra", "Olor", "Textura y dureza", "Color", "Contacto con rack", "Limpieza", "Logo", "MOQ, coste y reposición"],
    faq: [
      ["¿PU siempre dura más que goma?", "No se puede afirmar sin comparar formulación, construcción y uso."],
      ["¿TPU es plástico?", "Es una familia de poliuretano termoplástico; el desempeño depende del producto."],
      ["¿Cómo comparar olor?", "Con muestras acondicionadas y el mismo entorno."],
      ["¿Qué material acepta mejor color?", "Depende del proceso y modelo; valide muestra."],
      ["¿Cuál elegir para una marca premium?", "El que cumpla posicionamiento, uso, QC, coste y reposición reales."]
    ],
    links: [["dumbbells-category", "Ver mancuernas"], ["rubber-hex-dumbbell", "Mancuerna de goma"], ["hex-vs-round-guide", "Comparar formas"], ["oem-private-label", "Personalización"], ["contact", "Solicitar muestras"]]
  }),
  spanishBlog({
    id: "professional-gym-list-guide",
    esPath: "/es/blog/lista-equipos-gimnasio-profesional",
    title: "Lista de equipos para un gimnasio profesional",
    description: "Lista y método para planificar equipos de gimnasio profesional: zonas, usuarios, mancuernas, discos, racks, bancos, almacenamiento, presupuesto y compra.",
    h1: "Lista de equipos para un gimnasio profesional",
    keyword: "lista de equipos para gimnasio profesional",
    definitionTerm: "Lista de equipos de gimnasio",
    definitionText: "Es una matriz que relaciona zonas, ejercicios, usuarios, cantidades, dimensiones, presupuesto y prioridades. Una lista profesional no es un inventario genérico; debe ajustarse al espacio y modelo de negocio.",
    quickAnswer: "Una lista de gimnasio profesional debe partir de público, superficie, capacidad y propuesta. Organice cardio, fuerza guiada, peso libre, funcional, movilidad y almacenamiento; después asigne productos, cantidades, circulación, presupuesto, instalación y reposición.",
    image: ["/assets/case-gym.png", "Equipos para planificar un gimnasio profesional"],
    comparisonTitle: "Zonas y decisiones principales",
    comparisonColumns: ["Zona", "Equipos posibles", "Decisión"],
    comparisonRows: [
      ["Peso libre", "Mancuernas, discos, barras, bancos y racks", "Rango, pares y almacenamiento"],
      ["Fuerza", "Máquinas selectorizadas o plate-loaded", "Usuarios, estaciones y cargas"],
      ["Funcional", "Kettlebells, balones, bandas y rigs", "Programa, suelo y seguridad"],
      ["Cardio", "Cintas, bicicletas y elípticas", "Capacidad, energía y mantenimiento"],
      ["Movilidad", "Colchonetas y accesorios", "Espacio y limpieza"],
      ["Apoyo", "Almacenamiento y circulación", "Orden, acceso y evacuación"]
    ],
    sections: [
      { id: "usuarios", heading: "1. Definir público y capacidad", paragraphs: [
        "Identifique miembros, horas punta, nivel y actividades. Un hotel, estudio, gimnasio de barrio y club de alto rendimiento necesitan listas diferentes.",
        "Estime cuántas personas usarán cada zona simultáneamente. Esto orienta estaciones, duplicación de pesos y circulación."
      ]},
      { id: "zonas", heading: "2. Dividir el espacio por zonas", paragraphs: [
        "Trabaje con plano y medidas verificadas. Reserve circulación, accesibilidad, seguridad, mantenimiento y almacenamiento antes de llenar el área con equipos.",
        "El diseño arquitectónico y técnico debe ser validado por profesionales locales. El proveedor puede apoyar selección comercial y dimensiones de producto."
      ]},
      { id: "peso-libre", heading: "3. Construir la zona de peso libre", paragraphs: [
        "Defina mancuernas por forma, material, rango e incrementos. Duplique pesos populares cuando el número de usuarios lo justifique. Añada racks con capacidad y ergonomía adecuadas.",
        "Relacione discos con barras, bancos, racks, plataformas y máquinas. Separe bumper de discos convencionales según entrenamiento y suelo."
      ]},
      { id: "presupuesto", heading: "4. Priorizar presupuesto y fases", paragraphs: [
        "Clasifique elementos imprescindibles, segunda fase y opcionales. Proteja presupuesto para suelo, almacenamiento, transporte, instalación y mantenimiento.",
        "Una compra por fases puede reducir riesgo si las instalaciones y la reposición están previstas. Evite productos sin función clara solo por completar el catálogo."
      ]}
    ],
    checklistTitle: "Checklist de la lista profesional",
    checklistItems: ["Modelo de gimnasio", "Público y horas punta", "Plano y medidas", "Zonas", "Equipos por zona", "Cantidades y duplicación", "Suelo y almacenamiento", "Seguridad y accesibilidad", "Presupuesto total", "Instalación, mantenimiento y reposición"],
    faq: [
      ["¿Existe una lista universal?", "No. Depende de público, espacio, propuesta y presupuesto."],
      ["¿Cuántas mancuernas necesito?", "Calcule rango, usuarios, pesos populares y rack."],
      ["¿Debo comprar todo de una vez?", "Puede trabajar por fases con una estrategia clara."],
      ["¿El proveedor diseña el gimnasio?", "Puede apoyar selección comercial; el diseño técnico corresponde a profesionales."],
      ["¿Qué se olvida con frecuencia?", "Almacenamiento, circulación, suelo, descarga, mantenimiento y reposición."]
    ],
    links: [["products-hub", "Ver productos"], ["dumbbells-category", "Mancuernas"], ["weight-plates-category", "Discos"], ["free-weight-area-guide", "Planificar peso libre"], ["projects", "Ver referencias"], ["contact", "Enviar una lista"]]
  }),
  spanishBlog({
    id: "free-weight-area-guide",
    esPath: "/es/blog/planificar-zona-peso-libre",
    title: "Cómo planificar una zona de peso libre profesional",
    description: "Guía para planificar una zona de peso libre: usuarios, mancuernas, discos, barras, racks, bancos, suelo, circulación, almacenamiento y compra B2B.",
    h1: "Cómo planificar una zona de peso libre",
    keyword: "planificación de una zona de peso libre",
    definitionTerm: "Zona de peso libre",
    definitionText: "Es el área destinada a mancuernas, barras, discos, bancos y racks, donde el usuario controla la trayectoria. Requiere coordinación de equipos, suelo, almacenamiento, circulación y supervisión.",
    quickAnswer: "Para planificar una zona de peso libre, defina usuarios y ejercicios; mida el espacio; seleccione mancuernas, discos, barras, bancos y racks; calcule cantidades y almacenamiento; valide suelo, circulación, seguridad, presupuesto, entrega y reposición.",
    image: ["/assets/project-dumbbell-zone.png", "Zona profesional de peso libre con mancuernas y racks"],
    comparisonTitle: "Elementos de la zona de peso libre",
    comparisonColumns: ["Elemento", "Función", "Dato necesario"],
    comparisonRows: [
      ["Mancuernas", "Ejercicios unilaterales y accesorios", "Rango, pares y rack"],
      ["Discos", "Carga de barras y máquinas", "Estándar, pesos y almacenamiento"],
      ["Barras", "Levantamientos y estaciones", "Tipo, longitud y capacidad"],
      ["Bancos", "Posiciones y apoyo", "Cantidad, ajuste y espacio"],
      ["Racks", "Sentadillas, presses y almacenamiento", "Dimensiones, carga y anclaje"],
      ["Suelo", "Protección y uso", "Especificación profesional local"]
    ],
    sections: [
      { id: "demanda", heading: "1. Calcular demanda de usuarios", paragraphs: [
        "Observe horas punta y ejercicios. Pesos ligeros e intermedios pueden tener más uso simultáneo; los pesados requieren espacio y manipulación.",
        "Defina duplicación por demanda, no por simetría de catálogo. Reserve capacidad para crecimiento y reposición."
      ]},
      { id: "layout", heading: "2. Organizar distribución y circulación", paragraphs: [
        "Ubique racks, bancos y almacenamiento según movimientos y acceso. Evite que usuarios transporten discos a través de zonas congestionadas.",
        "Dimensiones y separaciones deben validarse por profesionales responsables. Considere accesibilidad, evacuación, supervisión y limpieza."
      ]},
      { id: "almacenamiento", heading: "3. Diseñar almacenamiento", paragraphs: [
        "El rack de mancuernas debe soportar la gama y facilitar lectura. Pesos altos requieren altura adecuada. El formato redondo necesita estabilidad; el hexagonal también debe devolverse al soporte.",
        "Los discos deben estar cerca de estaciones compatibles. Organice por peso y evite sobrecarga o piezas en el suelo."
      ]},
      { id: "compra", heading: "4. Convertir el plano en una compra", paragraphs: [
        "Cree una tabla por producto, cantidad, dimensión, peso y ubicación. Incluya logo, color, embalaje, entrega y montaje cuando corresponda.",
        "Revise peso total, acceso de descarga y almacenamiento temporal. La logística forma parte del proyecto, especialmente con equipos densos."
      ]}
    ],
    checklistTitle: "Checklist de la zona de peso libre",
    checklistItems: ["Usuarios y horas punta", "Ejercicios", "Plano y medidas", "Mancuernas y rango", "Discos y barras", "Racks y bancos", "Suelo", "Almacenamiento", "Circulación y seguridad", "Entrega, montaje y reposición"],
    faq: [
      ["¿Cuánto espacio necesita?", "Depende de equipos, usuarios, circulación y requisitos locales; no existe una cifra universal."],
      ["¿Hexagonales o redondas?", "Elija por ejercicios, rack, mantenimiento y presentación."],
      ["¿Necesito discos bumper?", "Solo si el programa, barras, plataforma y suelo corresponden a ese uso."],
      ["¿Quién valida el suelo?", "Profesionales responsables del proyecto y proveedores del sistema de suelo."],
      ["¿Cómo preparo la cotización?", "Envíe plano, lista, cantidades, dimensiones, OEM, destino y calendario."]
    ],
    links: [["professional-gym-list-guide", "Lista de equipos"], ["dumbbells-category", "Mancuernas"], ["weight-plates-category", "Discos"], ["projects", "Referencias"], ["contact", "Enviar proyecto"]]
  }),
  spanishBlog({
    id: "olympic-vs-standard-guide",
    esPath: "/es/blog/disco-olimpico-vs-estandar",
    title: "Disco olímpico vs estándar: guía para compradores B2B",
    description: "Compare discos olímpicos y estándar por diámetro, barra, uso, seguridad, almacenamiento, OEM, embalaje y compra profesional para gimnasios.",
    h1: "Disco olímpico o estándar: cómo elegir para un gimnasio",
    keyword: "disco olímpico vs estándar",
    definitionTerm: "Disco olímpico",
    definitionText: "Es un disco diseñado para barras con manga olímpica, normalmente asociado a un orificio central mayor que el de los discos estándar. La compatibilidad debe confirmarse con la barra real, el uso previsto y la ficha del producto.",
    quickAnswer: "Elija discos olímpicos cuando el gimnasio trabaja con barras olímpicas, racks comerciales y cargas habituales de peso libre. Los discos estándar pueden funcionar en entornos ligeros o equipos específicos, pero no deben mezclarse sin verificar diámetro, orificio, espesor, capacidad, almacenamiento y seguridad.",
    image: ["/assets/weight-plate.webp", "Discos olímpicos y estándar para compra profesional"],
    comparisonTitle: "Comparación rápida para compra B2B",
    comparisonColumns: ["Criterio", "Disco olímpico", "Disco estándar"],
    comparisonRows: [
      ["Compatibilidad", "Barras olímpicas y equipos comerciales", "Barras o equipos de diámetro menor"],
      ["Uso habitual", "Gimnasios, fuerza, racks y plataformas", "Home gym ligero o equipos concretos"],
      ["Carga", "Mejor para rangos comerciales amplios", "Limitado por barra y aplicación"],
      ["Almacenamiento", "Requiere soportes compatibles", "Debe coincidir con barra y rack"],
      ["OEM", "Logo, color y kg/lb según modelo", "Opciones sujetas a volumen y molde"],
      ["Riesgo", "No todos son bumper", "No mezclar con barras olímpicas sin adaptador"]
    ],
    sections: [
      { id: "compatibilidad", heading: "1. Empiece por la barra y el equipo", paragraphs: [
        "La diferencia más importante es la compatibilidad. Un disco olímpico debe ajustarse a barras olímpicas y estaciones comerciales diseñadas para ese estándar. Un disco estándar puede tener otro diámetro interior y no debe asumirse compatible con racks, soportes o máquinas de carga olímpica.",
        "Antes de pedir precio, confirme tipo de barra, diámetro de manga, longitud disponible, estaciones donde se usará y sistema de almacenamiento. Una foto del disco no basta para validar el conjunto."
      ]},
      { id: "aplicacion", heading: "2. Relacione el disco con el uso real", paragraphs: [
        "En gimnasios comerciales, los discos olímpicos suelen ser más prácticos porque la mayoría de barras, racks y máquinas plate-loaded se diseñan para ese estándar. Esto no significa que todo disco olímpico sea bumper ni que pueda caer al suelo sin plataforma.",
        "Los discos estándar pueden ser útiles en equipos ligeros, espacios residenciales o líneas específicas. Para un comprador B2B, la pregunta clave es si el mercado objetivo usa barras estándar u olímpicas."
      ]},
      { id: "especificacion", heading: "3. Revise medidas, espesor y marcado", paragraphs: [
        "Solicite diámetro interior, diámetro exterior, espesor por peso, tolerancia y material. El espesor afecta cuánta carga cabe en la barra; el diámetro exterior influye en almacenamiento y manipulación.",
        "La marca de kg o lb debe ser legible y coherente con el mercado. Si se agrega logo, valide contraste, posición y durabilidad en muestras de varios pesos."
      ]},
      { id: "compra", heading: "4. Planifique OEM, embalaje y reposición", paragraphs: [
        "Para marca propia, confirme método de logo, color, molde, MOQ y muestra. El mismo diseño puede comportarse distinto en discos pequeños y grandes.",
        "Los discos concentran peso, por lo que embalaje, cajas, pallets y descarga forman parte de la compra. Mantenga códigos y fichas para reposición futura; mezclar lotes sin control puede crear diferencias de apariencia o ajuste."
      ]},
      { id: "control-calidad", heading: "5. Valide muestras antes de cerrar el lote", paragraphs: [
        "En una compra B2B no conviene aprobar el pedido solo por una foto del molde. Pida una muestra real o un informe de preproducción con peso medido, diámetro interior, espesor, acabado, color, olor de la goma si aplica y calidad del marcado. La tolerancia de peso debe revisarse por varios discos, no solo por una unidad.",
        "También revise cómo entra el disco en la barra que usará su cliente. Debe deslizarse sin atascarse, pero sin una holgura excesiva que genere ruido o sensación de baja calidad. Para cadenas de gimnasios, distribuidores y proyectos de marca privada, esta prueba evita reclamaciones después de recibir el contenedor."
      ]},
      { id: "cotizacion", heading: "6. Prepare una cotización comparable", paragraphs: [
        "Para comparar proveedores, use la misma lista de pesos, cantidades, acabado, embalaje, Incoterm, puerto de destino y requisitos de logo. Si un proveedor cotiza discos olímpicos recubiertos y otro discos estándar pintados, el precio no representa la misma especificación.",
        "Incluya si el mercado venderá en kg, lb o ambas unidades. También indique si los discos se entregarán en pares, juegos completos, cajas individuales o pallets mixtos. Con esa información, la fábrica puede calcular mejor molde, embalaje, peso bruto, volumen y tiempo de producción.",
        "Para distribuidores, añada una regla de reposición: mantenga la misma serie, color, tolerancia y marcado durante varios pedidos. Si el primer lote se vende bien, el segundo debe integrarse visualmente con el inventario anterior. Esta consistencia facilita garantías, reemplazos parciales y ventas por ampliación de gimnasio. Guarde fotos, pesos medidos y códigos de caja como referencia para futuras órdenes comerciales."
      ]}
    ],
    checklistTitle: "Checklist antes de cotizar",
    checklistItems: ["Tipo de barra", "Diámetro interior", "Diámetro exterior", "Espesor por peso", "Material", "Uso previsto", "Sistema de almacenamiento", "Kg o lb", "Logo y color", "Embalaje y pallets"],
    faq: [
      ["¿Un disco olímpico es igual a un bumper?", "No. Olímpico describe compatibilidad con la barra; bumper describe construcción y uso con contacto controlado en plataforma."],
      ["¿Puedo mezclar discos estándar y olímpicos?", "No es recomendable sin validar barra, adaptadores, seguridad y almacenamiento. En compras comerciales conviene mantener un estándar claro."],
      ["¿Qué estándar conviene para un gimnasio comercial?", "Normalmente olímpico, porque es el más usado en barras, racks y equipos plate-loaded comerciales."],
      ["¿Los discos pueden llevar mi marca?", "Sí, según modelo, cantidad y método de personalización. Debe aprobarse una muestra."],
      ["¿Qué dato evita errores de compra?", "El diámetro interior y la barra compatible. Sin esa confirmación, la cotización puede referirse a otro estándar."]
    ],
    links: [["weight-plates-category", "Ver discos profesionales"], ["plates-guide", "Comparar discos y bumper"], ["rubber-olympic-plate", "Disco olímpico recubierto"], ["oem-private-label", "Marca propia"], ["contact", "Solicitar cotización"]]
  })
];
