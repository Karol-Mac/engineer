package com.example.engineer.service;

import com.example.engineer.entity.Comment;
import com.example.engineer.entity.User;
import com.example.engineer.exceptions.ApiException;
import com.example.engineer.exceptions.NotFoundException;
import com.example.engineer.payload.CommentDto;
import com.example.engineer.repository.CommentRepository;
import com.example.engineer.service.impl.CommentServiceImpl;
import com.example.engineer.util.UserUtil;
import com.example.engineer.util.mappers.CommentMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class CommentServiceImplTest {

    @Mock
    private CommentRepository commentRepository;

    @Mock
    private CommentMapper commentMapper;

    @Mock
    private UserUtil userUtil;

    @InjectMocks
    private CommentServiceImpl commentService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getAllComments_returnsCommentList() {
        String email = "user@example.com";
        Comment comment = new Comment();
        CommentDto commentDto = new CommentDto();

        when(commentRepository.findAll()).thenReturn(List.of(comment));
        when(commentMapper.mapToDto(comment, email)).thenReturn(commentDto);

        List<CommentDto> result = commentService.getAllComments(email);

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(commentDto, result.get(0));
    }

    @Test
    void addComment_createsNewComment() {
        String content = "Test comment";
        String email = "user@example.com";
        User user = new User();
        user.setIsBlocked(false);
        Comment comment = new Comment();
        CommentDto commentDto = new CommentDto();

        when(userUtil.getUser(email)).thenReturn(user);
        when(commentRepository.save(any(Comment.class))).thenReturn(comment);
        when(commentMapper.mapToDto(comment, email)).thenReturn(commentDto);

        CommentDto result = commentService.addComment(content, email);

        assertNotNull(result);
        assertEquals(commentDto, result);
    }

    @Test
    void addComment_throwsApiException_whenUserIsBlocked() {
        String content = "Test comment";
        String email = "user@example.com";
        User user = new User();
        user.setIsBlocked(true);

        when(userUtil.getUser(email)).thenReturn(user);

        ApiException exception = assertThrows(ApiException.class, () -> commentService.addComment(content, email));

        assertEquals("You cannot perform this operation - you're blocked", exception.getMessage());
        assertEquals(HttpStatus.CONFLICT, exception.getStatus());
    }

    @Test
    void getCommentById_returnsComment() {
        long id = 1L;
        Comment comment = new Comment();
        CommentDto commentDto = new CommentDto();

        when(commentRepository.findById(id)).thenReturn(Optional.of(comment));
        when(commentMapper.mapToDto(comment, "")).thenReturn(commentDto);

        CommentDto result = commentService.getCommentById(id);

        assertNotNull(result);
        assertEquals(commentDto, result);
    }

    @Test
    void getCommentById_throwsNotFoundException_whenCommentNotFound() {
        long id = 1L;

        when(commentRepository.findById(id)).thenReturn(Optional.empty());

        NotFoundException exception = assertThrows(NotFoundException.class, () -> commentService.getCommentById(id));

        assertEquals("Comment not found with id: 1", exception.getMessage());
    }

    @Test
    void deleteComment_setsCommentInvisible() {
        long id = 1L;
        Comment comment = new Comment();
        comment.setIsVisible(true);

        when(commentRepository.findById(id)).thenReturn(Optional.of(comment));

        String result = commentService.deleteComment(id);

        assertEquals("Comment deleted successfully", result);
        assertFalse(comment.getIsVisible());
        verify(commentRepository, times(1)).save(comment);
    }

    @Test
    void deleteComment_throwsNotFoundException_whenCommentNotFound() {
        long id = 1L;

        when(commentRepository.findById(id)).thenReturn(Optional.empty());

        NotFoundException exception = assertThrows(NotFoundException.class, () -> commentService.deleteComment(id));

        assertEquals("Comment not found with id: 1", exception.getMessage());
    }
}