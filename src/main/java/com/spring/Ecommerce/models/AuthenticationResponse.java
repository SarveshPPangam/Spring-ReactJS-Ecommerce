package com.spring.Ecommerce.models;

import java.io.Serializable;

public class AuthenticationResponse implements Serializable {

    private final String accessToken;

    public AuthenticationResponse(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getAccessToken() {
        return accessToken;
    }

}