import React from "react";
import Form from "react-bootstrap/Form";

const ThemeToggle = ({ toggle, mode }) => {
  return (
    <Form.Check type="switch" id="custom-switch" onClick={toggle} mode={mode} />
  );
};

export default ThemeToggle;
