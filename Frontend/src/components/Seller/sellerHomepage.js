import React, { useContext } from "react"

import {
    Navigate,
} from "react-router-dom";

import SellerAppBar from './sellerAppBar';
import AuthContext from "../Auth/authProvider";

export const SellerHomepage = () => {
    const { auth } = useContext(AuthContext);
    return (
        < div >
            {auth?.userRole !== "SELLER" && <Navigate to="/" />}
            <SellerAppBar />
        </div >
    )
}
