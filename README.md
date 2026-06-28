# AWS Tetris Pro

Tetris moderno para desktop onde cada peça representa um dos 235 serviços oficiais AWS (2026). Blocos exibem ícones AWS sobre cores de categoria com efeito 3D.

## Stack

- **Next.js 16** (App Router) + TypeScript (strict)
- **Turso** (libSQL) — ranking Top 20
- **Canvas 2D** — renderização do jogo
- **Vercel** — deploy

## Desenvolvimento local

```bash
npm install
npm run dev
```

Acesse http://localhost:3000

## Variáveis de ambiente

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
3. Adicione as variáveis de ambiente (`TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN`) no painel da Vercel
4. Deploy automático

Ou via CLI:

```bash
vercel --prod
```

## Controles

| Tecla | Ação |
|-------|------|
| A | Mover esquerda |
| D | Mover direita |
| S | Soft drop (segurar) |
| W | Girar |

## Pontuação

- Linhas simultâneas: 1=100, 2=300, 3=500, 4=800
- Multiplicado pelo nível atual
- Bônus 1.5x nos níveis 9 e 10
- Nível sobe a cada 10 linhas (máx. 10)
