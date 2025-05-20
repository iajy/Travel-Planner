package com.travelplanner.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.travelplanner.entity.User;
import com.travelplanner.repository.UserRepository;
import com.travelplanner.service.UserService;

@RestController
@RequestMapping("/auth")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        try {
            userService.registerUser(user);
            return ResponseEntity.ok("User registered successfully. Please check your email for the OTP.");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/verify")
    public ResponseEntity<String> verifyOtp(@RequestBody Map<String, String> data) {
        boolean verified = userService.verifyOtp(data.get("email"), data.get("otp"));
        return verified ?
            ResponseEntity.ok("OTP verified. Account activated.") :
            ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid OTP or email");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Map<String, String> loginData) {
        boolean success = userService.login(loginData.get("username"), loginData.get("password"));
        return success ?
                ResponseEntity.ok("Login successful") :
                ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials or account not verified");
    }
}