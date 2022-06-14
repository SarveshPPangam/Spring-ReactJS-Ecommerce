

import { Button, Grid, Icon, makeStyles, Typography } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../contexts';
import RupeeSymbol from '../../rupee.svg'
import ContactDialog from './contactDialog';
import { Link, useHistory, useParams } from 'react-router-dom';

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
    const { state } = useContext(AppContext)
    const [order, setOrder] = useState();
    const history = useHistory()
    const userRole = state?.user?.role;

    const fetchCustomerOrder = (id) => {
        fetch(`/c/profile/order/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + state.token
            }
        }).then(function (response) {
            response.text().then(r => {
                const d = JSON.parse(r)
                console.log(d)
                setOrder(d)
            })
        }, function (err) {
            console.log(err.message)
        })
    }

    const fetchSellerOrder = (id) => {
        fetch(`/seller/order/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + state.token
            }
        }).then(function (response) {
            response.text().then(r => {
                const d = JSON.parse(r)
                console.log(d)
                setOrder(d)
            })
        }, function (err) {
            console.log(err.message)
        })
    }
    useEffect(() => {
        userRole === 'CUSTOMER' && fetchCustomerOrder(id)
        userRole === 'SELLER' && fetchSellerOrder(id)
    }, [state.token])

    const handleCancelOrder = () => {
        fetch(`/c/profile/cancelOrder`, {
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + state.token
            }
        }).then(function (response) {
            response.text().then(r => {
                console.log(r)
                history.push('/profile/orders')
            })
        }, function (err) {
            console.log(err)
        })
    }

    const handleSetAsDelivered = () => {
        fetch(`/seller/setAsDelivered`, {
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + state.token
            }
        }).then(function (response) {
            response.text().then(r => {
                console.log(r)
                history.push('/seller/orders')
            })
        }, function (err) {
            console.log(err)
        })
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
                    Deliver to:  {order?.contact?.address}

                </Typography>
                <Typography variant="h5" noWrap className={classes.title}>
                    {userRole === 'SELLER' ? "Ordered by:" : "Receiver name:"} {order?.contact?.receiverName}

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

