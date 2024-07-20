package com.example.engineer.payload;

import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ChangeUserCredentialsDto {

    @Size(min = 1, max = 30, message = "username must be within the range of <1, 30>")
    private String username;

    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,20}$",
            message = "must have at least: 1 small letter, 1 uppercase letter, 1 number, " +
                    "1 special character & stay in range between <8, 20> characters (total)")
    private String password;
}
