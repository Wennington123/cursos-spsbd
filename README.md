# Plataforma de Cursos SPSBD-GC

Site estático (Next.js `output: export`) com login Google e progresso no Firestore, publicado no
GitHub Pages. Quatro cursos autoinstrucionais derivados dos cadernos do **Serviço de Proteção Social
Básica no Domicílio para Gestantes e Crianças de 0 a 6 anos (SPSBD-GC)**.

## Cursos

| Curso | Slug | Público | Carga | Unidades |
|-------|------|---------|-------|----------|
| 1. Fundamentos do SPSBD-GC | `fundamentos` | Todos | ~4h | 6 |
| 2. Primeira Infância e Parentalidade Protetiva | `primeira-infancia` | Educadores (núcleo) | ~8h | 10 |
| 3. A Visita Domiciliar na Prática | `visita-domiciliar` | Educadores (núcleo) | ~7h | 8 |
| 4. Gestão, Supervisão e Articulação de Rede | `gestao-e-supervisao` | Técnicos(as) de Referência | ~6h | 7 |

Total: **31 unidades**. Os cursos são independentes entre si; recomenda-se começar pelo Curso 1.

## Aceite (o que a plataforma faz)

1. A home lista os 4 cursos com o progresso de cada um.
2. O aluno entra com a conta Google.
3. Em cada unidade, o aluno lê o conteúdo e responde 3 questões, com correção imediata.
4. O progresso persiste entre recargas e dispositivos (Firestore, por conta).
5. A unidade seguinte só libera após concluir a anterior; a primeira de cada curso é livre.
6. Ao concluir todas as unidades de um curso, o aluno emite um certificado com código de verificação,
   conferível na página pública `/verificar/`.
7. O site é 100% estático e publicável no GitHub Pages.

## Limite importante (leia antes de divulgar)

Não há funções serverless (GitHub Pages não as executa). Portanto:

- A correção do quiz acontece **no navegador**: o gabarito vive em `lib/courses/*.mjs` e é visível no
  bundle. Um aluno técnico consegue ver as respostas.
- O certificado é um **registro de participação** com código conferível no Firestore — prova que o
  registro existe e a quem pertence, mas **não prova que a pessoa acertou o quiz**.
- As regras do Firestore garantem apenas o **isolamento entre usuários** (ninguém escreve no
  progresso de outro), não a veracidade da conclusão.

Se certificado com valor institucional for requisito, é preciso hospedar as funções
(Vercel/Cloudflare/Netlify) e validar no servidor.

## Arquitetura

```
app/
  page.js                          catálogo dos 4 cursos
  curso/[course]/page.js           visão do curso (lista de unidades)
  curso/[course]/[unit]/page.js    unidade + avaliação
  curso/[course]/certificado/      emissão do certificado
  verificar/                       conferência pública por código
  components/                      componentes de cliente (auth, progresso, quiz)
  globals.css                      identidade visual
lib/
  courses.mjs                      agrega os cursos e helpers de busca
  courses/curso-1..4.mjs           conteúdo (unidades, quiz, gabarito)
  course-logic.mjs                 lógica pura: correção, desbloqueio, conclusão
  firebaseClient.mjs               Auth + Firestore
  asset.mjs                        prefixo de caminho para o basePath
public/logos/                      logos institucionais
firestore.rules                    isolamento por usuário
.github/workflows/deploy.yml       build + publicação no GitHub Pages
```

Progresso é gravado em `progress/{uid}`, com chaves de unidade no formato `slug-do-curso/id-da-unidade`
(ex.: `fundamentos/1.1`), e os certificados em `certificates/{CODIGO}`.

## Identidade visual

Paleta derivada das logos institucionais (SPSBD-GC, CRAS e Secretaria de Assistência Social):
azul-marinho escuro para texto, com acentos em azul, verde, amarelo, laranja, vermelho, magenta e
roxo. O cabeçalho exibe a logo do SPSBD-GC e uma faixa colorida; o rodapé traz CRAS e a Secretaria.

## Mídia das unidades

Imagens e vídeos ficam em `public/midia/curso-N/` e são referenciados no conteúdo com o marcador
`{{media}}`, que respeita o `basePath` do GitHub Pages:

```html
<figure class="media">
  <img src="{{media}}/curso-1/segurancas.webp" alt="Descrição da imagem" />
  <figcaption>Legenda.</figcaption>
</figure>
```

Sugestões de imagens e vídeos por unidade, com prompts para geração: **`docs/midia.md`**.

## Setup do Firebase

1. Crie um projeto no [console do Firebase](https://console.firebase.google.com/).
2. **Authentication → Sign-in method** → habilite **Google**.
3. **Authentication → Settings → Authorized domains** → adicione `SEU-USUARIO.github.io` (e o domínio
   próprio, se houver).
4. **Firestore Database** → crie o banco (produção) e publique `firestore.rules`.
5. **Configurações do projeto → Seus apps → Web**: copie os valores para `NEXT_PUBLIC_FIREBASE_*`.
6. Publique a tela de consentimento (Google Cloud → Google Auth Platform → Audience → Publish app).

## Rodar local

```bash
npm install
npm run test:logic        # lógica pura, sem rede
npm run dev               # http://localhost:3000
npm run build             # gera out/
npm run serve             # serve out/ localmente
```

## Publicar no GitHub Pages

1. Suba o conteúdo desta pasta na branch `main` de um repositório público.
2. **Settings → Pages → Source: GitHub Actions**.
3. Em **Settings → Secrets and variables → Actions → Variables**, cadastre as quatro variáveis
   `NEXT_PUBLIC_FIREBASE_*` (são valores públicos).
4. O `deploy.yml` builda e publica `out/` a cada push na `main`.
5. **basePath**: em project pages o workflow define `NEXT_PUBLIC_BASE_PATH=/nome-do-repo`
   automaticamente. Em user page (`usuario.github.io`) ou domínio próprio, remova essa linha.
6. `public/.nojekyll` já existe, para o Pages não ignorar a pasta `_next`.

## Prova focada

- `npm run test:logic` — valida estrutura dos cursos, gabaritos, correção, desbloqueio, conclusão e
  isolamento de progresso por curso.
- `npm run build` — gera o site estático em `out/`.
- Servir `out/` e conferir HTTP 200 e o conteúdo das páginas.

Login e Firestore exigem credenciais reais e não são testáveis offline.

## Licença

- **Código** (este repositório): GNU GPL v3 — ver `LICENSE`.
- **Conteúdo dos cursos**: derivado dos cadernos do SPSBD-GC (Ministério do Desenvolvimento e
  Assistência Social / FMUSP). A GPL-3.0 cobre software, não texto educacional — antes de publicar,
  confirme a licença/autorização de uso do material original e escolha a licença do conteúdo
  separadamente (ex.: CC BY-SA 4.0).
