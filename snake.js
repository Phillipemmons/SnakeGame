// Define the canvas and context variables
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Define the Snake's starting position, direction, and length
let snakeX = 10;
let snakeY = 10;
let snakeDirection = "right";
let snakeLength = 4;

// Define the position of the food
let foodX = Math.floor(Math.random() * canvas.width);
let foodY = Math.floor(Math.random() * canvas.height);

// Set up the game loop to run every 100ms
setInterval(gameLoop, 100);

// Define the game loop function
function gameLoop() {
  // Update the Snake's position based on its direction
  if (snakeDirection === "right") {
    snakeX += 10;
  } else if (snakeDirection === "left") {
    snakeX -= 10;
  } else if (snakeDirection === "up") {
    snakeY -= 10;
  } else if (snakeDirection === "down") {
    snakeY += 10;
  }
  
  // Check if the Snake has collided with the canvas edges
  if (snakeX < 0 || snakeX >= canvas.width || snakeY < 0 || snakeY >= canvas.height) {
    // End the game
    console.log("Game over!");
  }
  
  // Clear the canvas and redraw the Snake and food
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "green";
  for (let i = 0; i < snakeLength; i++) {
    ctx.fillRect(snakeX + i * 10, snakeY, 10, 10);
  }
  ctx.fillStyle = "red";
  ctx.fillRect(foodX, foodY, 10, 10);
}
