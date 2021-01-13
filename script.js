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
