import { useState } from "react";
import { todoService } from "@/services/api.js";

const EMPTY_FORM = {
  title: "",
  desc: "",
  date: "",
  deadline: "",
  tags: [],
};

export function useCreateTask(setTodos) {
  const [taskForm, setTaskForm] = useState(EMPTY_FORM);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!taskForm.title.trim()) return;

    try {
      const todoDto = {
        title: taskForm.title.trim(),
        description: taskForm.desc.trim() || "",
        scheduledDate: taskForm.date ? new Date(taskForm.date).toISOString() : null,
        deadline: taskForm.deadline ? new Date(taskForm.deadline).toISOString() : null,
        tagIds: taskForm.tags,
      };

      const response = await todoService.create(todoDto);
      if (setTodos) setTodos((prevTodos) => [...prevTodos, response]);

      resetForm();
    } catch (error) {
      console.error("Ошибка при создании задачи:", error);
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
    handleCreate,
    resetForm,
  };
}