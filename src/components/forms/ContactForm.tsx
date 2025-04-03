import React, { useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { motion } from 'framer-motion';

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

export default ContactForm;