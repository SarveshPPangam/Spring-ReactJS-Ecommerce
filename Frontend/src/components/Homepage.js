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


    return (
        <>


            {isCustomer && <>
                <Link to={"/cart"} className={classes.link}>
                    <Button >Cart</Button>
                </Link>
                <Link to={"/profile"} className={classes.link}>
                    <Button >Profile</Button>
                </Link>
            </>
            }


        </>
    )
}
