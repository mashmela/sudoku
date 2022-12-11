import React from "react";
import styled from "styled-components";

const StyledButtonDifficulty = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(240, 248, 253);
  background: rgb(41, 95, 211);
  border-radius: 6px;
  border: none;
  font-size: 18px;
  height: 50px;
  width: 100%;
  cursor: pointer;

  &:hover {
    background: rgb(8, 80, 148);
    transition: all 0.9ms ease-in-out;
  }
`;

const ButtonDifficulty = ({ children, onClick }) => {
  return <StyledButtonDifficulty onClick={onClick}>{children}</StyledButtonDifficulty>;
};

export default ButtonDifficulty;
