import type {
  ContentEntity,
  ContentManifest,
  LocalizedContentVersion,
  LocalizedImage
} from "../../lib/content/types";
import { ptBrEditorialAuthor, ptBrTechnicalReviewer } from "./pt-br-existing-growth";
import { checklist as ptChecklist, definition as ptDefinition, quick as ptQuick, rich as ptRich, table as ptTable } from "./pt-br-content-helpers";
import { spanishEditorialAuthor, spanishTechnicalReviewer, checklist as esChecklist, definition as esDefinition, quick as esQuick, rich as esRich, table as esTable } from "./es-content-helpers";

const publishedAt = "2026-07-21T08:00:00.000Z";

type ProductProfile = {
  id: string;
  family: "dumbbells" | "plates" | "racks" | "accessories";
  sourceName: string;
  range: string;
  pt: {
    slug: string;
    name: string;
    keyword: string;
    positioning: string;
    audience: string;
    material: string;
    decision: string;
    process: string;
    qc: string;
    comparison: string;
    logistics: string;
    customization: string;
    scenario: string;
  };
  es: {
    slug: string;
    name: string;
    keyword: string;
    positioning: string;
    audience: string;
    material: string;
    decision: string;
    process: string;
    qc: string;
    comparison: string;
    logistics: string;
    customization: string;
    scenario: string;
  };
};

