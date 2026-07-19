import { AlertCircle, Calendar } from "lucide-react";
import styles from "./Details.module.css";

export default function DetailsEdit({
  formState,
  onChange,
  onSubmit,
  header,
  children,
}) {
  return (
    <form onSubmit={onSubmit} className={styles.contentWrapper}>
      {header}

      <div className={styles.scrollableContent}>
        <div className={styles.fieldGroup}>
          <input
            type="text"
            className={styles.editTitleInput}
            value={formState.title}
            onChange={(e) => onChange("title", e.target.value)}
            placeholder="Название задачи"
            autoFocus
          />
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.fieldLabel}>Описание</label>
          <textarea
            className={styles.editTextarea}
            value={formState.description}
            onChange={(e) => onChange("description", e.target.value)}
            placeholder="Добавить описание..."
          />
        </div>

        <div className={styles.parametersGrid}>
          <div className={styles.parameterItem}>
            <span className={styles.parameterLabel}>
              <AlertCircle size={14} /> Приоритет
            </span>
            <select
              className={styles.editSelect}
              value={formState.priority}
              onChange={(e) => onChange("priority", e.target.value)}
            >
              <option value="low">Низкий</option>
              <option value="medium">Средний</option>
              <option value="high">Высокий</option>
            </select>
          </div>

          <div className={styles.parameterItem}>
            <span className={styles.parameterLabel}>
              <Calendar size={14} /> Запланирован на
            </span>
            <input
              type="date"
              className={styles.editDateInput}
              value={formState.scheduledDate}
              onChange={(e) => onChange("scheduledDate", e.target.value)}
            />
          </div>

          <div className={styles.parameterItem}>
            <span className={styles.parameterLabel}>
              <Calendar size={14} /> Срок выполнения
            </span>
            <input
              type="date"
              className={styles.editDateInput}
              value={formState.deadline}
              onChange={(e) => onChange("deadline", e.target.value)}
            />
          </div>
        </div>
      </div>
      {children}
    </form>
  );
}
