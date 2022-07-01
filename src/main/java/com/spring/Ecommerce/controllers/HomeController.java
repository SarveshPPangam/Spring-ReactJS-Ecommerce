package com.spring.Ecommerce.controllers;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.sipios.springsearch.anotation.SearchSpec;
import com.spring.Ecommerce.models.AuthenticationRequest;
import com.spring.Ecommerce.models.AuthenticationResponse;
import com.spring.Ecommerce.models.Product;
import com.spring.Ecommerce.models.UserRegisterDTO;
import com.spring.Ecommerce.services.MyUserDetailsService;
import com.spring.Ecommerce.services.ProductService;
import com.spring.Ecommerce.services.UserRegisterResponse;
import com.spring.Ecommerce.services.UserService;
import com.spring.Ecommerce.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.web.reactive.WebFluxProperties;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Arrays;
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
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest, HttpServletResponse response) throws Exception {

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(), authenticationRequest.getPassword())
            );
        } catch (BadCredentialsException e) {
            throw new Exception("Incorrect username or password", e);
        }


        final UserDetails userDetails = userDetailsService
                .loadUserByUsername(authenticationRequest.getEmail());

        final String accessToken = jwtTokenUtil.generateAccessToken(userDetails);
        final String refreshToken = jwtTokenUtil.generateRefreshToken(userDetails);


        Cookie cookie = new Cookie("refreshToken", refreshToken);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setMaxAge(24 * 60 * 60 * 1000);

        response.addCookie(cookie);

        return ResponseEntity.ok(new AuthenticationResponse(accessToken));
    }

    @GetMapping("/refreshToken")
    public ResponseEntity<?> refreshToken(HttpServletRequest request, HttpServletResponse response) {
        final String REFRESH_TOKEN_COOKIE_NAME = "refreshToken";
        Cookie refreshTokenCookie = Arrays.stream(request.getCookies())
                .filter(cookie -> cookie.getName().equals(REFRESH_TOKEN_COOKIE_NAME)).findFirst().orElse(null);

        if (refreshTokenCookie == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Something went wrong!");
        }

        final String refreshToken = refreshTokenCookie.getValue();


        if (refreshToken != null) {
            // Clear the cookie
            refreshTokenCookie.setValue("");
            refreshTokenCookie.setPath("/");
            refreshTokenCookie.setMaxAge(0);
            response.addCookie(refreshTokenCookie);


            try {

                final String username = jwtTokenUtil.extractUsername(refreshToken);

                UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                boolean isTokenValid = jwtTokenUtil.validateToken(refreshToken, userDetails);
                if (isTokenValid) {
                    String responseAccessToken = jwtTokenUtil.generateAccessToken(userDetails);
                    String responseRefreshToken = jwtTokenUtil.generateRefreshToken(userDetails);

                    Cookie cookie = new Cookie("refreshToken", responseRefreshToken);
                    cookie.setHttpOnly(true);
                    cookie.setSecure(true);
                    cookie.setMaxAge(24 * 60 * 60 * 1000);

                    response.addCookie(cookie);

                    return ResponseEntity.ok(new AuthenticationResponse(responseAccessToken));
                } else {
                    throw new Exception("Invalid token!");
                }
            } catch (Exception exception) {
                return ResponseEntity.internalServerError().body(exception.getMessage());
            }
        }
        return ResponseEntity.internalServerError().body("Something went wrong!");
    }

    @PostMapping("/register")
    public ResponseEntity<Object> register(@RequestBody UserRegisterDTO userRegisterDTO) {

        UserRegisterResponse registerResponse = userService.registerUser(userRegisterDTO);

        ObjectMapper mapper = new ObjectMapper();
        ObjectNode response = mapper.createObjectNode();
        response.put("status", registerResponse.getMessage());


        if (registerResponse.equals(UserRegisterResponse.EMAIL_ALREADY_EXISTS)) {
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(response, HttpStatus.OK);

    }

    @GetMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response){
        final String REFRESH_TOKEN_COOKIE_NAME = "refreshToken";
        Cookie refreshTokenCookie = Arrays.stream(request.getCookies())
                .filter(cookie -> cookie.getName().equals(REFRESH_TOKEN_COOKIE_NAME)).findFirst().orElse(null);

        if(refreshTokenCookie != null) {
            // Clear the cookie
            refreshTokenCookie.setValue("");
            refreshTokenCookie.setPath("/");
            refreshTokenCookie.setMaxAge(0);
            response.addCookie(refreshTokenCookie);
        }

        return new ResponseEntity<>(HttpStatus.OK);

    }


    @GetMapping("/products")
    public List<Product> home(@SearchSpec Specification<Product> specs) {
        if (specs == null)
            return productService.getAll();
        return productService.search(specs);
    }

    @GetMapping("/product/{productId}")
    public Product getProduct(@PathVariable int productId) {
        return productService.findById(productId);
    }

}
