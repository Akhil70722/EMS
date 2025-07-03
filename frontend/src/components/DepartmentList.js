import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig';
import { Link } from 'react-router-dom';
import '../styles/DepartmentList.css';

export default function DepartmentList() {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    api.get('departments/')
      .then(res => setDepartments(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="department-list">
      <h2>Departments</h2>
      <Link to="/departments/add"><button>Add Department</button></Link>
      <table>
        <thead><tr><th>Name</th><th>Description</th><th>Actions</th></tr></thead>
        <tbody>
          {departments.map(d => (
            <tr key={d.id}>
              <td>{d.name}</td>
              <td>{d.description}</td>
              <td><Link to={`/departments/edit/${d.id}`}>Edit</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
