import React from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const About = ({ isAuthenticated }) => {
  const navigate = useNavigate();

  const handleExploreProducts = () => {
    if (isAuthenticated) {
      navigate('/products');
    } else {
      navigate('/signin');
    }
  };

  return (
    <Container className="mt-5">
      <Row className="mb-4">
        <Col md={12}>
          <h1 className="text-center">About Us</h1>
          <p className="text-center">
            Welcome to Chair Haven, your ultimate destination for high-quality and stylish shopping chairs. 
            Our mission is to provide the most comfortable and ergonomic chairs that suit your needs and enhance your shopping experience.
          </p>
        </Col>
      </Row>
      <Row className="align-items-center">
        <Col md={6}>
          <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReGtaFsOChRJdYUsmW0RUiT_FQuSKT4nvPUQ&s" fluid rounded />
        </Col>
        <Col md={6}>
          <h3>Our Mission</h3>
          <p>
            At Chair Haven, we believe that shopping should be a comfortable and enjoyable experience. That's why we have dedicated ourselves 
            to designing and manufacturing chairs that are not only aesthetically pleasing but also supportive and durable.
          </p>
          <h3>Quality and Comfort</h3>
          <p>
            Our chairs are crafted with the highest quality materials and the latest ergonomic designs to ensure maximum comfort. 
            Whether you need a chair for long shopping trips or just a quick visit to the store, we have the perfect chair for you.
          </p>
          <Button variant="primary" onClick={handleExploreProducts}>Explore Our Products</Button>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={12}>
          <h3>Why Choose Chair Haven?</h3>
          <ul>
            <li>Exceptional comfort and support</li>
            <li>Stylish and modern designs</li>
            <li>High-quality materials</li>
            <li>Affordable prices</li>
            <li>Excellent customer service</li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
