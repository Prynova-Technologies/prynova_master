import React, { useState } from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faLinkedin, 
  faTwitter, 
  faInstagram
} from '@fortawesome/free-brands-svg-icons';
import { 
  faCode,
  faGlobe,
  faMobileAlt,
  faCloud,
  faChartLine,
  faShieldAlt,
  faHeadset
} from '@fortawesome/free-solid-svg-icons';
import NavigationBar from '../components/Navbar';
import Footer from '../components/Footer';
import { ScrollAnimation } from '../components/animations/Animations';
import ContactForm from '../components/forms/ContactForm';
import { motion } from 'framer-motion';

// Hero Section
const Hero: React.FC = () => {
  const [showContactForm, setShowContactForm] = useState<boolean>(false);

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <section id="hero" className="hero-section">
      <Container>
        <Row className="align-items-center">
          <Col lg={6} className="hero-content">
            <motion.div
              variants={titleVariants}
              initial="hidden"
              animate="visible"
              className="mb-5"
            >
              <motion.span className="badge bg-light text-primary mb-3 px-3 py-2">
                Innovative Software Solutions
              </motion.span>
              
              <motion.h1 className="mb-4">
                {"Transform Your Business with Custom Software".split(" ").map((word, index) => (
                  <motion.span
                    key={index}
                    variants={wordVariants}
                    style={{ display: 'inline-block', marginRight: '0.3rem' }}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h1>
              
              <motion.p className="lead mb-5">
                We build cutting-edge software that helps businesses streamline operations, 
                increase productivity, and achieve their digital transformation goals.
              </motion.p>

              <motion.div 
                className="d-flex gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Button 
                  variant="light" 
                  size="lg" 
                  className="rounded-pill px-4 fw-bold"
                  onClick={() => setShowContactForm(true)}
                >
                  Get Started
                </Button>
                <Button 
                  variant="outline-light" 
                  size="lg" 
                  className="rounded-pill px-4"
                  href="#services"
                >
                  Learn More
                </Button>
              </motion.div>
            </motion.div>
          </Col>
          <Col lg={6} className="hero-img">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <motion.img 
                src="/images/hero-coding.jpeg" 
                alt="Software Development" 
                className="img-fluid rounded shadow-lg"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                loading="lazy"
              />
            </motion.div>
          </Col>
        </Row>
      </Container>

      <Modal 
        show={showContactForm} 
        onHide={() => setShowContactForm(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Contact Us</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ContactForm isModal onClose={() => setShowContactForm(false)} />
        </Modal.Body>
      </Modal>
    </section>
  );
};

// Services Section
const Services: React.FC = () => {
  const services = [
    {
      icon: faCode,
      title: 'Custom Software',
      description: 'Tailored solutions that perfectly match your business needs',
      color: '#3b82f6'
    },
    {
      icon: faGlobe,
      title: 'Web Development',
      description: 'Modern and responsive web applications built with latest technologies',
      color: '#8b5cf6'
    },
    {
      icon: faMobileAlt,
      title: 'Mobile Apps',
      description: 'Native and cross-platform mobile applications',
      color: '#ec4899'
    },
    {
      icon: faCloud,
      title: 'Cloud Solutions',
      description: 'Scalable cloud infrastructure and services',
      color: '#10b981'
    },
    {
      icon: faChartLine,
      title: 'Business Analytics',
      description: 'Data-driven insights for informed decision making',
      color: '#f59e0b'
    },
    {
      icon: faShieldAlt,
      title: 'Cybersecurity',
      description: 'Protecting your digital assets and data',
      color: '#ef4444'
    }
  ];

  return (
    <section id="services" className="section bg-light py-5">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-5"
        >
          <span className="badge bg-primary-subtle text-primary mb-3 px-3 py-2">
            Our Services
          </span>
          <h2 className="display-5 fw-bold mb-3">What We Offer</h2>
          <p className="lead text-secondary mb-0">
            Comprehensive software solutions to drive your business forward
          </p>
        </motion.div>

        <Row className="g-4">
          {services.map((service, index) => (
            <Col lg={4} md={6} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="card h-100 border-0 shadow-sm hover-lift">
                  <div className="card-body p-4">
                    <div 
                      className="icon-box mb-4"
                      style={{
                        background: `linear-gradient(135deg, ${service.color}20, ${service.color}10)`,
                        color: service.color,
                        width: '60px',
                        height: '60px',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <FontAwesomeIcon icon={service.icon} size="2x" />
                    </div>
                    <h3 className="h4 mb-3">{service.title}</h3>
                    <p className="text-secondary mb-0">{service.description}</p>
                  </div>
                </div>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

// Portfolio Section
const Portfolio: React.FC = () => {
  const [filter, setFilter] = useState('All');
  
  const projects = [
    {
      title: 'Hospital Management System',
      category: 'Healthcare',
      image: '/images/hospital-system.jpeg',
      description: 'Comprehensive healthcare management solution'
    },
    {
      title: 'Property Management System',
      category: 'Real Estate',
      image: '/images/property-system.jpeg',
      description: 'End-to-end property management platform'
    },
    {
      title: 'School Management System',
      category: 'Education',
      image: '/images/school-system.jpeg',
      description: 'Modern educational institution management'
    },
    {
      title: 'POS & Inventory System',
      category: 'Retail',
      image: '/images/pos-system.jpeg',
      description: 'Advanced point of sale and inventory tracking'
    },
    {
      title: 'Hotel Management System',
      category: 'Hospitality',
      image: '/images/hotel-system.jpeg',
      description: 'Complete hotel operations management'
    },
    {
      title: 'Analytics System',
      category: 'Business',
      image: '/images/analytics-system.jpeg',
      description: 'Data-driven business intelligence platform'
    }
  ];

  const categories = ['All', ...new Set(projects.map(project => project.category))];
  const filteredProjects = filter === 'All' ? projects : projects.filter(project => project.category === filter);

  return (
    <section id="portfolio" className="section py-5">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-5"
        >
          <span className="badge bg-primary-subtle text-primary mb-3 px-3 py-2">
            Portfolio
          </span>
          <h2 className="display-5 fw-bold mb-3">Our Latest Work</h2>
          <p className="lead text-secondary mb-5">
            Explore our successful projects and innovative solutions
          </p>

          <div className="d-flex justify-content-center gap-2 flex-wrap mb-5">
            {categories.map((category, index) => (
              <Button
                key={index}
                variant={filter === category ? 'primary' : 'outline-primary'}
                className="rounded-pill px-4"
                onClick={() => setFilter(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </motion.div>

        <Row className="g-4">
          {filteredProjects.map((project, index) => (
            <Col lg={4} md={6} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="card h-100 border-0 shadow-sm hover-lift overflow-hidden">
                  <div className="position-relative">
                    <motion.img 
                      src={project.image} 
                      className="card-img-top" 
                      alt={project.title}
                      style={{ height: '240px', objectFit: 'cover' }}
                      loading="lazy"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
                      <Button variant="light" className="rounded-circle p-3">
                        <i className="bi bi-plus-lg"></i>
                      </Button>
                    </div>
                  </div>
                  <div className="card-body p-4">
                    <span className="badge bg-primary-subtle text-primary mb-2">{project.category}</span>
                    <h4 className="card-title mb-2">{project.title}</h4>
                    <p className="card-text text-secondary">{project.description}</p>
                  </div>
                </div>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );

};

// Team Section
const Team: React.FC = () => {
  const team = [
    {
      name: 'John Smith',
      position: 'CEO & Founder',
      image: '/images/team-member1.jpeg',
      bio: 'Visionary leader with 15+ years of experience in software industry',
      social: {
        twitter: '#',
        facebook: '#',
        instagram: '#',
        linkedin: '#'
      }
    },
    {
      name: 'Sarah Johnson',
      position: 'CTO',
      image: '/images/team-member2.jpg',
      bio: 'Tech innovator specializing in cloud architecture and AI solutions',
      social: {
        twitter: '#',
        facebook: '#',
        instagram: '#',
        linkedin: '#'
      }
    },
    {
      name: 'Michael Chen',
      position: 'Lead Developer',
      image: '/images/team-member3.jpeg',
      bio: 'Full-stack developer with expertise in modern web technologies',
      social: {
        twitter: '#',
        facebook: '#',
        instagram: '#',
        linkedin: '#'
      }
    },
    {
      name: 'Emily Rodriguez',
      position: 'UX/UI Designer',
      image: '/images/team-member4.jpeg',
      bio: 'Creative designer focused on building intuitive user experiences',
      social: {
        twitter: '#',
        facebook: '#',
        instagram: '#',
        linkedin: '#'
      }
    }
  ];

  return (
    <section id="team" className="section bg-light py-5">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-5"
        >
          <span className="badge bg-primary-subtle text-primary mb-3 px-3 py-2">
            Our Team
          </span>
          <h2 className="display-5 fw-bold mb-3">Meet Our Experts</h2>
          <p className="lead text-secondary mb-0">
            Talented professionals behind our success
          </p>
        </motion.div>

        <Row className="g-4">
          {team.map((member, index) => (
            <Col lg={3} md={6} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="card border-0 shadow-sm hover-lift h-100">
                  <div className="position-relative">
                    <motion.img 
                      src={member.image} 
                      className="card-img-top" 
                      alt={member.name}
                      style={{ height: '300px', objectFit: 'cover' }}
                      loading="lazy"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.div 
                      className="social-overlay position-absolute w-100 h-100 top-0 start-0 d-flex align-items-center justify-content-center gap-2"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <a href={member.social.linkedin} className="btn btn-light rounded-circle p-2">
                        <FontAwesomeIcon icon={faLinkedin} />
                      </a>
                      <a href={member.social.twitter} className="btn btn-light rounded-circle p-2">
                        <FontAwesomeIcon icon={faTwitter} />
                      </a>
                      <a href={member.social.instagram} className="btn btn-light rounded-circle p-2">
                        <FontAwesomeIcon icon={faInstagram} />
                      </a>
                    </motion.div>
                  </div>
                  <div className="card-body text-center p-4">
                    <h4 className="card-title mb-1">{member.name}</h4>
                    <p className="text-primary mb-2">{member.position}</p>
                    <p className="card-text text-secondary mb-0">{member.bio}</p>
                  </div>
                </div>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );

};

// Contact Section
const Contact: React.FC = () => {
  return (
    <section id="contact" className="contact">
      <Container>
        <ScrollAnimation>
          <header className="section-header">
            <h2>Contact</h2>
            <p>Get in touch with us</p>
          </header>
        </ScrollAnimation>

        <Row className="gy-4">
          <Col lg={6}>
            <ScrollAnimation>
              <Row className="gy-4">
                <Col md={6}>
                  <div className="info-box">
                    <FontAwesomeIcon icon={faHeadset} className="icon" />
                    <h3>Call Us</h3>
                    <p>+1 (555) 123-4567</p>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="info-box">
                    <FontAwesomeIcon icon={faGlobe} className="icon" />
                    <h3>Email Us</h3>
                    <p>info@prynova.com</p>
                  </div>
                </Col>
                <Col md={12}>
                  <div className="info-box">
                    <FontAwesomeIcon icon={faCloud} className="icon" />
                    <h3>Address</h3>
                    <p>123 Business Avenue, Tech Park, CA 94103</p>
                  </div>
                </Col>
              </Row>
            </ScrollAnimation>
          </Col>

          <Col lg={6}>
            <ScrollAnimation delay={0.2}>
              <ContactForm />
            </ScrollAnimation>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

// Main Home Component
const Home: React.FC = () => {
  return (
    <>
      <NavigationBar />
      <Hero />
      <Services />
      <Portfolio />
      <Team />
      <Contact />
      <Footer />
    </>
  );
};

export default Home;