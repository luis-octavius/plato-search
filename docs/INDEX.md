# Documentação PlatoSearch

Bem-vindo à documentação completa do PlatoSearch. Este diretório contém guias para desenvolvedores, documentação da API e recursos de uso.

---

## Documentação por Seção

### Backend

- **[BACKEND.md](./BACKEND.md)** — Guia de desenvolvimento e configuração do servidor
  - Setup inicial e instalação
  - Variáveis de ambiente
  - Arquitetura e design patterns
  - Serviços e providers
  - Como adicionar novos endpoints
  - Deployment e troubleshooting

- **[API.md](./API.md)** — Documentação REST da API backend
  - Todos os endpoints
  - Parâmetros e respostas
  - Códigos de status
  - Exemplos de uso (cURL, JavaScript, Python)
  - Configuração de variáveis de ambiente
  - Tratamento de erros

### Frontend

- **[FRONTEND.md](./FRONTEND.md)** — Documentação dos componentes React
  - Estrutura do projeto
  - Componentes disponíveis
  - Serviços HTTP (ApiClient)
  - Tipos TypeScript
  - Como usar cada componente
  - Guia de desenvolvimento
  - Temas e estilos
  - Troubleshooting

## 🚀 Quick Start

### Backend

```bash
cd backend
npm install
cp .env.example .env
# Preencha GEMINI_API_KEY e ADAPTATION_PROMPT em .env
npm run dev
# Servidor em http://localhost:3000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
# Interface em http://localhost:5173
```

---

## 📡 API Endpoints Principais

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/api/passages/search?dialogue=republic&stephanus=7.514a` | Buscar passagem |
| `GET` | `/api/passages/dialogues` | Listar diálogos |
| `GET` | `/health` | Health check |

Veja [API.md](./API.md) para documentação completa.

---

## 🎨 Componentes Principais

| Componente | Localização | Propósito |
|------------|-------------|----------|
| `SearchBar` | `frontend/src/components/SearchBar.tsx` | Barra de busca com dropdown |
| `PassageDisplay` | `frontend/src/components/PassageDisplay.tsx` | Exibição de passagem |
| `LoadingSpinner` | `frontend/src/components/LoadingSpinner.tsx` | Indicador de carregamento |
| `ErrorAlert` | `frontend/src/components/ErrorAlert.tsx` | Exibição de erros |

Veja [FRONTEND.md](./FRONTEND.md) para documentação de componentes.

---

## Stack Tecnológico

### Backend
- Node.js 18+
- TypeScript 5
- Express 4
- Google Gemini API
- Perseus Digital Library CTS API

### Frontend
- React 18
- TypeScript 5
- Vite 5
- CSS Modules
- Terra Cota theme

---

## Estrutura de Pastas

```
plato-search/
├── .github/
│   ├── docs/              ← Você está aqui
│   │   ├── API.md
│   │   ├── FRONTEND.md
│   │   └── INDEX.md
│   ├── instructions/
│   │   └── platosearch.instructions.md
│   ├── skills/
│   │   └── conventional-commits/
│   ├── CONTRIBUTING.md
│   ├── QUICK-REFERENCE.md
│   └── AGENTS.md
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── types/
│   │   ├── app.ts
│   │   └── index.ts
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── types/
│   │   ├── styles/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
│
├── .env.example
└── README.md
```

---

## Fluxo da Aplicação

```
Frontend (React)
    ↓
SearchBar (user input)
    ↓
ApiClient.searchPassage()
    ↓
Backend (Express)
    ↓
PassageController
    ↓
PerseusService (busca textos)
    ↓
LLMProvider (Gemini)
    ↓
3 adaptações em paralelo
    ↓
Resposta JSON
    ↓
PassageDisplay (renderiza resultado)
```

---

## Variáveis de Ambiente

### Backend (.env)

```bash
GEMINI_API_KEY=seu_valor_aqui
ADAPTATION_PROMPT=seu_prompt_customizado_aqui
PORT=3000
NODE_ENV=development
```

### Frontend (.env)

```bash
VITE_API_URL=http://localhost:3000/api
```

---

## Checklist de Setup

- [ ] Node.js 18+ instalado
- [ ] Git configurado
- [ ] Backend clonado
- [ ] Frontend clonado
- [ ] `.env` preenchido (backend)
- [ ] `npm install` em ambas pastas
- [ ] Backend rodando (`npm run dev`)
- [ ] Frontend rodando (`npm run dev`)
- [ ] Acessar http://localhost:5173

---

## Troubleshooting

### Backend não inicia
- Verifique Node.js: `node --version`
- Verifique `.env`: tem `GEMINI_API_KEY`?
- Veja logs: `npm run dev`

### Frontend não carrega
- Vite está rodando? `npm run dev`
- Backend está rodando? `curl http://localhost:3000/health`
- Porta 5173 está livre?

### API retorna erro 500
- Check `GEMINI_API_KEY` válida
- Perseus Digital Library está online?
- Verifique `ADAPTATION_PROMPT` está preenchido

---

## Suporte

Para dúvidas ou problemas:

1. Consulte a documentação relevante:
   - API → [API.md](./API.md)
   - Frontend → [FRONTEND.md](./FRONTEND.md)
   - Projeto → [platosearch.instructions.md](../.github/instructions/platosearch.instructions.md)

2. Use as skills disponíveis:
   - `/code-review-mentorship` — Revisão de código
   - `/conventional-commits` — Ajuda com commits

3. Verifique `.github/QUICK-REFERENCE.md` para referência rápida

---

##  Sobre o Projeto

**PlatoSearch** é uma plataforma educacional que democratiza o acesso ao pensamento platônico nas escolas públicas brasileiras. 

- Busca passagens nos diálogos de Platão
- Exibe texto original em grego
- Tradução em inglês (Jowett)
- Adaptações em português em 3 níveis de dificuldade

**Stack**: Node.js + TypeScript + Express (backend) | React + TypeScript (frontend)

**License**: MIT

---

**Última atualização**: Maio 2026  
**Versão**: 0.1.0  
**Status**: Em desenvolvimento
