import TaskItem from './TaskItem';
import '../../styles/TaskList.css';

export default function TaskList({ filteredTasks }) {
  return (
    <div className="tasks-list">
      {filteredTasks.length === 0 ? (
        <div className="no-tasks">
          <p>No tasks yet. Create one to get started! 🚀</p>
        </div>
      ) : (
        filteredTasks.map(task => (
          <TaskItem key={task.id} task={task} />
        ))
      )}
    </div>
  );
}
