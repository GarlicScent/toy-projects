const scoreSpan = document.querySelector("#score");
const resetBtn = document.querySelector("#reset");
const selectBox = document.querySelector("#selectBox");
const yourImage = document.querySelector("#you img");
const comImage = document.querySelector("#computer img");

const scoreObj = {
	you: 0,
	computer: 0,
};
const paintScore = () => {
	scoreSpan.textContent = `${scoreObj.you} : ${scoreObj.computer}`;
};
//1. reset button 누르면 점수 초기화 (localstorage 사용하여 저장)
resetBtn.addEventListener("click", () => {
	scoreObj.you = 0;
	scoreObj.computer = 0;
	yourImage.style.display = "none";
	comImage.style.display = "none";
	// localstorage 초기화도 함께 해준다.
	paintScore();
});

//2. button click eventlistener. 이기면 모달로 승리, 패배, 무승부.
//+ localstorage.setItem으로 설정하기.
const modalPaint = () => {
	console.log("adf");
};
//2-1. 유저 클릭한 btn 으로 이미지 업데이트
const paintMainContent = (target, value) => {
	target = target === "client" ? yourImage : comImage;
	target.style.display = "inline";
	if (value) {
		target.src = value === 1 ? "./scissor.jpg" : "./paper.jpeg";
		target.style.transform = "rotate(25deg)";
	} else {
		target.src = "./rock.jpeg";
	}
};
//게임 승부 판별하기
//2-2. 컴퓨터 랜덤 결과로 게임 결과 판단.
const handleGame = (clientValue) => {
	clientValue = parseInt(clientValue);
	const computerResult = Math.floor(Math.random() * 3);
	const winCase = clientValue + 1 !== 3 ? clientValue + 1 : false;

	const draw = clientValue === computerResult;

	if (winCase && winCase === computerResult) {
		scoreObj.you = scoreObj.you + 1;
	} else if (draw) {
		console.log("draw~");
	} else {
		scoreObj.computer = scoreObj.computer + 1;
	}

	paintMainContent("client", clientValue);
	paintMainContent("computer", computerResult);
	paintScore();
};

const getGameValue = (e) => {
	setTimeout(() => {
		handleGame(e.target.dataset.value);
	}, 700);
};

for (let i = 0; i < selectBox.children.length; i++) {
	selectBox.children[i].addEventListener("click", getGameValue);
}

//3. score update with localstorage.
