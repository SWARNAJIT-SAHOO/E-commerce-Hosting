import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer>
      <Container  style={{backgroundColor:"#ECECEC"}}>
      <div className=" text-center p-3"> <Container> <p>&copy; 2024 My E-Commerce. All rights reserved.</p> </Container> </div>
      </Container>
    </footer>
  );
};

export default Footer;
