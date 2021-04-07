class Pawn {
  constructor(x, y, col, pic) {
    this.x = x;
    this.y = y;
    this.col = col;
    this.moves = 0;
    this.value = 3;
    this.pic = pic;
  }

  possibilities() {
    let L = [];
    let i = this.x + 1;
    let j = this.y + 1;
    while (i <= 7 && j <= 7 && echiquier[j][i].col != this.col) {
      L.push([i, j]);
      if (echiquier[j][i].col == 1 - this.col) {
        break;
      }
      i++;
      j++;
    }
    i = this.x - 1;
    j = this.y + 1;
    while (i >= 0 && j <= 7 && echiquier[j][i].col != this.col) {
      L.push([i, j]);
      if (echiquier[j][i].col == 1 - this.col) {
        break;
      }
      i--;
      j++;
    }
    i = this.x + 1;
    j = this.y - 1;
    while (i <= 7 && j >= 0 && echiquier[j][i].col != this.col) {
      L.push([i, j]);
      if (echiquier[j][i].col == 1 - this.col) {
        break;
      }
      i++;
      j--;
    }
    i = this.x - 1;
    j = this.y - 1;
    while (i >= 0 && j >= 0 && echiquier[j][i].col != this.col) {
      L.push([i, j]);
      if (echiquier[j][i].col == 1 - this.col) {
        break;
      }
      i--;
      j--;
    }

    return L;
  }
}



function show(a) {
  if (a == 0) {
    return
  }
  push();
  noStroke();
  fill(a.col);
  image(a.pic, a.y * step, a.x * step + offset, step, step);
  pop();
}