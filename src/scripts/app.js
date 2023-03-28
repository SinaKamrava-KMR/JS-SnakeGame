const playBoard = document.querySelector(".play-borad");


let foodX,foodY ;
let snakeX =5,snakeY=15 ;
let speedX = 0, speedY = 0;
let snakeBody = [];
let gameOver = false;
let setIntervalId;

const handelGameOver = () => {
  clearInterval(setIntervalId);
  alert("Ooops you game over");
  location.reload()

}
const changeFoodPosition = () => {
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
}
const changeDirection = (e) => {
  switch (e) {
    case "ArrowDown":
      speedX = 0;
      speedY= 1;
      break;
    case "ArrowUp":
      speedX = 0;
      speedY= - 1;
      break;
    case "ArrowRight":
      speedX = 1;
      speedY= 0;
      break;
    case "ArrowLeft":
      speedX = -1;
      speedY= 0;
      break;
  }

}

const initGame = () => {

  if (gameOver) {
    handelGameOver()
  }
  let htmlMarkup = `<div class ="food" style="grid-area:${foodY}/${foodX}"></div>`;
  if (snakeX == foodX && snakeY == foodY) {
    changeFoodPosition();
    snakeBody.push([foodX,foodY])
    console.log(snakeBody);
  }

  for (let i = snakeBody.length-1; i >0; i--){
  snakeBody[i]=snakeBody[i-1]
   
  }
  snakeBody[0] = [snakeX, snakeY];

  snakeX += speedX;
  snakeY += speedY;

  if (snakeX < 0 ) {
    speedX = 30;
    snakeX = 30;
    changeDirection("ArrowLeft")
  } else if (snakeX >= 31) {
    speedX = 1;
    snakeX = 1;
  }
  if (snakeY < 0 ) {
    speedY = 30;
    snakeY = 30;
    changeDirection("ArrowUp")
  } else if (snakeY >= 31) {
    speedY = 1;
    snakeY = 1;
  }

  for (let i = 0; i < snakeBody.length; i++){
    htmlMarkup += `<div class ="snake" style="grid-area:${snakeBody[i][1]}/${snakeBody[i][0]}"></div>`;
    if (i != 0 && snakeBody[0][1] == snakeBody[i][1] && snakeBody[0][0] == snakeBody[i][0]) {
      handelGameOver()
    }
   
  }
  console.log(`snakeY : ${snakeY} ..... snakeX : ${snakeX}`);
  htmlMarkup += `<div class ="snake" style="grid-area:${snakeY}/${snakeX}"></div>`;
  playBoard.innerHTML = htmlMarkup;
}

changeFoodPosition()
setIntervalId = setInterval(initGame, 125);

document.addEventListener("keydown", (e) => {
  changeDirection(e.key)
});
