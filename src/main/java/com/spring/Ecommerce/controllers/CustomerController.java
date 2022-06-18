package com.spring.Ecommerce.controllers;

import com.spring.Ecommerce.models.*;
import com.spring.Ecommerce.repository.UserRepository;
import com.spring.Ecommerce.services.MyUserDetailsService;
import com.spring.Ecommerce.services.ProductService;
import com.spring.Ecommerce.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Set;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/c")
public class CustomerController {


    @Autowired
    UserService userService;

    @Autowired
    ProductService productService;

    @Autowired
    UserRepository userRepository;

    @GetMapping("/cart")
    public Cart getCart(Principal principal) {
        User user = userService.findByEmail(principal.getName());
        System.out.println(user.getEmail());
        System.out.println(user.getCart());
        return user.getCart();
    }

    @GetMapping("/orders")
    public Set<Order> getOrders(Principal principal) {
        User user = userService.findByEmail(principal.getName());
        return user.getCustomerOrders();
    }

    @PostMapping("/placeOrder")
    public ResponseEntity<?> placeOrder(@RequestBody Address address, Principal principal) {
        try {
            User user = userService.findByEmail(principal.getName());
            userService.placeOrder(user, address.getId());
            return ResponseEntity.ok(HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @GetMapping("/addToCart/{productId}")
    public ResponseEntity<String> addToCart(Principal principal, @PathVariable int productId) {
        try {
            User user = userService.findByEmail(principal.getName());
            user.addToCart(productService.findById(productId));
            System.out.println(principal.getName());
            userService.save(user);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/removeCartItem/{cartItemId}")
    public ResponseEntity<String> removeCartItem(@PathVariable int cartItemId, Principal principal) {
        try {
            User user = userService.findByEmail(principal.getName());
            userService.removeCartItem(user, cartItemId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/setQuantity/{cartItemId}/{quantity}") //custom quantity
    public ResponseEntity<String> setQuantity(@PathVariable int cartItemId, @PathVariable int quantity, Principal principal) {
        try {
            User user = userService.findByEmail(principal.getName());
            userService.setQuantity(user, cartItemId, quantity);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @GetMapping("/addQuantity/{cartItemId}")
    public ResponseEntity<String> addQuantity(@PathVariable int cartItemId, Principal principal) {
        try {
            User user = userService.findByEmail(principal.getName());
            userService.addQuantity(user, cartItemId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/removeQuantity/{cartItemId}")
    public ResponseEntity<String> removeQuantity(@PathVariable int cartItemId, Principal principal) {
        try {
            User user = userService.findByEmail(principal.getName());
            userService.removeQuantity(user, cartItemId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/profile")
    public String profile() {
        return "profile";
    }

    @PostMapping("/profile/addresses")
    public ResponseEntity<?> addAddress(@RequestBody Address address, Principal principal) {
        User user = userService.findByEmail(principal.getName());
        userService.addAddress(user, address);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @PutMapping("/profile/addresses")
    public ResponseEntity<?> updateAddress(@RequestBody Address address, Principal principal) {
        User user = userService.findByEmail(principal.getName());
        userService.updateAddress(user, address);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @GetMapping("/profile/addresses")
    public Set<Address> getAddresses(Principal principal) {
        User user = userService.findByEmail(principal.getName());
        return user.getAddresses();
    }

    @DeleteMapping("/profile/address/{id}")
    public ResponseEntity<HttpStatus> deleteAddress(@PathVariable int id, Principal principal) {
        User user = userService.findByEmail(principal.getName());
        userService.deleteAddressById(user, id);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @GetMapping("/profile/address/{id}")
    public Address getAddress(@PathVariable int id, Principal principal) {
        User user = userService.findByEmail(principal.getName());
        return userService.getAddress(user, id);
    }

    @PostMapping("/profile/cancelOrder")
    public ResponseEntity<HttpStatus> cancelOrder(@RequestBody Order order, Principal principal) {
        try {
            User user = userService.findByEmail(principal.getName());
            userService.cancelOrder(user, order);
            return ResponseEntity.ok(HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/profile/order/{orderId}")
    public Order getCustomerOrderById(@PathVariable int orderId, Principal principal) {
        User user = userService.findByEmail(principal.getName());
        return userService.getCustomerOrderById(user, orderId);
    }


}
