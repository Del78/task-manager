import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AuthCard from '../components/AuthCard';
import FormField from '../components/Form/FormField';
import FormMessages from '../components/Form/FormMessages';
import FormButton from '../components/Form/FormButton';
import AuthLinks from '../components/AuthLinks';

export default function ForgotPassword({ onSwitchToLogin }) {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      resetPassword(email, newPassword);
      setSuccess('Password reset successfully! You can now login.');
      setEmail('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(onSwitchToLogin, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = 
    email.trim() !== '' && 
    newPassword.trim() !== '' && 
    confirmPassword.trim() !== '' &&
    newPassword === confirmPassword &&
    newPassword.length >= 6;

  return (
    <AuthCard title="Reset Password">
      <form onSubmit={handleSubmit}>
        <FormField
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
        />
        <FormField
          label="New Password"
          type="password"
          value={newPassword}
          onChange={setNewPassword}
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
          loadingText="Resetting..."
          defaultText="Reset Password"
          isDisabled={!isFormValid}
        />
      </form>
      <AuthLinks
        links={[
          {
            label: 'Back to Login',
            onClick: onSwitchToLogin
          }
        ]}
      />
    </AuthCard>
  );
}
