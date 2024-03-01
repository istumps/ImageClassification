import React, { useEffect, useState } from 'react';
import './Home.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState('');
  const [predictions, setPredictions] = useState([]);
  const [jsonData, setJSONData] = useState([]);
  const [parsedPredictions, setParsedPredictions] = useState([]);
  const [loading, setLoading] = useState(false); // State for loading animation
  const [probability, setProbability] = useState(0); // State for probability
  const [showUploadedImage, setShowUploadedImage] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setPredictions([]);
    setParsedPredictions([]);
  };

  const handleUpload = async () => {
    
    if (selectedFile) {
      setLoading(true); // Show loading animation
      const formData = new FormData();
      formData.append('image', selectedFile);

      try {
        const uploadResponse = await fetch('http://localhost:3001/upload', {
          method: 'POST',
          body: formData,
        });

        if (uploadResponse.ok) {
          setUploadMessage('Image uploaded successfully');
          fetchClassificationResults();
          setLoading(false); //
        } else {
          setUploadMessage('Image upload failed');
          setLoading(false); // Hide loading animation on failure
        }
      } catch (error) {
        console.error('Error during image upload:', error);
        setLoading(false); // Hide loading animation on error
      }
      document.body.classList.add('smooth-scroll');

      // Set showUploadedImage to true to make the container visible
      setShowUploadedImage(true);

      // Scroll to the bottom of the page
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',});

    }
  };
  const handleReset = () => {
    setSelectedFile(null);
    setUploadMessage('');
    setPredictions([]);
    setParsedPredictions([]);
    setJSONData([]);
  };

  const fetchClassificationResults = () => {
    setLoading(true); // Show loading animation
    fetch('http://localhost:3001/image_class')
      .then((response) => {
        if (!response.ok) {
          throw Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setJSONData(data);
          setProbability(data[0].probability); // Set probability state
        } else {
          console.error('JSON data is not an array:', data);
        }
      })
      .catch((error) => {
        console.error('Error fetching JSON data:', error);
      });
  };

  return (
    <div className="home-container">
      <h1>AI Image Classifier</h1>
      <p>Loaded Model: TensorFlow MobileNetV2</p>
      <div className="upload-section">
        <h2>Upload Image Here:</h2>
        <p>Allowed file types: .jpeg, .jpg, .png</p>
        <div className="image-container">
          {selectedFile && (
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="Uploaded"
              className="square-image"
            />
          )}
        </div>
        <input type="file" accept=".jpeg, .jpg, .png" onChange={handleFileChange} />
        <div className="buttons">
          <button onClick={handleUpload}>Upload and Classify</button>
          <button onClick={handleReset}>Reset Image</button>
        </div>
        {loading && <div className="loading-animation"></div>} {/* Loading animation */}
      </div>
  
      {jsonData.length > 0 && (
        <div>
          <h3>Classification Results:</h3>
          <div className="classification-progress-bars">
            {jsonData.map((item, index) => (
              <div className="classification-progress-bar" key={index}>
                <div className="progress">
                  <CircularProgressbar
                    value={item.probability * 100}
                    text={`${item.className}`}
                    strokeWidth={3}
                    circleRatio={1}
                    styles={{
                      path: { transform: 'scale(100)' },
                      path: { stroke: '#a05cf4' },
                      text: {
                        fill: '#a05cf4',
                        whiteSpace: 'normal',
                        fontSize: '6.5px',
                        overflow: 'hidden',
                      },
                    }}
                  />
                  <div className="probability-text">
                    {`${(item.probability * 100).toFixed(2)}%`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
  
      {/* Copyright Footer */}
      <footer style={{ textAlign: 'center', backgroundColor: '#16161D', padding: '10px' }}>
        &copy; {new Date().getFullYear()} Isaac Stumps All rights reserved.
      </footer>
    </div>
  );
  
}

export default Home;
