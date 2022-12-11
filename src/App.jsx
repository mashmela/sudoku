import React from "react";
import styled from "styled-components";

import SudokuControlBar from "components/SudokuControlBar";
import SudokuGame from "components/SudokuGame";

import { generateSudoku, getSquareIndex } from "generator";

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  color: #353437;
  width: 800px;
  margin: auto;
`;

const Title = styled.h1`
  color: rgb(27, 93, 185);
  letter-spacing: 2.4px;
`;

const SudokyApp = styled.div`
  display: flex;
  justify-content: space-between;
`;

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

  if (sudoku === null) return null;

  return (
    <AppWrapper>
      <Title>SUDOKU</Title>
      <SudokyApp>
        <SudokuGame
          initialSudoku={initialSudoku}
          onNumberClick={handleClickNum}
          selectedNumber={selectedNumber}
          sudoku={sudoku}
        />
        <SudokuControlBar
          setSudokuDifficult={setSudokuDifficult}
          onNumberSelect={handleChooseNum}
        />
      </SudokyApp>
    </AppWrapper>
  );
}

export default App;
