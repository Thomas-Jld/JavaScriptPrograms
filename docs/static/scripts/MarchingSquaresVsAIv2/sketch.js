let res = 10; //Dist between squares
let cols, rows;
let map = [];
let level = [];
let noiseRes = 0.7;
let choice = 0;

let limits = [0.5];
let limitcase;
let data = [];
let guessedCase;

let done = true;
let trained = false;
let ready = false;

let offset;

let whichAI = 'TF';

function setup(){
  createCanvas(1200,600);
  cols = width/(2*res) + 1;
  rows = height/res + 1; 
  
  offset = new createVector(width/2, 0);

  colorMode(RGB);
  frameRate(60);

  if(whichAI == 'ML5'){
    InitMl5Model();
  }else{
    InitTfModel();
  }

  trainning(limits);
  
}

function draw(){
  if(done){
    done = false;
    background(150);
    trainning(limits);
  }
}


const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}


function trainning(limits){

  for(let i = 0; i < cols; i++){
    level.push([])
    for(let j = 0; j < rows; j++){
      let n = noise(i*noiseRes, j*noiseRes, frameCount/50);
      level[i][j] = n;
    }
  }

  noStroke()
  for(let i = 0; i < cols-1; i++){
    for(let j = 0; j < rows-1; j++){
      fill(level[i][j] * 255);
      rect((i-.5)*res, (j-.5)*res, res, res);
    }
  }
  for(let i = 0; i < cols; i++){
    for(let j = 0; j < rows; j++){
      fill(level[i][j] * 255);
      rect((i+cols-1.5)*res, (j-.5)*res, res, res);
    }
  }


  stroke(255);
  strokeWeight(3);
  line(width/2, 0, width/2, height);

  strokeWeight(res*.1);
  stroke(255);

  //limits.forEach(limit => borders(limit));
  borders(0.5)
}


