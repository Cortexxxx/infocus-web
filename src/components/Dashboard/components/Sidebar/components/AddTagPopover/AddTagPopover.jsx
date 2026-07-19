import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styles from "./AddTagPopover.module.css";
import Button from "@/components/UI/Button/Button";

const PRESET_COLORS = [
  "#3b82f6",
  "#ef4444",
  "#10b981",
  "#f59e0b",
  "#8b5cf6",
  "#ec4899",
];

export default function AddTagPopover({ isOpen, onClose, onAdd, triggerRect }) {
  const [tagName, setTagName] = useState("");
  const [selectedColor, setSelectedColor] = useState(PRESET_COLORS[0]);
  const popoverRef = useRef(null);
  const inputRef = useRef(null);

  // 1. Закрытие по клику вовне (Click Outside)
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      // Если кликнули мимо поповера — закрываем его
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  // 2. Автофокус при открытии
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setTagName("");
      setSelectedColor(PRESET_COLORS[0]);
    }
  }, [isOpen]);

  if (!isOpen || !triggerRect) return null;

  const popoverWidth = 240;
  const gap = 6;

  const top = triggerRect.bottom + window.scrollY + gap;
  const left = triggerRect.right + window.scrollX - popoverWidth;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tagName.trim()) return;

    onAdd({ name: tagName.trim(), color: selectedColor });
    onClose();
  };

  return createPortal(
    <div
      ref={popoverRef}
      className={styles.popover}
      style={{
        position: "fixed",
        top: `${top}px`,
        left: `${left}px`,
        width: `${popoverWidth}px`,
      }}
    >
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Название тега..."
          value={tagName}
          onChange={(e) => setTagName(e.target.value)}
          className={styles.input}
          maxLength={20}
        />

        <div className={styles.colorGrid}>
          {PRESET_COLORS.map((color) => (
            <button
              key={color}
              type="button"
              className={`${styles.colorDot} ${selectedColor === color ? styles.activeColor : ""}`}
              style={{ "--tag-color": color }}
              onClick={() => setSelectedColor(color)}
            />
          ))}
        </div>

        <div className={styles.actions}>
          <Button type="button" onClick={onClose} className={styles.cancelBtn}>
            Отмена
          </Button>
          <Button
            type="submit"
            disabled={!tagName.trim()}
            className={styles.submitBtn}
          >
            Создать
          </Button>
        </div>
      </form>
    </div>,
    document.body, // <-- Монтируем прямо в корень документа
  );
}
