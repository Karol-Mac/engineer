package com.example.engineer.exceptions;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ExceptionHandlerExceptionResolver;

//TODO: is this class okay ?
@RestControllerAdvice
public class CustomExceptionHandler extends ExceptionHandlerExceptionResolver {

    @ExceptionHandler(ApiException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ResponseBody
    ErrorInfo handleApiException(ApiException ex, HttpServletRequest request) {
        return new ErrorInfo(request.getRequestURI() , ex);
    }

    @ExceptionHandler(AuthorizationException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ResponseBody
    ErrorInfo handleAuthorizationException(AuthorizationException ex, HttpServletRequest request) {
        return new ErrorInfo(request.getRequestURI() , ex);
    }

    @ExceptionHandler(AuthenticationException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    @ResponseBody
    ErrorInfo handleAuthenticationException(AuthenticationException ex, HttpServletRequest request) {
        return new ErrorInfo(request.getRequestURI() , ex);
    }

    @ExceptionHandler(NotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ResponseBody
    ErrorInfo handleNotFoundException(NotFoundException ex, HttpServletRequest request) {
        return new ErrorInfo(request.getRequestURL().toString() , ex);
    }

    @ExceptionHandler(MissingServletRequestParameterException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    ErrorInfo handleException(MissingServletRequestParameterException ex, HttpServletRequest request) {
        return new ErrorInfo(request.getRequestURL().toString() , ex);
    }
}
