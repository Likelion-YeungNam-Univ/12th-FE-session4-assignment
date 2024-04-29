const rockBtn = document.querySelector(".rock-btn");
const scissorsBtn = document.querySelector(".scissors-btn");
const paperBtn = document.querySelector(".paper-btn");
const computerChoice = document.querySelector(".computer-choice");
const userChoice = document.querySelector(".user-choice");
const result = document.querySelector(".result");
const ul = document.querySelector("ul");
const allDeleteBtn = document.querySelector(".all-delete-btn");

//  전체삭제 버튼 기능 넣기
allDeleteBtn.addEventListener("click", () => {
  deleteAllResult();
});
//..
//..

let gameRecord = []; // 게임 결과 저장 배열
let userScore = 0; // 유저 점수
let computerScore = 0; // 컴퓨터 점수

/*기록 삭제*/
const deleteResult = (deleteId) => {
  data = null; // 삭제할 msg 저장할 변수
  gameRecord = gameRecord.filter((item) => {
    if (item.id == deleteId) {
      data = item.message; // 삭제할 id와 item.id가 같으면 data에 msg저장
    }
    return item.id != deleteId;
  });

  if (data.includes("졌다")) {
    // msg에 '졌다'가 포함되어 있으면 컴퓨터점수 낮추기
    computerScore--;
  } else if (data.includes("이겼다")) {
    // msg에 '이겼다'가 포함되어 있으면 컴퓨터점수 낮추기
    userScore--;
  }
  updateRecord(); // 다시 ui에 표현
};

/*기록 전체 삭제*/
const deleteAllResult = () => {
  if (gameRecord.length == 0) {
    // 기록된 경기가 없으면 오류 발생
    alert("이미 기록이 없습니다");
    return;
  }
  gameRecord = []; // 배열 초기화
  computerScore = 0;
  userScore = 0;
  updateRecord();
};

/*점수 업데이트*/
const updateScore = () => {
  //...

  if (userScore === 3 || computerScore === 3) {
    const winnerMessage =
      userScore === 3 ? "🎉축하합니다! 이겼습니다🎉" : "컴퓨터가 이겼습니다!";
    setTimeout(() => {
      alert(winnerMessage);
      location.reload();
    }, 200);
  }
};

/*기록 업데이트*/
const updateRecord = () => {
  ul.innerHTML = "";

  gameRecord.map((item) => {
    const li = document.createElement("li");
    const deleteBtn = document.createElement("button");
    li.classList.add("custom-li");
    deleteBtn.classList.add("custom-delete-btn");

    li.innerHTML = item.message; // 기록에 메인 텍스트 저장
    deleteBtn.innerText = "삭제";

    deleteBtn.addEventListener("click", () => deleteResult(item.id));

    li.appendChild(deleteBtn);
    ul.appendChild(li);
  });
  console.log(gameRecord);
};

/*화면에 선택 사항(가위, 바위, 보) 및 결과 보여주기*/
const showResult = (user, computer, resultMsg) => {
  //...
  userChoice.innerText = user;
  computerChoice.innerText = computer;
  updateScore();
};

/*배열 gameRecord에 결과 추가*/
const addResult = (msg) => {
  gameRecord = gameRecord.concat({ id: Date.now(), message: msg });

  updateRecord();
};

const play = (user, computer) => {
  const ROCK = "바위";
  const PAPER = "보";
  const SCISSORS = "가위";
  let message;

  if (user === computer) message = "비겼다!";

  switch (user + computer) {
    case SCISSORS + PAPER:
    case ROCK + SCISSORS:
    case PAPER + ROCK:
      message = "이겼다!";
      userScore++;
      break;
    case SCISSORS + ROCK:
    case ROCK + PAPER:
    case PAPER + SCISSORS:
      message = "졌다!";
      computerScore++;
      break;
  }

  const recordMsg = `나: ${user} | 컴퓨터: ${computer} | 결과: ${message}`;
  addResult(recordMsg);
  showResult(user, computer, message);
};

const start = (e) => {
  const pick = ["가위", "바위", "보"];
  const user = e.target.innerText;
  const randomIndex = Math.floor(Math.random() * 3); // 0~2까지의 난수 생성
  const computer = pick[randomIndex]; // 컴퓨터가 내는 값 = 생성한 난수
  play(user, computer);
};

rockBtn.addEventListener("click", start);
scissorsBtn.addEventListener("click", start);
paperBtn.addEventListener("click", start);
//..
