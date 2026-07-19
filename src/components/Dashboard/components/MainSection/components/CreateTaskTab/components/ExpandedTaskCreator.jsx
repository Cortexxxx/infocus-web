import styles from "../CreateTaskTab.module.css";
import TaskCreatorFooter from "./TaskCreatorFooter";
import TaskCreatorDates from "./TaskCreatorDates";
import TaskCreatorTags from "./TaskCreatorTags";

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
      {/* Описание задачи */}
      <textarea
        placeholder="Add task description..."
        className={styles.descriptionTextarea}
        value={taskForm.desc}
        onChange={handleDescriptionChange}
      />

      {/* Контейнер параметров */}
      <div className={styles.taskParameters}>
        {/* Блок дат */}
        <TaskCreatorDates taskForm={taskForm} setTaskForm={setTaskForm} />

        {/* Блок тегов — больше не прокидываем userTags */}
        <TaskCreatorTags taskForm={taskForm} setTaskForm={setTaskForm} />
      </div>

      {/* Футер с кнопками */}
      <TaskCreatorFooter
        resetForm={resetForm}
        isTitleEmpty={!taskForm.title.trim()}
      />
    </div>
  );
}
