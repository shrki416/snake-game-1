// const canvas = document.getElementById('gameCanvas');
// const canvasContext = canvas.getContext('2d');
// const framesPerSecond = 10;
// let snakeBodyCoordinates = [ [ 50, 200 ], [ 40, 200 ], [ 30, 200 ], [ 20, 200 ] ];
// let currentSnakeDirection = '';

// //KeyEvent Handler
// let isKeyPressed = false;
// let leftArrowPressed = false;
// let rightArrowPressed = false;
// let upArrowPressed = false;
// let downArrowPressed = false;

// document.addEventListener('keydown', keyDownHandler, false);
// document.addEventListener('keyup', keyUpHandler, false);

// function keyDownHandler(e) {
// 	if (!isKeyPressed) {
// 		if (e.key == 'Right' || e.key == 'ArrowRight') {
// 			rightArrowPressed = true;
// 		}
// 		if (e.key == 'Left' || e.key == 'ArrowLeft') {
// 			leftArrowPressed = true;
// 		}
// 		if (e.key == 'Up' || e.key == 'ArrowUp') {
// 			upArrowPressed = true;
// 		}
// 		if (e.key == 'Down' || e.key == 'ArrowDown') {
// 			downArrowPressed = true;
// 		}
// 	}
// }

// function keyUpHandler(e) {
// 	if (e.key == 'Right' || e.key == 'ArrowRight') {
// 		rightArrowPressed = false;
// 	}
// 	if (e.key == 'Left' || e.key == 'ArrowLeft') {
// 		leftArrowPressed = false;
// 	}
// 	if (e.key == 'Up' || e.key == 'ArrowUp') {
// 		upArrowPressed = false;
// 	}
// 	if (e.key == 'Down' || e.key == 'ArrowDown') {
// 		downArrowPressed = false;
// 	}
// 	isKeyPressed = false;
// }

// function drawSnakeChain() {
// 	canvasContext.beginPath();
// 	snakeBodyCoordinates.forEach((coordinate) => {
// 		canvasContext.rect(coordinate[0], coordinate[1], 9, 9);
// 	});
// 	canvasContext.fillStyle = 'red';
// 	canvasContext.fill();
// 	canvasContext.closePath();
// }

// function changeSnakeDirection() {
// 	if (rightArrowPressed && currentSnakeDirection != 'right' && currentSnakeDirection != 'left') {
// 		// if (rightArrowPressed) {
// 		snakeBodyCoordinates.unshift([ snakeBodyCoordinates[0][0] + snakeStepSize, snakeBodyCoordinates[0][1] ]);
// 		snakeBodyCoordinates.pop();
// 		currentSnakeDirection = 'right';
// 		console.log(snakeBodyCoordinates);
// 		isKeyPressed = true;
// 		rightArrowPressed = false;
// 	}
// 	if (leftArrowPressed && currentSnakeDirection != 'right' && currentSnakeDirection != 'left') {
// 		// if (leftArrowPressed) {
// 		snakeBodyCoordinates.unshift([ snakeBodyCoordinates[0][0] - snakeStepSize, snakeBodyCoordinates[0][1] ]);
// 		snakeBodyCoordinates.pop();
// 		currentSnakeDirection = 'left';

// 		console.log(snakeBodyCoordinates);
// 		isKeyPressed = true;
// 		leftArrowPressed = false;
// 	}
// 	if (upArrowPressed && currentSnakeDirection != 'up' && currentSnakeDirection != 'down') {
// 		// if (upArrowPressed) {
// 		snakeBodyCoordinates.unshift([ snakeBodyCoordinates[0][0], snakeBodyCoordinates[0][1] - snakeStepSize ]);
// 		snakeBodyCoordinates.pop();
// 		currentSnakeDirection = 'up';
// 		console.log(snakeBodyCoordinates);
// 		isKeyPressed = true;
// 		upArrowPressed = false;
// 	}
// 	if (downArrowPressed && currentSnakeDirection != 'up' && currentSnakeDirection != 'down') {
// 		// if (downArrowPressed) {
// 		snakeBodyCoordinates.unshift([ snakeBodyCoordinates[0][0], snakeBodyCoordinates[0][1] + snakeStepSize ]);
// 		snakeBodyCoordinates.pop();
// 		currentSnakeDirection = 'down';
// 		console.log(snakeBodyCoordinates);
// 		isKeyPressed = true;
// 		downArrowPressed = false;
// 	}
// }

