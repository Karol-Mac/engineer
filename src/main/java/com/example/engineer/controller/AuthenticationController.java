package com.example.engineer.controller;

import com.example.engineer.payload.JwtAuthResponse;
import com.example.engineer.payload.RegisterSellerDto;
import com.example.engineer.service.AuthService;
import com.example.engineer.payload.LoginDto;
import com.example.engineer.payload.RegisterUserDto;

import com.example.engineer.service.ImageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthService authService;
    private final ImageService imageService;

    @PostMapping("/login")
    public ResponseEntity<JwtAuthResponse> login(@RequestBody LoginDto loginDto){
        return ResponseEntity.ok(authService.login(loginDto, false));
    }

    @PostMapping("/company/login")
    public ResponseEntity<JwtAuthResponse> loginCompany(@RequestBody LoginDto loginDto){
        return ResponseEntity.ok(authService.login(loginDto, true));
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody @Valid RegisterUserDto registerUserDto){
        return new ResponseEntity<>(authService.register(registerUserDto), HttpStatus.CREATED);
    }

    @PostMapping(path = "/company/register", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> registerCompany(@RequestPart(value = "company") @Valid RegisterSellerDto registerSellerDto,
                                                  @RequestPart(value = "file") MultipartFile imageFile)
                                                    throws IOException{

        String imageName = imageService.saveImage(imageFile);
        registerSellerDto.setImageName(imageName);

        return new ResponseEntity<>(authService.registerCompany(registerSellerDto), HttpStatus.CREATED);
    }
}
