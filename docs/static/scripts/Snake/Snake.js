class Snake{
  constructor(x,y){
    this.Snake = [[x,y]];
  }

  show(){
    fill(200, 255, 255);
    stroke(5);
    strokeWeight(1);
    for(let j = 0;j < this.Snake.length; j++){
      rect(this.Snake[j][0],this.Snake[j][1],step,step);
    }
  }

  update(){
    let Temp = [];

    for(let i = 0; i < this.Snake.length;i++){
      Temp.push([...this.Snake[i]]);
    }

    for(let i = Temp.length-1;i > 0; i--){
      Temp[i] = [...Temp[i-1]];
    }
    xdir = nxdir;
    ydir = nydir;

    Temp[0][0] += xdir*step;
    Temp[0][1] += ydir*step;

    if(Temp[0][0] == apple[0] && Temp[0][1] == apple[1]){
      Temp.push([...this.Snake[this.Snake.length-1]]);
      apple = [step*floor(random(width/step)),step*floor(random(height/step))];
    }

    this.Snake = [...Temp];

    if(this.Snake[0][0] < 0 || this.Snake[0][0] > width-step || this.Snake[0][1] < 0 || this.Snake[0][1] > height-step){
      script = 1}

    for(let k = 1; k < this.Snake.length; k++){
      if(this.Snake[0][0] == this.Snake[k][0] &&this.Snake[0][1] == this.Snake[k][1]){
        script = 1;
      }
    }
  }
}
