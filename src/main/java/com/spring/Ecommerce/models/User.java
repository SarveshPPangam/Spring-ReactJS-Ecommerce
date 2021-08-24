package com.spring.Ecommerce.models;

import lombok.Getter;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@Table (name = "users")
@Getter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private boolean isEnabled;

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "role_id", referencedColumnName = "id")
    private Role role;

    @OneToMany(mappedBy = "created_by")
    private Set<Product> products;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    @PrimaryKeyJoinColumn
    private Cart cart;

    @OneToMany(mappedBy = "customerId",
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.EAGER)
    private Set<Order> customerOrders;

    @OneToMany(mappedBy = "sellerId",
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.EAGER)
    private Set<Order> sellerOrders;

    @OneToMany(mappedBy = "user",
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.EAGER)
    private Set<Contact> contacts;




    public User setProducts(Set<Product> products) {
        this.products = products;
        return this;
    }


    public User setCart(Cart cart) {
        this.cart = cart;
        return this;
    }


    public User setFirstName(String firstName) {
        this.firstName = firstName;
        return this;
    }


    public User setLastName(String lastName) {
        this.lastName = lastName;
        return this;
    }


    public User setEmail(String email) {
        this.email = email; return this;
    }


    public User setPassword(String password) {
        this.password = password;
        return this;
    }


    public User setEnabled(boolean enabled) {
        isEnabled = enabled;
        return this;
    }



    public User setRole(Role role) {
        this.role = role;
        return this;
    }

    public Optional<Product> getProductById(int id){  //FETCH ONE OF SELLER'S PRODUCTS
        return this.products.stream().filter(product -> product.getId()==id).findFirst();
    }

    public User addContact(Contact contact) {
        if(this.contacts == null){
            this.contacts = new HashSet<>();
        }
        contact.setUser(this);
        contact.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        this.contacts.add(contact);
        return this;
    }

    public void addToCart(Product product){
        if(this.cart == null){
            this.cart = new Cart();
            this.cart.setUser(this);
            this.cart.setCreatedAt(new Timestamp(System.currentTimeMillis()));
            this.cart.setItems(new HashSet<CartItem>());
        }
        cart.addItem(product);
    }

    public void removeCartItem(int cartItemId){
        this.cart.removeItem(cartItemId);
    }

    public void addQuantity(int cartItemID, long quantity){
        this.cart.addQuantity(cartItemID, quantity);
    }

    public void decrementQuantity(int cartItemID, long quantity){
        this.cart.decrementQuantity(cartItemID, quantity);
    }

    public void clearCart(){
        this.cart.clear();
    }

    public void placeOrder(int contactId){
        Set<User> sellers = new HashSet<>();
        this.cart.getItems().forEach(cartItem -> {
            sellers.add(cartItem.getProduct().getCreated_by());
        });
        Set<Order> orders = new HashSet<>();
        sellers.forEach(seller -> {
            Order order = new Order();
            Set<CartItem> itemsOfSeller = this.cart.getItems().stream().filter(cartItem ->
                    cartItem.getProduct().getCreated_by().getId() == seller.getId()).collect(Collectors.toSet());
            Set<OrderItem> orderItems = new HashSet<>();
            var ref = new Object() {
                long totalPrice = 0;
            };
            itemsOfSeller.forEach(itemOfSeller -> {
                OrderItem orderItem = new OrderItem();
                orderItem.setQuantity(itemOfSeller.getQuantity()).setOrderId(order)
                        .setCreatedAt(new Timestamp(System.currentTimeMillis())).setProduct(itemOfSeller.getProduct())
                        .setTotalPrice(itemOfSeller.getQuantity()*itemOfSeller.getProduct().getPrice());
                orderItems.add(orderItem);
                ref.totalPrice += itemOfSeller.getQuantity()* itemOfSeller.getProduct().getPrice();
            });
            order.setOrderItems(orderItems).setStatus(OrderStatus.PENDING)
                    .setPlacedAt(new Timestamp(System.currentTimeMillis()))
                    .setContact(this.getContacts().stream().filter(contact -> contact.getId()==contactId).findFirst().get())
                    .setSellerId(seller).setCustomerId(this).setTotalPrice(ref.totalPrice).setTotalItems();
            orders.add(order);
        });
        this.customerOrders.addAll(orders);
//        this.clearCart();
    }

    public void cancelOrder(int orderId){
        this.findOrderOfCustomer(orderId).cancelOrder();
    }

    public void setDelivered(int orderId){
       this.findOrderOfSeller(orderId).setDelivered();
    }

    public Order findOrderOfCustomer(int orderId){
        return this.getCustomerOrders().stream().filter(order -> order.getId() == orderId)
                .findFirst().get();
    }
    public Order findOrderOfSeller(int orderId){
        return this.getSellerOrders().stream().filter(order -> order.getId() == orderId)
                .findFirst().get();
    }

//    public void placeCustomerOrder(User seller, Contact contact){   //only for customers, because orders for sellers are saved in other class i guess
//        Order customerOrder = new Order();
//        customerOrder.setCustomerId(this).setSellerId(seller).setContact(contact)
//                .setPlacedAt(new Timestamp(System.currentTimeMillis())).setStatus(OrderStatus.PENDING)
//                .setTotalPrice(calculateTotalPrice()).setOrderItems(getOrderItems(customerOrder))
//                .setTotalItems();
//        this.clearCart();
//    }

//    public long calculateTotalPriceForOrder(){
//        long totalPrice = this.cart.getItems().stream().mapToLong(cartItem -> (long) (cartItem.getProductId().getPrice() * cartItem.getQuantity())).sum();
//        return  totalPrice;
//    }

//    public Set<OrderItem> getOrderItems(Order order){
//        Set<OrderItem> orderItems = new HashSet<>();
//        this.cart.getItems().forEach(cartItem -> {
//            OrderItem item = new OrderItem();
//            item.setOrderId(order).setCreatedAt(new Timestamp(System.currentTimeMillis()))
//                    .setQuantity(cartItem.getQuantity()).setProduct(cartItem.getProductId())
//                    .setTotalPrice(cartItem.getProductId().getPrice() * cartItem.getQuantity());
//        });
//        return orderItems;
//    }

//    public void addOrder(CustomerOrder order){
//        if(this.customerOrders == null)
//            this.customerOrders = new HashSet<>();
//        this.customerOrders.add(order);
//    }
}
