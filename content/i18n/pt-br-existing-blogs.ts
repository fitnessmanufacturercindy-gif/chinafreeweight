import type { PilotPage } from "./pt-br-types";
import { checklist, definition, quick, rich, table } from "./pt-br-content-helpers";
import { ptBrEditorialAuthor, ptBrTechnicalReviewer } from "./pt-br-existing-growth";

export const existingBlogEnhancements: Record<string, Partial<PilotPage>> = {
  "factory-guide": {
    title: "Como avaliar uma fábrica de equipamentos de academia",
    blocks: [
      quick("resposta-rapida", "Para avaliar uma fábrica de equipamentos de academia na China, confirme se ela produz a categoria cotada, peça especificação por modelo, revise amostra e processo, defina critérios mensuráveis de qualidade, verifique embalagem e alinhe responsabilidades comerciais e logísticas. Fotos institucionais e preço baixo, isoladamente, não comprovam capacidade."),
      definition("definicao", "Avaliação de fábrica OEM", "É um processo de diligência comercial e técnica que compara capacidade real, produto, amostra, controle de qualidade, comunicação, embalagem e preparação para exportação com os requisitos do comprador. O objetivo não é encontrar uma fábrica “perfeita”, mas reduzir riscos conhecidos antes do depósito."),
      rich("compatibilidade", "1. Comece pela compatibilidade do fornecedor", "Uma fábrica pode ser competente e ainda assim não ser adequada ao seu pedido. Primeiro verifique se ela fabrica halteres, anilhas, racks ou a categoria necessária e se trabalha com a faixa de quantidade do projeto. Pergunte quais processos são internos, quais dependem de parceiros e como materiais e versões são identificados.", "A cotação precisa usar um modelo definido. Expressões como “halter premium” ou “anilha de alta qualidade” não são especificações. Solicite nome, imagem, faixa de peso, material, dimensões relevantes, acabamento, opções de logo, embalagem e condição comercial. Quando uma informação ainda depende de amostra, ela deve ser marcada como pendente, não tratada como fato."),
      table("evidencias", "Evidências que ajudam a avaliar capacidade", ["Evidência", "O que pode confirmar", "Limitação"], [
        ["Fotos e vídeos atuais", "Processo, produto e organização visível", "Podem mostrar apenas um momento ou outra linha"],
        ["Especificação e desenho", "Dimensões, material e versão cotada", "Precisam corresponder à produção"],
        ["Amostra", "Acabamento, ergonomia, logo e embalagem", "Não prova sozinha a consistência do lote"],
        ["Relatório de inspeção", "Resultado de critérios definidos", "Depende de amostragem e método"],
        ["Visita ou auditoria", "Instalação, fluxo e controles", "Tem custo e precisa de escopo claro"]
      ]),
      rich("processo", "2. Verifique o processo ligado ao produto", "Peça uma descrição do fluxo da categoria real. Um halter revestido pode envolver preparação de componentes, moldagem ou aplicação de material, acabamento, marcação e embalagem. Uma anilha pode exigir formação do corpo, instalação do inserto, medição e proteção. Racks e bancos acrescentam corte, solda, revestimento, montagem e teste de componentes.", "O fornecedor deve conseguir explicar onde ocorrem os controles e quais parâmetros podem ser registrados. Uma resposta tecnicamente coerente vale mais do que uma longa lista de máquinas sem relação com o pedido. Compare a explicação da equipe comercial com imagens, amostra e documentação."),
      rich("amostra", "3. Use a amostra como referência documentada", "Amostras são úteis quando acabamento, ergonomia, cor, logo ou embalagem influenciam a decisão. Antes de solicitar, defina o que será avaliado e quem arcará com produção e transporte. Ao receber, registre peso, dimensões, superfície, odor, empunhadura, marcação, montagem e proteção.", "A aprovação não deve ser apenas “está boa”. Fotografe detalhes, anote medições e mantenha o código da versão. Se houver mudança, registre nova aprovação. A amostra aprovada funciona como referência do lote, mas ainda é necessário inspecionar unidades produzidas, porque uma peça não demonstra variação de processo."),
      table("amostra-tabela", "Checklist de amostra por família", ["Família", "Itens principais", "Erro comum"], [
        ["Halteres", "Peso, união, empunhadura, revestimento, logo", "Avaliar só a aparência frontal"],
        ["Anilhas", "Furação, espessura, inserto, marcação, superfície", "Não testar compatibilidade com a barra"],
        ["Racks e bancos", "Dimensões, solda, estabilidade, montagem, estofamento", "Ignorar instruções e ferragens"],
        ["Embalagem", "Proteção, peso por caixa, identificação", "Aprovar produto sem aprovar o transporte"]
      ]),
      rich("oem", "4. Avalie o programa OEM sem simplificar demais", "Pergunte quais personalizações usam o produto existente e quais exigem molde, ferramenta ou desenvolvimento. Logo, cor e embalagem podem parecer mudanças simples, mas método, área disponível, quantidade e material alteram a viabilidade. Solicite arquivo necessário, custo de amostra, MOQ e prazo de aprovação.", "Para marca própria, confirme também a consistência entre pesos e modelos. Um logo que funciona em uma cabeça grande pode ficar ilegível em pesos leves. A embalagem deve relacionar código, peso, quantidade, país de origem e outras informações acordadas. Requisitos legais do Brasil precisam ser validados pelo importador com profissionais responsáveis."),
      rich("qc", "5. Transforme qualidade em critérios mensuráveis", "“Boa qualidade” não pode ser inspecionada. Defina material, peso, tolerância, dimensão, superfície, cor, logo, montagem, quantidade e embalagem conforme o produto. Especifique método e amostragem quando necessário. Para características críticas, deixe claro o que causa reprovação ou segregação.", "A inspeção pode ser executada pela fábrica, pelo comprador ou por terceiro. Quanto maior o risco, mais importante é separar produção e decisão de liberação. Um relatório deve mostrar data, pedido, amostra analisada, resultados e fotos. Se houver não conformidade, combine correção, nova inspeção ou outra decisão antes do embarque."),
      checklist("qc-checklist", "Checklist de controle antes do embarque", ["Pedido e versão da especificação identificados", "Amostra aprovada disponível para comparação", "Quantidade conferida por modelo e peso", "Medições registradas com método definido", "Superfície, logo e cor verificados", "Montagem ou encaixe testados quando aplicável", "Embalagem e peso por volume conferidos", "Não conformidades documentadas e resolvidas"]),
      rich("embalagem", "6. Analise embalagem e carregamento", "Equipamentos de força podem ser pesados, volumosos ou sensíveis a atrito. Confirme unidades por caixa, peso líquido e bruto, dimensões, pallet e proteção individual. Halteres e anilhas exigem resistência a massa concentrada; acabamentos cromados precisam de separação; estruturas maiores precisam de proteção de bordas e peças.", "Peça uma lista preliminar de volumes e discuta o carregamento do contêiner. Um bom preço de produto pode ser anulado por embalagem inadequada, baixa ocupação ou danos. O comprador também deve planejar descarga e armazenagem no destino."),
      rich("comercial", "7. Confirme escopo comercial e comunicação", "Compare propostas na mesma condição. Verifique Incoterm, porto, pagamento, validade, prazo, documentação e o que está fora do preço. Não aceite um prazo genérico sem saber se começa no depósito, na aprovação da amostra ou na confirmação de materiais.", "Observe a qualidade da comunicação. Respostas consistentes, registro de mudanças e disposição para esclarecer limites reduzem erros. Antes do depósito, consolide produto, quantidade, personalização, embalagem, QC e condição comercial em documentos controlados. Mensagens dispersas não devem ser a única fonte de verdade."),
      table("scorecard", "Scorecard simples para comparar fornecedores", ["Critério", "Pergunta", "Peso sugerido"], [
        ["Compatibilidade", "Produz a categoria e o volume necessários?", "Alta"],
        ["Especificação", "Documenta materiais, dimensões e versão?", "Alta"],
        ["Qualidade", "Aceita critérios e inspeção mensuráveis?", "Alta"],
        ["OEM", "Distingue personalização simples de desenvolvimento?", "Média"],
        ["Embalagem", "Planeja proteção e carga pesada?", "Alta"],
        ["Comunicação", "Registra mudanças e responde com consistência?", "Alta"],
        ["Preço", "O escopo é comparável e o custo total faz sentido?", "Média"]
      ]),
      rich("experiencia", "Experiência da PowerBaseFit", "Na operação da PowerBaseFit, pedidos de pesos livres precisam ser tratados como uma combinação de especificação e logística. Uma pequena mudança na faixa de pesos altera quantidade, caixas e carga. Um novo logo pode exigir amostra. Uma superfície premium exige proteção diferente. Por isso, a equipe pede lista, mercado, destino e personalização antes de confirmar MOQ e prazo.", "Essa experiência não elimina a diligência do comprador. Ela indica quais perguntas devem ser respondidas antes da produção e por que uma cotação detalhada é mais útil do que uma promessa ampla."),
      checklist("rfq", "Informações para enviar na primeira RFQ", ["Empresa, mercado e canal de venda", "Produto, modelo e uso previsto", "Pesos, quantidades e sistema kg/lb", "Materiais, dimensões ou tolerâncias obrigatórias", "Logo, cores, embalagem e arquivos", "Amostra e inspeção desejadas", "Destino, prazo e condição comercial solicitada"])
    ],
    faq: [
      ["Como saber se um fornecedor é realmente fabricante?", "Peça endereço, imagens atuais, fluxo do produto, documentação e evidências ligadas ao item cotado. Visita ou inspeção independente pode ser considerada conforme o risco."],
      ["Qual é o principal risco em um pedido OEM?", "Uma especificação incompleta. Sem versão, amostra, tolerâncias, logo e embalagem definidos, comprador e fábrica podem interpretar o mesmo pedido de formas diferentes."],
      ["A amostra garante que todo o lote será igual?", "Não. Ela estabelece uma referência; o lote ainda precisa de controle de processo e inspeção por amostragem ou critérios acordados."],
      ["Devo escolher a fábrica com menor preço?", "Preço é um critério, mas deve ser comparado com escopo, produto, QC, embalagem, prazo e custo logístico. Propostas diferentes não são diretamente comparáveis."],
      ["Quando contratar inspeção de terceiros?", "Quando valor, complexidade, histórico, distância ou risco justificarem uma verificação independente. O escopo precisa ser definido antes da visita."]
    ],
    links: [["factory", "Conhecer a fábrica PowerBaseFit"], ["import-guide", "Planejar uma importação"], ["moq-guide", "Entender MOQ"], ["oem-private-label", "Planejar um programa OEM"], ["contact", "Enviar uma RFQ"]],
    author: ptBrEditorialAuthor,
    reviewedBy: ptBrTechnicalReviewer
  },
  "dumbbells-guide": {
    blocks: [
      quick("resposta-rapida", "Escolha halteres para uma academia profissional a partir de cinco decisões: ambiente e público, material e formato, faixa de pesos, ergonomia e rack, além de manutenção e reposição. Para compra B2B, acrescente tolerância, logo, embalagem, MOQ e consistência entre lotes."),
      definition("definicao", "Programa de halteres para academia", "É o conjunto planejado de modelos, pesos, quantidades, rack, identificação e reposição que atende o perfil de treino e o número de usuários. Não é apenas comprar um par de cada peso; é dimensionar disponibilidade, espaço, manutenção e continuidade."),
      rich("ambiente", "1. Defina ambiente, público e intensidade", "Uma rede de alto fluxo exige produtos fáceis de identificar, limpar e repor. Um hotel pode trabalhar com faixa menor e valorizar apresentação compacta. Um estúdio pode precisar de halteres leves em maior quantidade para aulas. Uma loja precisa de modelos coerentes com preço, embalagem e procura local.", "Registre horários de pico, número de posições de treino, exercícios principais e expectativa de expansão. Essa informação orienta formato, quantidade e rack. Escolher por fotografia sem analisar operação costuma gerar falta de pesos populares ou excesso de unidades pouco utilizadas."),
      table("modelos", "Comparação de formatos", ["Formato", "Vantagem", "Limitação", "Melhor contexto"], [
        ["Sextavado", "Reduz rolamento e apoia exercícios no piso", "Ocupa rack específico e pode variar de tamanho", "Academias, funcional e atacado"],
        ["Redondo", "Organiza bem uma linha contínua", "Pode rolar fora do rack", "Áreas completas de pesos livres"],
        ["Cromado", "Compacto e visualmente premium", "Pede cuidado com umidade e atrito", "Hotéis, estúdios e showrooms"],
        ["Ajustável", "Concentra vários pesos em uma unidade", "Mecanismo exige uso e manutenção adequados", "Espaços compactos e determinados canais"]
      ]),
      rich("materiais", "2. Compare materiais e acabamentos", "Halteres de borracha são reconhecidos em academias e oferecem diferentes formatos. PU e TPU podem atender projetos premium, com superfície e posicionamento específicos. Cromados priorizam aparência metálica. Neoprene é comum em pesos leves, aulas e varejo. O nome do material não basta: composição, acabamento e construção devem ser associados ao modelo real.", "Avalie odor inicial, textura, resistência a produtos de limpeza, contato com o rack, marcação e possibilidade de reparo ou reposição. Peça amostra quando aparência e identidade visual forem decisivas. Compare o mesmo peso e formato, porque tamanho da cabeça e empunhadura podem mudar entre materiais."),
      table("materiais-tabela", "Comparação de materiais", ["Material", "Posicionamento", "Ponto de controle"], [
        ["Borracha", "Comercial versátil", "Odor, superfície, união e marcação"],
        ["PU", "Premium e apresentação uniforme", "Formulação, acabamento, logo e amostra"],
        ["TPU", "Alternativa termoplástica para linhas específicas", "Construção, textura e desempenho documentado"],
        ["Cromado", "Visual metálico compacto", "Umidade, riscos e embalagem"],
        ["Neoprene", "Pesos leves e aulas", "Revestimento, cor e embalagem de conjunto"]
      ]),
      rich("faixa", "3. Monte a faixa de pesos", "Comece pelo menor e maior peso compatíveis com o público. Depois escolha incremento. A linha de halter sextavado PowerBaseFit, por exemplo, é cadastrada de 2,5 a 50 kg em incrementos de 2,5 kg; a linha redonda de borracha chega a 100 kg. Isso não significa que toda academia precise comprar a faixa completa.", "Analise quais pesos serão usados simultaneamente. Pesos leves e intermediários podem precisar de pares duplicados. Pesos altos podem ser comprados em menor quantidade, desde que atendam o perfil. Reserve capacidade de rack e orçamento para reposição futura."),
      table("quantidades", "Exemplo de lógica de quantidade", ["Faixa", "Demanda provável", "Decisão de planejamento"], [
        ["Leve", "Aquecimento, aulas e públicos variados", "Avaliar múltiplos pares"],
        ["Intermediária", "Grande variedade de exercícios", "Maior atenção ao pico de uso"],
        ["Pesada", "Treino de força e usuários avançados", "Relacionar ao público e à ergonomia do rack"],
        ["Muito pesada", "Aplicação especializada", "Comprar somente com demanda e espaço confirmados"]
      ], "O exemplo não substitui contagem real de usuários e exercícios."),
      rich("ergonomia", "4. Avalie empunhadura e identificação", "Diâmetro, comprimento e textura influenciam aderência. Uma empunhadura muito agressiva pode incomodar alguns públicos; uma textura insuficiente pode prejudicar controle. Compare pesos leves e pesados, porque a geometria pode variar.", "A marcação precisa ser legível no rack e no piso. Para marca própria, aprove tamanho, posição e contraste do logo em mais de um peso. Se houver kg e lb, use versões claramente separadas. Identificação confusa aumenta erros de seleção e estoque."),
      rich("rack", "5. Planeje rack, circulação e piso", "Meça o rack antes do pedido ou selecione ambos em conjunto. Verifique número de posições, distância, apoio e compatibilidade com formato. Halteres redondos, sextavados e cromados podem exigir suportes diferentes. O rack deve permitir retirada sem prender dedos ou bater peças vizinhas.", "Reserve circulação em frente ao suporte e evite que usuários deixem halteres em rotas de passagem. O piso deve ser especificado por profissional responsável pelo ambiente. Revestimento do halter não substitui piso adequado nem autoriza quedas."),
      rich("qualidade", "6. Compare qualidade por critérios", "Peça peso, tolerância, material, construção, superfície, empunhadura e método de logo. Defina uma amostra quando necessário. No lote, verifique peso, pares, alinhamento, acabamento, marcação, quantidade e embalagem.", "Uma foto não revela folga, peso ou consistência. Para distribuidores, também é importante avaliar repetibilidade entre lotes e processo de reposição. Registre códigos e versões para que pedidos futuros não dependam apenas de memória."),
      checklist("checklist", "Checklist de compra", ["Ambiente, público e pico de usuários", "Formato e material por aplicação", "Faixa, incremento e quantidade por peso", "Empunhadura e marcação", "Rack, piso e circulação", "Logo, kg/lb e embalagem", "Amostra, tolerância e inspeção", "Plano de reposição e identificação de versão"]),
      rich("experiencia", "Recomendação de fábrica para compradores B2B", "Na experiência de produção e exportação da PowerBaseFit, erros aparecem quando a lista não separa pesos e unidades ou quando logo e embalagem ficam para depois do orçamento. Uma RFQ clara deve mostrar cada referência, quantidade e personalização. Isso permite revisar MOQ, caixas e carga antes de criar expectativas de preço e prazo.", "Para uma academia, a melhor compra é a que permanece coerente depois da instalação: pesos disponíveis, rack compatível, manutenção simples e possibilidade de reposição. Para um distribuidor, é a linha que também pode ser explicada, armazenada e vendida sem confusão."),
      table("decisao", "Matriz final de decisão", ["Pergunta", "Se a resposta for não", "Ação"], [
        ["O modelo atende o ambiente?", "O material pode envelhecer mal", "Rever acabamento e manutenção"],
        ["A faixa atende o público?", "Haverá falta ou estoque parado", "Recalcular pesos e quantidades"],
        ["O rack é compatível?", "Pode haver danos e desorganização", "Validar dimensões e posições"],
        ["A especificação é mensurável?", "Não será possível inspecionar", "Definir peso, dimensões e critérios"],
        ["Há plano de reposição?", "A linha pode ficar incompleta", "Registrar modelo, versão e fornecedor"]
      ])
    ],
    faq: [
      ["Halter sextavado ou redondo: qual escolher?", "Sextavados reduzem rolamento e funcionam bem no piso; redondos organizam linhas completas em racks adequados. A aplicação e o espaço decidem."],
      ["Quantos pares de halteres uma academia precisa?", "Calcule por pico de usuários, exercícios, faixa, espaço e repetição dos pesos mais procurados. Não existe número universal."],
      ["PU é sempre melhor que borracha?", "Não. Material deve ser comparado com ambiente, orçamento, acabamento, manutenção e especificação real do produto."],
      ["Qual faixa de pesos é recomendada?", "Depende do público. Defina menor, maior, incremento e pares duplicados com base na operação, não apenas no catálogo."],
      ["Devo comprar o rack junto?", "É recomendável validar ambos juntos, mesmo que sejam comprados separadamente, para confirmar posições, dimensões e contato com o acabamento."]
    ],
    links: [["dumbbells-category", "Ver halteres profissionais"], ["rubber-hex-dumbbell", "Halter sextavado"], ["rubber-round-dumbbell", "Halter redondo"], ["pu-dumbbell", "Halter de PU"], ["hex-vs-round-guide", "Comparação detalhada de formatos"], ["materials-guide", "Comparação de materiais"], ["contact", "Solicitar cotação"]],
    author: ptBrEditorialAuthor,
    reviewedBy: ptBrTechnicalReviewer
  },
  "plates-guide": {
    blocks: [
      quick("resposta-rapida", "Anilhas convencionais são indicadas para musculação, máquinas carregadas e barras que não serão derrubadas; bumper plates são escolhidas para levantamento com plataforma e piso apropriados. Compare compatibilidade com a barra, espessura, material, tolerância, armazenamento, custo logístico e regras de uso."),
      definition("definicao", "Anilha de peso e bumper plate", "Anilha de peso é o termo amplo para discos carregados em barras ou equipamentos. Bumper plate é uma categoria com corpo de borracha e diâmetro externo uniforme, voltada a levantamentos. “Olímpica” descreve compatibilidade com a manga da barra e pode se aplicar a ambos os tipos."),
      rich("uso", "1. A diferença começa no uso", "Em musculação convencional, as anilhas permanecem em barras, máquinas ou suportes e normalmente não precisam ser soltas no piso. Perfil compacto, pegadas e facilidade de carregamento podem ser prioritários. Em levantamento olímpico ou determinadas rotinas funcionais, a barra pode retornar a uma plataforma, exigindo bumper plates e ambiente preparado.", "Nenhum produto torna uma área inadequada segura. Piso, plataforma, técnica, altura de queda e manutenção devem ser definidos pela academia. Se diferentes atividades compartilham o espaço, crie regras claras para barras e anilhas."),
      table("comparacao", "Anilha convencional vs. bumper plate", ["Critério", "Anilha convencional", "Bumper plate"], [
        ["Uso principal", "Musculação e equipamentos carregados", "Levantamento e treinamento funcional"],
        ["Construção", "Metal, borracha, PU ou combinações", "Corpo de borracha com centro metálico"],
        ["Diâmetro", "Pode variar por peso e modelo", "Uniforme dentro da linha"],
        ["Espessura", "Frequentemente mais compacta", "Pode ser maior, especialmente em pesos leves"],
        ["Piso", "Evitar quedas", "Exige plataforma ou piso apropriado"],
        ["Armazenamento", "Árvore, suporte ou máquina", "Suporte compatível e área de levantamento"]
      ]),
      rich("compatibilidade", "2. Confirme barra, furação e encaixe", "Antes de comprar, identifique o diâmetro da manga da barra e o padrão do equipamento. O termo “olímpico” não deve substituir uma medida confirmada. Solicite dimensão interna e tolerância do inserto. Uma folga inadequada, rebarba ou centro mal instalado prejudica carregamento e estabilidade.", "Se a academia usa barras de padrões diferentes, separe armazenamento e identificação. Misturar anilhas incompatíveis aumenta erro operacional. Para distribuição, deixe a compatibilidade clara na embalagem e na página do produto."),
      rich("espessura", "3. Analise espessura e carga na manga", "A espessura determina quantas anilhas cabem na barra. Bumper plates leves costumam ocupar mais espaço que anilhas metálicas equivalentes. Para levantamentos pesados, compare a espessura de cada peso, não apenas o diâmetro externo.", "Anilhas de aço ou ferro podem oferecer perfil compacto, mas exigem cuidado com piso, superfície e ruído. Modelos emborrachados ou de PU equilibram proteção e manuseio de formas diferentes. A decisão deve relacionar carga máxima prevista e frequência de troca."),
      table("especificacoes", "Especificações que devem ser documentadas", ["Especificação", "Pergunta de compra", "Impacto"], [
        ["Peso e tolerância", "Qual variação é aceita?", "Equilíbrio e consistência"],
        ["Diâmetro interno", "É compatível com a manga?", "Carregamento e estabilidade"],
        ["Diâmetro externo", "É uniforme ou varia?", "Altura da barra"],
        ["Espessura", "Quantas peças cabem?", "Carga total na barra"],
        ["Material e dureza", "Qual construção foi cotada?", "Uso, superfície e comportamento"],
        ["Marcação", "kg/lb, cor e logo são legíveis?", "Operação e marca própria"]
      ]),
      rich("piso", "4. Considere piso, ruído e manutenção", "Bumper plates reduzem contato direto de metal, mas ainda transmitem força ao ambiente. Plataformas, piso e estrutura precisam ser avaliados localmente. Quedas repetidas de altura inadequada aceleram desgaste do produto, barra e espaço.", "Anilhas convencionais também exigem manutenção. Superfícies metálicas precisam de ambiente seco e limpeza apropriada. Inserto, bordas, marcação e pegadas devem ser inspecionados. Suportes evitam peças soltas no piso e reduzem impacto durante armazenamento."),
      rich("mix", "5. Monte o mix de pesos", "Relacione quantidade ao número de barras, estações e usuários. Inclua pesos menores para progressão. Pesos médios e grandes devem refletir exercícios e nível do público. Comprar o mesmo número de todas as referências raramente é a solução mais eficiente.", "Distribuidores podem analisar giro histórico e combinar kits com unidades avulsas. Academias devem mapear pico de uso. Um inventário simples por estação ajuda a calcular quantidades e identificar reposições."),
      table("mix-tabela", "Lógica de composição", ["Necessidade", "Anilha recomendada", "Observação"], [
        ["Máquinas plate-loaded", "Convencional/olímpica compatível", "Verificar perfil e pegadas"],
        ["Barra em musculação", "Olímpica emborrachada ou metálica", "Evitar queda e confirmar furação"],
        ["Levantamento técnico", "Bumper de treino ou competição", "Usar plataforma adequada"],
        ["Progressão fina", "Anilhas menores compatíveis", "Planejar pares suficientes"],
        ["Marca própria", "Modelo com personalização viável", "Aprovar logo, cor e embalagem"]
      ]),
      rich("logistica", "6. Compare custo logístico, não só preço unitário", "Anilhas são densas. Peso por caixa, pallet e contêiner afeta frete, manuseio e armazenagem. Peça peso líquido, bruto, dimensões e quantidade por volume. Confirme se pallet e reforços estão incluídos.", "Em pedidos mistos, a melhor composição pode equilibrar anilhas pesadas com produtos volumosos. Essa decisão precisa do pedido completo. Tributos e despesas no Brasil devem ser calculados por profissionais com base na classificação e na operação real."),
      rich("oem", "7. Planeje OEM e marca própria", "Defina método de logo, cor, marcação em kg ou lb, embalagem e amostra. Verifique se personalização muda molde, ferramenta ou MOQ. Para linhas coloridas, aprove tonalidade e correspondência entre pesos.", "A embalagem deve comunicar compatibilidade e uso sem criar alegações não comprovadas. Registre código e versão para reposição. Se o produto for vendido em conjuntos, defina conteúdo de cada kit e tratamento de unidades substitutas."),
      checklist("checklist", "Checklist de decisão", ["Tipo de barra e diâmetro da manga", "Atividade e política de queda", "Piso ou plataforma disponível", "Peso, tolerância, diâmetro e espessura", "Quantidade por peso e estação", "Armazenamento e circulação", "Logo, kg/lb, cor e embalagem", "Peso logístico, pallet e destino"]),
      rich("experiencia", "Experiência de fábrica aplicada à compra", "Na PowerBaseFit, a cotação de anilhas precisa combinar especificação e carga. Alterar espessura, material ou mix muda produto e logística. Por isso, a equipe solicita pesos, unidades, uso, personalização e destino antes de confirmar MOQ e prazo.", "Uma decisão bem documentada permite comparar propostas e inspecionar o lote. Termos amplos como “anilha olímpica premium” devem ser substituídos por parâmetros do modelo e pela aprovação de amostra quando necessária.")
    ],
    faq: [
      ["Bumper plate é melhor do que anilha comum?", "Não em todos os casos. É melhor para levantamentos com piso apropriado; anilhas convencionais podem ser mais compactas e econômicas para musculação e máquinas."],
      ["Posso misturar anilhas comuns e bumper plates?", "Pode em determinadas rotinas, desde que barra, diâmetro, espessura, carga e regras de uso sejam compatíveis."],
      ["Toda anilha olímpica é bumper?", "Não. Olímpica indica compatibilidade com a barra. Existem anilhas olímpicas metálicas, emborrachadas, de PU e bumper."],
      ["Por que a espessura é importante?", "Ela determina quantas anilhas cabem na manga e, portanto, a carga total possível na barra."],
      ["Como calcular a quantidade por peso?", "Relacione número de barras, estações, usuários e exercícios. Inclua pesos menores para progressão e evite quantidades uniformes sem análise."]
    ],
    links: [["weight-plates-category", "Ver anilhas profissionais"], ["rubber-bumper-plate", "Anilha bumper"], ["rubber-olympic-plate", "Anilha olímpica emborrachada"], ["olympic-vs-standard-guide", "Olímpica ou padrão"], ["contact", "Solicitar cotação"]],
    author: ptBrEditorialAuthor,
    reviewedBy: ptBrTechnicalReviewer
  }
};
