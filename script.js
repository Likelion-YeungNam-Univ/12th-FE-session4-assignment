const scissorsBtn = document.querySelector('.scissors-btn');
const rockBtn = document.querySelector('.rock-btn');
const paperBtn = document.querySelector('.paper-btn');
const userChoice = document.querySelector('.user-choice');
const computerChoice = document.querySelector('.computer-choice');
const result = document.querySelector('.result');
const ul = document.querySelector('ul');
const allDeleteBtn = document.querySelector('.all-delete-btn');
//..
const scoreUser = document.querySelector('.user-score');
const scoreComputer = document.querySelector('.computer-score');
//..


let gameRecord = [];
let userScore = 0;
let computerScore = 0;

/*기록 삭제*/
const deleteResult = (deleteId) => {
	//...
  if (gameRecord.length == 1){
    deleteAllResult();
    return;
  }
  //점수변동
  const delList = gameRecord.filter(a => deleteId == a.id);
  let delListMsg = delList.map(a => a.message);
  delListMsg = delListMsg[0];
  if (delListMsg.includes('이겼다!')){
    --userScore;
  }
  else if (delListMsg.includes('졌다!')){
    --computerScore;
  }
  updateScore();

  //리스트 삭제
  gameRecord = gameRecord.filter(delitem => deleteId !== delitem.id);
  updateRecord();
}

/*기록 전체 삭제*/
const deleteAllResult = () => {
	//...
  gameRecord = [];
  userScore = 0;
  computerScore = 0;

  updateRecord();
  updateScore();
  showResult('나','컴퓨터','가위바위보!');
}

/*점수 업데이트*/
const updateScore = () => {
	//...
  scoreUser.innerText = userScore;
  scoreComputer.innerText = computerScore;

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

  gameRecord.map(item => {
    const li = document.createElement('li');
    const deleteBtn = document.createElement('button');
    li.classList.add('custom-li'); 
    deleteBtn.classList.add('custom-delete-btn'); 
    
    //..
    li.innerText = item.message;

    deleteBtn.innerText = '삭제';
    
    deleteBtn.addEventListener('click', () => deleteResult(item.id));

    li.appendChild(deleteBtn);
    ul.appendChild(li);
  });
  console.log(gameRecord);
}

/*화면에 선택 사항(가위, 바위, 보) 및 결과 보여주기*/
const showResult = (user, computer, resultMsg) => {
	//...
  userChoice.innerText = user;
  computerChoice.innerText = computer;
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
//..
allDeleteBtn.addEventListener('click',deleteAllResult);