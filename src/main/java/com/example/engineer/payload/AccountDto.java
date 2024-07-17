package com.example.engineer.payload;

import com.example.engineer.util.RoleName;
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

    private RoleName role;

    private int reportsCount = 0;
    private int commentsCount = 0;
    private int reportedComments = 0;
    private int addedProductsCount = 0;
    private int reportedProductsCount = 0;
}