async function borders(limit){
  for(let i = 0; i < cols-1; i++){
    for(let j = 0; j < rows-1; j++){
      let a = new createVector((i+(level[i][j] + level[i+1][j])*.5)*res,      j*res);
      let b = new createVector( (i+1)*res, (j+(level[i+1][j] + level[i+1][j+1])*.5)*res);
      let c = new createVector((i+(level[i][j+1] + level[i+1][j+1])*.5)*res,  (j+1)*res);
      let d = new createVector(     i*res, (j+(level[i][j] + level[i][j+1])*.5)*res);
      limitcase= 0;
      stroke(255);
      if(level[i][j] < limit && level[i+1][j] < limit && level[i+1][j+1] < limit && level[i][j+1] > limit ){
        line(d.x,d.y,c.x,c.y);
        limitcase= 1;
      }
      else if(level[i][j] < limit && level[i+1][j] < limit && level[i+1][j+1] > limit && level[i][j+1] < limit){
        line(c.x,c.y,b.x,b.y);
        limitcase= 2;
      }
      else if(level[i][j] < limit && level[i+1][j] < limit && level[i+1][j+1] > limit && level[i][j+1] > limit){
        line(d.x,d.y,b.x,b.y);
        limitcase= 3;
      }
      else if(level[i][j] < limit && level[i+1][j] > limit && level[i+1][j+1] < limit && level[i][j+1] < limit){
        line(a.x,a.y,b.x,b.y);
        limitcase= 4;
      }
      else if(level[i][j] < limit && level[i+1][j] > limit && level[i+1][j+1] < limit && level[i][j+1] > limit){
        line(a.x,a.y,d.x,d.y);
        line(b.x,b.y,c.x, c.y);
        limitcase= 5;
      }
      else if(level[i][j] < limit && level[i+1][j] > limit && level[i+1][j+1] > limit && level[i][j+1] < limit){
        line(a.x,a.y,c.x,c.y);
        limitcase= 6;
      }
      else if(level[i][j] < limit && level[i+1][j] > limit && level[i+1][j+1] > limit && level[i][j+1] > limit){
        line(a.x,a.y,d.x,d.y);
        limitcase= 7;
      }
      else if(level[i][j] > limit && level[i+1][j] < limit && level[i+1][j+1] < limit && level[i][j+1] < limit){
        line(a.x,a.y,d.x,d.y);
        limitcase= 8;
      }
      else if(level[i][j] > limit && level[i+1][j] < limit && level[i+1][j+1] < limit && level[i][j+1] > limit){
        line(a.x,a.y,c.x,c.y);
        limitcase= 9;
      }
      else if(level[i][j] > limit && level[i+1][j] < limit && level[i+1][j+1] > limit && level[i][j+1] < limit){
        line(a.x,a.y,d.x,d.y);
        line(c.x,c.y,b.x,b.y);
        limitcase= 10;
      }
      else if(level[i][j] > limit && level[i+1][j] < limit && level[i+1][j+1] > limit && level[i][j+1] > limit){
        line(a.x,a.y,b.x,b.y);
        limitcase= 11;
      }
      else if(level[i][j] > limit && level[i+1][j] > limit && level[i+1][j+1] < limit && level[i][j+1] < limit){
        line(d.x,d.y,b.x,b.y);
        limitcase= 12;
      }
      else if(level[i][j] > limit && level[i+1][j] > limit && level[i+1][j+1] < limit && level[i][j+1] > limit){
        line(c.x,c.y,b.x,b.y);
        limitcase= 13;
      }
      else if(level[i][j] > limit && level[i+1][j] > limit && level[i+1][j+1] > limit && level[i][j+1] < limit){
        line(d.x,d.y,c.x,c.y);
        limitcase= 14;
      }
      else if(level[i][j] > limit && level[i+1][j] > limit && level[i+1][j+1] > limit && level[i][j+1] > limit){
        limitcase= 15;
      }
      
      data.push({
          label: str(limitcase), 
          input1:level[i][j], 
          input2:level[i+1][j], 
          input3:level[i+1][j+1], 
          input4:level[i][j+1]
      });
    }
  }

  
  if(ready){

    let input = tf.tensor2d(level, [cols , rows]);
    guessedCases = await nn2.predict(input).argMax(-1).dataSync()[0];
    

    for(let i = 0; i < cols-1; i++){
      for(let j = 0; j < rows-1; j++){
        

        a.add(offset);
        b.add(offset);
        c.add(offset);
        d.add(offset);
        if(guessedCase == limitcase){
          stroke(255);
        }
        else{
          stroke(255,0,0);
        }
        if(guessedCase == "1"){
          line(d.x,d.y,c.x ,c.y);
        }
        else if(guessedCase == "2"){
          line(c.x,c.y,b.x,b.y);
        }
        else if(guessedCase == "3"){
          line(d.x,d.y,b.x,b.y);
        }
        else if(guessedCase == "4"){
          line(a.x,a.y,b.x,b.y);
        }
        else if(guessedCase == "5"){
          line(a.x,a.y,d.x,d.y);
          line(b.x,b.y,c.x, c.y);
        }
        else if(guessedCase == "6"){
          line(a.x,a.y,c.x,c.y);
          limitcase= 6;
        }
        else if(guessedCase == "7"){
          line(a.x,a.y,d.x,d.y);
        }
        else if(guessedCase == "8"){
          line(a.x,a.y,d.x,d.y);
        }
        else if(guessedCase == "9"){
          line(a.x,a.y,c.x,c.y);
        }
        else if(guessedCase == "10"){
          line(a.x,a.y,d.x,d.y);
          line(c.x,c.y,b.x,b.y);
        }
        else if(guessedCase == "11"){
          line(a.x,a.y,b.x,b.y);
        }
        else if(guessedCase == "12"){
          line(d.x,d.y,b.x,b.y);
        }
        else if(guessedCase == "13"){
          line(c.x,c.y,b.x,b.y);
        }
        else if(guessedCase == "14"){
          line(d.x,d.y,c.x,c.y);
        }
      }
    }
  }

  if(whichAI == 'ML5'){
    TrainMl5Model();
  }
  else{
    TrainTfModel();
  }
  done = true;
}



function GuessMl5Model(error, result) {
    if(error){
      console.error(error);
      return;
    }
    guessedCase = result[0].label;
}


function keyPressed(){
  if(keyCode == ENTER){
    ready = false;
  }
  else if(key == 'd'){
    done = true;
  }
  else if(key == 'k'){
    trained = false;
  }
  else if(keyCode == UP_ARROW){
    noiseRes+=0.01;
  }
  else if(keyCode == DOWN_ARROW){
    noiseRes-=0.01;
  }
}
