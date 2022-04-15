function attackSprite({ rectangle1, rectangle2 }) {
  return (
    rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
      rectangle2.position.x &&
    rectangle1.attackBox.position.x <=
      rectangle2.position.x + rectangle2.width &&
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
      rectangle2.position.y &&
    rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
  );
}

function determineWinner({ player, enemy, timerId }) {
  clearTimeout(timerId);

  document.querySelector("#displayText").style.display = "flex";
  document.querySelector("#backdrop").style.display = "block";
  if (player.health === enemy.health) {
    document.querySelector("#text").innerHTML = "GG. IT'S A TIE. KEEP TRAINING.";
  } else if (player.health > enemy.health) {
    document.querySelector("#text").innerHTML = "GG. ARO, YOU WIN.";
  } else if (enemy.health > player.health) {
    document.querySelector("#text").innerHTML = "GAME OVER. THE WIZARD GAINS VICTORY.";
  }
}

let timer = 60;
let timerId;
function decreaseTimer() {
  if (timer > 0) {
    timerId = setTimeout(decreaseTimer, 1000);
    timer--;
    document.querySelector("#timer").innerHTML = timer;
  }

  if (timer === 0) {
    determineWinner({ player, enemy, timerId });
  }
}

function playAgain() {
  timer = 60;
  enemy.health = 100;
  player.health = 100;
  document.querySelector("#displayText").style.display = "none";
  document.querySelector("#backdrop").style.display = "none";
  decreaseTimer();
  location.reload();

}
