package com.spring.Ecommerce.controllers;


import com.sipios.springsearch.anotation.SearchSpec;
import com.spring.Ecommerce.models.Order;
import com.spring.Ecommerce.models.Product;
import com.spring.Ecommerce.models.ProductCategory;
import com.spring.Ecommerce.models.User;
import com.spring.Ecommerce.services.MyUserDetailsService;
import com.spring.Ecommerce.services.ProductCategoryService;
import com.spring.Ecommerce.services.ProductService;
import com.spring.Ecommerce.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
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
    UserService userService;

    @Autowired
    MyUserDetailsService userDetailsService;

    @Autowired
    ProductCategoryService productCategoryService;


    @GetMapping("/products")
    public Set<Product> getProducts(@SearchSpec Specification<Product> specs, Principal principal) {
        User seller = userService.findByEmail(principal.getName());
        if(specs==null)
            return seller.getProducts();
        return productService.searchSellerProducts(specs, seller);

    }

    @GetMapping("/product/{productId}")
    public Product getProduct(@PathVariable int productId, Principal principal) {
        User user = userService.findByEmail(principal.getName());
        return user.getProductById(productId).orElse(null);
    }

    @GetMapping("/orders/{orderId}/setDelivered")
    public ResponseEntity<String> setDelivered(Principal principal, @PathVariable int orderId) {
        User user = userService.findByEmail(principal.getName());
        user.setDelivered(orderId);
        userService.save(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/orders/{orderId}")
    public Order getOrder(Principal principal, @PathVariable int orderId) {
        User user = userService.findByEmail(principal.getName());
        return user.findOrderOfSeller(orderId);
    }

    @GetMapping("/categories")
    public List<ProductCategory> getCategories() {
        return productCategoryService.findAll();
    }

    @PostMapping("/addProduct")
    public ResponseEntity<?> addProduct(@RequestBody Product product, Principal principal) {
        //SAME FUNCTION FOR EDIT PRODUCT
        try {
            User user = userDetailsService.getUserModelByEmail(principal.getName());
            product.setCategory(productCategoryService.findByName(product.getCategory().getName()));
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
                product.setCategory(productCategoryService.findByName(product.getCategory().getName()));
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
        User user = userService.findByEmail(principal.getName());
        return user.getSellerOrders();
    }

    @GetMapping("/order/{orderId}")
    public Order getSellerOrderById(@PathVariable int orderId, Principal principal) {
        User user = userService.findByEmail(principal.getName());
        return userService.getSellerOrderById(user, orderId);
    }

    @PostMapping("/setAsDelivered")
    public ResponseEntity<HttpStatus> setAsDelivered(@RequestBody Order order, Principal principal) {
        try {
            User user = userService.findByEmail(principal.getName());
            userService.setAsDelivered(user, order);
            return ResponseEntity.ok(HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}







