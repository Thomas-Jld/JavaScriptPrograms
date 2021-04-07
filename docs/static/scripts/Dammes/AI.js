let allBoards = [];
let data;
const Bob = tf.sequential();
const configHidden = {
  units: 64,
  inputShape : [8,8],
  activation:'sigmoid'
}
const hidden = tf.layers.dense(configHidden);
const configOutput = {
  units: 64,
  activation:'sigmoid'
}
const output = tf.layers.dense(configOutput);
Bob.add(hidden);
Bob.add(output);

function trainAI(){
	let rawBoard = [];
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (echiquier[i][j].value) {
        rawBoard.push(echiquier[i][j].value);
      } else {
        rawBoard.push(0);
      }
    }
  }
  data = tf.tensor2d(rawBoard, [8,8],'int32');
  data.print();  
}