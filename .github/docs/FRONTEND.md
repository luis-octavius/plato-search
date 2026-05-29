# PlatoSearch Frontend Documentation

> Interface React para busca e exploração de textos de Platão

**Tecnologias**: React 18 + TypeScript + Vite  
**Versão**: 0.1.0  
**Browser**: Chrome, Firefox, Safari, Edge (suporte moderno)

---

## 📋 Índice

- [Estrutura do Projeto](#estrutura-do-projeto)
- [Componentes](#componentes)
- [Serviços](#serviços)
- [Tipos](#tipos)
- [Como Usar](#como-usar)
- [Estilos & Tema](#estilos--tema)
- [Desenvolvimento](#desenvolvimento)

---

## Estrutura do Projeto

```
frontend/src/
├── components/          # Componentes React reutilizáveis
│   ├── SearchBar.tsx
│   ├── SearchBar.module.css
│   ├── PassageDisplay.tsx
│   ├── PassageDisplay.module.css
│   ├── LoadingSpinner.tsx
│   ├── LoadingSpinner.module.css
│   ├── ErrorAlert.tsx
│   ├── ErrorAlert.module.css
│   └── index.ts
├── pages/              # Páginas da aplicação (futuro)
├── services/           # HTTP clients e lógica
│   ├── api.ts
│   └── index.ts
├── types/              # Tipos TypeScript
│   ├── index.ts
│   ├── css-modules.d.ts
│   └── vite-env.d.ts
├── styles/             # Estilos globais
│   └── main.css
├── App.tsx             # Componente raiz
└── main.tsx            # Entry point
```

---

## Componentes

### SearchBar

Barra de busca para procurar passagens de Platão.

#### Props

```typescript
interface SearchBarProps {
  onSearch: (dialogue: string, stephanus: string) => void;
  isLoading?: boolean;
  availableDialogues?: string[];
}
```

#### Uso

```tsx
import { SearchBar } from './components';

function App() {
  const handleSearch = (dialogue: string, stephanus: string) => {
    console.log(`Buscando ${dialogue} ${stephanus}`);
  };

  return (
    <SearchBar
      onSearch={handleSearch}
      isLoading={false}
      availableDialogues={['republic', 'apology', 'crito']}
    />
  );
}
```

#### Features

- ✅ Campo dropdown para seleção de diálogos
- ✅ Input para referência Stephanus
- ✅ Validação de entrada
- ✅ Estado de carregamento
- ✅ Mensagens de erro contextualizadas
- ✅ Responsivo (mobile-friendly)

#### Estilos

- **Cor de fundo**: Terra Cota (#a0522d)
- **Cor de texto**: Branco
- **Padding**: 32px
- **Border radius**: 8px

---

### PassageDisplay

Exibe uma passagem de Platão com texto original, tradução e adaptações.

#### Props

```typescript
interface PassageDisplayProps {
  reference: string;              // "República 7.514a"
  greek: string;                  // Texto grego
  english: string;                // Tradução em inglês
  adaptations: {
    beginner: string;
    intermediate: string;
    advanced: string;
  };
  selectedLevel: AdaptationLevel;
  onLevelChange: (level: AdaptationLevel) => void;
}
```

#### Uso

```tsx
import { PassageDisplay } from './components';

const passage = {
  reference: 'República 7.514a',
  greek: 'παιδεία τε ἄρα...',
  english: 'And now let me show...',
  adaptations: {
    beginner: 'Platão compara...',
    intermediate: 'A República apresenta...',
    advanced: 'Na República VII...'
  }
};

<PassageDisplay
  {...passage}
  selectedLevel="beginner"
  onLevelChange={(level) => console.log(level)}
/>
```

#### Features

- ✅ Abas para trocar entre níveis de adaptação
- ✅ Exibição de texto grego original
- ✅ Tradução em inglês (Jowett)
- ✅ Três versões em português
- ✅ Design responsivo

#### Seções

1. **Cabeçalho**: Título e subtítulo da passagem
2. **Abas**: Seletor de nível (Iniciante, Intermediário, Avançado)
3. **Conteúdo**:
   - Texto Original (Grego)
   - Tradução em Inglês
   - Adaptação em Português (nível selecionado)

---

### LoadingSpinner

Indicador de carregamento animado.

#### Uso

```tsx
import { LoadingSpinner } from './components';

{isLoading && <LoadingSpinner />}
```

#### Features

- ✅ Animação smooth (spin 1s linear infinite)
- ✅ Cor Terra Cota
- ✅ Mensagem informativa
- ✅ Centrado na tela

---

### ErrorAlert

Alerta para exibir mensagens de erro.

#### Props

```typescript
interface ErrorAlertProps {
  message: string;
  onClose?: () => void;
}
```

#### Uso

```tsx
import { ErrorAlert } from './components';

{error && (
  <ErrorAlert
    message={error}
    onClose={() => setError(null)}
  />
)}
```

#### Features

- ✅ Design destacado (cor vermelha)
- ✅ Botão para fechar
- ✅ Mensagem clara
- ✅ Fácil de descartar

---

## Serviços

### ApiClient

Cliente HTTP para comunicação com o backend PlatoSearch.

#### Métodos

#### `searchPassage(dialogue: string, stephanus: string): Promise<PassageResponse>`

Busca uma passagem no backend.

```typescript
import { ApiClient } from './services';

const result = await ApiClient.searchPassage('republic', '7.514a');

if (result.success && result.data) {
  console.log('Referência:', result.data.reference);
  console.log('Adaptação:', result.data.adaptations.beginner);
} else {
  console.error('Erro:', result.error);
}
```

#### `getAvailableDialogues(): Promise<DialoguesResponse>`

Lista todos os diálogos disponíveis.

```typescript
const result = await ApiClient.getAvailableDialogues();

if (result.success && result.data) {
  console.log('Diálogos:', result.data.dialogues);
} else {
  console.error('Erro:', result.error);
}
```

#### Tratamento de Erros

O ApiClient retorna sempre um objeto com `success` e `error`:

```typescript
interface PassageResponse {
  success: boolean;
  data?: { /* ... */ };
  error?: string;
}
```

---

## Tipos

### AdaptationLevel

```typescript
type AdaptationLevel = 'beginner' | 'intermediate' | 'advanced';
```

Níveis de adaptação de texto disponíveis.

### PassageResponse

```typescript
interface PassageResponse {
  success: boolean;
  data?: {
    reference: string;
    greek: string;
    english: string;
    adaptations: {
      beginner: string;
      intermediate: string;
      advanced: string;
    };
  };
  error?: string;
}
```

### DialoguesResponse

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

---

## Como Usar

### Instalação

```bash
cd frontend
npm install
```

### Desenvolvimento

```bash
npm run dev
```

Acesse `http://localhost:5173` no navegador.

### Build para Produção

```bash
npm run build
```

Saída gerada em `frontend/dist/`.

### Type Checking

```bash
npm run type-check
```

---

## Fluxo de Uso Principal

```
1. App.tsx monta
   ↓
2. Carrega lista de diálogos via ApiClient.getAvailableDialogues()
   ↓
3. User digita em SearchBar
   ↓
4. SearchBar valida e chama onSearch callback
   ↓
5. App.tsx chama ApiClient.searchPassage()
   ↓
6. LoadingSpinner aparece
   ↓
7. Resposta retorna
   ↓
8. PassageDisplay exibe resultado
   ↓
9. User clica em aba para trocar nível
   ↓
10. Adaptação é exibida (já carregada)
```

---

## Estilos & Tema

### Paleta de Cores

```css
--color-terra-cota: #a0522d;        /* Cor primária */
--color-terra-cota-light: #cd853f;  /* Variação clara */
--color-terra-cota-dark: #8b4513;   /* Variação escura */
--color-terra-cota-lighter: #daa520;/* Ouro antigo */
```

### Tipografia

```css
--font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
--font-size-base: 16px;
--font-size-large: 24px;
--font-size-xlarge: 32px;
--font-size-small: 14px;
```

### Espaçamento

```css
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 16px;
--spacing-lg: 24px;
--spacing-xl: 32px;
```

### Responsive Design

```css
/* Mobile-first approach */
@media (max-width: 768px) {
  /* Ajustes para telas pequenas */
}
```

---

## Desenvolvimento

### Adicionar um novo componente

1. Criar arquivo `frontend/src/components/MyComponent.tsx`
2. Criar estilos em `frontend/src/components/MyComponent.module.css`
3. Exportar em `frontend/src/components/index.ts`

```typescript
// MyComponent.tsx
import styles from './MyComponent.module.css';

export function MyComponent() {
  return <div className={styles.container}>Componente</div>;
}
```

```css
/* MyComponent.module.css */
.container {
  padding: var(--spacing-lg);
  background-color: var(--color-terra-cota);
  color: white;
}
```

### Estender o ApiClient

```typescript
// services/api.ts
export class ApiClient {
  // ... métodos existentes ...

  static async newMethod(): Promise<NewResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/endpoint`);
      return await response.json();
    } catch (error) {
      return { success: false, error: 'Error message' };
    }
  }
}
```

### Adicionar tipos

```typescript
// types/index.ts
export interface NewType {
  field: string;
}
```

---

## Accessibility

- ✅ Labels em formulários
- ✅ Suporte para teclado (navegação com Tab)
- ✅ Contraste WCAG AA
- ✅ Sem emojis (apenas ícones SVG quando necessário)
- ✅ Mensagens de erro claras

---

## Performance

- **Initial Load**: ~150-200ms
- **API Call**: ~5-10 segundos (adaptações paralelas)
- **Bundle Size**: ~150kB (gzipped ~48kB)

---

## Variáveis de Ambiente

Arquivo `frontend/.env`:

```bash
# URL base da API backend
VITE_API_URL=http://localhost:3000/api

# Ou para produção:
# VITE_API_URL=https://api.platosearch.com
```

---

## Troubleshooting

### Componente não está renderizando

Verifique se está sendo importado corretamente:

```tsx
// ✅ Correto
import { SearchBar } from './components';

// ❌ Errado
import SearchBar from './components/SearchBar';
```

### Estilos não aplicando

Verifique se o CSS module está sendo importado:

```tsx
// ✅ Correto
import styles from './MyComponent.module.css';
<div className={styles.container}>

// ❌ Errado
<div className="container">
```

### API não responde

1. Verifique se backend está rodando: `curl http://localhost:3000/health`
2. Verifique `VITE_API_URL` no `.env`
3. Verifique console do navegador (F12) para erros

---

## Recursos

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Documentation](https://vitejs.dev/)
- [CSS Modules](https://github.com/css-modules/css-modules)

---

## Contribuindo

1. Todos os componentes devem ter tipos TypeScript explícitos
2. Sem `any` types
3. Use CSS Modules para estilos (não estilos globais)
4. Respeite a paleta Terra Cota
5. Siga Conventional Commits para mensagens

---

**Última atualização**: Maio 2026
