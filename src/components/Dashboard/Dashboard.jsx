import { todoService } from "../../services/api";
import { useEffect, useState } from "react";

import styles from "./Dashboard.module.css";

import Sidebar from "./components/Sidebar/Sidebar";
import Details from "./components/Details/Details";
import MainSection from "./components/MainSection/MainSection";

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

  return (
    <div className={styles.dashboardLayout}>
      <Sidebar />

      <MainSection
        selectedTodo={selectedTodo}
        todos={todos}
        onSelect={(todo) => setSelectedTodo(todo)}
        setTodos={setTodos}
      />

      <Details setSelectedTodo={setSelectedTodo} selectedTodo={selectedTodo} />
    </div>
  );
}
