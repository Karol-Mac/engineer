package com.example.engineer.util;

import com.example.engineer.entity.Product;
import com.example.engineer.payload.FreshProductDto;
import com.example.engineer.payload.ProductDto;
import org.springframework.stereotype.Component;

@Component
public class ProductMapper {

    public Product mapToEntity(ProductDto productDto) {
        if (productDto == null) throw new NullPointerException("ProductDto cannot be null");

        Product product = new Product();
        copyCommonFields(productDto, product);

        product.setId(productDto.getId());          //FIXME: id should me set ?
        product.setHidden(productDto.isHidden());

        return product;
    }

    public ProductDto mapProductToDto(Product product) {
        if (product == null) throw new NullPointerException("Product cannot be null");

        ProductDto productDto = new ProductDto();
        copyCommonFields(product, productDto);
        productDto.setId(product.getId());          //FIXME: HERE IT SHOULD!
        productDto.setUpdatedAt(product.getUpdatedAt());
        productDto.setHidden(product.isHidden());

        // default values for fields not defined in product
        productDto.setFavourite(false);
        productDto.setReported(false);

        return productDto;
    }

    public Product mapToEntity(FreshProductDto freshProductDto) {
        if (freshProductDto == null) throw new NullPointerException("FreshProductDto cannot be null");

        Product product = new Product();
        copyCommonFields(freshProductDto, product);
        product.setId(freshProductDto.getId());     //FIXME: id should me set ?

        return product;
    }

    public FreshProductDto mapProductToFresh(Product product) {
        if (product == null) throw new NullPointerException("Product cannot be null");

        FreshProductDto freshProductDto = new FreshProductDto();
        copyCommonFields(product, freshProductDto);
        freshProductDto.setId(product.getId());

        return freshProductDto;
    }

    private void copyCommonFields(ProductDto source, Product target) {
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
    }

    private void copyCommonFields(Product source, ProductDto target) {
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
    }

    private void copyCommonFields(FreshProductDto source, Product target) {
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
    }

    private void copyCommonFields(Product source, FreshProductDto target) {
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
    }
}
