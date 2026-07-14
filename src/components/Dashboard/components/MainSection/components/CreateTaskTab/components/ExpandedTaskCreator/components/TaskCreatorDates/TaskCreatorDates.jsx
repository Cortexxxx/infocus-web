import styles from "./TaskCreatorDates.module.css"; // или используй внешние стили, если они общие

export default function TaskCreatorDates({ taskForm, setTaskForm }) {
  return (
    <div className={styles.datesRow}>
      <div className={styles.inputGroup}>
        <label>Когда сделать:</label>
        <input
          type="date"
          className={styles.dateInput}
          value={taskForm.date}
          onChange={(e) =>
            setTaskForm((prev) => ({ ...prev, date: e.target.value }))
          }
        />
      </div>

      <div className={styles.inputGroup}>
        <label>Дедлайн:</label>
        <input
          type="date"
          className={styles.dateInput}
          value={taskForm.deadline}
          onChange={(e) =>
            setTaskForm((prev) => ({ ...prev, deadline: e.target.value }))
          }
        />
      </div>
    </div>
  );
}
