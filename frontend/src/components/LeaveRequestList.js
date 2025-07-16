import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig';
import '../styles/LeaveRequestList.css';

export default function LeaveRequestList({ adminView = false }) {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const res = await api.get('leave-requests/' + (adminView ? '' : '?mine=true'));
      setRequests(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`leave-requests/${id}/`, { status });
      fetchRequests();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [adminView]);

  return (
    <div className="leave-request-container">
      <h2>{adminView ? '📋 All Leave Requests' : '📋 My Leave Requests'}</h2>
      <div className="leave-request-table-wrapper">
        <table className="leave-request-table">
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Leave Type</th>
              <th>Reason</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              {adminView && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {requests.map(req => (
              <tr key={req.id}>
                <td>{req.employee?.name || 'N/A'}</td>
                <td>{req.employee?.email || 'N/A'}</td>
                <td>{req.employee?.department || 'N/A'}</td>
                <td>{req.employee?.designation || 'N/A'}</td>
                <td>{req.leave_type}</td>
                <td>{req.reason}</td>
                <td>{req.start_date}</td>
                <td>{req.end_date}</td>
                <td className={`status ${req.status}`}>{req.status}</td>
                {adminView && (
                  <td className="actions">
                    {req.status === 'pending' ? (
                      <>
                        <button
                          className="approve-btn"
                          onClick={() => updateStatus(req.id, 'approved')}
                        >
                          ✅ Approve
                        </button>
                        <button
                          className="reject-btn"
                          onClick={() => updateStatus(req.id, 'rejected')}
                        >
                          ❌ Reject
                        </button>
                      </>
                    ) : (
                      <span>{req.status}</span>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
