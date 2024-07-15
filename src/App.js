import React from 'react';
import './App.css'; // Impor CSS khusus Anda di sini
import 'bootstrap/dist/css/bootstrap.min.css'; // Impor Bootstrap CSS di sini
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import ContactUs from './pages/ContactUs'; 
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="App d-flex flex-column min-vh-100">
        <Header />
        <div className="content flex-grow-1">
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
