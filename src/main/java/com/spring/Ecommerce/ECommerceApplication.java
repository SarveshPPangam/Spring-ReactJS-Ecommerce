package com.spring.Ecommerce;

import com.spring.Ecommerce.models.Product;
import com.spring.Ecommerce.models.User;
import com.spring.Ecommerce.repository.*;
import com.spring.Ecommerce.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.core.parameters.P;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.Date;
import java.util.Set;

//@EnableAutoConfiguration
@SpringBootApplication
@EntityScan(basePackages = {"com.spring.Ecommerce.models"})
//@EnableJpaRepositories(basePackageClasses = UserRepository.class)
public class ECommerceApplication {

    public static void main(String[] args) {
        SpringApplication.run(ECommerceApplication.class, args);
    }

    @Bean
    public PasswordEncoder getPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Autowired
    ProductService productService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    CartItemRepository cartItemRepository;

    @Autowired
    ProductCategoryRepository productCategoryRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    OrderRepository orderRepository;
    @Bean
    public CommandLineRunner commandLineRunner() {

        return args -> {
//            System.out.println(orderRepository.findById(13).get().getOrderItems());
//            System.out.println(orderRepository.getOrdersByCustomerId(userRepository.findById(2).get()).iterator().next().getOrderItems());
//            User user = new User();
//            user.setEmail("c@c.com").setEnabled(true).setRole(roleRepository.findById(2).get())
//                    .setPassword(new BCryptPasswordEncoder().encode("s")).setFirstName("Seller").setLastName("1");
//            User user = userRepository.findById(1).get();
//            Product product = productService.findById(8);
//            Cart cart = new Cart();
//            CartItem cartItem1 = new CartItem();
//            cartItem1.setCartId(cart).setProductId(product).setQuantity(1).setCreatedAt(new Timestamp(System.currentTimeMillis()));
//            cart.setItems(Set.of(cartItem1)).setCreatedAt(new Timestamp(System.currentTimeMillis())).setUser(user);
//            user.setCart(cart);
//            user.addToCart(product);
//            user.decrementQuantity(cartItemRepository.getById(3), 1);
//            userRepository.save(user);

            Timestamp createdAt = new Timestamp(System.currentTimeMillis());
            User customerUser = userRepository.findById(2).get();
            User sellerUser = userRepository.findById(1).get();
            User sellerUser2 = userRepository.findById(3).get();
//            Product product = new Product();
//            ProductDetail productDetail = new ProductDetail("materal","wood",product,new Timestamp(System.currentTimeMillis()));
//
//            product.setQuantity(10000).setCreatedAt(new Timestamp(System.currentTimeMillis()))
//                    .setCreated_by(sellerUser2).setName("Table").setDescription("this is table")
//                    .setImageURL("img url table").setPrice(369).setDetails(Set.of(productDetail))
//                    .setCategory(productCategoryRepository.findById(2).get());
//            productService.addProduct(product);

//            productCategoryRepository.save(new ProductCategory("Furniture","these are furnitures", createdAt));



            Product product = productService.findById(2);
//            user.addToCart(product);
//            user.decrementQuantity(2, 10);
//            user.addContact(new Address("Jo Jo","+23562523423", "hehe island",3463466,createdAt));
//            CustomerOrder order = new CustomerOrder();
//            OrderItem item = new OrderItem();
//            item.setProduct(product).setCreatedAt(createdAt).setTotalPrice(1).setOrderId(order).setQuantity(1);
//            order.setAddress(customerUser.getAddresses().iterator().next()).setCustomerId(customerUser).setSellerId(sellerUser)
//                    .setStatus(OrderStatus.PENDING).setPlacedAt(createdAt).setOrderItems(Set.of(item));
//            customerUser.addOrder(order);
//            userRepository.save(customerUser);
//            customerUser.addToCart(product);
//            customerUser.placeOrder(1);
//
//            userRepository.save(customerUser);
//            System.out.println(sellerUser.getSellerOrders().iterator().next().getOrderItems());
//            System.out.println(sellerUser2.getSellerOrders().iterator().next().getOrderItems());
        };
    }



}
