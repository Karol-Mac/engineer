package com.example.engineer.exceptions;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public final class AuthorizationException extends RuntimeException {
    private final String message = "You need to be logged in to access this resource";
    private final HttpStatus status = HttpStatus.UNAUTHORIZED;
}
