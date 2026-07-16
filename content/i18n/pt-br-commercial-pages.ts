import type { PilotPage } from "./pt-br-types";
import { checklist, definition, quick, rich, table } from "./pt-br-content-helpers";
import { ptBrEditorialAuthor, ptBrTechnicalReviewer } from "./pt-br-existing-growth";

export const ptBrCommercialPages: PilotPage[] = [
  {
    id: "products-hub", type: "product_category", enPath: "/products", ptPath: "/pt/produtos", enTitle: "Free Weight Equipment Products",
    title: "Equipamentos para academia no atacado | PowerBaseFit",
    description: "Equipamentos profissionais para academias, distribuidores e importadores: halteres, anilhas, racks, bancos, acessórios, OEM e marca própria direto da fábrica.",
    h1: "Equipamentos profissionais para academias e distribuidores",
    image: ["/assets/hero-poster.avif", "Equipamentos profissionais de musculação para academias e distribuidores"],
    blocks: [
      quick("resposta-rapida", "A PowerBaseFit fornece halteres, anilhas, racks, bancos e acessórios para compradores B2B. O catálogo atende academias, distribuidores, importadores e marcas próprias, com seleção por aplicação, opções OEM, embalagem de exportação e planejamento de pedidos em kg ou lb."),
      definition("definicao", "Equipamentos para academia no atacado", "São produtos comprados em quantidade por empresas para instalação, revenda, distribuição ou marca própria. O processo B2B exige lista por modelo, quantidade, especificação, personalização, embalagem, destino e condição comercial; não funciona como uma compra unitária de varejo."),
      rich("como-escolher", "Como organizar o portfólio", "Comece pela operação. Uma academia precisa equilibrar área de pesos livres, estações, armazenamento e perfil de usuários. Um distribuidor deve combinar produtos de entrada, intermediários e premium, além de planejar estoque e reposição. Uma marca própria precisa acrescentar identidade visual, embalagem e consistência de linha.", "A compra pode ser dividida por famílias, mas a logística deve considerar o conjunto. Halteres e anilhas são densos; racks e bancos ocupam mais volume. Um pedido misto pode melhorar o aproveitamento quando peso, proteção e sequência de carga são planejados juntos."),
      table("categorias", "Categorias disponíveis", ["Categoria", "Produtos", "Compradores típicos", "Próxima decisão"], [
        ["Halteres", "Sextavados, redondos, cromados, PU e outros", "Academias, hotéis, distribuidores", "Formato, material, faixa e rack"],
        ["Anilhas", "Olímpicas, emborrachadas, bumper e competição", "Academias, boxes, importadores", "Barra, uso, espessura e piso"],
        ["Racks e bancos", "Estruturas, suportes e bancos ajustáveis", "Projetos comerciais e revenda", "Dimensões, carga e montagem"],
        ["Acessórios", "Kettlebells, steps, mats e itens funcionais", "Estúdios e distribuidores", "Mix, embalagem e canal"],
        ["OEM", "Logo, cores, kg/lb e embalagem", "Marcas e distribuidores", "Arquivo, amostra, MOQ e prazo"]
      ]),
      rich("compradores", "Aplicações B2B", "Distribuidores podem usar o catálogo para montar linhas coerentes por material e faixa de preço. Importadores precisam relacionar produto a classificação, frete e requisitos do destino com profissionais responsáveis. Academias podem selecionar produtos por área, número de usuários e manutenção. Hotéis e estúdios costumam trabalhar com menor faixa e maior atenção à apresentação.", "A PowerBaseFit não define arquitetura, segurança ou conformidade local. A equipe apoia a seleção comercial, a personalização, a produção, o QC e a preparação da carga conforme o pedido aprovado."),
      rich("especificacao", "Especificação e controle de qualidade", "Cada página de produto deve ser lida com a ficha comercial. Peso, material, dimensão, construção e opções OEM variam por modelo. Antes da produção, confirme o que será medido e qual amostra funciona como referência.", "O controle pode incluir peso, dimensões, superfície, união, montagem, marcação, quantidade e embalagem. Critérios críticos devem ser escritos. Expressões como “qualidade premium” não substituem tolerâncias ou inspeção."),
      rich("oem", "OEM, marca própria e embalagem", "A personalização pode envolver logo, placa, cor, marcação em kg ou lb e embalagem. Algumas mudanças usam o produto existente; outras exigem molde, ferramenta ou desenvolvimento. A fábrica informa impacto em MOQ, amostra, custo e prazo depois de revisar o projeto.", "A embalagem precisa proteger e também servir ao canal. Para revenda, código e identificação ajudam no estoque. Para instalação, divisão por área ou peso pode facilitar descarga. Todos os detalhes devem constar na proposta aplicável ao pedido."),
      checklist("cotacao", "Dados para cotação", ["Empresa, mercado e canal de venda", "Categoria, modelo e aplicação", "Quantidade por modelo ou peso", "Sistema kg/lb e tolerâncias necessárias", "Logo, cores e embalagem", "Amostra e inspeção", "Porto ou cidade de destino", "Prazo e condição comercial solicitada"])
    ],
    faq: [
      ["Quais equipamentos a PowerBaseFit fornece?", "Halteres, anilhas, racks, bancos e acessórios, com disponibilidade e especificação confirmadas por modelo."],
      ["A venda é para consumidor final?", "O foco é B2B: distribuidores, importadores, marcas e projetos de academias."],
      ["Posso combinar categorias no mesmo pedido?", "Pode, sujeito a MOQ, disponibilidade, embalagem e planejamento da carga."],
      ["Como funciona a personalização?", "A equipe revisa logo, cor, marcação, embalagem e quantidade; depois confirma método, amostra, MOQ e prazo."],
      ["O catálogo informa o preço final no Brasil?", "Não. A cotação depende do pedido e da condição comercial; frete, tributos e despesas locais devem ser calculados para a operação real."]
    ],
    links: [["dumbbells-category", "Halteres profissionais"], ["weight-plates-category", "Anilhas e bumper plates"], ["oem-private-label", "OEM e marca própria"], ["factory", "Fábrica e QC"], ["professional-gym-list-guide", "Lista para academia profissional"], ["contact", "Solicitar cotação"]],
    author: ptBrEditorialAuthor, reviewedBy: ptBrTechnicalReviewer
  },
  {
    id: "oem-private-label", type: "oem", ptPath: "/pt/oem-marca-propria",
    title: "Equipamentos de academia OEM e marca própria | PowerBaseFit",
    description: "Fabricação OEM de halteres, anilhas e equipamentos fitness com logo, cores, kg ou lb, embalagem, amostra, QC e suporte de exportação para compradores B2B.",
    h1: "Fabricação OEM de equipamentos fitness e marca própria",
    image: ["/assets/factory.png", "Fabricação OEM de equipamentos de academia PowerBaseFit"],
    blocks: [
      quick("resposta-rapida", "A PowerBaseFit desenvolve programas OEM para distribuidores, importadores e marcas de equipamentos fitness. Dependendo do produto, podem ser avaliados logo, cores, marcação em kg ou lb, acabamento e embalagem. O processo passa por definição do produto base, revisão de arquivo, amostra, aprovação, produção, QC e exportação."),
      definition("definicao", "OEM e marca própria", "OEM é a fabricação de um produto para ser comercializado sob a marca do comprador, dentro de uma especificação aprovada. Marca própria descreve a estratégia comercial; OEM descreve a relação de fabricação. ODM pode incluir maior participação do fornecedor no desenvolvimento, mas o escopo precisa ser definido em cada projeto."),
      table("oem-odm", "OEM, ODM e produto padrão", ["Modelo", "O comprador define", "A fábrica executa", "Complexidade"], [
        ["Produto padrão", "Modelo, quantidade e destino", "Produção e embalagem disponível", "Menor"],
        ["OEM visual", "Logo, cor, kg/lb e embalagem", "Adaptação do produto existente", "Média"],
        ["OEM técnico", "Mudanças de material, dimensão ou construção", "Avaliação de engenharia, ferramenta e amostra", "Maior"],
        ["ODM", "Objetivo, mercado e requisitos", "Apoio mais amplo de desenvolvimento", "Definida por projeto"]
      ]),
      rich("produto-base", "1. Escolha o produto base", "O processo começa por um modelo real do catálogo. Compare aplicação, faixa de pesos, material, formato e posicionamento. Personalizar um produto inadequado não resolve o problema de mercado. Distribuidores devem considerar giro e reposição; academias precisam analisar intensidade e manutenção.", "Depois de escolher, registre código, imagem e especificações. Se houver mais de uma versão, cada uma precisa de identificação. Essa base evita que logo ou embalagem sejam aprovados sobre um produto diferente do que será produzido."),
      rich("identidade", "2. Defina logo, cor e marcação", "Envie arquivo vetorial quando disponível e informe cores de referência. A equipe avalia área, proporção e método aplicável. Em pesos pequenos, o espaço pode limitar detalhes. Marcação em kg ou lb deve ser legível e coerente com o mercado.", "A aprovação deve mostrar posição, tamanho, cor e conteúdo. Não use apenas uma captura de tela sem versão. Se a linha inclui vários pesos, valide pelo menos extremos relevantes para confirmar leitura e proporção."),
      rich("embalagem", "3. Planeje embalagem de marca própria", "A embalagem protege o produto e comunica a linha. Defina caixa neutra ou impressa, etiquetas, código, quantidade, peso e instruções necessárias. Alegações técnicas ou regulatórias só devem ser usadas quando documentadas.", "Para produtos pesados, design gráfico não pode reduzir resistência. Unidades por caixa, limite de manuseio, pallet e identificação logística precisam vir antes da arte final. A fábrica confirma o formato viável por produto."),
      table("fluxo", "Fluxo de aprovação", ["Etapa", "Decisão", "Documento ou evidência"], [
        ["Briefing", "Produto, mercado, quantidade e objetivo", "Lista de requisitos"],
        ["Viabilidade", "Método, MOQ, custo e prazo", "Proposta comercial"],
        ["Arte", "Logo, cor, marcação e embalagem", "Arquivo aprovado"],
        ["Amostra", "Aparência, medida e proteção", "Registro de aprovação"],
        ["Produção", "Versão e quantidade liberadas", "Ordem de produção"],
        ["QC", "Critérios e resultado do lote", "Relatório ou registro"],
        ["Embarque", "Volumes e documentos", "Packing list e liberação"]
      ]),
      rich("moq", "4. Entenda MOQ e custo", "O MOQ depende de processo, material, cor, ferramenta, embalagem e composição do pedido. Um logo simples pode ter mínimo diferente de uma cor especial ou molde novo. A fábrica confirma depois de revisar a linha completa.", "Para reduzir risco, avalie se um produto padrão com personalização visual atende o lançamento antes de investir em desenvolvimento. O custo deve incluir amostra, embalagem, inspeção, frete e despesas no destino, não apenas preço de fábrica."),
      rich("qc", "5. Controle versão e qualidade", "Amostra aprovada, arquivo e especificação precisam usar a mesma versão. O QC pode conferir peso, dimensão, superfície, logo, cor, montagem, quantidade e embalagem. Critérios que afetam aceitação devem ser mensuráveis.", "Mudanças após a aprovação precisam de registro. Uma alteração pequena de arte pode afetar produção ou embalagem. O comprador deve indicar quem tem autoridade para aprovar e quem recebe os relatórios."),
      rich("experiencia", "Experiência de fábrica em projetos de marca própria", "Na prática da PowerBaseFit, os projetos mais claros chegam com tabela por modelo e peso, arquivos organizados e mercado definido. Isso permite identificar rapidamente o que usa processo existente e o que exige desenvolvimento. Também ajuda a calcular caixas e carga.", "A equipe não promete que toda personalização é possível em todo produto. A viabilidade é analisada por modelo, quantidade e método. Essa transparência reduz retrabalho e expectativas incorretas."),
      checklist("briefing", "Briefing OEM", ["Empresa, marca e mercado", "Produto base e aplicação", "Pesos, modelos e quantidades", "Logo vetorial e cores", "Marcação em kg ou lb", "Embalagem e informações impressas", "Amostra e critérios de QC", "Destino, prazo e condição comercial"])
    ],
    faq: [
      ["Qual a diferença entre OEM e ODM?", "OEM normalmente fabrica sobre produto e especificação definidos; ODM pode incluir maior desenvolvimento pelo fornecedor. O escopo real deve ser registrado no projeto."],
      ["Posso personalizar apenas o logotipo?", "Em muitos modelos, sim. Método, área, quantidade, amostra e MOQ precisam ser confirmados."],
      ["É obrigatório produzir uma amostra?", "Depende do risco e da personalização. Para logo, cor, acabamento ou embalagem novos, a amostra é uma referência importante."],
      ["Existe um MOQ único?", "Não. O mínimo varia por produto, processo e composição do pedido."],
      ["A PowerBaseFit cria certificações para a marca?", "Não. Requisitos e certificações precisam ser reais, aplicáveis ao produto e validados com as partes responsáveis."]
    ],
    links: [["products-hub", "Escolher produto base"], ["dumbbells-category", "Halteres para marca própria"], ["weight-plates-category", "Anilhas personalizadas"], ["moq-guide", "Como funciona o MOQ"], ["oem-vs-odm-guide", "OEM vs. ODM"], ["private-label-guide", "Criar marca própria"], ["contact", "Enviar briefing OEM"]],
    author: ptBrEditorialAuthor, reviewedBy: ptBrTechnicalReviewer
  },
  {
    id: "rubber-round-dumbbell", type: "product", enPath: "/products/dumbbells/classic-rubber-round-dumbbell", ptPath: "/pt/produtos/halteres/halter-redondo-borracha", enTitle: "Classic Rubber Round Dumbbell", sku: "ROUND-RUBBER-DB",
    title: "Halter redondo de borracha 2,5–100 kg | PowerBaseFit",
    description: "Halter redondo de borracha de 2,5 a 100 kg para academias e distribuidores, com opções kg/lb, logo, marca própria, QC e embalagem de exportação OEM.",
    h1: "Halter redondo de borracha para uso comercial",
    image: ["/assets/products/dumbbells/classic-rubber-round/classic-rubber-round-dumbbell-main.jpg", "Halter redondo de borracha para academia profissional"],
    material: "Cabeça redonda revestida de borracha com empunhadura metálica", category: "Halter profissional",
    specifications: [{ name: "Faixa", value: "2,5 a 100 kg" }, { name: "Incremento", value: "2,5 kg" }, { name: "Sistemas", value: "kg e lb disponíveis conforme projeto" }],
    blocks: [
      quick("resposta-rapida", "O halter redondo de borracha PowerBaseFit cobre 2,5 a 100 kg em incrementos de 2,5 kg, com planejamento em kg ou lb. É indicado para áreas completas de pesos livres, distribuidores e marcas próprias que precisam de uma linha ampla, organização em rack e personalização de logo e embalagem."),
      definition("definicao", "Halter redondo de borracha", "É um halter de cabeça circular com revestimento de borracha e empunhadura metálica. O formato favorece a apresentação contínua em racks próprios e permite faixas pesadas, mas deve permanecer armazenado de forma estável para evitar rolamento."),
      table("especificacoes", "Especificações técnicas", ["Item", "Configuração", "Confirmação B2B"], [
        ["Faixa", "2,5 a 100 kg", "Selecionar faixa completa ou parcial"],
        ["Incremento", "2,5 kg", "Definir unidades por peso"],
        ["Sistema", "kg e lb", "Criar versões e marcações separadas"],
        ["Cabeça", "Redonda e revestida de borracha", "Superfície, diâmetro, cor e logo"],
        ["Empunhadura", "Metálica", "Textura, diâmetro e acabamento"],
        ["Embalagem", "Planejada por peso", "Caixa, pallet e identificação"]
      ]),
      rich("aplicacao", "Aplicações e planejamento da linha", "A faixa ampla atende áreas comerciais com usuários iniciantes e avançados, desde que a academia realmente precise dos pesos superiores. Distribuidores podem criar conjuntos por segmento. Hotéis e estúdios normalmente selecionam uma parte menor.", "O formato redondo exige rack compatível. Para pesos altos, analise altura de retirada, capacidade e circulação. Pares populares podem ser duplicados. Não compre a mesma quantidade de todos os pesos sem observar demanda."),
      rich("material", "Material e manutenção", "O revestimento de borracha protege a superfície e oferece uma aparência comercial conhecida. Odor, textura, cor e acabamento devem ser avaliados no modelo e na amostra. Limpeza deve usar método compatível, sem solventes agressivos.", "A empunhadura precisa ser consistente entre pesos. Racks com contato inadequado podem marcar borracha ou metal. A academia deve inspecionar folga, danos e legibilidade periodicamente."),
      rich("processo", "Fabricação e QC", "O fluxo inclui preparação dos componentes, formação da cabeça, revestimento, união, acabamento, marcação e separação por peso. O QC pode conferir peso, alinhamento, superfície, empunhadura, logo, pares e quantidade.", "Para a faixa até 100 kg, embalagem e manuseio merecem atenção especial. Pesos altos devem ser protegidos e identificados para que descarga e armazenagem sejam planejadas."),
      checklist("qc", "Pontos de inspeção", ["Peso e marcação", "União e alinhamento", "Superfície de borracha", "Empunhadura e textura", "Logo e cor", "Paridade visual", "Proteção e peso por caixa"]),
      rich("oem", "OEM e compra B2B", "Logo, marcação kg/lb, cores e embalagem podem ser avaliados. A área do logo pode variar com o peso; aprove amostras representativas. O MOQ depende da faixa e da personalização.", "Envie quantidades por peso, sistema, mercado, rack, identidade visual e destino. A proposta deve indicar o que foi confirmado e o que depende de amostra."),
      rich("logistica", "Embalagem e transporte", "Uma linha completa cria carga densa. O plano precisa mostrar caixas, peso líquido, bruto, pallets e distribuição. A combinação com racks ou outros equipamentos deve evitar pressão e atrito sobre os halteres.", "O comprador deve planejar descarga de peças pesadas e armazenagem por peso. Essas decisões fazem parte do custo real do projeto.")
    ],
    faq: [["Qual é a faixa de peso?", "De 2,5 a 100 kg, em incrementos de 2,5 kg."], ["Halter redondo ou sextavado?", "O redondo favorece linhas completas em rack; o sextavado reduz rolamento no piso. A aplicação decide."], ["Existe versão em lb?", "Sim, conforme o programa comercial aprovado."], ["Pode receber logo?", "Pode, sujeito a método, área, amostra, quantidade e MOQ."], ["Como escolher quantidades?", "Use público, pico de usuários, faixa, rack e demanda por peso."]],
    links: [["dumbbells-category", "Ver todos os halteres"], ["rubber-hex-dumbbell", "Comparar com sextavado"], ["hex-vs-round-guide", "Guia sextavado vs. redondo"], ["oem-private-label", "Personalização OEM"], ["contact", "Solicitar cotação"]],
    author: ptBrEditorialAuthor, reviewedBy: ptBrTechnicalReviewer
  },
  {
    id: "pu-dumbbell", type: "product", enPath: "/products/dumbbells/pu-dumbbell-kg", ptPath: "/pt/produtos/halteres/halter-pu", enTitle: "PU Dumbbell", sku: "PU-DB-KG",
    title: "Halter de PU profissional 2,5–50 kg | PowerBaseFit",
    description: "Halter de PU de 2,5 a 50 kg para academias premium e distribuidores, com logo, marca própria, embalagem OEM, QC e fornecimento direto da fábrica.",
    h1: "Halter de PU para academias e distribuidores",
    image: ["/assets/products/dumbbells/catalog-v2/pu-dumbbell-kg.jpg", "Halter de PU profissional para academia premium"],
    material: "Revestimento de poliuretano (PU) com empunhadura metálica", category: "Halter profissional premium",
    specifications: [{ name: "Faixa", value: "2,5 a 50 kg" }, { name: "Incremento", value: "2,5 kg" }, { name: "Revestimento", value: "PU" }],
    blocks: [
      quick("resposta-rapida", "O halter de PU PowerBaseFit é oferecido de 2,5 a 50 kg em incrementos de 2,5 kg. É uma opção para academias premium, hotéis, clubes, distribuidores e marcas próprias que valorizam superfície uniforme, identidade visual e apresentação profissional. Logo, cor, marcação e embalagem são confirmados por projeto."),
      definition("definicao", "Halter de PU", "É um halter com revestimento externo de poliuretano sobre a estrutura da cabeça. PU descreve a família do material; desempenho, dureza, acabamento e construção variam por formulação e modelo, por isso devem ser confirmados em ficha e amostra."),
      table("especificacoes", "Especificações técnicas", ["Item", "Configuração", "Verificação"], [
        ["Faixa", "2,5 a 50 kg", "Pesos e unidades"], ["Incremento", "2,5 kg", "Faixa completa ou parcial"], ["Superfície", "PU", "Cor, textura e uniformidade"], ["Empunhadura", "Metálica", "Diâmetro, textura e alinhamento"], ["Logo", "Conforme método aprovado", "Posição, contraste e amostra"], ["Embalagem", "Proteção para exportação", "Contato, caixa e pallet"]
      ]),
      rich("aplicacao", "Aplicações comerciais", "PU costuma ser selecionado para clubes, hotéis, academias premium e showrooms onde acabamento e identidade visual têm alto peso. Isso não dispensa planejamento de faixa, rack e manutenção. O produto precisa atender a rotina real, não apenas a apresentação inicial.", "Distribuidores devem comparar posicionamento, preço, reposição e consistência visual. Uma linha premium incompleta perde valor quando pesos populares ficam sem reposição."),
      rich("material", "Material e comparação", "PU pode oferecer superfície uniforme e boa apresentação, mas não deve ser descrito com promessas universais. Compare formulação, construção, textura, odor, resistência ao contato com rack e método de limpeza. TPU e borracha são alternativas com características distintas.", "Peça amostra e valide mais de um peso quando o tamanho da cabeça muda. A cor deve ser vista sob iluminação adequada e o logo precisa permanecer legível."),
      rich("processo", "Fabricação", "O processo envolve preparação dos componentes, aplicação ou formação do revestimento de PU, união, acabamento, marcação e cura conforme a configuração. Depois, as peças passam por inspeção visual e dimensional, separação por peso e embalagem.", "Projetos OEM adicionam revisão de arquivo, prova de cor e aprovação. Mudanças após a amostra precisam ser registradas antes da produção."),
      checklist("qc", "Controle de qualidade", ["Peso e identificação", "Uniformidade da superfície", "Cor e logo", "Alinhamento e união", "Empunhadura", "Pares e quantidades", "Proteção de embalagem"]),
      rich("embalagem", "Embalagem e transporte", "Superfícies premium precisam de proteção contra atrito e pressão. Separadores e imobilização evitam contato entre peças. A caixa deve respeitar peso e o pallet deve distribuir a carga.", "Confirme número de volumes, peso bruto e combinação com outros produtos. A descarga no destino deve ser planejada."),
      rich("oem", "OEM e informações de compra", "Podem ser avaliados logo, cor, marcação e embalagem. O método e o MOQ dependem do modelo e do volume. Envie pesos, unidades, mercado e identidade visual.", "Compare propostas por construção, especificação, amostra, QC e embalagem. A sigla PU sozinha não garante que dois produtos sejam equivalentes."),
      checklist("rfq", "Dados para cotação", ["Faixa de 2,5 a 50 kg", "Unidades por peso", "Cor e acabamento", "Logo e marcação", "Rack e aplicação", "Embalagem", "Destino, amostra e inspeção"])
    ],
    faq: [["PU é melhor que borracha?", "Depende de ambiente, posicionamento, especificação, manutenção e orçamento. Compare produtos reais."], ["Qual é a faixa?", "2,5 a 50 kg em incrementos de 2,5 kg."], ["Pode receber marca própria?", "Sim, conforme método, quantidade e amostra."], ["Como limpar?", "Use rotina compatível com a especificação, evitando abrasivos e solventes agressivos."], ["Qual é o MOQ?", "É confirmado após revisar faixa, quantidades e personalização."]],
    links: [["dumbbells-category", "Linha de halteres"], ["materials-guide", "Borracha vs. PU vs. TPU"], ["rubber-round-dumbbell", "Halter redondo de borracha"], ["oem-private-label", "Marca própria"], ["contact", "Solicitar cotação"]],
    author: ptBrEditorialAuthor, reviewedBy: ptBrTechnicalReviewer
  },
  {
    id: "rubber-olympic-plate", type: "product", enPath: "/products/weight-plates/rubber-olympic-plate", ptPath: "/pt/produtos/anilhas/anilha-olimpica-emborrachada", enTitle: "Rubber Olympic Plate", sku: "RUBBER-OLY-PLATE",
    title: "Anilha olímpica emborrachada para academia | PowerBaseFit",
    description: "Anilha olímpica emborrachada para barras e academias, com inserto metálico, logo, kg/lb, marca própria, QC e embalagem de exportação para compradores B2B.",
    h1: "Anilha olímpica emborrachada para uso comercial",
    image: ["/assets/products/weight-plates/catalog/rubber-olympic-plate.jpg", "Anilha olímpica emborrachada para academia profissional"],
    material: "Anilha revestida de borracha com inserto central metálico", category: "Anilha olímpica",
    specifications: [{ name: "Centro", value: "Padrão olímpico conforme modelo" }, { name: "Revestimento", value: "Borracha preta" }, { name: "Uso", value: "Barras e áreas de musculação" }],
    blocks: [
      quick("resposta-rapida", "A anilha olímpica emborrachada PowerBaseFit é uma opção prática para barras e áreas de musculação comercial. Usa revestimento de borracha e inserto central metálico. Furação, pesos, espessura, tolerância, marcação, logo e embalagem devem ser confirmados no pedido; ela não deve ser confundida automaticamente com uma bumper plate."),
      definition("definicao", "Anilha olímpica emborrachada", "É uma anilha compatível com manga de barra olímpica, com corpo ou cobertura de borracha e centro metálico. É usada em musculação e barras; sua construção não implica que foi projetada para quedas como uma bumper plate."),
      table("especificacoes", "Especificações técnicas a confirmar", ["Item", "Configuração", "Decisão B2B"], [
        ["Centro", "Inserto metálico olímpico", "Confirmar dimensão e tolerância"], ["Revestimento", "Borracha preta", "Superfície, odor e acabamento"], ["Pesos", "Conforme conjunto cotado", "Quantidade por peso"], ["Espessura", "Varia por peso", "Carga possível na manga"], ["Marca", "Logo e kg/lb sujeitos a avaliação", "Método e amostra"], ["Embalagem", "Caixa/pallet", "Peso bruto e manuseio"]
      ]),
      rich("aplicacao", "Aplicações comerciais", "O modelo atende barras em musculação, máquinas plate-loaded compatíveis, academias, hotéis e distribuição. A seleção deve começar pela barra e pelo equipamento. Confirme padrão e capacidade antes de comprar.", "Para áreas com quedas planejadas, avalie bumper plates e piso apropriado. A anilha emborrachada é escolhida principalmente por manuseio, superfície e uso recorrente, não como autorização para soltar a barra."),
      rich("material", "Material e manutenção", "O revestimento reduz contato direto do metal e oferece acabamento conhecido. Ainda assim, impacto, umidade, limpeza agressiva e armazenamento inadequado podem danificar superfície e inserto.", "Inspecione bordas, marcação, pegadas quando existirem e encaixe central. Armazene em suporte compatível e evite peças soltas em circulação."),
      rich("processo", "Fabricação", "O processo inclui preparação do corpo, revestimento de borracha, acabamento do centro, verificação de peso, limpeza e embalagem. A sequência varia por configuração. Opções OEM passam por revisão de logo e marcação.", "A amostra deve registrar superfície, centro, identificação e proteção. O lote precisa ser comparado com critérios objetivos."),
      checklist("qc", "Controle de qualidade", ["Peso e marcação", "Diâmetro interno", "Inserto e acabamento do centro", "Superfície e bordas", "Logo e cor", "Quantidade por peso", "Caixa e pallet"]),
      rich("embalagem", "Embalagem e logística", "Anilhas são produtos densos. Confirme peso por caixa, reforço, pallet e identificação. O mix de pesos altera número de volumes e distribuição da carga.", "Para calcular custo total, some produto, embalagem, frete, seguro quando aplicável e despesas no destino com apoio de profissionais responsáveis."),
      rich("oem", "OEM e compra B2B", "Logo em relevo ou outro método, marcação, kg/lb e embalagem podem ser avaliados conforme o modelo. O MOQ depende de pesos, quantidades e personalização.", "Envie tipo de barra, uso, pesos, unidades, mercado e destino. A proposta deve diferenciar anilha olímpica emborrachada de bumper plate."),
      checklist("rfq", "Dados para cotação", ["Barra e equipamento", "Pesos e quantidades", "Espessura ou tolerância necessária", "Logo e kg/lb", "Embalagem", "Destino", "Amostra e inspeção"])
    ],
    faq: [["Anilha olímpica emborrachada é bumper?", "Não necessariamente. Olímpica indica compatibilidade; bumper indica construção para levantamento."], ["Qual é o diâmetro interno?", "Deve ser confirmado na ficha do modelo cotado e comparado à barra."], ["Pode ser usada em máquinas?", "Sim, quando a máquina é compatível com o padrão, carga e dimensões."], ["Pode receber logo?", "Pode, conforme método, quantidade e amostra."], ["Como é embalada?", "Por caixa e pallet conforme peso e composição do pedido."]],
    links: [["weight-plates-category", "Ver anilhas"], ["rubber-bumper-plate", "Comparar com bumper"], ["olympic-vs-standard-guide", "Olímpica vs. padrão"], ["oem-private-label", "Personalização"], ["contact", "Solicitar cotação"]],
    author: ptBrEditorialAuthor, reviewedBy: ptBrTechnicalReviewer
  }
];
