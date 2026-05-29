import { useState } from 'react';

/**
 * Root App component
 * Main entry point for the PlatoSearch frontend
 */
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <header>
        <h1>PlatoSearch</h1>
        <p>Democratizando Platão nas Escolas Públicas Brasileiras</p>
      </header>

      <main>
        <p>Frontend setup complete. Ready for implementation.</p>
        <button onClick={() => setCount((c) => c + 1)}>
          Contador: {count}
        </button>
      </main>

      <footer>
        <p>
          Plataforma educacional para busca e adaptação de textos de Platão
        </p>
      </footer>
    </div>
  );
}

export default App;
