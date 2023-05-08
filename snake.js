const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const scale = 10;

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

const snake = new Snake();
const fruit = new Fruit();

document.addEventListener("keydown", function(event) {
  snake.changeDirection(event.code);
});

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  snake.update();
  fruit.draw();
  snake.draw();

  if (snake.eat(fruit)) {
    fruit.x = Math.floor(Math.random() * canvas.width / scale) * scale;
    fruit.y = Math.floor(Math.random() * canvas.height / scale) * scale;
  }

  if (snake.checkCollision()) {
    snake.total = 0;
    snake.tail = [];
    // Uncomment the line below to end the game instead of resetting the snake
    // return;
  }

  setTimeout(gameLoop, 100);
}

gameLoop();
