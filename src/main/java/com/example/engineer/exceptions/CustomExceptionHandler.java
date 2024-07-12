package com.example.engineer.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.LocalDateTime;


@Controller
public class CustomExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(ApiException.class)
    public final ResponseEntity<ErrorDetails> handleApiException(ApiException ex, WebRequest request){
        ErrorDetails errorDetails = new ErrorDetails( ex.getMessage(), LocalDateTime.now(),
                request.getDescription(false));

        return new ResponseEntity<>(errorDetails, ex.getStatus());
    }


    @ExceptionHandler({AuthenticationException.class, AuthorizationException.class})
    public final ResponseEntity<ErrorDetails> handleLoggingProblems(ApiException ex, WebRequest request){
        ErrorDetails errorDetails = new ErrorDetails( ex.getMessage(), LocalDateTime.now(),
                request.getDescription(false));

        return new ResponseEntity<>(errorDetails, ex.getStatus());
    }

    @ExceptionHandler(NotFoundException.class)
    public final ResponseEntity<ErrorDetails> handleNotFoundException(NotFoundException ex, WebRequest request){
        ErrorDetails errorDetails = new ErrorDetails( ex.getMessage(), LocalDateTime.now(),
                request.getDescription(false));

        return new ResponseEntity<>(errorDetails, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(Exception.class)
    public final ResponseEntity<ErrorDetails> handleGlobalException(Exception ex, WebRequest request){
        ErrorDetails errorDetails = new ErrorDetails( "Unhandled exception occurs", LocalDateTime.now(),
                request.getDescription(false));

        return new ResponseEntity<>(errorDetails, HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
