package com.spring.Ecommerce.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Set;

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
    @JoinColumn(name = "address_id", referencedColumnName = "id")
    private Address address;

    private Timestamp placedAt;
    private Timestamp deliveredAt;
    private Timestamp cancelledAt;


    @OneToMany(mappedBy = "orderId",
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.EAGER)
    private Set<OrderItem> orderItems;


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

    public Order setAddress(Address address) {
        this.address = address;
        return this;
    }

    public Order setPlacedAt(Timestamp placedAt) {
        this.placedAt = placedAt;
        return this;
    }

    public Order setOrderItems(Set<OrderItem> orderItems) {
        this.orderItems = orderItems;
        return this;
    }

    public void setTotalItems(){
        long totalItems = this.getOrderItems().stream().mapToLong(OrderItem::getQuantity).sum();
        this.totalItems = totalItems;
    }

    public void cancelOrder(){
        this.status = OrderStatus.CANCELLED;
        this.cancelledAt = new Timestamp(System.currentTimeMillis());
    }

    public void setDelivered(){
        this.status = OrderStatus.DELIVERED;
        this.deliveredAt = new Timestamp(System.currentTimeMillis());
    }
}

