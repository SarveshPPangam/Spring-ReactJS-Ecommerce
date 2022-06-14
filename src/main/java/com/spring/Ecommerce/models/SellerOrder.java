package com.spring.Ecommerce.models;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Collection;

@Entity
@Table (name = "seller_orders")
@Getter
@NoArgsConstructor
public class SellerOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;


    @ManyToOne
    @JoinColumn(name = "seller_id")
    private User sellerId;

    private long totalItems;

    private double totalPrice;
    private OrderStatus status;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id", referencedColumnName = "id")
    private Address address;
    private Timestamp placedAt;


    @OneToMany(mappedBy = "orderId",
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.EAGER)
    private Collection<OrderItem> orderItems;




    public SellerOrder setSellerId(User sellerId) {
        this.sellerId = sellerId;
        return this;
    }

    public SellerOrder setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
        return this;
    }

    public SellerOrder setStatus(OrderStatus status) {
        this.status = status;
        return this;
    }

    public SellerOrder setAddress(Address address) {
        this.address = address;
        return this;
    }

    public SellerOrder setPlacedAt(Timestamp placedAt) {
        this.placedAt = placedAt;
        return this;
    }

    public SellerOrder setOrderItems(Collection<OrderItem> orderItems) {
        this.orderItems = orderItems;
        return this;
    }

    public void setTotalItems(){
        long totalItems = this.getOrderItems().stream().mapToLong(OrderItem::getQuantity).sum();
        this.totalItems = totalItems;
    }
}

