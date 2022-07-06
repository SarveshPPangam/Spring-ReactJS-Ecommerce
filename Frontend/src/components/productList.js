import { React, useEffect, useContext, useState } from 'react'
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import {
    Link, useNavigate,
} from "react-router-dom";
import ProductTile from './productTile';
import AuthContext from './Auth/authProvider';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import axios from '../api/axios';
import { ListItem, ListItemText } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: "wrap",
        marginLeft: "15%"
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
    const axiosPrivate = useAxiosPrivate()

    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([]);

    const classes = useStyles();




    useEffect(() => {
        const sellerProductsURL = '/seller/products';
        const productsURL = 'products';
        let isMounted = true;
        const controller = new AbortController();

        const getSellerProducts = async () => {
            try {
                const response = await axiosPrivate.get(sellerProductsURL, {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setProducts(response.data);
            } catch (err) {
                console.error(err);
            }
        }
        const getProducts = async () => {
            try {
                const response = await axios.get(productsURL);
                console.log(response.data);
                isMounted && setProducts(response.data);
            } catch (err) {
                console.error(err);
            }
        }

        if (isSeller)
            getSellerProducts()
        else
            getProducts();

        return () => {
            isMounted = false;
            controller.abort();
        }

    }, [auth?.accessToken])


    useEffect(() => {
        const categoriesSet = new Set();
        products?.forEach(product => {
            categoriesSet.add(product?.category?.name);
        })
        setCategories(Array.from(categoriesSet));
    }, [products])


    return (
        <div className={classes.root}>
            {console.log(auth)}
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

                categories?.map((category, index) => {
                    return (
                        <>
                            <ListItem key={index}>
                                <ListItemText primary={category} />
                            </ListItem>

                            {products?.map((product, index) => {
                                if (product?.category?.name === category) {
                                    return (
                                        <Grid item className={classes.item} key={product.id}>
                                            <Link to={`/product/${product.id}`} className={classes.link}>
                                                <ProductTile product={product} />
                                            </Link>

                                        </Grid>
                                    )
                                }


                            })}


                        </>
                    )
                })

                // products?.map((product, index) => {
                //     return (
                //         <Grid item className={classes.item} key={product.id}>
                //             <Link to={`/product/${product.id}`} className={classes.link}>
                //                 <ProductTile product={product} />
                //             </Link>

                //         </Grid>

                //     )
                // })
            }
        </div>
    )
}
