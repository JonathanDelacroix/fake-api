import { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';

function App() {
  const [products, setProducts] = useState([]); // ACTIVITE 3
  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(data);
    }

    fetchProducts();
  }, []);

  const handleAddProduct = async () => { // ACTIVITE 4
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

  const updateProduct = async (productId) => { // ACTIVITE 5
    const response = await fetch(`https://fakestoreapi.com/products/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: 'Produit modifié',
        price: 29.99,
        description: 'Produit mis à jour avec succès.',
        image: 'https://cdn.pixabay.com/photo/2014/04/02/11/13/recycling-305569_1280.png',
        category: 'updated-category',
      }),
    });

    const data = await response.json();
    alert(`Le produit avec l'id ${data.id} a été modifié`);
  };

  const updatePriceProduct = async (productId) => { // ACTIVITE 6
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

  const deleteProduct = async (productId) => { // ACTIVITE 7
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
              <Card.Body className="d-flex flex-column">
                <Card.Title>{p.title}</Card.Title>
                <Card.Text>{p.description} €</Card.Text>
                <Card.Text>{p.price} €</Card.Text>
                <div className="mt-auto d-grid">
                  <Button variant="primary" onClick={() => updateProduct(p.id)} className="mb-4">Modifier le produit complet</Button>
                  <Button variant="warning" onClick={() => updatePriceProduct(p.id)} className="mb-4">Modifier le prix du produit</Button>
                  <Button variant="danger" onClick={() => deleteProduct(p.id)} className="mb-4">Supprimer le produit</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;