import styles from "../CreateTaskTab.module.css";

export default function CreateTaskHeader({
  taskForm,
  setTaskForm,
  setIsExpanded,
  titleInputRef,
}) {
  const handleTitleChange = (e) => {
    setTaskForm((prev) => ({ ...prev, title: e.target.value }));
  };

  return (
    <div className={styles.inputRow}>
      <input
        type="text"
        ref={titleInputRef}
        placeholder="Enter task name"
        className={styles.mainInput}
        value={taskForm.title}
        onChange={handleTitleChange}
        onFocus={() => setIsExpanded(true)}
      />
    </div>
  );
}
