package com.spring.Ecommerce.repository;

import com.spring.Ecommerce.models.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@Repository
@RepositoryRestResource(exported = false)
public interface CartItemRepository extends JpaRepository<CartItem, Integer> {

}