const profiles: ProductProfile[] = [
  {
    id: "product:dumbbells:adjustable-dumbbell-kg",
    family: "dumbbells",
    sourceName: "Adjustable Dumbbell",
    range: "24 kg / 40 kg options",
    pt: {
      slug: "halter-ajustavel",
      name: "Halter ajustável",
      keyword: "fornecedor de halter ajustável",
      positioning: "O halter ajustável concentra várias cargas em uma única unidade e atende linhas de home gym, varejo fitness e salas compactas. Para uma compra B2B, o valor não está apenas na economia de espaço: seleção de carga, encaixe, identificação, base e instruções precisam funcionar de forma consistente durante todo o ciclo de uso.",
      audience: "É indicado para distribuidores, marcas de equipamentos residenciais, redes de varejo e projetos compactos que preferem um SKU de maior valor percebido a uma sequência completa de halteres fixos.",
      material: "A configuração combina placas ou módulos de carga, mecanismo seletor, empunhadura, carcaça e base. Materiais e construção variam conforme o modelo; por isso, o comprador deve aprovar uma unidade identificada, e não assumir que todos os halteres ajustáveis usam o mesmo sistema.",
      decision: "Teste todas as posições de seleção, retirada e retorno à base. Verifique se a indicação corresponde à carga configurada, se peças ficam presas sem folga anormal e se o usuário consegue reconhecer a posição antes de levantar o produto.",
      process: "O fluxo envolve fabricação e acabamento dos componentes de carga, produção da carcaça, montagem do seletor, ajuste da empunhadura, verificação da base e teste de cada configuração. A inspeção final deve repetir mudanças de carga, não apenas pesar a unidade completa.",
      qc: "Controle dimensões de encaixe, movimento do seletor, retenção dos módulos, peso das configurações, acabamento, marcação e integridade da base. Quedas e uso fora das instruções não devem ser confundidos com o ensaio funcional acordado para o modelo.",
      comparison: "Em relação a um conjunto fixo, reduz área e quantidade de SKUs, mas acrescenta mecanismo, peças móveis e orientação de uso. O comprador deve comparar conveniência e valor de venda com manutenção, disponibilidade de peças e risco de uso incorreto.",
      logistics: "A embalagem precisa imobilizar unidade, base e acessórios, proteger o seletor e suportar a concentração de peso. Para varejo, confirme apresentação, manual, etiqueta, código de barras, caixa externa e proteção para remessa individual.",
      customization: "Logotipo, cores, marcação de carga, manual e caixa podem ser avaliados conforme quantidade e modelo. Alterações no seletor, molde ou distribuição interna são desenvolvimento técnico e não devem ser tratadas como simples troca de arte.",
      scenario: "Uma marca que vende para apartamentos deve priorizar dimensões fechadas, estabilidade da base, instruções claras e embalagem para entrega unitária. Uma academia de hotel precisa acrescentar controle de uso, rotina de inspeção e disponibilidade de reposição."
    },
    es: {
      slug: "mancuerna-ajustable",
      name: "Mancuerna ajustable",
      keyword: "proveedor de mancuernas ajustables",
      positioning: "La mancuerna ajustable reúne varias cargas en una sola unidad para líneas de entrenamiento doméstico, comercio especializado y espacios reducidos. En una compra profesional, el mecanismo, la base, el marcado y la experiencia de cambio de peso son tan importantes como el ahorro de espacio.",
      audience: "Está orientada a distribuidores, marcas de home fitness, cadenas minoristas y proyectos de entrenamiento compacto que buscan un producto de mayor valor percibido sin almacenar un juego completo de mancuernas fijas.",
      material: "El conjunto puede incluir módulos de carga, selector, empuñadura, carcasa y bandeja. La solución constructiva cambia entre modelos, por lo que la muestra aprobada debe quedar vinculada al código exacto y no a una categoría genérica.",
      decision: "Pruebe cada posición, la extracción y el retorno a la bandeja. Compruebe que el indicador coincide con la configuración, que las piezas quedan retenidas y que el usuario puede reconocer la selección antes de iniciar el ejercicio.",
      process: "La fabricación integra preparación de cargas, acabados, piezas moldeadas, montaje del selector, ajuste de la empuñadura y comprobación de la base. El control final debe recorrer las distintas configuraciones y no limitarse al peso total.",
      qc: "Revise tolerancias de acoplamiento, recorrido del selector, retención, peso por posición, acabado, identificación y estabilidad. Las condiciones de ensayo se documentan para no convertir un uso indebido o una caída no prevista en una promesa comercial.",
      comparison: "Frente a un juego fijo ahorra superficie y referencias, pero añade piezas móviles, instrucciones y posibles repuestos. La decisión debe equilibrar precio de venta, facilidad de demostración, mantenimiento y comportamiento en el canal previsto.",
      logistics: "El embalaje tiene que inmovilizar producto y bandeja, proteger el mando y soportar peso concentrado. Para comercio electrónico se revisan manual, etiqueta, código, caja exterior y protección ante manipulación individual.",
      customization: "Se pueden estudiar logotipo, color, lectura de pesos, manual y caja según modelo y volumen. Un cambio de mecanismo, molde o arquitectura interna corresponde a desarrollo y requiere validación separada.",
      scenario: "Una marca para viviendas pequeñas necesita medidas cerradas, bandeja estable y entrega unitaria resistente. Un hotel o estudio añade control de usuarios, inspección periódica y un plan de piezas o sustitución."
    }
  },
  {
    id: "product:plates:rubber-competition-bumper-plate",
    family: "plates",
    sourceName: "Rubber Competition Bumper Plate",
    range: "Color KG competition plate sets",
    pt: {
      slug: "anilha-bumper-competicao",
      name: "Anilha bumper de competição",
      keyword: "fabricante de anilha bumper de competição",
      positioning: "A anilha bumper de competição é voltada a áreas de levantamento olímpico e projetos que valorizam identificação por cor, perfil controlado e consistência entre pesos. A palavra competição não substitui dados: diâmetro, espessura, inserto, tolerância e condição de impacto precisam constar na proposta.",
      audience: "Atende boxes, centros de levantamento, academias premium, distribuidores e marcas próprias que precisam montar uma linha colorida em kg com leitura rápida no piso.",
      material: "A construção usa corpo de borracha, inserto metálico central e marcações moldadas ou aplicadas. Dureza, formulação, desenho do centro e espessura são definidos pelo modelo aprovado, sem promessa genérica baseada apenas na cor.",
      decision: "Compare o conjunto completo por peso real, espessura, concentricidade, diâmetro, encaixe na barra e comportamento após impactos definidos. Calcule quantas anilhas cabem na manga da barra antes de escolher pelo visual.",
      process: "A fabricação inclui preparação da borracha, controle de cor, posicionamento do centro, moldagem, cura, rebarbação, ajuste de peso, marcação e estabilização. Mudanças de lote exigem referência de cor e inspeção do centro.",
      qc: "Meça peso, diâmetro, espessura, furo, concentricidade e planicidade. Verifique inserto, trincas, bolhas, separação, legibilidade e resultado de um protocolo de impacto acordado, com equipamento e piso adequados.",
      comparison: "Uma bumper de treino pode oferecer custo menor e maior espessura. A versão de competição só cria valor quando a precisão, o perfil e a organização por cor são relevantes para o programa e comprovados na amostra.",
      logistics: "Separe faces e centros para evitar riscos, organize caixas por peso e mantenha identificação visível no pallet. Peso bruto, limite de caixa, cintamento e distribuição no contêiner são partes da especificação.",
      customization: "Logotipo, números, cores, kg ou lb e embalagem podem ser personalizados conforme molde e MOQ. O comprador deve aprovar cor sob iluminação definida e guardar padrão físico ou referência mensurável para reposição.",
      scenario: "Um centro de levantamento prioriza espessura, precisão e consistência do set; um distribuidor também precisa equilibrar giro por peso, caixa individual, estoque de reposição e apresentação da linha."
    },
    es: {
      slug: "disco-bumper-competicion",
      name: "Disco bumper de competición",
      keyword: "fabricante de discos bumper de competición",
      positioning: "El disco bumper de competición se destina a zonas de halterofilia y proyectos donde importan el reconocimiento por color, el perfil y la coherencia del juego. La denominación comercial no sustituye medidas, inserto, tolerancia ni protocolo de impacto.",
      audience: "Resulta relevante para centros de halterofilia, gimnasios de gama alta, distribuidores y marcas privadas que necesitan una línea en kilogramos con identificación rápida.",
      material: "La construcción combina cuerpo de caucho, inserto metálico y marcados moldeados o aplicados. Dureza, fórmula, diseño del centro y espesor pertenecen a la referencia aprobada y no se deducen solamente por el color.",
      decision: "Compare el juego por peso medido, espesor, concentricidad, diámetro, ajuste en la barra y estado después de impactos definidos. Calcule la capacidad real de la manga antes de valorar solo la estética.",
      process: "El proceso comprende preparación del caucho, control cromático, colocación del centro, moldeo, curado, recorte, ajuste de peso, marcado y estabilización. Los cambios de lote se contrastan con la referencia aprobada.",
      qc: "Mida peso, diámetro, espesor, orificio, concentricidad y planitud. Inspeccione inserto, grietas, burbujas, separación y legibilidad, además del resultado de una prueba acordada con barra, altura y superficie identificadas.",
      comparison: "Un bumper de entrenamiento puede ser más económico y grueso. La versión de competición aporta valor cuando precisión, perfil y sistema cromático son necesarios y están respaldados por datos del modelo.",
      logistics: "Las caras y centros se separan para evitar marcas; las cajas y palés se organizan por peso. El límite por bulto, flejado y reparto de masa en el contenedor se documentan antes de cargar.",
      customization: "Logo, números, colores, kg o lb y embalaje se estudian según molde y MOQ. La aprobación de color debe usar condiciones definidas y conservar una referencia para reposiciones.",
      scenario: "Un centro de halterofilia prioriza precisión y espesor; un distribuidor añade rotación por peso, presentación, inventario de reposición y facilidad de recepción en almacén."
    }
  },
  {
    id: "product:racks:power-rack-functional-trainer",
    family: "racks",
    sourceName: "Power Rack Functional Trainer",
    range: "Rack, cable system, pull-up, and plate storage",
    pt: {
      slug: "power-rack-treinador-funcional",
      name: "Power rack com treinador funcional",
      keyword: "fabricante de power rack com polias",
      positioning: "O power rack com treinador funcional reúne treino com barra, cabos, barra fixa e armazenamento em uma estação. A compra B2B deve partir da planta e do fluxo de usuários, porque a área operacional é maior que a medida externa do equipamento.",
      audience: "É indicado para academias, studios de personal, condomínios, hotéis e distribuidores que precisam oferecer várias modalidades sem instalar máquinas independentes.",
      material: "A configuração combina estrutura tubular de aço, colunas perfuradas, soldas, revestimento, polias, cabos, roldanas, pinos, contrapesos ou carga por anilhas e acessórios. Cada proposta deve identificar o que está incluído.",
      decision: "Confirme altura livre, área de segurança, caminho dos cabos, relação da polia, percurso útil, posições de ajuste, tipo de carga, compatibilidade de acessórios e necessidade de fixação ao piso.",
      process: "Tubos são cortados, perfurados e soldados; a estrutura recebe preparação e pintura; polias, cabos, guias e ferragens são montados para teste. Depois o conjunto é desmontado de forma controlada, identificado e embalado por etapa.",
      qc: "Verifique geometria, soldas, acabamento, alinhamento de furos, movimento dos cabos, ruído de polias, fim de curso, travas, ferragens e lista de peças. Uma montagem piloto ajuda a localizar interferências e instruções incompletas.",
      comparison: "Duas estações independentes podem permitir mais usuários simultâneos e manutenção separada. O sistema integrado economiza espaço, mas exige avaliar gargalos, acesso para serviço e impacto da parada de um componente.",
      logistics: "Perfis longos, painéis e peças pequenas recebem códigos relacionados ao manual. Confirme volumes, peso por caixa, pallet, ordem de abertura, ferramentas de montagem e capacidade de descarga no destino.",
      customization: "Cores da estrutura, placa de logotipo, adesivos, acessórios, pegadores e armazenamento podem ser avaliados. Alterações de geometria, cabo ou carga exigem análise técnica, amostra ou montagem piloto.",
      scenario: "Um studio compacto prioriza variedade por metro quadrado e troca rápida de exercícios; uma academia comercial precisa calcular usuários simultâneos, fila, manutenção, segurança e circulação entre rack e cabos."
    },
    es: {
      slug: "jaula-potencia-entrenador-funcional",
      name: "Jaula de potencia con entrenador funcional",
      keyword: "fabricante de jaula de potencia con poleas",
      positioning: "La jaula de potencia con entrenador funcional integra barra libre, cables, dominadas y almacenamiento. La evaluación profesional empieza por el plano y los recorridos de usuarios, no por una fotografía frontal.",
      audience: "Se dirige a gimnasios, estudios de entrenamiento personal, hoteles, comunidades y distribuidores que buscan varias funciones en una sola estación.",
      material: "El equipo combina perfiles de acero, columnas perforadas, soldadura, recubrimiento, poleas, cables, pasadores, guías, carga por placas o discos y accesorios. La oferta debe enumerar cada componente incluido.",
      decision: "Compruebe altura, zona de seguridad, recorrido de cables, relación de polea, carrera útil, ajustes, sistema de carga, compatibilidad de agarres y requisitos de anclaje.",
      process: "Los perfiles se cortan, perforan y sueldan; después se preparan y recubren. Poleas, cables y herrajes se montan para una prueba funcional antes del desmontaje identificado y el embalaje por secuencia.",
      qc: "Revise geometría, soldaduras, recubrimiento, alineación de orificios, suavidad del cable, ruido, topes, pasadores, tornillería y lista de piezas. Un montaje piloto detecta interferencias e instrucciones ambiguas.",
      comparison: "Dos máquinas separadas pueden atender a más usuarios y aislar una avería. La solución integrada ahorra espacio, pero necesita análisis de colas, acceso de mantenimiento y consecuencias de una parada.",
      logistics: "Perfiles largos, paneles y bolsas de herrajes se codifican de acuerdo con el manual. Se confirman bultos, peso, palé, orden de apertura, herramientas y recursos de descarga.",
      customization: "Color de bastidor, placa de marca, adhesivos, accesorios y almacenamiento pueden estudiarse. Un cambio en geometría, cable o carga requiere revisión técnica y, cuando corresponda, prototipo o montaje piloto.",
      scenario: "Un estudio pequeño prioriza funciones por metro cuadrado; un gimnasio comercial debe calcular uso simultáneo, circulación, seguridad, mantenimiento y disponibilidad de repuestos."
    }
  },
  {
    id: "product:racks:smith-machine",
    family: "racks",
    sourceName: "Smith Machine",
    range: "Guided barbell training station",
    pt: {
      slug: "smith-machine-profissional",
      name: "Smith Machine profissional",
      keyword: "fabricante de Smith Machine profissional",
      positioning: "A Smith Machine utiliza uma barra guiada e pontos de segurança para exercícios de força. Em academias profissionais, sua adequação depende do percurso, da sensação das guias, do acesso às travas e da integração com banco, piso e circulação.",
      audience: "Atende academias comerciais, studios, hotéis e distribuidores que procuram uma estação guiada para diferentes perfis de usuário, sem substituir automaticamente racks de peso livre.",
      material: "A estrutura envolve aço tubular, guias, carro deslizante, barra, ganchos, batentes, suportes de anilhas e ferragens. Superfície, rolamentos ou buchas e sistema de segurança variam conforme o modelo.",
      decision: "Teste o movimento por todo o curso, posição inicial, acesso às travas, distância útil, espaço para banco e altura dos batentes. Confirme também a orientação da guia e como a carga é informada.",
      process: "O processo inclui corte, usinagem, solda e acabamento da estrutura, alinhamento das guias, montagem do carro, instalação das travas e teste funcional. O paralelismo deve ser controlado antes e depois do aperto final.",
      qc: "Inspecione soldas, revestimento, prumo, paralelismo, movimento, ruído, travamento em diferentes alturas, batentes, armazenamento e ferragens. Registre a configuração usada no teste em vez de declarar apenas que a máquina funciona.",
      comparison: "A barra guiada facilita determinados exercícios e controles, enquanto o power rack preserva o caminho livre. Academias completas podem usar ambos; a decisão depende de público, supervisão, programação e espaço.",
      logistics: "Guias e perfis longos precisam de proteção contra impacto e empeno. Identifique pares, lado de montagem, ferragens e pontos de lubrificação; informe peso e recursos necessários para movimentação e instalação.",
      customization: "Cor, logotipo, suportes, armazenamento e alguns acessórios podem ser avaliados. Mudanças de ângulo, curso, sistema de guia ou segurança exigem validação estrutural e funcional específica.",
      scenario: "Uma rede de academias precisa padronizar sensação, manutenção e peças entre unidades. Um distribuidor deve acrescentar manual, embalagem, suporte de montagem e identificação clara de cada versão."
    },
    es: {
      slug: "maquina-smith-profesional",
      name: "Máquina Smith profesional",
      keyword: "fabricante de máquina Smith profesional",
      positioning: "La máquina Smith guía la barra y ofrece posiciones de bloqueo para ejercicios de fuerza. Su valor en un gimnasio depende del recorrido, la sensación de las guías, el acceso a seguros y la compatibilidad con banco y circulación.",
      audience: "Está pensada para gimnasios comerciales, estudios, hoteles y distribuidores que buscan una estación guiada para distintos usuarios, sin asumir que reemplaza todas las funciones de una jaula libre.",
      material: "Incluye bastidor tubular, guías, carro, barra, ganchos, topes, soportes de discos y herrajes. El acabado, los casquillos o rodamientos y el sistema de seguridad dependen de la referencia.",
      decision: "Pruebe toda la carrera, el inicio, los bloqueos, el espacio para banco y la altura de topes. Confirme orientación de guía, carga utilizada en ensayos y margen de trabajo del usuario.",
      process: "Corte, mecanizado, soldadura y recubrimiento preceden a la alineación de guías, montaje del carro, colocación de seguros y prueba. El paralelismo se revisa antes y después del apriete definitivo.",
      qc: "Inspeccione soldaduras, pintura, verticalidad, paralelismo, movimiento, ruido, bloqueo a varias alturas, topes, almacenamiento y tornillería. El informe debe identificar la configuración ensayada.",
      comparison: "La barra guiada facilita determinados movimientos; la jaula de potencia mantiene una trayectoria libre. Un centro puede necesitar ambas según usuarios, supervisión, programación y superficie.",
      logistics: "Guías y perfiles largos se protegen frente a golpes y deformación. Se identifican lados, pares, herrajes y puntos de mantenimiento, junto con peso y medios de instalación.",
      customization: "Color, logotipo, soportes y accesorios pueden valorarse. Cambios de ángulo, recorrido, guía o seguridad requieren validación estructural y funcional separada.",
      scenario: "Una cadena necesita la misma sensación y repuestos entre centros. Un distribuidor añade manual, embalaje, soporte de montaje y control de versiones para evitar mezclar componentes."
    }
  },
  {
    id: "product:racks:commercial-adjustable-bench",
    family: "racks",
    sourceName: "Commercial Adjustable Bench",
    range: "Multi-angle commercial bench",
    pt: {
      slug: "banco-regulavel-profissional",
      name: "Banco regulável profissional",
      keyword: "fabricante de banco regulável para academia",
      positioning: "O banco regulável profissional oferece múltiplos ângulos para treino com halteres, racks e cabos. A qualidade percebida pelo usuário depende de estabilidade, ajuste intuitivo, altura, espaço entre almofadas e facilidade de movimentação.",
      audience: "É destinado a academias, studios, hotéis, condomínios e distribuidores que precisam de bancos compartilhados em áreas de peso livre e estações de força.",
      material: "A construção combina estrutura de aço, eixo ou cremalheira de ajuste, pinos, almofadas, espuma, revestimento, rodas, pés e alça. Espessura, densidade e costura devem ser confirmadas no modelo real.",
      decision: "Avalie todos os ângulos, altura na posição plana, folga entre assento e encosto, apoio dos pés, largura das almofadas, acesso à alça e compatibilidade dentro do rack.",
      process: "Tubos são cortados e soldados, pontos de ajuste são usinados, a estrutura recebe acabamento e as almofadas são produzidas e fixadas. Montagem, nivelamento, ajuste e movimentação completam a verificação.",
      qc: "Controle planicidade, soldas, revestimento, folga lateral, engate do pino, contato dos pés, rodas, alça, densidade, costuras e fixação das almofadas. Um banco vazio sem oscilação pode se comportar diferente sob uso.",
      comparison: "Um banco fixo é simples e pode ser reservado para uma estação. O regulável amplia exercícios e mobilidade, mas possui mais pontos de inspeção e exige escolher uma geometria que funcione com os racks existentes.",
      logistics: "Proteja cantos, rodas, alça e estofado contra pressão e perfuração. Defina se o banco viaja montado ou parcialmente desmontado e quanto tempo, espaço e ferramenta serão necessários no recebimento.",
      customization: "Estrutura, revestimento, costura, logotipo bordado ou aplicado e embalagem podem seguir uma identidade visual. Cores e materiais precisam ser aprovados por amostra física adequada à limpeza prevista.",
      scenario: "Uma academia de alto fluxo prioriza ajuste rápido, mobilidade e reposição de estofado. Um hotel pode priorizar acabamento e baixa complexidade, enquanto o distribuidor precisa equilibrar cubagem e montagem."
    },
    es: {
      slug: "banco-ajustable-profesional",
      name: "Banco ajustable profesional",
      keyword: "fabricante de banco ajustable para gimnasio",
      positioning: "El banco ajustable profesional ofrece varios ángulos para mancuernas, racks y cables. La experiencia depende de estabilidad, ajuste intuitivo, altura, separación de almohadillas y facilidad para moverlo.",
      audience: "Se dirige a gimnasios, estudios, hoteles, comunidades y distribuidores que necesitan bancos compartidos entre la zona de peso libre y distintas estaciones.",
      material: "Combina bastidor de acero, eje o cremallera, pasadores, espuma, tapizado, ruedas, apoyos y asa. Espesor, densidad, costuras y fijaciones se comprueban sobre la referencia exacta.",
      decision: "Revise todos los ángulos, altura en plano, hueco entre asiento y respaldo, posición de pies, anchura, acceso al asa y compatibilidad dentro de una jaula.",
      process: "Los tubos se cortan y sueldan, se mecanizan puntos de ajuste, se aplica el acabado y se fabrican almohadillas. Montaje, nivelación, cambio de ángulo y desplazamiento completan la prueba.",
      qc: "Controle planitud, soldaduras, pintura, holgura lateral, cierre del pasador, contacto de apoyos, ruedas, asa, densidad, costuras y fijación. La prueba debe incluir carga en diferentes posiciones.",
      comparison: "Un banco fijo simplifica una estación. El ajustable amplía ejercicios y movilidad, pero incorpora más mantenimiento y debe encajar con las dimensiones de racks ya instalados.",
      logistics: "Proteja esquinas, ruedas, asa y tapizado frente a presión o perforación. Defina si viaja montado, tiempo de montaje, herramientas, volumen y acceso de recepción.",
      customization: "Bastidor, tapizado, costura, logotipo y caja pueden seguir la identidad del comprador. Color y material se aprueban con muestra compatible con el método de limpieza previsto.",
      scenario: "Un gimnasio de alta rotación prioriza rapidez de ajuste, ruedas y recambio de tapicería. Un hotel valora sencillez y acabado; un distribuidor añade cubaje y facilidad de montaje."
    }
  },
  {
    id: "product:accessories:cast-iron-kettlebell",
    family: "accessories",
    sourceName: "Cast Iron Kettlebell",
    range: "4 kg to 32 kg planning",
    pt: {
      slug: "kettlebell-ferro-fundido",
      name: "Kettlebell de ferro fundido",
      keyword: "kettlebell de ferro fundido atacado",
      positioning: "O kettlebell de ferro fundido é uma peça compacta para treino funcional, aulas e força. Para atacado, o comprador deve avaliar a linha completa: espaço da alça, base, superfície, peso real, identificação e consistência visual entre tamanhos.",
      audience: "Atende distribuidores, academias, studios, boxes, hotéis e marcas que precisam de uma faixa comercial de acessórios com reposição simples.",
      material: "A peça utiliza corpo de ferro fundido com alça integrada e superfície pintada ou revestida conforme o modelo. A linha pode variar de forma entre pesos; essa variação deve ser mostrada antes da aprovação.",
      decision: "Meça diâmetro e espaço interno da alça, verifique acabamento de emendas, base plana, estabilidade, marcação e diferença de geometria entre cargas leves e pesadas.",
      process: "O fluxo inclui fundição, remoção de canais, correção da base, esmerilhamento da alça, ajuste de peso, limpeza, tratamento de superfície, marcação e cura ou secagem.",
      qc: "Procure trincas, poros críticos, arestas, saliências na alça, oscilação da base, falhas de pintura e divergência entre peso medido e marcação. A inspeção deve abranger extremos e pesos de maior giro.",
      comparison: "Modelos de vinil podem proteger melhor certas superfícies; kettlebells de competição mantêm dimensões externas mais constantes. O ferro fundido tradicional prioriza simplicidade, variedade e custo, mas exige cuidado com piso e oxidação.",
      logistics: "A alça e a base concentram esforço no cartão. Use apoio interno, limite de peso por caixa, identificação visível e pallet que evite movimento. Planeje como os funcionários retirarão unidades pesadas.",
      customization: "Cor geral, anel de identificação, logotipo, números, etiqueta e caixa podem ser avaliados. Marca em alto-relevo ou nova forma pode exigir molde e quantidade diferente de uma personalização superficial.",
      scenario: "Uma academia monta a faixa pela frequência de uso e pode duplicar pesos intermediários. Um distribuidor calcula giro, quantidade por caixa, padrão de cor e disponibilidade futura para completar conjuntos."
    },
    es: {
      slug: "kettlebell-hierro-fundido",
      name: "Kettlebell de hierro fundido",
      keyword: "kettlebell de hierro fundido al por mayor",
      positioning: "El kettlebell de hierro fundido es una pieza compacta para entrenamiento funcional, clases y fuerza. La compra mayorista debe valorar la gama completa: espacio del asa, base, superficie, peso real e identificación.",
      audience: "Resulta útil para distribuidores, gimnasios, estudios, centros funcionales, hoteles y marcas que requieren una gama comercial con reposición ordenada.",
      material: "Utiliza cuerpo de hierro fundido con asa integrada y acabado pintado o recubierto según modelo. La forma puede cambiar entre pesos, algo que debe mostrarse en la aprobación de la gama.",
      decision: "Mida diámetro y hueco del asa, revise uniones, base plana, estabilidad, marcado y cambios de geometría entre cargas ligeras y pesadas.",
      process: "La fabricación comprende fundición, retirada de canales, rectificado de base, pulido del asa, ajuste de peso, limpieza, tratamiento superficial, marcado y curado o secado.",
      qc: "Busque grietas, poros relevantes, aristas, salientes en el agarre, balanceo, pintura incompleta y diferencia entre peso medido e indicado. Incluya extremos y referencias de mayor rotación.",
      comparison: "El vinilo puede proteger mejor algunas superficies; los modelos de competición mantienen dimensiones más uniformes. El hierro fundido tradicional prioriza sencillez y coste, pero requiere controlar suelo y humedad.",
      logistics: "Asa y base cargan el cartón en puntos concretos. Se usa soporte interno, límite por bulto, identificación y palé estable, considerando cómo se manipularán las unidades pesadas.",
      customization: "Color, anillo, logotipo, números, etiqueta y caja pueden estudiarse. Un relieve o nueva forma puede necesitar molde y MOQ distintos de una personalización superficial.",
      scenario: "Un gimnasio configura pesos por frecuencia y duplica tramos populares. Un distribuidor añade rotación, unidades por caja, código cromático y continuidad para completar juegos futuros."
    }
  }
];

