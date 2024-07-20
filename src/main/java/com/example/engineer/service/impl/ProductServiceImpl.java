package com.example.engineer.service.impl;

import com.example.engineer.entity.Product;
import com.example.engineer.entity.Seller;
import com.example.engineer.exceptions.NotFoundException;
import com.example.engineer.payload.FreshProductDto;
import com.example.engineer.payload.ProductDto;
import com.example.engineer.repository.ProductRepository;
import com.example.engineer.repository.SellerRepository;
import com.example.engineer.repository.UserRepository;
import com.example.engineer.service.ImageService;
import com.example.engineer.service.ProductService;
import com.example.engineer.util.RoleBeans;
import com.example.engineer.util.mappers.ProductMapper;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final SellerRepository sellerRepository;
    private final UserRepository userRepository;
    private final ProductMapper productMapper;
    private final ImageService imageService;

    public ProductServiceImpl(ProductRepository productRepository, SellerRepository sellerRepository,
                              UserRepository userRepository, ProductMapper productMapper,
                              ImageService imageService){
        this.productRepository = productRepository;
        this.sellerRepository = sellerRepository;
        this.userRepository = userRepository;
        this.productMapper = productMapper;
        this.imageService = imageService;
    }


    @Override
    public FreshProductDto addProduct(FreshProductDto freshProduct, MultipartFile imageFile) throws IOException{

        Product product = productMapper.mapToEntity(freshProduct);

        Seller owner = getSellerFromSession();
        String imageName = imageService.saveImage(imageFile);

        product.setSeller(owner);
        product.setImageName(imageName);
        product.setIsHidden(false);
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

        getOwner(actual.getSeller().getId(), getSellerFromSession());

        productMapper.copyCommonFields(freshProductDto, actual);
        actual.setId(productId);

        return productMapper.mapProductToFresh(productRepository.save(actual));
    }

    @Override
    public String deleteProduct(long productId){
        var product = getProductFromDB(productId);
        var email = getUserEmail();
        //check if user is admin:
        var admin = userRepository.findByEmail(email).orElse(null);

        //if no - check if it's a seller
        if (admin == null || !admin.getRole().getName().contains(RoleBeans.ADMIN)) {
            getOwner(product.getSeller().getId(), getSellerFromSession());
        }
        return deleteProduct(product);
    }

    private String deleteProduct(Product product){
        product.setIsHidden(true);
        productRepository.save(product);
        return "Product deleted succesfully";
    }


    private Product getProductFromDB(long productId){
        return productRepository.findById(productId)
                .orElseThrow(()->new NotFoundException(Product.class.getSimpleName(), productId));
    }

    private String getUserEmail(){
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    private Seller getSellerFromSession(){

        return sellerRepository.findByEmail(getUserEmail()).orElseThrow(
                () -> new AccessDeniedException("You have no permission to access this resource"));
    }

    private void getOwner(long sellerId, Seller loggedIn){
        var owner = sellerRepository.findById(sellerId).orElseThrow(
                () -> new NotFoundException("Seller", sellerId));

        if(!owner.equals(loggedIn))
            throw new AccessDeniedException("You are not the owner of this product");
    }
}
