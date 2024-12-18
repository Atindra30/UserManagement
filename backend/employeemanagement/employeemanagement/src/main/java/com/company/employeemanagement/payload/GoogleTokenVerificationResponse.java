package com.company.employeemanagement.payload;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class GoogleTokenVerificationResponse {
    private String sub;
    private String email;
    private String email_verified;
    private String name;
    private String picture;
    private String given_name;
    private String family_name;

}
