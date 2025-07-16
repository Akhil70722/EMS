// // // src/App.js
// // import React from 'react';
// // import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// // import EmployeeList from './components/EmployeeList';
// // import EmployeeForm from './components/EmployeeForm';
// // import EmployeeDetail from './components/EmployeeDetail';
// // import Dashboard from './pages/Dashboard';
// // import DepartmentList from './components/DepartmentList';
// // import DepartmentForm from './components/DepartmentForm';
// // import Attendance from './components/Attendance';
// // import Login from './pages/Login';
// // import Register from './pages/Register';
// // import PrivateRoute from './components/PrivateRoute';
// // import LeaveRequestForm from './components/LeaveRequestForm';
// // import LeaveRequestList from './components/LeaveRequestList';
// // import SalarySlipForm from './components/SalarySlipForm';
// // import SalarySlipList from './components/SalarySlipList';
// // import EmployeeDashboard from './pages/EmployeeDashboard';
// // import TaskForm from './components/TaskForm';

// // export default function App() {
// //   return (
// //     <Router>
// //       <Routes>
// //         {/* Public Routes */}
// //         <Route path="/login" element={<Login />} />
// //         <Route path="/register" element={<Register />} />

// //         {/* Protected Routes */}
// //         <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
// //         <Route path="/employee-dashboard" element={<PrivateRoute><EmployeeDashboard /></PrivateRoute>} />
// //         <Route path="/employees" element={<PrivateRoute><EmployeeList /></PrivateRoute>} />
// //         <Route path="/employees/add" element={<PrivateRoute><EmployeeForm /></PrivateRoute>} />
// //         <Route path="/employees/edit/:id" element={<PrivateRoute><EmployeeForm /></PrivateRoute>} />
// //         <Route path="/employees/:id" element={<PrivateRoute><EmployeeDetail /></PrivateRoute>} />
        
// //         <Route path="/departments" element={<PrivateRoute><DepartmentList /></PrivateRoute>} />
// //         <Route path="/departments/add" element={<PrivateRoute><DepartmentForm /></PrivateRoute>} />
// //         <Route path="/departments/edit/:id" element={<PrivateRoute><DepartmentForm /></PrivateRoute>} />
// //         <Route path="/attendance" element={<PrivateRoute><Attendance /></PrivateRoute>} />

// //         {/* Leave & Salary Features */}
// //         <Route path="/leave/apply" element={<PrivateRoute><LeaveRequestForm /></PrivateRoute>} />
// //         <Route path="/leave/requests" element={<PrivateRoute><LeaveRequestList adminView={true} /></PrivateRoute>} />
// //         <Route path="/my-leave-requests" element={<PrivateRoute><LeaveRequestList /></PrivateRoute>} />
        
// //         <Route path="/salary/create" element={<PrivateRoute><SalarySlipForm /></PrivateRoute>} />
// //         <Route path="/salary/slips" element={<PrivateRoute><SalarySlipList adminView={true} /></PrivateRoute>} />
// //         <Route path="/my-salary" element={<PrivateRoute><SalarySlipList /></PrivateRoute>} />

// //         {/* Redirects */}
// //         <Route path="/" element={<Navigate to="/login" />} />
// //         <Route path="*" element={<Navigate to="/login" />} />

// //         {/*task create*/}
// //         <Route path="/tasks/create" element={<TaskForm />} />

// //       </Routes>
// //     </Router>
// //   );
// // }

// // src/App.js
// // import React from 'react';
// // import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// // import EmployeeList from './components/EmployeeList';
// // import EmployeeForm from './components/EmployeeForm';
// // import EmployeeDetail from './components/EmployeeDetail';
// // import Dashboard from './pages/Dashboard';
// // import DepartmentList from './components/DepartmentList';
// // import DepartmentForm from './components/DepartmentForm';
// // import Attendance from './components/Attendance';
// // import Login from './pages/Login';
// // import Register from './pages/Register';
// // import PrivateRoute from './components/PrivateRoute';
// // import LeaveRequestForm from './components/LeaveRequestForm';
// // import LeaveRequestList from './components/LeaveRequestList';
// // import SalarySlipForm from './components/SalarySlipForm';
// // import SalarySlipList from './components/SalarySlipList';
// // import EmployeeDashboard from './pages/EmployeeDashboard';
// // import TaskForm from './components/TaskForm';
// // import DashboardLayout from './layouts/DashboardLayout';
// // import AdminReviewTasks from './components/AdminReviewTasks';

