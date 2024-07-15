package com.example.engineer.payload;

import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RegisterUserDto {

    @Size(min = 1, max = 30, message = "username must be within the range of <1, 30>")
    @NotBlank
    private String username;

    @Size(min = 1, max = 100)
    @Email(message = "email must contain '@' and be within the range of <1, 100>")
    @NotBlank
    private String email;

    @NotBlank
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,20}$",
            message = "must have at least: 1 small letter, 1 uppercase letter, 1 number, " +
                    "1 special character & at stay in range between <8, 20> characters (total)")
    private String password;
}
