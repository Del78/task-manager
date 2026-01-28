import '../styles/Auth.css';

export default function AuthCard({ title, children }) {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>{title}</h1>
        {children}
      </div>
    </div>
  );
}
