package com.example.engineer.util;

import com.example.engineer.entity.Product;
import com.example.engineer.entity.User;
import com.example.engineer.exceptions.NotFoundException;
import com.example.engineer.payload.FreshProductDto;
import com.example.engineer.payload.ProductDto;
import com.example.engineer.payload.ProductResponse;
import com.example.engineer.repository.ProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

@Component
public class ProductUtils {

    private final UserUtil userUtil;
    private final ProductRepository productRepository;

    public ProductUtils(UserUtil userUtil, ProductRepository productRepository) {
        this.userUtil = userUtil;
        this.productRepository = productRepository;
    }


    public ProductDto mapProductToDto(Product product, String email) {
        var productDto = mapProductToDto(product);
        var user = userUtil.getUser(email);

        productDto.setIsFavourite(isFavourite(product, user));
        productDto.setIsReported(isReported(product, user));
        return productDto;
    }

    public ProductDto mapProductToDto(Product product) {
        if (product == null) throw new NullPointerException("Product cannot be null");

        ProductDto productDto = new ProductDto();
        copyCommonFields(product, productDto);
        productDto.setId(product.getId());
        productDto.setUpdatedAt(product.getUpdatedAt());
        productDto.setIsHidden(product.getIsHidden());
        productDto.setIsFavourite(false);
        productDto.setIsReported(false);

        return productDto;
    }

    public ProductResponse getProductResponse(Page<Product> productsPage) {
        return ProductResponse.builder()
                .totalPages(productsPage.getTotalPages())
                .pageSize(productsPage.getSize())
                .pageNumber(productsPage.getNumber())
                .isLast(productsPage.isLast())
                .build();
    }

    private static boolean isReported(Product product, User user) {
        return user.getReports().stream()
                .filter(report -> report.getProduct() != null && !report.getIsDone())
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
        target.setInGrams(source.getInGrams());
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
        target.setInGrams(source.getInGrams());
        target.setWeight(source.getWeight());
        target.setEnergeticValue(source.getEnergeticValue());
        target.setFat(source.getFat());
        target.setProtein(source.getProtein());
        target.setCarbs(source.getCarbs());
        target.setFiber(source.getFiber());
        target.setSalt(source.getSalt());
        target.setImageName(source.getImageName());
    }

    public Product getProductFromDB(long id){
        return productRepository.findById(id).orElseThrow(
                () -> new NotFoundException("Product", id)
        );
    }
}