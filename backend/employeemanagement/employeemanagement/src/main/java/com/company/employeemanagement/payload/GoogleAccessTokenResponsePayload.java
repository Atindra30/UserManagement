package com.company.employeemanagement.payload;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class GoogleAccessTokenResponsePayload {

    private List<Name> names;
    private List<Photo> photos;
    private List<EmailAddress> emailAddresses;


    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Name {
        private Metadata metadata;
        private String displayName;
        private String familyName;
        private String givenName;

        // Getters and setters
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Photo {
        private Metadata metadata;
        private String url;

        // Getters and setters
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class EmailAddress {
        private Metadata metadata;
        private String value;

        // Getters and setters
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Metadata {
        private boolean primary;
        private boolean verified; // For emailAddresses only

        // Getters and setters
    }

}
