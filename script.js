let isArrowPressed = false;

const validateDirectionInput = (inputArrowKey) => {
	const horizontalArrows = [ 'arrowleft', 'arrowright' ];
	const verticalArrows = [ 'arrowup', 'arrowdown' ];
	const isValidFirstMove = snake.direction === '' && 'arrowleft' != inputArrowKey ? true : false;
	if (!isArrowPressed && isValidFirstMove) {
		isArrowPressed = true;
		snake.direction = inputArrowKey;
		return;
	}
	const availableSnakeDirections = verticalArrows.includes(snake.direction) ? horizontalArrows : verticalArrows;
	const isValidSnakeDirection = availableSnakeDirections.includes(inputArrowKey) ? true : false;
	if (!isArrowPressed && isValidSnakeDirection) {
		isArrowPressed = true;
		snake.direction = inputArrowKey;
	}
};

const keyDownHandler = (e) => {
	const inputKey = e.key.toLowerCase();
	const validKeyInputs = [ 'arrowleft', 'arrowright', 'arrowup', 'arrowdown' ];
	if (!validKeyInputs.includes(inputKey)) return;
	validateDirectionInput(inputKey);
};
const keyUpHandler = () => {
	isArrowPressed = false;
};
document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

const canvas = document.getElementById('gameCanvas');
const canvasContext = canvas.getContext('2d');

const snake = {
	bodyCoordinates: [ [ 80, 200 ] ],
	direction: '',
	stepSize: 10,
	bodySize: 10,
	length: 5
};

const appendInitialSnakeBodyCoordinates = (length) => {
	for (let i = 1; i < length; i++) {
		snake.bodyCoordinates.push([ snake.bodyCoordinates[0][0] - i * snake.bodySize, snake.bodyCoordinates[0][1] ]);
	}
};

appendInitialSnakeBodyCoordinates(snake.length);

const drawSnake = () => {
	canvasContext.beginPath();
	snake.bodyCoordinates = snake.bodyCoordinates.slice(0, snake.length);
	snake.bodyCoordinates.forEach((coordinate) => {
		canvasContext.rect(coordinate[0], coordinate[1], snake.bodySize, snake.bodySize);
	});
	canvasContext.fillStyle = '#76b852';
	canvasContext.fill();
	canvasContext.closePath();
};

const moveSnakeRight = () => {
	const snakeHead = snake.bodyCoordinates[0];
	return [ snakeHead[0] + snake.stepSize, snakeHead[1] ];
};

const moveSnakeLeft = () => {
	const snakeHead = snake.bodyCoordinates[0];
	return [ snakeHead[0] - snake.stepSize, snakeHead[1] ];
};

const moveSnakeUp = () => {
	const snakeHead = snake.bodyCoordinates[0];
	return [ snakeHead[0], snakeHead[1] - snake.stepSize ];
};

const moveSnakeDown = () => {
	const snakeHead = snake.bodyCoordinates[0];
	return [ snakeHead[0], snakeHead[1] + snake.stepSize ];
};

const moveSnake = (snakeDirection) => {
	const snakeMoves = {
		arrowright: moveSnakeRight(),
		arrowleft: moveSnakeLeft(),
		arrowup: moveSnakeUp(),
		arrowdown: moveSnakeDown()
	};

	snakeDirection ? snake.bodyCoordinates.unshift(snakeMoves[snakeDirection]) : null;
};

const randomAppleCoordinates = () => {
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
};

const apple = {
	coordinates: randomAppleCoordinates(),
	radius: 7
};

const drawApple = () => {
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
};

const moveApple = () => {
	apple.coordinates = randomAppleCoordinates();
};

const updateScore = () => {
	const scorePlaceHolder = document.querySelector('#score-display');
	let scoreValue = parseInt(document.querySelector('#score-display').textContent);
	scorePlaceHolder.textContent = scoreValue += 1;
};

const snakeEatsApple = () => {
	const snakeHead = snake.bodyCoordinates[0];
	const isAppleEatten = snakeHead[0] == apple.coordinates[0] && snakeHead[1] === apple.coordinates[1];
	if (isAppleEatten) {
		moveApple();
		updateScore();
		snake.length += 1;
	}
};

const isGameOver = () => {
	const snakeHead = snake.bodyCoordinates[0];
	let isGameOver = false;
	const isTouchingTopEdge = Boolean(snakeHead[1] <= -10);
	const isTouchingBottomEdge = Boolean(snakeHead[1] >= 400);
	const isTouchingLeftEdge = Boolean(snakeHead[0] <= -10);
	const isTouchingRightEdge = Boolean(snakeHead[0] >= 400);
	const isTouchingEdge = ![ isTouchingTopEdge, isTouchingBottomEdge, isTouchingRightEdge, isTouchingLeftEdge ].every(
		(edgeCondition) => edgeCondition === false
	);
	if (isTouchingEdge) {
		isGameOver = true;
	}

	for (let i = 1; i < snake.length; i++) {
		const isSnakeTouchingSelf = Boolean(
			snake.bodyCoordinates[i][0] === snakeHead[0] && snake.bodyCoordinates[i][1] === snakeHead[1]
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
};

const refreshCanvas = () => {
	canvasContext.clearRect(0, 0, canvas.width, canvas.height);
};

const snakeGame = () => {
	refreshCanvas();
	drawApple();
	moveSnake(snake.direction);
	snakeEatsApple();
	drawSnake();
	isGameOver();
};

const framesPerSecond = 100;
const snakeGamePlay = setInterval(snakeGame, framesPerSecond);
