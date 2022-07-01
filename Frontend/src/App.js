import React, { useContext, useEffect, useState } from "react"
import Login from './components/Auth/login';
import {
    BrowserRouter as Router,
    Route,
    BrowserRouter,
    Routes,
    Navigate,
    useLocation,
} from "react-router-dom";

import { Homepage } from "./components/Homepage";
import { SellerHomepage } from "./components/Seller/sellerHomepage";
import { SellerProducts } from "./components/Seller/sellerProducts";
import { AddProduct } from "./components/Seller/addProduct";
import { Product } from "./components/product";
import { Cart } from "./components/Customer/cart";
import { AddressList } from "./components/Customer/addressList";
import { Profile } from "./components/Customer/profile";
import { OrderList } from "./components/orderList";
import { OrderDetails } from "./components/orderDetails";
import { Register } from "./components/Auth/register";
import { RequireAuth } from "./components/Auth/requireAuth.js";
import { ProductSearch } from "./components/productSearch";
import { ProductList } from "./components/productList";
import Layout from "./components/Auth/layout";
import AuthContext from "./components/Auth/authProvider";
import PersistLogin from "./components/persistLogin";
import { SellerProductSearch } from "./components/Seller/sellerProductSearch";
import CustomAppBar from "./components/customAppBar";


const ROLES = {
    'Customer': 'CUSTOMER',
    'Seller': 'SELLER',
}



function App() {
    const { auth } = useContext(AuthContext);
    const isSeller = auth?.userRole === 'SELLER'

    return (
        <>
            <CustomAppBar />

            {isSeller ?
                (<SellerHomepage />)
                : <Homepage />}

            <Routes>
                <React.Fragment>

                    <Route path="/" element={<Layout />} >
                        {/* Public routes */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        {/* <Route path="/forgotPassword"><ForgotPassword/></Route> */}


                        <Route element={<PersistLogin />}>
                            <Route path="/" element={isSeller ? <SellerProducts /> : <ProductList />} />
                            <Route path="/search" element={<ProductSearch />} />
                            <Route path="/product/:id" element={<Product />} />

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
                                {/* <Route path="/seller" element={<SellerHomepage showBar={false} />} /> */}
                                <Route path="/seller/search" element={<SellerProductSearch />} />
                                <Route path="/seller/products" element={<SellerProducts />} />
                                <Route path="/seller/product/:id" element={<Product />} />
                                <Route path="/seller/addProduct" element={<AddProduct />} />
                                <Route path="/seller/editProduct/:id" element={<AddProduct edit={true} />} />
                                <Route path="/seller/orders" element={<OrderList />} />
                                <Route path="/seller/order/:id" element={<OrderDetails />} />
                            </Route>
                        </Route>
                        <Route path="*" element={<Navigate to="/" />} />
                    </Route>
                </React.Fragment>
            </Routes>
        </>
    );
}

export default App;
