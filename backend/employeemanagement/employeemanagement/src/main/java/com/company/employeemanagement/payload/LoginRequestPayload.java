package com.company.employeemanagement.payload;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginRequestPayload {


    @NotBlank
    @Email
    private String email;

    @NotBlank
    private String password;


    private String idToken;

//    @NotBlank
    private String firebaseToken;


}
