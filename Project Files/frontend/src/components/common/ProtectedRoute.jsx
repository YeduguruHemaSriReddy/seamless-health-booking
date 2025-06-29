import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ role, children }) => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const token = localStorage.getItem('token');

  // Not logged in
  if (!userData || !token) {
    return <Navigate to="/" />;
  }

  // Role mismatch (e.g., user tries to open admin route)
  if (role && userData.type !== role) {
    return <Navigate to="/" />;
  }

  // All good
  return children;
};

export default ProtectedRoute;
