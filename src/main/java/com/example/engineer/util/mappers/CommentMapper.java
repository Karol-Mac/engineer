package com.example.engineer.util.mappers;

import com.example.engineer.entity.Comment;
import com.example.engineer.payload.CommentDto;
import org.springframework.stereotype.Component;

@Component
public class CommentMapper {

    public CommentDto mapToDto(Comment comment) {
        CommentDto commentDto = new CommentDto();
        commentDto.setId(comment.getId());
        commentDto.setContent(comment.getContent());
        commentDto.setAuthorName(comment.getUser().getRealUsername());
        commentDto.setIsVisible(comment.getIsVisible());

        //when new comment is created - report's list is a null,
        // but when It's retrieved from DB (and doesn't have any reports)
        // it is an empty list
        commentDto.setIsReported(!(comment.getReports() == null || comment.getReports().isEmpty()));

        return commentDto;
    }
}
