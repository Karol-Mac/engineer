package com.example.engineer.service;

import com.example.engineer.entity.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Map;

public interface JwtService {

    String extractEmail(String jwtToken);
    String generateToken(Map<String, Object> claims, UserDetails userDetails);
    String generateToken(UserDetails userDetails);
    boolean isTokenValid(String token, UserDetails userDetails);

}
