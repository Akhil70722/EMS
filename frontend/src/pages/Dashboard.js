// import React, { useEffect, useState } from 'react';
// import Navbar from '../components/AdminNavbar';
// import Sidebar from '../components/AdminSidebar';
// import StatCard from '../components/StatCard';
// import AttendanceTable from '../components/AttendanceTable';
// import EmployeeChart from '../components/EmployeeChart';
// import api from '../api/axiosConfig'; // ✅ custom axios instance
// import '../styles/Dashboard.css';

// const Dashboard = () => {
//   const [stats, setStats] = useState({ active: 0, total: 0, attendance: 0, inactive: 0 });
//   const [employees, setEmployees] = useState([]);
//   const [departmentStats, setDepartmentStats] = useState({});

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const res = await api.get('employees/'); // ✅ use api instead of axios
//         const data = res.data;

//         const activeCount = data.filter(emp => emp.is_active).length;
//         const totalCount = data.length;
//         const inactiveCount = totalCount - activeCount;

//         const attendancePercent = totalCount === 0 ? 0 : Math.round((activeCount / totalCount) * 100);

//         setStats({
//           active: activeCount,
//           inactive: inactiveCount,
//           total: totalCount,
//           attendance: attendancePercent
//         });

//         const recentEmployees = data.slice(0, 5).map(emp => ({
//           employee: emp.name,
//           date: new Date().toISOString().slice(0, 10),
//           status: emp.is_active ? 'Present' : 'Absent'
//         }));

//         setEmployees(recentEmployees);

//         const deptCount = {};
//         data.forEach(emp => {
//           const dept = emp.department || 'Unknown';
//           deptCount[dept] = (deptCount[dept] || 0) + 1;
//         });
//         setDepartmentStats(deptCount);
//       } catch (err) {
//         console.error('❌ Error fetching employees:', err);
//       }
//     };

//     fetchEmployees();
//   }, []);

//   return (
//     <div className="dashboard-container">
//       <Sidebar />
//       <div className="main-content">
//         <Navbar />

//         <div className="stat-card-grid">
//           <StatCard title="Total Employees" value={stats.total} type="total" />
//           <StatCard title="Active Employees" value={stats.active} type="active" />
//           <StatCard title="Inactive Employees" value={stats.inactive} type="inactive" />
//           <StatCard title="Attendance" value={`${stats.attendance}%`} type="attendance" />
//         </div>

//         <div style={{ marginTop: '2rem' }}>
//           <h3 style={{ marginBottom: '1rem' }}>Employees by Department</h3>
//           <EmployeeChart data={departmentStats} />
//         </div>

//         <div className="attendance-section">
//           <h3>Recent Attendance</h3>
//           <AttendanceTable data={employees} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


// import React, { useEffect, useState } from 'react';
// import Navbar from '../components/AdminNavbar';
// import Sidebar from '../components/AdminSidebar';
// import StatCard from '../components/StatCard';
// import AttendanceTable from '../components/AttendanceTable';
// import EmployeeChart from '../components/EmployeeChart';
// import api from '../api/axiosConfig'; // ✅ custom axios instance
// import '../styles/Dashboard.css';

// const Dashboard = () => {
//   const [stats, setStats] = useState({ active: 0, total: 0, attendance: 0, inactive: 0 });
//   const [employees, setEmployees] = useState([]);
//   const [departmentStats, setDepartmentStats] = useState({});

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const res = await api.get('employees/'); // ✅ use api instead of axios
//         const data = res.data;

//         const activeCount = data.filter(emp => emp.is_active).length;
//         const totalCount = data.length;
//         const inactiveCount = totalCount - activeCount;

//         const attendancePercent = totalCount === 0 ? 0 : Math.round((activeCount / totalCount) * 100);

//         setStats({
//           active: activeCount,
//           inactive: inactiveCount,
//           total: totalCount,
//           attendance: attendancePercent
//         });

//         const recentEmployees = data.slice(0, 5).map(emp => ({
//           employee: emp.name,
//           date: new Date().toISOString().slice(0, 10),
//           status: emp.is_active ? 'Present' : 'Absent'
//         }));

//         setEmployees(recentEmployees);

//         const deptCount = {};
//         data.forEach(emp => {
//           const dept = emp.department || 'Unknown';
//           deptCount[dept] = (deptCount[dept] || 0) + 1;
//         });
//         setDepartmentStats(deptCount);
//       } catch (err) {
//         console.error('❌ Error fetching employees:', err);
//       }
//     };

//     fetchEmployees();
//   }, []);

//   return (
//     <div className="dashboard-container">
//       <Sidebar />
//       <div className="main-content">
//         {/* 🎥 Video Background */}
//         <video
//           className="background-video"
//           autoPlay
//           muted
//           loop
//           playsInline
//         >
//           <source src="https://cdn.pixabay.com/video/2021/09/08/87786-602074234_large.mp4" type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>

//         <Navbar />

//         <div className="stat-card-grid">
//           <StatCard title="Total Employees" value={stats.total} type="total" />
//           <StatCard title="Active Employees" value={stats.active} type="active" />
//           <StatCard title="Inactive Employees" value={stats.inactive} type="inactive" />
//           <StatCard title="Attendance" value={`${stats.attendance}%`} type="attendance" />
//         </div>

