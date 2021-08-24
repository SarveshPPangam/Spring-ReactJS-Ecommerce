package com.spring.Ecommerce.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Time;
import java.sql.Timestamp;
import java.util.Set;

@Entity
@Getter
@Table (name = "product_category")
@NoArgsConstructor
public class ProductCategory {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private int id;

    private String name;
    private String description;

    public ProductCategory(String name, String description, Timestamp createdAt) {
        this.name = name;
        this.description = description;
        this.createdAt = createdAt;
    }

    public ProductCategory(String name){
        this.name = name;
    }

    @JsonIgnore
    @OneToMany(mappedBy = "category",
            orphanRemoval = false,
            fetch = FetchType.EAGER)
    private Set<Product> products;


    public ProductCategory setDescription(String description) {
        this.description = description;
        return this;
    }

    private Timestamp createdAt;
    private Timestamp modifiedAt;


    public ProductCategory setName(String name) {
        this.name = name;
        return this;
    }


    public ProductCategory setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
        return this;
    }


    public ProductCategory setModifiedAt(Timestamp modifiedAt) {
        this.modifiedAt = modifiedAt;
        return this;
    }
}
