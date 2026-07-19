import styles from "./Task.module.css";
import { todoService } from "@/services/api.js";
import { useTodos } from "@/context/TodoContext";

import Button from "@/components/UI/Button/Button";
import { Trash2, RotateCcw, ChevronRight, Calendar, Check } from "lucide-react";

export default function Task({ data }) {
  const { selectedTodo, setSelectedTodo, setTodos, activeFolder } = useTodos();

  const isActive = selectedTodo?.id === data.id;
  const isDeletedFolder = activeFolder === "deleted";

  const deleteHandle = async (e) => {
    e.stopPropagation();
    try {
      await todoService.delete(data.id);

      setTodos((prevTodos) => prevTodos.filter((t) => t.id !== data.id));

      if (selectedTodo?.id === data.id) {
        setSelectedTodo(null);
      }
    } catch (error) {
      console.error("Ошибка при удалении задачи:", error.message);
    }
  };

  const restoreHandle = async (e) => {
    e.stopPropagation();
    console.log("restoring...");
    // try {
    //   await todoService.restore(data.id);
    //   // Сюда можно будет добавить обновление стейта, когда бэк будет готов
    // } catch (error) {
    //   console.error(error.message);
    // }
  };

  const toggleCompleteHandle = async (e) => {
    e.stopPropagation();

    try {
      const updatedStatus = !data.isDone;

      if (updatedStatus) {
        await todoService.complete(data.id);
      } else {
        await todoService.uncomplete(data.id);
      }

      if (activeFolder === "completed") {
        setTodos((prev) => prev.filter((todo) => todo.id !== data.id));
      } else {
        setTodos((prev) =>
          prev.map((todo) =>
            todo.id === data.id ? { ...todo, isDone: updatedStatus } : todo,
          ),
        );
      }
    } catch (error) {
      console.error("Ошибка при переключении статуса задачи:", error);
    }
  };

  const taskPriority = data.priority || "medium";
  const taskDeadline = data.deadline;

  const getPriorityStyle = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return styles.priorityHigh;
      case "medium":
        return styles.priorityMedium;
      default:
        return styles.priorityLow;
    }
  };

  const formatDeadline = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU", {
      month: "short",
      day: "numeric",
    });
  };

  const deadlineText = formatDeadline(taskDeadline);

  return (
    <div
      className={`${styles.task} ${isActive ? styles.activeTask : ""} ${data.isDone ? styles.completedTask : ""} ${isDeletedFolder ? styles.deletedTask : ""}`}
      onClick={() => setSelectedTodo(data)}
    >
      <div className={styles.leftSection}>
        {/* КНОПКА-ЧЕКБОКС ДЛЯ ВЫПОЛНЕНИЯ */}
        <Button
          disabled={isDeletedFolder}
          type="button"
          className={`${styles.checkbox} ${data.isDone ? styles.checkboxChecked : ""}`}
          onClick={toggleCompleteHandle}
        >
          {data.isDone && <Check size={12} className={styles.checkIcon} />}
        </Button>

        {/* Индикатор приоритета */}
        {taskPriority && !data.isDone && (
          <span
            className={`${styles.priorityDot} ${getPriorityStyle(taskPriority)}`}
            title={`Приоритет: ${taskPriority}`}
          />
        )}

        <div className={styles.textContainer}>
          <h2
            className={`${styles.title} ${data.isDone ? styles.titleCompleted : ""}`}
          >
            {data.title}
          </h2>

          {deadlineText && (
            <div className={styles.metaRow}>
              <span className={styles.deadlineBadge}>
                <Calendar size={12} />
                <span>{deadlineText}</span>
              </span>
            </div>
          )}
        </div>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.buttonGroup}>
          {!isDeletedFolder && (
            <Button
              variant="danger"
              onClick={deleteHandle}
              className={`${styles.actionIconBtn} ${styles.delete}`}
            >
              <Trash2 size={15} />
            </Button>
          )}
          {isDeletedFolder && (
            <Button
              variant=""
              onClick={restoreHandle}
              className={`${styles.actionIconBtn} ${styles.restore}`}
            >
              <RotateCcw size={15} />
            </Button>
          )}
        </div>

        <div className={styles.chevron}>
          <ChevronRight size={16} />
        </div>
      </div>
    </div>
  );
}
