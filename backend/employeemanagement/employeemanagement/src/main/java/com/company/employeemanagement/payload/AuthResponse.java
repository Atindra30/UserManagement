package com.company.employeemanagement.payload;

import com.company.employeemanagement.enums.TokenTypeEnum;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {
    private String accessToken;
    private Long accessTokenExpiry;
    private String refreshToken;
    private TokenTypeEnum tokenType;
    private String message;
    private boolean success;

}
