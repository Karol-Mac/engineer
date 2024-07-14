package com.example.engineer.service.impl;

import com.example.engineer.payload.JwtAuthResponse;
import com.example.engineer.payload.LoginDto;
import com.example.engineer.payload.RegisterDto;
import com.example.engineer.service.AuthService;

public class AuthServiceImpl implements AuthService {
    @Override
    public JwtAuthResponse login(LoginDto loginDto){
        return null;
    }

    @Override
    public String register(RegisterDto loginDto){
        return "";
    }
}
