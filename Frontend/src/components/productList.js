import { React, useEffect, useContext, useState } from 'react'
import { AppContext, AppProvider } from './contexts'
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import {
    Link,
} from "react-router-dom";
import ProductTile from './productTile';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: "wrap",
    },
    item: {
        margin: '0px 5px 10px 0px',
    },
    link: {
        color: 'inherit',
        textDecoration: 'inherit',
    }
}))
export const ProductList = () => {
    const { state } = useContext(AppContext);
    const [products, setProducts] = useState([]);
    const classes = useStyles();
    const userRole = state?.user?.role;
    const isSeller = userRole === 'SELLER'

    const fetchSellerProducts = () => {
        fetch('/seller/products', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + state.token
            }

        }).then(function (response) {
            response.text().then(r => {
                //                console.log(r)
                const d = JSON.parse(r)
                console.log(d)
                setProducts(d)
            })
        }, function (error) {
            console.log(error.message)
        })
    }

    const fetchProductsForGuest = () => {
        fetch('/products', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + state?.token
            }

        }).then(function (response) {
            response.text().then(r => {
                //                console.log(r)
                const d = JSON.parse(r)
                console.log(d)
                setProducts(d)
            })
        }, function (error) {
            console.log(error.message)
        })
    }
    useEffect(() => {
        if (isSeller)
            fetchSellerProducts();
        else
            fetchProductsForGuest();

    }, [state.token])
    return (
        <div className={classes.root}>
            {isSeller ?
                (products?.length > 0 ?
                    products?.map((product, index) => {
                        return (
                            <Grid item className={classes.item} key={product.id}>
                                <Link to={`/seller/product/${product.id}`} className={classes.link}>
                                    <ProductTile product={product} />
                                </Link>

                            </Grid>

                        )
                    })
                    : "You have no products!"
                )
                :

                products?.map((product, index) => {
                    return (
                        <Grid item className={classes.item} key={product.id}>
                            <Link to={`/product/${product.id}`} className={classes.link}>
                                <ProductTile product={product} />
                            </Link>

                        </Grid>

                    )
                })
            }
        </div>
    )
}
