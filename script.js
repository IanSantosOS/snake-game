const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const size = 30;
let snakeSpeed = 150;

const snake = [
  { x: 300, y: 300 },
  { x: 330, y: 300 },
  { x: 360, y: 300 },
  { x: 390, y: 300 },
  { x: 420, y: 300 }
];

let direction;
let loopid;

const drawSnake = () => {
  ctx.fillStyle = "#fff";

  snake.forEach((body, index) => {
    if (index === snake.length - 1) {
      ctx.fillStyle = "#ddd"
    }

    ctx.fillRect(body.x, body.y, size, size);
  })
}

const moveSnake = () => {
  if (!direction) return;

  const head = snake.at(-1);
  snake.shift();

  switch (direction) {
    case "up":
      snake.push({ x: head.x, y: head.y - size });
      break;
    case "down":
      snake.push({ x: head.x, y: head.y + size });
      break;
    case "left":
      snake.push({ x: head.x - size, y: head.y });
      break;
    case "right":
      snake.push({ x: head.x + size, y: head.y });
      break;
    default: return;
  }
}

const drawGrid = () => {
  ctx.lineWidth = 1;
  ctx.strokeStyle = '#191919';

  for (let i = size; i < canvas.width; i += size) {
    ctx.beginPath();
    ctx.lineTo(i, 0);
    ctx.lineTo(i, 600);
    ctx.stroke();

    ctx.beginPath();
    ctx.lineTo(0, i);
    ctx.lineTo(600, i);
    ctx.stroke();
  }
}

const gameLoop = (speed) => {
  clearInterval(loopid);

  loopid = setInterval(() => {
    ctx.clearRect(0, 0, 600, 600);
    drawGrid()
    moveSnake();
    drawSnake();
  }, speed);
}

gameLoop(snakeSpeed);

document.addEventListener('keydown', (e) => {
  if (direction !== 'down' && (e.key === 'ArrowUp' || e.key === 'w')) {
    direction = "up";
  }

  else if (direction !== 'up' && (e.key === 'ArrowDown' || e.key === 's')) {
    direction = "down";
  }

  else if (direction !== 'right' && (e.key === 'ArrowLeft' || e.key === 'a')) {
    direction = "left";
  }

  else if (direction !== 'left' && (e.key === 'ArrowRight' || e.key === 'd')) {
    direction = "right";
  }
});