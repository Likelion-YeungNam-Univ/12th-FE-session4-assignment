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

/*기록 삭제*/
const deleteResult = (deleteId, e, item) => {

	// 해당요소 html에서 제거
  const clickBtn = e.target;  // 버튼 클릭 이벤트를 이용해서 해당 li요소 제거
  const parentElement = clickBtn.parentNode
  ul.removeChild(parentElement);  // 삭제버튼이 포함된 부모요소(li)삭제

  // 삭제할 id와 일치하는 요소를 빼고 새로운 배열 생성하기
  const newRecord = gameRecord.filter(record => record.id!==deleteId);
  gameRecord=newRecord;

  // 기록 삭제 시 승자의 점수 원상복구
  switch(item.originMsg){
    case '이겼다!':
      userScore--;
      break;
    case '졌다!':
      computerScore--;
      break;
    case '비겼다!': //무승부일때는 변동x
      // return;
  }
  // 변경된 점수 업데이트
  updateScore();
}

/*기록 전체 삭제*/
const deleteAllResult = () => {
  // 배열 비우기
  gameRecord=[];

  // ul태그 비우기
  ul.innerHTML=''

  // 점수 0:0으로 reset
  userScore=0;
  computerScore=0;

  // 변경된 점수 업데이트
  updateScore();
}

/*점수 업데이트*/
const updateScore = () => {
	const userCount = document.querySelector('.user-score');
	const computerCount = document.querySelector('.computer-score');

  // 사람과 컴퓨터 점수 표시
  userCount.innerText=`${userScore}`;
  computerCount.innerText=`${computerScore}`;

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

    // 기록 리스트 업데이트
    li.innerText=item.message;

    deleteBtn.innerText = '삭제';
    deleteBtn.addEventListener('click', (e) => deleteResult(item.id, e, item));

    li.appendChild(deleteBtn);
    ul.appendChild(li);
  });
  console.log(gameRecord);
}

/*화면에 선택 사항(가위, 바위, 보) 및 결과 보여주기*/
const showResult = (user, computer, resultMsg) => {

  const result_user = document.querySelector('.user-choice');  
  const result_computer = document.querySelector('.computer-choice');  
  const result = document.querySelector('.result');  // 게임 결과

  result_user.innerText = `${user}`;
  result_computer.innerText = `${computer}`;
  result.innerText = `${resultMsg}`;

  updateScore();
}

/*배열 gameRecord에 결과 추가*/
const addResult = (msg, originMessage) => {
  // 변형하지 않은 message도 프로퍼티(originMsg)로 저장
  gameRecord = gameRecord.concat({ id: Date.now(), message: msg, originMsg : originMessage});

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
  addResult(recordMsg, message); // 원본 message 전달
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
allDeleteBtn.addEventListener('click',deleteAllResult); // 전체삭제 버튼