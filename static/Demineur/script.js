function displayGame() {
  background(100);
  fill(0);
  textStyle(BOLD);
  textSize(50);
  text(score, width -100, offset-5);
  for (let i = 0; i < width / step; i++) {
    for (let j = 0; j < (height - offset) / step; j++) {
      stroke(100);
      strokeWeight(1);
      if(grid[i][j][2] == 1){
      fill(100);
      }
      else{
      if (grid[i][j][1] == 1) {
        if (grid[i][j][0] == -1) {
          fill(0);
        } else {
          fill(map(grid[i][j][0], 0, 9, 0, 360), 100, 100);
        }
      } else {
        fill(50);
      }
      }
      rect(i * step, j * step + offset, step, step,10);
    }
  }
}

let Balloon;
let Balls = [];

function Victory() {
  fill(0);
  background(255);
  textStyle(BOLD);
  textAlign(CENTER);
  textSize(50);
  if(random() > 0.95 && Balls.length < 100){
    Balls.push(new Ball(random(width), random(height), floor(random(200))));
  }
  for( let i = 0; i < Balls.length; i++){
	Balls[i].show();
	Balls[i].update();
	}
  text('Victory !', width / 2, height / 2);
  if (keyIsPressed && keyCode != UP_ARROW) {
    saveTheMoves()
    createGrid();
    Balls = [new Ball(random(width), random(height), floor(random(200)))];
    script = 0;
  }
}

class Ball{
	constructor(x,y,s){
		this.x = x;
		this.y = y;
		this.r = 1;
		this.count = 0;
		this.size = s;
		this.color = [floor(random(360)),75+floor(random(25)),75+floor(random(25)),0.75+random(0.25)]
	}
	show(){
		fill(this.color);
		noStroke();
	  ellipse(this.x,this.y,this.r);
	}
	update(){
		this.r = this.size*sin(radians(this.count));
		this.count+=2;
	}
}

let maxi = 0;
let arcstep = 10;

function Defeat() {
  background(0);
  Nvarc([width/2,height/2],-1,2,0);
  if(maxi<100){
    maxi++;
  }
  fill(255);
  textStyle(ITALIC);   
  textAlign(CENTER);
  textSize(50);
  text('You lost...', width / 2, height / 2);
  if (keyIsPressed && keyCode != UP_ARROW) {
    createGrid();
    maxi = 0;
    script = 0;
  }
}

function Nvarc(center,l,r,n){
	if(n >= maxi){
  return 1;
  }
  noFill();
  stroke(n*5 % 361,255,255);
  strokeWeight(arcstep/3);
  center[1]=center[1]+(arcstep/2)*l;
  arc(center[0],center[1],r,r,(HALF_PI)*l,-(HALF_PI)*l);
  Nvarc([center[0],center[1]],l*-1,r+arcstep,n+1);
}