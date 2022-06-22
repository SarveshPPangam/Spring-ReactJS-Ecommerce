import React, { useContext, useEffect, useState } from "react"

import {
    Link,
    useNavigate,
    useLocation,
    Navigate
} from "react-router-dom";
import { Button, makeStyles, TextField } from "@material-ui/core";
import { useQuery } from "../hooks/useQuery";
import AuthContext, { AuthProvider } from "./Auth/authProvider";

const useStyles = makeStyles((theme) => ({


    link: {
        color: 'inherit',
        textDecoration: 'inherit',
    }
}));

export const Homepage = () => {
    const classes = useStyles();
    const { auth } = useContext(AuthContext)


    const isSeller = auth?.userRole === "SELLER"
    const isCustomer = auth?.userRole === "CUSTOMER";
    const redirectIfSeller = isSeller && <Navigate to="/seller/" />;
    const notLoggedIn = !auth?.userRole;

    const query = useQuery()
    const productName = query.get('name')
    const [productNameQuery, setProductNameQuery] = useState(productName || '');

    const navigate = useNavigate()

    const onChangeQuery = e => {
        setProductNameQuery(e?.target?.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        navigate(`/search?name=${productNameQuery}`)
    }
    return (
        <>

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
            {!isSeller &&
                <form onSubmit={onSubmit}>
                    <TextField id="outlined-basic" variant="outlined" name="name" value={productNameQuery} onChange={onChangeQuery} />
                    <Button type="submit">Search</Button>
                </form>
            }

        </>
    )
}
