package com.spring.Ecommerce.services;


import com.spring.Ecommerce.models.Contact;
import com.spring.Ecommerce.models.Order;
import com.spring.Ecommerce.models.User;
import com.spring.Ecommerce.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    ProductService productService;


    public User findByEmail(String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        return optionalUser.orElse(null);
    }

    public void save(User user) {
        userRepository.save(user);
    }

    public void placeOrder(User user, int contactId) {
        productService.setProductQuantity(user.getCart());//reduce Product quantity after placing order
        user.placeOrder(contactId);
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

    public void addContact(User user, Contact contact) {
        user.addContact(contact);
        userRepository.save(user);
    }

    public Set<Contact> getContacts(User user) {
        return user.getContacts();
    }

    public void deleteContactById(User user, int id) {
        user.deleteContactById(id);
        save(user);
    }

    public Contact getContact(User user, int id) {
        return user.getContacts().stream().filter(contact -> contact.getId() == id).findFirst().orElse(null);
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


}
