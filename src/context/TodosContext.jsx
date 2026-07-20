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
      const response = await todoService.getAll(activeFolder);
      setTodos(Array.isArray(response) ? response : []);
    } catch (error) {
      setTodos([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchTodos();
    } else {
      setTodos([]);
      setSelectedTodo(null);
      setIsLoading(false);
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
