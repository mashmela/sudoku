import React from "react";
import styled from "styled-components";

import { generateSudoku, getSquareIndex } from "./generator";

import Title from "./components/Title";
import ButtonNumber from "./components/ButtonNumber";
import ButtonDifficulty from "./components/ButtonDifficulty";

import "./App.css";

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  color: #353437;
  width: 800px;
  margin: auto;
`;

const Row = styled.div`
  display: flex;
`;

const SudokyApp = styled.div`
  display: flex;
  margin: auto;
`;

const SudokyTable = styled.div`
  margin: 16px;
  border: 2px solid rgb(48, 48, 48);
  font-size: 28px;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const SudokyButtons = styled.div`
  display: flex;
  margin: 16px;
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
  margin: 16px;
  flex-direction: column;
  gap: 10px;
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

const NUMBER_BUTTONS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const INITIAL_SELECTED_NUMBER = {
  num: null,
  col: null,
  row: null,
  square: null,
  isEditable: false,
};

function App() {
  const [solvedSudoku, setSolvedSudoku] = React.useState(null);
  const [sudoku, setSudoku] = React.useState(null);
  const [initialSudoku, setInitialSudoku] = React.useState(null);
  const [sudokuDifficult, setSudokuDifficult] = React.useState(38);
  const [selectedNumber, setSelectedNumber] = React.useState(INITIAL_SELECTED_NUMBER);

  const startNewSudoku = React.useCallback(() => {
    const { sudoku, sudokuSolved } = generateSudoku(sudokuDifficult);
    setSolvedSudoku(sudokuSolved);
    setSudoku(sudoku);
    setInitialSudoku(sudoku.map((row) => row.map((el) => el)));
    setSelectedNumber(INITIAL_SELECTED_NUMBER);
  }, [sudokuDifficult]);

  React.useEffect(() => startNewSudoku(), [startNewSudoku]);

  const handleClickNum = React.useCallback(
    (num, col, row) => {
      setSelectedNumber({
        num,
        col,
        row,
        square: getSquareIndex(row, col),
        isEditable: initialSudoku[row][col] === null,
      });
    },
    [initialSudoku],
  );

  const checkSudoku = () => {
    const firstSudoku = solvedSudoku.join(",");
    const secondSudoku = sudoku.join(",");
    if (firstSudoku !== secondSudoku) return;
    startNewSudoku();
  };

  const handleChooseNum = (num) => {
    if (!selectedNumber.isEditable) return;
    setSelectedNumber({ ...selectedNumber, num });
    const newSudoku = [...sudoku, []];
    newSudoku[selectedNumber.row][selectedNumber.col] = num;
    setSudoku(newSudoku);
    checkSudoku();
  };

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
    <AppWrapper>
      <Title>SUDOKU</Title>
      <SudokyApp>
        <SudokyTable>
          {sudoku.map((row, rowIndex) => (
            <>
              <Row key={rowIndex}>
                {row.map((num, colIndex) => (
                  <>
                    <CellContainer
                      onClick={() => handleClickNum(num, colIndex, rowIndex)}
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
        <SudokyButtons>
          <NumberButtons>
            {NUMBER_BUTTONS.map((num) => (
              <ButtonNumber onClick={() => handleChooseNum(num)} key={num}>
                {num}
              </ButtonNumber>
            ))}
          </NumberButtons>
          <DifficultyButtons>
            <ButtonDifficulty onClick={() => setSudokuDifficult(38)}>
              Легкая сложность
            </ButtonDifficulty>
            <ButtonDifficulty onClick={() => setSudokuDifficult(20)}>
              Сложная сложность
            </ButtonDifficulty>
          </DifficultyButtons>
        </SudokyButtons>
      </SudokyApp>
    </AppWrapper>
  );
}

export default App;
