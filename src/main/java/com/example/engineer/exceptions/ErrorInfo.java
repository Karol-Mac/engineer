package com.example.engineer.exceptions;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public final class ErrorInfo{
    private final String message;
    private final LocalDateTime timestamp;
    private final String url;

    public ErrorInfo(String url, Exception ex){
        this.message = ex.getMessage();
        this.timestamp = LocalDateTime.now();
        this.url = url;
    }
}
