package com.spring.Ecommerce.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Time;
import java.sql.Timestamp;

@Entity
@Getter
@Table (name = "product_details")
@NoArgsConstructor
public class ProductDetail {


    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String value;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name="product_id", nullable=false)
    private Product product_id;

    private Timestamp createdAt;
    private Timestamp modifiedAt;


    public ProductDetail(String name, String value, Product product_id, Timestamp createdAt) {
        this.name = name;
        this.value = value;
        this.product_id = product_id;
        this.createdAt = createdAt;
    }

    public ProductDetail setName(String name) {
        this.name = name;
        return this;
    }


    public ProductDetail setValue(String value) {
        this.value = value;
        return this;
    }


    public ProductDetail setProduct_id(Product product_id) {
        this.product_id = product_id;
        return this;
    }


    public ProductDetail setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
        return this;
    }


    public ProductDetail setModifiedAt(Timestamp modifiedAt) {
        this.modifiedAt = modifiedAt;
        return this;
    }
}
