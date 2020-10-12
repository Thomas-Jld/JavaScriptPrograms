//Initial parametres
let grid = [];
let size = 80;
let script;
let score = 0;

//OnnTheGo variables modification
let sizeInput;
let speedInput;

//Display
let offset = 50;
let zoom = 10;
let xOffset = -(size-zoom)/2;
let yOffset = -(size-zoom)/2;
let cubeSize;

let ratio;

function setup() {
  canvas = createCanvas(1000, 520 + offset).position(windowWidth / 2 - width / 2,0);

  cubeSize = (height-offset) / zoom;
  grid = createGrid();
  ratio = width/(height-offset);

  let a = createButton('Start').position((windowWidth / 2)+ 100 - 50,offset/3).mousePressed(start).size(100);
  let b = createButton('Pause').position((windowWidth / 2)- 100 - 50,offset/3).mousePressed(stop).size(100);
  let c = createButton('Reset').position((windowWidth / 2)-50,offset/3).mousePressed(reset).size(100);

  sizeInput = createInput().position((windowWidth / 2) - 400,offset/3).size(30).value(size);
  speedInput = createInput().position((windowWidth / 2)+ 400 - 30,offset/3).size(30).value(10);


  frameRate(10);
  script = 0;
  colorMode(HSB);
}

function draw() {
  displayGame();
}

function mousePressed() {
  if (mouseY > offset && mouseY < height && mouseX > 0 && mouseX < width && script == 0) {
    u = floor((mouseX / cubeSize) - xOffset);
    v = floor(((mouseY - offset) / cubeSize) - yOffset);
    if(u > 0 && u < size && v > 0 && v < size) {
        grid[u][v][0] = 1 - grid[u][v][0];
    }
  }
}

function keyPressed(){
  if(keyCode == UP_ARROW){
    yOffset++;
  }
  if(keyCode == LEFT_ARROW){
    xOffset--;
  }
  if(keyCode == RIGHT_ARROW){
    xOffset++;
  }
  if(keyCode == DOWN_ARROW){
    yOffset--;
  }
  if(key == "m"){ //Numpad Substract
    zoom+=2;
    xOffset+=ratio;
    yOffset++;
    cubeSize = (height-offset)/zoom;
  }
  if(key == "p" && zoom > 2){ //Numpad Add
    zoom-=2;
    xOffset-=ratio;
    yOffset--;
    cubeSize = (height-offset)/zoom;
  }
}
