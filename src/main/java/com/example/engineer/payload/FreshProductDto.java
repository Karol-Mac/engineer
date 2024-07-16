package com.example.engineer.payload;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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
    private String name;

    @Min(0)
    @NotNull
    private BigDecimal price;

    @NotNull
    private Boolean inGrams;

    @Min(0)
    @NotNull
    private Integer weight;

    @Min(0)
    @NotNull
    private Integer energeticValue;

    @ValidPercentage
    @NotNull
    private Integer fat;

    @ValidPercentage
    @NotNull
    private Integer protein;

    @ValidPercentage
    @NotNull
    private Integer carbs;

    @ValidPercentage
    @NotNull
    private Integer fiber;

    @ValidPercentage
    @NotNull
    private Integer salt;

    private String imageName;

    private Long sellerId;
}
