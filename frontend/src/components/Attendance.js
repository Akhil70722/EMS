import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig';
import '../styles/Attendance.css';

const Attendance = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    api.get('employees/')
      .then(res => setEmployees(res.data))
      .catch(err => console.error('Failed to fetch employees:', err));
  }, []);

  return (
    <div className="attendance-page">
      <h2>Employee Attendance</h2>
      <table className="attendance-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id}>
              <td>{emp.name}</td>
              <td>{emp.department || '—'}</td>
              <td className={emp.is_active ? 'present' : 'absent'}>
                {emp.is_active ? 'Present' : 'Absent'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Attendance;
