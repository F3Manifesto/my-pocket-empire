const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width =  1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const background = new Sprite ({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './img/background.png'
})

const store = new Sprite ({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './img/store.png', 
    scale: 1.5,
    framesMax: 6
})

const gravity = 0.5

const player = new Fighter ({
    position: {
        x: 0,
        y: 0 
    }, 
   velocity: {
        x: 0,
        y: 10
   },
   offset: {
       x: 0,
       y: 0
   }
})


const enemy = new Fighter ({
    position: {
        x: 400,
        y: 100 
    }, 
   velocity: {
        x: 0,
        y: 0
   },
   color: 'green',
   offset: {
       x: -50,
       y: 0
   }
})

enemy.draw()

console.log(player)

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    }
}



timerCountDown()

function move() {
    window.requestAnimationFrame(move)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    background.update()
    store.update()
    player.update()
    enemy.update()


player.velocity.x = 0
enemy.velocity.x = 0

// movement of player
 if (keys.a.pressed && player.lastkey === 'a') {
    player.velocity.x = -5
    } else if (keys.d.pressed && player.lastkey === 'd') {
    player.velocity.x = 5
    }

// movement of enemy
if (keys.ArrowLeft.pressed && enemy.lastkey === 'ArrowLeft') {
    enemy.velocity.x = -5
    } else if (keys.ArrowRight.pressed && enemy.lastkey === 'ArrowRight') {
    enemy.velocity.x = 5
    }

// detect collisions
if (
    epCollision({ep1: player, ep2: enemy}) &&
    player.isAttacking
    ) {
    player.isAttacking = false
    enemy.health -= 20
    document.querySelector('#enemyHealth').style.width = enemy.health + '%'
    }

    if (
    epCollision({ep1: enemy, ep2: player}) &&
    enemy.isAttacking
    ) {
    enemy.isAttacking = false
    player.health -= 20
    document.querySelector('#playerHealth').style.width = player.health + '%'
    }

// end game 
if (enemy.health <= 0 || player.health <= 0) {
    determineWinner({player, enemy, timerId})
}

}

move()

window.addEventListener('keydown', (event) => {
    console.log(event.key)
    switch (event.key) {
        case 'd':
        keys.d.pressed = true
        player.lastkey = 'd'
        break
        case 'a':
        keys.a.pressed = true
        player.lastkey = 'a'
        break
        case 'w':
        player.velocity.y = -15
        break
        case ' ':
        player.attack()
        break

        case 'ArrowRight':
        keys.ArrowRight.pressed = true
        enemy.lastkey = 'ArrowRight'
        break
        case 'ArrowLeft':
        keys.ArrowLeft.pressed = true
        enemy.lastkey = 'ArrowLeft'
        break
        case 'ArrowUp':
        enemy.velocity.y = -15
        break
        case 'ArrowDown':
        enemy.isAttacking = true
        break
    }
})

window.addEventListener('keyup', (event) => {

    // Keys for Player 
    switch (event.key) {
        case 'd':
        keys.d.pressed = false
        break
        case 'a':
        keys.a.pressed = false
        break
    }

    // Keys for Enemy 
    switch (event.key) {
        case 'ArrowRight':
        keys.ArrowRight.pressed = false
        break
        case 'ArrowLeft':
        keys.ArrowLeft.pressed = false
        break
    }
})