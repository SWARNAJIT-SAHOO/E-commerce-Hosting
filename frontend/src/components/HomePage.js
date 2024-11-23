import React from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col, Image } from 'react-bootstrap';
import './Home.css'
import Footer from './Footer';
const HomePage = () => {
  return (
    <div>
       <section className="hero">
      <Container>
        <Row className="align-items-center">
          <Col xs={12} md={6} lg={7} className="d-flex justify-content-center order-md-2 mb-md-0 mb-5">
            <div className="hero-content text-center text-md-right">
              <h2 className="hero-title display-1">
                Simply Unique
                <span className="d-none d-md-inline"> Do Simply Better </span>
              </h2>
              <Link
                to="/signin"
                className="btn btn-primary mt-4"
              >
                Start Now
              </Link>
            </div>
          </Col>
          <Col xs={12} md={6} lg={5} className="order-md-1 mb-md-0 mb-5">
            <Image fluid src="https://i.ibb.co/5BCcDYB/Remote2.png" alt="Remote Work Illustration" />
          </Col>
        </Row>
        <Row className="justify-content-center mt-5">
          <Col xs={4}  md={6} lg={5} className="order-md-1 mb-md-0 mb-5">
            <Image fluid src="https://i.ibb.co/2M7rtLk/Remote1.png" alt=" Solution Icon" />
          </Col>
        </Row>
        <Row>
          <Col xs={12} className="text-center mt-5">
            <h2 className="hero-subtitle lead">Quality Products</h2>
          </Col>
        </Row>
      </Container>
    </section>
        <Footer/>
    </div>
  );
};

export default HomePage;
