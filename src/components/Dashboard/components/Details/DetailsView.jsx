import { AlertCircle, Calendar } from "lucide-react";
import styles from "./Details.module.css";

export default function DetailsView({ todo, children }) {
  const formatDate = (dateString) => {
    if (!dateString) return "Не задано";
    return new Date(dateString).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className={styles.contentWrapper}>
      <div className={styles.scrollableContent}>
        <div className={styles.fieldGroup}>
          <h2 className={styles.sidebarTitle}>{todo.title}</h2>
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.fieldLabel}>Описание</label>
          <p className={styles.sidebarDescription}>
            {todo.description || "Описание отсутствует"}
          </p>
        </div>

        <div className={styles.parametersGrid}>
          <div className={styles.parameterItem}>
            <span className={styles.parameterLabel}>
              <AlertCircle size={14} /> Приоритет
            </span>
            <span
              className={`${styles.priorityBadge} ${styles[todo.priority?.toLowerCase() || "medium"]}`}
            >
              {todo.priority === "high"
                ? "Высокий"
                : todo.priority === "medium"
                  ? "Средний"
                  : "Низкий"}
            </span>
          </div>

          <div className={styles.parameterItem}>
            <span className={styles.parameterLabel}>
              <Calendar size={14} /> Запланирован на
            </span>
            <span className={styles.dateValue}>
              {todo.scheduledDate
                ? formatDate(todo.scheduledDate)
                : "Не запланирован"}
            </span>
          </div>

          <div className={styles.parameterItem}>
            <span className={styles.parameterLabel}>
              <Calendar size={14} /> Срок выполнения
            </span>
            <span className={styles.dateValue}>
              {formatDate(todo.deadline)}
            </span>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
