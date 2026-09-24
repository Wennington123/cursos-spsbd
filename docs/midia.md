# Mídia dos cursos — sugestões e prompts

Guia para gerar imagens e vídeos (Gemini) e inseri-los nas unidades. Priorize os itens marcados
**[essencial]**; os **[complementar]** podem entrar depois.

---

## 1. Como o conteúdo busca a mídia

Os arquivos ficam em `public/midia/`, organizados por curso (`curso-1/`, `curso-2/`, ...).

No HTML da unidade, use o marcador `{{media}}` — ele é trocado automaticamente pelo caminho correto,
já com o `basePath` do GitHub Pages. **Nunca** escreva `/midia/...` direto, senão quebra no Pages.

**Imagem**

```html
<figure class="media">
  <img src="{{media}}/curso-1/segurancas.webp" alt="As cinco seguranças socioassistenciais representadas por ícones" />
  <figcaption>As cinco seguranças socioassistenciais do SUAS.</figcaption>
</figure>
```

**Vídeo** (com legenda e imagem de capa)

```html
<figure class="media">
  <video controls preload="metadata" poster="{{media}}/curso-3/passo-a-passo.jpg">
    <source src="{{media}}/curso-3/passo-a-passo.mp4" type="video/mp4" />
    <track kind="captions" src="{{media}}/curso-3/passo-a-passo.vtt" srclang="pt" label="Português" />
  </video>
  <figcaption>As etapas da visita domiciliar, na ordem.</figcaption>
</figure>
```

**Grade de imagens**

```html
<div class="galeria">
  <figure class="media"><img src="{{media}}/curso-3/objeto-1.webp" alt="..." /></figure>
  <figure class="media"><img src="{{media}}/curso-3/objeto-2.webp" alt="..." /></figure>
</div>
```

Onde inserir no código: dentro do `contentHtml` da unidade, em
`plataforma/lib/courses/curso-N.mjs`. Cole o bloco entre as seções `<h3>` onde ele ajuda a explicar.

---

## 2. Bloco de estilo — cole no início de **todo** prompt

> Ilustração vetorial flat, estilo editorial, traço simples e formas arredondadas, sem texto e sem
> letras. Paleta: azul-marinho #14335f, azul #2f7fc1, amarelo #f7c325, verde #3f9e5a, laranja
> #ef7d23, vermelho #d92b2b, magenta #d81b7a, roxo #8267b5. Fundo branco ou off-white #f6f7f9.
> Pessoas brasileiras diversas (raça, idade, corpo, deficiência). Cenas dignas e acolhedoras, sem
> estereótipos de pobreza, sem sofrimento explícito. Formato 4:3, alta resolução.

Para vídeos, acrescente: > Animação 2D simples, 6 a 8 segundos, plano fixo ou movimento suave de
câmera, sem texto na tela, sem narração.

---

## 3. Regras que economizam retrabalho

- **Nada de texto na imagem.** Geradores escrevem errado, e em português é pior. Peça a ilustração sem
  letras e escreva os rótulos em HTML/legenda. Para diagramas, gere as formas e sobreponha os nomes
  no código, ou aceite um esquema sem rótulos e explique na legenda.
- **Não retrate violência, negligência ou crianças em sofrimento.** Temas sensíveis (violência,
  trabalho infantil) entram de forma simbólica — por exemplo, um escudo, uma mão que protege.
- **Consistência:** o mesmo bloco de estilo em todos os prompts é o que faz o material parecer um
  conjunto.
- **Legenda sempre:** toda imagem precisa de `alt` descritivo (acessibilidade) e `figcaption`
  explicando o que ela ensina.
- **Vídeo:** precisa de legenda (`.vtt`) e de capa (`poster`). Sem isso, o material fica inacessível.

---

## 4. Curso 1 — Fundamentos

