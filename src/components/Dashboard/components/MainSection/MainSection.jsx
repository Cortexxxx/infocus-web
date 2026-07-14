import styles from "./MainSection.module.css";
import { todoService } from "@/services/api.js";

import Header from "./components/Header/Header";
import TodosList from "./components/TodosList/TodosList";
import CreateTaskTab from "./components/CreateTaskTab/CreateTaskTab";

export default function MainSection({
  onSelect,
  todos,
  setTodos,
  selectedTodo,
}) {
  return (
    <main className={styles.mainContent}>
      <Header todosCount={todos.length} />
      <section className={styles.todoContainer}>
        <CreateTaskTab />
        <TodosList
          onSelect={onSelect}
          todos={todos}
          selectedTodo={selectedTodo}
          setTodos={setTodos}
        />
      </section>
    </main>
  );
}
