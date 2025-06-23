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
console.log(products);
  return (
    <Container className="mt-4">
      <Row>
        {products.map(p => (
          <Col key={p.id} md={3}>
            <Card>
              <Card.Img
                src={p.image}
                alt={p.title}
                className="custom-img"
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