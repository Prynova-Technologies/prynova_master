import { useState } from 'react'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import { Box, Typography, TextField, Button, Tabs, Tab, Paper } from '@mui/material'

export default function Payment() {
  const [activeTab, setActiveTab] = useState(0)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [transactionPin, setTransactionPin] = useState('')

  const paypalClientId = import.meta.env.VITE_PAYPAL_CLIENT_ID

  const handlePaymentSuccess = (details: any) => {
    console.log('Payment completed:', details)
    // TODO: Add API call to process payment
  }

  const handleMTNPayment = () => {
    console.log('Processing MTN payment', { phoneNumber, transactionPin })
    // TODO: Add API call for mobile money payment
  }

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>Payment Options</Typography>
      
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
            createOrder={(_, actions) => actions.order.create({
              purchase_units: [{
                amount: {
                  value: '100.00', // TODO: Replace with dynamic value
                  currency_code: 'USD'
                }
              }]
            })}
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
          />
          <TextField
            label="Transaction PIN"
            type="password"
            variant="outlined"
            value={transactionPin}
            onChange={(e) => setTransactionPin(e.target.value)}
            fullWidth
          />
          <Button
            variant="contained"
            size="large"
            onClick={handleMTNPayment}
            sx={{ mt: 2 }}
          >
            Pay with MTN
          </Button>
        </Box>
      )}
    </Box>
  )
}