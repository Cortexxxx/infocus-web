import Task from "./components/Task/Task";
import styles from "./TodosList.module.css";
import { useTodos } from "@/context/TodosContext";

export default function TodosList() {
  const { todos, setTodos, activeFolder, selectedTodo, setSelectedTodo } =
    useTodos();

  const handleToggleComplete = (id, isDone) => {
    if (activeFolder === "completed") {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } else {
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? { ...todo, isDone } : todo)),
      );
    }
  };

  const handleDelete = (deletedId) => {
    setTodos((prevTodos) => prevTodos.filter((t) => t.id !== deletedId));

    if (selectedTodo?.id === deletedId) {
      setSelectedTodo(null);
    }
  };

  // Разделяем массив задач на ходу
  const activeTasks = todos.filter((t) => !t.isDone);
  const completedTasks = todos.filter((t) => t.isDone);

  const shouldSplit =
    activeFolder !== "completed" &&
    activeFolder !== "deleted" &&
    activeFolder !== "inbox";

  const renderTask = (todo) => (
    <Task
      key={todo.id}
      data={todo}
      onSelect={() => setSelectedTodo(todo)}
      isActive={selectedTodo?.id === todo.id}
      onToggleComplete={handleToggleComplete}
      onDelete={handleDelete}
      isDeletedFolder={activeFolder === "deleted"}
    />
  );

  if (!shouldSplit) {
    return (
      <div className={styles.listContainer}>
        {todos.map(renderTask)}
        {todos.length === 0 && (
          <div className={styles.emptyContainer}>
            <p className={styles.emptyText}>Тут пока пусто...</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={styles.listContainer}>
      {/* 1. Секция активных задач */}
      <div className={styles.section}>
        {activeTasks.map(renderTask)}
        {activeTasks.length === 0 && (
          <div className={styles.emptyContainer}>
            <p className={styles.emptyText}>
              Все задачи выполнены! Отличная работа! 🎉
            </p>
          </div>
        )}
      </div>

      {/* 2. Секция выполненных задач */}
      {completedTasks.length > 0 && (
        <div className={styles.completedSection}>
          <h4 className={styles.completedTitle}>
            Выполненные ({completedTasks.length})
          </h4>
          <div className={styles.section}>{completedTasks.map(renderTask)}</div>
        </div>
      )}
    </div>
  );
}
