import React, { useState } from 'react';
import { Navbar, Nav, Container, Modal, Form, Button } from 'react-bootstrap';

const NavigationBar = () => {
  const [showContactModal, setShowContactModal] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <>
      <Navbar bg="light" expand="lg" sticky="top" className="shadow-sm py-3">
        <Container>
          <Navbar.Brand href="#home" className="d-flex align-items-center">
            <img
              src="/images/Prynova-logo.png"
              alt="Prynova Logo"
              height="40"
              className="me-2"
            />
            {/* <span className="fw-bold">Prynova</span> */}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link onClick={() => scrollToSection('home')}>Home</Nav.Link>
              <Nav.Link onClick={() => scrollToSection('services')}>Services</Nav.Link>
              <Nav.Link onClick={() => scrollToSection('about')}>About</Nav.Link>
              <Nav.Link onClick={() => scrollToSection('portfolio')}>Portfolio</Nav.Link>
              <Nav.Link onClick={() => scrollToSection('products')}>Products</Nav.Link>
              <Nav.Link onClick={() => scrollToSection('team')}>Team</Nav.Link>
              <Nav.Link onClick={() => setShowContactModal(true)}>Contact Us</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Contact Form Modal */}
      <Modal 
        show={showContactModal} 
        onHide={() => setShowContactModal(false)}
        centered
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Contact Us</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Simple contact form */}
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Your Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" required />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" required />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" rows={4} placeholder="How can we help you?" required />
            </Form.Group>
            
            <Button variant="primary" type="submit" className="w-100">
              Send Message
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NavigationBar;