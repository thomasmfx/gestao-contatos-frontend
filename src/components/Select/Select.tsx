import { ChangeEventHandler } from "react";

type SelectProps = {
  options: string[];
  value: string;
  id: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  required: boolean;
}

function Select({ options = [], value, onChange, id, required }: Readonly<SelectProps> ) {
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
