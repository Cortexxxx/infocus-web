import { useContext, useState } from "react";
import Button from "./Button";
import { authService } from "../services/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState();

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const handleSubmit = async (event) => {
    event.preventDefault();

    const loginDto = { email, password };

    try {
      const response = await authService.login(loginDto);
      login();
      navigate("/dashboard", { replace: true });
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
