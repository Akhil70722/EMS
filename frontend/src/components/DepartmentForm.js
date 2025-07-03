import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';
import '../styles/DepartmentForm.css';

export default function DepartmentForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', description: '' });

  useEffect(() => {
    if (id) {
      api.get(`departments/${id}/`)
        .then(res => setForm(res.data))
        .catch(err => console.error(err));
    }
  }, [id]);

  const handleSubmit = e => {
    e.preventDefault();
    const req = id ? api.put(`departments/${id}/`, form) : api.post('departments/', form);
    req.then(() => navigate('/departments'))
       .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit} className="department-form">
      <h2>{id ? 'Edit' : 'Add'} Department</h2>
      <input
        name="name"
        placeholder="Department Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={e => setForm({ ...form, description: e.target.value })}
      />
      <button type="submit">Save</button>
    </form>
  );
}
