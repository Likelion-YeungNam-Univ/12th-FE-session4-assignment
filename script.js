const rockBtn = document.querySelector('.rock-btn');
const scissorsBtn = document.querySelector('.scissors-btn');
const paperBtn = document.querySelector('.paper-btn');
const computerChoice = document.querySelector('.computer-choice');
const userChoice = document.querySelector('.user-choice');
const result = document.querySelector('.result');
const ul = document.querySelector('ul');
const allDeleteBtn = document.querySelector('.all-delete-btn');
const myScroe = document.querySelector('.user-score');
const opponentScore = document.querySelector('.computer-score')

let gameRecord = []
let userScore = 0;
let computerScore = 0;

/*기록 삭제*/
const deleteResult = (deleteId) => {
	
  const index = gameRecord.findIndex(item => item.id === deleteId)

  const deleteRecord = gameRecord[index];

  gameRecord.splice(index, 1);
  updateRecord();

  const deletemsg = deleteRecord.message;
  if (deletemsg.includes('이겼다!')){
    userScore--; 
  }
  else if (deletemsg.includes('졌다')){
    computerScore--;
  }
  else{
    // do nothing  
  }
            
  updateScore();
  
}

/*기록 전체 삭제*/
const deleteAllResult = (e) => {
  ul.innerHTML = '';
    gameRecord = [];
    userScore = 0;
    computerScore = 0;
    userChoice.innerText = '나';
    computerChoice.innerText = '컴퓨터';
    result.innerText='가위바위보!'
    updateScore();
}

/*점수 업데이트*/
const updateScore = () => {
	
  myScroe.innerText = userScore;
  opponentScore.innerText = computerScore;
    
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

  // gameRedcord에 있는 요소를 순회하며...
  gameRecord.map(item => {
    const li = document.createElement('li');
    const deleteBtn = document.createElement('button');
    li.classList.add('custom-li'); 
    deleteBtn.classList.add('custom-delete-btn'); 

    li.innerText = item.message; //message 속성 출력
    deleteBtn.innerText = '삭제';
    
    deleteBtn.addEventListener('click', () => deleteResult(item.id));

    li.appendChild(deleteBtn); //deleteBtn을 li 요소 내부에 위치시킴
    ul.appendChild(li); //li를 ul 요소 내부에 위치시킴
  });
  console.log(gameRecord);
}

/*화면에 선택 사항(가위, 바위, 보) 및 결과 보여주기*/
const showResult = (user, computer, resultMsg) => {

  userChoice.innerText = user;
  computerChoice.innerText = computer;
  result.innerText = resultMsg;

  updateScore();
}

/*배열 gameRecord에 결과 추가*/
const addResult = (msg) => {
  gameRecord = gameRecord.concat({ id: Date.now(), message: msg });
  // gameRecord의 각 요소가 id와 message의 속성을 가지는 배열이 만들어짐
  updateRecord();
}

const play = (user, computer) => {
  const ROCK = '바위';
  const PAPER = '보';
  const SCISSORS = '가위';
  let message;
  
  if (user === computer)
    message = '비겼다!';
    console.log('비겼다');

  switch (user + computer) {
    case SCISSORS + PAPER:
    case ROCK + SCISSORS:
    case PAPER + ROCK:
      message = '이겼다!';
      console.log('이겼다')
      userScore++;
      break;
    case SCISSORS + ROCK:
    case ROCK + PAPER:
    case PAPER + SCISSORS:
      message = '졌다!';
      console.log('졌다')
      computerScore++;
      break;
  }

  const recordMsg = `나: ${user} | 컴퓨터: ${computer} | 결과: ${message}`
  addResult(recordMsg);
  showResult(user, computer, message);
}

// user와 computer의 pick이 결정됨
const start = (e) => {
  const pick = ['가위', '바위', '보',];
  const user = e.target.innerText; //이벤트(클릭된)가 발생한 HTML요소의 텍스트 내용을 가져옴 / user에는 가위 or 바위 or 보가 저장됨
  const randomIndex = Math.floor(Math.random()*3); // 0~2까지의 난수 생성
  const computer = pick[randomIndex]; // 컴퓨터가 내는 값 = 생성한 난수
  play(user,computer)
}

rockBtn.addEventListener('click',start); // rockBtn 요소에 click이라는 이벤트를 추가, 클릭이 된 경우 start라는 함수를 호출한다.
scissorsBtn.addEventListener('click',start);
paperBtn.addEventListener('click',start);
allDeleteBtn.addEventListener('click',deleteAllResult);