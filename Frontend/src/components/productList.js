import { React, useEffect, useContext, useState } from 'react'
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import {
    Link, useNavigate,
} from "react-router-dom";
import ProductTile from './productTile';
import AuthContext from './Auth/authProvider';
import axiosPrivate from '../api/axiosPrivate';

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
    const userRole = auth?.userRole;
    const isSeller = userRole === 'SELLER'

    const [products, setProducts] = useState([]);

    const classes = useStyles();




    useEffect(() => {
        const productsURL = isSeller ? '/seller/products' : '/products'
        let isMounted = true;
        const controller = new AbortController();

        const getProducts = async () => {
            try {
                const response = await axiosPrivate.get(productsURL, {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setProducts(response.data);
            } catch (err) {
                console.error(err);
            }
        }

        getProducts();

        return () => {
            isMounted = false;
            controller.abort();
        }

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
