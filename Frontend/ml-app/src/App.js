import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import Home from './Home';
import ImageGallery from './ImageGallery';
import './App.css'

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
               {/* SPACE FOR IMAGE GALLERY */}
            </li>
          </ul>
        </nav>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
      <Route path="/image-gallery" element={<ImageGallery />} /> 
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
