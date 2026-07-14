import styles from "./Details.module.css";

import { X, Info } from "lucide-react";
import Button from "@/components/UI/Button/Button";

export default function Details({ selectedTodo, setSelectedTodo }) {
  return (
    <aside
      className={`${styles.sidebarRight} ${!selectedTodo ? styles.hidden : ""}`}
    >
      {selectedTodo ? (
        <div className={styles.contentWrapper}>
          <div className={styles.sidebarHeader}>
            <span className={styles.sidebarMeta}>Information</span>

            <Button
              variant="text"
              onClick={() => setSelectedTodo(null)}
              className={styles.closeButton}
            >
              <X size={18} />
            </Button>
          </div>

          <h2 className={styles.sidebarTitle}>{selectedTodo.title}</h2>

          <p className={styles.sidebarDescription}>
            {selectedTodo.description || "Description is empty"}
          </p>

          <div className={styles.sidebarFooter}>
            <p>
              📅 Создано:{" "}
              {new Date(selectedTodo.createdAt).toLocaleDateString()}
            </p>
            <p>Статус: {selectedTodo.isDone ? "Completed" : "In process"}</p>
          </div>
        </div>
      ) : (
        /* Красивый пустой стейт для десктопа, чтобы колонка не пустовала */
        <div className={styles.emptyState}>
          <Info size={32} />
          <p>Выберите задачу, чтобы увидеть детали</p>
        </div>
      )}
    </aside>
  );
}
