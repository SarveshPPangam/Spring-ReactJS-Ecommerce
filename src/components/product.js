import { React, useEffect, useContext, useState } from 'react'
import { AppContext, AppProvider } from './contexts'
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
    Link,
    Redirect,
    Switch,
    useParams,
    useHistory,
} from "react-router-dom";
import { Button, Icon, Typography } from '@material-ui/core';
import RupeeSymbol from '../rupee.svg'

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
    const { state } = useContext(AppContext);
    const [product, setProduct] = useState([]);
    const classes = useStyles();
    const { id } = useParams();
    const history = useHistory();
    const userRole = state?.user?.role;
    const fetchURL = `http://localhost:8080/` + (userRole === 'SELLER' ? `seller/product/${id}` : `product/${id}`)
    // userRole === "SELLER" ? `http://localhost:8080/seller/product/${id}`  : `http://localhost:8080/product/${id}` ;
    useEffect(() => {

        fetch(fetchURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + state.token
            }
        }).then(function (response) {
            response.text().then(r => {
                const d = JSON.parse(r)
                console.log(d)
                setProduct(d)
            })
        }, function (err) {
            console.log(err.message)
        })
    }, [])

    const addToCart = () => {
        fetch(`http://localhost:8080/c/addToCart/${product.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + state.token
            }
        }).then(function (response) {
            response.text().then(r => {
                console.log(r)
            })
        }, function (err) {
            console.log(err)
        })
    }

    const handleDelete = () => {

        fetch(`http://localhost:8080/common/deleteProduct/${product.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + state.token
            }
        }).then(function (response) {
            response.text().then(r => {
                history.push('/seller/products')
            })
        }, function (err) {

        })
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
                    { userRole == "CUSTOMER" &&
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
                            {console.log(product?.details)}
                            {product?.details?.map(detail => {
                                return (
                                    <tr>


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
