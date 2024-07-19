package com.example.engineer.service.impl;

import com.example.engineer.entity.Comment;
import com.example.engineer.entity.User;
import com.example.engineer.exceptions.NotFoundException;
import com.example.engineer.payload.CommentDto;
import com.example.engineer.repository.CommentRepository;
import com.example.engineer.repository.UserRepository;
import com.example.engineer.service.CommentService;
import com.example.engineer.util.mappers.CommentMapper;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final CommentMapper commentMapper;
    private final UserRepository userRepository;

    public CommentServiceImpl(CommentRepository commentRepository, CommentMapper commentMapper, UserRepository userRepository){
        this.commentRepository = commentRepository;
        this.commentMapper = commentMapper;
        this.userRepository = userRepository;
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
        Comment comment = Comment.builder()
                .content(content)
                .isVisible(true)
                .user(getUserFromDB())
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

    private User getUserFromDB(){
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new BadCredentialsException("User not found with email: " + email));
    }
}
