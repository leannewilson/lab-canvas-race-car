const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

// background
const background = new Image();
background.src = 'images/road.png';

background.onload = function(){
  ctx.drawImage(background, 0 , 0, canvas.width, canvas.height);   
}

// car
const car = new Image();
car.src = 'images/car.png';
car.onload = function(){
  ctx.drawImage(car, 220, 575, 50, 125)
}

// start game, load car
window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame();
  };

  function startGame() {
    animate()
    console.log('Start your engines!')
  }
};

class Car {
  constructor(x, y, w, h){
    this.y = y
    this.x = x 
    this.w = w
    this.h = h
  }

  draw = () => {
    ctx.drawImage(car, this.x, this.y, this.w, this.h);
  }
}

let blueCar = new Car(220, 575, 50, 125)

// move car
window.onkeydown = function (e) {
  if (e.key === 'ArrowLeft') {
    blueCar.x -= 10
    if (blueCar.x < 0) {
      blueCar.x += 10
      console.log('Out of bounds')
    }
    console.log('left')
  }
  if (e.key === 'ArrowRight') {
    blueCar.x += 10
    if (blueCar.x > 450) {
      blueCar.x -= 10
      console.log('Out of bounds')
    }
    console.log('right')
  }
}

class Obstacles {
  constructor(x, y, w, h, color){
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.color = color;
  }
  
  draw = () => {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.w, this.h, this.color);
  };

  move = () => {
    this.y += 3;
    this.draw();
  };
}

const obstacles = []
let counter = 0;

setInterval(() => {
  let obs = new Obstacles(Math.random() * canvas.width, 0, Math.random() * 100, 10, "orange");
  obstacles.push(obs);
}, 1000);

let animatedId = null;
function animate() {
  animatedId = requestAnimationFrame(animate);
 // clear car 
 ctx.clearRect( 0 , 0, canvas.width, canvas.height)
// reload BG
 ctx.drawImage(background, 0 , 0, canvas.width, canvas.height);   
 ctx.drawImage(car, this.x, this.y, this.w, this.h);
 blueCar.draw();

 for (let obs of obstacles) {
  obs.move();
  detectCollision(obs, blueCar);
 }
 ctx.fillText(counter, 325, 60);
}

// animate()

function detectCollision(rect1, rect2) {
  if (
    rect1.x < rect2.x + rect2.w &&
    rect1.x + rect1.w > rect2.x &&
    rect1.y < rect2.y + rect2.h &&
    rect1.y + rect1.h > rect2.y
  ) {
    // collision detected!
    console.log("collision");
    cancelAnimationFrame(animatedId);
  } else {
    counter += 1;
    // console.log(counter);
  }
}

// points
ctx.font = "48px serif";





