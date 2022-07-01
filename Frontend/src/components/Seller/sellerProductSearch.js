import {
    Grid, makeStyles,
} from '@material-ui/core';
import { useContext, useEffect, useState } from 'react'
import { Link, Navigate, } from 'react-router-dom';
import ProductTile from '../productTile';
import { useQuery } from '../../hooks/useQuery';
import AuthContext from '../Auth/authProvider';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';



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
const drawerWidth = 500;


export const SellerProductSearch = () => {
    const { auth } = useContext(AuthContext);
    const classes = useStyles();

    const axiosPrivate = useAxiosPrivate()


    const [products, setProducts] = useState()
    const [errorMessage, setErrorMessage] = useState('')

    let query = useQuery();
    var productName = query.get("name").toLowerCase()



    const buildQueryURL = () => {
        var queryURL = '?';
        if (productName?.length > 0) {
            queryURL += `name=${productName}`


        }
        return queryURL

    }




    useEffect(() => {
        const queryURL = buildQueryURL();

        let isMounted = true;
        const controller = new AbortController();

        const getSellerProducts = async () => {
            try {
                const response = await axiosPrivate.get(`/seller/products${queryURL}`, {
                    signal: controller.signal
                });
                console.log(response.data);
                if (isMounted) {
                    if (response.data?.length == 0) {
                        setErrorMessage('Your search returned no results...')
                        setProducts(null)
                    }
                    else {
                        setProducts(response.data)
                        setErrorMessage('')
                    }
                }
            } catch (err) {
                console.error(err);
            }
        }
        getSellerProducts()

        return () => {
            isMounted = false;
            controller.abort();
        }

    }, [auth?.accessToken, query])

    return (
        <div className={classes.root} >
            <main className={classes.content}>
                {console.log('seller product search')}
                {errorMessage}
                {products?.map(product => {
                    return (
                        <Grid item className={classes.item} key={product.id}>
                            <Link to={`/product/${product.id}`} className={classes.link}>
                                <ProductTile product={product} />
                            </Link>
                        </Grid>
                    )
                })}
            </main>
        </div>
    )
}



