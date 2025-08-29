import React, { useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Chip,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { fetchProducts } from '../store/slices/productSlice';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Ensure products is always an array before using slice
  const featuredProducts = Array.isArray(products) ? products.slice(0, 4) : [];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          minHeight: '70vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  fontSize: { xs: '2.5rem', md: '4rem' },
                  fontWeight: 800,
                  mb: 3,
                  fontFamily: '"Poppins", sans-serif',
                  lineHeight: 1.1,
                  background: 'linear-gradient(45deg, #ffffff, #e3f2fd)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 4px 8px rgba(0,0,0,0.3)',
                }}
              >
                PostoDesign
              </Typography>
              <Typography
                variant="h4"
                component="h2"
                sx={{
                  fontSize: { xs: '1.2rem', md: '1.8rem' },
                  fontWeight: 400,
                  mb: 4,
                  opacity: 0.95,
                  fontFamily: '"Poppins", sans-serif',
                  lineHeight: 1.4,
                }}
              >
                Trendy Custom T-Shirts That Make You Stand Out
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: '1.1rem',
                  mb: 6,
                  opacity: 0.9,
                  maxWidth: '500px',
                  lineHeight: 1.6,
                }}
              >
                Discover our exclusive collection of premium custom t-shirts with unique designs. 
                Express your style with high-quality materials and eye-catching graphics.
              </Typography>
              <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/products')}
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    borderRadius: '50px',
                    background: 'linear-gradient(45deg, #ff6b6b, #ee5a24)',
                    boxShadow: '0 8px 25px rgba(238, 90, 36, 0.3)',
                    textTransform: 'none',
                    fontFamily: '"Poppins", sans-serif',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: '0 15px 35px rgba(238, 90, 36, 0.4)',
                      background: 'linear-gradient(45deg, #ee5a24, #ff6b6b)',
                    },
                  }}
                >
                  Shop Now
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/products')}
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    borderRadius: '50px',
                    borderColor: 'white',
                    color: 'white',
                    textTransform: 'none',
                    fontFamily: '"Poppins", sans-serif',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: 'white',
                      background: 'rgba(255, 255, 255, 0.1)',
                      transform: 'translateY(-3px)',
                    },
                  }}
                >
                  View Collection
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '400px',
                }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: '8rem',
                    opacity: 0.3,
                    fontWeight: 300,
                    textAlign: 'center',
                  }}
                >
                  👕
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Featured Products */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography 
          variant="h3" 
          component="h2" 
          gutterBottom 
          textAlign="center" 
          sx={{ 
            mb: 6,
            fontFamily: '"Poppins", sans-serif',
            fontWeight: 600,
          }}
        >
          Featured Products
        </Typography>
        <Grid container spacing={4}>
          {loading ? (
            Array.from(new Array(4)).map((_, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card>
                  <Box sx={{ height: 200, bgcolor: 'grey.300' }} />
                  <CardContent>
                    <Box sx={{ height: 40, bgcolor: 'grey.300', mb: 2 }} />
                    <Box sx={{ height: 20, bgcolor: 'grey.200', mb: 1 }} />
                    <Box sx={{ height: 20, bgcolor: 'grey.200', width: '60%' }} />
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            featuredProducts.map((product) => (
              <Grid item xs={12} sm={6} md={3} key={product.id}>
                <Card 
                  sx={{ 
                    height: '100%',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 30px rgba(0,0,0,0.15)'
                    }
                  }}
                  onClick={() => navigate(`/products/${product.id}`)}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.imageUrl || '/placeholder-tshirt.jpg'}
                    alt={product.name}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent>
                    <Typography variant="h6" component="h3" gutterBottom noWrap>
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      ${product.price}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Rating
                        value={4.5}
                        precision={0.5}
                        readOnly
                        size="small"
                      />
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                        (4.5)
                      </Typography>
                    </Box>
                    <Chip
                      label={product.category}
                      size="small"
                      color="secondary"
                      sx={{ mr: 1 }}
                    />
                    <Chip
                      label={product.brand}
                      size="small"
                      variant="outlined"
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
        {!loading && Array.isArray(products) && products.length > 4 && (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/products')}
            >
              View All Products
            </Button>
          </Box>
        )}
      </Container>

      {/* Features Section */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
        py: 8,
        color: 'white'
      }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h3" 
            component="h2" 
            gutterBottom 
            textAlign="center"
            sx={{ 
              fontFamily: '"Poppins", sans-serif',
              fontWeight: 700,
              mb: 6
            }}
          >
            Why Choose PostoDesign?
          </Typography>
          <Grid container spacing={4} sx={{ mt: 2 }}>
            <Grid item xs={12} md={4}>
              <Card sx={{ 
                height: '100%',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: 'white',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-10px)',
                  background: 'rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
                }
              }}>
                <CardContent sx={{ textAlign: 'center', p: 4 }}>
                  <Typography variant="h2" sx={{ fontSize: '3rem', mb: 2 }}>
                    🎨
                  </Typography>
                  <Typography 
                    variant="h5" 
                    gutterBottom
                    sx={{ 
                      fontFamily: '"Poppins", sans-serif',
                      fontWeight: 600,
                      mb: 2
                    }}
                  >
                    Unique Designs
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9 }}>
                    Handcrafted creative designs that make you stand out from the crowd.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ 
                height: '100%',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: 'white',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-10px)',
                  background: 'rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
                }
              }}>
                <CardContent sx={{ textAlign: 'center', p: 4 }}>
                  <Typography variant="h2" sx={{ fontSize: '3rem', mb: 2 }}>
                    💎
                  </Typography>
                  <Typography 
                    variant="h5" 
                    gutterBottom
                    sx={{ 
                      fontFamily: '"Poppins", sans-serif',
                      fontWeight: 600,
                      mb: 2
                    }}
                  >
                    Premium Quality
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9 }}>
                    100% cotton t-shirts with long-lasting prints and superior comfort.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ 
                height: '100%',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: 'white',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-10px)',
                  background: 'rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
                }
              }}>
                <CardContent sx={{ textAlign: 'center', p: 4 }}>
                  <Typography variant="h2" sx={{ fontSize: '3rem', mb: 2 }}>
                    ⚡
                  </Typography>
                  <Typography 
                    variant="h5" 
                    gutterBottom
                    sx={{ 
                      fontFamily: '"Poppins", sans-serif',
                      fontWeight: 600,
                      mb: 2
                    }}
                  >
                    Express Delivery
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9 }}>
                    Lightning-fast delivery with premium packaging and tracking.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
