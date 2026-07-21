import { useClickOutside } from "@/hooks/useClickOutside";
import styles from "./CreateTaskTab.module.css";
import CreateTaskHeader from "./components/CreateTaskHeader";
import ExpandedTaskCreator from "./components/ExpandedTaskCreator";
import { useCreateTask } from "./useCreateTask";
import { useRef } from "react";
export default function CreateTaskTab() {
  const titleInputRef = useRef();
  const formRef = useRef(null);
  const {
    taskForm,
    setTaskForm,
    isExpanded,
    setIsExpanded,
    handleCreate,
    resetForm,
  } = useCreateTask(titleInputRef);

  useClickOutside(formRef, () => {
    if (isExpanded) {
      setIsExpanded(false);
    }
  });
  return (
    <div className={`${styles.newTodoCard} ${isExpanded ? styles.active : ""}`}>
      <form onSubmit={handleCreate} ref={formRef}>
        <CreateTaskHeader
          taskForm={taskForm}
          titleInputRef={titleInputRef}
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
