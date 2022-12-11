import React from "react";
import styled from "styled-components";

const NUMBER_BUTTONS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const SudokyButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const NumberButtons = styled.div`
  display: grid;
  justify-content: space-between;
  justify-items: center;
  grid-template-columns: 90px 90px 90px;
  grid-template-rows: 90px 90px 90px;
  column-gap: 10px;
  row-gap: 10px;
  width: fit-content;
`;

const DifficultyButtons = styled.div`
  display: flex;
  margin: top 16px;
  flex-direction: column;
  gap: 10px;
`;

const ButtonDifficulty = styled.button`
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

const ButtonNumber = styled.button`
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

function SudokuControlBar({ setSudokuDifficult, onNumberSelect }) {
  return (
    <SudokyButtons>
      <NumberButtons>
        {NUMBER_BUTTONS.map((num) => (
          <ButtonNumber onClick={() => onNumberSelect(num)} key={num}>
            {num}
          </ButtonNumber>
        ))}
      </NumberButtons>
      <DifficultyButtons>
        <ButtonDifficulty onClick={() => setSudokuDifficult(38)}>Легкая сложность</ButtonDifficulty>
        <ButtonDifficulty onClick={() => setSudokuDifficult(20)}>
          Сложная сложность
        </ButtonDifficulty>
      </DifficultyButtons>
    </SudokyButtons>
  );
}

export default React.memo(SudokuControlBar);
