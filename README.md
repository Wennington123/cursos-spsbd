# Plataforma de Cursos SPSBD-GC — Piloto (GitHub Pages)

Curso autoinstrucional do SPSBD-GC como **site estático** com login Google e progresso salvo,
publicado no **GitHub Pages**. Piloto do Curso 1 (Fundamentos), com 3 unidades.

## Aceite (o que o piloto faz)

1. Home lista as unidades do Curso 1 com estado bloqueado/liberado.
2. Aluno entra com a conta Google.
3. Aluno lê a unidade, responde o quiz e recebe a correção na hora.
4. Progresso persiste entre recargas e dispositivos (Firestore, por conta).
5. A unidade seguinte só libera após concluir a anterior.
6. Ao concluir tudo, o aluno emite um certificado com código; uma página pública confere o código.
7. O site é 100% estático (`output: export`) e publicável no GitHub Pages.

## Limite importante (leia antes de divulgar)

Neste modo **não há funções serverless** (GitHub Pages não as executa). Consequências:

- A correção do quiz acontece **no navegador**, com o gabarito em `lib/answers.mjs` (visível no
  bundle). Um aluno técnico consegue ver as respostas.
- O certificado é um **registro de participação** com código conferível no Firestore — ele prova
  que o código existe e a quem pertence, mas **não prova que a pessoa acertou o quiz**.
- As regras do Firestore garantem apenas o **isolamento entre usuários** (ninguém escreve no
  progresso de outro), não a veracidade da conclusão.

Se certificado com valor institucional for requisito, é preciso hospedar as funções
(Vercel/Cloudflare/Netlify) — foi a versão anterior deste projeto.

## Não-objetivos

- Sem paridade com Moodle (banco de questões, relatórios, turmas, papéis, notificações).
- Sem SCORM/H5P, sem app mobile, sem offline/PWA.
- Sem PDF do certificado (a página é imprimível).

## Arquitetura

- **Next.js 16 (App Router) + React 19** com `output: "export"` → gera `out/` estático.
- **Firebase Auth (Google)** — login no cliente.
- **Firestore** — progresso e certificados, com regras de segurança.
- Sem servidor: tudo roda no navegador.

```
lib/courses.mjs         conteúdo do curso (unidades, objetivos, quiz)
lib/answers.mjs         gabarito (público neste modo — ver limite acima)
lib/course-logic.mjs    lógica pura: correção, desbloqueio, conclusão (testável)
lib/firebaseClient.mjs  Auth + Firestore (progresso e certificados)
firestore.rules         isolamento por usuário; certificado com leitura pública por código
.github/workflows/deploy.yml  build + publicação no GitHub Pages
```

## Setup do Firebase

1. Crie um projeto no [console do Firebase](https://console.firebase.google.com/).
2. **Authentication → Sign-in method** → habilite **Google**.
3. **Authentication → Settings → Authorized domains** → adicione `usuario.github.io`
   (e o domínio próprio, se houver).
4. **Firestore Database** → crie o banco (modo produção) e publique `firestore.rules`.
5. **Configurações do projeto → Seus apps → Web**: copie os valores para `NEXT_PUBLIC_FIREBASE_*`.

## Rodar local

```bash
npm install
npm run test:logic        # lógica pura, sem rede
npm run dev               # http://localhost:3000
npm run build             # gera out/
npm run serve             # serve out/ localmente
```

> Nesta máquina o Node é portátil: use `../.tooling/node-v24.21.0-win-x64`.

## Publicar no GitHub Pages

1. Crie um repositório e suba **o conteúdo desta pasta** na branch `main`.
   (Workflow, `next.config.mjs` e `package.json` assumem que a raiz do repo é esta pasta.)
2. Em **Settings → Pages**, escolha **Source: GitHub Actions**.
3. Em **Settings → Secrets and variables → Actions**, cadastre os quatro segredos
   `NEXT_PUBLIC_FIREBASE_*`.
4. O `deploy.yml` builda e publica `out/` a cada push na `main`.
5. **basePath**: em project pages o workflow define `NEXT_PUBLIC_BASE_PATH=/nome-do-repo`
   automaticamente. Se usar um domínio próprio ou user page (`usuario.github.io`), remova essa
   linha do workflow.
6. O arquivo `public/.nojekyll` já existe, para o Pages não ignorar a pasta `_next`.

## Prova focada

- `npm run test:logic` — 11 testes de correção, desbloqueio e conclusão.
- `npm run build` — gera o site estático em `out/`.
- Servir `out/` e conferir HTTP 200 e o conteúdo das páginas.

Login e Firestore exigem credenciais reais e não são testáveis offline.

## Licença

- **Código** (este repositório): GNU GPL v3 — ver `LICENSE`.
- **Conteúdo dos cursos**: é derivado dos cadernos do SPSBD-GC (Ministério do
  Desenvolvimento e Assistência Social / FMUSP). A GPL-3.0 cobre software, não texto
  educacional — antes de publicar, confirme a licença/autorização de uso do material original e
  escolha a licença do conteúdo separadamente (ex.: CC BY-SA 4.0, como faz o P2PU Course-in-a-Box).
