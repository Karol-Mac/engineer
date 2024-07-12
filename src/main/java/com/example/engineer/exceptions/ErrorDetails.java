package com.example.engineer.exceptions;

import java.time.LocalDateTime;

public record ErrorDetails(String message, LocalDateTime timestamp, String details) {}
