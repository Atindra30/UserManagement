package com.company.employeemanagement.payload;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class GoogleIdTokenResponsePayload {
    private String sub;
    private String email;
    @JsonProperty("email_verified")
    private String emailVerified;
    private String name;
    private String picture;
    @JsonProperty("givenName")
    private String givenName;
    @JsonProperty("family_name")
    private String familyName;
}
