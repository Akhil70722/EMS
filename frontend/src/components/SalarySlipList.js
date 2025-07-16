import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import '../styles/SalarySlipList.css';
import { generateSalarySlipPDF } from './DownloadPDF'; // ✅ Correct import

export default function SalarySlipList({ adminView = false }) {
  const [slips, setSlips] = useState([]);

  useEffect(() => {
    api
      .get('salary-slips/' + (adminView ? '' : '?mine=true'))
      .then(res => setSlips(res.data))
      .catch(console.error);
  }, [adminView]);

  const format = val => `₹${Number(val || 0).toFixed(2)}`;

  return (
    <div className="salary-slip-container">
      <h2>{adminView ? 'All Salary Slips' : 'My Salary Slips'}</h2>

      {slips.map((s, index) => (
        <div key={s.id} className="salary-slip-card">
          <div className="salary-slip-header">
            <h3>Salary Slip #{index + 1}</h3>
            <span className="salary-slip-date">
              Date: {new Date(s.created_at).toLocaleDateString()}
            </span>
          </div>

          {adminView && (
            <p className="employee-name">
              <strong>Employee:</strong> {s.employee_name || 'N/A'}
            </p>
          )}

          <div className="salary-section">
            <div className="salary-section-header">📄 Part A: Salary Slip Components</div>
            <div className="salary-row">
              <span className="salary-label">Base Salary</span>
              <span className="salary-value">{format(s.base_salary)}</span>
            </div>
            <div className="salary-row">
              <span className="salary-label">HRA</span>
              <span className="salary-value">{format(s.hra)}</span>
            </div>
            <div className="salary-row">
              <span className="salary-label">DA</span>
              <span className="salary-value">{format(s.da)}</span>
            </div>
          </div>

          <div className="salary-section">
            <div className="salary-section-header">🏛️ Part B: Retirals</div>
            <div className="salary-row">
              <span className="salary-label">Bonus</span>
              <span className="salary-value">{format(s.bonus)}</span>
            </div>
            <div className="salary-row">
              <span className="salary-label">Gratuity</span>
              <span className="salary-value">{format(s.gratuity)}</span>
            </div>
          </div>

          <div className="salary-section">
            <div className="salary-section-header">💸 Deductions</div>
            <div className="salary-row">
              <span className="salary-label">Tax</span>
              <span className="salary-value">{format(s.tax)}</span>
            </div>
            <div className="salary-row">
              <span className="salary-label">Provident Fund (PF)</span>
              <span className="salary-value">{format(s.provident_fund)}</span>
            </div>
          </div>

          <div className="salary-final">
            <span>Final Salary</span>
            <span>{format(s.final_salary)}</span>
          </div>

          <button
            className="download-btn"
            onClick={() => generateSalarySlipPDF(s, index)} // ✅ Pass raw data instead of DOM
          >
            📄 Download PDF
          </button>
        </div>
      ))}
    </div>
  );
}
