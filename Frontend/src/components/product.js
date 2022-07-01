import { React, useEffect, useContext, useState } from 'react'
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
    Link,
    Switch,
    useParams,
    useNavigate,
} from "react-router-dom";
import { Button, Icon, Typography } from '@material-ui/core';
import RupeeSymbol from '../rupee.svg'
import AuthContext from './Auth/authProvider';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: "wrap",
        flexGrow: 1,
        padding: theme.spacing(4),
        marginLeft: 250
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
    media: {
        height: 600,
        width: 600,

        // objectFit: 'contain',
    },
    name: {
        height: 300,
        width: 600,
    },
    td: {
        padding: "0 90px 0 90px",
    },
    containerMargin: {
        marginTop: 50,
    },
    link: {
        color: 'inherit',
        textDecoration: 'inherit',
    },
    table: {
        borderCollapse: "separate",
        borderSpacing: "0 1em",

    }

}));
export const Product = () => {
    const { auth } = useContext(AuthContext);
    const [product, setProduct] = useState([]);
    const classes = useStyles();
    const { id } = useParams();
    const navigate = useNavigate();
    const userRole = auth?.userRole;
    const fetchURL = `/` + (userRole === 'SELLER' ? `seller/product/${id}` : `product/${id}`)

    const axiosPrivate = useAxiosPrivate()

    const isLoggedIn = auth?.accessToken

    useEffect(() => {
        const controller = new AbortController()
        let isMounted = true;

        const fetchProduct = async () => {
            try {
                const response = await axiosPrivate.get(fetchURL, {
                    signal: controller.signal
                });
                isMounted && setProduct(response.data);
            } catch (err) {
                console.error(err);
            }
        }

        fetchProduct()

        return () => {
            isMounted = false;
            controller.abort();
        }

    }, [auth?.accessToken])

    const addToCart = async () => {
        if (!isLoggedIn) {
            navigate('/login')
            return;
        }

        const controller = new AbortController()
        try {
            const response = await axiosPrivate.get(`/c/addToCart/${product.id}`, {
                signal: controller.signal
            });
            navigate('/cart')
        } catch (err) {
            console.error(err);
        }
    }

    const handleDelete = async () => {
        const controller = new AbortController()
        try {
            const response = await axiosPrivate.delete(`/common/deleteProduct/${product.id}`, {
                signal: controller.signal
            });
            navigate('/seller/products')
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={9} >
                <Grid item className={classes.media} >
                    <img src={product?.imageURL} width="100%" height="100%" style={{ objectFit: "contain" }} />
                </Grid>
                <Grid item className={classes.name}>

                    <Typography gutterBottom variant="h6" component="h2"  >
                        {product.name}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="h3" noWrap >
                        <Icon>
                            <img src={RupeeSymbol} height={14} width={14} />
                        </Icon>
                        {product.price}
                    </Typography>
                    {userRole === "SELLER" &&
                        <>
                            <Typography gutterBottom variant="body1" component="h2"  >
                                Quantity: {product.quantity}
                            </Typography>
                            <Grid container  >
                                <Button variant="contained" >
                                    <Link to={`/seller/editProduct/${product.id}`} className={classes.link}>
                                        Edit
                                    </Link>
                                </Button>
                            </Grid>
                            <Grid container>
                                <Button variant="contained" color="secondary" onClick={handleDelete}>
                                    Delete
                                </Button>
                            </Grid>
                        </>
                    }
                    {userRole !== "SELLER" &&
                        <Grid container>
                            <Button variant="contained" color="secondary" onClick={addToCart}>
                                Add to cart
                            </Button>
                        </Grid>
                    }


                </Grid>
            </Grid>
            <Grid container >
                <Typography gutterBottom variant="body1" component="h2"  >
                    {product.description}
                </Typography>
            </Grid>

            <Grid container className={classes.containerMargin}>
                <Grid item>
                    <Typography gutterBottom variant="h6" component="h2"  >
                        Product details
                    </Typography>
                </Grid>
                <Grid container className={classes.containerMargin}>
                    <table className={classes.table}>
                        <tbody>
                            {product?.details?.map(detail => {
                                return (
                                    <tr key={detail?.id}>


                                        < td className={classes.td} style={{ background: " #F4E1E6" }}>
                                            {detail.name}
                                        </td>
                                        <td className={classes.td} style={{ background: " #eeee" }}>
                                            {detail.value}
                                        </td>



                                    </tr>
                                )
                            }
                            )}
                        </tbody>
                    </table>
                </Grid>

            </Grid>




        </div >
    )
}
