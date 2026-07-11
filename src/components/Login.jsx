import { useState } from "react";
import Button from "./Button";
import { authService } from "../services/api";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState();
  const handleSubmit = async (event) => {
    event.preventDefault();

    const loginDto = { email, password };

    try {
      const response = await authService.login(loginDto);
    } catch (error) {
      setLoginError(error.response?.data);
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
      {loginError != undefined && <h3>{"Error: " + loginError}</h3>}
      <Button type="submit">Login</Button>
    </form>
  );
}
