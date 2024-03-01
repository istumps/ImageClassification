const tf = require('@tensorflow/tfjs-node');
const mobilenet = require('@tensorflow-models/mobilenet');
const fs = require('fs').promises;

async function createImageClassificationModel() {
  const model = await mobilenet.load({ version: 2, alpha: 1.0 });
  return model;
}

async function classifyImage(imagePath) {
  const model = await createImageClassificationModel();
  const imageBuffer = await fs.readFile(imagePath);
  const image = tf.node.decodeImage(imageBuffer);
  const predictions = await model.classify(image);
 // console.log(predictions);
  return predictions;
}




module.exports = classifyImage;