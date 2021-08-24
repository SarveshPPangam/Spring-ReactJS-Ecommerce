import { React, useEffect, useContext, useState } from 'react'
import { AppContext, AppProvider } from './contexts'
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
    Link,
    Redirect,
    Switch,
    useParams
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

    const fetchSellerProducts = () => {
        fetch('http://localhost:8080/seller/products', {
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

    const fetchProductsForCustomer = () => {
        fetch('http://localhost:8080/allProducts', {
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
    useEffect(() => {
        console.log("in useEffect");
        userRole === 'SELLER' && fetchSellerProducts();
        userRole === 'CUSTOMER' && fetchProductsForCustomer();

    }, [state.token])
    return (
        <div className={classes.root}>
            {userRole == 'SELLER' &&
                products?.map((product, index) => {
                    return (
                        <Grid item className={classes.item} key={product.id}>
                            <Link to={`/seller/product/${product.id}`} className={classes.link}>
                                <ProductTile product={product} />
                            </Link>

                        </Grid>

                    )
                })
            } 
            {userRole == 'CUSTOMER' &&
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
