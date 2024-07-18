package com.example.engineer.util;

import com.example.engineer.entity.Product;
import com.example.engineer.entity.User;
import com.example.engineer.payload.FreshProductDto;
import com.example.engineer.payload.ProductDto;
import com.example.engineer.repository.SellerRepository;
import com.example.engineer.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class ProductMapper {

    private final UserRepository userRepository;
    private final SellerRepository sellerRepository;

    public ProductMapper(UserRepository userRepository, SellerRepository sellerRepository) {
        this.userRepository = userRepository;
        this.sellerRepository = sellerRepository;
    }

    public ProductDto mapProductToDto(Product product) {
        if (product == null) throw new NullPointerException("Product cannot be null");

        ProductDto productDto = new ProductDto();
        copyCommonFields(product, productDto);
        productDto.setId(product.getId());
        productDto.setUpdatedAt(product.getUpdatedAt());
        productDto.setIsHidden(product.isHidden());

        var user = getUserFromDB();

        if (user != null) {
            productDto.setIsFavourite(isFavourite(product, user));
            productDto.setIsReported(isReported(product, user));
        } else {
            productDto.setIsFavourite(false);
            productDto.setIsReported(false);
        }
        return productDto;
    }

    private static boolean isReported(Product product, User user) {
        return user.getReports().stream()
                .anyMatch(report -> report.getProduct().equals(product));
    }

    private static boolean isFavourite(Product product, User user) {
        return user.getFavouriteProducts().stream().anyMatch(pro -> pro.equals(product));
    }

    public Product mapToEntity(FreshProductDto freshProductDto) {
        if (freshProductDto == null) throw new NullPointerException("FreshProductDto cannot be null");

        Product product = new Product();
        copyCommonFields(freshProductDto, product);

        return product;
    }

    public FreshProductDto mapProductToFresh(Product product) {
        if (product == null) throw new NullPointerException("Product cannot be null");

        FreshProductDto freshProductDto = new FreshProductDto();
        copyCommonFields(product, freshProductDto);
        freshProductDto.setId(product.getId());

        return freshProductDto;
    }

    public void copyCommonFields(Product source, ProductDto target) {
        target.setName(source.getName());
        target.setPrice(source.getPrice());
        target.setInGrams(source.isInGrams());
        target.setWeight(source.getWeight());
        target.setEnergeticValue(source.getEnergeticValue());
        target.setFat(source.getFat());
        target.setProtein(source.getProtein());
        target.setCarbs(source.getCarbs());
        target.setFiber(source.getFiber());
        target.setSalt(source.getSalt());
        target.setImageName(source.getImageName());
        target.setSellerId(source.getSeller().getId());
    }

    public void copyCommonFields(FreshProductDto source, Product target) {
        target.setName(source.getName());
        target.setPrice(source.getPrice());
        target.setInGrams(source.getInGrams());
        target.setWeight(source.getWeight());
        target.setEnergeticValue(source.getEnergeticValue());
        target.setFat(source.getFat());
        target.setProtein(source.getProtein());
        target.setCarbs(source.getCarbs());
        target.setFiber(source.getFiber());
        target.setSalt(source.getSalt());
    }

    public void copyCommonFields(Product source, FreshProductDto target) {
        target.setName(source.getName());
        target.setPrice(source.getPrice());
        target.setInGrams(source.isInGrams());
        target.setWeight(source.getWeight());
        target.setEnergeticValue(source.getEnergeticValue());
        target.setFat(source.getFat());
        target.setProtein(source.getProtein());
        target.setCarbs(source.getCarbs());
        target.setFiber(source.getFiber());
        target.setSalt(source.getSalt());
        target.setImageName(source.getImageName());
        target.setSellerId(source.getSeller().getId());
    }

    private User getUserFromDB(){
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        /** If a user is anonymous, or it's a seller (which can't add products to favourite either)
                      then return null (set isFav & isRep to false)*/
        if(email.equals("anonymousUser") || sellerRepository.existsByEmail(email)) return null;
        else {
            return userRepository.findByEmail(email).orElseThrow(
                    () -> new UsernameNotFoundException("User with email: " + email + " not found"));
        }
    }
}