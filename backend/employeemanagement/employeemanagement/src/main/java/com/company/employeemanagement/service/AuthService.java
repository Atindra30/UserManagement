package com.company.employeemanagement.service;

import com.company.employeemanagement.enums.AuthProviderEnum;
import com.company.employeemanagement.enums.TokenTypeEnum;
import com.company.employeemanagement.enums.UserRoleEnum;
import com.company.employeemanagement.model.Users;
import com.company.employeemanagement.payload.*;
import com.company.employeemanagement.repository.UserRepository;
import com.company.employeemanagement.security.TokenProvider;
import com.company.employeemanagement.security.UserPrincipal;
import io.micrometer.common.util.StringUtils;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;


@Service
@Slf4j
public class AuthService {

    @Autowired
    private TokenProvider tokenProvider;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    RestTemplate restTemplate = new RestTemplate();

    public AuthResponse authenticateUser(LoginRequestPayload loginRequest) {
        log.info("Login request for email: {}", loginRequest.getEmail());

        try {
            // Authenticate the user
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
            );
            UserPrincipal user = (UserPrincipal) authentication.getPrincipal();
            log.info("Authenticated user: {}", user.getUsername());

            // Check email verification
            if (!user.getEmailVerified()) {
                return new AuthResponse(null, null, null, null,
                        "Please verify your email address by clicking on the link we sent you!", false);
            }

            // Check account activation
            if (!user.getActive()) {
                return new AuthResponse(null, null, null, null,
                        "Your account has not been activated yet. Please check back later.", false);
            }

            // Set authentication context
            SecurityContextHolder.getContext().setAuthentication(authentication);

            // Generate tokens
            String accessToken = tokenProvider.generateAccessToken(authentication);
            String refreshToken = tokenProvider.generateRefreshToken(authentication);
            long accessTokenExpiry = tokenProvider.getAccessTokenExpirationTime(accessToken).getTime()
                    - tokenProvider.getAccessTokenIssuedTime(accessToken).getTime();

            // Successful authentication response
            return new AuthResponse(accessToken, accessTokenExpiry, refreshToken,
                    TokenTypeEnum.Bearer, "Access token generated successfully!", true);

        } catch (AuthenticationException e) {
            log.error("Authentication failed for email: {}, error: {}", loginRequest.getEmail(), e.getMessage());
            return new AuthResponse(null, null, null, null,
                    "Invalid email or password. Please try again.", false);
        } catch (Exception e) {
            log.error("Unexpected error during authentication for email: {}, error: {}", loginRequest.getEmail(), e.getMessage());
            return new AuthResponse(null, null, null, null,
                    "An unexpected error occurred. Please contact support.", false);
        }
    }


    @Transactional
    public AuthResponse registerUser(@Valid @RequestBody SignUpRequestPayload signUpRequest) {

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return new AuthResponse(null, null, null, null,
                    "User registration failed ! Email already in use.", false);
        }

        // Creating user's account
        Users user = registerNewUser(signUpRequest.getName(), signUpRequest.getEmail(), passwordEncoder.encode(signUpRequest.getPassword()), null, true, AuthProviderEnum.LOCAL);

        //authenticateUser
        LoginRequestPayload loginRequest = new LoginRequestPayload();
        loginRequest.setEmail(signUpRequest.getEmail());
        loginRequest.setPassword(signUpRequest.getPassword());

        AuthResponse authResponse = authenticateUser(loginRequest);

        return authResponse;
    }

