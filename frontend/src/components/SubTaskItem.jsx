import { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import EditSubTaskModal from './EditSubTaskModal';
import '../styles/SubTaskItem.css';

export default function SubTaskItem({ taskId, subTask }) {
  const { updateSubTask, deleteSubTask, toggleSubTask } = useTasks();
  const [showEdit, setShowEdit] = useState(false);
  const [editTitle, setEditTitle] = useState(subTask.title);

  const handleSave = (updatedData) => {
    updateSubTask(taskId, subTask.id, updatedData);
    setShowEdit(false);
  };

  return (
    <div className={`subtask-item ${subTask.completed ? 'completed' : ''}`}>
      <div className="subtask-content">
        <input
          type="checkbox"
          checked={subTask.completed}
          onChange={() => toggleSubTask(taskId, subTask.id)}
          className="subtask-checkbox"
        />
        <span className="subtask-title">{subTask.title}</span>
      </div>
      <div className="subtask-actions">
        <>
          <button
            className="subtask-edit-btn"
            onClick={() => setShowEdit(true)}
            title="Edit subtask"
          >
            ✎
          </button>
          <button
            className="subtask-delete-btn"
            onClick={() => deleteSubTask(taskId, subTask.id)}
            title="Delete subtask"
          >
            🗑
          </button>
        </>
      </div>

      {showEdit && (
        <EditSubTaskModal subTask={subTask} onSave={handleSave} onClose={() => setShowEdit(false)} />
      )}
    </div>
  );
}
