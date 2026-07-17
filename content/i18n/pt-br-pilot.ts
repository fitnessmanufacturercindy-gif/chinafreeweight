import type {
  ContentBlock,
  ContentEntity,
  ContentManifest,
  LocalizedContentVersion,
  LocalizedFaq,
  LocalizedImage,
  LocalizedInternalLink
} from "../../lib/content/types";
import { existingBlogEnhancements } from "./pt-br-existing-blogs";
import { existingPageEnhancements } from "./pt-br-existing-growth";
import { ptBrCommercialPages } from "./pt-br-commercial-pages";
import { contentSupplements } from "./pt-br-content-supplements";
import { ptBrGrowthBlogsA } from "./pt-br-growth-blogs-a";
import { ptBrGrowthBlogsB } from "./pt-br-growth-blogs-b";
import { productLocalizationBatch1Portuguese } from "./product-localization-batch-1-pt";
import { seoExpansionPortuguesePages } from "./seo-expansion-pt";
import type { PilotPage } from "./pt-br-types";

const updatedAt = "2026-07-14T08:00:00.000Z";
const publishedAt = "2026-07-14T08:00:00.000Z";

function faq(items: Array<[string, string]>): LocalizedFaq[] {
  return items.map(([question, answer], index) => ({ id: `faq-${index + 1}`, question, answer }));
}

function body(items: Array<[string, string]>, contact: boolean): ContentBlock[] {
  const blocks: ContentBlock[] = items.map(([heading, content], index) => ({
    id: `section-${index + 1}`,
    type: "rich_text",
    heading,
    content
  }));
  if (contact) blocks.push({ id: "inquiry-form", type: "custom", heading: "Conte seu projeto", data: { component: "inquiry-form" } });
  return blocks;
}

function localizedBody(page: PilotPage): ContentBlock[] {
  const blocks = page.blocks ? [...page.blocks] : body(page.sections ?? [], false);
  if (page.type === "contact") blocks.push({ id: "inquiry-form", type: "custom", heading: "Conte seu projeto", data: { component: "inquiry-form" } });
  return blocks;
}

function portugueseBreadcrumbs(page: PilotPage) {
  const breadcrumbs = [{ name: "Início", path: "/pt" }];
  if (page.ptPath === "/pt") return breadcrumbs;
  if (page.type === "blog") breadcrumbs.push({ name: "Blog", path: "/pt/blog" });
  if (page.ptPath.startsWith("/pt/produtos")) {
    breadcrumbs.push({ name: "Produtos", path: "/pt/produtos" });
    if (page.ptPath.startsWith("/pt/produtos/halteres/") || page.ptPath === "/pt/produtos/halteres") breadcrumbs.push({ name: "Halteres", path: "/pt/produtos/halteres" });
    if (page.ptPath.startsWith("/pt/produtos/anilhas/") || page.ptPath === "/pt/produtos/anilhas") breadcrumbs.push({ name: "Anilhas", path: "/pt/produtos/anilhas" });
  }
  if (breadcrumbs.at(-1)?.path !== page.ptPath) breadcrumbs.push({ name: page.h1, path: page.ptPath });
  return breadcrumbs;
}

function image(item?: [string, string]): LocalizedImage[] {
  return item ? [{ id: "principal", src: item[0], alt: item[1] }] : [];
}

function links(items: Array<[string, string]>): LocalizedInternalLink[] {
  return items.map(([targetContentId, label]) => ({ targetContentId, label }));
}

function publishedVersion(page: PilotPage, locale: "en" | "pt-BR"): LocalizedContentVersion {
  const portuguese = locale === "pt-BR";
  const publicPath = portuguese ? page.ptPath : page.enPath!;
  return {
    locale,
    translationStatus: portuguese ? "localized" : "published",
    reviewStatus: "approved",
    publishStatus: "published",
    slug: publicPath.split("/").filter(Boolean).at(-1) ?? "home",
    publicPath,
    title: portuguese ? page.title : page.enTitle!,
    description: portuguese ? page.description : page.enTitle!,
    h1: portuguese ? page.h1 : page.enTitle!,
    body: portuguese ? localizedBody(page) : [],
    faq: portuguese ? faq(page.faq) : [],
    author: portuguese ? page.author : undefined,
    reviewedBy: portuguese ? page.reviewedBy : undefined,
    schemaData: {
      sku: page.sku,
      brand: page.type === "product" ? "PowerBaseFit" : undefined,
      manufacturer: page.type === "product" ? "Powerbase Fitness Equipment Co.,Ltd" : undefined,
      material: page.material,
      category: page.category,
      specifications: page.specifications,
      breadcrumbs: portuguese
        ? portugueseBreadcrumbs(page)
        : [{ name: "Home", path: "/" }, ...(page.enPath === "/" ? [] : [{ name: page.enTitle!, path: page.enPath! }])]
    },
    images: portuguese ? image(page.image) : [],
    internalLinks: portuguese ? links(page.links) : [],
    canonicalData: { mode: "self" },
    hreflangData: { include: true },
    updatedAt: page.updatedAt ?? updatedAt,
    publishedAt: page.publishedAt ?? publishedAt,
    version: 1
  };
}

