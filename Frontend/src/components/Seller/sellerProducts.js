import React, { useContext, useEffect, useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ProductList } from '../productList';
import Product from '../productTile';
import { Button, TextField } from '@material-ui/core';
import { useQuery } from '../../hooks/useQuery';
import AuthContext from '../Auth/authProvider';


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


export const SellerProducts = () => {
    const classes = useStyles();
    const { auth } = useContext(AuthContext);

    const query = useQuery()
    const productName = query.get('name')
    const [productNameQuery, setProductNameQuery] = useState(productName || '');

    const onChangeQuery = e => {
        setProductNameQuery(e?.target?.value)
    }


    useEffect(() => {
        fetch('/seller/products', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + auth?.accessToken
            }

        }).then(function (response) {
            response.text().then(r => {
                //                console.log(r)
                const d = JSON.parse(r)
                console.log(d)
                // setProducts(d)
            })
        }, function (error) {
            console.log(error.message)
        })

    }, [auth?.accessToken])

    const onSubmit = (data) => {

    }

    return (
        <div className={classes.root} >
            <CssBaseline />
            <main className={classes.content}>
                <form onSubmit={onSubmit}>
                    <TextField id="outlined-basic" variant="outlined" name="name" value={productNameQuery} onChange={onChangeQuery} />
                    <Button type="submit">Search</Button>
                </form>
                {/* <div className={classes.toolbar} /> */}
                <ProductList />
            </main>
        </div >
    )
}
