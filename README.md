# PlatoSearch

> Plataforma educacional para busca e adaptação de textos de Platão para o ensino médio brasileiro.

PlatoSearch democratiza o acesso ao pensamento platônico nas escolas públicas brasileiras. Busca passagens dos diálogos de Platão (com grego original e tradução em inglês) e as adapta para português acessível em três níveis de dificuldade usando IA.

**Status**: MVP concluído com full-stack funcional  
**Stack**: Node.js + TypeScript + Express (backend) | React + TypeScript (frontend)

> [!warning]
> É preciso entender que a aplicação não busca substituir o conhecimento dos livros.  
> O que está aqui é um **convite inicial**.  
> No caso do professor para auxiliar a contextuação de Platão na sala de aula de forma mais facilitada.  
> No caso do aluno, que o aluno tenha uma primeira aproximação aos textos platônicos.  
> **O TEXTO DOS LIVROS É INSUBSTITUÍVEL**.  

---

## Documentação Completa

Toda a documentação está em `docs/`:

| Documento | Conteúdo |
|-----------|----------|
| **[INDEX.md](docs/INDEX.md)** | Dashboard e quick start |
| **[API.md](docs/API.md)** | Documentação REST API completa |
| **[BACKEND.md](docs/BACKEND.md)** | Setup, arquitetura e desenvolvimento do servidor |
| **[FRONTEND.md](docs/FRONTEND.md)** | Componentes React e integração |

---

## Funcionalidades

- **Busca por passagem** — pesquise qualquer diálogo de Platão por referência de Stephanus (ex: `República 7.514a`)
- **Texto grego original** — com tradução em inglês via Perseus Digital Library (Jowett)
- **Adaptação por IA** — reescrita em português em três níveis: iniciante, intermediário e avançado
- **Provedor de LLM intercambiável** — Strategy Pattern permite trocar entre Gemini, Claude, etc.

---

## Quick Start

### Pré-requisitos
- Node.js 18+
- [Google Gemini API key](https://ai.google.dev/)

### Backend
```bash
cd backend && npm install
cp .env.example .env  # Configure GEMINI_API_KEY e ADAPTATION_PROMPT
npm run dev           # Servidor em http://localhost:3000
```

### Frontend
```bash
cd frontend && npm install
npm run dev           # Interface em http://localhost:5173
```

**Para instruções detalhadas**, veja [BACKEND.md](.github/docs/BACKEND.md) e [FRONTEND.md](.github/docs/FRONTEND.md).

---

## API Endpoints

| Endpoint | Método | Descrição |
|----------|--------|-----------|
| `/api/passages/search` | `GET` | Buscar passagem por diálogo e referência |
| `/api/passages/dialogues` | `GET` | Listar diálogos disponíveis |
| `/health` | `GET` | Health check |

**Veja [API.md](.github/docs/API.md) para documentação completa com exemplos.**

---


## Design & Interface

A interface de PlatoSearch é tematizada pela **Grécia Antiga**, refletindo a origem clássica do conhecimento que democratizamos:

- **Paleta de cores primária**: Terra Cota (inspirado em ânforas e cerâmicas gregas)
- **Elementos visuais**: Colunas dóricas, friso geométrico grego (meander), padrões clássicos
- **Linguagem**: Formal, educacional, respeitosa ao contexto filosófico
- **Restrição**: Sem emojis em nenhuma circunstância — apenas ícones e tipografia

Esta escolha visual homenageia a tradição helênica enquanto mantém a acessibilidade pedagógica.

---

## Contribuindo 

Veja [.github/instructions/platosearch.instructions.md](.github/instructions/platosearch.instructions.md) para:
- Requisitos de UI/UX (tema Grécia Antiga, Terra Cota, sem emojis)
- Padrão de commits (Conventional Commits)
- Arquitetura e design patterns
- Checklist para novas features

---

## Stack Tecnológico

| Camada | Tecnologia |
|--------|-----------|
| **Frontend** | React 18 + TypeScript + Vite |
| **Backend** | Node.js + Express + TypeScript |
| **LLM** | Google Gemini (MVP) / Anthropic Claude (futuro) |
| **Textos** | Perseus Digital Library (CTS API) |

---

## Recursos & Fontes

- [Perseus Digital Library](https://www.perseus.tufts.edu/) — Textos gregos e traduções
- [Google Gemini API](https://ai.google.dev/) — Adaptação por IA
- [Conventional Commits](https://www.conventionalcommits.org/) — Padrão de commits

---

## Sobre o Projeto

PlatoSearch é uma **Atividade Extensionista** do curso de Análise e Desenvolvimento de Sistemas (ADS) da [UFRRJ](https://portal.ufrrj.br/), com objetivo de democratizar o acesso ao pensamento platônico nas escolas públicas brasileiras.

---

## Licença

MIT
