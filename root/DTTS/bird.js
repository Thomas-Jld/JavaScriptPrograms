

class Bird{
  constructor(x,y){
   this.pos = new createVector(x,y);
   this.speed = new createVector(3,-5);
   this.accel = new createVector(0,0);
   this.r = 20;
    this.points = 0;
  }
  show(){
    fill(255);
    ellipse(width/2,height/2,width/2);
    fill(220);
    textSize(100);
    textAlign(CENTER,CENTER);
    text(this.points,width/2,height/2);
    push();
    fill(255,0,0);
    noStroke();
    ellipse(this.pos.x,this.pos.y,this.r);
    pop();
  }
  update(){
    this.speed.add(gravity);
    this.speed.add(this.accel);
    this.pos.add(this.speed);
    if(this.pos.x >= width - this.r - 10){
      this.speed.x *= -1;
      this.pos.x = width - this.r - 10.01;
      this.checkDeath();
    }
    if(this.pos.x <= this.r + 10){
      this.speed.x *= -1;
      this.pos.x = this.r + 10.01;
      this.checkDeath();
    }
    if(this.pos.y < 0 || this.pos.y > height){
      this.died();
    }
  }
  checkDeath(){
    this.points++;
    let dir = abs(this.speed.x)/this.speed.x;
    for(let i = 0; i < spikes.length; i++){
      if(dir == -spikes[i].side && this.pos.y > spikes[i].y - 15 && this.pos.y < spikes[i].y + 15){
        this.died();
      }
    }
    spikes = [];
    for(let i = 0; i < 20; i++){
    if(random()>0.5){
      s = new Spike(dir, 15 + 30*i);
      spikes.push(s);
    }
  }
  }
  died(){
    bird = new Bird(width/2,height/2);
    spikes = [];
    for(let i = 0; i < 20; i++){
    if(random()>0.5){
      s = new Spike(1, 15 + 30*i);
      spikes.push(s);
    }
  }}
}