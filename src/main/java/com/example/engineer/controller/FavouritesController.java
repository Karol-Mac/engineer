package com.example.engineer.controller;

import com.example.engineer.payload.ProductDto;
import com.example.engineer.service.FavouritesService;
import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users/favorites")
@PreAuthorize("hasRole(RoleName.USER)")
public class FavouritesController {

    private final FavouritesService favouritesService;

    public FavouritesController(FavouritesService favouritesService){
        this.favouritesService = favouritesService;
    }

    @GetMapping
    public ResponseEntity<List<ProductDto>> getFavorites() {

        return ResponseEntity.ok(favouritesService.getFavorites(getUserEmail()));
    }

    @PostMapping
    public ResponseEntity<ProductDto> addFavorite(@RequestParam long productId)
            throws BadRequestException{
        return new ResponseEntity<>(favouritesService.updateFavorite(getUserEmail(), productId),
                                    HttpStatus.CREATED);
    }

    @DeleteMapping
    public ResponseEntity<String> removeFavorite(@RequestParam long productId)
            throws BadRequestException{
        return ResponseEntity.ok(favouritesService.deleteFavorite(getUserEmail(), productId));
    }

    private String getUserEmail(){
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }
}
