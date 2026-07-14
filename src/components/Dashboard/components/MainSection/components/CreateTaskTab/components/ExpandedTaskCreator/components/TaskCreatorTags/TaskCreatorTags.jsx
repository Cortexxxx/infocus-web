import styles from "./TaskCreatorTags.module.css";

import Button from "@/components/UI/Button/Button";

export default function TaskCreatorTags({ taskForm, setTaskForm, userTags }) {
  if (!userTags || userTags.length === 0) return null;

  return (
    <div className={styles.tagsBlock}>
      <label>Теги:</label>
      <div className={styles.tagsContainer}>
        {userTags.map((tag) => {
          const isSelected = taskForm.tags.includes(tag.id);
          return (
            <Button
              key={tag.id}
              type="button"
              className={`${styles.tagChip} ${isSelected ? styles.tagChipActive : ""}`}
              style={{ "--tag-color": tag.color }}
              onClick={() => {
                setTaskForm((prev) => ({
                  ...prev,
                  tags: prev.tags.includes(tag.id)
                    ? prev.tags.filter((id) => id !== tag.id)
                    : [...prev.tags, tag.id],
                }));
              }}
            >
              {tag.name}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
