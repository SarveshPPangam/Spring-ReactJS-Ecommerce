package com.spring.Ecommerce.services;

public enum UserRegisterResponse {
    OK("Registered successfully!"),
    EMAIL_ALREADY_EXISTS("This email already exists in our database!"),
    SOME_OTHER_ERROR("There was some error!");

    private String message;

    UserRegisterResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return this.message;
    }
}
