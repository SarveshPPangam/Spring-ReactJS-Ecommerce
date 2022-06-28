package com.spring.Ecommerce.repository;

import com.spring.Ecommerce.models.Order;
import com.spring.Ecommerce.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
@RepositoryRestResource(exported = false)
public interface OrderRepository extends JpaRepository<Order, Integer> {

    @Query("SELECT o FROM Order o WHERE o.customerId = :customerId")
    public Set<Order> getOrdersByCustomerId(@Param("customerId") User customerId);
}
