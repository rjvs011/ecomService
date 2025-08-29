package com.ecommerce.repository;

import com.ecommerce.entity.Order;
import com.ecommerce.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    
    List<Order> findByUserOrderByCreatedAtDesc(User user);
    
    List<Order> findByUser(User user);
    
    Page<Order> findAllByOrderByCreatedAtDesc(Pageable pageable);
    
    List<Order> findTop10ByOrderByCreatedAtDesc();
    
    @Query("SELECT COUNT(o) FROM Order o WHERE o.createdAt BETWEEN :startDate AND :endDate")
    Long countOrdersBetweenDates(@Param("startDate") LocalDateTime startDate, 
                                @Param("endDate") LocalDateTime endDate);
    
    @Query("SELECT SUM(o.totalAmount) FROM Order o WHERE o.createdAt BETWEEN :startDate AND :endDate")
    Double sumTotalAmountBetweenDates(@Param("startDate") LocalDateTime startDate, 
                                     @Param("endDate") LocalDateTime endDate);
    
    @Query("SELECT o FROM Order o WHERE o.status = :status")
    List<Order> findByOrderStatus(@Param("status") Order.OrderStatus status);
    
    @Query("SELECT o FROM Order o WHERE o.paymentStatus = :status")
    List<Order> findByPaymentStatus(@Param("status") Order.PaymentStatus status);
    
    @Query("SELECT COUNT(o) FROM Order o")
    Long getTotalOrderCount();
    
    @Query("SELECT SUM(o.totalAmount) FROM Order o")
    Double getTotalRevenue();
}
