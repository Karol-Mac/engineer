package com.example.engineer.exceptions;

import lombok.Getter;

@Getter
public class NotFoundException extends RuntimeException {

    private final String message;
    private final String resource;
    private final long id;

    public NotFoundException(String resource, long id){
        super(resource + " not found with id: "+ id);
        this.message = resource + " not found with id: "+ id;
        this.resource = resource;
        this.id = id;
    }
}
