package com.spring.Ecommerce.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.io.Serializable;

@Getter
@NoArgsConstructor
@ToString
public class UserRegisterDTO implements Serializable {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    @JsonProperty
    private boolean isSeller;
}
