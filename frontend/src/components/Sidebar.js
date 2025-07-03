import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Sidebar.css';
import api from '../api/axiosConfig';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleExportCSV = async () => {
    try {
      const res = await api.get('employees/');
      const employees = res.data;

      if (!employees.length) {
        alert('No employee data to export.');
        return;
      }

      const headers = Object.keys(employees[0]);
      const csvRows = [
        headers.join(','),
        ...employees.map(emp =>
          headers.map(field => JSON.stringify(emp[field] ?? '')).join(',')
        )
      ];

      const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'employee_report.csv';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('❌ Failed to export CSV:', err);
      alert('Export failed. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    navigate('/login');
  };

  return (
    <div className="sidebar">
      <h2>🧑‍💼 EMS Dashboard</h2>
      <ul className="sidebar-links">
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/employees">Employee List</Link></li>
        <li><Link to="/employees/add">Add Employee</Link></li>
        <li><Link to="/departments">Departments</Link></li>
        <li><Link to="/attendance">Attendance</Link></li>
        <li>
          <button onClick={handleExportCSV} className="csv-export-btn">
            Reports / Export CSV
          </button>
        </li>
        <li><Link to="/settings">Settings</Link></li>
        <li>
          <button onClick={handleLogout} className="logout-btn">
          Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
