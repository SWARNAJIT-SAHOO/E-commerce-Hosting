import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginAsAdmin, setLoginAsAdmin] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { email, password };
    axios.post('https://e-commerce-hosting-psi.vercel.app/signin', user).then((response) => {
      console.log(response.data);
      localStorage.setItem('token', response.data.token);
      toast.success('Sign-in successful!',{position:'top-right',theme:'colored',autoClose: 3000});
      window.location.reload(true);
      if (loginAsAdmin) {
        navigate('/admin');
      } else {
        navigate('/products');
      }
    }).catch(error => {
      console.error('There was an error signing in!', error);
      toast.error('Failed to sign in. Invalid email or password.',{position:'top-right',theme:'colored',autoClose: 3000});
    });
  };

  return (
    <Container className="mt-2" style={{ width: "80%", backgroundColor: "#ECECEC", paddingTop: "1rem" }}>
      <Row className="justify-content-md-center ">
        <Col md={6}>
          <Image src="https://m.media-amazon.com/images/I/719F4SqM2+L.jpg" fluid className="mb-4" />
        </Col>
        <Col md={6}>
          <h2>Sign In</h2>
          <Form onSubmit={handleSubmit}>
          <p className="mt-3">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="password" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="loginAsAdmin" className="mb-3">
              <Form.Check
                type="checkbox"
                label="Login as admin"
                checked={loginAsAdmin}
                onChange={(e) => setLoginAsAdmin(e.target.checked)}
              />
            </Form.Group>
            <div className="d-grid gap-2">

            <Button variant="dark" type="submit">Sign In</Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignInForm;
