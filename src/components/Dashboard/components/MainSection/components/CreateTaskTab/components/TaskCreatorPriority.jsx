import styles from "../CreateTaskTab.module.css";

const PRIORITIES = [
  { value: "None", label: "Нет", color: "#6b7280" },
  { value: "Low", label: "Низкий", color: "#10b981" },
  { value: "Medium", label: "Средний", color: "#f59e0b" },
  { value: "High", label: "Высокий", color: "#ef4444" },
];

export default function TaskCreatorPriority({ taskForm, setTaskForm }) {
  const currentPriority = taskForm.priority || "None";

  return (
    <div className={styles.priorityContainer}>
      <span className={styles.priorityLabel}>ПРИОРИТЕТ:</span>
      <div className={styles.priorityControl}>
        {PRIORITIES.map((p) => {
          const isActive = currentPriority === p.value;
          return (
            <button
              key={p.value}
              type="button"
              className={`${styles.priorityBtn} ${isActive ? styles.active : ""}`}
              onClick={() =>
                setTaskForm((prev) => ({ ...prev, priority: p.value }))
              }
            >
              <span
                className={styles.priorityDot}
                style={{ backgroundColor: p.color }}
              />
              {p.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
