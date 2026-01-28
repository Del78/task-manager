import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import './App.css';

function AppContent() {
  const { user, loading } = useAuth();
  const [authPage, setAuthPage] = useState('login');

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!user) {
    return (
      <>
        {authPage === 'login' && (
          <Login
            onSwitchToRegister={() => setAuthPage('register')}
            onSwitchToForgot={() => setAuthPage('forgot')}
          />
        )}
        {authPage === 'register' && (
          <Register onSwitchToLogin={() => setAuthPage('login')} />
        )}
        {authPage === 'forgot' && (
          <ForgotPassword onSwitchToLogin={() => setAuthPage('login')} />
        )}
      </>
    );
  }

  return (
    <TaskProvider>
      <Dashboard />
    </TaskProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
