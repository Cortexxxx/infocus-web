import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "@/components/UI/Button/Button";
import { authService } from "@/services/api.js";
import { AuthContext } from "@/context/AuthContext";
import toast from "react-hot-toast";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== repeatedPassword) {
      toast.error("Пароли не совпадают");
      return;
    }

    const registerDto = { email, password };
    setIsLoading(true);

    try {
      await authService.register(registerDto);
      await authService.login(registerDto);
      login();
      navigate("/dashboard", { replace: true });
    } catch {
      // Ошибки уже перехвачены и выведены через интерцептор
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h3>Email</h3>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isLoading}
      />

      <h3>Password</h3>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isLoading}
      />

      <h3>Repeat password</h3>
      <input
        type="password"
        value={repeatedPassword}
        onChange={(e) => setRepeatedPassword(e.target.value)}
        disabled={isLoading}
      />

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Регистрация..." : "Register"}
      </Button>
    </form>
  );
}
