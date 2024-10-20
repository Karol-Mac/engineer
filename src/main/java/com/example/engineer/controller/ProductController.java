package com.example.engineer.controller;

import com.example.engineer.payload.FreshProductDto;
import com.example.engineer.payload.ProductDto;
import com.example.engineer.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.net.URI;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<FreshProductDto> addProduct(@RequestPart("product") @Valid FreshProductDto product,
                                                      @RequestPart(value = "file")  MultipartFile imageFile,
                                                      Principal principal) throws IOException{

        var createdProduct = productService.addProduct(product, imageFile, principal.getName());
        return ResponseEntity.created(getLocation(createdProduct.getId())).body(createdProduct);
    }

    private URI getLocation(Object resourceId) {
        return ServletUriComponentsBuilder
                .fromCurrentRequestUri()
                .path("/{resourceId}")
                .buildAndExpand(resourceId)
                .toUri();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDto> getProduct(@PathVariable long id, Principal principal){
        return ResponseEntity.ok(productService.getProductById(id, principal.getName()));
    }

    @GetMapping
    public ResponseEntity<List<ProductDto>> getProductsByName(@RequestParam String name, Principal principal){
        return ResponseEntity.ok(productService.getAllProducts(name, principal.getName()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<FreshProductDto> updateProduct(@PathVariable long id,
                                                         @RequestBody @Valid FreshProductDto product,
                                                         Principal principal){
        return ResponseEntity.ok(productService.updateProduct(product, id, principal.getName()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable long id, Principal principal){
        return ResponseEntity.ok(productService.deleteProduct(id, principal.getName()));
    }
}
