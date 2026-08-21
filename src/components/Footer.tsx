import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <Container>
        <Row className="g-4 align-items-start">
          <Col lg={4} md={6}>
            <div className="site-footer__brand">
              <img src="/images/Prynova-logo.png" alt="Prynova logo" />
              <div>
                <h5>Prynova Technologies</h5>
                <p>
                  AI systems, software engineering, hardware integration, and networking
                  delivered as one modern technology experience.
                </p>
              </div>
            </div>
          </Col>

          <Col lg={2} md={6}>
            <h6>Navigate</h6>
            <ul className="site-footer__links">
              <li><a href="#hero">Home</a></li>
              <li><a href="#capabilities">Capabilities</a></li>
              <li><a href="#solutions">Solutions</a></li>
              <li><a href="#process">Process</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </Col>

          <Col lg={3} md={6}>
            <h6>What We Build</h6>
            <ul className="site-footer__links">
              <li>AI workflows and automation</li>
              <li>Custom software platforms</li>
              <li>Cloud and infrastructure systems</li>
              <li>Device and hardware integrations</li>
              <li>Network-ready business operations</li>
            </ul>
          </Col>

          <Col lg={3} md={6}>
            <h6>Reach Us</h6>
            <ul className="site-footer__links">
              <li>prynovatechnologies@gmail.com</li>
              <li>Accra, Ghana</li>
              <li>Lusaka, Zambia</li>
              <li>+233 (0) 24 026 2600</li>
              <li>+260 97 459 5105</li>
            </ul>

            <div className="site-footer__socials">
              <a href="#" aria-label="Twitter">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="#" aria-label="LinkedIn">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
              <a href="#" aria-label="GitHub">
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </div>
          </Col>
        </Row>

        <div className="site-footer__bottom">
          <span>&copy; {currentYear} Prynova Technologies. All rights reserved.</span>
          <span>Built to look and feel like the company you are becoming.</span>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
