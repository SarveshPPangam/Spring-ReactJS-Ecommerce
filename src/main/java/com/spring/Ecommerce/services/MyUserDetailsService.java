package com.spring.Ecommerce.services;


import com.spring.Ecommerce.models.MyUserDetails;
import com.spring.Ecommerce.models.User;
import com.spring.Ecommerce.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByEmail(s);
        user.orElseThrow(() -> new UsernameNotFoundException("No user with email "+s+" found!"));

        return user.map(MyUserDetails::new).get();
    }

    public User getUserModelByEmail(String email){
        return userRepository.findByEmail(email).get();
    }
}
