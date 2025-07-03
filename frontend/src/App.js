// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import EmployeeDetail from './components/EmployeeDetail';
import Dashboard from './pages/Dashboard';
import DepartmentList from './components/DepartmentList';
import DepartmentForm from './components/DepartmentForm';
import Attendance from './components/Attendance';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute'; // Importing private route

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/employees"
          element={
            <PrivateRoute>
              <EmployeeList />
            </PrivateRoute>
          }
        />
        <Route
          path="/employees/add"
          element={
            <PrivateRoute>
              <EmployeeForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/employees/edit/:id"
          element={
            <PrivateRoute>
              <EmployeeForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/employees/:id"
          element={
            <PrivateRoute>
              <EmployeeDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/departments"
          element={
            <PrivateRoute>
              <DepartmentList />
            </PrivateRoute>
          }
        />
        <Route
          path="/departments/add"
          element={
            <PrivateRoute>
              <DepartmentForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/departments/edit/:id"
          element={
            <PrivateRoute>
              <DepartmentForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/attendance"
          element={
            <PrivateRoute>
              <Attendance />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}
