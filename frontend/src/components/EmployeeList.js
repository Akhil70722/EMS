import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';
import '../styles/EmployeeList.css';

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const access = localStorage.getItem('access');
      const refresh = localStorage.getItem('refresh');
      if (!access || !refresh) {
        navigate('/login');
      } else {
        await fetchEmployees();
      }
    };

    checkAuth();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await api.get('employees/');
      setEmployees(res.data);
    } catch (err) {
      console.error("Error fetching employees:", err);
      if (err.response?.status === 401) {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) return;

    try {
      await api.delete(`employees/${id}/`);
      setEmployees(prev => prev.filter(emp => emp.id !== id));
    } catch (err) {
      console.error('Error deleting employee:', err);
      alert('Failed to delete employee.');
    }
  };

  const downloadCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Department', 'Designation', 'Salary', 'Active'];
    const rows = employees.map(emp => [
      emp.name,
      emp.email,
      emp.phone,
      emp.department || '',
      emp.designation,
      emp.salary,
      emp.is_active ? 'Yes' : 'No'
    ]);

    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += headers.join(',') + '\n';
    rows.forEach(row => {
      csvContent += row.join(',') + '\n';
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'employee_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="emp-list-container">
      <div className="emp-header">
        <h2>Employee List</h2>
        <div className="emp-actions">
          <Link to="/employees/add">
            <button className="add-btn">+ Add Employee</button>
          </Link>
          <button
            className="download-btn"
            onClick={downloadCSV}
            disabled={employees.length === 0}
          >
            ⬇ Export CSV
          </button>
        </div>
      </div>

      {loading ? (
        <p className="loading-text">Loading...</p>
      ) : employees.length === 0 ? (
        <p className="no-data-text">No employees found.</p>
      ) : employees.length === 1 ? (
        <div className="single-emp-profile">
          <h3>Your Profile</h3>
          <p><strong>Name:</strong> {employees[0].name}</p>
          <p><strong>Email:</strong> {employees[0].email}</p>
          <p><strong>Phone:</strong> {employees[0].phone}</p>
          <p><strong>Department:</strong> {employees[0].department}</p>
          <p><strong>Designation:</strong> {employees[0].designation}</p>
          <p><strong>Salary:</strong> ₹{employees[0].salary}</p>
          <p><strong>Status:</strong> {employees[0].is_active ? 'Active' : 'Inactive'}</p>
          <div style={{ marginTop: '15px' }}>
            <Link to={`/employees/edit/${employees[0].id}`}>
              <button className="edit-btn">Edit Profile</button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="emp-table-wrapper">
          <table className="emp-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(emp => (
                <tr key={emp.id}>
                  <td>
                    <Link to={`/employees/${emp.id}`} className="emp-name-link">
                      {emp.name}
                    </Link>
                  </td>
                  <td>{emp.email}</td>
                  <td>{emp.department || '—'}</td>
                  <td>
                    <Link to={`/employees/edit/${emp.id}`}>
                      <button className="edit-btn">Edit</button>
                    </Link>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(emp.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
