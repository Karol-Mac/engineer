package com.example.engineer.util;

import com.example.engineer.entity.Seller;
import com.example.engineer.entity.User;
import com.example.engineer.repository.SellerRepository;
import com.example.engineer.repository.UserRepository;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class UserUtil {

    private final UserRepository userRepository;
    private final SellerRepository sellerRepository;

    public UserUtil(UserRepository userRepository, SellerRepository sellerRepository) {
        this.userRepository = userRepository;
        this.sellerRepository = sellerRepository;
    }

    public User getUser(
String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
    }

    public Seller getSeller(String email) {
        return sellerRepository.findByEmail(email).orElseThrow(
                () -> new AccessDeniedException("You have no permission to access this resource"));
    }

    public User getUserOrNull(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }
}