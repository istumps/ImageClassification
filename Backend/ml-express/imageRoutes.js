const express = require('express');
const router = express.Router();
const Image = require('./imageModel'); // Import the Image model

const tf = require('@tensorflow/tfjs-node');
const mobilenet = require('@tensorflow-models/mobilenet');
const fs = require('fs').promises;

// Create an instance of the MobileNet model
let model;

// Load the MobileNet model on startup
(async () => {
  model = await mobilenet.load();
})();

// Route for uploading an image
router.post('/upload', async (req, res) => {
  try {
    const { fileName, userId, description, imageBuffer } = req.body;
    const newImage = new Image({
      fileName,
      userId,
      description,
      imageData: imageBuffer,
    });

    newImage.save(async (err, savedImage) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Image upload failed' });
      } else {
        console.log('Image saved:', savedImage);
        
       
        const imagePath = savedImage.path; 
        const classifyResponse = await fetch('http://localhost:3001/classify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ imagePath }),
        });

        if (classifyResponse.ok) {
          const data = await classifyResponse.json();
          res.json({ message: 'Image uploaded successfully', predictions: data.predictions });
        } else {
          console.error('Image classification failed');
          res.status(500).json({ error: 'Image classification failed' });
        }
      }
    });
  } catch (error) {
    console.error('Error during image upload:', error);
    res.status(500).json({ error: 'Image upload failed' });
  }
});



// Route for image classification
router.post('/image_class', async (req, res) => {
  try {
    const { imagePath } = req.body; // You should provide the path to the saved image here
    const imageBuffer = await fs.readFile(imagePath);
    const image = tf.node.decodeImage(imageBuffer);
    const predictions = await model.classify(image);
    res.json({ predictions });
    console.log(predictions)
  } catch (error) {
    console.error('Error during image classification:', error);
    res.status(500).json({ error: 'Image classification failed' });
  }
});


// Route for image classification

// Add more routes for other image-related operations, if needed.

module.exports = router;
