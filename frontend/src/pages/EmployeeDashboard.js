
import React, { useEffect, useState } from 'react';
import axios from '../api/axiosConfig';
import LeaveRequestForm from '../components/LeaveRequestForm';
import EmployeeSidebar from '../components/EmployeeSidebar';
import EmployeeNavbar from '../components/EmployeeNavbar';
import SalarySlipList from '../components/SalarySlipList';
import EmployeeAttendance from '../components/EmployeeAttendance'; 
import '../styles/EmployeeDashboard.css';

export default function EmployeeDashboard() {
  const [profile, setProfile] = useState(null);
  const [salarySlips, setSalarySlips] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [employeeRes, leavesRes, salaryRes] = await Promise.all([
          axios.get('/employees/'),
          axios.get('/leave-requests/?mine=true'),
          axios.get('/salary-slips/?mine=true'),
        ]);

        const employeeList = employeeRes.data;
        if (!Array.isArray(employeeList) || employeeList.length === 0) {
          throw new Error('No employee profile found.');
        }

        setProfile(employeeList[0]);
        setLeaveRequests(leavesRes.data);
        setSalarySlips(salaryRes.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load employee data.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleNewLeave = (newLeave) => {
    setLeaveRequests((prev) => [newLeave, ...prev]);
  };

  const approvedLeaves = leaveRequests.filter(
    (leave) => leave.status === 'approved' || leave.status === 'rejected'
  );

  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="dashboard-container">
      <EmployeeSidebar setActiveTab={setActiveTab} activeTab={activeTab} />

      <div className="main-content">
        <EmployeeNavbar />

        {activeTab === 'profile' && profile && (
          <section className="profile-card">
            <div className="profile-header">
              <h2>👋 Welcome, {profile.name}</h2>
              <p className="designation">{profile.designation}</p>
            </div>
            <div className="profile-info">
              <p><strong>📧 Email:</strong> {profile.email}</p>
              <p><strong>🏢 Department:</strong> {profile.department}</p>
            </div>
          </section>
        )}

        {activeTab === 'leaves' && (
          <section>
            {/* <h2>📄 Leave Requests</h2> */}
            <LeaveRequestForm onNewLeave={handleNewLeave} />
            {leaveRequests.length === 0 ? (
              <p>No leave requests found.</p>
            ) : (
              <ul>
                {/* {leaveRequests.map((leave) => (
                  <li key={leave.id}>
                    {leave.leave_type} | {leave.start_date} to {leave.end_date} | Status: {leave.status}
                  </li>
                ))} */}
              </ul>
            )}
          </section>
        )}

        {activeTab === 'leaveStatus' && (
          <section>
            <h2>✅ Approved / Rejected Leaves</h2>
            {approvedLeaves.length === 0 ? (
              <p>No approved or rejected leaves found.</p>
            ) : (
              <div className="leave-cards-container">
                {approvedLeaves.map((leave) => (
                  <div key={leave.id} className={`leave-card ${leave.status}`}>
                    <h3>📌 {leave.leave_type} Leave</h3>
                    <p>
                      📅 {new Date(leave.start_date).toLocaleDateString()} – {new Date(leave.end_date).toLocaleDateString()}
                    </p>
                    <span className={`status-badge ${leave.status}`}>
                      {leave.status.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {activeTab === 'salary' && (
          <section>
            <SalarySlipList adminView={false} />
          </section>
        )}

        {activeTab === 'attendance' && (
          <section>
            <EmployeeAttendance />
          </section>
        )}
      </div>
    </div>
  );
}
