let grid = [];
let size = 16;
let step;
let fl = false;
let pfl = false;
let offset = 50;
let script;
let score = 0;
let proba = 0.9;

let allGrids = [];
let allClicks = [];

function setup() {
  canvas = createCanvas(560, 560 + offset).position(windowWidth / 2 - width / 2, windowHeight / 2 - height / 2);
  step = width / size;
  createGrid();
  setInterval(update, 500);
  setInterval(check, 1000);

  let a = createButton('save moves').position(2*windowWidth / 3,offset/3).mousePressed(saveTheMoves);
  let b = createButton('restart').position(windowWidth / 3,offset/3).mousePressed(setup);
  colorMode(HSB);
  Balls.push(new Ball(random(width), random(height), floor(random(200))));
  frameRate(30);
  script = 0;
}

function draw() {
  if (script == 0) {
    displayGame();
  } else if (script == 1) {
    Victory();
  } else if (script == 2) {
    Defeat();
  }
}

function saveTheMoves(){
  createStringDict(allGrids).saveJSON('To train:Input');
  createStringDict(allClicks).saveJSON('To train:Output');
}

function format(A){
  let B = []
  for (let i = 0; i < A.length; i++) {
    for (let j = 0; j < A[i].length; j++) {
      if(A[i][j][1] == 1){
      	B.push(A[i][j][0]);
      }
      else{
        B.push(-2);
      }
    }
  }
  return B;
}

function update() {
  canvas.position(windowWidth / 2 - width / 2, windowHeight / 2 - height / 2);
}

// let sstart = 0;
// let mstart = 0;



function mousePressed() {
  // sstart = second();
  // mstart = minute();
  if (mouseY > offset && mouseY < height && mouseX > 0 && mouseX < width) {
    u = floor(mouseX / step);
    v = floor((mouseY - offset) / step);
    if (grid[u][v][2] != 1) {
      grid[u][v][1] = 1;
      score += 10;
      if (grid[u][v][0] == -1) {
        script = 2;
      } else
      if (grid[u][v][0] == 0) {
        expandFrom(u, v);
      }
      allGrids.push(format(grid));
      allClicks.push([u,v]);
    }
    //console.log(grid[floor(mouseX / step)][floor((mouseY - offset) / step)][0]);
  }

}

// function mouseReleased(){
//   let send = second();
//   let mend = minute();
//   let delta = 60 * (mend - mstart) + send - sstart;
//   if (mouseY > offset && mouseY < height && mouseX > 0 && mouseX < width && delta < 0.3) {
//     let u = floor(mouseX / step);
//     let v = floor((mouseY - offset) / step)
//     grid[u][v][1] = 1;
//     if(grid[u][v][0] == -1){
//       script = 2;
//     }
//     else
//     if(grid[u][v][0] == 0){
//       expandFrom(u,v);
//     }

//     //console.log(grid[floor(mouseX / step)][floor((mouseY - offset) / step)][0]);
//   } else if(mouseY > offset && mouseY < height && mouseX > 0 && mouseX < width && delta > 0.3 && delta < 1){
//     let u = floor(mouseX / step);
//     let v = floor((mouseY - offset) / step);
//     if(grid[u][v][1] == 1){
//       return
//     }
//      if(grid[u][v][0] != -1){
//       script = 2;
//     }
//     grid[u][v][1] = 1;
//     grid[u][v][0] = -2;
//     }

// }

function keyPressed(event) {
  if (mouseY > offset && mouseY < height && mouseX > 0 && mouseX < width && keyCode === UP_ARROW) {
    u = floor(mouseX / step);
    v = floor((mouseY - offset) / step);
    if (grid[u][v][1] == 0) {
      if (grid[u][v][2] == 1) {
        grid[u][v][2] = 0;
      } else {
        grid[u][v][2] = 1;
      }
    }
  }
}
