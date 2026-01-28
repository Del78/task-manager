export default function AuthLinks({ links }) {
  return (
    <div className="auth-links">
      {links.map((link, index) => (
        <div key={index}>
          {link.text && <p>{link.text}</p>}
          <button className="link-button" onClick={link.onClick}>
            {link.label}
          </button>
        </div>
      ))}
    </div>
  );
}
