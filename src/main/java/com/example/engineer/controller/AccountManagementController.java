package com.example.engineer.controller;

import com.example.engineer.payload.RegisterUserDto;
import com.example.engineer.service.AccountManagementService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")

public class AccountManagementController {

    private final AccountManagementService accountManagementService;

    public AccountManagementController(AccountManagementService accountManagementService){
        this.accountManagementService = accountManagementService;
    }

    @PutMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<RegisterUserDto> changeCredentials(@RequestBody RegisterUserDto registerUserDto) {
        var username = registerUserDto.getUsername();
        var password = registerUserDto.getPassword();
        return ResponseEntity.ok(accountManagementService.changeCredentials(username, password));
    }
}
