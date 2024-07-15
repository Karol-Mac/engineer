package com.example.engineer.payload;

import com.fasterxml.jackson.annotation.JsonAlias;
import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RegisterSellerDto {

    private Long id;

    @Size(min = 1, max = 30, message = "shop name must be within the range of <1, 30>")
    @NotBlank
    private String shopName;

    @Size(min = 1, max = 100)
    @Email(message = "email must contain '@' and be within the range of <1, 100>")
    @NotBlank
    private String email;

    @NotBlank
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,20}$",
            message = "must have at least: 1 small letter, 1 uppercase letter, 1 number, " +
                    "1 special character & at stay in range between <8, 20> characters (total)")
    private String password;

    @Size(min = 10, max = 10, message = "Must be valid KRS number (exactly 10 numbers)")
    @NotBlank
    @JsonAlias("KRS")
    private String krsNumber;
}