import { useState } from 'react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  onSearch: (dialogue: string, stephanus: string) => void;
  isLoading?: boolean;
  availableDialogues?: string[];
}

export function SearchBar({
  onSearch,
  isLoading = false,
  availableDialogues = [],
}: SearchBarProps) {
  const [dialogue, setDialogue] = useState('');
  const [stephanus, setStephanus] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!dialogue.trim()) {
      setError('Selecione um diálogo');
      return;
    }

    if (!stephanus.trim()) {
      setError('Digite a referência Stephanus (ex: 7.514a)');
      return;
    }

    onSearch(dialogue, stephanus);
  };

  return (
    <form className={styles.searchBar} onSubmit={handleSubmit}>
      <div className={styles.container}>
        <div className={styles.inputGroup}>
          <label htmlFor="dialogue">Diálogo de Platão</label>
          {availableDialogues.length > 0 ? (
            <select
              id="dialogue"
              value={dialogue}
              onChange={(e) => setDialogue(e.target.value)}
              disabled={isLoading}
              className={styles.select}
            >
              <option value="">Escolha um diálogo...</option>
              {availableDialogues.map((d) => (
                <option key={d} value={d}>
                  {d.charAt(0).toUpperCase() + d.slice(1).replace(/_/g, ' ')}
                </option>
              ))}
            </select>
          ) : (
            <input
              id="dialogue"
              type="text"
              value={dialogue}
              onChange={(e) => setDialogue(e.target.value)}
              placeholder="Ex: república, apologia..."
              disabled={isLoading}
              className={styles.input}
            />
          )}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="stephanus">Referência Stephanus</label>
          <input
            id="stephanus"
            type="text"
            value={stephanus}
            onChange={(e) => setStephanus(e.target.value)}
            placeholder="Ex: 7.514a"
            disabled={isLoading}
            className={styles.input}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={styles.button}
        >
          {isLoading ? 'Buscando...' : 'Buscar Passagem'}
        </button>
      </div>

      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
}
