package com.example.engineer.exceptions;

import lombok.Getter;

@Getter
public final class AuthorizationException extends RuntimeException {
    private final String message;


    public AuthorizationException(String message){
        super(message);
        this.message = message;
    }
}
