let step = 40;

let xdir = 0;
let ydir = 1;

let nxdir = 0;
let nydir = 1;

let snake = [];
let apple = [10* step, 10 * step];
let speed = 10;
let script = 2;

function setup() {
  createCanvas(floor(windowWidth/step)*step , floor(windowHeight/step)*step);
  LilSnake = new Snake(20, height / 2);
  frameRate(speed);
  colorMode(HSB);
}

function initiatee() {
  LilSnake.Snake = [
    [2*step, 5 * step]
  ];
  xdir, nxdir = 1;
  ydir, nydir = 0;
  script = 0;
}

function draw() {

  if (script == 0) {
    Game();
  } else if (script == 1) {
    Defeat();
  } else if (script == 2) {
    Wait();
  }
}

function Wait() {

}

function mousePressed() {
  print(LilSnake.Snake);
}

function keyPressed() {
  if (keyCode == UP_ARROW && ydir != 1) {
    nxdir = 0;
    nydir = -1;
  }
  if (keyCode == DOWN_ARROW && ydir != -1) {
    nxdir = 0;
    nydir = 1;
  }
  if (keyCode == RIGHT_ARROW && xdir != -1) {
    nxdir = 1;
    nydir = 0;
  }
  if (keyCode == LEFT_ARROW && xdir != 1) {
    nxdir = -1;
    nydir = 0;
  }
  if (keyCode == ENTER) {
    initiatee();
    script = 0;
  }
}

function Game() {
  frameRate(speed);
  background(220);
  LilSnake.update();
  LilSnake.show();
  fill(0, 255, 255);
  rect(apple[0], apple[1], step, step);
  //console.log(LilSnake.Snake);
}
let maxi = 0;
let arcstep = 10;

function Defeat() {
  background(0);
  Nvarc([width / 2, height / 2], -1, 2, 0);

  if (maxi < 100) {
    maxi++;
  }
  fill(255);
  textStyle(ITALIC);
  textAlign(CENTER);
  textSize(50);
  text('You lost...', width / 2, height / 2);
  if (keyIsPressed && keyCode != UP_ARROW) {
    maxi = 0;
  }
}

function Nvarc(center, l, r, n) {
  if (n >= maxi) {
    return 1;
  }
  noFill();
  stroke(n * 5 % 361, 255, 255);
  strokeWeight(arcstep / 3);
  center[1] = center[1] + (arcstep / 2) * l;
  arc(center[0], center[1], r, r, (HALF_PI) * l, -(HALF_PI) * l);
  Nvarc([center[0], center[1]], l * -1, r + arcstep, n + 1);
}
