package com.spring.Ecommerce.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Set;

@Entity
@Table
@Getter
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "cartId",

            cascade = CascadeType.ALL,

            orphanRemoval = true,

            fetch = FetchType.EAGER)

    private Set<CartItem> items;

    private Timestamp createdAt;
    private Timestamp modifiedAt;


    public Cart setUser(User user) {
        this.user = user;
        return this;
    }


    public Cart setItems(Set<CartItem> items) {
        this.items = items;
        return this;
    }


    public Cart setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
        return this;
    }


    public Cart setModifiedAt(Timestamp modifiedAt) {
        this.modifiedAt = modifiedAt;
        return this;
    }

    public void addItem(Product product) {
        if(product==null) return;;
        boolean itemAlreadyInCart = false;
        for(CartItem cartItem1: this.items){
            if(cartItem1.getProduct().getId() == product.getId()){
                cartItem1.addQuantity(1);
                itemAlreadyInCart = true;
            }
        }
        if(!itemAlreadyInCart) {
            CartItem cartItem = new CartItem();
            cartItem.setCartId(this).setQuantity(1).setProduct(product).setCreatedAt(new Timestamp(System.currentTimeMillis()));
            this.items.add(cartItem);
        }
        this.setModifiedAt(new Timestamp(System.currentTimeMillis()));
    }

    public void removeItem(int  cartItemid) {
        CartItem toRemove = this.items.stream().filter(cartItem1 -> cartItem1.getId() == cartItemid)
                .findFirst().get();
        this.items.remove(toRemove);

    }

    public void addQuantity(int cartItemID, long quantity) {
        this.items.stream().filter(cartItem1 -> cartItem1.getId() == cartItemID)
                .findFirst().ifPresent(item -> {
                    item.addQuantity(quantity);
                    item.setModifiedAt(new Timestamp(System.currentTimeMillis()));
        });
    }

    public void decrementQuantity(int cartItemID, long quantity) {
        CartItem cartItem = this.items.stream().filter(cartItem1 -> cartItem1.getId() == cartItemID)
                .findFirst().get();
        if(cartItem.getQuantity() <= quantity)
            this.items.remove(cartItem);
        else {
            cartItem.decrementQuantity(quantity);
            cartItem.setModifiedAt(new Timestamp(System.currentTimeMillis()));
        }

    }

    public void clear() {
        this.items.clear();
    }
}
