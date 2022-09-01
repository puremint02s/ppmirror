import React from "react";
import styled from "styled-components";

const ToggleBtn = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: transparent;
  font-size: 25px;
  margin-right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    transform: scale(1.3);
    /* box-shadow: ${(props) =>
      props.mode === "dark"
        ? "0px 5px 15px rgba(40, 40, 40, 1), 0px 2px 4px rgba(40, 40, 40, 1)"
        : "0 5px 15px rgba(100, 100, 100, 0.15), 0 2px 4px rgba(100, 100, 100, 0.15)"}; */
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
