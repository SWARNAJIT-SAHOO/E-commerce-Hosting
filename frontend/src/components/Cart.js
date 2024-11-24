import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Col, Row, Modal, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('https://e-commerce-hosting-psi.vercel.app/cart', {
      headers: {
        'Authorization': token
      }
    }).then((response) => {
      setCartItems(response.data);
    }).catch(error => {
      console.error('There was an error retrieving the cart items!', error);
    });
  }, []);

  const handleRemoveFromCart = (productId) => {
    const token = localStorage.getItem('token');
    axios.delete(`https://e-commerce-hosting-psi.vercel.app/cart/${productId}`, {
      headers: {
        'Authorization': token
      }
    }).then(() => {
      setCartItems(cartItems.filter(item => item._id !== productId));
      toast.success('Product removed from cart!');
    }).catch(error => {
      console.error('There was an error removing the product from the cart!', error);
      toast.error('Failed to remove product from cart.');
    });
  };

  const handlePlaceOrder = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleConfirmOrder = () => { const token = localStorage.getItem('token'); 
    axios.post('https://e-commerce-hosting-psi.vercel.app/orders',
       { productId: selectedProduct._id, quantity }, 
       { headers: { 'Authorization': token } })
       .then(() => { toast.success('Order placed successfully!');
         setShowModal(false); })
         .catch(error => { console.error('There was an error placing the order!', error); toast.error('Failed to place order.'); }); };

  return (
    <div>
      <ToastContainer />
      {cartItems.map((item) => (
        <div key={item._id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
          <h3>{item.name}</h3>
          <img src={item.imageUrl} alt={item.name} style={{ width: '100px', height: '100px' }} />
          <p>{item.description}</p>
          <p>Price: ${item.price}</p>
          <Row style={{ marginBottom: "1rem" }}>
            <Col md={12}>
              <div className="d-grid gap-2">
                <Button variant="dark" className="mx-2" onClick={() => handleRemoveFromCart(item._id)}>Remove</Button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <div className="d-grid gap-2">
                <Button variant="warning" className="mx-2" onClick={() => handlePlaceOrder(item)}>Place your Order</Button>
              </div>
            </Col>
          </Row>
        </div>
      ))}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct && (
            <>
              <h4>{selectedProduct.name}</h4>
              <img src={selectedProduct.imageUrl} alt={selectedProduct.name} style={{ width: '100px', height: '100px' }} />
              <p>{selectedProduct.description}</p>
              <p>Price: ${selectedProduct.price}</p>
              <Form.Group controlId="quantity" className="mb-3">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  min="1"
                  required
                />
              </Form.Group>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleConfirmOrder}>Confirm Order</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Cart;
