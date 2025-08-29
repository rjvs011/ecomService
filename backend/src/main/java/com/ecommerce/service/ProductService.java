package com.ecommerce.service;

import com.ecommerce.entity.Product;
import com.ecommerce.repository.ProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Page<Product> getAllProducts(String search, String category, String brand, 
                                       Double minPrice, Double maxPrice, String sortBy, 
                                       String sortDir, Pageable pageable) {
        
        Sort sort = sortDir.equalsIgnoreCase("desc") ? 
                   Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        
        Pageable sortedPageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), sort);
        
        BigDecimal min = BigDecimal.valueOf(minPrice);
        BigDecimal max = BigDecimal.valueOf(maxPrice);
        
        return productRepository.findProductsWithFilters(search, category, brand, min, max, sortedPageable);
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
    }

    public List<Product> searchProducts(String query) {
        Page<Product> products = productRepository.searchProducts(query, PageRequest.of(0, 20));
        return products.getContent();
    }

    public List<String> getAllCategories() {
        return productRepository.findAllCategories();
    }

    public List<String> getAllBrands() {
        return productRepository.findAllBrands();
    }

    public Product createProduct(Product product) {
        product.setCreatedAt(LocalDateTime.now());
        product.setUpdatedAt(LocalDateTime.now());
        return productRepository.save(product);
    }

    public Product updateProduct(Long id, Product productDetails) {
        Product product = getProductById(id);
        
        product.setName(productDetails.getName());
        product.setDescription(productDetails.getDescription());
        product.setPrice(productDetails.getPrice());
        product.setStockQuantity(productDetails.getStockQuantity());
        product.setCategory(productDetails.getCategory());
        product.setBrand(productDetails.getBrand());
        product.setImageUrl(productDetails.getImageUrl());
        product.setFeatured(productDetails.isFeatured());
        product.setUpdatedAt(LocalDateTime.now());
        
        return productRepository.save(product);
    }

    public void deleteProduct(Long id) {
        Product product = getProductById(id);
        productRepository.delete(product);
    }

    public Product updateStock(Long id, Integer quantity) {
        Product product = getProductById(id);
        product.setStockQuantity(quantity);
        product.setUpdatedAt(LocalDateTime.now());
        return productRepository.save(product);
    }

    public List<Product> getFeaturedProducts() {
        return productRepository.findByFeaturedTrueAndActiveTrueOrderByCreatedAtDesc();
    }

    public List<Product> getBestSellingProducts() {
        return productRepository.findTop10ByActiveTrueOrderBySoldCountDesc();
    }

    public List<Product> getLatestProducts() {
        return productRepository.findTop10ByActiveTrueOrderByCreatedAtDesc();
    }

    public List<Product> getProductsByCategory(String category) {
        return productRepository.findByCategoryAndActiveTrueOrderByCreatedAtDesc(category);
    }

    public List<Product> getProductsByBrand(String brand) {
        return productRepository.findByBrandAndActiveTrueOrderByCreatedAtDesc(brand);
    }

    public List<Product> getRelatedProducts(Long productId, String category) {
        return productRepository.findByCategoryAndIdNotAndActiveTrueOrderByRatingDesc(category, productId, PageRequest.of(0, 4));
    }

    public void updateProductRating(Long productId) {
        Product product = getProductById(productId);
        Double averageRating = productRepository.calculateAverageRating(productId);
        product.setRating(averageRating != null ? BigDecimal.valueOf(averageRating) : BigDecimal.ZERO);
        productRepository.save(product);
    }

    public boolean isProductInStock(Long productId, Integer quantity) {
        Product product = getProductById(productId);
        return product.getStockQuantity() >= quantity;
    }

    public void reduceStock(Long productId, Integer quantity) {
        Product product = getProductById(productId);
        if (product.getStockQuantity() < quantity) {
            throw new RuntimeException("Insufficient stock for product: " + product.getName());
        }
        product.setStockQuantity(product.getStockQuantity() - quantity);
        product.setSoldCount(product.getSoldCount() + quantity);
        product.setUpdatedAt(LocalDateTime.now());
        productRepository.save(product);
    }
}
