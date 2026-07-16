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

export type SpanishBlogInput = {
  id: string;
  esPath: string;
  title: string;
  description: string;
  h1: string;
  keyword: string;
  definitionTerm: string;
  definitionText: string;
  quickAnswer: string;
  image: [string, string];
  comparisonTitle: string;
  comparisonColumns: string[];
  comparisonRows: string[][];
  sections: Array<{ id: string; heading: string; paragraphs: string[] }>;
  checklistTitle: string;
  checklistItems: string[];
  faq: Array<[string, string]>;
  links: Array<[string, string]>;
};

export function spanishBlog(input: SpanishBlogInput): SpanishPage {
  return {
    id: input.id,
    type: "blog",
    esPath: input.esPath,
    title: input.title,
    description: input.description,
    h1: input.h1,
    image: input.image,
    blocks: [
      quick("respuesta-rapida", input.quickAnswer),
      definition("definicion", input.definitionTerm, input.definitionText),
      table("comparacion", input.comparisonTitle, input.comparisonColumns, input.comparisonRows),
      ...input.sections.map((section) => rich(section.id, section.heading, ...section.paragraphs)),
      rich(
        "guia-comprador",
        "Guía práctica para el comprador B2B",
        `Antes de solicitar precio para ${input.keyword}, convierta la necesidad en una tabla. Identifique producto o decisión, especificación, cantidad, personalización, embalaje, destino y fecha. Separe los datos confirmados de los supuestos. Una solicitud ambigua obliga al proveedor a interpretar y hace que dos ofertas parezcan comparables cuando en realidad incluyen construcciones, cantidades o responsabilidades diferentes.`,
        "Compare siempre sobre la misma condición comercial. Revise qué incluye el precio, moneda, validez, embalaje, muestra, herramienta, inspección, documentación y transporte. El precio unitario más bajo puede producir un coste total mayor si el producto no corresponde al uso, si la carga aprovecha mal el espacio o si faltan gastos que aparecerán después.",
        "Defina responsables de aprobación. Una persona debe confirmar producto y especificación; otra puede revisar marca, embalaje o importación. Si varias versiones de un archivo circulan por correo o mensajería, utilice un nombre y fecha de versión. La orden final debe reunir lo aprobado en un documento que el comprador y la fábrica puedan consultar.",
        "Planifique la reposición desde el primer pedido. En mancuernas y discos, ciertos pesos rotan más rápido o reciben más uso. Para una marca propia, pregunte cómo mantener logotipo, color y construcción en pedidos posteriores. Para un gimnasio, registre qué referencias deben poder reemplazarse sin alterar el conjunto."
      ),
      rich(
        "experiencia-fabrica",
        "Información y experiencia de primera parte de PowerBaseFit",
        "PowerBaseFit informa que opera desde 2008 en Ningjin, Dezhou, provincia de Shandong, China, con una fábrica de aproximadamente 8.000 m². La operación trabaja con mancuernas, discos de peso y equipamiento relacionado para compradores internacionales. Estos datos describen la empresa real y no implican certificaciones, clientes, ventas o resultados que no estén documentados.",
        "En la experiencia de su equipo de exportación y producción, los proyectos que avanzan con menos retrabajo llegan con una lista por modelo y peso, aplicación, cantidad, sistema kg/lb, archivos de marca y destino. Esa información permite revisar disponibilidad, MOQ, muestra, proceso, QC y embalaje. Cuando falta, la conversación se concentra en aclaraciones y el precio inicial tiene menos valor.",
        "Los controles se adaptan al producto. Pueden incluir material, peso, dimensiones, superficie, unión, montaje, marcado, cantidad y embalaje. Los compradores deben indicar qué características afectan la aceptación. Una muestra ayuda a fijar apariencia y construcción, pero el lote necesita su propio control.",
        "Para productos estándar, PowerBaseFit indica que una expedición alrededor de diez días después del depósito puede ser posible cuando materiales y programación están confirmados. No es una promesa universal: el calendario cambia por cantidad, personalización, muestra, disponibilidad y carga. La fecha aplicable debe figurar en la propuesta del pedido."
      ),
      rich(
        "mercados",
        "Aplicación en España y América Latina",
        "La terminología de esta guía busca ser comprensible en España, México, Colombia, Chile, Argentina y otros mercados hispanohablantes. Utiliza mancuernas, discos de peso y equipos de gimnasio como términos principales, sin excluir expresiones regionales como pesas o equipos fitness cuando aportan contexto.",
        "Normas, etiquetado, clasificación, impuestos y procedimientos de importación varían según país y fecha. Este contenido organiza decisiones de producto y compra; no sustituye asesoramiento aduanero, legal, fiscal, de seguridad o diseño técnico. El comprador debe verificar requisitos con profesionales responsables en su mercado.",
        "También conviene adaptar el sistema de medida y la presentación comercial. España y gran parte de América Latina trabajan habitualmente con kilogramos, pero determinados canales pueden solicitar libras. No mezcle marcas kg/lb sin definir versión, arte y cantidades, porque afecta producto, caja, catálogo y reposición.",
        "En una negociación internacional, confirme zona horaria, idioma de los archivos, moneda, puerto, documentos y canal de aprobación. Un resumen escrito después de cada decisión reduce interpretaciones y protege a ambas partes."
      ),
      rich(
        "criterios-verificables",
        "Cómo convertir la guía en criterios verificables",
        "Para utilizar esta información en una decisión, transforme cada recomendación en una pregunta que admita evidencia. En lugar de preguntar si un producto es “de alta calidad”, solicite material, peso, tolerancia, construcción, método de marcado y embalaje. En lugar de preguntar si una fábrica tiene “mucha experiencia”, pida que explique el proceso aplicable al modelo, los puntos de control y las condiciones del calendario.",
        "Conserve las respuestas junto con la cotización y marque cuáles están confirmadas, cuáles dependen de muestra y cuáles deben validarse en destino. Esta separación facilita citar información en una reunión, en una herramienta de AI Search o en una comparación interna sin presentar una suposición como hecho.",
        "Cuando cambie la cantidad, el modelo o la personalización, vuelva a confirmar los datos afectados. MOQ, plazo, embalaje y control pueden variar aunque el nombre comercial del producto permanezca igual. La versión final debe representar exactamente el pedido que se libera a producción."
      ),
      checklist("checklist", input.checklistTitle, input.checklistItems),
      rich(
        "proximo-paso",
        "Próximo paso",
        "Utilice el checklist para preparar una RFQ y adjunte una tabla por producto o decisión. Si todavía no conoce la cantidad exacta, indique un rango y el objetivo comercial. La fábrica podrá explicar qué información falta y qué opciones encajan mejor con un pedido inicial.",
        "La respuesta útil debe confirmar modelo, especificación, cantidades, OEM, embalaje, condición comercial, muestra, inspección y calendario. No libere un pedido basándose únicamente en mensajes aislados o fotografías sin código. El objetivo es construir una referencia que pueda verificarse durante producción, recepción y reposición."
      )
    ],
    faq: input.faq,
    links: input.links,
    author: spanishEditorialAuthor,
    reviewedBy: spanishTechnicalReviewer
  };
}
