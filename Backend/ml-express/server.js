  const express = require('express');
  const cors = require('cors');
  const app = express();
  const upload = require('./upload'); // Import the multer middleware configuration
  const db = require('./db'); 
  const imageRoutes = require('./imageRoutes'); // Import the imageRoutes
  const classifyImage = require('./image_class'); 
  const mobilenet = require('@tensorflow-models/mobilenet');


  const router = express.Router();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/images', imageRoutes);
  app.use(cors());


  // Handle POST requests to upload images
  let storedPredictions = null; // Variable to store predictions
  // Load the MobileNet model on startup
  (async () => {
    model = await mobilenet.load();
  })();

  app.post('/upload', upload.single('image'), async (req, res) => {
    // Check if a file was uploaded
    const imagePath = req.file.path;

    const predictions = await classifyImage(imagePath);
    storedPredictions = predictions
    console.log(predictions)
    res.json(predictions)
   // console.log("yo")
  
  });

  app.get('/image_class', async (req, res) => {
    // Assuming predictions is an array of classification results
    
    const predictions = storedPredictions; 
    res.json(predictions);
  });



  // Start Express server
  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
