export const course = {
  id: "curso-1",
  title: "Fundamentos do SPSBD-GC",
  subtitle: "SUAS, Proteção Social Básica e o Serviço no Domicílio",
  audience: "Educadores(as) Sociais e Técnicos(as) de Referência",
  workload: "~4h (piloto com 3 unidades)",
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
`,
      quiz: [
        {
          id: "q1",
          question: "Quantas seguranças socioassistenciais o SUAS deve afiançar?",
          options: ["Três", "Quatro", "Cinco", "Seis"],
        },
        {
          id: "q2",
          question: "O SUAS é um sistema:",
          options: [
            "Centralizado e hierárquico",
            "Descentralizado e participativo",
            "Privado e filantrópico",
            "Municipal e exclusivo",
          ],
        },
        {
          id: "q3",
          question: "Qual segurança tem como foco o aspecto relacional, tão próximo dos objetivos do SPSBD-GC?",
          options: ["Renda", "Apoio e auxílio", "Convívio familiar e comunitário", "Autonomia"],
        },
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
`,
      quiz: [
        {
          id: "q1",
          question: "Qual serviço é estruturante da Proteção Social Básica?",
          options: ["PAEFI", "PAIF", "SCFV", "CREAS"],
        },
        {
          id: "q2",
          question: "Em qual nível de proteção o SPSBD-GC se situa?",
          options: [
            "Proteção Social Especial de alta complexidade",
            "Proteção Social Especial de média complexidade",
            "Proteção Social Básica",
            "Seguridade Social",
          ],
        },
        {
          id: "q3",
          question: "Qual é a unidade de referência da Proteção Social Básica no território?",
          options: ["CREAS", "CRAS", "CAPS", "UBS"],
        },
      ],
    },
    {
      id: "1.3",
      slug: "objetivos-diretrizes-e-publico",
      title: "Objetivos, diretrizes e público do serviço",
      objectives: [
        "Enunciar o objetivo geral do SPSBD-GC.",
        "Reconhecer os quatro macro objetivos.",
        "Relacionar as diretrizes do serviço.",
        "Identificar o lugar estratégico da visita no Serviço.",
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

<h3>O lugar da visita</h3>
<p>A visita domiciliar é a estratégia central do Serviço, mas o Serviço vai além dela. A visita materializa os
macro objetivos 1 e 2 e faz a ponte para os macro objetivos 3 e 4, na medida em que se articula ao PAIF e ao SCFV
no âmbito do CRAS.</p>
`,
      quiz: [
        {
          id: "q1",
          question: "Quantos macro objetivos agrupam os objetivos específicos do Serviço?",
          options: ["Dois", "Três", "Quatro", "Cinco"],
        },
        {
          id: "q2",
          question: "Qual macro objetivo trata da articulação com a rede e do acesso a direitos?",
          options: [
            "Parentalidade, convivência e vínculos familiares",
            "Desenvolvimento infantil e metodologias de cuidado",
            "Vigilância socioassistencial e proteção preventiva",
            "Intersetorialidade e acesso a direitos",
          ],
        },
        {
          id: "q3",
          question: "Sobre o lugar da visita domiciliar no Serviço, é correto afirmar que:",
          options: [
            "a visita é todo o Serviço",
            "a visita é a estratégia central, mas o Serviço vai além dela",
            "a visita é opcional e secundária",
            "a visita substitui o PAIF",
          ],
        },
      ],
    },
  ],
};
