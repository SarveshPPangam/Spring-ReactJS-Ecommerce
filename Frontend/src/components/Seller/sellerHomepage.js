import React, { useContext, useState } from "react"

import {
    Navigate, useNavigate,
} from "react-router-dom";

import SellerAppBar from '../customAppBar';
import AuthContext from "../Auth/authProvider";
import { Button, CssBaseline, TextField } from "@material-ui/core";
import { useQuery } from "../../hooks/useQuery";
import { makeStyles } from '@material-ui/core/styles';






const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(4),
        marginLeft: 250
    },
    link: {
        color: 'inherit',
        textDecoration: 'inherit',
    }
}));



export const SellerHomepage = () => {
    const { auth } = useContext(AuthContext);

    const navigate = useNavigate()

    const query = useQuery()
    const productName = query.get('name')
    const [productNameQuery, setProductNameQuery] = useState(productName || '');

    const classes = useStyles();


    const onChangeQuery = e => {
        setProductNameQuery(e?.target?.value)
    }


    const onSubmit = (e) => {
        e.preventDefault();
        navigate(`/seller/search?name=${productNameQuery}`)
    }


    return (
        < div >
            {auth?.userRole !== "SELLER" && <Navigate to="/" />}
            <div className={classes.root} >
                <CssBaseline />
                <main className={classes.content}>

                    <form onSubmit={onSubmit}>
                        <TextField id="outlined-basic" variant="outlined" name="name" value={productNameQuery} onChange={onChangeQuery} />
                        <Button type="submit">Search</Button>
                    </form>



                </main>
            </div >
        </div >
    )
}
