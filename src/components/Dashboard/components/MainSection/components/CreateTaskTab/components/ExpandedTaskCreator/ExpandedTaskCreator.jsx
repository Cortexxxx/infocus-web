import styles from "./ExpandedTaskCreator.module.css";
import TaskCreatorFooter from "./components/TaskCreatorFooter/TaskCreatorFooter";
import TaskCreatorDates from "./components/TaskCreatorDates/TaskCreatorDates";
import TaskCreatorTags from "./components/TaskCreatorTags/TaskCreatorTags";

export default function ExpandedTaskCreator({
  taskForm,
  setTaskForm,
  isExpanded,
  userTags,
  resetForm,
}) {
  return (
    <div className={`${styles.expandedPanel} ${isExpanded ? styles.show : ""}`}>
      {/* Описание задачи */}
      <textarea
        placeholder="Add task description..."
        className={styles.descriptionTextarea}
        value={taskForm.desc}
        onChange={(e) =>
          setTaskForm((prev) => ({ ...prev, desc: e.target.value }))
        }
      />

      {/* Контейнер параметров */}
      <div className={styles.taskParameters}>
        {/* Блок дат */}
        <TaskCreatorDates taskForm={taskForm} setTaskForm={setTaskForm} />

        {/* Блок тегов */}
        <TaskCreatorTags
          taskForm={taskForm}
          setTaskForm={setTaskForm}
          userTags={userTags}
        />
      </div>

      {/* Футер с кнопками */}
      <TaskCreatorFooter
        resetForm={resetForm}
        isTitleEmpty={!taskForm.title.trim()}
      />
    </div>
  );
}