const pages: PilotPage[] = [
  {
    id: "home", type: "home", enPath: "/", ptPath: "/pt", enTitle: "PowerBaseFit | Free Weight Equipment Manufacturer",
    title: "Fabricante de equipamentos de musculação para marcas e distribuidores | PowerBaseFit",
    description: "Fabricante de equipamentos de musculação, halteres e anilhas com OEM, marca própria e personalização para distribuidores, importadores e academias B2B.",
    h1: "Equipamentos profissionais de musculação direto da fábrica",
    image: ["/assets/hero-poster.avif", "Equipamentos profissionais de musculação PowerBaseFit para academias e distribuidores"],
    sections: [
      ["Soluções para compradores B2B no Brasil", "A PowerBaseFit fabrica halteres, anilhas, barras, bancos, racks e acessórios para distribuidores, importadores, marcas próprias e projetos de academias. O atendimento começa pela lista de produtos, quantidades, faixa de peso, acabamento e destino da carga. Com essas informações, a equipe avalia uma configuração de fornecimento compatível com o canal de venda e com a operação logística do comprador."],
      ["Fabricação, OEM e marca própria", "Programas OEM e ODM podem incluir logotipo, cores, marcações em kg ou lb, embalagem e composição do mix. O MOQ depende do modelo e do nível de personalização; por isso, ele é confirmado após a análise do pedido. Essa abordagem evita promessas genéricas e permite planejar produção, inspeção e embalagem de forma adequada."],
      ["Linha de pesos livres para uso comercial", "O portfólio atende áreas de musculação, treinamento funcional, estúdios, lojas especializadas e redes de distribuição. Para comparar opções, consulte as linhas de halteres e anilhas ou envie seu projeto para receber uma cotação de fábrica com detalhes de personalização e prazo."],
      ["Fornecimento internacional", "A fábrica fica em Dezhou, província de Shandong, China. A preparação de exportação considera proteção do acabamento, resistência da embalagem e melhor aproveitamento do contêiner. O prazo depende da quantidade e da personalização; pedidos padrão podem ser expedidos em torno de dez dias após o depósito quando materiais e agenda estão confirmados."]
    ],
    faq: [
      ["A PowerBaseFit vende equipamentos de academia no atacado para o Brasil?", "Sim. A PowerBaseFit atende compradores B2B, como distribuidores, importadores, marcas e projetos de academias. Quantidades, especificações e condições são avaliadas em cada cotação."],
      ["É possível colocar minha marca nos equipamentos?", "Sim. Dependendo do produto, o programa OEM pode incluir logotipo, cor, marcação de peso e embalagem de marca própria. O escopo e o MOQ são confirmados antes da produção."]
    ],
    links: [["dumbbells-category", "Ver halteres profissionais"], ["weight-plates-category", "Ver anilhas"], ["factory", "Conhecer a fábrica"], ["contact", "Solicitar cotação"]]
  },
  {
    id: "dumbbells-category", type: "product_category", enPath: "/products/dumbbells", ptPath: "/pt/produtos/halteres", enTitle: "Commercial Dumbbells",
    title: "Halteres profissionais no atacado e com marca própria | PowerBaseFit", description: "Halteres profissionais direto do fabricante, com opções em borracha e cromadas, OEM, marca própria e embalagem para distribuidores e academias no Brasil.",
    h1: "Halteres profissionais para academias e distribuição",
    image: ["/assets/project-dumbbell-zone.png", "Área de halteres profissionais para academia comercial"],
    sections: [
      ["Linha de halteres para uso comercial", "A escolha de halteres para uma academia ou operação de distribuição exige mais do que comparar aparência. Faixa de peso, formato, aderência, proteção do piso, manutenção e apresentação no ponto de venda influenciam o resultado. A PowerBaseFit produz opções para áreas de musculação, estúdios, lojas e programas de marca própria."],
      ["Halter sextavado de borracha", "O formato sextavado ajuda a reduzir o rolamento no piso e facilita exercícios em que o halter serve de apoio. O revestimento de borracha é procurado por academias e revendedores que desejam proteção e uma apresentação comercial reconhecida. A faixa do modelo real em catálogo vai de 2,5 a 50 kg."],
      ["Halter cromado", "O acabamento cromado oferece visual limpo e compacto, comum em áreas premium, hotéis, estúdios e showrooms. A decisão deve considerar rotina de limpeza, ambiente de uso, suporte de armazenamento e faixa de pesos desejada."],
      ["Personalização OEM", "As opções variam por modelo e podem incluir logotipo, marcações, cores e embalagem. Antes de cotar, envie pesos, quantidade por peso, mercado de destino e necessidade de marca própria. A fábrica confirma o MOQ praticável e o plano de produção com base nessa lista."]
    ],
    faq: [["Qual é o melhor halter para uma academia profissional?", "O melhor modelo depende do perfil de treino e da manutenção. Halteres sextavados de borracha são versáteis e estáveis; modelos cromados priorizam visual e formato compacto."], ["Posso comprar halteres com meu logotipo?", "Sim, quando o modelo permite. Envie o desenho do logotipo, a faixa de pesos e as quantidades para confirmar método de aplicação, amostra, MOQ e embalagem."]],
    links: [["rubber-hex-dumbbell", "Halter sextavado de borracha"], ["chrome-dumbbell", "Halter cromado"], ["factory", "Processo de fábrica"], ["contact", "Pedir cotação de halteres"]]
  },
  {
    id: "weight-plates-category", type: "product_category", enPath: "/products/weight-plates", ptPath: "/pt/produtos/anilhas", enTitle: "Commercial Weight Plates",
    title: "Anilhas de peso e anilhas bumper no atacado | PowerBaseFit", description: "Fabricante de anilhas de peso e anilhas bumper para distribuidores e academias, com OEM, personalização de logo, kg ou lb e embalagem de exportação B2B.",
    h1: "Anilhas para academias, distribuidores e marcas próprias", image: ["/assets/project-plate-zone.png", "Anilhas e barras em área de musculação profissional"],
    sections: [["Escolha da linha de anilhas", "Anilhas convencionais e anilhas bumper atendem usos diferentes. O comprador deve avaliar exercícios previstos, frequência de queda, diâmetro, espessura, armazenamento, marcação de peso e orçamento. Para uma linha comercial, também é importante planejar a proporção entre pesos para evitar excesso de itens com baixa saída."], ["Anilhas para musculação", "Anilhas de peso são usadas em equipamentos carregados, barras e áreas de força. Acabamento, encaixe e legibilidade da marcação afetam a experiência do usuário e a apresentação do produto. A especificação deve ser confirmada por modelo."], ["Anilhas bumper", "Bumper plates usam corpo de borracha e centro metálico e são indicadas quando o treino prevê contato controlado com o piso. Elas são procuradas em levantamento, treinamento funcional e áreas de força. Dureza, espessura e tolerância devem ser alinhadas ao uso comercial."], ["OEM e preparação para exportação", "A personalização pode incluir logotipo, cor, marcação em kg ou lb e embalagem. Como anilhas concentram muito peso em pouco volume, o plano de caixas, pallets e contêiner é parte importante da cotação."]],
    faq: [["Qual a diferença entre anilha comum e anilha bumper?", "A bumper plate tem corpo de borracha e foi projetada para lidar melhor com contato com o piso. A anilha comum atende principalmente musculação e equipamentos carregados; a aplicação define a melhor opção."], ["As anilhas podem ter marca própria?", "Sim, de acordo com o modelo. Logotipo, cor, marcação de peso e embalagem podem ser avaliados no programa OEM."]],
    links: [["rubber-bumper-plate", "Conhecer a anilha bumper"], ["plates-guide", "Comparar anilhas e bumper plates"], ["factory", "Conhecer a fábrica"], ["contact", "Solicitar cotação de anilhas"]]
  },
  {
    id: "rubber-hex-dumbbell", type: "product", enPath: "/products/dumbbells/hex-dumbbell-kg", ptPath: "/pt/produtos/halteres/halter-sextavado-borracha", enTitle: "Hex Dumbbell KG", sku: "HEX-DB-KG",
    title: "Halter sextavado de borracha 2,5–50 kg com OEM | PowerBaseFit", description: "Halter sextavado de borracha profissional de 2,5 a 50 kg, direto do fabricante, com logo personalizado, marca própria e embalagem para atacado no Brasil.", h1: "Halter sextavado de borracha profissional",
    image: ["/assets/products/dumbbells/catalog-v2/hex-dumbbell-kg.jpg", "Halter sextavado de borracha profissional para academia"],
    sections: [["Produto", "O Rubber Hex Dumbbell da PowerBaseFit combina cabeça sextavada revestida de borracha com empunhadura metálica. O formato reduz o rolamento quando o halter é colocado no piso e favorece áreas de treino com alta rotatividade. A faixa cadastrada deste modelo é de 2,5 a 50 kg."], ["Aplicações comerciais", "É uma opção para academias, estúdios, distribuidores, varejistas especializados e linhas de marca própria. Antes da compra, defina os incrementos e a quantidade por peso com base no perfil dos usuários e no espaço disponível no rack."], ["Características e especificação", "A cabeça sextavada oferece estabilidade; o revestimento ajuda a proteger o produto e o ambiente; a empunhadura deve ser avaliada quanto a diâmetro, textura e ergonomia. Cores, tolerâncias e detalhes finais são confirmados na ficha comercial e na amostra aprovada."], ["Personalização OEM", "O projeto pode avaliar logotipo, marcação de peso, cor e embalagem. O MOQ varia conforme configuração e método de personalização. Para uma cotação precisa, envie faixa de pesos, unidades por peso, país de destino e arquivo do logotipo."], ["Por que comprar da PowerBaseFit", "A equipe combina fabricação, inspeção de acabamento, confirmação de peso e planejamento de embalagem. O objetivo é entregar uma linha coerente para revenda ou uso profissional, sem criar especificações que não tenham sido aprovadas pelo comprador."]],
    faq: [["Halter sextavado de borracha é indicado para academia comercial?", "Sim. O formato estável e a faixa ampla de pesos atendem muitas áreas comerciais, desde que a especificação e o rack sejam adequados à intensidade de uso."], ["Qual é a faixa de peso deste halter?", "O modelo Hex Dumbbell KG listado pela PowerBaseFit vai de 2,5 a 50 kg."], ["É possível personalizar o logotipo?", "Sim, sujeito à confirmação do método, quantidade e amostra. A cotação considera logo, marcação, embalagem e destino."]],
    links: [["dumbbells-category", "Ver todos os halteres"], ["factory", "Ver processo de fabricação"], ["contact", "Solicitar cotação OEM"]]
  },
  {
    id: "chrome-dumbbell", type: "product", enPath: "/products/dumbbells/chrome-dumbbell", ptPath: "/pt/produtos/halteres/halter-cromado", enTitle: "Chrome Dumbbell", sku: "CHROME-DB",
    title: "Halter cromado para academia e marca própria | PowerBaseFit", description: "Halter cromado profissional direto do fabricante para academias, hotéis e distribuidores, com opções OEM, logo, marca própria e embalagem de exportação B2B.", h1: "Halter cromado profissional para projetos comerciais",
    image: ["/assets/chrome-dumbbell.jpg", "Halter cromado profissional com empunhadura texturizada"],
    sections: [["Produto", "O halter cromado é escolhido por compradores que valorizam aparência limpa, formato compacto e apresentação premium. Ele pode compor áreas de treino em hotéis, estúdios, clubes, showrooms e academias, desde que armazenamento e rotina de limpeza sejam compatíveis com o acabamento."], ["Aplicações comerciais", "Para projetos de hospitalidade e estúdios, uma faixa menor de pesos pode atender o programa de treino. Para revenda, o mix deve refletir a demanda local. Em ambos os casos, o rack adequado evita contato desnecessário entre as peças e melhora a organização."], ["Características principais", "O acabamento metálico, a forma compacta e a empunhadura texturizada são os principais pontos de avaliação. Peso, dimensões, textura e tolerâncias são confirmados conforme o modelo e o pedido, sem substituir a aprovação de amostra."], ["Opções OEM", "A viabilidade de logotipo, marcação e embalagem depende da construção escolhida. Compartilhe faixa de pesos, quantidades, aplicação e identidade da marca para receber a configuração de OEM possível e o MOQ correspondente."], ["Controle e embalagem", "A inspeção pode verificar superfície, peso, empunhadura e proteção individual antes do embarque. A embalagem é planejada para reduzir atrito e marcas durante transporte internacional."]],
    faq: [["Halter cromado enferruja?", "Todo acabamento metálico exige limpeza e ambiente adequados. A durabilidade depende do processo de superfície, da umidade, do contato com suor e da manutenção realizada pelo usuário."], ["Halter cromado pode receber marca própria?", "A possibilidade depende do modelo e do método de aplicação. O arquivo da marca e a quantidade são analisados antes da confirmação."]],
    links: [["dumbbells-category", "Comparar modelos de halteres"], ["dumbbells-guide", "Guia para escolher halteres"], ["contact", "Pedir cotação"]]
  },
  {
    id: "rubber-bumper-plate", type: "product", enPath: "/products/weight-plates/rubber-bumper-plate", ptPath: "/pt/produtos/anilhas/anilha-bumper-borracha", enTitle: "Rubber Bumper Plate", sku: "RBP",
    title: "Anilha bumper de borracha com marca própria | PowerBaseFit", description: "Anilha bumper de borracha para academias e distribuidores, direto do fabricante, com personalização de logo, cores, kg ou lb e embalagem OEM para atacado B2B.", h1: "Anilha bumper de borracha para uso profissional",
    image: ["/assets/weight-plate.jpg", "Anilha bumper de borracha para treinamento profissional"],
    sections: [["Produto", "A Rubber Bumper Plate utiliza corpo de borracha e centro metálico para áreas em que a barra pode ter contato controlado com o piso. Ela atende treinamento funcional, levantamento e zonas de força, além de programas de distribuição e marca própria."], ["Aplicações comerciais", "A especificação deve considerar frequência de uso, tipo de piso, altura de queda prevista e combinação com barras e plataformas. Nenhuma anilha elimina a necessidade de piso adequado e regras de uso na academia."], ["Características técnicas", "O catálogo oferece conjuntos de bumper plates de treinamento, com opções de acabamento e efeito salpicado conforme a configuração. Diâmetro, espessura, tolerância, dureza e encaixe são confirmados na documentação comercial do pedido."], ["Personalização OEM", "Podem ser avaliados logotipo, cores, marcação em kg ou lb e embalagem de exportação. O comprador deve enviar pesos, quantidades, identidade da marca e país de destino para validar MOQ e método de produção."], ["Embalagem e fornecimento", "Por serem produtos densos, as anilhas exigem atenção ao peso por caixa, pallet e contêiner. A PowerBaseFit planeja proteção, identificação e carregamento de acordo com a composição final do pedido."]],
    faq: [["Anilha bumper pode ser usada em academia comercial?", "Sim, quando a especificação, o piso e as regras de uso são adequados. A frequência de queda e o tipo de treinamento devem orientar a escolha."], ["Qual personalização está disponível?", "Dependendo do modelo, podem ser avaliados logo, cor, marcação em kg ou lb e embalagem de marca própria."]],
    links: [["weight-plates-category", "Ver linha de anilhas"], ["plates-guide", "Anilhas comuns ou bumper"], ["contact", "Solicitar cotação OEM"]]
  },
  {
    id: "factory", type: "factory", enPath: "/factory", ptPath: "/pt/fabrica", enTitle: "PowerBaseFit Factory",
    title: "Fábrica de equipamentos de academia e pesos livres | PowerBaseFit", description: "Conheça a fábrica PowerBaseFit em Dezhou, China: fabricação de halteres e anilhas, controle de qualidade, OEM, marca própria e embalagem de exportação B2B.", h1: "Fábrica de equipamentos de academia para fornecimento B2B",
    image: ["/assets/factory.png", "Fábrica PowerBaseFit de equipamentos de academia em Dezhou, China"],
    sections: [["Base de fabricação", "A PowerBaseFit está localizada em Dezhou, província de Shandong, China, e informa uma área fabril de 8.000 m² e operação desde 2008. A fábrica atende linhas de pesos livres e equipamentos relacionados para compradores internacionais."], ["Fluxo de produção", "O processo varia por produto e pode envolver preparação de matéria-prima, conformação ou usinagem, tratamento de superfície, montagem, marcação, inspeção e embalagem. A confirmação de cada etapa depende da especificação aprovada."], ["Controle de qualidade", "Os controles podem incluir revisão de material, inspeção visual do acabamento, confirmação de peso, teste de montagem e verificação de embalagem. Para pedidos OEM, a amostra e os arquivos aprovados orientam a produção."], ["OEM e marca própria", "A fábrica avalia logotipo, cores, marcações e embalagem de acordo com o produto. O MOQ não é apresentado como um número único porque depende do modelo, processo e composição do pedido."], ["Preparação para exportação", "Halteres, anilhas e acessórios costumam ser embalados em caixas ou conforme a necessidade do comprador. Racks multifuncionais e estações de treino podem utilizar caixas de madeira. Prazo e carregamento são confirmados após quantidade e personalização."]],
    faq: [["Onde fica a fábrica da PowerBaseFit?", "A fábrica fica em Ningjin, Dezhou, província de Shandong, China."], ["Posso solicitar inspeção antes do embarque?", "Os requisitos de inspeção devem ser alinhados na cotação. A equipe pode confirmar pontos de controle, documentação e condições aplicáveis ao pedido."]],
    links: [["factory-guide", "Como avaliar uma fábrica OEM"], ["projects", "Ver referências de projetos"], ["contact", "Falar com a fábrica"]]
  },
  {
    id: "contact", type: "contact", enPath: "/contact", ptPath: "/pt/contato", enTitle: "Contact PowerBaseFit",
    title: "Solicite cotação de equipamentos de academia | PowerBaseFit", description: "Envie sua lista de halteres, anilhas ou equipamentos de musculação para cotação direta da fábrica, com OEM, marca própria e suporte de exportação B2B.", h1: "Solicite uma cotação para seu projeto B2B",
    sections: [["Informações para uma cotação precisa", "Informe produtos, faixa de pesos, quantidade por item, necessidade de logotipo, embalagem, país de destino e prazo desejado. Quanto mais completa a lista, mais objetiva será a avaliação de MOQ, produção e transporte."], ["Atendimento para importadores e distribuidores", "A PowerBaseFit atende distribuidores, importadores, marcas próprias, varejistas e projetos de academias. O formulário usa o mesmo canal comercial do site em inglês e envia a solicitação para kloe@powerbasefit.com."], ["Contato direto", "WhatsApp: +86 18963018533. E-mail: kloe@powerbasefit.com. A equipe responderá com as perguntas técnicas necessárias para preparar a proposta."]],
    faq: [["Quais dados devo enviar para receber uma cotação?", "Envie produtos, quantidades, pesos, logotipo, embalagem, destino e prazo. Fotos ou referências também ajudam a identificar o modelo."], ["A cotação inclui frete para o Brasil?", "A condição de entrega deve ser solicitada. Informe cidade ou porto de destino para que a equipe confirme quais opções podem ser cotadas."]],
    links: [["dumbbells-category", "Halteres profissionais"], ["weight-plates-category", "Anilhas"], ["factory", "Conhecer a fábrica"]]
  },
  {
    id: "blog-index", type: "blog_index", enPath: "/resources", ptPath: "/pt/blog", enTitle: "Resources", title: "Guias para importar equipamentos de academia | PowerBaseFit", description: "Guias em português para distribuidores e academias sobre fábrica OEM, halteres comerciais, anilhas, bumper plates, marca própria e compras B2B no Brasil.", h1: "Conteúdo para compradores de equipamentos de academia",
    sections: [["Decisões de compra com critérios objetivos", "Esta biblioteca reúne orientações para avaliar produtos, fornecedores, personalização e preparação de exportação. Os textos usam fatos disponíveis no catálogo e na operação da PowerBaseFit, sem inventar certificações, clientes ou resultados."], ["Guias publicados", "Leia como avaliar uma fábrica OEM na China, como escolher halteres para academia profissional e como comparar anilhas convencionais com bumper plates. Cada guia direciona para as páginas de produto e para o canal de cotação correspondente."]],
    faq: [["Os guias são voltados para consumidores finais?", "O foco principal é B2B: distribuidores, importadores, marcas e responsáveis por projetos de academias."], ["Posso pedir ajuda para montar uma lista de produtos?", "Sim. Envie o tipo de operação, público, espaço, pesos desejados e orçamento para iniciar a conversa comercial."]],
    links: [["factory-guide", "Avaliar fábrica OEM"], ["dumbbells-guide", "Escolher halteres comerciais"], ["plates-guide", "Comparar anilhas"]]
  },
  {
    id: "factory-guide", type: "blog", enPath: "/resources/evaluate-oem-gym-equipment-factory-china", ptPath: "/pt/blog/como-avaliar-fabrica-equipamentos-academia-china", enTitle: "How to Evaluate an OEM Gym Equipment Factory in China",
    title: "Como avaliar uma fábrica de equipamentos de academia na China", description: "Guia B2B para avaliar fabricante de equipamentos fitness na China: capacidade real, amostras, controle de qualidade, OEM, embalagem e exportação global B2B.", h1: "Como avaliar uma fábrica OEM de equipamentos de academia na China",
    image: ["/assets/factory-process/dumbbell-cutting.jpg", "Processo de fabricação de halteres em fábrica de equipamentos de academia"],
    sections: [["Comece pela compatibilidade do fornecedor", "Uma fábrica adequada não é apenas a que oferece o menor preço. Primeiro confirme se ela produz a categoria necessária, trabalha com a faixa de quantidade do projeto e consegue documentar materiais, dimensões, tolerâncias e acabamento. Peça que a cotação identifique claramente o modelo em vez de aceitar descrições genéricas."], ["Verifique processo e amostra", "Solicite fotos atuais da produção, detalhes do fluxo e uma amostra quando o risco justificar. Compare peso, empunhadura, acabamento, logotipo, cheiro, montagem e embalagem com o que foi acordado. A amostra aprovada deve servir como referência para o lote, mas não substitui a inspeção."], ["Avalie o programa OEM", "Confirme método de aplicação do logotipo, arquivo exigido, cores, marcações em kg ou lb, embalagem, custo de amostra e MOQ. Pergunte quais mudanças alteram molde, ferramenta ou prazo. Um fornecedor responsável distingue personalizações simples de projetos que exigem desenvolvimento."], ["Planeje controle de qualidade", "Defina pontos mensuráveis: material, peso, dimensões, superfície, montagem, quantidade e proteção de embalagem. Combine quando as verificações ocorrerão e como uma não conformidade será tratada. Para itens pesados, revise também resistência das caixas, pallets e marcação logística."], ["Analise exportação e comunicação", "Compare o escopo do preço e confirme porto, prazo, documentação e responsabilidade de transporte. Observe se a equipe responde perguntas técnicas de forma consistente. Antes do depósito, consolide especificação, quantidade, personalização, embalagem e condição comercial em um único documento."]],
    faq: [["Como saber se um fornecedor é realmente fabricante?", "Peça endereço, imagens atuais, descrição do processo, lista de equipamentos relevantes e evidências ligadas ao produto cotado. Uma visita ou inspeção independente pode ser considerada conforme o risco."], ["Qual é o principal risco em um pedido OEM?", "A especificação incompleta. Sem amostra, tolerâncias, método de logo e embalagem definidos, comprador e fábrica podem interpretar o mesmo pedido de formas diferentes."]],
    links: [["factory", "Conhecer a fábrica PowerBaseFit"], ["contact", "Enviar projeto OEM"]]
  },
  {
    id: "dumbbells-guide", type: "blog", enPath: "/resources/how-to-choose-commercial-dumbbells", ptPath: "/pt/blog/como-escolher-halteres-academia-profissional", enTitle: "How to Choose Commercial Dumbbells",
    title: "Como escolher halteres para academia profissional", description: "Guia para escolher halteres profissionais: borracha ou cromado, faixa de peso, empunhadura, rack, manutenção, fornecedor, OEM e marca própria no Brasil.", h1: "Como escolher halteres para uma academia profissional",
    image: ["/assets/hex-dumbbells.png", "Halteres sextavados de borracha para academia profissional"],
    sections: [["Defina o ambiente e o público", "O melhor halter depende do tipo de academia, volume de usuários, exercícios, espaço e rotina de manutenção. Uma rede de alto fluxo pode priorizar resistência e reposição simples; um hotel pode valorizar formato compacto e apresentação. Comece pela aplicação, não apenas pela fotografia."], ["Compare materiais e formatos", "Halteres sextavados de borracha oferecem estabilidade no piso e são versáteis. Halteres cromados têm aparência limpa e compacta, mas pedem atenção ao ambiente e à limpeza. Em qualquer opção, verifique como cabeça e empunhadura são unidas e quais tolerâncias o fornecedor controla."], ["Monte a faixa de pesos", "A lista deve refletir o perfil dos usuários. Pesos leves costumam ter maior uso em aquecimento e públicos variados, enquanto pares pesados atendem treino de força. Planeje incrementos coerentes e confirme o espaço de rack antes de fechar quantidades."], ["Avalie ergonomia e identificação", "Diâmetro, textura e comprimento da empunhadura influenciam conforto. A marcação precisa ser legível e resistente à rotina de uso. Para marca própria, valide tamanho e posição do logotipo em amostra, além da consistência entre diferentes pesos."], ["Inclua embalagem e reposição na decisão", "Halteres concentram peso e podem danificar uns aos outros durante o transporte se a proteção for insuficiente. Confirme embalagem individual, limite por caixa e pallet. Pergunte também como serão tratados pares de reposição futuros e diferenças de lote."]],
    faq: [["Halter sextavado ou redondo: qual escolher?", "O sextavado reduz o rolamento e pode ser mais prático em treinos no piso. O redondo funciona bem em racks e pode atender outras preferências de design. A aplicação decide."], ["Quantos pares de halteres uma academia precisa?", "Não existe número universal. Calcule por área disponível, pico de usuários, faixa de pesos e repetição dos pesos mais procurados."]],
    links: [["dumbbells-category", "Ver linha de halteres"], ["rubber-hex-dumbbell", "Halter sextavado"], ["chrome-dumbbell", "Halter cromado"], ["contact", "Cotação para academia"]]
  },
  {
    id: "plates-guide", type: "blog", enPath: "/resources/weight-plates-vs-bumper-plates-b2b-guide", ptPath: "/pt/blog/anilhas-de-peso-vs-anilhas-bumper", enTitle: "Weight Plates vs Bumper Plates B2B Guide",
    title: "Anilhas de peso vs. anilhas bumper: guia para compradores B2B", description: "Compare anilhas de peso e anilhas bumper por uso, material, espessura, piso, armazenamento, transporte, OEM e custo para academias e distribuidores B2B.", h1: "Anilhas de peso ou anilhas bumper: como escolher",
    image: ["/assets/project-plate-zone.png", "Anilhas de peso e barras em academia comercial"],
    sections: [["A diferença começa no uso", "Anilhas convencionais atendem musculação, máquinas carregadas e exercícios em que a barra não é derrubada. Bumper plates usam corpo de borracha e diâmetro padronizado entre pesos para lidar melhor com contato controlado com o piso. A escolha deve acompanhar o programa de treino."], ["Considere espessura e carga na barra", "Bumper plates leves tendem a ser mais espessas do que anilhas metálicas equivalentes, limitando a carga total que cabe na manga. Para levantamento muito pesado, espessura é uma especificação importante. Para academias gerais, variedade e facilidade de identificação podem pesar mais."], ["Piso, ruído e manutenção", "Borracha não elimina a necessidade de plataforma ou piso apropriado. Frequência de queda, altura e técnica afetam a vida útil do produto e do ambiente. Anilhas convencionais também exigem armazenamento para evitar impacto, umidade e desgaste de superfície."], ["Custos logísticos", "Anilhas são densas e o frete representa parcela relevante do custo final. Compare peso por caixa, pallets, limite de contêiner e proteção do acabamento. Um mix eficiente pode ser mais importante do que uma pequena diferença no preço unitário."], ["OEM e decisão de compra", "Para marca própria, confirme logotipo, cor, marcação em kg ou lb, tolerância, embalagem e amostra. Distribuidores devem considerar quais pesos giram no mercado e se haverá reposição compatível. Academias devem relacionar a compra ao número de estações e usuários."]],
    faq: [["Bumper plate é melhor do que anilha comum?", "Não em todos os casos. É melhor quando o treino exige uma anilha apropriada para contato controlado com o piso. Para máquinas e musculação convencional, outros modelos podem ser mais econômicos e compactos."], ["Posso misturar anilhas comuns e bumper plates?", "É possível em determinadas rotinas, mas diâmetro, espessura, carga, piso e instruções do equipamento devem ser considerados. A academia precisa definir regras de uso claras."]],
    links: [["weight-plates-category", "Ver anilhas"], ["rubber-bumper-plate", "Anilha bumper de borracha"], ["contact", "Solicitar cotação"]]
  },
  {
    id: "projects", type: "projects", enPath: "/projects", ptPath: "/pt/projetos", enTitle: "Projects", title: "Referências de projetos com equipamentos de musculação | PowerBaseFit", description: "Referências reais de configuração de áreas com halteres, racks, anilhas e barras para apoiar distribuidores e projetos de academias na especificação B2B.", h1: "Referências de configuração para projetos de academia",
    image: ["/assets/case-gym.png", "Projeto de academia com equipamentos de musculação PowerBaseFit"],
    sections: [["Como usar estas referências", "As imagens e configurações desta página são referências reais já publicadas no site da PowerBaseFit. Elas ajudam a discutir combinação de produtos, circulação, armazenamento e identidade visual. Não são apresentadas como depoimentos, resultados de clientes identificados ou certificações."], ["Referência 1: área premium de halteres redondos", "Uma área de halteres precisa equilibrar quantidade de pares, comprimento do rack e espaço de circulação. A referência de Premium Round Dumbbell Zone mostra uma organização contínua para facilitar identificação e devolução dos pesos. O planejamento deve considerar o pico de usuários e a duplicação de pesos mais procurados."], ["Referência 2: projeto com halteres sextavados pretos", "A referência Black Hex Dumbbell Project utiliza halteres sextavados, formato que reduz o rolamento e funciona bem em exercícios próximos ao piso. Rack, proteção do piso e distância entre estações devem ser definidos junto com a faixa de pesos."], ["Área de anilhas e barras", "A referência Weight Plate & Barbell Area reforça a necessidade de armazenamento próximo às plataformas e estações. O mix entre anilhas convencionais e bumper plates deve acompanhar os exercícios previstos, evitando comprar produtos que não correspondam ao uso real."], ["Da referência à cotação", "Envie planta, área, perfil do público, lista inicial e país de destino. A equipe pode organizar a conversa comercial em torno dos produtos disponíveis, opções de OEM, embalagem e logística, sem alterar o projeto técnico do responsável local."]],
    faq: [["A PowerBaseFit faz o projeto arquitetônico da academia?", "A página oferece referências de equipamentos e configuração. O projeto arquitetônico, estrutural e de segurança deve ser realizado por profissionais responsáveis no local."], ["Posso usar minha identidade visual nos equipamentos?", "Dependendo do modelo, podem ser avaliados logotipo, cores, marcações e embalagem. A viabilidade é confirmada com a lista de produtos."]],
    links: [["dumbbells-category", "Halteres para projetos"], ["weight-plates-category", "Anilhas para projetos"], ["contact", "Enviar projeto"]]
  }
];

const enhancedExistingPages = pages.map((page) => ({
  ...page,
  ...existingPageEnhancements[page.id],
  ...existingBlogEnhancements[page.id]
}));

const allPages: PilotPage[] = [
  ...enhancedExistingPages,
  ...ptBrCommercialPages,
  ...ptBrGrowthBlogsA,
  ...ptBrGrowthBlogsB,
  ...seoExpansionPortuguesePages,
  ...productLocalizationBatch1Portuguese
].map((page) => contentSupplements[page.id]
  ? { ...page, blocks: [...(page.blocks ?? body(page.sections ?? [], false)), ...contentSupplements[page.id]] }
  : page);

const entities: ContentEntity[] = allPages.map((page) => ({
  id: page.id,
  type: page.type,
  defaultLocale: page.enPath ? "en" : "pt-BR",
  versions: page.enPath
    ? { en: publishedVersion(page, "en"), "pt-BR": publishedVersion(page, "pt-BR") }
    : { "pt-BR": publishedVersion(page, "pt-BR") }
}));

export const ptBrPilotManifest: ContentManifest = { schemaVersion: 1, entities };
