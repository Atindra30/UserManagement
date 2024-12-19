package com.company.employeemanagement.payload;

import com.company.employeemanagement.enums.UserRoleEnum;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SignUpRequestPayload {

    @NotBlank
    private String name;

    @NotBlank
    @Email
    private String email;

    @NotBlank
    private String password;

//    @NotBlank
    private String token;

    private UserRoleEnum role;

}
