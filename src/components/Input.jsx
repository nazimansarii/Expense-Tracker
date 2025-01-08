import React from "react";

export default function Input({ title, id, name, value, onChange, error }) {
  return (
    <div className="input-container">
      <label htmlFor={id}>{title}</label>
      <input id={id} name={name} value={value} onChange={onChange} />
      <p className="errors">{error}</p>
    </div>
  );
}
