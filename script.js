const rockBtn = document.querySelector('.rock-btn');
const scissorsBtn = document.querySelector('.scissors-btn');
const paperBtn = document.querySelector('.paper-btn');
const computerChoice = document.querySelector('.computer-choice');
const userChoice = document.querySelector('.user-choice');
const result = document.querySelector('.result');
const ul = document.querySelector('ul');
const allDeleteBtn = document.querySelector('.all-delete-btn');
const userScoreBoard=document.querySelector('.user-score');
const computerScoreBoard=document.querySelector('.computer-score');

//..
//..


let gameRecord = [];
let userScore = 0;
let computerScore = 0;

/*기록 삭제*/
const deleteResult = (deleteId) => {
	//...
  //find를 이용하여 gameRecord배열 중에 지우고자 하는 배열 요소를 지정.
  let score=gameRecord.find(item=>item.id===deleteId);
  //출력값 확인
  console.log(score);
  //찾고자 하는 요소가 존재시
  if(score)
  {
    //배열의 요소의 key값인 메세지 중 value가 '이겼다'을 포함시
    if(score.message.includes("이겼다!")){
      //userScore값이 0아래, 즉 음수가 되지 않도록 Max함수 설정 시 0과 비교
      userScore=Math.max(0,userScore-1);
    }
    //배열의 요소의 key값인 메세지 중 value가 '졌다'를 포함시
    else if(score.message.includes("졌다!")){
      //computerscore값이 0아래, 즉 음수가 되지 않도록 Max함수 설정 시 0과 비교
      computerScore=Math.max(0,computerScore-1);
    }
  }
  //배열 재선언.
  gameRecord=gameRecord.filter(item=>item.id!==deleteId);
  //화면상으로 바로 적용되도록 업데이트
  updateRecord();
  updateScore();
}

/*기록 전체 삭제*/
const deleteAllResult = () => {
	//...
  gameRecord=[];
  userScore=0;
  computerScore=0;
  updateRecord();
  updateScore();
}

/*점수 업데이트*/
const updateScore = () => {
	//...
  //보드판 점수기록 업데이트
  userScoreBoard.innerText=userScore;
  computerScoreBoard.innerText=computerScore;
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

    //기록보드판에 가위바위보 기록 표시 
    li.innerText=item.message;
    deleteBtn.classList.add('custom-delete-btn'); 

    //..
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
  //유저 컴퓨터 가위바위보 결과 화면에 보여주기
  userChoice.innerText=user;
  computerChoice.innerText=computer;
  result.innerText=resultMsg;

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
//모두 삭제 버튼 설정
allDeleteBtn.addEventListener('click', deleteAllResult);
//..