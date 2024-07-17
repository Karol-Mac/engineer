package com.example.engineer.service;

import com.example.engineer.payload.ProductDto;
import org.apache.coyote.BadRequestException;

import java.util.List;

public interface FavouritesService {

    List<ProductDto> getFavorites(String userEmail);

    ProductDto updateFavorite(String userEmail, long productId) throws BadRequestException;

    String deleteFavorite(String userEmail, long productId) throws BadRequestException;
}
