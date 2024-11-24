import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Button, FormControl, InputGroup } from 'react-bootstrap';
import Cart from './Cart';
import './product.css';
import Footer from './Footer';
import { ToastContainer, toast } from 'react-toastify';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://e-commerce-hosting-psi.vercel.app/products').then((response) => {
      setProducts(response.data);
    });
  }, []);

  const handleDelete = (id) => {
    const token = localStorage.getItem('token');
    axios.delete(`https://e-commerce-hosting-psi.vercel.app/products/${id}`, {
      headers: {
        'Authorization': token
      }
    }).then(() => {
      setProducts(products.filter(product => product._id !== id));
      toast.success('Product deleted successfully!');
    }).catch(error => {
      console.error('There was an error deleting the product!', error);
      toast.error('Failed to delete product.',{position:'top-right',theme:'colored',autoClose: 3000});
    });
  };

  const handleAddToCart = (productId) => {
    const token = localStorage.getItem('token');
    axios.post('https://e-commerce-hosting-psi.vercel.app/cart', { productId }, {
      headers: {
        'Authorization': token
      }
    }).then(() => {
      toast.success('Product added to cart!');
    }).catch(error => {
      console.error('There was an error adding the product to the cart!', error);
      toast.error('Failed to add product to cart.');
    });
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('Logged out successfully!');
    navigate('/');
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={9}>
          <div>
            <h2>Product List</h2>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Search by name"
                aria-label="Search by name"
                aria-describedby="basic-addon2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </div>
          <div className="product-list">
            {filteredProducts.map((product) => (
              <Row key={product._id} className="product-item" style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
                <Col md={4}>
                  <img src={product.imageUrl} alt={product.name} style={{ width: '200px', height: '200px' }} />
                </Col>
                <Col md={8}>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <p>Price: ${product.price}</p>
                  <p>Stock: {product.stock}</p>
                  <div className="d-grid gap-2">
                    <Button variant="dark" className="mx-2" onClick={() => handleAddToCart(product._id)}>Add to Cart</Button>
                  </div>
                </Col>
              </Row>
            ))}
          </div>
        </Col>
        <Col md={3}>
          <img src="https://media.istockphoto.com/id/1400586811/vector/web.jpg?s=612x612&w=0&k=20&c=r5g0JlssvfuZN_fPTSwD4eoqSxXVxNX21w0Xs0NsWNo=" style={{ cursor: 'pointer', width: "20%", border: '1px solid #ccc', borderRadius: "10px" }} onClick={toggleCart}></img>
          {showCart && <Cart />}
        </Col>
      </Row>
      <br></br>
      <Footer/>
    </Container>
  );
};

export default ProductList;
