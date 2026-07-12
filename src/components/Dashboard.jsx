import Task from "./Task/Task";
import { todoService } from "../services/api";
import { useEffect, useState } from "react";
export default function Dashboard() {
  const [todos, setTodos] = useState([]);

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
    <>
      <section>
        <h1>Welcome to your Todos!</h1>
      </section>
      <section>
        {todos.map((todo) => (
          // Не забывай передавать уникальный key (например, id из базы)
          <Task key={todo.id} data={todo}>
            {todo.title}
          </Task>
        ))}
      </section>
    </>
  );
}
