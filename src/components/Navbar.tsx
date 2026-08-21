import React, { useState } from 'react';
import { Button, Container, Modal, Nav, Navbar } from 'react-bootstrap';
import ContactForm from './forms/ContactForm';

const NavigationBar: React.FC = () => {
  const [showContactModal, setShowContactModal] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const navItems = [
    { label: 'Home', id: 'hero' },
    { label: 'Capabilities', id: 'capabilities' },
    { label: 'Solutions', id: 'solutions' },
    { label: 'Process', id: 'process' },
    { label: 'Team', id: 'team' },
    { label: 'Contact', id: 'contact' }
  ];

  return (
    <>
      <Navbar expand="lg" sticky="top" className="site-navbar">
        <Container>
          <Navbar.Brand
            href="#hero"
            className="site-navbar__brand"
            onClick={(event) => {
              event.preventDefault();
              scrollToSection('hero');
            }}
          >
            <img
              src="/images/Prynova-logo.png"
              alt="Prynova logo"
              className="site-navbar__logo"
            />
            <span>Prynova Technologies</span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="site-navbar-nav" className="site-navbar__toggle" />

          <Navbar.Collapse id="site-navbar-nav">
            <Nav className="ms-auto align-items-lg-center gap-lg-2">
              {navItems.map((item) => (
                <Nav.Link
                  key={item.id}
                  className="site-navbar__link"
                  onClick={() => scrollToSection(item.id)}
                >
                  {item.label}
                </Nav.Link>
              ))}

              <Button
                className="site-navbar__cta"
                onClick={() => setShowContactModal(true)}
              >
                Start a Project
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal
        show={showContactModal}
        onHide={() => setShowContactModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Contact Prynova</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ContactForm isModal onClose={() => setShowContactModal(false)} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NavigationBar;
