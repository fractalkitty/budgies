/*TODO:
1.)rainbow pulse from cat for budgie friendship
2.)Score for each budgie - budgies shrink when hit and fly away
3.)Implement game over
4.)Add sounds(start with pew and zzzzz)
5.)Begin game state
6.)replace with generative background
7.)Implement generative soundtrack
8.)Implement levels (different grids, speeds, and backgrounds)

*/
let kitty;//(^･ｪ･^)
let bugz;
let level = 0;
let bugWidth, gridSize;
let marg;
let t;
let ground;
let cat, bg, budgie;
let meows = [];

function preload() {
  // bg = loadImage("https://assets.codepen.io/4559259/bg_cats2.jpg");
  // cat = loadImage("https://assets.codepen.io/4559259/cat_inv.png");
  // budgie = loadImage("https://assets.codepen.io/4559259/ahhh_budgies.png");
  bg = loadImage("assets/bg_cats2.jpg")
  cat = loadImage("assets/cat_inv.png")
  budgie = loadImage("assets/ahhh_budgies.png")  
}
function setup() {
  createCanvas(600, 600);
  marg = width / 20;
  bugz = [];
  ground = height / 10;
  //grid of bugz -level 0
  nRow = 4;
  nCol = 5;
  gridW = width / 1.5;
  gridSize = gridW / nCol;
  bugWidth = gridSize * 0.9;
  for (let j = 0; j < nCol; j++) {
    for (let i = 0; i < nRow; i++) {
      x = -gridW / 2 + gridSize / 2 + gridSize * j;
      y = -height / 2 + marg * 2 + gridSize * i;
      bugz.push(new Bugz(x, y));
    }
  }
  kitty = { x: 0, y: height / 2 - ground };
}

function draw() {
  fill(0);
  t = frameCount / 100;
  translate(width / 2, height / 2);
  background(bg);
  
  fill(0);
  if (keyIsPressed) {
    if ((keyCode === 65 || keyCode === 37) && kitty.x > -width / 2) {
      kitty.x -= 3;
    }
    if ((keyCode === 68 || keyCode === 39) && kitty.x < width / 2) {
      kitty.x += 3;
    }
  }

  for (let i = 0; i < bugz.length; i++) {
    bugz[i].display();
  }
  image(cat, kitty.x - 150, kitty.y - 50, 100, 100);
}

class Bugz {
  constructor(x, y) {
    this.xInit = x;
    this.yInit = y;
    this.x = this.xInit;
    this.y = this.yInit;
    this.alive = true;
  }
  display() {
    if (this.alive) {
      this.x = this.xInit + gridSize * sin(t);
      if (this.y < height / 2 - ground) {
        this.y += 0.01;
      } else {
        this.alive = false;
      }
      push();
      let x = this.x - bugWidth / 2;
      let y = this.y - bugWidth / 2;
      translate(x, y);
      rotate((PI / 8) * sin(t / 5));
      image(budgie, 0, 0, bugWidth, bugWidth);
      pop();
    }
  }
}

