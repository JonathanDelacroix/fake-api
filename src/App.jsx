import { useEffect, useState } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(data);
    }

    fetchProducts();
  }, []);

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        {products.map(p => (
          <Col key={p.id} md={3} className="mb-4 d-flex flex-column">
            <Card className="flex-grow-1">
              <Card.Img
                variant="top"
                src={p.image}
                style={{ height: '200px', objectFit: 'contain' }}
              />
              <Card.Body>
                <Card.Title>{p.title}</Card.Title>
                <Card.Text>{p.description} €</Card.Text>
                <Card.Text>{p.price} €</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;