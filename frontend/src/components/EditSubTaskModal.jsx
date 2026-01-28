import { useState } from 'react';
import { createPortal } from 'react-dom';
import '../styles/EditSubTaskModal.css';

export default function EditSubTaskModal({ subTask, onSave, onClose }) {
  const [title, setTitle] = useState(subTask.title);

  const handleSave = () => {
    if (title.trim()) {
      onSave({ title });
      onClose();
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className="modal-overlay" onClick={handleBackdropClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>Edit Subtask</h2>
          <button className="modal-close-btn" onClick={onClose}>✕</button>
        </div>
        
        <div className="modal-body">
          <div className="form-group">
            <label htmlFor="subtask-title">Subtask Title</label>
            <input
              id="subtask-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="modal-input"
              placeholder="Enter subtask title"
              autoFocus
            />
          </div>
        </div>
        
        <div className="modal-footer">
          <button className="modal-cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="modal-save-btn" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
