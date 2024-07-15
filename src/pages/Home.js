import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner, Pagination } from 'react-bootstrap';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 15, // Number of items per page
        page: page,
        sparkline: false,
      },
    })
    .then(response => {
      setCryptos(response.data);
      // Assuming there are around 7300 cryptocurrencies
      const totalCryptos = 7300;
      setTotalPages(Math.ceil(totalCryptos / 15)); // Calculate total pages
      setLoading(false);
    })
    .catch(error => {
      console.error(error);
      setLoading(false);
    });
  }, [page]);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <Container className="mt-4">
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <>
          <Row xs={1} md={2} lg={3} className="g-4">
            {cryptos.map((crypto) => (
              <Col key={crypto.id}>
                <Card>
                  <Card.Img variant="top" src={crypto.image} alt={crypto.name} className="card-img-top" />
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
