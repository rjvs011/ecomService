import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Rating,
  Chip,
  TextField,
  Card,
  CardContent,
  Avatar,
  Divider,
  CircularProgress,
  Alert,
  Tabs,
  Tab,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { AppDispatch, RootState } from '../store';
import { fetchProductById } from '../store/slices/productSlice';
import { addToCart } from '../store/slices/cartSlice';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`product-tabpanel-${index}`}
      aria-labelledby={`product-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { selectedProduct, loading } = useSelector((state: RootState) => state.products);

  const [quantity, setQuantity] = useState(1);
  const [tabValue, setTabValue] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(parseInt(id)));
    }
  }, [id, dispatch]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= (selectedProduct?.stockQuantity || 1)) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    if (selectedProduct) {
      dispatch(addToCart({
        id: selectedProduct.id,
        name: selectedProduct.name,
        price: selectedProduct.price,
        imageUrl: selectedProduct.imageUrl,
        quantity: quantity,
      }));
      toast.success(`${selectedProduct.name} added to cart!`);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSubmitReview = () => {
    toast.info('Review submission feature coming soon!');
    setReviewText('');
    setReviewRating(5);
  };

  if (loading) {
    return (
      <Container sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!selectedProduct) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error">Product not found</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Product Image */}
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={selectedProduct.imageUrl || 'https://via.placeholder.com/500x500'}
            alt={selectedProduct.name}
            sx={{
              width: '100%',
              height: 'auto',
              borderRadius: 2,
              boxShadow: 3,
            }}
          />
        </Grid>

        {/* Product Info */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="h1" gutterBottom>
            {selectedProduct.name}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Rating value={selectedProduct.rating} readOnly />
            <Typography variant="body2" sx={{ ml: 1 }}>
              ({selectedProduct.reviewCount} reviews)
            </Typography>
          </Box>

          <Typography variant="h4" color="primary" gutterBottom>
            ${selectedProduct.price}
          </Typography>

          <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
            <Chip label={selectedProduct.category} color="secondary" />
            <Chip label={selectedProduct.brand} variant="outlined" />
            <Chip 
              label={`SKU: ${selectedProduct.sku}`} 
              variant="outlined" 
              size="small" 
            />
          </Box>

          <Typography variant="body1" color="text.secondary" paragraph>
            {selectedProduct.description}
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" gutterBottom>
              Stock: {selectedProduct.stockQuantity} units available
            </Typography>
            {selectedProduct.stockQuantity <= 10 && (
              <Alert severity="warning" sx={{ mt: 1 }}>
                Low stock! Only {selectedProduct.stockQuantity} left.
              </Alert>
            )}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <TextField
              type="number"
              label="Quantity"
              value={quantity}
              onChange={handleQuantityChange}
              inputProps={{ min: 1, max: selectedProduct.stockQuantity }}
              sx={{ width: 100 }}
            />
            <Button
              variant="contained"
              size="large"
              onClick={handleAddToCart}
              disabled={selectedProduct.stockQuantity === 0}
              sx={{ flexGrow: 1 }}
            >
              Add to Cart
            </Button>
          </Box>

          <Button
            variant="outlined"
            fullWidth
            onClick={() => navigate('/checkout')}
            disabled={selectedProduct.stockQuantity === 0}
          >
            Buy Now
          </Button>
        </Grid>
      </Grid>

      {/* Product Details Tabs */}
      <Box sx={{ mt: 6 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Description" />
            <Tab label="Reviews" />
            <Tab label="Specifications" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <Typography variant="body1" paragraph>
            {selectedProduct.description}
          </Typography>
          <Typography variant="body1">
            This product offers exceptional quality and performance. It's designed to meet the highest standards
            and provide an excellent user experience. Whether you're a professional or casual user, this product
            will exceed your expectations.
          </Typography>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Write a Review
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography component="legend">Rating</Typography>
              <Rating
                value={reviewRating}
                onChange={(_, newValue) => setReviewRating(newValue || 5)}
              />
            </Box>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Your Review"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button variant="contained" onClick={handleSubmitReview}>
              Submit Review
            </Button>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom>
            Customer Reviews
          </Typography>
          
          {/* Sample Reviews */}
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Avatar sx={{ mr: 2 }}>JD</Avatar>
                <Box>
                  <Typography variant="subtitle1">John Doe</Typography>
                  <Rating value={5} readOnly size="small" />
                </Box>
              </Box>
              <Typography variant="body2">
                Amazing product! The quality is outstanding and it works perfectly. Highly recommended!
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Avatar sx={{ mr: 2 }}>JS</Avatar>
                <Box>
                  <Typography variant="subtitle1">Jane Smith</Typography>
                  <Rating value={4} readOnly size="small" />
                </Box>
              </Box>
              <Typography variant="body2">
                Great product overall. Fast delivery and good packaging. Would buy again.
              </Typography>
            </CardContent>
          </Card>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" gutterBottom>
                Product Specifications
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                <Typography variant="body2">Brand</Typography>
                <Typography variant="body2">{selectedProduct.brand}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                <Typography variant="body2">Category</Typography>
                <Typography variant="body2">{selectedProduct.category}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                <Typography variant="body2">SKU</Typography>
                <Typography variant="body2">{selectedProduct.sku}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                <Typography variant="body2">Stock</Typography>
                <Typography variant="body2">{selectedProduct.stockQuantity} units</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" gutterBottom>
                Additional Information
              </Typography>
              <Typography variant="body2" paragraph>
                • High-quality materials
              </Typography>
              <Typography variant="body2" paragraph>
                • 1-year warranty
              </Typography>
              <Typography variant="body2" paragraph>
                • Free shipping on orders over $50
              </Typography>
              <Typography variant="body2" paragraph>
                • 30-day return policy
              </Typography>
            </Grid>
          </Grid>
        </TabPanel>
      </Box>
    </Container>
  );
};

export default ProductDetail;
