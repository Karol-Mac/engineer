package com.example.engineer.service.impl;

import com.example.engineer.payload.ProductDto;
import com.example.engineer.repository.UserRepository;
import com.example.engineer.service.FavouritesService;
import com.example.engineer.util.UserUtil;
import com.example.engineer.util.ProductUtils;
import org.apache.coyote.BadRequestException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@PreAuthorize("hasRole(@userRole)")
public class FavouritesServiceImpl implements FavouritesService {


    private final UserRepository userRepository;
    private final ProductUtils productUtils;
    private final UserUtil userUtil;

    public FavouritesServiceImpl(UserRepository userRepository, ProductUtils productUtils, UserUtil userUtil) {
        this.userRepository = userRepository;
        this.productUtils = productUtils;
        this.userUtil = userUtil;
    }

    @Override
    public List<ProductDto> getFavorites(String email){
        var user = userUtil.getUser(email);

        return user.getFavouriteProducts()
                        .stream()
                        .map(p -> productUtils.mapProductToDto(p, email))
                        .toList();
    }

    @Override
    public ProductDto updateFavorite(long productId, String email) throws BadRequestException{
        var user = userUtil.getUser(email);
        var product = productUtils.getProductFromDB(productId);

        if(user.getFavouriteProducts().contains(product))
            throw new BadRequestException("product is already favourite");

        user.getFavouriteProducts().add(product);

        userRepository.save(user);
        return productUtils.mapProductToDto(product, email);
    }

    @Override
    public String deleteFavorite(long productId, String email) throws BadRequestException{
        var user = userUtil.getUser(email);
        var product = productUtils.getProductFromDB(productId);

        if(!user.getFavouriteProducts().contains(product))
            throw new BadRequestException("product is not on favourite list");

        user.getFavouriteProducts().remove(product);
        userRepository.save(user);
        return "Product removed from favourites";
    }
}
