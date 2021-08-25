package com.spring.Ecommerce.controllers;


import com.spring.Ecommerce.models.Order;
import com.spring.Ecommerce.models.Product;
import com.spring.Ecommerce.models.ProductCategory;
import com.spring.Ecommerce.models.User;
import com.spring.Ecommerce.repository.ProductCategoryRepository;
import com.spring.Ecommerce.repository.UserRepository;
import com.spring.Ecommerce.services.MyUserDetailsService;
import com.spring.Ecommerce.services.ProductService;
import com.spring.Ecommerce.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/seller")
public class SellerController {

    @Autowired
    ProductService productService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    MyUserDetailsService userDetailsService;

    @Autowired
    ProductCategoryRepository productCategoryRepository;

    @Autowired
    UserService userService;


    @GetMapping("/products")
    public Set<Product> getProducts(Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).get();
        return user.getProducts();
    }

    @GetMapping("/product/{productId}")
    public Product getProduct(@PathVariable int productId, Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).get();
        return user.getProductById(productId).get();
    }

    @GetMapping("/orders/{orderId}/setDelivered")
    public ResponseEntity setDelivered(Principal principal, @PathVariable int orderId) {
        User user = userRepository.findByEmail(principal.getName()).get();
        user.setDelivered(orderId);
        userRepository.save(user);
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/orders/{orderId}")
    public Order getOrder(Principal principal, @PathVariable int orderId) {
        User user = userRepository.findByEmail(principal.getName()).get();
        return user.findOrderOfSeller(orderId);
    }

    @GetMapping("/categories")
    public List<ProductCategory> getCategories() {
        return productCategoryRepository.findAll();
    }

    @PostMapping("/addProduct")
    public ResponseEntity<?> addProduct(@RequestBody Product product, Principal principal) {
        //SAME FUNCTION FOR EDIT PRODUCT
        try {
            User user = userDetailsService.getUserModelByEmail(principal.getName());
            product.setCategory(productCategoryRepository.findByName(product.getCategory().getName()).get());
            product.setCreatedAt(new Timestamp(System.currentTimeMillis()));
            product.setCreated_by(user);
            product.setDetails(product.getDetails());
            productService.addProduct(product);
            return ResponseEntity.ok(HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }

    @PostMapping("/editProduct")
    public ResponseEntity<?> editProduct(@RequestBody Product product, Principal principal) {
        //SAME FUNCTION FOR EDIT PRODUCT
        try {
            User user = userDetailsService.getUserModelByEmail(principal.getName());
            Optional<Product> toEdit = user.getProductById(product.getId());
            if (toEdit.isPresent()) {
                product.setCategory(productCategoryRepository.findByName(product.getCategory().getName()).get());
                product.setCreatedAt(new Timestamp(System.currentTimeMillis()));
                product.setCreated_by(user);
                product.setDetails(product.getDetails());
                product.setModifiedAt(new Timestamp(System.currentTimeMillis()));
                productService.addProduct(product);
                return ResponseEntity.ok(HttpStatus.OK);
            }
            return ResponseEntity.ok("You don't own this product");


        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }

    @GetMapping("/orders")
    public Set<Order> getOrders(Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).get();
        return user.getSellerOrders();
    }

    @GetMapping("/order/{orderId}")
    public Order getSellerOrderById(@PathVariable int orderId, Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).get();
        return userService.getSellerOrderById(user, orderId);
    }

    @PostMapping("/setAsDelivered")
    public ResponseEntity setAsDelivered(@RequestBody Order order, Principal principal) {
        try {
            User user = userRepository.findByEmail(principal.getName()).get();
            userService.setAsDelivered(user, order);
            return ResponseEntity.ok(HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}







