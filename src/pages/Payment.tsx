import React, { useState } from 'react';
import {
  Box,
  Button as MuiButton,
  Container as MuiContainer,
  Typography,
  Paper,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  Stepper,
  Step,
  StepLabel,
  Card as MuiCard,
  CardContent,
  CardActions,
  Divider,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const plans = [
    { name: 'Basic', price: '$9.99/month', features: ['Feature 1', 'Feature 2', 'Email support'] },
    { name: 'Pro', price: '$19.99/month', features: ['All Basic features', 'Feature 3', 'Feature 4', 'Priority support'] },
    { name: 'Enterprise', price: '$49.99/month', features: ['All Pro features', 'Feature 5', 'Feature 6', '24/7 support', 'Custom solutions'] },
  ];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handlePlanSelect = (planName: string) => {
    setSelectedPlan(planName);
  };

  const handlePaymentSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // In a real app, you would process payment here
    setPaymentSuccess(true);
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  const steps = ['Select Plan', 'Payment Details', 'Confirmation'];

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Choose a subscription plan
            </Typography>
            <Grid container spacing={3}>
              {plans.map((plan) => (
                <Grid item xs={12} md={6} lg={4} key={plan.name}>
                  <MuiCard 
                    variant="outlined" 
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      border: selectedPlan === plan.name ? '2px solid' : '1px solid',
                      borderColor: selectedPlan === plan.name ? 'primary.main' : 'divider',
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h5" component="h2">
                        {plan.name}
                      </Typography>
                      <Typography variant="h6" color="primary" gutterBottom>
                        {plan.price}
                      </Typography>
                      <Divider sx={{ my: 2 }} />
                      {plan.features.map((feature, index) => (
                        <Typography key={index} variant="body2" sx={{ py: 0.5 }}>
                          ✓ {feature}
                        </Typography>
                      ))}
                    </CardContent>
                    <CardActions>
                      <MuiButton 
                        fullWidth 
                        variant={selectedPlan === plan.name ? "contained" : "outlined"}
                        color="primary"
                        onClick={() => handlePlanSelect(plan.name)}
                      >
                        {selectedPlan === plan.name ? 'Selected' : 'Select'}
                      </MuiButton>
                    </CardActions>
                  </MuiCard>
                </Grid>
              ))}
            </Grid>
          </Box>
        );
      case 1:
        return (
          <Box component="form" onSubmit={handlePaymentSubmit} sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Payment Method
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="cardName"
                  label="Name on card"
                  fullWidth
                  autoComplete="cc-name"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="cardNumber"
                  label="Card number"
                  fullWidth
                  autoComplete="cc-number"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="expDate"
                  label="Expiry date"
                  fullWidth
                  autoComplete="cc-exp"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="cvv"
                  label="CVV"
                  helperText="Last three digits on signature strip"
                  fullWidth
                  autoComplete="cc-csc"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox color="primary" name="saveCard" value="yes" />}
                  label="Remember credit card details for next time"
                />
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <MuiButton onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                Back
              </MuiButton>
              <MuiButton
                variant="contained"
                color="primary"
                type="submit"
                sx={{ mt: 3, ml: 1 }}
              >
                Place Order
              </MuiButton>
            </Box>
          </Box>
        );
      case 2:
        return (
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            {paymentSuccess ? (
              <Alert severity="success" sx={{ mb: 3 }}>
                Payment successful! You will be redirected to the homepage.
              </Alert>
            ) : (
              <Typography variant="h6" gutterBottom>
                Processing payment...
              </Typography>
            )}
            <Typography variant="subtitle1">
              Thank you for your order.
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              Your order confirmation has been sent to your email.
            </Typography>
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <MuiContainer maxWidth="lg">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography component="h1" variant="h4" align="center" gutterBottom>
          Subscription Checkout
        </Typography>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {getStepContent(activeStep)}
        {activeStep === 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <MuiButton
              variant="contained"
              color="primary"
              onClick={handleNext}
              disabled={!selectedPlan}
            >
              Next
            </MuiButton>
          </Box>
        )}
      </Paper>
    </MuiContainer>
  );
};

export default PaymentPage;