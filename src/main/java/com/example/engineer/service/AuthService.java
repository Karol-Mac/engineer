package com.example.engineer.service;

import com.example.engineer.payload.JwtAuthResponse;
import com.example.engineer.payload.LoginDto;
import com.example.engineer.payload.RegisterSellerDto;
import com.example.engineer.payload.RegisterUserDto;
import org.springframework.security.core.AuthenticationException;

public interface AuthService {

    JwtAuthResponse login(LoginDto loginDto, boolean isSeller);
    String register(RegisterUserDto loginDto) throws AuthenticationException;

    String registerCompany(RegisterSellerDto registerSellerDto) throws AuthenticationException;

//    JwtAuthResponse loginCompany(LoginDto loginDto);
}
