import './Button.css';

function Button({
  children,
  type = '',
  variant = '',
  isSquare = false,
  onClick,
}) {
  return (
    <button
      className={`button ${variant} ${isSquare ? 'square' : ''}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}

export default Button;
