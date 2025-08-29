package com.ecommerce.service;

import com.ecommerce.dto.RegisterRequest;
import com.ecommerce.entity.User;
import com.ecommerce.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

@Service
public class UserService implements UserDetailsService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;
    
    // Temporary storage for pending registrations (in production, use Redis)
    private final Map<String, PendingRegistration> pendingRegistrations = new HashMap<>();
    
    // Inner class to store pending registration data
    private static class PendingRegistration {
        private final RegisterRequest registerRequest;
        private final String otp;
        private final LocalDateTime expiry;
        
        public PendingRegistration(RegisterRequest registerRequest, String otp, LocalDateTime expiry) {
            this.registerRequest = registerRequest;
            this.otp = otp;
            this.expiry = expiry;
        }
        
        public RegisterRequest getRegisterRequest() { return registerRequest; }
        public String getOtp() { return otp; }
        public LocalDateTime getExpiry() { return expiry; }
    }
    
    // Constructor
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, EmailService emailService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
    }
    
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
    }
    
    public User registerUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already registered");
        }
        
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setEmailVerificationToken(generateToken());
        user.setEmailVerificationExpiry(LocalDateTime.now().plusHours(24));
        
        User savedUser = userRepository.save(user);
        
        // Send verification email (handle failures gracefully)
        try {
            emailService.sendVerificationEmail(savedUser.getEmail(), savedUser.getEmailVerificationToken());
        } catch (Exception e) {
            // Log the error but don't fail the registration
            System.err.println("Failed to send verification email: " + e.getMessage());
        }
        
        return savedUser;
    }
    
    public User verifyEmail(String token) {
        User user = userRepository.findByEmailVerificationToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid verification token"));
        
        if (user.getEmailVerificationExpiry().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Verification token expired");
        }
        
        user.setEmailVerified(true);
        user.setEmailVerificationToken(null);
        user.setEmailVerificationExpiry(null);
        
        return userRepository.save(user);
    }
    
    public void sendOtp(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        String otp = generateOtp();
        user.setOtp(otp);
        user.setOtpExpiry(LocalDateTime.now().plusMinutes(10));
        
        userRepository.save(user);
        
        emailService.sendOtpEmail(email, otp);
    }
    
    public User verifyOtp(String email, String otp) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        if (!otp.equals(user.getOtp()) || user.getOtpExpiry().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Invalid or expired OTP");
        }
        
        user.setOtp(null);
        user.setOtpExpiry(null);
        
        return userRepository.save(user);
    }
    
    public void sendPasswordResetEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        String token = generateToken();
        user.setResetPasswordToken(token);
        user.setResetPasswordExpiry(LocalDateTime.now().plusHours(1));
        
        userRepository.save(user);
        
        emailService.sendPasswordResetEmail(email, token);
    }
    
    public User resetPassword(String token, String newPassword) {
        User user = userRepository.findByResetPasswordToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid reset token"));
        
        if (user.getResetPasswordExpiry().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Reset token expired");
        }
        
        user.setPassword(passwordEncoder.encode(newPassword));
        user.setResetPasswordToken(null);
        user.setResetPasswordExpiry(null);
        
        return userRepository.save(user);
    }
    
    public User updateProfile(Long userId, User updatedUser) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        user.setFirstName(updatedUser.getFirstName());
        user.setLastName(updatedUser.getLastName());
        user.setPhoneNumber(updatedUser.getPhoneNumber());
        user.setAddress(updatedUser.getAddress());
        user.setCity(updatedUser.getCity());
        user.setState(updatedUser.getState());
        user.setCountry(updatedUser.getCountry());
        user.setZipCode(updatedUser.getZipCode());
        
        return userRepository.save(user);
    }
    
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    public List<User> searchUsers(String searchTerm) {
        return userRepository.searchUsers(searchTerm);
    }
    
    public Long getActiveUserCount() {
        return userRepository.countActiveUsers();
    }
    
    public List<User> getRecentUsers(LocalDateTime startDate) {
        return userRepository.findUsersCreatedAfter(startDate);
    }
    
    public void sendRegistrationOtp(RegisterRequest request) {
        // Check if email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }
        
        // Generate OTP
        String otp = generateOtp();
        LocalDateTime expiry = LocalDateTime.now().plusMinutes(10);
        
        // Store pending registration temporarily
        pendingRegistrations.put(request.getEmail(), new PendingRegistration(request, otp, expiry));
        
        // Send OTP email 
        emailService.sendRegistrationOtpEmail(request.getEmail(), otp);
    }
    
    public User verifyRegistrationOtp(String email, String otp) {
        PendingRegistration pending = pendingRegistrations.get(email);
        
        if (pending == null) {
            throw new RuntimeException("No pending registration found for this email");
        }
        
        if (!otp.equals(pending.getOtp())) {
            throw new RuntimeException("Invalid OTP");
        }
        
        if (pending.getExpiry().isBefore(LocalDateTime.now())) {
            pendingRegistrations.remove(email);
            throw new RuntimeException("OTP has expired. Please try registration again.");
        }
        
        // Create the user account
        RegisterRequest request = pending.getRegisterRequest();
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setEmailVerified(true); // Mark as verified since OTP was confirmed
        
        User savedUser = userRepository.save(user);
        
        // Remove from pending registrations
        pendingRegistrations.remove(email);
        
        return savedUser;
    }
    
    public void resendRegistrationOtp(String email) {
        PendingRegistration pending = pendingRegistrations.get(email);
        
        if (pending == null) {
            throw new RuntimeException("No pending registration found for this email");
        }
        
        // Generate new OTP
        String newOtp = generateOtp();
        LocalDateTime newExpiry = LocalDateTime.now().plusMinutes(10);
        
        // Update pending registration with new OTP
        pendingRegistrations.put(email, new PendingRegistration(pending.getRegisterRequest(), newOtp, newExpiry));
        
        // Send new OTP email
        emailService.sendRegistrationOtpEmail(email, newOtp);
    }

    private String generateToken() {
        return java.util.UUID.randomUUID().toString();
    }

    private String generateOtp() {
        Random random = new Random();
        return String.format("%06d", random.nextInt(1000000));
    }
}
