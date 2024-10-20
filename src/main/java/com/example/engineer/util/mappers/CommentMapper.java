package com.example.engineer.util.mappers;

import com.example.engineer.entity.Comment;
import com.example.engineer.entity.User;
import com.example.engineer.payload.CommentDto;
import com.example.engineer.util.UserUtil;
import org.springframework.stereotype.Component;

@Component
public class CommentMapper {
    private final UserUtil userUtil;

    public CommentMapper(UserUtil userUtil) {
        this.userUtil = userUtil;
    }

    public CommentDto mapToDto(Comment comment, String email) {
        CommentDto commentDto = new CommentDto();
        commentDto.setId(comment.getId());
        commentDto.setContent(comment.getContent());
        commentDto.setAuthorName(comment.getUser().getRealUsername());
        commentDto.setIsVisible(comment.getIsVisible());

        //checking wether user reported exact comment
        var user = userUtil.getUserOrNull(email);
        if (user == null) commentDto.setIsReported(false);
        else commentDto.setIsReported(isReported(comment, user));

        return commentDto;
    }

    private static boolean isReported(Comment comment, User user) {
        return user.getReports().stream()
                .filter(report -> report.getComment() != null && !report.getIsDone())
                .anyMatch(report -> report.getComment().equals(comment));
    }
}
