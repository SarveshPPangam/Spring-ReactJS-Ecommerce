package com.spring.Ecommerce.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Collection;

@Entity
@Table (name = "orders")
@Getter
@NoArgsConstructor
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "customer_id")
    private User customerId;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "seller_id")
    private User sellerId;

    private long totalItems;

    public Order setSellerId(User sellerId) {
        this.sellerId = sellerId;
        return this;
    }

    private double totalPrice;

    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "contact_id", referencedColumnName = "id")
    private Contact contact;

    private Timestamp placedAt;


    @OneToMany(mappedBy = "orderId",
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.EAGER)
    private Collection<OrderItem> orderItems;


    public Order setCustomerId(User customerId) {
        this.customerId = customerId;
        return this;
    }


    public Order setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
        return this;
    }

    public Order setStatus(OrderStatus status) {
        this.status = status;
        return this;
    }

    public Order setContact(Contact contact) {
        this.contact = contact;
        return this;
    }

    public Order setPlacedAt(Timestamp placedAt) {
        this.placedAt = placedAt;
        return this;
    }

    public Order setOrderItems(Collection<OrderItem> orderItems) {
        this.orderItems = orderItems;
        return this;
    }

    public void setTotalItems(){
        long totalItems = this.getOrderItems().stream().mapToLong(OrderItem::getQuantity).sum();
        this.totalItems = totalItems;
    }

    public void cancelOrder(){
        this.status = OrderStatus.CANCELLED;
    }

    public void setDelivered(){
        this.status = OrderStatus.DELIVERED;
    }
}

