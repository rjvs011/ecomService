import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Divider,
  Alert,
  CircularProgress,
  Link,
  Grid,
} from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AppDispatch, RootState } from '../store';
import { login, clearError, verifyOtp } from '../store/slices/authSlice';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, token } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showOtpLogin, setShowOtpLogin] = useState(false);
  const [otpStep, setOtpStep] = useState<'email' | 'otp'>('email'); // Track OTP flow step
  const [otpEmail, setOtpEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpLoading, setOtpLoading] = useState(false);

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(login(formData)).unwrap();
      toast.success('Login successful!');
      navigate('/');
    } catch (error) {
      // Error is handled by the slice
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpEmail.trim()) {
      toast.error('Please enter your email address');
      return;
    }

    setOtpLoading(true);
    try {
      await axios.post('/api/auth/send-otp', null, {
        params: { email: otpEmail }
      });
      toast.success('OTP sent to your email!');
      setOtpStep('otp');
    } catch (error: any) {
      toast.error(error.response?.data || 'Failed to send OTP');
    } finally {
      setOtpLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp.trim()) {
      toast.error('Please enter the OTP');
      return;
    }

    try {
      await dispatch(verifyOtp({ email: otpEmail, otp })).unwrap();
      toast.success('Login successful!');
      navigate('/');
    } catch (error) {
      // Error is handled by the slice
    }
  };

  const resetOtpFlow = () => {
    setShowOtpLogin(false);
    setOtpStep('email');
    setOtpEmail('');
    setOtp('');
  };

  const handleOAuthLogin = (provider: string) => {
    toast.info(`${provider} OAuth login coming soon!`);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom textAlign="center">
          {showOtpLogin && otpStep === 'otp' ? 'Enter OTP' : 
           showOtpLogin && otpStep === 'email' ? 'Login with OTP' : 'Login'}
        </Typography>
        
        {showOtpLogin ? (
          // OTP Login Flow
          <>
            {otpStep === 'email' ? (
              // Step 1: Ask for email
              <Box component="form" onSubmit={handleSendOtp} sx={{ mt: 3 }}>
                <Typography variant="body1" sx={{ mb: 2, textAlign: 'center' }}>
                  Enter your email address to receive an OTP
                </Typography>
                <TextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  value={otpEmail}
                  onChange={(e) => setOtpEmail(e.target.value)}
                  margin="normal"
                  required
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={otpLoading}
                >
                  {otpLoading ? <CircularProgress size={24} /> : 'Send OTP'}
                </Button>
                <Button
                  fullWidth
                  variant="text"
                  onClick={resetOtpFlow}
                  sx={{ mt: 1 }}
                >
                  Back to Login
                </Button>
              </Box>
            ) : (
              // Step 2: Ask for OTP
              <Box component="form" onSubmit={handleOtpSubmit} sx={{ mt: 3 }}>
                <Typography variant="body1" sx={{ mb: 2, textAlign: 'center' }}>
                  We've sent a 6-digit code to<br />
                  <strong>{otpEmail}</strong>
                </Typography>
                <TextField
                  fullWidth
                  label="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                    setOtp(value);
                  }}
                  margin="normal"
                  required
                  inputProps={{
                    style: { textAlign: 'center', fontSize: '1.5rem', letterSpacing: '0.5rem' },
                    maxLength: 6,
                  }}
                  placeholder="000000"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : 'Verify & Login'}
                </Button>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      variant="text"
                      onClick={() => setOtpStep('email')}
                    >
                      Change Email
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      variant="text"
                      onClick={handleSendOtp}
                      disabled={otpLoading}
                    >
                      {otpLoading ? <CircularProgress size={16} /> : 'Resend OTP'}
                    </Button>
                  </Grid>
                </Grid>
                <Button
                  fullWidth
                  variant="text"
                  onClick={resetOtpFlow}
                  sx={{ mt: 1 }}
                >
                  Back to Login
                </Button>
              </Box>
            )}
          </>
        ) : (
          <>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                margin="normal"
                required
                autoComplete="email"
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                margin="normal"
                required
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Login'}
              </Button>
            </Box>

            <Divider sx={{ my: 2 }}>OR</Divider>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => handleOAuthLogin('Google')}
                  sx={{ textTransform: 'none' }}
                >
                  Google
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => handleOAuthLogin('Facebook')}
                  sx={{ textTransform: 'none' }}
                >
                  Facebook
                </Button>
              </Grid>
            </Grid>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Button
                variant="text"
                onClick={() => setShowOtpLogin(true)}
                sx={{ mb: 1 }}
              >
                Login with OTP
              </Button>
              <Typography variant="body2" sx={{ mt: 2 }}>
                Don't have an account?{' '}
                <Link component={RouterLink} to="/register" variant="body2">
                  Sign up here
                </Link>
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                <Link component={RouterLink} to="/forgot-password" variant="body2">
                  Forgot your password?
                </Link>
              </Typography>
            </Box>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default Login;
