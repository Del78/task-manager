import '../../styles/TaskFilters.css';

export default function TaskFilters({ filter, onFilterChange, totalTasks, completedCount }) {
  return (
    <div className="filter-buttons">
      <button
        className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
        onClick={() => onFilterChange('all')}
      >
        All ({totalTasks})
      </button>
      <button
        className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
        onClick={() => onFilterChange('pending')}
      >
        Pending ({totalTasks - completedCount})
      </button>
      <button
        className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
        onClick={() => onFilterChange('completed')}
      >
        Completed ({completedCount})
      </button>
    </div>
  );
}
