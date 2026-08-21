import React, { useMemo, useState } from 'react';
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faChartLine,
  faCheckCircle,
  faCloud,
  faCode,
  faGlobe,
  faHeadset,
  faLaptopCode,
  faMicrochip,
  faNetworkWired,
  faServer,
  faShieldAlt
} from '@fortawesome/free-solid-svg-icons';
import NavigationBar from '../components/Navbar';
import Footer from '../components/Footer';
import ContactForm from '../components/forms/ContactForm';
import './Home.css';

const capabilities = [
  {
    icon: faCode,
    title: 'Software Engineering',
    description: 'We design and build secure web apps, portals, internal tools, and scalable digital products.',
    image: '/images/hero-coding.jpeg',
    points: ['Custom website solutions', 'Scalable web applications'],
    leftNotes: [
      'Custom software platforms built around your workflow.',
      'Web systems that are fast, secure, and ready to scale.',
      'Dashboards and portals that make operations easier to manage.'
    ],
    rightNotes: [
      'Modern interfaces that feel premium from the first click.',
      'API-ready architecture for future growth and integrations.',
      'Reliable engineering for internal and customer-facing tools.'
    ]
  },
  {
    icon: faMicrochip,
    title: 'Hardware Integration',
    description: 'We connect devices, sensors, POS systems, biometrics, and edge hardware into reliable workflows.',
    image: '/images/pos-system.jpeg',
    points: ['Connected devices and sensors', 'Operational hardware automation'],
    leftNotes: [
      'Smart integrations for POS, sensors, and business devices.',
      'Operational visibility across your hardware footprint.',
      'Stable connections between physical tools and software platforms.'
    ],
    rightNotes: [
      'Fewer manual processes across branches and field teams.',
      'Reliable device data flowing into your core systems.',
      'Infrastructure designed for real-world business environments.'
    ]
  },
  {
    icon: faNetworkWired,
    title: 'Networking & Infrastructure',
    description: 'We deploy cloud, on-prem, and hybrid infrastructure with performance, uptime, and security in mind.',
    image: '/images/analytics-system.jpeg',
    points: ['Secure cloud deployment', 'High-uptime network systems'],
    leftNotes: [
      'Cloud, hybrid, and on-prem environments designed to stay available.',
      'Network performance planning for growing companies.',
      'Secure infrastructure that supports business continuity.'
    ],
    rightNotes: [
      'Faster operations across teams, sites, and platforms.',
      'Better visibility across services, traffic, and access.',
      'A stronger foundation for AI, apps, and enterprise systems.'
    ]
  },
  {
    icon: faServer,
    title: 'AI Systems',
    description: 'We turn AI into practical business tools with automation, analytics, copilots, and intelligent operations.',
    image: '/images/hospital-system.jpeg',
    points: ['Intelligent business automation', 'AI workflow integration'],
    leftNotes: [
      'Automate workflows, support, and internal business processes.',
      'Use AI to reduce delays and improve team efficiency.',
      'Transform complex operations into clearer, smarter workflows.'
    ],
    rightNotes: [
      'AI systems tailored to the needs of your industry.',
      'Practical automation instead of vague AI promises.',
      'Sharper decision-making through intelligent analytics.'
    ]
  }
];

const differentiators = [
  'Clear technical strategy from interface to infrastructure',
  'Production-ready systems across AI, software, hardware, and networking',
  'Clean user experiences that build confidence from the first visit',
  'Delivery built for businesses in Ghana, Zambia, and beyond'
];

const showcaseProjects = [
  {
    title: 'Hospital Operations Platform',
    category: 'AI + Software',
    image: '/images/hospital-system.jpeg',
    description: 'A modern operating layer for appointments, patient workflows, reporting, and service visibility.'
  },
  {
    title: 'Retail POS & Device Stack',
    category: 'Hardware + Cloud',
    image: '/images/pos-system.jpeg',
    description: 'Connected payment, inventory, and branch-level dashboards built for fast-moving retail teams.'
  },
  {
    title: 'Property Intelligence Suite',
    category: 'Software + Analytics',
    image: '/images/property-system.jpeg',
    description: 'Operations, listings, and insight tools that help property teams manage assets with clarity.'
  },
  {
    title: 'School Management System',
    category: 'Platform Engineering',
    image: '/images/school-system.jpeg',
    description: 'Admissions, billing, class operations, and reporting brought into one dependable digital system.'
  }
];

const deliverySteps = [
  {
    step: '01',
    title: 'Discover',
    description: 'We map the business workflow, the infrastructure gap, and the highest-value automation opportunities.'
  },
  {
    step: '02',
    title: 'Architect',
    description: 'We align software, hardware touchpoints, networking, and security before development begins.'
  },
  {
    step: '03',
    title: 'Build',
    description: 'We ship clean interfaces, stable services, and the integrations your operations depend on.'
  },
  {
    step: '04',
    title: 'Scale',
    description: 'We support optimization, rollout, analytics, and new AI capabilities as your business grows.'
  }
];

