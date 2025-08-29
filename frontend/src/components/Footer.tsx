import React from 'react';
import {
  Box,
  Container,
  Typography,
  Link,
  IconButton,
  Grid,
} from '@mui/material';
import {
  Facebook,
  Instagram,
  WhatsApp,
  Email,
  Phone,
} from '@mui/icons-material';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              E-Commerce Store
            </Typography>
            <Typography variant="body2">
              Your one-stop shop for all your needs. Quality products at competitive prices.
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Contact Information
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Email sx={{ mr: 1 }} />
              <Link href="mailto:raju.s.sharma011@gmail.com" color="inherit">
                raju.s.sharma011@gmail.com
              </Link>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Phone sx={{ mr: 1 }} />
              <Link href="tel:+917348995264" color="inherit">
                +91 7348995264
              </Link>
            </Box>
            <Typography variant="body2">
              Developer: Raju Sharma
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton
                color="inherit"
                href="https://instagram.com/ecomstore"
                target="_blank"
              >
                <Instagram />
              </IconButton>
              <IconButton
                color="inherit"
                href="https://facebook.com/ecomstore"
                target="_blank"
              >
                <Facebook />
              </IconButton>
              <IconButton
                color="inherit"
                href="https://wa.me/917348995264"
                target="_blank"
              >
                <WhatsApp />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        
        <Box sx={{ mt: 4, pt: 2, borderTop: 1, borderColor: 'rgba(255,255,255,0.2)' }}>
          <Typography variant="body2" align="center">
            © 2024 E-Commerce Store. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
