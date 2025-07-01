import type { ChangeEventHandler } from 'react';
import './Input.css';

type InputProps = {
  id?: string;
  type?: string;
  placeholder?: string;
  value: string;
  inputName?: string;
  required?: boolean;
  className?: string;
  onChange: ChangeEventHandler<HTMLInputElement>
}

function Input({
  id,
  type = 'text',
  placeholder,
  value,
  inputName,
  required,
  onChange,
}: Readonly<InputProps> ) {
  return (
    <input
      placeholder={placeholder}
      required={required}
      onChange={onChange}
      autoComplete="off"
      className="input"
      name={inputName}
      value={value}
      type={type}
      id={id}
    />
  );
}

export default Input;
