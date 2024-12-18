package com.company.employeemanagement.security;

import com.company.employeemanagement.model.Users;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;

public class UserPrincipal implements UserDetails {

    private String id;
    private String email;
    private String password;
    private boolean emailVerified;
    private boolean active;
    private Collection<? extends GrantedAuthority> authorities;
    private Map<String, Object> attributes;

    public UserPrincipal(String id, String email, String password, Boolean emailVerified, Boolean active, Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.emailVerified = emailVerified;
        this.active = active;
        this.authorities = authorities;
    }

    public static UserPrincipal create(Users user) {
        List<GrantedAuthority> authorities = List.of(new SimpleGrantedAuthority(String.valueOf(user.getRole())));

        return new UserPrincipal(
                user.getId(),
                user.getEmail(),
                user.getPassword(),
                user.isEmailVerified(),
                user.isActive(),
                authorities
        );
    }

    public static UserPrincipal create(Users user, Map<String, Object> attributes) {
        UserPrincipal userPrincipal = UserPrincipal.create(user);
        userPrincipal.setAttributes(attributes);
        return userPrincipal;
    }


    public String getId() {

        return id;
    }

    public String getEmail() {

        return email;
    }

    @Override
    public String getPassword() {
        return password;
    }

    public boolean getEmailVerified() {
        return this.emailVerified;
    }

    public boolean getActive() {
        return this.active;
    }


    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    public Map<String, Object> getAttributes() {
        return attributes;
    }

    public void setAttributes(Map<String, Object> attributes) {
        this.attributes = attributes;
    }


    public String getName() {
        return String.valueOf(id);
    }


    @Override
    public boolean isAccountNonExpired() {
        return UserDetails.super.isAccountNonExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return UserDetails.super.isAccountNonLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return UserDetails.super.isCredentialsNonExpired();
    }

    @Override
    public boolean isEnabled() {
        return UserDetails.super.isEnabled();
    }


}
