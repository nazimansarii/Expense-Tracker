import React from "react";

export default function SelectOption({
  label,
  id,
  name,
  value,
  defaultOption,
  onChange,
  error,
  options,
}) {
  return (
    <div className="input-container">
      <label htmlFor={id}>{label}</label>
      <select name={name} id={id} value={value} onChange={onChange}>
        {defaultOption && <option hidden>{defaultOption}</option>}

        {options.map((option, i) => (
          <option key={i} value={option}>{option}</option>
        ))}
      </select>
      <p className="errors">{error}</p>
    </div>
  );
}
