import styles from "./MainSection.module.css";
import { useTodos } from "@/context/TodoContext";

import Header from "./components/Header/Header";
import TodosList from "./components/TodosList/TodosList";
import CreateTaskTab from "./components/CreateTaskTab/CreateTaskTab";

export default function MainSection() {
  const { activeFolder } = useTodos();

  const showCreateTab =
    activeFolder !== "completed" && activeFolder !== "deleted";

  return (
    <main className={styles.mainContent}>
      <Header />

      <section className={styles.todoContainer}>
        {showCreateTab && <CreateTaskTab />}

        <TodosList />
      </section>
    </main>
  );
}
