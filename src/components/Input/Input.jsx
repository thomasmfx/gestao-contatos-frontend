import './Input.css';

function Input({
  id,
  type = 'text',
  placeholder,
  value,
  inputName,
  required,
  onChange,
}) {
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
