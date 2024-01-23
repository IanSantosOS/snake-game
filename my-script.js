const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const btnUp = document.querySelector("#btn-up");
const btnDown = document.querySelector("#btn-down");
const btnRight = document.querySelector("#btn-right");
const btnLeft = document.querySelector("#btn-left");

let direction;
let loopId;

let food = {x: 390, y: 300};

const score = document.querySelector("#score span");

let snakeDirection;
const snakeSize = 30;
const snakeSpeed = 150;
const snake = [{x: 300, y: 300}];

const changeDirection = () => {
  if (snakeDirection === "up" && direction === "down") return;
  if (snakeDirection === "down" && direction === "up") return;
  if (snakeDirection === "left" && direction === "right") return;
  if (snakeDirection === "right" && direction === "left") return;

  snakeDirection = direction;
}

const moveSnake = () => {
  if (!snakeDirection) return;

  const head = snake.at(-1);
  
  switch (snakeDirection) {
    case "up":
      if (head.y - snakeSize < 0) {
        snake.push({ x: head.x, y: canvas.height - snakeSize});
      }
      else {
        snake.push({ x: head.x, y: head.y - snakeSize });
      }
      break;
    case "down":
      if (head.y + snakeSize >= canvas.height) {
        snake.push({ x: head.x, y: 0 });
      }
      else {
        snake.push({ x: head.x, y: head.y + snakeSize });
      }
      break;
    case "left":
      if (head.x - snakeSize < 0) {
        snake.push({ x: canvas.width - snakeSize, y: head.y });
      }
      else {
        snake.push({ x: head.x - snakeSize, y: head.y });
      }
      break;
    case "right":
      if (head.x + snakeSize >= canvas.width) {
        snake.push({ x: 0, y: head.y });
      }
      else {
        snake.push({ x: head.x + snakeSize, y: head.y });
      }
      break;
    default: return;
  }

  const array = snake.filter((body, index) => {
    return Object.values(snake.at(-1)).toString() === Object.values(body).toString() && index !== 0;
  });

  if (array.length >= 2) {
    gameOver();
  }
  else {
    snake.shift();
  }
}

const growSnake = () => {
  snake.unshift({ x: snake[0].x, y: snake[0].y });
  score.innerHTML = snake.length - 1;
}

const drawSnake = () => {
  ctx.fillStyle = "#22ff22";

  snake.forEach((body, index) => {
    if (index === 1 && body.x === snake[0].x && body.y === snake[0].y) return;
    ctx.fillRect(body.x, body.y, snakeSize, snakeSize);
    if (index === snake.length - 1) {
      ctx.fillStyle = "#333";
      if (snakeDirection === "up" || snakeDirection === "down") {
        ctx.fillRect(body.x, body.y + 12, 5, 5);
        ctx.fillRect(body.x + snakeSize-5, body.y + 12, 5, 5);
      }
      else {
        ctx.fillRect(body.x + 12, body.y, 5, 5);
        ctx.fillRect(body.x + 12, body.y + snakeSize-5, 5, 5);
      }
    }
  })
}

const foodCheck = () => {
  const head = snake.at(-1);
  if (head.x === food.x && head.y === food.y) {
    growSnake();
    generateFood();
  }
}

const generateFood = () => {
  food = {
    x: random(snakeSize, canvas.width),
    y: random(snakeSize, canvas.height)
  }
  if (snake.some(body => {
    return body.x === food.x && body.y === food.y;
  })) {
    generateFood();
  }
}

const random = (size, areaMax) => {
  return Math.floor(Math.random() * areaMax / size) * size;
}

const drawFood = () => {
  ctx.fillStyle = "#ff2222";
  ctx.fillRect(food.x, food.y, snakeSize, snakeSize);
}

const drawGrid = () => {
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#191919";

  for (let i = snakeSize; i < canvas.width; i += snakeSize) {
    ctx.beginPath();
    ctx.lineTo(i, 0);
    ctx.lineTo(i, canvas.height);
    ctx.stroke();
  }
  for (let i = snakeSize; i < canvas.height; i += snakeSize) {
    ctx.beginPath();
    ctx.lineTo(0, i);
    ctx.lineTo(canvas.width, i);
    ctx.stroke();
  }
}

const gameLoop = () => {
  clearInterval(loopId);

  loopId = setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    changeDirection();
    moveSnake();
    drawSnake();
    foodCheck();
    drawFood();
    drawGrid();
  }, snakeSpeed);
}

const gameOver = () => {
  snake.pop();
  alert("Perdeu!");
  clearInterval(loopId);
}

btnUp.addEventListener("click", () => {
  if (direction === "down") return;
  direction = "up";
});
btnDown.addEventListener("click", () => {
  if (direction === "up") return;
  direction = "down";
});
btnRight.addEventListener("click", () => {
  if (direction === "left") return;
  direction = "right";
});
btnLeft.addEventListener("click", () => {
  if (direction === "right") return;
  direction = "left";
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp' || e.key === 'w') {
    direction = "up";
  }

  else if (e.key === 'ArrowDown' || e.key === 's') {
    direction = "down";
  }

  else if (e.key === 'ArrowLeft' || e.key === 'a') {
    direction = "left";
  }

  else if ((e.key === 'ArrowRight' || e.key === 'd')) {
    direction = "right";
  }
});


gameLoop();