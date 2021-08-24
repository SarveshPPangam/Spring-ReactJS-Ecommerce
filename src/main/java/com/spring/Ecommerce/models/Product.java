package com.spring.Ecommerce.models;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Set;

@Entity
@Getter
@Table(name = "product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;
    private float price;
    private String imageURL;
    private String description;

    @OneToMany(mappedBy = "product_id",
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.EAGER)
    private Set<ProductDetail> details;


    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "created_by", nullable = false)
    private User created_by;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private ProductCategory category;

    private long quantity;

    private Timestamp createdAt;
    private Timestamp modifiedAt;


    public Product setName(String name) {
        this.name = name;
        return this;
    }


    public Product setPrice(float price) {
        this.price = price;
        return this;
    }


    public Product setImageURL(String imageURL) {
        this.imageURL = imageURL;
        return this;
    }


    public Product setDescription(String description) {
        this.description = description;
        return this;
    }


    public Product setDetails(Set<ProductDetail> details) {
        details.forEach(detail -> {
            detail.setProduct_id(this);
            detail.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        });
        this.details = details;
        return this;
    }


    public Product setCreated_by(User created_by) {
        this.created_by = created_by;
        return this;
    }


    public Product setCategory(ProductCategory category) {
        this.category = category;
        return this;
    }


    public Product setQuantity(long quantity) {
        this.quantity = quantity;
        return this;
    }


    public Product setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
        return this;
    }


    public Product setModifiedAt(Timestamp modifiedAt) {
        this.modifiedAt = modifiedAt;
        return this;
    }

    public void addDetail(ProductDetail productDetail) {
        this.details.add(productDetail);
    }

    public void removeDetail(ProductDetail productDetail) {
        this.details.remove(productDetail);
    }

    public void reduceQuantityBy(long q){
        this.quantity -= q;
    }
}