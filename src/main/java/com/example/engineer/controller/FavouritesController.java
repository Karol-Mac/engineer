package com.example.engineer.controller;

import com.example.engineer.payload.ProductDto;
import com.example.engineer.service.FavouritesService;
import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/users/favorites")
public class FavouritesController {

    private final FavouritesService favouritesService;

    public FavouritesController(FavouritesService favouritesService){
        this.favouritesService = favouritesService;
    }

    @GetMapping
    public ResponseEntity<List<ProductDto>> getFavorites(Principal principal) {

        return ResponseEntity.ok(favouritesService.getFavorites(principal.getName()));
    }

    @PostMapping
    public ResponseEntity<ProductDto> addFavorite(@RequestParam long productId, Principal principal)
            throws BadRequestException{
        return new ResponseEntity<>(favouritesService.updateFavorite(productId, principal.getName()),
                                    HttpStatus.CREATED);
    }

    @DeleteMapping
    public ResponseEntity<String> removeFavorite(@RequestParam long productId, Principal principal)
            throws BadRequestException{
        return ResponseEntity.ok(favouritesService.deleteFavorite(productId, principal.getName()));
    }
}
