// ======================================================
// SELECT DOM ELEMENTS
// ======================================================
const cells = document.querySelectorAll(".cell");
const message = document.getElementById("message");
const resetButton = document.getElementById("resetBtn");
// ======================================================
// GAME STATE
// ======================================================
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameOver = false;
// ======================================================
// WINNING COMBINATIONS
// ======================================================
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
// ======================================================
// CELL CLICK
// ======================================================
function handleCellClick(event) {
  if (gameOver) {
    return;
  }
  const cell = event.target;
  const index = Number(cell.dataset.index);
  // Do not allow a cell to be played twice.
  if (board[index] !== "") {
    return;
  }
  // Update the game state.
  board[index] = currentPlayer;
  // Update the DOM.
  cell.textContent = currentPlayer;
  // Check whether the player won.
  const winningCombination = checkWinner();
  if (winningCombination !== null) {
    message.textContent = `Player ${currentPlayer} wins!`;
    highlightWinner(winningCombination);
    gameOver = true;
    return;
  }
  // Check for a draw.
  if (checkDraw()) {
    message.textContent = "It's a draw!";
    gameOver = true;
    return;
  }
  // Switch player.
  switchPlayer();
}
// ======================================================
// CHECK WINNER
// ======================================================
function checkWinner() {
  for (const combination of winningCombinations) {
    const a = combination[0];
    const b = combination[1];
    const c = combination[2];
    if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
      return combination;
    }
  }
  return null;
}
// ======================================================
// CHECK DRAW
// ======================================================
function checkDraw() {
  for (const cell of board) {
    if (cell === "") {
      return false;
    }
  }
  return true;
}
// ======================================================
// SWITCH PLAYER
// ======================================================
function switchPlayer() {
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
  message.textContent = `Player ${currentPlayer}'s turn`;
}
// ======================================================
// HIGHLIGHT WINNING CELLS
// ======================================================
function highlightWinner(winningCombination) {
  for (const index of winningCombination) {
    cells[index].classList.add("winner");
  }
}
// ======================================================
// RESET GAME
// ======================================================
function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameOver = false;
  for (const cell of cells) {
    cell.textContent = "";
    cell.classList.remove("winner");
  }
  message.textContent = "Player X's turn";
}
// ======================================================
// EVENTS
// ======================================================
for (const cell of cells) {
  cell.addEventListener("click", handleCellClick);
}
resetButton.addEventListener("click", resetGame);
