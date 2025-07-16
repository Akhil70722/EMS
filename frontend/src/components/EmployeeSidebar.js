import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axiosConfig';
import '../styles/EmployeeSidebar.css';

export default function EmployeeSidebar({ setActiveTab, activeTab }) {
  const menuItems = [
    { key: 'profile', label: '👤 My Profile' },
    { key: 'leaves', label: '📝 Apply Leave' },
    { key: 'leaveStatus', label: '📊 Leave Status' },
    { key: 'salary', label: '💰 Salary Slips' },
    { key: 'attendance', label: '📅 Attendance' },
  ];

  const [tasks, setTasks] = useState([]);
  const [showTasks, setShowTasks] = useState(false);
  const [showProjects, setShowProjects] = useState(false); // 🔁 NEW: for collapsible Project Updates

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get('/my-tasks/');
        setTasks(res.data);
      } catch (err) {
        console.error('Failed to fetch tasks');
      }
    };
    fetchTasks();
  }, []);

  return (
    <aside className="employee-sidebar">
      <h2 className="sidebar-title">🧑 Employee Panel</h2>
      <nav>
        <ul className="sidebar-menu">
          {menuItems.map((item) => (
            <li key={item.key}>
              <button
                onClick={() => setActiveTab(item.key)}
                className={`sidebar-btn ${activeTab === item.key ? 'active' : ''}`}
              >
                {item.label}
              </button>
            </li>
          ))}

          {/* 📋 My Tasks (Collapsible) */}
          <li>
            <button
              className="sidebar-btn collapsible"
              onClick={() => setShowTasks(!showTasks)}
            >
              📋 My Tasks {showTasks ? '▲' : '▼'}
            </button>

            {showTasks && (
              <ul className="task-submenu">
                {tasks.length === 0 ? (
                  <li className="no-task">No tasks assigned.</li>
                ) : (
                  tasks.map((task, index) => (
                    <li key={task.id} className="task-block">
                      <Link to={`/employee-dashboard/task/${task.id}`} className="task-link">
                        📝 Task #{index + 1}
                      </Link>
                    </li>
                  ))
                )}
              </ul>
            )}
          </li>

          {/* 📁 Project Updates (Collapsible) */}
          <li>
            <button
              className="sidebar-btn collapsible"
              onClick={() => setShowProjects(!showProjects)}
            >
              📁 Project Updates {showProjects ? '▲' : '▼'}
            </button>

            {showProjects && (
              <ul className="task-submenu">
                <li>
                  <Link to="/employee-dashboard/submit-update" className="task-link">
                    📤 Submit Project Update
                  </Link>
                </li>
                <li>
                  {/* <Link to="/employee-dashboard/project-replies" className="task-link"> */}
                  <Link to="/employee-dashboard/replies" className="task-link">
                    💬 Replies
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </aside>
  );
}
