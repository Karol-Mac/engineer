package com.example.engineer.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor

/**
  Class describes a version of product - any system user will see
 */
public final class ProductDto {

    private long id;

    private String name;

    private BigDecimal price;

    private boolean isGram;

    private int weight;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private int energeticValue;

    private int fat;

    private int protein;

    private int carbs;

    private int fiber;

    private int salt;

    private String imageName;

    private boolean isHidden;

    private boolean isFavourite;

    private boolean isReported;
}