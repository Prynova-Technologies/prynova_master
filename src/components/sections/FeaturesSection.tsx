import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCode,
  faGlobe,
  faMobileAlt,
  faCloud,
  faPaintBrush,
  faCogs
} from '@fortawesome/free-solid-svg-icons';
import { ScrollAnimation, AnimatedCard } from '../animations/Animations';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: faCode,
      title: 'Custom Software Development',
      description: 'We build tailored software solutions that perfectly match your business needs and goals.'
    },
    {
      icon: faGlobe,
      title: 'Web Applications',
      description: 'Modern, responsive web applications built with the latest technologies and best practices.'
    },
    {
      icon: faMobileAlt,
      title: 'Mobile Solutions',
      description: 'Native and cross-platform mobile applications that deliver exceptional user experiences.'
    },
    {
      icon: faCloud,
      title: 'Cloud Services',
      description: 'Scalable cloud solutions that ensure high availability and performance for your applications.'
    },
    {
      icon: faPaintBrush,
      title: 'UI/UX Design',
      description: 'Intuitive and engaging user interfaces that enhance user satisfaction and engagement.'
    },
    {
      icon: faCogs,
      title: 'API Integration',
      description: 'Seamless integration with third-party services and APIs to extend your application's capabilities.'
    }
  ];

  return (
    <section id="features" className="features">
      <Container>
        <ScrollAnimation>
          <header className="section-header text-center mb-5">
            <h2>Features</h2>
            <p>Delivering Innovative Solutions for Your Digital Success</p>
          </header>
        </ScrollAnimation>

        <Row className="gy-4">
          {features.map((feature, index) => (
            <Col key={index} lg={4} md={6}>
              <ScrollAnimation delay={index * 0.2}>
                <AnimatedCard>
                  <div className="feature-box d-flex align-items-center p-4 rounded shadow-sm bg-white h-100">
                    <div className="feature-icon me-3">
                      <FontAwesomeIcon 
                        icon={feature.icon} 
                        size="2x" 
                        className="text-primary"
                      />
                    </div>
                    <div className="feature-content">
                      <h3>{feature.title}</h3>
                      <p className="mb-0">{feature.description}</p>
                    </div>
                  </div>
                </AnimatedCard>
              </ScrollAnimation>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default FeaturesSection;