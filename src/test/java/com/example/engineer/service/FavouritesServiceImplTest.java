package com.example.engineer.service;

import com.example.engineer.entity.Product;
import com.example.engineer.entity.User;
import com.example.engineer.payload.ProductDto;
import com.example.engineer.repository.UserRepository;
import com.example.engineer.service.impl.FavouritesServiceImpl;
import com.example.engineer.util.ProductUtils;
import com.example.engineer.util.UserUtil;
import org.apache.coyote.BadRequestException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class FavouritesServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private ProductUtils productUtils;

    @Mock
    private UserUtil userUtil;

    @InjectMocks
    private FavouritesServiceImpl favouritesService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getFavorites_returnsFavoriteProducts() {
        String email = "user@example.com";
        User user = new User();
        Product product = new Product();
        ProductDto productDto = new ProductDto();
        user.setFavouriteProducts(List.of(product));

        when(userUtil.getUser(email)).thenReturn(user);
        when(productUtils.mapProductToDto(product, email)).thenReturn(productDto);

        List<ProductDto> result = favouritesService.getFavorites(email);

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(productDto, result.get(0));
    }

    @ParameterizedTest
    @CsvSource({
            "1, user@example.com",
            "2, user@example.com",
            "3, user@example.com",
            "4, user@example.com",
            "5, user@example.com",
            "6, user@example.com",
            "7, user@example.com",
            "8, user@example.com",
            "9, user@example.com",
            "10, user@example.com",
            "11, user@example.com",
            "12, user@example.com",
            "13, user@example.com",
            "14, user@example.com",
            "15, user@example.com"
    })
    void updateFavorite_addsProductToFavorites(long productId, String email) throws BadRequestException {
        User user = new User();
        Product product = new Product();
        ProductDto productDto = new ProductDto();
        user.setFavouriteProducts(new ArrayList<>());

        when(userUtil.getUser(email)).thenReturn(user);
        when(productUtils.getProductFromDB(productId)).thenReturn(product);
        when(productUtils.mapProductToDto(product, email)).thenReturn(productDto);

        ProductDto result = favouritesService.updateFavorite(productId, email);

        assertNotNull(result);
        assertEquals(productDto, result);
        assertTrue(user.getFavouriteProducts().contains(product));
        verify(userRepository, times(1)).save(user);
    }

    @Test
    void updateFavorite_throwsBadRequestException_whenProductAlreadyFavorite() {
        long productId = 1L;
        String email = "user@example.com";
        User user = new User();
        Product product = new Product();
        user.setFavouriteProducts(List.of(product));

        when(userUtil.getUser(email)).thenReturn(user);
        when(productUtils.getProductFromDB(productId)).thenReturn(product);

        BadRequestException exception = assertThrows(BadRequestException.class, () -> favouritesService.updateFavorite(productId, email));

        assertEquals("product is already favourite", exception.getMessage());
    }

    @Test
    void deleteFavorite_removesProductFromFavorites() throws BadRequestException {
        long productId = 1L;
        String email = "user@example.com";
        User user = new User();
        Product product = new Product();
        product.setName("Test Product");
        user.setFavouriteProducts(new ArrayList<>(List.of(product)));

        when(userUtil.getUser(email)).thenReturn(user);
        when(productUtils.getProductFromDB(productId)).thenReturn(product);

        String result = favouritesService.deleteFavorite(productId, email);

        assertEquals("Product 'Test Product' has been removed from your favourites.", result);
        assertFalse(user.getFavouriteProducts().contains(product));
        verify(userRepository, times(1)).save(user);
    }

    @Test
    void deleteFavorite_throwsBadRequestException_whenProductNotInFavorites() {
        long productId = 1L;
        String email = "user@example.com";
        User user = new User();
        Product product = new Product();
        user.setFavouriteProducts(List.of());

        when(userUtil.getUser(email)).thenReturn(user);
        when(productUtils.getProductFromDB(productId)).thenReturn(product);

        BadRequestException exception = assertThrows(BadRequestException.class, () -> favouritesService.deleteFavorite(productId, email));

        assertEquals("Product is not on the favourite list", exception.getMessage());
    }
}