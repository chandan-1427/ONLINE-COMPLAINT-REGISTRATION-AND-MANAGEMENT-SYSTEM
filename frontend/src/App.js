import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Public Pages
import Home from "./components/common/pages/Home";
import Login from "./components/common/pages/Login";
import SignUp from "./components/common/pages/SignUp";

// User Pages
import HomePage from "./components/user/HomePage";
import Complaint from "./components/user/Complaint";
import Status from "./components/user/Status";

// Admin Pages (New Structure)
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminUsers from "./components/admin/AdminUsers";
import AdminAgents from "./components/admin/AdminAgents";

// Agent
import AgentHome from "./components/agent/AgentHome";

// Protected Route
import ProtectedRoute from "./components/common/routes/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* USER ROUTES */}
        <Route
          path="/homepage"
          element={
            <ProtectedRoute allowedRole="Ordinary">
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/complaint"
          element={
            <ProtectedRoute allowedRole="Ordinary">
              <Complaint />
            </ProtectedRoute>
          }
        />
        <Route
          path="/status"
          element={
            <ProtectedRoute allowedRole="Ordinary">
              <Status />
            </ProtectedRoute>
          }
        />

        {/* ADMIN ROUTES (Nested) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="Admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="agents" element={<AdminAgents />} />
        </Route>

        {/* AGENT ROUTES */}
        <Route
          path="/agent"
          element={
            <ProtectedRoute allowedRole="Agent">
              <AgentHome />
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;