// // export default function App() {
// //   return (
// //    <Router>
// //   <Routes>
// //     {/* Public Routes */}
// //     <Route path="/login" element={<Login />} />
// //     <Route path="/register" element={<Register />} />

// //     {/* Employee Dashboard - render WITHOUT AdminSidebar */}
// //     <Route path="/employee-dashboard" element={<PrivateRoute><EmployeeDashboard /></PrivateRoute>} />

// //     {/* Admin Routes (wrapped with Admin Sidebar layout) */}
// //     <Route path="/" element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
// //       <Route path="dashboard" element={<Dashboard />} />
// //       <Route path="employees" element={<EmployeeList />} />
// //       <Route path="employees/add" element={<EmployeeForm />} />
// //       <Route path="employees/edit/:id" element={<EmployeeForm />} />
// //       <Route path="employees/:id" element={<EmployeeDetail />} />
// //       <Route path="departments" element={<DepartmentList />} />
// //       <Route path="departments/add" element={<DepartmentForm />} />
// //       <Route path="departments/edit/:id" element={<DepartmentForm />} />
// //       <Route path="attendance" element={<Attendance />} />

// //       {/* Leave & Salary Features */}
// //       <Route path="leave/apply" element={<LeaveRequestForm />} />
// //       <Route path="leave/requests" element={<LeaveRequestList adminView={true} />} />
// //       <Route path="my-leave-requests" element={<LeaveRequestList />} />

// //       <Route path="salary/create" element={<SalarySlipForm />} />
// //       <Route path="salary/slips" element={<SalarySlipList adminView={true} />} />
// //       <Route path="my-salary" element={<SalarySlipList />} />

// //       {/* Task Create */}
// //       <Route path="tasks/create" element={<TaskForm />} />
// //       <Route path="/admin/review-tasks" element={<AdminReviewTasks />} />
// //     </Route>

// //     {/* Redirect unknown paths */}
// //     <Route path="*" element={<Navigate to="/login" />} />

// //   </Routes>
// // </Router>

// //   );
// // }

// // // src/App.js
// // import React from 'react';
// // import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// // import EmployeeList from './components/EmployeeList';
// // import EmployeeForm from './components/EmployeeForm';
// // import EmployeeDetail from './components/EmployeeDetail';
// // import Dashboard from './pages/Dashboard';
// // import DepartmentList from './components/DepartmentList';
// // import DepartmentForm from './components/DepartmentForm';
// // import Attendance from './components/Attendance';
// // import Login from './pages/Login';
// // import Register from './pages/Register';
// // import PrivateRoute from './components/PrivateRoute';
// // import LeaveRequestForm from './components/LeaveRequestForm';
// // import LeaveRequestList from './components/LeaveRequestList';
// // import SalarySlipForm from './components/SalarySlipForm';
// // import SalarySlipList from './components/SalarySlipList';
// // import EmployeeDashboard from './pages/EmployeeDashboard';
// // import TaskForm from './components/TaskForm';
// // import DashboardLayout from './layouts/DashboardLayout';
// // import AdminReviewTasks from './components/AdminReviewTasks';

// // export default function App() {
// //   return (
// //     <Router>
// //       <Routes>
// //         {/* Public Routes */}
// //         <Route path="/login" element={<Login />} />
// //         <Route path="/register" element={<Register />} />

// //         {/* Employee Dashboard (NO AdminSidebar) */}
// //         <Route
// //           path="/employee-dashboard"
// //           element={
// //             <PrivateRoute>
// //               <EmployeeDashboard />
// //             </PrivateRoute>
// //           }
// //         />

