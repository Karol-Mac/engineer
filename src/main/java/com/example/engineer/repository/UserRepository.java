package com.example.engineer.repository;

import com.example.engineer.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Boolean existsByEmail(String email);

    Optional<User> findByEmail(String email);

    @Query("SELECT u.username FROM User u WHERE u.id = :id")
    Optional<String> findUsernameById(Long id);
}
