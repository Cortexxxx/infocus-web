import { useState } from "react";
import Button from "./Button";
import { authService } from "../services/api";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== repeatedPassword) {
      alert("Пароли не совпадают"); // Заглушка
      return;
    }

    const registerDto = { email, password };

    try {
      const response = await authService.register(registerDto);
    } catch (error) {
      alert("Ошибка " + error.response?.status); // Заглушка
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Email</h3>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <h3>Password</h3>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <h3>Repeat password</h3>
      <input
        type="password"
        value={repeatedPassword}
        onChange={(e) => setRepeatedPassword(e.target.value)}
        required
      />

      <Button type="submit">Register</Button>
    </form>
  );
}
