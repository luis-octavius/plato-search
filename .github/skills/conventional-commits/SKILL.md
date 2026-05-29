---
name: conventional-commits
description: 'Create conventional commits for PlatoSearch. Use when: preparing commit messages, ensuring commits follow spec, avoiding "Co-authored by copilot".'
argument-hint: 'Describe the change: what you changed and why'
user-invocable: true
---

# Conventional Commits para PlatoSearch

## Propósito

Guiar a criação de commits seguindo **Conventional Commits** (https://www.conventionalcommits.org/) e garantir que:
- ✅ Mensagens sejam estruturadas e legíveis
- ✅ Commits sejam rastreáveis e automatizáveis (para future CHANGELOG)
- ❌ **Nunca** contenha "Co-authored by copilot"

---

## Formato Obrigatório

```
<type>(<scope>): <subject>

<body>

<footer>
```

### 1️⃣ Type (obrigatório)

Um dos seguintes:

| Type | Uso | Exemplo |
|------|-----|---------|
| `feat` | Nova funcionalidade | `feat(ui): add search filters` |
| `fix` | Correção de bug | `fix(api): handle missing stephanus ref` |
| `refactor` | Reorganização sem mudança funcional | `refactor(llm): extract adapter logic` |
| `style` | Formatação, linting, sem lógica | `style(backend): fix indentation` |
| `docs` | Documentação, README, comentários | `docs: update setup instructions` |
| `test` | Testes, cobertura | `test(perseus): add integration tests` |
| `chore` | Deps, build, CI/CD, ferramental | `chore: upgrade TypeScript to 5.0` |

### 2️⃣ Scope (recomendado)

O **contexto** da mudança. Escopos válidos para PlatoSearch:

```
api       → Backend: rotas, controllers, middleware
llm       → Providers LLM: Gemini, Anthropic, interface
perseus   → Integração Perseus CTS API
ui        → Frontend: componentes React, styles, páginas
types     → Tipos TypeScript compartilhados
build     → Config: tsconfig, webpack, vite, package.json
docs      → Documentação do projeto
test      → Testes e fixtures
```

**Regra**: Se a mudança toca múltiplos escopos, use o principal. Combine com descrição clara.

### 3️⃣ Subject (obrigatório)

- Máximo **50 caracteres**
- Imperativo: "add", não "added" ou "adds"
- Lowercase, sem ponto final
- Sem " Co-authored by" em lugar nenhum

❌ **Errado**:
```
feat(api): Added new search endpoint for passages (Co-authored by copilot)
```

✅ **Correto**:
```
feat(api): add search endpoint for passages
```

### 4️⃣ Body (opcional, mas recomendado para não-triviais)

- Separe do subject com uma linha em branco
- Explique **o quê** e **por quê**, não **como**
- Máximo 72 caracteres por linha
- Use bullets se múltiplos pontos

```
feat(llm): add Anthropic Claude provider

Implement AnthropicProvider class matching LLMProvider interface.
Support Claude 3 models (opus, sonnet, haiku) with configurable
temperature and max_tokens.

Benefits:
- Fallback option if Gemini quota exceeded
- Better cost optimization for production
- Multi-provider flexibility
```

### 5️⃣ Footer (opcional, mas use se houver issue/PR relacionada)

Referência a issues, PRs, breaking changes:

```
feat(api): add language level selection

Add support for beginner/intermediate/advanced adaptation levels.

Closes #15
Relates-to #23
```

---

## Exemplos de Commits Reais

### Exemplo 1: Nova Funcionalidade Simples
```
feat(ui): add greco text display toggle

Users can now hide/show original Greek text in passage view.
```

### Exemplo 2: Bug Fix com Contexto
```
fix(api): handle missing stephanus references gracefully

Perseus API returns 404 if reference format invalid.
Now catch and return user-friendly error instead of 500.
```

### Exemplo 3: Refactor
```
refactor(llm): extract system prompt to constant

Move adaptation prompt logic from provider to separate module
for reusability and easier testing.
```

### Exemplo 4: Chore + Multiple Context
```
chore: upgrade dependencies

- TypeScript 5.0 → 5.1 (frontend & backend)
- Express 4.18 → 4.19
- React 18.2 → 19.0

No breaking changes in our code.
```

---

## Workflow: Do Código ao Commit

1. **Implemente a feature/fix**

2. **Stage suas mudanças**
   ```bash
   git add .
   ```

3. **Determine o tipo**: feat, fix, refactor, docs, etc?

4. **Escolha o escopo**: api, ui, llm, perseus, types, build, test, docs?

5. **Escreva o subject** (imperativo, max 50 chars):
   ```
   feat(api): add passage search by stephanus
   ```

6. **Se não-trivial, adicione body**:
   ```
   Adds new GET /api/passage endpoint accepting dialogue
   and stephanus reference parameters. Returns Greek, English,
   and adapted Portuguese text.
   ```

7. **Commit**:
   ```bash
   git commit -m "feat(api): add passage search by stephanus

   Adds new GET /api/passage endpoint..."
   ```

8. **Verify**: Garanta que a mensagem **NÃO contém** "Co-authored by copilot"

---

## Checklist Antes de Fazer Push

- [ ] `type` é um dos permitidos?
- [ ] `scope` está na lista válida (ou `api`, `ui`, `llm`, `perseus`, `types`, `build`, `docs`, `test`)?
- [ ] `subject` em imperativo (add, remove, fix, não added/removed)?
- [ ] `subject` tem max 50 caracteres?
- [ ] Sem ponto final no subject?
- [ ] Sem "Co-authored by copilot" ou similar em lugar nenhum?
- [ ] Body (se presente) explica **por quê**, não **como**?
- [ ] Footer referencia issue se aplicável?

---

## Convenção Geral

Quando você fazer um commit:

```bash
git commit -m "type(scope): subject

body (se necessário)

footer (se necessário)"
```

**Result**:
- Commits legíveis e estruturados
- Fácil para gerar CHANGELOG futuro
- Rastreabilidade clara
- Sem poluição "Co-authored by"

---

## Recursos

- Spec completo: https://www.conventionalcommits.org/
- Exemplos reais: https://github.com/angular/angular/commits/main
