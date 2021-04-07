let startUpdate;

function start(){
  if(script == 0){
    if(speedInput.value() != ""){
      startUpdate = setInterval(update, 1000/int(speedInput.value()));
    }
    else{
      startUpdate = setInterval(update, 100);
    }
  }
  script = 1;
}

function stop(){
  clearInterval(startUpdate);
  script = 0;
}

function reset(){
  stop();
  grid = createGrid();
}

function update(){
  let c = 0;
  let newGrid = createGrid();
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length ; j++) {
        c = count(grid,i,j);
        if (c < 2 || c >= 4){
          newGrid[i][j][0] = 0;
        }else if (c == 2 && grid[i][j][0] == 1){
          newGrid[i][j][0] = 1;
          newGrid[i][j][1] = grid[i][j][1] + 4;
        }
        else if (c == 3){
          newGrid[i][j][0] = 1;
          if(grid[i][j][0] == 1){
            newGrid[i][j][1] = grid[i][j][1] + 4;
          }
        }
    }
  }
  grid = newGrid;
}

function count(grid,i,j){
  let c = 0;
  if (i - 1 >= 0 && j - 1 >= 0) {
    if (grid[i - 1][j - 1][0] == 1) {
      c++;
    }
  }
  if (i - 1 >= 0 && j >= 0) {
    if (grid[i - 1][j][0] == 1) {
      c++;
    }
  }
  if (i - 1 >= 0 && j + 1 < grid[0].length) {
    if (grid[i - 1][j + 1][0] == 1) {
      c++;
    }
  }
  if (i >= 0 && j - 1 >= 0) {
    if (grid[i][j - 1][0] == 1) {
      c++;
    }
  }
  if (i >= 0 && j + 1 < grid[0].length) {
    if (grid[i][j + 1][0] == 1) {
      c++;
    }
  }
  if (i + 1 < grid.length && j - 1 >= 0) {
    if (grid[i + 1][j - 1][0] == 1) {
      c++;
    }
  }
  if (i + 1 <grid.length && j >= 0) {
    if (grid[i + 1][j][0] == 1) {
      c++;
    }
  }
  if (i + 1 < grid.length && j + 1 < grid[0].length) {
    if (grid[i + 1][j + 1][0] == 1) {
      c++;
    }
  }
  return c;
}



function displayGame() {
  background(0,50);
  fill(255);
  textSize(50);
  text(score, width - 60, offset-5);
  text(script, 10, offset-5);
  noStroke();
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if(grid[i] != undefined && grid[i][j][0] != undefined && grid[i][j][0] == 1){
        fill(20 + grid[i][j][1], 255, 255);
        rect((i + xOffset) * cubeSize, (j + yOffset) * cubeSize + offset, cubeSize, cubeSize);
      }
    }
  }
  stroke(255);
  strokeWeight(cubeSize/10);
  line(xOffset * cubeSize, yOffset * cubeSize + offset, (xOffset + size) * cubeSize, yOffset * cubeSize + offset)
  line(xOffset * cubeSize, yOffset * cubeSize + offset, xOffset * cubeSize, (yOffset + size) * cubeSize + offset)
  line((xOffset + size) * cubeSize, (yOffset + size) * cubeSize + offset, xOffset * cubeSize, (yOffset + size) * cubeSize + offset)
  line((xOffset + size) * cubeSize, (yOffset + size) * cubeSize + offset, (xOffset + size) * cubeSize, yOffset * cubeSize + offset)

}
