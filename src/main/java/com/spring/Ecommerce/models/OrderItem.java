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
public class OrderItem {
    @Id
    @GeneratedValue
    private int id;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order orderId;

    private long quantity;
    private double totalPrice;

    private Timestamp createdAt;

    public OrderItem setProduct(Product product) {
        this.product = product;
        return this;
    }

    public OrderItem setOrderId(Order orderId) {
        this.orderId = orderId;
        return this;
    }

    public OrderItem setQuantity(long quantity) {
        this.quantity = quantity;
        return this;
    }

    public OrderItem setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
        return this;
    }

    public OrderItem setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
        return this;
    }


}
