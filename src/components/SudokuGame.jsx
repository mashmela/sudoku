import React from "react";
import styled from "styled-components";

import { getSquareIndex } from "generator";

const Row = styled.div`
  display: flex;
`;

const SudokyTable = styled.div`
  border: 2px solid rgb(48, 48, 48);
  font-size: 28px;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const CellContainer = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0.05px solid rgb(224, 227, 231);
  padding-bottom: 2px;
  width: 50px;
  height: 48px;
  transition: all 0.5ms ease-in-out;
  color: ${({ isEditable }) => (isEditable ? "rgb(41,95,211)" : "black")};
`;

const CellDivider = styled("div")`
  width: ${({ horizontal }) => (horizontal ? "auto" : "2px")};
  height: ${({ horizontal }) => (horizontal ? "2px" : "auto")};
  display: flex;
  background: rgb(48, 48, 48);
`;

function SudokuGame({ sudoku, initialSudoku, selectedNumber, onNumberClick }) {
  const getStyles = (num, col, row) => {
    if (selectedNumber.col === col && selectedNumber.row === row)
      return { backgroundColor: "rgb(213, 231, 243)" };
    if (selectedNumber.num !== null && selectedNumber.num === num)
      return { backgroundColor: "rgb(216, 231, 243)" };
    if (
      selectedNumber.col === col ||
      selectedNumber.row === row ||
      getSquareIndex(row, col) === selectedNumber.square
    )
      return { backgroundColor: "rgb(239, 248, 255)" };

    return {};
  };

  if (sudoku === null) return null;

  return (
    <SudokyTable>
      {sudoku.map((row, rowIndex) => (
        <>
          <Row key={rowIndex}>
            {row.map((num, colIndex) => (
              <>
                <CellContainer
                  onClick={() => onNumberClick(num, colIndex, rowIndex)}
                  style={getStyles(num, colIndex, rowIndex)}
                  isEditable={num === null || initialSudoku[rowIndex][colIndex] === null}
                  key={colIndex}
                >
                  {num}
                </CellContainer>
                {(colIndex === 2 || colIndex === 5) && <CellDivider />}
              </>
            ))}
          </Row>
          {(rowIndex === 2 || rowIndex === 5) && <CellDivider horizontal />}
        </>
      ))}
    </SudokyTable>
  );
}

export default React.memo(SudokuGame);
