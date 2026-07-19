import { Edit2, RotateCcw, Check, X } from "lucide-react";
import Button from "@/components/UI/Button/Button";
import styles from "./Details.module.css";

export default function DetailsHeader({
  isEditing,
  onEditStart,
  onCancel,
  onClose,
  isValid,
}) {
  return (
    <div className={styles.sidebarHeader}>
      <span className={styles.sidebarMeta}>Детали задачи</span>

      <div className={styles.headerActions}>
        {!isEditing ? (
          <Button
            variant="text"
            type="button"
            onClick={onEditStart}
            title="Редактировать"
            className={styles.actionButton}
          >
            <Edit2 size={16} />
          </Button>
        ) : (
          <div className={styles.editActionsGroup}>
            <Button
              variant="text"
              type="button"
              onClick={onCancel}
              title="Отменить"
              className={`${styles.actionButton} ${styles.cancelBtn}`}
            >
              <RotateCcw size={16} />
            </Button>
            <Button
              variant="text"
              type="submit" // Работает, если кнопка внутри тега <form>
              title="Сохранить изменения"
              className={`${styles.actionButton} ${styles.saveBtn}`}
              disabled={!isValid}
            >
              <Check size={16} />
            </Button>
          </div>
        )}

        <Button
          variant="text"
          type="button"
          onClick={onClose}
          className={styles.closeButton}
          title="Закрыть"
        >
          <X size={18} />
        </Button>
      </div>
    </div>
  );
}
