//your JS code here. If required.
const submitButton = document.getElementById("submit");
const playerInput = document.getElementById("playerInput");
const gameBoard = document.getElementById("gameBoard");
const messageDiv = document.getElementById("message");
const cells = document.querySelectorAll(".cell");

let player1Name = "";
let player2Name = "";
let currentPlayer = "";
let boardState = Array(9).fill("");
let isGameActive = true;

submitButton.addEventListener("click", () => {
    player1 = document.getElementById("player1").value;
    player2 = document.getElementById("player2").value;

    if (player1 && player2) {
        currentPlayer = player1;
        playerInput.style.display = "none";
        gameBoard.style.display = "block";
        updateMessage(`${player1}, you're up!`);
    } else {
        alert("Please enter names for both players.");
    }
});

cells.forEach(cell => {
    cell.addEventListener("click", () => {
        if (isGameActive && cell.textContent === "") {
            handleMove(cell);
        }
    });
});

function handleMove(cell) {
    const cellIndex = parseInt(cell.id) - 1;

    // Mark cell with current player's symbol
    boardState[cellIndex] = currentPlayer === player1 ? "x" : "o";
    cell.textContent = boardState[cellIndex];

    if (checkWin()) {
        const winnerName = currentPlayer === player1 ? player1 : player2;
        updateMessage(`${winnerName} congratulations you won!`);
        isGameActive = false;
    } else if (boardState.every(cell => cell !== "")) {
        updateMessage("It's a draw!");
        isGameActive = false;
    } else {
        // Switch turn to the other player
        currentPlayer = currentPlayer === player1 ? player2 : player1;
        updateMessage(`${currentPlayer}, you're up!`);
    }
}

function checkWin() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c];
    });
}

function updateMessage(message) {
    messageDiv.textContent = message;
}