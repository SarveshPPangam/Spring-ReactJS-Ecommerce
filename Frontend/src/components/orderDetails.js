

import { Button, Grid, Icon, makeStyles, Typography } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import RupeeSymbol from '../rupee.svg'
import { Link, useNavigate, useParams } from 'react-router-dom';
import AuthContext from './Auth/authProvider';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import axios from '../api/axios';

const useStyles = makeStyles((theme) => ({
    title: {
        width: 600,
    },
    media: {
        height: 200,
        width: 200
        // objectFit: 'contain',
    },
    link: {
        color: 'inherit',
        textDecoration: 'inherit',
    },
    root: {
        flexGrow: 1,
        marginLeft: 300
    },
    paper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'

    },
    setQ: {
        position: 'fixed',
        top: '11%',
        left: '10%'
    },

    control: {
        padding: theme.spacing(2)
    }
}))
export const OrderDetails = () => {
    const classes = useStyles()
    const { id } = useParams()
    const { auth } = useContext(AuthContext);
    const [order, setOrder] = useState();
    const navigate = useNavigate()
    const userRole = auth?.userRole;

    const axiosPrivate = useAxiosPrivate()

    const fetchCustomerOrder = async (id) => {
        try {
            const response = await axiosPrivate.get(`/c/profile/order/${id}`);
            setOrder(response.data);
        } catch (err) {
            console.error(err);
        }
    }

    const fetchSellerOrder = async (id) => {
        try {
            const response = await axiosPrivate.get(`/seller/order/${id}`);
            setOrder(response.data);
        } catch (err) {
            console.error(err);
        }
    }
    useEffect(() => {
        userRole === 'CUSTOMER' && fetchCustomerOrder(id)
        userRole === 'SELLER' && fetchSellerOrder(id)
    }, [auth?.accessToken])

    const handleCancelOrder = async () => {
        try {
            const response = await axiosPrivate.post(`/c/profile/cancelOrder`,
                JSON.stringify(order),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            navigate('/profile/orders')
        } catch (err) {
            console.log(err?.response)
        }
    }

    const handleSetAsDelivered = async () => {
        try {
            const response = await axiosPrivate.post(`/seller/setAsDelivered`,
                JSON.stringify(order),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            navigate('/seller/orders')
        } catch (err) {
            console.log(err?.response)
        }
    }



    return (
        <div className={classes.root}>
            {order?.orderItems?.map((orderItem, index) => {
                console.log(orderItem)
                return (

                    <Grid container key={index}>
                        <div>
                            <Grid container >
                                <Grid item>
                                    <Link to={`/product/${orderItem?.product.id}`} className={classes.link} >
                                        <Typography variant="h5" noWrap className={classes.title}>
                                            {orderItem?.product.name}
                                        </Typography>
                                    </Link>

                                    <Typography variant="h5" noWrap>
                                        Product price:{" "}
                                        <Icon>
                                            <img src={RupeeSymbol} height={14} width={14} />
                                        </Icon>
                                        {orderItem?.product.price}
                                    </Typography>
                                    <Grid container spacing={2}>
                                        <Grid item className={classes.paper}>

                                            <Typography variant="h5" noWrap className={classes.title}>
                                                Item quantity: {orderItem?.quantity}
                                            </Typography>

                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2}>
                                        <Grid item className={classes.paper}>

                                            <Typography variant="h5" noWrap className={classes.title}>
                                                Total price: {orderItem?.totalPrice}
                                            </Typography>

                                        </Grid>
                                    </Grid>


                                </Grid>

                                <Grid item className={classes.media}>
                                    <Link to={`/product/${orderItem.product.id}`} className={classes.link} >

                                        <img src={orderItem?.product.imageURL} width="100%" height="100%" style={{ objectFit: "contain" }} />
                                    </Link>
                                </Grid>


                            </Grid>

                        </div>
                    </Grid>
                )
            })}
            <Grid container >
                <Typography variant="h5" noWrap className={classes.title}>
                    Deliver to:  {order?.address?.addressLine}

                </Typography>
                <Typography variant="h5" noWrap className={classes.title}>
                    {userRole === 'SELLER' ? "Ordered by:" : "Receiver name:"} {order?.address?.receiverName}

                </Typography>
                <Typography variant="h5" noWrap className={classes.title}>
                    Order status:  {order?.status}
                </Typography>


            </Grid>
            <Grid container>
                {order?.status == 'PENDING' && userRole === 'CUSTOMER' && <Button variant="contained" onClick={() => handleCancelOrder(order?.id)}> Cancel order</Button>}
                {order?.status === 'PENDING' && userRole === 'SELLER' && <Button variant="contained" onClick={() => handleSetAsDelivered(order?.id)}> Set as delivered</Button>}
            </Grid>
        </div >
    )
}

