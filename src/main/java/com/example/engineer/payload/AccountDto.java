package com.example.engineer.payload;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AccountDto {

    private long id;
    private String username;

    private String email;

    private Boolean isBlocked;

    private Boolean isDeleted;

    private String role;

    private long reportsCount = 0;
    private long commentsCount = 0;
    private long reportedCommentsCount = 0;
    private long reportedProductsCount = 0;
    private long addedProductsCount = 0;
}