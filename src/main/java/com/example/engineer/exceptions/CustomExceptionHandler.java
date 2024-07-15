package com.example.engineer.exceptions;

import jakarta.servlet.http.HttpServletRequest;
import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class CustomExceptionHandler extends ResponseEntityExceptionHandler {


    @ExceptionHandler(AuthorizationException.class)
    public ResponseEntity<ErrorInfo> handleAuthorizationException(AuthorizationException ex, HttpServletRequest request) {
        return new ResponseEntity<>(new ErrorInfo(request.getRequestURI(), ex), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ErrorInfo> handleAuthenticationException(AuthenticationException ex, HttpServletRequest request) {
        return new ResponseEntity<>(new ErrorInfo(request.getRequestURI(), ex), HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(ApiException.class)
    public ResponseEntity<ErrorInfo> handleApiException(ApiException ex, HttpServletRequest request) {
        return new ResponseEntity<>(new ErrorInfo(request.getRequestURI(), ex), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ErrorInfo> handleBadRequestException(BadRequestException ex, HttpServletRequest request) {
        return new ResponseEntity<>(new ErrorInfo(request.getRequestURI(), ex), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorInfo> handleAccessDeniedException(AccessDeniedException ex, HttpServletRequest request) {
        return new ResponseEntity<>(new ErrorInfo(request.getRequestURI(), ex), HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ErrorInfo> handleNotFoundException(NotFoundException ex, HttpServletRequest request) {
        return new ResponseEntity<>(new ErrorInfo(request.getRequestURI(), ex), HttpStatus.NOT_FOUND);
    }
}
