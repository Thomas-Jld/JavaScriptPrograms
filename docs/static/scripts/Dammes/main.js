let canvas;
let size = 640;
let step = size / 8;
let offset = 100;

let turn = 1;
let colorTurn = 1;
let selected = false;

let allBoards = [];

function setup() {
  canvas = createCanvas(size, size + offset);
  canvas.position(0, 0);
  frameRate(5);
}


function draw() {
  background(100);
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      noStroke();
      fill(127 + 50 * Math.pow(-1, i) * Math.pow(-1, j));
      rect(i * step, j * step + offset, (i + 1) * step, (j + 1) * step + offset);
    }
  }
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (echiquier[i][j] != 0) {
        show(echiquier[i][j]);
      }
    }
  }
}

let xC;
let yC;

function mousePressed() {
  if (mouseX > 0 && mouseX < offset && mouseY > 0 && mouseY < offset) {
    fullscreen(fullscreen);
  }
  if (!selected) {
    if (mouseX >= 0 && mouseX < size && mouseY >= offset && mouseY < offset + size) {
      xC = floor(mouseX / step);
      yC = floor((mouseY - offset) / step);
      if (echiquier[yC][xC] != 0) {
        if (echiquier[yC][xC].col == colorTurn) {
          echiquier[yC][xC].col = 0.5;
          selected = true;
        }
      }
    }
  } else {
    let nxC = floor(mouseX / step);
    let nyC = floor((mouseY - offset) / step);
    echiquier[yC][xC].col = colorTurn;
    let P = echiquier[yC][xC].possibilities();
    if (moveable([nxC, nyC], P)) {
      move([xC, yC], [nxC, nyC]);
    }
    selected = false;
  }
}

function moveable(L, A) {
  for (let i = 0; i < A.length; i++) {
    if (A[i][0] == L[0] && A[i][1] == L[1]) {
      return true;
    }
  }
  return false;
}

function move(A, B) {
  echiquier[B[1]][B[0]] = echiquier[A[1]][A[0]];
  echiquier[A[1]][A[0]] = 0;
  echiquier[B[1]][B[0]].x = B[0];
  echiquier[B[1]][B[0]].y = B[1];
  echiquier[B[1]][B[0]].moves++;
  endTurn();
}

function enEchec(L) {
  for (let i = 0; i <= 7; i++) {
    for (let j = 0; j <= 7; j++) {
      if (echiquier[j][i].col == 1 - echiquier[L[1]][L[0]].col) {
        let a = echiquier[j][i].possibilities();
        for (let k = 0; k < a.length; k++) {
          if (a[k] == L) {
            return true
          }
        }
      }
    }
  }
}

function endTurn() {
  turn++;
  colorTurn = turn % 2;
  //trainAI();
}