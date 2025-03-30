import './Button.css';

function Button({ children, type = 'button', variant = '', isSquare = false }) {
  return (
    <button
      className={`button ${variant}${isSquare ? 'square' : ''}`}
      type={type}
    >
      {children}
    </button>
  );
}

export default Button;
