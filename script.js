let isArrowPressed = false;
const validateDirectionInput = (inputSnakeDirection) => {
	const horizontalDirection = [ 'left', 'right' ];
	const verticalDirection = [ 'up', 'down' ];
	const isValidFirstMove = snake.direction === '' && 'left' != inputSnakeDirection ? true : false;
	if (!isArrowPressed && isValidFirstMove) {
		isArrowPressed = true;
		snake.direction = inputSnakeDirection;
		return;
	}
	const availableSnakeDirections = verticalDirection.includes(snake.direction)
		? horizontalDirection
		: verticalDirection;
	const isValidSnakeDirection = availableSnakeDirections.includes(inputSnakeDirection) ? true : false;
	if (!isArrowPressed && isValidSnakeDirection) {
		isArrowPressed = true;
		snake.direction = inputSnakeDirection;
	}
};

const keyDownHandler = (e) => {
	const inputKey = e.key.toLowerCase();
	const mapKeyToSnakeDirection = {
		arrowleft: 'left',
		arrowright: 'right',
		arrowup: 'up',
		arrowdown: 'down'
	};
	const validKeyInputs = [ 'arrowleft', 'arrowright', 'arrowup', 'arrowdown' ];
	if (!validKeyInputs.includes(inputKey)) return;
	validateDirectionInput(mapKeyToSnakeDirection[inputKey]);
};
const keyUpHandler = () => {
	isArrowPressed = false;
};
document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

const canvas = document.getElementById('gameCanvas');
const canvasContext = canvas.getContext('2d');
const draw = (element) => {
	canvasContext.beginPath();
	element();
	canvasContext.fill();
	canvasContext.closePath();
};

const snake = {
	bodyCoordinates: [ { x: 80, y: 200 } ],
	direction: '',
	stepSize: 10,
	bodySize: 10,
	length: 5
};

const appendInitialSnakeBodyCoordinates = (length) => {
	for (let i = 1; i < length; i++) {
		snake.bodyCoordinates.push({
			x: snake.bodyCoordinates[0].x - i * snake.bodySize,
			y: snake.bodyCoordinates[0].y
		});
	}
};

appendInitialSnakeBodyCoordinates(snake.length);

const snakeCanvasElement = () => {
	snake.bodyCoordinates = snake.bodyCoordinates.slice(0, snake.length);
	snake.bodyCoordinates.forEach((coordinate) => {
		canvasContext.rect(coordinate.x, coordinate.y, snake.bodySize, snake.bodySize);
	});
	canvasContext.fillStyle = '#76b852';
};

const moveSnakeRight = () => {
	const snakeHead = snake.bodyCoordinates[0];
	return { x: snakeHead.x + snake.stepSize, y: snakeHead.y };
};

const moveSnakeLeft = () => {
	const snakeHead = snake.bodyCoordinates[0];
	return { x: snakeHead.x - snake.stepSize, y: snakeHead.y };
};

const moveSnakeUp = () => {
	const snakeHead = snake.bodyCoordinates[0];
	return { x: snakeHead.x, y: snakeHead.y - snake.stepSize };
};

const moveSnakeDown = () => {
	const snakeHead = snake.bodyCoordinates[0];
	return { x: snakeHead.x, y: snakeHead.y + snake.stepSize };
};

const moveSnake = (snakeDirection) => {
	const snakeMoves = {
		right: moveSnakeRight(),
		left: moveSnakeLeft(),
		up: moveSnakeUp(),
		down: moveSnakeDown()
	};

	snakeDirection ? snake.bodyCoordinates.unshift(snakeMoves[snakeDirection]) : null;
};

const randomAppleCoordinates = () => {
	let isEmptyCoordinate = false;
	let appleCoordinates = {};
	do {
		appleCoordinates = { x: Math.floor(Math.random() * 40) * 10, y: Math.floor(Math.random() * 40) * 10 };
		for (let i = 0; i < snake.length; i++) {
			if (
				snake.bodyCoordinates[i][0] === appleCoordinates.x &&
				snake.bodyCoordinates[i][1] === appleCoordinates.y
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

const appleCanvasElement = () => {
	canvasContext.fillStyle = 'tomato';
	canvasContext.arc(
		apple.coordinates.x + snake.bodySize / 2,
		apple.coordinates.y + snake.bodySize / 2,
		apple.radius,
		0,
		Math.PI * 2
	);
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
	const isAppleEatten =
		snake.headCoordinates.x == apple.coordinates.x && snake.headCoordinates.y === apple.coordinates.y;
	if (isAppleEatten) {
		moveApple();
		updateScore();
		snake.length += 1;
	}
};

const snakeBoundryDetection = () => {
	const isTouchingTopEdge = Boolean(snake.headCoordinates.y <= -snake.stepSize);
	const isTouchingBottomEdge = Boolean(snake.headCoordinates.y >= canvas.height);
	const isTouchingLeftEdge = Boolean(snake.headCoordinates.x <= -snake.stepSize);
	const isTouchingRightEdge = Boolean(snake.headCoordinates.x >= canvas.width);
	const isTouchingBoundry = ![
		isTouchingTopEdge,
		isTouchingBottomEdge,
		isTouchingRightEdge,
		isTouchingLeftEdge
	].every((edgeCondition) => edgeCondition === false);
	if (isTouchingBoundry) {
		return true;
	}
};

const snakeBodyDetection = () => {
	for (let i = 1; i < snake.length; i++) {
		const isTouchingSnakeBody = Boolean(
			snake.bodyCoordinates[i].x === snake.headCoordinates.x &&
				snake.bodyCoordinates[i].y === snake.headCoordinates.y
		);
		if (isTouchingSnakeBody) {
			return true;
		}
	}
};

const isGameOver = () => {
	if (snakeBodyDetection() || snakeBoundryDetection()) {
		clearInterval(snakeGameInterval);
		document.querySelector('#game-over').style.visibility = 'visible';
	}
};

const refreshCanvas = () => {
	canvasContext.clearRect(0, 0, canvas.width, canvas.height);
};

const currentSnakeHeadCoordinates = () => {
	return snake.bodyCoordinates[0];
};

const snakeGameLoop = () => {
	refreshCanvas();
	draw(appleCanvasElement);
	moveSnake(snake.direction);
	snake.headCoordinates = currentSnakeHeadCoordinates();
	snakeEatsApple();
	draw(snakeCanvasElement);
	isGameOver();
};

const framesPerMillisecond = 1000 / 10;
const snakeGameInterval = setInterval(snakeGameLoop, framesPerMillisecond);
