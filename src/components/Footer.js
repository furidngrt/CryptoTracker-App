import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaTwitter, FaDiscord, FaTelegram, FaGithub, FaBitcoin } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <Container>
        <div className="footer-content">
          <div>
            <div className="footer-logo">
              <FaBitcoin className="me-2" />
              CryptoTracker
            </div>
            <p className="mb-3 text-light-50">
              Your trusted source for cryptocurrency<br />
              market data and analytics.
            </p>
          </div>
          
          <Row className="w-100 mt-3 mt-md-0">
            <Col md={4}>
              <h5 className="text-white mb-3">Products</h5>
              <div className="footer-links d-flex flex-column">
                <Link to="/market">Market</Link>
                <Link to="/coins">Coins</Link>
                <Link to="/exchanges">Exchanges</Link>
                <Link to="/trends">Trends</Link>
              </div>
            </Col>
            
            <Col md={4}>
              <h5 className="text-white mb-3">Resources</h5>
              <div className="footer-links d-flex flex-column">
                <Link to="/news">News</Link>
                <Link to="/learn">Learn</Link>
                <Link to="/tools">Tools</Link>
                <Link to="/api">API</Link>
              </div>
            </Col>
            
            <Col md={4}>
              <h5 className="text-white mb-3">Company</h5>
              <div className="footer-links d-flex flex-column">
                <Link to="/about">About Us</Link>
                <Link to="/careers">Careers</Link>
                <Link to="/contact-us">Contact</Link>
                <Link to="/privacy">Privacy Policy</Link>
              </div>
            </Col>
          </Row>
        </div>
        
        <div className="social-icons">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </a>
          <a href="https://discord.com" target="_blank" rel="noopener noreferrer">
            <FaDiscord />
          </a>
          <a href="https://telegram.org" target="_blank" rel="noopener noreferrer">
            <FaTelegram />
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
        </div>
        
        <div className="copyright">
          <p>&copy; {currentYear} CryptoTracker. All rights reserved.</p>
          <small>Cryptocurrency data provided for informational purposes only.</small>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;