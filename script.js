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
	placeApple();
}, framesPerSecond);

function drawSnakeChain(snakeBodyLength) {
	canvasContext.beginPath();
	canvasContext.rect(snakeHeadOrigin[0], snakeHeadOrigin[1], 10, 10);
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

function directSnakeMovement() {}

function placeApple() {
	//apple
	canvasContext.beginPath();
	canvasContext.fillStyle = 'green';
	canvasContext.arc(appleXCoordinate, appleYCoordinate, 7, 0, Math.PI * 2, false);
	canvasContext.fill();
	canvasContext.closePath();
}
