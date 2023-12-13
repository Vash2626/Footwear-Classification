import * as tf from '@tensorflow/tfjs';

async function loadModel() {
 const modelUrl = 'Users/VASHIST/OneDrive/Desktop/MyProject/mymodel.onnx';
 const model = await tf.loadGraphModel(modelUrl);
 return model;
}

async function runModel(model, inputTensor) {
 const outputTensor = await model.execute(inputTensor);
 return outputTensor;
}

(async function main() {
 const model = await loadModel();
 const inputTensor = tf.tensor(Float32Array.from([/* your input data */]), [1, 3, 60, 60]); // or your model's expected input size
 const outputTensor = await runModel(model, inputTensor);
 console.log('Model output:', outputTensor.dataSync());
})();
