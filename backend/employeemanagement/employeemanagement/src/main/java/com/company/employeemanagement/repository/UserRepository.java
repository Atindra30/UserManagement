package com.company.employeemanagement.repository;

import com.company.employeemanagement.enums.AuthProviderEnum;
import com.company.employeemanagement.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<Users, String> {
    Optional<Users> findByEmail(String email);

    Optional<Users> findByEmailAndProvider(String email, AuthProviderEnum authProvider);

    boolean existsByEmail(String email);
}
