import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner, Pagination, Form, Button, Dropdown, DropdownButton, Badge } from 'react-bootstrap';
import { FaSun, FaMoon, FaStar, FaRegStar, FaSearch, FaChartLine, FaChartBar, FaSortAmountDown } from 'react-icons/fa';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);
  const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem('darkMode')) || false);
  const [sortOption, setSortOption] = useState('market_cap_desc');
  const [topGainers, setTopGainers] = useState([]);
  const [topLosers, setTopLosers] = useState([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  useEffect(() => {
    fetchData();
    fetchTopGainersAndLosers();
    const interval = setInterval(fetchData, 60000); // Update every 60 seconds
    return () => clearInterval(interval);
  }, [page, sortOption]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const fetchData = () => {
    setLoading(true);
    axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd',
        order: sortOption,
        per_page: 15,
        page: page,
        sparkline: false,
      },
    })
    .then(response => {
      setCryptos(response.data);
      setTotalPages(Math.ceil(120 / 15)); // Assume there are 120 items, adjust as needed
      setLoading(false);
    })
    .catch(error => {
      console.error(error);
      setLoading(false);
    });
  };

  const fetchTopGainersAndLosers = () => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd',
        order: 'price_change_percentage_24h_desc',
        per_page: 5,
        page: 1,
      },
    })
    .then(response => {
      setTopGainers(response.data);
    })
    .catch(error => {
      console.error(error);
    });

    axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd',
        order: 'price_change_percentage_24h_asc',
        per_page: 5,
        page: 1,
      },
    })
    .then(response => {
      setTopLosers(response.data);
    })
    .catch(error => {
      console.error(error);
    });
  };

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFavoriteToggle = (crypto) => {
    const updatedFavorites = favorites.includes(crypto.id)
      ? favorites.filter(fav => fav !== crypto.id)
      : [...favorites, crypto.id];

    setFavorites(updatedFavorites);
  };

  const handleSortChange = (sortKey) => {
    setSortOption(sortKey);
  };

  const toggleFavoritesOnly = () => {
    setShowFavoritesOnly(!showFavoritesOnly);
  };

  const formatMarketCap = (marketCap) => {
    if (marketCap >= 1e12) return `$${(marketCap / 1e12).toFixed(2)}T`;
    if (marketCap >= 1e9) return `$${(marketCap / 1e9).toFixed(2)}B`;
    if (marketCap >= 1e6) return `$${(marketCap / 1e6).toFixed(2)}M`;
    return `$${marketCap.toLocaleString()}`;
  };

  const formatPrice = (price) => {
    if (price < 0.01) return `$${price.toFixed(6)}`;
    if (price < 1) return `$${price.toFixed(4)}`;
    if (price < 1000) return `$${price.toFixed(2)}`;
    return `$${price.toLocaleString()}`;
  };

  const filteredCryptos = cryptos.filter(crypto =>
    crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(crypto => !showFavoritesOnly || favorites.includes(crypto.id));

  const isFavorite = (id) => favorites.includes(id);

  const renderTopMovers = (cryptoList, isGainer) => {
    return (
      <Row className="g-2">
        {cryptoList.map((crypto) => (
          <Col key={crypto.id} xs={12}>
            <Card className="top-mover-card">
              <Card.Body className="p-2">
                <div className="d-flex align-items-center">
                  <img 
                    src={crypto.image} 
                    alt={crypto.name} 
                    className="top-mover-img me-2" 
                  />
                  <div className="top-mover-info">
                    <div className="top-mover-name">{crypto.symbol.toUpperCase()}</div>
                    <Badge bg={isGainer ? "success" : "danger"} className="mt-1">
                      {isGainer ? "+" : ""}{crypto.price_change_percentage_24h?.toFixed(2)}%
                    </Badge>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    );
  };

  const getSortIcon = () => {
    if (sortOption === 'market_cap_desc') return <FaChartBar />;
    if (sortOption === 'volume_desc') return <FaChartLine />;
    return <FaSortAmountDown />;
  };

  return (
    <Container className="py-4 main-container">
      <div className="dashboard-header mb-4">
        <h1 className="dashboard-title">Crypto Dashboard</h1>
        <div className="dashboard-controls">
          <Button 
            variant={darkMode ? "light" : "dark"} 
            className="mode-toggle me-2" 
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </Button>
          <Button
            variant={showFavoritesOnly ? "warning" : "outline-warning"}
            className="favorites-toggle me-2"
            onClick={toggleFavoritesOnly}
          >
            <FaStar /> {showFavoritesOnly ? "All" : "Favorites"}
          </Button>
          <DropdownButton 
            id="sort-dropdown" 
            title={<span><span className="me-2">{getSortIcon()}</span>Sort</span>} 
            variant="outline-primary"
          >
            <Dropdown.Item onClick={() => handleSortChange('market_cap_desc')}>Market Cap</Dropdown.Item>
            <Dropdown.Item onClick={() => handleSortChange('volume_desc')}>Volume</Dropdown.Item>
            <Dropdown.Item onClick={() => handleSortChange('price_change_percentage_24h_desc')}>24h Change</Dropdown.Item>
          </DropdownButton>
        </div>
      </div>

      <div className="search-container">
        <div className="search-input-wrapper">
          <FaSearch className="search-icon" />
          <Form.Control
            type="text"
            placeholder="Search by name or symbol..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>
      </div>

      <Row>
        <Col lg={9}>
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" role="status" variant="primary">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
              <p className="mt-2">Loading crypto data...</p>
            </div>
          ) : (
            <>
              {filteredCryptos.length === 0 ? (
                <div className="no-results">
                  <h3>No cryptocurrencies found</h3>
                  <p>Try adjusting your search criteria or filters</p>
                </div>
              ) : (
                <Row xs={1} md={2} lg={3} className="g-4">
                  {filteredCryptos.map((crypto) => (
                    <Col key={crypto.id} className="mb-4">
                      <Card className="crypto-card">
                        <div className="card-header-row">
                          <Card.Img variant="top" src={crypto.image} alt={crypto.name} className="card-img-top" />
                          <Button
                            variant="link"
                            className={`favorite-btn ${isFavorite(crypto.id) ? 'favorited' : ''}`}
                            onClick={() => handleFavoriteToggle(crypto)}
                          >
                            {isFavorite(crypto.id) ? <FaStar /> : <FaRegStar />}
                          </Button>
                        </div>
                        <Card.Body>
                          <Card.Title className="d-flex align-items-center">
                            {crypto.name}
                            <span className="ms-2 text-muted crypto-symbol">{crypto.symbol.toUpperCase()}</span>
                          </Card.Title>
                          <div className="crypto-info">
                            <div className="crypto-price-row">
                              <span className="price-label">Price:</span>
                              <span className="crypto-price">{formatPrice(crypto.current_price)}</span>
                            </div>
                            <div className="crypto-market-cap-row">
                              <span className="market-cap-label">Market Cap:</span>
                              <span className="crypto-market-cap">{formatMarketCap(crypto.market_cap)}</span>
                            </div>
                            <div className="crypto-change-row">
                              <span className="change-label">24h:</span>
                              <span className={`crypto-change ${crypto.price_change_percentage_24h >= 0 ? 'up' : 'down'}`}>
                                {crypto.price_change_percentage_24h >= 0 ? '+' : ''}{crypto.price_change_percentage_24h?.toFixed(2)}%
                              </span>
                            </div>
                          </div>
                          <Button
                            variant="outline-primary"
                            className="details-btn mt-3 w-100"
                            onClick={() => window.open(`https://www.coingecko.com/en/coins/${crypto.id}`, '_blank')}
                          >
                            View Details
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              )}
              
              <Pagination className="justify-content-center mt-4">
                <Pagination.First onClick={() => handlePageChange(1)} disabled={page === 1} />
                <Pagination.Prev onClick={() => handlePageChange(page - 1)} disabled={page === 1} />
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (page <= 3) {
                    pageNum = i + 1;
                  } else if (page >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = page - 2 + i;
                  }
                  return (
                    <Pagination.Item 
                      key={pageNum} 
                      active={pageNum === page} 
                      onClick={() => handlePageChange(pageNum)}
                    >
                      {pageNum}
                    </Pagination.Item>
                  );
                })}
                <Pagination.Next onClick={() => handlePageChange(page + 1)} disabled={page === totalPages} />
                <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={page === totalPages} />
              </Pagination>
            </>
          )}
        </Col>
        
        <Col lg={3}>
          <div className="top-movers-section">
            <Card className="top-movers-card">
              <Card.Header>
                <h4 className="top-movers-title">Top Gainers <Badge bg="success">24h</Badge></h4>
              </Card.Header>
              <Card.Body>
                {topGainers.length > 0 ? renderTopMovers(topGainers, true) : <Spinner animation="border" size="sm" />}
              </Card.Body>
            </Card>

            <Card className="top-movers-card mt-4">
              <Card.Header>
                <h4 className="top-movers-title">Top Losers <Badge bg="danger">24h</Badge></h4>
              </Card.Header>
              <Card.Body>
                {topLosers.length > 0 ? renderTopMovers(topLosers, false) : <Spinner animation="border" size="sm" />}
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;