// App.js

import React from 'react';
import './App.css'; // Import Bootstrap CSS di sini
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS di sini
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Home />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
