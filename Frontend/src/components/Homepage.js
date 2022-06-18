import React, { useContext, useEffect, useState } from "react"
import { AppContext, AppProvider } from './contexts'

import {
    Link,
    Redirect,
    useHistory,
    useLocation
} from "react-router-dom";
import { ProductList } from "./productList";
import { Button, makeStyles, TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({


    link: {
        color: 'inherit',
        textDecoration: 'inherit',
    }
}));

export const Homepage = () => {
    const { state } = useContext(AppContext);
    const classes = useStyles();
    const redirectIfSeller = state?.user?.role === "SELLER" && <Redirect to="/seller/" />;
    const isCustomer = state?.user?.role === "CUSTOMER";
    const notLoggedIn = !state?.user?.role;

    const [productNameQuery, setProductNameQuery] = useState('');

    const history = useHistory()

    const onChangeQuery = e => {
        setProductNameQuery(e?.target?.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        history.push(`/search?name=${productNameQuery}`)
    }
    return (
        <>
            {redirectIfSeller}
            {notLoggedIn &&
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </>}
            {isCustomer && <>
                <Link to={"/cart"} className={classes.link}>
                    <Button >Cart</Button>
                </Link>
                <Link to={"/profile"} className={classes.link}>
                    <Button >Profile</Button>
                </Link>
            </>
            }

            <form onSubmit={onSubmit}>
                <TextField id="outlined-basic" variant="outlined" name="name" value={productNameQuery} onChange={onChangeQuery} required />
                <Button type="submit">Search</Button>
            </form>
            {/* <ProductList /> */}

        </>
    )
}
