const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.7

const background = new Sprite ({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './img/trainingbackground.png'
})

const floatingIsland = new Sprite ({
    position: {
        x: 660,
        y: 45
    },
    imageSrc: './img/floatingisland.png',
    scale: 0.8,
    framesMax: 7
})

const player = new Fighter({
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
    },
    imageSrc: './img/January/idlejan.png',
    framesMax: 6,
    scale: 1.3,
    offset: {
        x: 5, 
        y: 15
    },
    sprites: {
        idle: {
            imageSrc: './img/January/idlejan.png',
            framesMax: 6,
            scale: 1.3
        },
        run: {
            imageSrc: './img/January/runjan.png',
            framesMax: 4,
            scale: 1.3
        },
        jump: {
            imageSrc: './img/January/jumpjan.png',
            framesMax: 4,
            scale: 1.3
        },
        fall: {
            imageSrc: './img/January/falljan.png',
            framesMax: 2,
            scale: 1.3
        },
        attack1: {
            imageSrc: './img/January/attack1jan.png',
            framesMax: 4,
            scale: 1.3
        },
        takeHit: {
          imageSrc: './img/January/takehitjan.png',
          framesMax: 2,
          scale: 1.3
        },
        death: {
            imageSrc: './img/January/deathjan.png',
            framesMax: 2,
            scale: 1.3    
          }
    },

    // extend full width of attack
    attackBox: {
        offset: {
            x: 100,
            y: 30
        },
        width: -100,
        height: 50
    }
})

const enemy = new Fighter({
    position: {
    x: 400,
    y: 100
  },
    velocity: {
    x: 0,
    y: 0
  },
    offset: {
    x: -50,
    y: 0
  },
  imageSrc: './img/January/idlejan.png',
  framesMax: 6,
  scale: 1.3,
  offset: {
      x: 5, 
      y: 15
  },
  sprites: {
      idle: {
          imageSrc: './img/January/idlejan.png',
          framesMax: 6,
          scale: 1.3
      },
      run: {
          imageSrc: './img/January/runjan.png',
          framesMax: 4,
          scale: 1.3
      },
      jump: {
          imageSrc: './img/January/jumpjan.png',
          framesMax: 4,
          scale: 1.3
      },
      fall: {
          imageSrc: './img/January/falljan.png',
          framesMax: 2,
          scale: 1.3
      },
      attack1: {
          imageSrc: './img/January/attack1jan.png',
          framesMax: 4,
          scale: 1.3
      },
      takeHit: {
        imageSrc: './img/January/takehitjan.png',
        framesMax: 2,
        scale: 1.3
      },
      death: {
        imageSrc: './img/January/deathjan.png',
        framesMax: 2,
        scale: 1.3    
      }
  },
  attackBox: {
    offset: {
        x: 100,
        y: 30
    },
    width: -100,
    height: 50
}
})

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

let lastKey



decreaseTimer()

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    background.update()
    c.fillStyle = 'rgba( 255, 255, 255, 0.2)'
    floatingIsland.update()
    c.fillStyle = 'rgba( 255, 255, 255, 0.1)'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()

    player.velocity.x = 0
    enemy.velocity.x = 0

    // player movement
        if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -7
        player.switchSprite('run')
   
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 7
        player.switchSprite('run')
    } else {
        player.switchSprite('idle')
    }

    if (player.velocity.y < 0) {
        player.switchSprite('jump')
    } else if (player.velocity.y > 0) {
        player.switchSprite('fall')
    }

    // enemy movement
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -7
        enemy.switchSprite('run')
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 7
        enemy.switchSprite('run')
    } else {
        enemy.switchSprite('idle')
    }


    if (enemy.velocity.y < 0) {
        enemy.switchSprite('jump')
    } else if (enemy.velocity.y > 0) {
        enemy.switchSprite('fall')
    }

    // detect for collision
    if (rectangularCollision({rectangle1: player, rectangle2: enemy}) &&
        player.isAttacking && player.framesCurrent === 2 // frame in which attack hits the enemy
    ) {
        enemy.takeHit()
        player.isAttacking = false
        gsap.to('#enemyHealth', {
            width: enemy.health +  '%'
            })
    }

    // if player misses attack
    if (player.isAttacking && player.framesCurrent === 2 ) {// frame at end of attack 
        player.isAttacking = false
    }

    if (rectangularCollision({rectangle1: enemy, rectangle2: player}) &&
        enemy.isAttacking && enemy.framesCurrent === 2 // frame in which attack hits the enemy
    ) { 
        player.takeHit()
        enemy.isAttacking = false  
        gsap.to('#playerHealth', {
            width: player.health +  '%'
            })
    }

    // if enemy misses attack
    if (enemy.isAttacking && enemy.framesCurrent === 2 ) {// frame at end of attack 
        enemy.isAttacking = false
    }

    // end game based on health 
    if (enemy.health <= 0 || player.health  <= 0 ) {
        determineWinner({player, enemy, timerId})
    }
}

animate()

window.addEventListener('keydown', (event) => {
    if (!player.dead) {
        
   switch (event.key) {
       case 'd':
           keys.d.pressed = true
           player.lastKey = 'd'
       break
       case 'a':
           keys.a.pressed = true
           player.lastKey = 'a'
       break
       case 'w':
           player.velocity.y = -20
       break
       case ' ':
           player.attack()
        break

   }
}

if (!enemy.dead) {
   switch(event.key) {
    case 'ArrowRight':
    keys.ArrowRight.pressed = true
    enemy.lastKey = 'ArrowRight'
    break
    case 'ArrowLeft':
        keys.ArrowLeft.pressed = true
        enemy.lastKey = 'ArrowLeft'
    break
    case 'ArrowUp':
        enemy.velocity.y = -20
    break
    case 'ArrowDown':
        enemy.attack()
    break
   }
}
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
        break
        case 'a':
            keys.a.pressed = false
        break
    }

    // enemy
    switch (event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
        break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
        break
    }
 })
 