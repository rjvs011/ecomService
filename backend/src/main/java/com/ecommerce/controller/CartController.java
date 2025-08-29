package com.ecommerce.controller;

import com.ecommerce.entity.CartItem;
import com.ecommerce.service.CartService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
@CrossOrigin(origins = "*")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping
    public ResponseEntity<List<CartItem>> getUserCart(Authentication authentication) {
        String email = authentication.getName();
        List<CartItem> cartItems = cartService.getUserCartItems(email);
        return ResponseEntity.ok(cartItems);
    }

    @PostMapping("/add")
    public ResponseEntity<CartItem> addToCart(@RequestBody CartItem cartItem, 
                                             Authentication authentication) {
        String email = authentication.getName();
        CartItem savedItem = cartService.addToCart(email, cartItem);
        return ResponseEntity.ok(savedItem);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<CartItem> updateCartItem(@PathVariable Long id, 
                                                  @RequestParam Integer quantity,
                                                  Authentication authentication) {
        String email = authentication.getName();
        CartItem updatedItem = cartService.updateCartItem(email, id, quantity);
        return ResponseEntity.ok(updatedItem);
    }

    @DeleteMapping("/remove/{id}")
    public ResponseEntity<Void> removeFromCart(@PathVariable Long id, 
                                              Authentication authentication) {
        String email = authentication.getName();
        cartService.removeFromCart(email, id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/clear")
    public ResponseEntity<Void> clearCart(Authentication authentication) {
        String email = authentication.getName();
        cartService.clearCart(email);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/count")
    public ResponseEntity<Integer> getCartItemCount(Authentication authentication) {
        String email = authentication.getName();
        Integer count = cartService.getCartItemCount(email);
        return ResponseEntity.ok(count);
    }

    @GetMapping("/total")
    public ResponseEntity<Double> getCartTotal(Authentication authentication) {
        String email = authentication.getName();
        Double total = cartService.getCartTotal(email);
        return ResponseEntity.ok(total);
    }
}
