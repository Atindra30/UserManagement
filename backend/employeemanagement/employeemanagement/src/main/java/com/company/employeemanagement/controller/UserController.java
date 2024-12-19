package com.company.employeemanagement.controller;

import com.company.employeemanagement.model.Users;
import com.company.employeemanagement.payload.ApiResponse;
import com.company.employeemanagement.payload.AuthResponse;
import com.company.employeemanagement.payload.SignUpRequestPayload;
import com.company.employeemanagement.security.CurrentUser;
import com.company.employeemanagement.security.UserPrincipal;
import com.company.employeemanagement.service.AuthService;
import com.company.employeemanagement.service.UserService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthService authService;

    @GetMapping("/user/getProfile")
    public ResponseEntity<?> getUsersProfile(@CurrentUser UserPrincipal currentUser) {

        try {
            Users users = userService.userProfile(currentUser.getId());
            return ResponseEntity.ok(new ApiResponse<>(true, "User details ", users));
        } catch (Exception e) {
            return ResponseEntity.ok(new ApiResponse<>(false, e.getMessage()));

        }
    }

    @GetMapping("/admin/getProfile/{userId}")
    public ResponseEntity<?> getUsersById(@PathVariable String userId) {

        try {
            Users users = userService.userProfile(userId);
            return ResponseEntity.ok(new ApiResponse<>(true, "User details ", users));
        } catch (Exception e) {
            return ResponseEntity.ok(new ApiResponse<>(false, e.getMessage()));

        }
    }

    @PutMapping("/admin/update/{userId}")
    public ResponseEntity<?> updateUser(@RequestBody Users user, @PathVariable String userId) {

        try {
            userService.updateExistingUser(user, userId);
            return ResponseEntity.ok(new ApiResponse<>(true, "User updated successfully!!"));
        } catch (Exception e) {
            return ResponseEntity.ok(new ApiResponse<>(false, e.getMessage()));

        }
    }

    @GetMapping("/admin/allUsers")
    public ResponseEntity<?> getAllUsers() {

        try {
            List<Users> users = userService.allUsers();
            return ResponseEntity.ok(new ApiResponse<>(true, "All Users ", users));
        } catch (Exception e) {
            return ResponseEntity.ok(new ApiResponse<>(false, e.getMessage()));

        }
    }

    @PostMapping("/admin/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequestPayload signUpRequest) {
        AuthResponse authResponse = authService.registerUser(signUpRequest);
        return ResponseEntity.ok(authResponse);
    }

    @DeleteMapping("/admin/delete/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable String userId) {
        userService.removeUser(userId);
        return ResponseEntity.ok(new ApiResponse<>(true, "User deleted successfully"));
    }


}
