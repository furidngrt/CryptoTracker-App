import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Form, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { FaSearch, FaBitcoin, FaChevronDown } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  // Effect untuk deteksi scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Cek apakah path saat ini aktif
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <Navbar 
      bg="dark" 
      variant="dark" 
      expand="lg" 
      sticky="top"
      className={scrolled ? 'navbar scrolled' : 'navbar'}
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          <FaBitcoin className="me-2" /> CryptoTracker
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <div className="search-container ms-auto me-auto">
            <Form className="position-relative">
              <Form.Control
                type="text"
                placeholder="Search for cryptocurrencies..."
                className="search-input"
              />
              <FaSearch className="search-icon" />
            </Form>
          </div>
          
          <Nav className="ms-auto">
            <Nav.Link 
              as={Link} 
              to="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
            >
              Home
            </Nav.Link>
            
            <Nav.Link 
              as={Link} 
              to="/market" 
              className={`nav-link ${isActive('/market') ? 'active' : ''}`}
            >
              Market
            </Nav.Link>
            
            <div className="nav-item dropdown">
              <Nav.Link 
                className="nav-link dropdown-toggle"
                id="resourcesDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Resources <FaChevronDown className="ms-1" style={{ fontSize: '0.8rem' }} />
              </Nav.Link>
              <ul className="dropdown-menu" aria-labelledby="resourcesDropdown">
                <li><Link className="dropdown-item" to="/news">News</Link></li>
                <li><Link className="dropdown-item" to="/learn">Learn</Link></li>
                <li><Link className="dropdown-item" to="/tools">Tools</Link></li>
              </ul>
            </div>
            
            <Nav.Link 
              as={Link} 
              to="/contact-us" 
              className={`nav-link ${isActive('/contact-us') ? 'active' : ''}`}
            >
              Contact Us
            </Nav.Link>
          </Nav>
          
          <Button 
            variant="outline-light" 
            className="ms-lg-3 mt-3 mt-lg-0"
            style={{ 
              borderColor: '#61dafb', 
              color: '#61dafb',
              transition: 'all 0.3s'
            }}
          >
            Sign In
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;