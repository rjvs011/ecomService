package com.ecommerce.service;

import com.ecommerce.entity.*;
import com.ecommerce.repository.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final UserRepository userRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductService productService;

    public OrderService(OrderRepository orderRepository, OrderItemRepository orderItemRepository, 
                       UserRepository userRepository, CartItemRepository cartItemRepository, 
                       ProductService productService) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.userRepository = userRepository;
        this.cartItemRepository = cartItemRepository;
        this.productService = productService;
    }

    @Transactional
    public Order createOrder(String email, Order order) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        // Get cart items
        List<CartItem> cartItems = cartItemRepository.findByUser(user);
        if (cartItems.isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }
        
        // Create order
        order.setUser(user);
        order.setStatus(Order.OrderStatus.PENDING);
        order.setPaymentStatus(Order.PaymentStatus.PENDING);
        order.setCreatedAt(LocalDateTime.now());
        order.setUpdatedAt(LocalDateTime.now());
        
        // Calculate total
        BigDecimal totalAmount = BigDecimal.ZERO;
        List<OrderItem> orderItems = new ArrayList<>();
        
        for (CartItem cartItem : cartItems) {
            // Check stock availability
            if (!productService.isProductInStock(cartItem.getProduct().getId(), cartItem.getQuantity())) {
                throw new RuntimeException("Product " + cartItem.getProduct().getName() + " is out of stock");
            }
            
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setPrice(cartItem.getProduct().getPrice());
            orderItem.setCreatedAt(LocalDateTime.now());
            orderItem.setUpdatedAt(LocalDateTime.now());
            
            orderItems.add(orderItem);
            
            BigDecimal itemTotal = cartItem.getProduct().getPrice()
                    .multiply(BigDecimal.valueOf(cartItem.getQuantity()));
            totalAmount = totalAmount.add(itemTotal);
            
            // Reduce stock
            productService.reduceStock(cartItem.getProduct().getId(), cartItem.getQuantity());
        }
        
        order.setTotalAmount(totalAmount);
        
        // Save order
        Order savedOrder = orderRepository.save(order);
        
        // Save order items
        for (OrderItem orderItem : orderItems) {
            orderItem.setOrder(savedOrder);
            orderItemRepository.save(orderItem);
        }
        
        // Clear cart
        cartItemRepository.deleteByUser(user);
        
        return savedOrder;
    }

    public List<Order> getUserOrders(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return orderRepository.findByUserOrderByCreatedAtDesc(user);
    }

    public Order getOrderById(Long id, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        
        // Verify that the order belongs to the user
        if (!order.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized access to order");
        }
        
        return order;
    }

    public Order cancelOrder(Long id, String email) {
        Order order = getOrderById(id, email);
        
        if (order.getStatus() == Order.OrderStatus.DELIVERED ||
            order.getStatus() == Order.OrderStatus.CANCELLED) {
            throw new RuntimeException("Cannot cancel this order");
        }
        
        order.setStatus(Order.OrderStatus.CANCELLED);
        order.setUpdatedAt(LocalDateTime.now());
        
        // Restore stock for cancelled items
        List<OrderItem> orderItems = orderItemRepository.findByOrder(order);
        for (OrderItem orderItem : orderItems) {
            Product product = orderItem.getProduct();
            product.setStockQuantity(product.getStockQuantity() + orderItem.getQuantity());
            product.setSoldCount(product.getSoldCount() - orderItem.getQuantity());
        }
        
        return orderRepository.save(order);
    }

    // Admin methods
    public Page<Order> getAllOrders(Pageable pageable) {
        return orderRepository.findAllByOrderByCreatedAtDesc(pageable);
    }

    public Order updateOrderStatus(Long id, String status) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        
        try {
            Order.OrderStatus orderStatus = Order.OrderStatus.valueOf(status.toUpperCase());
            order.setStatus(orderStatus);
            order.setUpdatedAt(LocalDateTime.now());
            return orderRepository.save(order);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid order status: " + status);
        }
    }

    public Order updatePaymentStatus(Long id, String paymentStatus) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        
        try {
            Order.PaymentStatus status = Order.PaymentStatus.valueOf(paymentStatus.toUpperCase());
            order.setPaymentStatus(status);
            order.setUpdatedAt(LocalDateTime.now());
            return orderRepository.save(order);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid payment status: " + paymentStatus);
        }
    }

    public Map<String, Object> getOrderAnalytics() {
        Map<String, Object> analytics = new HashMap<>();
        
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime startOfMonth = now.withDayOfMonth(1).withHour(0).withMinute(0).withSecond(0);
        LocalDateTime startOfYear = now.withDayOfYear(1).withHour(0).withMinute(0).withSecond(0);
        
        // Total orders and revenue
        analytics.put("totalOrders", orderRepository.getTotalOrderCount());
        analytics.put("totalRevenue", orderRepository.getTotalRevenue());
        
        // Monthly stats
        analytics.put("monthlyOrders", orderRepository.countOrdersBetweenDates(startOfMonth, now));
        analytics.put("monthlyRevenue", orderRepository.sumTotalAmountBetweenDates(startOfMonth, now));
        
        // Yearly stats
        analytics.put("yearlyOrders", orderRepository.countOrdersBetweenDates(startOfYear, now));
        analytics.put("yearlyRevenue", orderRepository.sumTotalAmountBetweenDates(startOfYear, now));
        
        return analytics;
    }

    public List<Order> getRecentOrders() {
        return orderRepository.findTop10ByOrderByCreatedAtDesc();
    }

    public List<Order> getOrdersByStatus(String status) {
        try {
            Order.OrderStatus orderStatus = Order.OrderStatus.valueOf(status.toUpperCase());
            return orderRepository.findByOrderStatus(orderStatus);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid order status: " + status);
        }
    }
}
