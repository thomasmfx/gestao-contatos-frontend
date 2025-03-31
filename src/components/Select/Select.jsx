function Select({ options = [], value, onChange, id, required }) {
  return (
    <select
      className="select input"
      required={required}
      onChange={onChange}
      value={value}
      id={id}
    >
      {options.map((option) => (
        <option value={option} key={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export default Select;
