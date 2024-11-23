import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';
import HomePage from './components/HomePage';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import AddProduct from './components/AddProduct';
import UpdateProduct from './components/UpdateProduct';
import Cart from './components/Cart';
import Footer from './components/Footer';
import AdminProductList from './components/AdminProductList';
import { ToastContainer, toast } from 'react-toastify';
import About from './components/About';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    toast.success('Logged out successfully!',{position:'top-right',theme:'colored',autoClose: 3000});
    navigate('/');
  };

  return (
    <div className="App">
      <Navbar style={{ backgroundColor: "#ECECEC" }} expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">3legant</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/about">About</Nav.Link>
              
            </Nav>
            <Nav>
              {isAuthenticated ? (
                <>
                  <Button variant="outline-secondary" onClick={handleLogout}>Logout</Button>
                </>
              ) : (
                <Nav.Link as={Link} to="/signin">Sign-in</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/signin" element={<SignInForm setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/update-product/:id" element={<UpdateProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={<AdminProductList />} />
          <Route path="/about" element={<About isAuthenticated={isAuthenticated}/>} />
        </Routes>
      </Container>
      <ToastContainer />
    </div>
  );
}

export default function RootApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}
