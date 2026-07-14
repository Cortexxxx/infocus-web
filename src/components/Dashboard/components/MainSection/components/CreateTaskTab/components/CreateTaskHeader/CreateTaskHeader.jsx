import styles from "./CreateTaskHeader.module.css";

export default function CreateTaskHeader({
  taskForm,
  setTaskForm,
  setIsExpanded,
}) {
  return (
    <div className={styles.inputRow}>
      <input
        type="text"
        placeholder="Enter task name"
        className={styles.mainInput}
        value={taskForm.title}
        onChange={(e) =>
          setTaskForm((prev) => ({ ...prev, title: e.target.value }))
        }
        onFocus={() => setIsExpanded(true)}
      />
    </div>
  );
}