//    public AuthResponse authenticateUserWithGoogle(LoginRequestPayload loginRequest) {
//
//        if(loginRequest==null || StringUtils.isBlank(loginRequest.getIdToken())) {
//            return new AuthResponse(null, null, null, null,
//                    "Unauthorized, Please login or sign in.", false);
//        }
//
//        String googleAuthUrl = "https://oauth2.googleapis.com/tokeninfo?id_token=" + loginRequest.getIdToken();
//
//        ResponseEntity<GoogleIdTokenResponsePayload> googleIdTokenResponse = restTemplate.getForEntity(googleAuthUrl, GoogleIdTokenResponsePayload.class);
//
//        if(!googleIdTokenResponse.hasBody()) {
//            return new AuthResponse(null, null, null, null,
//                    "Please login using  your google sign in for access", false);
//        }
//
//        GoogleIdTokenResponsePayload res = googleIdTokenResponse.getBody();
//
//        if(res.getEmailVerified() == null || !res.getEmailVerified().equalsIgnoreCase("true")) {
//            return new AuthResponse(null, null, null, null,
//                    "Your google email is not verified, please verify before proceeding", false);
//        }
//
//        Optional<Users> userOptional = userRepository.findByEmailAndProvider(res.getEmail(), AuthProviderEnum.GOOGLE);
//        Users user = null;
//
//        if(!userOptional.isPresent()) {
//            Users local = userRepository.findByEmailAndProvider(res.getEmail(), AuthProviderEnum.LOCAL).orElse(null);
//            if(local != null) {
//                return new AuthResponse(null, null, null, null,
//                        "You have created account using email and password, you cant use google as login method.", false);
//            }
//            user = registerNewUser(res);
//
//        } else {
//            user = userOptional.get();
//            updateExistingUser(user, res);
//        }
//
//        UserPrincipal principal = UserPrincipal.create(user);
//        String accessToken = tokenProvider.createAccessToken(principal);
//        String refreshToken = tokenProvider.createRefreshToken(principal);
//        long accessTokenExpiry = tokenProvider.getAccessTokenExpirationTime(accessToken).getTime()
//                - tokenProvider.getAccessTokenIssuedTime(accessToken).getTime();
//        return new AuthResponse(accessToken, accessTokenExpiry, refreshToken,
//                TokenTypeEnum.Bearer, "Access token generated successfully!", true);
//    }


    public AuthResponse authenticateUserWithGoogle(LoginRequestPayload loginRequest) {

        if (loginRequest == null || StringUtils.isBlank(loginRequest.getIdToken())) {
            return new AuthResponse(null, null, null, null,
                    "Unauthorized, Please login or sign in.", false);
        }

        String googleAuthUrl = "https://people.googleapis.com/v1/people/me?personFields=names,photos,emailAddresses";

        // Create headers to include the token for authentication
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(loginRequest.getIdToken());
        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<GoogleAccessTokenResponsePayload> googlePeopleResponse;
        try {
            googlePeopleResponse = restTemplate.exchange(
                    googleAuthUrl,
                    HttpMethod.GET,
                    entity,
                    GoogleAccessTokenResponsePayload.class
            );
        } catch (Exception e) {
            return new AuthResponse(null, null, null, null,
                    "Failed to fetch user details from Google. Please try again.", false);
        }

        if (!googlePeopleResponse.hasBody()) {
            return new AuthResponse(null, null, null, null,
                    "Unable to fetch user data. Please login again.", false);
        }

        GoogleAccessTokenResponsePayload res = googlePeopleResponse.getBody();

        // Extract required fields
        String email = res.getEmailAddresses().stream()
                .filter(emailAddress -> emailAddress.getMetadata().isPrimary())
                .map(GoogleAccessTokenResponsePayload.EmailAddress::getValue)
                .findFirst()
                .orElse(null);

        boolean emailVerified = res.getEmailAddresses().stream()
                .filter(emailAddress -> emailAddress.getMetadata().isPrimary())
                .map(emailAddress -> emailAddress.getMetadata().isVerified())
                .findFirst()
                .orElse(false);

//        String firstName = res.getNames().stream()
//                .filter(name -> name.getMetadata().isPrimary())
//                .map(GoogleAccessTokenResponsePayload.Name::getGivenName)
//                .findFirst()
//                .orElse(null);
//
//        String lastName = res.getNames().stream()
//                .filter(name -> name.getMetadata().isPrimary())
//                .map(GoogleAccessTokenResponsePayload.Name::getFamilyName)
//                .findFirst()
//                .orElse(null);

        String displayName = res.getNames().stream()
                .filter(name -> name.getMetadata().isPrimary())
                .map(GoogleAccessTokenResponsePayload.Name::getDisplayName)
                .findFirst()
                .orElse(null);

        String photoUrl = res.getPhotos().stream()
                .filter(photo -> photo.getMetadata().isPrimary())
                .map(GoogleAccessTokenResponsePayload.Photo::getUrl)
                .findFirst()
                .orElse(null);

        if (!emailVerified) {
            return new AuthResponse(null, null, null, null,
                    "Your Google email is not verified. Please verify before proceeding.", false);
        }

        Optional<Users> userOptional = userRepository.findByEmailAndProvider(email, AuthProviderEnum.GOOGLE);
        Users user;

        if (!userOptional.isPresent()) {
            Users local = userRepository.findByEmailAndProvider(email, AuthProviderEnum.LOCAL).orElse(null);
            if (local != null) {
                return new AuthResponse(null, null, null, null,
                        "You have created an account using email and password. You can't use Google as a login method.", false);
            }
            user = registerNewUser(displayName, email, null, photoUrl, emailVerified, AuthProviderEnum.GOOGLE);
        } else {
            user = userOptional.get();
            updateExistingUser(user, displayName, photoUrl);
        }

        UserPrincipal principal = UserPrincipal.create(user);
        String accessToken = tokenProvider.createAccessToken(principal);
        String refreshToken = tokenProvider.createRefreshToken(principal);
        long accessTokenExpiry = tokenProvider.getAccessTokenExpirationTime(accessToken).getTime()
                - tokenProvider.getAccessTokenIssuedTime(accessToken).getTime();

        return new AuthResponse(accessToken, accessTokenExpiry, refreshToken,
                TokenTypeEnum.Bearer, "Access token generated successfully!", true);
    }





    private Users registerNewUser(String name, String email, String password, String photoUrl, boolean emailVerified, AuthProviderEnum authProviderEnum) {
        Users user = new Users();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(password);
        user.setRole(UserRoleEnum.ADMIN);
        user.setProfileUrl(photoUrl);
        user.setProvider(authProviderEnum);
        user.setEmailVerified(emailVerified);
        user.setActive(true);
        userRepository.save(user);
        return user;

    }

    private Users updateExistingUser(Users existingUser, String name, String photoUrl) {
        existingUser.setName(name);
        existingUser.setProfileUrl(photoUrl);
        return userRepository.save(existingUser);
    }

}