// //         {/* Admin Routes (WITH AdminSidebar via DashboardLayout) */}
// //         <Route
// //           path="/"
// //           element={
// //             <PrivateRoute>
// //               <DashboardLayout />
// //             </PrivateRoute>
// //           }
// //         >
// //           <Route path="dashboard" element={<Dashboard />} />
// //           <Route path="employees" element={<EmployeeList />} />
// //           <Route path="employees/add" element={<EmployeeForm />} />
// //           <Route path="employees/edit/:id" element={<EmployeeForm />} />
// //           <Route path="employees/:id" element={<EmployeeDetail />} />
// //           <Route path="departments" element={<DepartmentList />} />
// //           <Route path="departments/add" element={<DepartmentForm />} />
// //           <Route path="departments/edit/:id" element={<DepartmentForm />} />
// //           <Route path="attendance" element={<Attendance />} />

// //           {/* Leave & Salary Features */}
// //           <Route path="leave/apply" element={<LeaveRequestForm />} />
// //           <Route path="leave/requests" element={<LeaveRequestList adminView={true} />} />
// //           <Route path="my-leave-requests" element={<LeaveRequestList />} />

// //           <Route path="salary/create" element={<SalarySlipForm />} />
// //           <Route path="salary/slips" element={<SalarySlipList adminView={true} />} />
// //           <Route path="my-salary" element={<SalarySlipList />} />

// //           {/* Tasks */}
// //           <Route path="tasks/create" element={<TaskForm />} />
// //           <Route path="admin/review-tasks" element={<AdminReviewTasks />} />
// //         </Route>

// //         {/* Catch-all Route */}
// //         <Route path="*" element={<Navigate to="/login" />} />
// //       </Routes>
// //     </Router>
// //   );
// // }


// // import React from 'react';
// // import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// // import EmployeeList from './components/EmployeeList';
// // import EmployeeForm from './components/EmployeeForm';
// // import EmployeeDetail from './components/EmployeeDetail';
// // import Dashboard from './pages/Dashboard';
// // import DepartmentList from './components/DepartmentList';
// // import DepartmentForm from './components/DepartmentForm';
// // import Attendance from './components/Attendance';
// // import Login from './pages/Login';
// // import Register from './pages/Register';
// // import PrivateRoute from './components/PrivateRoute';
// // import LeaveRequestForm from './components/LeaveRequestForm';
// // import LeaveRequestList from './components/LeaveRequestList';
// // import SalarySlipForm from './components/SalarySlipForm';
// // import SalarySlipList from './components/SalarySlipList';
// // import EmployeeDashboard from './pages/EmployeeDashboard';
// // import TaskForm from './components/TaskForm';
// // import DashboardLayout from './layouts/DashboardLayout';
// // import AdminReviewTasks from './components/AdminReviewTasks';
// // import ProjectForm from './components/ProjectForm'; // ✅ NEW

// // export default function App() {
// //   return (
// //     <Router>
// //       <Routes>
// //         {/* Public Routes */}
// //         <Route path="/login" element={<Login />} />
// //         <Route path="/register" element={<Register />} />

// //         {/* Employee Dashboard (NO AdminSidebar) */}
// //         <Route
// //           path="/employee-dashboard"
// //           element={
// //             <PrivateRoute>
// //               <EmployeeDashboard />
// //             </PrivateRoute>
// //           }
// //         />

// //         {/* Admin Routes (WITH AdminSidebar via DashboardLayout) */}
// //         <Route
// //           path="/"
// //           element={
// //             <PrivateRoute>
// //               <DashboardLayout />
// //             </PrivateRoute>
// //           }
// //         >
// //           <Route path="dashboard" element={<Dashboard />} />
// //           <Route path="employees" element={<EmployeeList />} />
// //           <Route path="employees/add" element={<EmployeeForm />} />
// //           <Route path="employees/edit/:id" element={<EmployeeForm />} />
// //           <Route path="employees/:id" element={<EmployeeDetail />} />
// //           <Route path="departments" element={<DepartmentList />} />
// //           <Route path="departments/add" element={<DepartmentForm />} />
// //           <Route path="departments/edit/:id" element={<DepartmentForm />} />
// //           <Route path="attendance" element={<Attendance />} />

