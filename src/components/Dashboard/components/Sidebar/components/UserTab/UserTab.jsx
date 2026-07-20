import styles from "./UserTab.module.css";
import { useNavigate } from "react-router-dom";
import { authService } from "@/services/api.js";
import { useAuth } from "@/context/AuthContext";

import { LogOut, User } from "lucide-react";
import Button from "@/components/UI/Button/Button";
import toast from "react-hot-toast";

export default function UserTab() {
  const navigate = useNavigate();
  const { logout, email } = useAuth();

  const handleLogout = async () => {
    try {
      await authService.logout();
      logout();
      navigate("/login", { replace: true });
    } catch (error) {
      toast.error("Возникла ошибка при выходе из аккаунта");
    }
  };

  return (
    <div className={styles.userProfileBlock}>
      <div className={styles.userInfo}>
        <User size={28} className={styles.avatar} />
        <span className={styles.username}>{email}</span>
      </div>

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