### 1.1 As cinco seguranças socioassistenciais — **[essencial]**
`curso-1/segurancas.webp`
> Cinco ícones circulares lado a lado, cada um representando uma ideia: um ouvido com ondas de som
> (acolhida); uma cédula e uma moeda (renda); três pessoas unidas por um arco (convívio familiar e
> comunitário); uma pessoa de braços abertos subindo um degrau (autonomia); duas mãos que se apoiam
> (apoio e auxílio).
`alt`: "Cinco ícones que representam as seguranças de acolhida, renda, convívio, autonomia e apoio."

### 1.2 Proteção Básica e Especial — **[essencial]**
`curso-1/niveis-de-protecao.webp`
> Diagrama em dois blocos. Bloco superior: uma casa comunitária e um grupo de famílias, com um símbolo
> de prevenção. Bloco inferior: um escudo com uma mão protetora. Uma seta fina conecta os dois.
`alt`: "Diagrama com os dois níveis de proteção: básica, preventiva, e especial, para direitos violados."

### 1.3 Os quatro macro objetivos — **[complementar]**
`curso-1/macro-objetivos.webp`
> Quatro quadrantes, cada um com um ícone: dois cuidadores e uma criança de mãos dadas; uma criança
> brincando com blocos; uma lupa sobre um mapa de bairro; uma rede de prédios conectados por linhas.
`alt`: "Quatro ícones representando os macro objetivos: parentalidade, desenvolvimento infantil, vigilância e intersetorialidade."

### 1.4 O Mapa de Processos e Resultados — **[essencial]**
`curso-1/mapa-processos.webp`
> Fluxo horizontal de cinco etapas ligadas por setas, cada etapa com um ícone simples: uma mão
> oferecendo ajuda (atividades); uma casa com coração (produtos); uma visita domiciliar (conteúdo da
> visita); uma balança em equilíbrio (resultados intermediários); uma criança crescendo ao lado de
> uma família (impactos).
`alt`: "Fluxo do Mapa de Processos e Resultados: atividades, produtos, conteúdo da visita, resultados e impactos."

### 1.5 Como a família entra no serviço — **[complementar]**
`curso-1/porta-de-entrada.webp`
> Fluxo da esquerda para a direita: um documento de cadastro (CadÚnico); uma seta; um prédio de
> referência com três pessoas conversando (CRAS/PAIF); uma seta; uma casa com uma família na porta.
`alt`: "Fluxo de entrada da família: CadÚnico, referenciamento no CRAS/PAIF e seleção para o serviço."

### 1.6 Equipe técnica e trabalho relacional — **[complementar]**
`curso-1/equipe-tecnica.webp`
> Três profissionais (uma técnica de referência e dois educadores sociais) em roda, com pranchetas e
> um quadro com post-its, conversando. Ao fundo, um mapa do território na parede.
`alt`: "Equipe técnica reunida em supervisão, com pranchetas e mapa do território ao fundo."

---

## 5. Curso 2 — Primeira Infância e Parentalidade Protetiva

### 2.1 Primeiros mil dias e a primeira infância — **[essencial]**
`curso-2/primeira-infancia.webp`
> Linha do tempo horizontal com marcos: barriga de gestante; bebê engatinhando; criança dando os
> primeiros passos; criança pequena brincando; criança correndo para a escola. Tons suaves da paleta.
`alt`: "Linha do tempo da primeira infância, da gestação aos seis anos."

### 2.2 Domínios do desenvolvimento — **[essencial]**
`curso-2/dominios.webp`
> Quatro ícones: uma criança engatinhando sobre um tapete (motor); uma criança montando um quebra-cabeça (cognitivo);
> duas pessoas conversando com balões de fala em branco, sem letras (linguagem); duas crianças se abraçando (socioemocional).
`alt`: "Quatro ícones dos domínios do desenvolvimento: motor, cognitivo, linguagem e socioemocional."

### 2.3 Escuta do cuidador — **[complementar]**
`curso-2/escuta.webp`
> Um educador social sentado à mesa com uma cuidadora, na sala de casa, em escuta atenta, corpo
> inclinado, prancheta no colo. Uma criança brinca com blocos ao lado.
`alt`: "Educador social em escuta ativa de uma cuidadora, na sala de casa."

