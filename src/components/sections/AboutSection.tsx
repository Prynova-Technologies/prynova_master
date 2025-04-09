import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faRocket, faUsers } from '@fortawesome/free-solid-svg-icons';
import { ScrollAnimation, AnimatedCard } from '../animations/Animations';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="about">
      <Container>
        <ScrollAnimation>
          <header className="section-header text-center mb-5">
            <h2>About Us</h2>
            <p>Learn More About Prynova</p>
          </header>
        </ScrollAnimation>

        <Row className="content">
          <Col lg={6}>
            <ScrollAnimation>
              <p>
                Prynova is a leading software development company dedicated to delivering innovative solutions
                that drive business growth and digital transformation. Our team of experts combines technical
                excellence with creative problem-solving to help businesses thrive in the digital age.
              </p>
              <ul>
                <li>✓ Cutting-edge software solutions tailored to your needs</li>
                <li>✓ Expert team of developers and designers</li>
                <li>✓ Proven track record of successful projects</li>
              </ul>
            </ScrollAnimation>
          </Col>
          <Col lg={6} className="pt-4 pt-lg-0">
            <ScrollAnimation delay={0.2}>
              <p>
                We understand that every business is unique, which is why we take a personalized approach to
                each project. Our solutions are designed to scale with your business and adapt to changing
                market demands, ensuring long-term success and sustainability.
              </p>
            </ScrollAnimation>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col lg={4} md={6}>
            <ScrollAnimation delay={0.3}>
              <AnimatedCard>
                <div className="box text-center p-4 rounded shadow-sm bg-white">
                  <FontAwesomeIcon icon={faLightbulb} size="3x" className="text-primary mb-4" />
                  <h3>Our Vision</h3>
                  <p>
                    To be the global leader in innovative software solutions that empower businesses
                    to achieve their full potential in the digital age.
                  </p>
                </div>
              </AnimatedCard>
            </ScrollAnimation>
          </Col>

          <Col lg={4} md={6}>
            <ScrollAnimation delay={0.4}>
              <AnimatedCard>
                <div className="box text-center p-4 rounded shadow-sm bg-white">
                  <FontAwesomeIcon icon={faRocket} size="3x" className="text-primary mb-4" />
                  <h3>Our Mission</h3>
                  <p>
                    To deliver exceptional software solutions that solve complex business challenges
                    and create measurable value for our clients.
                  </p>
                </div>
              </AnimatedCard>
            </ScrollAnimation>
          </Col>

          <Col lg={4} md={6}>
            <ScrollAnimation delay={0.5}>
              <AnimatedCard>
                <div className="box text-center p-4 rounded shadow-sm bg-white">
                  <FontAwesomeIcon icon={faUsers} size="3x" className="text-primary mb-4" />
                  <h3>Our Values</h3>
                  <p>
                    Excellence, innovation, integrity, collaboration, and client-centricity are the
                    core values that guide everything we do.
                  </p>
                </div>
              </AnimatedCard>
            </ScrollAnimation>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutSection;