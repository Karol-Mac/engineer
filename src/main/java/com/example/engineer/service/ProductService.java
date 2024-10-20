package com.example.engineer.service;

import com.example.engineer.payload.FreshProductDto;
import com.example.engineer.payload.ProductDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ProductService {
    FreshProductDto addProduct(FreshProductDto freshProduct,
                               MultipartFile imageFile, String email) throws IOException;

    List<ProductDto> getAllProducts(String productName, final String email);

    ProductDto getProductById(long productId, final String email);

    FreshProductDto updateProduct(FreshProductDto product, long productId, String email);

    String deleteProduct(long productId, String email);
}
