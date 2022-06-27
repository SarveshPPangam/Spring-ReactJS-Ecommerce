package com.spring.Ecommerce.util;


import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class JwtUtil {

    private String SECRET_KEY = "secret";


    public String generateAccessToken(UserDetails userDetails) {
        Algorithm algorithm = Algorithm.HMAC256(SECRET_KEY.getBytes());
        String accessToken = JWT.create()
                .withSubject(userDetails.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + 1 * 60 * 1000))
                .withClaim("email", userDetails.getUsername())
                .withClaim("role", userDetails.getAuthorities().iterator().next().toString())
                .sign(algorithm);
        return accessToken;
    }

    public String generateRefreshToken(UserDetails userDetails) {
        Algorithm algorithm = Algorithm.HMAC256(SECRET_KEY.getBytes());
        String refreshToken = JWT.create()
                .withSubject(userDetails.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + 30 * 60 * 1000))
                .withClaim("email", userDetails.getUsername())
                .withClaim("role", userDetails.getAuthorities().iterator().next().toString())
                .sign(algorithm);
        return refreshToken;
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(SECRET_KEY); //use more secure key
            JWTVerifier verifier = JWT.require(algorithm)
                    .build(); //Reusable verifier instance
            DecodedJWT jwt = verifier.verify(token);
            return extractUsername(token).equals(userDetails.getUsername()) && !isTokenExpired(token);
        } catch (JWTVerificationException exception) {
            //Invalid signature/claims
            return false;
        }

    }

    public String extractUsername(String token) {
        try {
            DecodedJWT jwt = JWT.decode(token);
            System.out.println(jwt.getExpiresAt());
            return jwt.getClaim("email").asString();
        } catch (JWTDecodeException exception) {
            return null;
        }
    }

    public Boolean isTokenExpired(String token) {
        DecodedJWT jwt = JWT.decode(token);
        System.out.println(jwt.getExpiresAt().before(new Date()));
        return jwt.getExpiresAt().before(new Date());
    }


}