import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form, Spinner } from 'react-bootstrap';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faLinkedin, 
  faTwitter, 
  faGithub 
} from '@fortawesome/free-brands-svg-icons';
import { 
  faLightbulb, 
  faRocket, 
  faUsers,
  faCode,
  faGlobe,
  faMobileAlt,
  faCloud,
  faPaintBrush,
  faCogs
} from '@fortawesome/free-solid-svg-icons';
import Footer from '../components/Footer';
import NavigationBar from '../components/Navbar';

// Animation Components
interface AnimationProps {
  children: React.ReactNode;
  delay?: number;
}

const SlideInLeft: React.FC<AnimationProps> = ({ children, delay = 0 }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  React.useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, x: -50 },
        visible: { 
          opacity: 1, 
          x: 0,
          transition: {
            duration: 0.6,
            delay: delay
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
};

const SlideInRight: React.FC<AnimationProps> = ({ children, delay = 0 }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  React.useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, x: 50 },
        visible: { 
          opacity: 1, 
          x: 0,
          transition: {
            duration: 0.6,
            delay: delay
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
};

const ScrollAnimation: React.FC<AnimationProps> = ({ children, delay = 0 }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  React.useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: {
            duration: 0.6,
            delay: delay
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
};

const PulseAnimation: React.FC<AnimationProps> = ({ children }) => {
  return (
    <motion.div
      animate={{ 
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse"
      }}
    >
      {children}
    </motion.div>
  );
};

const AnimatedCard: React.FC<AnimationProps> = ({ children }) => {
  return (
    <motion.div
      whileHover={{ 
        y: -10,
        transition: { duration: 0.3 }
      }}
      className="h-100"
    >
      {children}
    </motion.div>
  );
};

interface StaggerProps {
  children: React.ReactNode;
  delay?: number;
  staggerDelay?: number;
}

const StaggerContainer: React.FC<StaggerProps> = ({ children, delay = 0, staggerDelay = 0.1 }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  React.useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: staggerDelay
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      {children}
    </motion.div>
  );
};

const StaggerItem: React.FC<AnimationProps> = ({ children }) => {
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div variants={itemVariants}>
      {children}
    </motion.div>
  );
};

// Contact Form Component
interface ContactFormProps {
  isModal?: boolean;
  onClose?: () => void;
}

interface FormData {
  name: string;
  email: string;
  message: string;
  [key: string]: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ isModal = false, onClose = () => {} }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      
      if (isModal) {
        // Close modal after 2 seconds on success
        setTimeout(() => {
          onClose();
          setSubmitSuccess(false);
        }, 2000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('An unexpected error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formContent = (
    <>
      {submitSuccess ? (
        <motion.div 
          className="text-center py-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h4 className="text-success">Thank you for your message!</h4>
          <p>We'll get back to you soon.</p>
        </motion.div>
      ) : (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Your Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="Enter your name"
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="Enter your email"
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              placeholder="How can we help you?"
            />
          </Form.Group>
          
          {submitError && (
            <div className="alert alert-danger" role="alert">
              {submitError}
            </div>
          )}
          
          <div className="d-grid gap-2">
            <Button 
              variant="primary" 
              type="submit"
              disabled={isSubmitting}
              className="rounded-pill"
            >
              {isSubmitting ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Sending...
                </>
              ) : 'Send Message'}
            </Button>
          </div>
        </Form>
      )}
    </>
  );

  if (isModal) {
    return formContent;
  }

  return (
    <div className="contact-form-container p-4 bg-light rounded shadow-sm">
      <h3 className="mb-4">Get In Touch</h3>
      {formContent}
    </div>
  );
};

// Hero Section
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

// About Section
const About: React.FC = () => {
  // Custom color style
  const primaryColor = '#0872bc';
  
  return (
    <section id="about" className="section">
      <Container>
        <div className="section-title">
          <h2>About Our Company</h2>
          <p>
            Prynova is a leading software engineering company dedicated to delivering 
            innovative solutions that drive business growth and digital transformation.
          </p>
        </div>
        
        <Row>
          <Col md={4} className="mb-4">
            <Card className="h-100 text-center p-4">
              <Card.Body>
                <div className="icon-box mb-4">
                  <FontAwesomeIcon icon={faLightbulb} size="3x" style={{ color: primaryColor }} />
                </div>
                <Card.Title className="mb-3">Our Vision</Card.Title>
                <Card.Text>
                  To be the global leader in innovative software solutions that empower 
                  businesses to achieve their full potential in the digital age.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={4} className="mb-4">
            <Card className="h-100 text-center p-4">
              <Card.Body>
                <div className="icon-box mb-4">
                  <FontAwesomeIcon icon={faRocket} size="3x" style={{ color: primaryColor }} />
                </div>
                <Card.Title className="mb-3">Our Mission</Card.Title>
                <Card.Text>
                  To deliver exceptional software solutions that solve complex business 
                  challenges and create measurable value for our clients.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={4} className="mb-4">
            <Card className="h-100 text-center p-4">
              <Card.Body>
                <div className="icon-box mb-4">
                  <FontAwesomeIcon icon={faUsers} size="3x" style={{ color: primaryColor }} />
                </div>
                <Card.Title className="mb-3">Our Values</Card.Title>
                <Card.Text>
                  Excellence, innovation, integrity, collaboration, and client-centricity 
                  are the core values that guide everything we do.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

// Team Section
interface SocialLinks {
  linkedin: string;
  twitter: string;
  github: string;
}

interface TeamMember {
  name: string;
  position: string;
  bio: string;
  image: string;
  social: SocialLinks;
}

const Team: React.FC = () => {
  // Custom color style
  const primaryColor = '#0872bc';
  
  const team: TeamMember[] = [
    {
      name: 'John Smith',
      position: 'CEO & Founder',
      bio: 'With over 20 years of experience in software development and business leadership.',
      image: '/images/team-member1.jpeg',
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#'
      }
    },
    {
      name: 'Sarah Johnson',
      position: 'CTO',
      bio: 'Expert in cloud architecture and emerging technologies with a passion for innovation.',
      image: '/images/team-member2.jpg',
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#'
      }
    },
    {
      name: 'Michael Chen',
      position: 'Lead Developer',
      bio: 'Full-stack developer with expertise in React, Node.js, and cloud infrastructure.',
      image: '/images/team-member3.jpeg',
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#'
      }
    },
    {
      name: 'Emily Rodriguez',
      position: 'UX/UI Designer',
      bio: 'Creative designer focused on creating intuitive and engaging user experiences.',
      image: '/images/team-member4.jpeg',
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#'
      }
    }
  ];

  return (
    <section id="team" className="section bg-light">
      <Container>
        <div className="section-title">
          <span className="badge mb-3" style={{ backgroundColor: primaryColor }}>Our Experts</span>
          <h2>Our Team</h2>
          <p>
            Meet our talented team of professionals who are passionate about creating 
            innovative software solutions that drive business success.
          </p>
        </div>
        
        <Row>
          {team.map((member, index) => (
            <Col lg={3} md={6} className="mb-4" key={index}>
              <Card className="h-100 text-center team-card">
                <div className="overflow-hidden">
                  <Card.Img 
                    variant="top" 
                    src={member.image} 
                    className="img-fluid"
                  />
                </div>
                <Card.Body>
                  <Card.Title>{member.name}</Card.Title>
                  <Card.Subtitle className="mb-2" style={{ color: primaryColor }}>{member.position}</Card.Subtitle>
                  <Card.Text>
                    {member.bio}
                  </Card.Text>
                  <div className="social-links">
                    <a href={member.social.linkedin} className="mx-2" style={{ color: primaryColor }}>
                      <FontAwesomeIcon icon={faLinkedin} size="lg" />
                    </a>
                    <a href={member.social.twitter} className="mx-2" style={{ color: primaryColor }}>
                      <FontAwesomeIcon icon={faTwitter} size="lg" />
                    </a>
                    <a href={member.social.github} className="mx-2" style={{ color: primaryColor }}>
                      <FontAwesomeIcon icon={faGithub} size="lg" />
                    </a>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

// Products Section
interface ProductFeature {
  title: string;
  description: string;
  image: string;
  features: string[];
}

interface InDemandSystem {
  title: string;
  description: string;
  features: string[];
}

const Products: React.FC = () => {
  const primaryColor = '#0872bc';
  
  const products: ProductFeature[] = [
    {
      title: 'Hospital Management System',
      description: 'A comprehensive healthcare solution for hospitals to manage patients, staff, and medical records efficiently.',
      image: '/images/hospital-system.jpeg',
      features: ['Patient Records Management', 'Appointment Scheduling', 'Pharmacy Management', 'Laboratory Management']
    },
    {
      title: 'Church Management System',
      description: 'Comprehensive solution for religious organizations to streamline operations and enhance community engagement.',
      image: '/images/church-system.jpeg',
      features: ['Membership Management', 'Event Scheduling', 'Donation Tracking', 'Attendance Monitoring']
    },
    {
      title: 'Property Management System',
      description: 'Complete solution for real estate businesses to manage properties, tenants, and maintenance operations.',
      image: '/images/property-system.jpeg',
      features: ['Property Listings', 'Tenant Management', 'Maintenance Tracking', 'Financial Reporting']
    },
    {
      title: 'POS & Inventory System',
      description: 'A comprehensive point-of-sale and inventory management solution for retail and wholesale businesses.',
      image: '/images/pos-system.jpeg',
      features: ['Sales Tracking', 'Inventory Management', 'Customer Management', 'Reporting & Analytics']
    },
    {
      title: 'Hotel Management System',
      description: 'Streamline hotel operations with our all-in-one solution for reservations, room management, and guest services.',
      image: '/images/hotel-system.jpeg',
      features: ['Reservation Management', 'Room Allocation', 'Guest Services', 'Billing & Invoicing']
    },
    {
      title: 'Loan Management System',
      description: 'Advanced system for financial institutions to manage loan processing, tracking, and recovery operations.',
      image: '/images/loan-system.jpeg',
      features: ['Loan Processing', 'Payment Tracking', 'Risk Assessment', 'Collection Management']
    }
  ];

  const inDemandSystems: InDemandSystem[] = [
    {
      title: 'School Management System',
      description: 'Complete educational institution management system with advanced features for modern learning.',
      features: ['Student Information System', 'Online Learning Platform', 'Performance Analytics']
    },
    {
      title: 'Loan Management System',
      description: 'Advanced system for financial institutions to manage loan processing, tracking, and recovery operations.',
      features: ['Loan Processing', 'Payment Tracking', 'Risk Assessment']
    },
    {
      title: 'Analytics System',
      description: 'Advanced analytics platform with AI capabilities for data-driven decision making.',
      features: ['Business Intelligence', 'Predictive Analytics', 'Custom Reporting']
    },
    {
      title: 'Blockchain Solutions',
      description: 'Secure and transparent blockchain-based systems for various business applications.',
      features: ['Smart Contracts', 'Supply Chain Tracking', 'Secure Transactions']
    }
  ];

  return (
    <section id="products" className="section">
      <Container>
        <ScrollAnimation>
          <div className="section-title">
            <span className="badge mb-3" style={{ backgroundColor: primaryColor }}>Our Solutions</span>
            <h2>Our Products</h2>
            <p>
              We've developed a suite of powerful software products designed to address 
              common business challenges and drive operational excellence across various industries.
            </p>
          </div>
        </ScrollAnimation>
        
        <StaggerContainer>
          <Row>
            {products.map((product, index) => (
              <Col lg={4} md={6} className="mb-4" key={index}>
                <StaggerItem>
                  <AnimatedCard>
                    <Card className="h-100">
                      <div className="overflow-hidden" style={{ height: '200px' }}>
                        <Card.Img 
                          variant="top" 
                          src={product.image} 
                          style={{ 
                            objectFit: 'cover',
                            height: '100%',
                            width: '100%',
                            transition: 'transform 0.5s ease'
                          }}
                          className="product-image"
                        />
                      </div>
                      <Card.Body>
                        <Card.Title className="mb-3">{product.title}</Card.Title>
                        <Card.Text>
                          {product.description}
                        </Card.Text>
                        <ul className="mb-4">
                          {product.features.map((feature, i) => (
                            <li key={i}>{feature}</li>
                          ))}
                        </ul>
                        <Button variant="outline-primary" className="rounded-pill" style={{ borderColor: primaryColor, color: primaryColor }}>Learn More</Button>
                      </Card.Body>
                    </Card>
                  </AnimatedCard>
                </StaggerItem>
              </Col>
            ))}
          </Row>
        </StaggerContainer>
      </Container>
    </section>
  );
};

// Contact Section
const Contact: React.FC = () => {
  const primaryColor = '#0872bc';
  
  return (
    <section id="contact" className="py-5 bg-light">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-center mb-5">Get In Touch</h2>
        </motion.div>
        
        <Row className="justify-content-center">
          <Col lg={5} md={6} className="mb-4 mb-md-0">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4>Contact Information</h4>
              <p className="text-muted mb-4">
                Have questions or want to discuss your project? Reach out to us using the form or contact details below.
              </p>
              
              <div className="mb-4">
                <h5>Address</h5>
                <p className="text-muted">123 Business Avenue, Tech Park, CA 94103</p>
              </div>
              
              <div className="mb-4">
                <h5>Email</h5>
                <p className="text-muted">info@prynova.com</p>
              </div>
              
              <div className="mb-4">
                <h5>Phone</h5>
                <p className="text-muted">+1 (555) 123-4567</p>
              </div>
              
              <div className="social-links">
                <a href="#" className="me-3" style={{ color: primaryColor }}><FontAwesomeIcon icon={faLinkedin} /></a>
                <a href="#" className="me-3" style={{ color: primaryColor }}><FontAwesomeIcon icon={faTwitter} /></a>
                <a href="#" className="me-3" style={{ color: primaryColor }}><FontAwesomeIcon icon={faGithub} /></a>
              </div>
            </motion.div>
          </Col>
          
          <Col lg={6} md={6} className="offset-lg-1">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <ContactForm />
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

// Services Section
const Services: React.FC = () => {
  const primaryColor = '#0872bc';
  
  const services = [
    {
      title: 'Custom Software Development',
      description: 'Tailored software solutions designed to meet your specific business needs and challenges.',
      icon: faCode
    },
    {
      title: 'Web Application Development',
      description: 'Responsive, scalable web applications built with modern technologies and frameworks.',
      icon: faGlobe
    },
    {
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications for iOS and Android devices.',
      icon: faMobileAlt
    },
    {
      title: 'Cloud Solutions',
      description: 'Cloud migration, infrastructure setup, and management across major cloud platforms.',
      icon: faCloud
    },
    {
      title: 'UI/UX Design',
      description: 'User-centered design that enhances user experience and drives engagement.',
      icon: faPaintBrush
    },
    {
      title: 'DevOps & Automation',
      description: 'Streamlined development processes with CI/CD pipelines and infrastructure automation.',
      icon: faCogs
    }
  ];

  return (
    <section id="services" className="section bg-light">
      <Container>
        <div className="section-title">
          <span className="badge mb-3" style={{ backgroundColor: primaryColor }}>What We Offer</span>
          <h2>Our Services</h2>
          <p>
            We provide a comprehensive range of software development services to help businesses 
            innovate and grow in the digital landscape.
          </p>
        </div>
        
        <Row>
          {services.map((service, index) => (
            <Col lg={4} md={6} className="mb-4" key={index}>
              <Card className="h-100 service-card">
                <Card.Body className="p-4">
                  <div className="icon-box mb-4">
                    <FontAwesomeIcon icon={service.icon} size="2x" style={{ color: primaryColor }} />
                  </div>
                  <Card.Title>{service.title}</Card.Title>
                  <Card.Text>
                    {service.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

// In-Demand Systems Section
const InDemandSystems: React.FC = () => {
  const primaryColor = '#0872bc';
  
  const systems = [
    {
      title: 'AI-Powered Analytics System',
      category: 'Artificial Intelligence',
      description: 'Advanced analytics platform leveraging machine learning algorithms for real-time data processing, predictive modeling, and intelligent business insights. Features automated reporting, trend analysis, and decision support capabilities.',
      image: '/images/analytics-system.jpeg',
      status: 'Under Development'
    },
    {
      title: 'IoT Integration Platform',
      category: 'Internet of Things',
      description: 'Comprehensive IoT solution enabling seamless device connectivity, real-time monitoring, and smart automation. Includes sensor integration, data collection, and intelligent control systems for various industrial and commercial applications.',
      image: '/images/pos-system.jpeg',
      status: 'Under Development'
    }
  ];

  return (
    <section id="portfolio" className="section">
      <Container>
        <div className="section-title">
          <span className="badge mb-3" style={{ backgroundColor: primaryColor }}>Innovation Hub</span>
          <h2>In-Demand Systems Under Development</h2>
          <p>
            Explore our cutting-edge systems currently under development, designed to meet evolving market demands.
          </p>
        </div>
        
        <Row className="justify-content-center">
          {systems.map((system, index) => (
            <Col lg={6} md={6} className="mb-4" key={index}>
              <Card className="h-100 portfolio-item">
                <div className="overflow-hidden" style={{ height: '250px' }}>
                  <Card.Img 
                    variant="top" 
                    src={system.image} 
                    className="img-fluid"
                    style={{ 
                      objectFit: 'cover',
                      height: '100%',
                      width: '100%',
                      transition: 'transform 0.5s ease'
                    }}
                  />
                </div>
                <Card.Body>
                  <Card.Title className="h4 mb-3">{system.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{system.category}</Card.Subtitle>
                  <Card.Text className="mb-3">{system.description}</Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="badge bg-warning text-dark">{system.status}</span>
                    <Button 
                      variant="outline-primary" 
                      className="mt-2"
                      style={{ borderColor: primaryColor, color: primaryColor }}
                    >
                      Learn More
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

// Main Home Component
const Home: React.FC = () => {
  return (
    <>
      <NavigationBar/>
      <Hero />
      <Services />
      <About />
      <InDemandSystems />
      <Products />
      <Team />
      <Contact />
      <Footer />
    </>
  );
};

export default Home;