const leadership = [
  {
    name: 'Hodalor Prince',
    role: 'Co-Founder, Senior Developer',
    bio: 'Focuses on engineering systems that are dependable, maintainable, and ready for real operations.'
  },
  {
    name: 'Seth Donkor',
    role: 'CEO, Marketing Lead',
    bio: 'Connects technical delivery with market opportunity, commercial strategy, and client growth.'
  },
  {
    name: 'Abdellah Alhassan',
    role: 'Co-Founder, Lead Developer',
    bio: 'Leads full-stack product execution across web platforms, backend services, and integrations.'
  },
  {
    name: 'Emmanuel Baffour Kyei',
    role: 'UX/UI, Brand Experience',
    bio: 'Shapes visual systems and interfaces that make advanced technology feel clear and trustworthy.'
  }
];

const partnerLogos = [
  '/images/partner-aws.svg',
  '/images/partner-google.svg',
  '/images/partner-microsoft.svg',
  '/images/partner-ibm.svg',
  '/images/partner-oracle.svg',
  '/images/partner-salesforce.svg'
];

const metricCards = [
  { label: 'Core capability', value: 'AI + Software + Hardware + Network' },
  { label: 'Delivery focus', value: 'Operational systems that scale' },
  { label: 'Regional footprint', value: 'Ghana and Zambia' }
];

const floatingStats = [
  { value: '1500+', label: 'Projects delivered', className: 'tech-float-card--one' },
  { value: '1150+', label: 'Client interactions improved', className: 'tech-float-card--two' },
  { value: '24/7', label: 'Automation-ready operations', className: 'tech-float-card--three' }
];

