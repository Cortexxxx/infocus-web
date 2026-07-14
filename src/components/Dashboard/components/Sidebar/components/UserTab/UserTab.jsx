import styles from "./UserTab.module.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { authService } from "@/services/api.js";
import { AuthContext } from "@/context/AuthContext";

import { X, LogOut, Settings } from "lucide-react";
import Button from "@/components/UI/Button/Button";

export default function UserTab() {
  const user = {
    name: "Nikita",
    avatarUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80", // Мок-аватарка
  };
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = async () => {
    console.log("Выход из аккаунта...");
    try {
      await authService.logout();
      logout();
      navigate("/login", { replace: true });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={styles.userProfileBlock}>
      <div className={styles.userInfo}>
        <img src={user.avatarUrl} alt={user.name} className={styles.avatar} />
        <span className={styles.username}>{user.name}</span>
      </div>
      <Button variant="text" onClick={handleLogout} title="Settings">
        <Settings size={18} />
      </Button>

      <Button
        variant="text"
        onClick={handleLogout}
        className={styles.logoutButton}
        title="Logout"
      >
        <LogOut size={18} />
      </Button>
    </div>
  );
}
