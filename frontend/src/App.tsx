import { useEffect, useState } from 'react';
import {
  SearchBar,
  PassageDisplay,
  LoadingSpinner,
  ErrorAlert,
} from './components';
import { ApiClient } from './services';
import { AdaptationLevel, PassageResponse } from './types';

/**
 * Root App component
 * Main entry point for the PlatoSearch frontend
 */
function App() {
  const [availableDialogues, setAvailableDialogues] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [passage, setPassage] = useState<PassageResponse['data'] | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<AdaptationLevel>('beginner');

  // Load available dialogues on mount
  useEffect(() => {
    const loadDialogues = async () => {
      const result = await ApiClient.getAvailableDialogues();
      if (result.success && result.data) {
        setAvailableDialogues(result.data.dialogues);
      } else {
        console.error('Failed to load dialogues:', result.error);
      }
    };

    loadDialogues();
  }, []);

  const handleSearch = async (dialogue: string, stephanus: string) => {
    setIsLoading(true);
    setError(null);
    setPassage(null);

    const result = await ApiClient.searchPassage(dialogue, stephanus);

    setIsLoading(false);

    if (result.success && result.data) {
      setPassage(result.data);
    } else {
      setError(result.error || 'Erro desconhecido ao buscar passagem');
    }
  };

  return (
    <div className="app">
      <header>
        <h1>PlatoSearch</h1>
        <p>Democratizando Platão nas Escolas Públicas Brasileiras</p>
      </header>

      <main>
        <SearchBar
          onSearch={handleSearch}
          isLoading={isLoading}
          availableDialogues={availableDialogues}
        />

        {error && (
          <ErrorAlert
            message={error}
            onClose={() => setError(null)}
          />
        )}

        {isLoading && <LoadingSpinner />}

        {passage && !isLoading && (
          <PassageDisplay
            reference={passage.reference}
            greek={passage.greek}
            english={passage.english}
            adaptations={passage.adaptations}
            selectedLevel={selectedLevel}
            onLevelChange={setSelectedLevel}
          />
        )}
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
