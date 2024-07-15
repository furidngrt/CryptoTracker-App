// App.js

import React from 'react';
import './App.css'; // Import your custom CSS here
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS here
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import ContactUs from './pages/ContactUs'; // Import the ContactUs component
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="App d-flex flex-column min-vh-100">
        <Header />
        <div className="content flex-grow-1">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/contact-us" element={<ContactUs />} /> {/* Route for ContactUs */}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
