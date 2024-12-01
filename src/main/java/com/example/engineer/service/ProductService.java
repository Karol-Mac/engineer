package com.example.engineer.service;

import com.example.engineer.payload.FreshProductDto;
import com.example.engineer.payload.ProductDto;
import com.example.engineer.payload.ProductResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ProductService {
    FreshProductDto addProduct(FreshProductDto freshProduct,
                               MultipartFile imageFile, String email) throws IOException;

    ProductResponse getAllProducts(String productName, Pageable pageable, final String email);
    ProductResponse getAllProducts(String productName, Pageable pageable);

    ProductDto getProductById(long productId, final String email);
    ProductDto getProductById(long productId);

    FreshProductDto updateProduct(FreshProductDto product, long productId, String email);

    String deleteProduct(long productId, String email);

    ProductResponse getSellerProductDtos(String email, Pageable pageable);

    Integer getProductPageCount(String name, Pageable pageable);
}
