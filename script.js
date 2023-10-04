const holes = document.querySelectorAll('.hole');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timerDisplay');
const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');
const highScoreDisplay = document.getElementById('highScore');

let score = 0;
let gameTime = 60;
let gameInterval;
let currentMole;
let highScore = localStorage.getItem('highScore') || 0;

startButton.addEventListener('click', startGame);
resetButton.addEventListener('click', resetGame);

document.addEventListener('keydown', handleKeyPress);

updateHighScore(); // Initialize and display the high score

holes.forEach(hole => {
    hole.addEventListener('click', () => {
        if (hole === currentMole && currentMole.innerHTML.includes('whack.png')) {
            score++;
            updateScore();
            hideMole();
        }
    });
});

function startGame() {
    resetGame();
    startButton.disabled = true;
    updateTimer();
    gameInterval = setInterval(() => {
        gameTime--;
        updateTimer();
        if (gameTime <= 0) {
            endGame();
        } else {
            moveMole();
        }
    }, 1000);
}

function resetGame() {
    score = 0;
    gameTime = 60;
    updateScore();
    updateTimer();
    startButton.disabled = false;
    clearInterval(gameInterval);
    hideMole();
}

function endGame() {
    startButton.disabled = false;
    clearInterval(gameInterval);
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
        updateHighScore();
    }
    alert(`Game Over! Your Score: ${score}`);
}

function updateScore() {
    scoreDisplay.textContent = score;
}

function updateTimer() {
    timerDisplay.textContent = gameTime;
}

function hideMole() {
    if (currentMole) {
        currentMole.innerHTML = '<img src="whackhole.png" alt="Empty Hole">';
    }
}

function moveMole() {
    hideMole();
    const randomIndex = Math.floor(Math.random() * holes.length);
    currentMole = holes[randomIndex];
    currentMole.innerHTML = '<img src="whack.png" alt="Whack Mole">';
}

function handleKeyPress(event) {
    const key = event.key;
    const hole = document.querySelector(`[data-key="${key}"]`);
    
    if (hole === currentMole && currentMole.innerHTML.includes('whack.png')) {
        score++;
        updateScore();
        hideMole();
    }
}

function updateHighScore() {
    highScoreDisplay.textContent = highScore;
}
const startAudio = new Audio('audio.mp3'); // Replace 'audio.mp3' with the actual path to your audio file

startButton.addEventListener('click', startGame);
resetButton.addEventListener('click', () => {
    resetGame();
    startAudio.pause(); // Pause the audio when resetting the game
    startAudio.currentTime = 0; // Reset the audio to the beginning
});

function startGame() {
    resetGame();
    startButton.disabled = true;
    updateTimer();
    startAudio.play(); // Play the audio when the game starts
    gameInterval = setInterval(() => {
        gameTime--;
        updateTimer();
        if (gameTime <= 0) {
            endGame();
        } else {
            moveMole();
        }
    }, 1000);
}
holes.forEach(hole => {
    hole.addEventListener('mousedown', () => {
        if (hole === currentMole && currentMole.innerHTML.includes('whack.png')) {
            score++;
            updateScore();
            hideMole();
        }
    });
});
