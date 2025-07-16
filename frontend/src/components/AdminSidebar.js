import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles/Sidebar.css';
import api from '../api/axiosConfig';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [role, setRole] = useState('');
  const [showProjects, setShowProjects] = useState(false);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const res = await api.get('me/');
        setRole(res.data.role);
      } catch (err) {
        console.error('Failed to fetch user role');
      }
    };
    fetchUserRole();
  }, []);

  const flattenEmployee = (emp) => ({
    id: emp.id,
    username: emp.user?.username || '',
    email: emp.user?.email || '',
    role: emp.user?.role || '',
    name: emp.name || '',
    phone: emp.phone || '',
    department: emp.department || '',
    designation: emp.designation || '',
    salary: emp.salary || '',
    is_active: emp.is_active ? 'Yes' : 'No',
    created_at: emp.created_at || '',
    updated_at: emp.updated_at || '',
  });

  const handleExportCSV = async () => {
    try {
      const res = await api.get('employees/');
      const employees = res.data;

      if (!employees.length) {
        alert('No employee data to export.');
        return;
      }

      const flattened = employees.map(flattenEmployee);
      const headers = Object.keys(flattened[0]);

      const csvRows = [
        headers.join(','),
        ...flattened.map(emp =>
          headers.map(field => `"${(emp[field] ?? '').toString().replace(/"/g, '""')}"`).join(',')
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
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  if (!role) return null;

  return (
    <div className="sidebar">
      <div className="sidebar-title">🧑‍💼 EMS Dashboard</div>
      <ul className="sidebar-links">
        {/* Common */}
        <li className={isActive('/dashboard') ? 'active' : ''}>
          <Link to="/dashboard">📊 Dashboard</Link>
        </li>
        <li className={isActive('/employees') ? 'active' : ''}>
          <Link to="/employees">👥 Employee List</Link>
        </li>
        <li className={isActive('/employees/add') ? 'active' : ''}>
          <Link to="/employees/add">➕ Add Employee</Link>
        </li>
        <li className={isActive('/departments') ? 'active' : ''}>
          <Link to="/departments">🏢 Departments</Link>
        </li>
        <li className={isActive('/attendance') ? 'active' : ''}>
          <Link to="/attendance">📅 Attendance</Link>
        </li>

        {/* Employee-only links */}
        {role === 'employee' && (
          <>
            <li className={isActive('/my-leave-requests') ? 'active' : ''}>
              <Link to="/my-leave-requests">📝 Leave Requests</Link>
            </li>
            <li className={isActive('/my-salary') ? 'active' : ''}>
              <Link to="/my-salary">💸 Salary Slips</Link>
            </li>
            <li className={isActive('/my-tasks') ? 'active' : ''}>
              <Link to="/my-tasks">🧾 My Tasks</Link>
            </li>
          </>
        )}

        {/* Admin-only links */}
        {role === 'admin' && (
          <>
            <li className={isActive('/leave/requests') ? 'active' : ''}>
              <Link to="/leave/requests">🗂 Leave Requests</Link>
            </li>
            <li className={isActive('/salary/slips') ? 'active' : ''}>
              <Link to="/salary/slips">📂 All Salary Slips</Link>
            </li>
            <li className={isActive('/salary/create') ? 'active' : ''}>
              <Link to="/salary/create">💳 Create Salary Slip</Link>
            </li>

            {/* 📁 Projects Folder */}
            <li>
              <div
                className="folder-toggle"
                onClick={() => setShowProjects(!showProjects)}
              >
                📁 Projects {showProjects ? '▲' : '▼'}
              </div>
              {showProjects && (
                <ul className="nested-project-list">
                  <li className={isActive('/projects/create') ? 'active' : ''}>
                    <Link to="/projects/create">➕ Create Project</Link>
                  </li>
                  <li className={isActive('/projects/list') ? 'active' : ''}>
                    <Link to="/projects/list">📃 Project List</Link>
                  </li>
                </ul>
              )}
            </li>

            <li className={isActive('/tasks/create') ? 'active' : ''}>
              <Link to="/projects/assign">📌 Assign Projects</Link>
            </li>
            <li className={isActive('/project-updates/review') ? 'active' : ''}>
              <Link to="/project-updates/review" className="sidebar-btn">🗂️ Review Project Updates</Link>
            </li>
          </>
        )}
        
        {/* Export & Logout */}
        <li>
          <button onClick={handleExportCSV} className="special">
            📥 Reports / Export CSV
          </button>
        </li>
        <li>
          <button onClick={handleLogout} className="special logout">
            🚪 Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
