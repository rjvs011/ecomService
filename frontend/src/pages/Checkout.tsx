import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Divider,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Alert,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { RootState } from '../store';
import { clearCart } from '../store/slices/cartSlice';

const steps = ['Shipping Information', 'Payment Method', 'Review & Confirm'];

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.cart);

  const [activeStep, setActiveStep] = useState(0);
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
  });
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const calculateSubtotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.1;
  };

  const calculateShipping = () => {
    return calculateSubtotal() > 50 ? 0 : 10;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() + calculateShipping();
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      handlePlaceOrder();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handlePlaceOrder = () => {
    // Simulate order placement
    toast.success('Order placed successfully!');
    dispatch(clearCart());
    navigate('/');
  };

  const isStepValid = () => {
    switch (activeStep) {
      case 0:
        return Object.values(shippingInfo).every(value => value.trim() !== '');
      case 1:
        return paymentMethod && Object.values(paymentInfo).every(value => value.trim() !== '');
      default:
        return true;
    }
  };

  const renderShippingStep = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="First Name"
          value={shippingInfo.firstName}
          onChange={(e) => setShippingInfo({ ...shippingInfo, firstName: e.target.value })}
          required
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Last Name"
          value={shippingInfo.lastName}
          onChange={(e) => setShippingInfo({ ...shippingInfo, lastName: e.target.value })}
          required
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Email"
          type="email"
          value={shippingInfo.email}
          onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
          required
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Phone Number"
          value={shippingInfo.phone}
          onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
          required
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Address"
          value={shippingInfo.address}
          onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
          required
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="City"
          value={shippingInfo.city}
          onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
          required
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="State"
          value={shippingInfo.state}
          onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
          required
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="ZIP Code"
          value={shippingInfo.zipCode}
          onChange={(e) => setShippingInfo({ ...shippingInfo, zipCode: e.target.value })}
          required
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>Country</InputLabel>
          <Select
            value={shippingInfo.country}
            label="Country"
            onChange={(e) => setShippingInfo({ ...shippingInfo, country: e.target.value })}
          >
            <MenuItem value="US">United States</MenuItem>
            <MenuItem value="CA">Canada</MenuItem>
            <MenuItem value="UK">United Kingdom</MenuItem>
            <MenuItem value="IN">India</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );

  const renderPaymentStep = () => (
    <Box>
      <FormControl component="fieldset" sx={{ mb: 3 }}>
        <FormLabel component="legend">Payment Method</FormLabel>
        <RadioGroup
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <FormControlLabel value="credit" control={<Radio />} label="Credit Card" />
          <FormControlLabel value="debit" control={<Radio />} label="Debit Card" />
          <FormControlLabel value="paypal" control={<Radio />} label="PayPal" />
        </RadioGroup>
      </FormControl>

      {(paymentMethod === 'credit' || paymentMethod === 'debit') && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Card Number"
              value={paymentInfo.cardNumber}
              onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
              placeholder="1234 5678 9012 3456"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Cardholder Name"
              value={paymentInfo.cardName}
              onChange={(e) => setPaymentInfo({ ...paymentInfo, cardName: e.target.value })}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Expiry Date"
              value={paymentInfo.expiryDate}
              onChange={(e) => setPaymentInfo({ ...paymentInfo, expiryDate: e.target.value })}
              placeholder="MM/YY"
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="CVV"
              value={paymentInfo.cvv}
              onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
              placeholder="123"
              required
            />
          </Grid>
        </Grid>
      )}

      {paymentMethod === 'paypal' && (
        <Alert severity="info">
          You will be redirected to PayPal to complete your payment after placing the order.
        </Alert>
      )}
    </Box>
  );

  const renderReviewStep = () => (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Shipping Information
              </Typography>
              <Typography variant="body2">
                {shippingInfo.firstName} {shippingInfo.lastName}
              </Typography>
              <Typography variant="body2">{shippingInfo.email}</Typography>
              <Typography variant="body2">{shippingInfo.phone}</Typography>
              <Typography variant="body2">{shippingInfo.address}</Typography>
              <Typography variant="body2">
                {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
              </Typography>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Order Items
              </Typography>
              {items.map((item) => (
                <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">
                    {item.name} x {item.quantity}
                  </Typography>
                  <Typography variant="body2">${(item.price * item.quantity).toFixed(2)}</Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Subtotal</Typography>
                  <Typography variant="body2">${calculateSubtotal().toFixed(2)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Tax (10%)</Typography>
                  <Typography variant="body2">${calculateTax().toFixed(2)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body2">Shipping</Typography>
                  <Typography variant="body2">
                    {calculateShipping() === 0 ? 'Free' : `$${calculateShipping().toFixed(2)}`}
                  </Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6">Total</Typography>
                  <Typography variant="h6" color="primary">
                    ${calculateTotal().toFixed(2)}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );

  if (items.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="warning">
          Your cart is empty. Please add some items before proceeding to checkout.
        </Alert>
        <Button variant="contained" onClick={() => navigate('/products')} sx={{ mt: 2 }}>
          Continue Shopping
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Checkout
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ mb: 4 }}>
        {activeStep === 0 && renderShippingStep()}
        {activeStep === 1 && renderPaymentStep()}
        {activeStep === 2 && renderReviewStep()}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
        >
          Back
        </Button>
        <Button
          variant="contained"
          onClick={handleNext}
          disabled={!isStepValid()}
        >
          {activeStep === steps.length - 1 ? 'Place Order' : 'Next'}
        </Button>
      </Box>
    </Container>
  );
};

export default Checkout;
