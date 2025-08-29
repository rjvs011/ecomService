package com.ecommerce.controller;

import com.ecommerce.entity.Review;
import com.ecommerce.service.ReviewService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/reviews")
@CrossOrigin(origins = "*")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping
    public ResponseEntity<Review> createReview(@Valid @RequestBody Review review, 
                                             Authentication authentication) {
        String email = authentication.getName();
        Review savedReview = reviewService.createReview(email, review);
        return ResponseEntity.ok(savedReview);
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<Page<Review>> getProductReviews(@PathVariable Long productId, 
                                                        Pageable pageable) {
        Page<Review> reviews = reviewService.getProductReviews(productId, pageable);
        return ResponseEntity.ok(reviews);
    }

    @GetMapping("/user")
    public ResponseEntity<List<Review>> getUserReviews(Authentication authentication) {
        String email = authentication.getName();
        List<Review> reviews = reviewService.getUserReviews(email);
        return ResponseEntity.ok(reviews);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Review> updateReview(@PathVariable Long id, 
                                             @Valid @RequestBody Review review,
                                             Authentication authentication) {
        String email = authentication.getName();
        Review updatedReview = reviewService.updateReview(id, review, email);
        return ResponseEntity.ok(updatedReview);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long id, 
                                           Authentication authentication) {
        String email = authentication.getName();
        reviewService.deleteReview(id, email);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/product/{productId}/average")
    public ResponseEntity<Double> getAverageRating(@PathVariable Long productId) {
        Double averageRating = reviewService.getAverageRating(productId);
        return ResponseEntity.ok(averageRating);
    }

    @GetMapping("/product/{productId}/count")
    public ResponseEntity<Long> getReviewCount(@PathVariable Long productId) {
        Long count = reviewService.getReviewCount(productId);
        return ResponseEntity.ok(count);
    }
}
