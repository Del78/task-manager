import { PlusIcon } from './AnimatedIcons';
import '../styles/AddTaskForm.css';

export default function AddTaskForm({ onAddTask, newTaskTitle, onTitleChange, newTaskDesc, onDescChange }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTask();
  };

  return (
    <section className="add-task-section">
      <h2>Add New Task</h2>
      <form onSubmit={handleSubmit} className="add-task-form">
        <input
          type="text"
          placeholder="Task title..."
          value={newTaskTitle}
          onChange={(e) => onTitleChange(e.target.value)}
          required
          className="task-title-input"
        />
        <textarea
          placeholder="Task description..."
          value={newTaskDesc}
          onChange={(e) => onDescChange(e.target.value)}
          rows="2"
          className="task-desc-input"
        />
        <button type="submit" className="add-btn">
          <PlusIcon /> Add Task
        </button>
      </form>
    </section>
  );
}
