<p align="center"><img width="625" height="863" alt="image" src="https://github.com/user-attachments/assets/4efbdb98-9eb9-47ca-b06b-9f74be7139dd" /></p>

Tetris moderno e educativo para desktop onde cada peça representa um dos 235 serviços oficiais AWS (2026). Blocos exibem ícones AWS sobre cores de categoria com efeito 3D bevel. Ranking competitivo Top 20, com emojis.

**Autor:** [Ary Ribeiro](https://www.linkedin.com/in/aryribeiro)

## Stack

- **Next.js 16** (App Router) + TypeScript (strict)
- **Turso** (libSQL) — ranking Top 20 com emoji + nome
- **Canvas 2D** — renderização do jogo com efeito 3D bevel
- **Vercel** — deploy automático via GitHub
- **235 serviços AWS** mapeados com ícones oficiais 2026

## Features

- Grid 10x20 com fundo branco e logo AWS no topo
- 7 tetrominós clássicos com rotação e wall-kick
- Cada peça mostra o ícone oficial do serviço AWS
- Cores por categoria AWS (Compute, Database, AI, Security, etc.)
- Preview da próxima peça com nome e descrição completa do serviço
- Sistema de níveis (1-10) com velocidade progressiva
- Pontuação com bônus para Tetris (4 linhas simultâneas)
- Ranking Top 20 persistido no Turso com emoji avatar
- Áudio: BGM loop, beep ao travar peça, som de game over
- Botão mute durante o jogo

Obs.: **somente para Computador**

## Controles

| Tecla | Ação |
|-------|------|
| A | Mover esquerda |
| D | Mover direita |
| S | Soft drop (segurar) |
| W | Girar |

## Pontuação

| Linhas | Base | Exemplo (nível 5) |
|--------|------|-------------------|
| 1 | 100 | 500 |
| 2 | 300 | 1.500 |
| 3 | 500 | 2.500 |
| 4 (Tetris) | 1.200 | 6.000 |

- Multiplicado pelo nível atual
- Bônus 1.5x nos níveis 9 e 10
- Nível sobe a cada 10 linhas (máx. 10)

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
