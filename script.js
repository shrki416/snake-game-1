let canvas = document.getElementById('gameCanvas');
let canvasContext = canvas.getContext('2d');
let canvasWidth = 400;
let canvasHeight = 400;
let framesPerSecond = 1000 / 10;
let snakeXCoordinate = 50;
let snakeYCoordinate = 10;
let appleXCoordinate = Math.floor(Math.random() * 381) + 10;
let appleYCoordinate = Math.floor(Math.random() * 381) + 10;

setInterval(function() {
	moveSnake();
	placeApple();
}, framesPerSecond);

function moveSnake() {
	//snake
	canvasContext.clearRect(0, 0, canvas.clientWidth, canvas.height);
	canvasContext.beginPath();
	canvasContext.fillStyle = 'red';
	canvasContext.fillRect(snakeXCoordinate, 100, 50, 10);
	canvasContext.fill();
	canvasContext.closePath();
	snakeXCoordinate += 10;
}

function placeApple() {
	//apple

	canvasContext.beginPath();
	canvasContext.fillStyle = 'green';
	canvasContext.arc(appleXCoordinate, appleYCoordinate, 10, 0, Math.PI * 2, false);
	canvasContext.fill();
	canvasContext.closePath();
}
