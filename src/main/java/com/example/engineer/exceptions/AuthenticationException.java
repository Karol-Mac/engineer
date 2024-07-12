package com.example.engineer.exceptions;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public final class AuthenticationException extends RuntimeException {
    private final String message = "You can not perform this action";
    private final HttpStatus status = HttpStatus.FORBIDDEN;
}
