class Spike{
  constructor(side,y){
    this.x = width/2 + (width/2 - wall)*side;
    this.y = y;
    this.side = side;
  }
  show(){
    push();
    fill(100);
    triangle(this.x,this.y-15,this.x,this.y+15,this.x-20*this.side,this.y);
    pop();
  }
}