### 2.5 Vínculo afetivo entre cuidador e criança — **[essencial]**
`curso-2/vinculo.webp`
> Um adulto segurando um bebê no colo, olhos nos olhos, ambos sorrindo. Luz quente, ambiente doméstico
> simples e acolhedor.
`alt`: "Cuidador segurando um bebê, olhos nos olhos, em interação afetiva."

### 2.6 Ciclo da interação de qualidade — **[essencial]**
`curso-2/interacao-ciclo.webp`
> Círculo com quatro setas em ciclo: um olho (observar); uma orelha (escutar); uma lâmpada (compreender);
> uma mão que responde com carinho (responder). No centro, uma criança pequena.
`alt`: "Ciclo da interação de qualidade: observar, escutar, compreender e responder."

### 2.6 Interação responsiva no cotidiano — **[essencial] · vídeo**
`curso-2/interacao-responsiva.mp4` + capa `.jpg`
> Uma cuidadora trocando fralda de um bebê; o bebê balbucia e ela responde sorrindo e conversando;
> a cuidadora espera e o bebê reage de novo.
`alt/legenda`: "Exemplo de interação responsiva: a cuidadora responde ao balbucio do bebê e espera a reação dele."

### 2.7 Práticas parentais protetivas e não protetivas — **[complementar]**
`curso-2/praticas-parentais.webp`
> Duas colunas. À esquerda, com fundo verde suave: um adulto no chão, na altura da criança, brincando.
> À direita, com fundo vermelho suave, sem violência explícita: um adulto de costas para uma criança
> cabisbaixa, e um celular chamando atenção em vez da criança.
`alt`: "Comparação entre práticas parentais protetivas e não protetivas."

### 2.9 Brincadeira com objetos da casa — **[essencial] · vídeo**
`curso-2/brincar-casa.mp4` + capa `.jpg`
> Mãos de um adulto e de uma criança pequena empilhando potes plásticos e usando uma tampa como
> volante, em cima de uma mesa simples de cozinha.
`alt/legenda`: "Objetos do dia a dia viram brinquedo: potes empilhados e uma tampa usada como volante."

### 2.10 Criança, contexto e equidade — **[essencial]**
`curso-2/equidade.webp`
> Painel com três cenas lado a lado, todas dignas e acolhedoras: uma casa ribeirinha; uma família em
> situação de rua sendo atendida por um profissional; uma criança com cadeira de rodas brincando com
> outra criança.
`alt`: "Três contextos distintos: território ribeirinho, situação de rua e criança com deficiência."

---

## 6. Curso 3 — A Visita Domiciliar na Prática

### 3.1 Chegada e apresentação — **[complementar]**
`curso-3/chegada.webp`
> Um educador social à porta de uma casa simples, com crachá visível e postura respeitosa, sendo
> recebido por uma moradora. Do lado de fora, uma mochila com prancheta.
`alt`: "Educador social sendo recebido na porta da casa da família."

### 3.2 As etapas da visita, passo a passo — **[essencial] · vídeo**
`curso-3/passo-a-passo.mp4` + capa `.jpg`
> Sequência de quatro cenas curtas e contínuas: combinando a visita por telefone; chegando e se
> apresentando; sentando no chão e brincando com a criança; anotando o registro na prancheta.
`alt/legenda`: "Da combinação da visita ao registro: as etapas principais da visita domiciliar."

### 3.4 Objetos da casa como recurso — **[essencial]**
`curso-3/objetos.webp`
> Grade com seis objetos do cotidiano desenhados isoladamente: potes plásticos, tampas, colher de pau,
> caixa de papelão, lençol e uma bola de meia.
`alt`: "Seis objetos do cotidiano que podem ser usados nas atividades da visita."

