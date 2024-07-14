package com.example.engineer.controller;

import com.example.engineer.payload.FreshProductDto;
import com.example.engineer.payload.ProductDto;
import com.example.engineer.service.ImageService;
import com.example.engineer.service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    private final ProductService productService;

    private final ImageService imageService;

    public ProductController(ProductService productService, ImageService imageService){
        this.productService = productService;
        this.imageService = imageService;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<FreshProductDto> addProduct(@RequestPart("product") FreshProductDto product,
                                                      @RequestPart("file") MultipartFile file)
                                                        throws IOException{

        String imageName = imageService.saveImage(file);
        product.setImageName(imageName);

        return new ResponseEntity<>(productService.addProduct(product), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDto> getProduct(@PathVariable long id){
        return ResponseEntity.ok(productService.getProductById(id));
    }

    //TODO: add rest of controller methods
    @GetMapping
    public ResponseEntity<List<ProductDto>> getProductsByName(@RequestParam String name){
        return ResponseEntity.ok(productService.getAllProducts(name));
    }
}
