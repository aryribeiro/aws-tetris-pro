# AWS Tetris Pro

Tetris moderno para desktop onde cada peça representa um dos 235 servicos oficiais AWS (2026). Blocos exibem icones AWS sobre cores de categoria com efeito 3D bevel. Ranking competitivo Top 20 com emojis.

**Autor:** [Ary Ribeiro](https://www.linkedin.com/in/aryribeiro)

**Live:** [tetris2026.vercel.app](https://tetris2026.vercel.app/)

## Stack

- **Next.js 16** (App Router) + TypeScript (strict)
- **Turso** (libSQL) — ranking Top 20 com emoji + nome
- **Canvas 2D** — renderizacao do jogo com efeito 3D bevel
- **Vercel** — deploy automatico via GitHub
- **235 servicos AWS** mapeados com icones oficiais (Architecture Icons 07/2025)

## Features

- Grid 10x20 com fundo branco e logo AWS no topo
- 7 tetrominos classicos com rotacao e wall-kick
- Cada peca mostra o icone oficial do servico AWS
- Cores por categoria AWS (Compute, Database, AI, Security, etc.)
- Preview da proxima peca com nome e descricao completa do servico
- Sistema de niveis (1-10) com velocidade progressiva
- Pontuacao com bonus para Tetris (4 linhas simultaneas)
- Ranking Top 20 persistido no Turso com emoji avatar
- Audio: BGM loop, beep ao travar peca, som de game over
- Botao mute durante o jogo
- Favicon com icone EC2 laranja
- Rodape fixo com creditos e aviso "somente para Computador"

## Controles

| Tecla | Acao |
|-------|------|
| A | Mover esquerda |
| D | Mover direita |
| S | Soft drop (segurar) |
| W | Girar |

## Pontuacao

| Linhas | Base | Exemplo (nivel 5) |
|--------|------|-------------------|
| 1 | 100 | 500 |
| 2 | 300 | 1.500 |
| 3 | 500 | 2.500 |
| 4 (Tetris) | 1.200 | 6.000 |

- Multiplicado pelo nivel atual
- Bonus 1.5x nos niveis 9 e 10
- Nivel sobe a cada 10 linhas (max. 10)

## Desenvolvimento local

```bash
npm install
npm run dev
```

Acesse http://localhost:3000

## Variaveis de ambiente

Crie `.env.local` na raiz:

```
TURSO_DATABASE_URL=libsql://seu-banco.turso.io
TURSO_AUTH_TOKEN=seu-token-jwt
```

### Criar banco no Turso

```bash
turso db create aws-tetris-pro
turso db show aws-tetris-pro --url
turso db tokens create aws-tetris-pro
```

## Deploy na Vercel

1. Push para o GitHub
2. Importe o projeto na Vercel
3. Adicione as variaveis de ambiente (`TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN`) no painel da Vercel
4. Deploy automatico

Ou via CLI:

```bash
vercel --prod
```
