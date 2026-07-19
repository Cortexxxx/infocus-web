import styles from "./CreateTaskTab.module.css";
import CreateTaskHeader from "./components/CreateTaskHeader";
import ExpandedTaskCreator from "./components/ExpandedTaskCreator";
import { useCreateTask } from "./useCreateTask";

export default function CreateTaskTab() {
  // Вызываем хук без передачи аргументов, так как он сам внутри заберёт всё из контекста
  const {
    taskForm,
    setTaskForm,
    isExpanded,
    setIsExpanded,
    handleCreate,
    resetForm,
  } = useCreateTask();

  return (
    <div className={`${styles.newTodoCard} ${isExpanded ? styles.active : ""}`}>
      <form onSubmit={handleCreate}>
        <CreateTaskHeader
          taskForm={taskForm}
          setTaskForm={setTaskForm}
          setIsExpanded={setIsExpanded}
        />

        <ExpandedTaskCreator
          taskForm={taskForm}
          setTaskForm={setTaskForm}
          isExpanded={isExpanded}
          resetForm={resetForm}
        />
      </form>
    </div>
  );
}
