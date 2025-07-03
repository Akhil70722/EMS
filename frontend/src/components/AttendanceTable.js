// src/components/AttendanceTable.js
import React from 'react';
import '../styles/AttendanceTable.css';

const AttendanceTable = ({ data }) => {
  return (
    <div className="attendance-table">
      <table>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, index) => (
            <tr key={index}>
              <td>{entry.employee}</td>
              <td>{entry.date}</td>
              <td className={entry.status === 'Present' ? 'present' : 'absent'}>
                {entry.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceTable;
