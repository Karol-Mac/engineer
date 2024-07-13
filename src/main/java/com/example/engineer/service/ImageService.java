package com.example.engineer.service;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ImageService {

    String saveImage(MultipartFile file) throws IOException;
    Resource getImage(String imageName) throws IOException;
}
