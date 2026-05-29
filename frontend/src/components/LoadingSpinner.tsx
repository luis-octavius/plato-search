import styles from './LoadingSpinner.module.css';

export function LoadingSpinner() {
  return (
    <div className={styles.container}>
      <div className={styles.spinner} />
      <p>Buscando passagem na Perseus Digital Library...</p>
    </div>
  );
}