const familyRoots = {
  pt: {
    dumbbells: ["/pt/produtos/halteres", "dumbbells-category", "Halteres profissionais"],
    plates: ["/pt/produtos/anilhas", "weight-plates-category", "Anilhas e bumper plates"],
    racks: ["/pt/produtos/racks-e-bancos", "racks-benches-category", "Racks e bancos"],
    accessories: ["/pt/produtos/acessorios-de-academia", "gym-accessories-category", "Acessórios de academia"]
  },
  es: {
    dumbbells: ["/es/productos/mancuernas", "dumbbells-category", "Mancuernas"],
    plates: ["/es/productos/discos-de-peso", "weight-plates-category", "Discos y bumper plates"],
    racks: ["/es/productos/racks-y-bancos", "racks-benches-category", "Racks y bancos"],
    accessories: ["/es/productos/accesorios-de-gimnasio", "gym-accessories-category", "Accesorios de gimnasio"]
  }
} as const;

function imageSet(entity: ContentEntity, profile: ProductProfile, locale: "pt-BR" | "es"): LocalizedImage[] {
  const first = entity.versions.en?.images[0]?.src;
  if (!first) throw new Error(`Missing real English image for ${profile.id}`);
  const isPlate = profile.family === "plates";
  const isRack = profile.family === "racks";
  const support = isPlate
    ? ["/assets/factory-process/plate-raw-material.webp", "/assets/factory-process/plate-surface-treatment.webp"]
    : isRack
      ? ["/assets/factory-process/dumbbell-cutting.webp", "/assets/factory-cases/packaging-area-pbf.webp"]
      : ["/assets/factory-process/dumbbell-material.webp", "/assets/factory-cases/packaging-area-pbf.webp"];
  const name = locale === "pt-BR" ? profile.pt.name : profile.es.name;
  const alts = locale === "pt-BR"
    ? [`${name} para fornecimento comercial B2B`, `Processo real relacionado à fabricação de ${name}`, `Preparação de embalagem para exportação de ${name}`]
    : [`${name} para suministro comercial B2B`, `Proceso real relacionado con la fabricación de ${name}`, `Preparación del embalaje de exportación de ${name}`];
  return [first, ...support].map((src, index) => ({
    id: `${locale}-${profile.id}-image-${index + 1}`,
    src,
    alt: alts[index],
    caption: locale === "pt-BR"
      ? "Imagem real de produto ou processo existente da PowerBaseFit; a configuração final depende da especificação aprovada."
      : "Imagen real de producto o proceso existente de PowerBaseFit; la configuración final depende de la especificación aprobada."
  }));
}

