let res = 10; //Dist between squares
let cols, rows;
let map = [];
let level = [];
let noiseRes = 0.14;
let choice = 1;

function setup(){
  createCanvas(windowWidth,windowHeight);
  cols = width/res + 1;
  rows = height/res + 1; 
  
  if(choice == 1){
    colorMode(RGB);
  }
  else{
    colorMode(HSB);
  }

  frameRate(60);
}

function draw(){
  background(150);
  if(choice == 1){
    v1();
  }
  else{
    v2([.6,.5,.4]);
  }
}

function keyPressed(){
  if(keyCode == ENTER){
    if(choice == 1){
      colorMode(HSB);
      choice = 0;
    }
    else{
      colorMode(RGB);
      choice = 1;
    }
    console.log(choice);
  }
  else if(keyCode == UP_ARROW){
    noiseRes+=0.01;
  }
  else if(keyCode == DOWN_ARROW){
    noiseRes-=0.01;
  }
  else if(keyCode == LEFT_ARROW){
    limit-=0.01;
  }
  else if(keyCode == RIGHT_ARROW){
    limit+=0.01;
  }
}

function v1(){
  let n;
  for(let i = 0; i < cols; i++){
    level.push([])
    map.push([])
    for(let j = 0; j < rows; j++){
      n = noise(i*noiseRes, j*noiseRes, frameCount/50);
      map[i][j] = n;
      if(n>.5){
        level[i][j] = 1;
      }else{
        level[i][j] = 0;
      }
    }
  }

  noStroke()
  for(let i = 0; i < cols; i++){
    for(let j = 0; j < rows; j++){
      fill(map[i][j] * 255);
      rect((i-.5)*res, (j-.5)*res, res, res);
    }
  }
  strokeWeight(res*.1);
  stroke(255);
  let a;
  let b;
  let c; 
  let d;
  for(let i = 0; i < cols-1; i++){
    for(let j = 0; j < rows-1; j++){
      a = new createVector((i+.5)*res,      j*res);
      b = new createVector( (i+1)*res, (j+.5)*res);
      c = new createVector((i+.5)*res,  (j+1)*res);
      d = new createVector(     i*res, (j+.5)*res);
      if(level[i][j] == 0 && level[i+1][j] == 0 && level[i+1][j+1] == 0 && level[i][j+1] == 1){
        line(d.x,d.y,c.x,c.y);
      }
      else if(level[i][j] == 0 && level[i+1][j] == 0 && level[i+1][j+1] == 1 && level[i][j+1] == 0){
        line(c.x,c.y,b.x,b.y);
      }
      else if(level[i][j] == 0 && level[i+1][j] == 0 && level[i+1][j+1] == 1 && level[i][j+1] == 1){
        line(d.x,d.y,b.x,b.y);
      }
      else if(level[i][j] == 0 && level[i+1][j] == 1 && level[i+1][j+1] == 0 && level[i][j+1] == 0){
        line(a.x,a.y,b.x,b.y);
      }
      else if(level[i][j] == 0 && level[i+1][j] == 1 && level[i+1][j+1] == 0 && level[i][j+1] == 1){
        line(a.x,a.y,d.x,d.y);
        line(b.x,b.y,c.x,c.y);
      }
      else if(level[i][j] == 0 && level[i+1][j] == 1 && level[i+1][j+1] == 1 && level[i][j+1] == 0){
        line(a.x,a.y,c.x,c.y);
      }
      else if(level[i][j] == 0 && level[i+1][j] == 1 && level[i+1][j+1] == 1 && level[i][j+1] == 1){
        line(a.x,a.y,d.x,d.y);
      }
      else if(level[i][j] == 1 && level[i+1][j] == 0 && level[i+1][j+1] == 0 && level[i][j+1] == 0){
        line(a.x,a.y,d.x,d.y);
      }
      else if(level[i][j] == 1 && level[i+1][j] == 0 && level[i+1][j+1] == 0 && level[i][j+1] == 1){
        line(a.x,a.y,c.x,c.y);
      }
      else if(level[i][j] == 1 && level[i+1][j] == 0 && level[i+1][j+1] == 1 && level[i][j+1] == 0){
        line(a.x,a.y,d.x,d.y);
        line(c.x,c.y,b.x,b.y);
      }
      else if(level[i][j] == 1 && level[i+1][j] == 0 && level[i+1][j+1] == 1 && level[i][j+1] == 1){
        line(a.x,a.y,b.x,b.y);
      }
      else if(level[i][j] == 1 && level[i+1][j] == 1 && level[i+1][j+1] == 0 && level[i][j+1] == 0){
        line(d.x,d.y,b.x,b.y);
      }
      else if(level[i][j] == 1 && level[i+1][j] == 1 && level[i+1][j+1] == 0 && level[i][j+1] == 1){
        line(c.x,c.y,b.x,b.y);
      }
      else if(level[i][j] == 1 && level[i+1][j] == 1 && level[i+1][j+1] == 1 && level[i][j+1] == 0){
        line(d.x,d.y,c.x,c.y);
      }
    }
  }
}


