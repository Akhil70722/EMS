import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axiosConfig';
import '../styles/EmployeeDetail.css';

export default function EmployeeDetail() {
  const { id } = useParams();
  const [e, setE] = useState(null);

  useEffect(() => {
    api.get(`employees/${id}/`).then(res => setE(res.data));
  }, [id]);

  if (!e) return <p>Loading...</p>;

  return (
    <div className="emp-detail">
      <h2>{e.name}</h2>
      <p><b>Email:</b> {e.email}</p>
      <p><b>Phone:</b> {e.phone}</p>
      <p><b>Dept:</b> {e.department}</p>
      <p><b>Designation:</b> {e.designation}</p>
      <p><b>Salary:</b> {e.salary}</p>
      {/* Edit button removed */}
    </div>
  );
}
