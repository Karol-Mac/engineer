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

        List<Product> products = productRepository.findByNameContaining(productName);

        //FIXME: add functionality to set isFavourite & isReported
        return products.stream().map(productMapper::mapProductToDto).toList();
    }

    @Override
    public ProductDto getProductById(long productId){

        Product product = getProductFromDB(productId);
        return productMapper.mapProductToDto(product);
    }

    @Override
    public FreshProductDto updateProduct(FreshProductDto freshProductDto, long productId){
        getProductFromDB(productId);

        Product updated = productMapper.mapToEntity(freshProductDto);
        updated.setId(productId);

        return productMapper.mapProductToFresh(productRepository.save(updated));
    }

    @Override
    public String deleteProduct(long productId){
        var product = getProductFromDB(productId);
        product.setHidden(true);
        productRepository.save(product);

        return "Product deleted succesfully";
    }

    private Product getProductFromDB(long productId){
        return productRepository.findById(productId)
                .orElseThrow(()->new NotFoundException(Product.class.getSimpleName(), productId));
    }
}
