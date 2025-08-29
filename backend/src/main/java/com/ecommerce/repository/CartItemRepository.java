package com.ecommerce.repository;

import com.ecommerce.entity.CartItem;
import com.ecommerce.entity.Product;
import com.ecommerce.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    
    List<CartItem> findByUser(User user);
    
    List<CartItem> findByUserOrderByCreatedAtDesc(User user);
    
    CartItem findByUserAndProduct(User user, Product product);
    
    void deleteByUser(User user);
    
    Integer countByUser(User user);
    
    List<CartItem> findByProduct(Product product);
}
