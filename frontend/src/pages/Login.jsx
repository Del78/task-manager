import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AuthCard from '../components/AuthCard';
import FormField from '../components/Form/FormField';
import FormMessages from '../components/Form/FormMessages';
import FormButton from '../components/Form/FormButton';
import AuthLinks from '../components/AuthLinks';

export default function Login({ onSwitchToRegister, onSwitchToForgot }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      login(email, password);
      setEmail('');
      setPassword('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = email.trim() !== '' && password.trim() !== '';

  return (
    <AuthCard title="Login">
      <form onSubmit={handleSubmit}>
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
        <FormMessages error={error} />
        <FormButton
          isLoading={loading}
          loadingText="Logging in..."
          defaultText="Login"
          isDisabled={!isFormValid}
        />
      </form>
      <AuthLinks
        links={[
          {
            label: 'Forgot Password?',
            onClick: onSwitchToForgot
          },
          {
            text: "Don't have an account?",
            label: 'Register here',
            onClick: onSwitchToRegister
          }
        ]}
      />
    </AuthCard>
  );
}
