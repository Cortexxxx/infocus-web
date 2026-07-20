import { createContext, useEffect, useState, useContext } from "react";
import { authService } from "../services/api";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState(null);

  function login(userEmail) {
    setIsAuthenticated(true);
    if (userEmail) setEmail(userEmail);
  }

  function logout() {
    setIsAuthenticated(false);
    setEmail(null);
  }

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const data = await authService.getStatus();
        setEmail(data.email);
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
        setEmail(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, login, logout, email }}
    >
      {children}
    </AuthContext.Provider>
  );
}