// let snakeMoveTimer = 1;
// let snakeMoveFrequency = 10;
// let snakeStepSize = 10;

// function moveSnake() {
// 	if (currentSnakeDirection === 'right') {
// 		snakeMoveTimer += 1;
// 		if (snakeMoveTimer === snakeMoveFrequency) {
// 			snakeBodyCoordinates.unshift([ snakeBodyCoordinates[0][0] + snakeStepSize, snakeBodyCoordinates[0][1] ]);
// 			snakeBodyCoordinates.pop();
// 			snakeMoveTimer = 1;
// 		}
// 	}
// 	if (currentSnakeDirection === 'left') {
// 		snakeMoveTimer += 1;
// 		if (snakeMoveTimer === snakeMoveFrequency) {
// 			snakeBodyCoordinates.unshift([ snakeBodyCoordinates[0][0] - snakeStepSize, snakeBodyCoordinates[0][1] ]);
// 			snakeBodyCoordinates.pop();
// 			snakeMoveTimer = 1;
// 		}
// 	}
// 	if (currentSnakeDirection === 'up') {
// 		snakeMoveTimer += 1;
// 		if (snakeMoveTimer === snakeMoveFrequency) {
// 			snakeBodyCoordinates.unshift([ snakeBodyCoordinates[0][0], snakeBodyCoordinates[0][1] - snakeStepSize ]);
// 			snakeBodyCoordinates.pop();
// 			snakeMoveTimer = 1;
// 		}
// 	}
// 	if (currentSnakeDirection === 'down') {
// 		snakeMoveTimer += 1;
// 		if (snakeMoveTimer === snakeMoveFrequency) {
// 			snakeBodyCoordinates.unshift([ snakeBodyCoordinates[0][0], snakeBodyCoordinates[0][1] + snakeStepSize ]);
// 			snakeBodyCoordinates.pop();
// 			snakeMoveTimer = 1;
// 		}
// 	}
// }

// let appleXCoordinate = (Math.floor(Math.random() * 38) + 1) * 10;
// let appleYCoordinate = (Math.floor(Math.random() * 38) + 1) * 10;

// function drawApple() {
// 	canvasContext.beginPath();
// 	canvasContext.fillStyle = 'green';
// 	canvasContext.arc(appleXCoordinate + 4.5, appleYCoordinate + 4.5, 7, 0, Math.PI * 2, false);
// 	canvasContext.fill();
// 	canvasContext.closePath();
// }

// function moveApple() {
// 	if (snakeBodyCoordinates[0][0] === appleXCoordinate && snakeBodyCoordinates[0][1] === appleYCoordinate) {
// 		console.log('Snake ate the Apple!');
// 		let snakeLength = snakeBodyCoordinates.length - 1;
// 		//add to snake body
// 		if (currentSnakeDirection === 'right' || currentSnakeDirection === 'left')
// 			snakeBodyCoordinates.push([ snakeBodyCoordinates[0][0] - 10, snakeBodyCoordinates[0][1] ]);
// 		if (currentSnakeDirection === 'up' || currentSnakeDirection === 'down')
// 			snakeBodyCoordinates.push([ snakeBodyCoordinates[0][0], snakeBodyCoordinates[0][1] - 10 ]);

// 		appleXCoordinate = (Math.floor(Math.random() * 38) + 1) * 10;
// 		appleYCoordinate = (Math.floor(Math.random() * 38) + 1) * 10;
// 		//spple coordinate same as snake body coordinate
// 		snakeBodyCoordinates.forEach((coordinate) => {
// 			if (coordinate[0] === appleXCoordinate && coordinate[1] === appleYCoordinate) {
// 				appleXCoordinate = (Math.floor(Math.random() * 38) + 1) * 10;
// 				appleYCoordinate = (Math.floor(Math.random() * 38) + 1) * 10;
// 			}
// 		});
// 		updateScore();
// 	}
// }

// function updateScore() {
// 	let scorePlaceHolder = document.querySelector('#score-display');
// 	let scoreValue = parseInt(document.querySelector('#score-display').textContent);
// 	// if (snakeBodyCoordinates[0][0] === appleXCoordinate && snakeBodyCoordinates[0][1] === appleYCoordinate) {
// 	scorePlaceHolder.textContent = scoreValue += 1;
// 	console.log(scoreValue);
// 	// }
// }

