package com.example.engineer.exceptions;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class ApiException extends RuntimeException {
    private final String message;

    public ApiException(String message){
        super(message);
        this.message = message;
    }
}