package com.company.employeemanagement.security;

import io.jsonwebtoken.*;
import jakarta.annotation.PostConstruct;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Base64;
import java.util.Date;
import java.util.UUID;
import java.util.function.Function;

@Service
@Slf4j
public class TokenProvider {

    @Value("${auth.token.secret}")
    private String tokenSecret;

    @Value("${auth.token.expiration}")
    private String tokenExpiration; //in milli sec.


    private SecretKey secretKey;


    @PostConstruct
    private void init() {
        byte[] keyBytes = Base64.getDecoder().decode(tokenSecret.getBytes(StandardCharsets.UTF_8));
        this.secretKey = new SecretKeySpec(keyBytes, "HmacSHA256");
    }


    public String generateAccessToken(Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        return createAccessToken(userPrincipal);
    }

    public String generateRefreshToken(Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        return createRefreshToken(userPrincipal);
    }

    public String createAccessToken(UserPrincipal userPrincipal) {

        return Jwts.builder()
                .setSubject(String.valueOf(userPrincipal.getId()))
                .setIssuedAt(Date.from(Instant.now()))
                .setExpiration(Date.from(Instant.now().plusMillis(Long.parseLong(tokenExpiration))))
                .signWith(secretKey)
                .compact();
    }

    public String createRefreshToken(UserPrincipal userPrincipal) {

        return Jwts.builder()
                .setSubject(String.valueOf(userPrincipal.getId()))
                .setIssuedAt(Date.from(Instant.now()))
                .setExpiration(Date.from(Instant.now().plusMillis(Long.parseLong(tokenExpiration))))
                .signWith(secretKey)
                .compact();
    }

    private <T> T extractClaims(String token, Function<Claims, T> claimsTFunction){
        return claimsTFunction.apply(Jwts.parser()
                .verifyWith(secretKey).build()
                .parseSignedClaims(token)
                .getPayload());
    }

    public String getUserIdFromToken(String token){
        String userId=extractClaims(token, Claims::getSubject);
        return userId;
    }

    public Date getAccessTokenExpirationTime(String token){
        Date expiryAt=extractClaims(token, Claims::getExpiration);
        return expiryAt;
    }

    public Date getAccessTokenIssuedTime(String token){
        Date issuedAt=extractClaims(token, Claims::getIssuedAt);
        return issuedAt;
    }



    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .setSigningKey(secretKey)
                    .build()
                    .parseSignedClaims(token);
            return true;
        } catch (JwtException | IllegalArgumentException ex) {
            log.error("Invalid JWT token: {}", ex.getMessage());
        }
        return false;
    }


}
