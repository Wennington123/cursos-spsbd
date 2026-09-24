export const curso1 = {
  id: "curso-1",
  slug: "fundamentos",
  title: "Fundamentos do SPSBD-GC",
  subtitle: "SUAS, Proteção Social Básica e o Serviço no Domicílio",
  audience: "Educadores(as) Sociais e Técnicos(as) de Referência",
  workload: "~4h",
  units: [
    {
      id: "1.1",
      slug: "o-suas-e-as-segurancas-socioassistenciais",
      title: "O SUAS e as seguranças socioassistenciais",
      objectives: [
        "Situar a Assistência Social como política pública de direito.",
        "Explicar o SUAS como sistema descentralizado e participativo.",
        "Reconhecer as cinco seguranças socioassistenciais.",
      ],
      contentHtml: `
<h3>A Assistência Social como direito</h3>
<p>A Assistência Social foi reconhecida como política pública de direito pela Constituição Federal de 1988,
que atribuiu ao Estado a responsabilidade principal por sua condução. Junto com a Saúde e a Previdência Social,
ela compõe a Seguridade Social brasileira.</p>
<p>Para organizá-la, surgiram marcos legais como a Lei Orgânica da Assistência Social (LOAS, 1993) e a
Política Nacional de Assistência Social (PNAS, 2004), que reafirmam a Assistência Social como direito do
cidadão e dever do Estado, realizada de forma integrada às demais políticas setoriais.</p>

<h3>O SUAS: como a política se organiza na prática</h3>
<p>O Sistema Único da Assistência Social (SUAS) é a operacionalização dessa política. Ele é:</p>
<ul>
  <li><strong>descentralizado</strong> — com divisão de responsabilidades entre as esferas federal, estadual e municipal;</li>
  <li><strong>participativo</strong> — envolvendo o Estado, a sociedade civil e os próprios usuários.</li>
</ul>
<p>Os serviços socioassistenciais se organizam em dois níveis de complexidade:
<strong>Proteção Social Básica</strong> e <strong>Proteção Social Especial</strong> (de média e alta complexidade).</p>

<h3>As cinco seguranças socioassistenciais</h3>
<p>As seguranças demarcam o campo protetivo do SUAS e orientam os resultados esperados:</p>
<ul>
  <li><strong>Acolhida</strong> — escuta qualificada e compreensão das reais necessidades das famílias, sem preconceitos ou pré-julgamentos.</li>
  <li><strong>Renda</strong> — garantia de renda transferida, com atenção à inserção das famílias elegíveis em programas como Bolsa Família e BPC.</li>
  <li><strong>Convívio familiar e comunitário</strong> — foco relacional: recuperação e fortalecimento das relações familiares, comunitárias e sociais.</li>
  <li><strong>Autonomia</strong> — desenvolvimento de capacidades para o exercício do protagonismo e da cidadania, enfrentando a subalternidade e o assistencialismo.</li>
  <li><strong>Apoio e auxílio</strong> — caráter excepcional e provisório, com provisões em situações de vulnerabilidade temporária e calamidade (ex.: auxílio natalidade e mortalidade).</li>
</ul>

<figure class="media">
  <img src="{{media}}/curso-1/segurancas.png" alt="Cinco círculos ilustrados: um ouvido com ondas sonoras e pessoas em volta (acolhida); cédula e moeda com pessoas trabalhando (renda); pessoas de várias idades convivendo em um parque (convívio); pessoas subindo degraus, com formatura e cadeira de rodas (autonomia); aperto de mãos com pessoas recebendo alimentos (apoio e auxílio)" />
  <figcaption>As cinco seguranças socioassistenciais: acolhida, renda, convívio familiar e comunitário, autonomia e apoio e auxílio.</figcaption>
</figure>
`,
      quiz: [
        { id: "q1", question: "Quantas seguranças socioassistenciais o SUAS deve afiançar?", options: ["Três", "Quatro", "Cinco", "Seis"] },
        { id: "q2", question: "O SUAS é um sistema:", options: ["Centralizado e hierárquico", "Descentralizado e participativo", "Privado e filantrópico", "Municipal e exclusivo"] },
        { id: "q3", question: "Qual segurança tem como foco o aspecto relacional, tão próximo dos objetivos do SPSBD-GC?", options: ["Renda", "Apoio e auxílio", "Convívio familiar e comunitário", "Autonomia"] },
      ],
    },
    {
      id: "1.2",
      slug: "protecao-social-basica-e-especial",
      title: "Proteção Social Básica e Especial: o lugar do SPSBD-GC",
      objectives: [
        "Diferenciar Proteção Social Básica e Proteção Social Especial.",
        "Identificar os serviços estruturantes (PAIF e PAEFI) e as unidades (CRAS e CREAS).",
        "Situar o SPSBD-GC na Proteção Social Básica.",
      ],
      contentHtml: `
<h3>Dois níveis de proteção</h3>
<p>A <strong>Proteção Social Básica</strong> tem caráter preventivo: busca prevenir situações de risco por meio do
desenvolvimento de potencialidades e aquisições e do fortalecimento de vínculos familiares e comunitários.
É executada nos Centros de Referência de Assistência Social (CRAS) e em outras unidades públicas e da rede
conveniada. O <strong>PAIF</strong> (Serviço de Proteção e Atendimento Integral à Família) é o serviço estruturante
desse nível.</p>
<p>A <strong>Proteção Social Especial</strong> pode ser de média ou alta complexidade e destina-se a famílias e
indivíduos com direitos violados ou ameaçados, envolvendo ou não a ruptura de laços. É executada nos Centros de
Referência Especializada de Assistência Social (CREAS), tendo o <strong>PAEFI</strong> como serviço estruturante.</p>

<h3>Onde entra o SPSBD-GC</h3>
<p>O Serviço de Proteção Social Básica no Domicílio para Gestantes e Crianças de 0 a 6 anos (SPSBD-GC) é um
serviço da <strong>Proteção Social Básica</strong>, articulado aos demais serviços do CRAS — o PAIF e o SCFV
(Serviço de Convivência e Fortalecimento de Vínculos).</p>
<p>Ele adota a lógica de <strong>serviço</strong> (e não de programa), o que reforça seu caráter estruturante:
proteção e promoção do desenvolvimento integral da criança e fortalecimento da função protetiva das famílias.
Essa escolha é coerente com princípios do SUAS como a matricialidade sociofamiliar, a centralidade no território
e a articulação intra e intersetorial.</p>
<p>O fundamento central é a construção de contextos comunitários mais protetivos, inclusivos e participativos,
que enfrentem desigualdades socioeconômicas, étnico-raciais, de gênero e territoriais.</p>

<figure class="media">
  <img src="{{media}}/curso-1/niveis-de-protecao.png" alt="Em cima, famílias e comunidade reunidas em volta de uma casa feita de blocos, sob um guarda-chuva de folhas verdes. Abaixo, uma seta aponta para um escudo com uma mão segurando uma muda de planta" />
  <figcaption>Os dois níveis de proteção: a Proteção Social Básica, preventiva e territorial (acima), e a Proteção Social Especial, para direitos violados ou ameaçados (abaixo).</figcaption>
</figure>
`,
      quiz: [
        { id: "q1", question: "Qual serviço é estruturante da Proteção Social Básica?", options: ["PAEFI", "PAIF", "SCFV", "CREAS"] },
        { id: "q2", question: "Em qual nível de proteção o SPSBD-GC se situa?", options: ["Proteção Social Especial de alta complexidade", "Proteção Social Especial de média complexidade", "Proteção Social Básica", "Seguridade Social"] },
        { id: "q3", question: "Qual é a unidade de referência da Proteção Social Básica no território?", options: ["CREAS", "CRAS", "CAPS", "UBS"] },
      ],
    },
    {
      id: "1.3",
      slug: "objetivos-diretrizes-e-publico",
      title: "Objetivos e diretrizes do serviço",
      objectives: [
        "Enunciar o objetivo geral do SPSBD-GC.",
        "Reconhecer os quatro macro objetivos.",
        "Relacionar as diretrizes do atendimento.",
      ],
      contentHtml: `
<h3>Objetivo geral</h3>
<p>Conforme a Resolução CNAS/MDS nº 219, de 25 de novembro de 2025, o objetivo geral do Serviço é garantir a
proteção social de famílias com gestantes e crianças de até seis anos, inclusive aquelas com deficiência, por meio
da redução de riscos, desproteções e vulnerabilidades que comprometam o desenvolvimento integral na primeira
infância, os vínculos familiares e comunitários e a efetivação de direitos.</p>

<h3>Quatro macro objetivos</h3>
<p>Os dez objetivos específicos do Serviço foram agrupados em quatro macro objetivos:</p>
<ul>
  <li><strong>1. Parentalidade, convivência e vínculos familiares</strong> — qualidade das relações internas da família e papel protetivo dos cuidadores.</li>
  <li><strong>2. Desenvolvimento infantil e metodologias de cuidado</strong> — a criança como sujeito de direitos; o brincar e a escuta qualificada como ferramentas.</li>
  <li><strong>3. Vigilância socioassistencial e proteção preventiva</strong> — identificar e intervir preventivamente em situações de desproteção.</li>
  <li><strong>4. Intersetorialidade e acesso a direitos</strong> — articulação com a rede e integração da família às demais políticas.</li>
</ul>

<h3>Diretrizes do atendimento</h3>
<ul>
  <li>Articulação com o PAIF como serviço de referência do Trabalho Social com Famílias e Território.</li>
  <li>Territorialização das ações, orientada pela vigilância socioassistencial.</li>
  <li>Centralidade na família como núcleo de socialização primária e espaço de cuidado.</li>
  <li>Promoção do desenvolvimento integral, com práticas lúdicas e o brincar como dimensão estruturante.</li>
  <li>Reconhecimento e valorização da diversidade.</li>
  <li>Intersetorialidade como princípio estratégico.</li>
</ul>
`,
      quiz: [
        { id: "q1", question: "Quantos macro objetivos agrupam os objetivos específicos do Serviço?", options: ["Dois", "Três", "Quatro", "Cinco"] },
        { id: "q2", question: "Qual macro objetivo trata da articulação com a rede e do acesso a direitos?", options: ["Parentalidade, convivência e vínculos familiares", "Desenvolvimento infantil e metodologias de cuidado", "Vigilância socioassistencial e proteção preventiva", "Intersetorialidade e acesso a direitos"] },
        { id: "q3", question: "Sobre o lugar da visita domiciliar no Serviço, é correto afirmar que:", options: ["a visita é todo o Serviço", "a visita é a estratégia central, mas o Serviço vai além dela", "a visita é opcional e secundária", "a visita substitui o PAIF"] },
      ],
    },
    {
      id: "1.4",
      slug: "mapa-de-processos-e-o-lugar-da-visita",
      title: "O Mapa de Processos e Resultados e o lugar da visita",
      objectives: [
        "Explicar o que o Mapa de Processos e Resultados sintetiza.",
        "Diferenciar os dois eixos que estruturam a visita.",
        "Reconhecer o propósito da visita domiciliar no Serviço.",
      ],
      contentHtml: `
<h3>O que o Mapa sintetiza</h3>
<p>O <strong>Mapa de Processos e Resultados</strong> é um instrumento que ajuda a compreender o Serviço, seus
objetivos e seus componentes. Ele encadeia <strong>atividades</strong>, <strong>produtos</strong>, o
<strong>conteúdo da visita</strong>, <strong>resultados intermediários</strong>, <strong>resultados</strong> e
<strong>impactos</strong> — ou seja, sintetiza o que se espera alcançar e o que precisa ser feito para isso.</p>
<p>A visita domiciliar ocupa um ponto central nesse desenho, mas o essencial é que ela se conecta a um conjunto
de outras ações necessárias para que os objetivos sejam alcançados. A visita não é todo o Serviço, e o Serviço
vai além da visita.</p>

<figure class="media">
  <img src="{{media}}/curso-1/mapa-processos.png" alt="Fluxo ilustrado em etapas ligadas por setas: uma mão recebendo uma estrela; uma casa com um coração; duas pessoas conversando com balões de fala; duas pessoas em diálogo; uma balança em equilíbrio; e uma família com plantas crescendo ao lado" />
  <figcaption>O encadeamento do Mapa de Processos e Resultados: atividades, produtos, conteúdo da visita, resultados intermediários, resultados e impactos.</figcaption>
</figure>

<h3>O propósito da visita</h3>
<p>A visita é o momento em que o educador ou a educadora social chega à casa da família. Trata-se de um
<strong>dispositivo de proximidade e de intensidade de atenção protetiva</strong>, com um propósito definido:
propiciar espaços de <strong>troca e escuta</strong>, nos quais os educadores — técnicos de nível médio com a
função de visitadores — desenvolvem atividades voltadas ao fortalecimento da parentalidade protetiva e atuam
como <strong>conectores da família aos direitos</strong>, pela articulação com o PAIF e demais serviços
socioassistenciais e políticas públicas.</p>

<h3>Os dois eixos que estruturam a visita</h3>
<ul>
  <li><strong>Eixo 1 — Parentalidade protetiva:</strong> reúne o Macro Objetivo 1 (Parentalidade, Convivência e Vínculos Familiares) e o Macro Objetivo 2 (Desenvolvimento Infantil e Metodologias de Cuidado). A atenção volta-se à relação cuidador(a)-criança, com foco nas experiências lúdicas e na construção de vínculos saudáveis.</li>
  <li><strong>Eixo 2 — Proteção integral e direitos:</strong> reúne o Macro Objetivo 3 (Vigilância Socioassistencial e Proteção Preventiva) e o Macro Objetivo 4 (Intersetorialidade e Acesso a Direitos). Busca enxergar as desproteções da família e atuar para minimizá-las ou erradicá-las, conectando-se ao PAIF e à rede de serviços.</li>
</ul>
<p>A distinção entre os eixos tem caráter <strong>didático e organizativo</strong>: na prática, ambos se
entrelaçam e coexistem na dinâmica das visitas. Cabe ao educador social conduzir o atendimento com
intencionalidade ampliada.</p>

<h3>Os eixos do Serviço de Proteção Social Básica no Domicílio</h3>
<p>O SPSBD-GC partilha os mesmos eixos que estruturam esse serviço:</p>
<ul>
  <li><strong>I. Proteção e Cuidado no Domicílio</strong> — ações no ambiente domiciliar para apoiar e orientar as famílias, fortalecer vínculos protetivos, promover o autocuidado, incentivar a autonomia e ampliar a participação social.</li>
  <li><strong>II. Território Protetivo</strong> — identificar recursos comunitários, serviços locais e redes de apoio, fortalecendo a comunidade como espaço de proteção e inclusão.</li>
  <li><strong>III. Trabalho em Rede</strong> — articular os serviços e políticas públicas para que as intervenções sejam complementares, evitando sobreposições e lacunas no atendimento.</li>
</ul>
`,
      quiz: [
        { id: "q1", question: "O que o Mapa de Processos e Resultados sintetiza?", options: ["O orçamento anual do Serviço", "O que se espera alcançar e o que precisa ser feito para isso", "A lista de famílias já atendidas", "As normas de proteção social"] },
        { id: "q2", question: "Quais macro objetivos compõem o Eixo 1 — Parentalidade Protetiva?", options: ["Macro objetivos 1 e 2", "Macro objetivos 2 e 3", "Macro objetivos 3 e 4", "Macro objetivos 1 e 4"] },
        { id: "q3", question: "Qual é a função dos educadores no propósito da visita?", options: ["Aplicar sanções às famílias", "Desenvolver atividades de fortalecimento da parentalidade e conectar a família a direitos", "Substituir o técnico de referência", "Fiscalizar o cumprimento de condicionalidades"] },
      ],
    },
    {
      id: "1.5",
      slug: "publico-e-porta-de-entrada",
      title: "O público prioritário e a porta de entrada",
      objectives: [
        "Identificar o público do SPSBD-GC.",
        "Reconhecer situações de vulnerabilidade que orientam a priorização.",
        "Descrever como as famílias entram no Serviço.",
      ],
      contentHtml: `
<h3>Quem é o público</h3>
<p>De acordo com as normativas (Resolução CNAS nº 219/2025), o público do SPSBD-GC são
<strong>famílias com crianças de 0 a 6 anos e gestantes</strong>. O Serviço prioriza famílias com gestantes e
crianças na primeira infância em condições de maior vulnerabilidade e em situações de risco, atuando de forma
preventiva e proativa para proteger as famílias e suas crianças e evitar agravos.</p>
<p>A priorização deve considerar situações de vulnerabilidade agravada, como insegurança alimentar e
nutricional, pobreza extrema, deficiência, trabalho infantil, violência e gravidez na adolescência, entre outras,
sempre de forma sensível às realidades locais e respeitando a escuta das comunidades.</p>

<h3>Exemplos de público prioritário</h3>
<ul>
  <li>Gestantes e crianças de 0 a 3 anos inscritas no Cadastro Único (CadÚnico).</li>
  <li>Crianças de 0 a 6 anos beneficiárias do Benefício de Prestação Continuada (BPC).</li>
  <li>Gestantes e crianças de até 6 anos beneficiárias dos benefícios Primeira Infância, gestante e nutriz do Programa Bolsa Família.</li>
  <li>Crianças até 6 anos que perderam pelo menos um de seus responsáveis por COVID-19 ou por feminicídio.</li>
  <li>Gestantes e crianças de até 6 anos de povos e comunidades tradicionais, população do campo, floresta e água.</li>
  <li>Gestantes e crianças em situação de rua ou domicílio improvisado.</li>
  <li>Gestantes e crianças migrantes, apátridas e refugiadas.</li>
  <li>Crianças de 0 a 6 anos em famílias monoparentais, com cuidador(a) adolescente ou com baixa escolaridade.</li>
  <li>Crianças de 0 a 6 anos em insegurança alimentar ou em situação de trabalho infantil.</li>
  <li>Crianças de 4 a 6 anos fora da escola.</li>
</ul>

<h3>Como a família entra no Serviço</h3>
<p>A identificação do público prioritário ocorre de forma <strong>integrada ao referenciamento das famílias no
CRAS/PAIF</strong>, por meio das informações do CadÚnico, do prontuário eletrônico, da <strong>busca ativa</strong>
e da articulação com a rede de proteção social.</p>
<p>Essa identificação deve ser realizada prioritariamente pela <strong>equipe de referência do PAIF</strong>, pelo
<strong>técnico de referência</strong> do Serviço e pela <strong>vigilância socioassistencial</strong>,
considerando as informações disponíveis e a escuta qualificada do território. Cabe ao <strong>coordenador do
PAIF</strong>, em conjunto com o técnico de referência, a seleção das famílias a serem atendidas e o
acompanhamento das ações desenvolvidas.</p>
<p>Para a seleção, é central combinar os <strong>dados da vigilância</strong> com o <strong>olhar e a escuta dos
trabalhadores</strong> do SUAS: a busca ativa e a leitura sensível de indicadores de risco e vulnerabilidade são
o que deve orientar a escolha das famílias.</p>
`,
      quiz: [
        { id: "q1", question: "Qual é o público do SPSBD-GC?", options: ["Famílias com crianças de 0 a 6 anos e gestantes", "Somente crianças de 0 a 3 anos", "Idosos em situação de rua", "Adolescentes em conflito com a lei"] },
        { id: "q2", question: "A identificação das famílias prioritárias deve ocorrer prioritariamente:", options: ["por sorteio entre os usuários do CRAS", "pela equipe de referência do PAIF, pelo técnico de referência do Serviço e pela vigilância socioassistencial", "apenas por demanda espontânea da família", "pela escola da criança"] },
        { id: "q3", question: "A seleção das famílias a serem atendidas nas visitas cabe, em conjunto com o técnico de referência, a quem?", options: ["Ao Conselho Tutelar", "Ao coordenador do PAIF", "À secretaria municipal", "À equipe de saúde da família"] },
      ],
    },
    {
      id: "1.6",
      slug: "centralidade-da-equipe-tecnica",
      title: "A centralidade da equipe técnica e o trabalho relacional",
      objectives: [
        "Reconhecer a equipe técnica e os educadores como principal recurso de intervenção.",
        "Explicar por que o trabalho relacional é a tecnologia central na assistência social.",
        "Identificar o que sustenta a qualidade do trabalho da equipe.",
      ],
      contentHtml: `
<h3>O trabalho relacional como tecnologia central</h3>
<p>Nos serviços socioassistenciais — e em particular no SPSBD-GC — a <strong>equipe técnica e as educadoras e
educadores constituem o principal recurso de intervenção da política pública</strong>. Diferentemente de áreas
que operam com equipamentos ou insumos materiais complexos, na assistência social é o
<strong>trabalho relacional</strong> que ocupa esse lugar.</p>
<p>São esses profissionais que <strong>materializam a presença do Estado</strong> junto às famílias e dão
concretude ao direito à proteção social. As trabalhadoras e trabalhadores do SUAS são o principal insumo para a
produção dos serviços e fazem a ponte entre as famílias e seus direitos — e a efetivação desses direitos
depende, em grande medida, de suas competências técnicas, do compromisso ético e das condições de trabalho.</p>

<h3>O que sustenta a qualidade</h3>
<ul>
  <li><strong>Recrutamento</strong> baseado em critérios técnicos.</li>
  <li><strong>Investimento contínuo</strong> em desenvolvimento profissional.</li>
  <li><strong>Processos estruturados e permanentes de supervisão</strong>.</li>
</ul>
<p>A formação inicial e continuada ocupa posição estratégica: técnicos de referência e educadores são os
operadores diretos da política e atuam na mediação entre direitos, normas institucionais e realidades concretas
de desproteção. A capacidade de <strong>escuta qualificada</strong>, de análise crítica, a postura não
estigmatizante e a orientação adequada influenciam diretamente os resultados do acompanhamento.</p>

<h3>Interações não são neutras</h3>
<p>É fundamental reconhecer que representações sociais, valores, crenças e preconceitos atravessam as interações
durante as visitas. Essas dimensões podem <strong>fortalecer vínculos e promover autonomia</strong> ou, ao
contrário, <strong>reproduzir julgamentos, constrangimentos e barreiras ao acesso a direitos</strong>. Por isso,
a reflexão permanente sobre essas dimensões deve integrar a prática profissional, junto com a vigilância
comprometida com a superação do assistencialismo — a visão do usuário como frágil, incapaz ou dependente.</p>
<p>Para que sua atuação produza efeitos reais, as educadoras e educadores precisam investir na
<strong>criação de vínculos e de relações de confiança</strong> com as famílias, de modo a alterar positivamente
as dinâmicas dos vínculos familiares e a proteção integral das crianças.</p>
`,
      quiz: [
        { id: "q1", question: "Na assistência social, o que é considerado a tecnologia central do trabalho?", options: ["Os equipamentos das unidades", "Os sistemas de informação", "O trabalho relacional", "Os benefícios financeiros"] },
        { id: "q2", question: "Segundo o Guia, o que é indispensável para a qualidade e a consistência do serviço?", options: ["Recrutamento por critérios técnicos, desenvolvimento profissional contínuo e supervisão", "Ampliar o número de computadores nas unidades", "Priorizar contratos temporários", "Reduzir a frequência das visitas"] },
        { id: "q3", question: "Sobre valores, crenças e preconceitos nas visitas, é correto afirmar que:", options: ["não influenciam o atendimento", "são neutros, porque o técnico atua com imparcialidade", "podem fortalecer vínculos ou reproduzir barreiras ao acesso a direitos", "devem ser expressos livremente, sem reflexão"] },
      ],
    },
  ],
  answers: {
    "1.1": { q1: 2, q2: 1, q3: 2 },
    "1.2": { q1: 1, q2: 2, q3: 1 },
    "1.3": { q1: 2, q2: 3, q3: 1 },
    "1.4": { q1: 1, q2: 0, q3: 1 },
    "1.5": { q1: 0, q2: 1, q3: 1 },
    "1.6": { q1: 2, q2: 0, q3: 2 },
  },
};
