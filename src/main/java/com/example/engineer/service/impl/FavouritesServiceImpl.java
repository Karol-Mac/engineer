package com.example.engineer.service.impl;

import com.example.engineer.entity.Product;
import com.example.engineer.entity.User;
import com.example.engineer.exceptions.NotFoundException;
import com.example.engineer.payload.ProductDto;
import com.example.engineer.repository.ProductRepository;
import com.example.engineer.repository.UserRepository;
import com.example.engineer.service.FavouritesService;
import com.example.engineer.util.mappers.ProductMapper;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FavouritesServiceImpl implements FavouritesService {


    private final UserRepository userRepository;
    private final ProductMapper productMapper;
    private final ProductRepository productRepository;

    @Override
    public List<ProductDto> getFavorites(String userEmail){
        var user = getUserFromDb(userEmail);

        return user.getFavouriteProducts()
                        .stream()
                        .map(productMapper::mapProductToDto)
                        .toList();
    }

    @Override
    public ProductDto updateFavorite(String userEmail, long productId) throws BadRequestException{
        var user = getUserFromDb(userEmail);
        var product = getProductFromDB(productId);

        if(user.getFavouriteProducts().contains(product))
            throw new BadRequestException("product is already favourite");

        user.getFavouriteProducts().add(product);

        userRepository.save(user);
        return productMapper.mapProductToDto(product);
    }

    @Override
    public String deleteFavorite(String userEmail, long productId) throws BadRequestException{
        var user = getUserFromDb(userEmail);
        var product = getProductFromDB(productId);

        if(!user.getFavouriteProducts().contains(product))
            throw new BadRequestException("product is not on favourite list");

        user.getFavouriteProducts().remove(product);
        userRepository.save(user);
        return "Product removed from favourites";
    }

    private User getUserFromDb(String email){
        return userRepository.findByEmail(email).orElseThrow(
                () -> new UsernameNotFoundException("User with email " + email + " not found")
        );
    }

    private Product getProductFromDB(long id){
        return productRepository.findById(id).orElseThrow(
                () -> new NotFoundException("Product", id)
        );
    }
}
