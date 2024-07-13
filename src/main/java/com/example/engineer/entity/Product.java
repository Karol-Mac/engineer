package com.example.engineer.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;


@Data
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false, length = 50)
    private String name;

    @Column(nullable = false)
    private BigDecimal price;

    @Column(nullable = false)
    private boolean inGrams;         // (inGrams ? solid : liquid ) product

    @Column(nullable = false)
    private int weight;            //weight of single pack

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @Column(nullable = false)
    private int energeticValue;     //in kcal

    @Column(nullable = false)
    private int fat;

    @Column(nullable = false)
    private int protein;

    @Column(nullable = false)
    private int carbs;

    @Column(nullable = false)
    private int fiber;

    @Column(nullable = false)
    private int salt;

    @Column(nullable = false)
    private boolean isHidden;      //removed products have isHidden=true

    private String imageName;
}
