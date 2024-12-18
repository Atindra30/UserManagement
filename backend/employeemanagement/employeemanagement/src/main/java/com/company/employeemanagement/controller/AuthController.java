package com.company.employeemanagement.controller;

import com.company.employeemanagement.payload.AuthResponse;
import com.company.employeemanagement.payload.LoginRequestPayload;
import com.company.employeemanagement.payload.SignUpRequestPayload;
import com.company.employeemanagement.service.AuthService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/auth")
public class AuthController {


    @Autowired
    private AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequestPayload signUpRequest) {
        AuthResponse authResponse = authService.registerUser(signUpRequest);
        return ResponseEntity.ok(authResponse);
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequestPayload loginRequest) {
        AuthResponse authResponse = authService.authenticateUser(loginRequest);
        return ResponseEntity.ok(authResponse);
    }

    @PostMapping("/googleAuth")
    public ResponseEntity<?> googleAuth(@RequestBody LoginRequestPayload loginRequest) {
        AuthResponse authResponse = authService.authenticateUserWithGoogle(loginRequest);
        return ResponseEntity.ok(authResponse);
    }










}
