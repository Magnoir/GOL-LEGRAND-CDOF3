const boardSize = 10;
let board = Array(boardSize).fill().map(() => Array(boardSize).fill().map(() => Math.round(Math.random())));

function countNeighbors(board, x, y) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            const dx = x + i;
            const dy = y + j;
            if (dx >= 0 && dx < boardSize && dy >= 0 && dy < boardSize && board[dx][dy]) count++;
        }
    }
    return count;
}

function nextGeneration(board) {
    const newBoard = board.map(arr => [...arr]);
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            const neighbors = countNeighbors(board, i, j);
            if (neighbors < 2 || neighbors > 3) newBoard[i][j] = 0;
            else if (board[i][j] === 0 && neighbors === 3) newBoard[i][j] = 1;
        }
    }
    return newBoard;
}

function printBoard(board) {
    console.clear(); // clear console to avoid scrolling
    for (let i = 0; i < boardSize; i++) {
        let row = '';
        for (let j = 0; j < boardSize; j++) {
            row += board[i][j] ? ' ' : '#';
        }
        console.log(row);
    }
    console.log('\n\n');
}

setInterval(() => {
    printBoard(board);
    board = nextGeneration(board);
}, 1000);