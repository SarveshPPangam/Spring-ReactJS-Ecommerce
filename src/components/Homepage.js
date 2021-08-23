import React, { useContext, useEffect } from "react"
import { AppContext, AppProvider } from './contexts'

import {
    Link,
    Redirect,
    useLocation
} from "react-router-dom";
import { ProductList } from "./productList";
import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({


    link: {
        color: 'inherit',
        textDecoration: 'inherit',
    }
}));

export const Homepage = () => {
    const { state } = useContext(AppContext);
    const classes = useStyles();
    const redirectIfSeller = state?.user?.role === "SELLER" && <Redirect to="/seller/"/>;
    const isCustomer = state?.user?.role === "CUSTOMER";
    const notLoggedIn = !state?.user?.role && <Link to="/login">Login</Link>;
    console.log("in homepage")
    return (
        <>
            {console.log(state)}
            {redirectIfSeller}
            {notLoggedIn}
            {isCustomer && <>
            <Link to={"/cart"} className={classes.link}>
                <Button >Cart</Button>
            </Link>
            <Link to={"/profile"} className={classes.link}>
                <Button >Profile</Button>
            </Link>
            <ProductList />
            </>
            }
        </>
    )
}
