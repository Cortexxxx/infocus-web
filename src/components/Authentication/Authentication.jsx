import { useState } from "react";
import Login from "../Login";
import Register from "../Register";
import Button from "../Button";
import "./Authentication.css";
export default function Authentication() {
  const [window, setWindow] = useState("login");
  return (
    <section>
      <h1>Login or register in app</h1>
      <section className="tab-container">
        <Button
          isActive={window === "login"}
          onClick={() => setWindow("login")}
        >
          Login
        </Button>
        <Button
          isActive={window === "register"}
          onClick={() => setWindow("register")}
        >
          Register
        </Button>
      </section>
      {window === "login" && <Login />}
      {window === "register" && <Register />}
    </section>
  );
}
