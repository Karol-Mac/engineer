package com.example.engineer.service;

import com.example.engineer.payload.FreshProductDto;
import com.example.engineer.payload.ProductDto;

import java.util.List;

public interface ProductService {
    FreshProductDto addProduct(FreshProductDto freshProduct);

    List<ProductDto> getAllProducts(String productName);

    ProductDto getProductById(long productId);

    FreshProductDto updateProduct(FreshProductDto product);

    String deleteProduct(long productId);
}
