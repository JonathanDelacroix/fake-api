import { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';

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

  const handleAddProduct = async () => {
    const response = await fetch('https://fakestoreapi.com/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: 'Ordinateur Apple',
        price: 8.99,
        description: 'Un ordianteur de la marque APPLE',
        image: 'https://cdn.pixabay.com/photo/2016/11/29/08/41/apple-1868496_1280.jpg',
        category: 'pc',
      }),
    });

    const data = await response.json();
    alert(`Le produit avec l'id ${data.id} a été créé`);
  };

  const editProduct = async (productId) => {
    const response = await fetch(`https://fakestoreapi.com/products/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        price: 5,
      }),
    });

    const data = await response.json();
    alert(`Le prix du produit avec l'id ${data.id} a été modifié`);
  };

  const deleteProduct = async (productId) => {
    const response = await fetch(`https://fakestoreapi.com/products/${productId}`, {
      method: 'DELETE',
    });

    const data = await response.json();
    alert(`Le produit avec l'id ${data.id} a été supprimé`);
  };


  return (
    <Container className="mt-4">
      <Button variant="success" onClick={handleAddProduct} className="mb-4">Ajouter un produit</Button>
      <Row className="gy-3">
        {products.map(p => (
          <Col key={p.id} md={3}>
            <Card className="h-100">
              <Card.Img
                variant='top'
                src={p.image}
                alt={p.title}
              />
              <Card.Body>
                <Card.Title>{p.title}</Card.Title>
                <Card.Text>{p.description} €</Card.Text>
                <Card.Text>{p.price} €</Card.Text>
                <Button variant="warning" onClick={() => editProduct(p.id)} className="mb-4">Modifier le produit complet</Button>
                <Button variant="danger" onClick={() => deleteProduct(p.id)} className="mb-4">Supprimer le produit</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;