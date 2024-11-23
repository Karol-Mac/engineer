package com.example.engineer.payload;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import com.example.engineer.util.ValidPercentage;

/**
 * Class describe product that seller adds and operate on
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public final class FreshProductDto {
    private long id;

    @NotBlank(message = "need to contain at least 1 character")
    @Size(max = 50, message = "name can has maximum 50 chars (min 1)")
    private String name;

    @DecimalMin(value = "0.01", message = "Price must be greater than or equal to 0.01")
    @NotNull
    private BigDecimal price;

    @NotNull
    private Boolean inGrams;

    @Min(1)
    @NotNull
    private Integer weight;

    @Min(0)
    @NotNull
    private Integer energeticValue;

    @ValidPercentage
    @NotNull
    private BigDecimal fat;

    @ValidPercentage
    @NotNull
    private BigDecimal protein;

    @ValidPercentage
    @NotNull
    private BigDecimal carbs;

    @ValidPercentage
    @NotNull
    private BigDecimal fiber;

    @ValidPercentage
    @NotNull
    private BigDecimal salt;

    private String imageName;
}