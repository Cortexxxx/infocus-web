import { useState, useEffect } from "react";
import { useTodos } from "@/context/TodosContext";
import { Info } from "lucide-react";
import { todoService } from "@/services/api";
import styles from "./Details.module.css";

import DetailsHeader from "./DetailsHeader";
import DetailsView from "./DetailsView";
import DetailsEdit from "./DetailsEdit";
import DetailsFooter from "./DetailsFooter";

export default function Details() {
  const { setTodos, selectedTodo, setSelectedTodo } = useTodos();
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    priority: "medium",
    deadline: "",
    scheduledDate: "",
  });

  // Хелпер для нормализации дат при переключении тасок в input type="date"
  const parseDate = (dateStr) => (dateStr ? dateStr.split("T")[0] : "");

  const resetFormValues = (todo) => ({
    title: todo.title || "",
    description: todo.description || "",
    priority: todo.priority || "medium",
    deadline: parseDate(todo.deadline),
    scheduledDate: parseDate(todo.scheduledDate),
  });

  useEffect(() => {
    if (selectedTodo) {
      setEditForm(resetFormValues(selectedTodo));
      setIsEditing(false);
    }
  }, [selectedTodo]);

  if (!selectedTodo) {
    return (
      <aside className={`${styles.sidebarRight} ${styles.hidden}`}>
        <div className={styles.emptyState}>
          <Info size={32} />
          <p>Выберите задачу, чтобы увидеть детали</p>
        </div>
      </aside>
    );
  }

  const handleInputChange = (field, value) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleCancel = () => {
    setEditForm(resetFormValues(selectedTodo));
    setIsEditing(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!editForm.title.trim() || isSubmitting) return;

    setIsSubmitting(true);

    try {
      // 1. Приводим DTO к нормальному формату для .NET API
      const updateDto = {
        ...editForm,
        title: editForm.title.trim(),
        description: editForm.description.trim(),
        deadline: editForm.deadline
          ? new Date(editForm.deadline).toISOString()
          : null,
        scheduledDate: editForm.scheduledDate
          ? new Date(editForm.scheduledDate).toISOString()
          : null,
      };

      const updatedTodo = await todoService.update(selectedTodo.id, updateDto);

      // 2. Обновляем стейты (если бэк ничего не вернул в response.data, используем updateDto)
      const finalTodo = updatedTodo || { ...selectedTodo, ...updateDto };

      setSelectedTodo(finalTodo);
      setTodos((prevTodos) =>
        Array.isArray(prevTodos)
          ? prevTodos.map((t) => (t.id === selectedTodo.id ? finalTodo : t))
          : [finalTodo],
      );

      setIsEditing(false);
    } catch {
      // Ошибки перехватываются Axios-интерцептором
    } finally {
      setIsSubmitting(false);
    }
  };

  // Выносим общий футер и общий хедер для сборки структуры
  const sharedFooter = (
    <DetailsFooter
      createdAt={selectedTodo.createdAt}
      isDone={selectedTodo.isDone}
    />
  );

  const sharedHeader = (
    <DetailsHeader
      isEditing={isEditing}
      onEditStart={() => setIsEditing(true)}
      onCancel={handleCancel}
      onClose={() => setSelectedTodo(null)}
      isValid={!!editForm.title.trim() && !isSubmitting}
    />
  );

  return (
    <aside className={styles.sidebarRight}>
      {isEditing ? (
        <DetailsEdit
          formState={editForm}
          onChange={handleInputChange}
          onSubmit={handleSave}
          header={sharedHeader}
          isSubmitting={isSubmitting}
        >
          {sharedFooter}
        </DetailsEdit>
      ) : (
        <>
          {sharedHeader}
          <DetailsView todo={selectedTodo}>{sharedFooter}</DetailsView>
        </>
      )}
    </aside>
  );
}