function v2(limits){
  for(let i = 0; i < cols; i++){
    level.push([])
    for(let j = 0; j < rows; j++){
      let n = noise(i*noiseRes, j*noiseRes, frameCount/50);
      level[i][j] = n;
    }
  }

  noStroke()
  for(let i = 0; i < cols; i++){
    for(let j = 0; j < rows; j++){
      fill(level[i][j] * 360,255,255);
      rect((i-.5)*res, (j-.5)*res, res, res);
    }
  }
  strokeWeight(res*.1);
  stroke(255);

  limits.forEach(limit => borders(limit));
}

function borders(limit){
  for(let i = 0; i < cols-1; i++){
    for(let j = 0; j < rows-1; j++){
      let a = new createVector((i+(level[i][j] + level[i+1][j])*.5)*res,      j*res);
      let b = new createVector( (i+1)*res, (j+(level[i+1][j] + level[i+1][j+1])*.5)*res);
      let c = new createVector((i+(level[i][j+1] + level[i+1][j+1])*.5)*res,  (j+1)*res);
      let d = new createVector(     i*res, (j+(level[i][j] + level[i][j+1])*.5)*res);

      if(level[i][j] < limit && level[i+1][j] < limit && level[i+1][j+1] < limit && level[i][j+1] > limit ){
        line(d.x,d.y,c.x,c.y);
      }
      else if(level[i][j] < limit && level[i+1][j] < limit && level[i+1][j+1] > limit && level[i][j+1] < limit){
        line(c.x,c.y,b.x,b.y);
      }
      else if(level[i][j] < limit && level[i+1][j] < limit && level[i+1][j+1] > limit && level[i][j+1] > limit){
        line(d.x,d.y,b.x,b.y);
      }
      else if(level[i][j] < limit && level[i+1][j] > limit && level[i+1][j+1] < limit && level[i][j+1] < limit){
        line(a.x,a.y,b.x,b.y);
      }
      else if(level[i][j] < limit && level[i+1][j] > limit && level[i+1][j+1] < limit && level[i][j+1] > limit){
        line(a.x,a.y,d.x,d.y);
        line(b.x,b.y,c.x, c.y);
      }
      else if(level[i][j] < limit && level[i+1][j] > limit && level[i+1][j+1] > limit && level[i][j+1] < limit){
        line(a.x,a.y,c.x,c.y);
      }
      else if(level[i][j] < limit && level[i+1][j] > limit && level[i+1][j+1] > limit && level[i][j+1] > limit){
        line(a.x,a.y,d.x,d.y);
      }
      else if(level[i][j] > limit && level[i+1][j] < limit && level[i+1][j+1] < limit && level[i][j+1] < limit){
        line(a.x,a.y,d.x,d.y);
      }
      else if(level[i][j] > limit && level[i+1][j] < limit && level[i+1][j+1] < limit && level[i][j+1] > limit){
        line(a.x,a.y,c.x,c.y);
      }
      else if(level[i][j] > limit && level[i+1][j] < limit && level[i+1][j+1] > limit && level[i][j+1] < limit){
        line(a.x,a.y,d.x,d.y);
        line(c.x,c.y,b.x,b.y);
      }
      else if(level[i][j] > limit && level[i+1][j] < limit && level[i+1][j+1] > limit && level[i][j+1] > limit){
        line(a.x,a.y,b.x,b.y);
      }
      else if(level[i][j] > limit && level[i+1][j] > limit && level[i+1][j+1] < limit && level[i][j+1] < limit){
        line(d.x,d.y,b.x,b.y);
      }
      else if(level[i][j] > limit && level[i+1][j] > limit && level[i+1][j+1] < limit && level[i][j+1] > limit){
        line(c.x,c.y,b.x,b.y);
      }
      else if(level[i][j] > limit && level[i+1][j] > limit && level[i+1][j+1] > limit && level[i][j+1] < limit){
        line(d.x,d.y,c.x,c.y);
      }
    }
  }
}