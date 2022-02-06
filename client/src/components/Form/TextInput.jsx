import React from "react";
import Form from "react-bootstrap/Form";

const TextInput = ({
  label,
  onChange,
  value = "",
  name,
  type = "text",
  required,
  inputStyle,
}) => {
  const handleChange = (ev) => {
    const value = ev.target.value;
    onChange(value, name, ev);
  };
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        name={name}
        required={required}
        autoFocus
        type={type}
        value={value || ""}
        style={inputStyle}
        onChange={handleChange}
      />
    </Form.Group>
  );
};

export default TextInput;
