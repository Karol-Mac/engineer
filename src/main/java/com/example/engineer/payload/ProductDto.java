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
 This class don't really need any validation - It's just a view for the user
 */
public final class ProductDto {

    private long id;
    private String name;
    private BigDecimal price;
    private Boolean inGrams;
    private LocalDateTime updatedAt;
    private Integer weight;
    private Integer energeticValue;
    private BigDecimal fat;
    private BigDecimal protein;
    private BigDecimal carbs;
    private BigDecimal fiber;
    private BigDecimal salt;
    private String imageName;

    private Boolean isHidden;
    private Boolean isFavourite;
    private Boolean isReported;
    private long sellerId;
}