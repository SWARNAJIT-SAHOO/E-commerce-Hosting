import React, { useState } from 'react';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import Footer from './Footer';
import { ToastContainer, toast } from 'react-toastify';
const AddProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = { name, description, price, stock, imageUrl };
    const token = localStorage.getItem('token');
    axios.post('http://localhost:5000/products', newProduct, {
      headers: {
        'Authorization': token
      }
    }).then((response) => {
      console.log(response.data);
      toast.success('Product added successfully!');
      setName('');
      setDescription('');
      setPrice('');
      setStock('');
      setImageUrl('');
      navigate('/admin');
    }).catch(error => {
      console.error('There was an error adding the product!', error);
      toast.error('Failed to add product.');
    });
  };

  return (
    <Container className="mt-2" style={{ borderRadius: "4px", width: "80%", backgroundColor: "#e6f5df", paddingTop: "1rem" }}>
      <h2>Add New Product</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name" className="mb-3">
          <Form.Label>Product Name:</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="description" className="mb-3">
          <Form.Label>Description:</Form.Label>
          <Form.Control
            as="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="price" className="mb-3">
          <Form.Label>Price:</Form.Label>
          <Form.Control
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="stock" className="mb-3">
          <Form.Label>Stock:</Form.Label>
          <Form.Control
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="imageUrl" className="mb-3">
          <Form.Label>Image URL:</Form.Label>
          <Form.Control
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="success" type="submit">Add Product</Button>
        <br></br>
        <br></br>
        <br></br>
      </Form>
      <Footer />
    </Container>
  );
};

export default AddProduct;
