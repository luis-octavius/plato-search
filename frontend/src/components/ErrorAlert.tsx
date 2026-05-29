import styles from './ErrorAlert.module.css';

interface ErrorAlertProps {
  message: string;
  onClose?: () => void;
}

export function ErrorAlert({ message, onClose }: ErrorAlertProps) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h3>Erro</h3>
        <p>{message}</p>
      </div>
      {onClose && (
        <button className={styles.closeButton} onClick={onClose}>
          Fechar
        </button>
      )}
    </div>
  );
}
