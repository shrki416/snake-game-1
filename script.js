let canvas = document.getElementById('gameCanvas');
let canvasContext = canvas.getContext('2d');
let framesPerSecond = 1000 / 10;

let snakeBodyCoordinates = [ [ 50, 200 ], [ 40, 200 ], [ 30, 200 ], [ 20, 200 ] ];
let currentSnakeDirection = 'right';

setInterval(function() {
	canvasContext.clearRect(0, 0, canvas.width, canvas.height);
	drawApple();
	drawSnakeChain();
	changeSnakeDirection();
	//moveSnake();
	if (snakeBodyCoordinates[0][0] === appleXCoordinate && snakeBodyCoordinates[0][1] === appleYCoordinate) {
		moveApple();
	}
}, framesPerSecond);

function drawSnakeChain() {
	canvasContext.beginPath();
	snakeBodyCoordinates.forEach((coordinate) => {
		canvasContext.rect(coordinate[0] - 4.5, coordinate[1] - 4.5, 9, 9);
	});
	canvasContext.fillStyle = 'red';
	canvasContext.fill();
	canvasContext.closePath();
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

function changeSnakeDirection() {
	if (rightArrowPressed) {
		snakeBodyCoordinates.unshift([ snakeBodyCoordinates[0][0] + 10, snakeBodyCoordinates[0][1] ]);
		snakeBodyCoordinates.pop();
		currentSnakeDirection = 'right';
		console.log(snakeBodyCoordinates);
	}
	if (leftArrowPressed) {
		snakeBodyCoordinates.unshift([ snakeBodyCoordinates[0][0] - 10, snakeBodyCoordinates[0][1] ]);
		snakeBodyCoordinates.pop();
		currentSnakeDirection = 'left';

		console.log(snakeBodyCoordinates);
	}
	if (upArrowPressed) {
		snakeBodyCoordinates.unshift([ snakeBodyCoordinates[0][0], snakeBodyCoordinates[0][1] - 10 ]);
		snakeBodyCoordinates.pop();
		currentSnakeDirection = 'up';
		console.log(snakeBodyCoordinates);
	}
	if (downArrowPressed) {
		snakeBodyCoordinates.unshift([ snakeBodyCoordinates[0][0], snakeBodyCoordinates[0][1] + 10 ]);
		snakeBodyCoordinates.pop();
		currentSnakeDirection = 'down';
		console.log(snakeBodyCoordinates);
	}
}

function moveSnake() {
	if (currentSnakeDirection === 'right') {
		snakeBodyCoordinates.unshift([ snakeBodyCoordinates[0][0] + 10, snakeBodyCoordinates[0][1] ]);
		snakeBodyCoordinates.pop();
	}
	if (currentSnakeDirection === 'left') {
		snakeBodyCoordinates.unshift([ snakeBodyCoordinates[0][0] - 10, snakeBodyCoordinates[0][1] ]);
		snakeBodyCoordinates.pop();
	}
	if (currentSnakeDirection === 'up') {
		snakeBodyCoordinates.unshift([ snakeBodyCoordinates[0][0], snakeBodyCoordinates[0][1] - 10 ]);
		snakeBodyCoordinates.pop();
	}
	if (currentSnakeDirection === 'down') {
		snakeBodyCoordinates.unshift([ snakeBodyCoordinates[0][0], snakeBodyCoordinates[0][1] + 10 ]);
		snakeBodyCoordinates.pop();
	}
}

let appleXCoordinate = (Math.floor(Math.random() * 38) + 1) * 10;
let appleYCoordinate = (Math.floor(Math.random() * 38) + 1) * 10;
function drawApple() {
	//drawApple
	canvasContext.beginPath();
	canvasContext.fillStyle = 'green';
	canvasContext.arc(appleXCoordinate, appleYCoordinate, 7, 0, Math.PI * 2, false);
	canvasContext.fill();
	canvasContext.closePath();
}

function moveApple() {
	console.log('Snake ate the Apple!');
	appleXCoordinate = (Math.floor(Math.random() * 38) + 1) * 10;
	appleYCoordinate = (Math.floor(Math.random() * 38) + 1) * 10;
}
