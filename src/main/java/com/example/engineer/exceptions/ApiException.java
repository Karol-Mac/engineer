package com.example.engineer.exceptions;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public final class ApiException extends RuntimeException {

    private final HttpStatus status;
    private final String message;

    public ApiException(HttpStatus status, String message) {
        super(message);
        this.status = status;
        this.message = message;
    }
}