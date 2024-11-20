package com.example.engineer.controller;

import com.example.engineer.payload.ProductDto;
import com.example.engineer.service.FavouritesService;
import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;

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
    public ResponseEntity<?> addFavorite(@RequestParam long productId, Principal principal) {
        try {
            ProductDto addedProduct = favouritesService.updateFavorite(productId, principal.getName());

            String notificationMessage = "Product '" + addedProduct.getName() + "' has been successfully added to favourites.";
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(Map.of("message", notificationMessage, "product", addedProduct));
        } catch (BadRequestException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping
    public ResponseEntity<?> removeFavorite(@RequestParam long productId, Principal principal) {
        try {
            String notificationMessage = favouritesService.deleteFavorite(productId, principal.getName());

            return ResponseEntity.ok(Map.of("message", notificationMessage));
        } catch (BadRequestException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", e.getMessage()));
        }
    }
}
