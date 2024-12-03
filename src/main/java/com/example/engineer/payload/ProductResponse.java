package com.example.engineer.payload;


import lombok.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductResponse {

    private List<ProductDto> products;
    private int pageNumber;
    private int totalPages;
    private int pageSize;
    private boolean isLast;
}
