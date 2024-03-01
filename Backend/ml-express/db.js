/*
/ db.js

const mongoose = require('mongoose');

// Define your MongoDB connection URL. You can replace 'your-database-uri' with your actual MongoDB connection URI.
const dbURI = 'mongodb://localhost:27017/db';

// Set up options for the MongoDB connection (optional).
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Connect to the MongoDB database using Mongoose.
mongoose.connect(dbURI, options);

// Get the default connection.
const db = mongoose.connection;

// Set up event listeners for the database connection.

// When successfully connected
db.on('connected', () => {
  console.log(`Mongoose connected to ${dbURI}`);
});

// When connection throws an error
db.on('error', (err) => {
  console.error(`Mongoose connection error: ${err}`);
});

// When the database connection is disconnected
db.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// When the Node process ends, close the database connection
process.on('SIGINT', () => {
  db.close(() => {
    console.log('Mongoose disconnected through app termination');
    process.exit(0);
  });
});

module.exports = db;
*/