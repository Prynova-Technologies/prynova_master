import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { SlideInLeft, SlideInRight } from '../animations/Animations';

const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="hero d-flex align-items-center">
      <Container>
        <Row className="align-items-center">
          <Col lg={6} className="d-flex flex-column justify-content-center">
            <SlideInLeft>
              <h1 data-aos="fade-up">We offer modern solutions for growing your business</h1>
              <h2 data-aos="fade-up" data-aos-delay="400">We are team of talented developers making applications with React</h2>
              <div data-aos="fade-up" data-aos-delay="600">
                <div className="text-center text-lg-start">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="d-inline-block"
                  >
                    <Button 
                      href="#about" 
                      className="btn-get-started scrollto d-inline-flex align-items-center justify-content-center align-self-center"
                      variant="primary"
                      size="lg"
                    >
                      <span>Get Started</span>
                      <i className="bi bi-arrow-right ms-2"></i>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </SlideInLeft>
          </Col>
          <Col lg={6} className="hero-img">
            <SlideInRight>
              <img src="/images/hero-coding.jpeg" className="img-fluid" alt="Hero" />
            </SlideInRight>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;