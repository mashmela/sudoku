const initialData = [
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
];

export function getSquareIndex(row, col) {
  if (row < 3) return col < 3 ? 0 : col < 6 ? 1 : 2;
  if (row < 6) return col < 3 ? 3 : col < 6 ? 4 : 5;
  return col < 3 ? 6 : col < 6 ? 7 : 8;
}

function getSudoku() {
  const rows = [...initialData];
  const cols = [...initialData];
  const squares = [...initialData];

  const result = [
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
  ];

  for (let index = 0; index < 81; index++) {
    const row = index % 9;
    const col = Math.floor(index / 9);

    const availableNumbers = [];
    const squareIndex = getSquareIndex(row, col);
    for (let num = 1; num < 10; num++) {
      if (!rows[row].includes(num)) continue;
      if (!cols[col].includes(num)) continue;
      if (!squares[squareIndex].includes(num)) continue;
      availableNumbers.push(num);
    }

    const numIndex = Math.round(Math.random() * (availableNumbers.length - 1));
    const number = availableNumbers[numIndex];
    rows[row] = rows[row].filter((num) => num !== number);
    cols[col] = cols[col].filter((num) => num !== number);
    squares[squareIndex] = squares[squareIndex].filter((num) => num !== number);
    result[row][col] = number;
  }

  return result;
}

function isValid(data) {
  for (let index = 0; index < 81; index++) {
    const row = index % 9;
    const col = Math.floor(index / 9);
    if (data[row][col] === undefined) return false;
  }
  return true;
}

function prepearSudoku(sudokuSolved, openNumbersCount) {
  const sudoku = sudokuSolved.map((row) => row.map((el) => el));
  const allIndexes = new Array(81).fill(null).map((el, index) => index);
  const selectedIndexes = [];
  for (let index = 0; index < openNumbersCount; index++) {
    const index = Math.round(Math.random() * (allIndexes.length - 1));
    selectedIndexes.push(allIndexes[index]);
    allIndexes.splice(index, 1);
  }

  for (let index = 0; index < 81; index++) {
    if (selectedIndexes.includes(index)) continue;
    const row = index % 9;
    const col = Math.floor(index / 9);
    sudoku[row][col] = null;
  }

  return sudoku;
}

export function generateSudoku(openNumbersCount) {
  let sudokuSolved = null;
  while (!sudokuSolved) {
    const result = getSudoku();
    if (!isValid(result)) continue;
    sudokuSolved = result;
  }
  const sudoku = prepearSudoku(sudokuSolved, openNumbersCount);
  return { sudoku, sudokuSolved };
}
