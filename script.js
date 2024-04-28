const rockBtn = document.querySelector('.rock-btn');
const scissorsBtn = document.querySelector('.scissors-btn');
const paperBtn = document.querySelector('.paper-btn');
const computerChoice = document.querySelector('.computer-choice');
const userChoice = document.querySelector('.user-choice');
const result = document.querySelector('.result');
const ul = document.querySelector('ul');
const allDeleteBtn = document.querySelector('.all-delete-btn');

const userScoreBoard = document.querySelector(".user-score");
const computerScoreBoard = document.querySelector(".computer-score");



let gameRecord = [];
let userScore = 0;
let computerScore = 0;

/*기록 삭제*/
const deleteResult = (deleteId) => {
  gameRecord = gameRecord.filter( record => {
      if(record.id !== deleteId) 
        return true;

      if(record.message.includes('이겼다'))
        userScore--;
      else if(record.message.includes('졌다'))
        computerScore--;
      return false;
  })

  updateScore();
  updateRecord();
}

/*기록 전체 삭제*/
const deleteAllResult = () => {
  gameRecord.forEach(record => deleteResult(record.id))

  updateScore();
}

/*점수 업데이트*/
const updateScore = () => {
    userScoreBoard.innerText = userScore;
    computerScoreBoard.innerText = computerScore;

  if (userScore === 3 || computerScore === 3) {
    const winnerMessage = (userScore === 3 ? "🎉축하합니다! 이겼습니다🎉" : "컴퓨터가 이겼습니다!");
    setTimeout(() => {
      alert(winnerMessage);
      location.reload();
    }, 200);
  }
}

/*기록 업데이트*/
const updateRecord = () => {
  ul.innerHTML='';
  let idx = 0;

  gameRecord.map(item => {
    const li = document.createElement('li');
    const deleteBtn = document.createElement('button');
    li.classList.add('custom-li'); 
    deleteBtn.classList.add('custom-delete-btn'); 

    li.innerText = gameRecord[idx++].message;
    deleteBtn.innerText = '삭제';
    
    deleteBtn.addEventListener('click', () => deleteResult(item.id));

    li.appendChild(deleteBtn);
    ul.appendChild(li);

  });
  console.log(gameRecord);
}

/*화면에 선택 사항(가위, 바위, 보) 및 결과 보여주기*/
const showResult = (user, computer, resultMsg) => {
    userChoice.innerText = user;
    computerChoice.innerText = computer
    result.innerText = resultMsg;

    updateScore();
}

/*배열 gameRecord에 결과 추가*/
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

  const recordMsg = `나: ${user} | 컴퓨터: ${computer} | 결과: ${message}`
  addResult(recordMsg);
  showResult(user, computer, message);
}

const start = (e) => {
  const pick = ['가위', '바위', '보',];
  const user = e.target.innerText;
  const randomIndex = Math.floor(Math.random()*3); // 0~2까지의 난수 생성
  const computer = pick[randomIndex]; // 컴퓨터가 내는 값 = 생성한 난수
  play(user,computer)
}

rockBtn.addEventListener('click',start);
scissorsBtn.addEventListener('click',start);
paperBtn.addEventListener('click',start);
allDeleteBtn.addEventListener('click',deleteAllResult)