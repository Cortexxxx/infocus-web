import { useState } from "react";
import styles from "./Sidebar.module.css";
import Logo from "./components/Logo";
import UserTab from "./components/UserTab/UserTab";
import AddTagPopover from "./components/AddTagPopover/AddTagPopover";
import Button from "@/components/UI/Button/Button";
import { useTags } from "@/context/TagsContext";
import { useTodos } from "@/context/TodoContext";

import {
  Inbox,
  CalendarDays,
  CalendarRange,
  Tag,
  CheckCircle2,
  Trash2,
  Plus,
} from "lucide-react";

export default function Sidebar() {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [triggerRect, setTriggerRect] = useState(null);
  const { tags, handleAddTag } = useTags();
  const { activeFolder, setActiveFolder } = useTodos();

  const handleOpenPopover = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTriggerRect(rect);
    setIsPopoverOpen(true);
  };

  // Системные разделы
  const mainFolders = [
    { id: "inbox", name: "Входящие", icon: <Inbox size={18} /> },
    { id: "today", name: "Сегодня", icon: <CalendarDays size={18} /> },
    { id: "tomorrow", name: "Завтра", icon: <CalendarRange size={18} /> },
  ];

  const archiveFolders = [
    { id: "completed", name: "Выполненные", icon: <CheckCircle2 size={18} /> },
    { id: "deleted", name: "Корзина", icon: <Trash2 size={18} /> },
  ];

  return (
    <aside className={styles.sidebarLeft}>
      <div className={styles.sidebarTopContent}>
        <div className={styles.logoWrapper}>
          <Logo />
        </div>

        {/* Группа 1: Главные */}
        <nav className={styles.navGroup}>
          <span className={styles.groupTitle}>Быстрый доступ</span>

          <ul className={styles.navList}>
            {mainFolders.map((folder) => {
              const isActive = activeFolder === folder.id;
              return (
                <li key={folder.id}>
                  <button
                    type="button"
                    className={`${styles.navItem} ${isActive ? styles.active : ""}`}
                    onClick={() => setActiveFolder(folder.id)}
                  >
                    <span className={styles.iconWrapper}>{folder.icon}</span>
                    <span className={styles.navLabel}>{folder.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Группа 2: По тегам */}
        <nav className={styles.navGroup}>
          <div className={styles.groupHeader}>
            <span className={styles.groupTitle}>Теги</span>
            <Button
              variant="text"
              className={styles.addButton}
              onClick={handleOpenPopover}
            >
              <Plus size={15} />
            </Button>
          </div>

          <ul className={styles.navList}>
            {tags.map((tag) => {
              const folderId = `tag-${tag.id}`;
              const isActive = activeFolder === folderId;
              return (
                <li key={tag.id}>
                  <button
                    type="button"
                    className={`${styles.navItem} ${isActive ? styles.active : ""}`}
                    onClick={() => setActiveFolder(folderId)}
                  >
                    <span className={styles.iconWrapper}>
                      <Tag size={16} style={{ color: tag.color }} />
                    </span>
                    <span className={styles.navLabel}>{tag.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Группа 3: Остальные */}
        <nav className={styles.navGroup}>
          <span className={styles.groupTitle}>Архив</span>
          <ul className={styles.navList}>
            {archiveFolders.map((folder) => {
              const isActive = activeFolder === folder.id;
              return (
                <li key={folder.id}>
                  <button
                    type="button"
                    className={`${styles.navItem} ${isActive ? styles.active : ""}`}
                    onClick={() => setActiveFolder(folder.id)}
                  >
                    <span className={styles.iconWrapper}>{folder.icon}</span>
                    <span className={styles.navLabel}>{folder.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <UserTab />
      <AddTagPopover
        isOpen={isPopoverOpen}
        onClose={() => setIsPopoverOpen(false)}
        onAdd={handleAddTag}
        triggerRect={triggerRect}
      />
    </aside>
  );
}
