package com.example.engineer.service.impl;

import com.example.engineer.entity.Product;
import com.example.engineer.entity.Seller;
import com.example.engineer.payload.FreshProductDto;
import com.example.engineer.payload.ProductDto;
import com.example.engineer.repository.ProductRepository;
import com.example.engineer.service.ImageService;
import com.example.engineer.service.ProductService;
import com.example.engineer.util.ProductUtils;
import com.example.engineer.util.UserUtil;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final ProductUtils productUtils;
    private final ImageService imageService;
    private final UserUtil userUtil;

    public ProductServiceImpl(ProductRepository productRepository,
                              ProductUtils productUtils, ImageService imageService, UserUtil userUtil) {
        this.productRepository = productRepository;
        this.productUtils = productUtils;
        this.imageService = imageService;
        this.userUtil = userUtil;
    }


    @Override
    @PreAuthorize("hasRole(@sellerRole)")
    public FreshProductDto addProduct(FreshProductDto freshProduct,
                                      MultipartFile imageFile,
                                      String email) throws IOException {

        Product product = productUtils.mapToEntity(freshProduct);
        Seller loggedIn = userUtil.getSeller(email);
        String imageName = imageService.saveImage(imageFile);

        product.setSeller(loggedIn);
        product.setImageName(imageName);
        product.setIsHidden(false);
        Product saved = productRepository.save(product);

        return productUtils.mapProductToFresh(saved);
    }

    @Override
    public List<ProductDto> getAllProducts(String productName, final String email) {

        List<Product> products = productRepository.findByNameContaining(productName);

        return products.stream().map(p -> productUtils.mapProductToDto(p, email)).toList();
    }

    @Override
    public ProductDto getProductById(long productId, final String email) {

        Product product = productUtils.getProductFromDB(productId);
        return productUtils.mapProductToDto(product, email);
    }

    @Override
    @PreAuthorize("hasRole(@sellerRole)")               //add logic to check if seller is the owner.
    public FreshProductDto updateProduct(FreshProductDto freshProductDto, long productId, String email) {
        Product actual = productUtils.getProductFromDB(productId);

        productUtils.copyCommonFields(freshProductDto, actual);
        actual.setId(productId);

        return productUtils.mapProductToFresh(productRepository.save(actual));
    }

    @Override
    @PreAuthorize("hasAnyRole(@sellerRole, @adminRole)")    //add logic to check if seller is the owner.
    public String deleteProduct(long productId, String email) {
        var product = productUtils.getProductFromDB(productId);

        product.setIsHidden(true);
        productRepository.save(product);
        return "Product deleted succesfully";
    }


//    //FIXME: wtf ?!
//    private void getOwner(long sellerId, Seller loggedIn) {
//        var owner = sellerRepository.findById(sellerId).orElseThrow(
//                () -> new NotFoundException("Seller", sellerId));
//
//        if (!owner.equals(loggedIn))
//            throw new AccessDeniedException("You are not the owner of this product");
//    }
}