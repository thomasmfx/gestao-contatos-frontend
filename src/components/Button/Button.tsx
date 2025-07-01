import './Button.css';
import type { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: string;
  isSquare?: boolean;
  onClick?: () => void;
};

function Button({
  children,
  type = 'button',
  variant = '',
  isSquare = false,
  onClick,
}: Readonly<ButtonProps> ) {
  return (
    <button
      className={['button', variant, isSquare ? 'square' : ''].filter(Boolean).join(' ')}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}

export default Button;