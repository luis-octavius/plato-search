---
name: platosearch-requirements
description: 'PlatoSearch project requirements. Use for: UI/UX design decisions, commit messages, code organization, architectural questions.'
applyTo: '**'
---

# PlatoSearch — Requisitos de Projeto

## 📋 Sobre o Projeto

**PlatoSearch** é uma plataforma educacional que democratiza o acesso ao pensamento platônico nas escolas públicas brasileiras. Busca passagens dos diálogos de Platão (via Perseus Digital Library) e as adapta para português acessível em três níveis (iniciante, intermediário, avançado) usando IA.

**Stack**: Node.js + TypeScript + Express (backend) | React + TypeScript (frontend)

**Padrões Arquiteturais**:
- Strategy Pattern: Abstração de LLM Provider para trocar modelos sem alterar lógica
- Service Layer: Lógica de negócio isolada de rotas/controllers
- Type-first: TypeScript strict mode

---

## 🎨 Requisitos de Interface & Design

### Visual Identity
- **Tema**: Grécia Antiga — inspirado em arquitetura e design clássicos
- **Cor primária**: Terra Cota (sólido, acessível, reminiscente de ânforas gregas)
- **Elementos visuais**: Colunas gregas, friso, padrões geométricos gregos (meander)
- **Typography**: Sem serifas é aceitável, mas considere fontes que remetem à classicidade

### Restrições Obrigatórias
- ❌ **Sem emojis** em nenhum lugar da interface
- ✅ Ícones: Usar SVG ou ícone sem expressão emocional (ex: lupas, livros, colunas)
- ✅ Linguagem: Formal, educacional, respeitosa ao contexto filosófico

### Accessibility
- Contraste adequado (WCAG AA mínimo)
- Suporte para leitores de tela
- Navegação por teclado

---

## 💾 Variáveis de Ambiente

### Backend (`.env`)

```
# Chave de API Google Gemini (padrão) ou outro provedor
GEMINI_API_KEY=seu_valor_aqui

# Prompt customizado para adaptação de textos
# Este prompt será usado como system prompt no LLMProvider
ADAPTATION_PROMPT=seu_prompt_customizado_aqui

# Opcional: Chave Anthropic para futuro suporte
ANTHROPIC_API_KEY=seu_valor_aqui
```

**Importante**: O `ADAPTATION_PROMPT` é único para seu projeto. Você o define e controla. O código apenas o consome via `process.env.ADAPTATION_PROMPT`.

### Frontend (`.env`)

```
VITE_API_URL=http://localhost:3000/api
```

---

## 📝 Padrão de Commits

**Siga Conventional Commits** conforme descrito na skill `/conventional-commits`.

Formato obrigatório:
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Tipos permitidos**:
- `feat`: nova funcionalidade
- `fix`: correção de bug
- `refactor`: reorganização sem mudança funcional
- `style`: formatação, sem alteração lógica
- `docs`: documentação
- `test`: testes
- `chore`: dependências, build, CI/CD

**Escopos** (contexts do projeto):
- `api`: backend, rotas, controllers
- `llm`: LLM providers, abstração
- `perseus`: integração Perseus CTS API
- `ui`: interface, componentes React
- `types`: tipos TypeScript compartilhados
- `build`: config webpack, tsconfig, etc

**Exemplo**:
```
feat(llm): add Anthropic Claude provider

Implement AnthropicProvider implementing LLMProvider interface.
Add support for Claude 3 models as alternative to Gemini.

Relates-to: #42
```

**❌ Proibido**:
- Commits com "Co-authored by copilot" — **não deve aparecer**
- Mensagens genéricas ("fix stuff", "updates")
- Scopes incorretos fora da lista

---

## 🏗️ Arquitetura

### Backend (`backend/src/`)

```
controllers/       → Handlers HTTP, validação de entrada
services/
  ├── perseus.ts           → Integração Perseus Digital Library
  ├── llm/
  │   ├── llm.interface.ts → Contrato: LLMProvider, LLMRequest, LLMResponse
  │   ├── gemini.provider.ts
  │   └── anthropic.provider.ts → Futuro
routes/           → Definição de endpoints Express
types/            → Tipos TypeScript compartilhados
middleware/       → Error handling, logging, auth (se houver)
```

**Princípio**: Controllers chamam Services. Services são independentes. LLM é injetado por Dependency Injection ou factory.

### Frontend (`frontend/src/`)

```
components/       → UI reutilizáveis (SearchBar, PassageDisplay, etc)
pages/            → Layouts de página
services/         → HTTP client (fetch/axios calls)
types/            → Tipos TypeScript
styles/           → CSS/Tailwind (tema terra cota)
```

---

## 🔄 Fluxo Típico: Busca e Adaptação

1. **User Input**: Usuário digita diálogo + referência Stephanus (ex: `República 7.514a`)
2. **Frontend**: Valida entrada, chama `GET /api/passage?dialogue=republic&stephanus=7.514a`
3. **Backend**:
   - `PassageController` recebe requisição
   - Chama `PerseusService.searchPassage()` → obtém grego + inglês (JowettTranslation)
   - Chama `LLMProvider.adapt(passage, level)` → adaptação em português
   - Retorna JSON: `{ reference, greek, english, adaptations: { beginner, intermediate, advanced } }`
4. **Frontend**: Exibe passagem com abas para níveis de adaptação
5. **UI Render**: Terra Cota, colunas, sem emojis ✨

---

## ✅ Checklist para Novas Features

- [ ] Feature segue Strategy Pattern se envolve LLM?
- [ ] Tipos TypeScript definidos (sem `any`)?
- [ ] Mensagens de erro informativas?
- [ ] Suporta os três níveis de adaptação (iniciante, intermediário, avançado)?
- [ ] Interface mantém tema grego antigo (Terra Cota, sem emojis)?
- [ ] Commit segue Conventional Commits com escopo correto?
- [ ] README atualizado se há nova rota ou feature pública?
- [ ] `.env.example` atualizado se há nova variável?

---

## 📚 Recursos

- **Perseus Digital Library**: https://www.perseus.tufts.edu/hopper/
- **Conventional Commits**: https://www.conventionalcommits.org/
- **TypeScript Handbook**: https://www.typescriptlang.org/docs/
- **Strategy Pattern**: https://refactoring.guru/design-patterns/strategy

---

## 🚀 Próximas Evoluções

Conforme o projeto avança, este arquivo será atualizado com:
- Temas de cor expandidos (ouro antigo, mármore)
- Requisitos de autenticação (se necessário)
- Padrão de testes (Jest, Vitest)
- Deploy e CI/CD
