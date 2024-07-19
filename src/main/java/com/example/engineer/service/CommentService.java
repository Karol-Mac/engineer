package com.example.engineer.service;

import com.example.engineer.payload.CommentDto;

import java.util.List;

public interface CommentService {
    List<CommentDto> getAllComments();

    CommentDto addComment(CommentDto commentDto);

    CommentDto getCommentById(long id);

    String deleteComment(long id);
}