// //           {/* Leave & Salary */}
// //           <Route path="leave/apply" element={<LeaveRequestForm />} />
// //           <Route path="leave/requests" element={<LeaveRequestList adminView={true} />} />
// //           <Route path="my-leave-requests" element={<LeaveRequestList />} />
// //           <Route path="salary/create" element={<SalarySlipForm />} />
// //           <Route path="salary/slips" element={<SalarySlipList adminView={true} />} />
// //           <Route path="my-salary" element={<SalarySlipList />} />

// //           {/* Tasks & Project */}
// //           <Route path="tasks/create" element={<TaskForm />} />
// //           <Route path="admin/review-tasks" element={<AdminReviewTasks />} />
// //           <Route path="projects/create" element={<ProjectForm />} /> {/* ✅ NEW */}
// //         </Route>

// //         {/* Catch-all */}
// //         <Route path="*" element={<Navigate to="/login" />} />
// //       </Routes>
// //     </Router>
// //   );
// // }


// // import React from 'react';
// // import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// // import EmployeeList from './components/EmployeeList';
// // import EmployeeForm from './components/EmployeeForm';
// // import EmployeeDetail from './components/EmployeeDetail';
// // import Dashboard from './pages/Dashboard';
// // import DepartmentList from './components/DepartmentList';
// // import DepartmentForm from './components/DepartmentForm';
// // import Attendance from './components/Attendance';
// // import Login from './pages/Login';
// // import Register from './pages/Register';
// // import PrivateRoute from './components/PrivateRoute';
// // import LeaveRequestForm from './components/LeaveRequestForm';
// // import LeaveRequestList from './components/LeaveRequestList';
// // import SalarySlipForm from './components/SalarySlipForm';
// // import SalarySlipList from './components/SalarySlipList';
// // import EmployeeDashboard from './pages/EmployeeDashboard';
// // import TaskForm from './components/TaskForm';
// // import DashboardLayout from './layouts/DashboardLayout';
// // import AdminReviewTasks from './components/AdminReviewTasks';
// // import ProjectForm from './components/ProjectForm';       // ✅ Create Project
// // import ProjectList from './components/ProjectList';       // ✅ View Projects

// // export default function App() {
// //   return (
// //     <Router>
// //       <Routes>
// //         {/* Public Routes */}
// //         <Route path="/login" element={<Login />} />
// //         <Route path="/register" element={<Register />} />

// //         {/* Employee Dashboard (NO AdminSidebar) */}
// //         <Route
// //           path="/employee-dashboard"
// //           element={
// //             <PrivateRoute>
// //               <EmployeeDashboard />
// //             </PrivateRoute>
// //           }
// //         />

// //         {/* Admin Routes (WITH AdminSidebar via DashboardLayout) */}
// //         <Route
// //           path="/"
// //           element={
// //             <PrivateRoute>
// //               <DashboardLayout />
// //             </PrivateRoute>
// //           }
// //         >
// //           <Route path="dashboard" element={<Dashboard />} />
// //           <Route path="employees" element={<EmployeeList />} />
// //           <Route path="employees/add" element={<EmployeeForm />} />
// //           <Route path="employees/edit/:id" element={<EmployeeForm />} />
// //           <Route path="employees/:id" element={<EmployeeDetail />} />
// //           <Route path="departments" element={<DepartmentList />} />
// //           <Route path="departments/add" element={<DepartmentForm />} />
// //           <Route path="departments/edit/:id" element={<DepartmentForm />} />
// //           <Route path="attendance" element={<Attendance />} />

