package com.example.engineer.exceptions;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class ApiException extends RuntimeException {
    private final String message;
    private final HttpStatus status;

    public ApiException(String message, HttpStatus status){
        super(message);
        this.message = message;
        this.status = status;
    }
}