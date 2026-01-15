import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Planned from "./pages/Planned";
import MyTasks from "./pages/MyTasks";
import Teams from "./pages/Teams";
import TeamTasks from "./pages/TeamTasks";

export default function App() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* DEFAULT ROUTE */}
      <Route
        path="/"
        element={<Navigate to={user ? "/dashboard" : "/login"} />}
      />

      {/* PUBLIC ROUTES */}
      <Route
        path="/login"
        element={!user ? <Login /> : <Navigate to="/dashboard" />}
      />

      <Route
        path="/register"
        element={!user ? <Register /> : <Navigate to="/dashboard" />}
      />

      {/* PROTECTED ROUTES */}
      <Route
        path="/dashboard"
        element={user ? <Dashboard /> : <Navigate to="/login" />}
      />

      <Route
        path="/planned"
        element={user ? <Planned /> : <Navigate to="/login" />}
      />

      <Route
        path="/my-tasks"
        element={user ? <MyTasks /> : <Navigate to="/login" />}
      />

      <Route
        path="/teams"
        element={user ? <Teams /> : <Navigate to="/login" />}
      />

      <Route
        path="/teams/:id"
        element={user ? <TeamTasks /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}
