package com.example.engineer.service.impl;

import com.example.engineer.payload.FreshProductDto;
import com.example.engineer.payload.ProductDto;
import com.example.engineer.service.ProductService;

import java.util.List;

public class ProductServiceImpl implements ProductService {

    @Override
    public FreshProductDto addProduct(FreshProductDto product){
        return null;
    }

    @Override
    public List<ProductDto> getAllProducts(String productName){
        return List.of();
    }

    @Override
    public ProductDto getProductById(long productId){
        return null;
    }

    @Override
    public FreshProductDto updateProduct(FreshProductDto product){
        return null;
    }

    @Override
    public String deleteProduct(long productId){
        return "";
    }
}
