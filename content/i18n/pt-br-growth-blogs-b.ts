import type { PilotPage } from "./pt-br-types";
import { checklist, definition, quick, rich, table } from "./pt-br-content-helpers";
import { ptBrEditorialAuthor, ptBrTechnicalReviewer } from "./pt-br-existing-growth";

const common = { author: ptBrEditorialAuthor, reviewedBy: ptBrTechnicalReviewer };

export const ptBrGrowthBlogsB: PilotPage[] = [
  {
    id: "hex-vs-round-guide", type: "blog", ptPath: "/pt/blog/halter-sextavado-ou-redondo",
    title: "Halter sextavado ou redondo: qual escolher?",
    description: "Compare halter sextavado e redondo para academia: estabilidade, rack, faixa de peso, material, manutenção, custo, OEM e critérios de compra B2B.",
    h1: "Halter sextavado ou redondo para academia profissional?",
    image: ["/assets/hex-dumbbells.png", "Comparação entre halter sextavado e halter redondo"],
    blocks: [
      quick("resposta-rapida", "Escolha halter sextavado quando estabilidade no piso e exercícios funcionais forem prioritários. Escolha redondo quando deseja uma linha contínua em rack, faixa ampla e visual tradicional de área de pesos livres. Material, construção, empunhadura, rack, usuários e reposição importam mais do que o formato isolado."),
      definition("definicao", "Halter sextavado e halter redondo", "Sextavado descreve uma cabeça com seis lados e pontos de apoio que reduzem rolamento. Redondo descreve cabeça circular, normalmente armazenada em rack com berços ou posições próprias. Ambos podem usar borracha, PU ou outras construções."),
      table("comparacao", "Comparação rápida", ["Critério", "Sextavado", "Redondo"], [
        ["Piso", "Menor tendência a rolar", "Pode rolar fora do rack"],
        ["Exercícios", "Bom para apoio no piso e funcional", "Bom para musculação tradicional"],
        ["Rack", "Requer apoio compatível com geometria", "Organiza linha contínua em berços"],
        ["Faixa", "Comum em faixas comerciais médias", "Pode chegar a faixas muito pesadas"],
        ["Visual", "Funcional e reconhecido", "Clássico e premium conforme material"],
        ["Reposição", "Popular em atacado", "Exige consistência visual da linha"]
      ]),
      rich("piso", "1. Estabilidade e uso no piso", "A cabeça sextavada cria faces de apoio e reduz rolamento quando o halter é colocado no chão. Isso ajuda em áreas funcionais e exercícios como remadas apoiadas ou posições de prancha, desde que o produto e a técnica sejam adequados. O formato não substitui piso, organização ou orientação.", "Halteres redondos devem retornar ao rack. Em uma área bem organizada, o formato não é problema; fora do suporte, pode rolar e ocupar circulação. A decisão deve considerar comportamento dos usuários e supervisão."),
      rich("rack", "2. Rack e capacidade", "Meça posições, largura, apoio e carga. Um rack desenhado para cabeças redondas pode não acomodar sextavados da mesma forma. Suportes de sela podem concentrar pressão em revestimentos. Para halteres pesados, altura de retirada e espaço entre peças influenciam ergonomia.", "Uma linha redonda de 2,5 a 100 kg exige planejamento diferente de uma faixa sextavada até 50 kg. Calcule comprimento, número de níveis e circulação. Inclua pares duplicados antes de comprar o rack, porque eles alteram capacidade."),
      rich("faixa", "3. Faixa de pesos e público", "A linha sextavada PowerBaseFit cadastrada vai de 2,5 a 50 kg em incrementos de 2,5 kg. A linha redonda de borracha vai de 2,5 a 100 kg. Esses dados ajudam a comparar, mas a academia deve comprar somente a faixa coerente com seu público.", "Estúdios podem priorizar pesos leves e intermediários. Academias gerais podem usar uma linha completa até determinado limite. Áreas de força podem precisar de redondos pesados. Analise pico e exercícios para duplicar pesos populares."),
      table("aplicacao", "Escolha por cenário", ["Cenário", "Tendência", "Por quê"], [
        ["Treinamento funcional", "Sextavado", "Estabilidade no piso"],
        ["Academia de bairro", "Ambos", "Depende de rack, público e preço"],
        ["Clube premium", "Redondo de PU ou acabamento premium", "Apresentação e linha"],
        ["Hotel/estúdio", "Cromado, redondo ou faixa sextavada menor", "Espaço e visual"],
        ["Distribuidor", "Ambos em linhas separadas", "Segmentação de mercado"]
      ]),
      rich("material", "4. Não confunda formato com material", "Um halter sextavado de borracha e um redondo de PU diferem em dois eixos. Para comparar de maneira justa, separe formato, material, construção, faixa, empunhadura e preço. Borracha, PU e TPU têm formulações e acabamentos distintos.", "Peça amostra quando odor, textura, cor e logo forem relevantes. O formato pode influenciar área disponível para personalização. Aprove logo em pesos leves e pesados."),
      rich("construcao", "5. Construção e controle de qualidade", "Verifique união entre cabeça e empunhadura, peso, alinhamento, superfície, textura e marcação. No sextavado, observe se as faces apoiam de forma estável. No redondo, confira concentricidade e consistência visual no rack.", "O lote deve ser inspecionado por referência. Pares precisam ser coerentes. A embalagem deve impedir contato, especialmente em acabamentos premium ou pesos altos."),
      rich("manutencao", "6. Manutenção e reposição", "Ambos exigem limpeza e inspeção. Borracha pode marcar ou apresentar odor inicial; metal pode riscar ou oxidar em condições inadequadas; PU pede método compatível. Rack e hábitos de uso influenciam mais do que o formato.", "Registre modelo e versão para reposição. Em linhas redondas, diferença de diâmetro, logo ou cor pode ficar evidente no rack. Em sextavados, variações de cabeça ou empunhadura também afetam o conjunto."),
      rich("custo", "7. Custo B2B e logística", "Compare custo por faixa completa, não apenas uma unidade. Some pares duplicados, rack, embalagem, peso da carga e reposição. Uma linha redonda até 100 kg pode elevar investimento e logística; uma faixa sextavada menor pode atender mais operações.", "O MOQ pode ser por peso ou modelo. Envie composição para obter proposta real. Não extrapole preço de um único peso para todo o programa sem verificar."),
      rich("oem", "8. OEM e identidade visual", "Ambos podem aceitar logo, marcação e embalagem conforme construção. Formato redondo oferece uma face visual contínua; sextavado pode usar marcação nas faces. Método, área e contraste devem ser aprovados.", "A identidade não deve prejudicar leitura do peso. Para kg e lb, prepare versões separadas. Embalagem e código precisam indicar modelo e peso."),
      checklist("decisao", "Checklist de decisão", ["Exercícios e ambiente", "Pico de usuários", "Faixa e pesos duplicados", "Rack e circulação", "Material e manutenção", "Empunhadura e identificação", "Logo e embalagem", "MOQ, logística e reposição"]),
      rich("recomendacao", "Recomendação prática", "Não procure um vencedor universal. Use sextavado para estabilidade e versatilidade; redondo para linha organizada, pesos maiores e determinados posicionamentos. Uma academia pode combinar linhas em áreas diferentes, desde que identificação e rack sejam claros.", "Peça ao fornecedor dados e amostra. A melhor decisão é aquela que continua funcionando depois de meses de uso, limpeza e reposição.")
    ],
    faq: [["Halter sextavado é melhor?", "É melhor quando estabilidade no piso é prioritária, mas não em todos os projetos."], ["Halter redondo ocupa mais espaço?", "A ocupação depende da cabeça, faixa e rack. Compare dimensões reais."], ["Qual formato é mais profissional?", "Ambos podem ser profissionais; construção, material e especificação definem a adequação."], ["Posso misturar formatos?", "Pode, preferencialmente em áreas ou linhas claramente organizadas."], ["Qual aceita mais peso?", "Depende da linha. No catálogo citado, o redondo chega a 100 kg e o sextavado a 50 kg."]],
    links: [["rubber-hex-dumbbell", "Halter sextavado"], ["rubber-round-dumbbell", "Halter redondo"], ["dumbbells-category", "Linha completa"], ["materials-guide", "Comparar materiais"], ["contact", "Solicitar composição"]],
    ...common
  },
  {
    id: "materials-guide", type: "blog", ptPath: "/pt/blog/halter-borracha-pu-tpu",
    title: "Halter de borracha, PU ou TPU: diferenças",
    description: "Compare halteres de borracha, PU e TPU por acabamento, odor, manutenção, resistência, aplicação, personalização, preço e critérios de compra para academias.",
    h1: "Borracha, PU ou TPU: qual material de halter escolher?",
    image: ["/assets/products/dumbbells/catalog-v2/pu-dumbbell-kg.jpg", "Halter de PU comparado a halteres de borracha e TPU"],
    blocks: [
      quick("resposta-rapida", "Borracha é uma opção comercial versátil e conhecida; PU costuma atender projetos premium que valorizam superfície e apresentação; TPU é uma alternativa termoplástica cuja construção deve ser avaliada por modelo. Nenhum nome de material garante desempenho sozinho. Compare formulação, união, empunhadura, amostra, manutenção e custo total."),
      definition("definicao", "Borracha, PU e TPU", "Borracha é uma família de elastômeros; PU é poliuretano; TPU é poliuretano termoplástico. Em halteres, esses materiais aparecem como revestimento ou componente externo. Formulação, espessura, processo e núcleo influenciam o resultado."),
      table("comparacao", "Comparação de materiais", ["Critério", "Borracha", "PU", "TPU"], [
        ["Posicionamento", "Comercial amplo", "Premium", "Variável por projeto"],
        ["Aparência", "Fosca ou conforme formulação", "Uniforme e refinada", "Moldada com opções de textura"],
        ["Odor inicial", "Pode ser perceptível", "Geralmente avaliado como parte da amostra", "Depende da formulação"],
        ["Personalização", "Logo, cor e marcação", "Boa integração visual conforme método", "Depende de molde e construção"],
        ["Manutenção", "Limpeza compatível e ventilação", "Evitar abrasivos e atrito", "Seguir especificação do modelo"],
        ["Compra", "Comparar composição e acabamento", "Validar custo e consistência", "Exigir documentação e amostra"]
      ]),
      rich("borracha", "1. Halteres de borracha", "Borracha é comum em sextavados e redondos. Oferece aparência conhecida e pode proteger superfícies. Formulações variam em odor, textura, dureza e acabamento. Um preço muito baixo pode refletir construção diferente, mas preço alto também não comprova qualidade.", "Avalie amostra em ambiente ventilado, inspecione superfície e pergunte sobre limpeza. Observe contato com rack. Marcação e logo precisam permanecer legíveis. A cabeça e a empunhadura devem ter união estável."),
      rich("pu", "2. Halteres de PU", "PU é usado em linhas premium pela superfície e apresentação. Pode ser interessante para clubes, redes, hotéis e marcas que valorizam consistência visual. Contudo, “PU” não define automaticamente formulação, espessura ou vida útil.", "Peça dados do modelo, verifique amostra e compare superfície em diferentes pesos. Avalie cor, textura, logo, contato com rack e manutenção. O custo deve ser analisado com posicionamento e reposição."),
      rich("tpu", "3. Halteres de TPU", "TPU é processado como material termoplástico e pode permitir construções e texturas específicas. Não deve ser tratado como sinônimo de PU nem como superior por definição. Pergunte como o revestimento é formado e unido ao núcleo.", "Amostra e documentação são importantes porque o termo cobre diferentes configurações. Compare peso, aparência, comportamento de superfície e possibilidade de reposição."),
      table("perguntas", "Perguntas ao fornecedor", ["Tema", "Pergunta", "Evidência"], [
        ["Material", "Qual é a construção do modelo?", "Ficha ou descrição técnica"],
        ["Superfície", "Qual padrão de cor e textura?", "Amostra aprovada"],
        ["União", "Como cabeça e empunhadura são montadas?", "Processo e inspeção"],
        ["Peso", "Qual faixa e tolerância?", "Especificação e medição"],
        ["Logo", "Qual método e área?", "Arte e amostra"],
        ["Manutenção", "Quais produtos evitar?", "Instrução do modelo"],
        ["Embalagem", "Como evitar atrito?", "Plano de proteção"]
      ]),
      rich("odor", "4. Odor, superfície e percepção", "Odor inicial pode ocorrer em materiais e embalagens. Avalie intensidade, ventilação e dissipação sem prometer ausência absoluta. A percepção varia entre ambientes e pessoas. Para academias fechadas, planejamento de recebimento e ventilação é relevante.", "Superfície pode apresentar brilho, textura ou variação. Defina limites aceitáveis com amostra e iluminação. Não use fotos editadas como único padrão."),
      rich("durabilidade", "5. Durabilidade não depende apenas do material", "Quedas, rack, limpeza, umidade, calor, exposição solar e frequência influenciam. Construção da união pode ser mais crítica que o revestimento. Uma academia deve orientar uso e inspecionar danos.", "Compare condições iguais. Um halter de PU mal armazenado pode ter desempenho pior que um de borracha bem especificado. Solicite política de reposição e registre versão."),
      rich("aplicacao", "6. Escolha por aplicação", "Para academia geral e distribuição ampla, borracha pode oferecer equilíbrio. Para área premium, PU pode apoiar apresentação. TPU pode ser adequado quando a construção e o preço atendem ao projeto. Estúdios leves podem usar outras categorias como neoprene.", "Considere público, faixa, rack e marca. Material não corrige uma faixa mal dimensionada ou um suporte incompatível."),
      rich("oem", "7. OEM, cor e logo", "Materiais respondem de forma diferente a relevo, impressão, placa ou inserto. Defina método e teste aderência e leitura. Cor personalizada pode alterar MOQ. Em faixas de peso, logo precisa escalar.", "A embalagem de marca própria deve proteger a superfície. Para produtos premium, atrito durante transporte pode comprometer a apresentação antes da venda."),
      rich("custo", "8. Custo total e reposição", "Compare preço por linha, não apenas uma unidade. Inclua amostra, logo, embalagem, frete e rack. Um material mais caro pode sustentar posicionamento, mas somente se mercado e qualidade justificarem.", "Planeje reposição por SKU. Diferenças de lote podem ser mais visíveis em cores e acabamentos premium. Mantenha referência e arquivos."),
      checklist("checklist", "Checklist de material", ["Aplicação e posicionamento", "Formulação/construção do modelo", "Faixa e tolerância", "Odor e ventilação", "Superfície, cor e textura", "União e empunhadura", "Rack e limpeza", "Logo e embalagem", "MOQ, custo e reposição"]),
      rich("conclusao", "Conclusão para compradores B2B", "Use material como um critério dentro da especificação completa. Solicite amostra, compare modelos equivalentes e documente manutenção. Evite frases absolutas como “PU nunca tem odor” ou “TPU dura para sempre”.", "A PowerBaseFit oferece linhas em borracha, PU e TPU conforme catálogo. A configuração final, o MOQ e as opções OEM são confirmados pelo produto e pelo pedido.")
    ],
    faq: [["PU é melhor que borracha?", "Não universalmente. PU pode atender posicionamento premium; borracha pode ser mais versátil. Compare a aplicação."], ["TPU e PU são iguais?", "Não. TPU é uma categoria termoplástica dentro da família de poliuretanos e usa processos distintos."], ["Qual material tem menos odor?", "Depende da formulação e embalagem. Avalie amostra e ventilação, sem assumir pelo nome."], ["Qual dura mais?", "Durabilidade depende de formulação, construção, uso, rack e manutenção."], ["Todos aceitam logo?", "Muitos modelos aceitam, mas método, área, MOQ e amostra variam."]],
    links: [["pu-dumbbell", "Halter de PU"], ["rubber-hex-dumbbell", "Halter de borracha sextavado"], ["rubber-round-dumbbell", "Halter redondo"], ["dumbbells-category", "Linha de halteres"], ["contact", "Solicitar amostra e cotação"]],
    ...common
  },
  {
    id: "olympic-vs-standard-guide", type: "blog", ptPath: "/pt/blog/anilha-olimpica-vs-padrao",
    title: "Anilha olímpica vs. padrão: diferenças",
    description: "Entenda anilha olímpica e padrão: furação, barra, carga, espessura, bumper plates, armazenamento, compatibilidade e compra para academia profissional.",
    h1: "Qual a diferença entre anilha olímpica e anilha padrão?",
    image: ["/assets/weight-plate.jpg", "Anilhas olímpicas para barras de academia"],
    blocks: [
      quick("resposta-rapida", "A diferença principal é a compatibilidade com a barra: anilhas olímpicas usam centro para mangas olímpicas; anilhas padrão usam furação menor conforme o sistema. Não misture sem confirmar medidas. Bumper plate é uma construção normalmente olímpica, mas nem toda anilha olímpica é bumper."),
      definition("definicao", "Padrão de anilha", "É o conjunto de dimensões que determina encaixe entre anilha e barra. Os nomes comerciais ajudam, mas a compra deve usar medidas e tolerâncias do produto real. Uma pequena incompatibilidade pode impedir carregamento ou criar folga inadequada."),
      table("comparacao", "Olímpica vs. padrão", ["Critério", "Olímpica", "Padrão"], [
        ["Manga", "Barra olímpica", "Barra de diâmetro menor conforme sistema"],
        ["Uso", "Academias, levantamento e máquinas compatíveis", "Treino doméstico e linhas específicas"],
        ["Variedade", "Metal, borracha, PU e bumper", "Metal e revestidas em diferentes formatos"],
        ["Carga", "Relacionada à barra e à espessura", "Relacionada à barra e ao sistema"],
        ["Compra B2B", "Comum em projetos profissionais", "Exige mercado e compatibilidade claros"],
        ["Risco", "Assumir que toda olímpica é bumper", "Misturar barras e anilhas incompatíveis"]
      ]),
      rich("medida", "1. Meça a barra e o equipamento", "Identifique o diâmetro da manga e o comprimento carregável. Confirme com fabricante ou medição apropriada. Máquinas plate-loaded também têm pinos com dimensões específicas. Não use apenas aparência.", "Peça ao fornecedor dimensão interna e tolerância. Um centro excessivamente apertado dificulta uso; folga excessiva pode gerar movimento. Inserto e acabamento precisam estar livres de rebarbas."),
      rich("tipos", "2. Olímpica não significa bumper", "Uma anilha olímpica pode ser de ferro, aço, emborrachada, PU ou bumper. O termo olímpica descreve encaixe. Bumper descreve corpo de borracha e diâmetro uniforme para levantamento. Uma anilha olímpica emborrachada comum não deve ser usada como bumper sem especificação.", "Ao comprar, escreva construção completa: “anilha olímpica emborrachada para musculação” ou “bumper plate de treino”. Isso reduz confusão."),
      table("tipos-tabela", "Tipos dentro do padrão olímpico", ["Tipo", "Uso", "Ponto crítico"], [
        ["Ferro/aço", "Musculação e carga compacta", "Piso, ruído e oxidação"],
        ["Emborrachada", "Academia comercial", "Revestimento, centro e pegadas"],
        ["PU", "Linha premium", "Superfície, logo e custo"],
        ["Bumper de treino", "Levantamento", "Espessura, dureza e plataforma"],
        ["Bumper de competição", "Treino técnico/competição", "Tolerância e documentação"]
      ]),
      rich("espessura", "3. Analise espessura e capacidade", "O padrão de furação não informa espessura. Anilhas metálicas podem ser compactas; bumper leves podem ser grossas. Calcule quantas peças cabem no comprimento útil da manga e qual carga a barra e a estação suportam.", "Nunca determine capacidade apenas pelo espaço. Siga limites de barra e equipamento. Em academias, padronize barras e anilhas para reduzir erro."),
      rich("mix", "4. Planeje o mix", "Inclua pesos pequenos para progressão e pesos maiores conforme público. Quantidade deve considerar barras, estações e simultaneidade. Distribuidores podem oferecer conjuntos e unidades avulsas; academias precisam de reposição.", "Se manter dois padrões, separe racks e comunicação. Compatibilidade deve aparecer na embalagem e na página."),
      rich("armazenamento", "5. Armazenamento e operação", "Use suportes com diâmetro compatível e capacidade adequada. Posicione próximos às estações sem bloquear passagem. Anilhas com pegadas facilitam manuseio, mas formato e bordas também importam.", "Inspecione centro, superfície e marcação. Retire peças com danos que comprometam uso. Oriente usuários a devolver no suporte correto."),
      rich("compra", "6. Compra B2B e especificação", "A RFQ deve informar padrão, medida, material, pesos, unidades, espessura relevante, logo, kg/lb e embalagem. Peça ficha e amostra quando necessário. Confirme se o preço é por unidade, par ou conjunto.", "Não compare anilhas apenas por peso. Construção, perfil, centro e acabamento alteram custo. Registre código para reposição."),
      rich("oem", "7. OEM e marca própria", "Logo pode ser em relevo, impressão ou outro método. Cor e marcação ajudam a identificar pesos. O método depende do material e do molde. Embalagem deve explicar compatibilidade sem alegações incorretas.", "Aprovar um peso não garante proporção em todos. Revise leve e pesado. Defina versões kg/lb."),
      rich("experiencia", "Experiência de fábrica", "A PowerBaseFit oferece anilhas olímpicas emborrachadas, bumper e outras linhas. A equipe precisa saber barra, uso e pesos para indicar produto. Furação, espessura e tolerância são confirmadas por modelo.", "Essa confirmação deve ocorrer antes da produção e da importação. Alterar o padrão depois do pedido pode tornar toda a linha incompatível."),
      checklist("checklist", "Checklist de compatibilidade", ["Diâmetro da manga/pino", "Comprimento carregável", "Capacidade da barra/equipamento", "Diâmetro interno e tolerância", "Espessura por peso", "Uso com ou sem queda", "Piso e suporte", "Pesos e quantidades", "Logo, marcação e embalagem"]),
      rich("conclusao", "Conclusão", "Escolha o padrão que já existe no projeto ou padronize a nova área. Para academia profissional, olímpico é comum pela variedade, mas a decisão deve considerar barras, máquinas e operação. Padrão menor pode atender mercados específicos. O que não é aceitável é comprar sem medida e esperar compatibilidade.")
    ],
    faq: [["Qual é o furo da anilha olímpica?", "A compra deve usar a medida e tolerância informadas pelo fabricante para a manga real; não confie apenas no nome."], ["Bumper plate é olímpica?", "Normalmente sim, mas confirme o modelo. Nem toda olímpica é bumper."], ["Posso usar adaptador?", "Somente se barra, carga, equipamento e fabricante permitirem; valide tecnicamente."], ["Anilha padrão serve em barra olímpica?", "Em geral não diretamente, pois os diâmetros diferem. Confirme medidas."], ["Qual é melhor para academia?", "O padrão olímpico é comum em projetos profissionais, mas precisa ser compatível com o conjunto."]],
    links: [["rubber-olympic-plate", "Anilha olímpica emborrachada"], ["rubber-bumper-plate", "Bumper plate"], ["weight-plates-category", "Linha de anilhas"], ["plates-guide", "Anilha vs. bumper"], ["contact", "Confirmar especificação"]],
    ...common
  },
  {
    id: "professional-gym-list-guide", type: "blog", ptPath: "/pt/blog/lista-equipamentos-academia-profissional",
    title: "Lista de equipamentos para academia profissional",
    description: "Guia para montar a lista de equipamentos de uma academia profissional: zonas, halteres, anilhas, racks, bancos, quantidades, layout, orçamento e cotação B2B.",
    h1: "Quais equipamentos uma academia profissional precisa?",
    image: ["/assets/case-gym.png", "Área profissional de equipamentos de musculação"],
    blocks: [
      quick("resposta-rapida", "Uma academia profissional precisa de equipamentos alinhados ao público, área, capacidade e proposta: cardio quando previsto, máquinas, pesos livres, bancos, racks, acessórios, armazenamento e piso. Para a área de força, dimensione halteres, anilhas, barras e estações por usuários e exercícios; não copie uma lista universal."),
      definition("definicao", "Lista de equipamentos de academia", "É um inventário planejado por zona, função e quantidade. Deve relacionar cada item ao espaço, ao fluxo de usuários, à manutenção, ao orçamento e à instalação. Uma lista comercial também inclui modelo, especificação, unidade, personalização e destino."),
      rich("briefing", "1. Comece pelo briefing da operação", "Defina público, preço da mensalidade, modalidades, horário, pico e área útil. Uma academia de bairro, um clube premium, um condomínio e um estúdio precisam de mixes diferentes. Registre limitações de energia, piso, acesso, descarga e manutenção com profissionais responsáveis.", "Crie metas de capacidade por zona. Evite preencher espaço com equipamentos redundantes enquanto faltam pesos, armazenamento ou circulação. O layout deve ser desenvolvido por profissionais e validado por segurança e acessibilidade."),
      table("zonas", "Zonas de uma academia", ["Zona", "Itens", "Decisão"], [
        ["Pesos livres", "Halteres, anilhas, barras, bancos e racks", "Faixa, quantidade, armazenamento e piso"],
        ["Musculação guiada", "Máquinas seletorizadas ou carregadas", "Grupos musculares, manutenção e capacidade"],
        ["Funcional", "Kettlebells, steps, mats e acessórios", "Aulas, armazenamento e desgaste"],
        ["Cardio", "Esteiras, bikes e outros", "Energia, conectividade e assistência"],
        ["Apoio", "Piso, espelhos, suportes e circulação", "Segurança, limpeza e operação"]
      ]),
      rich("halteres", "2. Planeje halteres", "Escolha formato, material, faixa e incremento. Sextavados oferecem estabilidade; redondos organizam uma linha em rack; PU atende posicionamento premium. Calcule pares repetidos em pesos populares.", "Meça o rack e reserve circulação. Para pesos altos, avalie ergonomia. Registre sistema kg/lb e identidade. Uma linha incompleta ou sem reposição prejudica experiência."),
      rich("anilhas", "3. Planeje anilhas e barras", "Defina padrão e compatibilidade. Separe musculação de levantamento. Use bumper plates somente com ambiente apropriado. Calcule quantidade por barra e estação, incluindo pesos pequenos para progressão.", "Considere espessura e armazenamento. Anilhas perto das estações reduzem deslocamento, mas suportes não podem bloquear circulação."),
      table("peso-livre", "Dados mínimos da área de pesos livres", ["Categoria", "Dados"], [
        ["Halteres", "Formato, material, menor/maior peso, incremento, pares"],
        ["Anilhas", "Padrão, material, pesos, unidades, espessura"],
        ["Barras", "Padrão, comprimento, capacidade e uso"],
        ["Bancos", "Quantidade, ajustes, dimensões e estabilidade"],
        ["Racks", "Posições, carga, compatibilidade e ancoragem quando aplicável"],
        ["Piso", "Especificação local por zona e impacto"]
      ]),
      rich("maquinas", "4. Equilibre máquinas e pesos livres", "Máquinas podem orientar movimento e ampliar acesso; pesos livres oferecem variedade. O equilíbrio depende de público e equipe. Mapeie padrões de movimento e evite duplicação sem justificativa.", "A PowerBaseFit concentra este conteúdo em pesos livres e equipamentos relacionados. Para máquinas e cardio, procure fornecedores e assistência compatíveis com o projeto. Não inclua categorias apenas para parecer completo."),
      rich("quantidade", "5. Calcule quantidades pelo pico", "Estime usuários simultâneos e duração por estação. Itens baratos podem virar gargalo: bancos, pares intermediários, presilhas e suportes. Uma planilha de capacidade ajuda a identificar.", "Use cenários conservador, esperado e alto. Reserve orçamento para reposição e expansão. Uma compra inicial não precisa ocupar toda a área, mas infraestrutura deve permitir crescimento."),
      rich("qualidade", "6. Especifique qualidade e manutenção", "Defina material, peso, tolerância, superfície, montagem e embalagem. Para racks, examine solda, revestimento, ferragens e instruções. Para halteres e anilhas, verifique união, centro e marcação.", "Crie plano de inspeção periódica e limpeza. Defina como retirar produto danificado. Assistência e peças influenciam custo total."),
      rich("orcamento", "7. Distribua orçamento", "Separe produto, frete, tributos, instalação, piso, energia, descarga, montagem e contingência. Não comprometa circulação ou armazenamento para comprar mais máquinas. Compare custo por zona e capacidade.", "Para importação, valide custos com profissionais. Uma economia no produto pode desaparecer com carga mal planejada ou montagem complexa."),
      rich("rfq", "8. Transforme a lista em RFQ", "Use uma linha por produto com quantidade, modelo, especificação e personalização. Anexe planta e destino. Informe se precisa de amostra, inspeção e embalagem por área.", "Peça propostas comparáveis e registre dúvidas. Não permita substituição sem aprovação. Para OEM, inclua logo e cores."),
      checklist("checklist", "Checklist da lista", ["Público e capacidade", "Zonas e área útil", "Exercícios e modalidades", "Halteres, anilhas, barras e racks", "Máquinas e cardio conforme escopo", "Piso, energia e circulação", "Armazenamento", "Manutenção e reposição", "Orçamento total", "RFQ e cronograma"]),
      rich("experiencia", "Experiência da PowerBaseFit", "A equipe pode apoiar a especificação comercial de halteres, anilhas, racks, bancos e acessórios, além de OEM e embalagem. Para cotar, envie lista, quantidade, planta quando relevante e destino.", "A fábrica não substitui arquiteto, engenheiro, profissional de segurança ou responsável técnico local. A lista deve ser validada no projeto completo.")
    ],
    faq: [["Existe uma lista padrão?", "Não. Público, área, modalidades e orçamento mudam a necessidade."], ["Quantos halteres comprar?", "Calcule faixa, pico, exercícios e pesos populares; duplique quando necessário."], ["Preciso de bumper plates?", "Somente se o programa inclui levantamento e existe piso/plataforma apropriado."], ["Devo comprar tudo de uma vez?", "Pode haver fases, desde que infraestrutura e compatibilidade sejam planejadas."], ["A fábrica faz layout?", "Pode apoiar seleção comercial, mas arquitetura e segurança exigem profissionais locais."]],
    links: [["products-hub", "Ver categorias"], ["dumbbells-guide", "Escolher halteres"], ["plates-guide", "Escolher anilhas"], ["free-weight-area-guide", "Planejar área"], ["projects", "Referências visuais"], ["contact", "Enviar lista"]],
    ...common
  },
  {
    id: "free-weight-area-guide", type: "blog", ptPath: "/pt/blog/planejamento-area-pesos-livres",
    title: "Como planejar uma área de pesos livres",
    description: "Planeje uma área de pesos livres com halteres, anilhas, racks, bancos, piso, circulação, capacidade, armazenamento, manutenção e compra B2B.",
    h1: "Planejamento de uma área de pesos livres para academia",
    image: ["/assets/project-dumbbell-zone.png", "Planejamento de área de pesos livres com halteres"],
    blocks: [
      quick("resposta-rapida", "Uma área de pesos livres deve relacionar usuários, exercícios, halteres, anilhas, barras, bancos, racks, piso, circulação e armazenamento. Defina zonas e capacidade antes de comprar. Medidas, estrutura, segurança e acessibilidade precisam ser validadas por profissionais locais; o fornecedor apoia especificação comercial dos equipamentos."),
      definition("definicao", "Área de pesos livres", "É o espaço dedicado a exercícios com halteres, barras, anilhas, kettlebells e bancos, sem trajetória totalmente guiada por uma máquina. Ela exige organização, supervisão, piso adequado, distância entre usuários e armazenamento próximo."),
      rich("objetivo", "1. Defina função e capacidade", "Liste exercícios, público e pico. Uma área para musculação geral difere de levantamento técnico. Defina número de usuários por zona e tempo de uso. Isso orienta estações, pares e bancos.", "Não comece desenhando racks. Comece pelos fluxos: entrada, retirada, exercício, devolução e saída. Evite cruzamentos e peças em passagem. Profissionais locais devem validar requisitos de segurança."),
      table("zonas", "Zonas internas", ["Zona", "Equipamentos", "Risco a controlar"], [
        ["Halteres", "Racks e pares", "Retirada, rolamento e circulação"],
        ["Bancos", "Bancos ajustáveis ou retos", "Distância e movimentação"],
        ["Barras", "Racks, gaiolas e bancos", "Carga, travas e área de segurança"],
        ["Levantamento", "Plataforma e bumper plates", "Impacto, técnica e isolamento"],
        ["Armazenamento", "Suportes de anilhas e acessórios", "Capacidade e devolução"]
      ]),
      rich("halteres", "2. Dimensione halteres", "Escolha formato, material e faixa. Calcule posições de rack e pares duplicados. Pesos leves e médios podem ter maior simultaneidade. Pesos altos exigem retirada segura e público adequado.", "O rack deve combinar com a cabeça. Sextavados reduzem rolamento no piso; redondos dependem de suporte. Reserve espaço em frente e lateral para usuários."),
      rich("anilhas", "3. Posicione anilhas e barras", "Anilhas devem ficar próximas às estações, sem bloquear. Separe padrões incompatíveis. Calcule suportes por peso e número de barras. Bumper plates ocupam mais espaço e devem ficar perto da plataforma.", "Considere como o usuário carrega e descarrega. Suportes muito baixos ou congestionados aumentam esforço e desorganização. Identificação clara ajuda devolução."),
      table("capacidade", "Planilha de capacidade", ["Item", "Cálculo", "Verificação"], [
        ["Halteres", "Pares por peso × posições", "Rack e pico"],
        ["Bancos", "Usuários simultâneos × exercícios", "Distância e mobilidade"],
        ["Barras", "Estações ativas + reserva", "Padrão e capacidade"],
        ["Anilhas", "Carga por estação × número", "Mix e suporte"],
        ["Plataformas", "Usuários de levantamento", "Piso, ruído e estrutura"],
        ["Circulação", "Rotas e áreas livres", "Validação profissional"]
      ]),
      rich("piso", "4. Piso, impacto e ruído", "Piso deve ser especificado por atividade, carga, estrutura e vizinhança. Uma camada de borracha não resolve automaticamente vibração ou queda. Plataformas podem ser necessárias em zonas de levantamento.", "Defina regras: onde a barra pode tocar o piso, quais anilhas usar e como inspecionar. Mantenha área seca e limpa. Fabricante de equipamento não substitui avaliação estrutural."),
      rich("circulacao", "5. Circulação e ergonomia", "Considere corpo em movimento, não apenas dimensão do equipamento. Bancos mudam de posição; usuários carregam halteres; barras avançam lateralmente. Reserve margens e rotas de emergência.", "Espelhos, colunas e portas influenciam. Evite posicionar racks onde peças abertas bloqueiam acesso. Valide acessibilidade local."),
      rich("identificacao", "6. Identificação e experiência", "Organize pesos em sequência e use marcação legível. Cor pode ajudar, mas não substitui número. Para marca própria, mantenha contraste. Sinalização pode explicar devolução e uso de plataforma.", "Uma área organizada reduz procura e melhora percepção. Planeje limpeza e acesso da equipe sem interromper toda a zona."),
      rich("manutencao", "7. Manutenção e inspeção", "Crie rotinas diárias e periódicas. Verifique halteres soltos, borracha danificada, inserto de anilha, barras, presilhas, soldas, parafusos, estofamento e rack. Registre retirada e reposição.", "Produtos de limpeza devem ser compatíveis. Suor e umidade não devem permanecer em metal. Treine equipe para identificar problemas."),
      rich("compra", "8. Compra e implantação", "Converta o layout em lista por zona. Inclua dimensões, faixa, quantidades, logo e embalagem. Confirme se produtos chegam montados ou desmontados e quem executa descarga e montagem.", "Planeje entrega em sequência. Pesos podem chegar antes dos racks apenas se houver armazenagem segura. Para importação, inclua folga de cronograma e custos locais."),
      rich("experiencia", "Referências PowerBaseFit", "As referências de projetos existentes mostram áreas de halteres redondos, sextavados e anilhas. Elas ajudam a discutir organização, mas não comprovam medidas ou resultados de uma academia específica.", "A equipe pode relacionar produtos reais ao briefing. Arquitetura, estrutura, instalações e segurança permanecem com responsáveis locais."),
      checklist("checklist", "Checklist de área", ["Público, exercícios e pico", "Zonas e capacidade", "Faixa e pares de halteres", "Barras, anilhas e compatibilidade", "Racks, bancos e armazenamento", "Piso, plataforma e ruído", "Circulação e acessibilidade", "Identificação", "Manutenção", "Entrega e montagem"]),
      table("erros", "Erros comuns", ["Erro", "Consequência", "Prevenção"], [
        ["Comprar antes do layout", "Falta de espaço", "Briefing e medidas"],
        ["Mesmo número de todos os pesos", "Gargalo ou estoque ocioso", "Análise de uso"],
        ["Rack incompatível", "Danos e desorganização", "Validar dimensões"],
        ["Misturar padrões", "Anilhas não encaixam", "Padronizar e sinalizar"],
        ["Ignorar descarga", "Atraso e risco", "Plano logístico local"],
        ["Sem reposição", "Linha incompleta", "Códigos e estoque"]
      ])
    ],
    faq: [["Quanto espaço deixar entre equipamentos?", "Depende do equipamento, movimento, normas e projeto. Profissional local deve validar medidas."], ["Qual piso usar?", "Defina conforme carga, atividade, estrutura e ruído com especialista; não existe solução universal."], ["Quantos pares de halteres?", "Calcule por pico, faixa e pesos populares."], ["Bumper pode ser usada em qualquer piso?", "Não. Use plataforma ou piso apropriado e regras de treinamento."], ["A PowerBaseFit faz projeto arquitetônico?", "Não. Apoia seleção comercial; projeto e segurança são locais."]],
    links: [["projects", "Ver referências"], ["professional-gym-list-guide", "Lista de equipamentos"], ["dumbbells-category", "Halteres"], ["weight-plates-category", "Anilhas"], ["contact", "Enviar briefing"]],
    ...common
  }
];
