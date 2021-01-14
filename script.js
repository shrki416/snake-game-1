const canvas = document.getElementById('gameCanvas');
const canvasContext = canvas.getContext('2d');

let isArrowPressed = false;
document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

function keyDownHandler(e) {
	const inputArrowKey = e.key.toLowerCase();
	validateDirectionInput(inputArrowKey);
}
function keyUpHandler() {
	isArrowPressed = false;
}

function validateDirectionInput(inputDirection) {
	const horizontalDirection = [ 'arrowleft', 'arrowright' ];
	const verticalDirection = [ 'arrowup', 'arrowdown' ];
	const availableSnakeDirections = verticalDirection.includes(snake.direction)
		? horizontalDirection
		: verticalDirection;
	if (!horizontalDirection.includes(inputDirection) && !verticalDirection.includes(inputDirection)) {
		return;
	}
	const isValidFirstMove = snake.direction === '' && 'arrowleft' != inputDirection ? true : false;
	if (!isArrowPressed && isValidFirstMove) {
		isArrowPressed = true;
		snake.direction = inputDirection;
	}
	const isValidSnakeDirection = availableSnakeDirections.includes(inputDirection) ? true : false;
	if (!isArrowPressed && isValidSnakeDirection) {
		isArrowPressed = true;
		snake.direction = inputDirection;
	}
}

const snake = {
	bodyCoordinates: [ [ 80, 200 ] ],
	direction: '',
	stepSize: 10,
	bodySize: 10,
	length: 5
};

for (let i = 1; i < snake.length; i++) {
	snake.bodyCoordinates.push([ snake.bodyCoordinates[0][0] - i * snake.bodySize, snake.bodyCoordinates[0][1] ]);
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

const apple = {
	coordinates: randomAppleCoordinates(),
	radius: 7
};
function drawApple() {
	canvasContext.beginPath();
	canvasContext.fillStyle = 'tomato';
	canvasContext.arc(
		apple.coordinates[0] + snake.bodySize / 2,
		apple.coordinates[1] + snake.bodySize / 2,
		apple.radius,
		0,
		Math.PI * 2
	);
	canvasContext.fill();
	canvasContext.closePath();
}

function moveApple() {
	apple.coordinates = randomAppleCoordinates();
}

function updateScore() {
	const scorePlaceHolder = document.querySelector('#score-display');
	let scoreValue = parseInt(document.querySelector('#score-display').textContent);
	scorePlaceHolder.textContent = scoreValue += 1;
}

function moveSnake(arrowDirection) {
	const snakeMoves = {
		arrowright: [ snake.bodyCoordinates[0][0] + snake.stepSize, snake.bodyCoordinates[0][1] ],
		arrowleft: [ snake.bodyCoordinates[0][0] - snake.stepSize, snake.bodyCoordinates[0][1] ],
		arrowup: [ snake.bodyCoordinates[0][0], snake.bodyCoordinates[0][1] - snake.stepSize ],
		arrowdown: [ snake.bodyCoordinates[0][0], snake.bodyCoordinates[0][1] + snake.stepSize ]
	};

	arrowDirection ? snake.bodyCoordinates.unshift(snakeMoves[arrowDirection]) : null;
}

function snakeEatsApple() {
	const isAppleEatten =
		snake.bodyCoordinates[0][0] == apple.coordinates[0] && snake.bodyCoordinates[0][1] === apple.coordinates[1];
	if (isAppleEatten) {
		moveApple();
		updateScore();
		snake.length += 1;
	}
}

function endGame() {
	let isGameOver = false;
	const isTouchingTopEdge = Boolean(snake.bodyCoordinates[0][1] <= -10);
	const isTouchingBottomEdge = Boolean(snake.bodyCoordinates[0][1] >= 400);
	const isTouchingLeftEdge = Boolean(snake.bodyCoordinates[0][0] <= -10);
	const isTouchingRightEdge = Boolean(snake.bodyCoordinates[0][0] >= 400);
	const isTouchingEdge = ![ isTouchingTopEdge, isTouchingBottomEdge, isTouchingRightEdge, isTouchingLeftEdge ].every(
		(edgeCondition) => edgeCondition === false
	);
	if (isTouchingEdge) {
		isGameOver = true;
	}

	for (let i = 1; i < snake.length; i++) {
		const isSnakeTouchingSelf = Boolean(
			snake.bodyCoordinates[i][0] === snake.bodyCoordinates[0][0] &&
				snake.bodyCoordinates[i][1] === snake.bodyCoordinates[0][1]
		);
		if (isSnakeTouchingSelf) {
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
	moveSnake(snake.direction);
	snakeEatsApple();
	drawSnake();
	endGame();
}

const framesPerSecond = 100;
const snakeGamePlay = setInterval(snakeGame, framesPerSecond);
