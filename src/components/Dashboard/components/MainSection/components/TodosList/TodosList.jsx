import Task from "./components/Task/Task";

export default function TodosList({ onSelect, todos, setTodos, selectedTodo }) {
  return (
    <>
      {todos.map((todo) => (
        <Task
          key={todo.id}
          data={todo}
          onSelect={() => onSelect(todo)}
          isActive={selectedTodo?.id === todo.id}
          onDelete={(deletedId) => {
            setTodos((prevTodos) =>
              prevTodos.filter((t) => t.id !== deletedId),
            );

            if (selectedTodo?.id === deletedId) {
              onSelect(null);
            }
          }}
        />
      ))}
    </>
  );
}
