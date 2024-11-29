package com.example.engineer.payload;


import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ProductResponse {

    private List<ProductDto> products;
    private int pageNumber;
    private int totalPages;
    private int pageSize;
    private boolean isLast;
}
