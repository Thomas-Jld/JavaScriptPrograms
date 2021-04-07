let bird;
let gravity;
let pressed = false;
let wall = 18;
let spikes = [];
let s;

function setup() {
  createCanvas(300, 600);
  gravity = new createVector(0, 10/60);
  bird = new Bird(width/2,height/2);
  frameRate(100);
  for(let i = 0; i < 20; i++){
    if(random()>0.5){
      s = new Spike(1, 15 + 30*i);
      spikes.push(s);
    }
  }

}

function draw() {
  background(220);
  for(let i = 0; i < spikes.length;i++){
    spikes[i].show();
  }
  bird.show();
  bird.update();
  noStroke();
  fill(100);
  rect(0,0,wall,height);
  rect(width-wall,0,width,height);

}

function keyPressed(){
  if(keyCode == ENTER && !pressed){
    pressed = true;
    bird.speed.y = -4;
  }
}

function keyReleased(){
  pressed = false;
}