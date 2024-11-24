import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Button, FormControl, InputGroup } from 'react-bootstrap';
import './product.css';
import Cart from './Cart';
import Footer from './Footer';
import AddProduct from './AddProduct';
import { ToastContainer, toast } from 'react-toastify';

const AdminProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCart, setShowCart] = useState(false);
  const [showProduct, setShowProduct] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://e-commerce-hosting-psi.vercel.app/products').then((response) => {
      setProducts(response.data);
    });
  }, []);

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const toggleProduct = () => {
    setShowProduct(!showProduct);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('Logged out successfully!');
    navigate('/');
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem('token');
    axios.delete(`http://localhost:5000/products/${id}`, {
      headers: {
        'Authorization': token
      }
    }).then(() => {
      setProducts(products.filter(product => product._id !== id));
      toast.success('Product deleted successfully!');
    }).catch(error => {
      console.error('There was an error deleting the product!', error);
      toast.error('Failed to delete product.');
    });
  };

  const handleAddToCart = (productId) => {
    const token = localStorage.getItem('token');
    axios.post('http://localhost:5000/cart', { productId }, {
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
                  <img src={product.imageUrl} alt={product.name} style={{ width: '100px', height: '100px' }} />
                </Col>
                <Col md={8}>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <p>Price: ${product.price}</p>
                  <p>Stock: {product.stock}</p>
                  <Link to={`/update-product/${product._id}`}><Button variant="warning">Edit</Button></Link>
                  <Button variant="dark" className="mx-2" onClick={() => handleAddToCart(product._id)}>Add to Cart</Button>
                  <Button variant="danger" onClick={() => handleDelete(product._id)}>Delete</Button>
                </Col>
              </Row>
            ))}
          </div>
        </Col>

        <Col md={3}>
          <div className='text-center'>
          <Link to={'/addproduct'}>
            <img src="https://static.vecteezy.com/system/resources/thumbnails/001/500/603/small_2x/add-icon-free-vector.jpg" style={{ cursor: 'pointer', width: "20%", border: '1px solid #ccc', borderRadius: "10px", marginRight: "1rem" }} onClick={toggleProduct} />
          </Link>
            
            <img src="https://media.istockphoto.com/id/1400586811/vector/web.jpg?s=612x612&w=0&k=20&c=r5g0JlssvfuZN_fPTSwD4eoqSxXVxNX21w0Xs0NsWNo=" style={{ cursor: 'pointer', width: "20%", border: '1px solid #ccc', borderRadius: "10px" }} onClick={toggleCart} />
          </div>
          {showCart && <Cart />}
        </Col>
      </Row>

      <br></br>
      <br></br>
      <Row>
        <Footer />
      </Row>
    </Container>
  );
};

export default AdminProductList;
