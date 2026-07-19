import styles from "./Details.module.css";

export default function DetailsFooter({ createdAt, isDone }) {
  return (
    <div className={styles.sidebarFooter}>
      <div className={styles.metaRow}>
        <span>📅 Создано:</span>
        <span>
          {createdAt ? new Date(createdAt).toLocaleDateString() : "—"}
        </span>
      </div>
      <div className={styles.metaRow}>
        <span>Статус:</span>
        <span className={isDone ? styles.statusDone : styles.statusActive}>
          {isDone ? "Выполнено" : "В процессе"}
        </span>
      </div>
    </div>
  );
}
