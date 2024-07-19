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
        commentDto.setAuthorName(comment.getUser().getUsername());
        commentDto.setIsVisible(comment.getIsVisible());
        commentDto.setIsReported(!comment.getReports().isEmpty());

        return commentDto;
    }
}
