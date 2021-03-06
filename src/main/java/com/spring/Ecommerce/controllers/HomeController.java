package com.spring.Ecommerce.controllers;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.sipios.springsearch.anotation.SearchSpec;
import com.spring.Ecommerce.JwtUtil;
import com.spring.Ecommerce.models.AuthenticationRequest;
import com.spring.Ecommerce.models.AuthenticationResponse;
import com.spring.Ecommerce.models.Product;
import com.spring.Ecommerce.models.UserRegisterDTO;
import com.spring.Ecommerce.services.MyUserDetailsService;
import com.spring.Ecommerce.services.ProductService;
import com.spring.Ecommerce.services.UserRegisterResponse;
import com.spring.Ecommerce.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class HomeController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtTokenUtil;

    @Autowired
    ProductService productService;

    @Autowired
    MyUserDetailsService userDetailsService;

    @Autowired
    UserService userService;


    @PostMapping("/authenticate")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(), authenticationRequest.getPassword())
            );
        }
        catch (BadCredentialsException e) {
            throw new Exception("Incorrect username or password", e);
        }


        final UserDetails userDetails = userDetailsService
                .loadUserByUsername(authenticationRequest.getEmail());

        final String jwt = jwtTokenUtil.generateToken(userDetails);
        return ResponseEntity.ok(new AuthenticationResponse(jwt));
    }

    @PostMapping("/register")
    public ResponseEntity<Object> register(@RequestBody UserRegisterDTO userRegisterDTO){

        UserRegisterResponse registerResponse = userService.registerUser(userRegisterDTO);

        ObjectMapper mapper = new ObjectMapper();
        ObjectNode response = mapper.createObjectNode();
        response.put("status", registerResponse.getMessage());


        if (registerResponse.equals(UserRegisterResponse.EMAIL_ALREADY_EXISTS)) {
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(response, HttpStatus.OK);

    }


    @GetMapping("/products")
    public List<Product> home(@SearchSpec Specification<Product>  specs){
        if(specs==null)
        return productService.getAll();
        return productService.search(specs);
    }

    @GetMapping("/product/{productId}")
    public Product getProduct(@PathVariable int productId){
        return productService.findById(productId);
    }

    @DeleteMapping("/common/deleteProduct/{productId}")
    public ResponseEntity<?> deleteProduct(@PathVariable int productId){
        try {
            productService.deleteById(productId);
            return ResponseEntity.ok(HttpStatus.OK);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }



}
