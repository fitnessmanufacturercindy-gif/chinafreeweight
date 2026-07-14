import type { PilotPage } from "./pt-br-types";
import { checklist, definition, quick, rich, table } from "./pt-br-content-helpers";
import { ptBrEditorialAuthor, ptBrTechnicalReviewer } from "./pt-br-existing-growth";

const common = { author: ptBrEditorialAuthor, reviewedBy: ptBrTechnicalReviewer };

export const ptBrGrowthBlogsA: PilotPage[] = [
  {
    id: "import-guide", type: "blog", ptPath: "/pt/blog/como-importar-equipamentos-academia-china",
    title: "Como importar equipamentos de academia da China",
    description: "Guia B2B para importar equipamentos de academia da China: fornecedor, especificação, amostra, MOQ, QC, frete, documentos, custos e planejamento no Brasil.",
    h1: "Como importar equipamentos de academia da China para o Brasil",
    image: ["/assets/factory.png", "Equipamentos de academia preparados para importação da China"],
    blocks: [
      quick("resposta-rapida", "Importar equipamentos de academia da China exige definir a demanda, validar fornecedor e produto, fechar especificação e condição comercial, aprovar amostra quando necessário, acompanhar produção e QC, planejar embalagem e frete e cumprir as exigências aduaneiras brasileiras. Custos, tributos e licenças devem ser confirmados por profissionais da operação real."),
      definition("definicao", "Importação B2B de equipamentos de academia", "É uma operação comercial internacional em que uma empresa brasileira compra equipamentos de um fornecedor estrangeiro e coordena produção, pagamento, transporte, seguro quando aplicável, documentação, desembaraço, tributos e entrega. Não é equivalente a comprar uma unidade em uma loja internacional."),
      rich("escopo", "1. Defina o projeto antes de procurar preço", "Comece pelo modelo de negócio: academia própria, distribuição, revenda ou marca própria. Liste categorias, aplicação, faixa de pesos, quantidade e padrão em kg ou lb. Para uma academia, relacione produtos ao espaço e ao pico de usuários. Para um distribuidor, considere giro, reposição e posicionamento de cada linha.", "Sem uma lista, fornecedores podem cotar construções diferentes. Uma anilha “olímpica” pode ser metálica, emborrachada ou bumper. Um halter “de borracha” pode variar em formato, união e empunhadura. Descreva o modelo e peça que a proposta identifique imagem ou código."),
      table("etapas", "Etapas principais da importação", ["Etapa", "Responsável principal", "Resultado"], [
        ["Planejamento", "Comprador", "Lista, orçamento e objetivo"],
        ["Fornecedor", "Comprador e fábrica", "Capacidade e proposta comparável"],
        ["Especificação", "Comprador e fábrica", "Produto, logo e embalagem definidos"],
        ["Amostra", "Fábrica e comprador", "Referência aprovada"],
        ["Produção e QC", "Fábrica, comprador ou inspetor", "Lote verificado"],
        ["Logística", "Agente de cargas e partes", "Reserva, coleta e embarque"],
        ["Desembaraço", "Importador e despachante", "Carga nacionalizada conforme regras"],
        ["Entrega", "Operadores locais", "Produtos recebidos e conferidos"]
      ]),
      rich("habilitacao", "2. Confirme se a empresa pode importar", "Antes de assumir custos, converse com contador, despachante aduaneiro e agente de cargas sobre habilitação, estrutura da operação, classificação fiscal, licenças e documentos. As exigências dependem de produto, empresa, modalidade e data. Um artigo de fornecedor não substitui análise oficial.", "Defina também quem será o importador formal e quem pagará despesas no destino. Operações por conta própria, por encomenda ou com trading têm responsabilidades e custos diferentes. Registre a estrutura antes de comparar um preço FOB com uma oferta entregue."),
      rich("fornecedor", "3. Avalie fornecedor e produto", "Peça endereço, fluxo de produção, fotos atuais e especificação. Verifique se a fábrica trabalha com a categoria e o volume. Compare material, peso, dimensão, acabamento, logo, embalagem e prazo. Uma cotação curta pode esconder diferenças importantes.", "Use amostra quando aparência, ergonomia, compatibilidade ou marca própria forem relevantes. Meça, fotografe e documente a aprovação. Para pedidos de maior risco, considere inspeção de terceiros com escopo definido."),
      checklist("fornecedor-check", "Checklist do fornecedor", ["Empresa e endereço identificados", "Produto e código claramente definidos", "Materiais e medidas documentados", "MOQ e personalização explicados", "Amostra e alterações controladas", "Critérios de QC aceitos", "Embalagem e peso logístico informados", "Condição comercial e prazo claros"]),
      rich("incoterm", "4. Entenda o escopo do preço", "Condições comerciais distribuem custos e responsabilidades entre vendedor e comprador. Não escolha um Incoterm apenas pelo nome: confirme local indicado, transporte interno, despacho de exportação, frete principal, seguro, riscos e despesas no destino com profissionais responsáveis.", "Uma proposta deve indicar moeda, validade, pagamento, porto ou local, lead time e exclusões. Compare cenários no mesmo escopo. Um preço mais baixo pode transferir atividades que o comprador ainda terá de contratar."),
      rich("producao", "5. Controle produção, QC e mudanças", "Depois do depósito e das aprovações, mantenha uma versão única da especificação. Mudanças de logo, peso ou embalagem podem alterar prazo e custo. Combine atualizações de produção e data estimada de inspeção.", "O QC deve verificar critérios do produto. Para halteres: peso, união, superfície, empunhadura e marcação. Para anilhas: peso, furação, espessura, inserto e acabamento. Para racks: dimensão, solda, revestimento, montagem e componentes. Registre não conformidades antes da liberação."),
      table("documentos", "Documentos e informações a alinhar", ["Item", "Quem confirma", "Observação"], [
        ["Proforma e pedido", "Comprador e vendedor", "Modelo, quantidade, preço e condição"],
        ["Packing list", "Vendedor", "Volumes, pesos e conteúdo"],
        ["Commercial invoice", "Vendedor", "Dados da operação"],
        ["Conhecimento de transporte", "Transportador/agente", "Embarque e consignação"],
        ["Classificação e licenças", "Importador e profissionais", "Validar para o produto real"],
        ["Relatório de QC", "Parte definida", "Critérios e amostragem"],
        ["Outros documentos", "Partes responsáveis", "Conforme produto e operação"]
      ], "A lista é educativa e não substitui orientação aduaneira."),
      rich("frete", "6. Planeje embalagem, frete e contêiner", "Pesos livres são densos. Solicite peso líquido, bruto, dimensões, caixas e pallets. Racks ocupam mais volume e podem vir desmontados. Um pedido misto precisa distribuir massa sem danificar superfícies ou dificultar descarga.", "Compare carga completa e consolidada com o agente. Considere coleta, porto, frete, seguro, taxas, armazenagem, demurrage quando aplicável, desembaraço e entrega. Planeje descarga no destino; muitos serviços terminam antes de colocar o produto dentro da academia."),
      rich("custo", "7. Calcule o custo total", "O custo total inclui produto, personalização, amostra, inspeção, embalagem, transporte, seguro quando aplicável, despesas portuárias, tributos, despachante, armazenagem, entrega e contingência. Use dados atuais e classificação validada.", "Não aplique uma porcentagem genérica encontrada na internet. Duas operações com o mesmo produto podem ter estrutura, origem, rota e despesas diferentes. Mantenha uma planilha com fonte, data e responsável por cada premissa."),
      rich("recebimento", "8. Prepare recebimento e pós-compra", "Antes da chegada, organize espaço, equipe, equipamentos de movimentação e conferência. Compare volumes com packing list e registre danos aparentes. Separe produtos por peso e modelo para evitar erros de instalação ou estoque.", "Guarde especificação, arquivos, amostra e registros para reposição. Informe rapidamente divergências seguindo o procedimento comercial acordado. Um bom programa de importação inclui continuidade, não termina no primeiro contêiner."),
      rich("experiencia", "Experiência da PowerBaseFit", "Na PowerBaseFit, uma cotação de exportação melhora quando o comprador envia lista por modelo, quantidade por peso, logo, embalagem e destino. Isso permite analisar MOQ, produção e carga de maneira conectada. Pedidos padrão podem ter preparação mais rápida quando materiais e agenda estão confirmados; personalizações exigem validação específica.", "A fábrica pode apoiar especificação, amostra, QC e embalagem, mas o importador brasileiro continua responsável por validar regras, classificação e custos no destino com seus profissionais."),
      checklist("final", "Checklist antes do depósito", ["Empresa e estrutura de importação validadas", "Fornecedor e produto avaliados", "Especificação e versão consolidadas", "Amostra aprovada quando necessária", "Preço, Incoterm, pagamento e prazo claros", "Plano de QC definido", "Embalagem e dados logísticos confirmados", "Custo total revisado", "Responsáveis por documentos e desembaraço definidos"])
    ],
    faq: [["Preciso ter empresa para importar equipamentos de academia?", "Uma operação comercial exige estrutura empresarial e aduaneira adequada. Confirme habilitação e modalidade com contador e despachante."], ["Quanto tempo demora?", "Depende de amostra, materiais, produção, reserva, rota, porto e desembaraço. Monte um cronograma por etapa, não use um prazo universal."], ["Qual é o pedido mínimo?", "O MOQ varia por produto e personalização. A fábrica confirma após revisar a lista."], ["É seguro comprar direto da China?", "O risco pode ser reduzido com diligência, contrato, especificação, amostra, QC e logística profissional; não existe garantia automática."], ["Quem calcula impostos?", "O importador deve trabalhar com profissionais responsáveis usando classificação e dados atuais da operação."]],
    links: [["factory-guide", "Avaliar uma fábrica"], ["import-cost-guide", "Calcular custo de importação"], ["moq-guide", "Entender MOQ"], ["oem-private-label", "Planejar OEM"], ["products-hub", "Ver produtos"], ["contact", "Enviar lista para cotação"]],
    ...common
  },
  {
    id: "import-cost-guide", type: "blog", ptPath: "/pt/blog/custo-importacao-equipamentos-academia",
    title: "Custo de importação de equipamentos de academia",
    description: "Aprenda a estruturar o custo total de importar equipamentos de academia: produto, OEM, inspeção, embalagem, frete, tributos, porto, entrega e contingência.",
    h1: "Como calcular o custo total da importação de equipamentos",
    image: ["/assets/project-plate-zone.png", "Halteres e anilhas considerados no custo de importação"],
    blocks: [
      quick("resposta-rapida", "O custo de importação não é apenas preço de fábrica mais frete. Some produto, personalização, amostra, QC, embalagem, transporte na origem, frete internacional, seguro quando aplicável, despesas portuárias, tributos, despachante, armazenagem, entrega e contingência. Classificação, alíquotas e regras devem ser validadas para a operação real."),
      definition("definicao", "Custo posto ou landed cost", "É o custo acumulado para disponibilizar o produto no local definido pelo comprador, incluindo aquisição e despesas necessárias até esse ponto. O limite precisa ser escrito: porto, armazém, centro de distribuição ou academia. Sem esse limite, duas planilhas podem parecer diferentes mesmo contendo custos corretos."),
      rich("escopo", "1. Defina o ponto final do cálculo", "Decida se o custo será calculado até o embarque, porto brasileiro, armazém ou instalação. Inclua moeda e data de câmbio utilizada. Separe valores confirmados de estimativas e registre a fonte.", "Para comparar fornecedores, use a mesma condição comercial e o mesmo destino. Uma oferta FOB não é diretamente comparável a outra com frete incluído. Também verifique se pallet, embalagem especial, documentação ou carregamento aparecem no preço."),
      table("componentes", "Componentes do custo total", ["Grupo", "Exemplos", "Fonte"], [
        ["Produto", "Modelos, pesos, quantidades", "Proposta da fábrica"],
        ["Desenvolvimento", "Amostra, molde, arte, embalagem", "Fornecedor"],
        ["Qualidade", "Inspeção, teste ou retrabalho", "Fornecedor/inspetor"],
        ["Origem", "Coleta, documentos e terminal", "Agente de cargas"],
        ["Frete", "Marítimo, aéreo e seguro", "Agente/seguradora"],
        ["Brasil", "Tributos e despesas aduaneiras", "Despachante/contador"],
        ["Destino", "Entrega, descarga e armazenagem", "Operadores locais"],
        ["Risco", "Câmbio, atraso e contingência", "Política do comprador"]
      ]),
      rich("produto", "2. Estruture o custo de produto", "Quebre a proposta por modelo e peso. Em halteres e anilhas, quantidade e peso líquido ajudam a distribuir frete. Em racks e bancos, volume pode ser mais relevante. Separe ferramenta e amostra, pois não devem ser rateadas da mesma forma em todas as compras.", "Personalização pode alterar custo unitário e mínimo. Embalagem impressa, cores especiais ou logo por método específico devem aparecer separadamente quando possível. Isso facilita simular uma versão padrão e uma versão de marca própria."),
      rich("frete", "3. Calcule logística por peso e volume", "Solicite dimensões, peso bruto, número de caixas e pallets. Compare peso taxável e volume com o agente. Um pedido de anilhas pode atingir limite de massa antes de preencher o contêiner; racks podem ocupar espaço com menor densidade. Misturar categorias pode melhorar a composição.", "Inclua coleta, terminal, frete, seguro quando aplicável e despesas de destino. Pergunte validade da tarifa e itens sujeitos a variação. Planeje descarga: equipamentos pesados podem exigir empilhadeira, equipe ou agendamento especial."),
      table("rateio", "Formas de ratear custos", ["Método", "Quando usar", "Cuidado"], [
        ["Por peso", "Anilhas e halteres", "Pode distorcer produtos volumosos"],
        ["Por volume", "Racks e embalagens grandes", "Pode distorcer itens densos"],
        ["Por valor", "Seguro ou despesas proporcionais", "Nem toda taxa segue valor"],
        ["Por unidade", "Taxas fixas de conjunto", "Ignora diferenças de peso"],
        ["Misto", "Pedidos com várias famílias", "Documentar regra por componente"]
      ]),
      rich("tributos", "4. Valide tributos e exigências", "Classificação fiscal, base de cálculo, alíquotas, benefícios, licenças e regras mudam conforme produto, empresa, estado, operação e data. Não use uma porcentagem universal. Trabalhe com despachante, contador e fontes oficiais.", "Se a especificação mudar, reavalie classificação. Material, função e construção podem influenciar. Registre a descrição técnica usada na análise e não deixe essa discussão para depois do embarque."),
      rich("cambio", "5. Inclua câmbio e cronograma de pagamento", "Importações podem ter depósito e saldo em datas diferentes. Registre taxa usada em cada cenário e inclua custos bancários. Uma margem de segurança deve refletir a política da empresa, não uma previsão apresentada como certeza.", "O cronograma também afeta capital de giro. Considere tempo entre depósito, produção, trânsito, desembaraço e venda ou abertura da academia. Custo financeiro pode ser relevante mesmo quando não aparece na invoice."),
      rich("qualidade", "6. Não corte custos de prevenção sem analisar risco", "Amostra, inspeção e embalagem parecem despesas adicionais, mas podem reduzir risco de um lote incompatível ou danificado. Compare o custo de prevenção ao impacto de retrabalho, devolução, armazenagem ou perda de lançamento.", "Defina inspeção de acordo com complexidade e histórico. Não inclua certificações ou testes que não sejam aplicáveis; também não omita verificações críticas apenas para reduzir a planilha."),
      table("exemplo", "Modelo de planilha", ["Linha", "Status", "Como preencher"], [
        ["Preço dos produtos", "Confirmado", "Valor por item e total"],
        ["OEM/amostra", "Confirmado ou estimado", "Separar custo não recorrente"],
        ["Embalagem/QC", "Confirmado", "Escopo e quantidade"],
        ["Frete e origem", "Cotação com validade", "Rota, equipamento e data"],
        ["Tributos/despesas", "Revisão profissional", "Base, fonte e responsável"],
        ["Entrega", "Cotação local", "Destino e descarga"],
        ["Contingência", "Política interna", "Justificativa e limite"]
      ]),
      rich("unitario", "7. Calcule custo por SKU e por projeto", "Depois de consolidar o total, distribua custos com regra documentada. Para halteres, o custo por kg pode ajudar a comparar, mas não substitui custo por unidade e por par. Para uma academia, avalie custo por área instalada; para distribuição, custo por SKU e margem.", "Faça cenários: pedido mínimo, pedido otimizado e pedido com personalização. Isso mostra quais custos fixos são diluídos e se a economia compensa o estoque adicional."),
      rich("experiencia", "Experiência da PowerBaseFit", "A fábrica pode fornecer preço, dados de embalagem, peso, volume e opções OEM do pedido. Esses dados alimentam a planilha, mas despesas brasileiras precisam vir dos profissionais do importador. Uma lista completa melhora a estimativa do contêiner e evita ratear frete sobre quantidades provisórias.", "Não trate lead time de fábrica e trânsito como um único número. Separar etapas ajuda a medir capital de giro e atualizar premissas quando uma data muda."),
      checklist("checklist", "Checklist do cálculo", ["Ponto final e moeda definidos", "Produto e condição comercial comparáveis", "Peso, volume, caixas e pallets confirmados", "OEM, amostra, QC e embalagem incluídos", "Frete e taxas com data de validade", "Classificação e tributos validados", "Entrega e descarga incluídas", "Câmbio, capital e contingência documentados", "Rateio por SKU revisado"])
    ],
    faq: [["Qual porcentagem usar para impostos?", "Não existe porcentagem universal segura. Classificação, operação e data devem ser validadas por profissionais."], ["Frete é calculado por peso ou volume?", "Depende do modal e da carga. O agente usa regras aplicáveis; pedidos mistos podem exigir rateio combinado."], ["Amostra entra no custo unitário?", "Pode ser tratada como desenvolvimento e rateada conforme a política do projeto, mantendo-a identificada como custo não recorrente."], ["Como comparar FOB e CIF?", "Converta ambos para o mesmo ponto final e confirme exatamente quais custos e riscos estão incluídos."], ["Preço de fábrica mais baixo significa custo final menor?", "Não necessariamente. Embalagem, ocupação, QC, frete e despesas podem mudar o resultado."]],
    links: [["import-guide", "Guia de importação"], ["moq-guide", "MOQ e quantidade"], ["products-hub", "Produtos para cotação"], ["factory", "Dados de fábrica e embalagem"], ["contact", "Solicitar dados comerciais"]],
    ...common
  },
  {
    id: "moq-guide", type: "blog", ptPath: "/pt/blog/moq-equipamentos-fitness",
    title: "MOQ de equipamentos fitness: como funciona",
    description: "Entenda o MOQ de halteres, anilhas e equipamentos fitness: fatores de produção, personalização, embalagem, mix de pesos e como negociar um pedido B2B viável.",
    h1: "Como funciona o MOQ em pedidos de equipamentos fitness",
    image: ["/assets/products/dumbbells/catalog-v2/hex-dumbbell-kg.jpg", "Lote de halteres considerado no cálculo de MOQ"],
    blocks: [
      quick("resposta-rapida", "MOQ é a quantidade mínima que torna uma configuração de produção comercialmente viável. Em equipamentos fitness, ele pode ser definido por modelo, peso, cor, valor, lote de material ou embalagem. Não existe um número único para todo o catálogo; personalização, mix e processo alteram o mínimo."),
      definition("definicao", "MOQ — Minimum Order Quantity", "É a menor quantidade que o fornecedor aceita produzir ou vender sob determinadas condições. O MOQ pertence a uma configuração: produto, material, cor, logo, embalagem, prazo e combinação. Se uma dessas variáveis muda, o mínimo também pode mudar."),
      rich("por-que", "Por que existe MOQ", "Produção envolve preparação, materiais, configuração de máquinas, ferramentas, impressão, inspeção e embalagem. Esses custos não crescem na mesma proporção que unidades. Um lote muito pequeno pode consumir quase o mesmo tempo de preparação que um lote maior.", "Em pesos livres, a faixa também importa. Dez unidades de um único peso são diferentes de dez unidades distribuídas em vinte referências. Cada marcação, caixa e separação adiciona complexidade. Por isso, pergunte se o mínimo é por SKU, por peso ou pelo conjunto."),
      table("fatores", "Fatores que alteram MOQ", ["Fator", "Como influencia", "Pergunta"], [
        ["Produto", "Processos e materiais diferentes", "O mínimo é por modelo?"],
        ["Faixa de pesos", "Aumenta SKUs e marcações", "Há mínimo por peso?"],
        ["Cor", "Pode exigir lote de material", "Cores podem ser combinadas?"],
        ["Logo", "Método tem preparação própria", "É relevo, impressão ou placa?"],
        ["Embalagem", "Impressão pode ter mínimo", "Caixa neutra é opção?"],
        ["Ferramenta", "Mudança técnica requer investimento", "Há molde ou ferramenta nova?"],
        ["Pedido misto", "Pode diluir logística, não todo processo", "Quais categorias podem combinar?"]
      ]),
      rich("halteres", "MOQ em halteres", "Uma linha de halteres contém vários pesos. A fábrica pode exigir quantidade mínima por peso, por modelo ou valor total. Logo e marcação devem funcionar em cabeças de tamanhos diferentes. Se o comprador pedir poucos pares de muitos pesos, a preparação e a separação aumentam.", "Uma alternativa é priorizar a faixa de maior giro, usar acabamento padrão e embalagem neutra no primeiro pedido. Entretanto, reduzir variedade demais pode prejudicar a proposta comercial. A decisão deve equilibrar teste de mercado e linha coerente."),
      rich("anilhas", "MOQ em anilhas", "Anilhas também têm pesos, cores e construções diferentes. Bumper colorida pode depender de material por cor; anilha com logo em relevo pode exigir ferramenta; embalagem impressa pode ter mínimo próprio. Um conjunto não elimina automaticamente esses mínimos.", "Defina quais pesos são essenciais e quais podem ser adicionados depois. Para academias, use número de barras e estações. Para distribuidores, use dados de procura e reposição."),
      rich("oem", "Como personalização muda o mínimo", "Logo simples em um método existente geralmente exige menos desenvolvimento que alteração de molde. Uma cor personalizada pode exigir lote de matéria-prima. Embalagem impressa pode ter MOQ diferente do produto. Pergunte separadamente.", "Se o objetivo é validar mercado, compare três cenários: produto padrão, logo em método existente e desenvolvimento completo. Isso mostra o custo real da identidade e evita pressionar o fornecedor por um mínimo incompatível com o processo."),
      table("cenarios", "Cenários para um primeiro pedido", ["Cenário", "Vantagem", "Limitação"], [
        ["Produto padrão", "Menor complexidade e prazo", "Menor diferenciação"],
        ["Logo + embalagem neutra", "Marca no produto com logística simples", "Apresentação de varejo limitada"],
        ["Logo + caixa personalizada", "Linha mais completa", "Dois MOQs precisam ser coordenados"],
        ["Produto exclusivo", "Maior diferenciação", "Ferramenta, amostra, custo e prazo maiores"],
        ["Pedido misto", "Melhor uso da carga", "Não elimina mínimos de processo"]
      ]),
      rich("negociar", "Como negociar sem criar risco", "Negociação de MOQ não é apenas pedir um número menor. Ofereça opções: reduzir cores, usar caixa neutra, concentrar pesos, aceitar produção junto a um lote ou aumentar valor total. Pergunte quais mudanças tornam o projeto viável.", "Não aceite que um mínimo menor resulte em material, tolerância ou QC indefinidos. O produto deve manter a especificação. Se houver custo adicional de setup, compare com o custo de estoque do lote maior."),
      rich("economia", "Compare MOQ com demanda e capital", "Um MOQ aparentemente barato pode gerar estoque lento. Calcule meses de venda, espaço, capital e reposição. Para academia, compare quantidade mínima com necessidade real. Para distribuição, simule margem e giro por SKU.", "Inclua frete. Pedidos pequenos de produtos pesados podem ter custo logístico alto; um pedido maior pode diluir despesas, mas aumenta exposição. A resposta correta vem de cenários, não de uma regra universal."),
      rich("experiencia", "Como a PowerBaseFit confirma MOQ", "A PowerBaseFit solicita modelo, faixa de pesos, unidades, logo, cor, embalagem e destino. Com essa lista, a equipe avalia o mínimo praticável. O número pode ser diferente entre halter sextavado, PU, bumper e rack porque os processos não são iguais.", "A confirmação deve aparecer na proposta aplicável ao pedido. Uma conversa anterior sobre outro modelo não deve ser usada como garantia."),
      checklist("checklist", "Checklist para discutir MOQ", ["Modelo e código", "Pesos e quantidades por SKU", "Material e cor", "Logo e método", "Embalagem neutra ou impressa", "Amostra e ferramenta", "Valor e frequência de reposição", "Combinação com outros produtos", "Destino e plano logístico"])
    ],
    faq: [["MOQ é por produto ou por pedido?", "Pode ser por modelo, SKU, cor, material, embalagem ou valor. Confirme a regra da configuração."], ["Posso misturar pesos?", "Muitas linhas permitem mix, mas pode existir mínimo por peso ou marcação."], ["Logo aumenta MOQ?", "Pode aumentar, dependendo do método e da preparação."], ["Pedido misto elimina MOQ?", "Não necessariamente. Ele ajuda logística e valor total, mas processos mantêm mínimos próprios."], ["Como reduzir o MOQ?", "Considere produto padrão, menos cores, embalagem neutra, faixa concentrada ou custo de setup, sem reduzir especificação."]],
    links: [["oem-private-label", "OEM e marca própria"], ["private-label-guide", "Planejar marca própria"], ["dumbbells-category", "Halteres"], ["weight-plates-category", "Anilhas"], ["contact", "Enviar composição do pedido"]],
    ...common
  },
  {
    id: "oem-vs-odm-guide", type: "blog", ptPath: "/pt/blog/oem-vs-odm-equipamentos-fitness",
    title: "OEM vs. ODM em equipamentos fitness",
    description: "Compare OEM e ODM para equipamentos fitness: produto base, personalização, desenvolvimento, propriedade de arquivos, amostra, MOQ, prazo, QC e riscos B2B.",
    h1: "Qual a diferença entre OEM e ODM em equipamentos fitness?",
    image: ["/assets/factory-process/dumbbell-cutting.jpg", "Processo OEM de equipamentos fitness"],
    blocks: [
      quick("resposta-rapida", "Em OEM, a fábrica produz conforme produto e especificação definidos ou aprovados pelo comprador, frequentemente com logo e embalagem. Em ODM, o fornecedor participa mais do desenvolvimento e oferece uma base de design ou solução adaptável. Os termos não substituem um contrato: arquivos, ferramentas, exclusividade, responsabilidade e critérios de qualidade precisam ser escritos."),
      definition("definicao", "OEM e ODM", "OEM significa Original Equipment Manufacturer e descreve fabricação para outra marca. ODM significa Original Design Manufacturer e normalmente envolve design ou desenvolvimento originado pelo fornecedor. Na prática, projetos podem ficar entre os dois modelos, por isso o escopo real é mais importante que a sigla."),
      table("comparacao", "OEM vs. ODM", ["Critério", "OEM", "ODM"], [
        ["Produto inicial", "Definido ou selecionado pelo comprador", "Base de design do fornecedor"],
        ["Personalização", "Logo, cor, especificação e embalagem", "Adaptação de design e identidade"],
        ["Desenvolvimento", "Pode ser baixo ou alto", "Normalmente maior participação do fornecedor"],
        ["Arquivos", "Definir origem e controle", "Definir licença e acesso"],
        ["Ferramentas", "Responsabilidade contratada", "Pode pertencer ao fornecedor ou ao projeto"],
        ["Prazo", "Menor em produto existente", "Pode incluir desenvolvimento e testes"],
        ["Risco", "Especificação incompleta", "Dependência e direitos mal definidos"]
      ]),
      rich("oem", "Quando OEM faz sentido", "OEM é adequado quando o comprador conhece o produto, o mercado e as alterações desejadas. Uma marca de halteres pode selecionar um modelo existente, definir faixa, logo, cores, marcação e caixa. Uma academia pode personalizar equipamentos para identidade visual sem criar uma construção nova.", "A vantagem é aproveitar processos existentes. Ainda assim, o comprador deve validar o produto base. Colocar logo em um modelo inadequado não cria qualidade. Amostra e QC devem cobrir tanto o produto quanto a personalização."),
      rich("odm", "Quando ODM pode fazer sentido", "ODM pode ajudar quando o comprador tem um problema de mercado, mas não um projeto detalhado. O fornecedor apresenta soluções existentes ou adaptações. Isso pode reduzir desenvolvimento em comparação com começar do zero, mas exige clareza sobre o que pode ser alterado e quem pode vender o design.", "Pergunte se o modelo já é comercializado para outras marcas, se existe exclusividade, quem controla desenhos e ferramentas e quais testes sustentam as alegações. Não assuma exclusividade apenas porque o logo é diferente."),
      rich("hibrido", "Projetos híbridos são comuns", "Muitos pedidos começam com produto do fornecedor e recebem alterações do comprador. Isso pode ser chamado OEM por uma parte e ODM por outra. Em vez de discutir rótulo, liste responsabilidades: quem fornece requisitos, quem cria desenho, quem aprova material, quem paga ferramenta, quem testa e quem pode reutilizar o resultado.", "Use uma matriz de responsabilidades e datas. Isso evita que etapas importantes fiquem entre vendas, design e produção."),
      table("responsabilidades", "Matriz de responsabilidades", ["Tema", "Pergunta obrigatória", "Registro"], [
        ["Requisitos", "Quem define uso, medidas e desempenho?", "Briefing/especificação"],
        ["Design", "Quem cria e aprova desenhos?", "Versão aprovada"],
        ["Ferramenta", "Quem paga e quem é proprietário?", "Termo comercial"],
        ["Amostra", "Quem mede e aprova?", "Relatório de aprovação"],
        ["QC", "Quais critérios e amostragem?", "Plano de inspeção"],
        ["Direitos", "Há exclusividade ou licença?", "Contrato"],
        ["Mudanças", "Quem pode autorizar?", "Controle de versão"]
      ]),
      rich("custo", "Custo, MOQ e prazo", "Produto existente com logo normalmente tem menor complexidade que mudança estrutural. Ferramenta, molde, protótipo e teste acrescentam custo e prazo. ODM não é automaticamente mais barato; ele pode economizar esforço de design, mas aumentar dependência do fornecedor.", "Peça cronograma por etapa: briefing, desenho, amostra, revisão, ferramenta, lote piloto e produção. Confirme se MOQ se aplica ao produto, cor, ferramenta ou embalagem."),
      rich("qualidade", "Qualidade e validação", "Em ambos os modelos, qualidade precisa de critérios. Uma responsabilidade de design não elimina inspeção de material, peso, dimensão, superfície, montagem e embalagem. Para mudanças técnicas, defina como o desempenho será verificado e quem aprova o método.", "Evite alegações como “nível profissional” sem métrica. Use especificações do produto real e mantenha evidências. Se o mercado exige certificação, confirme escopo com especialistas e organismos aplicáveis."),
      rich("propriedade", "Arquivos, ferramentas e exclusividade", "Registre quem possui arquivos, moldes, ferramentas, amostras e arte. Defina armazenamento, manutenção, vida útil e possibilidade de transferência. Se houver exclusividade, determine produto, território, prazo, metas e exceções.", "Um pagamento de ferramenta não garante automaticamente todos os direitos. Esse tema exige contrato e, quando relevante, orientação jurídica."),
      rich("escolha", "Como escolher entre OEM e ODM", "Escolha OEM quando requisitos e produto estão claros e a prioridade é executar uma linha sob sua marca. Considere ODM quando precisa de uma base de design e aceita trabalhar dentro da plataforma do fornecedor. Use desenvolvimento próprio quando a diferenciação e o controle justificarem investimento maior.", "Comece com o menor escopo que resolve o problema. Uma marca nova pode validar mercado com OEM visual antes de investir em alterações estruturais."),
      rich("experiencia", "Aplicação na PowerBaseFit", "A PowerBaseFit pode avaliar personalização de produtos existentes e projetos que exigem mais desenvolvimento. A equipe distingue logo, cor e embalagem de mudanças de molde ou construção. MOQ e prazo são confirmados depois dessa classificação.", "O comprador deve enviar mercado, objetivo, produto, quantidade, arquivos e requisitos. A resposta comercial deve indicar o que já existe, o que precisa de amostra e o que ainda depende de avaliação."),
      checklist("checklist", "Checklist OEM/ODM", ["Objetivo e mercado definidos", "Produto base identificado", "Alterações visuais e técnicas separadas", "Arquivos e propriedade registrados", "Ferramenta e exclusividade discutidas", "Amostra e testes definidos", "MOQ, custo e cronograma por etapa", "QC e controle de mudanças", "Embalagem e responsabilidades legais"])
    ],
    faq: [["OEM e marca própria são a mesma coisa?", "Marca própria é a estratégia de vender sob sua marca; OEM é uma forma de fabricar essa linha."], ["ODM significa produto exclusivo?", "Não. Exclusividade depende de contrato, design, território e condições."], ["Quem é dono do molde?", "Depende do acordo. Pagamento, propriedade, armazenamento e uso precisam ser registrados."], ["Qual modelo tem menor MOQ?", "Produto existente com personalização visual tende a ser mais simples, mas o mínimo depende do processo."], ["Preciso de amostra?", "É recomendável quando produto, logo, cor, embalagem ou mudança técnica influenciam o risco."]],
    links: [["oem-private-label", "Programa OEM"], ["private-label-guide", "Criar marca própria"], ["moq-guide", "Entender MOQ"], ["factory-guide", "Avaliar fábrica"], ["contact", "Enviar briefing"]],
    ...common
  },
  {
    id: "private-label-guide", type: "blog", ptPath: "/pt/blog/como-criar-marca-propria-equipamentos-academia",
    title: "Como criar uma marca própria de equipamentos fitness",
    description: "Guia para lançar equipamentos de academia com marca própria: posicionamento, linha inicial, fornecedor, logo, embalagem, amostra, MOQ, QC, importação e reposição.",
    h1: "Como criar uma marca própria de equipamentos de academia",
    image: ["/assets/products/dumbbells/chrome/chrome-dumbbell-custom-logo.jpg", "Halter personalizado para marca própria de equipamentos fitness"],
    blocks: [
      quick("resposta-rapida", "Para criar uma marca própria de equipamentos fitness, defina comprador e posicionamento, escolha uma linha inicial coerente, valide produto e fornecedor, desenvolva identidade aplicável aos equipamentos, aprove amostra e embalagem, controle produção e QC, planeje importação, estoque e reposição. Começar com poucos SKUs bem definidos reduz risco."),
      definition("definicao", "Marca própria de equipamentos fitness", "É uma linha de produtos fabricada por um fornecedor e comercializada sob a identidade do comprador. A marca é responsável por posicionamento, especificação comercial, comunicação, conformidade no mercado, experiência do cliente e continuidade, mesmo quando não opera a fábrica."),
      rich("posicionamento", "1. Defina público e proposta", "Escolha quem compra: academias, hotéis, estúdios, lojas, distribuidores ou consumidor final. Cada grupo valoriza faixa, embalagem, prazo, assistência e preço de forma diferente. Uma marca que tenta servir todos desde o primeiro lote tende a criar catálogo amplo e estoque difícil.", "Escreva uma proposta simples: categoria, nível de acabamento, diferencial verificável e canal. Evite alegações vagas. “Linha de halteres com faixa completa, marcação legível e reposição planejada” é mais útil que “qualidade incomparável”."),
      table("linha", "Exemplo de linha inicial", ["Produto", "Papel no portfólio", "Decisões"], [
        ["Halter sextavado", "Modelo versátil e conhecido", "Faixa, borracha, empunhadura e logo"],
        ["Halter redondo/PU", "Linha premium", "Material, rack, acabamento e embalagem"],
        ["Anilha olímpica", "Base de musculação", "Furação, pesos, pegadas e marcação"],
        ["Bumper plate", "Treino funcional e levantamento", "Espessura, dureza, cor e piso"],
        ["Rack", "Organização e venda complementar", "Capacidade, dimensões e montagem"]
      ]),
      rich("mix", "2. Escolha um mix que possa ser mantido", "Use dados de procura, entrevistas e canal para selecionar SKUs. Defina faixa e quantidade. Pense em reposição: se um par ou peso se perde, o modelo continuará disponível e identificável? Registre código, versão e fornecedor.", "Não crie variações de cor ou embalagem sem demanda. Cada variação adiciona MOQ e estoque. Um primeiro lote pode usar embalagem neutra bem identificada e concentrar identidade no produto, se isso fizer sentido para o canal."),
      rich("fornecedor", "3. Selecione fornecedor e valide produto", "Avalie capacidade, especificação, amostra, QC e embalagem. Pergunte quais personalizações são rotineiras e quais exigem ferramenta. Compare produtos reais e não apenas fotos.", "Uma marca própria assume o impacto de falhas perante o cliente. Por isso, mantenha critérios e inspeção. Se a fábrica não consegue documentar o modelo, reposição e consistência serão difíceis."),
      rich("identidade", "4. Adapte a identidade ao produto", "Logo precisa funcionar em superfícies pequenas, curvas, borracha, PU, metal e embalagem. Crie versões simples e com contraste. Defina cores com referências e aceite variações realistas do processo quando apropriado.", "Não copie a mesma arte em todos os pesos sem testar. Aprove posição e proporção. Inclua marcação em kg ou lb de forma clara. Informações regulatórias devem ser revisadas para o mercado."),
      table("personalizacao", "Métodos de personalização", ["Elemento", "Possibilidades", "Verificação"], [
        ["Logo", "Relevo, impressão, placa ou etiqueta", "Durabilidade, área e contraste"],
        ["Cor", "Produto, detalhe ou marcação", "Amostra e consistência"],
        ["Peso", "kg, lb ou versões separadas", "Legibilidade e mercado"],
        ["Embalagem", "Neutra, etiqueta ou impressão", "MOQ, resistência e conteúdo"],
        ["Manual", "Montagem, cuidado e uso", "Idioma e responsabilidade"]
      ]),
      rich("amostra", "5. Aprove amostra e embalagem", "Crie checklist: produto, peso, dimensão, superfície, logo, cor, marcação e embalagem. Fotografe e registre versão. Para uma linha, avalie pesos representativos. Teste como a peça encaixa no rack e como a embalagem suporta manuseio.", "Amostra bonita não prova consistência. Use-a como referência do lote e combine inspeção. Se houver alteração, atualize o registro antes de liberar produção."),
      rich("custo", "6. Calcule MOQ e custo total", "Separe produto, personalização, ferramenta, amostra, QC, embalagem, frete, tributos e despesas. Compare cenários padrão, OEM visual e desenvolvimento. Avalie estoque, margem e capital de giro.", "MOQ precisa ser compatível com demanda, mas também com uma linha vendável. Reduzir unidades de forma desorganizada pode deixar buracos de peso ou kits incompletos. Negocie processo, não apenas quantidade."),
      rich("qualidade", "7. Defina qualidade e responsabilidade", "Especifique materiais, peso, tolerância, dimensão, superfície, montagem, marcação e embalagem. Determine quem inspeciona e como não conformidades são tratadas. Guarde relatórios e lotes para rastreabilidade.", "Crie instruções de manutenção e atendimento baseadas no produto real. Não prometa garantias ou certificações sem política, cobertura e evidência."),
      rich("lancamento", "8. Planeje lançamento e reposição", "Prepare fotos reais, páginas de produto, FAQs e materiais para distribuidores. Deixe claro para quem o produto serve, o que está incluído e quais especificações são confirmadas. Use conteúdo educativo para reduzir perguntas e devoluções.", "Mantenha estoque de reposição ou prazo transparente. Registre feedback de uso e diferencie problema de produto, transporte, instalação ou manutenção. Esses dados orientam o próximo lote."),
      rich("experiencia", "Experiência da PowerBaseFit", "A PowerBaseFit avalia logo, cor, kg/lb e embalagem conforme o modelo. A equipe solicita lista e mercado para confirmar MOQ e amostra. Halteres e anilhas exigem planejamento de caixas e carga desde o começo.", "Projetos com melhor andamento têm um responsável por aprovação, arquivos versionados e critérios de QC. A fábrica não deve inventar certificações, clientes ou desempenho para preencher a comunicação da marca."),
      checklist("checklist", "Checklist de lançamento", ["ICP e canal definidos", "Linha e SKUs priorizados", "Fornecedor e produto validados", "Logo, cor e marcação aprovados", "Embalagem resistente e correta", "Amostra e QC documentados", "MOQ, custo e margem calculados", "Importação e estoque planejados", "Conteúdo, atendimento e reposição preparados"])
    ],
    faq: [["Preciso desenvolver um produto exclusivo?", "Não. Muitas marcas começam com produto existente e personalização visual, validando mercado antes de investir em ferramentas."], ["Qual categoria escolher primeiro?", "Escolha pela demanda e capacidade de manter estoque. Halteres e anilhas são opções comuns, mas exigem planejamento por peso."], ["Marca própria exige embalagem impressa?", "Não necessariamente. Etiqueta ou caixa neutra bem definida pode reduzir complexidade no primeiro lote."], ["Como proteger minha marca?", "Registre marca e contratos com orientação jurídica adequada; fabricação e propriedade intelectual são temas separados."], ["Como garantir reposição?", "Registre modelo, versão, especificação, arquivos e processo do fornecedor, mantendo previsão de estoque e prazo."]],
    links: [["oem-private-label", "Fabricação OEM"], ["oem-vs-odm-guide", "OEM vs. ODM"], ["moq-guide", "MOQ"], ["products-hub", "Escolher produtos"], ["contact", "Enviar briefing de marca própria"]],
    ...common
  }
];
