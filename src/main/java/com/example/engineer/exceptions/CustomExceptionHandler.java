package com.example.engineer.exceptions;

import jakarta.servlet.http.HttpServletRequest;
import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class CustomExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler({AccessDeniedException.class, AuthenticationException.class})
    @ResponseStatus(HttpStatus.FORBIDDEN)
    @ResponseBody
    public ResponseEntity<ErrorInfo> handleAccessDeniedException(RuntimeException ex, HttpServletRequest request) {
        ErrorInfo errorInfo = new ErrorInfo(request.getRequestURI(),  ex);
        return new ResponseEntity<>(errorInfo, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(ApiException.class)
    public ResponseEntity<ErrorInfo> handleApiException(ApiException ex, HttpServletRequest request) {
        return new ResponseEntity<>(new ErrorInfo(request.getRequestURI(), ex), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler({BadRequestException.class, IOException.class})
    public ResponseEntity<ErrorInfo> handleBadRequestException(IOException ex, HttpServletRequest request) {
        return new ResponseEntity<>(new ErrorInfo(request.getRequestURI(), ex), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ErrorInfo> handleNotFoundException(NotFoundException ex, HttpServletRequest request) {
        return new ResponseEntity<>(new ErrorInfo(request.getRequestURI(), ex), HttpStatus.NOT_FOUND);
    }

    @Override
    public ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException ex, HttpHeaders headers,
            HttpStatusCode status, WebRequest request) {

        Map<String, String> errors = new HashMap<>();
        ex.getAllErrors().forEach(error -> {
            String fieldName = ((FieldError)error).getField();
            String message = error.getDefaultMessage();
            errors.put(fieldName, message);
        });

        return new ResponseEntity<>(errors, status);
    }

    //FIXME: in the future this might cause problems
    @Override
    public ResponseEntity<Object> handleExceptionInternal(Exception ex, Object body,HttpHeaders headers,
                                                          HttpStatusCode statusCode, WebRequest request){

        var errorInfo = new ErrorInfo(request.getDescription(false).substring(4) , ex);
        return new ResponseEntity<>(errorInfo, statusCode);
    }
}
