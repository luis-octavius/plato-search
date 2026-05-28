# PlatoSearch

> Plataforma educacional para busca e adaptação de textos de Platão para o ensino médio brasileiro.

PlatoSearch é uma aplicação web que permite a professores e estudantes buscar passagens dos diálogos de Platão — com o grego original e tradução em inglês — e adaptá-las para uma linguagem acessível em português, preservando a essência filosófica do argumento.

O projeto nasceu como **Atividade Extensionista** do curso de Análise e Desenvolvimento de Sistemas (ADS) e utiliza IA para democratizar o acesso ao pensamento platônico nas escolas públicas brasileiras.

---

## Funcionalidades

-  **Busca por passagem** — pesquise qualquer diálogo de Platão por referência de Stephanus (ex: `República 514a`)
-  **Grego original** — exibição do texto em grego antigo para referência filológica (opcional)
-  **Tradução em inglês** — tradução de domínio público via Perseus Digital Library (Jowett)
-  **Adaptação por IA** — reescrita em português acessível, em três níveis: iniciante, intermediário e avançado
-  **Provedor de LLM intercambiável** — arquitetura que permite trocar o modelo de IA sem alterar a lógica da aplicação

---

## Estrutura do Projeto

```
platosearch/
├── frontend/                  # React + TypeScript
│   ├── public/
│   ├── src/
│   │   ├── components/        # Componentes reutilizáveis
│   │   ├── pages/             # Páginas da aplicação
│   │   ├── services/          # Chamadas HTTP ao backend
│   │   └── types/             # Tipos TypeScript compartilhados
│   ├── package.json
│   └── tsconfig.json
│
├── backend/                   # Node.js + TypeScript
│   ├── src/
│   │   ├── routes/            # Definição das rotas Express
│   │   ├── controllers/       # Lógica de cada endpoint
│   │   ├── services/
│   │   │   ├── perseus.ts     # Integração com a Perseus API
│   │   │   └── llm/
│   │   │       ├── llm.interface.ts        # Contrato da LLM
│   │   │       ├── gemini.provider.ts      # Implementação Gemini (padrão)
│   │   │       └── anthropic.provider.ts   # Implementação futura (Haiku)
│   │   └── types/
│   ├── package.json
│   └── tsconfig.json
│
├── .gitignore
└── README.md
```

---

##  Como rodar localmente

### Pré-requisitos

- Node.js 18+
- Uma chave de API do [Google Gemini](https://aistudio.google.com/)

### Backend

```bash
cd backend
npm install
cp .env.example .env   # preencha com sua GEMINI_API_KEY
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

---

## API

### `GET /api/passage`

Busca uma passagem na Perseus Digital Library.

| Parâmetro    | Tipo   | Exemplo       |
|--------------|--------|---------------|
| `dialogue`   | string | `republic`    |
| `stephanus`  | string | `7.514a`      |

**Resposta:**
```json
{
  "passage": "...",
  "greek": "...",
  "english": "...",
  "reference": "República 514a"
}
```

---

### `POST /api/adapt`

Adapta uma passagem usando IA.

**Body:**
```json
{
  "text": "...",
  "level": "beginner" | "intermediate" | "advanced"
}
```

**Resposta:**
```json
{
  "adapted": "..."
}
```

---

## Arquitetura da camada de LLM

O backend utiliza o padrão de **Strategy** para a integração com modelos de linguagem. Qualquer provider que implemente a interface `LLMProvider` pode ser injetado sem alterar o restante da aplicação:

```typescript
interface LLMProvider {
  adapt(text: string, level: AdaptationLevel): Promise<string>;
}
```

Para trocar de Gemini para Claude Haiku, basta alterar o provider injetado no controller — o resto da aplicação permanece intacto.

---

## Fontes dos textos

Os textos são servidos pela [Perseus Digital Library](https://scaife.perseus.org/) via CTS API, utilizando o pacote [`plato-texts`](https://github.com/jwkeena/plato-texts). Todas as traduções em inglês são de domínio público (tradução Jowett).

---

## Stack

| Camada     | Tecnologia                          |
|------------|-------------------------------------|
| Frontend   | React 18 + TypeScript + Vite        |
| Backend    | Node.js + TypeScript + Express      |
| LLM (MVP)  | Google Gemini (free tier)           |
| LLM (prod) | Anthropic Claude Haiku 4.5          |
| Textos     | Perseus Digital Library (CTS API)   |
| Deploy     | AWS (backend) + Vercel (frontend)   |

---

## Contexto acadêmico

Este projeto é parte de uma **Atividade Extensionista** do curso de Análise e Desenvolvimento de Sistemas da [UFRRJ](https://portal.ufrrj.br/). O objetivo extensionista é aproximar o pensamento filosófico clássico da realidade das escolas públicas brasileiras, oferecendo uma ferramenta gratuita e acessível a professores de filosofia do ensino médio.

---

## Licença

MIT
