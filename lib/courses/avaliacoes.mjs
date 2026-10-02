// Avaliações gerais de cada curso: 10 questões que integram os conteúdos das
// unidades, no mesmo formato das avaliações de unidade (enunciado, quatro
// alternativas, explicação no gabarito). A correção acontece no navegador.

export const avaliacoes = {
  "curso-1": {
    questions: [
      {
        id: "f1",
        question:
          "Na Constituição Federal de 1988, a Assistência Social integra a Seguridade Social ao lado de quais políticas?",
        options: ["Saúde e Previdência Social", "Educação e Habitação", "Trabalho e Renda", "Cultura e Esporte"],
        explanation:
          "A Assistência Social compõe a Seguridade Social brasileira junto com a Saúde e a Previdência Social, e é reconhecida como política pública de direito, com o Estado como responsável principal por sua condução.",
      },
      {
        id: "f2",
        question: "O que significa dizer que o SUAS é descentralizado e participativo?",
        options: [
          "A União executa os serviços e os municípios apenas fiscalizam",
          "As responsabilidades são divididas entre União, estados e municípios, com participação da sociedade civil e dos próprios usuários",
          "Os serviços são prestados apenas por entidades filantrópicas",
          "Cada município decide isoladamente, sem diretriz nacional",
        ],
        explanation:
          "O SUAS é descentralizado porque há divisão de responsabilidades entre as esferas federal, estadual e municipal; e participativo porque envolve o Estado, a sociedade civil e os próprios usuários.",
      },
      {
        id: "f3",
        question:
          "Qual segurança socioassistencial tem caráter excepcional e provisório, acionada em situações de vulnerabilidade temporária e calamidade?",
        options: ["Acolhida", "Renda", "Autonomia", "Apoio e auxílio"],
        explanation:
          "A segurança de apoio e auxílio é excepcional e provisória, com provisões em situações de vulnerabilidade temporária e calamidade, como os auxílios natalidade e mortalidade.",
      },
      {
        id: "f4",
        question: "Em que nível de proteção se situa o SPSBD-GC e qual é a sua unidade de referência?",
        options: [
          "Proteção Social Especial de média complexidade, referenciado ao CREAS",
          "Proteção Social Especial de alta complexidade, em serviço de acolhimento",
          "Proteção Social Básica, referenciado ao CRAS",
          "Seguridade Social, vinculado à Previdência",
        ],
        explanation:
          "O SPSBD-GC é um serviço da Proteção Social Básica, ofertado no domicílio e no território, e referenciado ao CRAS, unidade onde está o PAIF.",
      },
      {
        id: "f5",
        question: "Qual alternativa associa corretamente os serviços estruturantes às suas unidades?",
        options: [
          "PAIF no CRAS e PAEFI no CREAS",
          "PAEFI no CRAS e PAIF no CREAS",
          "PAIF e PAEFI, ambos no CREAS",
          "PAIF e PAEFI, ambos exclusivamente na rede conveniada",
        ],
        explanation:
          "O PAIF é o serviço estruturante da Proteção Social Básica, ofertado no CRAS, e o PAEFI é o serviço estruturante da Proteção Social Especial de média complexidade, ofertado no CREAS.",
      },
      {
        id: "f6",
        question:
          "Recuperar e fortalecer as relações familiares, comunitárias e sociais corresponde a qual segurança?",
        options: ["Renda", "Acolhida", "Convívio familiar e comunitário", "Apoio e auxílio"],
        explanation:
          "A segurança de convívio familiar e comunitário tem foco relacional, o que a aproxima diretamente dos objetivos do SPSBD-GC.",
      },
      {
        id: "f7",
        question:
          "Qual segurança enfrenta o assistencialismo e a subalternidade, desenvolvendo o protagonismo e o exercício da cidadania?",
        options: ["Acolhida", "Autonomia", "Renda", "Apoio e auxílio"],
        explanation:
          "A segurança de autonomia busca desenvolver capacidades para o exercício do protagonismo e da cidadania, enfrentando o assistencialismo e a subalternidade.",
      },
      {
        id: "f8",
        question: "Quais são os dois eixos que estruturam o atendimento na visita domiciliar do Serviço?",
        options: [
          "A renda e o acesso a benefícios socioassistenciais",
          "O desenvolvimento infantil e o fortalecimento da função protetiva da família",
          "A fiscalização das famílias e o cumprimento de condicionalidades",
          "A oferta de alimentos e itens de necessidade básica",
        ],
        explanation:
          "Toda visita deve contemplar os dois eixos do atendimento: o desenvolvimento infantil e o fortalecimento da função protetiva da família. É esse duplo eixo que organiza o planejamento da visita.",
      },
      {
        id: "f9",
        question: "Sobre a porta de entrada e a priorização no SPSBD-GC, é correto afirmar que:",
        options: [
          "A inserção acontece por demanda espontânea ou encaminhamento, a partir da acolhida no CRAS/PAIF, com priorização das situações de maior vulnerabilidade",
          "Só entram no Serviço as famílias que já recebem transferência de renda",
          "A ordem de chegada é o único critério de priorização das famílias",
          "A família procura diretamente a equipe no território, sem passar pelo CRAS",
        ],
        explanation:
          "A porta de entrada da Proteção Social Básica é o CRAS/PAIF, por onde a família chega por demanda espontânea ou encaminhamento. A priorização considera as situações de vulnerabilidade do território, e não apenas a ordem de chegada nem a condição de beneficiária de programas de renda.",
      },
      {
        id: "f10",
        question:
          "Segundo a unidade sobre a centralidade da equipe técnica, qual é a principal tecnologia de intervenção na assistência social?",
        options: [
          "O relatório mensal de atendimentos",
          "O sistema eletrônico de registro",
          "A relação estabelecida entre a equipe e a família, mediada por escuta, vínculo e respeito",
          "A quantidade de visitas realizadas por mês",
        ],
        explanation:
          "A equipe técnica e os educadores são o principal recurso de intervenção, e o trabalho relacional é a tecnologia central da assistência social: é a relação com a família que sustenta os resultados.",
      },
    ],
    answers: { f1: 0, f2: 1, f3: 3, f4: 2, f5: 0, f6: 2, f7: 1, f8: 1, f9: 0, f10: 2 },
  },

  "curso-2": {
    questions: [
      {
        id: "f1",
        question: "Por que a primeira infância é considerada um período decisivo?",
        options: [
          "Porque a criança ainda não formou nenhum vínculo",
          "Porque é o período em que o desenvolvimento é mais intenso e mais sensível ao ambiente e às relações",
          "Porque é quando a criança passa a frequentar a escola",
          "Porque as políticas públicas só atendem até os 6 anos",
        ],
        explanation:
          "Os primeiros anos concentram um desenvolvimento intenso e muito sensível à qualidade do ambiente e das relações, o que faz dessa etapa uma janela de oportunidade para as ações do Serviço.",
      },
      {
        id: "f2",
        question: "Como o brincar é compreendido no trabalho do SPSBD-GC?",
        options: [
          "Como atividade recreativa, sem relação com o desenvolvimento",
          "Como instrumento de avaliação do desempenho do(a) cuidador(a)",
          "Como um direito da criança e a principal via de aprendizagem e desenvolvimento",
          "Como recurso usado apenas quando há brinquedos disponíveis na casa",
        ],
        explanation:
          "O brincar é um direito da criança e a principal via de aprendizagem e desenvolvimento, por isso é o eixo das atividades propostas nas visitas.",
      },
      {
        id: "f3",
        question: "Para que servem os marcos do desenvolvimento infantil?",
        options: [
          "Para substituir a avaliação de profissionais de saúde",
          "Para definir se a criança está atrasada e precisa de laudo",
          "Para orientar a observação e o acompanhamento, lembrando que a sequência de aquisição costuma ser comum, mas o ritmo varia entre as crianças",
          "Para comparar as crianças entre si e classificar o desenvolvimento",
        ],
        explanation:
          "Os marcos orientam a observação e o acompanhamento. A sequência de aquisição de habilidades é comum, mas o ritmo varia entre as crianças — por isso os marcos não servem para classificar nem comparar.",
      },
      {
        id: "f4",
        question: "O que caracteriza a responsividade do(a) cuidador(a) na interação com a criança?",
        options: [
          "Perceber as pistas da criança e responder a elas de forma adequada, no tempo dela",
          "Repetir as instruções até a criança obedecer",
          "Evitar responder para não interromper o brincar da criança",
          "Deixar a criança resolver sozinha tudo o que já é capaz de fazer",
        ],
        explanation:
          "A responsividade é perceber as pistas e os comportamentos da criança e responder a eles de forma adequada e oportuna, o que constrói uma interação de qualidade.",
      },
      {
        id: "f5",
        question: "Qual alternativa descreve a parentalidade protetiva?",
        options: [
          "Cuidados que garantem segurança, afeto e estímulo, sem violência física nem psicológica",
          "Cuidados que priorizam a disciplina e a obediência da criança",
          "Cuidados oferecidos exclusivamente pela mãe",
          "Cuidados prestados somente por profissionais especializados",
        ],
        explanation:
          "A parentalidade protetiva se caracteriza por cuidados que asseguram proteção, afeto e estímulo ao desenvolvimento, sem práticas de violência física ou psicológica.",
      },
      {
        id: "f6",
        question: "Como manejar comportamentos desafiadores das crianças?",
        options: [
          "Com punição física imediata, para que a criança associe o erro à consequência",
          "Ignorando o comportamento até que ele desapareça",
          "Retirando a criança da atividade de forma definitiva",
          "Com estratégias positivas, sem punição física nem humilhação",
        ],
        explanation:
          "O manejo de comportamentos desafiadores se dá por estratégias positivas, que ensinam o comportamento esperado, e nunca por punição física ou humilhação.",
      },
      {
        id: "f7",
        question: "O que torna o elogio mais útil na interação com a criança?",
        options: [
          "Dizer apenas 'muito bem', para não emitir julgamento",
          "Descrever o comportamento específico, tornando a devolutiva mais precisa para a criança",
          "Elogiar somente quando a criança acerta tudo",
          "Evitar elogios para não criar expectativa na criança",
        ],
        explanation:
          "O elogio descritivo, que nomeia o comportamento específico, é mais útil porque a criança compreende exatamente o que foi bem feito e pode repetir.",
      },
      {
        id: "f8",
        question: "Qual é a melhor conduta para envolver a família nas atividades da visita?",
        options: [
          "Centralizar as orientações na mãe, que cuida diretamente da criança",
          "Chamar apenas os adultos, deixando as crianças fora do momento da atividade",
          "Incluir as pessoas que participam dos cuidados e corresponsabilizar a família pelo acompanhamento",
          "Restringir a visita ao momento da atividade, para não dispersar o foco",
        ],
        explanation:
          "Envolver os membros da família amplia a corresponsabilização pelos cuidados, em vez de concentrar tudo em uma única pessoa. Todos que participam dos cuidados devem ser incluídos.",
      },
      {
        id: "f9",
        question: "Como o(a) educador(a) deve ajustar o nível de dificuldade de uma atividade?",
        options: [
          "Oferecendo sempre a atividade mais difícil, para estimular a criança",
          "Aumentando gradualmente o nível conforme a habilidade demonstrada pela criança",
          "Mantendo sempre o mesmo nível, para dar segurança",
          "Deixando a criança escolher livremente, sem mediação",
        ],
        explanation:
          "A atividade deve propor um desafio possível e aumentar gradualmente de dificuldade conforme a criança demonstra a habilidade, evitando tanto a frustração quanto o desinteresse.",
      },
      {
        id: "f10",
        question: "O que significa atender com equidade?",
        options: [
          "Dar exatamente o mesmo atendimento a todas as famílias, sem distinção",
          "Priorizar o atendimento por ordem de chegada",
          "Adequar o atendimento às necessidades de cada contexto, para alcançar a igualdade de oportunidades",
          "Atender apenas quem se enquadra estritamente no perfil do Serviço",
        ],
        explanation:
          "Equidade não é tratar todos do mesmo modo, e sim considerar as especificidades de cada criança e família — a diversidade das infâncias — para que todos tenham as mesmas oportunidades.",
      },
    ],
    answers: { f1: 1, f2: 2, f3: 2, f4: 0, f5: 0, f6: 3, f7: 1, f8: 2, f9: 1, f10: 2 },
  },

  "curso-3": {
    questions: [
      {
        id: "f1",
        question: "Qual é a porta de entrada e a unidade de referência das famílias no Serviço?",
        options: [
          "O CREAS, pelo PAEFI",
          "O serviço de acolhimento institucional",
          "O CRAS, pelo PAIF",
          "A unidade de saúde de referência do território",
        ],
        explanation:
          "O CRAS/PAIF é a porta de entrada da Proteção Social Básica e a unidade de referência das famílias, a partir da qual o SPSBD-GC se articula na acolhida e na inserção.",
      },
      {
        id: "f2",
        question:
          "Na condução da visita, o que representam a atmosfera acolhedora, o elogio e a escuta qualificada?",
        options: [
          "Elementos que sustentam o vínculo com a família e favorecem a adesão ao Serviço",
          "Formalidades que antecedem a atividade com a criança",
          "Instrumentos de avaliação do desempenho do(a) cuidador(a)",
          "Recursos utilizados apenas na primeira visita à família",
        ],
        explanation:
          "A atmosfera acolhedora, o elogio e a escuta qualificada não são formalidades: são o que sustenta o vínculo e a confiança, condições para que a família adira ao acompanhamento.",
      },
      {
        id: "f3",
        question: "Para que serve o Caderno de Atividades no planejamento da visita?",
        options: [
          "Para registrar a frequência das visitas realizadas",
          "Para escolher temas e atividades conforme os objetivos do acompanhamento e a fase da criança",
          "Para substituir o registro do atendimento domiciliar",
          "Para listar as faltas e ausências da família",
        ],
        explanation:
          "O Caderno de Atividades apoia a escolha dos temas e das atividades, a partir dos objetivos do acompanhamento e das características da criança e da família.",
      },
      {
        id: "f4",
        question: "Por que usar objetos da casa e atividades cotidianas durante a visita?",
        options: [
          "Porque substituem a necessidade de planejamento prévio",
          "Porque afastam a família de sua rotina habitual",
          "Porque aproximam a atividade do cotidiano, mostrando que o desenvolvimento se apoia nas relações e nos recursos que a família já tem",
          "Porque só podem ser usados quando falta material do Serviço",
        ],
        explanation:
          "Usar o que existe na casa mostra que o desenvolvimento se apoia nas relações e nos recursos cotidianos da própria família, o que torna a prática sustentável e significativa.",
      },
      {
        id: "f5",
        question: "Na visita à gestante, qual é a finalidade da verificação dos sinais de alarme?",
        options: [
          "Substituir a consulta de pré-natal",
          "Identificar situações de risco que exigem encaminhamento imediato ao serviço de saúde",
          "Classificar o risco social da família",
          "Cumprir uma exigência de registro no último mês da gestação",
        ],
        explanation:
          "A verificação dos sinais de alarme integra a proteção à gestante: ao identificá-los, o(a) educador(a) encaminha a situação com urgência ao serviço de saúde, sem substituir o pré-natal.",
      },
      {
        id: "f6",
        question: "O que é o Acordo de Compromissos na visita à gestante?",
        options: [
          "O documento que a gestante assina para receber benefícios",
          "O instrumento com as práticas acordadas para a gestante realizar entre as visitas",
          "A relação de exames solicitados no pré-natal",
          "O termo que encerra o acompanhamento da gestante",
        ],
        explanation:
          "O Acordo de Compromissos reúne as práticas combinadas com a gestante para que ela as realize entre as visitas, dando continuidade ao acompanhamento.",
      },
      {
        id: "f7",
        question: "A etapa da visita realizada 'depois' do encontro com a família corresponde a:",
        options: [
          "A acolhida inicial da família",
          "A apresentação do(a) educador(a) e do Serviço",
          "O registro, os encaminhamentos e a articulação com a rede",
          "A definição do horário da próxima visita",
        ],
        explanation:
          "Depois do encontro vêm o registro do atendimento, os encaminhamentos necessários e a articulação com a rede, garantindo continuidade ao que foi identificado na visita.",
      },
      {
        id: "f8",
        question: "Com que frequência o Registro do Atendimento Domiciliar deve ser preenchido?",
        options: ["Uma vez por mês", "Ao encerrar o acompanhamento da família", "A cada visita", "Somente quando há encaminhamento à rede"],
        explanation:
          "O Registro do Atendimento Domiciliar é o instrumento preenchido a cada visita, e é essa constância que permite acompanhar a evolução do caso.",
      },
      {
        id: "f9",
        question: "Qual é a diferença entre demanda observada e demanda relatada no registro?",
        options: [
          "Observada é a que a família informa; relatada é a que o(a) educador(a) percebe",
          "Observada é a que o(a) educador(a) percebe diretamente; relatada é a que a família informa",
          "As duas expressões designam a mesma coisa",
          "Observada se refere apenas às condições do ambiente da casa",
        ],
        explanation:
          "A demanda observada é aquela que o(a) educador(a) percebe diretamente na visita; a relatada é a que a família traz. Distinguir as duas qualifica o registro e o planejamento.",
      },
      {
        id: "f10",
        question: "O que significa atender com equidade na visita domiciliar?",
        options: [
          "Oferecer o mesmo atendimento a todas as famílias, sem adaptações",
          "Adaptar o atendimento às especificidades de cada criança e família, como no caso de crianças com deficiência",
          "Atender primeiro as famílias com maior urgência social",
          "Encaminhar à rede especializada sempre que houver qualquer diferença",
        ],
        explanation:
          "Equidade é diferente de igualdade: significa reconhecer as especificidades — a criança com deficiência, a diversidade das famílias — e adaptar o atendimento para que todas tenham as mesmas oportunidades.",
      },
    ],
    answers: { f1: 2, f2: 0, f3: 1, f4: 2, f5: 1, f6: 1, f7: 2, f8: 2, f9: 1, f10: 1 },
  },

  "curso-4": {
    questions: [
      {
        id: "f1",
        question: "Quais competências são exigidas do(a) técnico(a) de referência no SPSBD-GC?",
        options: [
          "Técnica, ética e política",
          "Clínica, jurídica e pedagógica",
          "Administrativa, financeira e contábil",
          "Assistencial, religiosa e filantrópica",
        ],
        explanation:
          "A atuação do(a) TR exige competência técnica, ética e política, sustentadas pelos princípios éticos que fundamentam o trabalho dos(as) trabalhadores(as) do SUAS.",
      },
      {
        id: "f2",
        question: "Qual é o papel da Vigilância Socioassistencial na implementação do Serviço?",
        options: [
          "Fiscalizar as famílias beneficiárias de programas de transferência de renda",
          "Produzir o diagnóstico socioterritorial, com dados de desproteção e de potencialidade, orientando a oferta do Serviço",
          "Aplicar sanções pelo descumprimento de condicionalidades",
          "Substituir o registro das visitas realizadas",
        ],
        explanation:
          "A Vigilância Socioassistencial produz o diagnóstico socioterritorial, reunindo as desproteções e as potencialidades do território, e é esse diagnóstico que orienta a oferta e a priorização do Serviço.",
      },
      {
        id: "f3",
        question: "Quais são os três momentos do processo de supervisão?",
        options: [
          "Acolhida, atividade e fechamento",
          "Planejamento, execução e avaliação",
          "Preparação, realização da visita supervisionada e devolutiva",
          "Inscrição, seleção e acompanhamento",
        ],
        explanation:
          "A supervisão se organiza em três momentos: a preparação, a realização — que pode incluir a visita supervisionada — e a devolutiva ao(à) educador(a).",
      },
      {
        id: "f4",
        question: "Qual alternativa diferencia corretamente as reuniões individuais das reuniões de grupo?",
        options: [
          "As individuais tratam do acompanhamento do caso e do(a) educador(a); as de grupo favorecem a troca, a formação e o alinhamento da equipe",
          "As duas têm a mesma finalidade e podem ser usadas indistintamente",
          "As reuniões de grupo servem apenas para informes administrativos",
          "As reuniões individuais substituem a visita supervisionada",
        ],
        explanation:
          "As reuniões individuais permitem acompanhar o caso e apoiar o(a) educador(a) de perto; as reuniões de grupo criam espaço de troca entre pares, formação continuada e alinhamento do trabalho da equipe.",
      },
      {
        id: "f5",
        question: "O que é a visita supervisionada?",
        options: [
          "Uma visita realizada pelo(a) TR no lugar do(a) educador(a)",
          "O acompanhamento, pelo(a) TR, da visita do(a) educador(a), com devolutiva posterior",
          "A visita de encerramento do acompanhamento com a família",
          "A visita realizada por dois educadores ao mesmo tempo",
        ],
        explanation:
          "Na visita supervisionada o(a) TR acompanha o trabalho do(a) educador(a) em campo e, depois, oferece devolutiva — é instrumento de formação e de suporte contínuo à equipe.",
      },
      {
        id: "f6",
        question: "Para que serve o Plano de Acompanhamento Familiar (PAF)?",
        options: [
          "Substitui o registro do atendimento domiciliar",
          "É o termo de recusa assinado pela família",
          "É a lista de encaminhamentos feitos à rede",
          "É o documento que organiza os objetivos e o percurso do acompanhamento da família, sendo revisto ao longo do tempo",
        ],
        explanation:
          "O PAF organiza os objetivos e o percurso do acompanhamento da família, articulando as dimensões do trabalho, e é revisto conforme a situação da família evolui.",
      },
      {
        id: "f7",
        question: "Quais cuidados devem orientar o registro das informações das famílias?",
        options: [
          "Compartilhar os dados com a rede sempre que solicitado",
          "Guardar sigilo, registrar apenas o necessário e proteger as informações pessoais das famílias",
          "Publicar os dados para garantir a transparência do Serviço",
          "Manter os dados restritos ao(à) educador(a) que fez a visita",
        ],
        explanation:
          "O registro exige sigilo e cuidado com a proteção de dados: registra-se o necessário, e a informação pessoal da família é protegida, sendo compartilhada apenas nos fluxos previstos.",
      },
      {
        id: "f8",
        question: "Qual é a função do monitoramento e da avaliação do Serviço?",
        options: [
          "Cumprir uma exigência formal da esfera federal",
          "Substituir a supervisão da equipe",
          "Acompanhar a execução e os resultados do Serviço, apoiado nos instrumentos e no sistema eletrônico (e-PCF)",
          "Ser realizado exclusivamente pelo(a) educador(a) social",
        ],
        explanation:
          "O monitoramento e a avaliação acompanham a execução e os resultados do Serviço, com apoio dos instrumentos de monitoramento e do sistema eletrônico e-PCF, realimentando o planejamento.",
      },
      {
        id: "f9",
        question: "Qual alternativa diferencia corretamente intrasetorialidade e intersetorialidade?",
        options: [
          "Intrasetorial é a articulação dentro da assistência social, com referência e contrarreferência entre Proteção Social Básica e Especial; intersetorial é a articulação com políticas como saúde e educação",
          "Intrasetorial é a articulação com o setor privado; intersetorial é a articulação com o Estado",
          "As duas expressões são sinônimos",
          "Intrasetorial é exclusiva do CRAS e intersetorial é exclusiva do CREAS",
        ],
        explanation:
          "A intrasetorialidade articula as ofertas dentro da própria assistência social, com referência e contrarreferência entre PSB e PSE; a intersetorialidade articula o Serviço com outras políticas, como saúde, educação e justiça.",
      },
      {
        id: "f10",
        question: "Como o(a) TR e o(a) educador(a) devem atuar diante de famílias de povos e comunidades tradicionais e de situações de violação de direitos?",
        options: [
          "Padronizar o atendimento, para garantir a isonomia entre as famílias",
          "Adequar o atendimento ao contexto das famílias e, diante de violação de direitos, acionar a rede de proteção conforme os fluxos estabelecidos",
          "Encerrar o acompanhamento e transferir o caso para outro serviço",
          "Registrar a situação e aguardar a próxima visita para decidir",
        ],
        explanation:
          "O atendimento deve se adequar ao contexto das famílias dos povos e comunidades tradicionais, respeitando suas especificidades. Diante de violência ou violação de direitos, aciona-se a rede de proteção seguindo os fluxos, sem interromper o acompanhamento.",
      },
    ],
    answers: { f1: 0, f2: 1, f3: 2, f4: 0, f5: 1, f6: 3, f7: 1, f8: 2, f9: 0, f10: 1 },
  },
};
