package com.spring.Ecommerce.services;


import com.spring.Ecommerce.models.Address;
import com.spring.Ecommerce.models.Order;
import com.spring.Ecommerce.models.User;
import com.spring.Ecommerce.models.UserRegisterDTO;
import com.spring.Ecommerce.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    ProductService productService;

    @Autowired
    RoleService roleService;

    @Autowired
    PasswordEncoder passwordEncoder;


    public UserRegisterResponse registerUser(UserRegisterDTO userRegisterDTO){
        boolean emailAlreadyExists = checkIfEmailAlreadyExists(userRegisterDTO.getEmail());
        if (emailAlreadyExists)
            return UserRegisterResponse.EMAIL_ALREADY_EXISTS;
        else{
            User user = new User();
            String roleName = userRegisterDTO.isSeller() ? "SELLER" : "CUSTOMER";
            user
                    .setFirstName(userRegisterDTO.getFirstName())
                    .setLastName(userRegisterDTO.getLastName())
                    .setEmail(userRegisterDTO.getEmail())
                    .setPassword(passwordEncoder.encode(userRegisterDTO.getPassword()))
                    .setRole(roleService.getRoleByRoleName(roleName))
                    .setEnabled(true);
            if(!userRegisterDTO.isSeller())
                user.initiateCustomer();
            userRepository.save(user);
            return UserRegisterResponse.OK;
        }
    }


    public User findByEmail(String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        return optionalUser.orElse(null);
    }

    public void save(User user) {
        userRepository.save(user);
    }

    public void placeOrder(User user, int addressId) {
        user.placeOrder(addressId);
        productService.setProductQuantity(user.getCart());//reduce Product quantity after placing order
        userRepository.save(user);
    }

    public void removeCartItem(User user, int cartItemId) {
        user.removeCartItem(cartItemId);
        userRepository.save(user);
    }

    public void setQuantity(User user, int cartItemId, int quantity) {
        if (quantity <= 0)
            user.removeCartItem(cartItemId);
        else
            user.setQuantity(cartItemId, quantity);
        userRepository.save(user);
    }

    public void addQuantity(User user, int cartItemId) {
        user.addQuantity(cartItemId, 1);
        userRepository.save(user);
    }

    public void removeQuantity(User user, int cartItemId) {
        user.decrementQuantity(cartItemId, 1);
        userRepository.save(user);
    }

    public void addAddress(User user, Address address) {
        user.addAddress(address);
        userRepository.save(user);
    }

    public void updateAddress(User user, Address address) {
        user.updateAddress(address);
        userRepository.save(user);
    }

    public Set<Address> getAddresses(User user) {
        return user.getAddresses();
    }

    public void deleteAddressById(User user, int id) {
        user.deleteAddressById(id);
        save(user);
    }

    public Address getAddress(User user, int id) {
        return user.getAddresses().stream().filter(address -> address.getId() == id).findFirst().orElse(null);
    }


    public Order getCustomerOrderById(User user, int id) {
        return user.getCustomerOrders().stream().filter(order -> order.getId() == id).findFirst().get();
    }

    public Order getSellerOrderById(User user, int id) {
        return user.getSellerOrders().stream().filter(order -> order.getId() == id).findFirst().get();
    }

    public void cancelOrder(User user, Order order) {
        user.cancelOrder(order.getId());
        userRepository.save(user);
    }

    public void setAsDelivered(User user, Order order) {
        user.setDelivered(order.getId());
        userRepository.save(user);
    }

    public void deleteSellerProduct(User user, int productId){
        user.deleteProduct(productId);
        userRepository.save(user);
    }

    private boolean checkIfEmailAlreadyExists(String email){
        return userRepository.findByEmail(email).isPresent();
    }


}

