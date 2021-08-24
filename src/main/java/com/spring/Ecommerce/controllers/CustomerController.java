package com.spring.Ecommerce.controllers;


import com.spring.Ecommerce.models.Cart;
import com.spring.Ecommerce.models.Contact;
import com.spring.Ecommerce.models.Order;
import com.spring.Ecommerce.models.User;
import com.spring.Ecommerce.repository.ProductRepository;
import com.spring.Ecommerce.repository.UserRepository;
import com.spring.Ecommerce.services.MyUserDetailsService;
import com.spring.Ecommerce.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Set;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/c")
public class CustomerController {

    @Autowired
    private MyUserDetailsService userDetailsService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    UserService userService;

    @GetMapping("/cart")
    public Cart getCart(Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).get();
        return user.getCart();
    }

    @GetMapping("/orders")
    public Set<Order> getOrders(Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).get();
        return user.getCustomerOrders();
    }

    @GetMapping("/placeOrder")
    public ResponseEntity placeOrder(Principal principal, int contactId) {
        try {
            User user = userRepository.findByEmail(principal.getName()).get();
            userService.placeOrder(user, contactId);
            return ResponseEntity.ok(HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/orders/{orderId}")
    public Order getOrder(Principal principal, @PathVariable int orderId) {
        User user = userRepository.findByEmail(principal.getName()).get();
        return user.findOrderOfCustomer(orderId);
    }

    @GetMapping("/orders/{orderId}/cancel")
    public ResponseEntity cancelOrder(Principal principal, @PathVariable int orderId) {
        User user = userRepository.findByEmail(principal.getName()).get();
        user.cancelOrder(orderId);
        userRepository.save(user);
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/addToCart/{productId}")
    public ResponseEntity addToCart(Principal principal, @PathVariable int productId) {
        try {
            User user = userRepository.findByEmail(principal.getName()).get();
            user.addToCart(productRepository.findById(productId).get());
            userRepository.save(user);
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/removeCartItem/{cartItemId}")
    public ResponseEntity removeCartItem(@PathVariable int cartItemId, Principal principal){
        try {
            User user = userRepository.findByEmail(principal.getName()).get();
            userService.removeCartItem(user, cartItemId);
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/addQuantity/{cartItemId}")
    public ResponseEntity addQuantity(@PathVariable int cartItemId, Principal principal){
        try {
            User user = userRepository.findByEmail(principal.getName()).get();
            userService.addQuantity(user, cartItemId);
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/removeQuantity/{cartItemId}")
    public ResponseEntity removeQuantity(@PathVariable int cartItemId, Principal principal){
        try {
            User user = userRepository.findByEmail(principal.getName()).get();
            userService.removeQuantity(user, cartItemId);
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/profile")
    public String profile() {
        return "profile";
    }

    @PostMapping("/profile/addContact")
    public ResponseEntity addContact(@RequestBody Contact contact, Principal principal){
        try{
            User user = userRepository.findByEmail(principal.getName()).get();
            userService.addContact(user, contact);
            return ResponseEntity.ok(HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/profile/getContacts")
    public Set<Contact> getContacts(Principal principal){
        User user = userRepository.findByEmail(principal.getName()).get();
        return userService.getContacts(user);
    }

}
