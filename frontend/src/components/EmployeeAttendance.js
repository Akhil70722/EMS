import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import '../styles/EmployeeAttendance.css';

export default function EmployeeAttendance() {
  const [attendance, setAttendance] = useState([]);
  const [markedToday, setMarkedToday] = useState(false);
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });

  useEffect(() => {
    api.get('attendance/')
      .then(res => {
        setAttendance(res.data);

        const alreadyMarked = res.data.some(
          entry => entry.date === new Date().toISOString().split('T')[0]
        );
        setMarkedToday(alreadyMarked);
      })
      .catch(err => console.error(err));
  }, []);

  const markAttendance = () => {
    api.post('attendance/', { status: 'Present' })
      .then(() => {
        alert('Attendance marked successfully!');
        setMarkedToday(true);
      })
      .catch(err => alert('Error marking attendance'));
  };

  // Filter records based on selected date
  const filteredAttendance = attendance.filter(
    entry => entry.date === selectedDate
  );

  return (
    <div className="attendance-page">
      <h2>🧑 My Attendance</h2>

      <div className="mark-container">
        {!markedToday ? (
          <button className="mark-btn" onClick={markAttendance}>
            ✅ Mark Today as Present
          </button>
        ) : (
          <p className="marked-msg">✅ You have marked attendance for today.</p>
        )}
      </div>

      <div className="date-picker-container">
        <label htmlFor="date">📅 Select Date:</label>
        <input
          type="date"
          id="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      <table className="attendance-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredAttendance.length === 0 ? (
            <tr>
              <td colSpan="2" className="no-data">
                No attendance marked on this date.
              </td>
            </tr>
          ) : (
            filteredAttendance.map(entry => (
              <tr key={entry.id}>
                <td>{new Date(entry.date).toLocaleDateString()}</td>
                <td className={entry.status.toLowerCase()}>{entry.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
