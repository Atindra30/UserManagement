package com.company.employeemanagement.payload;


import com.company.employeemanagement.enums.TokenTypeEnum;
import lombok.Data;

@Data
public class TokenResponse {

    private String accessToken;

    private String refreshToken;

    private int accessTokenExpiry;

    private TokenTypeEnum tokenType;

}
