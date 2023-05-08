const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const scale = 10;
const restartButton = document.getElementById("restart-button");

class Snake {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.xSpeed = scale * 1;
    this.ySpeed = 0;
    this.total = 0;
    this.tail = [];
  }

  draw() {
    ctx.fillStyle = "#FFFFFF";

    for (let i = 0; i < this.tail.length; i++) {
      ctx.fillRect(this.tail[i].x, this.tail[i].y, scale, scale);
    }

    ctx.fillRect(this.x, this.y, scale, scale);
  }

  update() {
    for (let i = 0; i < this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i + 1];
    }

    this.tail[this.total - 1] = { x: this.x, y: this.y };

    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }

  changeDirection(direction) {
    switch (direction) {
      case "ArrowUp":
        this.xSpeed = 0;
        this.ySpeed = -scale * 1;
        break;

      case "ArrowDown":
        this.xSpeed = 0;
        this.ySpeed = scale * 1;
        break;

      case "ArrowLeft":
        this.xSpeed = -scale * 1;
        this.ySpeed = 0;
        break;

      case "ArrowRight":
        this.xSpeed = scale * 1;
        this.ySpeed = 0;
        break;
    }
  }

  eat(fruit) {
    if (this.x === fruit.x && this.y === fruit.y) {
      this.total++;
      return true;
    }
    return false;
  }

  checkCollision() {
    // Check if the snake hits the edge
    if (this.x >= canvas.width || this.y >= canvas.height || this.x < 0 || this.y < 0) {
      return true;
    }

    // Check if the snake hits itself
    for (let i = 0; i < this.tail.length; i++) {
      if (this.tail[i].x === this.x && this.tail[i].y === this.y) {
        return true;
      }
    }

    return false;
  }
  
  checkGameOver() {
    // Check if the snake hits the edge or itself
    return (this.x >= canvas.width || this.y >= canvas.height || this.x < 0 || this.y < 0) ||
      this.tail.some(tailSegment => tailSegment.x === this.x && tailSegment.y === this.y);
  }
}

class Fruit {
  constructor() {
    this.x = Math.floor(Math.random() * canvas.width / scale) * scale;
    this.y = Math.floor(Math.random() * canvas.height / scale) * scale;
  }

  draw() {
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(this.x, this.y, scale, scale);
  }
}

let snake = new Snake();
let fruit = new Fruit();

document.addEventListener("keydown", function(event) {
  snake.changeDirection(event.code);
});

// Touch controls
let touchStartX = 0;
let touchStartY = 0;

canvas.addEventListener("touchstart", function(event) {
  event.preventDefault();
  touchStartX = event.touches[0].clientX;
  touchStartY = event.touches[0].clientY;
}, false);

canvas.addEventListener("touchend", function(event) {
  event.preventDefault();
  let touchEndX = event.changedTouches[0].clientX;
  let touchEndY = event.changedTouches[0].clientY;

  let deltaX = touchEndX - touchStartX;
  let deltaY = touchEndY - touchStartY;

  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    // Horizontal swipe
    if (deltaX > 0) {
      snake.changeDirection("ArrowRight");
    } else {
      snake.changeDirection("ArrowLeft");
    }
  } else {
    // Vertical swipe
    if (deltaY > 0) {
      snake.changeDirection("ArrowDown");
    } else {
      snake.changeDirection("ArrowUp");
    }
  }
}, false);

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  snake.update();
  fruit.draw();
  snake.draw();

  if (snake.eat(fruit)) {
    fruit.x = Math.floor(Math.random() * canvas.width / scale) * scale;
    fruit.y = Math.floor(Math.random() * canvas.height / scale) * scale;
  }

  if (snake.checkGameOver()) {
    restartButton.style.display = "block";
    return;
  }

  setTimeout(gameLoop, 100);
}

restartButton.addEventListener("click", function() {
  snake = new Snake();
  fruit = new Fruit();
  restartButton.style.display = "none";
  gameLoop();
});

gameLoop();