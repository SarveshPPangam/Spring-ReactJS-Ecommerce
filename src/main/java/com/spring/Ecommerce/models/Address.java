package com.spring.Ecommerce.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table
@Data
@NoArgsConstructor
public class Address {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private int id;

    private String receiverName;
    private String phoneNumber;
    private String addressLine;
    private int pinCode;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private Timestamp createdAt;
    private Timestamp modifiedAt;


    public Address(String receiverName, String phoneNumber, String address, int pinCode, Timestamp createdAt) {
        this.receiverName = receiverName;
        this.phoneNumber = phoneNumber;
        this.addressLine = address;
        this.pinCode = pinCode;
        this.createdAt = createdAt;
    }






}
