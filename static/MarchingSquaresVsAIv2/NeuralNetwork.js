
let nn;

function InitMl5Model(){

  let options = {
    inputs: ['input1','input2','input3','input4'],
    outputs: ['label'],
    task: 'classification',
    hiddenUnits: 64,
    
  }
  // const options = {
  //   task: 'classification',
  //   layers: [
  //     {
  //       type: 'dense',
  //       units: 16,
  //       activation: 'sigmoid'
  //     },
  //     {
  //       type: 'dense',
  //       units: 16,
  //       activation: 'sigmoid'
  //     },
  //     {
  //       type: 'dense',
  //       activation: 'softmax'
  //     }
  //   ],
  //   inputs: ['input1','input2','input3','input4'],
  //   outputs: ['label'],
  // };
  nn = ml5.neuralNetwork(options);
  console.log(nn);
  return
}


function TrainMl5Model(){
  //trained = true;
  console.log("training");
  frameRate(0);

  data.forEach(item => {
    let inputs = {
      input1: item.input1, 
      input2: item.input2, 
      input3: item.input3, 
      input4: item.input4, 
    };
    let output = {
      label: item.label
    };
    nn.addData(inputs, output);
  });

  data = [];

  nn.normalizeData();

  let trainingOptions = {
    epochs: 10
  }

  nn.train(trainingOptions, whileTrainingMl5Model, finishedTrainingMl5Model);


}



function whileTrainingMl5Model(epoch, loss){
  noStroke();
  fill(100);
  rect(0,0,40,40);
  textSize(32);
  fill(255);
  text(epoch, 10 , 30);
}

function finishedTrainingMl5Model(){
  ready = true;
  frameRate(60);
  console.log('done !');
}

