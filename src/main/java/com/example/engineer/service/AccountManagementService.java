package com.example.engineer.service;

import com.example.engineer.exceptions.NotFoundException;
import com.example.engineer.payload.AccountDto;
import com.example.engineer.payload.RegisterUserDto;
import org.apache.coyote.BadRequestException;

import java.util.List;

public interface AccountManagementService {
    RegisterUserDto changeCredentials(String username, String password);

    List<AccountDto> getAllUsers();
    AccountDto getUser(String type, long id);

    AccountDto updateUser(AccountDto account) throws NotFoundException, BadRequestException;

    String removeAllComments(long id);
}
