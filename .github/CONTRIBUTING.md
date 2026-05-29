# Contribuindo para PlatoSearch

Bem-vindo! Este documento descreve como trabalhar neste projeto.

## Configuração Inicial

1. **Clone o repositório**
   ```bash
   git clone <repo>
   cd plato-search
   ```

2. **Leia as convenções**
   ```
   Abra `.github/instructions/platosearch.instructions.md`
   ```

3. **Configure variáveis de ambiente**
   ```bash
   # Backend
   cd backend
   cp .env.example .env
   # Preencha GEMINI_API_KEY e ADAPTATION_PROMPT em .env
   
   # Frontend
   cd ../frontend
   # Configure VITE_API_URL se necessário
   ```

4. **Instale dependências e rode**
   ```bash
   cd ../backend
   npm install && npm run dev
   
   # Em outro terminal
   cd frontend
   npm install && npm run dev
   ```

---

## Workflow de Desenvolvimento

### Antes de Começar
- Confira a issue ou discussão relacionada
- Entenda qual feature/fix você está implementando
- Verifique a arquitetura em `.github/instructions/platosearch.instructions.md`

### Implementando

1. **Crie uma branch** (ex: `feat/search-filters`)
2. **Implemente sua feature/fix** seguindo os padrões do projeto
3. **Teste localmente**
4. **Faça commit** seguindo Conventional Commits (veja abaixo)
5. **Faça push** e abra um Pull Request

### Padrão de Commits

Use **Conventional Commits** para todas as mensagens:

```
<type>(<scope>): <subject>

[body opcional]

[footer opcional]
```

**Tipos permitidos**:
- `feat` — nova funcionalidade
- `fix` — correção de bug
- `refactor` — reorganização sem mudança funcional
- `style` — formatação e linting
- `docs` — documentação
- `test` — testes
- `chore` — dependências, build, CI/CD

**Escopos válidos**:
- `api` — backend, controllers, rotas
- `llm` — LLM providers e abstração
- `perseus` — integração Perseus API
- `ui` — frontend, componentes React
- `types` — tipos TypeScript
- `build` — config e ferramental
- `docs` — documentação
- `test` — testes

**Exemplo**:
```bash
git commit -m "feat(ui): add terra cota color scheme to search panel

- Apply terra cota (#A0522D) as primary color
- Add Greek column pattern to header
- Ensure WCAG AA contrast ratio for accessibility

Closes #42"
```

**❌ Importante**: Seus commits NÃO devem conter "Co-authored by copilot" ou similar.

Para ajuda interativa com commits, use:
```bash
# No chat do Copilot
/conventional-commits
```

---

## Checklist de Feature Completa

Antes de fazer push, verifique:

- [ ] TypeScript compila sem erros (`npm run build`)
- [ ] Sem `any` types (use tipos específicos)
- [ ] Funções têm tipo de retorno explícito
- [ ] Erros são tratados (try-catch, fallbacks)
- [ ] Interface mantém tema Terra Cota + grego antigo
- [ ] Sem emojis na interface
- [ ] Commit segue Conventional Commits
- [ ] README atualizado (se há nova rota/feature pública)
- [ ] `.env.example` atualizado (se há nova variável)

---

## Arquitetura & Padrões

### Backend

**Strategy Pattern para LLM**:
- Toda integração com LLM passa por `LLMProvider` interface
- Implementações concretas: `GeminiProvider`, `AnthropicProvider`
- Controllers injetam provider (ou usam factory)

**Camadas**:
- `controllers/` — HTTP handlers, validação de entrada
- `services/` — Lógica de negócio
- `routes/` — Definição de endpoints
- `types/` — Tipos TypeScript

### Frontend

- `components/` — UI reutilizáveis
- `pages/` — Layouts de página
- `services/` — HTTP client
- `types/` — Tipos TypeScript
- Estilos: Terra Cota, sem emojis

---

## Testes

(A ser definido conforme projeto evolui)

---

## Design & UI

- **Tema**: Grécia Antiga
- **Cor primária**: Terra Cota (`#A0522D` ou similar)
- **Elementos**: Colunas gregas, padrões geométricos (meander)
- **Linguagem**: Formal, educacional
- **Acessibilidade**: WCAG AA, suporte a leitores de tela
- **Restrição**: Sem emojis em lugar nenhum

---

## Perguntas? Dúvidas?

1. Consulte `.github/instructions/platosearch.instructions.md`
2. Use `/code-review-mentorship` para revisão de código
3. Use `/conventional-commits` para ajuda com commits

Boa sorte! 🏛️
