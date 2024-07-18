package com.example.engineer.util;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RoleBeans {

    public static final String USER = "USER";
    public static final String SELLER = "SELLER";
    public static final String ADMIN = "ADMIN";
    public static final String ANONYMOUS = "ANONYMOUS";

    public static String[] getAllRoles(){

        return new String[]{USER, SELLER, ADMIN, ANONYMOUS};
    }

    @Bean
    public String sellerRole() {
        return SELLER;
    }

    @Bean
    public String userRole() {
        return USER;
    }

    @Bean
    public String adminRole() {
        return ADMIN;
    }

    @Bean
    public String anonymousRole() {
        return ANONYMOUS;
    }
}
