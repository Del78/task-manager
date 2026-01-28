import { TaskListIcon, CheckCircleIcon, AlertIcon } from '../AnimatedIcons';
import '../../styles/TaskStats.css';

export default function TaskStats({ totalTasks, completedCount }) {
  return (
    <div className="stats">
      <div className="stat-card">
        <div className="stat-icon total">
          <TaskListIcon />
        </div>
        <div className="stat-content">
          <h3>{totalTasks}</h3>
          <p>Total Tasks</p>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-icon completed">
          <CheckCircleIcon />
        </div>
        <div className="stat-content">
          <h3>{completedCount}</h3>
          <p>Completed</p>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-icon pending">
          <AlertIcon />
        </div>
        <div className="stat-content">
          <h3>{totalTasks - completedCount}</h3>
          <p>Pending</p>
        </div>
      </div>
    </div>
  );
}
