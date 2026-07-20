import { useContext, useState } from "react";
import Button from "@/components/UI/Button/Button";
import { authService } from "@/services/api.js";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const loginDto = { email, password };

    try {
      await authService.login(loginDto);
      login(email);
      navigate("/dashboard", { replace: true });
    } catch (error) {}
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h3>Email</h3>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <h3>Password</h3>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit">Login</Button>
    </form>
  );
}
