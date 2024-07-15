package com.example.engineer.repository;

import com.example.engineer.entity.Seller;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SellerRepository extends JpaRepository<Seller, Long> {

    Boolean existsByEmail(String email);
    Optional<Seller> findByEmail(String email);
}
