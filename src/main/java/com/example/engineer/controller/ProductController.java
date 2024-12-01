package com.example.engineer.controller;

import com.example.engineer.payload.FreshProductDto;
import com.example.engineer.payload.ProductDto;
import com.example.engineer.payload.ProductResponse;
import com.example.engineer.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.net.URI;
import java.security.Principal;

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

        return principal == null ?
                ResponseEntity.ok(productService.getProductById(id)) :
                ResponseEntity.ok(productService.getProductById(id, principal.getName()));
    }

    @GetMapping
    public ResponseEntity<ProductResponse> getProductsByName(@RequestParam String name,
                                                             @RequestParam(defaultValue = "0") int pageNo,
                                                             @RequestParam(defaultValue = "3") int pageSize,
                                                             @RequestParam(defaultValue = "price") String sortBy,
                                                             @RequestParam(defaultValue = "asc") String direction,
                                                             Principal principal){

        Pageable pageable = getPageable(pageNo, pageSize, sortBy, direction);

        return principal == null ?
                ResponseEntity.ok(productService.getAllProducts(name, pageable)) :
                ResponseEntity.ok(productService.getAllProducts(name, pageable, principal.getName()));
    }

    @GetMapping("/count")
    public ResponseEntity<Integer> getPageCount(@RequestParam String name,
                                                @RequestParam(defaultValue = "0") int pageNo,
                                                @RequestParam(defaultValue = "9999") int pageSize,
                                                @RequestParam(defaultValue = "price") String sortBy,
                                                @RequestParam(defaultValue = "asc") String direction,
                                                Principal principal){

        Pageable pageable = getPageable(pageNo, pageSize, sortBy, direction);

        return ResponseEntity.ok(productService.getProductPageCount(name, pageable));
    }

    @GetMapping("/seller")
    public ResponseEntity<ProductResponse> getSellerProducts(Principal principal,
                                                              @RequestParam(defaultValue = "0") int pageNo,
                                                              @RequestParam(defaultValue = "3") int pageSize,
                                                              @RequestParam(defaultValue = "price") String sortBy,
                                                              @RequestParam(defaultValue = "asc") String direction){

        Pageable pageable = getPageable(pageNo, pageSize, sortBy, direction);

        return ResponseEntity.ok(productService.getSellerProductDtos(principal.getName(), pageable));
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

    private static Pageable getPageable(int pageNo, int pageSize, String sortBy, String direction) {
        Sort sort = direction.equalsIgnoreCase(Sort.Direction.ASC.name()) ?
                Sort.by(sortBy).ascending() :
                Sort.by(sortBy).descending();
        return PageRequest.of(pageNo, pageSize, sort);
    }
}