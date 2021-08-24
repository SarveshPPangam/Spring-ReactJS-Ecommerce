package com.spring.Ecommerce.repository;

import com.spring.Ecommerce.models.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Integer> {
    public Optional<ProductCategory> findByName(String name);
}
