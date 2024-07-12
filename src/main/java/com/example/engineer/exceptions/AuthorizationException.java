package com.example.engineer.exceptions;

import lombok.Getter;

@Getter
public final class AuthorizationException extends ApiException {
    public AuthorizationException(String message){
        super(message);
    }
}
