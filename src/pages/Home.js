import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import axios from 'axios';
import './Home.css'; // Pastikan file ini ada dan mengandung CSS yang diperlukan

const Home = () => {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 15,
        page: 1,
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
  }, []);

  return (
    <Container className="mt-4">
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {cryptos.map((crypto) => (
            <Col key={crypto.id}>
              <Card>
                <Card.Img variant="top" src={crypto.image} alt={crypto.name} />
                <Card.Body>
                  <Card.Title>{crypto.name}</Card.Title>
                  <Card.Text>
                    Price: ${crypto.current_price}
                    <br />
                    Market Cap: ${crypto.market_cap}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Home;
