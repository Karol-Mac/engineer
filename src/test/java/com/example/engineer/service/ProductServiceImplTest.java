package com.example.engineer.service;

import com.example.engineer.entity.Product;
import com.example.engineer.entity.Seller;
import com.example.engineer.payload.FreshProductDto;
import com.example.engineer.repository.ProductRepository;
import com.example.engineer.service.impl.ProductServiceImpl;
import com.example.engineer.util.ProductUtils;
import com.example.engineer.util.UserUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;

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
                1L,
                "Test Product",
                BigDecimal.valueOf(9.99),
                true,
                500,
                200,
                BigDecimal.valueOf(10),
                BigDecimal.valueOf(15),
                BigDecimal.valueOf(30),
                BigDecimal.valueOf(5),
                BigDecimal.valueOf(1),
                "testImage.jpg"
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

//    @Test
//    void getAllProducts_returnsMatchingProducts_whenSearchedByName() {
//        String searchPhrase = "Prod";
//        String email = "user@example.com";
//
//        Product product1 = new Product();
//        product1.setName("Product1");
//        Product product2 = new Product();
//        product2.setName("Product2");
//        Product product3 = new Product();
//        product3.setName("Product3");
//        Product product4 = new Product();
//        product4.setName("Test1");
//
//        ProductDto productDto1 = new ProductDto();
//        productDto1.setName("Product1");
//        ProductDto productDto2 = new ProductDto();
//        productDto2.setName("Product2");
//        ProductDto productDto3 = new ProductDto();
//        productDto3.setName("Product3");
//
//        when(productRepository.findByNameContaining(searchPhrase)).thenReturn(List.of(product1, product2, product3));
//        when(productUtils.mapProductToDto(product1, email)).thenReturn(productDto1);
//        when(productUtils.mapProductToDto(product2, email)).thenReturn(productDto2);
//        when(productUtils.mapProductToDto(product3, email)).thenReturn(productDto3);
//
//        List<ProductDto> result = productService.getAllProducts(searchPhrase, email);
//
//        List<String> expectedNames = List.of("Product1", "Product2", "Product3");
//        List<String> actualNames = result.stream().map(ProductDto::getName).toList();
//
//        System.out.println("Expected Names: " + expectedNames);
//        System.out.println("Actual Names: " + actualNames);
//
//        assertNotNull(result);
//        assertEquals(3, result.size());
//        assertTrue(actualNames.containsAll(expectedNames));
//    }




//    @Test
//    void getSellerProducts_returnsListOfFreshProductDto_whenSellerHasProducts() {
//        String email = "seller@example.com";
//        Product product = new Product();
//        FreshProductDto freshProductDto = new FreshProductDto();
//
//        when(productRepository.findBySellerEmail(anyString())).thenReturn(List.of(product));
//        when(productUtils.mapProductToFresh(any(Product.class))).thenReturn(freshProductDto);
//
//        List<FreshProductDto> result = productService.getSellerProducts(email);
//
//        assertNotNull(result);
//        assertEquals(1, result.size());
//        assertEquals(freshProductDto, result.get(0));
//    }
}
