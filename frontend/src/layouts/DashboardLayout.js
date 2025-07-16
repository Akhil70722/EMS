
import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import EmployeeSidebar from '../components/EmployeeSidebar';
import axios from '../api/axiosConfig';
import '../styles/DashboardLayout.css';

const DashboardLayout = () => {
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const res = await axios.get('/me/');
        setRole(res.data.role); // expects { role: 'admin' } or 'employee'
      } catch (err) {
        console.error('❌ Failed to fetch user role:', err);
        navigate('/login'); // Redirect if token expired or invalid
      } finally {
        setLoading(false);
      }
    };

    fetchRole();
  }, [navigate]);

  if (loading) return null; // Or show a loader here

  // 🎯 Show sidebar ONLY on exact `/dashboard` path
  const isDashboardPage = location.pathname === '/dashboard';

  return (
    <div className="dashboard-layout">
      {/* Render Sidebar ONLY for admin on /dashboard */}
      {isDashboardPage && role === 'admin' && <AdminSidebar />}
      {isDashboardPage && role === 'employee' && <EmployeeSidebar />}

      <div
        className={`dashboard-main-content ${
          isDashboardPage ? 'with-sidebar' : 'no-sidebar'
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
