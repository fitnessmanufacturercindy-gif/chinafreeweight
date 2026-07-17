import type { PilotPage } from "./pt-br-types";
import { checklist, definition, quick, rich, table } from "./pt-br-content-helpers";

const editorial = { id: "powerbasefit-editorial", name: "Equipe PowerBaseFit", kind: "Organization" as const, role: "Conteúdo técnico B2B" };
const reviewer = { id: "powerbasefit-production-export", name: "Equipe de Produção e Exportação PowerBaseFit", kind: "Organization" as const, role: "Revisão de fabricação e exportação" };

export const existingPageEnhancements: Record<string, Partial<PilotPage>> = {
  home: {
    title: "Fabricante de equipamentos de musculação B2B | PowerBaseFit",
    blocks: [
      quick("resposta-rapida", "A PowerBaseFit fabrica equipamentos de musculação para distribuidores, importadores, marcas próprias e projetos de academias. O escopo inclui halteres, anilhas, racks, bancos e acessórios, com opções OEM, identificação em kg ou lb, embalagem de exportação e planejamento de pedidos por mercado."),
      definition("definicao", "Fabricante B2B de equipamentos de musculação", "É uma fábrica que atende empresas, e não apenas consumidores finais. O comprador define modelos, quantidades, faixa de pesos, personalização, embalagem e destino; a fábrica analisa viabilidade, MOQ, amostra, produção, inspeção e preparação do embarque."),
      rich("compradores", "Soluções para compradores B2B no Brasil", "Uma compra profissional começa pelo modelo de negócio. Um distribuidor precisa equilibrar giro, margem, reposição e apresentação da marca. Uma academia avalia intensidade de uso, número de usuários, espaço, manutenção e coerência entre pesos. Um importador também considera peso por caixa, aproveitamento do contêiner, documentação e custo total até o destino. Por isso, a cotação não deve ser apenas uma lista de preços: ela precisa relacionar produto, quantidade, aplicação e logística.", "A PowerBaseFit organiza a conversa comercial a partir de uma lista objetiva. Para halteres, informe sistema em kg ou lb, pesos desejados e unidades por peso. Para anilhas, indique tipo de barra, uso previsto, pesos e necessidade de bumper plates. Para racks e bancos, envie dimensões disponíveis e configuração. Quando houver marca própria, inclua arquivo do logotipo, cores e padrão de embalagem."),
      table("solucoes", "Linhas de fornecimento", ["Linha", "Aplicação comercial", "Decisões do comprador"], [
        ["Halteres", "Academias, hotéis, estúdios e revenda", "Formato, material, faixa de pesos, empunhadura e rack"],
        ["Anilhas", "Musculação, levantamento e treinamento funcional", "Furação, material, espessura, tolerância e piso"],
        ["Racks e bancos", "Áreas de força e projetos completos", "Dimensões, estrutura, acabamento e montagem"],
        ["OEM e marca própria", "Distribuidores, importadores e marcas fitness", "Logo, cores, kg/lb, embalagem, amostra e MOQ"]
      ]),
      rich("oem", "OEM, ODM e marca própria", "A personalização possível depende da construção de cada produto. Em muitos modelos, podem ser avaliados logotipo, placa ou marcação de peso, cor, acabamento e embalagem. Mudanças simples de identidade visual são diferentes de alterações que exigem molde, ferramenta ou desenvolvimento estrutural. Essa distinção precisa aparecer antes do orçamento para que custo, MOQ e prazo sejam realistas.", "O fluxo recomendado é confirmar o produto base, revisar arquivos, produzir ou aprovar uma amostra quando necessário e registrar a especificação final. A produção deve seguir essa referência. O comprador também precisa definir como a marca será apresentada no ponto de venda: unidade avulsa, par, conjunto ou linha completa. A embalagem deve proteger o acabamento e manter as informações comerciais legíveis."),
      rich("fabrica-exportacao", "Fábrica e preparação para exportação", "A base de fabricação da PowerBaseFit fica em Dezhou, província de Shandong, China. A empresa informa operação desde 2008 e área fabril de aproximadamente 8.000 m². Esses dados descrevem a instalação; não substituem a avaliação do comprador, a aprovação de amostras ou uma inspeção independente quando o risco do pedido justificar.", "Pesos livres concentram muita massa em pouco volume. Por isso, embalagem, limite por caixa, resistência do pallet e distribuição da carga precisam ser planejados junto com o mix. O prazo varia conforme produto, quantidade, materiais e personalização. Pedidos padrão podem ser expedidos em torno de dez dias após o depósito apenas quando materiais e agenda estão confirmados; projetos personalizados exigem validação específica."),
      checklist("dados-cotacao", "Informações para uma cotação útil", ["Empresa, mercado de destino e canal de venda", "Lista de produtos e quantidades por modelo ou peso", "Sistema em kg ou lb e requisitos de marcação", "Logotipo, cores e expectativa de embalagem", "Porto ou cidade de destino para planejamento logístico", "Necessidade de amostra, inspeção ou documentação adicional"])
    ],
    faq: [
      ["A PowerBaseFit vende equipamentos de academia no atacado para o Brasil?", "Sim. O atendimento é B2B e pode atender distribuidores, importadores, marcas e projetos de academias. A fábrica confirma disponibilidade, MOQ e personalização após revisar a lista do comprador."],
      ["É possível colocar minha marca nos equipamentos?", "Sim, quando a construção do produto permite. Logotipo, cores, marcação em kg ou lb e embalagem podem ser avaliados. O método, a amostra e o MOQ são confirmados antes da produção."],
      ["Como receber uma cotação de fábrica?", "Envie modelos, quantidades, pesos, destino, necessidade de marca própria e prazo desejado. Quanto mais completa for a lista, mais precisa será a análise comercial e logística."],
      ["A fábrica informa um MOQ único para todo o catálogo?", "Não. O MOQ depende do produto, do processo, da personalização e da combinação do pedido. A equipe confirma um mínimo praticável depois de revisar o projeto."]
    ],
    links: [["products-hub", "Explorar equipamentos profissionais"], ["dumbbells-category", "Ver halteres para academia"], ["weight-plates-category", "Ver anilhas e bumper plates"], ["oem-private-label", "Entender OEM e marca própria"], ["factory", "Conhecer a fábrica"], ["contact", "Solicitar cotação"]],
    author: editorial,
    reviewedBy: reviewer
  },
  "dumbbells-category": {
    title: "Halteres profissionais no atacado | PowerBaseFit",
    blocks: [
      quick("resposta-rapida", "Para uma academia profissional, o melhor programa de halteres combina material adequado ao uso, faixa de pesos coerente, pares repetidos nos pesos mais procurados, rack compatível e possibilidade de reposição. A PowerBaseFit fornece modelos de borracha, cromados, PU e outras construções para compradores B2B."),
      definition("definicao", "Halter profissional", "Halter profissional é um peso livre especificado para uso recorrente em academia, estúdio, hotel ou operação de revenda. A decisão não depende apenas do visual: construção da cabeça, união com a empunhadura, revestimento, marcação, tolerância, limpeza e armazenamento influenciam o desempenho comercial."),
      rich("criterios", "Como especificar uma linha de halteres", "O comprador deve começar pelo público e pelo ambiente. Academias de alto fluxo precisam considerar facilidade de reposição, resistência do acabamento e duplicação de pesos populares. Hotéis e estúdios podem priorizar aparência, menor faixa de peso e organização compacta. Distribuidores precisam avaliar quais modelos têm procura local e como apresentar conjuntos em kg ou lb.", "A faixa não deve ser escolhida por hábito. Ela deve refletir exercícios, perfil dos usuários, número de posições no rack e orçamento. Incrementos regulares tornam a progressão mais previsível. Para pesos com uso simultâneo frequente, pode ser necessário comprar mais de um par. A análise deve incluir comprimento do rack e circulação em frente à área de treino."),
      table("comparacao", "Comparação inicial de halteres", ["Modelo", "Ponto forte", "Aplicação típica", "Atenção de compra"], [
        ["Sextavado de borracha", "Estabilidade no piso e formato conhecido", "Academias, funcional e atacado", "Checar união, empunhadura, odor e marcação"],
        ["Redondo de borracha", "Linha completa e organização em rack", "Áreas comerciais de pesos livres", "Confirmar faixa, diâmetro da cabeça e suporte"],
        ["Cromado", "Visual compacto e premium", "Hotéis, estúdios e showrooms", "Avaliar umidade, limpeza e proteção no transporte"],
        ["PU", "Acabamento uniforme e posicionamento premium", "Clubes, redes e marca própria", "Comparar formulação, superfície, logo e amostra"]
      ]),
      rich("materiais", "Material, empunhadura e identificação", "Borracha, PU e acabamentos metálicos respondem de maneira diferente ao ambiente. Não existe material universalmente melhor. O comprador deve comparar aparência, odor, contato com o rack, rotina de limpeza, exposição à umidade e expectativa de vida útil. A empunhadura precisa ser analisada por diâmetro, textura, comprimento e consistência entre pesos.", "A marcação deve ser legível durante o uso e a reposição no rack. Em linhas OEM, é importante aprovar posição, tamanho e contraste do logotipo. Se o programa atende mais de um mercado, defina antecipadamente se haverá kg, lb ou versões separadas. Misturar sistemas sem planejamento pode confundir o usuário e complicar o estoque."),
      rich("qualidade", "Produção, inspeção e embalagem", "Os pontos de controle dependem do modelo, mas podem incluir peso, dimensões, superfície, união entre componentes, textura da empunhadura, legibilidade e quantidade. Uma amostra aprovada ajuda a registrar expectativa de cor, acabamento e aplicação do logo. No lote, a inspeção deve usar critérios mensuráveis, não apenas a impressão de que o produto parece bom.", "Durante o transporte, halteres podem marcar uns aos outros se houver contato e movimento dentro da caixa. A embalagem deve limitar atrito, distribuir o peso e permanecer manuseável. O comprador deve confirmar unidades por caixa, peso bruto, pallet e identificação externa antes do embarque."),
      checklist("checklist", "Checklist para solicitar cotação", ["Modelo e material desejados", "Faixa de pesos e incremento", "Quantidade por peso", "Sistema kg ou lb", "Logotipo, cores e embalagem", "Mercado e destino da carga", "Necessidade de rack, amostra e inspeção"])
    ],
    faq: [
      ["Qual é o melhor halter para uma academia profissional?", "Depende do ambiente, intensidade, manutenção e posicionamento. Sextavados de borracha são versáteis; redondos organizam bem uma linha completa; cromados e PU atendem projetos que priorizam apresentação."],
      ["Posso comprar halteres com meu logotipo?", "Sim, conforme o modelo. Envie o arquivo, a faixa de pesos e as quantidades para confirmar método, amostra, MOQ e embalagem."],
      ["Quantos pares de cada peso devo comprar?", "Calcule pelo pico de usuários, exercícios predominantes e espaço de rack. Pesos muito procurados podem exigir pares duplicados; não existe quantidade universal."],
      ["Halter em kg e halter em lb podem usar o mesmo projeto?", "Muitos modelos permitem versões distintas, mas marcação, faixa e embalagem precisam ser definidas separadamente para evitar confusão no estoque e no uso."]
    ],
    links: [["rubber-hex-dumbbell", "Halter sextavado de borracha"], ["rubber-round-dumbbell", "Halter redondo de borracha"], ["pu-dumbbell", "Halter de PU"], ["chrome-dumbbell", "Halter cromado"], ["hex-vs-round-guide", "Comparar sextavado e redondo"], ["materials-guide", "Comparar borracha, PU e TPU"], ["contact", "Pedir cotação de halteres"]],
    author: editorial,
    reviewedBy: reviewer
  },
  "weight-plates-category": {
    blocks: [
      quick("resposta-rapida", "A escolha de anilhas para academia começa pela barra e pelo tipo de treino. Anilhas olímpicas atendem barras com manga compatível; bumper plates são escolhidas quando o programa prevê levantamentos com contato planejado com piso apropriado. Material, furação, espessura, tolerância e armazenamento devem ser confirmados por modelo."),
      definition("definicao", "Anilha olímpica", "É uma anilha projetada para barras de padrão olímpico, com inserto central compatível com a manga da barra. O termo não significa automaticamente que a anilha seja uma bumper plate: existem anilhas olímpicas metálicas, emborrachadas, de PU e bumper."),
      rich("aplicacao", "Escolha pela aplicação comercial", "Anilhas convencionais são usadas em barras e equipamentos carregados, onde compactação na manga e facilidade de manuseio podem ser prioritárias. Bumper plates têm construção pensada para levantamento e contato com plataforma ou piso apropriado. Mesmo uma bumper não elimina a necessidade de regras de uso, técnica e proteção do ambiente.", "Para distribuição, o mix deve acompanhar a procura por pesos, modelos e faixas de preço. Para academias, a quantidade deve considerar número de estações, barras e usuários simultâneos. Comprar apenas conjuntos iguais pode gerar excesso de pesos pouco utilizados e falta de pesos necessários para progressão ou montagem de estações."),
      table("comparacao", "Comparação de famílias de anilhas", ["Tipo", "Uso principal", "Vantagem", "Ponto de verificação"], [
        ["Olímpica emborrachada", "Musculação e barras olímpicas", "Manuseio conhecido e proteção de superfície", "Furação, inserto, pegadas e acabamento"],
        ["Bumper de treino", "Levantamento e funcional", "Diâmetro externo consistente", "Espessura, dureza, tolerância e plataforma"],
        ["Bumper de competição", "Treino técnico e ambientes especializados", "Maior foco em tolerância e compactação", "Documentação real do modelo e custo"],
        ["Ferro fundido", "Musculação e equipamentos carregados", "Perfil compacto", "Pintura, oxidação, furação e armazenamento"]
      ]),
      rich("especificacao", "Especificações que precisam constar na cotação", "O comprador deve confirmar pesos disponíveis, diâmetro externo, espessura por peso, diâmetro interno, tolerância, material do corpo, construção do centro e sistema de marcação. Não se deve assumir que produtos visualmente semelhantes têm o mesmo desempenho. A documentação comercial e a amostra aprovada devem registrar os parâmetros relevantes.", "Espessura influencia quanto peso cabe na barra. Furação e inserto influenciam compatibilidade e estabilidade. Marcação e cores afetam identificação. Em programas de marca própria, logo e peso precisam permanecer legíveis depois de uso e limpeza. Cada um desses pontos deve ser associado ao modelo real, não a uma promessa genérica de catálogo."),
      rich("logistica", "OEM, embalagem e logística", "Anilhas permitem personalização por relevo, impressão, placa, cor ou combinações definidas pelo processo do modelo. O MOQ varia porque algumas alterações exigem preparação específica. Antes de produzir, aprove material, posição do logo, marcação em kg ou lb, cor e embalagem.", "Como a carga é densa, a logística deve controlar peso por caixa, resistência do pallet e distribuição no contêiner. A cotação precisa mostrar claramente quantidade de peças, peso líquido e bruto e método de embalagem. O custo unitário isolado não revela o custo real entregue."),
      checklist("checklist", "Checklist B2B para anilhas", ["Tipo de barra e diâmetro da manga", "Uso: musculação, funcional ou levantamento", "Pesos e quantidade por peso", "Espessura e carga máxima planejada na barra", "Piso, plataforma e política de uso", "Logo, cores, kg/lb e embalagem", "Peso por caixa, pallet e plano de contêiner"])
    ],
    faq: [
      ["Qual a diferença entre anilha olímpica e bumper plate?", "Olímpica descreve a compatibilidade com a barra; bumper descreve uma construção voltada a levantamentos com contato com piso apropriado. Uma bumper normalmente é olímpica, mas nem toda anilha olímpica é bumper."],
      ["As anilhas podem ter marca própria?", "Sim, conforme o modelo. Logo, cor, marcação em kg ou lb e embalagem podem ser avaliados antes da amostra e da produção."],
      ["Como escolher os pesos para uma academia?", "Relacione pesos ao número de barras, estações, usuários e tipos de treino. Inclua anilhas menores para progressão e evite comprar a mesma quantidade de todos os pesos sem analisar uso."],
      ["Bumper plate dispensa piso de borracha?", "Não. O produto deve ser usado com plataforma ou piso apropriado e regras de queda compatíveis com o ambiente e a especificação."]
    ],
    links: [["rubber-bumper-plate", "Anilha bumper de borracha"], ["rubber-olympic-plate", "Anilha olímpica emborrachada"], ["plates-guide", "Anilhas comuns ou bumper"], ["olympic-vs-standard-guide", "Anilha olímpica ou padrão"], ["contact", "Solicitar cotação de anilhas"]],
    author: editorial,
    reviewedBy: reviewer
  },
  "rubber-hex-dumbbell": {
    material: "Cabeça revestida de borracha com empunhadura metálica",
    category: "Halter profissional",
    specifications: [{ name: "Faixa de peso", value: "2,5 a 50 kg" }, { name: "Incremento", value: "2,5 kg" }, { name: "Formato", value: "Cabeça sextavada" }, { name: "Personalização", value: "Logo, marcação de peso, cor e embalagem sujeitos a confirmação" }],
    blocks: [
      quick("resposta-rapida", "O halter sextavado de borracha PowerBaseFit é oferecido de 2,5 a 50 kg, em incrementos de 2,5 kg. O formato ajuda a reduzir o rolamento no piso, enquanto a empunhadura metálica e o revestimento de borracha atendem academias, distribuidores e programas OEM. A configuração final é confirmada por ficha e amostra."),
      definition("definicao", "Halter sextavado de borracha", "É um halter com cabeças de seis lados revestidas de borracha e empunhadura metálica. A geometria cria pontos de apoio que reduzem o rolamento e pode favorecer exercícios em que o halter permanece no piso, sem transformar o produto em substituto para um piso adequado."),
      table("especificacoes", "Especificações técnicas", ["Item", "Configuração desta linha", "O que confirmar no pedido"], [
        ["Peso", "2,5 a 50 kg", "Quantidade por peso e tolerância comercial"],
        ["Incremento", "2,5 kg", "Se a faixa completa ou parcial será comprada"],
        ["Cabeça", "Formato sextavado com revestimento de borracha", "Cor, acabamento, odor e marcação"],
        ["Empunhadura", "Metálica e texturizada", "Diâmetro, comprimento, textura e acabamento"],
        ["Identificação", "Peso e opções OEM", "kg, posição do logo e contraste"],
        ["Embalagem", "Proteção para exportação", "Unidades por caixa, peso bruto e pallet"]
      ], "Os detalhes finais devem constar na proposta comercial e na amostra aprovada."),
      rich("aplicacoes", "Aplicações comerciais e planejamento da faixa", "O modelo atende áreas de musculação, treinamento funcional, estúdios, lojas especializadas e linhas de marca própria. Para academias, o formato facilita a colocação temporária no piso e a organização quando o rack é compatível. Para distribuidores, a faixa de 2,5 a 50 kg permite criar conjuntos diferentes por canal e orçamento.", "A quantidade por peso não deve ser uniforme automaticamente. Pesos leves e intermediários costumam atender mais exercícios e usuários simultâneos, enquanto pesos altos exigem avaliação do perfil da academia. O comprador deve relacionar número de pares ao comprimento do rack, à circulação e ao plano de reposição."),
      rich("materiais", "Materiais e construção", "A cabeça utiliza revestimento de borracha sobre a estrutura do halter, e a empunhadura é metálica. O revestimento ajuda a proteger a superfície do produto e reduz contato direto do núcleo com o ambiente, mas não torna o halter indestrutível. Quedas inadequadas, produtos químicos agressivos, calor e racks incompatíveis aceleram o desgaste.", "A união entre cabeça e empunhadura é um ponto importante de inspeção. O comprador deve confirmar o método construtivo do modelo cotado e estabelecer critérios de folga, alinhamento e acabamento. Cor e odor também precisam ser avaliados na amostra, porque formulação, armazenamento e ventilação influenciam a percepção inicial."),
      rich("processo", "Processo de fabricação", "O fluxo inclui preparação dos componentes, formação ou montagem da cabeça, aplicação do revestimento, acabamento da empunhadura, marcação e inspeção. A sequência exata depende da configuração aprovada. Depois da produção, as peças são limpas, separadas por peso e preparadas para proteção individual ou divisão por caixa.", "Projetos OEM acrescentam etapas de revisão de arquivo, prova de cor, método de aplicação do logo e aprovação de amostra. Qualquer alteração posterior deve ser registrada, porque mudar logotipo, embalagem ou faixa de pesos pode afetar custo e cronograma."),
      checklist("qc", "Controle de qualidade recomendado", ["Conferir peso e identificação de cada referência", "Verificar alinhamento e estabilidade das cabeças", "Inspecionar superfície, borracha, rebarbas e marcas", "Avaliar textura e acabamento da empunhadura", "Comparar logo e cor com a amostra aprovada", "Revisar quantidade, pares e separação por peso", "Validar proteção, caixa, pallet e identificação externa"]),
      rich("embalagem", "Embalagem e transporte", "Halteres são densos e podem danificar embalagem ou acabamento quando existe movimento interno. A proteção deve reduzir atrito entre metal, borracha e peças vizinhas. O comprador precisa revisar unidades por caixa, peso bruto e forma de paletização para que manuseio e armazenagem sejam realistas.", "O plano de contêiner deve considerar outros produtos do pedido. Misturar halteres, anilhas, racks e acessórios pode melhorar o aproveitamento, mas exige distribuição de carga e sequência de descarga. A configuração final é confirmada com a lista completa, não apenas com um peso isolado."),
      rich("oem", "OEM, personalização e compra B2B", "Podem ser avaliados logotipo, marcação de peso, cor e embalagem. O método depende da construção e do volume. O MOQ não é apresentado como um número universal: ele é confirmado depois da faixa de pesos, quantidade por peso, personalização e destino.", "Para receber uma cotação comparável, envie uma planilha com cada peso, número de unidades, arquivo do logo e mercado. Informe também se precisa de amostra, inspeção e rack. A proposta deve registrar o que está incluído e quais detalhes ainda dependem de aprovação."),
      checklist("rfq", "Dados para solicitar cotação", ["Faixa de 2,5 a 50 kg ou subconjunto desejado", "Unidades por peso e pares duplicados", "Logo, cor e marcação em kg", "Embalagem de marca própria", "Rack necessário ou já disponível", "Porto ou cidade de destino", "Prazo, amostra e inspeção desejados"])
    ],
    faq: [
      ["Halter sextavado de borracha é indicado para academia comercial?", "Sim, desde que peso, construção, rack e manutenção sejam adequados à intensidade. O formato estável atende muitas áreas de musculação e funcional."],
      ["Qual é a faixa de peso deste modelo?", "A linha cadastrada vai de 2,5 a 50 kg, com incrementos de 2,5 kg."],
      ["É possível personalizar o logotipo?", "Sim, sujeito à revisão do arquivo, método, quantidade e amostra. Logo, peso, cor e embalagem devem ser aprovados antes da produção."],
      ["Como os halteres são embalados para exportação?", "A configuração depende do peso e do pedido. A fábrica confirma proteção, unidades por caixa, peso bruto e pallet para reduzir movimento e marcas no transporte."],
      ["Qual é o MOQ?", "O MOQ varia conforme faixa de pesos, quantidade por referência e personalização. Ele é confirmado após a análise da lista B2B."]
    ],
    links: [["dumbbells-category", "Ver a linha de halteres"], ["hex-vs-round-guide", "Comparar sextavado e redondo"], ["materials-guide", "Comparar materiais"], ["factory", "Conhecer o processo de fábrica"], ["oem-private-label", "Planejar marca própria"], ["contact", "Solicitar cotação OEM"]],
    author: editorial,
    reviewedBy: reviewer
  },
  "chrome-dumbbell": {
    image: ["/assets/products/dumbbells/chrome/chrome-dumbbell-main.jpg", "Halter cromado profissional para academia e marca própria"],
    material: "Estrutura metálica com acabamento cromado",
    category: "Halter profissional premium",
    specifications: [{ name: "Sistema", value: "Opções personalizadas em kg ou lb" }, { name: "Acabamento", value: "Cromado, com opções visuais conforme o projeto" }, { name: "Aplicação", value: "Academias premium, hotéis, estúdios e distribuição" }],
    blocks: [
      quick("resposta-rapida", "O halter cromado é indicado para projetos que priorizam aparência metálica, formato compacto e apresentação premium. A PowerBaseFit avalia opções em kg ou lb, cor, acabamento da empunhadura, logotipo e embalagem. A durabilidade depende da especificação, do ambiente, da limpeza e do armazenamento em rack adequado."),
      definition("definicao", "Halter cromado", "É um halter metálico com superfície de aparência brilhante obtida por processo de acabamento. O termo descreve o visual e a proteção superficial; não significa que o produto seja imune à umidade, suor, produtos de limpeza inadequados ou atrito durante armazenamento e transporte."),
      table("especificacoes", "Especificações para confirmar", ["Item", "Opção da linha", "Critério de aprovação"], [
        ["Sistema de peso", "kg ou lb conforme o projeto", "Faixa, incremento e marcação"],
        ["Superfície", "Acabamento cromado", "Uniformidade, brilho, marcas e proteção"],
        ["Empunhadura", "Metálica texturizada", "Diâmetro, textura e aderência"],
        ["Personalização", "Logo, cor e detalhes visuais", "Arquivo, posição, método e amostra"],
        ["Embalagem", "Proteção individual para exportação", "Contato entre peças, caixa e pallet"]
      ]),
      rich("aplicacoes", "Aplicações comerciais", "O modelo pode compor academias premium, hotéis, clubes, estúdios, áreas de hospitalidade e showrooms de distribuidores. Uma faixa menor pode atender espaços com treinos leves e moderados; uma operação de revenda pode precisar de mais opções. A decisão deve considerar público, exercícios e posicionamento de preço.", "O rack é parte da especificação. Apoios que geram contato metálico ou pressão em pontos inadequados podem marcar o acabamento. Antes de fechar a faixa de pesos, confirme dimensões das peças e capacidade do suporte. Também deixe espaço de circulação para retirada e devolução segura."),
      rich("material", "Material, superfície e manutenção", "A superfície cromada entrega impacto visual, mas exige rotina coerente. Suor e umidade devem ser removidos com pano apropriado; produtos abrasivos podem riscar ou alterar o acabamento. A academia deve orientar usuários a não bater peças e manter o ambiente ventilado.", "Para compradores B2B, a amostra precisa ser avaliada sob a iluminação real do projeto. Brilho, tonalidade, textura e legibilidade podem parecer diferentes em fotos de catálogo. A aprovação deve registrar o padrão aceito e o método de proteção na embalagem."),
      rich("processo", "Fabricação e acabamento", "O processo envolve preparação dos componentes metálicos, formação ou usinagem, união das partes, polimento, tratamento superficial, marcação e inspeção. A sequência depende da construção escolhida. Superfícies são verificadas antes da proteção individual para reduzir o risco de enviar peças com marcas visíveis.", "Quando o projeto inclui logo, cores ou placas, a equipe revisa arquivo, posição e proporção. A amostra deve confirmar que a personalização não prejudica leitura do peso nem cria pontos de contato indesejados com o rack."),
      checklist("qc", "Pontos de controle de qualidade", ["Peso e marcação correspondem à referência", "Superfície uniforme, sem riscos ou manchas fora do padrão", "Empunhadura alinhada e textura consistente", "Logo e cor conferem com a aprovação", "Peças formam pares visualmente coerentes", "Proteção evita contato durante transporte", "Caixas e pallets respeitam o peso planejado"]),
      rich("embalagem", "Embalagem e exportação", "A proteção individual é especialmente importante em acabamentos brilhantes. Separadores, envolvimento e imobilização devem evitar atrito entre peças. A embalagem externa precisa suportar o peso e permitir identificação por modelo e carga.", "Para pedidos mistos, o plano logístico deve separar superfícies sensíveis de estruturas metálicas ou caixas que possam pressioná-las. O comprador deve aprovar a lista de volumes e entender quem será responsável por descarga, armazenagem e montagem no destino."),
      rich("oem", "OEM e informações de compra", "A viabilidade de logo, placa, cor e embalagem depende da configuração. Compartilhe identidade visual, faixa de pesos, quantidades, canal de venda e mercado. A fábrica informa quais opções são compatíveis e qual MOQ se aplica.", "Não compare propostas apenas pela expressão “halter cromado”. Confirme material, dimensões, tipo de acabamento, peso, personalização, proteção e escopo logístico. Produtos com aparência semelhante podem ter custos e processos distintos."),
      checklist("rfq", "Checklist da cotação", ["Faixa e sistema kg/lb", "Quantidade por peso", "Cor e acabamento desejados", "Arquivo e posição do logo", "Tipo de rack e ambiente de uso", "Embalagem, pallet e destino", "Amostra e critérios de inspeção"])
    ],
    faq: [
      ["Halter cromado enferruja?", "Todo acabamento metálico exige cuidado. Umidade, suor, abrasão e limpeza inadequada podem reduzir sua vida útil. A especificação e a manutenção devem ser avaliadas juntas."],
      ["Halter cromado pode receber marca própria?", "Pode, conforme a construção e o método disponível. A equipe revisa arquivo, quantidade e amostra antes de confirmar."],
      ["Esse modelo é indicado para academia de alto fluxo?", "Depende da rotina, rack e manutenção. Ele é frequentemente escolhido por apresentação premium; ambientes de alto fluxo devem avaliar desgaste e reposição com atenção."],
      ["Como proteger o acabamento no transporte?", "Com proteção individual, separação entre peças, caixa compatível com o peso e pallet planejado. A configuração final depende do pedido."],
      ["Posso solicitar kg e lb?", "A linha admite opções conforme o projeto, mas faixa, marcação, quantidades e embalagem precisam ser confirmadas separadamente."]
    ],
    links: [["dumbbells-category", "Comparar halteres profissionais"], ["materials-guide", "Entender materiais e acabamentos"], ["oem-private-label", "Ver opções de marca própria"], ["factory", "Conhecer o controle de qualidade"], ["contact", "Pedir cotação"]],
    author: editorial,
    reviewedBy: reviewer
  },
  "rubber-bumper-plate": {
    image: ["/assets/products/weight-plates/catalog/rubber-bumper-plate.jpg", "Anilha bumper de borracha para academia e levantamento"],
    material: "Corpo de borracha com inserto central metálico",
    category: "Bumper plate de treinamento",
    specifications: [{ name: "Construção", value: "Borracha com centro metálico" }, { name: "Uso", value: "Treinamento funcional, levantamento e áreas de força" }, { name: "Personalização", value: "Logo, efeito de cor, kg/lb e embalagem sujeitos a confirmação" }],
    blocks: [
      quick("resposta-rapida", "A anilha bumper de borracha é destinada a barras olímpicas e áreas de treinamento em que o programa prevê contato planejado com plataforma ou piso apropriado. A linha pode avaliar logo, marcação em kg ou lb, detalhes de cor e embalagem OEM. Espessura, dureza, tolerância e encaixe devem ser confirmados no modelo cotado."),
      definition("definicao", "Bumper plate", "É uma anilha de diâmetro externo uniforme, geralmente produzida com corpo de borracha e inserto central metálico, para treinamento de levantamento. Ela não torna qualquer piso adequado a quedas e não elimina a necessidade de técnica, plataforma e regras de uso."),
      table("especificacoes", "Especificações técnicas a confirmar", ["Item", "Configuração", "Por que importa"], [
        ["Corpo", "Borracha", "Influencia superfície, odor, dureza e recuperação"],
        ["Centro", "Inserto metálico", "Afeta encaixe e estabilidade na manga"],
        ["Diâmetro", "Uniforme dentro da linha", "Mantém altura inicial da barra"],
        ["Espessura", "Varia por peso e composição", "Define carga total possível na manga"],
        ["Marcação", "kg ou lb conforme projeto", "Facilita identificação e mercado de destino"],
        ["Personalização", "Logo e detalhes de cor", "Exige aprovação de arquivo e amostra"]
      ]),
      rich("aplicacoes", "Aplicações comerciais", "Bumper plates atendem zonas de levantamento, treinamento funcional, estúdios e programas de distribuição. A compra deve ser relacionada à barra, à plataforma, à frequência de uso e aos pesos necessários. Uma academia geral pode combinar bumper plates em uma área específica com anilhas convencionais em máquinas e estações onde não há queda.", "O comprador precisa avaliar a espessura de cada peso. Uma anilha leve pode ser mais espessa que uma anilha metálica equivalente, limitando a carga total. Para treinamento pesado, essa dimensão é decisiva; para grupos e estúdios, identificação e variedade podem ser mais importantes."),
      rich("material", "Material e comportamento", "Borracha não é uma especificação única. Composição, dureza, acabamento, odor e efeito visual variam por configuração. A amostra permite avaliar superfície e marcação, mas testes e tolerâncias do lote devem ser definidos de forma objetiva.", "O centro metálico precisa encaixar na barra de forma coerente com a especificação. Folga excessiva, rebarbas ou montagem inconsistente prejudicam a experiência. A inspeção deve verificar dimensão interna, assentamento do inserto e integridade da área de união."),
      rich("processo", "Processo de fabricação", "O processo inclui preparação da borracha, formação ou prensagem do corpo, instalação do inserto, acabamento, marcação e inspeção. Opções com efeito salpicado ou cores exigem controle visual. Depois da cura e do acabamento, as peças são separadas por peso e preparadas para embalagem.", "A produção OEM acrescenta revisão de logo, cor, kg/lb e embalagem. A especificação aprovada deve registrar limites aceitáveis de aparência e dimensão, porque uma descrição genérica como “bumper preta” não é suficiente para controlar o lote."),
      checklist("qc", "Controle de qualidade", ["Conferir peso, diâmetro e espessura por referência", "Verificar encaixe e fixação do inserto metálico", "Inspecionar superfície, bordas e marcação", "Comparar cor e logo com a amostra aprovada", "Registrar tolerâncias e método de medição", "Revisar quantidade e pares por peso", "Confirmar caixa, pallet e identificação logística"]),
      rich("embalagem", "Embalagem, pallet e contêiner", "Anilhas concentram peso e exigem caixa resistente e limite coerente por volume. A proteção deve evitar marcas e preservar inserto e bordas. O pallet precisa distribuir a carga e permitir movimentação segura conforme as condições acordadas.", "O mix de pesos influencia o aproveitamento do contêiner. Antes de fechar o pedido, revise peso líquido, peso bruto, número de volumes e sequência de carregamento. O custo unitário deve ser analisado junto com frete e despesas do destino."),
      rich("oem", "OEM e compra B2B", "Logo, cor, efeito visual, marcação em kg ou lb e embalagem podem ser avaliados. O MOQ depende da composição do pedido e da personalização. Distribuidores devem definir quais pesos terão maior giro; academias devem relacionar quantidade ao número de barras e estações.", "Envie uma tabela com pesos, unidades, aplicação, identidade visual e destino. Se houver exigência específica de dureza, tolerância ou teste, ela precisa ser discutida e documentada antes da proposta final."),
      checklist("rfq", "Dados para cotação", ["Pesos e unidades por peso", "Uso de treino e frequência esperada", "Barra e manga compatíveis", "Dureza, espessura ou tolerância exigida", "Logo, cor e kg/lb", "Embalagem, pallet e destino", "Amostra, inspeção e prazo"])
    ],
    faq: [
      ["Anilha bumper pode ser usada em academia comercial?", "Sim, quando barra, piso, plataforma, especificação e regras de uso são adequados à frequência de treinamento."],
      ["Qual personalização está disponível?", "Dependendo da configuração, podem ser avaliados logo, cor, efeito salpicado, marcação em kg ou lb e embalagem de marca própria."],
      ["Bumper plate e anilha olímpica são a mesma coisa?", "Não. Bumper descreve a construção; olímpica descreve a compatibilidade com a barra. Uma bumper normalmente é olímpica, mas existem outras anilhas olímpicas."],
      ["A espessura é igual em todos os pesos?", "Não necessariamente. Ela varia conforme peso, material e projeto, por isso deve ser confirmada na ficha comercial."],
      ["Qual é o MOQ?", "Ele depende dos pesos, quantidades, cores e personalização. A fábrica confirma depois de revisar a composição do pedido."]
    ],
    links: [["weight-plates-category", "Ver a linha de anilhas"], ["rubber-olympic-plate", "Anilha olímpica emborrachada"], ["plates-guide", "Comparar anilhas e bumper"], ["olympic-vs-standard-guide", "Entender padrões de anilha"], ["oem-private-label", "Planejar personalização"], ["contact", "Solicitar cotação OEM"]],
    author: editorial,
    reviewedBy: reviewer
  },
  factory: {
    title: "Fábrica de equipamentos de academia | PowerBaseFit",
    blocks: [
      quick("resposta-rapida", "A PowerBaseFit informa operação desde 2008 e área fabril de aproximadamente 8.000 m² em Dezhou, Shandong, China. A fábrica atende pesos livres e equipamentos relacionados para compradores B2B, com revisão de especificação, OEM, produção, controle de qualidade, embalagem e preparação para exportação."),
      definition("definicao", "Fábrica OEM de equipamentos de academia", "É uma operação que produz conforme uma especificação comercial e pode adaptar elementos de marca, acabamento ou embalagem. OEM não elimina a responsabilidade do comprador de validar produto, amostra, tolerâncias, inspeção, documentação e requisitos do mercado de destino."),
      rich("base", "Base de fabricação", "A localização em Dezhou integra a operação de produção e preparação de pedidos internacionais. A área informada de 8.000 m² e o início em 2008 são dados institucionais da PowerBaseFit. Compradores podem solicitar imagens atuais, documentação do produto e inspeção conforme o risco e o valor do projeto.", "O portfólio inclui halteres, anilhas, racks, bancos e acessórios. Cada família usa processos diferentes: peças metálicas exigem corte, formação, solda, usinagem ou acabamento; produtos revestidos dependem de preparação de material, moldagem e cura; conjuntos montados exigem verificação de componentes e funcionamento."),
      table("fluxo", "Fluxo de um pedido B2B", ["Etapa", "Atividade", "Saída esperada"], [
        ["1. Requisitos", "Revisão de modelos, quantidade, destino e uso", "Lista comercial sem ambiguidades"],
        ["2. Especificação", "Materiais, dimensões, pesos, logo e embalagem", "Ficha ou proposta confirmada"],
        ["3. Amostra", "Produção ou seleção da referência quando necessária", "Aprovação documentada"],
        ["4. Produção", "Planejamento de materiais e execução do lote", "Produtos conforme configuração"],
        ["5. QC", "Peso, superfície, dimensões, montagem e quantidade", "Registro de inspeção"],
        ["6. Embalagem", "Proteção, caixas, pallets e identificação", "Volumes prontos para embarque"],
        ["7. Exportação", "Conferência de carga e documentos acordados", "Pedido liberado para transporte"]
      ]),
      rich("equipamentos", "Equipamentos e processos", "Os equipamentos utilizados variam por categoria e podem envolver corte e preparação de aço, soldagem, usinagem, polimento, tratamento de superfície, moldagem, prensagem, montagem e embalagem. A existência de uma máquina não prova a qualidade de um lote; o que importa é a combinação entre especificação, processo controlado, equipe, medição e inspeção.", "Para avaliar capacidade, o comprador deve perguntar quais etapas são realizadas na instalação, quais dependem de parceiros, como materiais são identificados e como alterações são controladas. Fotos de produção devem corresponder ao produto cotado e ao período atual, evitando decisões baseadas apenas em imagens promocionais."),
      rich("qc", "Processo de controle de qualidade", "O plano de QC deve transformar expectativas em pontos verificáveis. Em halteres, podem ser avaliados peso, união, superfície, empunhadura e marcação. Em anilhas, entram peso, espessura, furação, inserto e acabamento. Em racks e bancos, dimensões, solda, revestimento, montagem e componentes exigem critérios próprios.", "A inspeção pode ocorrer durante produção, no final ou por empresa independente. A escolha depende de risco, complexidade e histórico. Uma amostra aprovada é referência importante, mas não substitui amostragem do lote. Não conformidades precisam ter método de registro, segregação e decisão antes do embarque."),
      checklist("qc-checklist", "Pontos mínimos de QC", ["Material e modelo correspondem ao pedido", "Peso, dimensões e tolerâncias usam método definido", "Superfície, cor e logo correspondem à aprovação", "Montagem, alinhamento e peças móveis são verificados", "Quantidade é conferida por referência", "Embalagem protege o produto e respeita o peso", "Fotos ou relatório registram a inspeção antes da liberação"]),
      rich("embalagem", "Embalagem e preparação da carga", "Halteres, anilhas e muitos acessórios são normalmente enviados em caixas, com proteção adaptada ao peso e à superfície. Estruturas maiores podem usar caixas reforçadas ou engradados conforme modelo e requisito. A embalagem final deve ser definida na proposta, pois método, número de volumes e pallet influenciam custo e manuseio.", "O planejamento do contêiner considera densidade, distribuição de carga, sequência de carregamento e proteção entre categorias. O comprador deve informar restrições de descarga e armazenagem no destino. Uma embalagem forte no porto não resolve riscos de movimentação inadequada depois da entrega."),
      rich("exportacao", "Experiência de exportação e responsabilidades", "A preparação internacional envolve descrição comercial, lista de volumes e documentos acordados com o comprador e o agente logístico. Requisitos de importação, tributos, certificações obrigatórias e liberação no Brasil devem ser confirmados por profissionais responsáveis no destino. A fábrica não deve prometer uma regra aduaneira universal.", "Prazos dependem de materiais, quantidade, personalização e agenda. A referência de cerca de dez dias para pedidos padrão só se aplica quando configuração, materiais e programação estão confirmados. Projetos OEM, amostras ou ferramentas podem exigir mais tempo."),
      rich("oem", "Fluxo OEM e marca própria", "O programa começa com produto base e objetivo de mercado. Depois são definidos logo, cor, marcação em kg ou lb, embalagem e qualquer alteração técnica. A fábrica informa o que é possível sem ferramenta nova e o que muda MOQ, custo ou prazo.", "Arquivos e amostras aprovados devem ser versionados. Se o comprador alterar o logo ou a embalagem, a mudança precisa ser registrada antes da produção. Essa disciplina reduz interpretação diferente entre vendas, produção, QC e embalagem."),
      checklist("visita", "O que um comprador deve solicitar", ["Lista e especificação dos produtos cotados", "Fotos atuais de processo e amostra", "Critérios de inspeção e tolerância", "Descrição de embalagem e número de volumes", "Escopo do preço e condição comercial", "Prazo baseado na configuração real", "Plano para não conformidade e reposição"])
    ],
    faq: [
      ["Onde fica a fábrica da PowerBaseFit?", "Em Dezhou, província de Shandong, China."],
      ["A PowerBaseFit fabrica desde quando?", "A empresa informa operação desde 2008 e área fabril de aproximadamente 8.000 m²."],
      ["Quais controles de qualidade podem ser realizados?", "Conforme o produto: material, peso, dimensões, superfície, união, montagem, logo, quantidade e embalagem."],
      ["É possível fazer inspeção independente?", "O comprador pode avaliar esse recurso conforme risco, valor e condição contratada. O escopo deve ser combinado antes da produção."],
      ["Como funciona um pedido OEM?", "A fábrica revisa produto base, personalização, arquivo, amostra, MOQ, produção, QC e embalagem antes da liberação do lote."]
    ],
    links: [["products-hub", "Ver portfólio profissional"], ["oem-private-label", "Conhecer o processo OEM"], ["factory-guide", "Guia de avaliação de fábrica"], ["import-guide", "Planejar uma importação"], ["contact", "Enviar projeto para análise"]],
    author: editorial,
    reviewedBy: reviewer
  },
  contact: {
    blocks: [
      quick("resposta-rapida", "Para receber uma cotação B2B, envie empresa, mercado, produtos, quantidades, pesos, personalização e destino. Essas informações permitem avaliar modelos, MOQ, amostra, produção, embalagem e logística sem alterar o funcionamento atual do formulário."),
      rich("preparar", "Como preparar sua solicitação", "Uma mensagem como “quero halteres” não permite comparar opções. Informe se o projeto é para academia, distribuição, importação ou marca própria. Acrescente sistema em kg ou lb, pesos, unidades e faixa de preço ou posicionamento desejado. Para racks e bancos, inclua dimensões e uso.", "Se já tiver uma lista, anexe ou transcreva as linhas principais. Quando houver logo, informe se existe arquivo vetorial e quais cores são obrigatórias. O destino ajuda a considerar embalagem e peso da carga. A equipe responderá com os pontos que ainda precisam de confirmação."),
      table("dados", "Dados que aceleram a cotação", ["Informação", "Exemplo", "Por que é necessária"], [
        ["Produto", "Halter sextavado de 2,5 a 30 kg", "Define modelo e faixa"],
        ["Quantidade", "10 unidades por peso", "Permite analisar MOQ e produção"],
        ["Personalização", "Logo, kg e caixa neutra", "Define processo e amostra"],
        ["Destino", "Porto ou cidade no Brasil", "Ajuda no planejamento logístico"],
        ["Prazo", "Data desejada de embarque", "Permite revisar materiais e agenda"]
      ]),
      checklist("antes", "Antes de enviar", ["Confirme que os contatos da empresa estão corretos", "Separe produto e quantidade por linha", "Informe kg ou lb", "Indique logo, cor e embalagem", "Inclua destino e prazo", "Avise se precisa de amostra ou inspeção"]),
      rich("canais", "Canais de contato e resposta", "O formulário mantém o envio para o contato comercial real da PowerBaseFit. O botão de WhatsApp também permanece disponível para uma conversa inicial. Para pedidos técnicos, o formulário ou e-mail é preferível porque preserva a lista e os arquivos.", "A resposta comercial deve diferenciar informação confirmada de ponto ainda sujeito a amostra ou produção. Valores, prazo, MOQ e transporte só devem ser tratados como finais quando aparecem na proposta aplicável ao pedido.")
    ],
    faq: [
      ["Quais dados preciso enviar para receber uma cotação?", "Empresa, produto, peso ou modelo, quantidade, personalização, destino e prazo. Uma planilha ajuda em pedidos com muitas referências."],
      ["Posso pedir uma amostra?", "A viabilidade, custo e prazo dependem do produto e da personalização. Informe essa necessidade no primeiro contato."],
      ["O WhatsApp pode ser usado para enviar o projeto?", "Pode iniciar a conversa, mas listas e arquivos complexos são mais fáceis de controlar por formulário ou e-mail."],
      ["A cotação inclui frete e impostos no Brasil?", "Depende do escopo solicitado. A proposta deve informar a condição comercial; tributos e exigências locais precisam ser confirmados com o responsável pela importação."]
    ],
    links: [["products-hub", "Ver produtos"], ["oem-private-label", "Entender marca própria"], ["factory", "Conhecer a fábrica"], ["import-guide", "Ler o guia de importação"]],
    author: editorial,
    reviewedBy: reviewer
  },
  "blog-index": {
    blocks: [
      quick("resposta-rapida", "A biblioteca em português reúne guias para distribuidores, importadores, marcas e gestores de academias que precisam avaliar produtos, fábrica, OEM, inspeção, logística e planejamento de áreas de pesos livres."),
      rich("objetivo", "Conteúdo para decisões de compra B2B", "Os guias foram organizados por tarefa de compra. Alguns ajudam a comparar materiais e produtos; outros tratam de MOQ, amostra, inspeção, embalagem e importação. O objetivo é transformar perguntas comerciais em critérios verificáveis, sem prometer certificações, custos ou resultados que não tenham sido documentados.", "Conteúdo de produto deve ser lido junto com a ficha e a cotação do modelo. Conteúdo de importação é educativo e não substitui orientação de despachante aduaneiro, agente de cargas, contador ou profissional jurídico no Brasil."),
      table("trilhas", "Trilhas de conteúdo", ["Trilha", "Pergunta central", "Próximo passo"], [
        ["Fornecedor e fábrica", "Como avaliar capacidade, amostra e QC?", "Comparar documentação e enviar uma RFQ"],
        ["Halteres", "Qual formato, material e faixa comprar?", "Abrir a categoria e definir pesos"],
        ["Anilhas", "Qual padrão e construção usar?", "Relacionar barra, treino e piso"],
        ["OEM", "Como criar uma linha de marca própria?", "Reunir logo, embalagem e quantidades"],
        ["Importação", "Como planejar custo, prazo e responsabilidade?", "Consultar profissionais e montar o custo total"]
      ]),
      checklist("usar", "Como usar os guias", ["Comece pela pergunta do seu projeto", "Registre requisitos e dúvidas em uma planilha", "Separe fato confirmado de hipótese", "Valide números com fornecedores e profissionais responsáveis", "Use os links internos para chegar ao produto correspondente", "Envie uma lista completa ao solicitar cotação"]),
      rich("atualizacao", "Revisão e atualização", "Os artigos exibem autor, revisão e data de atualização. Informações de fábrica são revisadas pela equipe de produção e exportação. Quando o tema envolve importação no Brasil, o texto evita fixar alíquotas ou regras sem fonte, porque custos e procedimentos variam conforme produto, operação e data.")
    ],
    faq: [
      ["Os guias são voltados para consumidores finais?", "O foco principal é B2B: distribuidores, importadores, marcas e responsáveis por projetos de academias."],
      ["Os artigos substituem uma cotação?", "Não. Eles ajudam a preparar requisitos. Modelo, MOQ, preço, prazo e embalagem precisam ser confirmados para o pedido real."],
      ["Posso usar os checklists em uma RFQ?", "Sim. Adapte os itens à sua empresa, ao produto e aos requisitos do mercado."],
      ["As informações de importação são aconselhamento aduaneiro?", "Não. Custos, tributos e procedimentos devem ser confirmados com profissionais habilitados no Brasil."]
    ],
    links: [["import-guide", "Importar equipamentos da China"], ["import-cost-guide", "Calcular o custo de importação"], ["moq-guide", "Entender MOQ"], ["oem-vs-odm-guide", "Comparar OEM e ODM"], ["private-label-guide", "Criar marca própria"], ["factory-guide", "Avaliar uma fábrica OEM"], ["dumbbells-guide", "Escolher halteres"], ["hex-vs-round-guide", "Comparar halter sextavado e redondo"], ["materials-guide", "Comparar borracha, PU e TPU"], ["plates-guide", "Comparar anilhas"], ["olympic-vs-standard-guide", "Escolher anilha olímpica ou padrão"], ["professional-gym-list-guide", "Planejar equipamentos profissionais"], ["free-weight-area-guide", "Planejar a área de pesos livres"]],
    author: editorial,
    reviewedBy: reviewer
  },
  projects: {
    title: "Projetos de áreas de musculação | PowerBaseFit",
    blocks: [
      quick("resposta-rapida", "Esta página reúne referências visuais reais já publicadas pela PowerBaseFit para discutir combinação de halteres, anilhas, barras, racks e circulação. As imagens não são apresentadas como depoimentos de clientes, resultados financeiros ou projetos arquitetônicos certificados."),
      definition("definicao", "Referência de projeto", "É um exemplo visual de configuração de equipamentos usado para orientar perguntas de compra. Não substitui planta, cálculo estrutural, projeto de segurança, acessibilidade ou validação de profissionais responsáveis no local."),
      rich("metodo", "Como interpretar as referências", "Uma imagem mostra organização e aparência, mas não informa sozinha dimensões, capacidade, fluxo de usuários ou especificação completa. O comprador deve usar a referência para identificar preferências: formato dos halteres, comprimento do rack, proximidade das anilhas, espaço entre estações e identidade visual.", "Antes de pedir orçamento, converta a referência em requisitos. Informe área disponível, número estimado de usuários, faixa de pesos, tipo de treino e produtos prioritários. Fotos do espaço e planta ajudam, desde que medidas e responsabilidades técnicas sejam confirmadas localmente."),
      table("referencias", "Referências existentes", ["Referência", "O que ela demonstra", "Perguntas para o projeto"], [
        ["Área premium de halteres redondos", "Linha contínua em rack e leitura de pesos", "Quantos pares, qual faixa e qual circulação?"],
        ["Área de halteres sextavados pretos", "Formato estável e visual uniforme", "Qual material, piso e capacidade de rack?"],
        ["Área de anilhas e barras", "Armazenamento próximo às estações", "Qual padrão de barra, mix de anilhas e número de suportes?"]
      ]),
      rich("halteres", "Planejamento da área de halteres", "A faixa de pesos deve ser relacionada ao público e ao número de usuários. Pares leves e intermediários podem ter uso simultâneo maior. Halteres pesados exigem ergonomia de retirada, rack compatível e espaço para circulação. O formato redondo funciona bem em suportes adequados; o sextavado reduz rolamento quando colocado no piso.", "A identidade visual pode usar cor, logo e marcação, mas não deve prejudicar leitura do peso. Para marca própria, uma amostra ajuda a confirmar contraste e proporção em diferentes tamanhos de cabeça."),
      rich("anilhas", "Planejamento de anilhas, barras e armazenamento", "A área deve aproximar anilhas das barras sem bloquear passagem. O mix depende de musculação, levantamento e máquinas carregadas. Bumper plates precisam de piso ou plataforma apropriada e podem ocupar mais espaço na manga. Anilhas convencionais podem ser mais compactas, mas também exigem armazenamento e prevenção de impacto.", "Suportes devem ser compatíveis com furação, quantidade e peso. A análise deve incluir como o usuário retira e devolve a peça, não apenas quantas anilhas cabem no equipamento."),
      checklist("briefing", "Briefing para transformar referência em cotação", ["Planta e medidas do espaço", "Perfil e pico de usuários", "Lista inicial de equipamentos", "Faixa e quantidade de pesos", "Piso e áreas de circulação", "Logo, cores e identidade visual", "Destino, prazo e condição de montagem"]),
      rich("limites", "Limites e responsabilidades", "A PowerBaseFit pode apoiar a seleção comercial de produtos, opções OEM, embalagem e exportação. Projeto arquitetônico, estrutura, instalações, acessibilidade, segurança e conformidade local devem ser conduzidos por profissionais responsáveis no Brasil. Nenhuma referência visual deve ser copiada sem verificar essas condições.")
    ],
    faq: [
      ["A PowerBaseFit faz o projeto arquitetônico da academia?", "Não. A página oferece referências de equipamentos. Arquitetura, estrutura, segurança e conformidade precisam de profissionais responsáveis no local."],
      ["Posso usar minha identidade visual nos equipamentos?", "Dependendo do produto, logo, cores, marcações e embalagem podem ser avaliados no programa OEM."],
      ["As referências são casos com resultados comprovados?", "São configurações visuais reais já publicadas, mas não são apresentadas como depoimentos, métricas de cliente ou resultados financeiros."],
      ["Quais informações devo enviar para cotar uma área?", "Planta, medidas, público, lista, faixa de pesos, identidade visual, destino e prazo."]
    ],
    links: [["professional-gym-list-guide", "Lista de equipamentos profissionais"], ["free-weight-area-guide", "Planejar área de pesos livres"], ["dumbbells-category", "Halteres para projetos"], ["weight-plates-category", "Anilhas para projetos"], ["contact", "Enviar briefing"]],
    author: editorial,
    reviewedBy: reviewer
  }
};

export { editorial as ptBrEditorialAuthor, reviewer as ptBrTechnicalReviewer };
