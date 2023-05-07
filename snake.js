// Define the canvas and context variables
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Define the Snake's starting position, direction, and length
let snakeX = 10;
let snakeY = 10;
let snakeDirection = "right";
let snakeLength = 4;
let snakeBody = [];

// Define the position of the food
let foodX = Math.floor(Math.random() * canvas.width / 10) * 10;
let foodY = Math.floor(Math.random() * canvas.height / 10) * 10;

// Set up event listener for keyboard input
document.addEventListener("keydown", function(event) {
  if (event.code === "ArrowRight" && snakeDirection !== "left") {
    snakeDirection = "right";
  } else if (event.code === "ArrowLeft" && snakeDirection !== "right") {
    snakeDirection = "left";
  } else if (event.code === "ArrowUp" && snakeDirection !== "down") {
    snakeDirection = "up";
  } else if (event.code === "ArrowDown" && snakeDirection !== "up") {
    snakeDirection = "down";
  }
});

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
  
  // Check if the Snake has collided with the food
  if (snakeX === foodX && snakeY === foodY) {
    // Increase the Snake's length
    snakeLength++;
    
    // Generate a new position for the food
    foodX = Math.floor(Math.random() * canvas.width / 10) * 10;
    foodY = Math.floor(Math.random() * canvas.height / 10) * 10;
  }
  
  // Add the Snake's current position to the body array
  snakeBody.push({ x: snakeX, y: snakeY });
  
  // Remove the oldest position from the body array if it's longer than the Snake's length
  if (snakeBody.length > snakeLength) {
    snakeBody.shift();
  }
  
  // Clear the canvas and redraw the Snake and food
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "green";
  for (let i = 0; i < snakeBody.length; i++) {
    ctx.fillRect(snakeBody[i].x, snakeBody[i].y, 10, 10);
  }
  ctx.fillStyle = "red";
  ctx.fillRect(foodX, foodY, 10, 10);
}
