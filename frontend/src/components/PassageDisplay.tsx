import { AdaptationLevel } from '../types';
import styles from './PassageDisplay.module.css';

interface PassageDisplayProps {
  reference: string;
  greek: string;
  english: string;
  adaptations: {
    beginner: string;
    intermediate: string;
    advanced: string;
  };
  selectedLevel: AdaptationLevel;
  onLevelChange: (level: AdaptationLevel) => void;
}

export function PassageDisplay({
  reference,
  greek,
  english,
  adaptations,
  selectedLevel,
  onLevelChange,
}: PassageDisplayProps) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2>{reference}</h2>
        <p className={styles.subtitle}>Texto Platônico</p>
      </header>

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${selectedLevel === 'beginner' ? styles.active : ''}`}
          onClick={() => onLevelChange('beginner')}
        >
          Iniciante
        </button>
        <button
          className={`${styles.tab} ${selectedLevel === 'intermediate' ? styles.active : ''}`}
          onClick={() => onLevelChange('intermediate')}
        >
          Intermediário
        </button>
        <button
          className={`${styles.tab} ${selectedLevel === 'advanced' ? styles.active : ''}`}
          onClick={() => onLevelChange('advanced')}
        >
          Avançado
        </button>
      </div>

      <div className={styles.content}>
        <section className={styles.section}>
          <h3>Texto Original (Grego)</h3>
          <p className={styles.greekText}>{greek || 'Não disponível'}</p>
        </section>

        <section className={styles.section}>
          <h3>Tradução em Inglês (Jowett)</h3>
          <p>{english || 'Não disponível'}</p>
        </section>

        <section className={styles.section}>
          <h3>Adaptação em Português</h3>
          <div className={styles.adaptation}>
            <span className={styles.levelBadge}>{selectedLevel}</span>
            <p>{adaptations[selectedLevel] || 'Carregando...'}</p>
          </div>
        </section>
      </div>
    </div>
  );
}
