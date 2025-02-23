
let timer = 60;
let score = 0;
let hitrn = 0;
let gameOver = false;

function makeBubble() {
    let clutter = '';
    for (let i = 0; i < 154; i++) {
        clutter += `<div class="bubble">${Math.floor(Math.random() * 10)}</div>`;
    }
    document.querySelector('.panel-bottom').innerHTML = clutter;
}

function runTimer() {
    let interval = setInterval(() => {
        if (timer > 0 && !gameOver) {
            timer--;
            document.querySelector('#timerval').textContent = timer;
        } else {
            clearInterval(interval);
            gameOver = true;
            document.querySelector('.panel-bottom').innerHTML = '';
            document.querySelector('.game-over-panel').classList.add('game-over');
            document.querySelector('#finalScore').textContent = score;
        }
    }, 1000);
}

function getNewHit() {
    hitrn = Math.floor(Math.random() * 10);
    document.querySelector('#hitVal').textContent = hitrn;
}

function increaseScore() {
    score += 10;
    document.querySelector('#scoreVal').textContent = score;
}

document.querySelector('.panel-bottom').addEventListener('click', function (e) {
    if (gameOver) return; // Disable clicks after game is over

    let clickedElement = e.target;
    if (clickedElement.classList.contains('bubble')) {
        let clickedNum = Number(clickedElement.textContent);
        if (clickedNum === hitrn) {
            increaseScore();
            makeBubble();
            getNewHit();
        } else {
            clickedElement.classList.add('wrong');
            setTimeout(() => {
                clickedElement.classList.remove('wrong');
            }, 500);
        }
    }
});

document.querySelector('#restartBtn').addEventListener('click', restartGame);

function restartGame() {
    timer = 60;
    score = 0;
    gameOver = false;
    document.querySelector('#timerval').textContent = timer;
    document.querySelector('#scoreVal').textContent = score;
    document.querySelector('#hitVal').textContent = 0;
    document.querySelector('.game-over-panel').classList.remove('game-over');
    makeBubble();
    getNewHit();
    runTimer();
}

// Start the game
makeBubble();
getNewHit();
runTimer();
