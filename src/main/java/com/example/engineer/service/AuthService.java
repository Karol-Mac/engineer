package com.example.engineer.service;

import com.example.engineer.payload.JwtAuthResponse;
import com.example.engineer.payload.LoginDto;
import com.example.engineer.payload.RegisterDto;

public interface AuthService {

    JwtAuthResponse login(LoginDto loginDto);
    String register(RegisterDto loginDto);

}