//         <div className="chart-container">
//           <h3>Employees by Department</h3>
//           <EmployeeChart data={departmentStats} />
//         </div>

//         <div className="attendance-section">
//           <h3>Recent Attendance</h3>
//           <AttendanceTable data={employees} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


// import React, { useEffect, useState } from 'react';
// import Navbar from '../components/AdminNavbar';
// import Sidebar from '../components/AdminSidebar';
// import StatCard from '../components/StatCard';
// import AttendanceTable from '../components/AttendanceTable';
// import EmployeeChart from '../components/EmployeeChart';
// import api from '../api/axiosConfig'; // ✅ custom axios instance
// import '../styles/Dashboard.css';

// const Dashboard = () => {
//   const [stats, setStats] = useState({ active: 0, total: 0, attendance: 0, inactive: 0 });
//   const [employees, setEmployees] = useState([]);
//   const [departmentStats, setDepartmentStats] = useState({});

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const res = await api.get('employees/'); // ✅ use api instead of axios
//         const data = res.data;

//         const activeCount = data.filter(emp => emp.is_active).length;
//         const totalCount = data.length;
//         const inactiveCount = totalCount - activeCount;

//         const attendancePercent = totalCount === 0 ? 0 : Math.round((activeCount / totalCount) * 100);

//         setStats({
//           active: activeCount,
//           inactive: inactiveCount,
//           total: totalCount,
//           attendance: attendancePercent
//         });

//         const recentEmployees = data.slice(0, 5).map(emp => ({
//           employee: emp.name,
//           date: new Date().toISOString().slice(0, 10),
//           status: emp.is_active ? 'Present' : 'Absent'
//         }));

//         setEmployees(recentEmployees);

//         const deptCount = {};
//         data.forEach(emp => {
//           const dept = emp.department || 'Unknown';
//           deptCount[dept] = (deptCount[dept] || 0) + 1;
//         });
//         setDepartmentStats(deptCount);
//       } catch (err) {
//         console.error('❌ Error fetching employees:', err);
//       }
//     };

//     fetchEmployees();
//   }, []);

//   return (
//     <div className="dashboard-container">
//       <Sidebar />
//       <div className="main-content">
//         {/* 🎥 Video Background */}
//         <video
//           className="background-video"
//           autoPlay
//           muted
//           loop
//           playsInline
//         >
//           <source src="https://cdn.pixabay.com/video/2021/09/08/87786-602074234_large.mp4" type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>

//         <Navbar />

//         <div className="stat-card-grid">
//           <StatCard title="Total Employees" value={stats.total} type="total" />
//           <StatCard title="Active Employees" value={stats.active} type="active" />
//           <StatCard title="Inactive Employees" value={stats.inactive} type="inactive" />
//           <StatCard title="Attendance" value={`${stats.attendance}%`} type="attendance" />
//         </div>

//         <div className="chart-container">
//           <h3>Employees by Department</h3>
//           <EmployeeChart data={departmentStats} />
//         </div>

//         <div className="attendance-section">
//           <h3>Recent Attendance</h3>
//           <AttendanceTable data={employees} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import React, { useEffect, useState } from 'react';
import Navbar from '../components/AdminNavbar';
import Sidebar from '../components/AdminSidebar';
import StatCard from '../components/StatCard';
import AttendanceTable from '../components/AttendanceTable';
import EmployeeChart from '../components/EmployeeChart';
import api from '../api/axiosConfig'; // ✅ custom axios instance
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({ active: 0, total: 0, attendance: 0, inactive: 0 });
  const [employees, setEmployees] = useState([]);
  const [departmentStats, setDepartmentStats] = useState({});

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await api.get('employees/'); // ✅ use api instead of axios
        const data = res.data;

        const activeCount = data.filter(emp => emp.is_active).length;
        const totalCount = data.length;
        const inactiveCount = totalCount - activeCount;

        const attendancePercent = totalCount === 0 ? 0 : Math.round((activeCount / totalCount) * 100);

        setStats({
          active: activeCount,
          inactive: inactiveCount,
          total: totalCount,
          attendance: attendancePercent
        });

        const recentEmployees = data.slice(0, 5).map(emp => ({
          employee: emp.name,
          date: new Date().toISOString().slice(0, 10),
          status: emp.is_active ? 'Present' : 'Absent'
        }));

        setEmployees(recentEmployees);

        const deptCount = {};
        data.forEach(emp => {
          const dept = emp.department || 'Unknown';
          deptCount[dept] = (deptCount[dept] || 0) + 1;
        });
        setDepartmentStats(deptCount);
      } catch (err) {
        console.error('❌ Error fetching employees:', err);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        {/* 🎥 Video Background */}
        <video
          className="background-video"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="https://cdn.pixabay.com/video/2021/09/08/87786-602074234_large.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <Navbar />

        <div className="stat-card-grid">
          <StatCard title="Total Employees" value={stats.total} type="total" />
          <StatCard title="Active Employees" value={stats.active} type="active" />
          <StatCard title="Inactive Employees" value={stats.inactive} type="inactive" />
          <StatCard title="Attendance" value={`${stats.attendance}%`} type="attendance" />
        </div>

        <div className="chart-container">
          <h3>Employees by Department</h3>
          <EmployeeChart data={departmentStats} />
        </div>

        <div className="attendance-section">
          <h3>Recent Attendance</h3>
          <AttendanceTable data={employees} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
