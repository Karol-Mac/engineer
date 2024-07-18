package com.example.engineer.controller;

import com.example.engineer.payload.FreshProductDto;
import com.example.engineer.payload.ProductDto;
import com.example.engineer.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PreAuthorize("hasRole(@sellerRole)")
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<FreshProductDto> addProduct(@RequestPart("product") @Valid FreshProductDto product,
                                                      @RequestPart(value = "file")  MultipartFile imageFile)
                                                        throws IOException{

        return new ResponseEntity<>(productService.addProduct(product, imageFile), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDto> getProduct(@PathVariable long id){
        return ResponseEntity.ok(productService.getProductById(id));
    }

    @GetMapping
    public ResponseEntity<List<ProductDto>> getProductsByName(@RequestParam String name){
        return ResponseEntity.ok(productService.getAllProducts(name));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole(@sellerRole)")
    public ResponseEntity<FreshProductDto> updateProduct(@PathVariable long id,
                                                         @RequestBody @Valid FreshProductDto product){
        return ResponseEntity.ok(productService.updateProduct(product, id));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole(@sellerRole, @adminRole)")
    public ResponseEntity<String> deleteProduct(@PathVariable long id){
        return ResponseEntity.ok(productService.deleteProduct(id));
    }
}
