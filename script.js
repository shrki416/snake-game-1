const canvas = document.getElementById('gameCanvas');
const canvasContext = canvas.getContext('2d');
const framesPerSecond = 1000 / 100;
let snakeBodyCoordinates = [ [ 50, 200 ], [ 40, 200 ], [ 30, 200 ], [ 20, 200 ] ];
let currentSnakeDirection = '';

//KeyEvent Handler
let isKeyPressed = false;
let leftArrowPressed = false;
let rightArrowPressed = false;
let upArrowPressed = false;
let downArrowPressed = false;

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

function keyDownHandler(e) {
	if (!isKeyPressed) {
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
	isKeyPressed = false;
}

function drawSnakeChain() {
	canvasContext.beginPath();
	snakeBodyCoordinates.forEach((coordinate) => {
		canvasContext.rect(coordinate[0], coordinate[1], 9, 9);
	});
	canvasContext.fillStyle = 'red';
	canvasContext.fill();
	canvasContext.closePath();
}

function changeSnakeDirection() {
	if (rightArrowPressed && currentSnakeDirection != 'right' && currentSnakeDirection != 'left') {
		snakeBodyCoordinates.unshift([ snakeBodyCoordinates[0][0] + snakeStepSize, snakeBodyCoordinates[0][1] ]);
		snakeBodyCoordinates.pop();
		currentSnakeDirection = 'right';
		console.log(snakeBodyCoordinates);
		isKeyPressed = true;
		rightArrowPressed = false;
	}
	if (leftArrowPressed && currentSnakeDirection != 'right' && currentSnakeDirection != 'left') {
		snakeBodyCoordinates.unshift([ snakeBodyCoordinates[0][0] - snakeStepSize, snakeBodyCoordinates[0][1] ]);
		snakeBodyCoordinates.pop();
		currentSnakeDirection = 'left';

		console.log(snakeBodyCoordinates);
		isKeyPressed = true;
		leftArrowPressed = false;
	}
	if (upArrowPressed && currentSnakeDirection != 'up' && currentSnakeDirection != 'down') {
		snakeBodyCoordinates.unshift([ snakeBodyCoordinates[0][0], snakeBodyCoordinates[0][1] - snakeStepSize ]);
		snakeBodyCoordinates.pop();
		currentSnakeDirection = 'up';
		console.log(snakeBodyCoordinates);
		isKeyPressed = true;
		upArrowPressed = false;
	}
	if (downArrowPressed && currentSnakeDirection != 'up' && currentSnakeDirection != 'down') {
		snakeBodyCoordinates.unshift([ snakeBodyCoordinates[0][0], snakeBodyCoordinates[0][1] + snakeStepSize ]);
		snakeBodyCoordinates.pop();
		currentSnakeDirection = 'down';
		console.log(snakeBodyCoordinates);
		isKeyPressed = true;
		downArrowPressed = false;
	}
}

let snakeMoveTimer = 1;
let snakeMoveFrequency = 10;
let snakeStepSize = 10;

function moveSnake() {
	if (currentSnakeDirection === 'right') {
		snakeMoveTimer += 1;
		if (snakeMoveTimer === snakeMoveFrequency) {
			snakeBodyCoordinates.unshift([ snakeBodyCoordinates[0][0] + snakeStepSize, snakeBodyCoordinates[0][1] ]);
			snakeBodyCoordinates.pop();
			snakeMoveTimer = 1;
		}
	}
	if (currentSnakeDirection === 'left') {
		snakeMoveTimer += 1;
		if (snakeMoveTimer === snakeMoveFrequency) {
			snakeBodyCoordinates.unshift([ snakeBodyCoordinates[0][0] - snakeStepSize, snakeBodyCoordinates[0][1] ]);
			snakeBodyCoordinates.pop();
			snakeMoveTimer = 1;
		}
	}
	if (currentSnakeDirection === 'up') {
		snakeMoveTimer += 1;
		if (snakeMoveTimer === snakeMoveFrequency) {
			snakeBodyCoordinates.unshift([ snakeBodyCoordinates[0][0], snakeBodyCoordinates[0][1] - snakeStepSize ]);
			snakeBodyCoordinates.pop();
			snakeMoveTimer = 1;
		}
	}
	if (currentSnakeDirection === 'down') {
		snakeMoveTimer += 1;
		if (snakeMoveTimer === snakeMoveFrequency) {
			snakeBodyCoordinates.unshift([ snakeBodyCoordinates[0][0], snakeBodyCoordinates[0][1] + snakeStepSize ]);
			snakeBodyCoordinates.pop();
			snakeMoveTimer = 1;
		}
	}
}

let appleXCoordinate = (Math.floor(Math.random() * 38) + 1) * 10;
let appleYCoordinate = (Math.floor(Math.random() * 38) + 1) * 10;

function drawApple() {
	canvasContext.beginPath();
	canvasContext.fillStyle = 'green';
	canvasContext.arc(appleXCoordinate + 4.5, appleYCoordinate + 4.5, 7, 0, Math.PI * 2, false);
	canvasContext.fill();
	canvasContext.closePath();
}

function moveApple() {
	if (snakeBodyCoordinates[0][0] === appleXCoordinate && snakeBodyCoordinates[0][1] === appleYCoordinate) {
		console.log('Snake ate the Apple!');
		let snakeLength = snakeBodyCoordinates.length - 1;
		//add to snake body
		if (currentSnakeDirection === 'right' || currentSnakeDirection === 'left')
			snakeBodyCoordinates.push([ snakeBodyCoordinates[0][0] - 10, snakeBodyCoordinates[0][1] ]);
		if (currentSnakeDirection === 'up' || currentSnakeDirection === 'down')
			snakeBodyCoordinates.push([ snakeBodyCoordinates[0][0], snakeBodyCoordinates[0][1] - 10 ]);

		appleXCoordinate = (Math.floor(Math.random() * 38) + 1) * 10;
		appleYCoordinate = (Math.floor(Math.random() * 38) + 1) * 10;
		updateScore();
	}
}

function updateScore() {
	let scorePlaceHolder = document.querySelector('#score-display');
	let scoreValue = parseInt(document.querySelector('#score-display').textContent);
	// if (snakeBodyCoordinates[0][0] === appleXCoordinate && snakeBodyCoordinates[0][1] === appleYCoordinate) {
	scorePlaceHolder.textContent = scoreValue += 1;
	console.log(scoreValue);
	// }
}

function draw() {
	canvasContext.clearRect(0, 0, canvas.width, canvas.height);
	drawApple();
	drawSnakeChain();
	changeSnakeDirection();
	moveSnake();
	moveApple();
	snakeEdgeDetection();
}

//edge detection

// if snake head y + snakestep size < 0 stop game
function snakeEdgeDetection() {
	//touch top edge
	if (snakeBodyCoordinates[0][1] - snakeStepSize < -10) {
		console.log('Touched top edge!');
		console.log(snakeBodyCoordinates);
		clearInterval(snakeGamePlay);
	}
	//touch bottom edge
	if (snakeBodyCoordinates[0][1] + snakeStepSize > 400) {
		console.log('Touched bottom edge!');
		console.log(snakeBodyCoordinates);
		clearInterval(snakeGamePlay);
	}
	//touch right edge
	if (snakeBodyCoordinates[0][0] + snakeStepSize > 400) {
		console.log('Touched right edge!');
		console.log(snakeBodyCoordinates);
		clearInterval(snakeGamePlay);
	}
	//touch left edge
	if (snakeBodyCoordinates[0][0] - snakeStepSize < -10) {
		console.log('Touched left edge!');
		console.log(snakeBodyCoordinates);
		clearInterval(snakeGamePlay);
	}
}

let snakeGamePlay = setInterval(draw, framesPerSecond);
