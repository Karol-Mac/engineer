package com.example.engineer.service.impl;

import com.example.engineer.exceptions.NotFoundException;
import com.example.engineer.payload.AccountDto;
import com.example.engineer.service.AccountManagementService;

import java.util.List;

public class AccountManagementServiceImpl implements AccountManagementService {
    @Override
    public AccountDto changeCredentials(String username, String password){
        return null;
    }

    @Override
    public List<AccountDto> getAllUsers(){
        return List.of();
    }

    @Override
    public AccountDto getUser(String type, long id){
        return null;
    }

    @Override
    public AccountDto updateUser(AccountDto account) throws NotFoundException{
        return null;
    }

    @Override
    public String removeAllComments(long id){
        return "";
    }



}
