let canvas = document.getElementById('gameCanvas');
let canvasContext = canvas.getContext('2d');
let canvasWidth = 400;
let canvasHeight = 400;
let framesPerSecond = 1000 / 10;
let snakeXOrigin = 50;
let snakeYOrigin = 100;
let appleXCoordinate = Math.floor(Math.random() * 381) + 10;
let appleYCoordinate = Math.floor(Math.random() * 381) + 10;
let snakeHeadOrigin = [ snakeXOrigin, snakeYOrigin ];

setInterval(function() {
	canvasContext.clearRect(0, 0, canvas.width, canvas.height);

	drawSnakeChain(4);
	// moveSnake();
	moveSnakeHead();

	placeApple();
}, framesPerSecond);

function drawSnakeChain(snakeBodyLength) {
	canvasContext.beginPath();
	canvasContext.rect(snakeXOrigin, snakeYOrigin, 10, 10);
	// for (let i = 1; i <= snakeBodyLength; i++) {
	// 	canvasContext.rect(snakeHeadOrigin[0] - 11 * i, snakeHeadOrigin[1], 10, 10);
	// }
	canvasContext.fillStyle = 'red';
	canvasContext.fill();
	canvasContext.closePath();
}

function moveSnake() {
	snakeHeadOrigin[0] += 10;
}

//KeyEvent Handler
let leftArrowPressed = false;
let rightArrowPressed = false;
let upArrowPressed = false;
let downArrowPressed = false;

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

function keyDownHandler(e) {
	if (e.key == 'Right' || e.key == 'ArrowRight') {
		rightArrowPressed = true;
	}
	if (e.key == 'Left' || e.key == 'ArrowLeft') {
		leftArrowPressed = true;
	}
	if (e.key == 'Up' || e.key == 'ArrowUp') {
		upArrowPressed = true;
	}
	if (e.key == 'Down' || e.key == 'ArrowDown') {
		downArrowPressed = true;
	}
}

function keyUpHandler(e) {
	if (e.key == 'Right' || e.key == 'ArrowRight') {
		rightArrowPressed = false;
	}
	if (e.key == 'Left' || e.key == 'ArrowLeft') {
		leftArrowPressed = false;
	}
	if (e.key == 'Up' || e.key == 'ArrowUp') {
		upArrowPressed = false;
	}
	if (e.key == 'Down' || e.key == 'ArrowDown') {
		downArrowPressed = false;
	}
}

function moveSnakeHead() {
	if (rightArrowPressed) {
		snakeXOrigin += 10;
	}
	if (leftArrowPressed) {
		snakeXOrigin -= 10;
	}
	if (upArrowPressed) {
		snakeYOrigin -= 10;
	}
	if (downArrowPressed) {
		snakeYOrigin += 10;
	}
}

function placeApple() {
	//apple
	canvasContext.beginPath();
	canvasContext.fillStyle = 'green';
	canvasContext.arc(appleXCoordinate, appleYCoordinate, 7, 0, Math.PI * 2, false);
	canvasContext.fill();
	canvasContext.closePath();
}
