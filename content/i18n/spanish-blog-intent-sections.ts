import type { ContentBlock } from "../../lib/content/types";
import { rich } from "./es-content-helpers";

type IntentSection = [id: string, heading: string, paragraphs: string[]];

const sections: Record<string, IntentSection[]> = {
  "import-guide": [
    ["mapa-operacion", "Mapa de la operación antes de comprar", [
      "Una importación empieza con un mapa de responsabilidades. El comprador define surtido, uso, cantidades y criterios de aceptación; la fábrica confirma viabilidad, producción y embalaje; el transitario organiza el transporte; y el agente aduanero valida clasificación y despacho. Escriba quién entrega cada dato y en qué fecha. Así se evita descubrir después del depósito que nadie confirmó el puerto, el seguro, la descarga o los documentos exigidos en destino.",
      "Prepare tres escenarios: pedido de prueba, pedido comercial y reposición. El primero valida producto y comunicación; el segundo debe justificar el coste total y el espacio de carga; el tercero comprueba si el proveedor puede mantener construcción, acabado, logo y embalaje. No todos los proyectos necesitan las tres etapas, pero separar sus objetivos evita evaluar una muestra como si demostrara por sí sola la estabilidad de suministros futuros."
    ]],
    ["expediente-proveedor", "Expediente de verificación del proveedor", [
      "Cree un expediente con identidad legal, dirección, cuenta bancaria confirmada por canal seguro, contacto responsable, productos cotizados y evidencias relacionadas con esos productos. Las fotografías generales de una nave no prueban capacidad para fabricar una mancuerna o anilla concreta. Pida que el proveedor explique qué procesos realiza, qué componentes compra, cómo identifica el lote y en qué punto revisa peso, superficie, montaje y embalaje.",
      "La muestra debe tener código, fecha y especificación. Registre medidas, peso, olor cuando sea relevante, color, unión, marcado y caja. Si la muestra se modifica, no conserve dos versiones con el mismo nombre. Una aprobación clara permite que una inspección posterior compare el lote con una referencia verificable, en lugar de depender de recuerdos, mensajes dispersos o imágenes sin escala."
    ]],
    ["documentos-carga", "Documentos, carga y coordinación logística", [
      "Solicite una packing list preliminar antes de reservar transporte. Debe indicar unidades, cajas, peso neto, peso bruto y volumen por referencia. En pesos libres, la limitación puede ser la masa máxima del contenedor antes que el volumen; en racks y bancos ocurre lo contrario. Un pedido mixto necesita una secuencia de carga que proteja superficies y permita distribuir el peso sin usar piezas delicadas como relleno.",
      "Confirme factura comercial, packing list, conocimiento de embarque y otros documentos aplicables con los profesionales de la operación. Los requisitos cambian por país, producto y fecha. Defina también quién revisa borradores y cómo se corrigen errores antes de la salida. Un nombre empresarial, dirección o cantidad incorrectos pueden generar demoras que no aparecen en la cotización del producto."
    ]],
    ["recepcion-importacion", "Recepción, incidencias y aprendizaje del primer lote", [
      "Planifique la recepción antes de que llegue la carga. Reserve personal, equipo de manipulación, zona de conteo y un método de muestreo. Fotografíe precintos, estado exterior, pallets y cajas dañadas antes de mover el contenido. Separe faltantes, daños de transporte y no conformidades de producto, porque cada problema requiere evidencia y responsables distintos.",
      "Después de la entrega, compare coste previsto con coste real, tiempos, daños, referencias de mayor rotación y calidad de la comunicación. Ese cierre convierte el primer pedido en información para la reposición. Actualice cantidades, embalaje, criterios de control y calendario; no repita automáticamente la misma orden si el mercado o la experiencia de recepción muestran otra necesidad."
    ]],
    ["rfq-importacion", "RFQ específica para una importación", [
      "La solicitud final debe incluir empresa, mercado, lista por SKU, kg o lb, cantidades, personalización, destino, condición comercial solicitada, fecha objetivo y requisitos de muestra o inspección. Añada preguntas concretas sobre disponibilidad de materiales, proceso, embalaje y plazo. Una RFQ de importación no debe limitarse a pedir catálogo y mejor precio.",
      "Cuando PowerBaseFit recibe una lista estructurada puede revisar los modelos vinculados con halteres, anillas y equipamiento relacionado, además de opciones OEM y preparación de exportación. La respuesta comercial aplicable debe confirmar los datos del pedido real. Los hechos corporativos publicados —operación desde 2008 en Ningjin y una fábrica aproximada de 8.000 m²— no sustituyen la verificación del producto, lote y condiciones acordadas."
    ]]
  ],
  "import-cost-guide": [
    ["modelo-coste", "Construir un modelo de coste puesto en almacén", [
      "Organice el cálculo en capas: producto y OEM; gastos hasta el punto del Incoterm; transporte principal y seguro; despacho y tributos; terminal, almacenaje y entrega; financiación y contingencia. Cada importe debe tener moneda, fecha, fuente y condición. Si una cifra es provisional, márquela como escenario, no como dato confirmado. Esta disciplina permite actualizar flete o tipo de cambio sin rehacer toda la hoja.",
      "Defina el punto exacto al que llama coste puesto. Puede ser puerto, almacén del importador o local del gimnasio. Dos equipos pueden usar la misma expresión y estar sumando alcances diferentes. Para decidir precio de venta o presupuesto de proyecto, incluya también descarga, manipulación de productos pesados, inspección en destino y pérdidas razonables por daño o reposición."
    ]],
    ["asignacion-logistica", "Asignar flete entre mancuernas, discos y estructuras", [
      "No reparta todos los gastos por número de piezas. Una mancuerna ligera, una anilla pesada y un banco desmontado consumen recursos distintos. Asigne el transporte internacional según peso facturable o volumen, los gastos vinculados al valor según valor declarado y las líneas específicas directamente al SKU correspondiente. Documente la regla para que compras, finanzas y ventas obtengan el mismo resultado.",
      "En una carga mixta, calcule también el coste de oportunidad del espacio. Añadir racks puede aprovechar volumen, pero la carga densa de discos puede alcanzar límites de peso. Pida al proveedor una estimación de embalaje por composición concreta y compárela con el transitario. El objetivo no es llenar cada hueco, sino construir una carga segura con margen comercial defendible."
    ]],
    ["escenarios-coste", "Escenarios de cambio, flete y cantidad", [
      "Prepare al menos un escenario base, uno conservador y uno de mejora. Cambie por separado tipo de cambio, tarifa de transporte, cantidad y mezcla de productos. Así se identifica qué variable amenaza realmente el margen. Una reducción pequeña del precio EXW puede tener menos efecto que mejorar la utilización del contenedor o evitar almacenaje por documentación tardía.",
      "Para presupuestos de gimnasio, separe inversión en equipos, suelo, instalación, transporte interno y mantenimiento. Para distribución, añada coste de inventario, marketing, garantía comercial y reposición. El mismo coste importado puede ser viable para un proyecto vendido de antemano y demasiado arriesgado para un catálogo con demanda aún no validada."
    ]],
    ["validar-cotizacion", "Validar los datos detrás de cada cotización", [
      "Antes de comparar proveedores, confirme que material, construcción, pesos, cantidad, logo, caja y condición comercial sean equivalentes. Una oferta puede excluir herramienta, prueba de color o pallet. Otra puede incluir una caja más resistente. Coloque las exclusiones en columnas visibles; no las esconda en notas, porque terminarán apareciendo como gasto o riesgo operativo.",
      "Solicite que el precio tenga validez y que el plazo indique desde qué evento se cuenta: depósito, aprobación de muestra o confirmación de materiales. PowerBaseFit informa que algunos pedidos estándar pueden expedirse alrededor de diez días después del depósito cuando materiales y programación están confirmados; esa referencia no debe aplicarse automáticamente a un proyecto personalizado. Use siempre el calendario escrito para la orden concreta."
    ]],
    ["decision-margen", "Decidir con margen y no solo con precio unitario", [
      "Calcule coste por referencia, margen bruto esperado, capital inmovilizado y punto de reposición. Identifique pesos de alta rotación y productos que sirven principalmente para completar una línea. Si un SKU ocupa espacio, requiere MOQ alto y tiene baja demanda, puede ser preferible reducir la variedad inicial aunque el precio unitario aumente.",
      "La RFQ de coste debe pedir packing list preliminar, MOQ por variante, cargos de personalización, muestra, embalaje y condición comercial. Envíe destino y composición del pedido para que la conversación se base en una carga posible. El agente aduanero y el transitario deben validar sus propias partidas; el fabricante no debe inventar impuestos ni asegurar costes locales que no controla."
    ]]
  ],
  "moq-guide": [
    ["matriz-moq", "Crear una matriz de MOQ por decisión", [
      "Divida el mínimo por producto, peso, color, logo y tipo de caja. Un proveedor puede aceptar una cantidad total, pero exigir mínimos por variante porque cada cambio interrumpe material, molde, impresión o embalaje. La matriz revela si el problema está en el número de unidades o en la fragmentación. También permite combinar pesos con la misma construcción sin asumir que todas las combinaciones son viables.",
      "Marque qué mínimos son físicos y cuáles son comerciales. Un lote de color puede depender de la preparación del compuesto; una caja impresa puede depender de la imprenta; una cantidad por SKU puede reflejar eficiencia de montaje. Pregunte qué ocurre si se usa color estándar, caja neutra o logo común. Negociar funciona mejor cuando se modifica la causa del mínimo."
    ]],
    ["mix-inicial", "Diseñar un mix inicial sin exceso de inventario", [
      "Para mancuernas y anillas, la demanda no se distribuye de forma uniforme. Use datos del canal, clientes potenciales y rangos habituales para concentrar unidades donde existe rotación. Mantenga suficientes referencias para que la línea sea coherente, pero evite comprar la misma cantidad de cada peso solo para alcanzar un total. Un set visualmente completo puede inmovilizar capital en extremos con baja salida.",
      "Si el negocio todavía no dispone de ventas históricas, construya hipótesis explícitas: público, precio, canal y frecuencia de reposición. Separe el pedido de validación del pedido de expansión. El primer lote debe producir información sobre calidad, presentación y demanda; no tiene que resolver de una vez todo el catálogo futuro."
    ]],
    ["negociacion-moq", "Palancas para negociar cantidades mínimas", [
      "Las palancas habituales son reducir variantes, usar componentes existentes, aceptar embalaje estándar, compartir color entre referencias, programar entregas o aumentar el valor total manteniendo menos SKUs. Cada opción cambia algo: identidad, inventario, plazo o flujo de caja. Registre la compensación para que una reducción de MOQ no termine creando una línea incoherente o una reposición imposible.",
      "No presione por una cifra sin confirmar cómo se fabricará. Un mínimo excepcional puede implicar material remanente, proceso manual o ausencia de continuidad. Pregunte si la misma configuración podrá repetirse y qué datos deben conservarse. Para marca propia, la consistencia de la segunda orden suele importar más que conseguir unas pocas unidades adicionales en el primer lote."
    ]],
    ["flujo-caja-moq", "Relacionar MOQ con caja, margen y reposición", [
      "Convierta cada mínimo en inversión por SKU y meses estimados de inventario. Añada transporte, tributos y gastos de destino para evitar evaluar solo el desembolso de fábrica. Un MOQ bajo con flete ineficiente puede costar más por unidad; uno alto puede mejorar precio, pero aumentar almacenaje y riesgo de obsolescencia. La decisión correcta equilibra ambos lados.",
      "Defina el punto de reposición considerando producción, transporte y despacho. Los pesos populares pueden agotarse antes que el resto de la gama. Si el proveedor exige repetir un mínimo completo, la estrategia debe anticiparlo. Pregunte si existen pedidos de reposición por modelos seleccionados y cómo se conserva color, logo, marcado y caja."
    ]],
    ["briefing-moq", "Briefing para obtener un MOQ real", [
      "Envíe una tabla con producto base, pesos, unidades, material, color, logo, kg o lb, embalaje y destino. Indique qué elementos son obligatorios y cuáles pueden adaptarse. PowerBaseFit confirma el MOQ después de revisar producto, proceso, personalización y composición; no publica una cifra universal porque el mínimo cambia con esas variables.",
      "La respuesta debe separar MOQ de muestra, MOQ de producción, mínimos de embalaje y costes de herramienta. Pida también plazo y condiciones de reposición. Con esa información, compras puede comparar un pedido estándar, un OEM visual y un desarrollo más complejo sin tratar las tres opciones como si tuvieran la misma estructura industrial."
    ]]
  ],
  "oem-vs-odm-guide": [
    ["propiedad-diseno", "Definir propiedad del diseño y entregables", [
      "Antes de usar OEM u ODM como etiqueta, liste quién aporta concepto, planos, materiales, logo, molde, archivos de embalaje y criterios de prueba. Indique también quién puede reutilizar cada elemento. Una conversación comercial no sustituye acuerdos sobre propiedad intelectual o confidencialidad; esos aspectos deben revisarse con asesores adecuados y quedar reflejados en documentos aplicables.",
      "Los entregables deben poder verificarse: dibujo, muestra, ficha, archivo de color, especificación de caja y versión aprobada. Si el proveedor propone cambios, registre por qué se realizan y qué requisito afectan. Esto evita que una mejora de coste o fabricación altere silenciosamente la promesa comercial de la marca."
    ]],
    ["validacion-desarrollo", "Validar un desarrollo por etapas", [
      "Un proyecto ODM suele necesitar más iteraciones que una personalización visual. Divida el avance en viabilidad, prototipo, prueba, revisión y muestra final. En cada puerta, defina qué se aprueba y qué información falta. No libere herramientas o producción masiva porque una imagen sea atractiva; material, dimensiones, unión, uso y embalaje deben estar alineados.",
      "Para OEM sobre producto existente, la validación puede concentrarse en logo, marcado, color y caja. Aun así, confirme el modelo base por código y muestra. Dos productos con nombres parecidos pueden usar construcciones distintas. La personalización debe aplicarse sobre la versión realmente cotizada."
    ]],
    ["herramientas-cambios", "Herramientas, cambios y control de versión", [
      "Cuando exista molde, troquel, placa o utillaje, documente coste, mantenimiento, almacenamiento, vida esperada y acceso futuro. Pregunte qué modificaciones requieren una herramienta nueva. Un cambio pequeño en geometría o logotipo puede tener consecuencias distintas según el proceso; la respuesta debe venir de la revisión técnica del modelo.",
      "Use un registro de cambios con fecha, responsable y efecto en coste o plazo. No sustituya archivos en una carpeta sin conservar la versión anterior. La muestra final, la orden y el arte de embalaje deben compartir identificadores. Este control protege tanto al comprador como a la fábrica durante producción e inspección."
    ]],
    ["gobierno-proyecto", "Gobernanza entre marca, compras y fábrica", [
      "Nombre un responsable comercial y uno técnico por cada parte. La marca puede priorizar apariencia; compras, coste y fecha; producción, viabilidad. Sin un método de decisión, el proyecto acumula aprobaciones contradictorias. Realice revisiones breves con una lista de asuntos abiertos, propietario y fecha, y cierre cada etapa por escrito.",
      "Defina qué sucede si una prueba no cumple, si cambia la cantidad o si un material deja de estar disponible. La respuesta no tiene que ser idéntica para todos los proyectos, pero sí conocida antes de comprometer el lanzamiento. Una reserva de calendario y presupuesto reduce la tentación de aprobar una solución incompleta."
    ]],
    ["seleccion-modelo", "Elegir OEM, ODM o producto estándar", [
      "Use producto estándar cuando la velocidad y el riesgo controlado pesan más que la diferenciación. Elija OEM visual cuando el producto base encaja y la marca necesita identidad. Considere cambios OEM técnicos u ODM solo cuando el mercado justifica inversión, pruebas y gestión adicional. La opción más compleja no es automáticamente la más valiosa.",
      "PowerBaseFit puede revisar productos base, logo, marcados, colores y embalaje según el modelo. Su experiencia publicada en equipos de peso libre ayuda a estructurar preguntas de fabricación, pero cada alcance debe confirmarse. Envíe objetivo, mercado, cantidad, requisitos y archivos disponibles para recibir una respuesta que distinga personalización existente de desarrollo real."
    ]]
  ],
  "private-label-guide": [
    ["posicionamiento-marca", "Traducir el posicionamiento en especificaciones", [
      "Defina a quién vende la marca, en qué rango de precio y qué atributos puede demostrar. Palabras como premium, profesional o resistente no bastan para comprar. Conviértalas en material, acabado, rango de pesos, ergonomía, marcado, caja y nivel de inspección. La especificación debe sostener el mensaje comercial sin inventar certificaciones o prestaciones.",
      "Compare la promesa con el entorno de uso. Un hotel puede valorar presentación y facilidad de limpieza; un distribuidor necesita reposición y embalaje; un gimnasio de alto tráfico prioriza rango, almacenamiento y mantenimiento. La misma identidad visual puede requerir productos diferentes según el canal."
    ]],
    ["arquitectura-surtido", "Construir una arquitectura de surtido", [
      "Organice la línea en productos principales, complementarios y futuras extensiones. Para pesos libres, decida si la marca empieza por mancuernas, anillas o un conjunto coordinado. Limite variantes que no aporten una diferencia comprensible. Un catálogo pequeño con lógica clara suele ser más fácil de vender y reponer que una colección amplia creada solo por disponibilidad.",
      "Defina códigos internos desde el inicio. El código debe relacionar producto, peso, unidad kg o lb, color y versión de empaque. Esto facilita cotización, control de arte, inventario y atención posventa. No dependa únicamente del nombre visible en la caja."
    ]],
    ["embalaje-etiquetado", "Diseñar embalaje para venta y logística", [
      "La caja debe proteger primero y comunicar después. Confirme peso por bulto, resistencia, separadores, pallet y manipulación antes de cerrar el diseño gráfico. Incluya campos reales y verificables; los requisitos legales, idioma y etiquetado deben revisarse para cada mercado con profesionales responsables.",
      "Cree una jerarquía visual coherente entre pesos y categorías. Logo, nombre, peso, código y datos de contacto deben poder leerse sin confundir variantes. Pruebe una caja física cuando el producto sea pesado o la impresión sea nueva. Una pantalla no revela deformación, roce o legibilidad durante almacenamiento."
    ]],
    ["lanzamiento-reposicion", "Planificar lanzamiento y reposición", [
      "Vincule la primera orden con un calendario comercial: muestras, fotografía, catálogo, preventa, llegada y distribución. No anuncie una fecha basada solo en un plazo de fábrica; incluya aprobación, producción, transporte y despacho. Mantenga margen para correcciones de arte y documentación.",
      "Antes del lanzamiento, acuerde cómo repetir color, logo, material y caja. Conserve muestra aprobada, archivos y ficha. Registre pesos de mayor demanda y daños de transporte para ajustar la siguiente compra. La continuidad de marca se construye en la reposición, no únicamente en el primer lote."
    ]],
    ["briefing-marca", "Briefing de marca propia para la fábrica", [
      "Envíe perfil de mercado, productos base, cantidades, rango, identidad visual, embalaje, destino y fecha objetivo. Separe requisitos obligatorios de preferencias. Solicite que la propuesta identifique método de logo, muestra, MOQ, herramienta, QC y plazo. Así la marca puede decidir qué personalizaciones aportan valor y cuáles añaden coste sin mejorar la oferta.",
      "PowerBaseFit revisa programas de marca propia vinculados con sus modelos reales de halteres, anillas y equipamiento relacionado. La viabilidad se confirma por producto y cantidad. Los datos de la fábrica publicados —ubicación en Ningjin, operación desde 2008 y área aproximada de 8.000 m²— aportan contexto corporativo, pero la aceptación debe basarse en la especificación y evidencia del pedido."
    ]]
  ],
  "factory-guide": [
    ["evidencia-fabricante", "Pedir evidencia vinculada al producto", [
      "La evaluación debe empezar por el modelo que se desea comprar. Solicite que la fábrica muestre materia prima, componentes, proceso, puestos de control y embalaje relacionados con esa referencia. Un vídeo corporativo o un catálogo amplio aportan contexto, pero no explican cómo se controla una mancuerna, una anilla o un rack concreto. Formule preguntas que puedan responderse con imágenes fechadas, registros, muestras o una explicación técnica coherente.",
      "Compruebe que nombre legal, dirección, cuenta de cobro y contacto comercial pertenecen a la operación evaluada. Confirme cambios de cuenta por un segundo canal. Si se utiliza una inspección externa, defina alcance y acceso antes de contratarla. La verificación no elimina todo riesgo; crea evidencia suficiente para decidir qué controles adicionales necesita el pedido."
    ]],
    ["capacidad-calendario", "Evaluar capacidad sin aceptar cifras aisladas", [
      "En lugar de pedir solo una capacidad mensual, entregue cantidades, variantes y fecha. Pregunte por materiales, turnos, procesos críticos, trabajo subcontratado y pedidos que comparten recursos. Una cifra agregada puede incluir productos distintos o condiciones que no aplican. El calendario útil muestra aprobación, preparación, producción, control, embalaje y disponibilidad para carga.",
      "Solicite que el proveedor explique qué cambia cuando aumenta el volumen o se añade personalización. Logo, color y caja impresa pueden crear dependencias distintas. Incluya una fecha para la muestra y otra para el lote; no las mezcle. Si el plazo es esencial, acuerde cómo se informarán desviaciones y qué decisiones corresponden al comprador."
    ]],
    ["auditoria-proceso", "Seguir el flujo de producción y QC", [
      "Trace el producto desde la recepción de componentes hasta el pallet. Para cada etapa, anote el defecto que podría aparecer y cómo se detecta: peso incorrecto, unión deficiente, superficie irregular, marcado equivocado, cantidad incompleta o caja insuficiente. El control debe concentrarse en riesgos del modelo, no en una lista genérica que se repite para cualquier equipo.",
      "Una muestra aprobada fija aspectos visibles y medibles, pero el lote requiere muestreo y criterios propios. Defina tolerancias, cantidad revisada, herramientas de medición y registro de resultados. Si una característica solo puede verificarse en destino, márquela. La transparencia sobre límites es más útil que promesas de control total."
    ]],
    ["comunicacion-fabrica", "Probar la calidad de la comunicación", [
      "Observe si las respuestas conservan código, versión y unidades. Una fábrica fiable puede necesitar tiempo para consultar producción, pero debe distinguir hechos confirmados de estimaciones. Las respuestas rápidas que cambian de una conversación a otra son una señal para aumentar el control. Resuma decisiones y pida confirmación antes de pagar o aprobar.",
      "Incluya responsables de ventas, producción, arte y logística cuando corresponda. No todos deben participar en cada mensaje, pero debe existir un canal para resolver dudas técnicas. Una tabla de asuntos abiertos reduce pérdidas de información entre zonas horarias y evita que un cambio de logo o caja llegue tarde a la línea."
    ]],
    ["powerbasefit-verificacion", "Cómo evaluar a PowerBaseFit con los mismos criterios", [
      "PowerBaseFit publica que opera desde 2008 en Ningjin, Dezhou, provincia de Shandong, con una fábrica aproximada de 8.000 m² y líneas relacionadas con pesos libres. Estos son datos de primera parte que pueden orientar la verificación, no sustituyen muestra, especificación, visita o inspección cuando el riesgo del pedido lo exige.",
      "Envíe producto, peso, cantidad, personalización, destino y requisitos de control. Pida una respuesta sobre proceso, MOQ, embalaje y calendario aplicables a esa lista. La comparación con otros proveedores debe usar el mismo alcance y evidencia. No atribuya certificaciones, clientes, ventas o capacidades que no estén documentados."
    ]]
  ],
  "hex-vs-round-guide": [
    ["ejercicios-forma", "Relacionar la forma con los ejercicios", [
      "La cabeza hexagonal aporta caras de apoyo que pueden reducir desplazamiento en remos, flexiones u otros ejercicios donde la mancuerna toca el suelo. Esto no garantiza estabilidad en cualquier superficie ni autoriza usos para los que el producto no fue diseñado. Evalúe tamaño de la cabeza, apoyo real, suelo y técnica con una muestra representativa.",
      "La cabeza redonda se integra bien en líneas continuas de musculación y puede cubrir rangos elevados. Su gestión depende más del rack y de hábitos de devolución. Analice cómo los usuarios toman y dejan cada peso, especialmente en horas punta. La forma debe resolver una operación concreta, no seguir una preferencia estética aislada."
    ]],
    ["ergonomia-rango", "Comparar rango, incrementos y ergonomía", [
      "Dibuje la gama completa por peso y cantidad de pares. Los incrementos pequeños sirven a progresiones y públicos diversos; los pesos altos aumentan diámetro, espacio y exigencia de manipulación. Compare empuñadura, longitud útil, textura y transición entre cabeza y mango. Una forma atractiva no compensa una gama mal dimensionada.",
      "Pruebe pesos ligeros, medios y altos porque la proporción puede cambiar. Verifique que marcas kg o lb sean legibles desde el pasillo y que el logo no compita con el peso. Para distribución, revise también cómo se fotografía y embala cada tamaño; para gimnasio, priorice identificación rápida y sustitución futura."
    ]],
    ["rack-distribucion", "Diseñar rack y circulación antes de comprar", [
      "Mida anchura útil, niveles, capacidad y separación. Las mancuernas redondas necesitan cunas o apoyos que impidan movimiento; las hexagonales también deben almacenarse en un soporte compatible que no marque el revestimiento. Coloque pesos pesados en alturas seguras y reserve espacio para retirar un par sin golpear al usuario vecino.",
      "Observe el flujo entre rack, bancos y área de ejercicios. Evite que las personas crucen zonas activas transportando pesos. La distribución y las separaciones deben ser validadas por profesionales responsables del proyecto. La fábrica puede facilitar dimensiones del producto, pero no reemplaza el diseño técnico local."
    ]],
    ["mantenimiento-formas", "Mantenimiento y reposición por formato", [
      "Registre puntos de contacto con rack, suelo y productos de limpieza. En cabezas revestidas, una arista, disco de apoyo o solvente incompatible puede producir marcas. Inspeccione unión, holgura, superficie y legibilidad. La forma afecta dónde aparece el desgaste, pero material y construcción determinan gran parte del comportamiento.",
      "Planifique pares de reposición por peso. Pregunte cómo se mantendrán diámetro, mango, color y logo en otra orden. Una academia puede combinar formatos en zonas distintas, pero debería evitar mezclar piezas visualmente similares con agarres o alturas diferentes dentro del mismo conjunto."
    ]],
    ["compra-hex-redonda", "Decisión B2B entre hexagonal y redonda", [
      "Para un estudio funcional, la hexagonal puede facilitar ejercicios en suelo y almacenamiento compacto. Para una sala de musculación con una línea extensa, la redonda puede encajar en racks dedicados. Un distribuidor puede ofrecer ambas si cada una tiene público, precio y mensaje definidos. No duplique referencias sin una razón comercial.",
      "En la RFQ indique forma, material, rango, unidades por peso, rack, logo y destino. PowerBaseFit puede revisar opciones reales de halteres y personalización según modelo. Compare especificación, muestra, MOQ, embalaje y reposición; el precio por kilogramo no resume ergonomía, presentación ni coste de inventario."
    ]]
  ],
  "materials-guide": [
    ["protocolo-muestras", "Protocolo de muestras para goma, PU y TPU", [
      "Compare productos con la misma forma y peso cuando sea posible. Acondicione las muestras en el mismo lugar y registre fecha, temperatura, olor percibido, dureza, textura, color y defectos visibles. No abra una caja y emita una conclusión inmediata: embalaje y ventilación pueden influir. Use varias personas para observaciones sensoriales y separe opinión de medidas.",
      "Incluya una pieza ligera y otra pesada porque espesor y proceso pueden variar. Fotografíe bajo iluminación constante y conserve código de muestra. Las siglas de material no describen formulación completa; pida la información que el proveedor pueda documentar sin asumir propiedades universales."
    ]],
    ["rack-limpieza", "Probar contacto con rack y limpieza", [
      "Coloque la muestra sobre el material de apoyo previsto y observe marcas, presión y transferencia después de un periodo controlado. Pruebe el producto de limpieza recomendado por el responsable del gimnasio en una zona discreta. Un recubrimiento puede verse bien en mano y reaccionar mal con soportes, calor o químicos incompatibles.",
      "Defina una rutina que el personal pueda cumplir: paño, solución, frecuencia, secado e inspección. Evite afirmaciones absolutas sobre resistencia si no existe prueba aplicable. Para distribuidores, incluya instrucciones prudentes que no prometan una vida útil independiente del uso."
    ]],
    ["posicionamiento-material", "Alinear material con posicionamiento y presupuesto", [
      "La goma suele ocupar una franja comercial amplia y conocida. El PU se utiliza a menudo cuando uniformidad y presentación tienen peso en la propuesta. El TPU abarca formulaciones termoplásticas que deben evaluarse por producto. Estas tendencias no convierten un material en ganador automático; construcción, proveedor, muestra y mantenimiento siguen siendo decisivos.",
      "Calcule la diferencia sobre la gama completa, no sobre una unidad. Añada MOQ, color, logo, caja y reposición. Una línea premium necesita consistencia visual y disponibilidad futura; una línea de alta rotación puede priorizar coste total y facilidad de sustitución. Documente por qué el material elegido sostiene la promesa de la marca."
    ]],
    ["qc-recubrimientos", "QC específico para recubrimientos", [
      "Defina defectos aceptables y no aceptables: burbujas, variación de tono, rebabas, zonas sin cobertura, desalineación, marcas y diferencias entre pares. Revise peso y unión además de superficie. Una inspección centrada solo en color puede pasar por alto problemas funcionales que no dependen del recubrimiento.",
      "Para colores personalizados, apruebe una referencia física y condiciones de observación. Registre tolerancia razonable entre lotes y cómo se tratarán reposiciones. En negro, compare textura y brillo; dos productos oscuros pueden mostrar diferencias evidentes en un rack continuo."
    ]],
    ["rfq-materiales", "RFQ para comparar materiales de forma válida", [
      "Envíe forma, construcción, pesos, cantidad, ambiente, rack, limpieza, color, logo y segmento comercial. Solicite muestras equivalentes y una ficha que identifique el material del modelo. Pida también MOQ y plazo por opción; una alternativa técnicamente adecuada puede no ser viable para el calendario o volumen.",
      "PowerBaseFit puede presentar configuraciones de goma, PU u otras disponibles en su catálogo. La decisión debe apoyarse en productos reales y criterios medibles. No utilice esta guía para declarar superioridad universal ni para atribuir propiedades que la fábrica no haya confirmado para la referencia cotizada."
    ]]
  ],
  "professional-gym-list-guide": [
    ["gimnasio-pequeno", "Lista para un gimnasio pequeño o estudio", [
      "En superficies limitadas, priorice equipos que cubran varios movimientos y evite duplicar funciones. Una base puede incluir rango seleccionado de mancuernas, bancos ajustables, almacenamiento, barras y anillas según el programa. Mantenga circulación y espacio de trabajo antes de añadir otra estación. El número final depende de usuarios simultáneos, no del deseo de mostrar un catálogo completo.",
      "Reserve presupuesto para suelo, espejos cuando correspondan, ventilación, entrega, montaje y mantenimiento. Trabajar por fases permite observar qué pesos y estaciones tienen mayor demanda. Deje infraestructura y almacenamiento preparados para ampliar sin bloquear pasillos."
    ]],
    ["gimnasio-comercial", "Lista para un gimnasio comercial de mayor tráfico", [
      "Una sala comercial necesita capacidad en horas punta. Duplique pesos populares, distribuya bancos y evite que un único rack concentre toda la circulación. Relacione mancuernas, barras, discos y máquinas con el perfil de miembros. Los productos de mayor carga requieren zonas claras y almacenamiento cercano.",
      "Cree una matriz de estaciones por usuario simultáneo. Revise qué ejercicios compiten por el mismo banco o rack. Esta vista ayuda a decidir si conviene comprar otra unidad o reorganizar el programa. Las separaciones y requisitos de seguridad deben validarse localmente."
    ]],
    ["presupuesto-fases", "Presupuesto por prioridades y fases", [
      "Clasifique cada elemento como apertura, segunda fase o opcional. Proteja primero los equipos que sostienen la propuesta comercial y los sistemas que permiten usarlos: suelo, rack y almacenamiento. Añada transporte, descarga, instalación y contingencia. Un precio de fábrica sin estos componentes no representa la inversión de apertura.",
      "Asigne una razón a cada compra: capacidad, variedad, seguridad operativa, venta o reposición. Si un producto no tiene función clara, elimínelo o pospóngalo. Una fase posterior debe tener un indicador, como membresía, utilización o ingreso, que justifique la ampliación."
    ]],
    ["mantenimiento-lista", "Incluir mantenimiento y repuestos en la lista", [
      "Añada frecuencia de inspección, responsable y piezas susceptibles de desgaste. En pesos libres, revise unión, superficie, marcado y rack; en bancos y estructuras, tornillería, tapicería, cables o puntos móviles según el equipo. Pida manuales e información de repuestos aplicables.",
      "Planifique dónde se almacenan piezas fuera de servicio y cómo se reemplazan pares o pesos. Un conjunto visualmente coherente pierde valor si una referencia no puede reponerse. Para importación, mantenga códigos y versiones que la fábrica pueda identificar."
    ]],
    ["cotizacion-lista", "Convertir la lista en una cotización comparable", [
      "La tabla de compra debe incluir zona, producto, código, cantidad, dimensiones, peso, personalización, ubicación y prioridad. Adjunte plano y destino. Pida embalaje y peso total para preparar descarga. Separe diseño técnico de selección comercial: el proveedor puede aportar datos de producto, mientras profesionales locales validan distribución y seguridad.",
      "PowerBaseFit puede revisar halteres, anillas, racks, bancos y accesorios vinculados con su oferta real. Envíe una lista por fases para recibir una propuesta más útil. No presente imágenes de proyectos como resultados garantizados; úselas únicamente para discutir combinación, almacenamiento y apariencia."
    ]]
  ],
  "free-weight-area-guide": [
    ["flujo-entrenamiento", "Dibujar el flujo de entrenamiento", [
      "Marque entrada, calentamiento, rack de mancuernas, bancos, jaulas, plataformas y almacenamiento de discos. Simule cómo se mueven usuarios y entrenadores en hora punta. Los recorridos con peso deben ser cortos y no atravesar estaciones activas. Reserve zonas de espera sin invadir la trayectoria de una barra o el espacio de un banco.",
      "Use el plano con dimensiones reales de equipos y posiciones de uso, no solo su huella cerrada. Un banco necesita desplazamiento; una barra requiere espacio lateral; una puerta o columna puede reducir circulación. Profesionales responsables deben validar accesibilidad, evacuación y separaciones."
    ]],
    ["racks-mancuernas", "Coordinar racks, mancuernas y bancos", [
      "El rango de mancuernas determina longitud y niveles del rack. Coloque pesos ligeros y medios donde puedan identificarse y los pesados a una altura de manipulación adecuada. Si se duplican pares populares, decida si se agrupan o se distribuyen para reducir congestión. Compruebe que la cuna sea compatible con forma y mango.",
      "Ubique bancos con espacio para ajustar respaldo y para que un asistente pueda moverse cuando el programa lo requiera. No cree filas tan densas que los usuarios choquen con mancuernas vecinas. La cantidad de bancos debe relacionarse con pares disponibles y ejercicios previstos."
    ]],
    ["barras-anillas", "Distribuir barras, anillas y almacenamiento", [
      "Coloque soportes de discos cerca de racks y plataformas compatibles, sin invadir la carga de la barra. Organice pesos de forma legible y limite piezas en el suelo. Si conviven anillas convencionales y bumper, identifique el uso de cada una y evite que la apariencia lleve a soltarlas donde el piso no está preparado.",
      "Calcule la carga máxima que puede colocarse en mangas y soportes según el producto real. La espesor de las anillas afecta la combinación posible. Prevea barras fuera de servicio y accesorios de cierre; el orden operativo reduce riesgos y tiempo perdido."
    ]],
    ["seguridad-operativa", "Seguridad operativa y mantenimiento diario", [
      "Defina reglas de devolución de pesos, inspección al abrir y cierre, limpieza y reporte de daños. Supervise uniones, superficies, tornillería y almacenamiento. El equipamiento no sustituye formación, señalización ni control de uso. Los requisitos técnicos y de seguridad deben determinarse con profesionales locales.",
      "Observe puntos de congestión durante las primeras semanas y ajuste posiciones que puedan moverse sin comprometer el diseño. Registre pesos con mayor uso para futuras duplicaciones. Una distribución es una hipótesis que debe verificarse con operación real."
    ]],
    ["compra-zona", "Paquete de compra para la zona de peso libre", [
      "Prepare una tabla con mancuernas por peso, racks, bancos, barras, anillas, soportes, dimensiones y ubicación. Añada logo, colores, embalaje, destino, acceso de descarga y calendario. Pida peso neto, bruto y número de bultos para organizar la llegada. Las estructuras y productos densos necesitan planes de manipulación diferentes.",
      "PowerBaseFit puede revisar productos de su catálogo y opciones OEM para una lista B2B, pero no sustituye al diseñador responsable. Utilice referencias de proyectos para conversar sobre mezcla y presentación, no para afirmar resultados de clientes. La propuesta final debe corresponder al plano, cantidades y especificaciones aprobadas."
    ]]
  ]
};

