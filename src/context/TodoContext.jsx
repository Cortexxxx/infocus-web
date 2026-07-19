import { todoService } from "@/services/api";
import { createContext, useEffect, useState, useContext } from "react";
import { useAuth } from "@/context/AuthContext";
export const TodosContext = createContext();
export const useTodos = () => useContext(TodosContext);

export function TodosProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [activeFolder, setActiveFolder] = useState("today");
  const { isAuthenticated } = useAuth();

  const fetchTodos = async () => {
    setIsLoading(true);
    try {
      const currentDateTime = new Date().toISOString();
      const response = await todoService.getAll(activeFolder, currentDateTime);
      console.log(response);
      setTodos(response);
    } catch (error) {
      console.error("Error while fetching todos", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchTodos();
    } else {
      setTodos([]);
      setIsLoading(false);
      setSelectedTodo(null);
    }
  }, [isAuthenticated, activeFolder]);
  return (
    <TodosContext.Provider
      value={{
        todos,
        setTodos,
        fetchTodos,
        activeFolder,
        setActiveFolder,
        selectedTodo,
        setSelectedTodo,
        isLoading,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
}
