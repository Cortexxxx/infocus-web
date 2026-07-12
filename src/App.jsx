import { BrowserRouter, Route, Routes } from "react-router-dom";
import Authentication from "./components/Authentication/Authentication";
import Dashboard from "./components/Dashboard/Dashboard";
import { AuthProvider } from "./context/AuthContext";
import { todoService } from "./services/api";
import { authService } from "./services/api";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Authentication />
                </PublicRoute>
              }
            ></Route>
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            ></Route>
            <Route path="*" element={<div>404 Not found</div>}></Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
