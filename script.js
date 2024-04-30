    //각 버튼의 요소를 찾아오는 함수 정의 
    const rockBtn = document.querySelector('.rock-btn'); //가위 
    const scissorsBtn = document.querySelector('.scissors-btn'); //바위 
    const paperBtn = document.querySelector('.paper-btn'); //보자기 
    const computerChoice = document.querySelector('.computer-choice'); //컴퓨터 선택 요소
    const userChoice = document.querySelector('.user-choice'); //사용자선택 요소 
    const result = document.querySelector('.result'); //결과 나타냄 요소 
    const ul = document.querySelector('.record ul');  //기록 ul 요소 
    const allDeleteBtn = document.querySelector('.all-delete-btn'); 
    
    let gameRecord = []; //게임기록 저장 배열 선언 
    let userScore = 0; //사용자 점수 저장 변수 선언 및 0으로 초기화 
    let computerScore = 0; //컴퓨터 점수 저장 변수 선언 및 0으로 초기화 


    //구현
    const deleteResult = (deleteId) => {  //기록 삭제하는 함수 
        gameRecord = gameRecord.filter(item => item.id !== deleteId);  
        //삭제할 기록을 제외 하고 나머지 기록 필터링하기위해
        
        updateRecord(); //업데이트 된 기록, 점수 화면에 반영
        updateScore(); //기록 삭제후 점수 새로 업로드  
    }
    
    //구현
    const deleteAllResult = () => {//전체 기록 삭제 함수 
        gameRecord = []; //게임 기록 배열 초기화 
        updateRecord();  //업데이트 된 기록, 점수 화면에 반영 위와 동일 
        updateScore();   //기록 삭제후 점수 새로 업로드 위와 동일
    }
    
    //구현
    const updateScore = () => { //점수 업데이트 
        const userScoreElement = document.querySelector('.user-score');
        //사용자 점수 요소 가져오기 
        const computerScoreElement = document.querySelector('.computer-score');
        //컴퓨터 점수 요소 가져오기 
        userScoreElement.textContent = userScore;
        //사용자 점수 화면에 업데이트
        computerScoreElement.textContent = computerScore;
        //컴퓨터 점수 화면에 업데이트 

        if (userScore === 3 || computerScore === 3) {
            const winnerMessage = (userScore === 3 ? "🎉축하합니다! 이겼습니다🎉" : "컴퓨터가 이겼습니다!");
            setTimeout(() => {
                alert(winnerMessage);
                location.reload();
            }, 200);
        }
    }

    const updateRecord = () => {
        const ul = document.querySelector('.record ul');
        ul.innerHTML='';

        gameRecord.map(item => { //게임기록배열 순회 각 기록 처리 
            const li = document.createElement('li'); //li 요소 생성
            const deleteBtn = document.createElement('button'); //삭제 버튼
            li.classList.add('custom-li'); //li요ㅅ에 클래스 추가 
            deleteBtn.classList.add('custom-delete-btn'); //삭제버튼 클래스에 추가 

            //구현
            li.textContent = item.message; //li 요소의 텍스트 내용 설정 
            //끝
            deleteBtn.innerText = '삭제'; //삭제버튼 텍스트 내용 
            deleteBtn.addEventListener('click', () => deleteResult(item.id));

            li.appendChild(deleteBtn);
            ul.appendChild(li);
        });
        console.log(gameRecord);
    }

    const showResult = (user, computer, re_msg) => {  //결과 표시 함수   //re_msg => result message 를 나타내는 것임 
        //구현
        const userChoice = document.querySelector('.user-choice'); 
        //사용자 선택을 나타내는 요소 찾기
        const computerChoice = document.querySelector('.computer-choice');
        //컴퓨터 선택을 나타내는 요소 찾기 
        const result = document.querySelector('.result');
        //결과를 나타내는 요소 찾기 
        userChoice.textContent = user;
        computerChoice.textContent = computer;
        result.textContent = re_msg;
        //끝

        updateScore();
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

        const recordMsg = `나: ${user} | 컴퓨터: ${computer} | 결과: ${message}`
        addResult(recordMsg);
        showResult(user, computer, message);
    }

    const start = (e) => {
        const pick = ['가위', '바위', '보',];
        const user = e.target.innerText;
        const randomIndex = Math.floor(Math.random()*3);
        const computer = pick[randomIndex];
        play(user, computer);
    }

    rockBtn.addEventListener('click', start);
    scissorsBtn.addEventListener('click', start);
    paperBtn.addEventListener('click', start);
    allDeleteBtn.addEventListener('click', deleteAllResult); // 구현
