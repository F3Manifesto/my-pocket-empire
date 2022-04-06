function epCollision ({ ep1, ep2 }) {
    return(
        ep1.attackBox.position.x + ep1.attackBox.width >= ep2.position.x && 
        ep1.attackBox.position.x <= ep2.position.x + ep2.width && 
        ep1.attackBox.position.y + ep1.attackBox.height >= ep2.position.y && 
        ep1.attackBox.position.y <= ep2.position.y + ep2.height 
    )
}

function determineWinner ({player, enemy, timerId}) {
    clearTimeOut (timerId)
    document.querySelector('#displayText').style.display = 'flex'
    if (player.health === enemy.health) {
        document.querySelector('#displayText').innerHTML = 'Tie' 
    } else if (player.health > enemy.health) {
        document.querySelector('#displayText').innerHTML = 'You Win'          
    } else if (player.health < enemy.health) {
        document.querySelector('#displayText').innerHTML = 'You Lost'          
    }
}

let timer = 60
let timerId 
function timerCountDown() {
    if (timer > 0) {
        timerId = setTimeout(timerCountDown, 1000)
        timer-- 
        document.querySelector('#timer').innerHTML = timer
    }

    if (timer === 0) {
        determineWinner({player, enemy, timerId})
     }
}