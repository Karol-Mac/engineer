package com.example.engineer.util;

import lombok.Getter;

import java.util.Arrays;

/**
 * Enum created at needed of spring security config
 * It contains names of Every Possible role in application
 * (including non-logged-in users) a.k.a. Anonymous
 */
@Getter
public enum RoleName {
    USER("USER"),
    SELLER("SELLER"),
    ANONYMOUS("ANONYMOUS"),
    ADMIN("ADMIN");

    private final String roleName;

    RoleName(String roleName){
        this.roleName = roleName;
    }

    public static String[] allRoles(){
        RoleName[] roles = RoleName.values();
        return Arrays.stream(roles).map(RoleName::getRoleName).toArray(String[]::new);
    }
}
