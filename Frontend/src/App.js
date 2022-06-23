import React, { useContext, useEffect, useState } from "react"
import Login from './components/login';
import {
    BrowserRouter as Router,
    Route,
    BrowserRouter,
    Routes,
} from "react-router-dom";

import { Homepage } from "./components/Homepage";
import { SellerHomepage } from "./components/Seller/sellerHomepage";
import { SellerProducts } from "./components/Seller/sellerProducts";
import { AddProduct } from "./components/Seller/addProduct";
import { Product } from "./components/product";
import { Cart } from "./components/Customer/cart";
import { AddressList } from "./components/Customer/addressList";
import { Profile } from "./components/Customer/profile";
import { OrderList } from "./components/Customer/orderList";
import { OrderDetails } from "./components/Customer/orderDetails";
import { Register } from "./components/register";
import { RequireAuth } from "./components/Auth/requireAuth.js";
import { ProductSearch } from "./components/productSearch";
import { ProductList } from "./components/productList";
import Layout from "./components/Auth/layout";
import AuthContext from "./components/Auth/authProvider";


const ROLES = {
    'Customer': 'CUSTOMER',
    'Seller': 'SELLER',
}



function App() {
    const { auth } = useContext(AuthContext);
    const isSeller = auth?.userRole === 'SELLER'


    return (
        <>
            {isSeller ?
                <SellerHomepage />
                : <Homepage />}

            <Routes>
                <React.Fragment>

                    <Route path="/" element={<Layout />} >
                        {/* Public routes */}
                        <Route path="/" element={<ProductList />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/product/:id" element={<Product />} />
                        <Route path="/register" element={<Register />} />
                        {/* <Route path="/forgotPassword"><ForgotPassword/></Route> */}
                        <Route path="/search" element={<ProductSearch />} />

                        <Route element={<RequireAuth allowedRole={ROLES.Customer} />}>
                            {/* Routes accessible only by logged in user */}
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/profile/addresses" element={<AddressList />} />
                            <Route path="/profile/orders" element={<OrderList />} />
                            <Route path="/profile/order/:id" element={<OrderDetails />} />
                            <Route path="/cart" element={<Cart />} />
                        </Route>



                        {/* Routes accessible only by logged in admin */}
                        <Route element={<RequireAuth allowedRole={ROLES.Seller} />}>
                            <Route path="/seller" element={<SellerHomepage />} />
                            <Route path="/seller/products" element={<SellerProducts />} />
                            <Route path="/seller/product/:id" element={<Product />} />
                            <Route path="/seller/addProduct" element={<AddProduct />} />
                            <Route path="/seller/editProduct/:id" element={<AddProduct edit={true} />} />
                            <Route path="/seller/orders" element={<OrderList />} />
                            <Route path="/seller/order/:id" element={<OrderDetails />} />
                        </Route>
                    </Route>
                </React.Fragment>
            </Routes>
        </>
    );
}

export default App;
