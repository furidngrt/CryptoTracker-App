import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner, Pagination, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);

  const fetchData = () => {
    setLoading(true);
    axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
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

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000); // Update every 60 seconds
    return () => clearInterval(interval);
  }, [page]);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFavoriteToggle = (crypto) => {
    const updatedFavorites = favorites.includes(crypto.id)
      ? favorites.filter(fav => fav !== crypto.id)
      : [...favorites, crypto.id];

    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const filteredCryptos = cryptos.filter(crypto =>
    crypto.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isFavorite = (id) => favorites.includes(id);

  return (
    <Container className="mt-4">
      <div className="search-container">
        <Form.Control
          type="text"
          placeholder="Search Crypto..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <>
          <Row xs={1} md={2} lg={3} className="g-4">
            {filteredCryptos.map((crypto) => (
              <Col key={crypto.id} className="mb-4">
                <Card className={crypto.price_change_percentage_24h >= 0 ? 'card-gainer' : 'card-loser'}>
                  <Card.Img variant="top" src={crypto.image} alt={crypto.name} className="card-img-top" />
                  <Card.Body>
                    <Card.Title>{crypto.name}</Card.Title>
                    <Card.Text>
                      <span className="crypto-price">Price: ${crypto.current_price}</span>
                      <br />
                      <span className="crypto-market-cap">Market Cap: ${crypto.market_cap}</span>
                      <br />
                      <span className={`crypto-change ${crypto.price_change_percentage_24h >= 0 ? 'up' : 'down'}`}>
                        24h Change: {crypto.price_change_percentage_24h.toFixed(2)}%
                      </span>
                    </Card.Text>
                    <Button
                      variant={isFavorite(crypto.id) ? 'danger' : 'primary'}
                      onClick={() => handleFavoriteToggle(crypto)}
                    >
                      {isFavorite(crypto.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <Pagination className="justify-content-center mt-4">
            <Pagination.First onClick={() => handlePageChange(1)} disabled={page === 1} />
            <Pagination.Prev onClick={() => handlePageChange(page - 1)} disabled={page === 1} />
            {[...Array(totalPages).keys()].map(number => (
              <Pagination.Item key={number + 1} active={number + 1 === page} onClick={() => handlePageChange(number + 1)}>
                {number + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next onClick={() => handlePageChange(page + 1)} disabled={page === totalPages} />
            <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={page === totalPages} />
          </Pagination>
        </>
      )}
    </Container>
  );
};

export default Home;
