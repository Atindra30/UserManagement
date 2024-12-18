package com.company.employeemanagement.model;

import java.util.UUID;
import com.company.employeemanagement.enums.AuthProviderEnum;
import com.company.employeemanagement.enums.UserRoleEnum;
import jakarta.persistence.*;
import lombok.Data;



@Entity
@Data
public class Users {

    @PrePersist
    public void generateId() {
        this.id = UUID.randomUUID().toString();
    }
    
    @Id
    @Column(name = "id", updatable = false, nullable = false, length = 36) // Use length attribute
    private String id;

    private String name;

    private String email;

    private String password;

    @Enumerated(EnumType.STRING)
    private UserRoleEnum role;

    private String profileUrl;

    @Enumerated(EnumType.STRING)
    private AuthProviderEnum provider;

    private boolean emailVerified;

    private boolean active;

}