function base(version: Omit<LocalizedContentVersion, "translationStatus" | "reviewStatus" | "publishStatus" | "canonicalData" | "hreflangData" | "updatedAt" | "publishedAt" | "version">): LocalizedContentVersion {
  return {
    ...version,
    translationStatus: "localized",
    reviewStatus: "approved",
    publishStatus: "published",
    canonicalData: { mode: "self" },
    hreflangData: { include: true },
    updatedAt: publishedAt,
    publishedAt,
    version: 1
  };
}

function portugueseVersion(entity: ContentEntity, profile: ProductProfile): LocalizedContentVersion {
  const p = profile.pt;
  const root = familyRoots.pt[profile.family];
  const path = `${root[0]}/${p.slug}`;
  const images = imageSet(entity, profile, "pt-BR");
  return base({
    locale: "pt-BR",
    slug: p.slug,
    publicPath: path,
    title: `${p.name}: fabricante e fornecimento B2B | PowerBaseFit`,
    description: `${p.keyword} com especificação, materiais, QC, embalagem de exportação, OEM, marca própria e suporte direto de fábrica para compradores B2B.`,
    h1: `${p.name} para fornecimento comercial e marca própria`,
    body: [
      ptQuick("resposta", `${p.positioning} A PowerBaseFit prepara a cotação a partir do modelo, quantidades, aplicação, personalização e destino; nenhum limite técnico é presumido sem confirmação do produto.`),
      ptDefinition("definicao", p.name, `${p.name} é a denominação comercial desta família de produto. Para transformar o nome em uma especificação comprável, é necessário registrar configuração, ${profile.range}, materiais, dimensões aplicáveis, acabamento, itens incluídos, embalagem e critérios de aceitação.`),
      ptRich("posicionamento", "Posicionamento e valor comercial", p.positioning, `Para o comprador brasileiro, uma proposta útil separa o que é padrão, o que pode ser personalizado e o que exige desenvolvimento. ${p.scenario} O objetivo é comparar fornecedores pelo mesmo escopo e reduzir ajustes depois do depósito.`),
      ptRich("aplicacoes", "Aplicações e clientes indicados", p.audience, `O briefing deve indicar fluxo de usuários, intensidade, ambiente, canal de venda e expectativa de reposição. Academias avaliam operação e manutenção; distribuidores consideram giro, caixa e continuidade; marcas próprias acrescentam consistência visual, arquivos e controle de versão.`),
      ptRich("material", "Materiais e construção", p.material, `Não use apenas termos como “profissional” ou “heavy duty”. Peça composição, estrutura, interfaces críticas e desenho ou ficha do modelo. A amostra aprovada deve receber código e data para que mudanças de matéria-prima, acabamento ou componente sejam comunicadas antes da produção.`),
      ptTable("especificacoes", "Tabela de especificações para cotação", ["Item", "Base disponível", "Confirmar no pedido"], [["Produto", p.name, "Código e configuração"], ["Faixa", profile.range, "Unidades, incrementos ou opções"], ["Material", p.material.split(".")[0], "Construção e acabamento"], ["Uso", p.audience.split(".")[0], "Ambiente e intensidade"], ["OEM", "Logo, cores e embalagem sob análise", "Método, posição, MOQ e amostra"], ["QC", "Inspeção ligada à especificação", "Método, tolerância e amostragem"]], `Dados comerciais e técnicos de ${p.name}`),
      ptRich("decisao", "Critérios que definem a compra", p.decision, `Peça que cada proposta responda às mesmas perguntas. Registre números com unidade, identifique componentes opcionais e confirme se preços incluem acessórios, embalagem, pallet e montagem. Uma foto semelhante não garante a mesma estrutura ou o mesmo desempenho.`),
      ptTable("comparacao", "Comparação de propostas", ["Critério", "Resposta insuficiente", "Resposta verificável"], [["Modelo", "Igual à foto", "Código, desenho e itens incluídos"], ["Material", "Qualidade premium", "Construção e referência aprovada"], ["Desempenho", "Uso comercial", "Condição, método e limite confirmado"], ["Personalização", "Logo possível", "Processo, arte, amostra, MOQ e prazo"], ["Embalagem", "Caixa de exportação", "Peso, dimensões, unidades e pallet"]]),
      ptRich("processo", "Processo de fabricação", p.process, `O pedido deve ligar cada etapa crítica ao resultado esperado. Registros de material, ajuste, montagem, inspeção e embalagem ajudam a identificar onde uma variação começou. Se houver terceirização, confirme qual empresa controla especificação, recebimento e não conformidades.`),
      ptRich("qc", "Controle de qualidade", p.qc, `O plano de QC define identidade, quantidade, medidas, função, aparência, marca e embalagem. A amostragem e os limites são acordados antes da produção. Fotos sem código, lote, escala ou critério não substituem medição; uma inspeção independente pode ser considerada conforme risco e valor.`),
      ptRich("comparacao-produto", "Alternativas e limites de uso", p.comparison, `Não existe uma escolha universal. Compare custo posto, espaço, manutenção, treinamento do usuário, reposição e compatibilidade com o restante do projeto. A página não promete vida útil fixa porque frequência, ambiente, carga, limpeza e manutenção alteram o resultado.`),
      ptRich("embalagem", "Embalagem, transporte e recebimento", p.logistics, `Antes do embarque, confira quantidade por caixa, peso líquido e bruto, dimensões, etiqueta, pallet e plano de carregamento. No Brasil, o importador deve calcular frete, seguro, tributos, despesas de destino, transporte interno, descarga e armazenamento conforme a condição comercial contratada.`),
      ptRich("oem", "OEM, ODM e marca própria", p.customization, `O fluxo começa com briefing e arte vetorial, segue para análise técnica, amostra, aprovação documentada, produção, inspeção e embarque. Logotipo simples não transforma automaticamente o projeto em ODM. Mudanças de engenharia, molde ou ferramenta precisam de escopo, propriedade, custo e prazo separados.`),
      ptRich("experiencia", "Informação de primeira parte da fábrica", `Na análise de ${p.name}, a PowerBaseFit conecta lista de SKUs, amostra, arte, produção, QC e packing list pela mesma referência. Diferenças entre unidade e par, kg e lb, cor padrão e cor especial ou embalagem comum e personalizada são esclarecidas antes da cotação.`, `Para reposição, o comprador deve guardar código, fotos aprovadas, medidas, arquivos, lote e relatório. Um novo pedido não deve depender apenas do nome comercial; a referência anterior permite verificar consistência e tratar qualquer mudança de forma explícita.`),
      ptChecklist("checklist", "Checklist do comprador", ["Definir aplicação, usuários e canal", "Listar SKU, faixa e quantidade", "Confirmar materiais e construção", "Identificar componentes e acessórios incluídos", "Aprovar amostra e arquivos de marca", "Definir medidas, função e aparência aceitáveis", "Confirmar caixa, pallet e peso bruto", "Informar destino e Incoterm desejado", "Planejar instalação, manutenção ou reposição", "Registrar procedimento para mudanças e não conformidades"]),
      ptRich("cotacao", "Como solicitar uma cotação", `Envie o link ou código de ${p.name}, quantidades por opção, aplicação, personalização, embalagem, destino e prazo. A equipe responderá com pontos que precisam de confirmação antes de preço, MOQ, amostra e cronograma.`, `Uma cotação comparável deve indicar moeda, validade, condição comercial, escopo, itens opcionais e premissas. Antes de autorizar produção, consolide produto, arte, embalagem e inspeção em documentos com versão.`)
    ],
    faq: [
      { id: "faq-1", question: `Qual é o MOQ de ${p.name}?`, answer: "O MOQ depende do modelo, das opções, do mix, do logotipo, da cor e da embalagem. Envie a lista de quantidades para separar a condição padrão da condição personalizada." },
      { id: "faq-2", question: "É possível solicitar amostra antes da produção?", answer: "Sim, quando a configuração e a disponibilidade permitirem. A amostra deve ter objetivos de aprovação definidos e seus custos, transporte, versão e alterações precisam ser registrados." },
      { id: "faq-3", question: "Como a qualidade é verificada?", answer: "A inspeção segue a especificação aprovada e pode incluir identidade, medidas, peso, função, superfície, marcação, quantidade e embalagem. O plano exato depende do produto e do risco." },
      { id: "faq-4", question: "A PowerBaseFit oferece marca própria?", answer: "Logo, cor, etiqueta e embalagem podem ser avaliados conforme modelo e volume. Mudanças estruturais exigem revisão técnica, amostra e condições específicas." },
      { id: "faq-5", question: "Quais dados são necessários para o frete ao Brasil?", answer: "Informe cidade ou porto, quantidades, embalagem desejada e Incoterm. A responsabilidade por classificação, importação e requisitos locais deve ser confirmada pelo importador." }
    ],
    author: ptBrEditorialAuthor,
    reviewedBy: ptBrTechnicalReviewer,
    schemaData: {
      sku: entity.versions.en?.schemaData.sku ?? `PBF-${profile.sourceName.toUpperCase().replace(/[^A-Z0-9]+/g, "-")}`,
      brand: "PowerBaseFit",
      manufacturer: "PowerBaseFit",
      material: p.material,
      category: root[2],
      specifications: [{ name: "Produto", value: p.name }, { name: "Faixa", value: profile.range }, { name: "Mercado", value: "Brasil — compras B2B" }],
      breadcrumbs: [{ name: "Início", path: "/pt" }, { name: "Produtos", path: "/pt/produtos" }, { name: root[2], path: root[0] }, { name: p.name, path }],
      extra: { primaryKeyword: p.keyword, searchIntent: "avaliação comercial e solicitação de cotação" }
    },
    images,
    internalLinks: [{ targetContentId: root[1], label: root[2] }, { targetContentId: "factory", label: "Fabricação e controle de qualidade" }, { targetContentId: "oem-private-label", label: "OEM e marca própria" }, { targetContentId: "contact", label: "Solicitar cotação B2B" }]
  });
}

