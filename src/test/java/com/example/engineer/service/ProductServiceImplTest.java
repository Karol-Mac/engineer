package com.example.engineer.service;

import com.example.engineer.entity.Product;
import com.example.engineer.entity.Seller;
import com.example.engineer.payload.FreshProductDto;
import com.example.engineer.payload.ProductDto;
import com.example.engineer.payload.ProductResponse;
import com.example.engineer.repository.ProductRepository;
import com.example.engineer.service.impl.ProductServiceImpl;
import com.example.engineer.util.ProductUtils;
import com.example.engineer.util.UserUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

class ProductServiceImplTest {

    @Mock
    private ProductRepository productRepository;

    @Mock
    private ProductUtils productUtils;

    @Mock
    private ImageService imageService;

    @Mock
    private UserUtil userUtil;

    @InjectMocks
    private ProductServiceImpl productService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void addProduct_returnsFreshProductDto_whenProductIsAddedSuccessfully() throws IOException {
        FreshProductDto freshProductDto = new FreshProductDto(
                1L, "Test Product", BigDecimal.valueOf(9.99),
                true, 500, 200, BigDecimal.valueOf(10),
                BigDecimal.valueOf(15), BigDecimal.valueOf(30), BigDecimal.valueOf(5),
                BigDecimal.valueOf(1), "testImage.jpg"
        );
        MultipartFile imageFile = mock(MultipartFile.class);
        Seller seller = new Seller();
        seller.setEmail("seller@example.com");

        Product product = new Product();
        when(productUtils.mapToEntity(any(FreshProductDto.class))).thenReturn(product);
        when(userUtil.getSeller(anyString())).thenReturn(seller);
        when(imageService.saveImage(any(MultipartFile.class))).thenReturn("imageName.jpg");
        when(productRepository.save(any(Product.class))).thenReturn(product);
        when(productUtils.mapProductToFresh(any(Product.class))).thenReturn(freshProductDto);

        FreshProductDto result = productService.addProduct(freshProductDto, imageFile, "seller@example.com");

        assertNotNull(result);
        assertEquals("Test Product", result.getName());
        assertEquals(BigDecimal.valueOf(9.99), result.getPrice());
        assertEquals(500, result.getWeight());
        assertEquals(200, result.getEnergeticValue());
        assertEquals(BigDecimal.valueOf(10), result.getFat());
        assertEquals(BigDecimal.valueOf(15), result.getProtein());
        assertEquals(BigDecimal.valueOf(30), result.getCarbs());
        assertEquals(BigDecimal.valueOf(5), result.getFiber());
        assertEquals(BigDecimal.valueOf(1), result.getSalt());
        assertEquals(freshProductDto, result);
        verify(productRepository, times(1)).save(product);
    }



    @ParameterizedTest
    @CsvSource({
            "Test, 0, 2, user@example.com",
            "Sample, 1, 3, seller@example.com",
            "Example, 2, 1, admin@example.com",
            "Product, 0, 5, user@example.com",
            "Item, 1, 4, seller@example.com",
            "Goods, 2, 3, admin@example.com",
            "Merchandise, 0, 2, user@example.com",
            "Commodity, 1, 3, seller@example.com",
            "Article, 2, 1, admin@example.com",
            "Object, 0, 5, user@example.com",
            "Thing, 1, 4, seller@example.com",
            "Entity, 2, 3, admin@example.com",
            "Stuff, 0, 2, user@example.com",
            "Material, 1, 3, seller@example.com",
            "Asset, 2, 1, admin@example.com"
    })
    void getAllProducts_returnsProductResponse(String productName, int page, int size, String email) {
        Pageable pageable = PageRequest.of(page, size);
        Product product1 = new Product();
        product1.setName(productName + " Product 1");
        Product product2 = new Product();
        product2.setName(productName + " Product 2");
        ProductDto productDto1 = new ProductDto();
        productDto1.setName(productName + " Product 1");
        ProductDto productDto2 = new ProductDto();
        productDto2.setName(productName + " Product 2");

        Page<Product> productsPage = new PageImpl<>(List.of(product1, product2), pageable, 2);
        ProductResponse productResponse = ProductResponse.builder()
                .pageNumber(page)
                .totalPages(1)
                .pageSize(size)
                .isLast(true)
                .products(List.of(productDto1, productDto2))
                .build();

        when(productRepository.findByNameContaining(anyString(), any(Pageable.class))).thenReturn(productsPage);
        when(productUtils.getProductResponse(productsPage)).thenReturn(productResponse);
        when(productUtils.mapProductToDto(product1, email)).thenReturn(productDto1);
        when(productUtils.mapProductToDto(product2, email)).thenReturn(productDto2);

        ProductResponse result = productService.getAllProducts(productName, pageable, email);
        assertNotNull(result);
        assertEquals(1, result.getTotalPages());
        assertEquals(size, result.getPageSize());
        assertEquals(2, result.getProducts().size());
        assertEquals(productName + " Product 1", result.getProducts().get(0).getName());
        assertEquals(productName + " Product 2", result.getProducts().get(1).getName());
    }
}
