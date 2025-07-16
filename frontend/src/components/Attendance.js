import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig';
import '../styles/Attendance.css';

const Attendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // default to today
  });

  useEffect(() => {
    if (selectedDate) {
      api.get('attendance/')
        .then(res => {
          const filtered = res.data.filter(
            record => record.date === selectedDate
          );
          setAttendanceRecords(filtered);
        })
        .catch(err => console.error('Failed to fetch attendance records:', err));
    }
  }, [selectedDate]);

  return (
    <div className="attendance-page">
      <h2>📅 Attendance on {new Date(selectedDate).toLocaleDateString()}</h2>

      <div className="date-picker-container">
        <label htmlFor="attendance-date">Choose a date:</label>
        <input
          type="date"
          id="attendance-date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      <table className="attendance-table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Department</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {attendanceRecords.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center', color: '#888' }}>
                No attendance marked for this date.
              </td>
            </tr>
          ) : (
            attendanceRecords.map(record => (
              <tr key={record.id}>
                <td>{record.employee_name || 'N/A'}</td>
                <td>{record.employee_email || 'N/A'}</td>
                <td>{record.employee_phone || 'N/A'}</td>
                <td>{record.employee_department || 'N/A'}</td>
                <td className={record.status.toLowerCase()}>
                  {record.status}
                </td>
                <td>{new Date(record.date).toLocaleDateString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Attendance;
