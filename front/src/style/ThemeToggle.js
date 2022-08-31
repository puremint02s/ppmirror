import React from "react";
import styled from "styled-components";

const ToggleBtn = styled.button`
  border: none;
  background: transparent;
  font-size: 25px;
  margin-right: 20px;
  &:hover {
    transform: scale(1.2);
  }
`;

const ThemeToggle = ({ toggle, mode }) => {
  return (
    <ToggleBtn onClick={toggle} mode={mode}>
      {mode === "dark" ? "🌙" : "🌞"}
    </ToggleBtn>
  );
};

export default ThemeToggle;
