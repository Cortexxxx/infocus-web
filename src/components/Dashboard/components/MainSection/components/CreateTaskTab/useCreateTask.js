import { useState } from "react";
import { todoService } from "@/services/api.js";
import { useTodos } from "@/context/TodosContext";
const EMPTY_FORM = {
  title: "",
  desc: "",
  date: "",
  deadline: "",
  tags: [],
};

export function useCreateTask() {
  const [taskForm, setTaskForm] = useState(EMPTY_FORM);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { setTodos } = useTodos();

  const handleCreate = async (e) => {
    e?.preventDefault();
    if (!taskForm.title.trim() || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const todoDto = {
        title: taskForm.title.trim(),
        description: taskForm.desc.trim() || "",
        scheduledDate: taskForm.date ? new Date(taskForm.date).toISOString() : null,
        deadline: taskForm.deadline ? new Date(taskForm.deadline).toISOString() : null,
        tagIds: taskForm.tags,
      };

      const response = await todoService.create(todoDto);
      
      setTodos((prevTodos) => 
        Array.isArray(prevTodos) ? [...prevTodos, response] : [response]
      );

      resetForm();
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