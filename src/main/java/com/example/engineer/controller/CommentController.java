package com.example.engineer.controller;

import com.example.engineer.payload.CommentDto;
import com.example.engineer.service.CommentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService){
        this.commentService = commentService;
    }

    @GetMapping
    public ResponseEntity<List<CommentDto>> getAllComments(){
        return ResponseEntity.ok(commentService.getAllComments());
    }

    @PostMapping
    @PreAuthorize("hasRole(@userRole)")
    public ResponseEntity<CommentDto> createComment(@RequestBody String content){
        return new ResponseEntity<>(commentService.addComment(content), HttpStatus.CREATED);
    }

    @GetMapping("/{commentId}")
    @PreAuthorize("hasRole(@adminRole)")
    public ResponseEntity<CommentDto> getSingleComment(@PathVariable long commentId){
        return ResponseEntity.ok(commentService.getCommentById(commentId));
    }

    @DeleteMapping("/{commentId}")
    @PreAuthorize("hasRole(@adminRole)")
    public ResponseEntity<String> deleteComment(@PathVariable long commentId){
        return ResponseEntity.ok(commentService.deleteComment(commentId));
    }
}
