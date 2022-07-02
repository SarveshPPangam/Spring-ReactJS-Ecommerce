import {
    Grid, makeStyles, Typography, Box,
    Toolbar, ListItem, ListItemIcon, List, Drawer, Divider, CssBaseline, ListItemText, Button, Checkbox, TextField,
} from '@material-ui/core';
import { useContext, useEffect, useState } from 'react'
import { Link, Navigate, } from 'react-router-dom';
import ProductTile from './productTile';
import { useQuery } from '../hooks/useQuery';
import AuthContext from './Auth/authProvider';
import useAxiosPrivate from '../hooks/useAxiosPrivate';



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
    },

}))

const drawerWidth = 500;


export const ProductSearch = () => {
    const { auth } = useContext(AuthContext);
    const classes = useStyles();

    const axiosPrivate = useAxiosPrivate()

    const isSeller = auth?.userRole === "SELLER"
    const redirectIfSeller = isSeller && <Navigate to="/seller/" />;


    const [products, setProducts] = useState()
    const [errorMessage, setErrorMessage] = useState('')

    let query = useQuery();
    var productName = query.get("name")?.toLowerCase()
    productName = productName?.replace(/[^a-z]/gi, ' ');
    const minPrice = parseInt(query.get("minPrice"))
    const maxPrice = parseInt(query.get("maxPrice"))


    const buildQueryURL = () => {
        var queryURL = '?search=';
        if (productName?.length > 0) {
            queryURL += `name:'*${productName}*'`

            if (Number.isInteger(minPrice) && minPrice > 0)
                queryURL += ` AND price>${minPrice}`

            if (Number.isInteger(maxPrice) && maxPrice > 0)
                queryURL += ` AND price<${maxPrice}`
        }

        else if (Number.isInteger(minPrice) && minPrice > 0) {
            queryURL += `price>${minPrice}`
            if (Number.isInteger(maxPrice) && maxPrice > 0)
                queryURL += ` AND price<${maxPrice}`
        }

        else if (Number.isInteger(maxPrice) && maxPrice > 0)
            queryURL += `price<${maxPrice}`

        return queryURL

    }



    useEffect(() => {
        const queryURL = buildQueryURL();

        let isMounted = true;
        const controller = new AbortController();

        const getSellerProducts = async () => {
            try {
                const response = await axiosPrivate.get(`/products${queryURL}`, {
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
        <>
            {redirectIfSeller}
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />

                <Drawer
                    PaperProps={{ style: { top: "22%" } }}

                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                    }}
                    variant="permanent"
                    anchor="left"
                >
                    <Toolbar />
                    <Divider />
                    <form >
                        {/* <Checkbox {...{ inputProps: { 'aria-label': 'Checkbox demo' } }} name="category/> */}
                        <Grid item>
                            <TextField name="name" type="hidden" value={productName} />
                        </Grid>
                        <Grid item>
                            <TextField name="minPrice" label="Min price" defaultValue={minPrice || ''} />
                        </Grid>
                        <Grid item>
                            <TextField name="maxPrice" label="Max price" defaultValue={maxPrice || ''} />
                        </Grid>
                        <Button type="submit">Filter</Button>
                    </form>
                </Drawer>
                <Box
                    component="main"
                    sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}

                >

                    <div className={classes.root}>
                        <Typography variant="h4"> Search results for {productName}</Typography>
                        <Grid container>
                            <h1>{errorMessage}</h1>
                        </Grid>
                        {products?.map(product => {
                            return (
                                <Grid item className={classes.item} key={product.id}>
                                    <Link to={`/product/${product.id}`} className={classes.link}>
                                        <ProductTile product={product} />
                                    </Link>
                                </Grid>
                            )
                        })}
                    </div>
                </Box>
            </Box>

        </>
    )
}



