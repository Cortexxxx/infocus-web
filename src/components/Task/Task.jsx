import Button from "../Button";
import styles from "./Task.module.css";
import { Trash2, Pencil, ChevronRight } from "lucide-react";

export default function Task({ data, onSelect, isActive }) {
  return (
    /* Если таска выбрана, можем подкинуть ей класс активности для подсветки */
    <div
      className={`${styles.task} ${isActive ? styles.activeTask : ""}`}
      onClick={onSelect}
    >
      <div className={styles.header}>
        <h2 className={styles.title}>{data.title}</h2>

        <div
          className={styles.buttonGroup}
          onClick={(e) => e.stopPropagation()}
        >
          <Button>
            <Pencil size={16} />
          </Button>
          <Button variant="danger">
            <Trash2 size={16} />
          </Button>
        </div>

        <div className={styles.chevron}>
          <ChevronRight size={18} />
        </div>
      </div>
    </div>
  );
}
