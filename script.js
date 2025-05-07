// Get the board and status elements
const board = document.getElementById("board");
const status = document.getElementById("status");

// Set initial values
let currentPlayer = "X";
let cells = Array(9).fill(null);
let gameActive = true;

// Add restart functionality
function resetGame() {
  // Add animation class to all cells to trigger the reset animation
  const allCells = document.querySelectorAll('.cell');
  allCells.forEach(cell => {
    cell.classList.add('reset'); // Add reset animation
  });

  // Wait for the animation to finish before actually resetting the game
  setTimeout(() => {
    // Clear the game state
    currentPlayer = "X";
    cells = Array(9).fill(null);
    gameActive = true;

    // Reset the status message
    status.textContent = `Player ${currentPlayer}'s turn`;

    // Clear the board and rebuild it
    createBoard();

    // Remove the reset animation class after it finishes
    allCells.forEach(cell => {
      cell.classList.remove('reset'); // Remove the reset animation class
    });
  }, 500); // Wait for 0.5s to match the duration of the animation
}

// Function to create the game board dynamically
function createBoard() {
  board.innerHTML = ''; // Clear existing cells
  cells.forEach((value, index) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = index;

    // If the cell already has a value (X or O), show it
    if (value) {
      cell.textContent = value;
      cell.classList.add(value.toLowerCase());
    }

    // Add click event to each cell
    cell.addEventListener("click", handleCellClick);
    board.appendChild(cell);
  });
}

// Handle clicks on cells
function handleCellClick(e) {
  const index = e.target.dataset.index;

  if (!gameActive || cells[index]) return;

  cells[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add(currentPlayer.toLowerCase());

  if (checkWin()) {
    status.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (cells.every(cell => cell)) {
    status.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  swapPlayer();
  status.textContent = `Player ${currentPlayer}'s turn`;
}

function swapPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkWin() {
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  return winningCombos.some(combo => {
    return combo.every(index => cells[index] === currentPlayer);
  });
}

// Create the board when the page loads
createBoard();
