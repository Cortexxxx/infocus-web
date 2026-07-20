import { useTags } from "@/context/TagsContext";
import { useTodos } from "@/context/TodosContext";
import styles from "../CreateTaskTab.module.css";
import Button from "@/components/UI/Button/Button";
import { useEffect } from "react";

export default function TaskCreatorTags({ taskForm, setTaskForm }) {
  const { tags } = useTags();
  const { isLoading, activeFolder } = useTodos();
  const handleTagToggle = (tagId) =>
    handleSetTag(tagId, taskForm.tags.includes(tagId));

  const handleSetTag = (tagId, hide) => {
    setTaskForm((prev) => ({
      ...prev,
      tags: hide
        ? prev.tags.filter((id) => id !== tagId)
        : [...prev.tags, tagId],
    }));
  };

  useEffect(() => {
    if (isLoading || !activeFolder) return;

    // Если мы зашли в папку тега
    if (activeFolder.startsWith("tag-")) {
      const currentFolderTagId = activeFolder.replace("tag-", "");

      // Добавляем тег, если его еще нет
      if (!taskForm.tags.includes(currentFolderTagId)) {
        handleSetTag(currentFolderTagId, false);
      }

      // ХОД КОНЕМ: Функция очистки (вызовется, когда activeFolder изменится)
      return () => {
        // Когда мы уходим из этой папки, принудительно убираем ЕЁ тег из формы
        setTaskForm((prev) => ({
          ...prev,
          tags: prev.tags.filter((id) => id !== currentFolderTagId),
        }));
      };
    }
  }, [activeFolder, isLoading]);

  if (!tags || tags.length === 0) return null;

  return (
    <div className={styles.tagsBlock}>
      <label>Теги:</label>
      <div className={styles.tagsContainer}>
        {tags.map((tag) => {
          const isSelected = taskForm.tags.includes(tag.id);
          return (
            <Button
              key={tag.id}
              type="button"
              className={`${styles.tagChip} ${isSelected ? styles.tagChipActive : ""}`}
              style={{ "--tag-color": tag.color }}
              onClick={() => handleTagToggle(tag.id)}
            >
              {tag.name}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
