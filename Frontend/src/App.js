import React, { useContext, useEffect } from "react"
import Req from './Req';
import Login from './components/login';
import { AppContext, AppProvider } from './components/contexts'
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch,
    HashRouter,
    Link,
    useLocation,
    BrowserRouter
} from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createTheme, makeStyles } from "@material-ui/core/styles";
import { MuiThemeProvider } from "@material-ui/core";

import { Homepage } from "./components/Homepage";
import { SellerHomepage } from "./components/Seller/sellerHomepage";
import { SellerProducts } from "./components/Seller/sellerProducts";
import { AddProduct } from "./components/Seller/addProduct";
import { Product } from "./components/product";
import { Cart } from "./components/Customer/cart";
import { ContactList } from "./components/Customer/contactList";
import { Profile } from "./components/Customer/profile";
import { OrderList } from "./components/Customer/orderList";
import { OrderDetails } from "./components/Customer/orderDetails";



function App() {
    const { state } = useContext(AppContext);

    return (
        <BrowserRouter >

            <AppProvider>
                <Switch>
                    <React.Fragment>
                        <Route exact path="/"><Homepage/></Route>
                        <Route path="/login"><Login /></Route>
                        {/* <Route path="/product"><SellerHomepage/></Route> */}
                        <Route path="/product/:id"><Product /></Route>
                        {/* <Route path="/register"><Register/></Route>
                            <Route path="/forgotPassword"><ForgotPassword/></Route> */}
                        <main >
                            <div />
                            <Route path="/profile"><Profile /></Route>
                            <Route path="/profile/contacts"><ContactList /></Route>
                            <Route path="/profile/orders"><OrderList /></Route>
                            <Route path="/profile/order/:id"><OrderDetails /></Route>
                            <Route path="/cart"><Cart /></Route>
                            <Route path="/seller/"><SellerHomepage /></Route>
                            <Route path="/seller/products"><SellerProducts /></Route>
                            <Route path="/seller/product/:id"><Product /></Route>
                            <Route path="/seller/addProduct"><AddProduct /></Route>
                            <Route path="/seller/editProduct/:id"><AddProduct edit={true}/></Route>
                            {/* <Route path="/downloadTemplate"><DownloadTemplate/></Route>
                                    <Route path="/uploadData"><UploadData/></Route>
                                    <Route path="/graphs"><Report/></Route>
                                    <Route path="/companyRegistration"><CompanyRegistration/></Route>
                                    <Route path="/techInfo"><TechnicalInformation/></Route>
                                    <Route path="/refrigerationBasics"><RefrigerationBasics/></Route>
                                    <Route path="/comfortConditioningBasics"><ComfortConditioningBasics/></Route>
                                    <Route path="/pumpBasics"><PumpBasics/></Route>
                                    <Route path="/ahuBasics"><AHUBasics/></Route>
                                    <Route path="/summary"><Summary/></Route>
                                    <Route path="/locations"><Locations/></Route>
                                    <Route path="/sites"><Sites/></Route>
                                    <Route path="/units"><Units/></Route>
                                    <Route path="/approvals"><Approvals timestamp={new Date().toString()} /></Route>
                                    <Route path="/reports/energyConsumption"><EnergyConsumption/></Route> */}
                            <Redirect from="*" to="/" />
                        </main>
                    </React.Fragment>
                </Switch>
            </AppProvider>
        </BrowserRouter>

    );
}

export default App;
