package com.ecommerce.repository;

import com.ecommerce.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    
    Page<Product> findByActiveTrue(Pageable pageable);
    
    Page<Product> findByCategoryAndActiveTrue(String category, Pageable pageable);
    
    Page<Product> findByBrandAndActiveTrue(String brand, Pageable pageable);
    
    @Query("SELECT p FROM Product p WHERE p.active = true AND (p.name LIKE %:searchTerm% OR p.description LIKE %:searchTerm% OR p.category LIKE %:searchTerm% OR p.brand LIKE %:searchTerm%)")
    Page<Product> searchProducts(@Param("searchTerm") String searchTerm, Pageable pageable);
    
    @Query("SELECT p FROM Product p WHERE p.active = true AND p.price BETWEEN :minPrice AND :maxPrice")
    Page<Product> findByPriceRange(@Param("minPrice") BigDecimal minPrice, @Param("maxPrice") BigDecimal maxPrice, Pageable pageable);
    
    @Query("SELECT p FROM Product p WHERE p.active = true AND p.stockQuantity > 0")
    Page<Product> findAvailableProducts(Pageable pageable);
    
    @Query("SELECT DISTINCT p.category FROM Product p WHERE p.active = true")
    List<String> findAllCategories();
    
    @Query("SELECT DISTINCT p.brand FROM Product p WHERE p.active = true")
    List<String> findAllBrands();
    
    @Query("SELECT p FROM Product p WHERE p.active = true ORDER BY p.rating DESC")
    Page<Product> findTopRatedProducts(Pageable pageable);
    
    @Query("SELECT p FROM Product p WHERE p.active = true AND p.stockQuantity <= 10")
    List<Product> findLowStockProducts();
    
    @Query("SELECT p FROM Product p WHERE p.active = true AND " +
           "(:search IS NULL OR :search = '' OR p.name LIKE %:search% OR p.description LIKE %:search%) AND " +
           "(:category IS NULL OR :category = '' OR p.category = :category) AND " +
           "(:brand IS NULL OR :brand = '' OR p.brand = :brand) AND " +
           "p.price BETWEEN :minPrice AND :maxPrice")
    Page<Product> findProductsWithFilters(@Param("search") String search,
                                         @Param("category") String category,
                                         @Param("brand") String brand,
                                         @Param("minPrice") BigDecimal minPrice,
                                         @Param("maxPrice") BigDecimal maxPrice,
                                         Pageable pageable);
    
    List<Product> findByFeaturedTrueAndActiveTrueOrderByCreatedAtDesc();
    
    List<Product> findTop10ByActiveTrueOrderBySoldCountDesc();
    
    List<Product> findTop10ByActiveTrueOrderByCreatedAtDesc();
    
    List<Product> findByCategoryAndActiveTrueOrderByCreatedAtDesc(String category);
    
    List<Product> findByBrandAndActiveTrueOrderByCreatedAtDesc(String brand);
    
    List<Product> findByCategoryAndIdNotAndActiveTrueOrderByRatingDesc(String category, Long id, Pageable pageable);
    
    @Query("SELECT AVG(CAST(r.rating AS double)) FROM Review r WHERE r.product.id = :productId")
    Double calculateAverageRating(@Param("productId") Long productId);
}
