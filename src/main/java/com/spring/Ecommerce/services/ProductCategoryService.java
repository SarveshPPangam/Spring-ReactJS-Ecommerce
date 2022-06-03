package com.spring.Ecommerce.services;


import com.spring.Ecommerce.models.Cart;
import com.spring.Ecommerce.models.Product;
import com.spring.Ecommerce.models.ProductCategory;
import com.spring.Ecommerce.repository.ProductCategoryRepository;
import com.spring.Ecommerce.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductCategoryService {

    @Autowired
    ProductCategoryRepository productCategoryRepository;

    public List<ProductCategory> findAll(){
        return productCategoryRepository.findAll();
    }

    public ProductCategory findByName(String name){
        return productCategoryRepository.findByName(name).orElse(null);
    }
}
