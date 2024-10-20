package com.example.engineer.exceptions;

import lombok.Getter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Getter
public final class ErrorInfo{
    private final String message;
    private final String timestamp;
    private final String url;

    public ErrorInfo(String url, Exception ex){
        this.message = ex.getMessage();
        this.timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        this.url = url;
    }
}
