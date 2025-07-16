import React, { useState, useEffect } from 'react';
import axios from '../api/axiosConfig';
import '../styles/LeaveRequestForm.css';

const LeaveRequestForm = () => {
  const [form, setForm] = useState({
    name: '',
    leave_type: 'sick',
    reason: '',
    start_date: '',
    end_date: ''
  });

  const [message, setMessage] = useState('');
  const [leaveCounts, setLeaveCounts] = useState({ casual: 0, sick: 0 });

  // 🔹 Fetch leave counts on load
  useEffect(() => {
    axios.get('/leave-requests/?mine=true')
      .then(res => {
        const counts = { casual: 0, sick: 0 };
        res.data.forEach(req => {
          if (req.status === 'approved') {
            if (req.leave_type === 'casual') counts.casual++;
            if (req.leave_type === 'sick') counts.sick++;
          }
        });
        setLeaveCounts(counts);
      })
      .catch(err => console.error('Error fetching leave data', err));
  }, []);

  // 🔹 Check if eligible for special leave
  const canApplySpecial =
    leaveCounts.casual >= 12 && leaveCounts.sick >= 6;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.leave_type === 'special' && !canApplySpecial) {
      setMessage('❌ You can only apply for Special Leave after using 12 Casual and 6 Sick Leaves.');
      return;
    }

    try {
      await axios.post('/leave-requests/', form);
      setMessage('✅ Leave request submitted successfully!');
      setForm({
        name: '',
        leave_type: 'sick',
        reason: '',
        start_date: '',
        end_date: ''
      });
    } catch (error) {
      console.error(error);
      setMessage('❌ Failed to submit leave request.');
    }
  };

  return (
    <div className="leave-form">
      <h2>Apply for Leave</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>Your Name:</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          required
        />

        <label>Leave Type:</label>
        <select name="leave_type" value={form.leave_type} onChange={handleChange}>
          <option value="sick">Sick Leave ({leaveCounts.sick}/6 used)</option>
          <option value="casual">Casual Leave ({leaveCounts.casual}/12 used)</option>
          <option value="special" disabled={!canApplySpecial}>
            Special Leave {canApplySpecial ? '' : '(Not eligible yet)'}
          </option>
        </select>

        <label>Reason:</label>
        <textarea
          name="reason"
          value={form.reason}
          onChange={handleChange}
          placeholder="Enter your reason"
          required
        />

        <label>Start Date:</label>
        <input type="date" name="start_date" value={form.start_date} onChange={handleChange} required />

        <label>End Date:</label>
        <input type="date" name="end_date" value={form.end_date} onChange={handleChange} required />

        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
};

export default LeaveRequestForm;
  