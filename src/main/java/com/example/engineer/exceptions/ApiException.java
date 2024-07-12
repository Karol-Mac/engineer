package com.example.engineer.exceptions;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class ApiException extends RuntimeException {

    protected final HttpStatus status;
    protected final String message;

    public ApiException(String message, HttpStatus status) {
        super(message);
        this.status = status;
        this.message = message;
    }
}