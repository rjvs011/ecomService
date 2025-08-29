package com.ecommerce.dto;

import com.ecommerce.entity.User;

public class AuthResponse {
    private String token;
    private User user;
    
    // Constructors
    public AuthResponse() {}
    
    public AuthResponse(String token, User user) {
        this.token = token;
        this.user = user;
    }
    
    // Getters
    public String getToken() { return token; }
    public User getUser() { return user; }
    
    // Setters
    public void setToken(String token) { this.token = token; }
    public void setUser(User user) { this.user = user; }
}
