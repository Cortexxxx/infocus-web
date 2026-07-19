import styles from "./Header.module.css";
import { useTodos } from "@/context/TodoContext";

// Словарь для красивого вывода названия активной папки
const folderNames = {
  today: "Сегодня",
  tomorrow: "Завтра",
  week: "Неделя",
  all: "Все задачи",
};

export default function Header() {
  const { todos, activeFolder } = useTodos();

  const title = folderNames[activeFolder] || "Задачи";
  const todosCount = todos.length;

  return (
    <header className={styles.contentHeader}>
      <div className={styles.headerTitleZone}>
        <h1 className={styles.pageTitle}>{title}</h1>
        <span className={styles.taskCounter}>{todosCount} задач</span>
      </div>
    </header>
  );
}
