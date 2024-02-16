const gameArea = document.getElementById('gameArea');
const ball = document.getElementById('ball');
const paddleA = document.getElementById('paddleA');
const paddleB = document.getElementById('paddleB');
const scoreDisplayA = document.getElementById('scoreA');
const scoreDisplayB = document.getElementById('scoreB');

let ballDirX = 2, ballDirY = 2;
let paddleSpeed = 40;
let scoreA = 0;
let scoreB = 0;
let gameInterval;

function updateScore() {
    scoreDisplayA.textContent = `Player A: ${scoreA}`;
    scoreDisplayB.textContent = `Player B: ${scoreB}`;

    // Existing score updating logic

    // Check for a winner
    if (scoreA >= 10) {
        showWinningScreen('Player A');
    } else if (scoreB >= 10) {
        showWinningScreen('Player B');
    }
}

function showWinningScreen(winner) {
    document.getElementById('winnerMessage').innerText = `${winner} wins!`;
    document.getElementById('winningScreen').style.display = 'flex'; // Show the winning screen
    clearInterval(gameInterval); // Stop the game
}


function resetBall() {
    ball.style.left = '295px'; // Center the ball horizontally
    ball.style.top = '195px'; // Center the ball vertically
    ballDirX = ballDirX > 0 ? -2 : 2;
    ballDirY = ballDirY > 0 ? -2 : 2;
    clearInterval(gameInterval); // Stop the game
}

function moveBall() {
    let ballRect = ball.getBoundingClientRect();
    let gameRect = gameArea.getBoundingClientRect();
    let paddleARect = paddleA.getBoundingClientRect();
    let paddleBRect = paddleB.getBoundingClientRect();

    let newBallX = ball.offsetLeft + ballDirX;
    let newBallY = ball.offsetTop + ballDirY;

    if (newBallY <= 0 || newBallY + ballRect.height >= gameRect.height) {
        ballDirY = -ballDirY;
    }

    if ((newBallX <= paddleARect.right - gameRect.left && newBallY + ballRect.height >= paddleARect.top - gameRect.top && newBallY <= paddleARect.bottom - gameRect.top) ||
        (newBallX + ballRect.width >= paddleBRect.left - gameRect.left && newBallY + ballRect.height >= paddleBRect.top - gameRect.top && newBallY <= paddleBRect.bottom - gameRect.top)) {
        ballDirX = -ballDirX;
    }

    ball.style.left = `${ball.offsetLeft + ballDirX}px`;
    ball.style.top = `${ball.offsetTop + ballDirY}px`;

    if (newBallX <= 0) {
        scoreB++;
        updateScore();
        ball.style.left = '295px'; // Center the ball horizontally
        ball.style.top = '195px'; // Center the ball vertically
        ballDirX = ballDirX > 0 ? -2 : 2;
        ballDirY = ballDirY > 0 ? -2 : 2;
    } else if (newBallX + ballRect.width >= gameRect.width) {
        scoreA++;
        updateScore();
        ball.style.left = '295px'; // Center the ball horizontally
        ball.style.top = '195px'; // Center the ball vertically
        ballDirX = ballDirX > 0 ? -2 : 2;
        ballDirY = ballDirY > 0 ? -2 : 2;
    }
}

function movePaddle(event) {
    let paddleARect = paddleA.getBoundingClientRect();
    let paddleBRect = paddleB.getBoundingClientRect();
    let gameRect = gameArea.getBoundingClientRect();

    if (event.key === 'w' && paddleARect.top > gameRect.top && gameInterval) {
        paddleA.style.top = `${Math.max(paddleA.offsetTop - paddleSpeed, 0)}px`;
    } else if (event.key === 's' && paddleARect.bottom < gameRect.bottom && gameInterval) {
        paddleA.style.top = `${Math.min(paddleA.offsetTop + paddleSpeed, gameRect.height - paddleARect.height)}px`;
    }

    if (event.key === 'ArrowUp' && paddleBRect.top > gameRect.top && gameInterval) {
        paddleB.style.top = `${Math.max(paddleB.offsetTop - paddleSpeed, 0)}px`;
    } else if (event.key === 'ArrowDown' && paddleBRect.bottom < gameRect.bottom && gameInterval) {
        paddleB.style.top = `${Math.min(paddleB.offsetTop + paddleSpeed, gameRect.height - paddleBRect.height)}px`;
    }
}

document.getElementById('startButton').addEventListener('click', function() {
    startGame();
});

document.getElementById('resetButton').addEventListener('click', function() {
    resetGame();
});

function resetPaddles(){
    document.getElementById('paddleA').style.top = '170px';
    document.getElementById('paddleB').style.top = '170px';
    clearInterval(gameInterval);
}
function startGame() {
    clearInterval(gameInterval);
    resetBall();
    scoreA = 0;
    scoreB = 0;
    updateScore();
    gameInterval = setInterval(moveBall, 10);
}
function resetGame() {
    // Reset scores
    scoreA = 0;
    scoreB = 0;

    // Update the score display to reflect the reset
    updateScore();

    // Reset the ball's position
    resetBall();

    //reset the paddles position
    resetPaddles();

    // Hide the winning screen
    document.getElementById('winningScreen').style.display = 'none';

}

document.getElementById('closeWinScreen').addEventListener('click', function() {
    resetGame();
});

document.addEventListener('keydown', movePaddle);

