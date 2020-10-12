function createGrid() {
  newgrid = [];
  score = 0;
  for (let i = 0; i < size; i++) {
    newgrid.push([])
    for (let j = 0; j < size; j++) {
        newgrid[i].push(0);
    }
  }
  return newgrid;
}
