const canvas = document.getElementById("gameCanvas");
const canvasContext = canvas.getContext("2d");

let isArrowPressed = false;
let isEmptyCoordinate = false;

const GRID_SIZE = 10;

const snake = {
  bodyCoordinates: [{ x: 80, y: 200 }],
  direction: "",
  length: 5,
};

let apple = {
  x: Math.floor(Math.random() * 40) * 10,
  y: Math.floor(Math.random() * 40) * 10,
  radius: 7,
};

const snakeGameLoop = () => {
  refreshCanvas();
  draw(appleCanvasElement);
  moveSnake(snake.direction);
  snake.bodyCoordinates[0];
  snakeEatsApple();
  draw(snakeCanvasElement);
  gameOver();
};

function refreshCanvas() {
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);
}

const draw = (element) => {
  canvasContext.beginPath();
  element();
  canvasContext.fill();
  canvasContext.closePath();
};

function moveSnake(snakeDirection) {
  const mapSnakeMoves = {
    right: moveSnakeRight(),
    left: moveSnakeLeft(),
    up: moveSnakeUp(),
    down: moveSnakeDown(),
  };

  snakeDirection
    ? snake.bodyCoordinates.unshift(mapSnakeMoves[snakeDirection])
    : null;
}

function snakeEatsApple() {
  if (isAppleEatten()) {
    moveApple();
    updateScore();
    snake.length += 1;
  }
}

function gameOver() {
  if (snakeBodyDetection() || snakeBoundryDetection()) {
    clearInterval(snakeGameInterval);
    document.querySelector("#game-over").style.visibility = "visible";
    setTimeout(() => window.location.reload(), 2000);
  }
}

function validateDirectionInput(inputSnakeDirection) {
  const horizontalDirection = ["left", "right"];
  const verticalDirection = ["up", "down"];
  const isValidFirstMove =
    snake.direction === "" && "left" != inputSnakeDirection ? true : false;
  if (!isArrowPressed && isValidFirstMove) {
    isArrowPressed = true;
    snake.direction = inputSnakeDirection;
    return;
  }
  const availableSnakeDirections = verticalDirection.includes(snake.direction)
    ? horizontalDirection
    : verticalDirection;
  const isValidSnakeDirection = availableSnakeDirections.includes(
    inputSnakeDirection
  )
    ? true
    : false;
  if (!isArrowPressed && isValidSnakeDirection) {
    isArrowPressed = true;
    snake.direction = inputSnakeDirection;
  }
}

document.addEventListener("keyup", () => (isArrowPressed = false));
document.addEventListener("keydown", keyDownHandler);
function keyDownHandler(e) {
  const inputKey = e.key.toLowerCase();
  const mapKeyToSnakeDirection = {
    arrowleft: "left",
    arrowright: "right",
    arrowup: "up",
    arrowdown: "down",
  };
  const validKeyInputs = ["arrowleft", "arrowright", "arrowup", "arrowdown"];
  if (!validKeyInputs.includes(inputKey)) return;
  validateDirectionInput(mapKeyToSnakeDirection[inputKey]);
}

function appendInitialSnakeBodyCoordinates(length) {
  for (let i = 1; i < length; i++) {
    snake.bodyCoordinates.push({
      x: snake.bodyCoordinates[0].x - i * GRID_SIZE,
      y: snake.bodyCoordinates[0].y,
    });
  }
}

appendInitialSnakeBodyCoordinates(snake.length);

function snakeCanvasElement() {
  snake.bodyCoordinates = snake.bodyCoordinates.slice(0, snake.length);
  snake.bodyCoordinates.forEach((coordinate) => {
    canvasContext.rect(coordinate.x, coordinate.y, GRID_SIZE, GRID_SIZE);
  });
  canvasContext.fillStyle = "#76b852";
}

function moveSnakeRight() {
  return {
    x: snake.bodyCoordinates[0].x + GRID_SIZE,
    y: snake.bodyCoordinates[0].y,
  };
}

function moveSnakeLeft() {
  return {
    x: snake.bodyCoordinates[0].x - GRID_SIZE,
    y: snake.bodyCoordinates[0].y,
  };
}

function moveSnakeUp() {
  return {
    x: snake.bodyCoordinates[0].x,
    y: snake.bodyCoordinates[0].y - GRID_SIZE,
  };
}

function moveSnakeDown() {
  return {
    x: snake.bodyCoordinates[0].x,
    y: snake.bodyCoordinates[0].y + GRID_SIZE,
  };
}

do {
  for (let i = 0; i < snake.length; i++) {
    snake.bodyCoordinates[i].x === apple.x &&
    snake.bodyCoordinates[i].y === apple.y
      ? (isEmptyCoordinate = false)
      : (isEmptyCoordinate = true);
  }
} while (!isEmptyCoordinate);

function appleCanvasElement() {
  canvasContext.fillStyle = "tomato";
  canvasContext.arc(
    apple.x + GRID_SIZE / 2,
    apple.y + GRID_SIZE / 2,
    apple.radius,
    0,
    Math.PI * 2
  );
}

function moveApple() {
  apple = {
    x: Math.floor(Math.random() * 40) * 10,
    y: Math.floor(Math.random() * 40) * 10,
    radius: 7,
  };
}

function updateScore() {
  const scorePlaceHolder = document.querySelector("#score-display");
  let scoreValue = parseInt(scorePlaceHolder.textContent);
  scorePlaceHolder.textContent = scoreValue += 1;
}

function isAppleEatten() {
  return (
    snake.bodyCoordinates[0].x === apple.x &&
    snake.bodyCoordinates[0].y === apple.y
  );
}

function snakeBoundryDetection() {
  const isTouchingTopEdge = Boolean(snake.bodyCoordinates[0].y <= -GRID_SIZE);
  const isTouchingBottomEdge = Boolean(
    snake.bodyCoordinates[0].y >= canvas.height
  );
  const isTouchingLeftEdge = Boolean(snake.bodyCoordinates[0].x <= -GRID_SIZE);
  const isTouchingRightEdge = Boolean(
    snake.bodyCoordinates[0].x >= canvas.width
  );
  const isTouchingBoundry = ![
    isTouchingTopEdge,
    isTouchingBottomEdge,
    isTouchingRightEdge,
    isTouchingLeftEdge,
  ].every((edgeCondition) => edgeCondition === false);
  if (isTouchingBoundry) {
    return true;
  }
}

function snakeBodyDetection() {
  for (let i = 1; i < snake.length; i++) {
    return (
      snake.bodyCoordinates[i].x === snake.bodyCoordinates[0].x &&
      snake.bodyCoordinates[i].y === snake.bodyCoordinates[0].y
    );
  }
}

const snakeGameInterval = setInterval(snakeGameLoop, GRID_SIZE * GRID_SIZE);
