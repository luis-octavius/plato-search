# Referência Rápida — PlatoSearch

Guia de referência rápida para as principais convenções e workflows do projeto.

---

## 📖 Documentação Principal

| Documento | Propósito |
|-----------|-----------|
| [README.md](/README.md) | Visão geral, funcionalidades, stack |
| [.github/CONTRIBUTING.md](.github/CONTRIBUTING.md) | Como contribuir, workflow, checklist |
| [.github/instructions/platosearch.instructions.md](.github/instructions/platosearch.instructions.md) | Requisitos completos, arquitetura, variáveis de ambiente |
| [.env.example](.env.example) | Template de variáveis (backend) |

---

## 🎨 Design & UI

```
Tema:     Grécia Antiga
Cor:      Terra Cota (#A0522D ou similar)
Elementos: Colunas gregas, padrões geométricos
Linguagem: Formal, educacional, sem emojis
```

**Verificação rápida**:
- [ ] Sem emojis?
- [ ] Cores alinhadas com Terra Cota?
- [ ] Tipografia apropriada (formal)?
- [ ] Colunas/padrões gregos presentes?

---

## 📝 Commits (Conventional Commits)

### Formato
```
<type>(<scope>): <subject>

[body opcional]
[footer opcional]
```

### Tipos
```
feat      | nova funcionalidade
fix       | correção de bug
refactor  | reorganização sem mudança funcional
style     | formatação, linting
docs      | documentação
test      | testes
chore     | deps, build, CI/CD
```

### Escopos
```
api       | backend, controllers, rotas
llm       | LLM providers, abstração
perseus   | integração Perseus API
ui        | frontend, React
types     | tipos TypeScript
build     | config, ferramental
docs      | documentação
test      | testes
```

### Exemplo
```bash
git commit -m "feat(ui): add terra cota color palette

- Apply terra cota as primary color
- Add Greek column decorations to header
- Ensure WCAG AA contrast

Closes #42"
```

**❌ Proibido**: "Co-authored by copilot"

---

## 🛠️ Skills Disponíveis

### `/code-review-mentorship`
Workflow de revisão de código sênior. Use quando:
- Quer feedback no código antes de fazer push
- Precisa entender melhorias sem reescrever tudo
- Está revisando TypeScript/Node.js

### `/conventional-commits`
Guia interativo para commits. Use quando:
- Precisa escrever uma mensagem de commit
- Quer verificar se seu commit segue o padrão
- Tem dúvida sobre tipo/escopo

---

## 🏗️ Arquitetura em 30 Segundos

### Backend
```
Controllers (HTTP handlers)
    ↓
Services (business logic)
    ├── PerseusService (busca textos)
    └── LLMProvider (Strategy Pattern)
         ├── GeminiProvider
         └── AnthropicProvider (futuro)
```

### Frontend
```
Pages (layouts)
    ↓
Components (UI reutilizáveis)
    ↓
Services (HTTP client)
```

---

## 🔑 Variáveis de Ambiente

### Backend (`.env`)
```
GEMINI_API_KEY         # Chave da API Google Gemini
ADAPTATION_PROMPT      # Seu prompt customizado para adaptações
ANTHROPIC_API_KEY      # (Futuro) Chave Anthropic
```

### Frontend (`.env`)
```
VITE_API_URL           # URL do backend (ex: http://localhost:3000/api)
```

---

## ✅ Checklist de Feature Completa

```
Implementação:
  [ ] TypeScript compila sem erros
  [ ] Sem `any` types
  [ ] Funções com tipo de retorno explícito
  [ ] Erros tratados (try-catch, fallbacks)

Interface:
  [ ] Tema Terra Cota + grego antigo aplicado
  [ ] Sem emojis
  [ ] WCAG AA (accessibility)

Versionamento:
  [ ] Commit segue Conventional Commits
  [ ] Sem "Co-authored by copilot"
  [ ] README atualizado (se necessário)
  [ ] .env.example atualizado (se necessário)
```

---

## 🚀 Quick Start

```bash
# 1. Setup backend
cd backend
npm install
cp .env.example .env
# → Preencha GEMINI_API_KEY e ADAPTATION_PROMPT
npm run dev

# 2. Setup frontend (novo terminal)
cd frontend
npm install
npm run dev

# 3. Abra em navegador
http://localhost:5173
```

---

## 📚 Recursos Externos

- **Conventional Commits**: https://www.conventionalcommits.org/
- **TypeScript Handbook**: https://www.typescriptlang.org/docs/
- **Strategy Pattern**: https://refactoring.guru/design-patterns/strategy
- **Perseus Digital Library**: https://www.perseus.tufts.edu/hopper/
- **WCAG Accessibility**: https://www.w3.org/WAI/WCAG21/quickref/

---

## 💬 Workflow de Ajuda

| Situação | Comando |
|----------|---------|
| Revisão de código | `/code-review-mentorship` |
| Criação de commit | `/conventional-commits` |
| Dúvida de arquitetura | Consulte `platosearch.instructions.md` |
| Como contribuir | Consulte `.github/CONTRIBUTING.md` |

---

**Última atualização**: Maio 2026
