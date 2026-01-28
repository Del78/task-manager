import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const TaskContext = createContext();
const API_URL = 'http://localhost:8000/api/v1';

export const TaskProvider = ({ children }) => {
  const { user, token } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Helper function to build headers with auth token
  const getHeaders = () => ({
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  });

  // Fetch tasks from API when user changes
  useEffect(() => {
    if (user && token) {
      fetchTasks();
    } else {
      setTasks([]);
    }
  }, [user, token]);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        headers: getHeaders(),
      });
      if (!response.ok) throw new Error('Failed to fetch tasks');
      const data = await response.json();
      // Transform API response to match frontend format
      const transformedTasks = data.map(task => ({
        ...task,
        completed: task.status === 'completed',
        subTasks: task.subTasks || [],
      }));
      setTasks(transformedTasks);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (title, description = '') => {
    console.log('addTask called with:', { title, description, userId: user?.id, hasToken: !!token });
    
    if (!user?.id || !token) {
      const msg = 'User not logged in';
      setError(msg);
      console.error(msg);
      return null;
    }
    
    try {
      console.log('Sending task creation request...');
      const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
          title,
          description,
          status: 'pending',
          user_id: user.id,
        })
      });
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add task');
      }
      const newTask = await response.json();
      console.log('New task created:', newTask);
      
      // Transform API response to match frontend format
      const transformedTask = {
        ...newTask,
        completed: newTask.status === 'completed',
        subTasks: newTask.subTasks || [],
      };
      setTasks([...tasks, transformedTask]);
      setError(null);
      console.log('Task added successfully');
      return transformedTask;
    } catch (err) {
      const errorMsg = err.message;
      setError(errorMsg);
      console.error('Error adding task:', err);
      return null;
    }
  };

  const updateTask = async (taskId, updates) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(updates)
      });
      if (!response.ok) throw new Error('Failed to update task');
      const updatedTask = await response.json();
      // Transform API response to match frontend format
      const transformedTask = {
        ...updatedTask,
        completed: updatedTask.status === 'completed',
        subTasks: updatedTask.subTasks || [],
      };
      setTasks(prevTasks => prevTasks.map(task => task.id === taskId ? transformedTask : task));
      return transformedTask;
    } catch (err) {
      setError(err.message);
      console.error('Error updating task:', err);
      throw err;
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });
      if (!response.ok) throw new Error('Failed to delete task');
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (err) {
      setError(err.message);
      console.error('Error deleting task:', err);
    }
  };

  const addSubTask = async (taskId, title) => {
    try {
      const response = await fetch(`${API_URL}/subtasks`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
          task_id: taskId,
          title,
          status: 'pending',
        })
      });
      if (!response.ok) throw new Error('Failed to add subtask');
      const newSubTask = await response.json();
      setTasks(tasks.map(task => {
        if (task.id === taskId) {
          return {
            ...task,
            subTasks: [...(task.subTasks || []), newSubTask]
          };
        }
        return task;
      }));
      return newSubTask;
    } catch (err) {
      setError(err.message);
      console.error('Error adding subtask:', err);
    }
  };

  const updateSubTask = async (taskId, subTaskId, updates) => {
    try {
      const response = await fetch(`${API_URL}/subtasks/${subTaskId}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(updates)
      });
      if (!response.ok) throw new Error('Failed to update subtask');
      const updatedSubTask = await response.json();
      setTasks(tasks.map(task => {
        if (task.id === taskId) {
          return {
            ...task,
            subTasks: (task.subTasks || []).map(subTask =>
              subTask.id === subTaskId ? updatedSubTask : subTask
            )
          };
        }
        return task;
      }));
      return updatedSubTask;
    } catch (err) {
      setError(err.message);
      console.error('Error updating subtask:', err);
    }
  };

  const deleteSubTask = async (taskId, subTaskId) => {
    try {
      const response = await fetch(`${API_URL}/subtasks/${subTaskId}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      if (!response.ok) throw new Error('Failed to delete subtask');
      setTasks(tasks.map(task => {
        if (task.id === taskId) {
          return {
            ...task,
            subTasks: (task.subTasks || []).filter(subTask => subTask.id !== subTaskId)
          };
        }
        return task;
      }));
    } catch (err) {
      setError(err.message);
      console.error('Error deleting subtask:', err);
    }
  };

  const toggleTask = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    
    const newStatus = task.status === 'completed' ? 'pending' : 'completed';
    const oldStatus = task.status;
    
    // Update UI immediately
    const transformedTask = {
      ...task,
      status: newStatus,
      completed: newStatus === 'completed',
    };
    setTasks(prevTasks => prevTasks.map(t => t.id === taskId ? transformedTask : t));
    
    // API call in background (no await)
    updateTask(taskId, { status: newStatus }).catch(err => {
      console.error('Error updating task:', err);
      // Revert on error using previous state
      setTasks(prevTasks => prevTasks.map(t => t.id === taskId ? { ...t, status: oldStatus, completed: oldStatus === 'completed' } : t));
    });
  };

  const toggleSubTask = async (taskId, subTaskId) => {
    const task = tasks.find(t => t.id === taskId);
    const subTask = task?.subTasks?.find(st => st.id === subTaskId);
    if (subTask) {
      const newStatus = subTask.status === 'completed' ? 'pending' : 'completed';
      await updateSubTask(taskId, subTaskId, { status: newStatus });
    }
  };

  return (
    <TaskContext.Provider value={{
      tasks,
      loading,
      error,
      addTask,
      updateTask,
      deleteTask,
      addSubTask,
      updateSubTask,
      deleteSubTask,
      toggleTask,
      toggleSubTask,
      fetchTasks
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within TaskProvider');
  }
  return context;
};
