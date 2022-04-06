class Sprite {
    constructor({position, imageSrc, scale = 1, maxFrames = 1}) {
        this.position = position
        this.height = 150
        this.width = 50
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.maxFrames = maxFrames
        this.currentFrame = 0
        this.elapsedFrames = 0
        this.holdFrame = 1  // loop thru animation for every 1 frame 
    }
   
   draw () {
       c.drawImage(
           this.image, 
           this.currentFrame * (this.image.width / this.maxFrames),
           0,
           this.image.width / this.maxFrames,
           this.image.height,
           this.position.x, 
           this.position.y, 
           (this.image.width / this.maxFrames) * this.scale, 
           this.image.height * this.scale
           )
   }
   
   
   update () {
       this.draw()
       this.elapsedFrames++ // 1 added for each iteration of update 

       if (this.elapsedFrames % this.holdFrame === 0 ) {
         if (this.currentFrame < this.maxFrames - 1) {
             this.frameCurrent++
                 } else {
                  this.currentFrame = 0
                        }
                 }
            }
        }
   
   
   class Fighter {
       constructor({position, velocity, color = 'blue', offset}) {
           this.position = position
           this.velocity = velocity
           this.height = 150
           this.width = 50
           this.lastKey
           this.attackBox = {
               position: {
                   x: this.position.x,
                   y: this.position.y
               },
               offset,
               width: 100,
               height: 50
           }
      
           this.color = color
           this.isAttacking
           this.health = 100
       }
      
      draw () {
          c.fillStyle = 'blue'
          c.fillRect(this.position.x, this.position.y, this.width, this.height)
      
          //attack Box
          if (this.isAttacking) {
          c.fillStyle = 'red'
          c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
          }
      }
      
      
      update () {
          this.draw()
          this.attackBox.position.x = this.position.x + this.attackBox.offset.x
          this.attackBox.position.y = this.position.y
      
          this.position.x += this.velocity.x
          this.position.y += this.velocity.y
      
          if (this.position.y + this.height + this.velocity.y >= canvas.height) {
              this.velocity.y = 0
          } else this.velocity.y += gravity
      }
      
      attack () {
          this.isAttacking = true
          setTimeout(()=> {
              this.isAttacking = false
          }, 100)
      }
      }