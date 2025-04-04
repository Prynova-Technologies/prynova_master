import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faTwitter, faGithub, faFacebook } from '@fortawesome/free-brands-svg-icons';

const Footer: React.FC = () => {
  const primaryColor = '#0872bc';
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-dark text-light py-5">
      <Container>
        <Row className="mb-4">
          <Col lg={4} md={6} className="mb-4 mb-md-0">
            <h5 className="mb-3">Prynova</h5>
            <p className="mb-3">
              Innovative software solutions for businesses of all sizes. We help companies 
              transform their operations and achieve digital excellence.
            </p>
            <div className="social-links">
              <a href="#" className="me-3 text-light">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="#" className="me-3 text-light">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="#" className="me-3 text-light">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
              <a href="#" className="me-3 text-light">
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </div>
          </Col>
          
          <Col lg={2} md={6} className="mb-4 mb-md-0">
            <h5 className="mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="#home" className="text-light text-decoration-none">Home</a></li>
              <li className="mb-2"><a href="#services" className="text-light text-decoration-none">Services</a></li>
              <li className="mb-2"><a href="#about" className="text-light text-decoration-none">About</a></li>
              <li className="mb-2"><a href="#portfolio" className="text-light text-decoration-none">Portfolio</a></li>
              <li className="mb-2"><a href="#contact" className="text-light text-decoration-none">Contact</a></li>
            </ul>
          </Col>
          
          <Col lg={3} md={6} className="mb-4 mb-md-0">
            <h5 className="mb-3">Services</h5>
            <ul className="list-unstyled">
              <li className="mb-2">Custom Software Development</li>
              <li className="mb-2">Web Application Development</li>
              <li className="mb-2">Mobile App Development</li>
              <li className="mb-2">Cloud Solutions</li>
              <li className="mb-2">UI/UX Design</li>
            </ul>
          </Col>
          
          <Col lg={3} md={6} className="mb-4 mb-md-0">
            <h5 className="mb-3">Contact Us</h5>
            <p className="mb-2">123 Business Avenue, Tech Park, CA 94103</p>
            <p className="mb-2">info@prynova.com</p>
            <p className="mb-2">+1 (555) 123-4567</p>
          </Col>
        </Row>
        
        <hr className="my-4" />
        
        <Row>
          <Col className="text-center">
            <p className="mb-0">
              &copy; {currentYear} Prynova. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;