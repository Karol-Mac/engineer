package com.example.engineer.exceptions;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public final class AuthenticationException extends ApiException {

    public AuthenticationException(){
        super("You can not perform this action", HttpStatus.FORBIDDEN);
    }

    public AuthenticationException(String message){
        super(message, HttpStatus.FORBIDDEN);
    }
}