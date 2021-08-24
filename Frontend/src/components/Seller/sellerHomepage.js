import React, { useContext, useEffect } from "react"
import { AppContext, AppProvider } from '../contexts'

import {
    Link,
    Redirect,
    useLocation
} from "react-router-dom";

import SellerAppBar from './sellerAppBar';

export const SellerHomepage = () => {
    const { state } = useContext(AppContext);
    return (
        <div>
            {state?.user?.role !== "SELLER" && <Redirect to="/" />}
            <SellerAppBar />
        </div>
    )
}
