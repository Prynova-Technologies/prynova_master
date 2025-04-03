import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError('Failed to sign in. Please check your credentials.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <Card className="shadow" style={{ maxWidth: "400px", width: "100%" }}>
        <Card.Body className="p-4">
          <div className="text-center mb-4">
            <div style={{ color: "#212529" }}>
              <h1 style={{ 
                fontWeight: 'bold', 
                marginBottom: '1.5rem',
                letterSpacing: '1px'
              }}>
                Login
              </h1>
            </div>
          </div>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded"
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="rounded"
              />
            </Form.Group>

            <div className="d-grid">
              <Button 
                variant="primary" 
                type="submit" 
                disabled={loading}
                className="rounded-pill py-2"
                style={{ backgroundColor: "#0d6efd", borderColor: "#0d6efd" }}
              >
                {loading ? 'Signing in...' : 'Login'}
              </Button>
            </div>
          </Form>

          <div className="text-center mt-4 text-muted">
            <div>Demo credentials:</div>
            <div>Admin: admin@example.com / password</div>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;