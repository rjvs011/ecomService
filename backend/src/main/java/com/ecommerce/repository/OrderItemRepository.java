package com.ecommerce.repository;

import com.ecommerce.entity.OrderItem;
import com.ecommerce.entity.Order;
import com.ecommerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    
    List<OrderItem> findByOrder(Order order);
    
    List<OrderItem> findByProduct(Product product);
    
    @Query("SELECT SUM(oi.quantity) FROM OrderItem oi WHERE oi.product.id = :productId")
    Integer getTotalQuantitySoldForProduct(@Param("productId") Long productId);
    
    @Query("SELECT oi.product, SUM(oi.quantity) as totalSold FROM OrderItem oi GROUP BY oi.product ORDER BY totalSold DESC")
    List<Object[]> findBestSellingProducts();
}
