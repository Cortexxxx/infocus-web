import { useState } from "react";
import styles from "./Authentication.module.css";

import Login from "./components/Login";
import Register from "./components/Register";
import Button from "@/components/UI/Button/Button";

export default function Authentication() {
  const [window, setWindow] = useState("login");

  return (
    <div className={styles.authPage}>
      <section className={styles.authCard}>
        <h1>Login or register in app</h1>

        <div className={styles.tabContainer}>
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
        </div>

        {window === "login" && <Login />}
        {window === "register" && <Register />}
      </section>
    </div>
  );
}
