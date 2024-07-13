package com.example.engineer.service.impl;

import com.example.engineer.service.ImageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class ImageServiceImpl implements ImageService {

    @Value("${image.upload.dir}")
    private String imageDirectory;

    @Override
    public String saveImage(MultipartFile file) throws IOException {
        String imageName = UUID.randomUUID()+ "_" + file.getOriginalFilename();
        Path directoryPath = Paths.get(imageDirectory);

        if (!Files.exists(directoryPath)) Files.createDirectories(directoryPath);

        Path filePath = directoryPath.resolve(imageName);
        Files.write(filePath, file.getBytes());

        return imageName;
    }

    @Override
    public Resource getImage(String imageName) throws IOException {
        Path filePath = Paths.get(imageDirectory).resolve(imageName);
        if (Files.exists(filePath)) {
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new IOException("Could not read the file: " + imageName);
            }
        } else {
            throw new IOException("File not found: " + imageName);
        }
    }
}
