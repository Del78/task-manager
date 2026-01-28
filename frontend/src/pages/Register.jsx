import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AuthCard from '../components/AuthCard';
import FormField from '../components/Form/FormField';
import FormMessages from '../components/Form/FormMessages';
import FormButton from '../components/Form/FormButton';
import AuthLinks from '../components/AuthLinks';

export default function Register({ onSwitchToLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await register(email, password, name);
      setSuccess('Registration successful! Redirecting to login...');
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        onSwitchToLogin();
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = 
    name.trim() !== '' && 
    email.trim() !== '' && 
    password.trim() !== '' && 
    confirmPassword.trim() !== '' &&
    password === confirmPassword &&
    password.length >= 6;

  return (
    <AuthCard title="Register">
      <form onSubmit={handleSubmit}>
        <FormField
          label="Full Name"
          type="text"
          value={name}
          onChange={setName}
        />
        <FormField
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
        />
        <FormField
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
        />
        <FormField
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={setConfirmPassword}
        />
        <FormMessages error={error} success={success} />
        <FormButton
          isLoading={loading}
          loadingText="Registering..."
          defaultText="Register"
          isDisabled={!isFormValid}
        />
      </form>
      <AuthLinks
        links={[
          {
            text: 'Already have an account?',
            label: 'Login here',
            onClick: onSwitchToLogin
          }
        ]}
      />
    </AuthCard>
  );
}
