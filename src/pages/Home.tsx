import React from 'react';
import { Box, Button, Container, Typography, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Hero Section */}
      <Box 
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to Prynova
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            Your trusted platform for innovative solutions
          </Typography>
          <Button 
            variant="contained" 
            color="secondary" 
            size="large"
            onClick={() => navigate('/payment')}
            sx={{ mt: 4 }}
          >
            Get Started
          </Button>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          Our Features
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {[
            { title: 'Feature 1', description: 'Description of feature 1 and its benefits.' },
            { title: 'Feature 2', description: 'Description of feature 2 and its benefits.' },
            { title: 'Feature 3', description: 'Description of feature 3 and its benefits.' },
          ].map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
                <Typography variant="h6" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body1">
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Call to Action */}
      <Box sx={{ bgcolor: 'grey.100', py: 8, textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography variant="h4" gutterBottom>
            Ready to get started?
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            onClick={() => navigate('/login')}
            sx={{ mt: 2, mr: 2 }}
          >
            Sign In
          </Button>
          <Button 
            variant="outlined" 
            color="primary" 
            size="large"
            onClick={() => navigate('/payment')}
            sx={{ mt: 2 }}
          >
            Subscribe Now
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;