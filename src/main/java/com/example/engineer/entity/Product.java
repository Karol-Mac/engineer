package com.example.engineer.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;


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
    private Boolean inGrams;         // (inGrams ? solid : liquid ) product

    @Column(nullable = false)
    private int weight;            //weight of single pack

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @Column(nullable = false)
    private Integer energeticValue;     //in kcal

    @Column(nullable = false)
    private BigDecimal fat;

    @Column(nullable = false)
    private BigDecimal protein;

    @Column(nullable = false)
    private BigDecimal carbs;

    @Column(nullable = false)
    private BigDecimal fiber;

    @Column(nullable = false)
    private BigDecimal salt;

    @Column(nullable = false)
    private Boolean isHidden;      //removed products have isHidden=true

    private String imageName;

    @ManyToOne
    @JoinColumn(name = "sellerId", nullable = false)
    private Seller seller;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Report> reports;
}