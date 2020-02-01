/*input data*/
let $initialBtn = document.querySelector('#initial');
let $startBtn = document.querySelector('#start');
let $gameField = document.querySelector('#game');
let $resultHeader = document.querySelector('#result-header');
let $gameTime = document.querySelector('#time');
let $timerHeader = document.querySelector('#time-header');
let $defaultGameTime = document.querySelector('#game-time');
let isGameStarted = false;
let totalScore = 0;

$initialBtn.addEventListener('click', gameFieldHandler);
$startBtn.addEventListener('click', startGame);
$gameField.addEventListener('click', onClickEvent);

/*Functions describe section*/

function gameFieldHandler() {
    document.querySelector('.roles-block').classList.add('hide');
    document.querySelector('.app').classList.remove('hide');
}

function startGame() {
    totalScore = 0;
    $startBtn.classList.add('hide');
    $gameField.style.backgroundColor = 'white';
    $timerHeader.classList.remove('hide');
    $resultHeader.classList.add('hide');
    isGameStarted = true;
    setGameTime();

    let gameTimer = setInterval(function () {
        let currentTime =  parseFloat($gameTime.textContent);
        if(currentTime<=0) {
            clearInterval(gameTimer);
            endGame();
        } else {
            $gameTime.textContent = (currentTime - 0.1).toFixed(1);
        }
    }, 100);

    runGame()
}
function setGameTime() {
    $gameTime.textContent = parseInt($defaultGameTime.value).toFixed(1);
}

function runGame() {
    $gameField.innerHTML = '';

    let boxRenderSize = getRandomValue(20, 70);
    let box = document.createElement('div');
    let gameSize = $gameField.getBoundingClientRect();
    let fieldHeight = gameSize.height;
    let fieldWidth = gameSize.width;
    box.style.height = box.style.width = boxRenderSize + 'px';
    box.style.backgroundColor = '#'+getRandomValue(100, 999);
    box.style.border = '1px solid grey';
    box.style.borderRadius = '5px';
    box.style.cursor = 'pointer';
    box.style.position = 'absolute';
    box.style.top = getRandomValue(boxRenderSize, fieldHeight - boxRenderSize) + 'px';
    box.style.left = getRandomValue(boxRenderSize, fieldWidth - boxRenderSize) + 'px';
    box.setAttribute('data-boxToggle', 'notImportant');
    $gameField.insertAdjacentElement('afterbegin', box)

}

function onClickEvent(event) {
    if (!isGameStarted) {
    return
    }
    if (event.target.dataset.boxtoggle) {
        totalScore++;
        runGame();
        $resultHeader.textContent = 'Ваш результат: '+totalScore;
    }
}

function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function endGame() {
    $gameField.innerHTML = '';
    isGameStarted = false;
    $startBtn.classList.remove('hide');
    $gameField.style.backgroundColor = '#8b8b8b';
    $resultHeader.classList.remove('hide');
    $timerHeader.classList.add('hide');
}