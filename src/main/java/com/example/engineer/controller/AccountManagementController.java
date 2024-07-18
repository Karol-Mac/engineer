package com.example.engineer.controller;

import com.example.engineer.payload.AccountDto;
import com.example.engineer.payload.RegisterUserDto;
import com.example.engineer.service.AccountManagementService;
import org.apache.coyote.BadRequestException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")

public class AccountManagementController {

    private final AccountManagementService accountManagementService;

    public AccountManagementController(AccountManagementService accountManagementService){
        this.accountManagementService = accountManagementService;
    }

    @PostMapping
    @PreAuthorize("hasAnyRole(@userRole, @adminRole)")
    public ResponseEntity<RegisterUserDto> changeCredentials(@RequestBody RegisterUserDto registerUserDto) {
        var username = registerUserDto.getUsername();
        var password = registerUserDto.getPassword();
        return ResponseEntity.ok(accountManagementService.changeCredentials(username, password));
    }

    @GetMapping
    @PreAuthorize("hasRole(@adminRole)")
    public ResponseEntity<List<AccountDto>> getAccounts(
                            @RequestParam(defaultValue = "") String name) {

        return name.isBlank() ?
                ResponseEntity.ok(accountManagementService.getAllUsers()) :
                ResponseEntity.ok(accountManagementService.getAccountsByName(name));
    }

    @PutMapping
    @PreAuthorize("hasRole(@adminRole)")
    public ResponseEntity<AccountDto> editAccount(
            @RequestBody AccountDto accountDto) throws BadRequestException {
        return ResponseEntity.ok(accountManagementService.updateUser(accountDto));
    }

    @DeleteMapping("/{userId}/comments")
    @PreAuthorize("hasRole(@adminRole)")
    public ResponseEntity<String> deleteUserComments(@PathVariable Long userId) throws BadRequestException {
        return ResponseEntity.ok(accountManagementService.removeAllComments(userId));
    }
}
