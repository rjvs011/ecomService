import React, { useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Chip,
  Rating,
  Paper,
  Stack,
  IconButton,
  Avatar,
} from '@mui/material';
import {
  ShoppingCart,
  Favorite,
  LocalShipping,
  Security,
  Support,
  Star,
  Verified,
  AccessTime,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { AppDispatch, RootState } from '../store';
import { fetchProducts } from '../store/slices/productSlice';
import { addToCart } from '../store/slices/cartSlice';

const ModernHome: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = (product: any) => {
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: 1,
    }));
    toast.success(`${product.name} added to cart!`);
  };

  const featuresData = [
    {
      icon: <LocalShipping sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Express Delivery',
      description: 'Get your custom t-shirts delivered fast and secure',
      highlight: 'Express',
    },
    {
      icon: <Security sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Secure Payments',
      description: '100% secure payments with multiple payment options',
      highlight: '100% Secure',
    },
    {
      icon: <Support sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: '24/7 Support',
      description: 'Round the clock customer support for any queries',
      highlight: '24/7 Support',
    },
  ];

  const categories = [
    { name: 'Cakes', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=200&h=150&fit=crop', count: '500+', color: '#FF6B6B' },
    { name: 'Flowers', image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffa?w=200&h=150&fit=crop', count: '300+', color: '#4ECDC4' },
    { name: 'Personalized', image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=200&h=150&fit=crop', count: '200+', color: '#45B7D1' },
    { name: 'Plants', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=200&h=150&fit=crop', count: '150+', color: '#96CEB4' },
    { name: 'Chocolates', image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=200&h=150&fit=crop', count: '100+', color: '#D63031' },
    { name: 'Fashion', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=200&h=150&fit=crop', count: '250+', color: '#E17055' },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      rating: 5,
      comment: 'Amazing service! The flowers were delivered on time and were absolutely fresh. My mother loved the surprise. Will definitely order again!',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face',
      date: '24 August 2025',
    },
    {
      name: 'Mike Chen',
      rating: 5,
      comment: 'The cake was perfect for our anniversary celebration. Great quality and beautiful presentation. Highly recommended!',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
      date: '22 August 2025',
    },
    {
      name: 'Emily Davis',
      rating: 5,
      comment: 'Excellent customer service and prompt delivery. The personalized gift was exactly what I wanted. Thank you IGP!',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
      date: '20 August 2025',
    },
  ];

  return (
    <Box>
      {/* Hero Section with IGP-style design */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 8,
          mb: 6,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background Pattern */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
            backgroundImage: 'radial-gradient(circle at 20% 80%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
        
        <Container maxWidth="lg" sx={{ position: 'relative' }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" fontWeight="bold" gutterBottom>
                Your Trusted Online T-Shirt Store
              </Typography>
              <Typography variant="h5" sx={{ mb: 4, opacity: 0.9, lineHeight: 1.4 }}>
                Express your unique style with our premium custom t-shirts. High-quality materials and creative designs.
              </Typography>
              
              {/* Key Features */}
              <Stack direction="row" spacing={3} sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Verified sx={{ mr: 1, fontSize: 20 }} />
                  <Typography variant="body2">Premium Quality</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Security sx={{ mr: 1, fontSize: 20 }} />
                  <Typography variant="body2">Secure Payments</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AccessTime sx={{ mr: 1, fontSize: 20 }} />
                  <Typography variant="body2">24/7 Support</Typography>
                </Box>
              </Stack>
              
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    bgcolor: 'white',
                    color: 'primary.main',
                    fontWeight: 'bold',
                    px: 4,
                    '&:hover': { bgcolor: 'grey.100', transform: 'translateY(-2px)' },
                  }}
                  onClick={() => navigate('/products')}
                >
                  Shop Now
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    fontWeight: 'bold',
                    px: 4,
                    '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' },
                  }}
                >
                  Explore Categories
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: 'relative',
                  textAlign: 'center',
                }}
              >
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=500&h=400&fit=crop"
                  alt="Gift Shopping"
                  sx={{
                    width: '100%',
                    maxWidth: 500,
                    height: 'auto',
                    borderRadius: 3,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                  }}
                />
                {/* Floating Elements */}
                <Paper
                  elevation={6}
                  sx={{
                    position: 'absolute',
                    top: 20,
                    right: -10,
                    p: 2,
                    borderRadius: 2,
                    bgcolor: 'success.main',
                    color: 'white',
                  }}
                >
                  <Typography variant="caption" fontWeight="bold">
                    Premium Quality
                  </Typography>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg">
        {/* Features Section */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {featuresData.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  textAlign: 'center',
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': { 
                    transform: 'translateY(-10px)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                  },
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: -20,
                    right: -20,
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    bgcolor: 'primary.light',
                    opacity: 0.1,
                  }}
                />
                {feature.icon}
                <Typography variant="h6" fontWeight="bold" sx={{ mt: 2, mb: 1 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {feature.description}
                </Typography>
                <Chip 
                  label={feature.highlight}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Categories Section */}
        <Box sx={{ mb: 8 }}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Shop by Categories
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
              Wide range of gifts for your celebration. From cakes and flowers to personalized gifts and more.
            </Typography>
          </Box>
          
          <Grid container spacing={3}>
            {categories.map((category, index) => (
              <Grid item xs={6} sm={4} md={2} key={index}>
                <Card
                  sx={{
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': { 
                      transform: 'scale(1.05)',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                    },
                    borderRadius: 2,
                    overflow: 'hidden',
                  }}
                  onClick={() => navigate(`/products?category=${category.name}`)}
                >
                  <Box sx={{ position: 'relative' }}>
                    <CardMedia
                      component="img"
                      height="120"
                      image={category.image}
                      alt={category.name}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: `linear-gradient(45deg, ${category.color}20, ${category.color}60)`,
                      }}
                    />
                  </Box>
                  <CardContent sx={{ textAlign: 'center', py: 2 }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {category.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {category.count} items
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Featured Products Section */}
        <Box sx={{ mb: 8 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <Star sx={{ color: 'warning.main', mr: 1, fontSize: 30 }} />
            <Typography variant="h4" fontWeight="bold">
              Trending Now
            </Typography>
          </Box>
          
          <Grid container spacing={3}>
            {products.slice(0, 8).map((product) => (
              <Grid item xs={12} sm={6} md={3} key={product.id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease',
                    '&:hover': { 
                      transform: 'translateY(-8px)',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                    },
                  }}
                >
                  <Box sx={{ position: 'relative' }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={product.imageUrl || 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=200&fit=crop'}
                      alt={product.name}
                    />
                    <Chip
                      label="Premium"
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 8,
                        left: 8,
                        bgcolor: 'primary.main',
                        color: 'white',
                        fontWeight: 'bold',
                      }}
                    />
                    <IconButton
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        bgcolor: 'rgba(255,255,255,0.9)',
                        '&:hover': { bgcolor: 'rgba(255,255,255,1)', color: 'error.main' },
                      }}
                      size="small"
                    >
                      <Favorite />
                    </IconButton>
                  </Box>
                  
                  <CardContent sx={{ flexGrow: 1, p: 2 }}>
                    <Typography variant="h6" gutterBottom noWrap fontWeight="bold">
                      {product.name}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Rating value={4.5} readOnly size="small" />
                      <Typography variant="caption" sx={{ ml: 1, color: 'text.secondary' }}>
                        (24 reviews)
                      </Typography>
                    </Box>
                    
                    <Typography variant="h6" color="primary" fontWeight="bold" sx={{ mb: 2 }}>
                      ₹{product.price}
                    </Typography>
                    
                    <Button
                      variant="contained"
                      fullWidth
                      startIcon={<ShoppingCart />}
                      sx={{ 
                        fontWeight: 'bold',
                        '&:hover': { transform: 'translateY(-2px)' },
                      }}
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              variant="outlined"
              size="large"
              sx={{ fontWeight: 'bold', px: 4 }}
              onClick={() => navigate('/products')}
            >
              View All Products
            </Button>
          </Box>
        </Box>

        {/* Customer Reviews Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
            What Our Customers Say
          </Typography>
          <Typography variant="body1" textAlign="center" color="text.secondary" sx={{ mb: 4 }}>
            Real reviews from our satisfied customers
          </Typography>
          
          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.3s ease',
                    '&:hover': { transform: 'translateY(-5px)' },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar src={testimonial.avatar} sx={{ mr: 2 }} />
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {testimonial.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {testimonial.date}
                      </Typography>
                    </Box>
                  </Box>
                  <Rating value={testimonial.rating} readOnly sx={{ mb: 2 }} />
                  <Typography variant="body2" sx={{ flexGrow: 1, lineHeight: 1.6 }}>
                    "{testimonial.comment}"
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                    <Verified color="success" sx={{ mr: 1, fontSize: 16 }} />
                    <Typography variant="caption" color="success.main" fontWeight="bold">
                      Verified Purchase
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Stats Section */}
        <Paper
          elevation={4}
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            p: 6,
            mb: 8,
            borderRadius: 3,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.1,
              backgroundImage: 'radial-gradient(circle at 20% 20%, white 2px, transparent 2px)',
              backgroundSize: '30px 30px',
            }}
          />
          <Grid container spacing={4} textAlign="center" sx={{ position: 'relative' }}>
            <Grid item xs={6} md={3}>
              <Typography variant="h3" fontWeight="bold" sx={{ mb: 1 }}>
                10K+
              </Typography>
              <Typography variant="body1">
                Happy customers worldwide
              </Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography variant="h3" fontWeight="bold" sx={{ mb: 1 }}>
                100+
              </Typography>
              <Typography variant="body1">
                Countries being served
              </Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography variant="h3" fontWeight="bold" sx={{ mb: 1 }}>
                5M+
              </Typography>
              <Typography variant="body1">
                Gift boxes delivered
              </Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography variant="h3" fontWeight="bold" sx={{ mb: 1 }}>
                99.9%
              </Typography>
              <Typography variant="body1">
                Customer satisfaction
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default ModernHome;
