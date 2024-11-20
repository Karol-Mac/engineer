package com.example.engineer.controller;

import com.example.engineer.payload.ContactMessageDto;
import com.example.engineer.service.EmailService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
public class ContactController {

    private final EmailService emailService;

    @PostMapping
    public ResponseEntity<String> sendMessage(@Valid @RequestBody ContactMessageDto contactMessage) {
        String subject = "Contact Form Submission from " + contactMessage.getFirstName() + " " + contactMessage.getLastName();
        String body = "Message: " + contactMessage.getMessage() + "\nEmail: " + contactMessage.getEmail();

        emailService.sendEmail("tomaszmarek0707@gmail.com", subject, body);

        return new ResponseEntity<>("Message sent successfully", HttpStatus.OK);
    }
}