// //           {/* Leave & Salary */}
// //           <Route path="leave/apply" element={<LeaveRequestForm />} />
// //           <Route path="leave/requests" element={<LeaveRequestList adminView={true} />} />
// //           <Route path="my-leave-requests" element={<LeaveRequestList />} />
// //           <Route path="salary/create" element={<SalarySlipForm />} />
// //           <Route path="salary/slips" element={<SalarySlipList adminView={true} />} />
// //           <Route path="my-salary" element={<SalarySlipList />} />

// //           {/* Tasks & Projects */}
// //           <Route path="tasks/create" element={<TaskForm />} />
// //           <Route path="tasks/review" element={<AdminReviewTasks />} />
// //           <Route path="projects/create" element={<ProjectForm />} />      {/* ✅ Create Project */}
// //           <Route path="projects/list" element={<ProjectList />} />        {/* ✅ Project List */}
// //         </Route>

// //         {/* Catch-all */}
// //         <Route path="*" element={<Navigate to="/login" />} />
// //       </Routes>
// //     </Router>
// //   );
// // }


// // import React from 'react';
// // import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// // import EmployeeList from './components/EmployeeList';
// // import EmployeeForm from './components/EmployeeForm';
// // import EmployeeDetail from './components/EmployeeDetail';
// // import Dashboard from './pages/Dashboard';
// // import DepartmentList from './components/DepartmentList';
// // import DepartmentForm from './components/DepartmentForm';
// // import Attendance from './components/Attendance';
// // import Login from './pages/Login';
// // import Register from './pages/Register';
// // import PrivateRoute from './components/PrivateRoute';
// // import LeaveRequestForm from './components/LeaveRequestForm';
// // import LeaveRequestList from './components/LeaveRequestList';
// // import SalarySlipForm from './components/SalarySlipForm';
// // import SalarySlipList from './components/SalarySlipList';
// // import EmployeeDashboard from './pages/EmployeeDashboard';
// // // import TaskForm from './components/TaskForm';
// // import ProjectAssignForm from './components/ProjectAssignForm';
// // import DashboardLayout from './layouts/DashboardLayout';
// // import AdminReviewTasks from './components/AdminReviewTasks';
// // import ProjectForm from './components/ProjectForm';
// // import ProjectList from './components/ProjectList';
// // import EmployeeTaskDetail from './components/EmployeeTaskDetail'; // ✅ ADD THIS

// // export default function App() {
// //   return (
// //     <Router>
// //       <Routes>
// //         {/* Public Routes */}
// //         <Route path="/login" element={<Login />} />
// //         <Route path="/register" element={<Register />} />

// //         {/* Employee Dashboard */}
// //         <Route
// //           path="/employee-dashboard"
// //           element={
// //             <PrivateRoute>
// //               <EmployeeDashboard />
// //             </PrivateRoute>
// //           }
// //         />

// //         {/* ✅ Task Detail Page for Employee */}
// //         <Route
// //           path="/employee-dashboard/task/:id"
// //           element={
// //             <PrivateRoute>
// //               <EmployeeTaskDetail />
// //             </PrivateRoute>
// //           }
// //         />

// //         {/* Admin Routes */}
// //         <Route
// //           path="/"
// //           element={
// //             <PrivateRoute>
// //               <DashboardLayout />
// //             </PrivateRoute>
// //           }
// //         >
// //           <Route path="dashboard" element={<Dashboard />} />
// //           <Route path="employees" element={<EmployeeList />} />
// //           <Route path="employees/add" element={<EmployeeForm />} />
// //           <Route path="employees/edit/:id" element={<EmployeeForm />} />
// //           <Route path="employees/:id" element={<EmployeeDetail />} />
// //           <Route path="departments" element={<DepartmentList />} />
// //           <Route path="departments/add" element={<DepartmentForm />} />
// //           <Route path="departments/edit/:id" element={<DepartmentForm />} />
// //           <Route path="attendance" element={<Attendance />} />

