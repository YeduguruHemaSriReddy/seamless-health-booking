import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./components/common/Home";
import Login from "./components/common/Login";
import Register from "./components/common/Register";
import SendOtp from "./components/common/SendOtp";

import Userhome from "./components/user/Userhome";
import Userappointments from "./components/user/Userappointments";

import Adminhome from "./components/admin/Adminhome";
import Adminappointments from "./components/admin/Adminappointments";
import Admindoctor from "./components/admin/Admindoctor";
import AdminUsers from './components/admin/AdminUsers';

import Doctorhome from './pages/Doctorhome';
import DoctorAppointments from './pages/DoctorAppointments';

import DoctorApplicationForm from "./components/Doctor/DoctorApplicationForm";

// ✅ Protected Route Component
const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const userType = userData.type;

  if (!token || !userType) return <Navigate to="/login" />;
  if (role && userType !== role) return <Navigate to="/" />;
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/apply-doctor" element={<DoctorApplicationForm />} />
        <Route path="/send-otp" element={<SendOtp />} />

        
        {/* User Routes */}
        <Route
          path="/userhome"
          element={
            <ProtectedRoute role="user">
              <Userhome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/userappointments"
          element={
            <ProtectedRoute role="user">
              <Userappointments />
            </ProtectedRoute>
          }
        />
       

        {/* Doctor Routes */}
        <Route
          path="/doctorhome"
          element={
            <ProtectedRoute role="doctor">
              <Doctorhome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctorappointments"
          element={
            <ProtectedRoute role="doctor">
              <DoctorAppointments />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/adminhome"
          element={
            <ProtectedRoute role="admin">
              <Adminhome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/adminappointments"
          element={
            <ProtectedRoute role="admin">
              <Adminappointments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admindoctor"
          element={
            <ProtectedRoute role="admin">
              <Admindoctor />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/adminUsers"
          element={
            <ProtectedRoute role="admin">
              <AdminUsers />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
