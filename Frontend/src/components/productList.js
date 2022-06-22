import { React, useEffect, useContext, useState } from 'react'
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import {
    Link,
} from "react-router-dom";
import ProductTile from './productTile';
import AuthContext from './Auth/authProvider';

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
    const { auth } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const classes = useStyles();
    const userRole = auth?.userRole;
    const isSeller = userRole === 'SELLER'

    const fetchSellerProducts = () => {
        fetch('/seller/products', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + auth?.accessToken
            }

        }).then(function (response) {
            response.text().then(r => {
                //                console.log(r)
                if (!response.status === 200) return
                const d = JSON.parse(r)
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
                "Authorization": "Bearer " + auth?.accessToken
            }

        }).then(function (response) {
            response.text().then(r => {
                //                console.log(r)
                if (!response.status === 200) return
                const d = JSON.parse(r)
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

    }, [auth?.accessToken])
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
