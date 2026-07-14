import styles from "./CreateTaskTab.module.css";
import CreateTaskHeader from "./components/CreateTaskHeader/CreateTaskHeader";
import ExpandedTaskCreator from "./components/ExpandedTaskCreator/ExpandedTaskCreator";
import { useCreateTask } from "./hooks/useCreateTask";
import { USER_TAGS } from "./constants/tags";

export default function CreateTaskTab({ setTodos }) {
  const {
    taskForm,
    setTaskForm,
    isExpanded,
    setIsExpanded,
    handleCreate,
    resetForm,
  } = useCreateTask(setTodos);

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
          userTags={USER_TAGS}
          resetForm={resetForm}
        />
      </form>
    </div>
  );
}
