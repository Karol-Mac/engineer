package com.example.engineer.service;

import com.example.engineer.payload.ProductDto;
import org.apache.coyote.BadRequestException;

import java.util.List;

public interface FavouritesService {

    List<ProductDto> getFavorites();

    ProductDto updateFavorite(long productId) throws BadRequestException;

    String deleteFavorite(long productId) throws BadRequestException;
}