// //           {/* Leave & Salary */}
// //           <Route path="leave/apply" element={<LeaveRequestForm />} />
// //           <Route path="leave/requests" element={<LeaveRequestList adminView={true} />} />
// //           <Route path="my-leave-requests" element={<LeaveRequestList />} />
// //           <Route path="salary/create" element={<SalarySlipForm />} />
// //           <Route path="salary/slips" element={<SalarySlipList adminView={true} />} />
// //           <Route path="my-salary" element={<SalarySlipList />} />

// //           {/* Tasks & Projects */}
// //           {/* <Route path="tasks/create" element={<TaskForm />} /> */}
// //           <Route path="projects/assign" element={<ProjectAssignForm />} />
// //           <Route path="tasks/review" element={<AdminReviewTasks />} />
// //           <Route path="projects/create" element={<ProjectForm />} />
// //           <Route path="projects/list" element={<ProjectList />} />
// //         </Route>

// //         {/* Catch-all */}
// //         <Route path="*" element={<Navigate to="/login" />} />
// //       </Routes>
// //     </Router>
// //   );
// // }


// // import React from 'react';
// // import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// // import EmployeeList from './components/EmployeeList';
// // import EmployeeForm from './components/EmployeeForm';
// // import EmployeeDetail from './components/EmployeeDetail';
// // import Dashboard from './pages/Dashboard';
// // import DepartmentList from './components/DepartmentList';
// // import DepartmentForm from './components/DepartmentForm';
// // import Attendance from './components/Attendance';
// // import Login from './pages/Login';
// // import Register from './pages/Register';
// // import PrivateRoute from './components/PrivateRoute';
// // import LeaveRequestForm from './components/LeaveRequestForm';
// // import LeaveRequestList from './components/LeaveRequestList';
// // import SalarySlipForm from './components/SalarySlipForm';
// // import SalarySlipList from './components/SalarySlipList';
// // import EmployeeDashboard from './pages/EmployeeDashboard';
// // import ProjectAssignForm from './components/ProjectAssignForm';
// // import DashboardLayout from './layouts/DashboardLayout';
// // import AdminReviewTasks from './components/AdminReviewTasks';
// // import AdminViewUpdates from './components/AdminViewUpdates';        // ✅ NEW
// // import EmployeeSubmitUpdate from './components/EmployeeSubmitUpdate';// ✅ NEW
// // import ProjectForm from './components/ProjectForm';
// // import ProjectList from './components/ProjectList';
// // import EmployeeTaskDetail from './components/EmployeeTaskDetail';

// // export default function App() {
// //   return (
// //     <Router>
// //       <Routes>
// //         {/* Public Routes */}
// //         <Route path="/login" element={<Login />} />
// //         <Route path="/register" element={<Register />} />

// //         {/* Employee Dashboard */}
// //         <Route
// //           path="/employee-dashboard"
// //           element={
// //             <PrivateRoute>
// //               <EmployeeDashboard />
// //             </PrivateRoute>
// //           }
// //         />
// //         <Route
// //           path="/employee-dashboard/task/:id"
// //           element={
// //             <PrivateRoute>
// //               <EmployeeTaskDetail />
// //             </PrivateRoute>
// //           }
// //         />
// //         <Route
// //           path="/employee-dashboard/submit-update"
// //           element={
// //             <PrivateRoute>
// //               <EmployeeSubmitUpdate />
// //             </PrivateRoute>
// //           }
// //         />

// //         {/* Admin Routes */}
// //         <Route
// //           path="/"
// //           element={
// //             <PrivateRoute>
// //               <DashboardLayout />
// //             </PrivateRoute>
// //           }
// //         >
// //           <Route path="dashboard" element={<Dashboard />} />
// //           <Route path="employees" element={<EmployeeList />} />
// //           <Route path="employees/add" element={<EmployeeForm />} />
// //           <Route path="employees/edit/:id" element={<EmployeeForm />} />
// //           <Route path="employees/:id" element={<EmployeeDetail />} />
// //           <Route path="departments" element={<DepartmentList />} />
// //           <Route path="departments/add" element={<DepartmentForm />} />
// //           <Route path="departments/edit/:id" element={<DepartmentForm />} />
// //           <Route path="attendance" element={<Attendance />} />

