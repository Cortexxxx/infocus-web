import styles from "../CreateTaskTab.module.css";
import TaskCreatorFooter from "./TaskCreatorFooter";
import TaskCreatorDates from "./TaskCreatorDates";
import TaskCreatorTags from "./TaskCreatorTags";
import TaskCreatorPriority from "./TaskCreatorPriority";

export default function ExpandedTaskCreator({
  taskForm,
  setTaskForm,
  isExpanded,
  resetForm,
}) {
  const handleDescriptionChange = (e) => {
    setTaskForm((prev) => ({ ...prev, desc: e.target.value }));
  };

  return (
    <div className={`${styles.expandedPanel} ${isExpanded ? styles.show : ""}`}>
      <textarea
        placeholder="Add task description..."
        className={styles.descriptionTextarea}
        value={taskForm.desc}
        onChange={handleDescriptionChange}
      />

      <div className={styles.taskParameters}>
        <TaskCreatorDates taskForm={taskForm} setTaskForm={setTaskForm} />
        <TaskCreatorPriority
          taskForm={taskForm}
          setTaskForm={setTaskForm}
        ></TaskCreatorPriority>

        <TaskCreatorTags taskForm={taskForm} setTaskForm={setTaskForm} />
      </div>

      <TaskCreatorFooter
        resetForm={resetForm}
        isTitleEmpty={!taskForm.title.trim()}
      />
    </div>
  );
}
