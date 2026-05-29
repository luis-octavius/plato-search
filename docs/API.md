# PlatoSearch Backend API Documentation

> REST API para busca e adaptação de textos de Platão

**Base URL**: `http://localhost:3000/api`  
**Versão**: 0.1.0  
**Status**: Em desenvolvimento

---

## Índice

- [Health Check](#health-check)
- [Endpoints](#endpoints)
  - [GET /passages/search](#get-passagessearch)
  - [GET /passages/dialogues](#get-passagesdialogues)
- [Modelos de Dados](#modelos-de-dados)
- [Códigos de Status](#códigos-de-status)
- [Exemplos de Uso](#exemplos-de-uso)

---

## Health Check

Verifique se o servidor está ativo:

### Requisição

```
GET /health
```

### Resposta (200 OK)

```json
{
  "status": "ok",
  "timestamp": "2026-05-29T15:30:00.000Z"
}
```

---

## Endpoints

### GET /passages/search

Busca uma passagem de Platão por diálogo e referência Stephanus, retornando o texto em grego, inglês e três níveis de adaptação em português.

#### Parâmetros (Query)

| Parâmetro | Tipo | Obrigatório | Descrição | Exemplo |
|-----------|------|-------------|-----------|---------|
| `dialogue` | string | Sim | Nome do diálogo de Platão (lowercase) | `republic` |
| `stephanus` | string | Sim | Referência Stephanus (formato: número.número[letra]) | `7.514a` |

#### Diálogos Disponíveis

```
apology, crito, euthyphro, gorgias, hippias_major, hippias_minor,
ion, laches, lysis, meno, phaedo, phaedrus, philebus, protagoras,
republic, sophist, statesman, symposium, theaetetus, timaeus
```

#### Resposta (200 OK)

```json
{
  "success": true,
  "data": {
    "reference": "República 7.514a",
    "greek": "παιδεία τε ἄρα ἡ τούτων ἡμῖν αὔξησίς τε...",
    "english": "And now let me show in a figure how far our nature is enlightened or unenlightened...",
    "adaptations": {
      "beginner": "Platão compara o conhecimento com pessoas em uma caverna...",
      "intermediate": "A República apresenta a alegoria da caverna para descrever estados de conhecimento...",
      "advanced": "Na República VII, Platão utiliza a metáfora da caverna para ilustrar a progressão epistemológica..."
    }
  }
}
```

#### Resposta de Erro (400 Bad Request)

```json
{
  "success": false,
  "error": "Missing required parameters: dialogue and stephanus"
}
```

#### Resposta de Erro (404 Not Found)

```json
{
  "success": false,
  "error": "Unknown dialogue: republica. Valid options: apology, crito, euthyphro, ..."
}
```

#### Resposta de Erro (500 Internal Server Error)

```json
{
  "success": false,
  "error": "Perseus search error: Passage not found: urn:cts:greekLit:tlg0030.tlg025:7.514a",
  "statusCode": 500
}
```

---

### GET /passages/dialogues

Lista todos os diálogos de Platão disponíveis na coleção Perseus.

#### Requisição

```
GET /api/passages/dialogues
```

#### Resposta (200 OK)

```json
{
  "success": true,
  "data": {
    "dialogues": [
      "apology",
      "crito",
      "euthyphro",
      "gorgias",
      "hippias_major",
      "hippias_minor",
      "ion",
      "laches",
      "lysis",
      "meno",
      "phaedo",
      "phaedrus",
      "philebus",
      "protagoras",
      "republic",
      "sophist",
      "statesman",
      "symposium",
      "theaetetus",
      "timaeus"
    ],
    "count": 20
  }
}
```

---

## Modelos de Dados

### PassageResponse

Resposta de uma busca de passagem bem-sucedida.

```typescript
interface PassageResponse {
  success: boolean;
  data?: {
    reference: string;           // e.g., "República 514a"
    greek: string;               // Texto original em grego
    english: string;             // Tradução Jowett em inglês
    adaptations: {
      beginner: string;          // Nível iniciante (5º ano escolar)
      intermediate: string;      // Nível intermediário (ensino médio)
      advanced: string;          // Nível avançado (college/universidade)
    };
  };
  error?: string;
}
```

### DialoguesResponse

Resposta da listagem de diálogos.

```typescript
interface DialoguesResponse {
  success: boolean;
  data?: {
    dialogues: string[];
    count: number;
  };
  error?: string;
}
```

### AdaptationLevel

Níveis de adaptação disponíveis.

```typescript
type AdaptationLevel = 'beginner' | 'intermediate' | 'advanced';
```

---

## Códigos de Status

| Status | Significado | Descrição |
|--------|-------------|-----------|
| 200 | OK | Requisição bem-sucedida |
| 400 | Bad Request | Parâmetros inválidos ou faltantes |
| 404 | Not Found | Rota ou recurso não encontrado |
| 500 | Internal Server Error | Erro no servidor ou em serviços externos (Perseus, LLM) |

---

## Exemplos de Uso

### cURL

#### Buscar uma passagem

```bash
curl -X GET "http://localhost:3000/api/passages/search?dialogue=republic&stephanus=7.514a" \
  -H "Content-Type: application/json"
```

#### Listar diálogos disponíveis

```bash
curl -X GET "http://localhost:3000/api/passages/dialogues" \
  -H "Content-Type: application/json"
```

---

### JavaScript / Fetch API

#### Buscar uma passagem

```javascript
const response = await fetch(
  'http://localhost:3000/api/passages/search?dialogue=republic&stephanus=7.514a',
  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  }
);

const data = await response.json();

if (data.success) {
  console.log('Referência:', data.data.reference);
  console.log('Grego:', data.data.greek);
  console.log('Inglês:', data.data.english);
  console.log('Adaptação (Iniciante):', data.data.adaptations.beginner);
} else {
  console.error('Erro:', data.error);
}
```

#### Listar diálogos

```javascript
const response = await fetch(
  'http://localhost:3000/api/passages/dialogues',
  { method: 'GET' }
);

const data = await response.json();

if (data.success) {
  console.log('Diálogos disponíveis:', data.data.dialogues);
  console.log('Total:', data.data.count);
}
```

---

### Python / Requests

#### Buscar uma passagem

```python
import requests

response = requests.get(
    'http://localhost:3000/api/passages/search',
    params={
        'dialogue': 'republic',
        'stephanus': '7.514a'
    }
)

data = response.json()

if data['success']:
    print('Referência:', data['data']['reference'])
    print('Grego:', data['data']['greek'])
    print('Adaptação (Iniciante):', data['data']['adaptations']['beginner'])
else:
    print('Erro:', data['error'])
```

#### Listar diálogos

```python
response = requests.get('http://localhost:3000/api/passages/dialogues')
data = response.json()

if data['success']:
    print('Diálogos:', data['data']['dialogues'])
    print('Total:', data['data']['count'])
```

---

## Configuração

### Variáveis de Ambiente

O backend requer as seguintes variáveis de ambiente (arquivo `.env`):

```bash
# Chave de API do Google Gemini
GEMINI_API_KEY=seu_valor_aqui

# Prompt customizado para adaptação de textos
# Este é o system prompt que será usado pelo LLMProvider
ADAPTATION_PROMPT=seu_prompt_customizado_aqui

# (Opcional) Porta do servidor (padrão: 3000)
PORT=3000

# (Opcional) Ambiente (development ou production)
NODE_ENV=development
```

### Exemplo .env

```bash
GEMINI_API_KEY=AIzaSyD...seu_valor...
ADAPTATION_PROMPT=Você é um expert em educação brasileira e filosofia clássica. Seu objetivo é adaptar passagens dos diálogos de Platão para portuguêsclaros e acessíveis...
```

---

## Tratamento de Erros

Todos os erros retornam um objeto com `success: false` e campo `error`:

```json
{
  "success": false,
  "error": "Descrição do erro"
}
```

### Erros Comuns

#### Parâmetro `dialogue` faltando

```json
{
  "success": false,
  "error": "Missing required parameters: dialogue and stephanus"
}
```

#### Diálogo inválido

```json
{
  "success": false,
  "error": "Unknown dialogue: filosofia. Valid options: apology, crito, euthyphro, ..."
}
```

#### Passagem não encontrada no Perseus

```json
{
  "success": false,
  "error": "Perseus search error: Passage not found: urn:cts:greekLit:tlg0030.tlg025:999.999a"
}
```

#### Erro na API Gemini

```json
{
  "success": false,
  "error": "GeminiProvider error: Gemini API error: 403 - Invalid API key"
}
```

---

## Limitações Conhecidas

- Adaptações paralelas podem levar 5-15 segundos dependendo da API Gemini
- A API Perseus pode retornar 404 para referências inválidas
- Cada requisição de adaptação consome créditos da API Gemini

---

## Performance

- **Busca de passagem**: ~1-2 segundos
- **Adaptação (3 níveis paralelos)**: ~5-10 segundos
- **Listagem de diálogos**: <100ms

---

## Suporte

Para problemas ou dúvidas:
1. Consulte `.github/instructions/platosearch.instructions.md`
2. Verifique se o servidor está rodando: `curl http://localhost:3000/health`
3. Confirme variáveis de ambiente: `.env` com `GEMINI_API_KEY` preenchida