// //           {/* Leave & Salary */}
// //           <Route path="leave/apply" element={<LeaveRequestForm />} />
// //           <Route path="leave/requests" element={<LeaveRequestList adminView={true} />} />
// //           <Route path="my-leave-requests" element={<LeaveRequestList />} />
// //           <Route path="salary/create" element={<SalarySlipForm />} />
// //           <Route path="salary/slips" element={<SalarySlipList adminView={true} />} />
// //           <Route path="my-salary" element={<SalarySlipList />} />

// //           {/* Projects & Reviews */}
// //           <Route path="projects/assign" element={<ProjectAssignForm />} />
// //           <Route path="tasks/review" element={<AdminReviewTasks />} />
// //           <Route path="updates/review" element={<AdminViewUpdates />} /> {/* ✅ New admin review route */}
// //           <Route path="projects/create" element={<ProjectForm />} />
// //           <Route path="projects/list" element={<ProjectList />} />
// //         </Route>

// //         {/* Catch-all */}
// //         <Route path="*" element={<Navigate to="/login" />} />
// //       </Routes>
// //     </Router>
// //   );
// // }



// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// import EmployeeList from './components/EmployeeList';
// import EmployeeForm from './components/EmployeeForm';
// import EmployeeDetail from './components/EmployeeDetail';
// import Dashboard from './pages/Dashboard';
// import DepartmentList from './components/DepartmentList';
// import DepartmentForm from './components/DepartmentForm';
// import Attendance from './components/Attendance';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import PrivateRoute from './components/PrivateRoute';
// import LeaveRequestForm from './components/LeaveRequestForm';
// import LeaveRequestList from './components/LeaveRequestList';
// import SalarySlipForm from './components/SalarySlipForm';
// import SalarySlipList from './components/SalarySlipList';
// import EmployeeDashboard from './pages/EmployeeDashboard';
// import ProjectAssignForm from './components/ProjectAssignForm';
// import DashboardLayout from './layouts/DashboardLayout';
// import ProjectForm from './components/ProjectForm';
// import ProjectList from './components/ProjectList';
// import EmployeeTaskDetail from './components/EmployeeTaskDetail';
// import EmployeeProjectUpdateForm from './components/EmployeeProjectUpdateForm';
// import AdminViewUpdates from './components/AdminViewUpdates'; // ✅ NEW
// import EmployeeProjectReplies from './components/EmployeeProjectReplies';

// export default function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />

//         {/* Employee Dashboard */}
//         <Route
//           path="/employee-dashboard"
//           element={
//             <PrivateRoute>
//               <EmployeeDashboard />
//             </PrivateRoute>
//           }
//         />

//         {/* ✅ Task Detail Page for Employee */}
//         <Route
//           path="/employee-dashboard/task/:id"
//           element={
//             <PrivateRoute>
//               <EmployeeTaskDetail />
//             </PrivateRoute>
//           }
//         />

//         {/* ✅ Employee Project Update Submission */}
//         <Route
//           path="/employee-dashboard/submit-update"
//           element={
//             <PrivateRoute>
//               <EmployeeProjectUpdateForm />
//             </PrivateRoute>
//           }
//         />

//         {/* Admin Routes */}
//         <Route
//           path="/"
//           element={
//             <PrivateRoute>
//               <DashboardLayout />
//             </PrivateRoute>
//           }
//         >

//         <Route
//         path="/project-replies"
//         element={
//           <PrivateRoute>
//              <EmployeeProjectReplies />
//            </PrivateRoute>
//           }
//         />
  
//           <Route path="dashboard" element={<Dashboard />} />
//           <Route path="employees" element={<EmployeeList />} />
//           <Route path="employees/add" element={<EmployeeForm />} />
//           <Route path="employees/edit/:id" element={<EmployeeForm />} />
//           <Route path="employees/:id" element={<EmployeeDetail />} />
//           <Route path="departments" element={<DepartmentList />} />
//           <Route path="departments/add" element={<DepartmentForm />} />
//           <Route path="departments/edit/:id" element={<DepartmentForm />} />
//           <Route path="attendance" element={<Attendance />} />

