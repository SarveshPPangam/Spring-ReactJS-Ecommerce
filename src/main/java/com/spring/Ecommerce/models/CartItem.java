package com.spring.Ecommerce.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Getter
@Table
public class CartItem {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private int id;



    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "cart_id", nullable = false)
    private Cart cartId;

    private long quantity;

    private Timestamp createdAt;
    private Timestamp modifiedAt;


    public CartItem setProduct(Product product) {
        this.product = product;
        return this;
    }


    public CartItem setCartId(Cart cartId) {
        this.cartId = cartId;
        return this;
    }




    public CartItem setQuantity(long quantity) {
        this.quantity = quantity;
        return this;
    }


    public CartItem setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
        return this;
    }


    public CartItem setModifiedAt(Timestamp modifiedAt) {
        this.modifiedAt = modifiedAt;
        return this;
    }

    public void addQuantity(long quantity){
        this.setQuantity(this.getQuantity() + quantity);
    }

    public void decrementQuantity(long quantity){
        this.setQuantity(this.getQuantity() - quantity);
    }
}
