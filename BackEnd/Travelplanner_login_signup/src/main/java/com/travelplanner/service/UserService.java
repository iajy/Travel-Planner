package com.travelplanner.service;

import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.stereotype.Service;

import com.travelplanner.entity.User;
import com.travelplanner.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	UserRepository userRepository;
	@Autowired
	private JavaMailSender mailSender;

	private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

	public void registerUser(User user) {
		if (userRepository.findByEmail(user.getEmail()).isPresent()) {
			throw new RuntimeException("Email already in use");
		}
		String otp = generateOTP();
		user.setOtp(otp);
		user.setEnabled(false);
		user.setPassword(encoder.encode(user.getPassword()));
		sendOtpEmail(user.getEmail(), otp);
	}

	private String generateOTP() {
		return String.valueOf(new Random().nextInt(900000) + 100000);
	}

	private void sendOtpEmail(String email, String otp) {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(email);
		message.setSubject("your OTP fot travelplanner");
		message.setText("Thankyou for selecting travel planner your otp is " +otp+ "dont share your otp to anyone ");
		mailSender.send(message);
	}

	public boolean verifyOtp(String email, String otp) {
		Optional<User> userOpt = userRepository.findByEmail(email);
		if (userOpt.isPresent() && userOpt.get().getOtp().equals(otp)) {
			User user = userOpt.get();
			user.setEnabled(true);
			user.setOtp(null);
			userRepository.save(user);
			return true;
		}
		return false;
	}

	public boolean login(String email, String password) {
		Optional<User> user = userRepository.findByEmail(email);
		return user.isPresent() && user.get().isEnabled() && encoder.matches(password, user.get().getPassword());
	}

	@Configuration
	public class SecurityConfig {

		@Bean
		public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
			http.csrf().disable().authorizeHttpRequests().requestMatchers("/auth/**").permitAll().anyRequest()
					.authenticated().and().formLogin().disable();
			return http.build();
		}

	}

}
