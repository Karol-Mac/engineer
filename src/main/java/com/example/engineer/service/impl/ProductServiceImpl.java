package com.example.engineer.service.impl;

import com.example.engineer.entity.Product;
import com.example.engineer.exceptions.NotFoundException;
import com.example.engineer.payload.FreshProductDto;
import com.example.engineer.payload.ProductDto;
import com.example.engineer.repository.ProductRepository;
import com.example.engineer.service.ProductService;
import com.example.engineer.util.ProductMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    public ProductServiceImpl(ProductRepository productRepository, ProductMapper productMapper){
        this.productRepository = productRepository;
        this.productMapper = productMapper;
    }

    @Override
    public FreshProductDto addProduct(FreshProductDto freshProduct){

        Product product = productMapper.mapToEntity(freshProduct);
        Product saved = productRepository.save(product);

        return productMapper.mapProductToFresh(saved);
    }

    @Override
    public List<ProductDto> getAllProducts(String productName){

        List<Product> products = productRepository.findByName(productName);

        //TODO: add functionality to set isFavourite & isReported
        return products.stream().map(productMapper::mapProductToDto).toList();
    }

    @Override
    public ProductDto getProductById(long productId){

        Product product = productRepository.findById(productId)
                .orElseThrow(()->new NotFoundException(Product.class.getSimpleName(), productId));
        return productMapper.mapProductToDto(product);
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
