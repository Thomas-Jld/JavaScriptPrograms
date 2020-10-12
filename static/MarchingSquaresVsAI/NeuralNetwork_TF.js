const nn2 = tf.sequential();
const learningRate = .02;
let nbOfEpochs = 20;

function InitTfModel(){

	const optimizer = tf.train.adam(learningRate);

	nn2.add(tf.layers.dense({units: 10, activation: 'sigmoid', inputShape: [4]}));
	nn2.add(tf.layers.dense({units: 16, activation: 'softmax'}));

	nn2.compile({
		optimizer: optimizer, loss: 'categoricalCrossentropy', metrics: ['accuracy']
	});
}

async function TrainTfModel(){

	console.log("Training TF model");
	frameRate(0);

	let tfInputData = [];
	let tfOutputData = [];

	data.forEach(item => {
		tfInputData.push([item.input1, item.input2, item.input3, item.input4]);
		tfOutputData.push(int(item.label))
  	});

	let inputs = tf.tensor2d(tfInputData, [data.length, 4]);
	let outputs = tf.oneHot(tf.tensor1d(tfOutputData).toInt(), 16);

	await nn2.fit(inputs, outputs, {
		epochs: nbOfEpochs,
		callbacks: {
			onEpochEnd: whileTrainingTfModel,
		}
	});

	nbOfEpochs = 5;
	ready = true;
	frameRate(60);
	console.log('Done training TF model!');
}

function whileTrainingTfModel(epoch, logs){

	noStroke();
	fill(100);
	rect(0,0,60,40);

	textAlign(CENTER);
	textSize(32);
	fill(255);
	text(epoch, 30 , 30);
	console.log(logs);
}
