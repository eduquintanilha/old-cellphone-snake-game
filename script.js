/**
 * Title: Old Cellphone Snake Game liek for learning HTML Canvas and Javascript
 * Author: Eduardo Quintanilha
 * Github: @Eduard0x6f
 */

 
// On Start Game
window.onload = function() {
  var screen = document.querySelector('#screen');
  var ctx = screen.getContext("2d");

  // Score
  var score = 0;

  //Add event listener keydown
  document.addEventListener("keydown", keyPush);

  // Speed of game refresh
  setInterval(game, 120);
  const speed = 1;
  var START_GAME = true;

  // Snake
  var speedX = speedY = 0;
  var snakePositionX = snakePositionY = 10;
  var sizeSnakePart = 20;
  var quantitySnakeParts = 20;
  
  var snakeTrail = [];
  snakeTailSize = 5;

  // Food
  var foodPositionX = foodPositionY = 15;
    

  function game() {
    snakePositionX += speedX;
    snakePositionY += speedY;

    if (snakePositionX < 0) {
      snakePositionX = quantitySnakeParts-1;
    }
    if (snakePositionX > quantitySnakeParts-1) {
      snakePositionX = 0;
    }
    if (snakePositionY < 0) {
      snakePositionY = quantitySnakeParts-1;
    }
    if (snakePositionY > quantitySnakeParts-1) {
      snakePositionY = 0;
    }


    // Draw a screen background
    ctx.fillStyle = "#9fd002";
    ctx.fillRect(0,0, screen.width, screen.height);

    // Draw snake food
    ctx.fillStyle = "#1a3900";
    ctx.fillRect(foodPositionX*sizeSnakePart, foodPositionY*sizeSnakePart, sizeSnakePart, sizeSnakePart);

    
    //Draw snake head
    ctx.fillStyle = "#122700";
    ctx.fillRect((snakePositionX*sizeSnakePart)-1, (snakePositionY*sizeSnakePart)-1, sizeSnakePart+(sizeSnakePart*10)/100, sizeSnakePart+(sizeSnakePart*10)/100);
    //Draw snake body
    ctx.fillStyle = "#1a3900";

    
    for (var i=0; i<snakeTrail.length; i++) {
      ctx.fillRect(snakeTrail[i].tailX*sizeSnakePart,snakeTrail[i].tailY*sizeSnakePart, sizeSnakePart, sizeSnakePart );

      if (snakeTrail[i].tailX == snakePositionX && snakeTrail[i].tailY == snakePositionY && !START_GAME) {
        speedX = speedY = 0;
        alert(`GAME OVER! Your score was ${score}!`);
        location.reload();

      }
    }

    //Draw the score
    ctx.fillStyle = "#1a3900";
    ctx.font = "bold 20px Verdana";
    ctx.fillText(`Score: ${score}`, 285, 25);

    snakeTrail.push({ tailX: snakePositionX, tailY: snakePositionY });
    while (snakeTrail.length > snakeTailSize) {
      snakeTrail.shift();
    }

    // If snake "eat" the food, increase the tail size and earn points
    if (foodPositionX == snakePositionX && foodPositionY == snakePositionY) {
      snakeTailSize++;
      score+=10;
      // Create new food randomic on screen
      foodPositionX = Math.floor(Math.random() * quantitySnakeParts);
      foodPositionY = Math.floor(Math.random() * quantitySnakeParts);
    }
  
  }

  function keyPush(event) {
    console.log(event.keyCode)
    switch (event.keyCode) {
      case 37: //LEFT
        START_GAME = false;
        speedX = -speed;
        speedY = 0;
        break;
      case 38: //UP
        START_GAME = false;
        speedX = 0;
        speedY = -speed;
        break;  
      case 39: //RIGHT
        START_GAME = false;
        speedX = speed;
        speedY = 0;
        break;
      case 40: //DOWN
        START_GAME = false;
        speedX = 0;
        speedY = speed;
        break;
      default:
        break;
    }
  }

}
