package com.example.engineer.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
/**
 Class describe product that seller adds and operate on
 */
@Data
@AllArgsConstructor
@NoArgsConstructor

public final class FreshProductDto {
    private long id;

    private String name;

    private BigDecimal price;

    private boolean inGrams;

    private int weight;

    private int energeticValue;

    private int fat;

    private int protein;

    private int carbs;

    private int fiber;

    private int salt;

    private String imageName;
}
