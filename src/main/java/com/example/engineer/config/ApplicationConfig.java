package com.example.engineer.config;

import com.example.engineer.repository.SellerRepository;
import com.example.engineer.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
public class ApplicationConfig {
    private final UserRepository userRepository;
    private final SellerRepository sellerRepository;

    @Bean
    public UserDetailsService userDetailsService() {
        return email -> {
            UserDetails user;
            // if the email belongs to a 'normal' user
            if(userRepository.existsByEmail(email)) {
                user = userRepository.findByEmail(email).get();
            } else {    //if no -> maybe it's seller, check it
                user = sellerRepository.findByEmail(email)
                        //if this is not a seller -> throw an exception
                        .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
            }
            return new User(user.getUsername(), user.getPassword(), user.getAuthorities());
        };
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration)
                                                            throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {

        var authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }
}
