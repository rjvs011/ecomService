package com.ecommerce.service;

import com.ecommerce.entity.Review;
import com.ecommerce.entity.Product;
import com.ecommerce.entity.User;
import com.ecommerce.repository.ReviewRepository;
import com.ecommerce.repository.ProductRepository;
import com.ecommerce.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final ProductService productService;

    public ReviewService(ReviewRepository reviewRepository, UserRepository userRepository, ProductRepository productRepository, ProductService productService) {
        this.reviewRepository = reviewRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.productService = productService;
    }

    public Review createReview(String email, Review review) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Product product = productRepository.findById(review.getProduct().getId())
                .orElseThrow(() -> new RuntimeException("Product not found"));
        
        // Check if user has already reviewed this product
        if (reviewRepository.existsByUserAndProduct(user, product)) {
            throw new RuntimeException("You have already reviewed this product");
        }
        
        review.setUser(user);
        review.setProduct(product);
        review.setCreatedAt(LocalDateTime.now());
        review.setUpdatedAt(LocalDateTime.now());
        
        Review savedReview = reviewRepository.save(review);
        
        // Update product's average rating and review count
        productService.updateProductRating(product.getId());
        updateProductReviewCount(product.getId());
        
        return savedReview;
    }

    public Page<Review> getProductReviews(Long productId, Pageable pageable) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        
        return reviewRepository.findByProductOrderByCreatedAtDesc(product, pageable);
    }

    public List<Review> getUserReviews(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        return reviewRepository.findByUserOrderByCreatedAtDesc(user);
    }

    public Review updateReview(Long reviewId, Review reviewDetails, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new RuntimeException("Review not found"));
        
        // Verify that the review belongs to the user
        if (!review.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized access to review");
        }
        
        review.setRating(reviewDetails.getRating());
        review.setComment(reviewDetails.getComment());
        review.setUpdatedAt(LocalDateTime.now());
        
        Review updatedReview = reviewRepository.save(review);
        
        // Update product's average rating
        productService.updateProductRating(review.getProduct().getId());
        
        return updatedReview;
    }

    public void deleteReview(Long reviewId, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new RuntimeException("Review not found"));
        
        // Verify that the review belongs to the user
        if (!review.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized access to review");
        }
        
        Long productId = review.getProduct().getId();
        reviewRepository.delete(review);
        
        // Update product's average rating and review count
        productService.updateProductRating(productId);
        updateProductReviewCount(productId);
    }

    public Double getAverageRating(Long productId) {
        Double averageRating = reviewRepository.findAverageRatingByProductId(productId);
        return averageRating != null ? averageRating : 0.0;
    }

    public Long getReviewCount(Long productId) {
        return reviewRepository.countByProductId(productId);
    }

    public List<Review> getRecentReviews() {
        return reviewRepository.findTop10ByOrderByCreatedAtDesc();
    }

    private void updateProductReviewCount(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        
        Long reviewCount = getReviewCount(productId);
        product.setReviewCount(reviewCount.intValue());
        productRepository.save(product);
    }
}
