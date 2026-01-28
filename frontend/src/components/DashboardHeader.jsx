import { useAuth } from '../context/AuthContext';
import { TaskListIcon, LogoutIcon } from './AnimatedIcons';
import '../styles/DashboardHeader.css';

export default function DashboardHeader({ onLogout, userName }) {
  return (
    <header className="dashboard-header">
      <div className="header-content">
        <div className="header-title">
          <TaskListIcon />
          <h1>Task Manager</h1>
        </div>
        <div className="header-user">
          <span>Welcome, {userName}!</span>
          <button className="logout-btn" onClick={onLogout}>
            <LogoutIcon />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
