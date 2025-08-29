package com.ecommerce.entity;

import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "users")
public class User implements UserDetails {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    private String email;
    
    @Column(nullable = false)
    private String password;
    
    @Column(nullable = false)
    private String firstName;
    
    @Column(nullable = false)
    private String lastName;
    
    @Column(unique = true)
    private String phoneNumber;
    
    @Enumerated(EnumType.STRING)
    private Role role = Role.USER;
    
    private boolean enabled = true;
    private boolean emailVerified = false;
    private boolean accountNonExpired = true;
    private boolean accountNonLocked = true;
    private boolean credentialsNonExpired = true;
    private String emailVerificationToken;
    private LocalDateTime emailVerificationExpiry;
    
    private String otp;
    private LocalDateTime otpExpiry;
    
    private String resetPasswordToken;
    private LocalDateTime resetPasswordExpiry;
    
    private String profileImage;
    private String address;
    private String city;
    private String state;
    private String country;
    private String zipCode;
    
    @Enumerated(EnumType.STRING)
    private AuthProvider authProvider = AuthProvider.LOCAL;
    
    private String providerId;
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<Order> orders;
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<Review> reviews;
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<CartItem> cartItems;
    
    // Constructors
    public User() {}
    
    public User(String email, String password, String firstName, String lastName) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
    }
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
    
    // Getters
    public Long getId() { return id; }
    public String getEmail() { return email; }
    public String getPassword() { return password; }
    public String getFirstName() { return firstName; }
    public String getLastName() { return lastName; }
    public String getPhoneNumber() { return phoneNumber; }
    public Role getRole() { return role; }
    public boolean isEmailVerified() { return emailVerified; }
    public String getEmailVerificationToken() { return emailVerificationToken; }
    public LocalDateTime getEmailVerificationExpiry() { return emailVerificationExpiry; }
    public String getOtp() { return otp; }
    public LocalDateTime getOtpExpiry() { return otpExpiry; }
    public String getResetPasswordToken() { return resetPasswordToken; }
    public LocalDateTime getResetPasswordExpiry() { return resetPasswordExpiry; }
    public String getProfileImage() { return profileImage; }
    public String getAddress() { return address; }
    public String getCity() { return city; }
    public String getState() { return state; }
    public String getCountry() { return country; }
    public String getZipCode() { return zipCode; }
    public AuthProvider getAuthProvider() { return authProvider; }
    public String getProviderId() { return providerId; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public Set<Order> getOrders() { return orders; }
    public Set<Review> getReviews() { return reviews; }
    public Set<CartItem> getCartItems() { return cartItems; }
    
    // Setters
    public void setId(Long id) { this.id = id; }
    public void setEmail(String email) { this.email = email; }
    public void setPassword(String password) { this.password = password; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
    public void setRole(Role role) { this.role = role; }
    public void setEnabled(boolean enabled) { this.enabled = enabled; }
    public void setEmailVerified(boolean emailVerified) { this.emailVerified = emailVerified; }
    public void setAccountNonExpired(boolean accountNonExpired) { this.accountNonExpired = accountNonExpired; }
    public void setAccountNonLocked(boolean accountNonLocked) { this.accountNonLocked = accountNonLocked; }
    public void setCredentialsNonExpired(boolean credentialsNonExpired) { this.credentialsNonExpired = credentialsNonExpired; }
    public void setEmailVerificationToken(String emailVerificationToken) { this.emailVerificationToken = emailVerificationToken; }
    public void setEmailVerificationExpiry(LocalDateTime emailVerificationExpiry) { this.emailVerificationExpiry = emailVerificationExpiry; }
    public void setOtp(String otp) { this.otp = otp; }
    public void setOtpExpiry(LocalDateTime otpExpiry) { this.otpExpiry = otpExpiry; }
    public void setResetPasswordToken(String resetPasswordToken) { this.resetPasswordToken = resetPasswordToken; }
    public void setResetPasswordExpiry(LocalDateTime resetPasswordExpiry) { this.resetPasswordExpiry = resetPasswordExpiry; }
    public void setProfileImage(String profileImage) { this.profileImage = profileImage; }
    public void setAddress(String address) { this.address = address; }
    public void setCity(String city) { this.city = city; }
    public void setState(String state) { this.state = state; }
    public void setCountry(String country) { this.country = country; }
    public void setZipCode(String zipCode) { this.zipCode = zipCode; }
    public void setAuthProvider(AuthProvider authProvider) { this.authProvider = authProvider; }
    public void setProviderId(String providerId) { this.providerId = providerId; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
    public void setOrders(Set<Order> orders) { this.orders = orders; }
    public void setReviews(Set<Review> reviews) { this.reviews = reviews; }
    public void setCartItems(Set<CartItem> cartItems) { this.cartItems = cartItems; }
    
    // UserDetails implementation
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + role.name()));
    }
    
    @Override
    public String getUsername() {
        return email;
    }
    
    @Override
    public boolean isAccountNonExpired() {
        return accountNonExpired;
    }
    
    @Override
    public boolean isAccountNonLocked() {
        return accountNonLocked;
    }
    
    @Override
    public boolean isCredentialsNonExpired() {
        return credentialsNonExpired;
    }
    
    @Override
    public boolean isEnabled() {
        return enabled;
    }
    
    public enum Role {
        USER, ADMIN
    }
    
    public enum AuthProvider {
        LOCAL, GOOGLE, FACEBOOK
    }
}
