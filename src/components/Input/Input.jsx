import './Input.css';

function Input({ id, type = 'text', placeholder, value, inputName, onChange }) {
  return (
    <input
      placeholder={placeholder}
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
