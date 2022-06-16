package com.spring.Ecommerce.models;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class UserRegisterDTO {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String isSeller;
}
