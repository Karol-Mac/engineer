package com.example.engineer.service.impl;

import com.example.engineer.entity.Comment;
import com.example.engineer.exceptions.ApiException;
import com.example.engineer.exceptions.NotFoundException;
import com.example.engineer.payload.CommentDto;
import com.example.engineer.repository.CommentRepository;
import com.example.engineer.service.CommentService;
import com.example.engineer.util.UserUtil;
import com.example.engineer.util.mappers.CommentMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final CommentMapper commentMapper;
    private final UserUtil userUtil;

    public CommentServiceImpl(CommentRepository commentRepository, CommentMapper commentMapper,
                              UserUtil userUtil){
        this.commentRepository = commentRepository;
        this.commentMapper = commentMapper;
        this.userUtil = userUtil;
    }

    @Override
    public List<CommentDto> getAllComments(){
        return commentRepository.findAll()
                .stream()
                .map(commentMapper::mapToDto)
                .toList();
    }

    @Override
    public CommentDto addComment(String content){

        var user = userUtil.getUserFromDB();
        if(user.getIsBlocked())
            throw new ApiException("You cannot perform this operation", HttpStatus.CONFLICT);

        Comment comment = Comment.builder()
                .content(content)
                .isVisible(true)
                .user(user)
                .build();

        var savedComment = commentRepository.save(comment);
        return commentMapper.mapToDto(savedComment);
    }

    @Override
    public CommentDto getCommentById(long id){
        Comment comment = commentRepository.findById(id)
                    .orElseThrow(() -> new NotFoundException("Comment", id));

        return  commentMapper.mapToDto(comment);
    }

    @Override
    public String deleteComment(long id){
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Comment", id));

        comment.setIsVisible(false);
        commentRepository.save(comment);
        return "Comment deleted successfully";
    }
}
