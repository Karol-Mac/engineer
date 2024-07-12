package com.example.engineer.exceptions;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@Getter
public final class AuthorizationException extends ApiException {

    public AuthorizationException(){
        super("You need to be logged in to access this resource", HttpStatus.UNAUTHORIZED);
    }

    public AuthorizationException(String message){
        super(message, HttpStatus.UNAUTHORIZED);
    }
}
