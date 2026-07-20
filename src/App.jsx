import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import Authentication from "./components/Authentication/Authentication";
import Dashboard from "./components/Dashboard/Dashboard";
import { Toaster } from "react-hot-toast";
import { TagsProvider } from "./context/TagsContext";
import { TodosProvider } from "./context/TodosContext";

function App() {
  return (
    <>
      <AuthProvider>
        <TagsProvider>
          <TodosProvider>
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
          </TodosProvider>
        </TagsProvider>
      </AuthProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
        }}
      />
    </>
  );
}

export default App;
