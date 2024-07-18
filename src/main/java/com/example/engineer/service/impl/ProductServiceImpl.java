package com.example.engineer.service.impl;

import com.example.engineer.entity.Product;
import com.example.engineer.entity.Seller;
import com.example.engineer.exceptions.NotFoundException;
import com.example.engineer.payload.FreshProductDto;
import com.example.engineer.payload.ProductDto;
import com.example.engineer.repository.ProductRepository;
import com.example.engineer.repository.SellerRepository;
import com.example.engineer.service.ImageService;
import com.example.engineer.service.ProductService;
import com.example.engineer.util.ProductMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final SellerRepository sellerRepository;
    private final ProductMapper productMapper;
    private final ImageService imageService;


    @Override
    public FreshProductDto addProduct(FreshProductDto freshProduct, MultipartFile imageFile) throws IOException{

        Product product = productMapper.mapToEntity(freshProduct);

        Seller owner = getSellerFromDB();
        String imageName = imageService.saveImage(imageFile);

        product.setSeller(owner);
        product.setImageName(imageName);
        Product saved = productRepository.save(product);

        return productMapper.mapProductToFresh(saved);
    }

    @Override
    public List<ProductDto> getAllProducts(String productName){

        List<Product> products = productRepository.findByNameContaining(productName);

        return products.stream().map(productMapper::mapProductToDto).toList();
    }

    @Override
    public ProductDto getProductById(long productId){

        Product product = getProductFromDB(productId);
        return productMapper.mapProductToDto(product);
    }

    @Override
    public FreshProductDto updateProduct(FreshProductDto freshProductDto, long productId){
        Product actual = getProductFromDB(productId);

        productMapper.copyCommonFields(freshProductDto, actual);
        actual.setId(productId);

        return productMapper.mapProductToFresh(productRepository.save(actual));
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

    private Seller getSellerFromDB(){
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return sellerRepository.findByEmail(email)
                .orElseThrow(() -> new AccessDeniedException("You have no permission to access this resource"));
    }

}
