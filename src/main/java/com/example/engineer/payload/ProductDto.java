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
    private Integer fat;
    private Integer protein;
    private Integer carbs;
    private Integer fiber;
    private Integer salt;
    private String imageName;
    private Boolean isHidden;
    private Boolean isFavourite;
    private Boolean isReported;
}