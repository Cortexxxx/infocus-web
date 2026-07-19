import styles from "../CreateTaskTab.module.css";
import Button from "@/components/UI/Button/Button";

export default function TaskCreatorFooter({ resetForm, isTitleEmpty }) {
  return (
    <div className={styles.expandedFooter}>
      <Button variant="text" type="button" onClick={resetForm}>
        Отмена
      </Button>
      <Button type="submit" disabled={isTitleEmpty}>
        Создать
      </Button>
    </div>
  );
}
