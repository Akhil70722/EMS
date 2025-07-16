// src/components/SalarySlipForm.jsx
import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import '../styles/SalarySlipForm.css';

export default function SalarySlipForm() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    employee: '',
    base_salary: '',
    hra: '',
    da: '',
    bonus: '',
    provident_fund: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    api.get('employees/')
      .then(res => setEmployees(res.data))
      .catch(err => console.error('Failed to load employees:', err));
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const payload = {
      employee: parseInt(form.employee),
      base_salary: parseFloat(form.base_salary),
      hra: parseFloat(form.hra),
      da: parseFloat(form.da),
      bonus: form.bonus ? parseFloat(form.bonus) : 0,
      provident_fund: parseFloat(form.provident_fund)
    };

    try {
      await api.post('salary-slips/', payload);
      setMessage('✅ Salary slip created successfully.');
      setForm({
        employee: '',
        base_salary: '',
        hra: '',
        da: '',
        bonus: '',
        provident_fund: ''
      });
    } catch (err) {
      console.error('❌ Error creating salary slip:', err.response?.data || err.message);
      setMessage('❌ Failed to create salary slip. Please check the input values.');
    }
  };

  return (
    <div className="salary-slip-container">
      <h2>Create Salary Slip</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>Employee</label>
        <select name="employee" value={form.employee} onChange={handleChange} required>
          <option value="">Select</option>
          {employees.map(e => (
            <option key={e.id} value={e.id}>{e.name}</option>
          ))}
        </select>

        {['base_salary', 'hra', 'da', 'bonus', 'provident_fund'].map(field => (
          <div key={field}>
            <label>{field.replace(/_/g, ' ').toUpperCase()}</label>
            <input
              type="number"
              name={field}
              value={form[field]}
              onChange={handleChange}
              step="0.01"
              required={field !== 'bonus'}
            />
          </div>
        ))}

        <button type="submit">Create</button>
      </form>
    </div>
  );
}
