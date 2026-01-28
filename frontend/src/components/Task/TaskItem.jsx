import { useState } from 'react';
import Swal from 'sweetalert2';
import { useTasks } from '../../context/TaskContext';
import { EditIcon, TrashIcon, PlusIcon, CheckCircleIcon } from '../AnimatedIcons';
import SubTaskItem from '../SubTaskItem';
import EditTaskModal from '../EditTaskModal';
import '../../styles/TaskItem.css';

export default function TaskItem({ task }) {
  const { updateTask, deleteTask, addSubTask, toggleTask } = useTasks();
  const [showEdit, setShowEdit] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDesc, setEditDesc] = useState(task.description);
  const [showSubTaskForm, setShowSubTaskForm] = useState(false);
  const [newSubTaskTitle, setNewSubTaskTitle] = useState('');
  const [expanded, setExpanded] = useState(false);

  const handleSave = (updatedData) => {
    updateTask(task.id, updatedData);
    setShowEdit(false);
  };

  const handleAddSubTask = (e) => {
    e.preventDefault();
    if (newSubTaskTitle.trim()) {
      addSubTask(task.id, newSubTaskTitle);
      setNewSubTaskTitle('');
      setShowSubTaskForm(false);
    }
  };

  const handleToggleTask = () => {
    const isCompleting = !task.completed;
    
    // Update immediately
    toggleTask(task.id);
    
    // Show alert immediately (don't wait for API)
    if (isCompleting) {
      Swal.fire({
        title: 'Task Completed! 🎉',
        text: `"${task.title}" has been marked as completed.`,
        icon: 'success',
        confirmButtonText: 'Great!',
        confirmButtonColor: '#4CAF50',
        timer: 2000,
        timerProgressBar: true,
      });
    }
  };

  const completedSubTasks = task.subTasks.filter(st => st.completed).length;

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-header">
        <div className="task-left">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleToggleTask}
            className="task-checkbox"
          />
          <div className="task-content">
            <>
              <h3 className="task-title">{task.title}</h3>
              {task.description && <p className="task-desc">{task.description}</p>}
              {task.subTasks.length > 0 && (
                <div className="subtask-progress">
                  {completedSubTasks}/{task.subTasks.length} subtasks completed
                </div>
              )}
            </>
          </div>
        </div>
        <div className="task-actions">
          <>
            <button
              className="action-btn edit-btn"
              onClick={() => setShowEdit(true)}
              title="Edit task"
              aria-label="Edit task"
            >
              <EditIcon />
            </button>
            <button
              className="action-btn expand-btn"
              onClick={() => setExpanded(!expanded)}
              title={expanded ? 'Collapse' : 'Expand'}
              aria-label={expanded ? 'Collapse' : 'Expand'}
            >
              <span className={`expand-icon ${expanded ? 'expanded' : ''}`}>→</span>
            </button>
            <button
              className="action-btn delete-btn"
              onClick={() => deleteTask(task.id)}
              title="Delete task"
              aria-label="Delete task"
            >
              <TrashIcon />
            </button>
          </>
        </div>
      </div>

      {expanded && (
        <div className="task-expanded">
          <div className="subtasks-section">
            <h4>Subtasks ({task.subTasks.length})</h4>
            
            {task.subTasks.length > 0 && (
              <div className="subtasks-list">
                {task.subTasks.map(subTask => (
                  <SubTaskItem key={subTask.id} taskId={task.id} subTask={subTask} />
                ))}
              </div>
            )}

            {showSubTaskForm ? (
              <form onSubmit={handleAddSubTask} className="add-subtask-form">
                <input
                  type="text"
                  placeholder="Add a subtask..."
                  value={newSubTaskTitle}
                  onChange={(e) => setNewSubTaskTitle(e.target.value)}
                  autoFocus
                  required
                />
                <button type="submit" className="add-subtask-btn">
                  <PlusIcon /> Add
                </button>
                <button
                  type="button"
                  className="cancel-subtask-btn"
                  onClick={() => setShowSubTaskForm(false)}
                >
                  ✕ Cancel
                </button>
              </form>
            ) : (
              <button
                className="add-subtask-link"
                onClick={() => setShowSubTaskForm(true)}
              >
                <PlusIcon /> Add Subtask
              </button>
            )}
          </div>
        </div>
      )}

      {showEdit && (
        <EditTaskModal task={task} onSave={handleSave} onClose={() => setShowEdit(false)} />
      )}
    </div>
  );
}
