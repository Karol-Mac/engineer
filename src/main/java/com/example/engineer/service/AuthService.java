package com.example.engineer.service;

import com.example.engineer.payload.JwtAuthResponse;
import com.example.engineer.payload.LoginDto;
import com.example.engineer.payload.RegisterSellerDto;
import com.example.engineer.payload.RegisterUserDto;

public interface AuthService {

    JwtAuthResponse login(LoginDto loginDto);
    String register(RegisterUserDto loginDto);

    String registerCompany(RegisterSellerDto registerSellerDto);

    JwtAuthResponse loginCompany(LoginDto loginDto);
}
