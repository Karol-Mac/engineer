package com.example.engineer.controller;

import com.example.engineer.payload.JwtAuthResponse;
import com.example.engineer.payload.RegisterSellerDto;
import com.example.engineer.service.AuthService;
import com.example.engineer.payload.LoginDto;
import com.example.engineer.payload.RegisterUserDto;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<JwtAuthResponse> login(@RequestBody LoginDto loginDto){
        return ResponseEntity.ok(authService.login(loginDto));
    }

    @PostMapping("/company/login")
    public ResponseEntity<JwtAuthResponse> loginCompany(@RequestBody LoginDto loginDto){
        return ResponseEntity.ok(authService.loginCompany(loginDto));
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterUserDto registerUserDto){
        return new ResponseEntity<>(authService.register(registerUserDto), HttpStatus.CREATED);
    }

    @PostMapping("/company/register")
    public ResponseEntity<String> registerCompany(@RequestBody RegisterSellerDto registerSellerDto){
        return new ResponseEntity<>(authService.registerCompany(registerSellerDto), HttpStatus.CREATED);
    }

}