function spanishVersion(entity: ContentEntity, profile: ProductProfile): LocalizedContentVersion {
  const p = profile.es;
  const root = familyRoots.es[profile.family];
  const path = `${root[0]}/${p.slug}`;
  const images = imageSet(entity, profile, "es");
  return base({
    locale: "es",
    slug: p.slug,
    publicPath: path,
    title: `${p.name}: fabricante y suministro B2B | PowerBaseFit`,
    description: `${p.keyword} con especificaciones, materiales, QC, embalaje, OEM, marca propia y soporte de fábrica para compradores profesionales.`,
    h1: `${p.name} para suministro comercial y marca propia`,
    body: [
      esQuick("respuesta", `${p.positioning} PowerBaseFit prepara la oferta a partir del modelo, cantidades, aplicación, personalización y destino; ningún límite técnico se da por confirmado sin identificar la referencia.`),
      esDefinition("definicion", p.name, `${p.name} es la denominación comercial de esta familia. Para convertirla en una especificación de compra se documentan configuración, ${profile.range}, materiales, dimensiones aplicables, acabado, elementos incluidos, embalaje y criterios de aceptación.`),
      esRich("posicionamiento", "Posicionamiento y valor para el comprador", p.positioning, `En España y Latinoamérica, una oferta útil separa producto estándar, personalización y desarrollo. ${p.scenario} Esta separación permite comparar proveedores con el mismo alcance y evita cambios tardíos después del anticipo.`),
      esRich("aplicaciones", "Aplicaciones y compradores", p.audience, `El briefing debe explicar tráfico, intensidad, entorno, canal y reposición. El operador estudia uso y mantenimiento; el distribuidor añade rotación, caja y continuidad; una marca privada necesita además coherencia visual, archivos vigentes y control de versiones.`),
      esRich("material", "Materiales y construcción", p.material, `Expresiones como “profesional” o “alta resistencia” no sustituyen datos. Solicite composición, estructura, interfaces críticas y ficha o dibujo. La muestra aprobada debe tener código y fecha para controlar cambios de material, acabado o componente.`),
      esTable("especificaciones", "Tabla para solicitar especificaciones", ["Elemento", "Base disponible", "Confirmar en pedido"], [["Producto", p.name, "Código y configuración"], ["Rango", profile.range, "Unidades, opciones o incrementos"], ["Material", p.material.split(".")[0], "Construcción y acabado"], ["Uso", p.audience.split(".")[0], "Entorno e intensidad"], ["OEM", "Logo, colores y caja sujetos a revisión", "Método, posición, MOQ y muestra"], ["QC", "Inspección ligada a especificación", "Método, tolerancia y muestreo"]], `Información comercial y técnica de ${p.name}`),
      esRich("decision", "Criterios de decisión", p.decision, `Haga que cada oferta responda a las mismas preguntas. Añada unidades a todos los números, identifique opcionales y confirme si precio incluye accesorios, embalaje, palé o montaje. Una imagen parecida no demuestra la misma construcción.`),
      esTable("comparacion", "Comparación de ofertas", ["Criterio", "Respuesta insuficiente", "Respuesta comprobable"], [["Modelo", "Como en la foto", "Código, dibujo y contenido"], ["Material", "Calidad prémium", "Construcción y referencia aprobada"], ["Rendimiento", "Uso comercial", "Condición, método y límite"], ["Personalización", "Logo disponible", "Proceso, arte, muestra, MOQ y plazo"], ["Embalaje", "Caja de exportación", "Peso, medidas, unidades y palé"]]),
      esRich("proceso", "Proceso de fabricación", p.process, `Cada etapa crítica debe relacionarse con un resultado. Los registros de material, ajuste, montaje, inspección y embalaje permiten localizar una variación. Si intervienen terceros, confirme quién controla especificación, recepción y no conformidades.`),
      esRich("qc", "Control de calidad", p.qc, `El plan de control define identidad, cantidad, medidas, función, apariencia, marca y embalaje. Muestreo y límites se acuerdan antes de fabricar. Las fotos sin código, lote, escala o criterio no sustituyen mediciones; según riesgo puede considerarse una inspección independiente.`),
      esRich("alternativas", "Alternativas y límites", p.comparison, `No existe una opción universal. Compare coste puesto, superficie, mantenimiento, formación, repuestos y compatibilidad con el proyecto. No se promete una vida útil fija porque frecuencia, ambiente, carga, limpieza y mantenimiento cambian el resultado.`),
      esRich("embalaje", "Embalaje, transporte y recepción", p.logistics, `Antes del envío confirme unidades por caja, pesos neto y bruto, medidas, etiqueta, palé y carga. El importador debe calcular transporte, seguro, aduana, impuestos, gastos de destino, entrega interior, descarga y almacenamiento según el Incoterm.`),
      esRich("oem", "OEM, ODM y marca privada", p.customization, `El flujo pasa por briefing, archivos vectoriales, revisión técnica, muestra, aprobación, serie, inspección y envío. Un logotipo no convierte por sí solo el proyecto en ODM. Cambios de ingeniería, molde o herramienta necesitan alcance, propiedad, coste y calendario propios.`),
      esRich("experiencia", "Información directa de fabricación", `Al revisar ${p.name}, PowerBaseFit conecta SKU, muestra, arte, producción, QC y packing list con la misma referencia. Diferencias entre unidad y pareja, kg y lb, color estándar y especial o caja común y personalizada se aclaran antes de cotizar.`, `Para reposiciones, el comprador conserva código, fotos aprobadas, medidas, archivos, lote e informe. Un pedido nuevo no debe depender del nombre comercial; la referencia anterior permite comprobar coherencia y aprobar cualquier cambio.`),
      esChecklist("checklist", "Lista de comprobación del comprador", ["Definir aplicación, usuarios y canal", "Listar SKU, rango y cantidades", "Confirmar materiales y construcción", "Identificar componentes incluidos", "Aprobar muestra y archivos de marca", "Definir medidas, función y apariencia aceptables", "Confirmar caja, palé y peso bruto", "Indicar destino e Incoterm", "Planificar instalación, mantenimiento o repuestos", "Acordar cambios y no conformidades"]),
      esRich("cotizacion", "Cómo solicitar cotización", `Envíe el enlace o código de ${p.name}, cantidades, aplicación, personalización, embalaje, destino y fecha objetivo. El equipo separará los puntos abiertos antes de confirmar precio, MOQ, muestra y calendario.`, `Una oferta comparable indica moneda, validez, condición, alcance, opcionales y supuestos. Antes de autorizar la serie, producto, arte, embalaje e inspección deben quedar consolidados y versionados.`)
    ],
    faq: [
      { id: "faq-1", question: `¿Cuál es el MOQ de ${p.name}?`, answer: "Depende del modelo, opciones, mezcla, logotipo, color y embalaje. Envíe cantidades por referencia para separar condiciones estándar y personalizadas." },
      { id: "faq-2", question: "¿Se puede revisar una muestra antes de producir?", answer: "Sí, cuando la configuración y disponibilidad lo permitan. Deben definirse objetivo, coste, transporte, versión y correcciones de la muestra." },
      { id: "faq-3", question: "¿Cómo se controla la calidad?", answer: "La inspección sigue la especificación aprobada y puede cubrir identidad, dimensiones, peso, función, superficie, marcado, cantidad y embalaje. El plan depende del producto y del riesgo." },
      { id: "faq-4", question: "¿PowerBaseFit ofrece marca privada?", answer: "Logo, color, etiqueta y caja pueden estudiarse según referencia y volumen. Los cambios estructurales requieren revisión técnica y condiciones propias." },
      { id: "faq-5", question: "¿Qué datos se necesitan para calcular el transporte?", answer: "Indique ciudad o puerto, cantidades, embalaje e Incoterm. El importador confirma clasificación y obligaciones aplicables en su mercado." }
    ],
    author: spanishEditorialAuthor,
    reviewedBy: spanishTechnicalReviewer,
    schemaData: {
      sku: entity.versions.en?.schemaData.sku ?? `PBF-${profile.sourceName.toUpperCase().replace(/[^A-Z0-9]+/g, "-")}`,
      brand: "PowerBaseFit",
      manufacturer: "PowerBaseFit",
      material: p.material,
      category: root[2],
      specifications: [{ name: "Producto", value: p.name }, { name: "Rango", value: profile.range }, { name: "Mercado", value: "España y Latinoamérica — compra B2B" }],
      breadcrumbs: [{ name: "Inicio", path: "/es" }, { name: "Productos", path: "/es/productos" }, { name: root[2], path: root[0] }, { name: p.name, path }],
      extra: { primaryKeyword: p.keyword, searchIntent: "evaluación comercial y solicitud de oferta" }
    },
    images,
    internalLinks: [{ targetContentId: root[1], label: root[2] }, { targetContentId: "factory", label: "Fabricación y control de calidad" }, { targetContentId: "oem-private-label", label: "OEM y marca privada" }, { targetContentId: "contact", label: "Solicitar cotización B2B" }]
  });
}

export function withCommercialCompletionA(manifest: ContentManifest): ContentManifest {
  const byId = new Map(profiles.map((profile) => [profile.id, profile]));
  const found = new Set<string>();
  const entities = manifest.entities.map((entity) => {
    const profile = byId.get(entity.id);
    if (!profile) return entity;
    found.add(entity.id);
    if (entity.versions["pt-BR"] || entity.versions.es) throw new Error(`Commercial completion duplicates ${entity.id}`);
    return {
      ...entity,
      versions: {
        ...entity.versions,
        "pt-BR": portugueseVersion(entity, profile),
        es: spanishVersion(entity, profile)
      }
    };
  });
  const missing = profiles.filter((profile) => !found.has(profile.id));
  if (missing.length) throw new Error(`Commercial completion references unknown entities: ${missing.map((item) => item.id).join(", ")}`);
  return { ...manifest, entities };
}

export const commercialCompletionAProfiles = profiles;
