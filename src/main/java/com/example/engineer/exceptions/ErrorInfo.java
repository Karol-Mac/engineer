package com.example.engineer.exceptions;

import lombok.Getter;

import java.time.LocalDateTime;
import java.util.Date;

@Getter
public final class ErrorInfo{
    private final String message;
    private final Date timestamp;
    private final String url;

    public ErrorInfo(String url, Exception ex){
        this.message = ex.getMessage();
        this.timestamp = new Date();
        this.url = url;
    }
}
