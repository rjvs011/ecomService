package com.ecommerce.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    
    private final JavaMailSender mailSender;
    
    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }
    
    public void sendVerificationEmail(String to, String token) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Email Verification - E-Commerce Store");
        message.setText("Please click the following link to verify your email: " +
                "http://localhost:3000/verify-email?token=" + token);
        
        mailSender.send(message);
    }
    
    public void sendRegistrationOtpEmail(String to, String otp) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject("Registration Verification OTP - E-Commerce Store");
            message.setText("Your registration verification OTP is: " + otp + 
                    "\nThis OTP will expire in 10 minutes.\n\n" +
                    "Please enter this OTP to complete your registration.");
            
            mailSender.send(message);
            System.out.println("✅ Registration OTP sent successfully to: " + to);
            
        } catch (Exception e) {
            // For development, print to console if email fails
            System.err.println("❌ Failed to send email to: " + to);
            System.err.println("Email Error: " + e.getMessage());
            
            System.out.println("\n🔔 === DEVELOPMENT MODE: REGISTRATION OTP ===");
            System.out.println("📧 Email: " + to);
            System.out.println("🔑 OTP: " + otp);
            System.out.println("⏰ Valid for 10 minutes");
            System.out.println("==========================================\n");
            
            // For development, don't fail - just print the OTP
            // In production, you should throw the exception
            // throw new RuntimeException("Email service unavailable: " + e.getMessage());
        }
    }
    
    public void sendOtpEmail(String to, String otp) {
        // For development: Always show OTP in console
        System.out.println("\n🔔 === DEVELOPMENT MODE: LOGIN OTP ===");
        System.out.println("📧 Email: " + to);
        System.out.println("🔑 OTP: " + otp);
        System.out.println("⏰ Valid for 10 minutes");
        System.out.println("=====================================\n");
        
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject("Login OTP - E-Commerce Store");
            message.setText("Your login OTP is: " + otp + 
                    "\nThis OTP will expire in 10 minutes.\n\n" +
                    "If you didn't request this OTP, please ignore this email.");
            
            mailSender.send(message);
            System.out.println("✅ Login OTP sent successfully to: " + to);
        } catch (Exception e) {
            System.out.println("⚠️ Email sending failed (using console OTP): " + e.getMessage());
            // Don't throw exception - we're showing OTP in console anyway
        }
    }
    
    public void sendPasswordResetEmail(String to, String token) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Password Reset - E-Commerce Store");
        message.setText("Please click the following link to reset your password: " +
                "http://localhost:3000/reset-password?token=" + token);
        
        mailSender.send(message);
    }
    
    public void sendOrderConfirmationEmail(String to, String orderNumber) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Order Confirmation - E-Commerce Store");
        message.setText("Your order " + orderNumber + " has been confirmed. Thank you for your purchase!");
        
        mailSender.send(message);
    }
}
