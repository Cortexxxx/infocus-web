import styles from "./Sidebar.module.css";

import Logo from "./components/Logo";
import UserTab from "./components/UserTab/UserTab";

export default function Sidebar() {
  return (
    <aside className={styles.sidebarLeft}>
      <div className={styles.sidebarTopContent}>
        <div className={styles.logoWrapper}>
          <Logo />
        </div>
        <h3>Папки / Заметки</h3>
        <p className={styles.sidebarLeftPlaceholder}>
          Тут скоро что-то будет...
        </p>
      </div>

      <UserTab />
    </aside>
  );
}
