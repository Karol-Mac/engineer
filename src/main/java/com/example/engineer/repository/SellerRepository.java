package com.example.engineer.repository;

import com.example.engineer.entity.Seller;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface SellerRepository extends JpaRepository<Seller, Long> {

    Boolean existsByEmail(String email);
    Optional<Seller> findByEmail(String email);

    @Query("SELECT s.shopName FROM Seller s WHERE s.id = :id")
    Optional<String> findShopNameById(Long id);
}
