package com.spring.Ecommerce.services;


import com.spring.Ecommerce.models.Cart;
import com.spring.Ecommerce.models.Product;
import com.spring.Ecommerce.models.User;
import com.spring.Ecommerce.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    ProductRepository productRepository;

    public List<Product> getAll() {
        return productRepository.findAll();
    }

    public List<Product> search(Specification<Product> specs){
        return productRepository.findAll(Specification.where(specs));
    }

    public Set<Product> searchSellerProducts(Specification<Product> specs, User seller){
        Set<Product> allProducts = new HashSet<>(productRepository.findAll(Specification.where(specs)));
        return allProducts.stream().filter(product -> product.getCreated_by().getId()==seller.getId()).collect(Collectors.toSet());
    }

    public void addProduct(Product product) {
        productRepository.save(product);
    }

    public Product findById(int id) {
        return productRepository.findById(id).orElse(null);
    }

    public void deleteById(int id) {
        productRepository.deleteById(id);
    }

    public void setProductQuantity(Cart cart) {
        cart.getItems().forEach(cartItem -> {
                    Product product = cartItem.getProduct();
                    product.reduceQuantityBy(cartItem.getQuantity());
                    productRepository.save(product);
                }
        );
    }

    public long getProductQuantity(int productId){
        return productRepository.findById(productId).orElseThrow().getQuantity();
    }
}
