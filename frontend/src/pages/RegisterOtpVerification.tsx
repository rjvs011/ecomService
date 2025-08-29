import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AppDispatch, RootState } from '../store';
import { login } from '../store/slices/authSlice';

const RegisterOtpVerification: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.auth);

  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  // Get email from location state
  const email = location.state?.email;

  if (!email) {
    navigate('/register');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!otp.trim()) {
      setError('Please enter the OTP');
      return;
    }

    if (otp.length !== 6) {
      setError('OTP must be 6 digits');
      return;
    }

    setIsVerifying(true);

    try {
      const response = await axios.post('/api/auth/register/verify-otp', null, {
        params: { email, otp },
      });

      if (response.data.token) {
        // User is registered and logged in
        localStorage.setItem('token', response.data.token);
        toast.success('Registration successful! You are now logged in.');
        navigate('/');
      } else {
        toast.success('Registration successful! Please login with your credentials.');
        navigate('/login');
      }
    } catch (error: any) {
      setError(error.response?.data || 'OTP verification failed');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setError('');
      await axios.post('/api/auth/register/resend-otp', null, {
        params: { email },
      });
      toast.success('OTP resent to your email');
    } catch (error: any) {
      setError(error.response?.data || 'Failed to resend OTP');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom textAlign="center">
          Verify Your Email
        </Typography>
        
        <Typography variant="body1" sx={{ mb: 3, textAlign: 'center' }}>
          We've sent a 6-digit verification code to<br />
          <strong>{email}</strong>
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '').slice(0, 6);
              setOtp(value);
              setError('');
            }}
            margin="normal"
            placeholder="000000"
            inputProps={{
              style: { textAlign: 'center', fontSize: '1.5rem', letterSpacing: '0.5rem' },
              maxLength: 6,
            }}
            required
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isVerifying || loading}
          >
            {isVerifying ? <CircularProgress size={24} /> : 'Verify & Complete Registration'}
          </Button>
          
          <Box sx={{ textAlign: 'center' }}>
            <Button
              variant="text"
              onClick={handleResendOtp}
              disabled={isVerifying}
            >
              Resend OTP
            </Button>
          </Box>
        </Box>

        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="textSecondary">
            Didn't receive the code? Check your spam folder or click resend.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default RegisterOtpVerification;
