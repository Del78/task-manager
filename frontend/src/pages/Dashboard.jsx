import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';
import DashboardHeader from '../components/DashboardHeader';
import TaskStats from '../components/Task/TaskStats';
import AddTaskForm from '../components/AddTaskForm';
import TaskFilters from '../components/Task/TaskFilters';
import TaskList from '../components/Task/TaskList';
import '../styles/Dashboard.css';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { tasks, addTask, error, loading } = useTasks();
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [filter, setFilter] = useState('all');
  const [submitError, setSubmitError] = useState('');

  const completedCount = tasks.filter(t => t.completed).length;

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  const handleAddTask = async () => {
    if (newTaskTitle.trim()) {
      setSubmitError('');
      const result = await addTask(newTaskTitle, newTaskDesc);
      if (result) {
        setNewTaskTitle('');
        setNewTaskDesc('');
      } else if (error) {
        setSubmitError(error);
      }
    }
  };

  return (
    <div className="dashboard">
      <DashboardHeader userName={user?.name} onLogout={logout} />

      <main className="dashboard-main">
        <TaskStats totalTasks={tasks.length} completedCount={completedCount} />

        {submitError && (
          <div className="error-message" style={{ 
            background: '#fee', 
            color: '#c00', 
            padding: '12px 16px', 
            borderRadius: '8px', 
            marginBottom: '20px',
            border: '1px solid #fcc'
          }}>
            Error: {submitError}
          </div>
        )}

        <AddTaskForm
          onAddTask={handleAddTask}
          newTaskTitle={newTaskTitle}
          onTitleChange={setNewTaskTitle}
          newTaskDesc={newTaskDesc}
          onDescChange={setNewTaskDesc}
        />

        <section className="tasks-section">
          <TaskFilters
            filter={filter}
            onFilterChange={setFilter}
            totalTasks={tasks.length}
            completedCount={completedCount}
          />
          <TaskList filteredTasks={filteredTasks} />
        </section>
      </main>
    </div>
  );
}