const Home: React.FC = () => {
  const [showContactForm, setShowContactForm] = useState(false);
  const [activeCapability, setActiveCapability] = useState(capabilities[0].title);

  const capabilityDetail = useMemo(
    () => capabilities.find((item) => item.title === activeCapability) ?? capabilities[0],
    [activeCapability]
  );

  return (
    <div id="home" className="tech-home">
      <NavigationBar />

      <section id="hero" className="tech-hero">
        <div className="tech-hero__glow tech-hero__glow--left" />
        <div className="tech-hero__glow tech-hero__glow--right" />
        <Container fluid className="tech-shell position-relative">
          <Row className="align-items-center gy-5">
            <Col lg={7}>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="tech-eyebrow">Built for modern operations</span>
                <h1 className="tech-hero__title">
                  We engineer AI, software, hardware, and networking into one powerful business experience.
                </h1>
                <p className="tech-hero__subtitle">
                  Prynova helps companies look forward and operate smarter with premium digital products,
                  intelligent systems, secure infrastructure, and experiences that feel unmistakably high-tech.
                </p>

                <div className="tech-hero__actions">
                  <Button
                    className="tech-primary-btn"
                    onClick={() => setShowContactForm(true)}
                  >
                    Start a Project <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
                  </Button>
                  <Button
                    variant="outline-light"
                    className="tech-secondary-btn"
                    href="#solutions"
                  >
                    View Our Work
                  </Button>
                </div>

                <div className="tech-pill-group">
                  {['AI Systems', 'Software Platforms', 'Hardware Integration', 'Cloud & Networking'].map((pill) => (
                    <span key={pill} className="tech-pill">
                      {pill}
                    </span>
                  ))}
                </div>
              </motion.div>
            </Col>

            <Col lg={5}>
              <motion.div
                className="tech-hero-visual"
                initial={{ opacity: 0, scale: 0.96, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
              >
                <div className="tech-hero-visual__grid" />
                <div className="tech-hero-visual__orb tech-hero-visual__orb--outer" />
                <div className="tech-hero-visual__orb tech-hero-visual__orb--middle" />
                <div className="tech-hero-visual__orb tech-hero-visual__orb--inner" />

                <div className="tech-hero-portrait">
                  <img src="/images/hero-coding.jpeg" alt="Prynova technology experience" />
                </div>

                {floatingStats.map((item) => (
                  <div key={item.label} className={`tech-float-card ${item.className}`}>
                    <strong>{item.value}</strong>
                    <span>{item.label}</span>
                  </div>
                ))}

                <div className="tech-command-panel">
                  <div className="tech-command-panel__header">
                    <span>System overview</span>
                    <span className="tech-status-dot">Live</span>
                  </div>

                  <div className="tech-command-panel__grid">
                    {metricCards.map((item) => (
                      <div key={item.label} className="tech-metric-card">
                        <small>{item.label}</small>
                        <strong>{item.value}</strong>
                      </div>
                    ))}
                  </div>

                  <div className="tech-command-panel__stack">
                    <div className="tech-stack-card">
                      <span>AI Layer</span>
                      <strong>Automation, copilots, analytics</strong>
                    </div>
                    <div className="tech-stack-card">
                      <span>Application Layer</span>
                      <strong>Web, mobile, dashboards, APIs</strong>
                    </div>
                    <div className="tech-stack-card">
                      <span>Infrastructure Layer</span>
                      <strong>Cloud, hardware, connectivity, security</strong>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="tech-trust-strip">
        <Container fluid className="tech-shell">
          <p className="tech-trust-strip__label">Technology partnerships and enterprise-aligned thinking that strengthen every delivery.</p>
          <div className="tech-logo-row">
            {partnerLogos.map((logo) => (
              <div key={logo} className="tech-logo-item">
                <img src={logo} alt="Technology partner logo" />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="capabilities" className="tech-section">
        <Container fluid className="tech-shell">
          <div className="text-center tech-section__intro">
            <span className="tech-section__eyebrow">Capabilities</span>
            <h2 className="tech-section__title">Technology capability that runs deeper than the first screen.</h2>
            <p className="tech-section__copy">
              A more visual service layer makes the site feel closer to a modern AI product company
              than a static brochure.
            </p>
          </div>

          <div className="tech-service-grid">
            {capabilities.map((capability, index) => (
              <motion.button
                key={capability.title}
                type="button"
                className={`tech-service-card ${activeCapability === capability.title ? 'is-active' : ''}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                onClick={() => setActiveCapability(capability.title)}
              >
                <div className="tech-service-card__header">
                  <div className="tech-capability-card__icon">
                    <FontAwesomeIcon icon={capability.icon} />
                  </div>
                  <h3>{capability.title}</h3>
                </div>
                <div className="tech-service-card__image">
                  <img src={capability.image} alt={capability.title} />
                </div>
                <p>{capability.description}</p>
                <ul className="tech-service-card__points">
                  {capability.points.map((point) => (
                    <li key={point}>
                      <FontAwesomeIcon icon={faCheckCircle} />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.button>
            ))}
          </div>

          <div className="tech-ai-stage">
            <div className="tech-ai-stage__column">
              {capabilityDetail.leftNotes.map((item, index) => (
                <motion.div
                  key={item}
                  className="tech-ai-note"
                  initial={{ opacity: 0, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                >
                  <div className="tech-ai-note__icon">
                    <FontAwesomeIcon icon={capabilityDetail.icon} />
                  </div>
                  <p>{item}</p>
                </motion.div>
              ))}
            </div>

            <div className="tech-ai-core-wrap">
              <div className="tech-ai-core__ring tech-ai-core__ring--one" />
              <div className="tech-ai-core__ring tech-ai-core__ring--two" />
              <div className="tech-ai-core__ring tech-ai-core__ring--three" />
              <div className="tech-ai-core">
                <span>AI</span>
                <strong>{capabilityDetail.title}</strong>
              </div>
              <div className="tech-ai-core__pulse" />
              <div className="tech-ai-core__pulse tech-ai-core__pulse--delay" />
              <div className="tech-ai-core__chips">
                {['Data', 'Cloud', 'Apps', 'Network'].map((chip) => (
                  <span key={chip}>{chip}</span>
                ))}
              </div>
            </div>

            <div className="tech-ai-stage__column">
              {capabilityDetail.rightNotes.map((item, index) => (
                <motion.div
                  key={item}
                  className="tech-ai-note"
                  initial={{ opacity: 0, x: 18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                >
                  <div className="tech-ai-note__icon">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </div>
                  <p>{item}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <Row className="g-4 mt-2">
            <Col lg={7}>
              <div className="tech-capability-grid">
                {differentiators.map((item, index) => (
                  <motion.div
                    key={item}
                    className="tech-capability-card tech-capability-card--mini"
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.45, delay: index * 0.08 }}
                  >
                    <div className="tech-capability-card__icon">
                      <FontAwesomeIcon icon={faCheckCircle} />
                    </div>
                    <div>
                      <p>{item}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Col>
            <Col lg={5}>
              <motion.div
                className="tech-highlight-panel"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5 }}
              >
                <span className="tech-highlight-panel__label">Currently selected</span>
                <h3>{capabilityDetail.title}</h3>
                <p>{capabilityDetail.description}</p>
                <div className="tech-highlight-panel__image">
                  <img src={capabilityDetail.image} alt={capabilityDetail.title} />
                </div>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      <section id="why-us" className="tech-section tech-section--alt">
        <Container fluid className="tech-shell">
          <Row className="g-4">
            <Col lg={3} md={6}>
              <div className="tech-stat-card">
                <FontAwesomeIcon icon={faLaptopCode} />
                <h3>Product-grade UX</h3>
                <p>Interfaces with the polish people expect from a serious technology brand.</p>
              </div>
            </Col>
            <Col lg={3} md={6}>
              <div className="tech-stat-card">
                <FontAwesomeIcon icon={faCloud} />
                <h3>Scalable delivery</h3>
                <p>Cloud-ready architectures that support growth, uptime, and regional expansion.</p>
              </div>
            </Col>
            <Col lg={3} md={6}>
              <div className="tech-stat-card">
                <FontAwesomeIcon icon={faShieldAlt} />
                <h3>Trust & reliability</h3>
                <p>Security-minded builds, clean structures, and systems made for business-critical use.</p>
              </div>
            </Col>
            <Col lg={3} md={6}>
              <div className="tech-stat-card">
                <FontAwesomeIcon icon={faChartLine} />
                <h3>Commercial clarity</h3>
                <p>Messaging that explains value fast, so visitors understand what Prynova actually delivers.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section id="solutions" className="tech-section">
        <Container fluid className="tech-shell">
          <div className="text-center tech-section__intro">
            <span className="tech-section__eyebrow">Selected Solutions</span>
            <h2 className="tech-section__title">Proof that looks and feels like a technology company.</h2>
            <p className="tech-section__copy">
              Explore the kind of digital products and operational platforms we design for ambitious teams.
            </p>
          </div>

          <Row className="g-4">
            {showcaseProjects.map((project, index) => (
              <Col lg={6} key={project.title}>
                <motion.div
                  className="tech-showcase-card"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                >
                  <div className="tech-showcase-card__image-wrap">
                    <img src={project.image} alt={project.title} />
                  </div>
                  <div className="tech-showcase-card__body">
                    <span>{project.category}</span>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                  </div>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section id="process" className="tech-section tech-section--process">
        <Container fluid className="tech-shell">
          <div className="text-center tech-section__intro">
            <span className="tech-section__eyebrow">Execution Model</span>
            <h2 className="tech-section__title">From first conversation to deployed system.</h2>
            <p className="tech-section__copy">
              A disciplined delivery model helps us turn ambitious ideas into stable, scalable systems.
            </p>
          </div>

          <Row className="g-4">
            {deliverySteps.map((item, index) => (
              <Col lg={3} md={6} key={item.step}>
                <motion.div
                  className="tech-process-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                >
                  <span className="tech-process-card__step">{item.step}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section id="team" className="tech-section tech-section--alt">
        <Container fluid className="tech-shell">
          <div className="text-center tech-section__intro">
            <span className="tech-section__eyebrow">Leadership</span>
            <h2 className="tech-section__title">The people behind the systems.</h2>
            <p className="tech-section__copy">
              Meet the team shaping technology experiences that are practical, ambitious, and ready for the market.
            </p>
          </div>

          <Row className="g-4">
            {leadership.map((member, index) => (
              <Col lg={3} md={6} key={member.name}>
                <motion.div
                  className="tech-team-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                >
                  <div className="tech-team-card__avatar">
                    {member.name
                      .split(' ')
                      .slice(0, 2)
                      .map((part) => part[0])
                      .join('')}
                  </div>
                  <h3>{member.name}</h3>
                  <strong>{member.role}</strong>
                  <p>{member.bio}</p>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section id="contact" className="tech-section tech-contact-section">
        <Container fluid className="tech-shell">
          <Row className="g-4 align-items-start">
            <Col lg={5}>
              <span className="tech-section__eyebrow">Contact</span>
              <h2 className="tech-section__title">Let’s build the version of your company people remember.</h2>
              <p className="tech-section__copy">
                Whether you need an AI-driven workflow, a platform rebuild, hardware integration,
                or stronger networking infrastructure, Prynova can help you ship with confidence.
              </p>

              <div className="tech-contact-info">
                <div>
                  <FontAwesomeIcon icon={faGlobe} />
                  <div>
                    <strong>Locations</strong>
                    <span>Accra, Ghana and Lusaka, Zambia</span>
                  </div>
                </div>
                <div>
                  <FontAwesomeIcon icon={faHeadset} />
                  <div>
                    <strong>Call</strong>
                    <span>+233 (0) 24 026 2600 | +260 97 459 5105</span>
                  </div>
                </div>
                <div>
                  <FontAwesomeIcon icon={faCloud} />
                  <div>
                    <strong>Email</strong>
                    <span>prynovatechnologies@gmail.com</span>
                  </div>
                </div>
              </div>
            </Col>

            <Col lg={7}>
              <div className="tech-contact-form">
                <ContactForm />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Footer />

      <Modal
        show={showContactForm}
        onHide={() => setShowContactForm(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Start Your Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ContactForm isModal onClose={() => setShowContactForm(false)} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Home;
