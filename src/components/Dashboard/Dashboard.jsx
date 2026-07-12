import Task from "../Task/Task";
import { todoService } from "../../services/api";
import { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import { X, LogOut, Settings } from "lucide-react";
import Logo from "../../assets/Logo";
import Button from "../Button";

export default function Dashboard() {
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await todoService.getAll();
        setTodos(response);
      } catch (error) {
        console.error("Error while fetching todos");
      }
    };
    fetchTodos();
  }, []);

  const user = {
    name: "Nikita",
    avatarUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80", // Мок-аватарка
  };

  const handleLogout = () => {
    console.log("Выход из аккаунта...");
    // Тут будет твоя логика очистки токенов/стейта
  };

  return (
    <div className={styles.dashboardLayout}>
      {/* Левая панель */}
      {/* ЛЕВАЯ КОЛОНКА */}
      <aside className={styles.sidebarLeft}>
        {/* Верхняя часть сайдбара */}
        <div className={styles.sidebarTopContent}>
          <div className={styles.logoWrapper}>
            <Logo />
          </div>
          <h3>Папки / Заметки</h3>
          <p className={styles.sidebarLeftPlaceholder}>
            Тут скоро что-то будет...
          </p>
        </div>

        {/* НИЖНЯЯ ЧАСТЬ: Блок пользователя */}
        <div className={styles.userProfileBlock}>
          <div className={styles.userInfo}>
            <img
              src={user.avatarUrl}
              alt={user.name}
              className={styles.avatar}
            />
            <span className={styles.username}>{user.name}</span>
          </div>
          <Button onClick={handleLogout} title="Settings">
            <Settings size={18} />
          </Button>

          <Button
            onClick={handleLogout}
            className={styles.logoutButton}
            title="Logout"
          >
            <LogOut size={18} />
          </Button>
        </div>
      </aside>

      {/* Центральный блок */}
      <main className={styles.mainContent}>
        <div className={styles.welcomeCard}>
          <h1>Stay in focus today!</h1>
        </div>

        <section className={styles.todoContainer}>
          {todos.map((todo) => (
            <Task
              key={todo.id}
              data={todo}
              onSelect={() => setSelectedTodo(todo)}
              isActive={selectedTodo?.id === todo.id}
            >
              {todo.title}
            </Task>
          ))}
        </section>
      </main>

      {/* Правая панель (Детали) */}
      <aside
        className={`${styles.sidebarRight} ${!selectedTodo ? styles.hidden : ""}`}
      >
        {selectedTodo && (
          <div>
            <div className={styles.sidebarHeader}>
              <span className={styles.sidebarMeta}>
                Детали задачи #{selectedTodo.id}
              </span>
              <button
                onClick={() => setSelectedTodo(null)}
                className={styles.closeButton}
              >
                <X size={20} />
              </button>
            </div>

            <h2 className={styles.sidebarTitle}>{selectedTodo.title}</h2>

            <p className={styles.sidebarDescription}>
              {selectedTodo.description || "Нет описания к этой задаче."}
            </p>

            <div className={styles.sidebarFooter}>
              <p>
                📅 Создано:{" "}
                {new Date(selectedTodo.createdAt).toLocaleDateString()}
              </p>
              <p>Статус: {selectedTodo.isDone ? "Выполнено" : "В процессе"}</p>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