//           {/* Leave & Salary */}
//           <Route path="leave/apply" element={<LeaveRequestForm />} />
//           <Route path="leave/requests" element={<LeaveRequestList adminView={true} />} />
//           <Route path="my-leave-requests" element={<LeaveRequestList />} />
//           <Route path="salary/create" element={<SalarySlipForm />} />
//           <Route path="salary/slips" element={<SalarySlipList adminView={true} />} />
//           <Route path="my-salary" element={<SalarySlipList />} />

//           {/* Projects & Reviews */}
//           <Route path="projects/assign" element={<ProjectAssignForm />} />
//           <Route path="projects/create" element={<ProjectForm />} />
//           <Route path="projects/list" element={<ProjectList />} />
//           <Route path="project-updates/review" element={<AdminViewUpdates />} /> {/* ✅ NEW */}
//         </Route>

//         {/* Catch-all */}
//         <Route path="*" element={<Navigate to="/login" />} />
//       </Routes>
//     </Router>
//   );
// }


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
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';
import LeaveRequestForm from './components/LeaveRequestForm';
import LeaveRequestList from './components/LeaveRequestList';
import SalarySlipForm from './components/SalarySlipForm';
import SalarySlipList from './components/SalarySlipList';
import EmployeeDashboard from './pages/EmployeeDashboard';
import ProjectAssignForm from './components/ProjectAssignForm';
import DashboardLayout from './layouts/DashboardLayout';
import ProjectForm from './components/ProjectForm';
import ProjectList from './components/ProjectList';
import EmployeeTaskDetail from './components/EmployeeTaskDetail';
import EmployeeProjectUpdateForm from './components/EmployeeProjectUpdateForm';
import AdminViewUpdates from './components/AdminViewUpdates';
import EmployeeProjectReplies from './components/EmployeeProjectReplies';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Employee Dashboard Routes */}
        <Route
          path="/employee-dashboard"
          element={
            <PrivateRoute allowedRoles={['employee']}>
              <EmployeeDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/employee-dashboard/task/:id"
          element={
            <PrivateRoute allowedRoles={['employee']}>
              <EmployeeTaskDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/employee-dashboard/submit-update"
          element={
            <PrivateRoute allowedRoles={['employee']}>
              <EmployeeProjectUpdateForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/employee-dashboard/replies"
          element={
            <PrivateRoute allowedRoles={['employee']}>
              <EmployeeProjectReplies />
            </PrivateRoute>
          }
        />

        {/* Admin Dashboard Routes */}
        <Route
          path="/"
          element={
            <PrivateRoute allowedRoles={['admin']}>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="employees" element={<EmployeeList />} />
          <Route path="employees/add" element={<EmployeeForm />} />
          <Route path="employees/edit/:id" element={<EmployeeForm />} />
          <Route path="employees/:id" element={<EmployeeDetail />} />
          <Route path="departments" element={<DepartmentList />} />
          <Route path="departments/add" element={<DepartmentForm />} />
          <Route path="departments/edit/:id" element={<DepartmentForm />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="leave/apply" element={<LeaveRequestForm />} />
          <Route path="leave/requests" element={<LeaveRequestList adminView={true} />} />
          <Route path="my-leave-requests" element={<LeaveRequestList />} />
          <Route path="salary/create" element={<SalarySlipForm />} />
          <Route path="salary/slips" element={<SalarySlipList adminView={true} />} />
          <Route path="my-salary" element={<SalarySlipList />} />
          <Route path="projects/assign" element={<ProjectAssignForm />} />
          <Route path="projects/create" element={<ProjectForm />} />
          <Route path="projects/list" element={<ProjectList />} />
          <Route path="project-updates/review" element={<AdminViewUpdates />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}
