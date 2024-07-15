package com.example.engineer.exceptions;

import lombok.Getter;

@Getter
public final class AuthenticationException extends RuntimeException {
    public AuthenticationException(String message){
        super(message);
    }
}