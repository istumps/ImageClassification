// upload.js
const multer = require('multer');

// Define storage settings for uploaded images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Set destination directory for uploaded images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Set filename for the uploaded image
  },
});

const upload = multer({ storage });

module.exports = upload;