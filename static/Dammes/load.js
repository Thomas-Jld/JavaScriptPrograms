let pictures;
let pieces = [];
let echiquier = [];

function preload() {
  pictures = [[loadImage("/static/Dammes/images/BPawn.png"),loadImage("/static/Dammes/images/WPawn.png")]];
  for (let i = 0; i < 8; i++) {
    echiquier.push([0, 0, 0, 0, 0, 0, 0, 0]);
  }
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j<4;j++){
    echiquier[i][2*j+0.5+0.5*Math.pow(-1,i)] = new Pawn(i, 2*j+0.5+0.5*Math.pow(-1,i), 1,pictures[0][1]);
    }
  }
  for (let i = 5; i < 8; i++) {
    for (let j = 0; j<4;j++){
    echiquier[i][2*j+0.5+0.5*Math.pow(-1,i)] = new Pawn(i, 2*j+0.5+0.5*Math.pow(-1,i), 0,pictures[0][0]);
    }
  }
  console.log(echiquier);
  allBoards.push(echiquier);
}//tirexo