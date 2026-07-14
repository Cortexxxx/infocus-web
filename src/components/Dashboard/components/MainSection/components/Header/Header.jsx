import styles from "./Header.module.css";

import { Search, SlidersHorizontal } from "lucide-react";
import Button from "@/components/UI/Button/Button";

export default function Header({ todosCount }) {
  return (
    <header className={styles.contentHeader}>
      <div className={styles.headerTitleZone}>
        <h1 className={styles.pageTitle}>Сегодня</h1>
        <span className={styles.taskCounter}>{todosCount} задач</span>
      </div>

      <div className={styles.headerActions}>
        <div className={styles.searchWrapper}>
          <Search size={14} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Поиск..."
            className={styles.headerSearch}
          />
        </div>
        <Button variant="text" className={styles.filterBtn}>
          <SlidersHorizontal size={14} />
          <span>Фильтры</span>
        </Button>
      </div>
    </header>
  );
}
