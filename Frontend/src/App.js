import React, { useContext, useEffect } from "react"
import Login from './components/login';
import { AppContext, AppProvider } from './components/contexts'
import {
    BrowserRouter as Router,
    Route,
    Switch,
    BrowserRouter,
    Redirect
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



function App() {
    const { state } = useContext(AppContext);
    const isSeller = state?.user?.role === 'SELLER'

    return (
        <BrowserRouter >

            <AppProvider>
                <Switch>
                    <React.Fragment>
                        <Route exact path="/"><Homepage /></Route>
                        <Route path="/login"><Login /></Route>
                        <Route path="/product/:id"><Product /></Route>
                        <Route path="/register"><Register /></Route>
                        {/* <Route path="/forgotPassword"><ForgotPassword/></Route> */}

                        <Route path="/profile"><Profile /></Route>
                        <Route path="/profile/addresses"><AddressList /></Route>
                        <Route path="/profile/orders"><OrderList /></Route>
                        <Route path="/profile/order/:id"><OrderDetails /></Route>
                        <Route path="/cart"><Cart /></Route>

                        {isSeller &&
                            <>
                                <Route path="/seller/"><SellerHomepage /></Route>
                                <Route path="/seller/products"><SellerProducts /></Route>
                                <Route path="/seller/product/:id"><Product /></Route>
                                <Route path="/seller/addProduct"><AddProduct /></Route>
                                <Route path="/seller/editProduct/:id"><AddProduct edit={true} /></Route>
                                <Route path="/seller/orders"><OrderList /></Route>
                                <Route path="/seller/order/:id"><OrderDetails /></Route>
                            </>
                        }
                        <Route path="*" ><Redirect to="/" /></Route>
                    </React.Fragment>
                </Switch>
            </AppProvider>
        </BrowserRouter>

    );
}

export default App;
