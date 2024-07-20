package com.example.engineer.exceptions;

import lombok.Getter;

@Getter
public class NotFoundException extends RuntimeException {

    private final String message;
    private final String resource;
    private final long id;
    private static final String MESSAGE = " not found with id: ";

    public NotFoundException(String resource, long id){
        super(resource + MESSAGE+ id);
        this.message = resource + MESSAGE+ id;
        this.resource = resource;
        this.id = id;
    }
}
