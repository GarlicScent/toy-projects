const scoreSpan = document.querySelector("#score");
const resetBtn = document.querySelector("#reset");
const btnImage = document.querySelectorAll(".btnImage");
const yourImage = document.querySelector("#you img");
const comImage = document.querySelector("#computer img");
const modal = document.querySelector("#modal");

const scoreObj =
	localStorage.getItem("scoreObj") === null
		? { you: 0, computer: 0 }
		: JSON.parse(localStorage.getItem("scoreObj"));

const paintScore = () => {
	scoreSpan.textContent = `${scoreObj.you} : ${scoreObj.computer}`;
};
paintScore();

const initMainContentImg = () => {
	yourImage.src = "images/questionMark.png";
	comImage.src = "images/questionMark2.png";
	yourImage.style.transform = "none";
	comImage.style.transform = "none";
};

//1. reset button 누르면 점수 초기화 (localstorage 사용하여 저장)
resetBtn.addEventListener("click", () => {
	scoreObj.you = 0;
	scoreObj.computer = 0;
	initMainContentImg();
	localStorage.removeItem("scoreObj");
	paintScore();
});

//2. button click eventlistener. 이기면 모달로 승리, 패배, 무승부.
//+ localstorage.setItem으로 설정하기.
const modalPaint = (gameText) => {
	modal.classList.toggle("show");
	if (typeof gameText === "string") {
		modal.querySelector("h1").textContent = gameText;
	} else {
		setTimeout(() => {
			initMainContentImg();
		}, 250);
	}
};
//2-1. 유저 클릭한 btn 으로 이미지 업데이트
//animation .animateImg가 처음에만 적용된다. -> 해결해야해!! 뭐야 왜그런거야~~??!
const paintMainContent = (target, value) => {
	const targetEl = target === "client" ? yourImage : comImage;
	targetEl.style.display = "inline";
	targetEl.classList.remove("animateImg");
	if (value !== undefined) {
		targetEl.src =
			value === 0
				? "images/rock.jpeg"
				: value === 2
				? "images/paper.jpeg"
				: "images/scissor.jpg";
		targetEl.style.transform = "rotate(25deg)";
		targetEl.classList.add("animateImg");
	}
};
//게임 승부 판별하기
//2-2. 컴퓨터 랜덤 결과로 게임 결과 판단. 0: 묵, 1: 찌, 2: 빠
const handleGame = (clientValue) => {
	clientValue = parseInt(clientValue);
	const computerResult = Math.floor(Math.random() * 3);
	const winCase = (clientValue + 1) % 3;

	const draw = clientValue === computerResult;

	if (winCase === computerResult) {
		scoreObj.you = scoreObj.you + 1;
		modalPaint("승리하다!");
	} else if (draw) {
		modalPaint("비겼다!");
	} else {
		scoreObj.computer = scoreObj.computer + 1;
		modalPaint("패배하다!");
	}

	paintMainContent("client", clientValue);
	paintMainContent("computer", computerResult);
	paintScore();

	localStorage.setItem("scoreObj", JSON.stringify(scoreObj));
};

const getGameValue = (e) => {
	handleGame(e.target.dataset.value);
};

const debounce = (callback, delay) => {
	let timerId;

	return (e) => {
		if (timerId) clearTimeout(timerId);
		timerId = setTimeout(callback, delay, e);
	};
};

btnImage.forEach((btn) =>
	btn.addEventListener("click", debounce(getGameValue, 300))
);
