package com.spring.Ecommerce.controllers;


import com.spring.Ecommerce.models.Cart;
import com.spring.Ecommerce.models.Contact;
import com.spring.Ecommerce.models.Order;
import com.spring.Ecommerce.models.User;
import com.spring.Ecommerce.repository.ProductRepository;
import com.spring.Ecommerce.repository.UserRepository;
import com.spring.Ecommerce.services.MyUserDetailsService;
import com.spring.Ecommerce.services.ProductService;
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
    UserService userService;

    @Autowired
    ProductService productService;

    @GetMapping("/cart")
    public Cart getCart(Principal principal) {
        User user = userService.findByEmail(principal.getName());
        return user.getCart();
    }

    @GetMapping("/orders")
    public Set<Order> getOrders(Principal principal) {
        User user = userService.findByEmail(principal.getName());
        return user.getCustomerOrders();
    }

    @PostMapping("/placeOrder")
    public ResponseEntity placeOrder(@RequestBody Contact contact, Principal principal) {
        try {
            User user = userService.findByEmail(principal.getName());
            userService.placeOrder(user, contact.getId());
            return ResponseEntity.ok(HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @GetMapping("/addToCart/{productId}")
    public ResponseEntity addToCart(Principal principal, @PathVariable int productId) {
        try {
            User user = userService.findByEmail(principal.getName());
            user.addToCart(productService.findById(productId));
            userService.save(user);
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/removeCartItem/{cartItemId}")
    public ResponseEntity removeCartItem(@PathVariable int cartItemId, Principal principal) {
        try {
            User user = userService.findByEmail(principal.getName());
            userService.removeCartItem(user, cartItemId);
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/setQuantity/{cartItemId}/{quantity}") //custom quantity
    public ResponseEntity setQuantity(@PathVariable int cartItemId, @PathVariable int quantity, Principal principal) {
        try {
            User user = userService.findByEmail(principal.getName());
            userService.setQuantity(user, cartItemId, quantity);
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @GetMapping("/addQuantity/{cartItemId}")
    public ResponseEntity addQuantity(@PathVariable int cartItemId, Principal principal) {
        try {
            User user = userService.findByEmail(principal.getName());
            userService.addQuantity(user, cartItemId);
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/removeQuantity/{cartItemId}")
    public ResponseEntity removeQuantity(@PathVariable int cartItemId, Principal principal) {
        try {
            User user = userService.findByEmail(principal.getName());
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
    public ResponseEntity addContact(@RequestBody Contact contact, Principal principal) {
        try {
            User user = userService.findByEmail(principal.getName());
            userService.addContact(user, contact);
            return ResponseEntity.ok(HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/profile/getContacts")
    public Set<Contact> getContacts(Principal principal) {
        User user = userService.findByEmail(principal.getName());
        return userService.getContacts(user);
    }
    @PostMapping("/profile/cancelOrder")
    public ResponseEntity cancelOrder(@RequestBody Order order, Principal principal) {
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
