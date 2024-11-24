import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import Footer from './Footer';
import { ToastContainer, toast } from 'react-toastify';

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    imageUrl: ''
  });

  useEffect(() => {
    axios.get(`https://e-commerce-hosting-psi.vercel.app/products/${id}`).then((response) => {
      setProduct(response.data);
    });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    axios.put(`http://localhost:5000/products/${id}`, product, {
      headers: {
        'Authorization': token
      }
    }).then(() => {
      toast.success('Product updated successfully!');
      navigate('/admin');
    }).catch(error => {
      console.error('There was an error updating the product!', error);
      toast.error('Failed to update product.');
    });
  };

  return (
    <Container className="mt-2" style={{ borderRadius:"4px", width: "80%", backgroundColor: "#e6f5df", paddingTop: "1rem" }}>
      <h2>Update Product</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name" className="mb-3">
          <Form.Label>Product Name:</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="description" className="mb-3">
          <Form.Label>Description:</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="price" className="mb-3">
          <Form.Label>Price:</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="stock" className="mb-3">
          <Form.Label>Stock:</Form.Label>
          <Form.Control
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="imageUrl" className="mb-3">
          <Form.Label>Image URL:</Form.Label>
          <Form.Control
            type="text"
            name="imageUrl"
            value={product.imageUrl}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">Update Product</Button>
        <br></br>
        <br></br>
        <br></br>
      </Form>
      <Footer/>
    </Container>
  );
};

export default UpdateProduct;
