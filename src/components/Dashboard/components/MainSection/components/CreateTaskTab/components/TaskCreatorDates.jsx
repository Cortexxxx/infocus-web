import styles from "../CreateTaskTab.module.css";

export default function TaskCreatorDates({ taskForm, setTaskForm }) {
  const handleDateChange = (field, value) => {
    setTaskForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className={styles.datesRow}>
      <div className={styles.inputGroup}>
        <label>Когда сделать:</label>
        <input
          type="date"
          className={styles.dateInput}
          value={taskForm.date}
          onChange={(e) => handleDateChange("date", e.target.value)}
        />
      </div>

      <div className={styles.inputGroup}>
        <label>Дедлайн:</label>
        <input
          type="date"
          className={styles.dateInput}
          value={taskForm.deadline}
          onChange={(e) => handleDateChange("deadline", e.target.value)}
        />
      </div>
    </div>
  );
}