const supplements: Record<string, IntentSection> = {
  "factory-guide": ["decision-fabrica", "Matriz final de decisión sobre la fábrica", [
    "Puntúe por separado identidad, ajuste al producto, calidad de la muestra, claridad de especificación, proceso, QC, embalaje, logística y comunicación. Añada una columna de evidencia y otra de asuntos abiertos. No compense una carencia crítica —por ejemplo, una unión no definida o una cuenta bancaria dudosa— con una puntuación alta en catálogo o precio. Establezca condiciones que deben cerrarse antes del depósito y otras que pueden verificarse durante producción.",
    "Compare proveedores con el mismo producto, cantidad, personalización, Incoterm y nivel de inspección. Si una fábrica propone una construcción distinta, trátela como alternativa separada. Registre quién aprobó la selección y por qué. Esta matriz también resulta útil para AI Search y reuniones internas porque permite citar hechos concretos sin convertir una impresión comercial en una afirmación.",
    "La decisión puede ser avanzar, solicitar más evidencia, ejecutar una muestra adicional o descartar. Ninguna categoría debe asignarse por intuición solamente. Conserve el expediente para la reposición: una fábrica aprobada para un producto no queda automáticamente validada para todas las categorías."
  ]],
  "import-cost-guide": ["control-presupuesto", "Control del presupuesto hasta la llegada", [
    "Actualice el modelo en cuatro momentos: cotización, confirmación del pedido, reserva de transporte y despacho. Conserve la versión anterior para explicar variaciones. Si cambia el mix, solicite otra packing list; si cambia el puerto, vuelva a cotizar los gastos afectados. No use una tarifa antigua para proteger una decisión ya tomada.",
    "Al cerrar la operación, archive facturas y compare cada partida con el presupuesto. Clasifique la diferencia como cambio de precio, estimación incorrecta, gasto omitido o incidencia. Esa revisión mejora el siguiente pedido y permite establecer una contingencia basada en experiencia propia, no en un porcentaje genérico."
  ]],
  "moq-guide": ["escenarios-minimos", "Comparar tres escenarios de mínimos", [
    "Construya un escenario estándar sin personalización, otro con logo y embalaje básico, y un tercero con color o desarrollo adicional. Para cada uno anote unidades, inversión, plazo, muestra, coste por unidad y meses de inventario. La comparación muestra qué elemento crea el salto de MOQ y permite decidir si la diferenciación justifica capital y tiempo.",
    "Incluya una previsión de venta prudente y otra exigente. Si el mínimo tarda demasiado en rotar incluso en el escenario optimista, reduzca variantes o cambie el producto base. Si la demanda es sólida, valore programar reposiciones antes de agotar pesos populares. Evite negociar un mínimo que solo funciona porque el cálculo ignora flete, tributos o almacenamiento.",
    "Cierre la negociación con una tabla aprobada por SKU. Debe quedar claro si el mínimo se aplica por peso, color, logo, caja o pedido total. Guarde el método de personalización y los archivos para que la siguiente orden no vuelva a empezar desde cero."
  ]],
  "oem-vs-odm-guide": ["riesgo-comercial", "Riesgo comercial y criterio de lanzamiento", [
    "Defina qué hipótesis de mercado justifica el desarrollo: precio aceptado, volumen, canal, problema del usuario o diferencia frente a competidores. Un proyecto ODM consume recursos antes de demostrar ventas; establezca un punto en el que se pausa si muestra, coste o plazo dejan de cumplir el caso comercial. El equipo no debe continuar solo porque ya invirtió tiempo.",
    "Para OEM, valide que la personalización sea visible y relevante. Un logo costoso en una zona poco legible puede aportar menos que una caja clara o un rango mejor elegido. Compare el valor para el cliente con MOQ, herramientas y complejidad de reposición. La diferenciación efectiva no siempre exige cambiar la ingeniería.",
    "Antes de lanzar, revise que fotografías, fichas y afirmaciones correspondan a la versión aprobada. No publique propiedades, certificaciones o pruebas que no estén documentadas. Mantenga una muestra de referencia y un expediente con los archivos utilizados."
    ,"La revisión final debe incluir un plan alternativo si el desarrollo no alcanza coste, calidad o fecha. Puede volver a un producto estándar, reducir personalización o aplazar el lanzamiento. Definir esta salida antes de la última prueba evita aceptar una solución débil solo para cumplir un calendario interno."
  ]],
  "private-label-guide": ["cuadro-mando-marca", "Cuadro de mando para una marca propia", [
    "Controle cinco grupos de indicadores: calidad recibida, daños de transporte, disponibilidad por SKU, margen y repetición de compra. Añada comentarios de distribuidores o gimnasios por producto y peso. Estos datos ayudan a decidir qué ampliar, corregir o retirar. No confunda ventas iniciales generadas por promoción con demanda estable.",
    "Revise consistencia visual entre producto, caja, web y material comercial. El nombre, peso, unidad y color deben coincidir. Si cambia una especificación, actualice todos los activos y conserve la fecha. Una marca B2B pierde confianza cuando catálogo, etiqueta y mercancía describen versiones diferentes.",
    "Prepare un protocolo de incidencias: fotografías requeridas, código de lote, cantidad afectada y responsable de respuesta. Diferencie daño logístico, uso, defecto y error de picking antes de prometer una solución. Esa información también permite pedir a la fábrica una acción concreta.",
    "Para la segunda orden, use ventas reales y reclamaciones para ajustar el mix. Confirme de nuevo materiales y archivos, aunque el nombre comercial no cambie. La reposición es el momento de demostrar que la marca puede mantener una línea, no solo lanzar un diseño."
    ,"Revise también si MOQ y embalaje siguen siendo adecuados para el nuevo mix. Una marca que crece puede negociar cantidades distintas, pero debe conservar los elementos que el cliente reconoce. Documente cualquier cambio visible y decida si requiere agotar inventario anterior o comunicar una nueva versión."
    ,"Conserve una muestra de venta y otra de referencia técnica cuando el volumen lo justifique. Esto ayuda a formar al equipo comercial y a comparar reposiciones sin retirar producto del inventario disponible."
  ]],
  "hex-vs-round-guide": ["prueba-piloto-forma", "Prueba piloto antes de elegir toda la gama", [
    "Si la decisión afecta una sala completa o un catálogo nuevo, pruebe varios pesos de ambas formas con usuarios representativos y el rack previsto. Observe retirada, devolución, rodamiento, apoyo en suelo, lectura del peso y contacto con el soporte. Registre resultados por ejercicio; no solicite únicamente una preferencia general.",
    "Incluya al personal de limpieza y mantenimiento. Pregunte qué formato facilita ordenar, detectar daños y mover el rack. Para un distribuidor, pruebe caja, fotografía y exposición. La mejor opción puede variar por segmento, de modo que la conclusión debe indicar dónde funciona cada forma.",
    "Después de la prueba, convierta observaciones en especificaciones: diámetro del mango, rango, cantidad, rack, recubrimiento, logo y embalaje. Si ambas opciones cumplen, compare coste total y reposición. Si una falla en un criterio crítico, no deje que una diferencia de precio o apariencia oculte el problema operativo."
    ,"Para una compra internacional, añada peso bruto, unidades por caja y protección entre piezas. La cabeza hexagonal y la redonda pueden requerir soluciones de embalaje distintas. Pida fotos de la configuración propuesta y compruebe que la caja pueda identificarse por modelo y peso durante la recepción."
    ,"Si el rack se compra por separado, confirme medidas con ambos proveedores antes del envío. Una incompatibilidad descubierta en destino puede afectar toda la presentación y obligar a realizar adaptaciones no previstas."
  ]],
  "materials-guide": ["decision-material-documentada", "Documentar la decisión de material", [
    "Cree una ficha por alternativa con fotografías, código de muestra, peso, construcción, recubrimiento, observaciones, método de limpieza, rack utilizado, precio, MOQ y plazo. Añada qué datos provienen del proveedor y cuáles son observaciones internas. Esta separación evita convertir una percepción de muestra en una propiedad general del material.",
    "Puntúe los criterios según el canal. Un club premium puede dar mayor peso a color y uniformidad; un distribuidor puede priorizar coste, disponibilidad y baja tasa de incidencias; un gimnasio de alto tráfico puede valorar mantenimiento y reposición. Use la misma ponderación para todas las muestras.",
    "Revise el resultado con marketing antes de publicar afirmaciones. Describa el producto concreto y evite frases como “sin olor”, “indestructible” o “siempre superior” sin prueba aplicable. La comunicación honesta mejora la comparación B2B y reduce expectativas que producción no puede sostener.",
    "Conserve la ficha para el siguiente lote. Si cambia formulación, proveedor de componente o proceso, pida una nueva muestra cuando el riesgo lo justifique. La sigla PU, TPU o goma no garantiza continuidad por sí sola."
    ,"Si la línea combina materiales, explique al cliente por qué y mantenga una jerarquía de producto clara. Evite usar acabados casi iguales con instrucciones de cuidado diferentes sin identificarlos. La selección debe facilitar venta, mantenimiento y reposición, no convertir el catálogo en una comparación técnica difícil de gestionar."
    ,"Incluya estas instrucciones en la formación del distribuidor o del personal del gimnasio. El material elegido solo puede mantener su presentación cuando almacenamiento, limpieza y uso respetan las condiciones definidas."
  ]],
  "professional-gym-list-guide": ["ejemplo-capacidad", "Ejemplo de lectura de capacidad sin lista universal", [
    "Imagine dos centros con la misma superficie: un estudio con clases dirigidas y un gimnasio abierto todo el día. El primero puede concentrar accesorios y estaciones compartidas; el segundo necesita más duplicación en horas punta, almacenamiento y variedad de cargas. Copiar la misma lista produciría cuellos de botella distintos. Por eso la tabla debe incluir usuarios simultáneos y ejercicios, no solo metros cuadrados.",
    "Para cada zona, estime sesiones por hora y duración de uso. Identifique equipos que bloquean una actividad si están ocupados. Una segunda unidad puede ser prioritaria aunque tenga menor precio o visibilidad que otra categoría. A la inversa, una máquina llamativa puede posponerse si no sostiene la propuesta principal.",
    "Valide consumo eléctrico, accesos, suelo, montaje y mantenimiento donde corresponda. Los equipos deben caber por puertas y ascensores, no solo en el plano final. Prepare una secuencia de entrega para evitar que cajas pesadas queden delante de las zonas de instalación.",
    "Antes de emitir la orden, recorra la lista con operaciones, entrenadores, mantenimiento y finanzas. Cada área debe confirmar los datos que controla. Este paso reduce compras incompletas y hace que la cotización sea un documento operativo."
    ,"Añada una columna de riesgo por elemento. Puede señalar dependencia de instalación, plazo largo, repuesto crítico, acceso difícil o uso todavía no validado. Asigne una acción: confirmar, sustituir, comprar en segunda fase o mantener una unidad de reserva. Esta lectura evita que el presupuesto se consuma en productos visibles mientras quedan sin resolver suelo, almacenamiento o entrega."
    ,"Cuando reciba ofertas, compare la lista línea por línea y no solo el total. Verifique cantidades, accesorios incluidos y embalaje. Un proveedor puede agrupar un soporte con el producto y otro cotizarlo aparte. Las diferencias deben aclararse antes de elegir, porque afectan operación y coste final."
  ]],
  "free-weight-area-guide": ["validacion-layout", "Validar el layout con escenarios de uso", [
    "Pruebe el plano con tres escenarios: ocupación normal, hora punta y mantenimiento. En el primero, compruebe comodidad; en el segundo, cruces y esperas; en el tercero, acceso para limpiar, ajustar o retirar una pieza. Añada la posición de usuarios y barras en movimiento. La huella del equipo por sí sola subestima el espacio funcional.",
    "Simule un circuito desde la selección de mancuernas hasta el banco y la devolución. Después siga una anilla desde el soporte hasta la barra. Si los recorridos se cruzan, cambie almacenamiento o estaciones antes de comprar. Reserve una zona para piezas temporalmente fuera de servicio sin bloquear circulación.",
    "Use cinta o plantillas a escala en el espacio cuando sea posible. Esta prueba sencilla puede revelar columnas, puertas, reflejos, iluminación o radios de giro que no aparecen bien en un dibujo. Registre las medidas finales que se enviarán al proveedor.",
    "La aprobación debe incluir plano, lista, cantidades y responsable técnico local. Si cambia un rack o banco, revise de nuevo el entorno; productos con la misma categoría pueden tener dimensiones diferentes. Mantener esa disciplina protege la operación sin convertir la fábrica en diseñadora del proyecto."
    ,"Después de instalar, observe durante varios días la devolución de mancuernas, acumulación de discos y movimientos alrededor de bancos. Ajuste señalización o posiciones móviles cuando sea seguro hacerlo y registre cambios en el plano. Esta información será útil para ampliar la zona o repetir el proyecto en otra ubicación."
    ,"Incluya en el presupuesto elementos de orden que suelen omitirse: soportes, identificadores, cierres, zonas para barras y espacio temporal para cajas. Son componentes pequeños frente al equipo principal, pero su ausencia puede degradar el flujo desde el primer día."
    ,"Fotografíe la configuración final y anote cambios respecto al plano aprobado. La documentación facilita mantenimiento, reposición y futuras ampliaciones sin depender de la memoria del equipo de apertura."
  ]]
};

export function spanishBlogIntentSections(id: string): ContentBlock[] {
  const articleSections = sections[id];
  if (!articleSections) throw new Error(`Missing differentiated Spanish blog sections for ${id}`);
  const allSections = supplements[id] ? [...articleSections, supplements[id]] : articleSections;
  return allSections.map(([sectionId, heading, paragraphs]) => rich(sectionId, heading, ...paragraphs));
}
