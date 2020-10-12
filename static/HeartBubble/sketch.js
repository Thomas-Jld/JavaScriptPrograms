let Balloon;
let Balls = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
	frameRate(60);

}

function draw() {
  background(0);
	for( let i = 0; i < Balls.length; i++){
	Balls[i].show();
	Balls[i].update();
	}
  	Balls.push(new Ball(mouseX,mouseY,floor(random(20))));
}

function mousePressed(){
	Balls.push(new Ball(mouseX,mouseY,floor(random(200))));
}

class Ball{
	constructor(x,y,s){
		this.x = x;
		this.y = y;
		this.r = 1;
		this.count = 0;
		this.size = s;
		this.color = [floor(random(255)),floor(random(255)),floor(random(255)),floor(random(150))];
	}
	show(){
		fill(this.color);
		noStroke();
	    ellipse(this.x,this.y,this.r);
	}
	update(){
		this.r = this.size*sin(radians(this.count));
		this.count++;
	}
}
