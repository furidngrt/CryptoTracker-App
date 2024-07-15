import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner, Button } from 'react-bootstrap';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // State untuk halaman saat ini
  const perPage = 15; // Jumlah item per halaman

  useEffect(() => {
    setLoading(true);
    axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: perPage,
        page: page,
        sparkline: false,
      },
    })
    .then(response => {
      setCryptos(response.data);
      setLoading(false);
    })
    .catch(error => {
      console.error(error);
      setLoading(false);
    });
  }, [page]); // Tambahkan `page` sebagai dependensi

  const handleNextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1);
    }
  };

  return (
    <Container className="mt-4">
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <>
          <Row xs={1} md={2} lg={3} className="g-4 custom-row">
            {cryptos.map((crypto) => (
              <Col key={crypto.id} className="custom-col">
                <Card className="custom-card">
                  <Card.Body>
                    <Card.Title className="crypto-name">{crypto.name}</Card.Title>
                    <Card.Text>
                      <span className="price">Price: ${crypto.current_price}</span>
                      <br />
                      <span className="market-cap">Market Cap: ${crypto.market_cap}</span>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <div className="d-flex justify-content-between mt-4">
            <Button variant="primary" onClick={handlePreviousPage} disabled={page === 1}>
              Previous
            </Button>
            <Button variant="primary" onClick={handleNextPage}>
              Next
            </Button>
          </div>
        </>
      )}
    </Container>
  );
};

export default Home;
