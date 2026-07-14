import styles from "./Task.module.css";
import { todoService } from "@/services/api.js";

import Button from "@/components/UI/Button/Button";
import {
  Trash2,
  Pencil,
  ChevronRight,
  Calendar,
  AlertCircle,
} from "lucide-react";

export default function Task({ data, onSelect, isActive, onDelete }) {
  const deleteHandle = async (e) => {
    e.stopPropagation();
    try {
      await todoService.delete(data.id);
      if (onDelete) onDelete(data.id);
    } catch (error) {
      console.log(error.message);
    }
  };

  const taskPriority = data.priority || "medium";
  const taskDeadline = data.deadline || new Date().toISOString();

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
      className={`${styles.task} ${isActive ? styles.activeTask : ""}`}
      onClick={onSelect}
    >
      <div className={styles.leftSection}>
        {taskPriority && (
          <span
            className={`${styles.priorityDot} ${getPriorityStyle(taskPriority)}`}
            title={`Приоритет: ${taskPriority}`}
          />
        )}

        <div className={styles.textContainer}>
          <h2 className={styles.title}>{data.title}</h2>

          {taskDeadline && (
            <div className={styles.metaRow}>
              <span className={styles.deadlineBadge}>
                <Calendar size={12} />
                <span>{taskDeadline}</span>
              </span>
            </div>
          )}
        </div>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.buttonGroup}>
          <Button variant="text" className={styles.actionIconBtn}>
            <Pencil size={15} />
          </Button>
          <Button
            variant="danger"
            onClick={deleteHandle}
            className={`${styles.actionIconBtn} ${styles.delete}`}
          >
            <Trash2 size={15} />
          </Button>
        </div>

        <div className={styles.chevron}>
          <ChevronRight size={16} />
        </div>
      </div>
    </div>
  );
}
