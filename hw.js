const rockBtn = document.querySelector('.rock-btn');
const scissorsBtn = document.querySelector('.scissors-btn');
const paperBtn = document.querySelector('.paper-btn');
const computerChoice = document.querySelector('.computer-choice');
const userChoice = document.querySelector('.user-choice');
const result = document.querySelector('.result');
const ul = document.querySelector('ul');
const allDeleteBtn = document.querySelector('.all-delete-btn');

let gameRecord = [];
let userScore = 0;
let computerScore = 0;

const deleteResult = (deleteId) => {
    gameRecord = gameRecord.filter(item => item.id !== deleteId);
    updateScore();
    updateRecord();
}

const deleteAllResult = () => {
    gameRecord = [];
    userScore = 0;
    computerScore = 0;
    updateScore();
    updateRecord();
}

const updateScore = () => {
    const userScoreElement = document.querySelector('.user-score');
    const computerScoreElement = document.querySelector('.computer-score');
    userScoreElement.textContent = userScore;
    computerScoreElement.textContent = computerScore;

    if (userScore === 3 || computerScore === 3) {
        const winnerMessage = (userScore === 3 ? "🎉축하합니다! 이겼습니다🎉" : "컴퓨터가 이겼습니다!");
        setTimeout(() => {
            alert(winnerMessage);
            location.reload();
        }, 200);
    }
}

const updateRecord = () => {
    ul.innerHTML = '';

    gameRecord.map(item => {
        const li = document.createElement('li');
        const deleteBtn = document.createElement('button');
        li.classList.add('custom-li');
        deleteBtn.classList.add('custom-delete-btn');

        deleteBtn.innerText = '삭제';
        deleteBtn.addEventListener('click', () => deleteResult(item.id));

        li.textContent = item.message;
        li.appendChild(deleteBtn);
        ul.appendChild(li);
    });
}

const showResult = (user, computer, resultMsg) => {
    userChoice.textContent = user;
    computerChoice.textContent = computer;
    result.textContent = resultMsg;
}

const addResult = (msg) => {
    gameRecord = gameRecord.concat({ id: Date.now(), message: msg });
    updateRecord();
}

const play = (user, computer) => {
    const ROCK = '바위';
    const PAPER = '보';
    const SCISSORS = '가위';
    let message;

    if (user === computer)
        message = '비겼다!';

    switch (user + computer) {
        case SCISSORS + PAPER:
        case ROCK + SCISSORS:
        case PAPER + ROCK:
            message = '이겼다!';
            userScore++;
            break;
        case SCISSORS + ROCK:
        case ROCK + PAPER:
        case PAPER + SCISSORS:
            message = '졌다!';
            computerScore++;
            break;
    }

    const recordMsg = `나: ${user} | 컴퓨터: ${computer} | 결과: ${message}`;
    addResult(recordMsg);
    showResult(user, computer, message);
}

const start = (e) => {
    const pick = ['가위', '바위', '보'];
    const user = e.target.innerText;
    const randomIndex = Math.floor(Math.random() * 3);
    const computer = pick[randomIndex];
    play(user, computer);
}

rockBtn.addEventListener('click', start);
scissorsBtn.addEventListener('click', start);
paperBtn.addEventListener('click', start);
allDeleteBtn.addEventListener('click', deleteAllResult);

