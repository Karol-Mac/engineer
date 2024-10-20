package com.example.engineer.repository;

import com.example.engineer.entity.Comment;
import com.example.engineer.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    List<Comment> findByUser(User user);

}
