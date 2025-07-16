
import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig';
import '../styles/EmployeeProjectReplies.css';

const EmployeeProjectReplies = () => {
  const [projectThreads, setProjectThreads] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReplies();
  }, []);

  const fetchReplies = async () => {
    try {
      const res = await api.get('/project-updates/my-updates/');
      const grouped = {};

      res.data.forEach(update => {
        const project = update.project_name;

        if (!grouped[project]) {
          grouped[project] = [];
        }

        grouped[project].push(update);
      });

      setProjectThreads(grouped);
    } catch (err) {
      console.error('❌ Failed to load replies:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="employee-replies-container">
      <h2 className="employee-replies-title">📥 Admin Replies to Your Project Updates</h2>

      {loading ? (
        <p className="employee-loading">⏳ Loading...</p>
      ) : Object.keys(projectThreads).length === 0 ? (
        <p className="employee-no-replies">⚠️ No replies found yet.</p>
      ) : (
        Object.entries(projectThreads).map(([project, updates]) => (
          <div key={project} className="employee-project-thread">
            <div className="employee-project-header">🧩 {project}</div>

            <div className="chat-thread">
              {updates
                .sort((a, b) => new Date(a.date) - new Date(b.date)) // sort by date
                .map(update => (
                  <div key={update.id} className="chat-message-group">
                    <div className="chat-bubble employee-bubble">
                      <strong>You:</strong> {update.update_text}
                      <div className="chat-timestamp">🕒 {update.date}</div>
                    </div>

                    {update.comments.map((comment, idx) => (
                      <div key={idx} className="chat-bubble admin-bubble">
                        <strong>{comment.sender_name}:</strong> {comment.comment}
                      </div>
                    ))}
                  </div>
                ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default EmployeeProjectReplies;
