package com.example.engineer.service;

import com.example.engineer.payload.ProductDto;
import org.apache.coyote.BadRequestException;

import java.util.List;

public interface FavouritesService {

    List<ProductDto> getFavorites(String email);

    ProductDto updateFavorite(long productId, String email) throws BadRequestException;

    String deleteFavorite(long productId, String email) throws BadRequestException;
}