### 3.5 A visita para a pessoa gestante — **[complementar]**
`curso-3/gestante.webp`
> Uma educadora social conversando com uma gestante sentada no sofá; entre elas, uma caderneta de
> gestante e um copo de água. A educadora aponta para a caderneta.
`alt`: "Educadora social orientando uma gestante sobre o acompanhamento pré-natal."

### 3.6 Antes, durante e depois da visita — **[essencial]**
`curso-3/antes-durante-depois.webp`
> Três blocos ligados por setas: uma mesa com prancheta e plano (antes); uma família e um educador
> brincando no chão (durante); um caderno com anotações e um computador (depois).
`alt`: "Fluxo da visita: planejamento antes, realização durante e registro depois."

### 3.7 Registro da visita — **[complementar]**
`curso-3/registro.webp`
> Uma prancheta com um formulário em branco, com campos representados por linhas cinzas (sem texto),
> uma caneta ao lado e um selo de conferido.
`alt`: "Formulário de registro da visita, com campos a preencher."

---

## 7. Curso 4 — Gestão, Supervisão e Articulação de Rede

### 4.1 Papéis do técnico de referência e do educador — **[essencial]**
`curso-4/papeis.webp`
> Dois retratos lado a lado em círculos: à esquerda, um técnico de referência com prancheta e
> computador; à direita, um educador social com mochila e material lúdico. Entre eles, uma seta dupla.
`alt`: "Comparação entre os papéis do técnico de referência e do educador social."

### 4.3 Reunião de supervisão — **[complementar] · vídeo**
`curso-4/supervisao.mp4` + capa `.jpg`
> Duas pessoas sentadas de frente, com cadernos abertos e um quadro de anotações ao fundo, conversando
> e apontando para o caderno. Uma delas anota.
`alt/legenda`: "Reunião de supervisão entre técnico de referência e educador social."

### 4.4 Plano de Acompanhamento Familiar — **[essencial]**
`curso-4/plano.webp`
> Folha de papel grande em branco com quatro blocos vazios demarcados por linhas e ícones pequenos:
> um coração (vínculos), uma casa (moradia), uma maçã (alimentação) e um lápis (estudo).
`alt`: "Estrutura do plano de acompanhamento familiar, com blocos a preencher."

### 4.6 Articulação da rede — **[essencial]**
`curso-4/rede.webp`
> Mapa de nós conectados por linhas: no centro, uma casa (CRAS), e ao redor unidades representando
> saúde, educação, assistência e cultura, com linhas ligando todos os nós.
`alt`: "Mapa da rede de proteção, com o CRAS no centro conectado aos demais serviços."

### 4.7 Temas relevantes — **[complementar]**
`curso-4/temas.webp`
> Quatro ícones: um cesto e uma rede de pesca (povos e comunidades tradicionais); um escudo com uma
> mão (violência e violação de direitos); uma cadeira de rodas com uma criança (criança com
> deficiência); duas mãos dividindo tarefas domésticas (cuidados e divisão de tarefas).
`alt`: "Quatro ícones dos temas relevantes para as visitas domiciliares."

---

## 8. Depois de gerar

1. **Exporte as imagens em WebP**, com no máximo 1400 px de largura e até ~150 KB cada. Em
   ilustrações, o WebP reduz cerca de 90% em relação ao PNG sem perda visível — e isso pesa muito
   para quem acessa do celular, em campo. Os vídeos vão em MP4 H.264, 720p, até ~5 MB por clipe de 8 s.
2. Nomeie exatamente como indicado acima e coloque em `plataforma/public/midia/curso-N/`.
3. Insira o bloco HTML na unidade correspondente, em `lib/courses/curso-N.mjs`.
4. Rode `npm run build` e confira se as imagens aparecem.
5. Faça o commit e o push — o Pages publica sozinho.

**Limites do GitHub Pages:** arquivos de até **100 MB** (limite rígido) e repositório de ~1 GB. Se os
vídeos passarem disso, hospede no YouTube (não listado) e use `<iframe>` no lugar do `<video>`.