// function draw() {
// 	canvasContext.clearRect(0, 0, canvas.width, canvas.height);
// 	drawApple();
// 	moveSnake();
// 	drawSnakeChain();
// 	changeSnakeDirection();
// 	moveApple();
// 	snakeEdgeDetection();
// }

// //edge detection

// // if snake head y + snakestep size < 0 stop game
// function snakeEdgeDetection() {
// 	//touch top edge
// 	if (snakeBodyCoordinates[0][1] - snakeStepSize < -10) {
// 		console.log('Touched top edge!');
// 		console.log(snakeBodyCoordinates);
// 		clearInterval(snakeGamePlay);
// 		document.querySelector('#game-over').style.visibility = 'visible';
// 	}
// 	//touch bottom edge
// 	if (snakeBodyCoordinates[0][1] + snakeStepSize > 400) {
// 		console.log('Touched bottom edge!');
// 		console.log(snakeBodyCoordinates);
// 		clearInterval(snakeGamePlay);
// 		document.querySelector('#game-over').style.visibility = 'visible';
// 	}
// 	//touch right edge
// 	if (snakeBodyCoordinates[0][0] + snakeStepSize > 400) {
// 		console.log('Touched right edge!');
// 		console.log(snakeBodyCoordinates);
// 		clearInterval(snakeGamePlay);
// 		document.querySelector('#game-over').style.visibility = 'visible';
// 	}
// 	//touch left edge
// 	if (snakeBodyCoordinates[0][0] - snakeStepSize < -10) {
// 		console.log('Touched left edge!');
// 		console.log(snakeBodyCoordinates);
// 		clearInterval(snakeGamePlay);
// 		document.querySelector('#game-over').style.visibility = 'visible';
// 	}
// 	//touch snake body
// 	snakeBodyCoordinates.slice(1).forEach((coordinate) => {
// 		if (coordinate[0] === snakeBodyCoordinates[0][0] && coordinate[1] === snakeBodyCoordinates[0][1]) {
// 			console.log('Snake touched itself');
// 			console.log(snakeBodyCoordinates);
// 			clearInterval(snakeGamePlay);
// 			document.querySelector('#game-over').style.visibility = 'visible';
// 		}
// 	});
// }

// let snakeGamePlay = setInterval(draw, framesPerSecond);

const canvas = document.getElementById('gameCanvas');
const canvasContext = canvas.getContext('2d');

let isArrowPressed = false;
document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

function keyDownHandler(e) {
	const inputArrowKey = e.key.toLowerCase();
	validateDirection(inputArrowKey);
}
function keyUpHandler() {
	isArrowPressed = false;
}

function validateDirection(inputArrowKey) {
	const horizontalDirection = [ 'arrowleft', 'left', 'arrowright', 'right' ];
	const verticalDirection = [ 'arrowup', 'up', 'arrowdown', 'down' ];
	const availableSnakeDirections = verticalDirection.includes(snake.direction)
		? horizontalDirection
		: verticalDirection;
	const isValidSnakeDirection = availableSnakeDirections.includes(inputArrowKey) ? true : false;
	const isValidFirstMove =
		snake.direction === '' && !horizontalDirection.slice(0, 2).includes(inputArrowKey) ? true : false;
	if (!isArrowPressed && isValidFirstMove) {
		isArrowPressed = true;
		snake.direction = inputArrowKey;
		console.log(snake.direction);
	}
	if (!isArrowPressed && isValidSnakeDirection) {
		isArrowPressed = true;
		snake.direction = inputArrowKey;
		console.log(snake.direction);
	}
}

const snake = {
	bodyCoordinates: [ [ 80, 200 ] ],
	direction: '',
	stepSize: 10,
	bodySize: 10,
	length: 5
};

for (let i = 1; i <= snake.length; i++) {
	snake.bodyCoordinates.push([ snake.bodyCoordinates[0][0] - i * 10, snake.bodyCoordinates[0][1] ]);
}

function drawSnake() {
	canvasContext.beginPath();
	snake.bodyCoordinates = [ ...snake.bodyCoordinates.slice(0, snake.length) ];
	snake.bodyCoordinates.forEach((coordinate) => {
		canvasContext.rect(coordinate[0], coordinate[1], snake.bodySize, snake.bodySize);
	});
	canvasContext.fillStyle = '#76b852';
	canvasContext.fill();
	canvasContext.closePath();
}

