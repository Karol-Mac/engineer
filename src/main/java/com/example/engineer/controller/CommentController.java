package com.example.engineer.controller;

import com.example.engineer.payload.CommentDto;
import com.example.engineer.service.CommentService;
import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService){
        this.commentService = commentService;
    }

    @GetMapping
    public ResponseEntity<List<CommentDto>> getAllComments(Principal principal){

        return ResponseEntity.ok(commentService.getAllComments(principal == null ? "" : principal.getName()));
    }

    @PostMapping
    public ResponseEntity<CommentDto> createComment(@RequestBody String content, Principal principal) throws BadRequestException{

        if(content.isBlank()) throw new BadRequestException("Comment content cannot be empty");

        return new ResponseEntity<>(commentService.addComment(content, principal.getName()), HttpStatus.CREATED);
    }

    @GetMapping("/{commentId}")
    public ResponseEntity<CommentDto> getSingleComment(@PathVariable long commentId){
        return ResponseEntity.ok(commentService.getCommentById(commentId));
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<String> deleteComment(@PathVariable long commentId){
        return ResponseEntity.ok(commentService.deleteComment(commentId));
    }
}
