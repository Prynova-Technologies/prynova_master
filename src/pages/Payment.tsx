import { useState, useEffect } from 'react'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import { paymentApi } from '../services/api'
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Tabs, 
  Tab, 
  Paper, 
  Stepper, 
  Step, 
  StepLabel,
  Card,
  CardContent,
  Grid,
  Alert
} from '@mui/material'

export default function Payment() {
  // Step management
  const [activeStep, setActiveStep] = useState(0)
  
  // Customer information (Step 1)
  const [customerId, setCustomerId] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [subscriptionAmount, setSubscriptionAmount] = useState(0)
  const [paymentId, setPaymentId] = useState('')
  
  // Payment method (Step 2)
  const [activeTab, setActiveTab] = useState(0)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [transactionPin, setTransactionPin] = useState('')
  
  // Order summary (Step 3)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [paymentComplete, setPaymentComplete] = useState(false)

  const paypalClientId = import.meta.env.VITE_PAYPAL_CLIENT_ID

  // Fetch customer subscription amount when customerId changes in step 1
  useEffect(() => {
    if (customerId && activeStep === 1) {
      const fetchSubscriptionDetails = async () => {
        try {
          const details = await paymentApi.getSubscriptionDetails(customerId)
          setSubscriptionAmount(details.subscriptionAmount)
          setCompanyName(details.companyName)
        } catch (error) {
          console.error('Error fetching subscription details:', error)
          // Handle error - could show an alert
        }
      }
      
      fetchSubscriptionDetails()
    }
  }, [customerId, activeStep])

  const handlePaymentSuccess = async (details: any) => {
    try {
      console.log('Payment completed:', details)
      
      // Capture the payment through our backend
      const response = await paymentApi.capturePayment(details.id, customerId)
      
      // Store the payment ID from the response
      setPaymentId(response.paymentId)
      
      setPaymentComplete(true)
      setActiveStep(2) // Move to final step
    } catch (error) {
      console.error('Error processing payment:', error)
      // Handle payment error
    }
  }

  const handleMTNPayment = () => {
    setIsSubmitting(true)
    console.log('Processing MTN payment', { 
      phoneNumber, 
      transactionPin,
      customerId,
      companyName
    })
    // TODO: Add API call for mobile money payment
    setTimeout(() => {
      setIsSubmitting(false)
      setPaymentComplete(true)
      setActiveStep(2) // Move to final step
    }, 1500)
  }

  // Handle next step navigation
  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1)
  }

  // Handle previous step navigation
  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1)
  }

  // Check if customer info form is valid
  const isCustomerInfoValid = customerId.trim() !== '' && companyName.trim() !== ''

  // Check if payment form is valid
  const isPaymentFormValid = () => {
    if (activeTab === 0) {
      // PayPal is always valid as it's handled by PayPal's UI
      return true
    } else if (activeTab === 1) {
      // MTN Mobile Money validation
      return phoneNumber.trim() !== '' && transactionPin.trim() !== ''
    }
    return false
  }

  // Render step content based on active step
  const getStepContent = (step: number) => {
    switch (step) {
      case 0: // Customer Information
        return (
          <Card variant="outlined" sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Customer Information</Typography>
              <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label="Customer ID"
                  variant="outlined"
                  value={customerId}
                  onChange={(e) => setCustomerId(e.target.value)}
                  required
                  fullWidth
                />
                <TextField
                  label="Company/Store Name"
                  variant="outlined"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                  fullWidth
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  disabled={!isCustomerInfoValid}
                  sx={{ mt: 2 }}
                >
                  Next
                </Button>
              </Box>
            </CardContent>
          </Card>
        )
      
      case 1: // Payment Options
        return (
          <Card variant="outlined" sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Payment Method</Typography>
              
              <Paper sx={{ mb: 2 }}>
                <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)} centered>
                  <Tab label="PayPal" />
                  <Tab label="MTN Mobile Money" />
                </Tabs>
              </Paper>

              {activeTab === 0 && (
                <PayPalScriptProvider options={{
                  clientId: paypalClientId,
                  currency: 'USD',
                  intent: 'capture'
                }}>
                  <PayPalButtons
                    style={{ layout: 'vertical' }}
                    createOrder={async () => {
                      try {
                        // Create order through our backend API
                        const orderData = await paymentApi.createOrder(customerId)
                        return orderData.orderId
                      } catch (error) {
                        console.error('Error creating order:', error)
                        throw new Error('Could not create order')
                      }
                    }}
                    onApprove={async (_, actions) => {
                      const details = await actions.order?.capture()
                      handlePaymentSuccess(details)
                    }}
                  />
                </PayPalScriptProvider>
              )}

              {activeTab === 1 && (
                <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField
                    label="MTN Mobile Number"
                    variant="outlined"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    fullWidth
                    required
                  />
                  <TextField
                    label="Transaction PIN"
                    type="password"
                    variant="outlined"
                    value={transactionPin}
                    onChange={(e) => setTransactionPin(e.target.value)}
                    fullWidth
                    required
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Button
                      variant="outlined"
                      onClick={handleBack}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handleMTNPayment}
                      disabled={!isPaymentFormValid() || isSubmitting}
                    >
                      {isSubmitting ? 'Processing...' : 'Pay with MTN'}
                    </Button>
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>
        )
      
      case 2: // Finalize/Confirmation
        return (
          <Card variant="outlined" sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Payment Confirmation</Typography>
              
              {paymentComplete ? (
                <>
                  <Alert severity="success" sx={{ mb: 2 }}>
                    Payment completed successfully!
                  </Alert>
                  
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2">Customer ID</Typography>
                      <Typography variant="body1">{customerId}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2">Company/Store</Typography>
                      <Typography variant="body1">{companyName}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2">Amount</Typography>
                      <Typography variant="body1">${subscriptionAmount.toFixed(2)} USD</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2">Payment Method</Typography>
                      <Typography variant="body1">{activeTab === 0 ? 'PayPal' : 'MTN Mobile Money'}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2">Transaction ID</Typography>
                      <Typography variant="body1">{paymentId || 'Processing...'}</Typography>
                    </Grid>
                  </Grid>
                  
                  <Box sx={{ mt: 3, textAlign: 'center' }}>
                    <Button 
                      variant="contained" 
                      color="primary"
                      onClick={() => {
                        // Reset the form
                        setActiveStep(0)
                        setCustomerId('')
                        setCompanyName('')
                        setPhoneNumber('')
                        setTransactionPin('')
                        setPaymentComplete(false)
                      }}
                    >
                      Start New Payment
                    </Button>
                  </Box>
                </>
              ) : (
                <>
                  <Alert severity="info" sx={{ mb: 2 }}>
                    Processing your payment...
                  </Alert>
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <Button
                      variant="outlined"
                      onClick={handleBack}
                    >
                      Back to Payment
                    </Button>
                  </Box>
                </>
              )}
            </CardContent>
          </Card>
        )
      
      default:
        return 'Unknown step'
    }
  }

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', mt: 4, px: 2 }}>
      <Typography variant="h4" gutterBottom>Payment Process</Typography>
      
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        <Step>
          <StepLabel>Customer Info</StepLabel>
        </Step>
        <Step>
          <StepLabel>Payment Options</StepLabel>
        </Step>
        <Step>
          <StepLabel>Finalize</StepLabel>
        </Step>
      </Stepper>
      
      {getStepContent(activeStep)}
    </Box>
  )
}
