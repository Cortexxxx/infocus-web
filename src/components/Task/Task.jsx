import { useState } from "react";
import Button from "../Button";
import styles from "./Task.module.css"; // Импортируем стили
import { Trash2, Pencil, ChevronDown, ChevronUp } from "lucide-react";
export default function Task({ children, data }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={styles.task} onClick={toggleExpand}>
      <div className={styles.header}>
        <h2 className={styles.title}>{children}</h2>

        <div
          className={styles.buttonGroup}
          onClick={(e) => e.stopPropagation()}
        >
          <Button>
            <Pencil size={16}></Pencil>
          </Button>
          <Button variant="danger">
            <Trash2 size={16}></Trash2>
          </Button>
        </div>
        <div className={styles.chevron}>
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </div>

      {isExpanded && data.description && (
        <div
          className={styles.description}
          onClick={(e) => e.stopPropagation()}
        >
          <p>{data.description}</p>
        </div>
      )}
    </div>
  );
}
