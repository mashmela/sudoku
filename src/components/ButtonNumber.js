import React from "react";
import styled from "styled-components";

const ButtonNumberSudoku = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(240, 248, 253);
  color: rgb(41, 95, 211);
  border-radius: 6px;
  border: none;
  font-size: 40px;
  width: 90px;
  height: 90px;
  cursor: pointer;

  &:hover {
    background: rgb(213, 231, 243);
    transition: all 0.9ms ease-in-out;
  }
`;

const ButtonNumber = ({ children, onClick }) => {
  return <ButtonNumberSudoku onClick={onClick}>{children}</ButtonNumberSudoku>;
};

export default ButtonNumber;
