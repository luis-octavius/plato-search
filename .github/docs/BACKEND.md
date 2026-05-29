# PlatoSearch Backend Documentation

> API REST para busca e adaptação de textos de Platão

**Tecnologias**: Node.js + Express + TypeScript  
**Versão**: 0.1.0  
**Porta**: 3000 (configurável)

---

## 📋 Índice

- [Inicialização](#inicialização)
- [Configuração](#configuração)
- [Arquitetura](#arquitetura)
- [Serviços](#serviços)
- [Providers](#providers)
- [Desenvolvimento](#desenvolvimento)

---

## Inicialização

### Instalação

```bash
cd backend
npm install
```

### Configuração do Ambiente

```bash
cp .env.example .env
```

Edite `.env` e configure:

```bash
# Obrigatório: Chave API Google Gemini
GEMINI_API_KEY=sk-xxxxx

# Obrigatório: Prompt customizado para adaptação de textos
ADAPTATION_PROMPT="Você é um especialista em filosofia...

# Opcional: Porta do servidor (padrão: 3000)
PORT=3000

# Opcional: Node environment
NODE_ENV=development
```

### Executar Servidor

**Desenvolvimento (hot reload)**:
```bash
npm run dev
```

**Produção (otimizado)**:
```bash
npm run build
npm run start
```

**Type Check**:
```bash
npm run type-check
```

Servidor estará disponível em `http://localhost:3000`.

---

## Configuração

### Variáveis de Ambiente

#### `GEMINI_API_KEY` ⭐ Obrigatório

Chave de API do Google Gemini (https://ai.google.dev/).

```bash
GEMINI_API_KEY=AIzaSyDxxxxx
```

#### `ADAPTATION_PROMPT` ⭐ Obrigatório

Prompt customizado que será usado como `system prompt` para todas as requisições de adaptação de texto.

**Exemplo**:

```bash
ADAPTATION_PROMPT="Você é um especialista em filosofia grega antiga e pedagogia clássica. Sua tarefa é adaptar trechos dos diálogos de Platão para o português moderno e acessível.

Considerações importantes:
- Mantenha a essência filosófica
- Adapte para linguagem clara
- Preserve referências culturais
- Use exemplos contextualizados

Ao adaptar, respeite o nível de dificuldade pedido:
- Iniciante: linguagem simples, explicações básicas
- Intermediário: linguagem clara com termos técnicos
- Avançado: linguagem erudita, análise profunda"
```

**O que faz**: Define como o modelo Gemini interpretará e adaptará os textos de Platão.

#### `PORT` (Opcional)

Porta do servidor Express (padrão: 3000).

```bash
PORT=8080
```

#### `NODE_ENV` (Opcional)

Ambiente de execução: `development` ou `production` (padrão: development).

```bash
NODE_ENV=production
```

---

## Arquitetura

### Estrutura de Pastas

```
backend/src/
├── index.ts                    # Entry point do servidor
├── app.ts                      # Express app configuration
├── controllers/
│   └── passage.controller.ts   # HTTP handlers
├── services/
│   ├── perseus.ts              # Perseus Digital Library integration
│   └── llm/
│       ├── llm.factory.ts      # Provider factory
│       └── gemini.provider.ts  # Google Gemini implementation
├── routes/
│   ├── passages.ts             # Passage endpoints
│   └── index.ts                # Route aggregation
├── middleware/
│   └── error.ts                # Error handling
└── types/
    ├── llm.types.ts            # LLM interface definitions
    ├── adaptation.types.ts     # Adaptation models
    └── index.ts                # Type exports
```

### Fluxo de Requisição

```
1. Request entra em Express
    ↓
2. Router direciona para route handler
    ↓
3. Controller valida e orquestra
    ↓
4. Service busca/adapta dados
    ↓
5. Provider executa ação específica (ex: LLM call)
    ↓
6. Resposta volta através da chain
    ↓
7. JSON é retornado para cliente
```

### Design Patterns

#### Strategy Pattern (LLMProvider)

```typescript
// Contrato
interface LLMProvider {
  adapt(request: LLMRequest): Promise<LLMResponse>;
}

// Implementações
class GeminiProvider implements LLMProvider { /* ... */ }
class AnthropicProvider implements LLMProvider { /* ... */ }

// Factory
const provider = LLMProviderFactory.createProvider('gemini', apiKey, prompt);
```

**Benefício**: Trocar de provedor LLM sem alterar lógica de negócio.

#### Service Layer

```typescript
// PassageController orquestra
// PassageController → PerseusService + LLMProvider
// Lógica isolada, fácil testar e reutilizar
```

---

## Serviços

### PerseusService

Integração com Perseus Digital Library para buscar textos gregos e traduções.

#### Métodos

##### `searchPassage(dialogue: string, stephanus: string): Promise<PassageData>`

Busca uma passagem específica.

```typescript
const passage = await PerseusService.searchPassage('republic', '7.514a');
// Returns:
// {
//   greek: "παιδεία τε ἄρα...",
//   english: "And now let me show...",
//   reference: "República 7.514a"
// }
```

**Parâmetros**:
- `dialogue`: ID do diálogo (ex: `republic`, `apology`, `crito`)
- `stephanus`: Referência Stephanus (ex: `7.514a`, `38b`)

**Returns**: `PassageData` com grego, inglês e referência

**Erros**: Lança exceção se diálogo ou referência não encontrada

---

##### `listDialogues(): Promise<string[]>`

Lista todos os diálogos disponíveis (20 diálogos de Platão).

```typescript
const dialogues = await PerseusService.listDialogues();
// Returns: ['republic', 'apology', 'crito', 'phaedo', ...]
```

---

### LLMProviderFactory

Factory para criar instâncias de providers LLM.

#### Métodos

##### `createProvider(type: string, apiKey: string, adaptationPrompt: string): LLMProvider`

Cria um provider de um tipo específico.

```typescript
const provider = LLMProviderFactory.createProvider(
  'gemini',
  process.env.GEMINI_API_KEY,
  process.env.ADAPTATION_PROMPT
);
```

##### `createDefault(): LLMProvider`

Cria provider padrão usando variáveis de ambiente.

```typescript
const provider = LLMProviderFactory.createDefault();
// Usa GEMINI_API_KEY e ADAPTATION_PROMPT
```

---

## Providers

### GeminiProvider

Implementação do Google Gemini para adaptação de textos.

#### Método Principal

##### `adapt(request: LLMRequest): Promise<LLMResponse>`

Adapta um texto para um nível de dificuldade específico.

```typescript
const request: LLMRequest = {
  text: "παιδεία τε ἄρα...",
  level: 'beginner'
};

const response = await geminiProvider.adapt(request);
// Returns:
// {
//   adapted: "A educação transforma...",
//   provider: "gemini",
//   tokensUsed: 245
// }
```

#### Niveis de Adaptação

- **`beginner`**: Linguagem simples, conceitos básicos
- **`intermediate`**: Linguagem clara com termos técnicos
- **`advanced`**: Linguagem erudita, análise profunda

#### Como Funciona

1. Prepara prompt com instruções específicas do nível
2. Chama Google Gemini API v1beta
3. Processa resposta e estima tokens
4. Retorna texto adaptado

---

## Endpoints HTTP

> Veja [API.md](./API.md) para documentação completa dos endpoints

**Principais**:
- `GET /health` — Health check
- `GET /api/passages/search` — Buscar passagem
- `GET /api/passages/dialogues` — Listar diálogos

---

## Tratamento de Erros

### Middleware de Erros

```typescript
app.use(errorHandler);
app.use(notFoundHandler);
```

### Padrão de Resposta de Erro

```json
{
  "success": false,
  "error": "Dialogue not found",
  "status": 404
}
```

### Códigos de Status Comuns

| Código | Significado |
|--------|-------------|
| 200 | Sucesso |
| 400 | Requisição inválida |
| 404 | Recurso não encontrado |
| 500 | Erro interno do servidor |

---

## Desenvolvimento

### Adicionar Novo Endpoint

1. **Criar Controller** (`src/controllers/new.controller.ts`):

```typescript
export class NewController {
  static async handle(req: Request, res: Response, next: NextFunction) {
    try {
      // Lógica aqui
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }
}
```

2. **Adicionar Route** (`src/routes/new.ts`):

```typescript
export const newRoutes = express.Router();

newRoutes.get('/', NewController.handle);

export default newRoutes;
```

3. **Registrar em Rotas Principais**:

```typescript
// src/routes/index.ts
app.use('/api/new', newRoutes);
```

4. **Commit**:

```bash
git add .
git commit -m "feat(api): add new endpoint"
```

### Adicionar Novo Provider LLM

1. **Criar Provider** (`src/services/llm/anthropic.provider.ts`):

```typescript
import { LLMProvider, LLMRequest, LLMResponse } from '../../types/llm.types';

export class AnthropicProvider implements LLMProvider {
  constructor(private apiKey: string, private adaptationPrompt: string) {}

  async adapt(request: LLMRequest): Promise<LLMResponse> {
    // Implementação Claude
  }
}
```

2. **Atualizar Factory**:

```typescript
// src/services/llm/llm.factory.ts
if (type === 'anthropic') {
  return new AnthropicProvider(apiKey, adaptationPrompt);
}
```

3. **Tipos TypeScript**:

```typescript
// src/types/llm.types.ts
export type LLMProviderType = 'gemini' | 'anthropic';
```

---

## Testes

### Type Check

```bash
npm run type-check
```

Valida tipos TypeScript sem compilar.

### Build

```bash
npm run build
```

Compila TypeScript para JavaScript em `dist/`.

### Desenvolvimento com Hot Reload

```bash
npm run dev
```

Usa `ts-node` para executar direto do TypeScript.

---

## Performance

### Timeout das Requisições

- Perseus Digital Library: ~2-5s
- Google Gemini API: ~8-15s (3 adaptações em paralelo)
- Total esperado: ~10-20s por busca

### Rate Limiting

Sem rate limiting implementado (considere adicionar em produção):

```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use('/api/', limiter);
```

### Caching

Sem cache implementado (considere Redis em produção):

```typescript
// Exemplo com Redis
const cached = await redis.get(`passage:${dialogue}:${stephanus}`);
if (cached) return JSON.parse(cached);
```

---

## Logging

### Middleware de Logging

```typescript
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});
```

### Logs do Servidor

```
[2024-05-15T10:30:45.123Z] Starting PlatoSearch API...
[2024-05-15T10:30:45.456Z] Server listening on port 3000
[2024-05-15T10:30:47.789Z] GET /api/passages/search
```

---

## Deployment

### Build para Produção

```bash
npm run build
```

Gera `dist/` com JavaScript compilado.

### Variáveis em Produção

```bash
NODE_ENV=production
GEMINI_API_KEY=seu_valor_em_prod
ADAPTATION_PROMPT=seu_prompt_em_prod
PORT=3000
```

### Docker (Futuro)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist/ ./dist/
EXPOSE 3000
CMD ["node", "dist/index.js"]
```

---

## Troubleshooting

### Erro: "Cannot find module"

```bash
npm install
npm run build
```

### Erro: "GEMINI_API_KEY is undefined"

Verifique `.env`:

```bash
echo $GEMINI_API_KEY
# Se vazio, configure em .env
```

### Erro: "ADAPTATION_PROMPT is empty"

Configure em `.env` um prompt não-vazio:

```bash
ADAPTATION_PROMPT="Your custom prompt here..."
```

### Porta já em uso

Altere em `.env`:

```bash
PORT=8080
npm run dev
```

### Perseus API lentidão

Perseus pode estar sobrecarregado. Implemente cache:

```typescript
// services/cache.ts
export const passageCache = new Map();
```

---

## Recursos

- [Express.js](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Google Gemini API](https://ai.google.dev/)
- [Perseus Digital Library](https://www.perseus.tufts.edu/)

---

## Próximas Evoluções

- [ ] Rate limiting
- [ ] Redis caching
- [ ] Anthropic Claude provider
- [ ] Unit tests (Jest)
- [ ] API authentication
- [ ] Database (PostgreSQL)
- [ ] Docker deployment
- [ ] CI/CD pipeline

---

**Última atualização**: Maio 2026  
**Versão**: 0.1.0  
**Manutenedor**: PlatoSearch Team
