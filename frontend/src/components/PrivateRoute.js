// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, allowedRoles = [] }) => {
  const token = localStorage.getItem('access');
  let user = null;

  try {
    user = JSON.parse(localStorage.getItem('user'));
  } catch (e) {
    console.warn('⚠️ Failed to parse user from localStorage');
  }

  // 🔒 If not logged in, redirect to login
  if (!token || !user) {
    return <Navigate to="/login" />;
  }

  // 🚫 If role restriction fails, redirect to unauthorized
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default PrivateRoute;
