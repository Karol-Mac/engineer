package com.example.engineer.service;

import com.example.engineer.payload.FreshProductDto;
import com.example.engineer.payload.ProductDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ProductService {
    FreshProductDto addProduct(FreshProductDto freshProduct,
                               MultipartFile imageFile) throws IOException;

    List<ProductDto> getAllProducts(String productName);

    ProductDto getProductById(long productId);

    FreshProductDto updateProduct(FreshProductDto product, long productId);

    String deleteProduct(long productId);
}
