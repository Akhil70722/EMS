import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axiosConfig';
import '../styles/EmployeeForm.css';

export default function EmployeeForm() {
  const nav = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    designation: '',
    salary: '',
    is_active: true  // ✅ Add active status
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      api.get(`employees/${id}/`)
        .then(res => setForm(res.data))
        .catch(() => setError('Failed to load employee data.'));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await api.put(`employees/${id}/`, form);
      } else {
        await api.post('employees/', form);
      }
      nav('/employees');
    } catch (err) {
      const message = err.response?.data
        ? JSON.stringify(err.response.data)
        : 'Submission failed';
      setError(message);
    }
  };

  return (
    <div className="employee-form-container">
      <form onSubmit={handleSubmit} className="emp-form">
        <h2>{id ? 'Edit' : 'Add'} Employee</h2>

        {error && <p className="error">{error}</p>}

        <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
        <input type="text" name="department" placeholder="Department" value={form.department} onChange={handleChange} required />
        <input type="text" name="designation" placeholder="Designation" value={form.designation} onChange={handleChange} required />
        <input type="number" name="salary" placeholder="Salary" value={form.salary} onChange={handleChange} required />

        {/* ✅ Active toggle */}
        <label className="checkbox-label">
          <input type="checkbox" name="is_active" checked={form.is_active} onChange={handleChange} />
          Active Employee
        </label>

        <button type="submit">Save</button>
      </form>
    </div>
  );
}
