import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { SlideInLeft, SlideInRight, PulseAnimation } from '../animations/Animations';
import ContactForm from '../forms/ContactForm';

const Hero: React.FC = () => {
  const [showContactForm, setShowContactForm] = useState<boolean>(false);
  
  // Security measures
  useEffect(() => {
    // Set security headers on the client side
    if (typeof window !== 'undefined') {
      // Prevent clickjacking attacks
      const securityStyle = document.createElement('style');
      securityStyle.innerHTML = `
        html {
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          -khtml-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
      `;
      document.head.appendChild(securityStyle);
      
      // Add event listener to detect and prevent certain devtools actions
      window.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
      });
    }
  }, []);

  // Animation variants
  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        repeat: Infinity,
        repeatType: "reverse" as const,
        repeatDelay: 5
      }
    }
  };

  const wordVariants = {
    hidden: { opacity: 0.3, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  const badgeVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { 
      opacity: 1, 
      scale: [0.8, 1.1, 1],
      transition: { 
        duration: 1,
        repeat: Infinity,
        repeatType: "reverse" as const,
        repeatDelay: 3
      }
    }
  };

  const paragraphVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.4,
        delay: 0.5,
        repeat: Infinity,
        repeatType: "reverse" as const,
        repeatDelay: 5
      }
    }
  };

  // Split title into two lines
  const titleLine1 = "Transform Your Business";
  const titleLine2 = "with Custom Software";
  
  return (
    <section id="home" className="hero-section">
      <Container>
        <Row className="align-items-center">
          <Col lg={6} md={12} className="mb-5 mb-lg-0 order-2 order-lg-1">
            <SlideInLeft>
              <motion.span 
                className="badge bg-primary mb-3"
                variants={badgeVariants}
                initial="initial"
                animate="animate"
              >
                Innovative Software Solutions
              </motion.span>
              
              <motion.h1 
                className="display-4 fw-bold mb-4"
                variants={titleVariants}
                initial="hidden"
                animate="visible"
              >
                <div>
                  {titleLine1.split(" ").map((word, index) => (
                    <motion.span key={index} variants={wordVariants} style={{ display: 'inline-block', marginRight: '0.3rem' }}>
                      {word}
                    </motion.span>
                  ))}
                </div>
                <div>
                  {titleLine2.split(" ").map((word, index) => (
                    <motion.span key={index} variants={wordVariants} style={{ display: 'inline-block', marginRight: '0.3rem' }}>
                      {word}
                    </motion.span>
                  ))}
                </div>
              </motion.h1>
              
              <motion.div className="col-12 col-lg-10 col-xl-9 px-0">
                <motion.p 
                  className="lead mb-4"
                  variants={paragraphVariants}
                  initial="initial"
                  animate="animate"
                >
                  We build cutting-edge software that helps businesses streamline operations, 
                  increase productivity, and achieve their digital transformation goals.
                </motion.p>
              </motion.div>
              
              <motion.div 
                className="d-flex gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    duration: 0.6,
                    delay: 1
                  }
                }}
              >
                <PulseAnimation>
                  <Button variant="primary" size="lg" className="rounded-pill px-4">Get Started</Button>
                </PulseAnimation>
                <motion.div 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                  animate={{ 
                    scale: [1, 1.03, 1],
                    transition: {
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse" as const,
                      repeatDelay: 3
                    }
                  }}
                >
                  <Button 
                    variant="outline-primary" 
                    size="lg" 
                    className="rounded-pill px-4"
                    onClick={() => setShowContactForm(true)}
                  >
                    Contact Us
                  </Button>
                </motion.div>
              </motion.div>
            </SlideInLeft>
          </Col>
          <Col lg={6} md={12} className="order-1 order-lg-2 mb-4 mb-lg-0">
            <SlideInRight>
              <motion.img 
                src="/images/hero-coding.jpeg" 
                alt="Software Development" 
                className="img-fluid rounded shadow-lg"
                animate={{
                  scale: [1, 1.02, 1],
                  transition: {
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse" as const
                  }
                }}
              />
            </SlideInRight>
          </Col>
        </Row>
      </Container>

      {/* Contact Form Modal */}
      <Modal 
        show={showContactForm} 
        onHide={() => setShowContactForm(false)}
        centered
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Contact Us</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ContactForm 
            isModal={true} 
            onClose={() => setShowContactForm(false)} 
          />
        </Modal.Body>
      </Modal>
    </section>
  );
};

export default Hero;