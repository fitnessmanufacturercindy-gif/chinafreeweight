import type { PilotPage } from "./pt-br-types";
import { checklist, definition, quick, rich, table } from "./pt-br-content-helpers";
import { ptBrEditorialAuthor, ptBrTechnicalReviewer } from "./pt-br-existing-growth";

const editorial = ptBrEditorialAuthor;
const reviewer = ptBrTechnicalReviewer;
const releaseDate = "2026-07-17T08:00:00.000Z";

export const seoExpansionPortuguesePages: PilotPage[] = [
  {
    id: "racks-benches-category",
    type: "product_category",
    enPath: "/products/racks-benches",
    ptPath: "/pt/produtos/racks-e-bancos",
    enTitle: "Commercial Racks and Benches",
    title: "Racks e bancos para academia no atacado e OEM | PowerBaseFit",
    description: "Racks, gaiolas, máquinas Smith e bancos profissionais direto do fabricante, com OEM, marca própria, QC e embalagem para importadores e academias.",
    h1: "Racks e bancos profissionais para academias e distribuidores",
    image: ["/assets/racks-benches.webp", "Rack e banco profissional para academia comercial"],
    blocks: [
      quick("resposta-rapida", "A PowerBaseFit fornece racks, gaiolas, estações funcionais, máquinas Smith e bancos para compradores B2B. A seleção deve considerar uso, espaço, carga prevista, ajustes, montagem, embalagem e assistência local. Para cotar, o comprador envia modelos, quantidades, destino e requisitos de marca própria; dimensões, capacidade e configuração são confirmadas para cada referência."),
      definition("definicao", "Racks e bancos para academia", "São estruturas de suporte e estações de treino usadas para organizar barras, orientar movimentos e posicionar o usuário. Em uma compra profissional, não basta escolher pela aparência: estabilidade, geometria, pontos de ajuste, capacidade declarada, acabamento, montagem e compatibilidade com os demais equipamentos precisam constar na especificação aprovada."),
      table("categorias", "Tipos de racks e bancos", ["Categoria", "Aplicação comercial", "O que confirmar"], [
        ["Power rack e gaiola", "Agachamento, supino e treinamento livre", "Dimensões, furação, barras de segurança e acessórios"],
        ["Máquina Smith", "Movimentos guiados e áreas de musculação", "Curso, guias, travas, contrapeso e carga"],
        ["Functional trainer", "Treino com cabos e estações multifuncionais", "Relação de polias, curso, pilhas e acessórios"],
        ["Banco ajustável", "Supino reto, inclinado e exercícios com halteres", "Ângulos, mecanismo, estofamento, rodas e capacidade"],
        ["Banco fixo", "Estações dedicadas e áreas de peso livre", "Altura, base, apoio e aplicação"],
        ["Armazenamento", "Organização de barras, anilhas e halteres", "Compatibilidade, carga e circulação"]
      ]),
      rich("planejamento", "Como especificar uma área profissional", "Comece pela planta, pelo número de usuários e pelos exercícios previstos. Reserve circulação ao redor das estruturas, espaço para carregar barras e distância segura entre estações. A posição do equipamento parado não representa todo o espaço operacional: portas, braços, bancos, cabos e anilhas também ocupam área durante o uso.", "Distribuidores devem separar modelos residenciais de linhas destinadas a academias e definir como peças de reposição, manuais e ferragens serão identificados. Projetos de academia devem confirmar piso, pé-direito, acesso para montagem e responsabilidades locais. A PowerBaseFit fornece informações do produto; instalação, ancoragem e segurança do ambiente devem seguir o projeto e as normas aplicáveis no destino."),
      rich("materiais", "Estrutura, acabamento e componentes", "A construção pode combinar tubos e chapas de aço, peças usinadas, cabos, polias, guias, rolamentos, estofamento, borracha e fixadores. A ficha de cada modelo deve informar dimensões e componentes relevantes. Termos como “aço reforçado” ou “uso comercial” não substituem espessura, seção, capacidade, curso e método de montagem.", "No acabamento, revise preparação da superfície, pintura, uniformidade, bordas, soldas visíveis e proteção nas áreas de contato. Em bancos, avalie base, mecanismo de ajuste, folgas, densidade e revestimento do estofamento. Em equipamentos com cabos, confirme terminais, alinhamento, relação de polias e percurso antes da aprovação."),
      checklist("qc", "Checklist de controle de qualidade", ["Modelo e dimensões principais", "Geometria, alinhamento e estabilidade", "Soldas e acabamento superficial", "Travas, pinos e pontos de ajuste", "Cabos, polias e guias quando aplicável", "Estofamento, costuras e apoio", "Ferragens, manual e identificação", "Quantidade de volumes e proteção da embalagem"]),
      rich("oem", "OEM, cores e marca própria", "A personalização pode incluir cor da estrutura, logotipo, etiquetas, estofamento e embalagem, conforme a construção e a quantidade. O arquivo da marca, referências de cor, posição e método devem ser aprovados antes da produção. Alterações de dimensão, estrutura ou ferramenta são diferentes de uma personalização visual e podem mudar MOQ, prazo e custo.", "Para uma cotação comparável, envie uma lista por modelo, quantidade, mercado, cor, logotipo, tensão elétrica quando houver componentes aplicáveis, embalagem e destino. O MOQ é confirmado depois dessa análise; não existe uma quantidade única válida para toda a categoria."),
      rich("embalagem", "Embalagem, montagem e transporte", "Racks e bancos ocupam mais volume do que halteres e anilhas. Muitos modelos são despachados desmontados ou parcialmente montados para reduzir volume, o que exige identificação clara de peças, ferragens e volumes. Superfícies pintadas, hastes, guias, estofamento e componentes móveis precisam de separação para evitar atrito.", "O comprador deve comparar cubagem, peso bruto, número de caixas, paletização e sequência de descarga. Também deve planejar equipe, ferramentas, acesso e conferência no destino. A condição comercial da cotação define até onde vai a responsabilidade de transporte; impostos, instalação e requisitos locais precisam ser calculados para a operação real."),
      checklist("cotacao", "Dados para solicitar cotação", ["Empresa, país e canal de venda", "Modelos e quantidades", "Planta ou área disponível", "Uso e perfil dos usuários", "Dimensões e capacidades necessárias", "Cor, logotipo e estofamento", "Embalagem, montagem e manuais", "Porto ou cidade de destino e prazo"])
    ],
    faq: [
      ["Como escolher racks para uma academia profissional?", "Relacione exercícios, espaço, número de usuários, barras, anilhas e necessidade de segurança. Depois compare dimensões, estrutura, ajustes, acessórios, montagem e critérios de inspeção do modelo real."],
      ["Os racks e bancos podem receber minha marca?", "Sim, conforme o modelo e a quantidade. Cor, logotipo, etiquetas, estofamento e embalagem são avaliados no projeto OEM."],
      ["Qual é o MOQ para racks e bancos?", "Varia por modelo, configuração e personalização. A fábrica confirma a quantidade depois de revisar a lista completa."],
      ["Os equipamentos chegam montados?", "Depende do modelo e do plano de embalagem. A cotação deve indicar quantidade de volumes, nível de montagem e ferragens incluídas."],
      ["Como verificar a qualidade antes do embarque?", "Defina dimensões, acabamento, alinhamento, ajustes, componentes, identificação e embalagem como critérios mensuráveis; uma inspeção externa pode ser contratada conforme o risco."]
    ],
    links: [["products-hub", "Ver todos os equipamentos"], ["dumbbells-category", "Halteres profissionais"], ["weight-plates-category", "Anilhas para academia"], ["factory", "Conhecer a fábrica"], ["oem-private-label", "Projeto OEM e marca própria"], ["contact", "Solicitar cotação"]],
    author: editorial,
    reviewedBy: reviewer,
    updatedAt: releaseDate,
    publishedAt: releaseDate
  },
  {
    id: "gym-accessories-category",
    type: "product_category",
    enPath: "/products/gym-accessories",
    ptPath: "/pt/produtos/acessorios-de-academia",
    enTitle: "Commercial Gym Accessories",
    title: "Acessórios para academia no atacado e marca própria | PowerBaseFit",
    description: "Acessórios de musculação e treino funcional para distribuidores e academias, com mix B2B, OEM, QC, embalagem e fornecimento direto de fábrica.",
    h1: "Acessórios para academia no atacado e para projetos B2B",
    image: ["/assets/gym-accessories.webp", "Acessórios profissionais de musculação e treino funcional"],
    blocks: [
      quick("resposta-rapida", "A linha de acessórios da PowerBaseFit inclui kettlebells, puxadores para cabos, cordas, barras, colchonetes, bolas e itens de treinamento funcional conforme o catálogo vigente. Para atacado ou marca própria, o mix deve ser organizado por uso, material, faixa de peso, compatibilidade, embalagem e giro comercial, em vez de reunir itens sem função definida."),
      definition("definicao", "Acessórios para academia no atacado", "São produtos comprados em quantidade por distribuidores, importadores, lojas ou projetos de academias para complementar áreas de musculação e treinamento funcional. Cada item precisa de referência, quantidade, material, dimensão, cor, embalagem e critério de qualidade; “acessório fitness” é uma categoria ampla, não uma especificação."),
      table("mix", "Como organizar o mix de acessórios", ["Grupo", "Exemplos do catálogo", "Decisão de compra"], [
        ["Kettlebells", "Ferro fundido, vinil e competição", "Pesos, alça, base, superfície e marcação"],
        ["Puxadores de cabo", "Barras, pegadores, cordas e conjuntos", "Encaixe, largura, rotação, revestimento e carga"],
        ["Treino funcional", "Bolas, tubos e plataformas", "Material, dimensão, uso, armazenamento e embalagem"],
        ["Yoga e mobilidade", "Tapetes e bolas", "Espessura, textura, material e odor"],
        ["Venda complementar", "Itens combinados com equipamentos principais", "Margem, reposição, volume e apresentação"]
      ]),
      rich("selecao", "Seleção para academias, distribuidores e importadores", "Uma academia deve relacionar acessórios às estações existentes e ao programa de treino. Puxadores precisam ser compatíveis com cabos e mosquetões; kettlebells exigem faixa de pesos e armazenamento; tapetes, bolas e plataformas precisam de rotina de limpeza e espaço. Comprar um kit amplo sem verificar uso costuma criar itens parados.", "Para distribuição, avalie preço por faixa, volume, proteção, etiquetagem e reposição. Itens pequenos podem melhorar o aproveitamento comercial da carga, mas também aumentam o número de SKUs e a complexidade de conferência. A lista de cotação deve trazer quantidade por referência, não apenas um valor total."),
      rich("materiais", "Materiais e critérios técnicos", "Os materiais variam entre ferro, aço, borracha, vinil, TPE, plásticos, espuma, tecidos e componentes de rotação. A seleção depende do produto real. Confirme dimensões, peso, tolerância, dureza ou espessura quando relevante, acabamento, pontos de união e compatibilidade.", "Para puxadores, revise soldas, eixos, rolamentos ou buchas, superfície de pegada e ponto de conexão. Para kettlebells, verifique peso, alça, base e revestimento. Para tapetes e bolas, confirme material, espessura ou diâmetro, textura, válvula quando aplicável e embalagem. Essas informações devem aparecer na ficha ou na amostra aprovada."),
      checklist("qc", "Controle de qualidade por lote", ["Referência, cor e quantidade", "Peso e dimensões aplicáveis", "Superfície, odor e acabamento", "Uniões, costuras, válvulas ou rotação", "Compatibilidade com o equipamento", "Logotipo e etiqueta", "Unidades por caixa e peso bruto", "Proteção contra deformação e atrito"]),
      rich("oem", "Marca própria e apresentação no atacado", "Logotipo, cores, etiquetas, manual e embalagem podem ser avaliados conforme produto, método e quantidade. A área disponível para marca varia muito entre uma barra de cabo, um kettlebell e um tapete. O desenho deve ser testado no item real e aprovado antes de liberar o lote.", "O MOQ pode ser definido por modelo, cor, peso ou método de personalização. Combinar acessórios em uma carga não elimina automaticamente o mínimo de cada processo. A PowerBaseFit revisa o mix e informa quais itens podem compartilhar programação ou embalagem."),
      rich("logistica", "Embalagem e custo total", "Acessórios combinam produtos densos, frágeis, flexíveis e volumosos. Kettlebells exigem caixas resistentes; superfícies metálicas precisam de separação; itens flexíveis não devem ficar deformados; bolas e componentes com válvula exigem instruções adequadas. O plano deve informar unidades, dimensões e peso por caixa.", "Para calcular o custo no Brasil, some produto, personalização, amostra, inspeção, frete, seguro quando aplicável, despacho, tributos, armazenagem e entrega local. O fornecedor pode apoiar com dados de produto e carga, mas a classificação e os requisitos da importação devem ser validados para a operação concreta."),
      checklist("cotacao", "Checklist para cotar acessórios", ["Canal de venda ou tipo de academia", "Referências e quantidades", "Pesos, medidas e compatibilidade", "Material e acabamento", "Cor, logo e embalagem", "Etiqueta e idioma do mercado", "Inspeção e amostra", "Destino e condição comercial"])
    ],
    faq: [
      ["Quais acessórios de academia podem ser comprados no atacado?", "O catálogo inclui kettlebells, puxadores, itens funcionais, tapetes, bolas e outros acessórios. A disponibilidade e a especificação são confirmadas por referência."],
      ["É possível misturar diferentes acessórios no mesmo pedido?", "Sim, sujeito ao MOQ e à embalagem de cada item. A composição deve ser analisada por peso, volume e processo."],
      ["A PowerBaseFit faz acessórios com marca própria?", "Pode avaliar logotipo, cor, etiqueta e embalagem conforme produto, quantidade e método."],
      ["Como verificar a compatibilidade de um puxador?", "Informe ponto de conexão, dimensões, movimento, equipamento e carga prevista; aprove uma amostra quando a compatibilidade for crítica."],
      ["O preço de fábrica inclui impostos no Brasil?", "Não necessariamente. A condição comercial deve ser definida, e os custos de importação e destino devem ser calculados separadamente."]
    ],
    links: [["products-hub", "Equipamentos para academia"], ["dumbbells-category", "Linha de halteres"], ["weight-plates-category", "Linha de anilhas"], ["factory", "Processo de fábrica"], ["oem-private-label", "Marca própria"], ["contact", "Pedir cotação de acessórios"]],
    author: editorial,
    reviewedBy: reviewer,
    updatedAt: releaseDate,
    publishedAt: releaseDate
  },
  {
    id: "rubber-hex-dumbbell-manufacturer",
    type: "landing",
    enPath: "/manufacturer/rubber-hex-dumbbells-manufacturer",
    ptPath: "/pt/fabricante/halteres-sextavados-de-borracha",
    enTitle: "Rubber Hex Dumbbell Manufacturer",
    title: "Fabricante de halteres sextavados de borracha OEM | PowerBaseFit",
    description: "Fabricante de halteres sextavados de borracha de 2,5 a 50 kg para atacado, importação e marca própria, com OEM, QC e embalagem de exportação.",
    h1: "Fabricante de halteres sextavados de borracha para compradores B2B",
    image: ["/assets/products/dumbbells/catalog-v2/hex-dumbbell-kg.webp", "Fabricação de halter sextavado de borracha com marca própria"],
    blocks: [
      quick("resposta-rapida", "A PowerBaseFit fabrica o modelo Rubber Hex Dumbbell em faixa cadastrada de 2,5 a 50 kg, com incrementos de 2,5 kg. Distribuidores, importadores e marcas podem solicitar avaliação de logotipo, marcação, cor e embalagem. A proposta final confirma construção, pesos, unidades por peso, tolerâncias, amostra, MOQ, controle de qualidade e condição de entrega."),
      definition("definicao", "Fabricante de halteres sextavados de borracha", "É a empresa responsável por transformar componentes e materiais definidos em halteres com cabeça de seis lados, revestimento de borracha e empunhadura metálica, seguindo uma especificação de peso, acabamento, identificação e embalagem. Um fabricante B2B deve documentar o modelo e os critérios do pedido, não apenas apresentar fotografias genéricas."),
      table("especificacao", "Referência técnica do modelo", ["Item", "Referência publicada", "Confirmação necessária"], [
        ["Produto", "Rubber Hex Dumbbell / halter sextavado", "Código e versão exata"],
        ["Faixa", "2,5 a 50 kg", "Pesos e unidades por peso"],
        ["Incremento", "2,5 kg no modelo em kg", "Mix adequado ao mercado"],
        ["Construção", "Cabeça sextavada revestida e empunhadura metálica", "União, textura e acabamento"],
        ["Identificação", "Peso e logotipo conforme viabilidade", "kg/lb, posição, contraste e amostra"],
        ["Embalagem", "Definida pelo peso e pela carga", "Unidades, proteção, caixa e pallet"]
      ]),
      rich("aplicacao", "Aplicação comercial e perfil de comprador", "O formato sextavado reduz o rolamento quando o halter é colocado no piso e atende academias, estúdios, hotéis, distribuidores e linhas de marca própria. A escolha deve considerar exercícios, intensidade, armazenamento, piso, limpeza e reposição. O formato não autoriza quedas descontroladas nem substitui racks e regras de uso.", "Para atacado, o comprador deve planejar pares por peso de acordo com o giro. Para academia, deve considerar usuários em horário de pico e repetição dos pesos intermediários. Uma lista uniforme com a mesma quantidade para toda a faixa pode não ser a composição mais eficiente."),
      rich("fabricacao", "Fluxo de fabricação", "O processo parte da confirmação do modelo, materiais, empunhadura, faixa, marcação e embalagem. Os componentes são preparados, as cabeças são formadas conforme a construção definida, a empunhadura é usinada e texturizada quando aplicável, e o conjunto passa por união, revestimento, acabamento, limpeza e identificação.", "A sequência e os parâmetros variam conforme o modelo. Por isso, a amostra e a ficha aprovada são referências importantes. Mudanças de borracha, dureza, cor, empunhadura, método de logo ou embalagem depois da aprovação podem alterar prazo, custo e controle."),
      checklist("qc", "Pontos de inspeção", ["Modelo, peso nominal e quantidade", "Tolerância de peso acordada", "Formato e estabilidade da cabeça", "União entre cabeça e empunhadura", "Diâmetro, textura e alinhamento da pegada", "Superfície, odor, cor e acabamento", "Legibilidade do peso e do logotipo", "Proteção, identificação e peso por caixa"]),
      rich("oem", "OEM, ODM e marca própria", "O programa pode avaliar logotipo, marcação em kg ou lb, cores e embalagem. Uma alteração visual sobre o modelo existente costuma ter escopo diferente de uma mudança de forma, material ou ferramenta. A fábrica informa o que é viável depois de revisar arquivo, quantidades e objetivo comercial.", "Para reduzir retrabalho, envie o logotipo em arquivo vetorial, referências de cor, tamanho desejado, mercado, pesos e unidades. A amostra deve confirmar proporção e leitura em cabeças de tamanhos diferentes. ODM ou modificações estruturais exigem avaliação técnica separada e não são prometidos sem revisão."),
      rich("moq", "MOQ, amostra e preparação da compra", "Não há um MOQ universal para todo projeto. A quantidade depende do conjunto de pesos, método de personalização, embalagem e programação de produção. Um pedido pode alcançar volume total relevante e ainda precisar respeitar mínimos por peso, cor ou processo.", "A solicitação inicial deve trazer empresa, país, canal, faixa, unidades por peso, logo, embalagem, destino e prazo. A partir daí são definidos preço, amostra, calendário, inspeção e condição comercial. O comprador deve comparar propostas com a mesma especificação e não apenas pelo preço unitário."),
      rich("embalagem", "Embalagem e exportação", "Halteres concentram massa e podem marcar uns aos outros quando se movimentam. A embalagem deve separar superfícies, limitar o peso por caixa, identificar o conteúdo e formar pallets compatíveis com a operação. O plano de contêiner precisa equilibrar peso, volume e sequência de descarga.", "A PowerBaseFit fornece dados de produto, embalagem e preparação de exportação. Frete, seguro, classificação, tributos, despacho e entrega no Brasil dependem da rota e da operação do comprador e devem ser verificados com os responsáveis locais."),
      checklist("fornecedor", "Checklist para avaliar um fornecedor", ["Modelo e construção identificados", "Faixa de pesos disponível", "Amostra ligada à especificação", "Critérios mensuráveis de QC", "Método de logo e embalagem", "MOQ explicado por configuração", "Lista de volumes e dados de carga", "Responsabilidades e condição comercial documentadas"])
    ],
    faq: [
      ["A PowerBaseFit é fabricante de halteres sextavados?", "Sim. A empresa apresenta o Rubber Hex Dumbbell dentro de sua linha de pesos livres e atende projetos B2B com especificação e personalização avaliadas por pedido."],
      ["Qual é a faixa de peso disponível?", "O modelo em kg publicado cobre de 2,5 a 50 kg, em incrementos de 2,5 kg."],
      ["Posso importar halteres com minha marca?", "Sim, sujeito à análise do logotipo, método, pesos, quantidade, amostra, MOQ e embalagem."],
      ["Como o peso é verificado?", "A tolerância deve ser acordada e o lote pode ser conferido por amostragem ou plano de inspeção definido antes da produção."],
      ["O MOQ é por peso ou pelo pedido total?", "Depende do processo e da composição. A fábrica deve informar mínimos relevantes depois de analisar a lista completa."],
      ["Como solicitar uma cotação?", "Envie pesos, unidades por peso, mercado, logo, embalagem, destino e prazo para receber uma proposta comparável."]
    ],
    links: [["rubber-hex-dumbbell", "Ver o halter sextavado"], ["dumbbells-category", "Comparar linhas de halteres"], ["oem-private-label", "Entender marca própria"], ["factory", "Conhecer fabricação e QC"], ["factory-guide", "Avaliar uma fábrica na China"], ["contact", "Solicitar cotação OEM"]],
    author: editorial,
    reviewedBy: reviewer,
    updatedAt: releaseDate,
    publishedAt: releaseDate
  }
];
