import { useRef, useState } from "react";
import { todoService } from "@/services/api.js";
import { useTodos } from "@/context/TodosContext";
const EMPTY_FORM = {
  title: "",
  desc: "",
  priority: "None",
  date: "",
  deadline: "",
  tags: [],
};

export function useCreateTask(titleInputRef) {
  const [taskForm, setTaskForm] = useState(EMPTY_FORM);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { fetchTodos } = useTodos();

  const handleCreate = async (e) => {
    e?.preventDefault();
    
    if (!taskForm.title.trim() || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const todoDto = {
        title: taskForm.title.trim(),
        description: taskForm.desc.trim() || "",
        priority: taskForm.priority.trim() || "None",
        scheduledDate: taskForm.date ? new Date(taskForm.date).toISOString() : null,
        deadline: taskForm.deadline ? new Date(taskForm.deadline).toISOString() : null,
        tagIds: taskForm.tags,
      };

      const response = await todoService.create(todoDto);
      
      fetchTodos();

      resetForm();
      titleInputRef.current?.blur();
    } catch {
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setTaskForm(EMPTY_FORM);
    setIsExpanded(false);
  };

  return {
    taskForm,
    setTaskForm,
    isExpanded,
    setIsExpanded,
    isSubmitting,
    handleCreate,
    resetForm,
  };
}