function randomAppleCoordinates() {
	let isEmptyCoordinate = false;
	let appleCoordinates = [];
	do {
		appleCoordinates = [ Math.floor(Math.random() * 40) * 10, Math.floor(Math.random() * 40) * 10 ];
		for (let i = 0; i < snake.length; i++) {
			if (
				snake.bodyCoordinates[i][0] === appleCoordinates[0] &&
				snake.bodyCoordinates[i][1] === appleCoordinates[1]
			) {
				isEmptyCoordinate = false;
				break;
			} else {
				isEmptyCoordinate = true;
			}
		}
	} while (!isEmptyCoordinate);

	return appleCoordinates;
}

let appleCoordinates = randomAppleCoordinates();
function drawApple() {
	canvasContext.beginPath();
	canvasContext.fillStyle = 'tomato';
	canvasContext.arc(
		appleCoordinates[0] + snake.bodySize / 2,
		appleCoordinates[1] + snake.bodySize / 2,
		7,
		0,
		Math.PI * 2,
		false
	);
	canvasContext.fill();
	canvasContext.closePath();
}

function moveApple() {
	appleCoordinates = randomAppleCoordinates();
}

function updateScore() {
	const scorePlaceHolder = document.querySelector('#score-display');
	let scoreValue = parseInt(document.querySelector('#score-display').textContent);
	scorePlaceHolder.textContent = scoreValue += 1;
}

function moveSnake() {
	if (snake.direction === 'arrowright' || snake.direction === 'right') {
		snake.bodyCoordinates.unshift([ snake.bodyCoordinates[0][0] + snake.stepSize, snake.bodyCoordinates[0][1] ]);
	}
	if (snake.direction === 'arrowleft' || snake.direction === 'left') {
		snake.bodyCoordinates.unshift([ snake.bodyCoordinates[0][0] - snake.stepSize, snake.bodyCoordinates[0][1] ]);
	}
	if (snake.direction === 'arrowup' || snake.direction === 'up') {
		snake.bodyCoordinates.unshift([ snake.bodyCoordinates[0][0], snake.bodyCoordinates[0][1] - snake.stepSize ]);
	}
	if (snake.direction === 'arrowdown' || snake.direction === 'down') {
		snake.bodyCoordinates.unshift([ snake.bodyCoordinates[0][0], snake.bodyCoordinates[0][1] + snake.stepSize ]);
	}
}

function snakeEatsApple() {
	if (snake.bodyCoordinates[0][0] == appleCoordinates[0] && snake.bodyCoordinates[0][1] === appleCoordinates[1]) {
		moveApple();
		updateScore();
		snake.length += 1;
	}
}

function endGame() {
	let isGameOver = false;
	//touch top edge
	if (snake.bodyCoordinates[0][1] <= -10) {
		console.log('Touched top edge!');
		isGameOver = true;
	}
	// 	//touch bottom edge
	if (snake.bodyCoordinates[0][1] >= 400) {
		console.log('Touched bottom edge!');
		isGameOver = true;
	}
	// 	//touch right edge
	if (snake.bodyCoordinates[0][0] >= 400) {
		console.log('Touched right edge!');
		isGameOver = true;
	}
	// 	//touch left edge
	if (snake.bodyCoordinates[0][0] <= -10) {
		console.log('Touched left edge!');
		isGameOver = true;
	}
	// 	//touch snake body
	for (let i = 1; i < snake.length; i++) {
		if (
			snake.bodyCoordinates[i][0] === snake.bodyCoordinates[0][0] &&
			snake.bodyCoordinates[i][1] === snake.bodyCoordinates[0][1]
		) {
			console.log('Snake touched itself');
			isGameOver = true;
			break;
		}
	}

	if (isGameOver) {
		clearInterval(snakeGamePlay);
		document.querySelector('#game-over').style.visibility = 'visible';
	}
}
function snakeGame() {
	canvasContext.clearRect(0, 0, canvas.width, canvas.height);
	drawApple();
	moveSnake();
	snakeEatsApple();
	drawSnake();
	endGame();
}

const framesPerSecond = 1000 / 10;
const snakeGamePlay = setInterval(snakeGame, framesPerSecond);
