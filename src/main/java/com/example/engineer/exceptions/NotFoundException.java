package com.example.engineer.exceptions;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@Getter
@ResponseStatus(HttpStatus.NOT_FOUND)
public class NotFoundException extends RuntimeException {

    private final String message;
    private final String resource;
    private final long id;

    public NotFoundException(String resource, long id, long id1){
        super();
        this.message = resource + " not found with id: "+ id;
        this.resource = resource;
        this.id = id1;
    }
}
