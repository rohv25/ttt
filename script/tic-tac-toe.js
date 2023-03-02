const statusDisplay = document.querySelector('.status');

let gameActive = true;
const players = ["O", "X"];
let currentPlayer = players[Math.floor(Math.random() * players.length)];    //Random start
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

handleRestartGame()//Game restarts

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}


function checkWin() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            for(let j = 0; j <= winningConditions.length; j++) {    //Adds "winner" class to tiles that are part of the win
                let tile = document.getElementById(winCondition[j]);
                tile.classList.add("winner");
            }
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        statusDisplay.style.color = "rgb(256, 0, 0)";
        if(currentPlayer === "X") {
            //Player count
            let pscore = document.getElementById("pscore").innerHTML;
            pscore = parseInt(pscore) + 1;
            document.getElementById("pscore").innerHTML = pscore;
        }else if(currentPlayer === "O") {
            //Computer count
            let cscore = document.getElementById("cscore").innerHTML;
            cscore = parseInt(cscore) + 1;
            document.getElementById("cscore").innerHTML = cscore;
        }
        return roundWon;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        statusDisplay.style.color = "rgb(256, 0, 0)";
        //Draw count
        let drawscore = document.getElementById("drawscore").innerHTML;
        drawscore = parseInt(drawscore) + 1;
        document.getElementById("drawscore").innerHTML = drawscore;
        return roundDraw;
    }
    return false
}

function handleResultValidation() {
    
    checkWin();

    if(gameActive) {
        handlePlayerChange();
        handleComputerMove();
    }

}

function handleComputerMove() {
    pickComputerMove();
    if (!checkWin()){ 
        handlePlayerChange();
    }
}

function pickComputerMove() {

    while (true){
        //loop through gameState and randomly find available spot
        var m = Math.round(Math.random() * 8);
        if (gameState[m] == '') //Empty spot
            break;
    }

    //m will have computer move
    gameState[m] = currentPlayer;
    document.getElementById(m).innerHTML = currentPlayer;
    //document.querySelector('.cell').getAttributeNode(m).value = currentPlayer;

}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    //Check to see if current cell is an available cell and game is active
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = players[Math.floor(Math.random() * players.length)];    //Random start
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.style.color = "rgb(256, 0, 0)";
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.square').forEach(square => square.innerHTML = "");

    //I KNOW THIS LOOKS HORRIBLE BUT I TRIED USING A FOR LOOP LIKE I DID BEFORE AND IT DIDNT WORK IM SO SORRY
    let tile = document.getElementById("0");
    tile.classList.remove("winner");
    tile = document.getElementById("1");
    tile.classList.remove("winner");
    tile = document.getElementById("2");
    tile.classList.remove("winner");
    tile = document.getElementById("3");
    tile.classList.remove("winner");
    tile = document.getElementById("4");
    tile.classList.remove("winner");
    tile = document.getElementById("5");
    tile.classList.remove("winner");
    tile = document.getElementById("6");
    tile.classList.remove("winner");
    tile = document.getElementById("7");
    tile.classList.remove("winner");
    tile = document.getElementById("8");
    tile.classList.remove("winner");

    //If O computer will start with first move
    if (currentPlayer === "O") {
        handleComputerMove();
    }
}

document.querySelectorAll('.square').forEach(square => square.addEventListener('click', handleCellClick));
document.querySelector('.restart').addEventListener('click', handleRestartGame);